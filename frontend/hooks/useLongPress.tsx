import { useState, useRef } from "react";

const useLongPress = (onLongPress: () => void, delay = 500) => {
  const [isPressed, setIsPressed] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const start = () => {
    setIsPressed(true);
    timerRef.current = setTimeout(() => {
      onLongPress();
      setIsPressed(false);
    }, delay);
  };

  const clear = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsPressed(false);
  };

  return {
    onMouseDown: start,
    onMouseUp: clear,
    onMouseLeave: clear,
    onTouchStart: start,
    onTouchEnd: clear,
  };
};

export default useLongPress;
