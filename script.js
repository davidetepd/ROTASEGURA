

function register(inputEmail, inputPassword, inputPhone, inputEndereco, inputComplemento, inputCidade, inputEstado, inputCep) {
    
    let db = JSON.parse(localStorage.getItem('db')) || [];

    
    for(let user of db) {
        if(user.email === inputEmail) {
            return 'User already exists';
        }
    }

   
    db.push({
        email: inputEmail,
        password: inputPassword,
        phone: inputPhone,
        endereco: inputEndereco,
        complemento: inputComplemento,
        cidade: inputCidade,
        estado: inputEstado,
        cep: inputCep
    });

    localStorage.setItem('db', JSON.stringify(db));

    alert('User registered successfully'); 
    window.location.assign("index.html"); 
    return 'Voltando à página de login'
    

}


function login(inputEmail, inputPassword) {
   
    let db = JSON.parse(localStorage.getItem('db')) || [];

    
    for(let user of db) {
        if(user.email === inputEmail && user.password === inputPassword) {
            
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            localStorage.setItem('usuariologado', user.email);
            return 'Login successful';
        }
    }

    return 'Invalid email or password';
}


function logout() {
    
    localStorage.removeItem('loggedInUser');
    usuariologado = null;
    window.location.href = 'index.html';
    updateGroupList();
}
function cadastrodegrupo() {
    
    let db = JSON.parse(localStorage.getItem('groupDb')) || [];

    
    let nome = document.getElementById('cnome').value;
    let transporte = document.getElementById('ctransporte').value;
    let destino = document.getElementById('cdestino').value;
    let vagas = document.getElementById('cvagas').value;
    let grupo = document.getElementById('cgrupo').value;
    let horario = document.getElementById('chorario').value;
    let donodogrupo = usuariologado;

   
    db.push({
        nome: nome,
        transporte: transporte,
        destino: destino,
        vagas: vagas,
        grupo: grupo,
        horario: horario,
        donodogrupo: donodogrupo
        
    });

    
    localStorage.setItem('groupDb', JSON.stringify(db));

    alert('Group created successfully');
}

function deleteGroup(index) {

    let db = JSON.parse(localStorage.getItem('groupDb')) || [];

    // Verifica se há um usuário logado
    if (!usuariologado) {
        alert('Você precisa estar logado para excluir um grupo.');
        return;
    }

    // Verifica se o usuário logado é o criador do grupo
    if (db[index].donodogrupo !== usuariologado) {
        alert('Você não tem permissão para excluir este grupo.');
        return;
    }

    // Remove o grupo do banco de dados
    db.splice(index, 1);

    // Atualiza o banco de dados local
    localStorage.setItem('groupDb', JSON.stringify(db));

    // Atualiza a lista de grupos na interface do usuário
    updateGroupList();
}