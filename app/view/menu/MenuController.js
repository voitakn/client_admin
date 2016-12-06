Ext.define('ADM.view.menu.MenuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.menu-menu',

    onSelectModule: function(treePanel, records) {
        var record = records[0];
        var childNodes = record.childNodes;
        var parentNode = record.parentNode;
        var href = '';
        if (childNodes.length > 0) {
            return;
        }
        while (!parentNode.isRoot()) {
            href += parentNode.get('module_href') + '/';
            parentNode = parentNode.parentNode;
        }
        href += record.get('module_href');
        this.redirectTo(href);
    }
});
