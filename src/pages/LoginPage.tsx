import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  function submitLogin(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      if (!email) {
        throw { message: "Email required" };
      }
      if (!password) {
        throw { message: "Password required" };
      }
      console.log(email, password);
    } catch (error) {
      console.log(error);
      toast.warning((error as Error).message);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-dvh w-full bg-blue-300">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login ke Stockify</CardTitle>
          <CardDescription>
            Masukkan email untuk masuk ke akun kamu.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submitLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  onChange={(e) => setEmail(e.target.value)}
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
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-10">
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Button variant="neutral" className="w-full">
                Login with Google
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
