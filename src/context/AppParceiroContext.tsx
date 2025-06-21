"use client";

import { ReactNode, createContext, useEffect, useState } from "react";
import { IParceiro } from "@/types/Parceiro";
import { useApiParceiro } from "@/api/UseParceiroApi";

interface IAppParceiroContext {
  parceiro?: IParceiro;
}

interface IAppParceiroProvider {
  children: ReactNode;
}

export const AppParceiroContext = createContext({} as IAppParceiroContext);

export function AppParceiroProvider(props: IAppParceiroProvider) {
  const { obter } = useApiParceiro();
  const [parceiro, setParceiro] = useState<IParceiro | undefined>();

  async function init() {
    const response = await obter.fetch();
    if (response) {
      setParceiro(response);
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <AppParceiroContext.Provider
      value={{
        parceiro,
      }}
    >
      {props.children}
    </AppParceiroContext.Provider>
  );
}
