import { createContext, useState } from 'react';

// Crear un contexto para compartir estado entre componentes
const ScreensContext = createContext();

/**
 * Proveedor de contexto para manejar el estado compartido entre componentes.
 * @param {Object} props - Propiedades del proveedor de contexto.
 * @param {ReactNode} props.children - Componentes hijos envueltos por el proveedor de contexto.
 * @returns {JSX.Element} Proveedor de contexto JSX.
 */
export const ScreensProvider = ({ children }) => {
  // Estado compartido que se proporcionará a los componentes hijos
  const [userData, setUserData] = useState("");
  const [language, setLanguage] = useState('en');

  // Proporcionar el estado y las funciones a los componentes hijos a través del contexto
  return (
    <ScreensContext.Provider value={{ userData, setUserData, language, setLanguage }}>
      {children}
    </ScreensContext.Provider>
  );
};

export default ScreensContext;
