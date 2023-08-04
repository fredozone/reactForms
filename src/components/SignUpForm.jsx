import { useState } from "react";
import { useForm } from "react-hook-form";
window.addEventListener("beforeunload", function () {
  // Clear the localStorage item when the window is closed or refreshed
  localStorage.removeItem("message");
});
const SignUpForm = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(event) {
    console.log(event);
    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        {
          method: "POST",
          body: JSON.stringify({ username, password }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const result = await response.json();
      setToken(result.token);
      console.log(result.message);
      localStorage.setItem("message", result.message);
    } catch (error) {
      setError(error);
    }
  }
  const handleUsernameChange = async (e) => {
    setUsername(e.target.value);
    await trigger("username"); // Manually trigger validation for "username" field
  };

  const message = localStorage.getItem("message");
  return (
    <>
      <h2 className="title">Sign Up</h2>
      {error && <p>{error}</p>}
      {message !== "" ? <p>{message}</p> : ""}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-imputs">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            {...register("username", {
              required: "Required",
              minLength: {
                value: 8,
                message: "Min Length is 8",
              },
              maxLength: {
                value: 30,
                message: "Max Length is 30",
              },
            })}
            id="username"
            value={username}
            aria-invalid={errors.username ? "true" : "false"}
            onChange={handleUsernameChange}
          />
          <p className="error" role="alert">
            {errors.username?.message}
          </p>
        </div>
        <div className="form-imputs">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register("password", { required: "Required" })}
            id="password"
            value={password}
            aria-invalid={errors.password ? "true" : "false"}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="error" role="alert">
            {errors.password?.message}
          </p>
        </div>

        <button type="submit" value="Submit" className="button-submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default SignUpForm;
