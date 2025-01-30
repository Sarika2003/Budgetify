import { Form, Link } from "react-router-dom";
import { calculateSpentByBudget, formatCurrency, formatPercentage } from "../helpers/helpers";
import { BanknotesIcon, ExclamationTriangleIcon, PencilIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

const BudgetItem = ({ budget, showDelete = false }) => {

    const { id, name, amount, color } = budget;
    const spent = calculateSpentByBudget(id);

    return (
        <div className="budget"
            style={{
                "--accent": color
            }}
        >
            <div className="progress-text">
                <h3>{name}</h3>
                <div>
                    <div className="tooltip-container">
                        {spent > amount && <ExclamationTriangleIcon width={28} style={{
                            marginBottom: "-5px",
                            cursor: "pointer",
                        }} />}
                        <span className="tooltip">Budget Exceeded</span>
                    </div>
                    <span>{formatCurrency(amount)} <br /> Budgeted</span>
                </div>

            </div>
            <progress max={amount} value={spent}>
                {formatPercentage(spent / amount)}
            </progress>
            <div className="progress-text">
                <small>{formatCurrency(spent)}spent</small>
                <small> {formatCurrency(amount - spent)} remaining</small>
            </div>
            {
                showDelete ?
                    <>
                        <Form method="post"
                            action="delete" onSubmit={(e) => {
                                if (!confirm("Are you sure you want to permanently delete this budget?")) {
                                    e.preventDefault()
                                }
                            }}
                        >
                            <div className="flex-sm">
                                <button type="submit" className="btn">
                                    <span>Delete Budget</span>
                                    <TrashIcon width={20} />
                                </button>
                                <Link to={`/updateBudget/${id}`} className="btn">
                                    <span>Edit Budget</span>
                                    <PencilSquareIcon width={20} />
                                </Link>
                            </div>

                        </Form>
                    </>

                    : (
                        <div className="flex-sm">
                            <Link to={`/budget/${id}`}
                                className="btn">
                                <span>View Details</span>
                                <BanknotesIcon width={20} />
                            </Link>
                        </div>
                    )
            }
        </div>

    )
}

export default BudgetItem
