import { useState, useEffect } from "react";
import { getUsers, deleteUser, editUser } from "../Service/api";
import {useNavigate} from 'react-router-dom';
import { Button } from "@material-ui/core";
import axios from 'axios';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  let email = []
  const navigate = useNavigate();


  useEffect(() => {
    getAllUsers();
    
  }, []);

  const falseChange = () => {
    users.map(async (user) => {
      await editUser(user._id, { status: false });
    });
    console.log("false", users);
  };
  const onValueChange = async (e) => {
    if (e.target.checked) {
      await editUser(e.target.value, { status: true });
    } else {
      await editUser(e.target.value, { status: false });
    }
    getAllUsers();
  };

  const SelectUser = () => {
      console.log(users)
    users.forEach((user) => {
      if (user.status) {
        email.push(user)
      }
    });
    console.log("mail", email);
     falseChange();
     handleSend()
    window.alert("email sent successfully")
  };

  const handleSend = async () => {
    console.log("EEEEEE", email.length);
    try {
        await axios.post("/send_mail", {
           email
        })
    } catch (error) {
        console.error(error)
    }
  }

  const getAllUsers = async () => {
    let response = await getUsers();
    setUsers(response.data);
  };

  const DeleteUser = async (id) => {
    const response = await deleteUser(id);
    getAllUsers();
  };

  return (
    <div
      className="home-container container mt-4 animate__animated animate__fadeIn animate__slow"
      style={{ marginBottom: "50px" }}
    >
      <div className="row">
        <h1 className="text-center">ALL List</h1>
      </div>
      <div className="row">
        <div className="col">
          <table className="customers-table table table-dark table-striped table-bordered border-dark mt-4">
            <thead className="text-center fs-6">
              <tr>
                <th>select</th>
                <th>Id</th>
                <th>Email</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Hobbies</th>
                <th>Delete Button</th>
              </tr>
            </thead>
            <tbody className="text-center fs-6">
              {users.map((user) => (
                <tr key={user._id}>
                  <td>
                    <input
                      type="checkbox"
                      onChange={(e) => onValueChange(e)}
                      value={user._id}
                    />
                  </td>
                  <td>{user._id}</td>
                  <td>{user.employee_email}</td>
                  <td>{user.employee_name}</td>
                  <td>{user.employee_phone}</td>
                  <td>{user.employee_hobbies}</td>
                  <td>
                    <Button
                      color="primary"
                      variant="contained"
                      style={{ marginRight: 10 }}
                      onClick={() => DeleteUser(user._id)}
                    >
                      Delete user
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Button
            color="primary"
            variant="contained"
            style={{ marginRight: 10 }}
            onClick={() => SelectUser()}
          >
            Send Email
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
