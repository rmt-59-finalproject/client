import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { http } from "@/helpers/axios";
import axios from "axios";

interface User {
  username: string;
  password: string;
}

export default function LoginPage() {
  const [user, setUser] = useState<User>({
    username: "",
    password: "",
  });
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
          data: { name, role, username },
        },
      } = await http({
        url: "/login",
        method: "POST",
        data: user,
        withCredentials: true,
      });

      toast.success(message);
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("role", role);

      if (role === "warehouse") {
        navigate("/dashboard");
      } else if (role === "driver" || role === "outlet") {
        navigate(`/${role}`);
      }
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
    <div className="font-[family-name:Space_Mono] bg-[url('data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2032%2032%27%20width=%2732%27%20height=%2732%27%20fill=%27none%27%20stroke=%27rgb(0%200%200%20/%200.2)%27%3e%3cpath%20d=%27M0%20.5H31.5V32%27/%3e%3c/svg%3e')] flex flex-col justify-center items-center min-h-dvh w-full bg-gray-100">
      <Card className="w-full max-w-sm z-10">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            STOCKIFY
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submitLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="johndoe"
                  onChange={(e) =>
                    setUser((prev) => ({ ...prev, username: e.target.value }))
                  }
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="******"
                  onChange={(e) =>
                    setUser((prev) => ({ ...prev, password: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-10">
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
