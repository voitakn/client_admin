Ext.define("ADM.view.users.Users", {
    extend: "Base.panel.ModuleContainer",
    alias: 'widget.users',
    requires: [
        'ADM.view.users.UsersController',
        'ADM.view.users.UsersModel'
    ],
    controller: "users",
    viewModel: {
        type: "users"
    },

    bind: {
        title: '{user}'
    },

    items: [{
        xtype: 'basemodulelist',
        bind: {
            store: '{users}'
        },
        columns: [{
            text: 'Логин',
            dataIndex: 'login',
            flex: 1,
            minWidth: 200
        },{
            text: 'Псевдоним',
            flex: 1,
            dataIndex: 'nickname',
            minWidth: 150
        },{
            text: 'Адрес',
            flex: 1,
            dataIndex: 'address',
            minWidth: 100
        },{
            text: 'Автор',
            xtype: 'booleancolumn',
            dataIndex: 'author',
            trueText: 'Да',
            falseText: 'Нет',
            minWidth: 80
        },{
            text: 'ФИО',
            dataIndex: 'fio',
            minWidth: 100
        },{
            text: 'Дата регистрации',
            xtype: 'datecolumn',
            dataIndex: 'create_date',
            format:'d-m-Y',
            minWidth: 150
        },{
            text: 'Роль',
            dataIndex: 'role_name',
            minWidth: 200
        },{
            text: 'Статус',
            dataIndex: 'access_title',
            minWidth: 150
        },{
            text: 'Статус',
            dataIndex: 'comment_status_title',
            minWidth: 150
        }],
        listeners: {
            selectionchange: 'onSelectRecord'
        }
    },{
        xtype: 'basemoduleform',
        items: [{
            xtype: 'displayfield',
            fieldLabel: 'Логин',
            labelAlign: 'left',
            labelWidth: 50,
            bind: {
                value: '{record.login}'
            }
        },{
            xtype: 'combobox',
            fieldLabel: 'Статус',
            name: 'access',
            displayField: 'title',
            valueField: 'id',
            queryMode: 'local',
            forceSelection: true,
            bind: {
                store: '{userAccessStatuses}',
                value: '{bindAccess}'
            }
        },{
            xtype: 'combobox',
            fieldLabel: 'Тип модерации',
            name: 'comment_status',
            displayField: 'title',
            valueField: 'id',
            queryMode: 'local',
            forceSelection: true,
            bind: {
                store: '{userModerationStatuses}',
                value: '{bindCommentStatus}'
            }
        },{
            xtype: 'combobox',
            fieldLabel: 'Роль',
            name: 'role_id',
            displayField: 'role_name',
            valueField: 'role_id',
            queryMode: 'local',
            forceSelection: true,
            bind: {
                store: '{roles}',
                value: '{bindRole}'
            }
        },{
            xtype:'fieldset',
            title: 'Монетизации',
            collapsible: true,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            defaults: {
                labelAlign: 'top'
            },
            items: [{
                xtype: 'combobox',
                name: 'fee_type',
                displayField: 'title',
                valueField: 'id',
                queryMode: 'local',
                fieldLabel: 'Схема ',
                forceSelection: true,
                bind: {
                    store: '{userFeeTypes}',
                    value: '{record.fee_type}'
                }
            },{
                xtype: 'numberfield',
                name: 'percent',
                fieldLabel: 'Гонорар',
                bind: {
                    value: '{record.percent}'
                }
            }]
        }],
        buttons: [{
            xtype: 'button',
            formBind: true,
            disabled: true,
            text: 'Сохранить',
            handler: 'onSyncStore'
        },{
            xtype: 'button',
            text: 'Сбросить',
            handler: 'onResetForm'
        }]
    }]
});
