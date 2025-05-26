import { FilterOutlined } from '@ant-design/icons';
import useFormHook from '@Shared/FormHook/useFormHook';
import Buttons from '@UIElements/Buttons/Buttons';
import AllInput from '@UIElements/AllInput/AllInput';
import { Button, Col, Drawer, Flex, Row } from 'antd';
import React, { Fragment, useState } from 'react';
import { endTime, startTime } from '@Shared/Utils/utils';

const PaymentFilterDrawer = ({ setFilterBy }) => {
  const [open, setOpen] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const initialFormState = {
    payment_expiry_from: {
      elementType: 'datepicker',
      elememtConfig: { placeholder: 'Payment Expiry From', arialabel: null },
      validations: { errorM: null, valid: true },
      validators: { required: false },
      touched: false,
      value: '',
      disabled: false,
    },
    payment_expiry_to: {
      elementType: 'datepicker',
      elememtConfig: { placeholder: 'Payment Expiry To', arialabel: null },
      validations: { errorM: null, valid: true },
      validators: { required: false },
      touched: false,
      value: '',
      disabled: false,
    },
  };

  const { isFormValid, formElementArray, setFormValues, inputChangedHandler, getNonEmptyValuesFromFormState, resetFormValues } = useFormHook(initialFormState);

  const onApplyFilter = () => {
    const filterValues = getNonEmptyValuesFromFormState();

    if (filterValues.payment_expiry_from) {
      const startDate = startTime(filterValues.payment_expiry_from);
      filterValues.payment_expiry_from = startDate;
    }
    if (filterValues.payment_expiry_to) {
      const endDate = endTime(filterValues.payment_expiry_to);
      filterValues.payment_expiry_to = endDate;
    }

    setFilterBy(filterValues);
    onClose();
  };

  const onResetFilter = () => {
    resetFormValues();
    setFilterBy(null);
    onClose();
  };

  return (
    <Fragment>
      <Button onClick={showDrawer} icon={<FilterOutlined />} style={{ width: 120 }}>
        Filter
      </Button>
      <Drawer title="Filter" onClose={onClose} open={open} width={300}>
        <Flex vertical style={{ height: '100%' }} gap={24}>
          <div style={{ flex: 1 }}>
            {!isFormLoading ? (
              <Row gutter={[12, 12]}>
                {formElementArray.slice(0, 2).map((formElement, index) => (
                  <Col span={24} key={index}>
                    <AllInput
                      key={formElement.id}
                      elementType={formElement.config.elementType}
                      elememtConfig={formElement.config.elememtConfig}
                      inputVariable={formElement.config.value}
                      validations={formElement.config.validations}
                      touched={formElement.config.touched}
                      sbVal={formElement.config.ccValue}
                      onChangedInput={(event) => {
                        inputChangedHandler(event, formElement.id, event);
                      }}
                      isRequired={formElement?.config?.validators?.required}
                    />
                  </Col>
                ))}
              </Row>
            ) : null}
          </div>
          <Flex justify="flex-end" gap={10}>
            <Buttons w={118} btntext={'Reset Filter'} onClickFunc={onResetFilter} btntyp={'cancel-btn'} />
            <Buttons disabled={!isFormValid} btntext={'Filter'} onClickFunc={onApplyFilter} btntyp={'colored-btn'} btnColor={'#8A7CFF'} w={75} />
          </Flex>
        </Flex>
      </Drawer>
    </Fragment>
  );
};

export default PaymentFilterDrawer;
