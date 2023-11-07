import { Link } from "react-router-dom";
import "./Layout.css";
const Layout = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='game'>Create Game</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Layout;
