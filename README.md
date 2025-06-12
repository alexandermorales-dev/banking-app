![image](https://github.com/user-attachments/assets/84bc09d2-be53-4864-84c2-e23984bb5a29)

This project is a client-side web application simulating basic banking functionalities, built entirely with HTML, CSS, and vanilla JavaScript. It demonstrates modern JavaScript practices, focusing on efficient data manipulation and clear, maintainable code using core array methods.

✨ Features
User Authentication: Simple login (username/PIN based, for demonstration).

Account Overview: Display current balance and recent transactions.

Transfers: Ability to transfer money between accounts.

Loan Request: Request a loan (with a basic approval logic).

Account Closure: Feature to close an account.

Sorting Transactions: Sort transaction history.

💻 Technologies Used
HTML5: For the application's structure and content.

CSS3: For styling and ensuring a responsive, user-friendly interface.

JavaScript (ES6+): For all interactive functionalities and data management.

🚀 Key JavaScript Concepts & Good Practices
This project showcases the power and elegance of modern JavaScript, particularly in handling data within arrays. Emphazising  the following good practices:

1. Effective Use of Arrays as Data Structures
Arrays are fundamental to managing lists of transactions, users, and other dynamic data within the application. They are used to store collections of related items in an ordered manner, allowing for efficient iteration and access.

2. Functional Array Methods (filter, map, reduce, find, etc.)
Instead of traditional for loops, this project extensively uses higher-order array methods like filter, map, and find. These methods promote a more functional programming style, leading to:

Readability: The code becomes more declarative, expressing what you want to achieve rather than how to achieve it step-by-step.

Immutability: Methods like filter and map return new arrays, rather than modifying the original array in place. This helps prevent unintended side effects and makes debugging easier.

Conciseness: Often, a few lines of code with map or filter can replace a much longer for loop.

Array.prototype.filter(): Used to create a new array containing only elements that satisfy a provided testing function.

Example Use Case: Filtering transactions by type (e.g., deposits vs. withdrawals), or finding active users.

Array.prototype.map(): Used to create a new array populated with the results of calling a provided function on every element in the calling array.

Example Use Case: Formatting transaction dates, calculating interest on each transaction, or preparing data for display.

Array.prototype.find(): Returns the value of the first element in the provided array that satisfies the provided testing function.

Example Use Case: Locating a specific user account by username or finding a transaction by its ID.

Array.prototype.reduce(): Executes a user-supplied "reducer" callback function on each element of the array, in order, passing in the return value from the calculation on the preceding element. The final result of running the reducer across all elements of the array is a single value.

Example Use Case: Calculating the total balance from all transactions, summing up all deposits or withdrawals.

🛠️ How to Run
Clone the repository (or download the files):

git clone <repository_url>

Navigate to the project directory:

cd simple-banking-app

Open index.html in your web browser:
Simply double-click index.html or drag it into your browser. No server setup is required as it's a client-side application.

🚀 How to Use the App
To test the application, use the following sample user credentials for login:

![image](https://github.com/user-attachments/assets/368734f7-b2c6-482d-850e-c915875ea2dc)


![image](https://github.com/user-attachments/assets/32f4c541-fa10-420b-bcb5-098e035e7b0a)


💡 Future Enhancements

React | Python | Flask | JWT

Persistence: Implement local storage or a simple backend API to save user data.

More Robust Authentication: Add password hashing and stronger login mechanisms.

User Interface Improvements: Enhance responsiveness and add more visual feedback.

Error Handling: More comprehensive error handling for user inputs and operations.
