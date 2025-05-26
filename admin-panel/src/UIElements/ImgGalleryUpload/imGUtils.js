
export const updateImageIndicesAndRemoveNullUrl = (array) => {
    let newImages = array.filter((image) => (image.img_url !== "" || image.img_url !== null));
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