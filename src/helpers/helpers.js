import { toast } from "react-toastify";

export const wait = () => new Promise(res =>
    setTimeout(res, Math.random() * 800)
)


const generateRandomColor = () => {

    const existingBudgetsLength = fetchData("budgets")?.length ?? 0;
    return `${existingBudgetsLength * 34} 65% 55%`


}

//local storage 
export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

//get all items 
export const getAllMatchingItems = ({ category, key, value }) => {
    const data = fetchData(category) ?? [];
    return data.filter((item) => item[key] === value)

}


export async function fetchBudgetAndExpenses(id) {
    const budget = await getAllMatchingItems({
        category: "budgets",
        key: "id",
        value: id
    })[0];

    if (!budget) {
        throw new Error("The budget you're trying to find doesn't exist");
    }

    const expenses = await getAllMatchingItems({
        category: "expenses",
        key: "budgetId",
        value: id
    });

    return { budget, expenses };
}


//delete item
export const deleteItem = ({ key, id }) => {
    const existingData = fetchData(key);
    if (id) {
        const newData = existingData.filter((item) => item.id !== id);
        return localStorage.setItem(key, JSON.stringify(newData))
    }

    return localStorage.removeItem(key);
}




//create budget
export const createBudget = ({
    name, amount
}) => {
    let newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        color: generateRandomColor(),
    }
    let existingBudgets = fetchData("budgets") ?? [];
    return localStorage.setItem("budgets", JSON.stringify([...existingBudgets, newItem]))
}


//update budget
export const updateBudget = ({ budget, name, amount }) => {
    let existingBudgets = fetchData("budgets") ?? [];
    let updatedBudget = {
        ...budget,
        name,
        amount: +amount,
    }
    return localStorage.setItem("budgets", JSON.stringify([...existingBudgets.filter(bdg => bdg.id !== budget.id), updatedBudget]));


}

//create expense
export const createExpense = ({
    name, amount, budgetId
}) => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        budgetId: budgetId,
    }
    const existingExpenses = fetchData("expenses") ?? [];
    return localStorage.setItem("expenses", JSON.stringify([...existingExpenses, newItem]))
}


export const handleCreateExpense = (values) => {
    try {
        createExpense({
            name: values.newExpense,
            amount: values.newExpenseAmount,
            budgetId: values.newExpenseBudget,
        });
        toast.success(`Expense ${values.newExpense} created`);
    } catch (e) {
        throw new Error("There was a problem creating your expense");
    }
}

export const handleDeleteExpense = (expenseId) => {
    try {
        deleteItem({
            key: "expenses",
            id: expenseId,
        });
        toast.success("Expense deleted");
    } catch (e) {
        throw new Error("There was a problem deleting your expense");
    }
}
//total spent by budget
export const calculateSpentByBudget = (budgetId) => {
    const expenses = fetchData("expenses") ?? [];

    const budgetSpent = expenses.reduce((acc, expense) => {
        if (expense.budgetId !== budgetId) return acc
        return acc += expense.amount
    }, 0)
    return budgetSpent;
}

export const formatPercentage = (amt) => {
    return amt.toLocaleString(undefined, {
        style: "percent",
        minimumFractionDigits: 0,
    })
}


//formating
export const formatCurrency = (amt) => {
    if (amt == null) {
        return "₹0";
    }
    return amt.toLocaleString(undefined, {
        style: "currency",
        currency: "INR",
    });
}

export const formatDateToLocaleString = (epoch) => {
    return new Date(epoch).toLocaleDateString();
} 