import "./App.css";
import CategoryTodo from "./components/CategoryTodo";
import StoreProvider from "./components/StoreProvider";

function App() {
  return (
    <StoreProvider>
      <CategoryTodo />
    </StoreProvider>
  );
}

export default App;
