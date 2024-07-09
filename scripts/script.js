const form = document.forms.addUser;
const younger = document.querySelector(".younger");
const elder = document.querySelector(".elder");
const other = document.querySelector(".other");
let inputs = document.querySelectorAll("input");

let userDB = [
  {
    id: 0.432,
    name: "Fleming",
    age: 24,
  },
];

const pattern = {
  name: /^[a-z ,.'-]+$/i,
  age: /^\S[0-9]{0,3}$/,
};

function validate(field, regex) {
  if (regex.test(field.value)) {
    field.style.border = "1px solid green";
  } else {
    field.style.border = "1px solid red";
  }
}

inputs.forEach((inp) => {
  inp.onkeyup = () => {
    validate(inp, pattern[inp.name]);
  };
});

const reload = (arr) => {
  younger.innerHTML = "";
  elder.innerHTML = "";
  other.innerHTML = "";

  for (let item of arr) {
    const user__card = document.createElement("div");
    const userName = document.createElement("h1");
    const user__cardAge = document.createElement("div");
    const ageP = document.createElement("p");
    const userAge = document.createElement("p");

    user__card.classList.add("user__card");
    userName.innerHTML = item.name;
    user__cardAge.classList.add("user__card-age");
    ageP.innerHTML = "Age";
    userAge.innerHTML = item.age;

    user__card.append(userName, user__cardAge);
    user__cardAge.append(ageP, userAge);

    if (item.age <= 25) {
      younger.append(user__card);
    } else if (item.age >= 25 && item.age <= 50) {
      elder.append(user__card);
    } else if (item.age >= 51) {
      other.append(user__card);
    }
  }
};

form.onsubmit = (e) => {
  e.preventDefault();
  let errCount = 0;

  let user = {
    id: Math.random(),
  };

  let fm = new FormData(form);

  fm.forEach((value, key) => {
    user[key] = value;
  });

  inputs.forEach((inp) => {
    if (inp.value.length === 0) {
      errCount = 1;
    }
  });
  errCount === 0
    ? userDB.push(user)
    : inputs.forEach((inp) => (inp.style.border = "1px solid red"));
  reload(userDB);
};
reload(userDB);
