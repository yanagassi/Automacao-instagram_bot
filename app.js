const { exec } = require('child_process');
const request = require('request');


set_seguido = (id,perfil_seguir) =>{
    request(`http://localhost:3000/users/seguir?id=${id}&pessoa=${perfil_seguir}`, function (error, response, body) {
        body = JSON.parse(body);
        if(body.status === "sucess"){
            console.log(`[NOITCE] -> O usuario: ${perfil_seguir} seguido com sucesso !`);
        }else{
            console.log(`[ERROR] -> Não foi possivel seguir o usuario: ${perfil_seguir}!`);
        }
    });
}

seguir = (id, perfil_seguir) =>{
    request(`http://localhost:3000/users?id=${id}`, function (error, response, body) {
        body = JSON.parse(body);
        let command = `cd robot && casperjs seguir.js ${body[0].usuario} ${body[0].senha} ${perfil_seguir}`;
        exec(command, (err, stdout, stderr) => {
            let json = JSON.parse(stdout);
            if(json === undefined) return;
            if(json.status === "sucess"){
               set_seguido(id,perfil_seguir)                
            }
        });
    });
}

init = (id) =>{
    request(`http://localhost:3000/users/lista?id=${id}`, function (error, response, body) {
        body = JSON.parse(body);
        if(body.length <= 0 ){
            console.log("Lista de usuario esgotada");
            return;
        }
        body.forEach(element => { 
            setTimeout(() => {
                seguir(id,element.pessoa)
            },2000);
        });
    });
}
    



init('5c6c14a96fdf740dec775960');
