Ext.define('ADM.view.vignettes.Vignettes', {
    extend: "Base.panel.ModuleContainer",
    alias: 'widget.vignettes',
    requires: [
        'Base.grid.ModuleList',
        'Base.panel.ModuleForm',
        'ADM.view.vignettes.Controller',
        'ADM.view.vignettes.Model',
        'Ext.grid.plugin.CellEditing'
    ],
    viewModel: {
        type: "vignettes"
    },
    controller: 'vignettes',
    title: 'Виньетки',
    items: [{
        xtype: 'basemodulelist',
        bind: {
            store: '{vignettes}'
        },
        plugins: [{
            ptype: 'rowexpander',
            rowBodyTpl: new Ext.XTemplate(
                '<p><b>Изображение: </b>{content:this.getImg}</p>',
                '{content:this.getCss}',
                {
                    getCss: function(content){
                        if(!content || typeof(content.style) != 'object') {return ''}
                        var style = content.style;
                        var res = '<table>';
                        for(var key in style) if(style.hasOwnProperty(key)) {
                            res += '<tr><td><b>' + key + ': </b></td><td>' + style[key] + '</td></tr>'
                        }
                        return res + '</table>';
                    },
                    getImg: function(content){
                        if(!content || typeof(content.src) != 'string'){
                            return ''
                        }
                        return content.src;
                    }
                }
            )
        }],
        columns: [
            {
                text: 'ID',
                dataIndex: 'id',
                flex: 1
            },{
                text: 'Содержание',
                dataIndex: 'content',
                renderer: 'rendererColumnContent',
                flex: 1
            }
        ],
        listeners: {
            selectionchange: 'onSelectVignette'
        }
    }, {
        xtype: 'basemoduleform',
        tools: [
            {
                type: 'plus',
                tooltip: 'Добавить виньетку',
                handler: 'onResetForm'
            }
        ],
        width: 500,
        items: [
            {
                xtype: 'displayfield',
                fieldLabel: 'ID виньетки',
                labelAlign: 'left',
                labelWidth: 70,
                bind: {
                    value: '{record.id}'
                }

            },
            {
                xtype: 'fieldset',
                title: 'Файл виньетки',
                padding: '5 5 5 5',
                height: 200,
                layout: {
                    type: 'vbox'
                },
                items: [
                    {
                        xtype: 'container',
                        padding: 5,
                        layout: {
                            type: 'hbox'
                        },
                        items: [
                            {
                                xtype: 'container',
                                flex: 1
                            },{
                                xtype: 'button',
                                text: 'Изменить изображение',
                                handler: 'openImages'
                            },{
                                xtype: 'container',
                                flex: 1
                            }
                        ]
                    },
                    {
                        xtype: 'image',
                        reference: 'vignette_img',
                        style: {
                            maxWidth: '370px',
                            maxHeight: '90px'
                        },
                        bind: {
                            src: '/node/admin/vignettes/vignette-image/{iname}'
                        }
                    }
                ]
            },{
                xtype: 'grid',
                title: 'Стили виньетки',
                tools: [
                    {
                        type: 'plus',
                        tooltip: 'Добавить стиль',
                        handler: 'onAddStyle'
                    }
                ],
                plugins: {
                    ptype: 'cellediting',
                    clicksToEdit: 1
                },
                bind: {
                    store: '{styles}'
                },
                columns: [
                    {
                        text: 'Свойство',
                        dataIndex: 'property',
                        editor: {
                            allowBlank: false
                        },
                        flex: 1
                    },{
                        text: 'Значение',
                        dataIndex: 'value',
                        editor: {
                            allowBlank: false
                        },
                        flex: 2
                    }
                ]

            }
        ],
        buttons: [{
            xtype: 'button',
            text: 'Сохранить',
            handler: 'onSyncStore'
        },{
            xtype: 'button',
            text: 'Очистить',
            handler: 'onResetForm'
        }]
    }]

});