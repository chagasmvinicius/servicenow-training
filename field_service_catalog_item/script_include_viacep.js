/* 
Nome: "ViaCepIntegration"
URL: https://dev96986.service-now.com/nav_to.do?uri=%2Fsys_script_include.do%3Fsys_id%3D02826537070101101590f19d7c1ed0c0 
Documentações técnicas:
RESTMessageV2API: https://developer.servicenow.com/dev.do#!/reference/api/rome/server/c_RESTMessageV2API
ViaCep API: https://viacep.com.br/
*/

var ViaCepIntegration = Class.create();
ViaCepIntegration.prototype = Object.extendsObject(AbstractAjaxProcessor, {

    getRua: function () {
        try {
            var baseUrl = 'https://viacep.com.br/ws/';
            var cep = this.getParameter('sysparm_cep');
            var response, httpResponseStatus, body;

            var request = new sn_ws.RESTMessageV2();
            request.setHttpMethod('get');
            request.setEndpoint(baseUrl + cep + '/json');
            response = request.execute();

            httpResponseStatus = response.getStatusCode();
            body = JSON.parse(response.getBody());

            if (httpResponseStatus == 200) {
                gs.info('Execution global.ViaCepIntegration:\nStatus: ' + httpResponseStatus + '\nBody: ' + body.logradouro);
                return body.logradouro;
            }

        } catch (e) {
            var error = e.getMessage();
            gs.info('Error try catch: ' + error);
        }
    },

    getBairro: function () {
        try {
            var baseUrl = 'https://viacep.com.br/ws/';
            var cep = this.getParameter('sysparm_cep');
            var response, httpResponseStatus, body;

            var request = new sn_ws.RESTMessageV2();
            request.setHttpMethod('get');
            request.setEndpoint(baseUrl + cep + '/json');
            response = request.execute();

            httpResponseStatus = response.getStatusCode();
            body = JSON.parse(response.getBody());

            if (httpResponseStatus == 200) {
                gs.info('Execution global.ViaCepIntegration:\nStatus: ' + httpResponseStatus + '\nBody: ' + body.bairro);
                return body.bairro;
            }

        } catch (e) {
            var error = e.getMessage();
            gs.info('Error try catch: ' + error);
        }
    },

    getCidade: function () {
        try {
            var baseUrl = 'https://viacep.com.br/ws/';
            var cep = this.getParameter('sysparm_cep');
            var response, httpResponseStatus, body;

            var request = new sn_ws.RESTMessageV2();
            request.setHttpMethod('get');
            request.setEndpoint(baseUrl + cep + '/json');
            response = request.execute();

            httpResponseStatus = response.getStatusCode();
            body = JSON.parse(response.getBody());

            if (httpResponseStatus == 200) {
                gs.info('Execution global.ViaCepIntegration:\nStatus: ' + httpResponseStatus + '\nBody: ' + body.localidade);
                return body.localidade;
            }

        } catch (e) {
            var error = e.getMessage();
            gs.info('Error try catch: ' + error);
        }
    },

    getEstado: function () {
        try {
            var baseUrl = 'https://viacep.com.br/ws/';
            var cep = this.getParameter('sysparm_cep');
            var response, httpResponseStatus, body;

            var request = new sn_ws.RESTMessageV2();
            request.setHttpMethod('get');
            request.setEndpoint(baseUrl + cep + '/json');
            response = request.execute();

            httpResponseStatus = response.getStatusCode();
            body = JSON.parse(response.getBody());

            if (httpResponseStatus == 200) {
                gs.info('Execution global.ViaCepIntegration:\nStatus: ' + httpResponseStatus + '\nBody: ' + body.uf);
                return body.uf;
            }

        } catch (e) {
            var error = e.getMessage();
            gs.info('Error try catch: ' + error);
        }
    },

    type: 'ViaCepIntegration'
});