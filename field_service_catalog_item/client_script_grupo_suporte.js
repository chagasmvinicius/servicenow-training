/*
Nome: "VC: Preenchimento grupo de suporte"
Tipo: onChange (estado)
URL: https://dev96986.service-now.com/nav_to.do?uri=%2Fcatalog_script_client.do%3Fsys_id%3D5b9bdcc8071901101590f19d7c1ed0e5
*/

function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue == '') {
        g_form.clearValue('grupo_de_suporte');
        return;
    }

    switch (newValue) {
        case 'TO':
            g_form.setValue('grupo_de_suporte', '1fac144c071901101590f19d7c1ed0d6');
            break;
        case 'DF':
            g_form.setValue('grupo_de_suporte', '190d180c071901101590f19d7c1ed0a1');
            break;
        case 'BA':
            g_form.setValue('grupo_de_suporte', '7b3d580c071901101590f19d7c1ed047');
            break;
        case 'RJ':
            g_form.setValue('grupo_de_suporte', 'd97d9c4c071901101590f19d7c1ed069');
            break;
        case 'SC':
            g_form.setValue('grupo_de_suporte', 'daadd84c071901101590f19d7c1ed017');
            break;
        default:
            g_form.setValue('grupo_de_suporte', '1f506000075901101590f19d7c1ed0cb');
    }
}