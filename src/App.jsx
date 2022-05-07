import { useState } from "react";
import CategoryForm from "./components/CategoryForm";
import ListOfCategories from "./components/ListOfCategories";
import "./index.css";
import StoreProvider from "./state/StoreProvider";

function App() {
  const [clickedEdit, setClickedEdit] = useState({
    clicked: false,
    task: {},
  });

  return (
    <StoreProvider>
      <CategoryForm clickedEdit={clickedEdit} />
      <ListOfCategories
        clickedEdit={clickedEdit}
        setClickedEdit={setClickedEdit}
      />
    </StoreProvider>
  );
}

export default App;
