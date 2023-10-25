import React, { useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

import { LoginPage } from "./pages/LoginPage";
import { PeoplePage } from "./pages/PeoplePage";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { actions } from "./features/PeopleSlice";


import "@fortawesome/fontawesome-free/css/all.min.css";
import "./styles.scss";
import { useLocalStorage } from "./utils/useLocalStorage";


function App() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.people.activatedUser);
  const [, setUser] = useLocalStorage<string>('user', '');

  useEffect(() => {
    console.log("User value:", user);
    if (!user) {
      navigate('/login')
    } else {
      navigate('/')
    }
  }, [navigate, user]);

  return (
    <>
      <nav
        className="navbar has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {user ? (
                <button
                  className="button is-light has-text-weight-bold"
                  onClick={() => {
                    dispatch(actions.setActivatedUser(''))
                    navigate('/login');
                    setUser('');
                  }}
                >
                  Log out
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="button is-success has-text-weight-bold"
                  >
                    {!user ? 'Log in' : 'LogOut'}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main>
        <section className="section">
          <Routes>
            <Route path="login" element={<LoginPage />} />
            <Route path="/" element={<PeoplePage />} />
          </Routes>
        </section>
      </main>
    </>
  );
}

export default App;
