Ext.define('ADM.view.roles.Roles', {
    extend: "Base.panel.ModuleContainer",
    alias: 'widget.roles',
    requires: [
        'Base.grid.ModuleList',
        'Base.panel.ModuleForm',
        'ADM.view.roles.RolesController',
        'ADM.view.roles.RolesModel'
    ],
    viewModel: {
        type: "roles"
    },
    controller: 'roles',
    title: 'Роли',
    //tools: [],

    items: [{
        xtype: 'basemodulelist',
        bind: {
            store: '{roles}'
        },
        columns: [
            {
                text: 'ID',
                dataIndex: 'role_id',
                width: 100
            },{
                text: 'Наименование',
                dataIndex: 'role_name',
                flex: 1
            }
        ],
        listeners: {
            selectionchange: 'onSelectRecord'
        }
    }, {
        xtype: 'basemoduleform',
        tools: [
            {
                type: 'plus',
                tooltip: 'Добавить роль',
                handler: 'onResetForm'
            }
        ],
        width: 500,
        items: [
            {
                xtype: 'fieldset',
                title: 'Добавить роль',
                hidden: false,
                bind: {
                    hidden: '{is_create}'
                },
                layout: 'hbox',
                padding: '5 5 10 5',
                items: [
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Наименование',
                        labelAlign: 'left',
                        name: 'role_name',
                        labelWidth: 100,
                        flex: 4
                    },{
                        xtype: 'button',
                        formBind: true,
                        disabled: true,
                        text: 'Сохранить',
                        margin: '0 0 0 5',
                        handler: 'onSyncStore'
                    }
                ]
            },{
                xtype: 'displayfield',
                fieldLabel: 'Текущая роль',
                hidden: true,
                labelAlign: 'left',
                labelWidth: 100,
                bind: {
                    value: '{record.role_name}',
                    hidden: '{isCreate}'
                }
            },{
                xtype: 'tabpanel',
                items: [
                    {
                        title: 'Схемы',
                        padding: '5',
                        items: [
                            {
                                xtype: 'grid',
                                scrollable: true,
                                bind: {
                                    store: '{schemes}'
                                },
                                columns: [
                                    {
                                        text: 'Наименование',
                                        dataIndex: 'scheme',
                                        flex: 1
                                    },{
                                        xtype: 'checkcolumn',
                                        text: 'Вкл',
                                        dataIndex: 'use',
                                        listeners: {
                                            checkchange: 'checkScheme'
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        title: 'Процедуры',
                        items: [
                            {
                                xtype: 'fieldset',
                                title: 'Добавить процедуру',
                                layout: 'hbox',
                                padding: '5 5 10 5',
                                items: [
                                    {
                                        xtype: 'combo',
                                        name: 'procedure',
                                        displayField: 'ROUTINE_NAME',
                                        valueField: 'ROUTINE_NAME',
                                        queryMode: 'local',
                                        bind: {
                                            store: '{procedures_all}'
                                        },
                                        flex: 3
                                    },{
                                        xtype: 'button',
                                        formBind: true,
                                        disabled: true,
                                        text: 'Добавить',
                                        margin: '0 0 0 5',
                                        handler: 'onAddProcedure'
                                    }
                                ]
                            },{
                                xtype: 'grid',
                                scrollable: true,
                                height: 500,
                                bind: {
                                    store: '{procedures_role}'
                                },
                                columns: [
                                    {
                                        xtype: 'rownumberer',
                                        width: 40
                                    },{
                                        text: 'Процедуры',
                                        dataIndex: 'proc',
                                        flex: 1
                                    },{
                                        xtype: 'actioncolumn',
                                        text: 'Удалить',
                                        width: 50,
                                        items: [{
                                            tooltip: 'Удаление процедуры',
                                            icon: 'resources/icons/icon-error.png',
                                            handler: 'onDelProc'
                                        }]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }]

});