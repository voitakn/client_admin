Ext.define('Base.app.ModuleController', {
    extend: 'Ext.app.ViewController',

    /**
     * Фильтр stor по параметрам из form[reference="filter"]. Использует {@link onFilterStore}
     * применяется на button.handler
     */
    onFilterStore: function() {
        var form = this.lookupReference('filter');
        var grid = this.lookupReference('list');
        var store = grid.getStore();
        var values = form.getValues();
        this.filterStore(store, values);
    },

    /**
     * Фильтр stor по значениям
     * @param store
     * @param values
     */
    filterStore: function(store, values) {
        var filters = store.getFilters();
        var filter = [];
        Ext.Object.each(values, function(key, value) {
            filter.push({
                property: key,
                value: value
            })
        });
        filters.add(filter);
    },


    /**
     * Сброс фильтра до начального значения
     * применяется на button.handler
     */
    onResetFilter: function() {
        this.lookupReference('filter').reset();
    },


    /**
     * Событие checkcolumn сохроняет record после его изменения
     * Используетс в месте с {@link recordSave}
     * @param column
     * @param rowIndex
     */
    onCheckChange: function(column, rowIndex) {
        var grid = this.lookupReference('list');
        var store = grid.getStore('list');
        var record = store.getAt(rowIndex);
        this.recordSave(record);
    },

    /**
     * Вызов метода {@link selectRecord} по умлчанию
     * Метод рекомендуется использовать на событие grid.selectionchange
     * @param selectionModel
     * @param records
     */
    onSelectRecord: function(selectionModel, records) {
        var panel = this.lookupReference('form');
        //console.log(records[0]);
        this.selectRecord(records[0], panel);
    },

    /**
     * Метод устанавливает значение record во viewModel, и устанавливает флаг create false
     * @param record
     * @param [panel]
     */
    selectRecord: function(record, panel) {
        var viewModel = this.getViewModel();
        var oldRecord = viewModel.get('record');
        if (oldRecord && oldRecord.isModel) {
            oldRecord.reject();
        }
        viewModel.set('isCreate', false);
        viewModel.set('record', record);
        if (panel) {
            panel.expand();
        }
    },


    /**
     * Вызов метода {@link selectFirstRecord} по умлчанию, если record в grid отсутствует,
     *  то форма переходит в режим создания
     * Метод рекомендуется использовать на событие store.load
     * @param store
     */
    onSelectFirstRecord: function(store) {
        var record = store.getAt(0);
        var grid = this.lookupReference('list');
        if (this.selectFirstRecord(grid, record)) {
        }
    },

    /**
     * Метод выберает после загрузки store первую запись из списка
     * @param grid
     * @param records
     */
    selectFirstRecord: function(grid, records) {
        if (!grid || !records) {
            return false;
        }
        grid.getSelectionModel().select(records);
        return true;

    },

    /**
     * Метод сбрасывай значение формы, а точнее связзного record до последних закомиченных изменений
     * Метод рекомендуется использовать на событие form.button.handler
     */
    onResetForm: function() {
        var viewModel = this.getViewModel();
        var form = this.lookupReference('form');
        var record = viewModel.get('record');
        if (record && record.isModel) {
            record.reject();
        }
        else {
            form.reset();
        }
    },

    /**
     * Метод удаляеи запись из store
     * Использует следующие методы {@link removeRecord}
     * Метод рекомендуется использовать на событие form.button.handler
     */
    onRemoveRecord: function() {
        var viewModel = this.getViewModel();
        var isCreate = viewModel.get('isCreate');
        var record = viewModel.get('record');

        if (isCreate == true) {
            return;
        }
        if (!record.isModel) {
            Ext.log({level: 'error'}, 'remove record is\'not model');
            return;
        }
        Ext.MessageBox.confirm('Вопрос', 'Выдействительно хотите удалить запись', function(btn) {
            if (btn != 'yes') {
                return;
            }
            this.removeRecord(record, false, true);
        }, this);
    },

    /**
     * Метод удаляет запись в случае успешного ответа от сервера
     * @param record
     * @param textSuccess
     */
    removeRecord: function(record, textSuccess, lodingForm) {
        textSuccess = textSuccess || 'Данные были удалены';
        var grid = this.lookupReference('list');
        var store = grid.getStore();
        if (lodingForm) {
            var form = this.lookupReference('form');
            form.setLoading('Загрузка...');
        }
        store.remove(record);
        store.sync({
            scope: this,
            success: function() {
                Ext.toast({
                    html: textSuccess,
                    header: false,
                    align: 't'
                });
                this.selectFirstRecord(grid, store.getAt(0));
                store.commitChanges();
            },
            callback: function() {
                if (lodingForm) {
                    form.setLoading(false);
                }
            },
            failure: function() {
                store.rejectChanges();
            }
        });

    },

    /**
     * Метод синхранезирует store и в зависемости от флага (viewModel.isCreate)
     * выполняет запрос на создание или удаление записи. Использует следующие методы {@link recordSave}
     * Метод рекомендуется использовать на событие form.button.handler
     */
    onSyncStore: function() {
        var viewModel = this.getViewModel();
        var record = viewModel.get('record');
        var isCreate = viewModel.get('isCreate');
        if (isCreate) {
            this.recordCreate(record, false, true);
        }
        else {
            this.recordSave(record, false, true);
        }
    },

    /**
     * Синхранизация record и создание записи в случае положительного ответа от сервера
     * @param record
     * @param textSuccess
     */
    recordCreate: function(record, textSuccess, lodingForm) {
        textSuccess = textSuccess || 'Данные были успешно добавлены';
        var grid = this.lookupReference('list');
        var store = grid.getStore();
        if (lodingForm) {
            var form = this.lookupReference('form');
            form.setLoading('Загрузка...');
        }
        store.add(record);
        store.sync({
            success: function() {
                Ext.toast({
                    html: textSuccess,
                    header: false,
                    align: 't'
                });
                store.commitChanges();
            },
            callback: function() {
                if (lodingForm) {
                    form.setLoading(false);
                }
            },
            failure: function() {
                store.rejectChanges();
            }
        });
    },

    /**
     * Синхранизация record и сохранение его в случаее положительного ответа от сервера
     * @param record
     * @param textSuccess
     */
    recordSave: function(record, textSuccess, lodingForm) {
        textSuccess = textSuccess || 'Данные были успешно изменены';
        if (lodingForm) {
            var form = this.lookupReference('form');
            form.setLoading('Загрузка...');
        }
        record.save({
            success: function() {
                record.commit();
                Ext.toast({
                    html: textSuccess,
                    header: false,
                    align: 't'
                });
            },
            callback: function() {
                if (lodingForm) {
                    form.setLoading(false);
                }
            },
            failure: function() {
                record.reject();
            }
        });
    },

    /**
     * Подготовка формы перед созданием записи
     * Метод рекомендуется использовать на событие button.handler
     */
    prepareFormCreate: function() {
        var form = this.lookupReference('form');
        var grid = this.lookupReference('list');
        var viewModel = this.getViewModel();
        grid.getSelectionModel().deselectAll();
        viewModel.set('record', {});
        viewModel.set('isCreate', true);
        form.expand();
    },

    /**
     * Открыть окно просмотра/редактирование
     */
    openModuleWindow: function() {
        this.lookupReference('window').show();

    },

    /**
     * Метод устанавливает tooltip на ячейку grid со значением ранам содержимым
     * Метод используется на методе renderer в grid
     * @param value
     * @param metaData
     * @returns {*}
     */
    rendererToolTip: function(value, metaData) {
        if (metaData) {
            metaData['tdAttr'] = 'data-qtip="' + Ext.String.htmlEncode(value) + '"';
        }
        return value;
    },


    /**
     * Просмотр самой последней версии книги в ридере. Использует следующие методы {@link getLinkLastBook}
     * Используется в column.renderer
     * @param value
     * @param metaData
     * @param record
     * @returns {*}
     */
    renderLinkLastBook: function(value, metaData, record) {
        return this.getLinkLastBook(record, value, metaData, 'last_epub_id', 'last_public_epub_id');
    },

    /**
     * Получение ссылки для просмотра самой последней версии книги
     * @param record
     * @param value
     * @param fieldEpubLast
     * @param fieldEpubPublick
     * @returns {*}
     */
    getLinkLastBook: function(record, value, metaData, fieldEpubLast, fieldEpubPublick) {
        var epub = record.get(fieldEpubLast) || record.get(fieldEpubPublick);
        if (metaData) {
            metaData['tdAttr'] = 'data-qtip="' + value + '"';
        }
        if (!epub) {
            return value;
        }
        var configs = this.getViewModel().get('configs');
        var readerUrl = configs.findRecord('name', 'reader_url');
        var sessionHash = Ext.util.Cookies.get('session_hash');
        var bookUid = record.get('book_uid');
        var href = Ext.String.format('{0}/?epub_id={1}&book_uid={2}&session_hash={3}', readerUrl.get('value'), epub, bookUid,sessionHash);
        return '<a target="_blank" href="' + href + '">' + value + '</a>';
    },

    /**
     * Слушатель на изменения значения в combobox и в случае установленного значения triger отображеется.
     * Используется в месте с методом {@link onFilterComboClear}
     * Используется в combobox.change
     * @param combo
     * @param value
     */
    onFilterComboChange: function(combo, value) {
        var triger = combo.getTrigger('clear');
        var hidden = !value && value != 0;
        triger.setHidden(hidden);
    },

    /**
     * Событие, которое при срабатывание сбрасывает значение combobox
     * @param combo
     */
    onFilterComboClear: function(combo) {
        combo.reset();
    }
});
