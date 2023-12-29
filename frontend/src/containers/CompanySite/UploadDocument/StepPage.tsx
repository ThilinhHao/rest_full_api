import React from 'react';
import { BlockIcon, CheckIcon } from '@components/Icon';
import { colors } from 'constants/colorsBase';
import { StepDocument, StepPageWrapper } from './uploadDocumentStyle';

interface IPageRejectProps {
  DOCUMENT_STEPS: {
    value: number;
    label: string;
  }[];
  DOCUMENT_STEPS_VALUE: {
    ACCEPT: number;
    UPLOAD: number;
    WAIT_REVIEW: number;
    COMPELE_REVIEW: number;
    DONE: number;
  };
  statusReject: boolean;
  step: number;
}

export const StepPage = ({ DOCUMENT_STEPS, DOCUMENT_STEPS_VALUE, statusReject, step }: IPageRejectProps) => {
  const realStep = step <= DOCUMENT_STEPS_VALUE.UPLOAD ? DOCUMENT_STEPS_VALUE.UPLOAD : step;

  return (
    <StepPageWrapper>
      {Object.keys(DOCUMENT_STEPS).map((item, index) => {
        return (
          <StepDocument
            key={index}
            active={DOCUMENT_STEPS[index]?.value === realStep}
            done={DOCUMENT_STEPS[index]?.value < realStep}
            block={DOCUMENT_STEPS[index]?.value === DOCUMENT_STEPS_VALUE.WAIT_REVIEW && statusReject}
          >
            <div>
              {DOCUMENT_STEPS[index]?.value < realStep ? (
                <CheckIcon width={'2.625rem'} height={'2.063rem'} fill={colors.white} />
              ) : DOCUMENT_STEPS[index]?.value === DOCUMENT_STEPS_VALUE.WAIT_REVIEW && statusReject ? (
                <BlockIcon width={'3.5rem'} height={'3.5rem'} fill={colors.white} />
              ) : (
                DOCUMENT_STEPS[index]?.value
              )}
            </div>
            <div>{DOCUMENT_STEPS[index]?.label}</div>
          </StepDocument>
        );
      })}
    </StepPageWrapper>
  );
};
