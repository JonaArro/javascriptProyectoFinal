const formRegister = document.querySelector("#formReg"),
  nameReg = document.querySelector("#regName"),
  mailReg = document.querySelector("#regMail"),
  passReg = document.querySelector("#regPass"),
  btnReg = document.querySelector("#regBtn");

const firebaseConfig = {
  apiKey: "AIzaSyAXo_tyQx5u6xDk-e-abG-UlQCSrQ1V9Dc",
  authDomain: "proyectofinalcoderjonaarro.firebaseapp.com",
  projectId: "proyectofinalcoderjonaarro",
  storageBucket: "proyectofinalcoderjonaarro.appspot.com",
  messagingSenderId: "602800187537",
  appId: "1:602800187537:web:f9f724917ac227f29e7730",
  measurementId: "G-7BN050VLHX",
};
firebase.initializeApp(firebaseConfig);

function readJsonFile(callback) {
  fetch("../db/usuarios.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => callback(data))
    .catch((error) => console.error("Error al leer el archivo JSON:", error));
}

function saveToJsonFile(usersArray) {
  const jsonContent = JSON.stringify(usersArray, null, 2);
  fetch("../db/usuarios.json", {
    method: "PUT",
    body: jsonContent,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log("¡Archivo JSON guardado exitosamente!");
    })
    .catch((error) =>
      console.error("Error al guardar en el archivo JSON:", error)
    );
}

formRegister.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = mailReg.value;
  const password = passReg.value;

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Usuario registrado:", user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error al registrar usuario:", errorMessage);
    });
});

formRegister.addEventListener("submit", (e) => {
  e.preventDefault();
  readJsonFile((users) => {
    const existingUser = users.find((user) => user.mail === mailReg.value);

    if (existingUser) {
      Swal.fire({
        position: "justify",
        icon: "warning",
        title: "Ya existe un usuario registrado con este correo electrónico.",
        showConfirmButton: true,
      });
      return;
    }

    if (!nameReg.value || !mailReg.value || !passReg.value) {
      Swal.fire({
        position: "justify",
        icon: "error",
        title: "Todos los campos son obligatorios.",
        showConfirmButton: true,
      });
      return;
    }

    if (existingUser && existingUser.status === "blocked") {
      Swal.fire({
        position: "justify",
        icon: "error",
        title: "No puedes registrar un usuario bloqueado.",
        showConfirmButton: true,
      });
      return;
    }

    let newId = 1;
    if (users.length > 0) {
      newId = users[users.length - 1].id + 1;
    }

    const newUser = {
      id: newId,
      name: nameReg.value,
      mail: mailReg.value,
      pass: passReg.value,
      status: "new",
    };

    users.push(newUser);
    saveToJsonFile(users);

    Swal.fire({
      position: "justify",
      icon: "success",
      title: "Usuario creado exitosamente",
      showConfirmButton: true,
    }).then(() => {
      formRegister.reset();
      // Redireccionar a la pantalla de inicio de sesión
      window.location.href = "../pages/login.html";
    });
  });
});
