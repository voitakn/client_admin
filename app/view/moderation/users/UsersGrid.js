Ext.define('ADM.view.moderation.users.UsersGrid', {
    extend: 'Base.grid.ModuleList',
    alias: 'widget.moderation-users-grid',
    bind: {
        store: '{users}'
    },
    initComponent: function(){
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
        this.listeners = {
            select: 'onSelectedRec',
            beforedeselect: 'onBeforeSelect',
            beforerender: 'onSelectedUser',
            edit: 'onSelectModer'
        };
        this.plugins = {
            ptype: 'cellediting',
                clicksToEdit: 1
        };
        this.columns = [{
            text: 'ID',
            menuDisabled: true,
            dataIndex: 'id'
        },{
            text: 'Логин',
            menuDisabled: true,
            dataIndex: 'login',
            flex: 2
        },{
            text: 'Uid',
            dataIndex: 'uid',
            hidden: true,
            menuDisabled: true,
            flex: 2
        },{
            text: 'Адресс',
            menuDisabled: true,
            dataIndex: 'address',
            hidden: true,
            flex: 2
        },{
            text: 'Псевдоним',
            menuDisabled: true,
            dataIndex: 'nickname',
            flex: 2
        },{
            text: 'Роль',
            dataIndex: 'role_name',
            menuDisabled: true,
            flex: 2
        },{
            text: 'Статус',
            dataIndex: 'access',
            renderer: 'rendererAccess',
            menuDisabled: true,
            width: 180,
            editor: {
                xtype: 'combobox',
                labelWidth: 0,
                store: {
                    fields: ['id', 'name'],
                    data: dataAccess
                },
                displayField: 'name',
                margin: '5 0 0 0',
                valueField: 'id',
                editable: false,
                forceSelection: true
            }
        },{
            text: 'Статус модерации',
            dataIndex: 'comment_status',
            renderer: 'rendererComment',
            menuDisabled: true,
            width: 180,
            editor: {
                xtype: 'combobox',
                labelWidth: 0,
                store: {
                    fields: ['id', 'name'],
                    data: dataCommentStatus
                },
                margin: '5 0 0 0',
                displayField: 'name',
                valueField: 'id',
                editable: false,
                forceSelection: true
            }
        }];
        this.callParent(arguments);
    }
});