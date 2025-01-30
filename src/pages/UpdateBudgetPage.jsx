import { redirect, useLoaderData } from "react-router-dom"
import { calculateSpentByBudget, getAllMatchingItems, updateBudget } from "../helpers/helpers";
import UpdateBudgetForm from "../components/UpdateBudgetForm";
import ExpenseOverview from "../components/ExpenseOverView";
import { toast } from "react-toastify";
import { fetchBudgetAndExpenses } from "../helpers/helpers";


export async function updateBudgetLoader({ params }) {
    const { budget, expenses } = await fetchBudgetAndExpenses(params.id);
    return { budget, expenses };
}

export async function updateBudgetAction({ params, request }) {

    const data = await request.formData();
    const values = Object.fromEntries(data);
    const { budget } = await fetchBudgetAndExpenses(params.id);
    if (!budget) {
        throw new Error("Budget not found.");
    }
    try {
        updateBudget({
            budget,
            name: values.newBudget,
            amount: values.newBudgetAmount,
        });
        toast.success("Budget updated");
        return redirect(`/budget/${params.id}`);

    }
    catch (e) {
        throw new Error("There was a problem updating your budget");
    }
}
const UpdateBudgetPage = () => {
    const { budget, expenses } = useLoaderData();
    const spent = calculateSpentByBudget(budget.id);
    const topExpense = expenses.sort((a, b) => b.amount - a.amount)[0];

    return (
        <>
            <div className="flex-lg">

                <UpdateBudgetForm budget={budget} />

                {spent > budget.amount && (
                    <ExpenseOverview budget={budget} topExpense={topExpense} spent={spent} />
                )}

            </div>

        </>

    )
}

export default UpdateBudgetPage;
