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

    // Exibe a mensagem de sucesso
    document.getElementById('agendamento-form').style.display = 'none'; // Esconde o formulário
    document.getElementById('success-message').style.display = 'block';  // Exibe a mensagem de sucesso

    // Configura os botões de navegação
    document.getElementById('novo-agendamento').addEventListener('click', function() {
        window.location.href = 'projengsoft/agendamento_form.html';  // Redireciona para a página de criação de agendamento
    });

    document.getElementById('voltar-home').addEventListener('click', function() {
        window.location.href = 'projengsoft/index.html';  // Redireciona para a tela inicial
    });
});
