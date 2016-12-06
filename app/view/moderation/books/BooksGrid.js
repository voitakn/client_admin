Ext.define('ADM.view.moderation.books.BooksGrid', {
    extend: 'Base.grid.ModuleList',
    alias: 'widget.view-moderbook-grid',
    reference: 'typeModerbookGrid',
    bind: {
        store: '{moderBooks}'
    },
    initComponent: function() {
        this.columns = [{
            xtype:'actioncolumn',
            menuDisabled: true,
            text: 'Действие',
            align: 'center',
            width: 110,
            items: [{
                tooltip: 'Опубликовать',
                icon: 'resources/icons/book-3-16.png',
                isDisabled: function (view, rowIndex, colIndex, item, record) {
                    var epub = record.get('last_epub_id');
                    return !epub;
                },
                handler: 'onPublicBook'
            },{
                tooltip: 'Заблокировать',
                icon: 'resources/icons/lock-locked.png',
                isDisabled: function (view, rowIndex, colIndex, item, record) {
                    var publicAccess = record.get('public_access');
                    var epub = record.get('last_public_epub_id');
                    return !(publicAccess != 3 && epub);
                },
                textWindowBtn: 'Заблокировать',
                handlerWindowBtn: 'onBlockedBook',
                handler: 'onShowWindowModerator'
            },{
                tooltip: 'Разблокировать',
                icon: 'resources/icons/Unlock-Filled-icon.png',
                isDisabled: function (view, rowIndex, colIndex, item, record) {
                    var publicAccess = record.get('public_access');
                    return publicAccess != 3;
                },
                textWindowBtn: 'Разблокировать',
                handlerWindowBtn: 'onUnlockBook',
                handler: 'onShowWindowModerator'
            },{
                tooltip: 'Просмотр старой версии',
                icon: 'resources/icons/Files-View-File-icon.png',
                isDisabled: function (view, rowIndex, colIndex, item, record) {
                    var epubLast = record.get('last_public_epub_id');
                    var epubNew = record.get('last_epub_id');
                    var approved = record.get('approved');
                    return !(epubLast && epubNew != epubLast && approved != 1);
                },
                handler: 'onViewVersion'
            }]
        },{
            dataIndex: 'book_uid',
            text: 'ID книги',
            menuDisabled: true,
            sortable: false
        },{
            dataIndex: 'name',
            menuDisabled: true,
            renderer: 'renderLinkLastBook',
            text: 'Название',
            width: 160
        },{
            dataIndex: 'author',
            menuDisabled: true,
            text: 'Автор',
            renderer: 'rendererLongValue',
            width: 160
        },{
            dataIndex: 'login',
            text: 'Логин автора',
            renderer: 'rendererLongValue',
            menuDisabled: true,
            width: 160
        },{
            dataIndex: 'preview',
            text: 'Описание',
            width: 150,
            sortable: false,
            menuDisabled: true,
            renderer: 'rendererPreview',
            listeners: {
                click: 'onClickedPreview'
            }
        },{
            dataIndex: 'genres',
            renderer: 'rendererLongValue',
            menuDisabled: true,
            sortable: false,
            text: 'Жанры'
        },{
            dataIndex: 'tags',
            renderer: 'rendererLongValue',
            menuDisabled: true,
            sortable: false,
            text: 'Теги'
        },{
            dataIndex: 'publication_date',
            menuDisabled: true,
            text: 'Дата публикации',
            width: 150
        },{
            dataIndex: 'approved',
            menuDisabled: true,
            text: 'Статус',
            renderer: 'renderPublicStatus',
            width: 130
        },{
            dataIndex: 'last_public_epub_reason',
            renderer: 'rendererLongValue',
            menuDisabled: true,
            width: 180,
            text: 'Причина блокировки',
            sortable: false
        }];
        this.dockedItems = [{
            xtype: 'pagingtoolbar',
            displayInfo: true,
            bind: {
                store: '{moderBooks}'
            },
            dock: 'bottom'
        }];
        this.callParent(arguments);
    }
});