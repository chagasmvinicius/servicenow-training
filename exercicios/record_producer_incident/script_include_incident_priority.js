/*
Nome: IncidentPriority
Link: https://dev96986.service-now.com/nav_to.do?uri=%2Fsys_script_include.do%3Fsys_id%3D7eb424f5071101101590f19d7c1ed010%26
*/

var IncidentPriority = Class.create();
IncidentPriority.prototype = {
    initialize: function () { },

    calcPrioridade: function (current, app, serv) {

        /* Chamada: var prioridade = new global.IncidentPriority().calcPrioridade(current, app, serv); */

        /* Buscar criticidade da aplicação */

        var grApp = new GlideRecord('cmdb_ci_business_app');
        grApp.addQuery('sys_id', app);
        grApp.setLimit(1);
        grApp.query();
        var appCriticidade;
        while (grApp.next()) {
            appCriticidade = grApp.getValue('business_criticality');
        }

        /* Buscar criticidade do serviço */

        var grServ = new GlideRecord('cmdb_ci_service');
        grServ.addQuery('sys_id', serv);
        grServ.setLimit(1);
        grServ.query();
        var servCriticidade;
        while (grServ.next()) {
            servCriticidade = grServ.getValue('busines_criticality');
        }

        /* Cálculo da prioridade */

        /*
        APLICAÇÃO   |   SERVIÇO 
        high        |   1 - most critical          = (impact = 1 & urgency = 1)
        high        |   2 - somewhat critical      = (impact = 1 & urgency = 2)
        high        |   3 - less critical          = (impact = 1 & urgency = 3)
        high        |   4 - not critical           = (impact = 1 & urgency = 4)
        medium      |   1 - most critical          = (impact = 2 & urgency = 1)
        medium      |   2 - somewhat critical      = (impact = 2 & urgency = 2)
        medium      |   3 - less critical          = (impact = 2 & urgency = 3)
        medium      |   4 - not critical           = (impact = 2 & urgency = 4)
        low         |   1 - most critical          = (impact = 3 & urgency = 1)
        low         |   2 - somewhat critical      = (impact = 3 & urgency = 2)
        low         |   3 - less critical          = (impact = 3 & urgency = 3)
        low         |   4 - not critical           = (impact = 4 & urgency = 4)
        */

        if (appCriticidade === 'high' && servCriticidade === '1 - most critical') {
            current.impact = '1';
            current.urgency = '1';
        } else if (appCriticidade === 'high' && servCriticidade === '2 - somewhat critical') {
            current.impact = '1';
            current.urgency = '2';
        } else if (appCriticidade === 'high' && servCriticidade === '3 - less critical') {
            current.impact = '1';
            current.urgency = '3';
        } else if (appCriticidade === 'high' && servCriticidade === '4 - not critical') {
            current.impact = '1';
            current.urgency = '4';
        } else if (appCriticidade === 'medium' && servCriticidade === '1 - most critical') {
            current.impact = '2';
            current.urgency = '1';
        } else if (appCriticidade === 'medium' && servCriticidade === '2 - somewhat critical') {
            current.impact = '2';
            current.urgency = '2';
        } else if (appCriticidade === 'medium' && servCriticidade === '3 - less critical') {
            current.impact = '2';
            current.urgency = '3';
        } else if (appCriticidade === 'medium' && servCriticidade === '4 - not critical') {
            current.impact = '2';
            current.urgency = '4';
        } else if (appCriticidade === 'low' && servCriticidade === '1 - most critical') {
            current.impact = '3';
            current.urgency = '1';
        } else if (appCriticidade === 'low' && servCriticidade === '2 - somewhat critical') {
            current.impact = '3';
            current.urgency = '2';
        } else if (appCriticidade === 'low' && servCriticidade === '3 - less critical') {
            current.impact = '3';
            current.urgency = '3';
        } else if (appCriticidade === 'low' && servCriticidade === '4 - not critical') {
            current.impact = '3';
            current.urgency = '4';
        }
    },

    type: 'IncidentPriority'
};