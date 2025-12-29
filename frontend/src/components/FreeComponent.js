import React, { useEffect, useState } from "react";
import axios from "axios";

export default function FreeComponent() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/free-endpoint");
        setMessage(response.data.message);
      } catch (error) {
        setError("An error occurred while fetching data.");
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-center">Free Component</h1>
      {error ? (
        <h3 className="text-center text-danger">{error}</h3>
      ) : (
        <h3 className="text-center">{message}</h3>
      )}
    </div>
  );
}
