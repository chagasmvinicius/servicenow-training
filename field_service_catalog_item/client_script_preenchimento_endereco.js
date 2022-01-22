/*
Nome: "VC: Preenchimento campos de endereço"
Tipo: onChange (cep)
URL: https://dev96986.service-now.com/catalog_script_client.do?sys_id=7439a137070101101590f19d7c1ed08f
*/

function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue == '') {
        return;
    }

    /* Preencimento do logradouro */

    var gaRua = new GlideAjax('ViaCepIntegration');
    gaRua.addParam('sysparm_name', 'getRua');
    gaRua.addParam('sysparm_cep', newValue);
    gaRua.getXML(callbackRua);

    function callbackRua(response) {
        var rua = response.responseXML.documentElement.getAttribute('answer');
        if (rua) {
            g_form.setValue('logradouro', rua);
            g_form.showFieldMsg('cep', 'O CEP é válido.', 'info');
        } else {
            g_form.clearValue('cep');
            g_form.showFieldMsg('cep', 'O CEP é inválido.', 'error');
        }
    }

    /* Preencimento do bairro */

    var gaBairro = new GlideAjax('ViaCepIntegration');
    gaBairro.addParam('sysparm_name', 'getBairro');
    gaBairro.addParam('sysparm_cep', newValue);
    gaBairro.getXML(callbackBairro);

    function callbackBairro(response) {
        var bairro = response.responseXML.documentElement.getAttribute('answer');
        g_form.setValue('bairro', bairro);

    }

    /* Preencimento da cidade */

    var gaCidade = new GlideAjax('ViaCepIntegration');
    gaCidade.addParam('sysparm_name', 'getCidade');
    gaCidade.addParam('sysparm_cep', newValue);
    gaCidade.getXML(callbackCidade);

    function callbackCidade(response) {
        var cidade = response.responseXML.documentElement.getAttribute('answer');
        g_form.setValue('cidade', cidade);
    }

    /* Preencimento do estado */

    var gaEstado = new GlideAjax('ViaCepIntegration');
    gaEstado.addParam('sysparm_name', 'getEstado');
    gaEstado.addParam('sysparm_cep', newValue);
    gaEstado.getXML(callbackEstado);

    function callbackEstado(response) {
        var estado = response.responseXML.documentElement.getAttribute('answer');
        g_form.setValue('estado', estado);
    }
}