"use client";
import React from "react";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const userProfile = ({ params }: any) => {
  const router = useRouter();
  const [data, setData] = React.useState<any>("Nothing");
  const logOut = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout success");
      router.push("/login");
    } catch (error: any) {
      console.log("logout error", error.message);
      toast.error(error.message);
    }
  };
  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data);
  };
  React.useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className=" flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p className=" text-4xl mt-4">
        Profile page{" "}
        <span className=" p-2 rounded bg-orange-500">
          {data ? data.username : "Nothing"}
        </span>
      </p>
      <hr />
      <button
        onClick={logOut}
        className=" bg-blue-500 mt-6 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Logout
      </button>
      {/* <button
        onClick={getUserDetails}
        className=" bg-green-500 mt-6 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Get User
      </button> */}
    </div>
  );
};

export default userProfile;
