Ext.define('ADM.view.moderation.complaints.ComplaintsController', {
    extend: 'Base.app.ModuleController',
    alias: 'controller.complaints',

    init: function() {
        this.staticData = Ext.data.StoreManager.lookup('staticData');
    },

    renderAuthorContent: function(value, metaData, record) {
        var columnValue = record.get('obj_login') + ' [' + record.get('obj_nickname') + ']';
        metaData['tdAttr'] = 'data-qtip="' + columnValue + '"';
        return columnValue;
    },
    renderAuthorComplaint: function(value, metaData, record) {
        var columnValue = record.get('login') + ' [' + record.get('nickname') + ']';
        metaData['tdAttr'] = 'data-qtip="' + columnValue + '"';
        return columnValue;
    },

    renderComplaintReason: function(value) {
        return '<span style="white-space: pre-wrap">' + value + '</span>';
    },

    renderComplainStatus: function(value) {
        var store = this.staticData;
        var record = store.query('name', 'complaint').getAt(0);
        var data = record.get('static_data');
        return data['statuses'][value]
    },

    renderComplainLevel: function(value) {
        var store = this.staticData;
        var record = store.query('name', 'complaint').getAt(0);
        var data = record.get('static_data');
        return data['levels'][value];
    },

    onCloseWindow: function(cmp) {
        var window = cmp.up('view-complaints-window');
        window.close();
    },

    onShowWindowReason: function(grid, rowIndex, cellIndex, column) {
        var textButton = 'Отклонить жалобу';
        var handlerButton = 'onComplaintCancel';
        var store = grid.getStore();
        var record = store.getAt(rowIndex);
        if (column['complaintAccept']) {
            textButton = 'Принять жалобу';
            handlerButton = 'onComplaintAccept';
        }
        var window = Ext.create('ADM.view.moderation.complaints.ComplaintsWindow', {
            textButton: textButton,
            handlerButton: handlerButton
        });
        var viewModel = window.down('form').getViewModel();
        viewModel.set('record', record);
    },

    renderObjType: function(value, column, record) {
        var configs = this.getViewModel().get('configs');
        var readerUrl = configs.findRecord('name', 'reader_url');
        var portalUrl = configs.findRecord('name', 'portal');
        var detail = Ext.JSON.decode(record.get('complain_detail'));
        var sessionHash = Ext.util.Cookies.get('session_hash');
        var href = '';
        switch (record.get('obj_type')) {
            case 1:
                href = readerUrl.get('value') + '/?epub_id=' + record.get('obj_type') + '&book_uid=' + detail.book_uid +
                    '&session_hash=' + sessionHash;
                break;
            case 2:
                href = portalUrl.get('value') + '/infoblock/news/#' + record.get('obj_id');
                break;
            case 3:
                href = portalUrl.get('value') + '/shop/book/?uid=' + detail + '#preview=' + record.get('obj_id');
                break;
            case 4:
                href = portalUrl.get('value') + '/shop/book/?uid=' + detail + '#comment=' + record.get('obj_id');
                break;
            case 6:
                href = portalUrl.get('value') + '/infoblock/news/#' + record.get('obj_id');
                break;
            case 7:
                href = portalUrl.get('value') + '/user/profile/' + record.get('obj_id');
                break;
            case 8:
                href = readerUrl.get('value') + '/?epub_id=' + detail.epub_id + '&book_uid=' + detail.book_uid +
                '&session_hash=' + sessionHash + '&item=' + detail.paragraph_id;
                break;
        }
        var store = this.staticData;
        var recordStaticData = store.query('name', 'complaint').getAt(0);
        var data = recordStaticData.get('static_data');
        return '<a target="_blank" href="' + href + '">' + data['objects'][value] + '</a>'
    },

    onComplaintAccept: function(cmp) {
        var window =  cmp.up('view-complaints-window');
        var viewModel = cmp.up('form').getViewModel();
        var record = viewModel.get('record');
        var store = record.store;
        var self = this;
        record.set('status', 3);
        store.sync({
            success: function() {
                self.blockedContent(record, window, 3);
                store.load();
            }
        });
    },

    onComplaintCancel: function(cmp) {
        var window =  cmp.up('view-complaints-window');
        var viewModel = cmp.up('form').getViewModel();
        var record = viewModel.get('record');
        var store = record.store;
        var self = this;
        record.set('status', 4);
        store.sync({
            success: function() {
                self.blockedContent(record, window, 1);
                store.load();
            }
        });
    },

    //TODO нужно сделать блокеровку через store, а пока сделал через AJAX.
    blockedContent: function(record, window, status) {
        var detail = Ext.JSON.decode(record.get('complain_detail'));
        Ext.Ajax.request({
            url: '/node/admin/complains/content/update',
            method: 'POST',
            params: {
                obj_id: record.get('obj_type') == 8? detail['epub_id']: record.get('obj_id'),
                obj_type: record.get('obj_type') == 8? 1: record.get('obj_type'),
                status: status,
                reason: record.get('comment'),
                complain_id: record.get('complain_id')
            },
            callback: function() {
                record.set('comment', '');
                record.commit();
            },
            success: function() {
                var author = record.get('content_login');
                window.close();
                if (!author) {
                    return;
                }
                record.store.load();
                author = author.split(',');
                Ext.Ajax.request({
                    url         : '/node/admin/mails/send',
                    method      : 'POST',
                    jsonData    : {
                        'to_mail'      : author[0],
                        'text'         : 'Контент заблокирован. Причина: ' + record.get('comment'),
                        'subject'      : 'Блокировка контента'
                    }
                });

            }
        });
    },

    onFilterSearch: function(cmp) {
        var form = cmp.up('view-complaints-form').getForm();
        var values = form.getValues();
        var grid = Ext.ComponentQuery.query('view-complaints-grid')[0];
        var store = grid.getStore();
        var filters = store.getFilters();
        filters.add([{
            property: 'complainLevel',
            value: values['complainLevel']
        },{
            property: 'status',
            value: values['status']
        },{
            property: 'contentOwnerUid',
            value: values['ownerUid']
        }]);
    },

    onFilterReset: function(cmp) {
        var form = cmp.up('form').getForm();
        form.reset();
    }
});
