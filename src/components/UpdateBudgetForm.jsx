import { Form } from "react-router-dom";
import { CurrencyRupeeIcon } from "@heroicons/react/24/solid";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

const UpdateBudgetForm = ({ budget }) => {
  const navigate = useNavigate();
  
  return (
    <div className="form-wrapper">
      <h2 className="h3">Update Budget</h2>
      <Form method="post" className="grid-md">
        <div className="grid-sm">
          <label htmlFor="newBudget">Budget Name</label>
          <input
            type="text"
            name="newBudget"
            id="newBudget"
            placeholder="e.g., Groceries"
            required
            defaultValue={budget.name}
          />
        </div>
        <div className="grid-sm">
          <label htmlFor="newBudgetAmount">Amount</label>
          <input
            type="number"
            name="newBudgetAmount"
            id="newBudgetAmount"
            required
            placeholder="e.g., 500"
            defaultValue={budget.amount}
          />
        </div>

        <div className="flex-sm">
          <button
            type="button"
            className="btn btn--dark"
            onClick={() => navigate(-1)}
          >
            <span>Back</span>
            <ArrowUturnLeftIcon width={20} />
          </button>
          <button type="submit" className="btn btn--dark">
            <span>Update Budget</span>
            <CurrencyRupeeIcon width={20} />
          </button>
        </div>
      </Form>
    </div>
  );
};

export default UpdateBudgetForm;
