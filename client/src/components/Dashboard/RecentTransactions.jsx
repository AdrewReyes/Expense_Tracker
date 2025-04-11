import PropTypes from "prop-types";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import { LuArrowRight } from "react-icons/lu";
import moment from "moment";

const RecentTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between ">
        <h5 className="text-lg">Recent Transactions</h5>

        <button
          className="card-btn"
          onClick={onSeeMore}
          aria-label="See All Transactions"
        >
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
        {transactions?.length > 0 ? (
          transactions.slice(0, 5).map((item, index) => (
            <TransactionInfoCard
              key={item.id || item._id || index}
              title={item.type === "expense" ? item.category : item.source}
              icon={item.icon}
              date={moment(item.date).format("Do MMM YYYY")}
              amount={item.amount}
              type={item.type}
              hideDeleteBtn
            />
          ))
        ) : (
          <p className="text-sm text-gray-500 text-center py-4">
            No recent transactions available.
          </p>
        )}
      </div>
    </div>
  );
};

RecentTransactions.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      _id: PropTypes.string,
      type: PropTypes.string.isRequired,
      category: PropTypes.string,
      source: PropTypes.string,
      icon: PropTypes.string,
      date: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    })
  ),
  onSeeMore: PropTypes.func.isRequired,
};

RecentTransactions.defaultProps = {
  transactions: [],
};

export default RecentTransactions;