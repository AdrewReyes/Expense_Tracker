import React, { useState } from "react";
import Input from "../Inputs/Input";

const AddExpenseForm = ({ onAddExpense }) => {
  const [income, setIncome] = useState({
    category: "",
    amount: "",
    date: "",
    icon: "", // You can remove this if no longer needed
  });

  const handleChange = (key, value) => setIncome({ ...income, [key]: value });

  return (
    <div>
      {/* Remove EmojiPickerPopup */}
      <Input
        value={income.category}
        onChange={({ target }) => handleChange("category", target.value)}
        label="Category"
        placeholder="Rent, Groceries, etc"
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

export default AddExpenseForm;