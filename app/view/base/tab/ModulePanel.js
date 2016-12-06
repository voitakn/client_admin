Ext.define('Base.tab.ModulePanel', {
    extend: 'Ext.tab.Panel',
    xtype: 'basemoduletabpanel',
    region: 'west',
    layout: 'anchor',
    header: false,
    collapsible: true,
    split: true,
    width: 320,
    defaults: {
        anchor: '100% 100%'
    },
});