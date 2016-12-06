Ext.define('ADM.view.main.Main', {
    extend: 'Ext.panel.Panel',
    plugins: 'viewport',
    requires: [
        'ADM.view.main.MainController',
        'ADM.view.main.MainModel',
        'ADM.view.menu.Menu'
    ],

    xtype: 'app-main',
    
    controller: 'main',
    viewModel: {
        type: 'main'
    },

    layout: {
        type: 'border'
    },
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        ui: 'footer',
        items: [{
            text: '',
            tooltip: 'Скрыть меню',
            handler: 'onHiddenMenu'
        },'->',{
            bind: {
                text: '{profile.login}'
            },
            menu: [{
                text: 'Выход',
                handler: 'logout'
            }]
        }]
    }],
    items: [{
        xtype: 'menu-menu',
        region: 'west',
        split: {
            width: 3
        },
        width: 260
    },{
        xtype: 'panel',
        region: 'center',
        reference: 'container',
        header: false,
        layout: 'fit',
        flex: 1
    }]
});
