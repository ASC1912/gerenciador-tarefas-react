import { useState } from "react";
import {
  Group,
  Box,
  Pagination,
  Stack,
  Title,
  Text,
  SegmentedControl,
} from "@mantine/core";
import { TaskItem } from "../components/TaskItem";
import { useTasks } from "../contexts/TaskContext";

export function Home() {
  const { tasks } = useTasks();
  const [activePage, setPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const itemsPerPage = 4;

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true; // para o caso "all"
  });

  // Matemática de paginação, usando a lista filtrada
  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
  const paginatedTasks = filteredTasks.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage,
  );

  // Volta a página 1 quando troca de filtro
  const handleFilterChange = (value: string) => {
    setFilter(value);
    setPage(1);
  };

  return (
    <Box pos="relative">
      <Title order={2} mb="xs">
        Lista de Tarefas
      </Title>
      <Text mb="xl" c="dimmed">
        Área pública para navegação nos dados.
      </Text>

      {/* Barra de Filtros */}
      <Group mb="lg">
        <SegmentedControl
          value={filter}
          onChange={handleFilterChange}
          data={[
            { label: "Todas", value: "all" },
            { label: "Pendentes", value: "pending" },
            { label: "Concluídas", value: "completed" },
          ]}
        />
      </Group>

      <Stack gap="sm" mb="xl">
        {paginatedTasks.length > 0 ? (
          paginatedTasks.map((task) => (
            <TaskItem
              key={task.id}
              id={task.id}
              title={task.title}
              completed={task.completed}
            />
          ))
        ) : (
          <Text ta="center" c="dimmed" py="xl">
            Nenhuma tarefa encontrada neste filtro.
          </Text>
        )}
      </Stack>

      {totalPages > 1 && (
        <Group justify="center" mt="xl">
          <Pagination
            total={totalPages}
            value={activePage}
            onChange={setPage}
          />
        </Group>
      )}
    </Box>
  );
}
