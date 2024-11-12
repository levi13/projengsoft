// Função para excluir um agendamento
function excluirAgendamento(index) {
    // Confirmação antes de excluir
    if (confirm('Tem certeza que deseja excluir este agendamento?')) {
        // Pega os agendamentos do localStorage
        let agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];

        // Remove o agendamento pela posição (index)
        agendamentos.splice(index, 1);

        // Atualiza o localStorage
        localStorage.setItem('agendamentos', JSON.stringify(agendamentos));

        // Atualiza a lista na tela
        atualizarListaDeAgendamentos();

        console.log(`Agendamento ${index} excluído`);
    }
}

// Função para atualizar a lista de agendamentos
function atualizarListaDeAgendamentos() {
    let agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];

    const listElement = document.getElementById('agendamentos-list');
    listElement.innerHTML = ''; // Limpa a lista atual

    console.log('Agendamentos carregados:', agendamentos);  // Verifique se a lista de agendamentos está sendo carregada corretamente

    if (agendamentos.length > 0) {
        agendamentos.forEach((agendamento, index) => {
            const li = document.createElement('li');
            li.id = 'agendamento-' + index;
            li.textContent = `Descrição: ${agendamento.descricao}, Data: ${agendamento.data}, Hora: ${agendamento.hora}`;

            // Adiciona o botão de excluir
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Excluir';
            deleteButton.onclick = function() {
                excluirAgendamento(index); // Exclui o agendamento
            };
            li.appendChild(deleteButton);

            // Adiciona o item à lista
            listElement.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.textContent = "Nenhum agendamento encontrado.";
        listElement.appendChild(li);
    }
}


// Chama a função para carregar a lista de agendamentos quando a página for carregada
document.addEventListener('DOMContentLoaded', function() {
    atualizarListaDeAgendamentos();  // Atualiza a lista de agendamentos ao carregar a página
});
