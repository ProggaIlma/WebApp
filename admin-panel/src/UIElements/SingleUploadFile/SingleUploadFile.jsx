import React, { useState } from 'react';
import { UploadOutlined, DeleteOutlined, ExportOutlined } from '@ant-design/icons';
import { Button, message, Upload, Typography, Space, Flex, Tooltip } from 'antd';
import { useAxiosInstance } from "@Shared/axiosInstance/useAxiosInstance";
import { uploadImageToCloud } from "@Shared/APIUrls";
const { Text } = Typography;
import "./SingleUploadFile.css";
const SingleUploadFile = ({ fileURL, setFileURL, title, isRequired, mode }) => {
    const { axiosInstance } = useAxiosInstance();
    const [uploading, setUploading] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);

    const handleUpload = async (options) => {
        const { file } = options;
        let formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        try {
            const response = await axiosInstance({
                url: uploadImageToCloud,
                method: "POST",
                data: formData,
                params: { file_type: "file" }
            });
            setUploadedFile(response.data.url);
            setFileURL(response.data.url)
            message.success('Upload successful!');
        } catch (error) {
            message.error('Upload failed! Try again!');
        } finally {
            setUploading(false);
        }
    };

    const customRequest = async (options) => {
        await handleUpload(options);
    };

    const handleRemove = () => {
        setUploadedFile(null);
        setFileURL(null);
    };

    const downloadFile = (fileURL) => {
        window.open(fileURL, '_blank');
    }
    return (
        <Space direction="vertical" size={'small'} style={{ width: "100%" }}>
            <Text style={{ fontWeight: "600", fontSize: "14px", color: "#101828" }}>{title}
                {isRequired == true ? "   *" : null}</Text>
            <Upload
                customRequest={customRequest}
                showUploadList={false}
                disabled={uploading || uploadedFile || mode == 'view' || fileURL}
                style={{ width: "100%" }}>
                <Button loading={uploading} disabled={uploading || uploadedFile || mode == 'view' || fileURL}
                    block style={{ whiteSpace: "normal", marginBottom: '10px', height: 40 }} className='fleeboxx'>
                    {uploadedFile ? 'Uploaded File' : uploading ? 'Uploading' : 'Select File'} <UploadOutlined />
                </Button>
            </Upload>
            {uploadedFile !== null && mode !== 'view' ? (

                <Text type="success" className='fleeboxx' style={{
                    maxWidth: '100%',
                }}>
                    {fileURL}

                    <DeleteOutlined className='ondelicon' onClick={handleRemove} />
                </Text>


            ) : null}
            {fileURL !== null && uploadedFile == null && mode !== 'view' ? (

                <Text type="success" className='fleeboxx' style={{
                    maxWidth: '100%',
                }}>
                    {fileURL !== null ? fileURL : uploadedFile.split('/').pop()}

                    <DeleteOutlined className='ondelicon' onClick={handleRemove} />
                </Text>

            ) : null}
            {mode == 'view' ? (
                <Flex horizontal="true" justify='flex-start' align='flex-start'>
                    <Text type="success" className='fleeboxx' style={{
                        maxWidth: '100%',
                    }}>
                        {fileURL !== null ? fileURL.split('/') : null}

                        <Tooltip placement="right" title={"View and download"} color={'#122a4e'} overlayStyle={{ padding: "15px", width: "170px", fontSize: "14px" }}>
                            <ExportOutlined className='ondelicon' onClick={() => { downloadFile(fileURL) }} />
                        </Tooltip>
                    </Text>
                </Flex>
            ) : null}
        </Space>
    );
};

export default SingleUploadFile;
