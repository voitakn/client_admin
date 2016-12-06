Ext.define('ADM.view.articles.ArticlesModel', {
    extend: 'Base.app.ModuleModel',
    alias: 'viewmodel.articles',

    requires: [
        'ADM.store.ArticleSingles',
        'ADM.store.Articles'
    ],

    view: 'articles',

    data: {
        name: 'Статьи'
    },

    stores: {

        articles: {
            type: 'articles',
            autoLoad: true,
            listeners: {
                load: 'onSelectFirstRecord'
            }
        },

        articleSingles: {
            type: 'articleSingles'
        }

    },

    formulas: {

        bindContentType: {
            bind: '{record.content_type}',
            set: function(value) {
                var combobox = this.getView().down('combobox[name="content_type"]');
                var record = this.get('record');
                if (!record.isModel) {
                    record['content_type'] = value;
                    record['content_type_title'] = combobox.rawValue;
                    return;
                }
                record.set('content_type', value);
                record.set('content_type_title', combobox.rawValue);

            },
            get: function(value) {
                return value;
            }
        },

        getCreateTime: {
            bind: '{record.create_time}',
            get: function(value) {
                var flag = this.get('isCreate');
                if (!flag) {
                    return value;
                }
                this.set('record.create_time', new Date());
                return new Date();
            }
        },

        getUpdateTime: {
            bind: '{record.update_time}',
            get: function(value) {
                var flag = this.get('isCreate');
                if (!flag) {
                    return value;
                }
                this.set('record.update_time', new Date());
                return new Date();
            }
        }

    }

});
