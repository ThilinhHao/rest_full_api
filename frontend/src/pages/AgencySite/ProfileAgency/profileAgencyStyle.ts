import { colors } from 'constants/colorsBase';
import styled from 'styled-components';

export const ContentWrapper = styled.div`
  width: 71.125rem;
  margin-left: 10.375rem;
  margin-top: 3.375rem;
`;
export const TitleAgencyName = styled.div`
  font-size: 2.188rem;
  margin-left: 2rem;
`;
export const UpdateContainer = styled.div`
  font-size: 0.938rem;
  color: ${colors.romance};
  position: absolute;
  right: 1rem;
  top: 5.5rem;
  display: flex;
  flex-direction: row;
`;
export const ContainerProfile = styled.div`
  width: 100%;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
export const ITemMarkEditProfileAgency = styled.span`
  color: #f65171;
  margin-top: 1.5rem;
  margin-left: 0.5rem;
  font-weight: 500;
  font-size: 1rem !important;
`;
