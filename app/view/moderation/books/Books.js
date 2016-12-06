Ext.define('ADM.view.moderation.books.Books', {
    extend: 'Base.panel.ModuleContainer',
    alias: 'widget.view-moderbook',
    headerTitle: 'Модерация контента',
    requires: [
        'ADM.view.moderation.books.BooksFilter',
        'ADM.view.moderation.books.BooksController',
        'ADM.view.moderation.books.BooksModel',
        'ADM.view.moderation.books.BooksGrid'
    ],
    controller: 'moderbook',
    header: false,
    region: 'center',
    layout: 'border',
    viewModel: {
        type: 'moderbook'
    },
    initComponent: function() {
        this.items = [{
            xtype: 'view-moderbook-grid'
        },{
            xtype: 'view-moderbook-form',
            collapsible: true,
            collapsed: true,
            title: 'Фильтр'
        }];
        this.callParent(arguments);
    }
});
