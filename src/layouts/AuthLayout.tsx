import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <>
      <h1>---Navbar---</h1>
      <Outlet />
    </>
  );
}
