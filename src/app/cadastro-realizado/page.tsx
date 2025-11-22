"use client";

import { BoxApp } from "@/components/Box/BoxApp";
import { TextApp } from "@/components/Text/TextApp";
import { IconApp } from "@/components/Icon/IconApp";
import { useThemeApp } from "@/hooks/UseThemeApp";
import { Paper, Stack } from "@mui/material";

export default function CadastroRealizado() {
  const { backgroundColor, cores } = useThemeApp();

  return (
    <BoxApp
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      padding="20px"
    >
      <Paper
        elevation={3}
        sx={{
          p: { xs: 3, sm: 5 },
          borderRadius: 3,
          textAlign: "center",
          maxWidth: 600,
          width: "100%",
        }}
      >
        <Stack spacing={3} alignItems="center">
          {/* Ícone principal com animação */}
          <BoxApp
            width="80px"
            height="80px"
            borderRadius="50%"
            backgroundColor="#4caf5020"
            display="flex"
            alignItems="center"
            justifyContent="center"
            animation="pulse 2s ease-in-out infinite"
          >
            <IconApp
              icon="mdi:check-circle"
              width="50px"
              style={{ color: "#4caf50" }}
            />
          </BoxApp>

          {/* Título */}
          <TextApp
            titulo="Cadastro recebido! 🎉"
            fontSize="32px"
            fontWeight={700}
            color="#4caf50"
            textAlign="center"
          />

          {/* Mensagem principal */}
          <TextApp
            titulo="Agora precisamos apenas validar suas informações. Assim que sua conta for liberada pela nossa equipe, você poderá fazer suas compras."
            fontSize="16px"
            color={cores.text.secondary}
            textAlign="center"
            marginTop="8px"
          />

          <TextApp
            titulo="Te avisaremos por e-mail quando estiver tudo pronto!"
            fontSize="16px"
            fontWeight={600}
            color={cores.text.primary}
            textAlign="center"
          />

          {/* Cards de informação */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ width: "100%", mt: 3 }}
          >
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                flex: 1,
                borderRadius: 2,
                backgroundColor: backgroundColor.default,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
              }}
            >
              <IconApp
                icon="mdi:timer-sand"
                width="40px"
                style={{ color: "#2196f3" }}
              />
              <TextApp
                titulo="Em análise"
                fontSize="14px"
                fontWeight={700}
                color={cores.text.primary}
              />
              <TextApp
                titulo="Validando dados"
                fontSize="12px"
                color={cores.text.secondary}
              />
            </Paper>

            <Paper
              variant="outlined"
              sx={{
                p: 2,
                flex: 1,
                borderRadius: 2,
                backgroundColor: backgroundColor.default,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
              }}
            >
              <IconApp
                icon="mdi:email-outline"
                width="40px"
                style={{ color: "#ff9800" }}
              />
              <TextApp
                titulo="Fique atento"
                fontSize="14px"
                fontWeight={700}
                color={cores.text.primary}
              />
              <TextApp
                titulo="Avisaremos por e-mail"
                fontSize="12px"
                color={cores.text.secondary}
              />
            </Paper>
          </Stack>

          {/* Mensagem final */}
          <BoxApp
            marginTop="16px"
            padding="16px"
            backgroundColor="#2196f320"
            borderRadius="8px"
            width="100%"
            display="flex"
            alignItems="center"
            gap="8px"
          >
            <IconApp
              icon="mdi:lightbulb-on-outline"
              width="24px"
              style={{ color: "#2196f3", flexShrink: 0 }}
            />
            <TextApp
              titulo="Dica: Verifique sua caixa de entrada e spam para não perder nossa confirmação!"
              fontSize="14px"
              color="#2196f3"
              textAlign="left"
            />
          </BoxApp>
        </Stack>

        <style jsx>{`
          @keyframes pulse {
            0%,
            100% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.05);
              opacity: 0.9;
            }
          }
        `}</style>
      </Paper>
    </BoxApp>
  );
}