function solution(A, D) {
    var balance = 0;
    var fee_months = 0;
    var card_payments = [];

    // Sort transactions by date
    var transactions = A.map((amount, index) => {
        return {
            amount: amount,
            date: D[index]
        };
    }).sort((a, b) => new Date(a.date) - new Date(b.date));

    for (var i = 0; i < transactions.length; i++) {
        balance += transactions[i].amount;

        // Check if it was a card payment
        if (transactions[i].amount < 0) {
            card_payments.push(transactions[i].date.slice(0, 7)); // Store month of payment
        }

        // Check if fee needs to be applied at end of month
        if (transactions[i].date.slice(5, 7) === "01" && card_payments.filter(month => month === transactions[i].date.slice(0, 7)).length < 3) {
            balance -= 5;
            fee_months += 1;
            card_payments = []; // Reset for new month
        }
    }

    return balance;
}

console.log(solution([100, 100, 100, -10], ["2020-12-31", "2020-12-22", "2020-12-03", "2020-12-29"]));  
console.log(solution([180, -50, -25, -25], ["2020-01-01", "2020-01-01", "2020-01-01", "2020-01-31"]));
