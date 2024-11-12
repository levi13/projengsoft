<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de Agendamentos</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header>
        <h1>Lista de Agendamentos</h1>
    </header>

    <main>
        <ul id="agendamentos-list"></ul> <!-- Aqui será exibida a lista de agendamentos -->

        <a href="agendamento_form.html" class="back-button">Criar Novo Agendamento</a>

        <div id="no-agendamentos" style="display:none;">Nenhum agendamento encontrado.</div> <!-- Mensagem de nenhum agendamento -->
    </main>

    <script src="js/agendamentos_list.js"></script> <!-- Certifique-se de que este arquivo é carregado -->

    <script>
        // Função para atualizar a lista de agendamentos
        function atualizarListaDeAgendamentos() {
            // Verifica se o localStorage está disponível
            if (typeof(Storage) !== "undefined") {
                let agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
                const listElement = document.getElementById('agendamentos-list');
                const noAgendamentosMessage = document.getElementById('no-agendamentos');
                listElement.innerHTML = ''; // Limpa a lista atual

                if (agendamentos.length > 0) {
                    // Exibe a lista de agendamentos
                    agendamentos.forEach((agendamento, index) => {
                        const li = document.createElement('li');
                        li.textContent = `Descrição: ${agendamento.descricao}, Data: ${agendamento.data}, Hora: ${agendamento.hora}`;
                        listElement.appendChild(li);
                    });
                    noAgendamentosMessage.style.display = 'none'; // Esconde a mensagem "Nenhum agendamento"
                } else {
                    // Exibe a mensagem "Nenhum agendamento encontrado"
                    noAgendamentosMessage.style.display = 'block';
                }
            } else {
                alert("Desculpe, seu navegador não suporta localStorage!");
            }
        }

        // Atualiza a lista de agendamentos ao carregar a página
        document.addEventListener('DOMContentLoaded', function () {
            atualizarListaDeAgendamentos();
        });
    </script>
</body>
</html>
