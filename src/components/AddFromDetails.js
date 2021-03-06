import BooksProject from "../firebaseSetup.js";
import { getDatabase, ref, push } from "firebase/database";

const AddFromDetails = (props) => {
    const database = getDatabase(BooksProject);
    const unreadAddress = ref(database, 'unreadReadingList');

    const addBookDetails = (book) => {

        const bookObject = {
            title: book.object.title,
            author: book.object.authors,
            link: book.object.previewLink,
            jacket: book.object.imageLinks.thumbnail,
            id: book.object.industryIdentifiers[0].identifier
        }
        
        push(unreadAddress, bookObject);
    }

    return (
        <button className="addFromBtn" onClick={() => { addBookDetails(props) }} aria-label="Add book to your reading list">Add to my reading list</button>
    )
}

export default AddFromDetails;