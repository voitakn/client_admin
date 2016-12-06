Ext.define('UD.view.themes.ThemesWindowCreate', {
    extend: 'UD.view.base.Window',
    alias: 'widget.view-themes-window-create',
    title: 'Создание шаблона',
    id: 'view-themes-window-create-id',
    layout: 'anchor',
    width: 450,
    height: 280,
    requires: [
        'UD.view.themes.ThemesController',
        'UD.view.themes.ThemesForm'
    ],
    controller: 'themes',
    initComponent: function(){
        this.items = [{
            xtype: 'base-form',
            anchor: '100% 100%',
            layout: 'anchor',
            defaultType: 'base-field-text',
            bodyPadding: 10,
            items: [{
                xtype: 'base-field-file',
                name: 'upload',
                buttonOnly: true,
                width: 385,
                fieldLabel: 'Шаблон',
                buttonText: 'Добавить файл'
            },{
                fieldLabel: 'Название',
                allowBlank: false,
                name: 'theme_name'
            },{
                fieldLabel: 'Тип темы',
                allowBlank: false,
                name: 'theme_type',
                value: 'book'
            },{
                xtype: 'base-checkbox',
                fieldLabel: 'Общая',
                name: 'public',
                value: true
            }],
            buttons: [{
                xtype: 'base-button',
                viewType: 'success',
                formBind: true,
                disabled: true,
                text: 'Сохранить',
                handler: 'onCreateTheme'
            },{
                xtype: 'base-button',
                viewType: 'warning',
                text: 'Сбросить',
                handler: 'onResetWin'
            },{
                xtype: 'base-button',
                text: 'Отмена',
                handler: 'onCloseWin'
            }]
        }];
        this.callParent(arguments);
    }
});