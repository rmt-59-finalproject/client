import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function LoginPage() {
  const navigate = useNavigate();
  useEffect(() => {
    checkTokenOnLocalStorage();
  }, []);
  function checkTokenOnLocalStorage() {
    const token = localStorage.getItem("Authorization");
    if (token) {
      console.log("ada token di localStorage");
      navigate("/dashboard"); //contoh
    }

    console.log("tidak ada token di localStorage");
  }
  return (
    <div>
      <h1>Hello Login</h1>
      <Button>I'm button</Button>
    </div>
  );
}
