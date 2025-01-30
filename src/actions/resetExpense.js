import { redirect } from "react-router-dom";
import { deleteItem } from "../helpers/helpers";
import { toast } from "react-toastify";

export const resetExpensesActions =()=>{
    deleteItem({
        key: "expenses",
    });
    
    toast.success("Expenses Reset!");
        return redirect("/");
}