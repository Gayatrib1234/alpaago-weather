  import React, { useState, useEffect } from "react";
  import { initializeApp } from "firebase/app";
  import { getFirestore, collection, getDocs, where, query } from "firebase/firestore";
  import { getAuth, onAuthStateChanged } from "firebase/auth";

  import { firebaseConfig } from "./firebase";

  const UserTable = () => {
    const [user, setUser] = useState(null); // State to hold the authenticated user data
    const [users, setUsers] = useState([]); // State to hold active users data

    useEffect(() => {
      // Initialize Firebase app
      const app = initializeApp(firebaseConfig);
      const auth = getAuth(app);

      // Listen for authentication state changes
      const unsubscribe = onAuthStateChanged(auth, (authUser) => {
        if (authUser) {
          // If user is authenticated, set the authenticated user
          setUser(authUser);
          // console.log(authUser);
          // Fetch active users
          fetchUsers();
        } else {
          // If no user is authenticated, clear user data
          setUser(null);
          setUsers([]);
        }
      });

      return () => unsubscribe(); // Unsubscribe from the authentication state listener on component unmount
    }, []);

    const fetchUsers = async () => {
      try {
        // Get Firestore instance
        const firestore = getFirestore();
    
        // Create a query to get all active users
        const q = query(collection(firestore, "users"), where("active", "==", true));
        const querySnapshot = await getDocs(q);
    
        // Extract data from the snapshot
        const usersData = querySnapshot.docs.map((doc) => doc.data());
        // console.log(usersData);
    
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    return (
      <div className="table">
        <h2>Active Users</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              {/* <th>Role</th> */}
            </tr>
          </thead>
          <tbody>
            {/* Render authenticated user separately */}
            {user && (
              <tr key={user.uid}>
                <td>{user.displayName || "testuser" || user.email}</td>
                <td>{user.email}</td>
                {/* <td>* Assuming you have a role for the authenticated user }</td> */}
              </tr>
            )}
            {/* Render other active users */}
            {users.map((user, index) => (
              <tr key={user.id || index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                {/* <td>{user.role}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  export default UserTable;
