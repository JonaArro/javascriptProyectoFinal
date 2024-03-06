const formRegister = document.querySelector("#formReg"),
  nameReg = document.querySelector("#regName"),
  mailReg = document.querySelector("#regMail"),
  passReg = document.querySelector("#regPass"),
  btnReg = document.querySelector("regBtn");

let users = JSON.parse(localStorage.getItem("users")) || [];

class User {
  constructor(name, mail, pass) {
    this.name = name;
    this.mail = mail;
    this.pass = pass;
  }
}

function saveLs(arr) {
  return localStorage.setItem("users", JSON.stringify(arr));
}

formRegister.addEventListener("submit", (e) => {
  e.preventDefault();
  const newUser = new User(nameReg.value, mailReg.value, passReg.value);
  users.push(newUser);
  saveLs(users);
  formRegister.reset();
});
