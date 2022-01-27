/*
Nome: VC: Calcular prioridade onChange
Link: https://dev96986.service-now.com/sys_script.do?sys_id=14756839071101101590f19d7c1ed034
When to run:
    when: before
    action_update: true
    filter_condition
        cmdb_ci: changes
        business_service: changes
*/

(function executeRule(current, previous /*null when async*/) {

    new global.IncidentPriority().calcPrioridade(current, current.cmdb_ci, current.business_service);

})(current, previous);

