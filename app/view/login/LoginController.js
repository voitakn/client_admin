Ext.define('ADM.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',

    onLoginUser: function(){
        var form = this.lookupReference('form').getForm();
        var values = form.getValues();
        var viewModel = this.getViewModel();
        var view = this.getView();
        if (!form.isValid()) {
            return;
        }
        view.setLoading(true);
        viewModel.set('result', {});
        Ext.Ajax.request({
            url: '/node/admin/auth',
            method: 'POST',
            params: values,
            ignoreError: true,
            callback: function() {
                view.setLoading(false);
            },
            success: function() {
                view.destroy();
                ADM.app.launchMain();
            },
            failureCb: function(response) {
                var result = Ext.JSON.decode(response.responseText);
                //console.log(result);
                if (!result) {
                    result = {
                        error: 'Внутренняя ошибка сервера'
                    };
                }
                viewModel.set('result', result.error);
            }
        });
    }

});
