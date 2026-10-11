import { test, expect } from "@playwright/test";

test.describe("Fluxos E2E da Aplicação", () => {
  test("Fluxo 1: Autenticação e Redirecionamento", async ({ page }) => {
    // Acessa a página de login
    await page.goto("/login");

    // Preenche as credenciais
    await page.getByRole("textbox", { name: /usuário/i }).fill("emilys");
    await page.getByLabel(/senha/i).fill("emilyspass");

    // Submete o formulário
    await page.getByRole("button", { name: /entrar/i }).click();

    // Verifica se foi redirecionado para a Home e se o menu apareceu
    await expect(page).toHaveURL("/");
    await expect(
      page.getByRole("link", { name: /criar tarefa/i }),
    ).toBeVisible();
  });

  test("Fluxo 2: Cadastro de nova tarefa e visualização", async ({ page }) => {
    // Realiza login prévio
    await page.goto("/login");
    await page.getByRole("textbox", { name: /usuário/i }).fill("emilys");
    await page.getByLabel(/senha/i).fill("emilyspass");
    await page.getByRole("button", { name: /entrar/i }).click();

    // Navega para a área restrita
    await page.getByRole("link", { name: /criar tarefa/i }).click();
    await expect(page).toHaveURL("/create-task");

    // Cadastra uma nova tarefa
    await page
      .getByPlaceholder(/o que precisa ser feito/i)
      .fill("Tarefa E2E Playwright");
    await page.getByRole("button", { name: /adicionar tarefa/i }).click();

    // Volta para o Início e verifica se a tarefa está na lista
    await page.getByRole("link", { name: /início/i }).click();
    await expect(page.getByText("Tarefa E2E Playwright")).toBeVisible();
  });
});
