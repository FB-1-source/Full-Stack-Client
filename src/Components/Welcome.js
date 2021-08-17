import React from "react";
import { Link } from "react-router-dom";
import img1 from "../Images/IMG1.jpg";

function Welcome() {
  return (
    <div className="total">
      <div className="welcome">
        <div className="intro">
          <h1>Come see the latest sports take</h1>
          <div>SportyTalk is a platform to speak your mind.</div>
        </div>
        <div>
          <img className="img" src={img1} alt={img1}></img>
        </div>
      </div>
      <div className="info2">
        <h1>Make an account</h1>
        <i class="fas fa-arrow-right"></i>
        <i class="fas fa-arrow-down"></i>
        <h1>Create a post </h1>
        <i class="fas fa-arrow-right"></i>
        <i class="fas fa-arrow-down"></i>
        <h1>Talk with friends</h1>
      </div>
      <div className="info3">
        <h1>Why SportyTalk?</h1>
        <div>
          We cover a wide range of sports and feel fans should have a place to
          voice their opinions.{" "}
        </div>
        <Link to="/register">
          <button className="btn3">
            Join Now <i class="fas fa-arrow-right"></i>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Welcome;
