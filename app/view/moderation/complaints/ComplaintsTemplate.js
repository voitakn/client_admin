Ext.define('ADM.view.moderation.complaints.ComplaintsTemplate', {
    extend: 'Ext.XTemplate',
    getComplaintDetail: function(value){
        var data = Ext.JSON.decode(value);
        var string;
        if (typeof(data) != 'number') {
            string = '<p>ID epub: ' +  + data['epub_id'] + '</p>';
            if (data['paragraph_id']) {
                string += '<p>ID параграф: ' + data['paragraph_id'] + '</p>';
            }
            if (data['book_uid']) {
                string += '<p>ID книги: ' + data['book_uid'] + '</p>';
            }
        }
        else{
            string = '<p>ID книги: ' + data + '</p>';
        }
        return string;
    }
});
