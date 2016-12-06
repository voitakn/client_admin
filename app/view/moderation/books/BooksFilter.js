Ext.define('ADM.view.moderation.books.BooksFilter', {
    extend: 'Base.panel.ModuleForm',
    alias: 'widget.view-moderbook-form',
    layout: 'anchor',
    defaults: {
        labelAlign: 'top',
        anchor: '100%',
        margin: '0 10'
    },
    controller: 'moderbook',
    initComponent: function() {
        var store  = Ext.data.StoreManager.lookup('staticData');
        var record = store.query('name', 'book').getAt(0);
        var dataStatus = [{
            id: -12,
            name: 'Все'
        }];
        Ext.Object.each(record.get('static_data')['book_status'], function(key, value) {
            if (key > 0 && key <= 3 ) {
                dataStatus.push({
                    id: key,
                    name: value
                });
            }
        });
        this.items = [{
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
            xtype: 'combobox',
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
            hidden: true,
            checkboxName: 'atr',
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
            xtype: 'combobox',
            fieldLabel: 'Статус',
            displayField: 'name',
            valueField: 'id',
            queryMode: 'local',
            editable: false,
            forceSelection: true,
            name: 'approved',
            value: -12,
            store: {
                fields: ['id', 'name'],
                data: dataStatus
            }
        }];
        this.buttons = [{
            xtype: 'button',
            viewType: 'success',
            formBind: true,
            disabled: true,
            text: 'Искать',
            handler: 'onFilterSearch'
        },{
            xtype: 'button',
            viewType: 'warning',
            text: 'Сбросить',
            handler: 'onFilterReset'
        }];
        this.callParent(arguments);
    }
});
