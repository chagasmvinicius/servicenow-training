<b>Todos os arquivos deste repositório apenas são executados em instâncias ServiceNow. Este repositório foi criado apenas para armazenar o conteúdo do treinamento de Javascript em plataformas ServiceNow e servir como repositório do meu aprendizado, da minha evolução.
Todos os update sets estão armazenados na pasta "./update_sets" (estão em formato "xml" e foram feitos na aplicação "Global").</b>

👨🏻‍💻 Minha instância de desenvolvimento: <i>https://dev96986.service-now.com/</i>

<b>✅ EXERCÍCIOS:</b>
<br>
Board do projeto: https://github.com/chagasmvinicius/servicenow-training/projects/1<br>
Vídeos ilustrativos dos exercícios: https://chagasmvinicius.github.io/servicenow-training/

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
Atenção: para utilizar os métodos .getParameter(), .get(), .setValue() e outros dentro do script include é necessário declarar que este é uma função/classe filha da classe/script include "AbstractAjaxProcessor" (👨🏻‍💻 https://dev96986.service-now.com/sys_script_include.do?sys_id=d65f78c40a0a0b6900196656f35913d3). Para fazer isso é necessário comentar ou apagar as linhas de código "type: Name" (ao final do script), "initialize: function() {}," (ao início do script) e inserir um extends na segunda linha. Deve ficar assim:<br>
<i>
Name.prototype = Object.extendsObject(global.AbstractAjaxProcessor, { ...método:{} });
</i>
</b>

📄 <b>Documentação: https://docs.servicenow.com/bundle/rome-application-development/page/script/server-scripting/concept/c_UsingGlideRecordToQueryTables.html<b>

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
⚙️ <b>3 - RESTMessageV2</b>: RESTMessageV2 serve para estabelecer conexão com APIs ou servidores através do protocolo HTTP e REST. Podemos utilizar qualquer método HTTP (GET, POST, PUT, DELETE) para realizar as conexões. Importante ressaltar que essa API só pode ser chamada via server-side.

<b>Composição RESTMessageV2:</b>

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

 