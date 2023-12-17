import "./App.css";
import Balance from "./balance/Balance";
import Card from "./cards/Card";
import Example from "./button/Button";
import { useEffect, useState } from "react";
import useStore from "./store/store";


function App() {
  const {expenses, addExpense} = useStore();
  console.log(expenses)
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [textIsValid, setTextIsValid] = useState(true);
  const [amountIsValid, setAmountIsValid] = useState(true);
  const [placeHolder, setPlaceHolder] = useState("Enter Text...")

  const addTransactionHandler = () => {
   
    if (text.trim() === "") {
      setTextIsValid(false);
      return;
    }
    if (Number(amount) === 0 || amount.trim() === "") {
      setAmountIsValid(false);
      return;
    }
    const obj = {
      id: Math.random(),
      text : text,
      amount: Number(Math.abs(amount)),
      type: Number(amount) < 0 ? "EXP" : "INC",
    };
 
    addExpense(obj);
  setAmount("");
  setText("");
  };
  let expIn = 0;
  let expEx = 0;
  let balance = 0;
  const incTransactions = expenses.filter(exp => exp.type === "INC");
  console.log(incTransactions)
  if(incTransactions.length > 1){
   expIn = incTransactions.reduce((ttl, exp) => ttl.amount + exp.amount, 0);
  }else if(incTransactions.length === 1){
   expIn = incTransactions[0].amount
  }else{
    expIn = 0;
  }
  console.log(expIn);
  const expTransaction = expenses.filter(exp => exp.type === "EXP");
  console.log(expTransaction)
  if(expTransaction.length > 1){
    expEx = expTransaction.reduce((ttl, exp) => ttl.amount + exp.amount, 0);
  }else if(expTransaction.length === 1){
    expEx = expTransaction[0].amount;
  }else{
    expEx = 0;
  }
  console.log(expEx);
  balance = expIn - expEx;



  
  const onchangeAmount = e => {
    setAmount(e.target.value);
    setAmountIsValid(true);
  };

  const onchangeText = e => {
    setTextIsValid(true)
    setText(e.target.value);
  };





  return (<div className="container mx-auto">
    <div className="max-w-[400px] mx-auto">
      <h1 className="font-semibold text-xl py-5">Expense Tracker</h1>
      <Balance balance={balance}/>
      <section className="bg-white flex justify-around rounded items-center gap-5 p-5 my-5">
        <div>
          <h2 className="font-medium text-md">INCOME</h2>
          <div className="font-medium text-lg text-green-500">{expIn}</div>
        </div>
        <div className="border h-[50px]"></div>
        <div>
          <h2 className="font-medium text-md">EXPENSE</h2>
          <div className="font-medium text-lg text-red-500">{expEx}</div>
        </div>
      </section>

      <div>
        <h2 className="font-medium text-md w-full py-2 border-b">HISTORY</h2>
       <div> {expenses.length === 0 && <h1 className="font-medium text-center">No transaction yet!</h1>}
        {expenses.length > 0 && expenses.map((exp, i) => <Card expenses={exp} key={expenses[i].id} />)}</div>
   
      <div className="py-2">
        <p className="font-medium text-md w-full py-2">Text</p>
        <input onChange={onchangeText} value={text} className={`block h-full w-full px-2 py-3 outline-none border-2 ${!textIsValid ? "border-red-600" : ""}`} type="text" placeholder={placeHolder} />
      </div>
      <div className="font-semibold">
        <p className="font-medium text-md w-full py-2">Amount</p>
        <p>(Negative - Expense, Positive - Income)</p>

      </div>
      <div className="py-2">
        <input onChange={onchangeAmount} value={amount} className={`block h-full w-full px-2 py-3 outline-none border-2 ${!amountIsValid ? "border-red-600" : ""}`} type="number" placeholder="Enter amount" />
      </div>
      {/* transaction button */}
      <div className="my-5">
        <Example handleAddTransaction={addTransactionHandler} />
      </div>
    </div>
  </div>
  </div>
  )
};

export default App;
