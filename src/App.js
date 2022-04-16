import "./App.css";
import Card from "./MovieCard";
import { useEffect, useState } from "react";
import { render } from "@testing-library/react";

function App() {
  // 47515a8f812b3465cca675d19c62cb4a
  const URL = `https://api.themoviedb.org/3/search/movie?api_key=47515a8f812b3465cca675d19c62cb4a&language=en-US&include_adult=false&query=thor`;
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);
  const moviesList = items.results;
  console.log(moviesList);
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    moviesList.map((item) => {
      console.log(item.original_title);
      console.log(item.overview);
      return (
        <div key={item.id}>
          <h1>{item.original_title}</h1>
          <p>{item.overview}</p>
        </div>
      );
    });
  }
}

export default App;
