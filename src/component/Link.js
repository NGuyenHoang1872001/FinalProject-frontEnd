import "../App.css";
import { Link as RouteLink } from "react-router-dom";
function Link({ name, path }) {
  return (
    <div class="linkCSS">
      <div>
        <li class="reduceDotLi">
          {path && <RouteLink to={path}>{name} </RouteLink>}
        </li>
      </div>
    </div>
  );
}

export default Link;
