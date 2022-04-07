import './Header.scss'
import { Link } from 'react-router-dom';

function Header() {
  return (
<>
<div className="Header">
  <div className='container header-info'>
    <div className='logo'>
      <Link to={"/"} className= 'logo-link'>CredoHouse</Link>
      </div>
     <nav className='header-nav'>
    <ul className='d-flex nav-list'>
      <li><Link to="/" className ='item-link'>Home</Link></li>
      <li><Link to="/admin" className ='item-link'>Admin</Link></li>
      <li><button>+998 00 000 00 00</button></li>
    </ul>
    </nav>
    </div>
  </div>
</>
  );
}

export default Header;