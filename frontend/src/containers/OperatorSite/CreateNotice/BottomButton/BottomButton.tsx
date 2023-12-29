import React from 'react';
import { BottomButtonWrapper, BtnLeft, BtnRight } from './bottomButtonStyle';

interface IBottomButton {
  leftText: string;
  rightText: string;
  isLoading?: boolean;
  rightColor?: string;
  onClickLeft: () => void;
  onClickRight: () => void;
}
const BottomButton = ({ isLoading, onClickLeft, onClickRight, leftText, rightText, rightColor }: IBottomButton) => {
  return (
    <BottomButtonWrapper>
      <BtnLeft isloading={isLoading ? 'true' : ''} onClick={onClickLeft}>
        {leftText}
      </BtnLeft>
      <BtnRight isloading={isLoading ? 'true' : ''} onClick={onClickRight} color={rightColor}>
        {rightText}
      </BtnRight>
    </BottomButtonWrapper>
  );
};

export default BottomButton;
