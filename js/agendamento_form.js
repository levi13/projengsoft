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

    // Exibe a mensagem de sucesso e oculta o formulário
    document.getElementById('agendamento-form').style.display = 'none';
    document.getElementById('success-message').style.display = 'block';

    // Configura os botões de navegação após exibir a mensagem de sucesso
    const novoAgendamentoBtn = document.createElement('button');
    novoAgendamentoBtn.textContent = "Criar Novo Agendamento";
    novoAgendamentoBtn.addEventListener('click', function() {
        window.location.href = 'agendamento_form.html';
    });

    const voltarHomeBtn = document.createElement('button');
    voltarHomeBtn.textContent = "Voltar à Página Inicial";
    voltarHomeBtn.addEventListener('click', function() {
        window.location.href = 'index.html';
    });

    // Adiciona os botões após a mensagem de sucesso
    const successMessage = document.getElementById('success-message');
    successMessage.appendChild(novoAgendamentoBtn);
    successMessage.appendChild(voltarHomeBtn);
});
