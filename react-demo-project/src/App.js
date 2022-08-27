import './App.css';
import Header from './shared/Header';
import Footer from './shared/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import jwt_decode from "jwt-decode";

import ProjectRouting from './Route/ProjectRouting';
import setJWTToken from './securityUtils/setJWTToken';
import store from './redux/store';
import { SET_CURRENT_USER } from './redux/action';

function App() {
  const jwtToken = localStorage.jwtToken;
  // alert('in app + ' + jwtToken)
  if (jwtToken) {
    setJWTToken(jwtToken);
    const decoded_jwtToken = jwt_decode(jwtToken);
    store.dispatch({
      type: SET_CURRENT_USER,
      payload: decoded_jwtToken
    });

  }
  return (
    <>
      <Header />
      <ProjectRouting />
      <Footer />
    </>
  );
}

export default App;
