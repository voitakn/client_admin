Ext.define('ADM.view.vignettes.Controller', {
    extend: 'Base.app.ModuleController',
    alias: 'controller.vignettes',
    rendererColumnContent: function(value) {
        if(value.src) {
            var url =  value.src.split('/');
            url = '/node/admin/vignettes/vignette-image/' + url[url.length -1];
            var style = '<img style="max-width: 200px; max-height: 40px;" src="' + url + '">';
            return '<img style="max-width: 200px; max-height: 40px;" src="' + url + '">';
        } else {
            return 'Изображение отсутствует';
        }
    },
    onSelectVignette: function(selectionModel, records) {
        var model = this.getViewModel();
        var styles = model.getStore('styles');
        styles.removeAll();
        var row = records[0], data = [];
        var content = row.get('content');
        if(typeof(content.style) == 'object') {
            var style = content.style;
            for(var key in style) if(style.hasOwnProperty(key)) {
                data.push({
                    property: key,
                    value: style[key]
                });
            }
            styles.setData(data);
            styles.commitChanges();
        }
        model.set('iname', content.iname);
        this.onSelectRecord(selectionModel, records);
    },
    openImages: function() {
        var model = this.getViewModel();
        var img_window = this.lookupReference('vignettes_images');
        if(!img_window) {
            img_window = Ext.create('ADM.view.vignettes.Images');
            this.getView().add(img_window);
        }
        img_window.show();
    },
    sendFile: function(file_field) {
        var form = this.lookupReference('uploadForm').getForm();
        var model = this.getViewModel();
        var images = model.getStore('images');
        //console.log('sendFile()', file_field, form, images);
        form.submit({
            url: '/node/admin/vignettes/upload',
            success: function(response, option) {
                //console.log('/node/admin/vignettes/upload');
                images.reload();
            }
        });
    },
    closeImages: function(button) {
        //this.lookupReference('vignettes_images').hide();
        button.up('window').close();
    },
    onSelectImage: function(dataView, records) {
        var model = this.getViewModel();
        //console.log('onSelectImage', this, records[0]);
        var record = model.get('record');
        var content = record.get('content');
        var stl = Ext.JSON.encode(content.style);
        record.set('vignette_json', '{src: "'+records[0].get('imageSrc')+'", style: '+stl+'}');
        content.iname = records[0].get('image');
        content.src = records[0].get('imageSrc');
        model.set('iname', records[0].get('image'));
        //var window = Ext.ComponentQuery.query('vignettes-images')[0];
        var window = this.lookupReference('vignettes_images');
        if(window) {
            window.close();
        }
        this.lookupReference('vignette_img').updateLayout();//vignette_img
        //record.commit();

    }

});
