import PropTypes from "prop-types";
import TransactionInfoCard from "../cards/TransactionInfoCard";
import moment from "moment";
import { LuDownload } from "react-icons/lu";

const ExpenseList = ({ transactions, onDelete, onDownload }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">All Expenses</h5>

        <button
          className="card-btn"
          onClick={onDownload}
          aria-label="Download Expenses"
        >
          <LuDownload className="text-base" /> Download
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {transactions?.length > 0 ? (
          transactions.map((expense) => (
            <TransactionInfoCard
              key={expense.id || expense._id}
              title={expense.category}
              icon={expense.icon}
              date={moment(expense.date).format("Do MMM YYYY")}
              amount={expense.amount}
              type="expense"
              onDelete={() => onDelete(expense.id || expense._id)}
            />
          ))
        ) : (
          <p className="text-sm text-gray-500 text-center py-4">
            No expenses available.
          </p>
        )}
      </div>
    </div>
  );
};

ExpenseList.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      _id: PropTypes.string,
      category: PropTypes.string.isRequired,
      icon: PropTypes.string,
      date: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    })
  ),
  onDelete: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
};

ExpenseList.defaultProps = {
  transactions: [],
};

export default ExpenseList;