import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import PropTypes from "prop-types";
import CustomLegend from "./CustomLegend";
import CustomTooltip from "./CustomTooltip";

const DEFAULT_COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#4f39f6"];

const CustomPieChart = ({ data = [], label, totalAmount, showTextAnchor, colors = DEFAULT_COLORS }) => {
  return (
    <ResponsiveContainer width="100%" height={380} aria-label="Pie chart showing data">
      <PieChart>
        {data.length > 0 ? (
          <Pie
            data={data}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={130}
            innerRadius={100}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
        ) : (
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            fill="#999"
            fontSize="16px"
          >
            No data available
          </text>
        )}
        {data.length > 0 && (
          <>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </>
        )}
        {showTextAnchor && data.length > 0 && (
          <>
            <text
              x="50%"
              y="50%"
              dy={-25}
              textAnchor="middle"
              fill="#666"
              fontSize="14px"
            >
              {label}
            </text>
            <text
              x="50%"
              y="50%"
              dy={8}
              textAnchor="middle"
              fill="#333"
              fontSize="24px"
              fontWeight="semi-bold"
            >
              {totalAmount}
            </text>
          </>
        )}
      </PieChart>
    </ResponsiveContainer>
  );
};

CustomPieChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    })
  ),
  label: PropTypes.string.isRequired,
  totalAmount: PropTypes.string.isRequired,
  showTextAnchor: PropTypes.bool,
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

CustomPieChart.defaultProps = {
  data: [],
  showTextAnchor: false,
};

export default CustomPieChart;