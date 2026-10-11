/// <reference types="@testing-library/jest-dom/vitest" />
import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Login } from "./Login";
import { renderWithProviders } from "../../test/utils";

describe("Página de Login", () => {
  it("deve simular a digitação e submissão do formulário pelo utilizador", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Login />);

    const title = screen.getByText("Bem-vindo de volta!");
    const usernameInput = screen.getByRole("textbox", { name: /usuário/i });
    const submitButton = screen.getByRole("button", { name: /entrar/i });

    expect(title).toBeInTheDocument();

    await user.clear(usernameInput);
    await user.type(usernameInput, "emilys");
    expect(usernameInput).toHaveValue("emilys");

    await user.click(submitButton);
  });
});
