import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NavContext } from '@Shared/NavContexts/nav-contexts';
import { Layout, Flex, Col, Row, Card, Modal } from 'antd';
import HomePageLoader from '@UIElements/HomePageLoader/HomePageLoader';
import Buttons from '@UIElements/Buttons/Buttons';
import { useNavigate } from 'react-router-dom';
import AllInput from '@UIElements/AllInput/AllInput';
import useFormHook from '@Shared/FormHook/useFormHook';
import { productDetailsApi, productUpdateApi } from '@Shared/APIUrls';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useAxiosInstance } from '@Shared/axiosInstance/useAxiosInstance';
import { useNotification } from '@UIElements/CNotification/useNotification';
import { ViewDateFormatter } from '@Shared/Utils/utils';
const { confirm } = Modal;
const { Content } = Layout;

const ViewProduct = () => {
  const navigate = useNavigate();
  const { mode, id } = useParams();
  const { setIconsLevel, setSettingsBarLevel, setHeaderTitle } = useContext(NavContext);
  const { axiosInstance } = useAxiosInstance();
  const { api, contextHolder, openNotificationWithIcon } = useNotification();
  const [productData, setproductData] = useState('');
  const [isSavingData, setIsSavingData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    mode == 'view' ? setHeaderTitle('View Product') : setHeaderTitle('Edit Product');
  }, []);

  const [status, setstatus] = useState([
    { label: 'Paid', value: 'PAID', disabled: false },
    { label: 'Rejected', value: 'CANCELLED', disabled: false },
    { label: 'Pending', value: 'UNPAID', disabled: false },
    { label: 'Refunded', value: 'REFUNDED', disabled: false },
  ]);
  const initialFormState = {
    product_intent_id: {
      elementType: 'textInput',
      elememtConfig: {
        placeholder: 'Product ID',
        arialabel: null,
      },
      validations: {
        errorM: null,
        valid: false,
      },
      validators: {
        required: false,
      },
      touched: false,
      value: '',
    },
    inv_uid: {
      elementType: 'textInput',
      elememtConfig: {
        placeholder: 'Invoice ID',
        arialabel: null,
      },
      validations: {
        errorM: null,
        valid: false,
      },
      validators: {
        required: false,
      },
      touched: false,
      value: '',
    },
    org_name: {
      elementType: 'textInput',
      elememtConfig: {
        placeholder: 'Subscriber Name',
        arialabel: null,
      },
      validations: {
        errorM: null,
        valid: true,
      },
      validators: {
        required: false,
      },
      touched: false,
      value: null,
    },
    inv_product_date: {
      elementType: 'textInput',
      elememtConfig: {
        placeholder: 'Product Date',
        arialabel: null,
      },
      validations: {
        errorM: null,
        valid: false,
      },
      validators: {
        required: false,
      },
      touched: false,
      value: '',
    },
    subs_plan_name: {
      elementType: 'textInput',
      elememtConfig: {
        placeholder: 'Subscription Plan Name',
        arialabel: null,
      },
      validations: {
        errorM: null,
        valid: true,
      },
      validators: {
        required: false,
      },
      touched: false,
      value: null,
    },
    total_amount: {
      elementType: 'priceInput',
      elememtConfig: {
        placeholder: 'Product Amount',
        arialabel: null,
      },
      validations: {
        errorM: null,
        valid: true,
      },
      validators: {
        required: false,
      },
      touched: false,
      value: null,
    },
    inv_status: {
      elementType: 'titleSelect',
      elememtConfig: {
        placeholder: 'Status',
        arialabel: null,
        options: status,
      },
      validations: {
        errorM: null,
        valid: false,
      },
      validators: {
        required: false,
      },
      touched: false,
      value: '',
    },
  };
  const {
    form,
    isFormValid,
    isFormTouched,
    formElementArray,
    inputChangedHandler,
    resetFormValues,
    setFormValues,
    setIsFormValid,
    getValuesFromFormState,
    getNonEmptyValuesFromFormState,
    setFetchedDataInForm,
  } = useFormHook(initialFormState);

  const onClickSave = () => {
    confirm({
      title: 'Do you want to save this product?',
      icon: <ExclamationCircleFilled />,
      okText: 'Yes',
      okType: 'primary',
      cancelText: 'No',
      mask: false,
      centered: true,

      onOk() {
        onConfirmOrCancel(true);
      },
      onCancel() {
        onConfirmOrCancel(false);
      },
    });
  };

  const onConfirmOrCancel = (data) => {
    if (data == true) {
      setIsSavingData(true);
      let vals = getValuesFromFormState();
      axiosInstance({
        url: productUpdateApi + '/' + id,
        method: 'PATCH',
        data: { inv_status: vals?.inv_status },
      })
        .then((response) => {
          openNotificationWithIcon('success', null, response?.data?.message || 'Sucessfully saved data!');
          navigate('/product-layout/product');
          setTimeout(() => {
            setIsSavingData(false);
          }, 3000);
        })
        .catch((error) => {
          setIsSavingData(false);
          openNotificationWithIcon(
            'error',
            null,
            error?.response?.data?.errors && error?.response?.data?.errors[0] ? error?.response?.data?.errors[0] : 'Something went wrong in server'
          );
        });
    }
  };

  useEffect(() => {
    if ((mode == 'view' || mode == 'edit') && id != null) {
      axiosInstance({
        url: productDetailsApi + '/' + id,
        method: 'GET',
      })
        .then((res) => {
          res.data.invoice.inv_product_date = res.data?.invoice?.inv_product_date ? ViewDateFormatter(res.data?.invoice?.inv_product_date) : '';
          res.data.invoice.org_name = res.data?.invoice?.org?.org_name ? res.data?.invoice?.org?.org_name : '';

          res.data.invoice.subs_plan_name = res.data?.invoice?.subs_plan?.subs_plan_name ? res.data?.invoice?.subs_plan?.subs_plan_name : '';
          setFetchedDataInForm(res.data?.invoice);
          setproductData(res.data?.invoice);

          setIsFormValid(true);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          openNotificationWithIcon('error', null, error?.response?.data?.errors[0] !== undefined ? error.response.data?.errors[0] : 'Something went wrong in server', 6);
        });
    } else setIsLoading(false);
  }, []);

  return (
    <Layout>
      {contextHolder}
      <Content
        style={{
          textAlign: 'left',
          color: '#fff',
          backgroundColor: 'transparent',
          overflow: 'auto',
          paddingTop: '1px',
        }}
      >
        <Flex
          style={{ height: '50px', width: '100%', paddingLeft: '30px', paddingRight: '30px', backgroundColor: 'white', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}
          justify="space-between"
          align="center"
        >
          <Buttons
            btntyp="cancel-btn"
            btntext="Back"
            w={80}
            onClickFunc={() => {
              navigate('/product-layout/product');
            }}
            key={3333}
          />
          {mode == 'edit' && <Buttons btntyp="colored-btn" disabled={!isFormValid} onClickFunc={onClickSave} btntext="Save" w={80} btnColor="#8A7CFF" key={122} />}{' '}
        </Flex>
        <Card width={100} style={{ height: 'auto', margin: '30px' }}>
          {isLoading ? (
            <HomePageLoader />
          ) : (
            <Row gutter={[16, 0]} style={{ width: '100%', margin: 'auto' }}>
              {formElementArray.map((formElement, index) => (
                <Col xs={24} sm={24} md={8} key={index + 'ddee'}>
                  <Row justify="center" style={{ marginTop: '13px' }}>
                    <AllInput
                      key={formElement.id}
                      elementType={formElement.config.elementType}
                      elememtConfig={formElement.config.elememtConfig}
                      inputVariable={formElement.config.value}
                      validations={formElement.config.validations}
                      touched={formElement.config.touched}
                      disabled={index == '6' ? (mode == 'view' ? true : false) : true}
                      onChangedInput={(event) => {
                        if (formElement.config.elementType == 'textInput') {
                          inputChangedHandler(event, formElement.id);
                        } else {
                          inputChangedHandler(event, formElement.id, event);
                        }
                      }}
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
