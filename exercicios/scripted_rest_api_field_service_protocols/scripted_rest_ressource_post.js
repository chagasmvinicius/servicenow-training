/* 
Nome: "Criação de nova RITM"
URL: https://dev96986.service-now.com/nav_to.do?uri=%2Fsys_ws_operation.do%3Fsys_id%3Dec229a64079581101590f19d7c1ed0f5
Documentação utilizada (API CartJS): https://developer.servicenow.com/print_page.do?release=paris&category=null&identifier=c_CartJSScoped&module=api
*/

(function process( /*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {

    /*
        Exemplo body: 
        {
            "solicitante": "6816f79cc0a8016401c5a33be04be441",
            "cep": "24240210",
            "logradouro": "Rua Vereador Duque Estrada",
            "bairro": "Santa Rosa",
            "cidade": "Niterói",
            "estado": "RJ",
            "numero": "88",
            "complemento": "123",
            "ativo": "00a96c0d3790200044e0bfc8bcbe5dc3",
            "data_hora_fim_manutencao": "24/01/2022 20: 30: 15"
        }
    */

    try {

        var requestBody = request.body.data;
        var catItemId = '98b12a67074101101590f19d7c1ed0c8';
        var mapRequest = {
            "sysparm_id": catItemId,
            "variables": requestBody
        };

        var cart = new sn_sc.CartJS();
        var cartDetails = cart.addToCart(mapRequest);
        var checkoutInfo = cart.checkoutCart();

        response = {
            responseAddToCart: cartDetails,
            responseCheckoutCart: checkoutInfo
        };

        return response;
    } catch (e) {
        var error = e.getMessage();
        gs.info('Erro Scripted REST Resource FieldServiceProtocols: ' + error);
    }

})(request, response);