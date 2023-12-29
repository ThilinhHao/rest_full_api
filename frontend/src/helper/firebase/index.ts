import configs from 'config';
import { USER_ROLE_COMPANY, USER_ROLE_OPERATOR } from 'constants/User';

export const getEmailFirebase = (email?: string, userRole?: number) => {
  if (!email || !userRole) return;
  if (userRole === USER_ROLE_OPERATOR) return 'operator.' + email;
  else if (userRole === USER_ROLE_COMPANY) return 'company.' + email;
  else return;
};

export const getPasswordFirebase = (email?: string, userRole?: number) => {
  if (!email || !userRole) return;
  if (userRole === USER_ROLE_OPERATOR) return btoa('operator.' + email + configs.REACT_APP_FIREBASE_PROJECT_ID);
  else if (userRole === USER_ROLE_COMPANY) return btoa('company.' + email + configs.REACT_APP_FIREBASE_PROJECT_ID);
  else return;
};
