Ext.define('ADM.view.moderation.books.BooksWindowPreview', {
    extend: 'Ext.window.Window',
    alias: 'widget.view-moderbook-window-preview',
    title: 'Просмотр описание',
    layout: 'anchor',
    autoShow: true,
    width: 600,
    height: 450,
    viewModel: {
        type: 'moderbook'
    },
    modal: true,
    maximizable: true,
    controller: 'moderbook',
    initComponent: function() {
        this.items = [{
            xtype: 'form',
            anchor: '100% 100%',
            items: [{
                xtype: 'textarea',
                labelAlign: 'top',
                margin: '5',
                readOnly: true,
                anchor: '100% 100%',
                bind: '{preview}',
                name: 'preview'
            }],
            buttons: [{
                xtype: 'button',
                text: 'Заблокировать',
                bind: {
                    hidden: '{buttonHidden}'
                },
                viewType: 'warning',
                handler: 'onBlockedPreview'
            },{
                xtype: 'button',
                text: 'Отмена',
                handler: 'onCloseWindow'
            }]
        }];
        this.callParent(arguments);
    }
});