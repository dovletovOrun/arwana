import { useEffect, useState } from "react";

export default function useBound(ref, addPx) {
  const [isOnScreen, setIsOnScreen] = useState(false);
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const topPosition = ref.current.getBoundingClientRect().top;
    const onScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;

      if (topPosition + addPx < scrollPosition) {
        setIsOnScreen(true);
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return isOnScreen;
}
