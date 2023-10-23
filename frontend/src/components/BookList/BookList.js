import './BookList.css'
import { useSelector } from 'react-redux/es/hooks/useSelector'

const BookList = () => {
  const books = useSelector((state) => state.books) // підписатися на стан будь-якої частини компонен в додатку
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
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default BookList
