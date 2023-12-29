import React from 'react';
import OtpInput from 'react-otp-input';
import { Input } from './OTPInputStyle';

const OTPInput = ({ ...props }: any) => {
  const width = window.innerWidth < 380 ? '1rem' : '2.5rem';
  const height = window.innerWidth < 380 ? '1.5rem' : '2.5rem';

  return (
    <OtpInput
      {...props}
      inputStyle={{
        width: width,
        height: height,
        borderRadius: '100px',
        borderWidth: '0',
        background: '#F2FDF8',
        boxShadow: 'inset 0px 0px 0.25rem 0.063rem rgba(0, 0, 0, 0.25)',
      }}
      containerStyle={{ justifyContent: 'space-between' }}
      inputType="tel"
      numInputs={6}
      renderInput={(props) => <Input {...props} />}
    />
  );
};

export default OTPInput;
