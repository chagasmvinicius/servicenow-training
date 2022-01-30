<b>Todos os arquivos deste repositório apenas são executados em instâncias ServiceNow. Este repositório foi criado apenas para armazenar o conteúdo do treinamento de Javascript em plataformas ServiceNow e servir como repositório do meu aprendizado, da minha evolução.
Todos os update sets estão armazenados na pasta "./update_sets" (estão em formato "xml" e foram feitos na aplicação "Global").</b>

👨🏻‍💻 Minha instância de desenvolvimento: <i>https://dev96986.service-now.com/</i>

<b>✅ EXERCÍCIOS:</b>
<br>
Board do projeto: https://github.com/chagasmvinicius/servicenow-training/projects/1<br>

<b>📚 ESTUDOS:</b>

⚙️ <b>1 - GlideRecord</b>: GlideRecord é uma API server-side no qual pode ser utilizado em algumas funcionalidades da plataforma. Entre elas estão o Script Inlude (sys_script_include) (📄 https://docs.servicenow.com/bundle/rome-application-development/page/script/server-scripting/concept/c_ScriptIncludes.html). Com o GlideRecord podemos realizar buscas através de qualquer tabela da plataforma e realizar tanto ação em campos dessas tabelas, como também, podemos resgatar valores dessas tabelas pelo lado do servidor e guardá-las para fornecer ao client através de outras funcionalidades ServiceNow. Uma dessas é o GlideAjax.

<b>Composição GlideRecord (em um script include):</b>

<b>(1) Através de uma query:</b>
<br>
<i>
getPhone: function() {<br>
var phone, mobilePhone, response;<br>
var userSysId = this.getParameter('sysparm_user');<br>
var grUser = new GlideRecord('sys_user');<br>
grUser.addQuery('sys_id', userSysId);<br>
grUser.setLimit(1);<br>
grUser.query();<br>
if (grUser.next()) {<br>
phone = grUser.getValue('phone');<br>
mobilePhone = grUser.getValue('mobile_phone');<br>
phone ? response = phone : response = mobilePhone;<br>
}<br>
return response;<br>
}<br>
</i>
<br>
<b>(2) Através de uma igualdade com o método .get():</b>
<br>
<i>
getPhone: function() {<br>
var phone, mobilePhone, response;<br>
var userSysId = this.getParameter('sysparm_user');<br>
if (grUser.get(userSysId)) {<br>
phone = grUser.getValue('phone');
mobilePhone = grUser.getValue('mobile_phone');<br>
phone != '' || null ? response = phone : response = mobilePhone;<br>
}<br>
return response;<br>
}<br>
</i>
<br>
<b>
Atenção: para utilizar os métodos .getParameter(), .get(), .setValue() e outros dentro do script include é necessário declarar que este é uma função/classe filha da classe/script include "AbstractAjaxProcessor" (👨🏻‍💻 https://dev96986.service-now.com/sys_script_include.do?sys_id=d65f78c40a0a0b6900196656f35913d3). Para fazer isso é necessário comentar ou apagar as linhas de código "type: Name" (ao final do script), "initialize: function() {}," (ao início do script) e inserir um extends na segunda linha. Deve ficar assim:</b>
<br>
<i>
Name.prototype = Object.extendsObject(global.AbstractAjaxProcessor, { ...método:{} });
</i>
</b>

📄 <b>Documentação: https://docs.servicenow.com/bundle/rome-application-development/page/script/server-scripting/concept/c_UsingGlideRecordToQueryTables.html</b>

⚙️ <b>2 - GlideAjax</b>: GlideAjax é uma API client-side que pode ser usada para resgatar valores obtidos pelo server-side. Muita das vezes o GlideAjax é utilizado em client scripts referenciando a métodos de um GlideRecord.

<b>Composição GlideAjax:</b>  

<i>
var ga = new GlideAjax('UserUtils');<br>
ga.addParam('sysparm_name', 'getPhone');<br>
ga.addParam('sysparm_user', newValue);<br>
ga.getXML(callback);<br>
function callback(response) {<br>
var answer = response.responseXML.documentElement.getAttribute('answer');<br>
answer ? g_form.setValue('telefone', answer) : g_form.setValue('telefone', 'Telefone não cadastrado na base. Insira.');<br>
}<br>
</i>
<br>
📄 <b>Documentação: https://docs.servicenow.com/bundle/rome-application-development/page/script/ajax/topic/p_AJAX.html</b>
<br>
<br>
⚙️ <b>3 - RESTMessageV2</b>: RESTMessageV2 serve para estabelecer conexão com APIs ou servidores através do protocolo HTTP e REST. Podemos utilizar qualquer método HTTP (GET, POST, PUT, DELETE) para realizar as conexões. Importante ressaltar que essa API só pode ser chamada via server-side.
<br>
<br>
<b>Composição RESTMessageV2:</b>
<br>
<br>
<i>
try {<br>
var baseUrl = 'https://viacep.com.br/ws/';<br>
var cep = this.getParameter('sysparm_cep');<br>
var response, httpResponseStatus, body;<br>
var request = new sn_ws.RESTMessageV2();<br>
request.setHttpMethod('get');<br>
request.setEndpoint(baseUrl + cep + '/json');<br>
response = request.execute();<br>
httpResponseStatus = response.getStatusCode();<br>
body = JSON.parse(response.getBody());<br>
if (httpResponseStatus == 200) {<br>
gs.info('Execution global.ViaCepIntegration:\nStatus: ' + httpResponseStatus + '\nBody: ' + body.logradouro);<br>
return body.logradouro;<br>
}<br>
} catch (e) {<br>
var error = e.getMessage();<br>
gs.info('Error try catch: ' + error);<br>
}<br>
}<br>
</i>
<br>
📄 <b>Documentação: https://developer.servicenow.com/dev.do#!/reference/api/rome/server/c_RESTMessageV2API</b>
<br>
<br>
⚙️ <b>4 - Script Step (Action -> Flow Designer)</b>: Nesse caso o script step servirá para atualizar a informação do status do ativo com busca pelo sys_id. Importante ressaltar que o script step é server-side
<br>
<br>
<b>Composição Script Step:</b>
<br>
<br>
<i>
(function execute(inputs, outputs) {<br>
var ativo = inputs.ativo;<br>
var state = inputs.state;<br>
var gr = new GlideRecord('alm_hardware');<br>
gr.addQuery('sys_id', ativo);<br>
gr.query();<br>
while (gr.next()) {<br>
//gr.setValue('install_status', '3');<br>
gr.install_status = state;<br>
gr.update();<br>
}<br>
})(inputs, outputs);<br>
</i> 
<br>
📄 <b>Documentação: https://docs.servicenow.com/bundle/rome-servicenow-platform/page/administer/flow-designer/reference/javascript-step-action-designer.html</b>
<br>
<br>
⚙️ <b>5 - Scripted REST API (sys_ws_definition)</b>: Essa funcionalidade nos possibilita criar uma REST API com possibilidade de introduzir todos os métodos HTTP (GET, POST, DELETE, PUT/PATCH) para consultar, alterar, deletar ou criar registros em qualquer tabela da instância. Importante ressaltar que o scripted rest api é um funcionalidade server-side.
<br>
<br>
<b>Composição Scripted REST API:</b>
<br>
<br>
<b>↳ Scripted REST Ressource (sys_ws_operation)</b>: Criação dos métodos (GET, POST, etc...) e seus scripts de execução;
<br>
<b>↳ Scripted REST Query Parameters/Query Parameter Associations</b>: Criação de um ou mais parâmetros para serem acoplados na consulta (GET);
<br>
<br>
📄 <b>Documentação: https://docs.servicenow.com/bundle/rome-application-development/page/integrate/custom-web-services/concept/c_CustomWebServices.html</b>
<br>
<br>
⚙️ <b>6 - Inbound E-mail Action (sysevent_in_email_action)</b>: Essa funcionalidade nos possibilita criar chamados em tabelas ou responder e-mails a partir de e-mails recebidos na caixa com base em algumas configurações e gatilhos (caixa: instance-name@service-now.com / devXXXXX@servicenowdevelopers.com)(tabela: sys_email). Para que a instância esteja habilitada a receber (gs.getProperty(glide.email.smtp.active)) e/ou enviar (gs.getProperty(glide.email.read.active)) e-mails é necessário acessar as propriedades de e-mail e habilitá-las. Segue o caminho: "System Properties > Email Properties (email_properties.do)".
<br>
<br>
📄 <b>Documentação geral: https://developer.servicenow.com/dev.do#!/learn/learning-plans/quebec/new_to_servicenow/app_store_learnv2_automatingapps_quebec_exercise_inbound_email_configuration</b>
<br>
<br>
📄 <b>Documentação da Lista de Variáveis do Objeto "email": https://docs.servicenow.com/bundle/rome-servicenow-platform/page/administer/notification/reference/r_AccessingEmailObjsWithVars.html</b>
<br>
<br>
⚙️ <b>7 - IntegrationHub - Teams</b>: Criação da integração via Flow Designer utilizando o plugin do IntegrationHub.
<br>
<br>
📄 <b>Documentações</b>: https://docs.servicenow.com/bundle/rome-servicenow-platform/page/administer/integrationhub/reference/microsoft-teams-spoke.html / https://docs.microsoft.com/pt-br/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook

 