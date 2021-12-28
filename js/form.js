var botaoAdicionar = document.querySelector("#adicionarPaciente");
botaoAdicionar.addEventListener("click", function(Event) {
    Event.preventDefault();

    var form = document.querySelector("#adicionarForm");

    //obter infos do formulário

    var paciente = obtemInfosForm(form);

    var erros = validaPaciente(paciente);

    if(erros.length > 0) {
        var mensagemErro = document.querySelector("#mensagem-erro");
        exibeMensagensdeErro(erros);

        return;
    }

    adicionaPacienteNaTabela(paciente);

form.reset();

var msgDeErro = document.querySelector("#mensagens-erro");
msgDeErro.innerHTML = "";

});

function adicionaPacienteNaTabela(paciente) {   
    var pacienteTr = montaTr(paciente);
    var tabela = document.querySelector("#tabela-pacientes");
    tabela.appendChild(pacienteTr);
}

function obtemInfosForm(form) {

    var paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value, form.altura.value)
    }

    return paciente;
}

function montaTr(paciente) {

    var pacienteTr = document.createElement("tr");
    pacienteTr.classList.add("paciente");

    pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"));
    pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
    pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
    pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
    pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"));
    
    return pacienteTr;

};

function montaTd(dado, classe) {
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);

    return td;

}

function validaPaciente(paciente) {

    var erros = [];

    if(paciente.nome.length == 0){
        erros.push("O campo nome não pode estar em branco");
    }

    if (!validaPeso(paciente.peso)) {
        erros.push("O peso é inválido");
    }

    if (!validaAltura(paciente.altura)) {
        erros.push("A altura é inválida");
    } 

    if(paciente.gordura.length == 0){
        erros.push("O campo gordura não pode estar em branco")
    }

    if(paciente.peso.length == 0){
        erros.push("O campo peso não pode estar em branco")
    }

    if(paciente.altura.length == 0){
        erros.push("O campo altura não pode estar em branco")
    }

    return erros;
}

function exibeMensagensdeErro(erros){
    var ul = document.querySelector("#mensagens-erro");
    ul.innerHTML = "";

    erros.forEach((erro) => {
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
    });
}