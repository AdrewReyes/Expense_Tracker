import PropTypes from "prop-types";
import { addThousandsSeparator } from "../../utils/helper";

const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div
      className="flex gap-6 bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50"
      aria-label={`${label}: ${value}`}
    >
      <div
        className={`w-14 h-14 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}
      >
        {icon}
      </div>
      <div>
        <h6 className="text-sm text-gray-500 mb-1">{label}</h6>
        <span className="text-[22px]">${addThousandsSeparator(value)}</span>
      </div>
    </div>
  );
};

InfoCard.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  color: PropTypes.string.isRequired,
};

InfoCard.defaultProps = {
  color: "bg-gray-200",
};

export default InfoCard;