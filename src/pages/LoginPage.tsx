"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { http } from "@/helpers/axios";
import axios from "axios";
import { useAnimation } from "@/contexts/animation-context";
import AnimatedCharacter from "@/components/AnimatedCharacter";
import { useAppDispatch } from "@/hooks/useRedux";
import { setUser } from "@/redux/slice/USER";

export default function LoginPage() {
  const {
    username,
    setUsername,
    usernameInputRef,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    setActiveElement,
    resetFace,
    calculateFaceMove,
  } = useAnimation();
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
        withCredentials: true,
      });

      toast.success(message);
      sessionStorage.setItem("username", dbUsername);
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("role", role);

      dispatch(setUser({ name, role, username: dbUsername }));

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
            {/* <AnimatedCharacter /> */}
            STOCKIFY
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submitLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <input
                  ref={usernameInputRef}
                  className="flex h-10 w-full rounded-base border-2 border-border bg-secondary-background selection:bg-main selection:text-main-foreground px-3 py-2 text-sm font-base text-foreground file:border-0 file:bg-transparent file:text-sm file:font-heading placeholder:text-foreground/50 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  id="loginUsername"
                  placeholder="johndoe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => {
                    setActiveElement("username");
                    // Add a small delay before calculating face movement
                    setTimeout(() => {
                      calculateFaceMove();
                    }, 100);
                  }}
                  onBlur={(e) => {
                    setTimeout(() => {
                      if (e.target.value === "") {
                        e.target.parentElement?.classList.remove(
                          "focusWithText"
                        );
                      }
                      resetFace();
                    }, 100);
                    setActiveElement(null);
                  }}
                  maxLength={254}
                />
              </div>
              <div className="grid gap-2 relative">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  type={showPassword ? "text" : "password"}
                  id="loginPassword"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setActiveElement("password")}
                  onBlur={() => setActiveElement(null)}
                />
                <label
                  htmlFor="showPasswordCheck"
                  className="absolute flex items-center justify-center gap-2 -top-1 right-2 pl-[1.45em] text-base cursor-pointer"
                  onMouseDown={() => setActiveElement("toggle")}
                  onMouseUp={() => setActiveElement("toggle")}
                  onClick={() => setActiveElement("toggle")}
                >
                  <input
                    id="showPasswordCheck"
                    type="checkbox"
                    checked={showPassword}
                    onChange={(e) => setShowPassword(e.target.checked)}
                    onFocus={() => setActiveElement("toggle")}
                    onBlur={() => setActiveElement(null)}
                    className="absolute z-[-1] opacity-0"
                  />
                  <div
                    className={`h-[0.85em] w-[0.85em] bg-[#f3fafd] border-2 border-[#217093] rounded-sm ${
                      showPassword
                        ? 'after:content-[""] after:absolute after:left-[0.25em] after:top-[0.025em] after:w-[0.2em] after:h-[0.5em] after:border-solid after:border-[#217093] after:border-r-[3px] after:border-b-[3px] after:rotate-45'
                        : ""
                    }`}
                  ></div>
                  Show
                </label>
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
