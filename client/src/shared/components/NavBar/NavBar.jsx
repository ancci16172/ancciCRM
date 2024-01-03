import { Link, useNavigate } from "react-router-dom";
import styles from "./NavBar.module.css";
import { useAuth } from "../../../auth/context/AuthContext.jsx";
function NavBar() {
  const { logout, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  return (
    <nav
      className={styles["navbar--main"] + " flex justify-between items-center"}
    >
      {isAuthenticated && (
        <div className={styles["navbar--main__left"] + " flex items-center"}>
          <span className={styles["navbar--main__left__circle"]}></span>
          <span className="ml-2.5">{user.username}</span>
        </div>
      )}

      <span
        className={
          styles["navbar--main__center"] + " justify-self-center mx-auto"
        }
        onClick={() => isAuthenticated && navigate("/dashboard")}
      >
        Ancci CRM
      </span>

      {isAuthenticated && (
        <Link
          className={styles["navbar--main__cerrar-sesion"]}
          onClick={() => logout()}
        >
          Cerrar sesion
        </Link>
      )}
    </nav>
  );
}

export default NavBar;
