Ext.define("ADM.view.articles.Articles",{
    extend: "Base.panel.ModuleContainer",
    alias: 'widget.articles',

    requires: [
        'ADM.view.articles.ArticlesModel',
        'ADM.view.articles.ArticlesController'
    ],

    header: {
        xtype: 'basemoduleheader',
        items: [{
            type: 'plus',
            handler: 'prepareFormCreate',
            tooltip: 'Добавить статью'
        }]
    },

    controller: "articles",
    viewModel: {
        type: "articles"
    },

    bind: {
        title: '{name}'
    },

    items: [{
        xtype: 'basemodulelist',
        bind: {
            store: '{articles}'
        },
        columns: [{
            text: 'Заголовок',
            minWidth: 150,
            flex: 1,
            dataIndex: 'title'
        },{
            text: 'Анонс',
            minWidth: 250,
            renderer: 'rendererToolTip',
            flex: 2,
            dataIndex: 'anons'
        },{
            xtype: 'datecolumn',
            text: 'Дата создания',
            dataIndex: 'create_time',
            width: 150,
            format:'Y-m-d H:i'
        },{
            xtype: 'datecolumn',
            text: 'Дата последнего обнавления',
            dataIndex: 'update_time',
            width: 190,
            format:'Y-m-d H:i'
        }],
        dockedItems: [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            bind: {
                store: '{articles}'
            }
        }],
        listeners: {
            selectionchange: 'onSelectRecord'
        }
    },{
        xtype: 'basemoduleform',
        bind: {
            title: '{getTitleForm}'
        },
        items: [{
            xtype: 'textfield',
            fieldLabel: 'Заголовок',
            name: 'title',
            bind: {
                value: '{record.title}'
            }
        },{
            xtype: 'textarea',
            flex: 1,
            name: 'anons',
            fieldLabel: 'Анонс',
            bind: {
                value: '{record.anons}'
            }
        },{
            xtype: 'htmleditor',
            flex: 3,
            name: 'content',
            fieldLabel: 'Контент',
            bind: {
                value: '{record.content}',
                readOnly: '{!isCreate}'
            }
        },{
            xtype: 'hiddenfield',
            name: 'create_time',
            bind: {
                value: '{getCreateTime}'
            }
        },{
            xtype: 'hiddenfield',
            name: 'update_time',
            bind: {
                value: '{getUpdateTime}'
            }
        }],
        buttons: [{
            xtype: 'button',
            formBind: true,
            disabled: true,
            bind: {
                text: '{getTextButton}'
            },
            handler: 'onSyncStore'
        },{
            xtype: 'button',
            text: 'Удалить',
            handler: 'onRemoveRecord',
            bind: {
                hidden: '{isCreate}'
            }
        },{
            xtype: 'button',
            text: 'Сбросить',
            handler: 'onResetForm'
        }]
    }]
});
