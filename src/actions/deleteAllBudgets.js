
import { redirect } from "react-router-dom";
import { deleteItem } from "../helpers/helpers";
import { toast } from "react-toastify";

export async function delelteAllBudgetsAction(){

deleteItem({
    key: "budgets",
});
deleteItem({
    key: "expenses",
});

toast.success("You've deleted all budgets!");
    return redirect("/");
}