function reducer(state, action) {
  switch (action.type) {
    case "add-task":
      return state;
    case "remove-task":
      return state;
    case "update-task":
      return state;
    case "add-category":
      console.log("adding category");
      const newCategory = {
        id: Math.floor(Math.random() * 100),
        title: action.payload.title,
        tasks: [],
      };
      const newListOfCategories = [...state.listOfCategories, newCategory];
      const newStateWithNewListOfCategories = {
        ...state,
        listOfCategories: newListOfCategories,
      };
      return newStateWithNewListOfCategories;
    case "remove-category":
      const newListOfCategoriesWithoutPayloadCategory =
        state.listOfCategories.filter(
          (category) => category.id !== action.payload.id
        );

      const newStateWithCategoryDelete = {
        ...state,
        listOfCategories: newListOfCategoriesWithoutPayloadCategory,
      };

      return newStateWithCategoryDelete;
  }
}

export default reducer;
