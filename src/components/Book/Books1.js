import React, { useEffect, useState } from "react";
import axios from "axios";
import Book from "./Book";
import SearchBar from "./SearchBar";
import LoginForm from "./LoginForm";
import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import './Book.css'; // Ensure to import the CSS file
import Header from "./Header"; // Correct the import path for Header

const URL = "http://localhost:5000/books";

const Books1 = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(4); // Change to 4 to show only 4 books per page
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      const fetchBooks = async () => {
        try {
          const config = {
            headers: { 
              'email': email,
              'password': password
            }
          };
          const response = await axios.get(URL, config);
          setBooks(response.data.books);
          setFilteredBooks(response.data.books);
        } catch (error) {
          console.error("Error fetching books:", error);
        }
      };

      fetchBooks();
    }
  }, [email, password, isLoggedIn]);

  const handleSearch = (query) => {
    const filtered = books.filter((book) =>
      book.name.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBooks(filtered);
    setCurrentPage(1);
  };

  // Pagination calculation
  const indexOfLastBook = currentPage * booksPerPage;  // consider the 1st page itself for better understanding purpose 
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook); // slice() returns a new array or string containing the selected elements based on the start & end indexes  syntax  : array.slice(start, end) .

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleLoginSuccess = (email, password) => {
    setEmail(email);
    setPassword(password);
    setIsLoggedIn(true);
  };

  return (
    <div className="container">
      {isLoggedIn && <Header />} {/* Conditionally render Header based on login status */}
      {!isLoggedIn ? (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      ) : (
        <>
          {/* SearchBar and Add Book Button */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            margin={2}
          >
            <SearchBar onSearch={handleSearch} />
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/add")}
            >
              Add Book
            </Button>
          </Box>

          {/* Book list and pagination */}
          <div className="content">
            <ul>
              {currentBooks.map((book) => (
                <li key={book._id}>
                  <Book book={book} />
                </li>
              ))}
            </ul>

            <div className="pagination-container">
              {Array.from({ length: Math.ceil(filteredBooks.length / booksPerPage) }, (_, index) => (
                <button 
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={currentPage === index + 1 ? "active" : ""}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Books1;

