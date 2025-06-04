import * as React from "react";

const MOBILE_BREAKPOINT = 768;

// Context para compartilhar o estado de mobile entre componentes
interface MobileContextProps {
  isMobile: boolean;
}

const MobileContext = React.createContext<MobileContextProps | null>(null);

// Provider para ser usado no root da aplicação
export function MobileProvider({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = React.useState<boolean>(() => {
    // Inicialização com fallback para SSR
    if (typeof window === "undefined") return false;
    return window.innerWidth < MOBILE_BREAKPOINT;
  });

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    const onChange = () => {
      const newIsMobile = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile((current) => {
        // Só atualiza se realmente mudou para evitar re-renders desnecessários
        if (current !== newIsMobile) {
          return newIsMobile;
        }
        return current;
      });
    };

    mql.addEventListener("change", onChange);

    // Verificação inicial
    onChange();

    return () => mql.removeEventListener("change", onChange);
  }, []);

  const contextValue = React.useMemo(() => ({ isMobile }), [isMobile]);

  return (
    <MobileContext.Provider value={contextValue}>
      {children}
    </MobileContext.Provider>
  );
}

// Hook otimizado que usa o contexto
export function useIsMobile() {
  const context = React.useContext(MobileContext);

  // Hook fallback sempre chamado para manter consistência
  const fallbackValue = useIsMobileFallback();

  // Retorna o valor do contexto se disponível, senão o fallback
  return context ? context.isMobile : fallbackValue;
}

// Hook fallback original (memoizado)
function useIsMobileFallback() {
  const [isMobile, setIsMobile] = React.useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < MOBILE_BREAKPOINT;
  });

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    const onChange = () => {
      const newIsMobile = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile((current) =>
        current !== newIsMobile ? newIsMobile : current
      );
    };

    mql.addEventListener("change", onChange);
    onChange();

    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}
