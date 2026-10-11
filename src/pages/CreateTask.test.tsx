/// <reference types="@testing-library/jest-dom/vitest" />
import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CreateTask } from "./CreateTask";
import { renderWithProviders } from "../../test/utils";

describe("Página de Criação de Tarefas", () => {
  it("deve permitir a digitação de uma nova tarefa", async () => {
    const user = userEvent.setup();
    renderWithProviders(<CreateTask />);

    // Consultas baseadas na visão do usuário
    const title = screen.getByText("Criar Nova Tarefa");
    const input = screen.getByPlaceholderText("O que precisa ser feito?");
    const submitButton = screen.getByRole("button", { name: /adicionar/i });

    expect(title).toBeInTheDocument();

    // Simulação da digitação
    await user.type(input, "Estudar React");
    expect(input).toHaveValue("Estudar React");
    expect(submitButton).toBeInTheDocument();
  });
});
