Ext.define('Base.window.ModuleWindow', {
    extend: 'Ext.window.Window',
    xtype: 'basemodulewindow',
    reference: 'window',
    width: 600,
    height: 430,
    closeAction: 'hide',
    modal: true,
    bodyPadding: '5',
    layout: {
        type: 'vbox',
        align: 'stretch'
    }
});