import styles from "../SearchBar/styles.module.css";
import searchIcon from "../../assets/icons/search-svgrepo-com.svg";
import { useNavigate, useLocation } from "react-router-dom";

export default function SearchBar({ searchTerm, setSearchTerm }) {
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const navigate = useNavigate();
  const location = useLocation();
  const navigateToHomePage = () => {
    if (location.pathname !== "/restaurants") {
      navigate("/restaurants");
    }
  };

  return (
    <div className={styles.searchBar}>
      <div className={styles.inputContainer}>
        <img className={styles.searchIcon} src={searchIcon} alt="" />
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          onClick={navigateToHomePage}
        />
      </div>
    </div>
  );
}
