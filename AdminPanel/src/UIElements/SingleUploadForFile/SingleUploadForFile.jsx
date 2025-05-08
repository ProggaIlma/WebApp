import React, { useState } from 'react';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, message, Upload, Typography, Space } from 'antd';
import { useAxiosInstance } from "@Shared/axiosInstance/useAxiosInstance";
import { baseURL, uploadImageToCloud } from "@Shared/APIUrls";
import "./SingleUploadForFile.css";

const { Text } = Typography;

const extensionMap = {
  js: '.js',
  css: '.css',
  html: '.html',
};

const SingleUploadForFile = ({ 
  fileURL, 
  setFileURL, 
  title, 
  isRequired, 
  mode, 
  allowedFileType
}) => {
  const { axiosInstance } = useAxiosInstance();
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  const getExtension = (filename) => {
    return filename?.split('.').pop()?.toLowerCase();
  };

  const handleUpload = async (options) => {
    const { file } = options;
    const extension = getExtension(file.name);

    if (allowedFileType && extension !== allowedFileType) {
      message.error(`Only .${allowedFileType} files are allowed for "${title}"`);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    setUploading(true);

    try {
      const response = await axiosInstance({
        url: `${baseURL}/shared/upload-file`,
        method: "POST",
        data: formData,
        params: { file_type: "file" }
      });

      setUploadedFile(response.data.url);
      setFileURL(response.data.url);
      message.success('Upload successful!');
    } catch (error) {
      message.error('Upload failed! Try Again!');
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

  return (
    <Space direction="vertical" size={'small'} style={{ width: "100%" }}>
      <Text style={{ fontWeight: "600", fontSize: "14px", color: "#101828" }}>
        {title}{isRequired ? "   *" : null}
      </Text>
      <Upload
        customRequest={customRequest}
        showUploadList={false}
        disabled={uploading || uploadedFile || mode === 'view' || fileURL}
        accept={allowedFileType ? extensionMap[allowedFileType] : undefined} 
        style={{ width: "100%" }}
      >
        <Button
          loading={uploading}
          disabled={uploading || uploadedFile || mode === 'view' || fileURL}
          block
          style={{ whiteSpace: "normal", marginBottom: '10px', height: 40 }}
          className='fleeboxx'
        >
          {uploadedFile ? 'Uploaded File' : uploading ? 'Uploading' : 'Select File'} <UploadOutlined />
        </Button>
      </Upload>

      {fileURL && mode !== 'view' && (
        <Text type="success" className='fleeboxx' style={{ maxWidth: '100%' }}>
          {fileURL}
          <DeleteOutlined className='ondelicon' onClick={handleRemove} />
        </Text>
      )}

      {mode === 'view' && fileURL && (
        <Text type="success" className='fleeboxx' style={{ maxWidth: '100%' }}>
          {fileURL} 
        </Text>
      )}
    </Space>
  );
};

export default SingleUploadForFile;