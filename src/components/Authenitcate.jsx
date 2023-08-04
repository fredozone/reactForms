import { useState } from "react";
const Authenitcate = ({ token }) => {
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  async function handleClick() {
    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      setSuccessMessage(result.message);
      localStorage.removeItem("message");
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <>
      <h3 className="title">Authenticate</h3>
      {successMessage && successMessage !== "jwt malformed" && (
        <p className="good">{successMessage}</p>
      )}
      {error && <p className="error">{error}</p>}
      <button className="button-authenticate" onClick={handleClick}>
        Authenticate Token!
      </button>
    </>
  );
};

export default Authenitcate;
