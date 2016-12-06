Ext.define('UD.view.themes.Themes', {
    extend: 'Ext.container.Container',
    alias: 'widget.view-themes',
    id: 'view-themes-id',
    header: false,
    region: 'center',
    headerTitle: 'Шаблоны',
    layout: 'border',
    userInfo: Adm.user,
    requires: [
        'UD.view.themes.ThemesForm',
        'UD.view.themes.ThemesGrid',
        'UD.view.themes.ThemesController',
        'UD.view.themes.ThemesWindowCreate',
        'UD.view.themes.ThemesTreePanelFolders',
        'UD.view.themes.ThemesWindowEditContent',
        'UD.view.themes.ThemesTabPanel',
        'UD.view.base.Checkbox',
        'UD.view.base.TextArea',
        'UD.view.base.Form',
        'UD.store.Themes',
        'UD.view.base.Panel',
        'UD.view.base.FieldFile'
    ],
    controller: 'themes',
    initComponent: function(){
        this.buttonTitle = [{
            text: 'Добавить шаблон',
            handler: this.getController().showWindowCreateTheme
        }];
        this.items = [{
            xtype: 'view-themes-grid',
            userInfo: this.userInfo,
            region: 'center'
        },{
            xtype: 'view-themes-tab-panel',
            region:'west',
            collapsible: true,
            tabBarTitle: 'Редактирование',
            collapsed: true,
            split: true,
            title: 'Редактирование',
            layout: 'border',
            width: '40%',
            items: [{
                xtype: 'panel',
                title: 'Параметры',
                itemId: 'themesAttributes',
                region: 'center',
                layout: 'fit',
                items: [{
                    xtype: 'panel',
                    activeTab: true,
                    html: UD.app.getH3()
                }]
            },{
                xtype: 'panel',
                title: 'Содержание',
                itemId: 'themesFolder',
                region: 'center',
                layout: 'fit',
                items: [{
                    xtype: 'panel',
                    activeTab: true,
                    html: UD.app.getH3()
                }]
            }]
        }];
        this.callParent(arguments);
    }
});
