import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const submitHandler = async (event) => {
    event.preventDefault();
    if (msg !== "") {
      setIsLoading(true);
      let updateData = [...data];
      updateData.push({
        type: "user",
        message: msg,
      });
      setData(updateData);
      let res = await axios.post("http://localhost:5000/que", { msg });
      updateData.push({
        type: "AI",
        message: res?.data?.data,
      });
      setData(updateData);
      setMsg("");
      setIsLoading(false);
    }
  };
  return (
    <main className="container">
      <section id="messages__container">
        <div id="messages">
          {data.map((item) => (
            <>
              {item?.type === "user" ? (
                <div className="message__wrapper">
                  <div className="message__body">
                    <strong className="message__author__bot">
                      {item?.type}
                    </strong>
                    <p className="message__text">{item?.message}</p>
                  </div>
                </div>
              ) : (
                <div className="message__wrapper">
                  <div className="message__body">
                    <strong className="message__author">{item?.type}</strong>
                    <p className="message__text">{item?.message}</p>
                  </div>
                </div>
              )}
            </>
          ))}
        </div>

        <form id="message__form" onSubmit={submitHandler}>
          <input
            type="text"
            name="message"
            placeholder="Send a message...."
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            disabled={isLoading}
          />
        </form>
      </section>
    </main>
  );
}

export default App;
