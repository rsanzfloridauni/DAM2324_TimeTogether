import { createContext, useState } from 'react';

const ScreensContext = createContext();

export const ScreensProvider = ({ children }) => {
    const [userData, setUserData] = useState("");
    const [language, setLanguage] = useState('en');

  return (
    <ScreensContext.Provider value={{ userData, setUserData, language, setLanguage }}>
      {children}
    </ScreensContext.Provider>
  );
};

export default ScreensContext;
