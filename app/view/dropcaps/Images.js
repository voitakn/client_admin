Ext.define('ADM.view.dropcaps.Images', {
    extend: 'Ext.window.Window',
    alias: 'widget.dropcaps-images',
    title: 'Выберите изображение',
    reference: 'dropcaps_images',
    bodyPadding: 5,
    width: 840,
    height: 640,
    closable: true,
    closeAction: 'hide',
    autoShow: false,
    layout: 'border',
    defaults: {
        split: true
    },
    items: [
        {
            xtype: 'form',
            region: 'north',
            reference: 'uploadForm',
            items: [
                {
                    xtype: 'fileuploadfield',
                    buttonOnly: true,
                    hideLabel: true,
                    name: 'upload',
                    listeners: {
                        change: 'sendFile'
                    }
                }
            ]
        },{
            xtype: 'dataview',
            region: 'center',
            autoRender: true,
            reference: 'photolist',
            scrollable: true,
            bind: {
                store: '{images}'
            },
            tpl: [
                '<tpl for=".">',
                '<div class="thumb-wrap">',
                '<div class="thumb"><img src="{imageLink}"/></div>',
                '</div>',
                '</tpl>',
                '<div class="x-clear" style="clear: both"></div>'
            ],
            itemSelector: 'div.thumb-wrap',
            emptyText: 'Изображения отсутствуют',
            listeners: {
                selectionchange: 'onSelectImage'
            }
        }
    ],
    buttons: [
        '->',{
            xtype: 'button',
            text: 'Отмена',
            handler: 'closeImages'
        }
    ]
});