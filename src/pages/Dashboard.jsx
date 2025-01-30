import { Link, useLoaderData, Form } from "react-router-dom";
import { fetchData, createBudget, wait, handleCreateExpense, handleDeleteExpense } from "../helpers/helpers";
import Intro from "../components/Intro"
import { toast } from "react-toastify";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

import { TrashIcon } from "@heroicons/react/24/solid";

//loader function
export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  const expenses = fetchData("expenses");
  return { userName, budgets, expenses };
}

//action
export async function dashboardAction({ request }) {

  await wait();
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "newUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName));
      return toast.success(`Welcome , ${values.userName}`);

    } catch (e) {
      throw new Error("There was a problem creating your account");
    }
  }

  if (_action === "createBudget") {
    try {

      createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      })
      return toast.success("Budget created");
    }
    catch (e) {
      throw new Error("There was a problem creating your budget");
    }
  }

  if (_action === "createExpense") {
    return handleCreateExpense(values);
  }
  if (_action === "deleteExpense") {
    return handleDeleteExpense(values.expenseId);
  }
}
const Dashboard = () => {

  const { userName, budgets, expenses } = useLoaderData();
  return (
    <>
      {userName ? <div className="dashboard">
        <h1>Welcome back, <span className="accent">{userName}</span></h1>
        <div className="grid-sm">
          {
            budgets && budgets.length > 0 ? (
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddBudgetForm />
                  <AddExpenseForm budgets={budgets} />
                </div>
                  <h2 >Existing Budgets</h2>
                <div className="budgets">
                  {
                    budgets.map((budget) => (
                      <BudgetItem key={budget.id} budget={budget} />
                    ))
                  }
                </div>

                <Form method="post"
                    action="deleteBudget"
                    className="flex--sm"
                    onSubmit={(e) => {
                      if (!confirm("Delete all budgets and expenses?")) {
                        e.preventDefault()
                      }
                    }}>
                    <button type="submit" className="btn btn--warning flex--sm"><span>Delete All Budgets</span>
                      <TrashIcon width={20} />
                    </button>
                  </Form>
                {
                  expenses && expenses.length > 0
                  && <>
                    <div className="grid-md">
                      <h2>Recent Expenses</h2>
                      <Table expenses={expenses.sort((a, b) => b.createdAt - a.createdAt).slice(0, 8)}
                      />
                      {expenses.length > 8 && (
                        <Link to="expenses" className="btn btn--dark">
                          View all expenses
                        </Link>
                      )}
                    </div>
                    <Form method="post"
                    action="resetExpenses"
                    className="flex--sm"
                    onSubmit={(e) => {
                      if (!confirm("Reset all expenses?")) {
                        e.preventDefault()
                      }
                    }}>
                    <button type="submit" className="btn btn--warning flex--sm"><span>Reset Expenses</span>
                      <TrashIcon width={20} />
                    </button>
                  </Form>
                  </>
                  
                }
                 

              </div>
            )
              : (
                <div className="grid-sm">
                  <p>Master your money with a simple, effective budget.</p>
                  <p>Create a budget to get started!</p>
                  <AddBudgetForm />
                </div>

              )

          }

        </div>
      </div> : <Intro />}
    </>

  )
}

export default Dashboard
