Ext.define("overrides.Ajax", {
    override: 'Ext.Ajax'/*,
    request: function(option) {
        option = option || {};
        var successCb = option.success || function(){};
        var failureCb = option.failure || function(){};
        option.failureCb = option.failureCb || function(){};
        option.ignoreError = option.ignoreError || false;
        option.success = function(response, option) {
            var data = Ext.JSON.decode(response.responseText);
            if (data['success'] == true) {
                successCb(response, option);
                return;
            }
            option.failureCb(response, option);
            if (option.ignoreError) {
                return
            }
            if (option.failureCb(response, option, data['error']) != true){
                Ext.Msg.alert('Ошибка', data['error']);
            }

        };
        option.failure = function(response, option) {
            failureCb(response, option);
            option.failureCb(response, option);
            if (option.ignoreError) {
                return
            }
            Ext.Msg.alert('Ошибка', 'Произошла ошибка при отправке данных на сервер');
        };
        this.callParent(arguments);
    }*/
});