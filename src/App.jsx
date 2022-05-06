import "./App.css";
import CategoryForm from "./components/CategoryForm";
import ListOfCategories from "./components/ListOfCategories";
import StoreProvider from "./components/StoreProvider";

function App() {
  return (
    <StoreProvider>
      <CategoryForm />
      <ListOfCategories />
    </StoreProvider>
  );
}

export default App;
