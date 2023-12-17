const Balance = ({balance}) => {
    function formatNumber(amount) {
        if (amount >= 1000000000) {
            return (amount / 1000000000).toFixed(1) + 'B';
        } else if (amount >= 1000000) {
            return (amount / 1000000).toFixed(1) + 'M';
        } else if (amount >= 1000) {
            return (amount / 1000).toFixed(1) + 'k';
        } else {
            return amount.toString();
        }
    }
    let amountBal = 0;
    if(balance){
        amountBal = formatNumber(balance);
    }
    return <div>
    <h1 className="font-medium text-md">YOUR BALANCE</h1>
    <h1 className="font-semibold text-xl">${amountBal}</h1>
    </div>
};

export default Balance;