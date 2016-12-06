Ext.define('UD.view.themes.ThemesController', {
    extend: 'UD.view.base.ViewController',
    alias: 'controller.themes',
    config: {
        control: {
            'view-themes-grid': {
                cellclick: 'eventCellClick'
            }
        }
    },
    init: function() {
        this.checkSession();
        this.storeTheme = Ext.data.StoreManager.lookup('storeThemes') || Ext.create('UD.store.Themes');
    },



    onCloseWin: function(cmp) {
        cmp.up('view-themes-window-create').close();
    },

    onResetWin: function(cmp) {
        var form = cmp.up('base-form').getForm();
        form.reset();
    },


    onCloseWinEdit: function(cmp) {
        cmp.up('view-themes-window-edit').close();
    },

    onResetWinEdit: function(cmp) {
        var form = cmp.up('base-form').getForm();
        form.reset();
    },

    eventCellClick: function(grid, rowView, rowIndex, model) {
        var tabPanel = grid.up('view-themes').down('view-themes-tab-panel');
        var tabFolder = tabPanel.down('panel[itemId="themesFolder"]');
        var tabAtr = tabPanel.down('panel[itemId="themesAttributes"]');
        tabPanel.setTitle('Редактирование шаблона ' + model.get('theme_name'));
        tabPanel.myMask.show();
        Ext.Ajax.request({
            scope: this,
            method: 'GET',
            url: '/node/admin/themes/' + model.get('theme_uid') + '/files',
            callback: function(operation, success, response) {
                this.checkResponse(response, function() {
                    var responseData = Ext.JSON.decode(response.responseText);
                    tabFolder.removeAll();
                    tabFolder.add({
                        xtype: 'view-themes-tree-panel',
                        flex: 1,
                        model: model,
                        store: {
                            root: {
                                children: responseData.data
                            }
                        }
                    });
                    var userInfo = grid.up('view-themes').userInfo;
                    var disabled = false;
                    var fieldFile = tabFolder.down('base-field-file');
                    if (model.get('uid') != userInfo['uid']) {
                        fieldFile.hide();
                        disabled = true;
                    }
                    tabAtr.removeAll();
                    tabAtr.add({
                        xtype: 'view-themes-form',
                        model: model,
                        disabled: disabled
                    });
                    tabPanel.myMask.hide();
                    tabPanel.expand();

                });
            }
        });
    },

    onCreateTheme: function(cmp) {
        var form = cmp.up('base-form').getForm();
        var values = form.getValues();
        var userInfo = Ext.ComponentQuery.query('view-themes[id="view-themes-id"]')[0]['userInfo'];
        var grid = Ext.ComponentQuery.query('view-themes-grid')[0];
        var store = grid.getStore();
        form.submit({
            url: '/node/admin/themes/create',
            success: function(form, action) {
                var themeId = action.result.data;
                Ext.Msg.alert('Upload', 'Шаблон был успешно создан');
                if (Ext.getCmp('view-themes-window-create-id')) {
                    Ext.getCmp('view-themes-window-create-id').close();
                }
                store.add({
                    theme_uid: themeId,
                    theme_name: values['theme_name'],
                    theme_type: values['theme_type'],
                    is_public: values['public'],
                    login: userInfo['login'],
                    uid: userInfo['uid']
                });
            }
        });
    },

    showWindowCreateTheme: function() {
        if (Ext.getCmp('view-themes-window-create-id')) {
            Ext.getCmp('view-themes-window-create-id').close();
        }
        Ext.create('UD.view.themes.ThemesWindowCreate').show();
    },

    showWindowEditContentTheme: function(grid, rowndex) {
        var model = grid.getStore().getAt(rowndex);
        Ext.Ajax.request({
            scope: this,
            method: 'GET',
            url: '/node/admin/themes/' + model.get('theme_uid') + '/content',
            callback: function(operation, success, response) {
                this.checkResponse(response, function() {
                    var responseData = Ext.JSON.decode(response.responseText);
                    if (Ext.getCmp('view-themes-window-edit-content-id')) {
                        Ext.getCmp('view-themes-window-edit-content-id').close();
                    }
                    Ext.create('UD.view.themes.ThemesWindowEditContent', {
                        title: 'Редактироване шаблона ' + model.get('theme_name'),
                        contentTheme: responseData.data,
                        model: model
                    }).show();
                });
            }
        });
    },

    onThemeContentSave: function() {
        var model = Ext.ComponentQuery.query('view-themes-window-edit')[0]['model'];
        var content = Ext.getCmp('view-themes-window-edit-field-content-id').getValue();
        Ext.Ajax.request({
            scope: this,
            method: 'POST',
            url: '/node/admin/themes/' + model.get('theme_uid') + '/set-content',
            params: {
                content: content,
                public: model.get('is_public')
            },
            callback: function(operation, success, response) {
                this.checkResponse(response, function() {
                    Ext.getCmp('view-themes-window-edit-content-id').close();
                });
            }
        });
    },

    onUpdateTheme: function(cmp) {
        var model = Ext.ComponentQuery.query('view-themes-tree-panel')[0]['model'];
        var form = cmp.up('base-form').getForm();
        var values = form.getValues();
        Ext.Ajax.request({
            scope: this,
            method: 'POST',
            url: '/node/admin/themes/' + model.get('theme_uid') + '/update',
            params: {
                name: values['theme_name'],
                type: values['theme_type'],
                public: Number(Boolean(values['public'])),
                content: null
            },
            callback: function(operation, success, response) {
                this.checkResponse(response, function() {
                    Ext.Msg.alert('Редактирование', 'Шаблон был успешно изменен');
                    model.set('theme_name', values['theme_name']);
                    model.set('theme_type', values['theme_type']);
                    model.set('is_public', Number(Boolean(values['public'])));
                });
            }
        });
    },

    onUploadFileTheme: function(cmp, path) {
        var model = Ext.ComponentQuery.query('view-themes-tree-panel')[0]['model'];
        var form = cmp.up('base-form').getForm();
        var controller = this;
        if (path != '') {
            Ext.Msg.show({
                title: 'QUESTION',
                message: 'Вы действительно хотите добавить файл?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function(btn){
                    if (btn === 'yes') {
                        form.submit({
                            url: '/node/admin/themes/' + model.get('theme_uid') + '/upload',
                            success: function() {
                                Ext.Msg.alert('Upload', 'Файл был успешно добавлен');
                                var models = Ext.getCmp('view-themes-grid-id').getSelection();
                                var grid = Ext.getCmp('view-themes-grid-id');
                                if (models.length > 0) {
                                    controller.eventCellClick(grid, null, null, models[0]);
                                }
                            }
                        });
                    }
                }
            });

        }
    },

    onGetContentXml: function(cmp, path) {
        var model = Ext.ComponentQuery.query('view-themes-window-edit')[0]['model'];
        var form = cmp.up('base-form').getForm();
        if (path != '') {
            Ext.Msg.show({
                title: 'QUESTION',
                message: 'Вы действительно хотите загрузить содержимое из файла?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function(btn) {
                    if (btn === 'yes') {
                        form.submit({
                            url: '/node/admin/themes/content-xml',
                            success: function(form, action) {
                                var textArea = Ext.getCmp('view-themes-window-edit-field-content-id');
                                textArea.setValue(action.result.data);
                            }
                        });
                    }
                }
            });

        }
    }
});
