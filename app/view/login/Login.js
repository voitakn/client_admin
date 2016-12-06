
Ext.define("ADM.view.login.Login",{

    extend: 'Ext.window.Window',
    xtype: 'login',
    requires: [
        'ADM.view.login.LoginController',
        'ADM.view.login.LoginModel'
    ],
    controller: "login",
    layout: 'fit',
    viewModel: {
        type: "login"
    },

    bodyPadding: 10,
    width: 300,
    closable: false,
    autoShow: true,
    constrain: true,
    ghost: false,
    bind: {
        title: '{lng.register}'
    },

    items: {
        xtype: 'form',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        reference: 'form',
        items: [{
            xtype: 'textfield',
            name: 'login',
            labelAlign: 'top',
            allowBlank: false,
            bind: {
                fieldLabel: '{lng.login}'
            }
        }, {
            xtype: 'textfield',
            name: 'password',
            inputType: 'password',
            labelAlign: 'top',
            allowBlank: false,
            bind: {
                fieldLabel: '{lng.password}'
            }
        },{
            xtype: 'checkboxfield',
            name: 'remember',
            labelWidth: 110,
            inputValue: true,
            boxLabel: 'Запомнить меня'
        },{
            xtype: 'displayfield',
            hideEmptyLabel: false,
            style: {
                color: 'red'
            },
            bind: {
                value: '{result.error}',
                hidden: '{isResultError}'
            }
        }],
        dockedItems: [{
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            items: [{
                text: 'Login',
                flex: 1,
                formBind: true,
                listeners: {
                    click: 'onLoginUser'
                }
            }]
        }]
    }
});
