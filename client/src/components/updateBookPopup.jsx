/* eslint-disable react/prop-types */
import { Modal } from "flowbite-react";
import { useState } from "react";
import UploadWidget from "./uploadwidget";

export default function UpdateBookPopup({book, showUpdateBookPopup, setShowUpdateBookPopup}) {

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [date, setDate] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");

    const [uploading, setUploading] = useState(false);

    const formatDate = (date) => {
        date = new Date(date).toLocaleString('en-US', { timeZone: 'UTC' });
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('en-US', options);
    };

    const updateBook = () => {
        fetch(`http://localhost:8219/updateBook/${book.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, author, date, description, image })
        });
        window.location.reload();
    }

    return (
        <Modal dismissible show={showUpdateBookPopup} onClose={() => setShowUpdateBookPopup(false)}>
            <Modal.Header>Add a Book</Modal.Header>
            <Modal.Body>
                <div><input type="text" placeholder={book.title} onChange={(e) => setTitle(e.target.value)} /></div>
                <div><input type="text" placeholder={book.author} onChange={(e) => setAuthor(e.target.value)} /></div>
                <div><input type="text" placeholder={formatDate(book.date)} onChange={(e) => setDate(e.target.value)} /></div>
                <div><input type="text" placeholder={book.description} onChange={(e) => setDescription(e.target.value)} /></div>
                <div><UploadWidget setUrl={setImage} setUploading={setUploading} /></div>
                <div className="col-span-full">
                    <div className="flex justify-center mt-4">
                        {//uploading ? <div>Uploading...</div> : null}
                        }
                        <div><button onClick={updateBook} className=" bg-rose-400 hover:bg-rose-600 text-white font-bold py-2 px-4 rounded-md">Save</button></div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}
