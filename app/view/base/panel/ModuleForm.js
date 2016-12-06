Ext.define('Base.panel.ModuleForm', {
    extend: 'Ext.form.Panel',
    xtype: 'basemoduleform',
    region: 'west',
    collapsible: true,
    split: true,
    width: 320,
    bodyPadding: '0 5',
    reference: 'form',
    title: 'Редактирование',
    defaults: {
        labelAlign: 'top',
        allowBlank: false
    },
    layout: {
        type: 'vbox',
        align: 'stretch'
    }
});
