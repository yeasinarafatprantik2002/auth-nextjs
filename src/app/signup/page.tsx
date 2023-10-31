"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios  from "axios";
import toast from "react-hot-toast";

const signup = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("signup success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("signup error", error.message);

      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className=" flex flex-col items-center justify-center min-h-screen">
      <h1>{loading ? "Processing" : "Signup"}</h1>
      <hr />
      <label htmlFor="username"> Username</label>
      <input
        className="p-2 border border-gray-500 rounded-md"
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />
      <label htmlFor="email"> Email</label>
      <input
        className="p-2 border border-gray-500 rounded-md"
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password"> Password</label>
      <input
        className="p-2 border border-gray-500 rounded-md"
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
        className="m-2 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        onClick={onSignup}>
        {buttonDisabled ? "No Signup" : "Signup"}
      </button>
      <Link href="/login">Visit Login Page</Link>
    </div>
  );
};

export default signup;
