import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useFetch } from "use-http";

interface ContextType {
  categoryData: string[];
  loading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
}

const AppContext = createContext<ContextType | undefined>(undefined);

export const AppContextProvider = (props: { children: ReactNode }) => {
  const [categoryData, setCategoryData] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { request } = useFetch<string[]>("https://fakestoreapi.com");

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const newData = await request.get("/products/categories");
      setCategoryData(newData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [request.get]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const value: ContextType = {
    categoryData,
    loading,
    error,
    fetchData,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within Provider");
  }
  return context;
};
