import { useLoaderData } from "react-router-dom";
import {  fetchBudgetAndExpenses, handleCreateExpense, handleDeleteExpense } from "../helpers/helpers"
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";


export async function budgetLoader({ params }) {
  const { budget ,expenses} = await fetchBudgetAndExpenses(params.id);

  if (!budget) {
    throw new Error("The budget you're trying to find doesn't exist");
  }

  return { budget, expenses };
}


export async function budgetAction({request }) {

  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "createExpense") {
    return handleCreateExpense(values);
  }
  if (_action === "deleteExpense") {
    return handleDeleteExpense(values.expenseId);
  }
}

const BudgetPage = () => {

  const { budget, expenses } = useLoaderData();
  return (
    <div className="grid-lg" style={{
      "--accent": budget.color,
    }}>
      <h1 className="h2">
        <span className="accent">
          {budget.name}
        </span>
       {" "} Overview
      </h1>
      <div className="flex-lg">
        <BudgetItem budget={budget} showDelete={true} />
        <AddExpenseForm budgets={[budget]} />
      </div>
      {
        expenses && expenses.length > 0 && (
          <div className="grid-md">
            <h2>

              <span className="accent">{budget.name}</span>{" "}Expenses</h2>
            <Table expenses={expenses} showBudget={false} />
          </div>
        )
      }

    </div>
  )
}

export default BudgetPage
