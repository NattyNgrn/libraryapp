/* eslint-disable react/prop-types */


function Popup({book, setShowPopup}) {

    return (
        <div className="Popup">
            <div className="popup-inner">
                <h2>{book.title}</h2>
                <p>Author: {book.author}</p>
                <p>Year: {book.year}</p>
                <button onClick={() => setShowPopup(false)}>Close</button>
            </div>
        </div>
    );

}

export default Popup;

