import { useEffect, useState } from "react";

export const GetWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0
  });

  /* サイズを再取得 */
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width:
          window.innerWidth,
        height: window.innerHeight,
      });
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    } else { return; }
  }, []);

  return windowSize;
};