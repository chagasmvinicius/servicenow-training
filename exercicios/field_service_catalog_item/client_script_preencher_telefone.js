/*
Nome: "VC: Preencher telefone do solicitante"
Tipo: onChange (telefone)
URL: https://dev96986.service-now.com/nav_to.do?uri=%2Fcatalog_script_client.do%3Fsys_id%3Dac64562f070101101590f19d7c1ed0e6
*/

function onChange(control, oldValue, newValue, isLoading) {
    if (newValue == '') {
        g_form.clearValue('telefone');
        return;
    }

    var ga = new GlideAjax('UserUtils');
    ga.addParam('sysparm_name', 'getPhone'); //declarar o nome do método como parâmetro "sysparm_name" (parâmetro com nome fixo)
    ga.addParam('sysparm_user', newValue); //declarar o valor que será enviado no parâmetro chamado no método "getPhone"
    ga.getXML(callback);

    function callback(response) {
        var answer = response.responseXML.documentElement.getAttribute('answer');
        answer ? g_form.setValue('telefone', answer) : g_form.setValue('telefone', 'Telefone não cadastrado na base. Insira.');
    }
}