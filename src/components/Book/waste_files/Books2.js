import React, { useEffect, useState } from "react";
import axios from "axios";
import Book_user from "./Book_user";
import SearchBar from "./SearchBar";
import { Button, Box, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import './Books2.css'; // Ensure to import the CSS file
import UserHeader from "./UserHeader.js";

const URL = "http://localhost:5000/books";
const ORDER_URL = "http://localhost:5000/orders";

const Books2 = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5);
  const [cart, setCart] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [doorNumber, setDoorNumber] = useState("");
  const [showCart, setShowCart] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(URL);
        setBooks(response.data.books);
        setFilteredBooks(response.data.books);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const handleSearch = (query) => {
    const filtered = books.filter((book) =>
      book.name.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBooks(filtered);
    setCurrentPage(1);
  };

  const addToCart = (book) => {
    const existingBook = cart.find((item) => item._id === book._id);
    if (existingBook) {
      setCart(cart.map((item) =>
        item._id === book._id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...book, quantity: 1 }]);
    }
  };

  const removeFromCart = (bookId) => {
    setCart(cart.filter((item) => item._id !== bookId));
  };

  const incrementQuantity = (bookId) => {
    setCart(cart.map((item) =>
      item._id === bookId ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decrementQuantity = (bookId) => {
    setCart(cart.map((item) =>
      item._id === bookId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleOrder = async () => {
    try {
      const orderItems = cart.map(item => ({ bookId: item._id, quantity: item.quantity }));
      const orderData = {
        email,
        password,
        address,
        pincode,
        phoneNumber,
        doorNumber,
        books: orderItems,
      };
      const response = await axios.post(ORDER_URL, orderData);
      if (response.status === 200) {
        alert(response.data.message);
        setCart([]); // Clear cart after successful order
      } else {
        alert('Order failed: ' + response.data.message);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      if (error.response) {
        alert("Order failed: " + error.response.data.message);
      } else {
        alert("Network error. Please try again.");
      }
    }
  };

  return (
    <div className="container">
      <UserHeader />
      <div style={{ position: 'relative' }}>
        <Button
          variant="contained"
          color="secondary"
          style={{
            position: 'absolute',
            top: '10px', /* Adjust as necessary */
            right: '10px', /* Adjust as necessary */
          }}
          onClick={() => setShowCart(!showCart)}
        >
          {showCart ? "Hide Cart" : "Show Cart"}
        </Button>
      </div>

      {/* Conditional rendering for cart or book list */}
      <div className="content">
        {showCart ? (
          <>
            <h2>Your Cart</h2>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              border={1}
              padding={2}
              borderRadius={4}
              boxShadow={2}
              width="50%"
              margin="auto"
            >
              {cart.map((item) => (
                <Box
                  key={item._id}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  flexDirection="row"
                  marginBottom={2}
                  width="100%"
                  padding={2}
                  border={1}
                  borderRadius={4}
                  boxShadow={2}
                >
                  {/* Book image */}
                  <Box flex="1" display="flex" alignItems="center">
                    <Book_user book={item} />
                    <Box marginLeft={2}>
                      <p>Price: ${item.price}</p>
                    </Box>
                  </Box>

                  {/* Controls for quantity and removal */}
                  <Box display="flex" flexDirection="column" alignItems="flex-end">
                    <Button
                      onClick={() => incrementQuantity(item._id)}
                      sx={{ backgroundColor: "lightblue", color: "black", "&:hover": { backgroundColor: "blue" }, marginBottom: 1 }}
                    >
                      +
                    </Button>
                    <p style={{ margin: '0 10px' }}>{item.quantity}</p>
                    <Button
                      onClick={() => decrementQuantity(item._id)}
                      sx={{ backgroundColor: "lightgreen", color: "black", "&:hover": { backgroundColor: "green" }, marginBottom: 1 }}
                    >
                      -
                    </Button>
                    <Button
                      onClick={() => removeFromCart(item._id)}
                      sx={{ backgroundColor: "lightcoral", color: "black", "&:hover": { backgroundColor: "red" } }}
                    >
                      Remove
                    </Button>
                  </Box>
                </Box>
              ))}

              {/* Display total price */}
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                marginTop={4}
                padding={2}
                border={1}
                borderRadius={4}
                width="50%"
                margin="auto"
              >
                <h2>Total Price: ${calculateTotalPrice().toFixed(2)}</h2>

                {/* Order information */}
                <h2>Order Information</h2>
                <TextField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  label="Address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  label="Pincode"
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  label="Phone Number"
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  label="Door Number"
                  type="text"
                  value={doorNumber}
                  onChange={(e) => setDoorNumber(e.target.value)}
                  fullWidth
                  margin="normal"
                  required
                />

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleOrder}
                  sx={{ marginTop: 2 }}
                >
                  Order Now
                </Button>
              </Box>
            </Box>
          </>
        ) : (
          <>
            <SearchBar onSearch={handleSearch} />
            <h2>Books</h2>
            <div className="books-list">
              {currentBooks.map((book) => (
                <div className="book-item" key={book._id}>
                  <Book_user book={book} />
                  <Button
                    variant="contained"
                    onClick={() => addToCart(book)}
                    sx={{ marginTop: 2 }}
                  >
                    Add to Cart
                  </Button>
                </div>
              ))}
            </div>
            <div className="pagination">
              {Array.from({ length: Math.ceil(filteredBooks.length / booksPerPage) }, (_, index) => (
                <Button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  sx={{ margin: 1 }}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Books2;

