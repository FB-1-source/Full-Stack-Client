import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import moment from "moment";
import { Authcontext } from "../Authcheck/Authcontext";
import axios from "axios";

function Postinfo() {
  let { id } = useParams();
  const [postdeats, setpostdeats] = useState("");
  const [comments, setcomments] = useState([]);
  const [commentval, setcommentval] = useState("");
  const { Authstate } = useContext(Authcontext);
  useEffect(() => {
    Axios.get(`http://localhost:3001/posts/id/${id}`).then((response) => {
      setpostdeats(response.data);
    });

    Axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setcomments(response.data);
    });
  }, []);

  const addComment = () => {
    Axios.post(
      "http://localhost:3001/comments",
      { commentBody: commentval, PostId: id },
      {
        headers: { accessToken: localStorage.getItem("accessToken") },
      }
    ).then((response) => {
      if (response.data.error) {
        console.log(response.data);
      } else {
        const addComm = {
          commentBody: commentval,
          username: response.data.username,
          id: response.data.id,
        };
        setcomments([...comments, addComm]);
        setcommentval("");
      }
    });
  };

  const deleteComment = (id) => {
    axios
      .delete(`http://localhost:3001/comments/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        setcomments(
          comments.filter((val) => {
            return val.id !== id;
          })
        );
      });
  };

  return (
    <div className="details">
      <div className="posts2">
        <div className="info">
          <i class="fas fa-user-circle"></i>
          <div className="user">
            <b>{postdeats.username}</b>
          </div>
        </div>
        <div className="title">{postdeats.title}</div>
        <div className="text">{postdeats.textOfPost}</div>
        <div className="date">
          {moment(postdeats.createdAt).format(" h:mm a - MMMM Do YYYY")}
        </div>
      </div>
      <div className="cmt">
        <input
          placeholder="Add a Comment"
          value={commentval}
          onChange={(event) => {
            setcommentval(event.target.value);
          }}
        ></input>
        <button
          className="cmtbttn"
          onClick={() => {
            addComment();
          }}
        >
          Post
        </button>
        <div>
          {comments.map((comment, key) => {
            return (
              <div key={key}>
                {" "}
                <div className="cmtsec">
                  {comment.commentBody}
                  <div className="rmv">
                    {Authstate.username === comment.username && (
                      <button
                        onClick={() => {
                          deleteComment(comment.id);
                        }}
                        className="comt"
                      >
                        x
                      </button>
                    )}
                    <label>{"user: " + comment.username}</label>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Postinfo;
