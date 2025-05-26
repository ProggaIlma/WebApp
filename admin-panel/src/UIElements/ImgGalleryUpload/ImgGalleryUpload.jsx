import React, { Fragment, useEffect, useRef, useState } from "react";
import Resizer from "react-image-file-resizer";
import { DragDropContext, Droppable, Draggable, } from "react-beautiful-dnd";
import { InboxOutlined, CloseOutlined, HolderOutlined } from '@ant-design/icons';
import { Typography, Space, Row, Flex, message, Spin } from 'antd';
import { useAxiosInstance } from "@Shared/axiosInstance/useAxiosInstance";
import { uploadImageToCloud } from "@Shared/APIUrls";
import "./ImgGalleryUpload.css";
import { updateImageIndicesAfterDelete, updateImageIndicesAndRemoveNullUrl } from "./imGUtils";
const { Text } = Typography;

const ImgGalleryUpload = (props) => {
    const { axiosInstance } = useAxiosInstance();
    const [images, setImages] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const { title, maxNoImgs, setTargetImgs, targetImgs, isInLoading, setIsInLoading } = props;
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setTargetImgs(updateImageIndicesAndRemoveNullUrl(images));
    }, [images]);


    useEffect(() => {
        setImages(updateImageIndicesAndRemoveNullUrl(targetImgs));
    }, [isInLoading]);

    const fileinputRef = useRef(null);

    const selecFiles = () => {
        if (images.length < maxNoImgs) {
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
        setIsLoading(true)
        const files = event.target.files;
        const newImages = [];
        for (let i = 0; i < files.length && images.length + newImages.length < maxNoImgs; i++) {
            if (files[i].type.split("/")[0] === "image") {

                let imgg = await resizeFile(event?.target?.files[i]);
                message.info('Uploading ' + event?.target?.files[i]?.name + " image!");
                let imgUrl = await uploadImageToCloudFunc(imgg);

                if (imgUrl !== undefined) {
                    message.success('Successfully uploaded ' + event?.target?.files[i]?.name + " image!");
                    newImages.push({
                        img_ind: images.length + newImages.length + 1,
                        img_url: imgUrl,
                    });
                } else {
                    message.error('Failed to upload ' + event?.target?.files[i]?.name + '! Try Again!');
                }
            } else {
                message.error('Please select an image file!');
            }
        }
        setImages((prevImages) => [...prevImages, ...newImages]);
        event.target.value = null;
        setIsLoading(false)
    };
    const onDrop = async (event) => {
        event.preventDefault();
        setIsDragging(false);
        setIsLoading(true)
        if (images.length >= maxNoImgs) {
            message.error('Can not upload more than' + maxNoImgs + ' images!');
            setIsLoading(false)
            return;
        }

        const files = event.dataTransfer.files;
        const newImages = [];
        for (let i = 0; i < files.length && images.length + newImages.length < maxNoImgs; i++) {

            if (files[i].type.split("/")[0] === "image") {

                const isDuplicate = images.some((e) => e.name === files[i].name);

                if (!isDuplicate) {
                    message.info('Uploading ' + files[i]?.name + " image!");
                    let imgg = await resizeFile(files[i]);
                    let imgUrl = await uploadImageToCloudFunc(imgg);

                    if (imgUrl !== undefined) {
                        message.success('Successfully uploaded ' + files[i]?.name + " image!");
                        newImages.push({
                            img_ind: i + 1,
                            img_url: imgUrl,
                        });
                    }
                    else {
                        message.error('Failed to upload ' + files[i]?.name + '! Try Again!');
                    }
                } else {
                    message.error('Duplicate Image! Can not upload image with the same name!');
                }

            } else {
                message.error('Please select an image file!');
            }
        }
        setImages((prevImages) => [...prevImages, ...newImages]);
        setIsLoading(false)
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
            return response?.data?.url;
        } catch (error) {
            return undefined;
        }
    };

    const deleteImage = (index) => {
        setImages((prevImages) => updateImageIndicesAfterDelete(prevImages, index));
    };

    const onDragOver = (event) => {
        event.preventDefault();
        setIsDragging(true);
        event.dataTransfer.dropEffect = "copy";
    };

    const onDragLeave = (event) => {
        event.preventDefault();
        setIsDragging(false);
    };

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const newImages = Array.from(images);
        const [reorderedImage] = newImages.splice(result.source.index, 1);
        newImages.splice(result.destination.index, 0, reorderedImage);
        setImages(newImages);
    };


    return (
        <div style={{ width: "95%", margin: "auto", paddingTop: "10px" }}>
            <div style={{ marginBottom: "10px", marginLeft: "10px" }}>
                <Text style={{ fontWeight: "600", fontSize: "16px", color: "#101828" }}>
                    {title}</Text>
            </div>

            <div className="boderBox"
                onClick={selecFiles} onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
                <Space direction="vertical" size={'small'} style={{ width: "100%", alignItems: "center" }}>
                    {
                        isLoading == true ?

                            <Flex align="center" gap="middle" style={{ height: "160px" }}>
                                <Spin size="large" />
                            </Flex> :

                            <Fragment>
                                <p style={{ height: "50px", width: "50px" }}><InboxOutlined style={{ color: "#122A4E", fontSize: '50px', }} /></p>
                                <Text style={{ fontWeight: "400", fontSize: "16px", color: "#101828", }}>Click or drag file to this area to upload</Text>
                                <Text style={{ fontWeight: "400", fontSize: "14px", color: "#8C8C8C", }}>Recommended upload file size: 2 MB</Text>
                                <Text style={{ fontWeight: "400", fontSize: "14px", color: "#8C8C8C", }}>Minimum width: 414px</Text>
                            </Fragment>
                    }


                </Space>
            </div>
            <input name="file" type="file" className="file" multiple ref={fileinputRef} onChange={onFileSelect}
                disabled={props.mode == 'view' || isLoading == true}></input>
            <Row gutter={[16, 0]} style={{ width: "100%", textAlign: "center", marginTop: "10px", marginBottom: "10px" }}>
                <Text style={{ fontWeight: "400", fontSize: "14px", color: "#8C8C8C", width: "90%", margin: "auto" }}>The first image will be shown at the app, so please drag and drop the images accordingly to adjust the order</Text>
            </Row>

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="imageGallery" direction="horizontal" isDropDisabled={props?.mode == 'view' ? true : false} >
                    {(provided) => (
                        <Row gutter={[16, 0]} ref={provided.innerRef} {...provided.droppableProps}>

                            {
                                images.map((image, index) => (
                                    <Draggable key={index} draggableId={`image-${index}`} index={index} isDragDisabled={props?.mode == 'view' ? true : false}>
                                        {(provided) => (

                                            props?.mode == 'view' ?
                                                <div className="image_card_view" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                    <Flex vertical="true">
                                                        <img src={image.img_url} alt={image.img_ind + "--" + image.img_url} />
                                                    </Flex>
                                                </div> :
                                                <div className="image_card" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                    <Flex vertical="true">
                                                        <Flex horizontal="true" justify='space-between' align='center' style={{ height: "20px", marginBottom: "10px" }}>
                                                            <HolderOutlined style={{ width: "20px", height: "20px", color: "#8c8c8c" }} />
                                                            <CloseOutlined style={{ width: "16px", height: "16px", color: "#8c8c8c" }} onClick={() => deleteImage(image.img_ind)} />
                                                        </Flex>
                                                        <img src={image.img_url} alt={image.img_ind + "--" + image.img_url} />
                                                    </Flex>
                                                </div>

                                        )}
                                    </Draggable>
                                ))
                            }

                        </Row>
                    )}
                </Droppable>
            </DragDropContext>


        </div>);
}

export default ImgGalleryUpload;