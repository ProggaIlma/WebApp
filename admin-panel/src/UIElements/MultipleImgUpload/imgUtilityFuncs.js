export const updateImageIndicesAndRemoveNullUrl = (array) => {
  let newImages = array.filter((image) => (image.img_url !== "" || image.img_url !== null));
  // Update img_ind values in ascending order
  for (let i = 0; i < newImages.length; i++) {
    newImages[i].img_ind = i + 1;
  }
  return newImages;
}
export const updateImageIndicesAfterDelete = (imgs, indexToDelete) => {
  let newImages = imgs.filter((image) => image.img_ind !== indexToDelete);
  for (let i = 0; i < newImages.length; i++) {
    newImages[i].img_ind = i + 1;
  }
  return newImages;
}

///////////////////////////// not used
export const getPrefImgWithIndexSort = (obj, IMtype) => {
  if (obj == undefined || obj == null || obj.length == 0) { return []; }
  let filteredImages = obj?.filter(image => image?.img_type == IMtype);
  filteredImages?.sort((a, b) => a?.img_ind - b?.img_ind);
  return filteredImages;
}


//haven't used it yet
export const countImagesWithNullUrl = (array) => {
  return array.filter((image) => image.img_url === "").length;
}



export const getImagesByType = (images, imgType) => {
  let k = [];
  k = images.filter((img) => img.img_type === imgType);
  if (k.length > 0) {
    return k[0]
  } else { return []; }

}

export const getFinalImageObj = (pp, oriObj) => {
  for (const imgType in pp) {
    const images = pp[imgType];
    const imageIds = oriObj
      .filter((img) => img.img_type === imgType)
      .map((img) => img.img_id);

    images.forEach((image, index) => {
      if (imageIds[index]) {
        image.img_id = imageIds[index];
      }
    });

    if (imageIds.length > images.length) {
      for (let index = images.length; index < imageIds.length; index++) {
        const newImage = {
          img_ind: index + 1,
          img_url: "",
          img_type: imgType,
          img_id: imageIds[index]
        };
        images.push(newImage);
      }
    }
  }
  return pp;
};
