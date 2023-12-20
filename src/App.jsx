import "./App.css";
import Balance from "./balance/Balance";
import Card from "./cards/Card";
import Example from "./button/Button";
import { useEffect, useState } from "react";
import useStore from "./store/store";
import formatNumber from "./formatter/Formatter";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

function App() {
  const particlesInit = useCallback(async engine => {      
    await loadFull(engine);
  }, []);
  
  const particlesLoaded = useCallback(async container => {
  await console.log(container);
  }, []);

  const {expenses, addExpense} = useStore();
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [textIsValid, setTextIsValid] = useState(true);
  const [amountIsValid, setAmountIsValid] = useState(true);
  const [placeHolder, setPlaceHolder] = useState("Enter Text...")
console.log(expenses)
  const addTransactionHandler = () => {
    if (text.trim() === "") {
      setTextIsValid(false);
      return;
    }
    if (amount === 0 ) {
      setAmountIsValid(false);
      return;
    }
    const obj = {
      id: Math.random(),
      text : text,
      amount: Number(Math.abs(amount).toFixed(2)),
      type: amount < 0 ? "EXP" : "INC",
    };
 
  addExpense(obj);
  setAmount("");
  setText("");
  };
  let expIn = 0;
  let expEx = 0;
  let balance = 0;
  const incTransactions = expenses.filter(exp => exp.type === "INC");
  if(incTransactions.length > 1){
   expIn = incTransactions.reduce((ttl, exp) => ttl + exp.amount, 0);
  }else if(incTransactions.length === 1){
   expIn = incTransactions[0].amount
  }else{
    expIn = 0;
  }

  const expTransaction = expenses.filter(exp => exp.type === "EXP");
  console.log(expTransaction)
  if(expTransaction.length > 1){
    expEx = expTransaction.reduce((ttl, exp) => { return ttl + exp.amount}, 0);
  }else if(expTransaction.length === 1){
    expEx = expTransaction[0].amount;
  }else{
    expEx = 0;
  }
  console.log(expEx)
  balance = expIn - expEx;

 const expInc = formatNumber(expIn);
 const expExp = formatNumber(expEx);
  
  const onchangeAmount = e => {
    setAmount(Number(e.target.value));
    setAmountIsValid(true);
  };

  const onchangeText = e => {
    setTextIsValid(true)
    setText(e.target.value);
  };





  return (<>
    <Particles
    id="tsparticles"
    init={particlesInit}
    loaded={particlesLoaded}
    options={{ "fullScreen": true, "background":{ "image":" linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)" }, "particles":{ "number":{ "value":10, "density":{ "enable":true, "value_area":600 } }, "color":{ "value":"#ffffff" }, "shape": { "type": "square", "stroke":{ "width":0, "color":"#000000" }, "polygon":{ "nb_sides":5 } }, "opacity":{ "value":0.25, "random":true, "anim":{ "enable":false, "speed":1, "opacity_min":0.1, "sync":false } }, "size":{ "value":29, "random":true, "anim":{ "enable":false, "speed":2, "size_min":0.1, "sync":false } }, "line_linked":{ "enable":false, "distance":300, "color":"#ffffff", "opacity":0, "width":0 }, "move":{ "enable":true, "speed":0.5, "direction":"top", "straight":true, "out_mode":"out", "bounce":false, "attract":{ "enable":false, "rotateX":600, "rotateY":1200 } } }, "interactivity":{ "detect_on":"canvas", "events":{ "onhover":{ "enable":false, "mode":"repulse" }, "onclick":{ "enable":false, "mode":"push" }, "resize":true }, "modes":{ "grab":{ "distance":800, "line_linked":{ "opacity":1 } }, "bubble":{ "distance":790, "size":79, "duration":2, "opacity":0.8, "speed":3 }, "repulse":{ "distance":400, "duration":0.4 }, "push":{ "particles_nb":4 }, "remove":{ "particles_nb":2 } } }, "retina_detect":true}}
            />
            <div className="container mx-auto px-3">
    
    <div className="max-w-[400px] mx-auto">
      <h1 className="font-semibold text-xl py-5">Expense Tracker</h1>
      <Balance balance={balance}/>
      <section className="bg-white flex justify-around rounded items-center gap-5 p-5 my-5">
        <div>
          <h2 className="font-medium text-md text-black">INCOME</h2>
          <div className="font-medium text-lg text-green-500">{expInc}</div>
        </div>
        <div className="border h-[50px]"></div>
        <div>
          <h2 className="font-medium text-md text-black">EXPENSE</h2>
          <div className="font-medium text-lg text-red-500">{expExp}</div>
        </div>
      </section>

      <div>
        <h2 className="font-medium text-md w-full py-2 border-b">HISTORY</h2>
       <div> {expenses.length === 0 && <h1 className="font-medium text-center">No transaction yet!</h1>}
        {expenses.length > 0 && expenses.map((exp, i) => <Card expenses={exp} key={expenses[i].id} />)}</div>
   
      <div className="py-2">
        <p className="font-medium text-md w-full py-2">Text</p>
        <input onChange={onchangeText} value={text} className={`block text-black h-full w-full px-2 py-3 outline-none border-2 ${!textIsValid ? "border-red-600" : ""}`} type="text" placeholder={placeHolder} />
      </div>
      <div className="font-semibold">
        <p className="font-medium text-md w-full py-2">Amount</p>
        <p>(Negative - Expense, Positive - Income)</p>
      </div>
      <div className="py-2">
        <input onChange={onchangeAmount} value={amount} className={`block text-black h-full w-full px-2 py-3 outline-none border-2 ${!amountIsValid ? "border-red-600" : ""}`} type="number" placeholder="Enter amount" />
      </div>
      {/* transaction button */}
      <div className="my-5">
        <Example handleAddTransaction={addTransactionHandler} />
      </div>
    </div>
  </div>
  </div>
  </>
  )
};

export default App;
