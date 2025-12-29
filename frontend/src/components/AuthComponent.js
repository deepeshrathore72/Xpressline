import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

// get token generated on login
const token = cookies.get("TOKEN");

export default function AuthComponent() {
  // set an initial state for the message we will receive after the API call
  const [message, setMessage] = useState("");

  // useEffect automatically executes once the page is fully loaded
  useEffect(() => {
    const fetchData = async () => {
      try {
        // set configurations for the API call here
        const configuration = {
          method: "get",
          url: "https://nodejs-mongodb-auth-app.herokuapp.com/auth-endpoint",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // make the API call
        const result = await axios(configuration);
        // assign the message in our result to the message we initialized above
        setMessage(result.data.message);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // logout
  const logout = () => {
    // destroy the cookie
    cookies.remove("TOKEN", { path: "/" });
    // redirect user to the landing page
    window.location.href = "/";
  };

  return (
    <div className="text-center">
      <h1>Auth Component</h1>

      {/* displaying our message from our API call */}
      <h3 className="text-danger">{message}</h3>

      {/* logout */}
      <button type="submit" class="bg-green-700 text-white font-bold uppercase py-3 px-8 rounded-full w-full" onClick={logout}>Log Out</button>
    </div>
  );
}
