/* eslint-disable react/prop-types */
import { Modal } from "flowbite-react";
import { useState } from "react";
import UploadWidget from "./uploadwidget";

export default function AddBookPopup({showAddBookPopup, setShowAddBookPopup}) {

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [date, setDate] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');

    const [uploading, setUploading] = useState(false);

    const addBook = () => {
        fetch('http://localhost:8219/addbook', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, author, date, description, image })
        });
        window.location.reload();
    }

    return (
        <Modal dismissible show={showAddBookPopup} onClose={() => setShowAddBookPopup(false)}>
            <Modal.Header>Add a Book</Modal.Header>
            <Modal.Body>
                <div><input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} /></div>
                <div><input type="text" placeholder="Author" onChange={(e) => setAuthor(e.target.value)} /></div>
                <div><input type="text" placeholder="Date" onChange={(e) => setDate(e.target.value)} /></div>
                <div><input type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)} /></div>
                <div><UploadWidget setUrl={setImage} setUploading={setUploading} /></div>
                <div className="col-span-full">
                <div className="flex justify-center mt-4">
                    {//uploading ? <div>Uploading...</div> : null}
                    }
                    <div><button onClick={addBook} className="bg-amber-400 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-md">Save</button></div>
                </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}
