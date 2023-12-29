import { isMobile } from 'react-device-detect';

function useWindowSize() {
  return { isMobile };
}

export default useWindowSize;
