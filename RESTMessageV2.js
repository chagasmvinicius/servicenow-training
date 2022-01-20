try {
    /* Verifica se o Computador atualizado/inserido já existe no TechCosts */
    do {
        var getComputer = new sn_ws.RESTMessageV2();
        getComputer.setHttpMethod('get');
        getComputer.setEndpoint(this.baseURL + '/recurso/computador');
        getComputer.setRequestHeader("authClientKey", this.authClientKey);
        getComputer.setRequestHeader("authClientSecret", this.authClientSecret);
        getComputer.setQueryParameter("uniqueCode", serial_number);

        response = getComputer.execute();
        body = JSON.parse(response.getBody());
        attempts++;

        if (body.total > 0)
            alreadyExists = true;

        return alreadyExists;

    } while (attempts < 3 || body.success == "true");

} catch (err) {
    gs.log("Erro na Integração Globo Service - TechCosts: \n\n" + err, "Integração TechCosts");
}