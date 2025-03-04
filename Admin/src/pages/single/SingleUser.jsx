import React from "react";
import { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import List from "../../components/list/List";
import "./single.scss";
import { useParams } from "react-router-dom";

const SingleUser = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    phoneNumber: "",
    uniqueId: "",
  });

  console.log(userId);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/user/getUserById",
          {
            headers: {
              id: userId,
            },
          }
        );
        setUser(response.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    getData();
  }, [userId]);
  console.log(user);
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <h1 className="title">Information</h1>

            <div className="item">
              {/* <img src="/assets/person.jpg" alt="" className="itemImg" /> */}

              <div className="details">
                <h1 className="itemTitle">{user.name}</h1>
                <div className="detailItem">
                  <span className="itemkey">Email: </span>
                  <span className="itemValue">{user.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemkey">Phone: </span>
                  <span className="itemValue">{user.phoneNumber}</span>
                </div>
                <div className="detailItem">
                  <span className="itemkey">UniqueId: </span>
                  <span className="itemValue">{user.uniqueId}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <List userId={user.id} />
        </div>
      </div>
    </div>
  );
};

export default SingleUser;
