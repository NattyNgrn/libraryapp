/* eslint-disable react/prop-types */

function BookCard({book, setPopupBook, setShowPopup}) {
    const formatDate = (date) => {
        date = new Date(date).toLocaleString('en-US', { timeZone: 'UTC' });
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('en-US', options);
    };
    return (
        <div className="card" key={book.id}>
            <img className="card-img-top" src={book.img} alt={book.title} />
            <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">Author: {book.author}</p>
                <p className="card-text">Year: {formatDate(book.date)}</p>
                <button 
                    onClick={() => { setPopupBook(book); setShowPopup(true); }} 
                    className="button">
                        Details
                </button>
            </div>
        </div>
    );
}

export default BookCard;
