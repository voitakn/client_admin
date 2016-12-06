Ext.define('ADM.view.moderation.complaints.ComplaintsFilter', {
    extend: 'Base.panel.ModuleForm',
    alias: 'widget.view-complaints-form',
    layout: 'anchor',
    defaults: {
        labelAlign: 'top',
        anchor: '100%',
        margin: '0 10'
    },
    controller: 'complaints',
    initComponent: function() {
        var store  = Ext.data.StoreManager.lookup('staticData');
        var record = store.query('name', 'complaint').getAt(0);
        var dataStatus = [{
            id: -10,
            name: 'Все'
        }];
        var dataLevels = [{
            id: -10,
            name: 'Все'
        }];
        Ext.Object.each(record.get('static_data')['statuses'], function(key, value) {
            dataStatus.push({
                id: key,
                name: value
            });
        });
        Ext.Object.each(record.get('static_data')['levels'], function(key, value) {
            dataLevels.push({
                id: key,
                name: value
            });
        });
        this.items = [{
            xtype: 'combobox',
            fieldLabel: 'Уровень жалобы',
            displayField: 'name',
            valueField: 'id',
            queryMode: 'local',
            editable: false,
            forceSelection: true,
            name: 'complainLevel',
            value: -10,
            store: {
                fields: ['id', 'name'],
                data: dataLevels
            }
        },{
            xtype: 'combobox',
            fieldLabel: 'Статус жалобы',
            displayField: 'name',
            valueField: 'id',
            queryMode: 'local',
            editable: false,
            forceSelection: true,
            name: 'status',
            value: -10,
            store: {
                fields: ['id', 'name'],
                data: dataStatus
            }
        },{
            xtype: 'combobox',
            fieldLabel: 'Автор контента',
            name: 'ownerUid',
            displayField: 'login',
            forceSelection: true,
            valueField: 'uid',
            queryMode: 'local',
            bind: {
                store: '{users}'
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
