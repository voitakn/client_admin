Ext.define('ADM.view.roles.RolesController', {
    extend: 'Base.app.ModuleController',
    alias: 'controller.roles',

    onSelectRecord: function(selectionModel, records) {
        var model = this.getViewModel();
        var record = records[0];
        var panel = this.lookupReference('form');
        this.selectRecord(record, panel);
        model.set('role_id', record.get('role_id'));
        var schemes = model.getStore('schemes');
        var procedures_role = model.getStore('procedures_role');
        schemes.getProxy().setApi({
            read: '/node/admin/role-schemas/' + record.get('role_id'),
            update: '/node/admin/role-schemas/' + record.get('role_id') +'/edit'
        });
        schemes.load();
        procedures_role.getProxy().setUrl('/node/admin/procedures/' + record.get('role_id') + '/role');
        procedures_role.load();
    },
    addRoles: function(text) {
        var window = Ext.getCmp('view-roles-window-id');
        Ext.Ajax.request({
            scope: this,
            method: 'POST',
            params: {
                name: text
            },
            url: '/node/admin/roles/create',
            callback: function(operation, success, response) {
                if(!this.checkResponse(response)){
                    return;
                }
                this.storeRole.load();
                window.close();
            }
        })
    },

    showWin: function(){
        if(!Ext.getCmp('view-roles-window-id')){
            Ext.create('UD.view.roles.RoleWindow').show();
        }
    },

    onResetForm: function() {
        var viewModel = this.getViewModel();
        var record = viewModel.get('record');
        if (record && record.isModel) {
            record.reject();
        }
        viewModel.set('record', {});
        viewModel.set('isCreate', true);

    },

    getPanelRoles: function(selectionModel, selections) {
        var record = selections[0];
        var tabPanel = this.getView().down('base-tab-panel');
        var urlScheme = '/node/admin/role-schemas/' + record.get('role_id');
        var urlProcedure = '/node/admin/procedures/' + record.get('role_id') + '/role';
        var storeScheme = this.storeRoleScheme;
        var storeProcedure = this.storeRoleProcedure;
        var tabScheme = tabPanel.down('container[itemId="rolesTabScheme"]');
        var tabProcedure = tabPanel.down('container[itemId="rolesTabProcedure"]');
        tabPanel.setTitle('Редактирование записи id ' + record.get('role_id'));
        storeScheme.getProxy().setApi({
            read: '/node/admin/role-schemas/' + record.get('role_id'),
            update: '/node/admin/role-schemas/' + record.get('role_id') +'/edit'
        });
        storeProcedure.getProxy().setUrl(urlProcedure);

        storeScheme.load({
            callback: function(records, operation, success) {
                if (success != true) {

                }

                storeProcedure.load({
                    callback: function(records, operation, success) {
                        if (success != true) {

                        }

                        tabScheme.removeAll();
                        tabProcedure.removeAll();

                        tabScheme.add({
                            xtype: 'view-roles-grid-scheme',
                            anchor: '100% 100%'

                        });

                        tabProcedure.add({
                            xtype: 'view-roles-procedure-grid',
                            anchor: '100% 100%'
                        });

                        tabPanel.expand();
                    }
                })
            }
        });
    },

    onChangeRoleProcedure: function(cmp) {
        var form = cmp.up('view-roles-form-procedure').getForm();
        var procedureComboBox = cmp.up('view-roles-form-procedure').down('base-combo-box');
        var values = form.getValues();
        var grid = Ext.ComponentQuery.query('view-roles-grid')[0];
        var modelRole = grid.getSelection()[0];
        var controller = Ext.ComponentQuery.query('view-roles')[0].getController();
        var storeProcedure = this.storeRoleProcedure;
        if(values['procedure'] == '') {
            return;
        }
        Ext.Ajax.request({
            scope: this,
            method: 'POST',
            url: '/node/admin/procedures/' + modelRole.get('role_id') + '/role-set',
            params: {
                procedure: values['procedure']
            },
            callback: function(operation, success, response) {
                procedureComboBox.setValue('');
                if(!controller.checkResponse(response)){
                    return;
                }
                storeProcedure.add({
                    proc: values['procedure']
                })
            }
        });
    },

    onDelRole: function(grid, rowIndex){
        var model = grid.getStore().getAt(rowIndex);
        var controller = this;

        Ext.Msg.show({
            title: 'QUESTION',
            message: 'Вы действительно хотите удалить роль "' + model.get('role_name') + '"?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(btn){
                if(btn === 'yes'){
                    Ext.Ajax.request({
                        scope: this,
                        method: 'POST',
                        url: '/node/admin/roles/' + model.get('role_id') + '/delete',
                        success: function(response){
                            controller.checkResponse(response, function(){
                                grid.getStore().removeAt(rowIndex)
                            })
                        }
                    })
                }
            }
        });
    },
    onDelProc: function(grid, rowIndex) {
        //console.log('onDelProc()', rowIndex);
        var model = grid.getStore().getAt(rowIndex);
        var procName = model.get('proc');
        var controller = this;
        var grid_roles = Ext.ComponentQuery.query('view-roles-grid')[0];
        var modelRole = grid_roles.getSelection()[0];
        Ext.Msg.show({
            title: 'QUESTION',
            message: 'Вы действительно хотите удалить процедуру "' + procName + '"?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(btn){
                if(btn === 'yes'){
                    Ext.Ajax.request({
                        scope: this,
                        params: {
                            procedure: procName
                        },
                        method: 'POST',
                        url: '/node/admin/procedures/' + modelRole.get('role_id') + '/role-del',
                        success: function(response){
                            controller.checkResponse(response, function(){
                                grid.getStore().removeAt(rowIndex)
                            })
                        }
                    })
                }
            }
        });
    },
    checkScheme: function(checks, rowIndex, checked){
        //console.log('checkScheme', checks, rowIndex, checked);
        var scheme_grid = Ext.ComponentQuery.query('view-roles-grid-scheme')[0];
        var model = scheme_grid.getStore().getAt(rowIndex);
        //console.log(model);


    }

});