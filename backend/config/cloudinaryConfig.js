import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: 'dpfvmnrzh',  
  api_key: '594884994223939',    
  api_secret: 'xzaULQaf12Bd6fsm8u5zw3uacGE'  
});
console.log("Cloudinary config loaded:", cloudinary.config()); // <-- ADD THIS

export default cloudinary;