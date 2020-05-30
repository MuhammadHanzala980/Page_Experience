import defaultProfile from '../image/default-profile.png';
export const getImageFullUrl = (imageUrl) => {
  if(imageUrl){
    const pic = imageUrl.toLowerCase();
    if(pic.endsWith('.png') || pic.endsWith('.jpg') || pic.endsWith('.jpeg')){
      return `${process.env.REACT_APP_API_URL}/${imageUrl.replace('\\','/')}`; 
    }
  }
  return defaultProfile;
}
  