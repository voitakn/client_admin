Ext.define('ADM.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'Ext.window.MessageBox'
    ],

    alias: 'controller.main',

    logout: function() {
        this.redirectTo('login');
    },

    onHiddenMenu: function(cmp) {
        var menu = cmp.up('app-main').down('menu-menu');
        menu.setHidden(!menu.isHidden());
        cmp.setTooltip(menu.isHidden()? 'Показать меню': 'Скрыть меню');
    }
});
