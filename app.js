'use strict';

const addUser = document.getElementById('add-user');
const double = document.getElementById('double');
const showMillionaires = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealth = document.getElementById('calculate-wealth');
const reset = document.getElementById('reset');
const main = document.getElementById('main');

let usersArr = [];
let richest = false;

//⭐
const fetchData = async (users) => {
  const res = await fetch(`https://randomuser.me/api/?results=${users}`);
  const data = await res.json();

  data.results.forEach((user) => {
    usersArr.push({
      name: `${user.name.first} ${user.name.last}`,
      img: `${user.picture.thumbnail}`,
      money: randomMoney(),
    });
  });

  displayUI(usersArr, richest);
};

const displayUI = (data, richest = null) => {
  main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;

  data.forEach((data) => {
    main.innerHTML += `
		<div class="person">
				<img width="40" height="40"
					src="${data.img}"
					alt="">
				<strong>${data.name}</strong>
				<strong class="milli ${richest ? 'show' : ''}">${
      data.money > 1000000 - 1 ? '⭐' : ''
    }</strong>
				<span>$${data.money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>
			</div>
		`;
  });
};

const randomMoney = () => {
  const money = Math.floor(Math.random() * 1000000);
  return money;
};

const doubleMoney = () => {
  usersArr.map((user) => (user.money = user.money * 2));

  displayUI(usersArr, richest);
};

const millionaires = function () {
  richest = richest ? false : true;
  displayUI(usersArr, richest);
};

const sortRicest = function () {
  usersArr = usersArr.sort((a, b) => b.money - a.money);
  displayUI(usersArr, richest);
};

const totalWealth = function () {
  const allUserMoney = usersArr.map((mon) => mon.money);
  const total = allUserMoney.reduce((acc, cur) => acc + cur, 0);

  main.innerHTML += `
		<div>
			<h3>Total Wealth: <strong>$${total
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, '$&,')}</strong></h3>
		</div>
	`;
};

///////////////////
//CALL FUNCTION
//////////////////
fetchData(5);

/////////////////////
//EVENT LISTENERS
/////////////////////
addUser.addEventListener('click', () => fetchData(1));
double.addEventListener('click', doubleMoney);
showMillionaires.addEventListener('click', millionaires);
sortBtn.addEventListener('click', sortRicest);
calculateWealth.addEventListener('click', totalWealth);
