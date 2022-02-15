/*
Name: Run SFTP Flexera - Contratos (pre_script_bool)
Run as: flexera_integration
*/

var gdt = new GlideDate().toString();
var formattedDate = gdt.split('-');
var newFilePath = '/srtFtpData/JB-2K3-FTP-P01/flexera/10033_' + formattedDate[0] + formattedDate[1] + formattedDate[2] + '.csv';
var isetNumber = import_set.number;

try {
    // Atualização do file path do data source para receber o sufixo da data atual
    data_source.file_path = newFilePath;
    data_source.update();
    gs.info('[Run SFTP Flexera - Contratos] Data source atualizado com o file: ' + newFilePath + ' (' + isetNumber + ')');
} catch (e) {
    gs.info('[Run SFTP Flexera - Contratos] Erro data source: ' + gs.getMessage(e) + ' (' + newFilePath + ')' + ' (' + isetNumber + ')');
}