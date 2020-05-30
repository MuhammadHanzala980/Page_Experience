import React, { useState, useCallback, useEffect } from 'react'
import Cropper from 'react-easy-crop'
import styled from "styled-components";

const Container = styled.div`
  width:100%;
  height: 100%;
  background-color: white;
   .css-bdjl4r{
    color: #000000cc;
   }
  .controls {
    z-index: 10;
    height: 20px;
    width: 80%;
    position: absolute;
    left: 20%;
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
  //console.log("image", image,"croppedAreaPixels", croppedAreaPixels);
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    //console.log("croped area", croppedArea,"croped pixel aria", croppedAreaPixels)
    setCroppedAreaPixels(croppedAreaPixels);
  }, [])
  useEffect(()=>{
    if(setGetCropedImage){
      setGetCropedImage(() => () => getCroppedImg(image, croppedAreaPixels, 0))
    }
  },
  [image,croppedAreaPixels,setGetCropedImage]);
  
  if(!image) return null;
  return (
    <Container>
      <div className="crop-container">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={1 / 1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <div className="controls">
          <input type="range"  min="1" max="3" step="0.1" value={zoom} onChange={(event) => setZoom(event.target.value)}/>
      </div>
    </Container>
  )
}
export default ImageCrop;


