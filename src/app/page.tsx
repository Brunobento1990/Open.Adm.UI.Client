"use client";

import { useBannerApi } from "@/api/UseBannerApi";
import { useListarCategoriasApi } from "@/api/UseListarCategoriasApi";
import { BoxApp } from "@/components/Box/BoxApp";
import { useThemeApp } from "@/hooks/UseThemeApp";
import { BannerView } from "@/view/home/BannerView";
import { CategoriaView } from "@/view/home/CategoriaView";

export default function Home() {
  const apiBanner = useBannerApi();
  const { categorias } = useListarCategoriasApi();
  const { backgroundColor } = useThemeApp();

  return (
    <BoxApp height="100%" backgroundColor={backgroundColor.default}>
      <BannerView banners={apiBanner.banners} status={apiBanner.status} />
      <CategoriaView categorias={categorias} />
    </BoxApp>
  );
}
