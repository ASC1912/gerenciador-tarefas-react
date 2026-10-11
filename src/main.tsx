import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import App from "./App.tsx";
import { TaskProvider } from "./contexts/TaskContext.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";

const myTheme = createTheme({
  primaryColor: "violet",
  fontFamily: "Verdana, sans-serif",
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider defaultColorScheme="light" theme={myTheme}>
      <AuthProvider>
        <TaskProvider>
          <App />
        </TaskProvider>
      </AuthProvider>
    </MantineProvider>
  </StrictMode>,
);
