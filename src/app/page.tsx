'use client';

import { useBannerApi } from '@/api/UseBannerApi';
import { BoxApp } from '@/components/Box/BoxApp';
import { useApi } from '@/hooks/UseApi';
import { useThemeApp } from '@/hooks/UseThemeApp';
import { ICategoria } from '@/types/Categoria';
import { BannerView } from '@/view/home/BannerView';
import { CategoriaView } from '@/view/home/CategoriaView';
import { useEffect, useState } from 'react';

export default function Home() {
  const apiBanner = useBannerApi();
  const [categorias, setCategorias] = useState<ICategoria[]>([]);
  const apiListCategorias = useApi({
    method: 'GET',
    url: 'ecommerce/categorias/home',
    statusInicial: 'loading',
  });
  const { backgroundColor } = useThemeApp();

  async function init() {
    const response = await apiListCategorias.action<ICategoria[]>();
    setCategorias(response || []);
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <BoxApp height="100%" backgroundColor={backgroundColor.default}>
      <BannerView banners={apiBanner.banners} status={apiBanner.status} />
      <CategoriaView categorias={categorias} />
    </BoxApp>
  );
}
