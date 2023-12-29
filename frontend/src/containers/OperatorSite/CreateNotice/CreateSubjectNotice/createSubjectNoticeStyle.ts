import { Button, Space } from 'antd';
import { colors } from 'constants/colorsBase';
import styled from 'styled-components';

export const CreateSubjectNoticeWrapper = styled(Space)`
  margin-top: 0.5rem;
  width: 79.313rem;
  padding-bottom: 0.5rem;
  padding-left: 3rem;
  border-bottom: 0.5px solid ${colors.lineColor};
  margin-left: 4rem;
  display: flex;
  align-items: start;
`;
export const ErrorMessage = styled.div`
  margin-top: -0.4rem;
  width: 35.5rem;
  color: ${colors.tomato};
  font-size: 0.875rem;
  margin-left: 0.5rem;
  transition: 0.2s;
  &:empty {
    height: 0;
  }
  &:not(:empty) {
    height: 0.6rem;
    margin-bottom: 0.3rem;
  }
`;
export const SubjectItemsWrapper = styled.div`
  display: flex;
  align-items: center;
`;
export const TitleCreateNoticeSubject = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  margin-right: 3.5rem;
  margin-top: 0.5rem;
  white-space: nowrap;
`;
interface ISubject {
  selected: boolean;
}
export const Subject = styled(Button)<ISubject>`
  width: 12.75rem;
  height: 2.5rem;
  margin: 0.5rem 0;
  margin-right: 1rem;
  padding: 0;
  border-radius: 1.25rem;
  font-size: 1.25rem;
  /* border: none; */
  box-shadow: ${(props) => (props?.selected ? 'none' : '0px 0px 3px 1px rgba(0, 0, 0, 0.15)')};
  background-color: ${(props) => (props?.selected ? '#52B788' : 'unset')};
  color: ${(props) => (props?.selected ? 'white !important' : 'unset')};
  :hover {
    background-color: ${(props) => (props?.selected ? '#63cf9c' : 'unset')};
    border: ${(props) => (props?.selected ? 'unset' : '1px solid #e3fff2')};
  }
`;
