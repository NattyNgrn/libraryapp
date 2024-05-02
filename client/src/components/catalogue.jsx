/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import Popup from "./popup";
import BookCard from "./bookcard";

export default function Catalogue() {
    const [data, setData] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [popupBook, setPopupBook] = useState({});
    const [searchTitle, setSearchTitle] = useState('');
    const [searchAuthor, setSearchAuthor] = useState('');
    const [filterAvailable, setFilterAvailable] = useState(false);
    const [filterReservable, setFilterReservable] = useState(false);

    const filterTitle = (book) => {
        if (searchTitle == '') return true;
        else return book.title.toLowerCase().includes(searchTitle.toLowerCase());
    }
    const filterAuthor = (book) => {
        if (searchAuthor == '') return true;
        else return book.author.toLowerCase().includes(searchAuthor.toLowerCase());
    }
    const filterAvailableBooks = (book) => {
        if (filterAvailable) return !book.borrowed;
        else return true;
    }
    const filterReservableBooks = (book) => {
        if (filterReservable) return !book.reserved;
        else return true;
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
                <label className="text-black text-2xl" >Search by title: <input type='text' className="form-input rounded text-black" value={searchTitle} onChange={(e) => setSearchTitle(e.target.value)}></input></label>
                <label className="text-black text-2xl" >Search by author: <input type='text' className="form-input rounded text-black" value={searchAuthor} onChange={(e) => setSearchAuthor(e.target.value)}></input></label>

                <button 
                    onClick={(e) => e.preventDefault() || setFilterAvailable(!filterAvailable)}
                    className={filterAvailable
                        ? "hover:bg-red-200 p-px px-2 rounded mx-2 bg-red-800 text-xlg"
                        : "hover:bg-red-200 p-px px-2 rounded mx-2 bg-white text-xlg"}>
                    Available
                </button>
                <button
                    onClick={(e) => e.preventDefault() || setFilterReservable(!filterReservable)}
                    className={filterReservable
                        ? "hover:bg-red-200 p-px px-2 rounded mx-2 bg-red-800 text-xlg"
                        : "hover:bg-red-200 p-px px-2 rounded mx-2 bg-white text-xlg"}>
                    Reservable
                </button>
            </form>
            <div className="grid-cols-1 sm:grid md:grid-cols-5 ">
                {data
                    .filter(filterTitle).filter(filterAuthor)
                    .filter(filterAvailableBooks).filter(filterReservableBooks)
                    .map(
                        book => <BookCard book={book} setPopupBook={setPopupBook} setShowPopup={setShowPopup}/>
                    )
                }
            </div>
            <Popup book={popupBook} showPopup={showPopup} setShowPopup={setShowPopup}/>
        </div>
    );
}
