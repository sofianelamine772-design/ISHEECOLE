import React, { createContext, useContext, useState } from 'react';

const InscriptionContext = createContext(null);

export function InscriptionProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const openInscription = () => setIsOpen(true);
  const closeInscription = () => setIsOpen(false);

  return (
    <InscriptionContext.Provider value={{ isOpen, openInscription, closeInscription }}>
      {children}
    </InscriptionContext.Provider>
  );
}

export function useInscription() {
  return useContext(InscriptionContext);
}
