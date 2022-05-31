import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import UserForm from "./components/UserForm";

const URL = "https://rest-api-without-db.herokuapp.com/users/";

function App() {
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  /// update state
  const [selectedUser, setSelectedUser] = useState({
    username: "",
    email: "",
  });
  const [upadteFlag, setUpdateFlag] = useState(false);
  // put by using id
  const [selectedUserId, setSelectedUserId] = useState('')

  // get Api data
  const getAllUsers = () => {
    fetch(URL)
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not fetch");
        }
        return res.json();
      })
      .then((data) => {
        setUsers(data.users);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // useEffect hook
  useEffect(() => {
    getAllUsers();
  }, []);

  // delete user
  const handleDelete = (id) => {
    fetch(URL + `/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not delete");
        }
        getAllUsers();
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  // Add user button
  const addUser = (user) => {
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.status === 201) {
          getAllUsers();
        } else {
          throw new Error("Could not create new user");
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  // update handler
  const handleEdit = (id) => {
    setSelectedUserId(id);
    setUpdateFlag(true);
    const filteredData = users.filter((user) => user.id === id);
    setSelectedUser({
      username: filteredData[0].username,
      email: filteredData[0].email,
    });
  };

  // handle update
  const handleUpdate = (user) => {
    fetch(URL + `/${selectedUserId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("update user failed");
        }  
        getAllUsers();
        setUpdateFlag(false);
      })
      .catch((err) => {
        setError(err.message);
      });
  }


  return (
    <div className="App">
      <h1>User Management App</h1>

      {upadteFlag ? (
        <UserForm btnText="Update User" handleSubmitData={handleUpdate} selectedUser={selectedUser} />
      ) : (
        <UserForm btnText="Add User" handleSubmitData={addUser} />
      )}

      {isLoading && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}
      <section>
        {users &&
          users.map((user) => {
            const { id, username, email } = user;
            return (
              <article key={id} className="card">
                <h2>{username}</h2>
                <h2>{email}</h2>
                <button
                  className="btn"
                  onClick={() => {
                    handleEdit(id);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn"
                  onClick={() => {
                    handleDelete(id);
                  }}
                >
                  Delete
                </button>
              </article>
            );
          })}
      </section>
    </div>
  );
}

export default App;
