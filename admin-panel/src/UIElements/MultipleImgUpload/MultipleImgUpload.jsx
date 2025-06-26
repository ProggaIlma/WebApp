import React, { useEffect, useRef, useState } from "react";
import { Typography, Row, Col, Space } from 'antd';
import {ImgUploaderBox}  from "../../Styles/LayoutStyles";
import "./MultipleImgUpload.css";
import Gallerylogo from "@Assets/ZuAILogo.svg";
import Resizer from "react-image-file-resizer";
import { useAxiosInstance } from "@Shared/axiosInstance/useAxiosInstance";
import { uploadImageToCloud } from "@Shared/APIUrls";
import { updateImageIndicesAfterDelete, updateImageIndicesAndRemoveNullUrl } from "./imgUtilityFuncs";

const MultipleImgUpload = (props) => {
  const { axiosInstance } = useAxiosInstance();
  const [images, setImages] = useState([]);
  const { setTargetImgs, targetImgs, mulImgType, isInLoading, mode } = props;
                      
  useEffect(() => {
    if (targetImgs.length > 0 && JSON.stringify(images) !== JSON.stringify(targetImgs)) {
      setImages(updateImageIndicesAndRemoveNullUrl(targetImgs));
    }
  }, [targetImgs]); 
  
  useEffect(() => {
    if (images.length > 0 && JSON.stringify(targetImgs) !== JSON.stringify(images)) {
      setTargetImgs(updateImageIndicesAndRemoveNullUrl(images));
    }
  }, [images]); 


  useEffect(() => {
    setImages(updateImageIndicesAndRemoveNullUrl(props.targetImgs));
  }, [isInLoading]);


  const fileinputRef = useRef(null);

  const selecFiles = () => {
    if (images.length < 3) {
      fileinputRef.current.click();
    }
  };

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file, // Is the file of the image which will resized.
        1024, // Is the maxWidth of the resized new image.
        768, // Is the maxHeight of the resized new image.
        "WEBP", // Is the compressFormat of the resized new image.
        100, // Is the quality of the resized new image.
        0, // Is the degree of clockwise rotation to apply to uploaded image.
        (uri) => {
          resolve(uri);
        }, // Is the callBack function of the resized new image URI.
        "file", // Is the output type of the resized new image.
        1024, // Is the minWidth of the resized new image.
        768 // Is the minHeight of the resized new image.
      );
    });
  const onFileSelect = async (event) => {
    const files = event.target.files;
    const newImages = [];
    for (let i = 0; i < files.length && images.length + newImages.length < 3; i++) {
      if (files[i].type.split("/")[0] === "image") {
        let imgg = await resizeFile(event.target.files[i]);
        let imgUrl = await uploadImageToCloudFunc(imgg);

        if (imgUrl !== undefined) {
          newImages.push({
            img_ind: images.length + newImages.length + 1,
            img_url: imgUrl,
            img_type: mulImgType,
          });
        } else {
         
        }
      } else {
        // props.setMessage("Uploaded file must be an image");
      }
    }
    setImages((prevImages) => [...prevImages, ...newImages]);
    event.target.value = null; // Clear input value
  };


  const uploadImageToCloudFunc = async (file) => {
    let formData = new FormData();
    formData.append('image', file);
    try {
      const response = await axiosInstance({
        url: uploadImageToCloud,
        method: "POST",
        data: formData,
      });
      return response.data.url;
    } catch (error) {
      return undefined;
    }
  };

  const deleteImage = (index) => {
    setImages((prevImages) => updateImageIndicesAfterDelete(prevImages, index));
  };



  return (
    <React.Fragment>
{mode !== 'view' ? (
  <>
    <ImgUploaderBox
      onClick={selecFiles}
    
    >
      <Row justify="center" align="middle">
        <Col xs={24} md={4} style={{ padding: 24, textAlign: 'center' }}>
          <img src={Gallerylogo} className="gallery_logo" alt="Gallerylogo" />
        </Col>
        <Col xs={24} md={20} style={{ padding: 32 }}>
          <Space
            direction="vertical"
            size={8}
            style={{
              textAlign: 'center',
              marginLeft: '4px',
            }}
          >
            <Typography.Text type="secondary">
              Recommended Size: 1024 x 768 px, Maximum 3 photos.
            </Typography.Text>
          </Space>
        </Col>
      </Row>
    </ImgUploaderBox>

    <input
      name="file"
      type="file"
      className="file"
      multiple
      ref={fileinputRef}
      onChange={onFileSelect}
      disabled={mode === 'view'}
    />
  </>
) : null}

<br />

{mode !== 'view' ? (
  <Row justify="center" gutter={[16, 16]} style={{ margin: 'auto' }}>
    {images.map((image, index) => (
      <Col xs={24} sm={24} md={8} lg={6} key={index}>
        <div className="image_div">
          <img src={image.img_url} alt={`${image.img_ind}--${image.img_url}`} />
          <div className="delete_button" onClick={() => deleteImage(image.img_ind)}>
            X
          </div>
        </div>
      </Col>
    ))}
  </Row>
) : (
  <Row justify="center" gutter={[16, 16]} style={{ margin: 'auto' }}>
    {images.map((image, index) => (
      <Col xs={24} sm={12} md={8} lg={6} key={index}>
        <div className="image_div">
          <img src={image.img_url} alt={`${image.img_ind}--${image.img_url}`} />
        </div>
      </Col>
    ))}
  </Row>
)}



    </React.Fragment>

  );
};

export default MultipleImgUpload;