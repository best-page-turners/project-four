import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h1>berks</h1>
      <Link to="/mybooks" aria-label="Click to go to your reading list page">My Reading List</Link>
    </header>
  );
};

export default Header;
