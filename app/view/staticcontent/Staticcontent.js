Ext.define('ADM.view.staticcontent.Staticcontent', {
    extend: 'Base.panel.ModuleContainer',
    alias: 'widget.staticcontent',
    title: 'Статический контент',
    requires: [
        'ADM.view.staticcontent.StaticcontentController',
        'ADM.view.staticcontent.StaticcontentModel'
    ],
    controller: 'staticcontent',

    header: {
        xtype: 'basemoduleheader',
        items: [{
            type: 'plus',
            handler: 'createContent'
        }]
    },

    viewModel: {
        type: 'staticcontent'
    },
    initComponent: function() {
        this.items = [{
            xtype: 'basemodulelist',
            reference: 'gridStaticContent',
            region: 'center',
            plugins: [{
                ptype: 'rowexpander',
                rowBodyTpl: Ext.create('Ext.XTemplate',
                    '<span style="font-weight: 600;" class="x-form-item-label-default">Контент:</span></br>{page_data}'
                )
            }],
            bind: {
                store: '{staticContents}'
            },
            columns: [{
                text: 'Страница',
                dataIndex: 'alias',
                flex: 1
            },{
                text: 'Заголовок',
                dataIndex: 'title',
                flex: 1
            },{
                text: 'Статус',
                dataIndex: 'status',
                renderer: 'renderStatus',
                flex: 1
            },{
                text: 'Раздел',
                dataIndex: 'area_id',
                renderer: 'renderArea',
                flex: 1
            }],
            listeners: {
                selectionchange: 'onSelectionRow'
            },
            dockedItems: [{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                displayInfo: true,
                bind: {
                    store: '{staticContents}'
                }
            }]
        },{
            xtype: 'basemoduleform',
            region: 'west',
            reference: 'panelStaticContent',
            collapsible: true,
            split: true,
            layout: 'anchor',
            width: 320,
            bind: {
                html: '{getInfo}',
                title: '{getTitle}'
            },
            items: [{
                xtype: 'form',
                anchor: '100% 100%',
                defaults: {
                    labelAlign: 'top',
                    margin: '0 5',
                    allowBlank: false
                },
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                bind: {
                    hidden: '{isHidden}'
                },
                items: [{
                    xtype: 'hiddenfield',
                    name: 'page_id',
                    bind: {
                        value: '{record.static_page_id}'
                    }
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Страница',
                    name: 'alias',
                    bind: {
                        value: '{record.alias}'
                    }
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Заголовок',
                    name: 'title',
                    bind: {
                        value: '{record.title}'
                    }
                },{
                    xtype: 'combobox',
                    fieldLabel: 'Статус',
                    name: 'status',
                    displayField: 'title',
                    valueField: 'id',
                    queryMode: 'local',
                    forceSelection: true,
                    allowBlank: true,
                    bind: {
                        store: '{statusContent}',
                        value: '{record.status}',
                        hidden: '{create}'
                    }
                },{
                    xtype: 'combobox',
                    fieldLabel: 'Раздел',
                    name: 'area_id',
                    displayField: 'title',
                    valueField: 'area_id',
                    queryMode: 'local',
                    forceSelection: true,
                    bind: {
                        store: '{areasContent}',
                        value: '{record.area_id}'
                    }
                },{
                    xtype: 'textarea',
                    fieldLabel: 'Контент',
                    margin: '0 5 10 5',
                    name: 'page_data',
                    flex: 1,
                    bind: {
                        value: '{record.page_data}'
                    }
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
                    handler: 'resetForm'
                }]
            }]
        }];
        this.callParent(arguments);
    }
});