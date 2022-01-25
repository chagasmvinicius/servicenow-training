/* 
Nome: "GroupUtils"
URL: https://dev96986.service-now.com/sys_script_include.do?sys_id=84dea1e4071581101590f19d7c1ed09c
*/

var GroupUtils = Class.create();
GroupUtils.prototype = Object.extendsObject(AbstractAjaxProcessor, {

    /* Exemplo de chamada: var example = new global.GroupUtils().getGroupName(sys_id_grupo) */

    getGroupName: function (sys_id) {
        var name;
        var grGroup = new GlideRecord('sys_user_group');
        grGroup.addQuery('sys_id', sys_id);
        grGroup.setLimit(1);
        grGroup.query();
        if (grGroup.next()) {
            name = grGroup.getValue('name');
        }
        return name;
    },

    type: 'GroupUtils'
});