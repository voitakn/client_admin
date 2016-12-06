Ext.define('ADM.view.notices.Notices', {
    extend: "Base.panel.ModuleContainer",
    alias: 'widget.notices',
    requires: [
        'Base.grid.ModuleList',
        'Base.panel.ModuleForm',
        'ADM.view.notices.Controller',
        'ADM.view.notices.Model'
    ],
    viewModel: {
        type: "notices"
    },
    controller: 'notices',
    title: 'Уведомления',
    items: [{
        xtype: 'basemodulelist',
        selType: 'checkboxmodel',
        bind: {
            store: '{notices}'
        },
        columns: [
            {
                text: 'Email',
                dataIndex: 'login',
                width: 250
            },{
                text: 'UID',
                dataIndex: 'uid',
                flex: 1
            }
        ],
        listeners: {
            selectionchange: 'onSelectLogin'
        }
    }, {
        xtype: 'basemoduleform',
        title: 'Получатели',
        width: 500,
        items: [
            {
                xtype: 'grid',
                height: 200,
                margin: '0 0 15 0',
                bind: {
                    store: '{mail_list}'
                },
                columns: [
                    {
                        text: 'Email',
                        dataIndex: 'login',
                        flex: 1
                    }
                ]
            },{
                xtype: 'textarea',
                name: 'message',
                bind: {value: '{send_data.message}'},
                fieldLabel: 'Текст уведомления',
                labelAlign: 'top',
                allowBlank: false
            }
        ],
        buttons: [{
            xtype: 'button',
            formBind: true,
            disabled: true,
            text: 'Отправить',
            handler: 'onSendMail'
        },{
            xtype: 'button',
            text: 'Очистить',
            handler: 'onResetForm'
        }]
    }]

});