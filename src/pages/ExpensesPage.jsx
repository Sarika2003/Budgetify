import { useLoaderData } from "react-router-dom";
import {  fetchData, handleDeleteExpense } from "../helpers/helpers";
import Table from "../components/Table";



export function expensesLoader() {
  
  const expenses =   fetchData("expenses");
  return { expenses };
}

export async function expensesAction({request}){

    const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

     if (_action === "deleteExpense") {
      return handleDeleteExpense(values.expenseId);
      }

}

const ExpensesPage = () => {

    const {expenses} = useLoaderData();
  return (
    <div className="grid-lg">
        <h1>All Expenses</h1>
        {expenses && expenses.length > 0 ?
        (
            <div className="grid-md">
                <h2>Recent Expenses <small>({expenses.length} total)</small></h2>
                <Table expenses={expenses}/>
            </div>


        ) : 
        <p>No expenses to show</p> 

        }
      
    </div>
  )
}

export default ExpensesPage
