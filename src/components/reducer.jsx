function reducer(state, action) {
  switch (action.type) {
    case "get-categories":
      const newStateWithAllCategories = action.payload;
      return newStateWithAllCategories;
    case "add-task":
      const taskToAdd = {
        id: Math.floor(Math.random() * 1000),
        message: action.payload.message,
        done: false,
        categoryId: action.payload.categoryId,
      };

      const categoryToAddTask = state.find(
        (category) => category.id === taskToAdd.categoryId
      );

      if (categoryToAddTask) {
        const newTaskAdded = [...categoryToAddTask.tasks, taskToAdd];

        const newState = state.map((category) => {
          if (category.id === categoryToAddTask.id) {
            return { ...categoryToAddTask, tasks: newTaskAdded };
          }
          return category;
        });

        return newState;
      }

      return state;
    case "remove-task":
      const taskToDelete = action.payload;

      const parentCategory = state.find(
        (category) => category.id === taskToDelete.categoryId
      );

      if (parentCategory) {
        const taskArrayDelete = parentCategory.tasks.filter(
          (task) => task.id !== taskToDelete.id
        );

        const newState = state.map((category) => {
          if (category.id === parentCategory.id) {
            return { ...parentCategory, tasks: taskArrayDelete };
          }
          return category;
        });
        return newState;
      }

      return state;
    case "update-task":
      const taskUpdated = action.payload;

      const categoryParent = state.find(
        (category) => category.id === taskUpdated.categoryId
      );

      if (categoryParent) {
        const taskArrayUpdated = categoryParent.tasks.map((task) => {
          return task.id === taskUpdated.id ? taskUpdated : task;
        });

        const newState = state.map((category) => {
          if (category.id === categoryParent.id) {
            return { ...categoryParent, tasks: taskArrayUpdated };
          }
          return category;
        });
        return newState;
      }

      return state;
    case "add-category":
      const newCategory = {
        id: Math.floor(Math.random() * 1000),
        title: action.payload.title,
        tasks: [],
      };
      const newState = [...state, newCategory];

      return newState;
    case "remove-category":
      const newStateWithoutCategory = state.filter(
        (category) => category.id !== action.payload.id
      );

      return newStateWithoutCategory;
  }
}

export default reducer;
