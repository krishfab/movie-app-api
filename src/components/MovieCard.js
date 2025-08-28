import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movies/${movie._id}`); // redirect to movie details page
  };

  return (
    <div
      className="movie-card"
      onClick={handleClick}
      style={{ width: "150px", cursor: "pointer" }}
    >
      <img
        src={movie.thumbnail}
        alt={movie.title}
        style={{
          width: "100%",
          height: "225px",
          objectFit: "cover",
          borderRadius: "10px",
        }}
      />
      <h4 className="trending-item-title" style={{ color: "#fff" }}>{movie.title}</h4>
    </div>
  );
};

export default MovieCard;

