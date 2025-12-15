import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
  {
    id: "el",
    description: "LEGO Botanicals Mini Orchid",
    amount: 23.99,
    date: new Date("2023-12-20"),
  },
  {
    id: "e2",
    description: "Noodle Bowl",
    amount: 11.99,
    date: new Date("2024-02-05"),
  },
  {
    id: "e3",
    description: "Helados Mexico Strawberry",
    amount: 1.25,
    date: new Date("2024-04-16"),
  },
  {
    id: "e4",
    description: "Dog Harness",
    amount: 16.99,
    date: new Date("2025-11-01"),
  },
  {
    id: "e5",
    description: "Book: Sunrise on the Reaping",
    amount: 15.99,
    date: new Date("2025-11-20"),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case "UPDATE":
      const updateExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updateExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updateExpenseIndex] = updatedItem;
      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}
function ExpensesContextProvider({ children }) {
  const [expenseState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }
  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expenseState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
