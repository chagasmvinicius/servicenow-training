/*
Nome: "VC: Somente números "CEP""
Tipo: onChange (cep)
URL: https://dev96986.service-now.com/nav_to.do?uri=%2Fcatalog_script_client.do%3Fsys_id%3D119e83ab07c101101590f19d7c1ed068%26
*/

function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue == '') {
		return;
    }
    if (!Number(newValue)) {
		g_form.clearValue('cep');
		g_form.showFieldMsg('cep', 'Por favor, insira apenas números no campo CEP.', 'error');
    }
}
