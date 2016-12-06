Ext.define("ADM.view.nominations.Nominations",{
    extend: "Base.panel.ModuleContainer",
    alias: 'widget.nominations',

    requires: [
        'ADM.view.nominations.NominationsController',
        'ADM.view.nominations.NominationsModel'
    ],

    controller: "nominations",
    viewModel: {
        type: "nominations"
    },

    bind: {
        title: '{name}'
    },

    tools: [{
        xtype: 'segmentedbutton',
        items: [{
            xtype: 'button',
            text: 'Открыть премию',
            status: 1,
            bind: {
                pressed: '{isNominationOpen}'
            },
            handler: 'onChangeDateStaus'
        },{
            xtype: 'button',
            text: 'Закрыть премию',
            status: 0,
            bind: {
                pressed: '{isNominationClose}'
            },
            handler: 'onChangeDateStaus'
        }]
    }],

    items: [{
        xtype: 'basemodulelist',
        bind: {
            store: '{nominations}'
        },
        columns: [{
            text: 'Тип',
            minWidth: 100,
            dataIndex: 'award_book_type_title'
        },{
            text: 'Название книги',
            minWidth: 150,
            flex: 1,
            renderer: 'renderBook',
            dataIndex: 'book_name'
        },{
            text: 'Автор',
            minWidth: 150,
            flex: 1,
            dataIndex: 'author'
        },{
            text: 'Статус',
            width: 200,
            dataIndex: 'status_title'
        }],
        dockedItems: [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            bind: {
                store: '{nominations}'
            },
            displayInfo: true
        }],
        listeners: {
            selectionchange: 'onSelectRecord'
        }
    },{
        xtype: 'basemoduleform',
        title: 'Дополнительная информация',
        defaultType: 'displayfield',
        defaults: {
            labelAlign: 'left',
            labelWidth: 160
        },
        items: [{
            fieldLabel: 'Имя',
            bind: {
                value: '{record.name}'
            }
        },{
            fieldLabel: 'Фамилия',
            bind: {
                value: '{record.lastname}'
            }
        },{
            fieldLabel: 'E-mail',
            bind: {
                value: '{record.email}'
            }
        },{
            fieldLabel: 'Союз писателей',
            bind: {
                value: '{record.member_writers_union}'
            }
        },{
            fieldLabel: 'Литературная ассоциация',
            bind: {
                value: '{record.member_literary_association}'
            }
        },{
            fieldLabel: 'Аннотация',
            bind: {
                value: '{record.annotation}'
            }
        },{
            fieldLabel: 'Год',
            bind: {
                value: '{record.year}'
            }
        },{
            fieldLabel: 'Номинация',
            bind: {
                value: '{record.nomination}'
            }
        },{
            fieldLabel: 'Синопсис',
            bind: {
                value: '{record.synopsis}'
            }
        },{
            fieldLabel: 'Номинант',
            bind: {
                value: '{record.nominator}'
            }
        },{
            fieldLabel: 'ИСБН',
            bind: {
                value: '{record.isbn}'
            }
        },{
            fieldLabel: 'Писатель',
            bind: {
                value: '{record.publisher}'
            }
        },{
            fieldLabel: 'Номер УДК',
            bind: {
                value: '{record.number_udk}'
            }
        },{
            fieldLabel: 'Номер ББК',
            bind: {
                value: '{record.number_bbk}'
            }
        },{
            fieldLabel: 'СМИ',
            bind: {
                value: '{record.smi}'
            }
        },{
            fieldLabel: 'Статус',
            bind: {
                value: '{record.status_title}'
            }
        },{
            fieldLabel: 'Причина отказа',
            bind: {
                value: '{record.reject_msg}'
            }
        }],
        buttons: [{
            xtype: 'button',
            text: 'Корректировка',
            status: 2,
            bind: {
                hidden: '{isCorrective}'
            },
            handler: 'onChangeStatusNomination'
        },{
            xtype: 'button',
            text: 'Номинировать',
            status: 4,
            bind: {
                hidden: '{isNomination}'
            },
            handler: 'onChangeStatusNomination'
        },{
            xtype: 'button',
            text: 'Отклонить',
            status: 9,
            bind: {
                hidden: '{isCancel}'
            },
            handler: 'onChangeStatusNomination'
        }]
    }]
});
