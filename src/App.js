import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AddBook from "./components/AddBook";
import Books1 from "./components/Book/Books1"; // admin page 
import Books2 from "./components/Book/Books2"; // user page 
import About from "./components/About";
import BookDetail from "./components/Book/BookDetail";
import LoginForm from './components/Book/LoginForm';

function App() {
  return (
    <React.Fragment>
      <main>
        <Routes>
        {/*based on the front end route the corresponding page will loaded to the browser  */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/add" element={<AddBook />} />
          <Route path="/books" element={<Books1 />} />
          <Route path="/user_books" element={<Books2 />} />
          <Route path="/about" element={<About />} />
          <Route path="/books/:id" element={<BookDetail />} />
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;

