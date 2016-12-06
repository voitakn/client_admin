Ext.define('ADM.view.moderation.users.UsersForm', {
    extend: 'Base.panel.ModuleForm',
    alias: 'widget.moderation-users-form',
    layout: 'anchor',
    reference: 'moderUsersForm',
    formBind: true,
    controller: 'moderation-users',
    viewModel: {
        type: 'moderation-users'
    },
    initComponent: function() {
        var store  = Ext.data.StoreManager.lookup('staticData');
        var record = store.query('name', 'user').getAt(0);
        var dataAccess = [];
        var dataCommentStatus = [];
        Ext.Object.each(record.get('static_data')['access'], function(key, value) {
            dataAccess.push({
                id: key,
                name: value
            });
        });
        Ext.Object.each(record.get('static_data')['comment_status'], function(key, value) {
            dataCommentStatus.push({
                id: key,
                name: value
            });
        });
        this.items = [{
            xtype: 'container',
            anchor: '100% 100%',
            layout: 'anchor',
            defaults: {
                anchor: '100%',
                allowBlank: false
            },
            padding: '0 5',
            items: [{
                xtype: 'displayfield',
                fieldLabel: 'Псевдоним',
                name: 'change_date',
                bind: '{record.nickname}'
            },{
                xtype: 'displayfield',
                fieldLabel: 'Логин',
                name: 'change_date',
                bind: '{record.login}'
            },{
                xtype: 'combobox',
                fieldLabel: 'Статус модерации',
                labelWidth: 100,
                name: 'comment_status',
                labelAlign: 'top',
                allowBlank: false,
                store: {
                    fields: ['id', 'name'],
                    data: dataCommentStatus
                },
                displayField: 'name',
                valueField: 'id',
                editable: false,
                forceSelection: true,
                bind: '{record.comment_status}'
            },{
                xtype: 'combobox',
                labelAlign: 'top',
                fieldLabel: 'Статус',
                labelWidth: 100,
                name: 'access',
                allowBlank: false,
                displayField: 'name',
                valueField: 'id',
                editable: false,
                forceSelection: true,
                store: {
                    fields: ['id', 'name'],
                    data: dataAccess
                },
                bind: '{record.access}'
            }]
        }];
        this.buttons = [{
            xtype: 'button',
            viewType: 'success',
            formBind: true,
            disabled: true,
            text: 'Сохранить',
            handler: 'onEditUser'
        },{
            xtype: 'button',
            viewType: 'warning',
            text: 'Сбросить',
            handler: 'onFormReset'
        }];
        this.callParent(arguments);
    }
});
