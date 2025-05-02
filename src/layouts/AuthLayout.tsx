// import Navbar from "@/components/Navbar";
import { useEffect } from "react";
import { Outlet } from "react-router";

export default function AuthLayout() {
  useEffect(() => {
    guardLogin();
  }, []);
  function guardLogin() {
    const token = localStorage.getItem("Authorization");
    if (!token) {
      console.log("Token di localstorage tidak ada");
    }
  }
  return (
    <>
      <div className="flex flex-col bg-gray-200 min-h-dvh w-full">
        <h1>Navbar</h1>
        <Outlet />
      </div>
    </>
  );
}
