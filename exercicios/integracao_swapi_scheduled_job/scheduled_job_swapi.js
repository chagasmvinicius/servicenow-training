/*
Nome: Integração SWAPI
Run: Daily
*/

try {
    var canCountinue = true;
    var response, httpStatusCode, log;
    var request = new sn_ws.RESTMessageV2();
    var endpoint = request.setEndpoint('https://swapi.dev/api/starships/');
    request.setHttpMethod('get');

    while (canCountinue) {
        response = request.execute();
        httpStatusCode = response.getStatusCode();
        responseBody = response.haveError() ? response.getErrorMessage() : JSON.parse(response.getBody());
        var insereNaves = new GlideRecord('u_starships');
        insereNaves.initialize();
        responseBody.results.forEach(function (starship) {
            if (!insereNaves.get('u_name', starship.name)) {
                for (i in starship) {
                    insereNaves.setValue('u_' + i, starship[i]);
                }
                insereNaves.insert();
            }
        });
        responseBody.next ? endpoint = request.setEndpoint(responseBody.next) : canCountinue = false;
        log = JSON.stringify({
            name: 'Integração SWAPI (Scheduled Job)',
            action: 'GET (' + httpStatusCode + ') :' + responseBody.next
        });
        gs.info(log);
    }
} catch (e) {
    var error = e.getMessage();
    gs.info(error);
}