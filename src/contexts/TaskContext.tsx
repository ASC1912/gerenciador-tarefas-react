import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { api } from "../services/api";

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface TaskContextData {
  tasks: Task[];
  addTask: (title: string) => void;
  toggleTaskCompletion: (id: number) => void;
  removeTask: (id: number) => void;
}

const TaskContext = createContext<TaskContextData>({} as TaskContextData);

export function TaskProvider({ children }: { children: ReactNode }) {
  // Inicializa o estado com o LocalStorage
  const [tasks, setTasks] = useState<Task[]>(() => {
    const tarefasSalvas = localStorage.getItem("@gerenciador-tarefas");
    if (tarefasSalvas) {
      return JSON.parse(tarefasSalvas);
    }
    return [];
  });

  // Busca as tarefas iniciais da API caso o LocalStorage esteja vazio
  useEffect(() => {
    async function fetchInitialTasks() {
      const tarefasSalvas = localStorage.getItem("@gerenciador-tarefas");

      if (!tarefasSalvas || JSON.parse(tarefasSalvas).length === 0) {
        try {
          const response = await api.get("/todos");

          const tarefasDaApi = response.data.todos.map(
            (item: { id: number; todo: string; completed: boolean }) => ({
              id: item.id,
              title: item.todo,
              completed: item.completed,
            }),
          );

          setTasks(tarefasDaApi);
        } catch (error) {
          console.error("Erro ao carregar tarefas da API:", error);
        }
      }
    }

    fetchInitialTasks();
  }, []);

  // Salva no LocalStorage sempre que a lista de tarefas mudar
  useEffect(() => {
    localStorage.setItem("@gerenciador-tarefas", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string) => {
    if (title.trim().length === 0) return;
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
    };
    setTasks([newTask, ...tasks]); // Coloca a tarefa nova no topo da lista
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, toggleTaskCompletion, removeTask }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);

  if (Object.keys(context).length === 0) {
    throw new Error(
      "O hook useTasks deve ser utilizado dentro de um TaskProvider.",
    );
  }

  return context;
}
