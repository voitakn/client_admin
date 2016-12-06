Ext.define('ADM.view.menu.Menu', {
    extend: 'Ext.tree.Panel',
    xtype: 'menu-menu',
    requires: [
        'ADM.view.menu.MenuController',
        'ADM.view.menu.MenuModel'
    ],
    controller: "menu-menu",
    viewModel: {
        type: "menu-menu"
    },
    displayField: 'name',
    lines: false,
    rootVisible: false,
    singleExpand: true,
    store: Ext.data.StoreManager.lookup('module') || Ext.create('ADM.store.Modules'),

    listeners: {
        selectionchange: 'onSelectModule'
    }
});
