'use strict';


// Data
const account1 = {
  owner: 'User 1',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  type: 'premium',
};

const account2 = {
  owner: 'User 2',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  type: 'standard',
};

const account3 = {
  owner: 'User 3',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  type: 'premium',
};

const account4 = {
  owner: 'User4 4',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  type: 'basic',
};

const accounts = [account1, account2, account3, account4];

/////////////////////////////////////////////////
// Elements
const loggedOutNavContent = document.querySelector('#welcome-message');
const loggedInWelcomeMessage = document.querySelector('#logged-in-welcome-message');

const loggedInControls = document.querySelector('#logged-in-controls');
const welcomeTextLoggedIn = document.querySelector('#welcome-text-logged-in');
const labelWelcome = document.querySelector('.welcome');
const navBar = document.querySelector('.welcome-container');
const logoDiv = document.querySelector('.logo')

const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const loginForm = document.querySelector('.login')
const btnLogin = document.querySelector('.login__btn');
const btnLogout = document.querySelector('.logout__btn');

const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


/////////////////////////////////////////////////
// Functions

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1
      } ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const insertNewNavbar = () => {
  if (loggedOutNavContent) {
    loggedOutNavContent.style.display = 'none';
  }
  if (logoDiv) {
    logoDiv.style.display = 'none';
  }
  if (loginForm) {
    loginForm.style.display = 'none';
  }

  if (loggedInControls) {
    loggedInControls.style.display = 'flex';
    welcomeTextLoggedIn.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
  }

  if (btnLogout) {
    btnLogout.style.display = 'block';
  }
}

const showLoggedOutState = () => {
  // Hide the logged-in controls
  if (loggedInControls) {
    loggedInControls.style.display = 'none';
    if (btnLogout) {
      btnLogout.style.display = 'none';
    }
  }

  // Show the individual elements for the logged-out state
  if (loggedOutNavContent) {
    loggedOutNavContent.style.display = 'flex';
  }
  if (logoDiv) { 
    logoDiv.style.display = 'flex';
  }
  if (loginForm) { 
    loginForm.style.display = 'flex';
  }

  labelWelcome.textContent = 'Log in to get started';

  if (timer) {
    clearInterval(timer);
  }
  labelTimer.textContent = '05:00';

};

///////////////////////////////////////
// Event handlers
let currentAccount;
let timer;

showLoggedOutState()
const startLogoutTimer = function () {
  let time = 300; // 5 minutes in seconds

  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    labelTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      clearInterval(timer); 
      containerApp.style.opacity = 0; 
      showLoggedOutState(); 
      currentAccount = undefined;
      labelWelcome.textContent = 'Log in to get started'; 
    }

    time--;
  };

  if (timer) {
    clearInterval(timer);
  }

  tick(); 
  timer = setInterval(tick, 1000); 
  return timer; 
};

loginForm.addEventListener('submit', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (!currentAccount) {
    alert('User not found')
    return
  }

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    insertNewNavbar()
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]
      }`;
    containerApp.style.opacity = 1;

    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUI(currentAccount);
    startLogoutTimer();

  }
});

if (btnLogout) {
  btnLogout.addEventListener('click', function (e) {
    e.preventDefault();

    containerApp.style.opacity = 0;

    showLoggedOutState();

    currentAccount = undefined;
    labelWelcome.textContent = 'Log in to get started';
  });
}


btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {

    currentAccount.movements.push(amount);

    
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    accounts.splice(index, 1);

    containerApp.style.opacity = 0;

    showLoggedOutState()

    inputCloseUsername.value = inputClosePin.value = '';

    currentAccount = undefined;

  }

});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});



const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
