import { useWidth } from './useWidth';
import { useEffect, useState } from 'react';

export function useIsMobile() {
  const width = useWidth();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    if (!isMobile && width && width < 600) {
      setIsMobile(true);
    }
    if (isMobile && width && width > 600) {
      setIsMobile(false);
    }
  }, [width, isMobile]);

  return isMobile;
}
