import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookShelfPage = () => {
    const [bookshelf, setBookshelf] = useState([]);

    useEffect(() => {
        const storedBookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
        setBookshelf(storedBookshelf);
    }, []);

    const removeFromBookshelf = (bookKey) => {
        const updatedBookshelf = bookshelf.filter(book => book.key !== bookKey);
        setBookshelf(updatedBookshelf);
        localStorage.setItem('bookshelf', JSON.stringify(updatedBookshelf));
        toast.success('Book removed from bookshelf!');
    };

    return (
        <div className="container mt-5">
            <ToastContainer />
            <h1>My Bookshelf</h1>
            {bookshelf.length === 0 ? (
                <p>Your bookshelf is empty.</p>
            ) : (
                <div className="row">
                    {bookshelf.map((book, index) => (
                        <div key={index} className="col-md-4 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{book.title}</h5>
                                    <p className="card-text">{book.author_name?.join(', ')}</p>
                                    <button 
                                        className="btn btn-danger" 
                                        onClick={() => removeFromBookshelf(book.key)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BookShelfPage;




