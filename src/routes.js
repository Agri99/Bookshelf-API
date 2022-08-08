const {
    addBookHandler, getAllBooksHandler, getBookDetails, editBookById, removeBookById
    } = require('./handler')

const routes = [
    {
        method : 'POST',
        path : '/books',
        handler : addBookHandler,
        options: {
            cors: {
              origin: ['*'],
            },
          }
    },{
        method : 'GET',
        path : '/books',
        handler : getAllBooksHandler,
        options: {
            cors: {
              origin: ['*'],
            },
          }
    },{
        method : 'GET',
        path : '/books/{bookId}',
        handler : getBookDetails,
        options: {
            cors: {
              origin: ['*'],
            },
          }
    },{
        method : 'PUT',
        path : '/books/{bookId}',
        handler : editBookById,
        options: {
            cors: {
              origin: ['*'],
            },
          }
    },{
        method : 'DELETE',
        path : '/books/{bookId}',
        handler : removeBookById,
        options: {
            cors: {
              origin: ['*'],
            },
          }
    }
]

module.exports = routes