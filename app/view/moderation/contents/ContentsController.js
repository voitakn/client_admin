Ext.define('ADM.view.moderation.contents.ContentsController', {
    extend: 'Base.app.ModuleController',
    alias: 'controller.modercontent',

    rendererLongValue: function(value, metaData) {
        metaData['tdAttr'] = 'data-qtip="' + value + '"';
        return value;
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

    getViewModel: function() {
        var viewParent = Ext.ComponentQuery.query('view-modercontent')[0];
        return viewParent.getViewModel();
    },

    rendererStatus: function (value) {
        var store = this.staticData;
        var recordStaticData = store.query('name', 'complaint').getAt(0);
        var data = recordStaticData.get('static_data');
        return data['statuses'][value];
    },

    onFormReset: function(cmp) {
        var form = cmp.up('view-modercontent-form');
        var viewModel = form.getViewModel();
        var model = viewModel.get('rec');
        model.reject();
    },

    onSelectedRec: function(selection, records) {
        var form = this.lookupReference('typeModerContentForm');
        var panel = this.lookupReference('typeModerPanel');
        if (!form) {
            panel.removeAll();
            form = panel.add({
                xtype: 'view-modercontent-form',
                anchor: '100% 100%'
            });
        }
        var viewModel = form.up('view-modercontent').getViewModel();
        var beforeModel = viewModel.get('rec');
        if (beforeModel) {
            beforeModel.reject();
        }
        panel.expand();
        viewModel.set('rec', records);
        viewModel.set('record', records);
        this.onViewComplaint(records);
    },

    onViewComplaint: function(record) {
        var store = this.storeComments;
        var commentId = record.get('comment_id');
        store.sort({
            property : 'create_time',
            direction: 'DESC'
        });
        store.load({
            params: {
                content_type: record.get('content_type'),
                obj_id: record.get('obj_id'),
                obj_type: record.get('obj_type')
            },
            callback: function() {
                store.filterBy(function(record) {
                    var status = record.get('status');
                    var id = record.get('id');
                    return status <= 1
                });
                var record = store.query('id', commentId).getAt(0);
                if (record) {
                    record.set('flag_use', true);
                    record.commit();
                }
            }
        });
    },

    rendererObjType: function (value) {
        var store = this.staticData;
        var recordStaticData = store.query('name', 'complaint').getAt(0);
        var data = recordStaticData.get('static_data');
        return data['objects'][value];
    },

    onWindowShow: function(grid, rowIndex, cellIndex, column) {
        var store = grid.getStore();
        var record = store.getAt(rowIndex);
        this.windowShow(record, column);
    },

    windowShow: function(record, option) {
        var viewModel = this.getViewModel();
        viewModel.set('rec', record);
        Ext.create('ADM.view.moderation.contents.ContentsWindow', {
            textButton: option['textWindowBtn'],
            handlerButton: option['handlerWindowBtn']
        }).show();
    },

    onCloseWindow: function(cmp) {
        var window = cmp.up('view-modercontent-window');
        window.close();
    },

    onModerate: function(cmp, status) {
        var viewModel = this.getViewModel();
        var textArea = cmp.up('form').down('textarea');
        var window = cmp.up('view-modercontent-window');
        var record = viewModel.get('rec');
        var store = record.store;
        record.set('status', status);
        record.set('reason', textArea.getValue());
        store.sync({
            scope: this,
            success: function() {
                record.commit();
                store.load({
                    scope: this,
                    callback: function() {
                        if (status == 1) {
                            this.store.load();
                            return;
                        }
                        this.hiddenPreviewComment();
                        if (store.getStoreId() == 'storeComments') {
                            var comment = viewModel.get('recordCom');
                            store.add(comment);
                        }
                    }
                });
                window.close();
            },
            failure: function() {
                record.reject();
            }
        });
    },

    hiddenPreviewComment: function() {
        var viewParent = Ext.ComponentQuery.query('view-modercontent')[0];
        var grid = viewParent.down('view-modercontent-grid');
        var record = grid.getStore().getAt(0);
        grid.getSelectionModel().select(record);
    },

    onBlockedContent: function(cmp) {
        this.onModerate(cmp, 3);
    },

    onUnlockContent: function(cmp) {
        this.onModerate(cmp, 1);
    },

    onClickView: function(dataview, record, item, index, event) {
        var block = event.getTarget('a.action_block');
        var publication = event.getTarget('a.action_pub');
        var href = event.getTarget('a.edit_user');
        if (href) {
            this.onEditUser(record);
            return;
        }
        if (publication) {
            this.windowShow(record, {
                handlerWindowBtn: 'onUnlockContent',
                textWindowBtn: 'Опубликовать контент'
            });
            return;
        }
        if (block) {
            this.windowShow(record, {
                handlerWindowBtn: 'onBlockedContent',
                textWindowBtn: 'Заблокировать контент'
            });
        }
    },

    onEditUser: function(record) {
        this.redirectTo('moderation/users?user=' + record.get('uid'));
    },

    rendererLogin: function(value, metaData) {
        if (metaData) {
            metaData['tdAttr'] = 'data-qtip="Редактирование пользователя ' + value + '"';
        }
        return '<a class="moderbook-preview-action" href="" onclick="return false" style="cursor: pointer">' + value + '</a>';
    },

    onClickedEditUser: function(grid, node, rowIndex, collIndex, event) {
        var target = event.getTarget('a.moderbook-preview-action');
        if (!target) {
            return;
        }
        var record = grid.getStore().getAt(rowIndex);
        this.redirectTo('moderation/users?user=' + record.get('uid'));
    },

    init: function() {
        this.staticData = Ext.data.StoreManager.lookup('staticData');
        this.store = this.getViewModel().getStore('moderContents');
        this.storeComments = this.getViewModel().getStore('comments');
    }

});
