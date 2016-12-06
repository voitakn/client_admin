Ext.define('ADM.view.dropcaps.Dropcaps', {
    extend: "Base.panel.ModuleContainer",
    alias: 'widget.dropcaps',
    requires: [
        'Base.grid.ModuleList',
        'Base.panel.ModuleForm',
        'ADM.view.dropcaps.Controller',
        'ADM.view.dropcaps.Model',
        'Ext.grid.plugin.CellEditing'
    ],
    viewModel: {
        type: "dropcaps"
    },
    controller: 'dropcaps',
    title: 'Буквицы',
    items: [{
        xtype: 'basemodulelist',
        bind: {
            store: '{dropcaps}'
        },
        columns: [
            {
                text: 'ID',
                dataIndex: 'id',
                flex: 1
            },{
                text: 'Содержание',
                dataIndex: 'content',
                renderer: 'rendererGridContent',
                flex: 3
            },{
                xtype:'actioncolumn',
                text: 'Действие',
                width: 110,
                align: 'center',
                items: [{
                    tooltip: 'Удаление буквицы',
                    getClass: function () {
                        return 'fa fa-times-circle fa-fw'
                    },
                    handler: 'onRemoveDropcaps'
                }]
            }
        ],
        plugins: [{
            ptype: 'rowexpander',
            rowBodyTpl: new Ext.XTemplate(
                '<p><b>Изображение: </b>{content:this.getImg}</p>',
                '{content:this.getParams}',
                {
                    getParams: function(content){
                        if(!content || typeof(content.config) != 'object'){return '';}
                        var style = content.config;
                        var res = '<table>';
                        for(var key in style) if(style.hasOwnProperty(key)) {
                            var value = style[key].split(';');
                            var position = value[1].split('x');
                            value = value[0].split('x');
                            var capsStyle = 'background-image: url(/node/admin/dropcaps/dropcap-image/' + content.name + ')' +
                                '; width: ' + value[0] + 'px; height: ' + value[1] + 'px;' +
                                'background-position: -' + position[0] + 'px -' + position[1] + 'px; display: inline-block;';
                            res += '<tr><td><b>' + key + ': </b></td><td>' + style[key] + '</td>' +
                            '<td><span style="' + capsStyle + '"></span></td></tr>'
                        }
                        return res + '</table>';
                    },
                    getImg: function(content){
                        if(!content || (typeof(content.full_path) != 'string' && typeof(content.name) != 'name')){
                            return ''
                        }
                        return content.full_path + content.name;
                    }
                }
            )
        }],
        listeners: {
            selectionchange: 'onSelectDropcaps'
        }
    }, {
        xtype: 'basemoduleform',
        tools: [
            {
                type: 'plus',
                tooltip: 'Добавить буквицу',
                handler: 'onResetForm'
            }
        ],
        width: 500,
        items: [
            {
                xtype: 'displayfield',
                fieldLabel: 'ID буквицы',
                labelAlign: 'left',
                labelWidth: 70,
                bind: {
                    value: '{record.id}'
                }

            },
            {
                xtype: 'fieldset',
                title: 'Файлы буквицы',
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
                            src: '/node/admin/dropcaps/vignette-image/{iname}'
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