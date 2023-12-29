/* eslint-disable no-useless-escape */
export const validateEmail = (mail: string) => {
  if (/^([a-zA-Z0-9])+([a-zA-Z0-9+_.-]*)+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})$/.test(mail.trim())) {
    return false;
  }
  return true;
};
