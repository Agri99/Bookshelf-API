const {nanoid} = require('nanoid')
const book = require('./books')
const books = require('./books')

const addBookHandler = (req, h) => {
    const {name, author, summary, publisher, year, pageCount, readPage} = req.payload

    if(name === undefined) {
        const response = h.response({
            status : 'fail',
            message : 'Gagal menambahkan buku. Mohon isi nama buku'
        })
        response.code(400)

        return response
    }

    if(readPage > pageCount) {
        const response = h.response({
            status : 'fail',
            message : 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        })
        response.code(400)

        return response
    }

    const id = nanoid(16)
    const reading = (readPage < pageCount) ? true : false
    const finished = (pageCount === readPage) ? true : false
    const insertedAt = new Date().toISOString()
    const updatedAt = insertedAt

    const newBook = {
        id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt
    }

    books.push(newBook)

    const isSuccess = books.filter((book) => book.id === id).length > 0

    if(isSuccess) {
        const response = h.response({
            status : 'success',
            message : 'Buku berhasil ditambahkan',
            data : {
                'bookId' : id
            }
        })

        response.code(201)

        return response
    }

    const response = h.response({
        status : 'fail',
        message : 'Buku gagal ditambahkan'
    })

    response.code(500)

    return response
}

const getAllBooksHandler = (req, h) => {
    const {name, reading, finished} = req.query

    if(name !== undefined) {
        const book = books.filter(
            (book) => book.name.toLowerCase().includes(name.toLowerCase())
        )

        const response = h.response({
            status : 'success',
            data : {
                books : book.map((book) => ({
                    id : book.id,
                    name : book.name,
                    publisher : book.publisher
                }))
            }
        })

        response.code(200)

        return response
    }

    if(reading !== undefined) {
        const book = books.filter((book) => Number(book.reading) === Number(reading))

        const response = h.response({
            status : 'success',
            data : {
                books : book.map((book) => ({
                    id : book.id,
                    name : book.name,
                    publisher : book.publisher
                }))
            }
        })

        response.code(200)

        return response
    }

    if(finished !== undefined) {
        const book = books.filter((book) => Number(book.finished) === Number(finished))

        const response = h.response({
            status : 'success',
            data : {
                books : book.map((book) => ({
                    id : book.id,
                    name : book.name,
                    publisher : book.publisher
                }))
            }
        })

        response.code(200)

        return response
    }
    
    const response = h.response({
        status : 'success',
        data : books.map((book) => ({
            id : book.id,
            name : book.name,
            publisher : book.publisher
        }))
    })
    response.code(200)

    return response
}

const getBookDetails = (req, h) => {
    const {bookId} = req.params

    const exist = books.filter((book) => book.id === bookId)[0]

    if(!exist) {
        const response = h.response({
            status : 'fail',
            message : 'Buku tidak ditemukan'
        })
        response.code(404)

        return response
    }

    const response = h.response({
        status : 'success',
        data : ({
            exist
        })
    })
    response.code(200)

    return response
}

const editBookById = (req, h) => {
    const {bookId} = req.params
    const {
        name, year, author, summary, publisher, pageCount, readPage
    } = req.payload

    const updatedAt = new Date().toISOString()

    const index = books.findIndex((book) => book.id === bookId)

    if(index !== -1) {
        if(name === undefined) {
            const response = h.response({
                status : 'fail',
                message : 'Gagal memperbarui buku. Mohon isi nama buku'
            })
            response.code(400)

            return response
        }

        if(readPage > pageCount) {
            const response = h.response({
                status : 'fail',
                message : 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
            })
            response.code(400)

            return response
        }

        const reading = (readPage < pageCount)
        const finished = (readPage === pageCount)

        books[index] = {
            ...books[index],
            name, year, author, summary, publisher, pageCount, readPage, finished, reading, updatedAt
        }

        const response = h.response({
            status : 'success',
            message : 'Buku berhasil diperbarui'
        })

        response.code(200)

        return response
    }

    const response = h.response({
        status : 'fail',
        message : 'Gagal memperbarui buku, Id tidak ditemukan'
    })

    response.code(404)

    return response
} 

const removeBookById = (req, h) => {
    const {bookId} = req.params

    const index = books.findIndex((book) => book.id === bookId)

    if(index !== -1) {
        books.splice(index, 1)
        const response = h.response({
            status : 'success',
            message : 'Buku berhasil dihapus'
        })

        response.code(200)

        return response
    }

    const response = h.response({
        status : 'fail',
        message : 'Buku gagal dihapus. Id gagal ditemukan'
    })

    response.code(404)

    return response
}

module.exports = {addBookHandler, getAllBooksHandler, getBookDetails, editBookById, removeBookById}