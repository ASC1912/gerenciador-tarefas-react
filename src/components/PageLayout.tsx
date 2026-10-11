import { Outlet, NavLink, Link } from "react-router-dom";
import {
  Container,
  Group,
  Title,
  Button,
  useMantineColorScheme,
} from "@mantine/core";
import { useAuth } from "../contexts/AuthContext";

export function PageLayout() {
  const { toggleColorScheme, colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";
  const { isAuthenticated, logout } = useAuth();

  // Estilo padrão para os NavLinks
  const navStyle = ({ isActive }: { isActive: boolean }) => ({
    fontWeight: isActive ? "bold" : "normal",
    color: isActive ? "#845ef7" : "inherit",
    textDecoration: "none",
  });

  return (
    <Container size="sm" mt="xl">
      <Group justify="space-between" mb="xl">
        <Title order={2}>TaskApp</Title>

        <Group>
          <NavLink to="/" style={navStyle}>
            Início
          </NavLink>

          {isAuthenticated && (
            <Button
              component={NavLink}
              to="/create-task"
              variant="filled"
              color="blue"
              radius="md"
            >
              Criar Tarefa
            </Button>
          )}

          <Button
            variant="light"
            size="xs"
            onClick={toggleColorScheme}
            color={isDark ? "yellow" : "gray"}
          >
            {isDark ? "☀️ Claro" : "🌙 Escuro"}
          </Button>

          {/* Troca entre Sair e Login dinamicamente */}
          {isAuthenticated ? (
            <Button variant="subtle" color="red" size="xs" onClick={logout}>
              Sair
            </Button>
          ) : (
            <Button
              component={Link}
              to="/login"
              variant="light"
              color="violet"
              size="xs"
            >
              Login
            </Button>
          )}
        </Group>
      </Group>
      <Outlet />
    </Container>
  );
}
