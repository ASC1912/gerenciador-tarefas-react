import { useState } from "react";
import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Container,
  LoadingOverlay,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../services/api";

export function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const form = useForm({
    // Credenciais de teste padrão da API DummyJSON
    initialValues: { username: "emilys", password: "emilyspass" },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setIsLoading(true);
    setErrorMsg("");

    try {
      // Consumindo a rota POST /auth/login da DummyJSON
      const response = await api.post("/auth/login", {
        username: values.username,
        password: values.password,
        expiresInMins: 60,
      });

      login(response.data.accessToken);
      navigate("/");
    } catch (error: any) {
      const mensagemErro =
        error.response?.data?.message || "Credenciais inválidas";
      setErrorMsg(mensagemErro);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center">Bem-vindo de volta!</Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md" pos="relative">
        <LoadingOverlay
          visible={isLoading}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Usuário"
            placeholder="Seu nome de usuário"
            required
            {...form.getInputProps("username")}
          />
          <PasswordInput
            label="Senha"
            placeholder="Sua senha"
            required
            mt="md"
            {...form.getInputProps("password")}
          />

          {errorMsg && (
            <Text c="red" size="sm" mt="sm" ta="center">
              {errorMsg}
            </Text>
          )}

          <Button type="submit" fullWidth mt="xl">
            Entrar
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
