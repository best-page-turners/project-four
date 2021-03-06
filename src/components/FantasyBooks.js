// FantasyBooks.js

// components
import AddToReadingList from "./AddToReadingList.js";
import ScrollTop from "./ScrollTop.js";

// modules
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const FantasyBooks = () => {

  const [bookGenre, setBookGenre] = useState([]);

  useEffect(() => {
    axios({
      url: "https://www.googleapis.com/books/v1/volumes",
      dataResponse: "json",
      method: "GET",
      params: {
        key: `${process.env.REACT_APP_API_KEY}`,
        q: "fantasy",
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
      <h1>Fantasy books, you say?</h1>
      <ul className="genreBooks">
        {bookGenre.map((fantasyBook) => {
          const title = fantasyBook.volumeInfo.title;
          return (
            <li key={fantasyBook.id}>
              {fantasyBook.volumeInfo.imageLinks === undefined ? null : (
                <img
                  src={fantasyBook.volumeInfo.imageLinks.thumbnail}
                  alt={fantasyBook.volumeInfo.title}
                />
              )}
              <h2>{title.substring(0, 30)}</h2>
              {fantasyBook.volumeInfo.authors === undefined ? null : (
                <h3>{fantasyBook.volumeInfo.authors[0]}</h3>
              )}
              {fantasyBook.volumeInfo.averageRating === undefined ? (
                <h4>No rating available</h4>
              ) : (
                <h4>{`${fantasyBook.volumeInfo.averageRating} out of 5 stars`}</h4>
              )}
              <Link to={`/book/${fantasyBook.id}`}>
                <p
                  className="previewDetailLink"
                  aria-label="Click to see book details"
                >
                  See book details
                </p>
              </Link>

              <AddToReadingList object={fantasyBook} />
            </li>
          );
        })}
      </ul>
      <ScrollTop />
    </div>
  );
};

export default FantasyBooks;