Ext.define("ADM.view.genres.Tree",{
    extend: 'Base.tree.ModuleList',
    xtype: 'genres-tree',
    requires: [
        'ADM.store.GenresTree'
    ],
    bind: {
        store: '{genres_tree}'
    },
    rootVisible: false,
    columns: [
        {
            xtype: 'treecolumn',
            header: 'Жанр',
            dataIndex: 'genre',
            flex: 5
        },{
            header: 'Книги',
            dataIndex: 'book_cnt',
            flex: 1,
            renderer: function(value){
                return  '<span style="text-decoration: underline; cursor: pointer">' + value + '</span>'
            }
        }
    ]
});
