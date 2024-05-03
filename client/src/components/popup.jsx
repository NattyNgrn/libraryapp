/* eslint-disable react/prop-types */
import { Modal } from "flowbite-react";
import { useAuth } from "@clerk/clerk-react";

function Popup({book, personalMode, showPopup, setShowPopup}) {

    const { userId, isLoaded } = useAuth();

    const formatDate = (date) => {
        date = new Date(date).toLocaleString('en-US', { timeZone: 'UTC' });
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('en-US', options);
    };

    const checkIn = () => {
        if (isLoaded) {
            fetch('http://localhost:8219/checkinbook', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: userId, bookId: book.id })
            })
            window.location.reload();
        }
    }
    const checkOut = () => {
        if (isLoaded) {
            fetch('http://localhost:8219/checkoutbook', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: userId, bookId: book.id })
            })
            window.location.reload();
        }
    }
    const reserve = () => {
        if (isLoaded) {
            fetch('http://localhost:8219/reservebook', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: userId, bookId: book.id })
            });
            window.location.reload();
        }
    }
    const getBookStatus = () => {
        if (book.reserved) {
            return `Checked out and Reserved Already :(`;
        } else if (book.borrowed) {
            return `Checked Out, but available to reserve!`;
        } else {
            return 'Available to checkout!';
        }
    }

    return (
        <Modal dismissible show={showPopup} onClose={() => setShowPopup(false)}>
            <Modal.Header>{book.title} { !personalMode ? "-" + getBookStatus() : ""}</Modal.Header>
            <Modal.Body>
                <img src={book.image} />
                <div className="space-y-6">
                    <h3>Author: {book.author}</h3>
                    <h3>Date Published: {formatDate(book.date)}</h3>
                    <h3>{getBookStatus()}</h3>
                </div>
            </Modal.Body>
            <Modal.Footer>
                {personalMode
                    ? <button 
                        onClick={checkIn}
                        className='hover:bg-red-300 p-px px-2 rounded mx-2 bg-red-200 text-base'>
                        Check In
                    </button>
                    : <span></span>
                }
                {!book.borrowed && !book.reserved
                    ? <button
                        onClick={checkOut}
                        className='hover:bg-red-300 p-px px-2 rounded mx-2 bg-red-200 text-base'>
                        Check Out
                    </button>
                    : <span></span>
                }
                {!book.reserved
                    ? <button
                        onClick={reserve}
                        className='hover:bg-red-300 p-px px-2 rounded mx-2 bg-red-200 text-base'>
                        Reserve
                    </button>
                    : <span></span>
                }
            </Modal.Footer>
        </Modal>
    );
}

export default Popup;
