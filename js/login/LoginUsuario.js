let logado = JSON.parse(localStorage.getItem("logado"));
let usuario = localStorage.getItem("numeUsuario");
let login = new EventEmitter2();

LoginUsuario_render({
    logado: logado
    ,usuario: localStorage.getItem("nomeUsuario")
    ,onLogin: (nome) => {
        logado = true;
        localStorage.setItem("logado", true);
        localStorage.setItem("nomeUsuario", nome);
        usuario = nome;
        login.emit("login");
    }
    ,onLogout: () => {
        logado = false;
        localStorage.setItem("logado", false);
        localStorage.removeItem("nomeUsuario");
        login.emit("logout");
    }
});