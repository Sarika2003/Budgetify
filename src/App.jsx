import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Routes and actions

import Error from './pages/Error';
import Main, { mainLoader } from './layouts/Main';
import DashBoard, { dashboardAction, dashboardLoader } from './pages/Dashboard'
import { logoutAction } from './actions/logout';
import ExpensesPage, { expensesLoader, expensesAction } from './pages/ExpensesPage';
import BudgetPage, { budgetAction, budgetLoader } from './pages/BudgetPage';
import { deleteBudget } from './actions/deleteBudget';
import UpdateBudgetPage, { updateBudgetAction, updateBudgetLoader } from './pages/UpdateBudgetPage'
import {delelteAllBudgetsAction } from './actions/deleteAllBudgets';
import { resetExpensesActions } from './actions/resetExpense';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <DashBoard />,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Error />,

      },
      {
        path: "expenses",
        element: <ExpensesPage />,
        loader: expensesLoader,
        action: expensesAction,
        errorElement: <Error />,

      },
      {
        path: "budget/:id",
        element: <BudgetPage />,
        loader: budgetLoader,
        errorElement: <Error />,
        action: budgetAction,
        children: [
          {
            path: "delete",
            action: deleteBudget,
          },
        ]
      },
      {
        path: "/updateBudget/:id",
        element: <UpdateBudgetPage />,
        loader: updateBudgetLoader,
        action: updateBudgetAction,
        errorElement: <Error />,
        

      },
      
      {
        path: "logout",
        action: logoutAction,
      },
      {
        path :"deleteBudget",
        action: delelteAllBudgetsAction,
      },
      {
        path :"resetExpenses",
        action: resetExpensesActions,
      }
    ]
  },


]);
function App() {
  return <>
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  </>
}

export default App
