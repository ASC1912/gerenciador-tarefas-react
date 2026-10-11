import { Card, Text, Badge, Group, Button } from "@mantine/core";
import { Link } from "react-router-dom";
import { useTasks } from "../contexts/TaskContext";
import { useAuth } from "../contexts/AuthContext";
interface TaskItemProps {
  id: number;
  title: string;
  completed: boolean;
}

export function TaskItem({ id, title, completed }: TaskItemProps) {
  const { toggleTaskCompletion, removeTask } = useTasks();

  const { isAuthenticated } = useAuth();

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder mb="sm">
      <Group justify="space-between" mt="xs" mb="xs">
        <Text
          fw={500}
          style={{ textDecoration: completed ? "line-through" : "none" }}
        >
          {title}
        </Text>
        <Badge color={completed ? "green" : "red"}>
          {completed ? "Concluída" : "Pendente"}
        </Badge>
      </Group>

      <Group grow mt="md">
        {/* (Apenas para usuários autenticados) */}
        {isAuthenticated && (
          <>
            <Button
              variant="light"
              color={completed ? "orange" : "green"}
              onClick={() => toggleTaskCompletion(id)}
            >
              {completed ? "Desfazer" : "Concluir"}
            </Button>
            <Button
              variant="outline"
              color="red"
              onClick={() => {
                if (
                  window.confirm("Tem certeza que deseja excluir esta tarefa?")
                ) {
                  removeTask(id);
                }
              }}
            >
              Excluir
            </Button>
          </>
        )}

        {/* Detalhes (Público) */}
        <Button
          component={Link}
          to={`/tarefa/${id}`}
          variant="default"
          color="blue"
        >
          Detalhes
        </Button>
      </Group>
    </Card>
  );
}
