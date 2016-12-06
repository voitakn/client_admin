Ext.define('Base.form.field.FilterCombobox', {
    extend: 'Ext.form.field.ComboBox',
    xtype: 'filtercombobox',
    triggers: {
        clear: {
            cls: Ext.baseCSSPrefix + 'form-clear-trigger',
            hidden: true,
            handler: 'onFilterComboClear'
        }
    },
    listeners: {
        change: 'onFilterComboChange'
    }
});