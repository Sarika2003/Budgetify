import { ChartBarIcon } from "@heroicons/react/24/solid";

const ExpenseOverview = ({ budget, topExpense, spent }) => {
  return (
    <div className="budget" style={{ maxWidth: "800px" }}>
      <h3>
        <ChartBarIcon width={25} style={{ marginBottom: "-5px", marginRight: "4px" }} />
        Expenses Overview
      </h3>
      <p>
        ⚠️ Your {budget.name} budget has been exceeded by {Math.abs(budget.amount - spent)}.
      </p>
      <p>
        💸 The top expense contributing to overspending was for {topExpense.name}, with a total of {topExpense.amount} spent.
      </p>
    </div>
  );
};

export default ExpenseOverview;
