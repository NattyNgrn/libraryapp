/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import Popup from "./popup";
import BookCard from "./bookcard";

export default function Catalogue() {
    const [data, setData] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [popupBook, setPopupBook] = useState({});

    useEffect(() => {
        fetch('http://localhost:8888/books')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.log(error));
    }, []);

    console.log("Data: ", data);

    return (
        <div>
        {showPopup
            ? <Popup book={popupBook} setShowPopup={setShowPopup} />
            : <div className="grid">
                {data.map(
                    book => <BookCard book={book} setPopupBook={setPopupBook} setShowPopup={setShowPopup}/>
                )}
            </div>
        }
        </div>
    );
}
