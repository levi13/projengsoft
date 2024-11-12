// Função para excluir um agendamento
function excluirAgendamento(index) {
    if (confirm('Tem certeza que deseja excluir este agendamento?')) {
        // Pega os agendamentos do localStorage
        let agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];

        // Remove o agendamento do array pelo índice
        agendamentos.splice(index, 1);

        // Atualiza o localStorage com a lista de agendamentos modificada
        localStorage.setItem('agendamentos', JSON.stringify(agendamentos));

        // Atualiza a lista na página
        atualizarListaDeAgendamentos();

        console.log('Agendamento ' + index + ' excluído');
    }
}

// Função para atualizar a URL e exibir a página correspondente
function atualizarURL(path) {
    history.pushState(null, null, path); // Atualiza a URL
    exibirPagina(path); // Exibe a página correspondente
}

// Função para exibir o conteúdo de acordo com a URL
function exibirPagina(path) {
    const indexPage = document.getElementById('index');
    const formPage = document.getElementById('form');
    const listPage = document.getElementById('list');

    // Esconde todas as páginas
    indexPage.style.display = 'none';
    formPage.style.display = 'none';
    listPage.style.display = 'none';

    // Exibe a página correta com base na URL
    if (path === '/agendamento_form') {
        formPage.style.display = 'block';
    } else if (path === '/agendamentos_list') {
        listPage.style.display = 'block';
    } else {
        indexPage.style.display = 'block'; // Página inicial
    }
}

// Preencher formulário de edição com dados existentes
document.addEventListener('DOMContentLoaded', function() {
    // Exibe a página correta ao carregar
    const path = window.location.pathname;
    exibirPagina(path);

    const urlParams = new URLSearchParams(window.location.search);
    const agendamentoId = urlParams.get('id');

    if (agendamentoId) {
        let agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
        const agendamento = agendamentos[agendamentoId];
        if (agendamento) {
            document.getElementById('data').value = agendamento.data;
            document.getElementById('hora').value = agendamento.hora;
            document.getElementById('descricao').value = agendamento.descricao;
        }
    }

    // Atualiza a lista de agendamentos ao carregar a página
    atualizarListaDeAgendamentos();
});

// Salvar o agendamento
document.getElementById('agendamento-form').addEventListener('submit', function(e) {
    e.preventDefault();  // Impede o envio do formulário padrão

    // Pega os dados do formulário
    const data = document.getElementById('data').value;
    const hora = document.getElementById('hora').value;
    const descricao = document.getElementById('descricao').value;

    // Cria o objeto do agendamento
    const agendamento = {
        data: data,
        hora: hora,
        descricao: descricao
    };

    // Armazena o agendamento no localStorage
    let agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
    agendamentos.push(agendamento);
    localStorage.setItem('agendamentos', JSON.stringify(agendamentos));

    // Verifica se os agendamentos estão sendo salvos corretamente
    console.log("Agendamentos armazenados:", agendamentos);  // Verifique o console para ver os agendamentos

    // Exibe a mensagem de sucesso
    document.getElementById('success-message').style.display = 'block';
    setTimeout(() => {
        document.getElementById('success-message').style.display = 'none';
    }, 2000);

    // Atualiza a lista de agendamentos após salvar
    atualizarListaDeAgendamentos();
});

// Função para atualizar a lista de agendamentos
function atualizarListaDeAgendamentos() {
    let agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];

    const listElement = document.getElementById('agendamentos-list');
    listElement.innerHTML = ''; // Limpa a lista atual

    if (agendamentos.length > 0) {
        agendamentos.forEach((agendamento, index) => {
            const li = document.createElement('li');
            li.id = 'agendamento-' + index;
            li.textContent = `Descrição: ${agendamento.descricao}, Data: ${agendamento.data}, Hora: ${agendamento.hora}`;

            // Cria o botão de exclusão
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Excluir';
            deleteButton.onclick = function() {
                excluirAgendamento(index);  // Exclui o agendamento
            };

            // Adiciona o botão ao item da lista
            li.appendChild(deleteButton);

            // Adiciona o item da lista ao elemento de lista
            listElement.appendChild(li);
        });
    } else {
        // Caso não haja agendamentos, exibe uma mensagem
        const li = document.createElement('li');
        li.textContent = "Nenhum agendamento encontrado.";
        listElement.appendChild(li);
    }
}

// Navegação entre páginas
document.getElementById('nav-index').addEventListener('click', function() {
    atualizarURL('/');  // Voltar para a página inicial
});
document.getElementById('nav-form').addEventListener('click', function() {
    atualizarURL('/agendamento_form');  // Ir para o formulário
});
document.getElementById('nav-list').addEventListener('click', function() {
    atualizarURL('/agendamentos_list');  // Ir para a lista de agendamentos
});
