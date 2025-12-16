import { Link } from "react-router-dom";
import "./LinkBtn.css";

function LinkButton({to, text}) {

  return (
    <Link className="btn" to={to}>
      {text}
    </Link>
  )
}

export default LinkButton;