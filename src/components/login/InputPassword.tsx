import { useAnimation } from "@/contexts/animation-context";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const InputPassword = () => {
  const {
    password,
    setPassword,
    showPassword,
    setShowPassword,
    setActiveElement,
  } = useAnimation();

  return (
    <div className="grid gap-2 relative">
      <div className="flex items-center">
        <Label htmlFor="password">Password</Label>
      </div>
      <Input
        type={showPassword ? "text" : "password"}
        id="loginPassword"
        placeholder="******"
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
          className={`h-[0.85em] w-[0.85em] relative bg-[#f3fafd] border-2 border-[#217093] rounded-sm ${
            showPassword
              ? 'after:content-[""] after:absolute after:left-[0.25em] after:top-[0.025em] after:w-[0.2em] after:h-[0.5em] after:border-solid after:border-[#217093] after:border-r-[3px] after:border-b-[3px] after:rotate-45'
              : ""
          }`}
        ></div>
        Show
      </label>
    </div>
  );
};

export default InputPassword;
