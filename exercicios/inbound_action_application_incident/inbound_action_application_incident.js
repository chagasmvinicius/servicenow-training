/*
Nome: "Application Incident Inbound Action"
URL: https://dev96986.service-now.com/nav_to.do?uri=%2Fsysevent_in_email_action.do%3Fsys_id%3Dec7dfde6071101101590f19d7c1ed0c3
Subject (When to run): Application Incident Inbound Action
From (When to run): meu usuário
*/

(function runAction( /*GlideRecord*/ current, /*GlideRecord*/ event, /*EmailWrapper*/ email, /*ScopedEmailLogger*/ logger, /*EmailClassifier*/ classifier) {

    try {
        var body = {
            "sysparm_id": "b4e76dad079501101590f19d7c1ed035",
            "variables": {
                "solicitante": email.from_sys_id,
                "cmdb_ci": setCmdbCi(email.body.cmdb_ci),
                "business_service": setBusinessService(email.body.business_service),
                "short_description": 'Incidentes criado a partir do e-mail ' + email.subject + ' às ' + gs.nowDateTime(),
                "description": 'Incidentes criado a partir do e-mail ' + email.subject + ' às ' + gs.nowDateTime()
            }
        };

        var recordProducer = new sn_sc.CatItem(body.sysparm_id);
        var response = recordProducer.submitProducer(body);

        gs.info('Application Incident Inbound Action RESPONSE: ' + JSON.stringify(response));

    } catch (error) {
        gs.info({
            DateTime: gs.nowDateTime(),
            Response: error
        });
    }

    /* ========================================== Funções auxiliares ========================================== */

    function setBusinessService(business_service) {
        /*
        Legenda (business_service: 1, 2, 3):
        1 = 27d32778c0a8000b00db970eeaa60f16 (Email)
        2 = 63036c18c0a8010e01bac272daed2e2c (Bond Trading - DR)
        3 = c69b36ac73d423002728660c4cf6a71d (Slack)
        */

        var businessService = '';

        switch (email.body.business_service) {
            case '1':
                businessService = '27d32778c0a8000b00db970eeaa60f16';
                break;
            case '2':
                businessService = '63036c18c0a8010e01bac272daed2e2c';
                break;
            case '3':
                businessService = 'c69b36ac73d423002728660c4cf6a71d';
                break;
            default:
                businessService = '0e7a06157f10310016181ccebefa91ce';
        }
        return businessService;
    }

    function setCmdbCi(cmdb_ci) {
        /*
        Legenda (cmdb_ci: 1, 2, 3):
        1 = c0cb61a107d501101590f19d7c1ed0dd (ViniciusApp-High)
        2 = 10ebe1a107d501101590f19d7c1ed054 (ViniciusApp-Medium)
        3 = 74fb25a107d501101590f19d7c1ed0d9 (ViniciusApp-Low)
        */

        var cmdbCi = '';

        switch (email.body.cmdb_ci) {
            case '1':
                cmdbCi = 'c0cb61a107d501101590f19d7c1ed0dd';
                break;
            case '2':
                cmdbCi = '10ebe1a107d501101590f19d7c1ed054';
                break;
            case '3':
                cmdbCi = '74fb25a107d501101590f19d7c1ed0d9';
                break;
            default:
                cmdbCi = '2a4dcaee071101101590f19d7c1ed075';
        }
        return cmdbCi;
    }

})(current, event, email, logger, classifier);