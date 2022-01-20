<b>Todos os arquivos desse repositório apenas são executados em instâncias ServiceNow. Este repositório foi criado apenas para armazenar o conteúdo do treinamento de Javascript em plataformas ServiceNow e servir como repositório do meu aprendizado, da minha evolução.
Todos os update sets estão armazenados na pasta "./update_sets" (estão em formato "xml" e foram feitos na aplicação "Global").<b>

👨🏻‍💻 Minha instância de desenvolvimento: <i>https://dev96986.service-now.com/</i>

<b>1 - GlideRecord</b>: GlideRecord é uma API server-side no qual pode ser utilizado em algumas funcionalidades da plataforma. Entre elas estão o Script Inlude (sys_script_include). Com o GlideRecord podemos realizar buscas através de qualquer tabela da plataforma e realizar tanto ação em campos dessas tabelas, como também, podemos resgatar valores dessas tabelas pelo lado do servidor e guardá-las para fornecer ao client através de outras funcionalidades ServiceNow. Uma dessas é o GlideAjax.<br> 
<b>Composição GlideRecord:</b>  
<br>
<i><font color="blue">
var grUser = new GlideRecord('sys_user');<br>
grUser.addQuery('sys_id', userSysId);<br>
grUser.setLimit(1);<br>
grUser.query();<br>
var phone, mobilePhone, response;<br>
while (grUser.next()) {<br>
phone = grUser.getValue('phone');<br>
mobilePhone = grUser.getValue('mobile_phone');<br>
phone != '' ? response = phone : response = mobilePhone;<br>
}<br>
return response;<br>
}<br>
</i></font>
<b>Documentação: https://docs.servicenow.com/bundle/rome-application-development/page/script/server-scripting/concept/c_UsingGlideRecordToQueryTables.html<b>

<b>2 - GlideAjax</b>: GlideAjax é uma API client-side que pode ser usada para resgatar valores obtidos pelo server-side. Muita das vezes o GlideAjax é utilizado em client scripts referenciando a métodos de um GlideRecord.<br> 
<b>Composição GlideAjax:</b>  
<br>
<i><font color="blue">
var ga = new GlideAjax('UserUtils');<br>
ga.addParam('sysparm_name', 'getPhone');<br>
ga.addParam('sysparm_telefone', g_form.getValue('solicitante'));<br>
ga.getXML(callback);<br>
function callback (response) {<br>
var answer = response.responseXML.documentElement.getAttribute('answer');<br>
answer != '' ? g_form.setValue('telefone', answer) : g_form.setValue('Telefone não cadastrado na base. Favor inserir aqui.');<br>
}<br>
</i></font>
<b>Documentação: https://docs.servicenow.com/bundle/rome-application-development/page/script/ajax/topic/p_AJAX.html</b>
 