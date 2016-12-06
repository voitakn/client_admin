Ext.define('UD.view.themes.ThemesForm', {
    extend: 'UD.view.base.Form',
    alias: 'widget.view-themes-form',
    requires: [
        'UD.view.base.ComboBox',
        'UD.view.base.FieldText'
    ],
    layout: 'anchor',
    defaultType: 'base-field-text',
    bodyPadding: 10,
    controller: 'themes',
    initComponent: function(){
        this.items = [{
            fieldLabel: 'Название',
            allowBlank: false,
            name: 'theme_name',
            value: this.model? this.model.get('theme_name'): ''
        },{
            fieldLabel: 'Тип темы',
            allowBlank: false,
            name: 'theme_type',
            value: this.model? this.model.get('theme_type'): 'book'
        },{
            xtype: 'base-checkbox',
            fieldLabel: 'Общая',
            name: 'public',
            value: this.model? this.model.get('is_public'): true
        }];
        this.buttons = [{
            xtype: 'base-button',
            viewType: 'success',
            formBind: true,
            disabled: true,
            text: 'Сохранить',
            handler: 'onUpdateTheme'
        },{
            xtype: 'base-button',
            text: 'Сбросить',
            handler: 'onResetWin'
        }];
        this.callParent(arguments);
    }
});