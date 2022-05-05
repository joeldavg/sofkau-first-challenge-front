import "./App.css";
import CategoryForm from "./components/CategoryForm";
import CategoryTodo from "./components/CategoryTodo";
import StoreProvider from "./components/StoreProvider";

function App() {
  return (
    <StoreProvider>
      <CategoryForm />
      <CategoryTodo />
    </StoreProvider>
  );
}

export default App;
