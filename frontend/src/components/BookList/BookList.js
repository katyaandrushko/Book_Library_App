import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useDispatch } from 'react-redux'
import { deleteBook, toggleFavorite } from '../../redux/books/actionCreators'
import { BsBookmarkStar, BsBookmarkStarFill } from 'react-icons/bs'
import './BookList.css'
import {
  selectTitleFilter,
  selectAuthorFilter,
  selectOnlyFavoriteFilter,
} from '../../redux/slices/filterSlice'

const BookList = () => {
  const books = useSelector((state) => state.books) // підписатися на стан будь-якої частини компонен в додатку
  const titleFilter = useSelector(selectTitleFilter)
  const authorFilter = useSelector(selectAuthorFilter)
  const onlyFavoriteFilter = useSelector(selectOnlyFavoriteFilter)
  const dispatch = useDispatch()

  const fileredBooks = books.filter((book) => {
    const matchesTitle = book.title
      .toLowerCase()
      .includes(titleFilter.toLowerCase())

    const matchesAuthor = book.author
      .toLowerCase()
      .includes(authorFilter.toLowerCase())

    const matchesFavorite = onlyFavoriteFilter ? book.isFavorite : true

    return matchesTitle & matchesAuthor & matchesFavorite
  })

  const handleDeleteBook = (id) => {
    dispatch(deleteBook(id))
  }

  const handleToggleFavorite = (id) => {
    dispatch(toggleFavorite(id))
  }

  const highlightMatch = (text, filter) => {
    if (!filter) return text
    const regex = new RegExp(`(${filter})`, 'gi')
    return text.split(regex).map((substring, i) => {
      if (substring.toLowerCase() === filter.toLowerCase()) {
        return (
          <>
            <span key={i} className="highlight">
              {substring}
            </span>
          </>
        )
      }
      return substring
    })
  }

  return (
    <div className="app-block book-list">
      <h2>BookList</h2>
      {books.lenght === 0 ? (
        <p>No books available</p>
      ) : (
        <ul>
          {fileredBooks.map((book, i) => (
            <li key={book.id}>
              <div className="book-info">
                {++i}. {highlightMatch(book.title, titleFilter)} by{' '}
                <strong> {highlightMatch(book.author, authorFilter)}</strong> (
                {book.source})
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
