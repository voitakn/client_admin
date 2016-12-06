Ext.define('ADM.view.users.UsersModel', {
    extend: 'Base.app.ModuleModel',
    alias: 'viewmodel.users',

    view: 'users',

    requires: [
        'ADM.store.UserModerationStatuses',
        'ADM.store.UserAccessStatuses',
        'ADM.store.UserFeeTypes',
        'ADM.store.Users',
        'ADM.store.Roles'
    ],

    data: {
        user: 'Пользователи'
    },

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
});
