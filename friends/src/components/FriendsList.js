import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

function FriendsList(props) {
  const [newFriend, setNewFriend] = useState({
    name: "",
    age: "",
    email: ""
  });

  const [friends, setFriends] = useState();

  function handleChange(e) {
    console.log(e);
    setNewFriend({
      ...newFriend,
      [e.target.name]: e.target.value
    });
    console.log(newFriend);
  }

  useEffect(() => {
    axiosWithAuth()
      .get("/friends")
      .then(res => {
        // localStorage.setItem("token", res.data.payload);
        // // redirect to the apps main page?
        // props.history.push("/protected");
        setFriends(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  console.log(friends);

  function addNewFriend(e) {
    e.preventDefault();
    console.log(newFriend);
    // axiosWithAuth ==> ?? an axios instance; .post() ==> ?? promise
    axiosWithAuth()
      .post("/friends", newFriend)
      .then(res => {
        // localStorage.setItem("token", res.data.payload);
        // // redirect to the apps main page?
        // props.history.push("/protected");
        setNewFriend({
          name: "",
          age: "",
          email: ""
        });
        setFriends(res.data);
      })
      .catch(err => console.log(err));
  }

  function displayFriends() {}

  return (
    <div>
      <form onSubmit={addNewFriend}>
        <input
          type="text"
          name="name"
          value={newFriend.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="email"
          value={newFriend.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="age"
          value={newFriend.age}
          onChange={handleChange}
        />
        <button>Add New Friend</button>
      </form>
      <div>
        {friends !== undefined ? (
          friends.map(friend => {
            console.log(friend);
            return (
              <div>
                <h3>Name: {friend.name}</h3>
                <h3>Age: {friend.age}</h3>
                <h3>Email: {friend.email}</h3>
              </div>
            );
          })
        ) : (
          <h1>Loading Friends</h1>
        )}
      </div>
    </div>
  );
}

export default FriendsList;