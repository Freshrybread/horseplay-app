import { Link } from 'react-router-dom';
import './Header.css';

export const Header = ({ isLoggedIn, isAdmin }) => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    props.setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div className="header">
      <Link to="profile">
        <img
          id="logo"
          src="https://www.freeiconspng.com/uploads/white-horse-png-23.png"
          width="50"
          alt="Horse Logo Image"
        />
      </Link>
      <h1 className="header" id="banner">
        Welcome to HorsePlay!
      </h1>

      {isLoggedIn ? (
        <>
          <nav className="header">
            {isAdmin ? (
              <Link id="links" to="admin">
                admin
              </Link>
            ) : null}
            <Link id="links" to="products">
              products
            </Link>
            <Link id="links" to="orders">
              cart
            </Link>
            <Link id="links" to="profile">
              profile
            </Link>
            <Link id="links" to="/" onClick={handleLogout}>
              logout
            </Link>
          </nav>
        </>
      ) : (
        <>
          <nav className="header">
            <Link id="links" to="products">
              products
            </Link>
            <Link id="links" to="guestorders">
              cart
            </Link>
            <Link id="links" to="register">
              register
            </Link>
            <Link id="links" to="login">
              login
            </Link>
          </nav>
        </>
      )}
    </div>
  );
};
