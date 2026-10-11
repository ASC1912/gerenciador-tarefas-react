import { useState } from "react";
import {
  TextInput,
  Button,
  Group,
  Box,
  LoadingOverlay,
  Title,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  taskFormSchema,
  taskResponseSchema,
  type TaskFormData,
} from "../schemas/taskSchema";
import { api } from "../services/api";
import { useTasks } from "../contexts/TaskContext";
import { zodResolver } from "mantine-form-zod-resolver";

export function CreateTask() {
  const { addTask } = useTasks();
  const [isLoading, setIsLoading] = useState(false);

  // Formulário protegido nativamente pelas regras do Zod usando zodResolver
  const form = useForm<TaskFormData>({
    initialValues: { title: "" },
    validate: zodResolver(taskFormSchema),
  });

  const handleSubmit = async (values: TaskFormData) => {
    setIsLoading(true);

    try {
      // Requisição via Axios
      const response = await api.post("/todos/add", {
        todo: values.title,
        completed: false,
        userId: 1, // A DummyJSON exige o envio de um userId na criação
      });

      const parsedResponse = taskResponseSchema.safeParse(response.data);

      if (parsedResponse.success) {
        addTask(parsedResponse.data.todo);
        form.reset();
      } else {
        console.error(
          "Falha na validação da resposta (Zod):",
          parsedResponse.error,
        );
        alert("O servidor respondeu com um formato de dados inválido.");
      }
    } catch (error) {
      console.error("Erro na submissão da tarefa");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box pos="relative">
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      <Title order={2} mb="xs">
        Criar Nova Tarefa
      </Title>
      <Text mb="xl" c="dimmed">
        Adicione novas tarefas com formulário validado pelo Zod.
      </Text>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Group align="flex-start">
          <TextInput
            placeholder="O que precisa ser feito?"
            style={{ flex: 1 }}
            {...form.getInputProps("title")}
          />
          <Button type="submit">Adicionar Tarefa</Button>
        </Group>
      </form>
    </Box>
  );
}
