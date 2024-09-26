// Book_user.js : represents each book and it's descritption in user page (but admin page )
import React from "react";
import { Button, Box, Typography } from "@mui/material";
import './Book_user.css'; // Ensure to import the CSS file

const Book_user = ({ book, onAddToCart }) => { // parent component providing an onAddToCart function , book object as props from the Books2.js file 
  const { name, author, description, price, image } = book; // book object contains fields like name, author, description, price, image based on the object destructuring i.e based on corrresponding names values will be assigned  

  return (
    <div className="book-card">
      <img src={image} alt={name} className="book-image" />
      <Typography variant="h6">{name}</Typography>
      <Typography variant="subtitle1">By {author}</Typography>
      <Typography variant="body2">{description}</Typography>
      <Typography variant="h6">Rs {price}</Typography>
      {/* Button will be passed as a prop from the parent */}
      {onAddToCart && (  //  If onAddToCart is falsy (i.e., not passed from parent ), the button will not be displayed.& vice versa
        <Button
          variant="contained"
          color="primary"
          onClick={() => onAddToCart(book)} // func. defined in Book2.js file 
        >
          Add to Cart
        </Button>
      )}
    </div>
  );
};

export default Book_user;

























// import React, { useState } from "react";
// import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
// import axios from "axios";
// import "./Book.css";

// const Book_user = (props) => {
//   const [open, setOpen] = useState(false);
//   const [orderDetails, setOrderDetails] = useState({
//     email: "",
//     password: "",
//     address: "",
//     pincode: "",
//     phoneNumber: "",
//     doorNumber: "",
//   });
//   const { _id, name, author, description, price, image } = props.book;

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setOrderDetails({
//       ...orderDetails,
//       [name]: value,
//     });
//   };

//   const handleOrderSubmit = async (e) => {
//     e.preventDefault();

//     // Validate orderDetails
//     if (!orderDetails.email || !orderDetails.password || !orderDetails.address || 
//         !orderDetails.pincode || !orderDetails.phoneNumber || !orderDetails.doorNumber) {
//       alert('Please fill all the fields.');
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:5000/orders', {
//         ...orderDetails,
//         bookId: _id,
//       });
//       if (response.status === 201) {
//         alert('Order placed successfully!');
//         setOpen(false); // Close the modal or form
//       } else {
//         alert('Order failed with status: ' + response.status);
//       }
//     } catch (error) {
//       console.error("Error placing order:", error);
//       alert('Order failed: ' + (error.response?.data?.error || 'Unknown error.'));
//     }
//   };

//   return (
//     <div className="card">
//       <img src={image} alt={name} />
//       <article>By {author}</article>
//       <h3>{name}</h3>
//       <p>{description}</p>
//       <h3>Rs {price}</h3>
//       {/* Remove the "Order Now" button */}
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Order Details</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             name="email"
//             label="Email"
//             type="email"
//             fullWidth
//             variant="standard"
//             value={orderDetails.email}
//             onChange={handleInputChange}
//           />
//           <TextField
//             margin="dense"
//             name="password"
//             label="Password"
//             type="password"
//             fullWidth
//             variant="standard"
//             value={orderDetails.password}
//             onChange={handleInputChange}
//           />
//           <TextField
//             margin="dense"
//             name="address"
//             label="Address"
//             type="text"
//             fullWidth
//             variant="standard"
//             value={orderDetails.address}
//             onChange={handleInputChange}
//           />
//           <TextField
//             margin="dense"
//             name="pincode"
//             label="Pincode"
//             type="text"
//             fullWidth
//             variant="standard"
//             value={orderDetails.pincode}
//             onChange={handleInputChange}
//           />
//           <TextField
//             margin="dense"
//             name="phoneNumber"
//             label="Phone Number"
//             type="text"
//             fullWidth
//             variant="standard"
//             value={orderDetails.phoneNumber}
//             onChange={handleInputChange}
//           />
//           <TextField
//             margin="dense"
//             name="doorNumber"
//             label="Door Number"
//             type="text"
//             fullWidth
//             variant="standard"
//             value={orderDetails.doorNumber}
//             onChange={handleInputChange}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button onClick={handleOrderSubmit}>Place Order</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default Book_user;

