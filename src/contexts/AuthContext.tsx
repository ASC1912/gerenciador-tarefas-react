import { createContext, useContext, useState, type ReactNode } from "react";

interface AuthContextData {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Inicializa o estado lendo o token salvo no localStorage (se existir)
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("@gerenciador-tarefas:token");
  });

  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("@gerenciador-tarefas:token", newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("@gerenciador-tarefas:token");
  };

  return (
    <AuthContext.Provider
      value={{ token, isAuthenticated: !!token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  const context = useContext(AuthContext);

  if (Object.keys(context).length === 0) {
    throw new Error(
      "O hook useAuth deve ser utilizado dentro de um AuthProvider.",
    );
  }

  return context;
}
