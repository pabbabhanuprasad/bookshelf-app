import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SearchPage = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    let debounceTimer;

    const searchBooks = async (query) => {
        if (!query) {
            setResults([]);
            return;
        }

        const response = await axios.get(`https://openlibrary.org/search.json?q=${query}&limit=10&page=1`);
        setResults(response.data.docs);
    };

    const debounceSearch = (value) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => searchBooks(value), 1000);
    };

    const addToBookshelf = (book) => {
        const bookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
        const bookExists = bookshelf.some(b => b.key === book.key);
        
        if (bookExists) {
            toast.error(`${book.title} is already in your bookshelf!`);
        } else {
            bookshelf.push(book);
            localStorage.setItem('bookshelf', JSON.stringify(bookshelf));
            toast.success(`${book.title} added to bookshelf!`);
        }
    };

    return (
        <div className="container mt-5">
            <ToastContainer />
            <h1>Search Books</h1>
            <input 
                type="text" 
                value={query} 
                onChange={(e) => { 
                    setQuery(e.target.value);
                    debounceSearch(e.target.value);
                }} 
                className="form-control mb-4"
                placeholder="Type a book name..." 
            />
            <div className="row">
                {results.map((book) => (
                    <div key={book.key} className="col-md-4 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{book.title}</h5>
                                <p className="card-text">{book.author_name?.join(', ')}</p>
                                <button 
                                    className="btn btn-primary" 
                                    onClick={() => addToBookshelf(book)}>
                                    Add to Bookshelf
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchPage;





// import React, { useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const SearchPage = () => {
//     const [query, setQuery] = useState('');
//     const [results, setResults] = useState([]);

//     const searchBooks = async (query) => {
//         if (!query) {
//             setResults([]);
//             return;
//         }

//         const response = await axios.get(`https://openlibrary.org/search.json?q=${query}&limit=10&page=1`);
//         setResults(response.data.docs);
//         console.log(response);
//     };

//     const addToBookshelf = (book) => {
//         const bookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
//         bookshelf.push(book);
//         localStorage.setItem('bookshelf', JSON.stringify(bookshelf));
//         toast.success(`${book.title} added to bookshelf!`);
//     };

//     return (
//         <div className="container mt-5">
//             <ToastContainer />
//             <h1>Search Books</h1>
//             <input 
//                 type="text" 
//                 value={query} 
//                 onChange={(e) => { 
//                     setQuery(e.target.value);
//                     searchBooks(e.target.value);
//                 }} 
//                 className="form-control mb-4"
//                 placeholder="Type a book name..." 
//             />
//             <div className="row">
//                 {results.map((book) => (
//                     <div key={book.key} className="col-md-4 mb-4">
//                         <div className="card">
//                             <div className="card-body">
//                                 <h5 className="card-title">{book.title}</h5>
//                                 <p className="card-text">{book.author_name?.join(', ')}</p>
//                                 <button 
//                                     className="btn btn-primary" 
//                                     onClick={() => addToBookshelf(book)}>
//                                     Add to Bookshelf
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default SearchPage;







