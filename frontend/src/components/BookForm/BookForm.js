import { useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
// import { v4 as uuidv4 } from 'uuid'
import booksData from '../../data/books.json'
import './BookForm.css'
import { addBook, fetchBook } from '../../redux/slices/booksSlice'
import createBookWithID from '../../utils/createBookWithID'

const BookForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const dispatch = useDispatch()

  const handleAddRandomBook = () => {
    const randomIndex = Math.floor(Math.random() * booksData.length)
    const randomBook = booksData[randomIndex]
    // const randomBookWithId = {
    //   ...randomBook,
    //   id: uuidv4(),
    // }

    const randomBookWithID = createBookWithID(randomBook, 'random')

    dispatch(addBook(randomBookWithID))
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    if (title && author) {
      // const book = {
      //   title,
      //   author,
      //   id: uuidv4(),
      //   isFavorite: false,
      // }
      const book = createBookWithID({ title, author }, 'manual')

      dispatch(addBook(book))

      setTitle('')
      setAuthor('')
    }
  }

  const handleAddRandomBookViaAPI = async () => {
    dispatch(fetchBook)
  }

  return (
    <div className="app-block book-form">
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            placeholder="Death on the Nile"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            placeholder="Agatha Christie"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <button type="submit">Add Book</button>
        <button type="button" onClick={handleAddRandomBook}>
          Add random
        </button>
        <button type="button" onClick={handleAddRandomBookViaAPI}>
          Add random via API
        </button>
      </form>
    </div>
  )
}

export default BookForm
