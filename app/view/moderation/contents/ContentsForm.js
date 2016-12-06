Ext.define('ADM.view.moderation.contents.ContentsForm', {
    extend: 'Base.panel.ModuleForm',
    alias: 'widget.view-modercontent-form',
    layout: 'anchor',
    reference: 'typeModerContentForm',
    formBind: true,
    header: false,
    initComponent: function() {
        this.items = [{
            xtype: 'dataview',
            anchor: '100% 100%',
            bind: {
                store: '{comments}',
                data: '{record}'

            },
            autoScroll: true,
            itemSelector: 'div.thumb-wrap',
            listeners: {
                itemclick: 'onClickView'
            },
            tpl: new Ext.XTemplate(
                '<tpl for=".">',
                    '<div style="padding: 7px; width: initial; color: rgb(85, 85, 85);" class="media-body chat-pop thumb-wrap">',
                        '<h4 class="media-heading">Автор: ',
                            '<a class="edit_user" data-qtip="Редактирование пользователя {login}" ',
                                'style="cursor: pointer;">',
                            '{nickname}</a>',
                        '</h4>',
                        '<div style="text-align: left">Контент: </div>',
                        '<p>{content}</p>',
                '<span style="float: left"><i style="margin-right: 2px" class="fa fa-clock-o"></i>',
                '<span class="timeago">{create_time:this.getDate}</span>',
                '</span>',
                        '<tpl if="status == 1">',
                            '<div style="text-align: right"><a href="" onclick="return false">Заблокировать</a></div>',
                        '</tpl>',
                        '<tpl if="status == 0">',

                            '<div style="text-align: right"><a href="" onclick="return false">Опубликовать</a></div>',
                        '</tpl>',
                    '</div>',
                '</tpl>',
                {
                    getDate: function(date) {
                        return Ext.Date.format(date, 'Y.m.d H:i');
                    }
                }),
            emptyText: 'Не удалось найти контент'
        }];
        this.callParent(arguments);
    }
});
