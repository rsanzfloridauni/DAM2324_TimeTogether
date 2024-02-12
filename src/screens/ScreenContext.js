import { createContext, useState } from 'react';

const ScreensContext = createContext();

export const ScreensProvider = ({ children }) => {
    const [userData, setUserData] = useState("");

  return (
    <ScreensContext.Provider value={{ userData, setUserData }}>
      {children}
    </ScreensContext.Provider>
  );
};

export default ScreensContext;
