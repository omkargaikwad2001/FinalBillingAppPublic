import { useNavigate } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <h1 className="error-code">404</h1>
      <p className="error-message">Oops! The page you're looking for doesn't exist.</p>
      <button className="home-button" onClick={() => navigate("/")}>
        Go to Home
      </button>
    </div>
  );
};

export default NotFound;
