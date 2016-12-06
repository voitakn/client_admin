Ext.define('ADM.view.moderation.users.UsersController', {
    extend: 'Base.app.ModuleController',
    alias: 'controller.moderation-users',

    init: function () {
        this.staticData = Ext.data.StoreManager.lookup('staticData');
        this.store = this.getViewModel().getStore('users');
    },

    onEditUser: function(cmp) {
        var form = cmp.up('moderation-users-form');
        var viewModel = form.getViewModel();
        var record = viewModel.get('record');
        var store = this.store;
        var changes = record.getChanges();
        if (changes['access'] != undefined) {
            this.changeAccess(record, store);
        }
        if (changes['comment_status'] != undefined) {
            this.changeCommentStatus(record, store);
        }
    },

    rendererComment: function(value) {
        var store = this.staticData;
        var record = store.query('name', 'user').getAt(0);
        var data = record.get('static_data');
        var style = '  display: inline-block; width: 20px; height: 15px; margin-top: -2px; float: right;';
        return '<div style="border: 1px solid #cecece; cursor: pointer;padding: 2px;background-color: white !important;">' + data['comment_status'][value] + '<span style="background: url(/ext/packages/ext-theme-crisp/build/resources/images/form/trigger.png) no-repeat; ' + style + '"></span></div>';
    },

    rendererAccess: function(value) {
        var store = this.staticData;
        var record = store.query('name', 'user').getAt(0);
        var data = record.get('static_data');
        var style = '  display: inline-block; width: 20px; height: 15px; margin-top: -2px; float: right;';
        return '<div style="border: 1px solid #cecece; cursor: pointer;padding: 2px;background-color: white !important;">' + data['access'][value] + '<span style="background: url(/ext/packages/ext-theme-crisp/build/resources/images/form/trigger.png) no-repeat; ' + style + '"></span></div>';
    },

    onSelectedUser: function(grid) {
        var uid =  Ext.util.History.getHash().split('/')[2];
        if (!uid) {
            return;
        }
        var selectionModel = grid.getSelectionModel();
        var view = grid.getView();
        var store = grid.getStore();
        var record = store.query('uid', uid).getAt(0);
        if (!record) {
            return;
        }
        selectionModel.select(record);
        var runner = new Ext.util.TaskRunner();
        var task = runner.start({
            run: function() {
                view.focusRow(record);
                runner.stop(task);
            },
            interval: 1000
        });
    },

    onFormReset: function(cmp) {
        var form = cmp.up('moderation-users-form');
        var viewModel = form.getViewModel();
        var model = viewModel.get('record');
        model.reject()
    },

    onSelectedRec: function(selection, records) {
        var form = Ext.ComponentQuery.query('moderation-users-form')[0];
        var panel = Ext.ComponentQuery.query('tabpanel')[0];
        var view = this.getViewModel();
        panel.expand();
        var viewModel = form.getViewModel();
        var beforeModel = viewModel.get('record');
        if (beforeModel && beforeModel.isModel) {
            beforeModel.reject();
        }
        viewModel.set('record', records);
        view.set('record', records);
        form.getForm().loadRecord(records);
    },

    changeCommentStatus: function(record) {
        var controler = this;
        Ext.Ajax.request({
            scope: this,
            method: 'POST',
            url: '/node/admin/complains/update-comment-status',
            params: {
                user_uid: record.get('uid'),
                status: record.get('comment_status')
            },
            success: function(){
                record.commit();
            },
            failureCb: function(response, option, errorText) {
                if (errorText) {
                    var win = Ext.create('Ext.window.Window',{
                        title: 'Ошибка',
                        modal: true,
                        width: 400,
                        height: 200,
                        resizable: false,
                        layout: 'anchor',
                        items: {
                            anchor: '100% 100%',
                            layout: 'anchor',
                            xtype: 'form',
                            items: {
                                xtype: 'container',
                                padding: 6,
                                anchor: '100% 100%'
                            },
                            buttons: [{
                                xtype: 'button',
                                text: 'Просмотр контента',
                                handler: function(){
                                    win.close();
                                    controler.redirectTo('moderation/contents')}
                            },{
                                xtype: 'button',
                                text: 'Отмена',
                                handler: function() {
                                    win.close();
                                }
                            }]
                        }
                    });
                    switch (errorText) {
                        case 'RC_PREM_CONTENT':
                            errorText = Ext.String.format('Нельзя перевести пользователя на постмодерацию пока есть не проверенный контент', record.get('login'));
                            break;

                    }

                    win.down('form').down('container').update(errorText);
                    win.show();
                }

                record.reject();
                return true
            }
        });
    },

    changeAccess: function(record, store) {
        store.sync({
            success: function() {
                record.commit();
            },
            failure: function() {
                record.reject();
            }
        });
    },

    rendererCommentStatus: function (value) {
        var store = this.staticData;
        var recordStaticData = store.query('name', 'user').getAt(0);
        var data = recordStaticData.get('static_data');
        var valueCell = '<span style="color: darkseagreen; ">' + data['comment_status'][value] + '</span>';
        if (value == 0) {
            valueCell = '<span style="color: indianred; ">' + data['comment_status'][value] + '</span>';
        }
        return valueCell;
    },

    onSelectModer: function(grid, option) {
        var record = option.record;
        if (option.field == 'access') {
            this.changeAccess(record, this.store);
        }
        else {
            this.changeCommentStatus(record);
        }

    },

    onBeforeSelect: function() {
    },

    rendererLogin: function(value, metaData) {
        return '<a class="moderuser-event" style="cursor: pointer">' + value + '</a>';
    },

    renderObjType: function(value, column, record) {
        var configs = this.getViewModel().get('configs');
        var sessionHash = Ext.util.Cookies.get('session_hash');
        var href = '';
        switch (record.get('obj_type')) {
            case 1:
                href = configs.findRecord('name', 'reader_url').get('value') + '/?epub_id=' + record.get('obj_type') + '&book_uid=' + detail.book_uid +
                '&session_hash=' + sessionHash;
                break;
            case 2:
                href = configs.findRecord('name', 'portal').get('value') + '/infoblock/news/#' + record.get('obj_id');
                break;
            case 3:
                href = configs.findRecord('name', 'portal').get('value') + '/shop/book/?uid=' + detail + '#note=' + record.get('obj_id');
                break;
            case 4:
                href = configs.findRecord('name', 'portal').get('value') + '/shop/book/?uid=' + detail + '#note=' + record.get('obj_id');
                break;
            case 6:
                href = configs.findRecord('name', 'portal').get('value') + '/infoblock/news/#' + record.get('obj_id');
                break;
            case 7:
                href = configs.findRecord('name', 'portal').get('value') + '/user/profile/' + record.get('obj_id');
                break;
            case 8:
                href = configs.findRecord('reader_url', 'portal').get('value') + '/?epub_id=' + detail.epub_id + '&book_uid=' + detail.book_uid +
                '&session_hash=' + sessionHash + '&item=' + detail.paragraph_id;
                break;
        }
        var store = this.staticData;
        var recordStaticData = store.query('name', 'complaint').getAt(0);
        var data = recordStaticData.get('static_data');
        return '<a target="_blank" href="' + href + '">' + data['objects'][value] + '</a>'
    }

});