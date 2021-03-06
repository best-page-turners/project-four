// MurderBooks.js

// components
import AddToReadingList from "./AddToReadingList.js";
import ScrollTop from "./ScrollTop.js";

// modules
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MurderBooks = () => {
  const [bookGenre, setBookGenre] = useState([]);

  useEffect(() => {
    axios({
      url: "https://www.googleapis.com/books/v1/volumes",
      dataResponse: "json",
      method: "GET",
      params: {
        key: `${process.env.REACT_APP_API_KEY}`,
        q: "murder mystery",
        printType: "books",
        maxResults: 10,
      },
    }).then((response) => {
      setBookGenre(response.data.items);
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="wrapper">
      <h1>Murder books, you say?</h1>
      <ul className="genreBooks">
        {bookGenre.map((murderBook) => {
          const title = murderBook.volumeInfo.title;
          return (
            <li key={murderBook.id}>
              {murderBook.volumeInfo.imageLinks === undefined ? null : (
                <img
                  src={murderBook.volumeInfo.imageLinks.thumbnail}
                  alt={murderBook.volumeInfo.title}
                />
              )}
              <h2>{title.substring(0, 30)}</h2>
              {murderBook.volumeInfo.authors === undefined ? null : (
                <h3>{murderBook.volumeInfo.authors[0]}</h3>
              )}
              {murderBook.volumeInfo.averageRating === undefined ? (
                <h4>No rating available</h4>
              ) : (
                <h4>{`${murderBook.volumeInfo.averageRating} out of 5 stars`}</h4>
              )}

              <Link to={`/book/${murderBook.id}`}>
                <p
                  className="previewDetailLink"
                  aria-label="Click to see book details"
                >
                  See book details
                </p>
              </Link>

              <AddToReadingList object={murderBook} />
            </li>
          );
        })}
      </ul>
      <ScrollTop />
    </div>
  );
};

export default MurderBooks;