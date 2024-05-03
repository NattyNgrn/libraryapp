/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { useState } from "react";
import Popup from "./popup";
import BookCard from "./bookcard";
import AddBookPopup from "./addBookPopup";
import UpdateBookPopup from "./updateBookPopup";

export default function Catalogue({books, personalMode, adminMode}) {
    const [showPopup, setShowPopup] = useState(false);
    const [popupBook, setPopupBook] = useState({});
    const [searchTitle, setSearchTitle] = useState('');
    const [searchAuthor, setSearchAuthor] = useState('');
    const [filterAvailable, setFilterAvailable] = useState(false);
    const [showAddBookPopup, setShowAddBookPopup] = useState(false);
    const [showUpdateBookPopup, setShowUpdateBookPopup] = useState(false);

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
    const sortBooks = (a, b) => {
        const nameA = a.title.toUpperCase();
        const nameB = b.title.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    }

    return (
        <div className="pt-5 flex-shrink">
            <form className="flex items-center flex-shrink">
                <input
                    type="text"
                    className="m-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search by title"
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                />
                <input
                    type="text"
                    className="m-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search by Author"
                    value={searchAuthor}
                    onChange={(e) => setSearchAuthor(e.target.value)}
                />
                { 
                    personalMode 
                        ? <span></span>
                        : <button 
                            onClick={(e) => e.preventDefault() || setFilterAvailable(!filterAvailable)}
                            className={filterAvailable
                                ? "hover:bg-rose-400 p-px px-2 rounded mx-2 bg-rose-400 text-xlg"
                                : "hover:bg-rose-400 p-px px-2 rounded mx-2 bg-white text-xlg"}>
                            Available
                        </button>
                }
                {
                    adminMode
                        ? <button 
                            onClick={(e) => e.preventDefault() || setShowAddBookPopup(true)}
                            className="hover:bg-rose-400 p-px px-2 rounded mx-2 bg-white text-xlg">
                            Add Book
                        </button>
                        : <span></span>
                }
            </form>
            <div className="grid-cols-1 sm:grid md:grid-cols-5 ">
                {books
                    .filter(filterTitle)
                    .filter(filterAuthor)
                    .filter(filterAvailableBooks)
                    .sort(sortBooks)
                    .map(
                        book => <BookCard key={book.id} book={book} setPopupBook={setPopupBook} setShowPopup={setShowPopup}/>
                    )
                }
            </div>
            <AddBookPopup showAddBookPopup={showAddBookPopup} setShowAddBookPopup={setShowAddBookPopup} />
            <Popup book={popupBook} adminMode={adminMode} personalMode={personalMode} showPopup={showPopup} setShowPopup={setShowPopup} setShowUpdateBookPopup={setShowUpdateBookPopup}/>
            <UpdateBookPopup book={popupBook} showUpdateBookPopup={showUpdateBookPopup} setShowUpdateBookPopup={setShowUpdateBookPopup} />
        </div>
    );
}
