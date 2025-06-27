// Complete updated ViewProduct.jsx
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { NavContext } from '@Shared/NavContexts/nav-contexts';
import { Layout, Flex, Col, Row, Card, Modal, Typography } from 'antd';
import HomePageLoader from '@UIElements/HomePageLoader/HomePageLoader';
import Buttons from '@UIElements/Buttons/Buttons';
import AllInput from '@UIElements/AllInput/AllInput';
import useFormHook from '@Shared/FormHook/useFormHook';
import { productDetailsApi, productUpdateApi } from '@Shared/APIUrls';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useAxiosInstance } from '@Shared/axiosInstance/useAxiosInstance';
import { useNotification } from '@UIElements/CNotification/useNotification';
import MultipleImgUpload from '@UIElements/MultipleImgUpload/MultipleImgUpload';

const { confirm } = Modal;
const { Content } = Layout;

const ViewProduct = () => {
  const navigate = useNavigate();
  const { mode, id } = useParams();
  const { setHeaderTitle } = useContext(NavContext);
  const { axiosInstance } = useAxiosInstance();
  const { contextHolder, openNotificationWithIcon } = useNotification();
  
  const [allowedFileTypes, setAllowedFileTypes] = useState(["jpeg", "JPG", "JPEG"]);
  const [isBannerLoading, setIsBannerLoading] = useState(false);
  const [bannerImgs, setBannerImgs] = useState([]);
  const [isSavingData, setIsSavingData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setHeaderTitle(mode === 'view' ? 'View Product' : mode === 'edit' ?'Edit Product':'Create Product');
  }, []);

  const initialFormState = {
    name: {
      elementType: 'textInput',
      elememtConfig: { placeholder: 'Product Name' },
      validations: { errorM: null, valid: true },
      validators: { required: true },
      touched: false,
      value: '',
    },
    description: {
      elementType: 'textInput',
      elememtConfig: { placeholder: 'Product Description' },
      validations: { errorM: null, valid: true },
      validators: { required: true },
      touched: false,
      value: '',
    },
    price: {
      elementType: 'priceInput',
      elememtConfig: { placeholder: 'Product Price' },
      validations: { errorM: null, valid: true },
      validators: { required: true },
      touched: false,
      value: '',
    },
    categoryId: {
      elementType: 'textInput',
      elememtConfig: { placeholder: 'Category ID' },
      validations: { errorM: null, valid: true },
      validators: { required: true },
      touched: false,
      value: '',
    },
    images: {
      elementType: 'textInput',
      elememtConfig: { placeholder: 'Image URLs (comma-separated)' },
      validations: { errorM: null, valid: true },
      validators: { required: true },
      touched: false,
      value: '',
    },
    stock: {
      elementType: 'textInput',
      elememtConfig: { placeholder: 'Stock' },
      validations: { errorM: null, valid: true },
      validators: { required: true },
      touched: false,
      value: '',
    },
  };

  const {
    form,
    isFormValid,
    formElementArray,
    inputChangedHandler,
    setIsFormValid,
    setFetchedDataInForm,
    getValuesFromFormState,
  } = useFormHook(initialFormState);

  const onClickSave = () => {
    confirm({
      title: 'Do you want to save this product?',
      icon: <ExclamationCircleFilled />,
      okText: 'Yes',
      cancelText: 'No',
      onOk() {
        onConfirmOrCancel(true);
      },
    });
  };
 const getTheNewsfeedBanners = (images) => {
    const newsfeedBanners = {};
    for (let i = 1; i <= 3; i++) {
      const matchingImage = images.find((image) => image.img_ind === i);
      if (matchingImage) {
        newsfeedBanners[`nf_banner_${i}`] = matchingImage.img_url;
      } else {
        newsfeedBanners[`nf_banner_${i}`] = null;
      }
    }
    return newsfeedBanners;
  };
  const onConfirmOrCancel = (shouldSave) => {
    if (shouldSave) {
      setIsSavingData(true);
      const vals = getValuesFromFormState();

      const updatedProduct = {
        name: vals.name,
        description: vals.description,
        price: parseFloat(vals.price),
        categoryId: vals.categoryId,
        images: vals.images.split(',').map((url) => url.trim()),
        stock: parseInt(vals.stock),
      };

      axiosInstance({
        url: `${productUpdateApi}/${id}`,
        method: 'PATCH',
        data: updatedProduct,
      })
        .then((res) => {
          openNotificationWithIcon('success', null, res?.data?.message || 'Product updated successfully!');
          navigate('/product-layout/product');
        })
        .catch((err) => {
          openNotificationWithIcon('error', null, err?.response?.data?.errors?.[0] || 'Server error');
        })
        .finally(() => setIsSavingData(false));
    }
  };

  useEffect(() => {
    if ((mode === 'view' || mode === 'edit') && id) {
      axiosInstance({
        url: `${productDetailsApi}/${id}`,
        method: 'GET',
      })
        .then((res) => {
          console.log(res);
          
          const product = res.data || {};
          product.images = Array.isArray(product.images) ? product.images.join(', ') : '';
          console.log(product);
          
          setFetchedDataInForm(product);
          setIsFormValid(true);
        })
        .catch((err) => {
          openNotificationWithIcon('error', null, err?.response?.data?.errors?.[0] || 'Server error');
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <Layout>
      {contextHolder}
      <Content style={{ backgroundColor: 'transparent', paddingTop: '1px' }}>
        <Flex
          style={{ height: '50px', padding: '0 30px', backgroundColor: 'white', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}
          justify="space-between"
          align="center"
        >
          <Buttons btntyp="cancel-btn" btntext="Back" w={80} onClickFunc={() => navigate('/product-layout/product')} />
          {mode !== 'view' && <Buttons btntyp="colored-btn" disabled={!isFormValid} onClickFunc={onClickSave} btntext="Save" w={80} btnColor="#8A7CFF" />}
        </Flex>
<div style={{ padding: "15px" }}>
          <div className="stckdiv">
            <Typography >
              Post Images
            </Typography>
          </div>
          <MultipleImgUpload
            mulImgType={"BANNER"}
            targetImgs={bannerImgs}
            setTargetImgs={setBannerImgs}
            isInLoading={isBannerLoading}
          
            allowedFileTypes={allowedFileTypes}
            mode={mode}
          />
        </div>
        <Card style={{ margin: '30px' }}>
          {isLoading ? (
            <HomePageLoader />
          ) : (
            <Row gutter={[16, 0]}>
              {formElementArray.map((formElement, index) => (
                <Col xs={24} sm={24} md={8} key={formElement.id}>
                  <Row justify="center" style={{ marginTop: '13px' }}>
                    <AllInput
                      elementType={formElement.config.elementType}
                      elememtConfig={formElement.config.elememtConfig}
                      inputVariable={formElement.config.value}
                      validations={formElement.config.validations}
                      touched={formElement.config.touched}
                      disabled={mode === 'view'}
                      onChangedInput={(event) =>{
                        if(formElement.config.elementType=='textInput') inputChangedHandler(event, formElement.id)
                          else inputChangedHandler(event, formElement.id,event)}
                      }
                      isRequired={formElement?.config?.validators?.required}
                    />
                  </Row>
                </Col>
              ))}
            </Row>
          )}
        </Card>
      </Content>
    </Layout>
  );
};

export default ViewProduct;
