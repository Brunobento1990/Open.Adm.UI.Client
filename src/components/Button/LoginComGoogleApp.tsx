'use client';

import { useLoginApi } from '@/api/UseLoginApi';
import { useContext, useEffect, useRef, useState } from 'react';
import { rotas } from '@/config/ConfigRotas';
import { useNavigateApp } from '@/hooks/UseNavigateApp';
import { AppAuthContext } from '@/context/AppAuthContext';
import { LoadingApp } from '../Loading/LoadingApp';

export default function GoogleLogin() {
  const { loginComGoogle } = useLoginApi();
  const { navigate } = useNavigateApp();
  const { logar } = useContext(AppAuthContext);
  const googleBtnRef = useRef<HTMLDivElement>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const w = window as any;
    if (scriptLoaded && w.google && googleBtnRef.current) {
      w.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: async (response: any) => {
          const responseLogin = await loginComGoogle.fetch(response?.credential);
          if (responseLogin) {
            logar(responseLogin);
            navigate(rotas.home);
            return;
          }
        },
      });

      w.google.accounts.id.renderButton(googleBtnRef.current, {
        theme: 'outline',
        size: 'large',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scriptLoaded]);

  return (
    <>
      {loginComGoogle.status === 'loading' ? (
        <LoadingApp flexDirection="row" size={25} texto="Login com google..." />
      ) : (
        <div style={{ width: '100%' }} ref={googleBtnRef} />
      )}
    </>
  );
}
