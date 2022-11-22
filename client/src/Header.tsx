import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className='Header'>
      <a className='Header-link' href='/'><h2>Go to Decks</h2></a>
    </div>
  )
}

export default Header;