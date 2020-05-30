import React, { useState, useCallback, useEffect } from 'react'
import Cropper from 'react-easy-crop'
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 300px;
  margin: auto auto;
  position: relative;
  
  background-color: white;
   .css-bdjl4r{
    color: #000000cc;
   }
   .crop-container {
    position: absolute;
    height: 300px;
    width: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
   }

  .controls {
    z-index: 100;
    height: 11px;
    width: 80%;
    position: absolute; 
    top: 0;
    left: 20%;
    
  }
  .ratio {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
  }
  .ratio button{
    border: none;
    background: #ffffff6c;
    width: 40px;
    text-align: left;
    padding: 0;
    margin: 0;
    color: white;
  }
`;

const createImage = url =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', error => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  })

function getRadianAngle(degreeValue) {
  return (degreeValue * Math.PI) / 180
}

async function getCroppedImg(imageSrc, pixelCrop, rotation = 0) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const maxSize = Math.max(image.width, image.height);
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));
  canvas.width = safeArea;
  canvas.height = safeArea;
  ctx.translate(safeArea / 2, safeArea / 2);
  ctx.rotate(getRadianAngle(rotation));
  ctx.translate(-safeArea / 2, -safeArea / 2);
  ctx.drawImage(
    image,
    safeArea / 2 - image.width * 0.5,
    safeArea / 2 - image.height * 0.5
  )
  const data = ctx.getImageData(0, 0, safeArea, safeArea);
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  ctx.putImageData(
    data,
    0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x,
    0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y
  )

  // As Base64 string
  const b64 = canvas.toDataURL('image/jpeg');
  const fbin = atob(b64.split(',')[1]);
  var array = [];
  for(var i = 0; i < fbin.length; i++) {
    array.push(fbin.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
}


const ImageCrop = ({image, setGetCropedImage}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [ratio, setRatio] = useState(4/3);
  const customStyle = {
    mediaStyle: {
      width: 'auto',
      height: "300px"
    },
 }
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedAreaPixels);
    setCroppedAreaPixels(croppedAreaPixels);
  }, [])
  useEffect(()=>{
    if(setGetCropedImage){
      setGetCropedImage(() => () => getCroppedImg(image, croppedAreaPixels, 0))
    }
  },
  [image, croppedAreaPixels, setGetCropedImage]);
  
  if(!image) return null;
  return (
    <Container>
      <div className="crop-container">
        <Cropper
          style={customStyle}
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={ratio}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <div className="controls">
          <input type="range"  min="1" max="3" step="0.1" value={zoom} onChange={(event) => setZoom(event.target.value)}/>
      </div>
      <div className="ratio">
      <button className="ratio-btn" onClick={() => setRatio(16/3)}>16/3</button>
      <button onClick={() => setRatio(16/9)}>16/9</button>
      <button onClick={() => setRatio(4/3)}>4/3</button>
      <button onClick={() => setRatio(1/1)}>1/1</button>
      <button onClick={() => setRatio(3/4)}>3/4</button>
      <button onClick={() => setRatio(9/16)}>9/16</button>
      <button onClick={() => setRatio(3/16)}>3/16</button>
      </div>
    </Container>
  )
}
export default ImageCrop;


