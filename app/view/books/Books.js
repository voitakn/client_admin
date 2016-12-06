Ext.define("ADM.view.books.Books",{
    extend: "Base.panel.ModuleContainer",
 
    requires: [
        "ADM.view.books.BooksController",
        "ADM.view.books.BooksModel"
    ],
    
    controller: "books-books",
    viewModel: {
        type: "books-books"
    },

    bind: {
        title: '{name}'
    },

    items: [{
        xtype: 'basemodulelist',
        bind: {
            store: '{books}'
        },
        columns: [{
            dataIndex: 'book_uid',
            text: 'ID книги',
            sortable: false
        },{
            dataIndex: 'name',
            renderer: 'renderLinkLastBook',
            text: 'Название',
            width: 160
        },{
            dataIndex: 'author',
            text: 'Автор',
            renderer: 'rendererToolTip',
            width: 160
        },{
            dataIndex: 'login',
            text: 'Логин автора',
            renderer: 'rendererToolTip',
            width: 160
        },{
            dataIndex: 'preview',
            text: 'Описание',
            width: 150,
            sortable: false
        },{
            dataIndex: 'genres',
            renderer: 'rendererToolTip',
            sortable: false,
            text: 'Жанры'
        },{
            dataIndex: 'tags',
            renderer: 'rendererToolTip',
            sortable: false,
            text: 'Теги'
        },{
            dataIndex: 'publication_date',
            text: 'Дата публикации',
            xtype: 'datecolumn',
            format:'d.m.Y',
            width: 150
        },{
            dataIndex: 'approved_title',
            text: 'Статус',
            width: 130
        },{
            dataIndex: 'last_public_epub_reason',
            renderer: 'rendererToolTip',
            width: 180,
            text: 'Причина блокировки',
            sortable: false
        },{
            text: 'Признаки',

            cls: 'custom-column-not-sorted',
            sortable: false,
            columns: [{
                xtype: 'booleancolumn',
                dataIndex: 'recommended',
                tooltip: 'Рекомендуемый',
                text: 'R',
                trueText: 'Да',
                falseText: 'Нет',
                width: 50
            },{
                xtype : 'booleancolumn',
                dataIndex: 'best',
                tooltip: 'Лучший',
                text: 'B',
                trueText: 'Да',
                falseText: 'Нет',
                width: 50
            }]
        },{
            dataIndex: 'price',
            width: 120,
            text: 'Цена',
            renderer: function(value) {
                return Ext.util.Format.currency(value, " ");
            }
        },{
            dataIndex: 'book_year',
            width: 110,
            xtype: 'datecolumn',
            format:'Y',
            text: 'Год издания'

        },{
            dataIndex: 'lang',
            width: 130,
            text: 'Язык'
        }],
        dockedItems: [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            bind: {
                store: '{books}'
            }
        }],
        listeners: {
            selectionchange: 'onSelectRecord'
        }
    },{
        xtype: 'basemoduletabpanel',
        region: 'west',
        layout: 'anchor',
        header: false,
        collapsible: true,
        split: true,
        width: 420,
        defaults: {
            anchor: '100% 100%'
        },
        items: [{
            xtype: 'basemoduleform',
            reference: 'filter',
            title: 'Фильтр',
            defaults: {
                labelAlign: 'top',
                allowBlank: true
            },
            items: [{
                xtype: 'textfield',
                fieldLabel: 'ID',
                name: 'book_uid'
            },{
                xtype: 'textfield',
                fieldLabel: 'Название',
                name: 'book_name'
            },{
                xtype: 'textfield',
                fieldLabel: 'Автор',
                name: 'author'
            },{
                xtype: 'filtercombobox',
                fieldLabel: 'Логин',
                name: 'login',
                displayField: 'login',
                valueField: 'login',
                queryMode: 'local',
                forceSelection: true,
                bind: {
                    store: '{users}'
                }
            },{
                xtype:'fieldset',
                title: 'Признаки',
                checkboxToggle: true,
                collapsed: true,
                checkboxName: 'sing',
                layout: 'anchor',
                items: [{
                    xtype: 'checkbox',
                    fieldLabel: 'Лучший',
                    labelWidth: 140,
                    anchor: '100%',
                    name: 'best'
                },{
                    xtype: 'checkbox',
                    fieldLabel: 'Рекомендуемый',
                    labelWidth: 140,
                    anchor: '100%',
                    name: 'recommended'
                }]
            },{
                xtype: 'filtercombobox',
                fieldLabel: 'Статус',
                displayField: 'title',
                valueField: 'id',
                queryMode: 'local',
                editable: false,
                forceSelection: true,
                name: 'approved',
                bind: {
                    store: '{bookStatuses}'
                }
            }],
            buttons: [{
                xtype: 'button',
                text: 'Искать',
                handler: 'onFilterStore'
            },{
                xtype: 'button',
                text: 'Сбросить',
                handler: 'onResetFilter'
            }]
        },{
            xtype: 'basemoduleform',
            title: 'Параметры',
            items: [{
                xtype: 'textfield',
                fieldLabel: 'Название',
                allowBlank: true,
                bind: {
                    value: '{record.name}'
                }
            },{
                xtype: 'textfield',
                fieldLabel: 'Автор',
                allowBlank: true,
                bind: {
                    value: '{record.author}'
                }
            },{
                xtype: 'numberfield',
                fieldLabel: 'Цена',
                allowBlank: true,
                bind: {
                    value: '{record.price}'
                }
            },{
                xtype: 'datefield',
                fieldLabel: 'Год издания',
                hideTrigger: true,
                allowBlank: true,
                format: 'Y',
                bind: {
                    value: '{record.book_year}'
                }
            },{
                xtype: 'combobox',
                fieldLabel: 'Тема',
                displayField: 'theme_name',
                valueField: 'theme_uid',
                queryMode: 'local',
                allowBlank: true,
                forceSelection: true,
                bind: {
                    store: '{themes}',
                    value: '{record.active_theme_uid}'
                }
            },{
                xtype:'fieldset',
                title: 'Признаки',
                layout: 'anchor',
                items: [{
                    xtype: 'checkbox',
                    fieldLabel: 'Лучший',
                    labelWidth: 140,
                    anchor: '100%',
                    bind: {
                        value: '{record.best}'
                    }
                },{
                    xtype: 'checkbox',
                    fieldLabel: 'Рекомендуемый',
                    labelWidth: 140,
                    anchor: '100%',
                    bind: {
                        value: '{record.recommended}'
                    }
                }]
            },{
                xtype: 'combobox',
                fieldLabel: 'Статус',
                displayField: 'title',
                valueField: 'id',
                queryMode: 'local',
                editable: false,
                forceSelection: true,
                bind: {
                    store: '{bookStatuses}',
                    value: '{record.approved}'
                }
            },{
                xtype: 'tagfield',
                fieldLabel: 'Теги',
                bind: {
                    store: '{tags}',
                    value: '{record.tags_list}'
                },
                maxLength: 4,
                displayField: 'name',
                valueField: 'id',
                filterPickList: true,
                queryMode: 'local',
                publishes: 'name'

            },{
                xtype: 'textarea',
                fieldLabel: 'Описание',
                allowBlank: true,
                flex: 1,
                bind: {
                    value: '{record.preview}'
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
    }]
});
