Ext.define('ADM.view.logs.Logs', {
    extend: "Base.panel.ModuleContainer",
    alias: 'widget.logs',
    requires: [
        'Base.grid.ModuleList',
        'Base.panel.ModuleForm',
        'ADM.view.logs.Controller',
        'ADM.view.logs.Model'
    ],
    viewModel: {
        type: "logs"
    },
    controller: 'logs',
    title: 'Логи',

    items: [{
        xtype: 'basemodulelist',
        bind: {
            store: '{logs}'
        },
        columns: [
            {
                text: 'Дата и время',
                dataIndex: 'timestamp',
                renderer: function(value) {
                    var date = new Date(value);
                    return Ext.Date.format(date, 'Y-m-d g:i a')
                },
                flex: 2
            }, {
                text: 'Уровень',
                dataIndex: 'level',
                flex: 1
            }, {
                text: 'Сообщение',
                dataIndex: 'message',
                flex: 5
            }
        ]
    }, {
        xtype: 'basemoduleform',
        width: 250,
        items: [
            {
                xtype:'fieldset',
                title: 'Период',
                items: [{
                    xtype: 'datefield',
                    allowBlank: false,
                    name: 'date_from',
                    fieldLabel: 'С',
                    labelWidth: 40,
                    format: 'Y-m-d H:i:s',
                    value: Ext.Date.add(new Date(), Ext.Date.MONTH, -1)
                },{
                    xtype: 'datefield',
                    name: 'date_to',
                    labelWidth: 40,
                    fieldLabel: 'По',
                    format: 'Y-m-d H:i:s',
                    value: new Date()
                }]
            },{
                xtype: 'combobox',
                fieldLabel: 'Уровень',
                name: 'level',
                value: -10,
                queryMode: 'local',
                displayField: 'name',
                valueField: 'id',
                editable: false,
                forceSelection: true,
                store: {
                    fields: ['id', 'name'],
                    data : [{
                        id: -10,
                        name: "Все"
                    },{
                        id: 'warn',
                        name: "Warn"
                    },{
                        id: 'error',
                        name: "Error"
                    },{
                        id: 'debug',
                        name: "Debug"
                    }]
                }
            },{
                xtype: 'textfield',
                allowBlank: true,
                name: 'message',
                fieldLabel: 'Сообщение'
            }
        ],
        buttons: [{
            xtype: 'button',
            text: 'Поиск',
            handler: 'onFilter'
        },{
            xtype: 'button',
            text: 'Сбросить',
            handler: 'onResetForm'
        }]
    }]

});