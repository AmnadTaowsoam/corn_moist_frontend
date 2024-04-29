// UsersPage.client.jsx
"use client";
import React, { useEffect, useState } from 'react';
import "@fortawesome/fontawesome-free/css/all.min.css";

async function fetchUsers() {
  const apiUrl = process.env.NEXT_PUBLIC_APIGATEWAY_URL;
  try {
    const response = await fetch(`${apiUrl}/users/user`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log('data-respond :',response)
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch users:", error);
    // Handle or throw the error accordingly
    throw error;
  }
}

const deleteUser = async (userId, setUsers) => {
  console.log("Received user ID for deletion:", userId); // Check what ID is received

  if (!userId) {
    console.error("Delete request aborted: No user ID provided.");
    return;
  }

  const apiUrl = process.env.NEXT_PUBLIC_APIGATEWAY_URL;
  try {
    const response = await fetch(`${apiUrl}/users/user/${userId}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    console.log("User deleted successfully:", userId);
    setUsers(await fetchUsers()); // Refresh the list after delete
  } catch (error) {
    console.error("Failed to delete user:", error);
  }
};

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  console.log(users); // See the full user object
  console.log(users.roles); // Specifically check what roles looks like

  useEffect(() => {
    fetchUsers().then(setUsers).catch(e => {
      console.error('Error fetching users:', e);
      setError(e.message || "Failed to fetch users");
    });
  }, []);

  return (
    <div className="overflow-x-auto container mx-auto p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <table className="table table-zebra text-center">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Roles</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.user_id}>
                <td>{user.user_id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.roles ? (Array.isArray(user.roles) ? user.roles.join(', ') : user.roles) : 'No assigned roles'}</td>
                <button 
                  onClick={() => deleteUser(user.user_id, setUsers)} 
                  className=" m-4 text-red-500 hover:text-red-700">
                  <i className="fas fa-trash-alt"></i>
                  </button>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UsersPage;
