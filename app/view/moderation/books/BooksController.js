Ext.define('ADM.view.moderation.books.BooksController', {
    extend: 'Base.app.ModuleController',
    alias: 'controller.moderbook',

    init: function() {
        this.staticData = Ext.data.StoreManager.lookup('staticData');
    },

    rendererNameBook: function(value, metaData, record) {
        var epub = record.get('last_epub_id') || record.get('last_public_epub_id');
        if (metaData) {
            metaData['tdAttr'] = 'data-qtip="' + value + '"';
        }
        if (!epub) {
            return value;
        }
        var configs = this.getViewModel().get('configs');
        var readerUrl = configs.findRecord('name', 'reader_url');
        var sessionHash = Ext.util.Cookies.get('session_hash');
        var urlRider = readerUrl.get('value');
        var bookUid = record.get('book_uid');
        var href = Ext.String.format('{0}/?epub_id={1}&book_uid={2}&session_hash={3}', urlRider, epub, bookUid,sessionHash);

        return '<a target="_blank" href="' + href + '">' + value + '</a>';
    },

    renderPublicStatus: function(value) {
        var store = this.staticData;
        var recordStaticData = store.query('name', 'book').getAt(0);
        var data = recordStaticData.get('static_data');
        return data['book_status'][value];
    },

    rendererLongValue: function(value, metaData) {
        metaData['tdAttr'] = 'data-qtip="' + value + '"';
        return value;
    },

    rendererPreview: function(value, metaData) {
        metaData['tdAttr'] = 'data-qtip="' + value + '"';
        return '<a class="moderbook-preview-action" style="cursor: pointer">' + value + '</a>';
    },

    onClickedPreview: function(grid, node, rowIndex, collIndex, event) {
        var target = event.getTarget('a.moderbook-preview-action');
        if (!target) {
            return;
        }
        var record = grid.getStore().getAt(rowIndex);
        var window = Ext.create('ADM.view.moderation.books.BooksWindowPreview');
        var viewModel = window.getViewModel();
        viewModel.set('preview', record.get('preview'));
        viewModel.set('record', record);
    },

    onCloseWindow: function(cmp) {
        var window = cmp.up('form').up();
        window.close();
    },

    onShowWindowModerator: function(grid, rowIndex, cellIndex, column) {
        var store = grid.getStore();
        var record = store.getAt(rowIndex);
        var window = Ext.create('ADM.view.moderation.books.BooksWindow', {
            textButton: column['textWindowBtn'],
            handlerButton: column['handlerWindowBtn']
        });
        var form = window.down('form').getForm();
        form.loadRecord(record);
    },

    onViewVersion: function(grid, rowIndex) {
        var store = grid.getStore();
        var record = store.getAt(rowIndex);
        var epub = record.get('last_public_epub_id');
        var configs = this.getViewModel().get('configs');
        var readerUrl = configs.findRecord('name', 'reader_url');
        var sessionHash = Ext.util.Cookies.get('session_hash');
        var bookUid = record.get('book_uid');
        var href = Ext.String.format('{0}/?epub_id={1}&book_uid={2}&session_hash={3}', readerUrl.get('value'), epub, bookUid, sessionHash);
        window.open(href);
    },

    onBlockedBook: function(cmp) {
        this.onModerationBook(cmp, 3);
    },

    onUnlockBook: function(cmp) {
        this.onModerationBook(cmp, 1);
    },

    onModerationBook: function(cmp, status) {
        var self = this;
        var form = cmp.up('form').getForm();
        var window = cmp.up('view-moderbook-window');
        var values = form.getValues();
        var record = form.getRecord();
        Ext.Ajax.request({
            url: '/node/admin/complains/content/update',
            method: 'POST',
            params: {
                obj_id: record.get('last_public_epub_id'),
                obj_type: 1,
                status: status,
                reason: values['comment'],
                complain_id: null
            },
            success: function() {
                record.store.load();
                window.close();
                var massage = 'Уважаемый пользователь ваша книга "{0}" была {3} модератором {1}.<br><b>Причина</b>: {2}';
                var textStatus = 'заблокированна';
                if (status == 1) {
                    textStatus = 'разаблокированна'
                }
                var profile = Ext.ComponentQuery.query('view-moderbook')[0].getViewModel().get('profile');
                massage = Ext.String.format(massage, record.get('name'), profile.get('login'), values['comment'], textStatus);
                self.sendMail(record.get('login'), massage, 'Блокировка контента');
            },
            failureCb: function() {
                record.reject();
            }
        });
    },

    onPublicBook: function(grid, rowIndex) {
        var self = this;
        var store = grid.getStore();
        var record = store.getAt(rowIndex);
        //record.set('approved', 1);
        //record.set('public_access', 1);
        //record.set('epub_id', record.get('last_epub_id'));
        //record.set('last_public_epub_reason', '');
        Ext.Ajax.request({
            scope: this,
            method: 'POST',
            url: '/node/admin/books/' + Number(record.get('book_uid')) + '/approve',
            success: function(response){
                var responseText = Ext.JSON.decode(response.responseText);
                //record.set('publication_date', responseText['data']['date']);
                //record.commit();
                var profile = self.getViewModel().get('profile');
                store.load();
                Ext.Msg.alert('Публикация', 'Публикация книги "' + record.get('name') + '" прошла успешно');
                var massage = 'Уважаемый пользователь ваша книга {0} была опубликована модератором {1}.';
                massage = Ext.String.format(massage, record.get('name'), profile.get('login'));
                self.sendMail(record.get('login'), massage, 'Публикация книги');
            },
            failureCb: function() {
                //record.reject();
            }
        });
    },

    onFilterSearch: function(cmp) {
        var form = cmp.up('view-moderbook-form').getForm();
        var values = form.getValues();
        var grid = Ext.ComponentQuery.query('view-moderbook-grid')[0];
        var store = grid.getStore();
        var filters = store.getFilters();
        filters.add([{
            property: 'login',
            value: values['login']
        },{
            property: 'book_name',
            value: values['book_name']
        },{
            property: 'author',
            value: values['author']
        },{
            property: 'best',
            value: values['atr']? values['best']: null
        },{
            property: 'recommended',
            value: values['atr']? values['recommended']: null
        },{
            property: 'approved',
            value: values['approved']
        },{
            property: 'book_uid',
            value: values['book_uid']
        }]);
    },

    sendMail: function(mail, massage, title) {
        Ext.Ajax.request({
            url         : '/node/admin/mails/send',
            method      : 'POST',
            jsonData    : {
                'to_mail'      : mail,
                'text'         : massage,
                'subject'      : title
            }
        });
    },

    onFilterReset: function(cmp) {
        var form = cmp.up('form').getForm();
        form.reset();
    },

    onBlockedPreview: function(cmp) {
        var record = this.getViewModel().get('record');
        cmp.up('view-moderbook-window-preview').close();
        var window = Ext.create('ADM.view.moderation.books.BooksWindow', {
            textButton: 'Заблокировать',
            handlerButton: 'onBlockedBook'
        });
        var form = window.down('form').getForm();
        form.loadRecord(record);
    }
});
