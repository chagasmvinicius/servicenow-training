/*
Name: Run SFTP Flexera - Contratos (pre_script_bool)
*/

// Formatação do sufixo dos arquivos CSV:
var day = gs.nowDateTime().split('/')[0];
var month = gs.nowDateTime().split('/')[1];
var year = gs.nowDateTime().split('/')[2].split(' ')[0];
var formattedDate = year.concat(month, day);
var newFilePath = '/srtFtpData/JB-2K3-FTP-P01/flexera/10033_' + formattedDate.toString() + '.csv';

// Atualização do sufixo no Data Source "SFTP Flexera - Contratos":
var searchDataSource = new GlideRecord('sys_data_source');
searchDataSource.addQuery('sys_id', 'dea7954107ad41101590f19d7c1ed0f7');
searchDataSource.setLimit(1);
searchDataSource.query();
if (searchDataSource.next()) {
    searchDataSource.setValue('file_path', newFilePath);
}
searchDataSource.update();