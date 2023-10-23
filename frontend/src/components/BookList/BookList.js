import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useDispatch } from 'react-redux'
import { deleteBook, toggleFavorite } from '../../redux/books/actionCreators'
import { BsBookmarkStar, BsBookmarkStarFill } from 'react-icons/bs'
import './BookList.css'

const BookList = () => {
  const books = useSelector((state) => state.books) // підписатися на стан будь-якої частини компонен в додатку
  const dispatch = useDispatch()

  const handleDeleteBook = (id) => {
    dispatch(deleteBook(id))
  }

  const handleToggleFavorite = (id) => {
    dispatch(toggleFavorite(id))
  }

  return (
    <div className="app-block book-list">
      <h2>BookList</h2>
      {books.lenght === 0 ? (
        <p>No books available</p>
      ) : (
        <ul>
          {books.map((book, i) => (
            <li key={book.id}>
              <div className="book-info">
                {++i}. {book.title} by <strong>{book.author}</strong>
              </div>
              <div className="book-actions">
                <span onClick={() => handleToggleFavorite(book.id)}>
                  {' '}
                  {book.isFavorite ? (
                    <BsBookmarkStarFill className="star-icon"></BsBookmarkStarFill>
                  ) : (
                    <BsBookmarkStar className="star-icon" />
                  )}
                </span>

                <button onClick={() => handleDeleteBook(book.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default BookList
