import { create } from 'zustand';


const useStore = create((set) => ({
  expenses: [{
    id: Math.random(),
    text: "text of expense",
    type: "EXP",
    amount: 550
  },
  {
    id: Math.random(),
    text: "text of expense",
    type: "INC",
    amount: 550
  },],
  addExpense: (expense) => {set(state => ({expenses: [...state.expenses, expense]}))},
  removeExpense: (expenseId) => {set(state => ({expenses : state.expenses.filter(e => e.id !== expenseId)}))}, 
 }));

export default useStore;