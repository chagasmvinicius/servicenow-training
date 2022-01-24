/* 
Nome: "Consulta de RITMs"
URL: https://dev96986.service-now.com/nav_to.do?uri=%2Fsys_ws_operation.do%3Fsys_id%3D5a771c18071541101590f19d7c1ed04f
*/

(function process( /*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {

    /*
    Outra forma de construir a integração é criar um novo script include que reunirá todos os métodos ou utilidades complementares da API. Dessa forma o código fica dividido em chamada e utils.
    -> Exemplo da chamada:
    response = new UserUtils().getProtocol();
    return response;
    */

    var queryParams = request.queryParams;

    var dateTime = new GlideDateTime();
    response = [];
    var infos = {};

    var grRitm = new GlideRecord('sc_req_item');
    grRitm.addQuery('cat_item', '98b12a67074101101590f19d7c1ed0c8');
    if (queryParams.ritm_number) { grRitm.addQuery('number', queryParams.ritm_number); }
    grRitm.query();

    while (grRitm.next()) {
        infos = {
            number: grRitm.getValue('number'),
            itemId: grRitm.getValue('cat_item'),
            state: grRitm.getValue('state'),
            assignment_group: new global.GroupUtils().getName(grRitm.getValue('assignment_group')),
            assigned_to: new global.UserUtils().getName(grRitm.getValue('assigned_to')),
            requested_for: new global.UserUtils().getName(grRitm.getValue('requested_for')),
            short_description: grRitm.getValue('short_description')
        };
        response.push(infos);
    }
    response.push({
        total: grRitm.getRowCount(),
        instance: gs.getProperty('instance_name'),
        time: dateTime.value,
        queryParams: queryParams
    });

    response.setContentType('application/json');
    return response;

})(request, response);
