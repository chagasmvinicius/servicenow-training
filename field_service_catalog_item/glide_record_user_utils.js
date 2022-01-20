/* 
Nome: "UserUtils"
URL: https://dev96986.service-now.com/sys_script_include.do?sys_id=ee51926b070101101590f19d7c1ed06c 
*/

var UserUtils = Class.create();
UserUtils.prototype = {
    initialize: function () { },

    getPhone: function (userSysId) {
        var grUser = new GlideRecord('sys_user');
        grUser.addQuery('sys_id', userSysId);
        grUser.setLimit(1);
        grUser.query();
        var phone, mobilePhone, response;
        while (grUser.next()) {
            phone = grUser.getValue('phone');
            mobilePhone = grUser.getValue('mobile_phone');
            phone != '' ? response = phone : response = mobilePhone;
        }
        return response;
    },

    type: 'UserUtils'
};