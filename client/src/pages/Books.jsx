import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const response = await fetch("http://localhost:8800/books");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        console.log(result);
        setBooks(result);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch("http://localhost:8800/books/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const updatedBooks = books.filter((book) => book.id !== id);
      setBooks(updatedBooks);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Discoring Books</h1>
      <div className="books">
        {books.map((book) => (
          <div className="book" key={book.id}>
            {book.cover && <img src={book.cover} alt="" />}
            <h2>{book.title}</h2>
            <p>{book.desc}</p>
            <span>{book.price}€</span>
            <button className="delete" onClick={() => handleDelete(book.id)}>
              Supprimer{" "}
            </button>
            <button className="update">
              <Link to={`/update/${book.id}`}>Modifier</Link>
            </button>
          </div>
        ))}
      </div>
      <button>
        <Link to="/add">Ajouter un nouveau livre</Link>
      </button>
    </div>
  );
};

export default Books;
