/*
Name: Run SFTP Flexera - Contratos (post_script_bool)
Run as: flexera_integration
*/

var countDelete = 0;

try {
    // Exclusão dos registros criados anteriormente na tabela ast_contract
    var contratos = new GlideRecord('ast_contract');
    contratos.addEncodedQuery('sys_created_onNOTONToday@javascript:gs.beginningOfToday()@javascript:gs.endOfToday()^sys_created_by=flexera_integration');
    contratos.query();
    while (contratos.next()) {
        contratos.deleteRecord();
        countDelete++;
    }
    gs.info('[Run SFTP Flexera - Contratos] Quantidade de registros deletados (são registros duplicados): ' + countDelete);
} catch (e) {
    gs.info('[Run SFTP Flexera - Contratos] Erro exclusão dos registros anteriores: ' + gs.getMessage(e));
}