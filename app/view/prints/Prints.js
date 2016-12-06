Ext.define("ADM.view.prints.Prints",{
    extend: "Base.panel.ModuleContainer",
    alias: 'widget.prints',

    requires: [
        'ADM.view.prints.PrintsController',
        'ADM.view.prints.PrintsModel'
    ],

    controller: "prints",
    viewModel: {
        type: "prints"
    },

    bind: {
        title: '{name}'
    },

    items: [{
        xtype: 'basemodulelist',
        bind: {
            store: '{prints}'
        },
        columns: [{
            text: 'Название книги',
            minWidth: 150,
            flex: 1,
            dataIndex: 'name'
        },{
            text: 'Формат',
            width: 110,
            dataIndex: 'book_format_title'
        },{
            text: 'Тип обложки/крепления',
            width: 180,
            dataIndex: 'hardcover_type_title'
        },{
            text: 'Красочность блока',
            width: 150,
            dataIndex: 'print_type_title'
        },{
            text: 'Плотность бумаги на блок',
            width: 190,
            dataIndex: 'paper_block_title'
        },{
            text: 'Плотность бумаги на обложку',
            width: 220,
            dataIndex: 'paper_cover_title'
        },{
            text: 'Тираж',
            minWidth: 100,
            dataIndex: 'count'
        },{
            text: 'Статус',
            minWidth: 100,
            dataIndex: 'status_title'
        }],
        listeners: {
            selectionchange: 'onSelectRecord'
        }
    },{
        xtype: 'basemoduleform',
        title: 'Дополнительная информация',
        width: 400,
        defaultType: 'displayfield',
        defaults: {
            labelAlign: 'left'
        },
        items: [{
            fieldLabel: 'Номер оплаты',
            bind: {
                value: '{record.id}'
            }
        },{
            fieldLabel: 'Дата заказа',
            bind: {
                value: '{getDate}'
            }
        },{
            fieldLabel: 'Название книги',
            bind: {
                value: '{record.name}'
            }
        },{
            fieldLabel: 'Формат печати',
            renderer: '',
            bind: {
                value: '{record.book_format_title}'
            }
        },{
            fieldLabel: 'Твердый переплет',
            bind: {
                value: '{record.hardcover_type_title}'
            }
        },{
            fieldLabel: 'Цвет',
            bind: {
                value: '{record.print_type_title}'
            }
        },{
            fieldLabel: 'Тип бумаги',
            bind: {
                value: '{record.paper_block_title}'
            }
        },{
            fieldLabel: 'Тип обложки',
            bind: {
                value: '{record.paper_cover_title}'
            }
        },{
            fieldLabel: 'Тираж',
            bind: {
                value: '{record.count}'
            }
        },{
            fieldLabel: 'Цена, руб.',
            bind: {
                value: '{record.price}'
            }
        },{
            xtype: 'combobox',
            fieldLabel: 'Статус',
            displayField: 'title',
            valueField: 'id',
            queryMode: 'local',
            forceSelection: true,
            bind: {
                store: '{printStatuses}',
                value: '{record.status}'
            }
        },{
            fieldLabel: 'Адрес',
            bind: {
                value: '{record.address}'
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
            handler: 'onResetForm'
        }]
    }]
});
