import styled from 'styled-components';

export const DailyWorkComponentWrapper = styled.div`
  font-size: 0.875rem;
  width: 30.313rem;
  height: 24.063rem;
  background-color: white;
  border-radius: 0.625rem;
  box-shadow: 0.188rem 0.188rem 0.313rem rgba(0, 0, 0, 0.25);
  margin-left: 1.875rem;
  overflow: hidden;
`;

export const LoadingWrapperDaily = styled.div`
  width: 30.313rem;
  height: 20.4rem;
  border-radius: 0.625rem;
  background-color: rgb(255, 255, 255, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 2;
`;

export const HeaderDailyWork = styled.div`
  width: 100%;
  background-color: #fdab29;
  font-size: 1.625rem;
  height: 3.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: white;
`;
export const CountContainer = styled.div`
  display: flex;
  margin-top: 0.75rem;
  height: 18rem;
  flex-direction: column;
  justify-content: space-around;
  padding: 2rem 0;
`;
export const CountPersonWrapper = styled.div`
  display: flex;
  padding: 0 2rem;
  padding-left: 1rem;
  justify-content: space-between;
  align-items: center;
`;
export const LabelLeft = styled.div`
  font-size: 1.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
`;
export const PersonData = styled.div`
  cursor: pointer;
  font-size: 3.125rem;
  font-weight: 500;
  color: #fdab29;
  text-decoration: underline;
  text-underline-offset: 0.4rem;
  text-decoration-thickness: 0.25rem;
  text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  :hover {
    color: #fd9672;
  }
`;
export const Person = styled.span`
  font-size: 1.875rem;
  font-weight: 400;
`;
export const IconExclamation = styled.img`
  width: 1.563rem;
  height: 1.563rem;
  margin-right: 0.5rem;
`;
export const IconSpace = styled.div`
  width: 1.563rem;
  height: 1.563rem;
  margin-right: 0.5rem;
`;
