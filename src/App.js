import { BrowserRouter as Router, NavLink, Routes, Route } from "react-router-dom";
import { FilmListPage} from './FilmListPage';
import { FilmSinglePage} from './FilmSinglePage';
import { FilmCreatePage} from './FilmCreatePage';
import { FilmModPage} from './FilmModPage';
import { FilmDelPage} from './FilmDelPage';
import './App.css';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to={'/'} className={({isActive}) => "nav-link" + (isActive ? "active" : "")}>
                <span className="nav-link">Filmek</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={'/uj-film'} className={({isActive}) => "nav-link" + (isActive ? "active" : "")}>
                <span className="nav-link">Új film</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/" exact element={<FilmListPage />} />
        <Route path="/film/:filmId" exact element={<FilmSinglePage />} />
        <Route path="/uj-film" exact element={<FilmCreatePage />} />
        <Route path="/mod-film/:filmId" exact element={<FilmModPage />}/>
        <Route path="/del-film/:filmId" exact element={<FilmDelPage />}/>
      </Routes>
    </Router>
  );
}

export default App;
