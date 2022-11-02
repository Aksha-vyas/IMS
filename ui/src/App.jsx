import Page from "./components/Page.js";
import { HashRouter as Router } from 'react-router-dom';

const element = (
  <Router>
      <Page/>
  </Router>
)

ReactDOM.render(element, document.getElementById("main"));

//   /* Student Id : 8759314 */