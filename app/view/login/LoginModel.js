Ext.define('ADM.view.login.LoginModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.login',
    data: {
        lng: {
            register: 'Авторизация',
            remember: 'Запомнить меня',
            password: 'Пароль',
            login: 'Логин'
        },
        result: {}
    },
    formulas: {
        isResultError: {
            bind: '{result.error}',
            get: function (value) {
                return !value;
            }
        }
    }
});
