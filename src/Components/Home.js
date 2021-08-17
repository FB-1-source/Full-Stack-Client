import { useEffect, useState, useContext } from "react";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { Authcontext } from "../Authcheck/Authcontext";
import axios from "axios";

function Home() {
  const [datalist, setdatalist] = useState([]);
  const { Authstate } = useContext(Authcontext);
  let history = useHistory();

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setdatalist(response.data);
    });
  }, []);

  return (
    <div>
      {Authstate.status ? (
        <div className="Main">
          <div className="showname"> {"Welcome " + Authstate.username}</div>
          {datalist.map((val, key) => {
            return (
              <div
                onClick={() => {
                  history.push(`/post/${val.id}`);
                }}
                key={key}
                className="posts"
              >
                <div className="info">
                  <i class="fas fa-user-circle"></i>
                  <div className="user">
                    <b>{val.username}</b>
                  </div>
                </div>
                <div className="title">{val.title}</div>
                <div className="text">{val.textOfPost}</div>
                <div className="date">
                  {moment(val.createdAt).format(" h:mm a - MMMM Do YYYY")}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="newlog">
          {" "}
          Sorry, you need to login in order to access this page
        </div>
      )}
    </div>
  );
}

export default Home;
