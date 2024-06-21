import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: "",
    cover: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const bookId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8800/books/" + bookId);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        console.log("Fetched book data: ", result); // Ajout de logs pour vérifier les données reçues
        setBook(result[0]);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, []);

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8800/books/" + bookId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      navigate("/");
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form">
      <h1>Modifier</h1>
      <input
        type="text"
        placeholder="titre"
        onChange={handleChange}
        name="title"
        value={book.title}
      />
      <input
        type="text"
        placeholder="desc"
        onChange={handleChange}
        name="desc"
        value={book.desc}
      />
      <input
        type="number"
        placeholder="prix"
        onChange={handleChange}
        name="price"
        value={book.price}
      />
      <input
        type="text"
        placeholder="image"
        onChange={handleChange}
        name="cover"
        value={book.cover}
      />
      <button className="formButton" onClick={handleClick}>
        Modifier
      </button>
    </div>
  );
};

export default Update;
