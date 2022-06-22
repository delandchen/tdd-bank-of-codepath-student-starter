import * as React from "react"
import "./AddTransaction.css"

export default function AddTransaction({ form, setForm, isCreating, setIsCreating, handleOnSubmit }) {
  const [amount, setAmount] = React.useState(0);
  const [category, setCategory] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleOnFormFieldChange = (event) => {
    if (event.target.name == "description" && event.target.value) {
      setDescription(event.target.value);
    }
    if (event.target.name == "amount" && event.target.value) {
      setAmount(event.target.value);

    }
    if (event.target.name == "category" && event.target.value) {
      setCategory(event.target.value)

    }

    setForm({ amount: amount, description: description, category: category });
  }

  return (
    <div className="add-transaction">
      <h2>Add Transaction</h2>

      <AddTransactionForm form={form} setForm={setForm}
        handleOnSubmit={handleOnSubmit} handleOnFormFieldChange={handleOnFormFieldChange}
        isCreating={isCreating} setIsCreating={setIsCreating} setAmount={setAmount} setCategory={setCategory}
        setDescription={setDescription} amount={amount} category={category} description={description} />
    </div>
  )
}

export function AddTransactionForm({ amount, category, description, form, setForm, handleOnSubmit, handleOnFormFieldChange, isCreating, setIsCreating }) {
  return (
    <div className="form">
      <div className="fields">
        <div className="field">
          <label>Description</label>
          <input placeholder="Add description" name="description"
            value={description} onChange={handleOnFormFieldChange} type="text" />
        </div>
        <div className="field">
          <label>Category</label>
          <input placeholder="Add category" name="category"
            value={category} onChange={handleOnFormFieldChange} type="text" />
        </div>
        <div className="field half-flex">
          <label>Amount (cents)</label>
          <input placeholder="Add amount" name="amount" type="number"
            value={amount} onChange={handleOnFormFieldChange} />
        </div>

        <button className="btn add-transaction" type="submit">
          Add
        </button>
      </div>
    </div>
  )
}
