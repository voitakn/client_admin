Ext.define('UD.view.themes.ThemesWindowEditContent', {
    extend: 'UD.view.base.Window',
    alias: 'widget.view-themes-window-edit',
    title: 'Редактирование шаблона',
    id: 'view-themes-window-edit-content-id',
    layout: 'anchor',
    maximizable: true,
    width: 700,
    height: 520,
    requires: [
        'UD.view.themes.ThemesController',
        'UD.view.themes.ThemesForm'
    ],
    controller: 'themes',
    initComponent: function(){
        var contentTheme = this.contentTheme;
        tbar = [{
            xtype:'splitbutton', text: 'Cut', iconCls: 'add16', menu: [{text: 'Cut Menu Item'}]
        }];
        this.items = [{
            xtype: 'panel',
            anchor: '100% 100%',
            layout: 'anchor',
            items: [{
                xtype: 'base-form',
                anchor: '100% 100%',
                layout: 'anchor',
                items: [{
                    xtype: 'base-form',
                    items: [{
                        xtype: 'base-field-file',
                        name: 'upload',
                        labelAlign: 'right',
                        labelWidth: 140,
                        buttonOnly: true,
                        listeners: {
                            change: {
                                fn: 'onGetContentXml'
                            }
                        },
                        margin: 5,
                        buttonText: 'Загрузить из файла'
                    }]
                },{
                    xtype: 'base-field-text-area',
                    anchor: '100% 93%',
                    id: 'view-themes-window-edit-field-content-id',
                    value: contentTheme,
                    name: 'content'
                }],
                buttons: [{
                    xtype: 'base-button',
                    viewType: 'success',
                    text: 'Сохранить',
                    formBind: true,
                    disabled: true,
                    handler: 'onThemeContentSave'
                },{
                    xtype: 'base-button',
                    viewType: 'warning',
                    text: 'Сбросить',
                    handler: 'onResetWinEdit'
                },{
                    xtype: 'base-button',
                    text: 'Отмена',
                    handler: 'onCloseWinEdit'
                }]
            }]
        }];
        this.callParent(arguments);
    }
});