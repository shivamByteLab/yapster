'use client'
import { createContext, ReactNode, useContext, useState } from "react";

// Define the context value type
interface HideContextType {
  isHidden: boolean;
  setIsHidden: (value: boolean) => void;
  showOptions:boolean;
  setShowOptions: (value: boolean) => void;
}

// Create the context with an initial value of `null`
const HideContext = createContext<HideContextType | null>(null);

// Provider component
export const HideProvider = ({ children }: { children: ReactNode }) => {
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [showOptions, setShowOptions] = useState(false);

 
  return (
    <HideContext.Provider value={{ isHidden, setIsHidden,setShowOptions,showOptions}}>
      {children}
    </HideContext.Provider>
  );
};

// Custom hook to use the HideContext
export const useHide = (): HideContextType => {
  const context = useContext(HideContext);

  if (!context) {
    throw new Error("useHide must be used within a HideProvider");
  }

  return context;
};
