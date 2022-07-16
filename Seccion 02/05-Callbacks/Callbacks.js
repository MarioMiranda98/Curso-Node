const getUserById = (id, callback) => {
    const usuario = {
        id,
        nombre: 'Mario'
    };

    setTimeout(() => {callback(usuario)}, 1500);
}

getUserById(10, (usuario) => {
    console.log(usuario);
});