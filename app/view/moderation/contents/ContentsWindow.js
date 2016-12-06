Ext.define('ADM.view.moderation.contents.ContentsWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.view-modercontent-window',
    title: 'Введите комментарий',
    layout: 'anchor',
    width: 600,
    height: 450,
    modal: true,
    controller: 'modercontent',
    initComponent: function() {
        this.items = [{
            xtype: 'form',
            anchor: '100% 100%',
            viewModel: {
                type: 'modercontent'
            },
            formBind: true,
            items: [{
                xtype: 'textarea',
                labelAlign: 'top',
                margin: '5',
                allowBlank: false,
                anchor: '100% 100%',
                fieldLabel: 'Причина',
                bind: '{rec.reason}',
                name: 'reason'
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
