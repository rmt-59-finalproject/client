import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { http } from "@/helpers/axios";
import axios from "axios";
import { useAppDispatch } from "@/hooks/useRedux";
import { setUser } from "@/redux/slice/USER";
import { useAnimation } from "@/contexts/animation-context";
import InputUsername from "@/components/login/InputUsername";
import InputPassword from "@/components/login/InputPassword";
import AnimatedCharacter from "@/components/login/AnimatedCharacter";

export default function LoginPage() {
  const { username, setUsername, setPassword, password } = useAnimation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const role = sessionStorage.getItem("role");

    if (role === "warehouse") {
      navigate("/dashboard");
    } else if (role === "driver" || role === "outlet") {
      navigate(`/${role}`);
    }
  }, []);

  async function submitLogin(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();

      const {
        data: {
          message,
          data: { name, role, username: dbUsername },
        },
      } = await http({
        url: "/login",
        method: "POST",
        data: {
          username,
          password,
        },
      });

      toast.success(message);
      sessionStorage.setItem("username", dbUsername);
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("role", role);

      dispatch(setUser({ name, role, username: dbUsername }));

      if (role === "warehouse") {
        navigate("/warehouse/dashboard");
      } else if (role === "driver" || role === "outlet") {
        navigate(`/${role}`);
      }

      setUsername("");
      setPassword("");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.warning(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
        console.error(error);
      }
    }
  }

  return (
    <div className="font-[family-name:Montserrat] bg-[url('data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2032%2032%27%20width=%2732%27%20height=%2732%27%20fill=%27none%27%20stroke=%27rgb(0%200%200%20/%200.2)%27%3e%3cpath%20d=%27M0%20.5H31.5V32%27/%3e%3c/svg%3e')] flex flex-col justify-center items-center min-h-dvh w-full bg-gray-100">
      <Card className="w-full max-w-sm z-10">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            <AnimatedCharacter />
            STOCKIFY
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submitLogin}>
            <div className="flex flex-col gap-6">
              <InputUsername />
              <InputPassword />
              <Button type="submit" className="w-full font-bold">
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
