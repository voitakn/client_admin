Ext.define('UD.view.themes.ThemesGrid', {
    extend: 'UD.view.base.Grid',
    alias: 'widget.view-themes-grid',
    requires: [
        'UD.view.base.ActionColumn'
    ],
    id: 'view-themes-grid-id',
    initComponent: function(){
        this.store = Ext.data.StoreManager.lookup('storeThemes') || Ext.create('UD.store.Themes');
        var userInfo = this.userInfo;
        this.columns = [{
            text: 'ID',
            dataIndex: 'theme_uid',
            flex: 1
        },{
            text: 'Название',
            dataIndex: 'theme_name',
            flex: 3
        },{
            text: 'Название',
            dataIndex: 'theme_type',
            flex: 3
        },{
            text: 'Пользователь',
            dataIndex: 'login',
            flex: 3
        },{
            xtype: 'booleancolumn',
            text: 'Общая',
            trueText: 'Да',
            falseText: 'Нет',
            dataIndex: 'is_public',
            flex: 3
        },{
            xtype:'base-column-action',
            text: 'Действие',
            width: 80,
            flex: 2,
            align: 'center',
            items: [{
                tooltip: 'Редактирование шаблона',
                icon: '/icons/edit_9793.png',
                getClass: function (val, meta, rec) {
                    if(userInfo['uid'] == rec.get('uid')){
                        return 'fa  fa-edit fa-fw';
                    }
                    return false
                },
                handler: 'showWindowEditContentTheme'
            }]
        }];
        this.callParent(arguments);
    }
});