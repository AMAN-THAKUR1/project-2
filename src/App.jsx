import Home from "./screens/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

// or less ideally
import { Button } from 'react-bootstrap';
function App() {
    return(
      <div><Home /></div>
    )
}

export default App
