/*
Name: Run SFTP Flexera - Contratos (post_script_bool)
*/

// Exclusão dos registros criados anteriormente na tabela ast_contract:

var countDelete = 0;
var contratos = new GlideRecord('ast_contract');
contratos.addEncodedQuery('sys_created_onNOTONToday@javascript:gs.beginningOfToday()@javascript:gs.endOfToday()^sys_created_by=vimartin');
contratos.query();
while (contratosD.next()) {
    contratos.deleteRecord();
    countDelete++;
}

gs.info('[Run SFTP Flexera - Contratos] Quantidade de registros deletados (são registros duplicados): ' + countDelete);