import "./Card.css";
import useStore from "../store/store";
const Card = ({ expenses }) => {
  const { removeExpense } = useStore();
  const onDeleteTransactionHandler = () => {
    console.log("deleting..")
    removeExpense(expenses.id);
  };
    return <div onClick={onDeleteTransactionHandler} className={`cursor-pointer card-wrapper relative overflow-hidden hover:scale-105 ease duration-700 w-full my-2 flex justify-between items-center bg-white p-3 rounded ${expenses.type === "EXP" ? "border-red-500" : "border-green-500"}  border-r-4 shadow-lg`}>
    <div className="card-overlay hidden text-white font-medium justify-center items-center top-0 w-full h-full bg-red-900">DELETE</div>
<div className="capitalize font-medium">{expenses.text}</div>
<div className={`${expenses.type === "EXP" ? "text-red-500" : "text-green-500"}`}>{expenses.amount}</div>
</div>
};

export default Card;