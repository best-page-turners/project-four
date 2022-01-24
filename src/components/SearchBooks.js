// SearchBooks.js

// components
import ListBooks from "./ListBooks.js";

// modules
import axios from "axios";
import { useEffect, useState } from "react"


const SearchBooks = () => {

  const [allBooks, setAllBooks] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [ifError, setIfError] = useState(false);
  const apiKey = 'AIzaSyDISzpyy6ru9PcqSbd86HCj1hJaGHbtbq8'

  const getBooks = (userInput) => {

    axios({
      url: 'https://www.googleapis.com/books/v1/volumes',
      dataResponse: 'json',
      method: 'GET',
      params: {
        key: apiKey,
        q: userInput,
        maxResults: 40,
      }
    }).then( (response) => {
      setAllBooks(response.data.items);
      console.log(response.data.items);
      setIfError(false);
    }).catch( (error) => {
      console.log(error);
      if (error) {
        setIfError(true);
      }
    })

  };

  // get the users input from the search field
  const handleInput = (event) => {
    setUserInput(event.target.value);
  }

  // handles form submission, resets the form to be blank
  const handleFormSubmit = (event) => {
    event.preventDefault();
    getBooks(userInput);
    console.log(userInput);
    setUserInput('');
  }

  return (   
    <div>
      <section>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="search">Search by title or author: </label>
          <input type="text" id="search" onChange={handleInput} value={userInput} placeholder="Try 'Murder'" />
          <button>Search</button>
        </form>
      </section>

      <main>
        {
          allBooks ?
          (
            <ListBooks />
          ) : (
            null
          )
        }
        
      </main>

    </div>
  )

}

export default SearchBooks;