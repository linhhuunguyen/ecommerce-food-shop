import React, { Fragment } from 'react';
import { Typography, Stepper, StepLabel, Step } from '@material-ui/core';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import './CheckoutSteps.css';

interface CheckoutStepsProps {
  activeStep: number;
}

const CheckoutSteps = ({ activeStep }: CheckoutStepsProps) => {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <LocalShippingIcon />
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <LibraryAddCheckIcon />
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <AccountBalanceIcon />
    }
  ];

  const stepStyles = {
    boxSizing: 'border-box'
  };

  return (
    <>
      <Stepper alternativeLabel activeStep={activeStep} className="mb-6">
        {steps.map((item, index) => (
          <Step
            key={Math.random()}
            active={activeStep === index}
            completed={activeStep >= index}
          >
            <StepLabel
              style={{
                color: activeStep >= index ? 'tomato' : 'rgba(0, 0, 0, 0.649)'
              }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </>
  );
};

export default CheckoutSteps;
