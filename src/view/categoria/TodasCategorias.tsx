"use client";

import { useListarCategoriasApi } from "@/api/UseListarCategoriasApi";
import { BoxApp } from "@/components/Box/BoxApp";
import { Button } from "@/components/Button/ButtonApp";
import { DividerApp } from "@/components/Divider/DividerApp";
import { GridApp } from "@/components/Grid/GridApp";
import { LoadingApp } from "@/components/Loading/LoadingApp";
import { TextApp } from "@/components/Text/TextApp";
import { rotas } from "@/config/ConfigRotas";
import { listaDeIcones } from "@/config/ListaDeIcones";
import { useNavigateApp } from "@/hooks/UseNavigateApp";
import { useThemeApp } from "@/hooks/UseThemeApp";

export function TodasCategorias() {
  const { shadow, borderRadius, backgroundColor } = useThemeApp();
  const { categorias, status } = useListarCategoriasApi();
  const { navigate } = useNavigateApp();

  if (status === "loading") {
    return <LoadingApp height="350px" />;
  }

  return (
    <BoxApp width="100vw" maxWidth="750px">
      <GridApp container spacing={3} width="100%" padding="1rem">
        {categorias.map((categoria) => (
          <GridApp width="100%" key={categoria.id} sm={6} xs={12}>
            <BoxApp
              width="100%"
              backgroundColor={backgroundColor.default}
              borderRadius={borderRadius}
              boxShadow={shadow}
              padding="1rem"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              gap="1rem"
            >
              <TextApp
                titulo={categoria.descricao}
                fontSize="18px"
                fontWeight={600}
              />
              <DividerApp width="100%" />
              <Button
                title="Produtos desta categoria"
                variant="outlined"
                endIcon={listaDeIcones.flechaDireita}
                onClick={() => navigate(`${rotas.categoria}/${categoria.id}`)}
              />
            </BoxApp>
          </GridApp>
        ))}
      </GridApp>
    </BoxApp>
  );
}
