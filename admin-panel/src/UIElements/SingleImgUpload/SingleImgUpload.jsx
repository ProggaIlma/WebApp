//SingleImgUpload
import React, { useState, useRef, useEffect } from 'react';
import { useAxiosInstance } from "@Shared/axiosInstance/useAxiosInstance";
import { uploadImageToCloud } from "@Shared/APIUrls";
import "./SingleImgUpload.css";
import { Col, Row, Card, Typography, Flex, message, Spin } from 'antd';
const { Title, Text } = Typography;
import Gallerylogo from "@Assets/uis/Gallery.svg";
import Resizer from "react-image-file-resizer";

const SingleImgUpload = (props) => {
    const { axiosInstance } = useAxiosInstance();
    let { img_type, img_width, img_height, setTargetImg, targetImg, isInLoading, mode } = props;
    const [image, setImage] = useState(null);
    const fileInputRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        setImage(targetImg);
    }, [props.targetImg]);


    useEffect(() => {
        setImage(targetImg);
    }, [isInLoading]);



    const selectFile = () => {
        if (mode == 'view') return;
        fileInputRef.current.click();
    };

    const resizeFile = (file) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file, // Is the file of the image which will be resized.
                img_width, // Is the maxWidth of the resized new image.
                img_height, // Is the maxHeight of the resized new image.
                "WEBP", // Is the compressFormat of the resized new image.
                100, // Is the quality of the resized new image.
                0, // Is the degree of clockwise rotation to apply to the uploaded image.
                (uri) => {
                    resolve(uri);
                }, // Is the callBack function of the resized new image URI.
                "file", // Is the output type of the resized new image.
                img_width, // Is the minWidth of the resized new image.
                img_height // Is the minHeight of the resized new image.
            );
        });

    const uploadImageToCloudFunc = async (file) => {


        let formData = new FormData();
        formData.append('image', file);
        try {
            const response = await axiosInstance({
                url: uploadImageToCloud,
                method: "POST",
                data: formData,
            });
            setIsLoading(false);
            message.success('Upload successful!');
            return response.data.url;
        } catch (error) {
            message.error('Upload failed! Try again!');
            return "";
        }
    };

    const onFileSelect = async (event) => {

        if (mode == 'view') return;
        const file = event.target.files[0];

        if (!file) return;
        if (file.type.split("/")[0] !== "image") {
            message.error('Please select an image file!');
            return;
        }
        setIsLoading(true)
        message.success('Uploading image');
        const imgg = await resizeFile(file);
        let imgUrl = await uploadImageToCloudFunc(imgg);
        setImage(imgUrl);
        setTargetImg(imgUrl)
    };


    const deleteImage = () => {
        setImage(null);
        setTargetImg(null);
        fileInputRef.current.value = null;
    };
    return (
        <Flex vertical="true" spacing={0} variant="stckimg" style={{justifyContent:"center",alignItems:"center"}} sx={{ width: "100%" }}>
            <Row sx={{ padding: "0px", margin: "0px", }}>
                <Col span={24}> <Title level={5} sx={{
                    textAlign: "left", width: "100%"
                }}> {img_type}
                </Title></Col>
            </Row>


            {(image == "undefined" || image == undefined || image == null) ?
                (
                    <Card style={{
                        width: "190px",
                        height: "180px",
                        backgroundColor: "#fafcfd",
                        border: "1px solid #CCD6E7",
                        borderradius: "6px",
                        boxShadow: "none"
                    }} onClick={selectFile}>
                        <div className="noimage_div" style={{ margin: "auto", width: "100%", height: "100%" }}>
                            {
                                isLoading == true ?
                                    <Flex vertical="true" align="center" gap="middle" style={{ marginTop: "40px" }}>
                                        <Spin size="large" />
                                    </Flex>
                                    :
                                    <Flex vertical="true" sx={{ textAlign: "center", alignItems: "center" }}>
                                        <img src={Gallerylogo} className="sigallery_logo" alt="Gallerylogo" />
                                        <Title level={5} style={{ textAlign: "center" }}>Upload photo</Title>
                                    </Flex>
                            }

                        </div>
                    </Card>
                )
                :
                (
                    <div className="simage_div" style={{
                        margin: "auto", width: "190px",
                        overflow: "hidden",
                        borderRadius: "100%",
                        height: "180px"
                    }}>
                        <img src={image} alt={image} style={{ objectFit: "cover" }} />
                        {
                            mode !== 'view' ? <div className="sdelete_button" onClick={deleteImage}>
                                X
                            </div> : <></>
                        }

                    </div>
                )}
            <input name="file" type="file" className="file" ref={fileInputRef} onChange={onFileSelect}
                disabled={mode == 'view' ? true : false} />
            {mode !== 'view' ? <Text type="secondary" style={{ textAlign: "center", paddingLeft: "6px", width: "100%", marginTop: "10px" }}>
                Recommend Size {img_width} x {img_height} px</Text> : <></>}
        </Flex>
    );
}

export default SingleImgUpload;