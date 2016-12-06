Ext.define('ADM.view.notices.Controller', {
    extend: 'Base.app.ModuleController',
    alias: 'controller.notices',
    onSelectLogin: function(selectionModel, records) {
        var model = this.getViewModel();
        var mail_list = model.getStore('mail_list');
        var token = model.get('send_data.token'), set_token = [];
        mail_list.removeAll();
        Ext.Array.each(records, function(model){
            mail_list.add(model.data);
            //console.log("model.get('token')", model.get('token'));
            set_token = set_token.concat(model.get('token'));
        });
        //console.log(set_token);
        model.set('send_data.token', set_token);
    },
    onSendMail: function(button) {
        var model = this.getViewModel();
        var view = this.getView();
        var mail_list = model.getStore('mail_list');
        var send_data = model.get('send_data');
        var grid = this.lookupReference('list');
        view.setLoading(true);
        Ext.Ajax.request({
            scope: this,
            method: 'POST',
            url: '/node/admin/notices/apn-send',
            jsonData: {
                message: send_data.message,
                token: send_data.token,
                mode: send_data.mode,
                title: send_data.title_send,
                eventType: send_data.eventType
            },
            callback: function() {
                view.setLoading(false);
            },
            success: function() {
                view.setLoading(false);
                send_data.reject();
                mail_list.removeAll();
                grid.getSelectionModel().deselectAll();
                Ext.Msg.alert('Результат отправки', 'Уведомление было успешно отправлено выбранным получателям');
            },
            failureCb: function(response) {
                view.setLoading(false);
                var result = Ext.JSON.decode(response.responseText);
                //console.log(result);
                if (!result) {
                    result = {
                        error: 'Внутренняя ошибка сервера'
                    };
                }
                Ext.Msg.alert('Ошибка отправки данных', result.error);
            }
        });
    }
});
