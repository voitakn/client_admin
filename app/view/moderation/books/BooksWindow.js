Ext.define('ADM.view.moderation.books.BooksWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.view-moderbook-window',
    title: 'Введите комментарий',
    layout: 'anchor',
    autoShow: true,
    width: 600,
    height: 450,
    modal: true,
    controller: 'moderbook',
    initComponent: function() {
        this.items = [{
            xtype: 'form',
            anchor: '100% 100%',
            items: [{
                xtype: 'textfield',
                labelAlign: 'top',
                margin: '5',
                allowBlank: false,
                anchor: '100% 100%',
                fieldLabel: 'Причина',
                name: 'comment'
            }],
            buttons: [{
                xtype: 'button',
                viewType: 'success',
                formBind: true,
                disabled: true,
                text: this.textButton,
                handler: this.handlerButton
            },{
                xtype: 'button',
                text: 'Отмена',
                handler: 'onCloseWindow'
            }]
        }];
        this.callParent(arguments);
    }
});