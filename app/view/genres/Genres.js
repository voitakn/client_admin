Ext.define('ADM.view.genres.Genres', {
    extend: "Base.panel.ModuleContainer",
    alias: 'widget.genres',
    requires: [
        'Base.tree.ModuleList',
        'Base.panel.ModuleForm',
        'ADM.view.genres.Controller',
        'ADM.view.genres.Model',
        "ADM.view.genres.Tree"
    ],
    viewModel: {
        type: "genres"
    },
    controller: 'genres',
    title: 'Жанры',

    items: [{
        xtype: 'genres-tree'

    }/*, {
        xtype: 'basemoduleform',
        width: 250,
        items: [
            {
                xtype:'fieldset',
                title: 'Период',
                items: [{
                    xtype: 'datefield',
                    allowBlank: false,
                    name: 'date_from',
                    fieldLabel: 'С',
                    labelWidth: 40,
                    format: 'Y-m-d H:i:s',
                    value: Ext.Date.add(new Date(), Ext.Date.MONTH, -1)
                },{
                    xtype: 'datefield',
                    name: 'date_to',
                    labelWidth: 40,
                    fieldLabel: 'По',
                    format: 'Y-m-d H:i:s',
                    value: new Date()
                }]
            },{
                xtype: 'combobox',
                fieldLabel: 'Уровень',
                name: 'level',
                value: -10,
                queryMode: 'local',
                displayField: 'name',
                valueField: 'id',
                editable: false,
                forceSelection: true,
                store: {
                    fields: ['id', 'name'],
                    data : [{
                        id: -10,
                        name: "Все"
                    },{
                        id: 'warn',
                        name: "Warn"
                    },{
                        id: 'error',
                        name: "Error"
                    },{
                        id: 'debug',
                        name: "Debug"
                    }]
                }
            },{
                xtype: 'textfield',
                allowBlank: true,
                name: 'message',
                fieldLabel: 'Сообщение'
            }
        ],
        buttons: [{
            xtype: 'button',
            text: 'Поиск',
            handler: 'onFilter'
        },{
            xtype: 'button',
            text: 'Сбросить',
            handler: 'onResetForm'
        }]
    }*/]

});