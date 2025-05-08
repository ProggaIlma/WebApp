import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NavContext } from '@Shared/NavContexts/nav-contexts';
import { Layout, Flex, Col, Row, theme, Card, Typography, Modal } from 'antd';
import LineDescriptionTable from './LineDescriptionTable';
import HomePageLoader from '@UIElements/HomePageLoader/HomePageLoader';
import Buttons from '@UIElements/Buttons/Buttons';
import { useNavigate } from 'react-router-dom';
import AllInput from '@UIElements/AllInput/AllInput';
import useFormHook from '@Shared/FormHook/useFormHook';
import { subscriptionApi } from '@Shared/APIUrls';
import { ExclamationCircleFilled } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useAxiosInstance } from '@Shared/axiosInstance/useAxiosInstance';
import { useNotification } from '@UIElements/CNotification/useNotification';
const { confirm } = Modal;
const { Text } = Typography;
const { Content } = Layout;

const ViewSubscription = () => {
  const navigate = useNavigate();
  const { mode, id } = useParams();
  const { setIconsLevel, setSettingsBarLevel, setHeaderTitle } = useContext(NavContext);
  const [value, setValue] = useState('');
  const { axiosInstance } = useAxiosInstance();
  const { api, contextHolder, openNotificationWithIcon } = useNotification();
  const [subscriptionData, setsubscriptionData] = useState('');
  const [isSavingData, setIsSavingData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const theToolbars = [['bold'], [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }]];
  const theFormats = ['bold', 'list', 'bullet', 'indent'];
  const [dataSource, setDataSource] = useState([
    {
      key: '0',
      subs_line_desc: 'Edward King 0',
    },
    {
      key: '1',
      subs_line_desc: 'Edward King 1',
    }
  ]);
  useEffect(() => {
   mode=='view'? setHeaderTitle('View Subscription'):setHeaderTitle('Edit Subscription');
  }, []);

  const [status, setstatus] = useState([
    { label: 'Active', value: 'ACTIVE', disabled: false },
    { label: 'Inactive', value: 'INACTIVE', disabled: false },
  ]);
  const initialFormState = {
    subs_plan_name: {
      elementType: 'textInput',
      elememtConfig: {
        placeholder: 'Subscription Name',
        arialabel: null,
      },
      validations: {
        errorM: null,
        valid: false,
      },
      validators: {
        required: true,
      },
      touched: false,
      value: '',
    },
    subs_plan_monthly_price: {
      elementType: 'priceInput',
      elememtConfig: {
        placeholder: 'Monthly Price',
        arialabel: null,
      },
      validations: {
        errorM: null,
        valid: false,
      },
      validators: {
        required: true,
      },
      touched: false,
      value: '',
    },
    subs_plan_monthly_discount: {
      elementType: 'priceInput',
      elememtConfig: {
        placeholder: 'Monthly Discounted Price',
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
    subs_plan_yearly_price: {
      elementType: 'priceInput',
      elememtConfig: {
        placeholder: 'Yearly Price',
        arialabel: null,
      },
      validations: {
        errorM: null,
        valid: false,
      },
      validators: {
        required: true,
      },
      touched: false,
      value: '',
    },
    subs_plan_yearly_discount: {
      elementType: 'priceInput',
      elememtConfig: {
        placeholder: 'Yearly Discounted Price',
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
    subs_plan_status: {
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
        required: true,
      },
      touched: false,
      value: '',
    },
    subs_plan_short_desc: {
      elementType: 'textInput',
      elememtConfig: {
        placeholder: 'Short Description',
        arialabel: null,
      },
      validations: {
        errorM: null,
        valid: false,
      },
      validators: {
        required: true,
      },
      touched: false,
      value: '',
    },

    subs_free_ai_msg: {
      elementType: 'numberInput',
      elememtConfig: {
        placeholder: 'Free AI messages',
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
    subs_free_wa_msg: {
      elementType: 'numberInput',
      elememtConfig: {
        placeholder: 'Free WhatsApp messages',
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
    subs_user_limit: {
      elementType: 'numberInput',
      elememtConfig: {
        placeholder: 'User Limit',
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
      title: 'Do you want to save this subscription?',
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


      vals.subs_line_desc = dataSource;
      vals.subs_plan_long_desc = value;

      axiosInstance({
        url: subscriptionApi + '/' + id,
        method: 'PATCH',
        data: vals,
      })
        .then((response) => {
          openNotificationWithIcon('success', null,response?.data?.message|| 'Sucessfully saved data!');
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
        url: subscriptionApi + '/' + id,
        method: 'GET',
      })
        .then((res) => {
          setFetchedDataInForm(res.data);
          setsubscriptionData(res?.data);
          if(res?.data?.subs_line_desc){
            res?.data?.subs_line_desc.map((item, index) => {
              item.key = index+1;
            })
          }
          setDataSource(res?.data?.subs_line_desc);          
          setValue(res?.data?.subs_plan_long_desc);
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
              navigate('/subscription-layout/subscription');
            }}
            key={3333}
          />
          {mode == 'edit' && <Buttons btntyp="colored-btn" disabled={!isFormValid || dataSource.length==0 ||  value == "<p><br></p>" || value == ""} onClickFunc={onClickSave}
          btntext="Save" w={80} btnColor="#8A7CFF" key={122} />}{' '}
        </Flex>
        <Card width={100} style={{ height: 'auto', margin: '30px' }}>
          {isLoading ? (
            <HomePageLoader />
          ) : (
            <Row gutter={[16, 0]} style={{ width: '100%', margin: 'auto' }}>
              {formElementArray.slice(0, 6).map((formElement, index) => (
                <Col xs={24} sm={24} md={8} key={index + 'ddee'}>
                  <Row justify="center" style={{ marginTop: '13px' }}>
                    <AllInput
                      key={formElement.id}
                      elementType={formElement.config.elementType}
                      elememtConfig={formElement.config.elememtConfig}
                      inputVariable={formElement.config.value}
                      validations={formElement.config.validations}
                      touched={formElement.config.touched}
                     disabled={mode=='view'}
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
              {formElementArray.slice(6, 7).map((formElement, index) => (
                <Col xs={24} sm={24} md={24} key={index + 'dd'}>
                  <Row justify="center" style={{ marginTop: '13px' }}>
                    <AllInput
                      key={formElement.id}
                      elementType={formElement.config.elementType}
                      elememtConfig={formElement.config.elememtConfig}
                      inputVariable={formElement.config.value}
                      validations={formElement.config.validations}
                      touched={formElement.config.touched}
                     disabled={mode=='view'}
                      onChangedInput={(event) => {
                          inputChangedHandler(event, formElement.id);
                      
                      }}
                      isRequired={formElement?.config?.validators?.required}
                    />
                  </Row>
                </Col>
              ))}
              <div style={{ width: '100%', height: '250px', padding: '10px' }}>
                <Text style={{ fontWeight: '600', fontSize: '14px', color: '#101828', marginBottom: '10px' }}>Plan Description *</Text>
                <ReactQuill
                  value={value}
                  readOnly={mode == 'view'}
                  onChange={(html) =>{
                     setValue(html);
                     console.log(html);
                     
                    console.log(!value);
                    
                    }}
                  modules={{ toolbar: theToolbars }}
                  formats={theFormats}
                  className={`custom-quill-editor ${mode == 'view' ? `onView` : `onNonView`}`}
                  style={
                    mode == 'view'
                      ? { color: 'rgba(0, 0, 0, 0.38)', backgroundColor: 'white', width: '100%', height: '85%', padding: '0px', marginTop: '10px' }
                      : { backgroundColor: 'white', width: '100%', height: '85%', color: 'black', borderRadius: '10px', padding: '0px', marginTop: '10px' }
                  }
                />
              </div>

              <LineDescriptionTable dataSource={dataSource} setDataSource={setDataSource} mode={mode}/>
              {formElementArray.slice(7, 10).map((formElement, index) => (
                <Col xs={24} sm={24} md={8} key={index + 'dd'}>
                  <Row justify="center" style={{ marginTop: '13px' }}>
                    <AllInput
                      key={formElement.id}
                      elementType={formElement.config.elementType}
                      elememtConfig={formElement.config.elememtConfig}
                      inputVariable={formElement.config.value}
                      validations={formElement.config.validations}
                      touched={formElement.config.touched}
                     disabled={mode=='view'}
                      onChangedInput={(event) => {
                       
                          inputChangedHandler(event, formElement.id,event);
                        
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
export default ViewSubscription;
