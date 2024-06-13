import { useState, useRef, useEffect } from "react";

export const IdleTimer = ({ timeout, onIdle } : any) => {
    const [isIdle, setIsIdle] = useState(false);
    const timer: any = useRef(null);
  
    const resetTimer = () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current  = setTimeout(() => {
        setIsIdle(true);
        onIdle();
      }, timeout);
    };
  
    const handleUserActivity = () => {
      if (isIdle) {
        setIsIdle(false);
      }
      resetTimer();
    };
  
    useEffect(() => {
      const events = ['mousemove', 'keydown', 'scroll', 'touchstart'];
      events.forEach(event => window.addEventListener(event, handleUserActivity));
      resetTimer();
  
      return () => {
        events.forEach(event => window.removeEventListener(event, handleUserActivity));
        if (timer.current) {
          clearTimeout(timer.current);
        }
      };
    }, [timeout]);
  
    return null;
  };