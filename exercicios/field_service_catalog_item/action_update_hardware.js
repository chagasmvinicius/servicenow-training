/*
Nome: "Update Hardware" (Script step)
Inputs: Ativo, State (install_status, alm_hardware)
Input variables: ativo = Ativo, state = State
URL: https://dev96986.service-now.com/$flow-designer.do?sysparm_nostack=true#/action-designer/9a2bb644071141101590f19d7c1ed0f9/step/3d430c4c-64cd-46d3-a436-44f14b619116
*/

(function execute(inputs, outputs) {
    var ativo = inputs.ativo;
    var state = inputs.state;

    var gr = new GlideRecord('alm_hardware');
    gr.addQuery('sys_id', ativo);
    gr.query();
    while (gr.next()) {
        //gr.setValue('install_status', '3');
        gr.install_status = state;
        gr.stockroom = '2eaa2b3f3763100044e0bfc8bcbe5de2';
        gr.update();
    }
})(inputs, outputs);

