import styled from 'styled-components';

export const FileViewer = styled.div<any>`
  width: ${(props) => props?.width || '52rem'};
  height: ${(props) => props?.height || '31.25rem'};
  min-height: ${(props) => props?.minHeight || '31.25rem'};
  display: flex;
  justify-content: center;
  overflow-y: auto;
  overflow-x: ${(props) => (props?.height ? 'hidden' : 'auto')};
  ::-webkit-scrollbar {
    width: 0.375rem;
  }
  .react-pdf__Document {
    width: ${(props) =>
      props?.width
        ? props?.width?.includes('%')
          ? `calc(${props?.width})`
          : `calc(${props?.width} - 2rem)`
        : '50rem'} !important;
    height: ${(props) => (props?.width ? `calc(${props?.width} * 842 / 595)` : '70.8rem')} !important;
    .react-pdf__Page {
      .react-pdf__Page__svg {
        width: ${(props) => (props?.width ? `calc(${props?.width})` : '77.75rem')} !important;
        height: ${(props) => (props?.width ? `calc(${props?.width} * 871 / 673)` : '103rem')} !important;
        svg {
          width: ${(props) => (props?.width ? `calc(${props?.width})` : '77.75rem')} !important;
          height: ${(props) => (props?.width ? `calc(${props?.width} * 871 / 673)` : '103rem')} !important;
        }
      }
      .react-pdf__Page__canvas {
        border: 0.063rem solid #aaa;
        box-shadow: rgba(0, 0, 0, 0.16) 0 0.188rem 0.375rem;
        margin: 0 0.313rem 0.313rem 0.313rem;
        width: ${(props) =>
          props?.width
            ? props?.width?.includes('%')
              ? `calc(${props?.width})`
              : `calc(${props?.width} - 2rem)`
            : '50rem'} !important;
        height: ${(props) => (props?.width ? `calc(${props?.width} * 842 / 595)` : '69.8rem')} !important;
      }
    }
    .react-pdf__Page__textContent.textLayer,
    .react-pdf__Page__annotations.annotationLayer {
      display: none;
    }
  }
`;

export const DocumentViewer = styled.div<any>`
  width: ${(props) => props?.width || '12.25rem'};
  height: ${(props) => props?.height || '16.25rem'};
  min-height: ${(props) => props?.minHeight || '16.25rem'};
  display: flex;
  justify-content: center;
  overflow: hidden;
  border-radius: 0.375rem;
  border: 0.063rem solid #333333;
  .react-pdf__Document {
    border-radius: 0.375rem;
    width: ${(props) => (props?.width ? `calc(${props?.width})` : '12.25rem')} !important;
    height: ${(props) => (props?.width ? `calc(${props?.width} * 842 / 595)` : '16.25rem')} !important;
    .react-pdf__Page {
      border-radius: 0.375rem;
      .react-pdf__Page__svg {
        border-radius: 0.375rem;
        width: ${(props) => (props?.width ? `calc(${props?.width})` : '77.75rem')} !important;
        height: ${(props) => (props?.width ? `calc(${props?.width} * 871 / 673)` : '103rem')} !important;
        svg {
          border-radius: 0.375rem;
          width: ${(props) => (props?.width ? `calc(${props?.width})` : '77.75rem')} !important;
          height: ${(props) => (props?.width ? `calc(${props?.width} * 871 / 673)` : '103rem')} !important;
        }
      }
      .react-pdf__Page__canvas {
        width: ${(props) => (props?.width ? `calc(${props?.width})` : '12.25rem')} !important;
        height: ${(props) => (props?.width ? `calc(${props?.width} * 842 / 595)` : '16.25rem')} !important;
      }
    }
    .react-pdf__Page__textContent.textLayer,
    .react-pdf__Page__annotations.annotationLayer {
      display: none;
    }
  }
`;
