/* eslint-disable react/prop-types */
import { Modal } from "flowbite-react";

function Popup({book, showPopup, setShowPopup}) {

    const formatDate = (date) => {
        date = new Date(date).toLocaleString('en-US', { timeZone: 'UTC' });
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('en-US', options);
    };

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
            <button className='hover:bg-red-300 p-px px-2 rounded mx-2 bg-red-200 text-base'>Check In</button>
                    <button className='hover:bg-red-300 p-px px-2 rounded mx-2 bg-red-200 text-base'>Check Out</button>
                    <button className='hover:bg-red-300 p-px px-2 rounded mx-2 bg-red-200 text-base'>Reserve</button>
                    <button className='hover:bg-red-300 p-px px-2 rounded mx-2 bg-red-200 text-base' onClick={() => setShowPopup(false)}>Close</button>
            </Modal.Footer>
        </Modal>
    );

}

export default Popup;

