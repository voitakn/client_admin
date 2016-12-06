Ext.define("ADM.view.typeitems.Typeitems",{
    extend: "Base.panel.ModuleContainer",
 
    requires: [
        "ADM.view.typeitems.TypeitemsController",
        "ADM.view.typeitems.TypeitemsModel"
    ],
    
    controller: "typeitems",
    viewModel: {
        type: "typeitems"
    },

    header: {
        xtype: 'basemoduleheader',
        items: [{
            type: 'plus',
            handler: 'prepareFormCreate',
            tooltip: 'Добавить статью'
        }]
    },

    bind: {
        title: '{name}'
    },

    items: [{
        xtype: 'basemodulelist',
        bind: {
            store: '{typeItems}'
        },
        columns: [{
            text: 'id',
            dataIndex: 'item_type_id',
            width: 80
        },{
            text: 'Тип',
            dataIndex: 'item_type',
            minWidth: 120,
            flex: 5
        },{
            text: 'Название',
            dataIndex: 'name',
            minWidth: 140,
            flex: 5
        },{
            text: '<span data-qtip="Минимальная длинна">Мин.</span>',
            dataIndex: 'min_length',
            minWidth: 80,
            flex: 2
        },{
            text: '<span data-qtip="Максимальная длинна">Макс.</span>',
            dataIndex: 'max_length',
            minWidth: 80,
            flex: 2
        },{
            xtype: 'checkcolumn',
            text: 'new_page',
            dataIndex: 'new_page',
            minWidth: 90,
            flex: 2,
            listeners: {
                checkchange: 'onCheckChange'
            }
        },{
            xtype: 'checkcolumn',
            text: 'Уникальность',
            dataIndex: 'uniq',
            minWidth: 90,
            flex: 2,
            listeners: {
                checkchange: 'onCheckChange'
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
            fieldLabel: 'Тип',
            bind: '{record.item_type}'
        },{
            xtype: 'textfield',
            fieldLabel: 'Название',
            bind: '{record.name}'
        },{
            xtype: 'fieldset',
            title: 'Атрибуты',
            collapsible: true,
            layout: 'anchor',
            defaults: {
                anchor: '100%',
                allowBlank: false
            },
            items: [{
                xtype: 'numberfield',
                fieldLabel: 'Минимальная длинна',
                minValue: 0,
                bind: '{record.min_length}'
            },{
                xtype: 'numberfield',
                fieldLabel: 'Максимальная длинна',
                minValue: 0,
                bind: '{record.max_length}'
            },{
                xtype: 'checkbox',
                fieldLabel: 'new_page',
                labelWidth: 100,
                bind: '{record.new_page}'
            },{
                xtype: 'checkbox',
                fieldLabel: 'Уникальный',
                labelWidth: 100,
                bind: '{record.uniq}'
            }]
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
