Ext.define("ADM.model.GenreTree", {
    extend: "Ext.data.TreeModel",
    fields: [
        {name: 'id'},
        {name: 'genre_id'},
        {name: 'genre'},
        {name: 'parent_genre_id'},
        {name: 'tags'},
        {name: 'book_cnt'}
    ]
});
