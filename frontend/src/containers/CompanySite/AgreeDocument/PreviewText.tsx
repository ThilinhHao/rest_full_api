import React from 'react';
import { SpaceBase } from 'styles';
import { DocumentWrapper, PreviewTextWrapper } from './agreeDocumentStyle';

export const PreviewText = ({ title, content }: { title: string; content: string }) => {
  return (
    <DocumentWrapper padding="0 0.5rem">
      <PreviewTextWrapper>
        <span className="title">{title}</span>
        <SpaceBase height={1} />
        <div className="content">{content}</div>
      </PreviewTextWrapper>
    </DocumentWrapper>
  );
};
