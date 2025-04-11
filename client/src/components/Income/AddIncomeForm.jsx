import { useState } from "react";
import PropTypes from "prop-types";
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";

const AddIncomeForm = ({ onAddIncome }) => {
  const [income, setIncome] = useState({
    source: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) => {
    setIncome({
      ...income,
      [key]: key === "amount" ? Number(value) : value, // Convert amount to a number
    });
  };

  return (
    <div>
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

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
        placeholder=""
        type="date"
      />

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={() => {
            if (!income.source.trim()) {
              alert("Income source is required.");
              return;
            }

            if (!income.amount || isNaN(income.amount) || income.amount <= 0) {
              alert("Amount must be a valid number greater than 0.");
              return;
            }

            if (!income.date) {
              alert("Date is required.");
              return;
            }

            onAddIncome(income);
          }}
        >
          Add Income
        </button>
      </div>
    </div>
  );
};

AddIncomeForm.propTypes = {
  onAddIncome: PropTypes.func.isRequired,
};

export default AddIncomeForm;