import moment from "moment";
import PropTypes from "prop-types";
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../cards/TransactionInfoCard";

const ExpenseTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between ">
        <h5 className="text-lg">Expenses</h5>

        <button
          className="card-btn"
          onClick={onSeeMore}
          aria-label="See All Expenses"
        >
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
        {transactions?.length > 0 ? (
          transactions.slice(0, 5).map((expense, index) => (
            <TransactionInfoCard
              key={expense.id || expense._id || index}
              title={expense.category}
              icon={expense.icon}
              date={moment(expense.date).format("Do MMM YYYY")}
              amount={expense.amount}
              type="expense"
              hideDeleteBtn
            />
          ))
        ) : (
          <p className="text-sm text-gray-500 text-center py-4">
            No expense transactions available.
          </p>
        )}
      </div>
    </div>
  );
};

ExpenseTransactions.propTypes = {
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
  onSeeMore: PropTypes.func.isRequired,
};

ExpenseTransactions.defaultProps = {
  transactions: [],
};

export default ExpenseTransactions;