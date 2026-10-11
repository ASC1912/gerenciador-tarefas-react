import { render } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../src/contexts/AuthContext";
import { TaskProvider } from "../src/contexts/TaskContext";

export function renderWithProviders(ui: React.ReactElement) {
  return render(
    <MantineProvider>
      <BrowserRouter>
        <AuthProvider>
          <TaskProvider>{ui}</TaskProvider>
        </AuthProvider>
      </BrowserRouter>
    </MantineProvider>,
  );
}
