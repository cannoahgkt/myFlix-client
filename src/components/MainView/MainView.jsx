import React, { useState, useEffect } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { BookCard } from "../book-card/book-card";
import { BookView } from "../book-view/book-view";
import { LoginView } from "../login-view/login-view";
import { LogoutButton } from "../logout-button/logout-button";

export const MainView = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
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

  return (
    <Container> {/* content */}
      <Row>
        <Col>
          {!user ? (
            <LoginView onLoggedIn={handleLogin} />
          ) : (
            <>
              <LogoutButton onLogout={handleLogout} /> {/* Logout button render */}
              {selectedBook ? (
                <BookView
                  book={selectedBook}
                  onBackClick={() => setSelectedBook(null)}
                />
              ) : books.length === 0 ? (
                <div>The list is empty!</div>
              ) : (
                books.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onBookClick={(newSelectedBook) => {
                      setSelectedBook(newSelectedBook);
                    }}
                  />
                ))
              )}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};
