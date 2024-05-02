/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import Popup from "./popup";
import BookCard from "./bookcard";

export default function Catalogue() {
    const [data, setData] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [popupBook, setPopupBook] = useState({});
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');

    const searchFilter = (book) => {
        if (search == '') return true;
        else return book.title.toLowerCase().includes(search.toLowerCase());
    }

    useEffect(() => {
        fetch('http://localhost:8219/books')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.log(error));
    }, []);

    console.log("Data: ", data);

    return (
        <div>
            <form>
                <label className="text-red-200 text-xlg" >SEARCH: <input type='text' className="form-input rounded" value={search} onChange={(e) => setSearch(e.target.value)}></input></label>
                <button className="hover:bg-red-200 p-px px-2 rounded mx-2 bg-white text-xlg" >Available</button>
                <button  className="hover:bg-red-200 p-px px-2 rounded mx-2 bg-white text-xlg" >Unavailable</button>
            </form>
            <div className="grid-cols-1 sm:grid md:grid-cols-5 ">
                {data.filter(searchFilter).map(
                    book => <BookCard book={book} setPopupBook={setPopupBook} setShowPopup={setShowPopup}/>
                )}
            </div>
            <Popup book={popupBook} showPopup={showPopup} setShowPopup={setShowPopup}/>
        </div>
    );
}
