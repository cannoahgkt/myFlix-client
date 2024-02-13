import React, { useState, useEffect } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { BookCard } from "../book-card/book-card";
import { BookView } from "../book-view/book-view";
import { LoginView } from "../login-view/login-view";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";

export const MainView = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null); // State for storing selected book
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("https://openlibrary.org/search.json?q=star+wars")
      .then((response) => response.json())
      .then((data) => {
        const booksFromApi = data.docs.map((doc) => {
          return {
            id: doc.key,
            title: doc.title,
            image: `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`,
            author: doc.author_name?.[0]
          };
        });

        setBooks(booksFromApi);
      });
  }, []);

  const handleLogin = (user) => {
    setUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // Function to handle selecting a book
  const handleBookSelect = (book) => {
    setSelectedBook(book);
  };

  return (
    <BrowserRouter>
      <Container>
        <Row className="justify-content-md-center">
          <Routes>
            <Route
              path="/signup"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <SignupView />
                    </Col>
                  )}
                </>

              }
            />
            <Route
              path="/login"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <LoginView onLoggedIn={(user) => setUser(user)} />
                    </Col>
                  )}
                </>

              }
            />
            <Route
              path="/books/:bookId"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : books.length === 0 ? (
                    <Col>The list is empty!</Col>
                  ) : (
                    <Col md={8}>
                      <BookView book={selectedBook} /> {/* Render BookView with selected book */}
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : books.length === 0 ? (
                    <Col>The list is empty!</Col>
                  ) : (
                    <>
                      {books.map((book) => (
                        <Col className="mb-4" key={book.id} md={3}>
                          <Link to={`/books/${book.id}`} onClick={() => handleBookSelect(book)}>
                            <BookCard book={book} />
                          </Link>
                        </Col>
                      ))}
                    </>
                  )}
                </>
              }
            />
          </Routes>
        </Row>
      </Container>
    </BrowserRouter>
  );
};
