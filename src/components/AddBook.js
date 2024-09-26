import {
  Button,
  Checkbox,
  FormControlLabel,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
//useNavigate() This hook allows you to programmatically navigate to different routes within your application.
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    price: "",
    author: "",

    image: "",
  });
  const [checked, setChecked] = useState(false);
  // below each entered i/p filed is assigned to the correcsponding i/p field 
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState, // The spread operator is used to copy all existing properties from the previous state into the new state object
      [e.target.name]: e.target.value, // e.target.value is the new value entered in that input field.
    }));
    // console.log(e.target.name, "Value", e.target.value);
  };

// through this func. we are sending our book data to the mongodb 
  const sendRequest = async () => {
    await axios
    // here post() making http request to this end point http://localhost:5000/books
      .post("http://localhost:5000/books", {   // post(end_route/poitn , data )
        name: String(inputs.name),
        author: String(inputs.author),
        description: String(inputs.description),
        price: Number(inputs.price),
        image: String(inputs.image), // give input for image as like this ---> /upload_imgs/5.jpg   images are in public folder
        available: Boolean(checked),
      })
      .then((res) => res.data); // res.data this result will be stored in the database 
  };

// if we submit the form then below func. will cxecuted 
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs, checked); // all the inputs given to the book are displyed in the console 
    sendRequest().then(() => history("/books"));  // so  here we are navigating to the /books route after entering the bookinfo
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent={"center"}
        maxWidth={700}
        alignContent={"center"}
        alignSelf="center"
        marginLeft={"auto"}
        marginRight="auto"
        marginTop={10}
      >
        <FormLabel>Name</FormLabel>
        <TextField
          value={inputs.name}
          onChange={handleChange}
          margin="normal"
          fullWidth
          variant="outlined"
          name="name"
        />
        <FormLabel>Author</FormLabel>
        <TextField
          value={inputs.author}
          onChange={handleChange}
          margin="normal"
          fullWidth
          variant="outlined"
          name="author"
        />
        <FormLabel>Description</FormLabel>
        <TextField
          value={inputs.description}
          onChange={handleChange}
          margin="normal"
          fullWidth
          variant="outlined"
          name="description"
        />
        <FormLabel>Price</FormLabel>
        <TextField
          value={inputs.price}
          onChange={handleChange}
          type="number"
          margin="normal"
          fullWidth
          variant="outlined"
          name="price"
        />
        <FormLabel>Image</FormLabel>
        <TextField
          value={inputs.image}
          onChange={handleChange}
          margin="normal"
          fullWidth
          variant="outlined"
          name="image"
        />
        <FormControlLabel
          control={
            <Checkbox checked={checked} onChange={() => setChecked(!checked)} />
          }
          label="Available"
        />

        <Button variant="contained" type="submit">
          Add Book
        </Button>
      </Box>
    </form>
  );
};

export default AddBook;
