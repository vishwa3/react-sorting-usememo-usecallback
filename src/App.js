import React, { useState, useEffect, useMemo, useCallback } from "react";
import "./App.css";

// https://jsonplaceholder.typicode.com/users

export default function App() {
  const [users, setUsers] = useState([]);
  const [sortOrder, setSortOrder] = useState(true);
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    async function getUsers() {
      const users = await fetch("https://jsonplaceholder.typicode.com/users");
      const jsonUsers = await users.json();
      setUsers(jsonUsers);
    }
    getUsers();
  }, []);

  /* function sortNames(sortBy, sortOrder) {
    let sortedArray;
    if (sortOrder)
      sortedArray = [...users].sort(
        (a, b) => (a[sortBy] > b[sortBy]) - (a[sortBy] < b[sortBy])
      );
    else
      sortedArray = [...users].sort(
        (a, b) => (a[sortBy] < b[sortBy]) - (a[[sortBy]] > b[sortBy])
      );
    return sortedArray;
  } */

  const sortNames = useCallback(
    (sortBy, sortOrder) => {
      let sortedArray;
      if (sortOrder)
        sortedArray = [...users].sort(
          (a, b) => (a[sortBy] > b[sortBy]) - (a[sortBy] < b[sortBy])
        );
      else
        sortedArray = [...users].sort(
          (a, b) => (a[sortBy] < b[sortBy]) - (a[[sortBy]] > b[sortBy])
        );
      return sortedArray;
    },
    [users]
  );

  const sortedArray = useMemo(() => {
    return sortNames(sortBy, sortOrder);
  }, [sortBy, sortOrder, sortNames]);

  return (
    <div>
      <button onClick={() => setSortOrder((sortOrder) => !sortOrder)}>
        Sort <span>{sortOrder ? "Descending" : "Ascending"}</span>
      </button>
      <button onClick={() => setSortBy("name")} style={{ marginLeft: "5px" }}>
        Sort by name
      </button>
      <button onClick={() => setSortBy("email")} style={{ marginLeft: "5px" }}>
        Sort by email
      </button>
      {sortedArray.map((user) => {
        return (
          <ul key={user.id}>
            <li>{user.name}</li>
            <li>{user.email}</li>
            <li>{`${user.address.suite}, ${user.address.street}, ${user.address.city}, ${user.address.zipcode}`}</li>
          </ul>
        );
      })}
    </div>
  );
}
