import React from "react";
import { Button } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Book.css";

const Book = (props) => {
  const history = useNavigate();
  const { _id, name, author, description, price, image } = props.book;

  const deleteHandler = async () => {
    await axios
      .delete(`http://localhost:5000/books/${_id}`)
      .then((res) => res.data)
      .then(() => history("/"));
  };

  return (
    <div className="card">
      <img src={image} alt={name} />
      <article>By {author}</article>
      <h3>{name}</h3>
      <p>{description}</p>
      <h3>Rs {price}</h3>
      <Button LinkComponent={Link} to={`/books/${_id}`} sx={{ mt: "auto" }}> {/*this file will be executed here <Route path="/books/:id" element={<BookDetail />} />*/}
        Update
      </Button>
      <Button color="error" onClick={deleteHandler} sx={{ mt: "auto" }}>
        Delete
      </Button>
    </div>
  );
};

export default Book;












// import React, { useState } from "react";
// import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import "./Book.css";

// const Book = (props) => {
//   const history = useNavigate();
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

// const handleOrderSubmit = async (e) => {
//   e.preventDefault();

//   // Validate orderDetails
//   if (!orderDetails.email || !orderDetails.password || !orderDetails.address || 
//       !orderDetails.pincode || !orderDetails.phoneNumber || !orderDetails.doorNumber) {
//     alert('Please fill all the fields.');
//     return;
//   }

//   try {
//     const response = await axios.post('http://localhost:5000/orders', {
//       ...orderDetails,
//       bookId: _id,
//     });
//     if (response.status === 201) {
//       alert('Order placed successfully!');
//       setOpen(false); // Close the modal or form
//     } else {
//       alert('Order failed with status: ' + response.status);
//     }
//   } catch (error) {
//     console.error("Error placing order:", error);
//     alert('Order failed: ' + (error.response?.data?.error || 'Unknown error.'));
//   }
// };


//   const deleteHandler = async () => {
//     await axios
//       .delete(`http://localhost:5000/books/${_id}`)
//       .then((res) => res.data)
//       .then(() => history("/"));
//      // .then(() => history("/books"));
//   };

//   return (
//     <div className="card">
//       <img src={image} alt={name} />
//       <article>By {author}</article>
//       <h3>{name}</h3>
//       <p>{description}</p>
//       <h3>Rs {price}</h3>
//       <Button LinkComponent={Link} to={`/books/${_id}`} sx={{ mt: "auto" }}>
//         Update
//       </Button>
//       <Button color="error" onClick={deleteHandler} sx={{ mt: "auto" }}>
//         Delete
//       </Button>

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

// export default Book;

