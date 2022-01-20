/*
Nome: "VC: Preencher telefone do solicitante"
URL: https://dev96986.service-now.com/nav_to.do?uri=%2Fcatalog_script_client.do%3Fsys_id%3Dac64562f070101101590f19d7c1ed0e6
*/

function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue == '') {
        return;
    }
    var ga = new GlideAjax('UserUtils');
    ga.addParam('sysparm_name', 'getPhone'); //declarar o nome do método como parâmetro "sysparm_name" (parâmetro com nome fixo)
    ga.addParam('sysparm_telefone', g_form.getValue('solicitante')); //declarar o valor que será enviado no parâmetro declarado no método "getPhone". Nesse caso é o "userSysId"
    ga.getXML(callback);

    function callback(response) {
        var answer = response.responseXML.documentElement.getAttribute('answer');
        alert(answer);
        answer != '' ? g_form.setValue('telefone', answer) : g_form.setValue('Telefone não cadastrado na base. Favor inserir aqui.');
    }
}
