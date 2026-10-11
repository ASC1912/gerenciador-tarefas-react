import { useParams, useNavigate } from "react-router-dom";
import { Title, Button, Text, Card, Group, Badge } from "@mantine/core";
import { useTasks } from "../contexts/TaskContext";

export function TaskDetails() {
  // Captura o ID dinâmico da URL (ex: /tarefa/1728...)
  const { id } = useParams();

  const navigate = useNavigate();

  const { tasks } = useTasks();

  // Busca a tarefa específica no estado global comparando os IDs
  const task = tasks.find((t) => t.id === Number(id));

  if (!task) {
    return (
      <>
        <Title order={2}>Tarefa não encontrada</Title>
        <Button mt="md" onClick={() => navigate("/")}>
          Voltar para o Início
        </Button>
      </>
    );
  }

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between" mb="xs">
        <Title order={3}>Detalhes da Tarefa</Title>
        <Badge color={task.completed ? "green" : "red"}>
          {task.completed ? "Concluída" : "Pendente"}
        </Badge>
      </Group>

      <Text mt="md">
        <strong>ID interno:</strong> {task.id}
      </Text>
      <Text mt="sm">
        <strong>Descrição:</strong> {task.title}
      </Text>

      <Button mt="xl" variant="light" onClick={() => navigate(-1)}>
        Voltar
      </Button>
    </Card>
  );
}
