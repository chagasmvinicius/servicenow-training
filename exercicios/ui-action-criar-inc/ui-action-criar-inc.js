/*
Nome: "Criar incidente" (u_eventos)
URL: https://dev96986.service-now.com/nav_to.do?uri=%2Fsys_ui_action.do%3Fsys_id%3Df90c12f2079d01101590f19d7c1ed01a
*/

/* Condition */
javascript: current.getValue('state') === '2'

/* Script */

var grInc = new GlideRecord('incident');

/* Criar incidente com base nos dados do EVT */

grInc.initialize();
grInc.caller_id = gs.getUserID();
grInc.category = 'hardware';
grInc.cmdb_ci = current.cmdb_ci;
grInc.short_description = current.short_description;
grInc.description = current.description;
grInc.impact = current.impact;
grInc.urgency = current.urgency;
grInc.assignment_group = current.assignment_group;
grInc.parent = current.sys_id;
var incSysId = grInc.insert();

/* Buscar incidente recém criado e recolher valor do número do protocolo */

if (incSysId) {
    var incNumber = '';
    grInc.addQuery('sys_id', incSysId);
    grInc.setLimit(1);
    grInc.query();
    if (grInc.next()) {
        incNumber = grInc.getValue('number');
    }
}

/* Exibir mensagem de sucesso com link para o incidente recém criado */

gs.addInfoMessage('Incidente criado com sucesso: ' + '<a href=https://' + gs.getProperty('instance_name') + '.service-now.com/incident.do?sys_id=' + incSysId + ' target = _blank>' + incNumber + '</a>');
gs.info('Incidente criado através do ' + current.number + '\n' + JSON.stringify({ incNumber: incNumber, incSysId: incSysId }));