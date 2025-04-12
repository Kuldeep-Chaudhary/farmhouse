// ScrollContext.tsx
import React, { createContext, useContext, useState } from "react";

const ScrollContext = createContext<{
  isScrollEnabled: boolean;
  enableScroll: () => void;
}>({
  isScrollEnabled: false,
  enableScroll: () => {},
});

export const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isScrollEnabled, setIsScrollEnabled] = useState(false);
  const enableScroll = () => {
    setIsScrollEnabled(true);
    document.body.style.overflow = "auto"; // ✅ This actually re-enables scroll
  };
  

  return (
    <ScrollContext.Provider value={{ isScrollEnabled, enableScroll }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScrollContext = () => useContext(ScrollContext);
