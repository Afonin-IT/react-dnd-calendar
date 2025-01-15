import {createContext, ReactNode, useState} from "react";

type ContextType = {
  editingTask: string | null,
  setEditingTask: (value: string | null) => void,
}

// eslint-disable-next-line react-refresh/only-export-components
export const CalendarContext = createContext<ContextType>({
  editingTask: null,
  setEditingTask: () => {},
})

type ProviderProps = {
  children: ReactNode;
};

export const CalendarProvider = ({ children }: ProviderProps) => {
  const [editingTask, setEditingTask] = useState<string | null>(null);

  const contextValue: ContextType = {
    editingTask,
    setEditingTask,
  };

  return (
    <CalendarContext.Provider value={contextValue}>
      {children}
    </CalendarContext.Provider>
  );
};