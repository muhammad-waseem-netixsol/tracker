export default function formatNumber(amount) {
    if (amount >= 1000000000 || amount <= -1000000000) {
        return (amount / 1000000000).toFixed(1) + 'B';
    } else if (amount >= 1000000 || amount <= -1000000) {
        return (amount / 1000000).toFixed(1) + 'M';
    } else if (amount >= 1000 || amount <= -1000) {
        return (amount / 1000).toFixed(1) + 'k';
    } else {
        return amount.toString();
    }
}

