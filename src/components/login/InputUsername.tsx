import { useAnimation } from "@/contexts/animation-context";
import { Label } from "../ui/label";

const InputUsername = () => {
  const {
    username,
    setUsername,
    usernameInputRef,
    setActiveElement,
    resetFace,
    calculateFaceMove,
  } = useAnimation();

  return (
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
              e.target.parentElement?.classList.remove("focusWithText");
            }
            resetFace();
          }, 100);
          setActiveElement(null);
        }}
        maxLength={254}
      />
    </div>
  );
};

export default InputUsername;
