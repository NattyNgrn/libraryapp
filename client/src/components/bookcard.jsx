/* eslint-disable react/prop-types */

function BookCard({book, setPopupBook, setShowPopup}) {
    const setPopupStuff = () => {
        setPopupBook(book);
        setShowPopup(true);
    };
    return (
        <div onClick={setPopupStuff} className="mx-3 mt-6 flex flex-col self-start rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] sm:shrink-0 sm:grow sm:basis-0">
            <div className="card" key={book.id}>
                <img  className="card-img-top" src={book.image} alt={book.title} />
                <div className="card-body">
                    <h5 className="card-title">{book.title}</h5>
                    <h5 className="card-title">{book.author}</h5>
                </div>
            </div>
        </div>
    );
}

export default BookCard;
