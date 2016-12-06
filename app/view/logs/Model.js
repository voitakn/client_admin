Ext.define('ADM.view.logs.Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.logs',
    view: 'logs',
    requires: [
        'ADM.store.Logs'
    ],
    data: {
        title: 'Логи',
        record: {}
    },
    stores: {
        logs: {
            type: 'logs',
            autoLoad: true
        }
    }
    /*
    requires: [
        'ADM.store.Roles',
        'ADM.model.Scheme',
        'ADM.model.Procedure',
        'ADM.model.ProcedureRoles'
    ],
    stores: {
        roles: {
            type: 'roles',
            autoLoad: true
        },
        schemes: {
            extend: 'Ext.data.Store',
            model: 'ADM.model.Scheme',
            autoLoad: false
        },
        procedures_all: {
            extend: 'Ext.data.Store',
            model: 'ADM.model.Procedure',
            autoLoad: true
        },
        procedures_role: {
            extend: 'Ext.data.Store',
            model: 'ADM.model.ProcedureRoles',
            autoLoad: false
        }
    },
    formulas: {
        select_role: function(get) {
            return get('role_id') > 0 ? false : true;
        },
        is_create: function(get) {
            return get('isCreate') == true ? false : true;
        }
    }

     requires: [
     'ADM.store.UserModerationStatuses',
     'ADM.store.UserAccessStatuses',
     'ADM.store.UserFeeTypes',
     'ADM.store.Users',
     'ADM.store.Roles'
     ],



     stores: {

     users: {
     type: 'users',
     autoLoad: true,
     listeners: {
     load: 'onSelectFirstRecord'
     }
     },

     roles: {
     type: 'roles',
     autoLoad: true
     },

     userAccessStatuses: {
     type: 'userAccessStatuses'
     },

     userModerationStatuses: {
     type: 'userModerationStatuses'
     },

     userFeeTypes: {
     type: 'userFeeTypes'
     }

     },

     formulas: {

     bindRole: {
     bind: '{record.role_id}',
     set: function(value) {
     var combobox = this.getView().down('combobox[name="role_id"]');
     var record = this.get('record');
     if (!record.isModel) {
     return;
     }
     record.set('role_id', value);
     record.set('role_name', combobox.rawValue);

     },
     get: function(value) {
     return value;
     }
     },

     bindAccess: {
     bind: '{record.access}',
     set: function(value) {
     var combobox = this.getView().down('combobox[name="access"]');
     var record = this.get('record');
     if (!record.isModel) {
     return;
     }
     record.set('access', value);
     record.set('access_title', combobox.rawValue);

     },
     get: function(value) {
     return value;
     }
     },

     bindCommentStatus: {
     bind: '{record.comment_status}',
     set: function(value) {
     var combobox = this.getView().down('combobox[name="comment_status"]');
     var record = this.get('record');
     if (!record.isModel) {
     return;
     }
     record.set('comment_status', value);
     record.set('comment_status_title', combobox.rawValue);

     },
     get: function(value) {
     return value;
     }
     }
     }
     */
});
