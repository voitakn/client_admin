Ext.Loader.setPath('Base', 'app/view/base');

Ext.define('ADM.Application', {
    extend: 'Ext.app.Application',
    
    name: 'ADM',

    defaultToken: 'home',

    stores: [
        'Configs',
        'Profiles'
    ],

    routes : {
        'login': {
            action: 'redirectLogin'
        },
        ':module': {
            before: 'beforeRedirectModule',
            action: 'redirectModule'
        },
        'moderation/:module': {
            before: 'beforeRedirectModule',
            action: 'redirectModule'
        }
    },

    views: [
        'Base.form.field.FilterCombobox',
        'Base.tab.ModulePanel',
        'Base.window.ModuleWindow',
        'Base.panel.ModuleForm',
        'Base.grid.ModuleList',
        'ADM.view.typeitems.Typeitems',
        'ADM.view.moderation.contents.Contents',
        'ADM.view.books.Books',
        'ADM.view.moderation.books.Books',
        'ADM.view.moderation.complaints.Complaints',
        'ADM.view.moderation.users.Users',
        'ADM.view.moderation.blockedcontent.Blockedcontent',
        'ADM.view.prints.Prints',
        'ADM.view.nominations.Nominations',
        'ADM.view.roles.Roles',
        'ADM.view.articles.Articles',
        'ADM.view.users.Users',
        'ADM.view.staticcontent.Staticcontent',
        'ADM.view.statistics.Statistics',
        'ADM.view.login.Login',
        'ADM.view.logs.Logs',
        'ADM.view.genres.Genres',
        'ADM.view.themes.Themes',
        'ADM.view.vignettes.Vignettes',
        'ADM.view.notices.Notices',
        'ADM.view.dropcaps.Dropcaps',
        'ADM.view.main.Main'
    ],

    initState: false,

    launch: function () {
        Ext.create('ADM.store.StaticData');
        var self = this;
        self.isLogin(self.launchMain);
    },

    isLogin: function(successCb) {
        var self = this;

        Ext.Ajax.request({
            url: 'node/admin/users/check',
            method: 'POST',
            ignoreError: true,
            success: function(response) {
                if (response.status != 200) {
                    self.redirectTo('login');
                    return;
                }
                var responseText = Ext.JSON.decode(response.responseText);
                if (responseText.success != true) {
                    self.redirectTo('login');
                    return;
                }
                if (typeof(successCb) == 'function') {
                    successCb = successCb.bind(self);
                    successCb();
                }
            },
            failure: function() {
                self.redirectTo('login');
            }
        });
    },

    launchMain: function() {
        var self = this;
        var profiles = this.getProfilesStore();
        var configs = this.getConfigsStore();
        profiles.load({
            callback: function(records) {
                configs.load({
                    callback: function() {
                        var hash = Ext.util.History.getHash();
                        var main = Ext.widget('app-main');
                        var viewModel = main.getViewModel();
                        viewModel.set('profile', records[0]);
                        if (hash == 'login' || hash == '') {
                            self.redirectTo('home');
                            return;
                        }
                        self.initState = true;
                        self.redirectModule(hash);
                    }
                });
            }
        });

    },

    redirectLogin: function() {
        var main = Ext.ComponentQuery.query('app-main')[0];
        if (main) {
            main.destroy();
        }
        Ext.util.Cookies.clear('session_hash');
        Ext.widget('login');
    },

    beforeRedirectModule: function(hash, action) {
        if (hash == 'login') {
            action.stop(true);
            return;
        }
        this.isLogin(action.resume);
    },

    redirectModule: function() {
        var hash = Ext.util.History.getHash();
        if (!this.initState) {
            Ext.log({level: 'warn'}, 'not loader application it,s inited ' + hash);
            return;
        }
        var modulePath = hash.split('/');
        var moduleName = modulePath[modulePath.length - 1];
        modulePath[modulePath.length - 1] = moduleName + '.' + (moduleName.slice(0, 1).toUpperCase() + moduleName.slice(1));
        var container = Ext.ComponentQuery.query('panel[reference="container"]')[0];
        var module = 'ADM.view.' + modulePath.join('.');
        var view = this.getView(module);
        if (!view) {
            Ext.log({level: 'warn'}, 'error 404');
            container.removeAll();
            container.update('<h1>Страница не найдена</h1>');
            return;
        }
        view = view.create();
        var viewModel = view.getViewModel();
        var profiles = this.getProfilesStore();
        var configs = this.getConfigsStore();
        viewModel.set('profile', profiles.getAt(0));
        viewModel.set('configs', configs);
        container.removeAll();
        container.add(view);
    }

});
