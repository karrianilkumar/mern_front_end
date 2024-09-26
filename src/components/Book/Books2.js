// Books2.js
import React, { useEffect, useState } from "react";
import axios from "axios"; // You can use axios to send HTTP requests (like GET, POST, PUT, DELETE) from your React frontend to your Express backend or any other API.
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
  const [currentPage, setCurrentPage] = useState(1); //Initially, it is set to 1(currentPage), which likely represents the first page of a list or pagination.
  const [booksPerPage] = useState(4);
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
        const response = await axios.get(URL);   // const URL = "http://localhost:5000/books";
        setBooks(response.data.books);
        setFilteredBooks(response.data.books);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);  // this effect is executed when application is mounted but not when state varbles chagned every time 

  const handleSearch = (query) => {   // here query means somthing the user typing in search box 
    const filtered = books.filter((book) =>
      book.name.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBooks(filtered);
    setCurrentPage(1);  // when type in seach in any pagination the filtered books displayed in pagination-1 
  };

const addToCart = (book) => {
  // Check if the book is already in the cart
  const existingBook = cart.find((item) => item._id === book._id);  // here every item is iterated 

  if (existingBook) {
    // If the book is already in the cart, update its quantity
    setCart(cart.map((item) =>
      item._id === book._id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  } else {
    // If the book is not in the cart, add it with a quantity of 1
    setCart([...cart, { ...book, quantity: 1 }]);
  }
};


  const removeFromCart = (bookId) => {
    setCart(cart.filter((item) => item._id !== bookId)); // to remove the books frmo cart use filter function
  };

  const incrementQuantity = (bookId) => {
    setCart(cart.map((item) =>
      item._id === bookId ? { ...item, quantity: item.quantity + 1 } : item 
          //{ ...item, quantity: item.quantity + 1 }:
//  This is the object spread syntax { ...item }, which copies the properties of the current item.
 //   It then updates the quantity of the item by increasing it by 1 (item.quantity + 1).
//item : item: If the item._id doesn't match bookId, the item is returned unchanged.
    ));
  };

  const decrementQuantity = (bookId) => {
    setCart(cart.map((item) =>
      item._id === bookId && item.quantity > 1   // current item quantity > 1 
        ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0); //The reduce method iterates over each item in the cart array and accumulates the total price. & The 0 at the end of reduce is the initial value of the total, meaning the total starts from 0.
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook); //  currentBooks are sending to <Book_user /> to display on the user page 

  const paginate = (pageNumber) => {
          setCurrentPage(pageNumber);
  }

  const handleOrder = async () => {
    try {
      const orderItems = cart.map(item => ({ bookId: item._id, quantity: item.quantity }));
      //  we have already entered this email , password , address in form 
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
      <UserHeader />   {/*used to display the header i.e online book store heading */}
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
          {showCart ? "Hide Cart" : "Show Cart"}   {/* button value */}
        </Button>
      </div>

      {/* Conditional rendering for cart or book list content  */}
      <div className="content">
        {showCart ? (                 // observe the ternary operator 
          <>
            <h2 align="center">Your Cart</h2>
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
                  <Box flex="1" display="flex" alignItems="center">
                    <Book_user book={item} />
                    <Box marginLeft={2}>  {/* The value 2 refers to Material-UI's spacing scale, where 1 unit is usually equal to 8px. So, marginLeft={2} would apply a margin-left of 16px (2 * 8 = 16px).*/}
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
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  label="Pincode"
                  type="number"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  label="Phone Number"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  label="Door Number"
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
                  style={{ marginTop: '20px' }}
                >
                  Place Order
                </Button>
              </Box>
            </Box>
          </>
        ) : (          // observe the ternary operator below is the user page 
          <>
            <SearchBar onSearch={handleSearch} /> {/*passing a prop called onSearch function to SearchBar  component  */}
            <div className="book-list">
              {currentBooks.map((book) => (
                <Book_user
                  key={book._id}
                  book={book}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
            <div className="pagination">
            {/*    The div with class "pagination" contains pagination buttons.
               Array.from generates a list of buttons based on the number of pages.
               Each button, when clicked, triggers the paginate function to switch to the corresponding page.
             */}
              {Array.from({ length: Math.ceil(filteredBooks.length / booksPerPage) }, (_, index) => (
                <Button
                  key={index + 1}
                  onClick={() => paginate(index + 1)} // it is an inbuilt function defined see in the above code of return state.
                  variant="contained"
                  color="primary"
                  style={{ margin: '5px' }}
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

