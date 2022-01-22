/* 
Nome: "UserUtils"
URL: https://dev96986.service-now.com/sys_script_include.do?sys_id=ee51926b070101101590f19d7c1ed06c 
*/

var UserUtils = Class.create();
//     UserUtils.prototype = {
UserUtils.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {
//     initialize: function() {},

    getPhone: function () {
        var phone, mobilePhone, response;
        var userSysId = this.getParameter('sysparm_user'); //É necessário declarar o parâmetro com mesmo nome que foi declarado no GlideAjax;
        var grUser = new GlideRecord('sys_user');
        grUser.addQuery('sys_id', userSysId);
        grUser.setLimit(1);
        grUser.query();
        if (grUser.next()) {
            phone = grUser.getValue('phone');
            mobilePhone = grUser.getValue('mobile_phone');
            phone ? response = phone : response = mobilePhone;
        }
        return response;
    },

//     type: 'UserUtils'
});