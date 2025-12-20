import { useState, useEffect } from "react";

export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isMobDevice = /Mobi|Android/i.test(navigator.userAgent);
      if (isMobDevice || window.innerWidth <= breakpoint) {
        setIsMobile(true);
        return;
      }
      setIsMobile(false);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, [breakpoint]);

  return isMobile;
}
