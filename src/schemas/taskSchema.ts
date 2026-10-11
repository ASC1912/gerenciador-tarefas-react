import { z } from "zod";

// Schema para validar o input do utilizador no formulário (Mantine)
export const taskFormSchema = z.object({
  title: z.string().min(3, "A tarefa deve ter pelo menos 3 caracteres"),
});

// Inferir o Tipo do TypeScript automaticamente a partir do Schema
export type TaskFormData = z.infer<typeof taskFormSchema>;

// Schema para validar os dados que a API da DummyJSON devolver
export const taskResponseSchema = z.object({
  id: z.number(),
  todo: z.string(),
  completed: z.boolean(),
  userId: z.number(),
});
