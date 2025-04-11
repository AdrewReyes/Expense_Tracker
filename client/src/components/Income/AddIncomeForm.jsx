import { useState } from "react";
import PropTypes from "prop-types";
import Input from "../Inputs/Input";

const AddIncomeForm = ({ onAddIncome }) => {
  const [income, setIncome] = useState({
    source: "",
    amount: "",
    date: "",
    icon: "", // You can remove this if no longer needed
  });

  const handleChange = (key, value) => {
    setIncome({
      ...income,
      [key]: key === "amount" ? Number(value) : value, // Convert amount to a number
    });
  };

  return (
    <div>
      {/* Remove EmojiPickerPopup */}
      <Input
        value={income.source}
        onChange={({ target }) => handleChange("source", target.value)}
        label="Income Source"
        placeholder="Freelance, Salary, etc"
        type="text"
      />

      <Input
        value={income.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeholder=""
        type="number"
      />

      <Input
        value={income.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        type="date"
      />
    </div>
  );
};

AddIncomeForm.propTypes = {
  onAddIncome: PropTypes.func.isRequired,
};

export default AddIncomeForm;