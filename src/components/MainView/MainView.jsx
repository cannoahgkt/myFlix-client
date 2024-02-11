import React, { useState, useEffect } from "react";
import { BookCard } from "../book-card/book-card";
import { BookView } from "../book-view/book-view";
import { LoginView } from "../login-view/login-view";
import { LogoutButton } from "../logout-button/logout-button"; // Import the logout button component

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
    // Clear user session (e.g., remove token from localStorage)
    localStorage.removeItem("token");
    setUser(null);
  };

  if (!user) {
    return <LoginView onLoggedIn={handleLogin} />;
  }

  if (selectedBook) {
    return (
      <div>
        <LogoutButton onLogout={handleLogout} /> {/* Render the logout button */}
        <BookView book={selectedBook} onBackClick={() => setSelectedBook(null)} />
      </div>
    );
  }

  if (books.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      <LogoutButton onLogout={handleLogout} /> {/* Render the logout button */}
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onBookClick={(newSelectedBook) => {
            setSelectedBook(newSelectedBook);
          }}
        />
      ))}
    </div>
  );
};
