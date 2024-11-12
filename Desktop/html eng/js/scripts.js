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

// Preencher formulário de edição com dados existentes
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const agendamentoId = urlParams.get('id');

    if (agendamentoId) {
        // Carregar dados do agendamento (isso seria feito normalmente com AJAX ou outra chamada para o back-end)
        // Para fins de demonstração, vamos simular preenchendo com dados estáticos
        if (agendamentoId == 1) {
            document.getElementById('data').value = '2024-11-15';
            document.getElementById('hora').value = '10:00';
            document.getElementById('descricao').value = 'Reunião com João';
        } else if (agendamentoId == 2) {
            document.getElementById('data').value = '2024-11-16';
            document.getElementById('hora').value = '14:00';
            document.getElementById('descricao').value = 'Reunião com Maria';
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
