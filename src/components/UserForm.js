import React, { useEffect, useState } from "react"; 

const UserForm = ({handleSubmitData, selectedUser, btnText}) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
  });
  const { username, email } = user;

  // select user update in form show
  useEffect(() => {
    setUser({
      username: selectedUser.username,
      email: selectedUser.email
    })
  }, [selectedUser]);

  const handleChange = (e) => {
      const selectedField = e.target.name;
      const selectedValue = e.target.value;

      setUser(preState => {
          return {...preState, [selectedField]: selectedValue}
      })
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      handleSubmitData(user);
      setUser({
        username: "",
        email: "",
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">username</label>
        <input
          type="text"
          id="username"
          onChange={handleChange}
          required
          value={username}
          name="username"
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          onChange={handleChange}
          required
          value={email}
          name="email"
        />
      </div>
      <button type="submit" className="btn">{btnText}</button>
    </form>
  );
};

UserForm.defaultProps = {
  selectedUser: {
    username: '', 
    email: ''
  }
};

export default UserForm;
