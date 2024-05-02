/* eslint-disable react/prop-types */
import { Modal } from "flowbite-react";
import { useAuth } from "@clerk/clerk-react" 

function Popup({book, showPopup, setShowPopup}) {

    const { userId, isLoaded } = useAuth();

    const formatDate = (date) => {
        date = new Date(date).toLocaleString('en-US', { timeZone: 'UTC' });
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('en-US', options);
    };
    const checkIn = () => {
        fetch('http://localhost:8219/checkinbook', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userid: userId, bookid: book.id })
        });
    }
    const checkOut = () => {
        fetch('http://localhost:8219/checkoutbook', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userid: userId, bookid: book.id })
        });
    }
    const reserve = () => {
        fetch('http://localhost:8219/reservebook', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userid: userId, bookid: book.id })
        });
    }

    return (
        <Modal dismissible show={showPopup} onClose={() => setShowPopup(false)}>
            <Modal.Header>{book.title}</Modal.Header>
            <Modal.Body>
                <img src={book.image} />
                <div className="space-y-6">
                    <p>Author: {book.author}</p>
                    <p>Date Published: {formatDate(book.date)}</p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={checkIn} className='hover:bg-red-300 p-px px-2 rounded mx-2 bg-red-200 text-base'>Check In</button>
                <button onClick={checkOut} className='hover:bg-red-300 p-px px-2 rounded mx-2 bg-red-200 text-base'>Check Out</button>
                <button onClick={reserve} className='hover:bg-red-300 p-px px-2 rounded mx-2 bg-red-200 text-base'>Reserve</button>
            </Modal.Footer>
        </Modal>
    );

}

export default Popup;

