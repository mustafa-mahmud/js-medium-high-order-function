'use strict';

const addUser = document.getElementById('add-user');
const double = document.getElementById('double');
const showMillionaires = document.getElementById('show-millionaires');
const sort = document.getElementById('sort');
const calculateWealth = document.getElementById('calculate-wealth');
const reset = document.getElementById('reset');
const main = document.getElementById('main');

let usersArr = [];

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

  displayUI(usersArr);
};

const displayUI = (data) => {
  main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;

  data.forEach((data) => {
    main.innerHTML += `
		<div class="person">
				<img width="40" height="40"
					src="${data.img}"
					alt="">
				<strong>${data.name}</strong>
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

  displayUI(usersArr);
};

fetchData(5);

/////////////////////
/////////////////////
addUser.addEventListener('click', () => fetchData(1));
double.addEventListener('click', doubleMoney);
