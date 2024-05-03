/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { useState } from "react";
import Popup from "./popup";
import BookCard from "./bookcard";

export default function Catalogue({books, personalMode}) {
    const [showPopup, setShowPopup] = useState(false);
    const [popupBook, setPopupBook] = useState({});
    const [searchTitle, setSearchTitle] = useState('');
    const [searchAuthor, setSearchAuthor] = useState('');
    const [filterAvailable, setFilterAvailable] = useState(false);

    const filterTitle = (book) => {
        if (searchTitle == '') return true;
        else return book.title.toLowerCase().includes(searchTitle.toLowerCase());
    }
    const filterAuthor = (book) => {
        if (searchAuthor == '') return true;
        else return book.author.toLowerCase().includes(searchAuthor.toLowerCase());
    }
    const filterAvailableBooks = (book) => {
        if (filterAvailable) return !book.borrowed || !book.reserved;
        else return true;
    }

    return (
        <div>
            <form className="m-4">
                <label className="text-black text-2xl" >Search by title: <input type='text' className="form-input rounded text-black" value={searchTitle} onChange={(e) => setSearchTitle(e.target.value)}></input></label>
                <label className="text-black text-2xl" >Search by author: <input type='text' className="form-input rounded text-black" value={searchAuthor} onChange={(e) => setSearchAuthor(e.target.value)}></input></label>

                { personalMode ? <span></span>
                    : <button 
                        onClick={(e) => e.preventDefault() || setFilterAvailable(!filterAvailable)}
                        className={filterAvailable
                            ? "hover:bg-red-500 p-px px-2 rounded mx-2 bg-red-500 text-xlg"
                            : "hover:bg-red-500 p-px px-2 rounded mx-2 bg-white text-xlg"}>
                        Available
                    </button>
                }
            </form>
            <div className="grid-cols-1 sm:grid md:grid-cols-5 ">
                {books
                    .filter(filterTitle)
                    .filter(filterAuthor)
                    .filter(filterAvailableBooks)
                    .map(
                        book => <BookCard key={book.id} book={book} setPopupBook={setPopupBook} setShowPopup={setShowPopup}/>
                    )
                }
            </div>
            <Popup book={popupBook} personalMode={personalMode} showPopup={showPopup} setShowPopup={setShowPopup}/>
        </div>
    );
}
