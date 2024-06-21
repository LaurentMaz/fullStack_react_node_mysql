import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8800/books", {
        method: "POST",
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
      <h1>Ajouter un livre</h1>
      <input
        type="text"
        placeholder="titre"
        onChange={handleChange}
        name="title"
      />
      <input
        type="text"
        placeholder="desc"
        onChange={handleChange}
        name="desc"
      />
      <input
        type="number"
        placeholder="prix"
        onChange={handleChange}
        name="price"
      />
      <input
        type="text"
        placeholder="image"
        onChange={handleChange}
        name="cover"
      />
      <button className="formButton" onClick={handleClick}>
        Ajouter
      </button>
    </div>
  );
};

export default Add;
