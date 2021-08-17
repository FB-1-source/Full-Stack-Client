import React from "react";
import { Link } from "react-router-dom";
function PageNotFound() {
  return (
    <div className="errpage">
      <h1>Page Not Found :/</h1>
      <h3>
        Click here to return to Homepage <Link to="/">Home</Link>
      </h3>
    </div>
  );
}

export default PageNotFound;
