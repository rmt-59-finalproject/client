import type React from "react";
import { createContext, useContext, useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

// Register the MorphSVG plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(MorphSVGPlugin);
}

// Update the AnimationContextType interface to fix the ref types
type AnimationContextType = {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  activeElement: string | null;
  setActiveElement: React.Dispatch<React.SetStateAction<string | null>>;
  eyesCovered: boolean;
  setEyesCovered: React.Dispatch<React.SetStateAction<boolean>>;
  mouthStatus: string;
  setMouthStatus: React.Dispatch<React.SetStateAction<string>>;
  eyeScale: number;
  setEyeScale: React.Dispatch<React.SetStateAction<number>>;
  usernameInputRef: React.RefObject<HTMLInputElement | null>;
  svgRef: React.RefObject<SVGSVGElement | null>;
  coords: {
    svgCoords: { x: number; y: number };
    usernameCoords: { x: number; y: number };
    screenCenter: number;
    eyeLCoords: { x: number; y: number };
    eyeRCoords: { x: number; y: number };
    noseCoords: { x: number; y: number };
    mouthCoords: { x: number; y: number };
    usernameScrollMax: number;
  };
  setCoords: React.Dispatch<
    React.SetStateAction<{
      svgCoords: { x: number; y: number };
      usernameCoords: { x: number; y: number };
      screenCenter: number;
      eyeLCoords: { x: number; y: number };
      eyeRCoords: { x: number; y: number };
      noseCoords: { x: number; y: number };
      mouthCoords: { x: number; y: number };
      usernameScrollMax: number;
    }>
  >;
  calculateFaceMove: () => void;
  resetFace: () => void;
  coverEyes: () => void;
  uncoverEyes: () => void;
  spreadFingers: () => void;
  closeFingers: () => void;
  morphMouth: (status: string) => void;
  // SVG element refs
  eyeLRef: React.RefObject<SVGGElement | null>;
  eyeRRef: React.RefObject<SVGGElement | null>;
  noseRef: React.RefObject<SVGPathElement | null>;
  mouthRef: React.RefObject<SVGGElement | null>;
  mouthBGRef: React.RefObject<SVGPathElement | null>;
  mouthSmallBGRef: React.RefObject<SVGPathElement | null>;
  mouthMediumBGRef: React.RefObject<SVGPathElement | null>;
  mouthLargeBGRef: React.RefObject<SVGPathElement | null>;
  mouthMaskPathRef: React.RefObject<SVGPathElement | null>;
  mouthOutlineRef: React.RefObject<SVGPathElement | null>;
  tongueRef: React.RefObject<SVGGElement | null>;
  toothRef: React.RefObject<SVGPathElement | null>;
  chinRef: React.RefObject<SVGPathElement | null>;
  faceRef: React.RefObject<SVGPathElement | null>;
  eyebrowRef: React.RefObject<SVGGElement | null>;
  outerEarLRef: React.RefObject<SVGGElement | null>;
  outerEarRRef: React.RefObject<SVGGElement | null>;
  earHairLRef: React.RefObject<SVGGElement | null>;
  earHairRRef: React.RefObject<SVGGElement | null>;
  hairRef: React.RefObject<SVGPathElement | null>;
  armLRef: React.RefObject<SVGGElement | null>;
  armRRef: React.RefObject<SVGGElement | null>;
  bodyBGRef: React.RefObject<SVGPathElement | null>;
  bodyBGchangedRef: React.RefObject<SVGPathElement | null>;
  twoFingersRef: React.RefObject<SVGGElement | null>;
};

const AnimationContext = createContext<AnimationContextType | undefined>(
  undefined
);

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error("useAnimation must be used within an AnimationProvider");
  }
  return context;
};

export const AnimationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [eyesCovered, setEyesCovered] = useState(false);
  const [mouthStatus, setMouthStatus] = useState("small");
  const [eyeScale, setEyeScale] = useState(1);
  const [activeElement, setActiveElement] = useState<string | null>(null);

  // SVG element refs
  const svgRef = useRef<SVGSVGElement>(null);
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const eyeLRef = useRef<SVGGElement>(null);
  const eyeRRef = useRef<SVGGElement>(null);
  const noseRef = useRef<SVGPathElement>(null);
  const mouthRef = useRef<SVGGElement>(null);
  const mouthBGRef = useRef<SVGPathElement>(null);
  const mouthSmallBGRef = useRef<SVGPathElement>(null);
  const mouthMediumBGRef = useRef<SVGPathElement>(null);
  const mouthLargeBGRef = useRef<SVGPathElement>(null);
  const mouthMaskPathRef = useRef<SVGPathElement>(null);
  const mouthOutlineRef = useRef<SVGPathElement>(null);
  const tongueRef = useRef<SVGGElement>(null);
  const toothRef = useRef<SVGPathElement>(null);
  const chinRef = useRef<SVGPathElement>(null);
  const faceRef = useRef<SVGPathElement>(null);
  const eyebrowRef = useRef<SVGGElement>(null);
  const outerEarLRef = useRef<SVGGElement>(null);
  const outerEarRRef = useRef<SVGGElement>(null);
  const earHairLRef = useRef<SVGGElement>(null);
  const earHairRRef = useRef<SVGGElement>(null);
  const hairRef = useRef<SVGPathElement>(null);
  const armLRef = useRef<SVGGElement>(null);
  const armRRef = useRef<SVGGElement>(null);
  const bodyBGRef = useRef<SVGPathElement>(null);
  const bodyBGchangedRef = useRef<SVGPathElement>(null);
  const twoFingersRef = useRef<SVGGElement>(null);

  // Coordinates and measurements
  const [coords, setCoords] = useState({
    svgCoords: { x: 0, y: 0 },
    usernameCoords: { x: 0, y: 0 },
    screenCenter: 0,
    eyeLCoords: { x: 0, y: 0 },
    eyeRCoords: { x: 0, y: 0 },
    noseCoords: { x: 0, y: 0 },
    mouthCoords: { x: 0, y: 0 },
    usernameScrollMax: 0,
  });

  // Calculate face movement based on cursor position
  const calculateFaceMove = () => {
    if (
      !usernameInputRef.current ||
      !eyeLRef.current ||
      !eyeRRef.current ||
      !noseRef.current ||
      !mouthRef.current ||
      !chinRef.current ||
      !faceRef.current ||
      !eyebrowRef.current ||
      !outerEarLRef.current ||
      !outerEarRRef.current ||
      !earHairLRef.current ||
      !earHairRRef.current ||
      !hairRef.current
    )
      return;

    const carPos = usernameInputRef.current.selectionEnd || username.length;
    const div = document.createElement("div");
    const span = document.createElement("span");
    const copyStyle = getComputedStyle(usernameInputRef.current);

    Object.values(copyStyle).forEach((prop) => {
      if (typeof prop === "string" && !prop.startsWith("--")) {
        div.style.setProperty(prop, copyStyle.getPropertyValue(prop));
      }
    });

    div.style.position = "absolute";
    document.body.appendChild(div);
    div.textContent = username.substr(0, carPos);
    span.textContent = username.substr(carPos) || ".";
    div.appendChild(span);

    const getPosition = (el: Element) => {
      const rect = el.getBoundingClientRect();
      return {
        x: rect.left,
        y: rect.top,
      };
    };

    const getAngle = (x1: number, y1: number, x2: number, y2: number) => {
      return Math.atan2(y1 - y2, x1 - x2);
    };

    const caretCoords = getPosition(span);
    const dFromC =
      coords.screenCenter - (caretCoords.x + coords.usernameCoords.x);

    let eyeLAngle, eyeRAngle, noseAngle, mouthAngle;

    if (usernameInputRef.current.scrollWidth <= coords.usernameScrollMax) {
      eyeLAngle = getAngle(
        coords.eyeLCoords.x,
        coords.eyeLCoords.y,
        coords.usernameCoords.x + caretCoords.x,
        coords.usernameCoords.y + 25
      );
      eyeRAngle = getAngle(
        coords.eyeRCoords.x,
        coords.eyeRCoords.y,
        coords.usernameCoords.x + caretCoords.x,
        coords.usernameCoords.y + 25
      );
      noseAngle = getAngle(
        coords.noseCoords.x,
        coords.noseCoords.y,
        coords.usernameCoords.x + caretCoords.x,
        coords.usernameCoords.y + 25
      );
      mouthAngle = getAngle(
        coords.mouthCoords.x,
        coords.mouthCoords.y,
        coords.usernameCoords.x + caretCoords.x,
        coords.usernameCoords.y + 25
      );
    } else {
      eyeLAngle = getAngle(
        coords.eyeLCoords.x,
        coords.eyeLCoords.y,
        coords.usernameCoords.x + coords.usernameScrollMax,
        coords.usernameCoords.y + 25
      );
      eyeRAngle = getAngle(
        coords.eyeRCoords.x,
        coords.eyeRCoords.y,
        coords.usernameCoords.x + coords.usernameScrollMax,
        coords.usernameCoords.y + 25
      );
      noseAngle = getAngle(
        coords.noseCoords.x,
        coords.noseCoords.y,
        coords.usernameCoords.x + coords.usernameScrollMax,
        coords.usernameCoords.y + 25
      );
      mouthAngle = getAngle(
        coords.mouthCoords.x,
        coords.mouthCoords.y,
        coords.usernameCoords.x + coords.usernameScrollMax,
        coords.usernameCoords.y + 25
      );
    }

    const eyeLX = Math.cos(eyeLAngle) * 20;
    const eyeLY = Math.sin(eyeLAngle) * 10;
    const eyeRX = Math.cos(eyeRAngle) * 20;
    const eyeRY = Math.sin(eyeRAngle) * 10;
    const noseX = Math.cos(noseAngle) * 23;
    const noseY = Math.sin(noseAngle) * 10;
    const mouthX = Math.cos(mouthAngle) * 23;
    const mouthY = Math.sin(mouthAngle) * 10;
    const mouthR = Math.cos(mouthAngle) * 6;
    const chinX = mouthX * 0.8;
    const chinY = mouthY * 0.5;

    let chinS = 1 - (dFromC * 0.15) / 100;
    if (chinS > 1) {
      chinS = 1 - (chinS - 1);
      if (chinS < 0.5) {
        chinS = 0.5;
      }
    }

    const faceX = mouthX * 0.3;
    const faceY = mouthY * 0.4;
    const faceSkew = Math.cos(mouthAngle) * 5;
    const eyebrowSkew = Math.cos(mouthAngle) * 25;
    const outerEarX = Math.cos(mouthAngle) * 4;
    const outerEarY = Math.cos(mouthAngle) * 5;
    const hairX = Math.cos(mouthAngle) * 6;
    const hairS = 1.2;

    gsap.to(eyeLRef.current, {
      x: -eyeLX,
      y: -eyeLY,
      duration: 1,
      ease: "expo.out",
    });
    gsap.to(eyeRRef.current, {
      x: -eyeRX,
      y: -eyeRY,
      duration: 1,
      ease: "expo.out",
    });
    gsap.to(noseRef.current, {
      x: -noseX,
      y: -noseY,
      rotation: mouthR,
      transformOrigin: "center center",
      duration: 1,
      ease: "expo.out",
    });
    gsap.to(mouthRef.current, {
      x: -mouthX,
      y: -mouthY,
      rotation: mouthR,
      transformOrigin: "center center",
      duration: 1,
      ease: "expo.out",
    });
    gsap.to(chinRef.current, {
      x: -chinX,
      y: -chinY,
      scaleY: chinS,
      duration: 1,
      ease: "expo.out",
    });
    gsap.to(faceRef.current, {
      x: -faceX,
      y: -faceY,
      skewX: -faceSkew,
      transformOrigin: "center top",
      duration: 1,
      ease: "expo.out",
    });
    gsap.to(eyebrowRef.current, {
      x: -faceX,
      y: -faceY,
      skewX: -eyebrowSkew,
      transformOrigin: "center top",
      duration: 1,
      ease: "expo.out",
    });
    gsap.to(outerEarLRef.current, {
      x: outerEarX,
      y: -outerEarY,
      duration: 1,
      ease: "expo.out",
    });
    gsap.to(outerEarRRef.current, {
      x: outerEarX,
      y: outerEarY,
      duration: 1,
      ease: "expo.out",
    });
    gsap.to(earHairLRef.current, {
      x: -outerEarX,
      y: -outerEarY,
      duration: 1,
      ease: "expo.out",
    });
    gsap.to(earHairRRef.current, {
      x: -outerEarX,
      y: outerEarY,
      duration: 1,
      ease: "expo.out",
    });
    gsap.to(hairRef.current, {
      x: hairX,
      scaleY: hairS,
      transformOrigin: "center bottom",
      duration: 1,
      ease: "expo.out",
    });

    document.body.removeChild(div);
  };

  // Morph mouth based on status
  const morphMouth = (status: string) => {
    if (
      !mouthBGRef.current ||
      !mouthOutlineRef.current ||
      !mouthMaskPathRef.current ||
      !mouthSmallBGRef.current ||
      !mouthMediumBGRef.current ||
      !mouthLargeBGRef.current ||
      !toothRef.current ||
      !tongueRef.current ||
      !eyeLRef.current ||
      !eyeRRef.current
    )
      return;

    if (status === "small") {
      gsap.to(
        [mouthBGRef.current, mouthOutlineRef.current, mouthMaskPathRef.current],
        {
          morphSVG: mouthSmallBGRef.current,
          duration: 1,
          ease: "expo.out",
        }
      );
      gsap.to(toothRef.current, { x: 0, y: 0, duration: 1, ease: "expo.out" });
      gsap.to(tongueRef.current, { y: 0, duration: 1, ease: "expo.out" });
      gsap.to([eyeLRef.current, eyeRRef.current], {
        scaleX: 1,
        scaleY: 1,
        duration: 1,
        ease: "expo.out",
      });
    } else if (status === "medium") {
      gsap.to(
        [mouthBGRef.current, mouthOutlineRef.current, mouthMaskPathRef.current],
        {
          morphSVG: mouthMediumBGRef.current,
          duration: 1,
          ease: "expo.out",
        }
      );
      gsap.to(toothRef.current, { x: 0, y: 0, duration: 1, ease: "expo.out" });
      gsap.to(tongueRef.current, { x: 0, y: 1, duration: 1, ease: "expo.out" });
      gsap.to([eyeLRef.current, eyeRRef.current], {
        scaleX: 0.85,
        scaleY: 0.85,
        duration: 1,
        ease: "expo.out",
      });
    } else if (status === "large") {
      gsap.to(
        [mouthBGRef.current, mouthOutlineRef.current, mouthMaskPathRef.current],
        {
          morphSVG: mouthLargeBGRef.current,
          duration: 1,
          ease: "expo.out",
        }
      );
      gsap.to(toothRef.current, { x: 3, y: -2, duration: 1, ease: "expo.out" });
      gsap.to(tongueRef.current, { y: 2, duration: 1, ease: "expo.out" });
      gsap.to([eyeLRef.current, eyeRRef.current], {
        scaleX: 0.65,
        scaleY: 0.65,
        transformOrigin: "center center",
        duration: 1,
        ease: "expo.out",
      });
    }
  };

  // Reset face to neutral position
  const resetFace = () => {
    if (
      !eyeLRef.current ||
      !eyeRRef.current ||
      !noseRef.current ||
      !mouthRef.current ||
      !chinRef.current ||
      !faceRef.current ||
      !eyebrowRef.current ||
      !outerEarLRef.current ||
      !outerEarRRef.current ||
      !earHairLRef.current ||
      !earHairRRef.current ||
      !hairRef.current
    )
      return;

    gsap.to([eyeLRef.current, eyeRRef.current], {
      x: 0,
      y: 0,
      duration: 1,
      ease: "expo.out",
    });
    gsap.to(noseRef.current, {
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
      duration: 1,
      ease: "expo.out",
    });
    gsap.to(mouthRef.current, {
      x: 0,
      y: 0,
      rotation: 0,
      duration: 1,
      ease: "expo.out",
    });
    gsap.to(chinRef.current, {
      x: 0,
      y: 0,
      scaleY: 1,
      duration: 1,
      ease: "expo.out",
    });
    gsap.to([faceRef.current, eyebrowRef.current], {
      x: 0,
      y: 0,
      skewX: 0,
      duration: 1,
      ease: "expo.out",
    });
    gsap.to(
      [
        outerEarLRef.current,
        outerEarRRef.current,
        earHairLRef.current,
        earHairRRef.current,
        hairRef.current,
      ],
      {
        x: 0,
        y: 0,
        scaleY: 1,
        duration: 1,
        ease: "expo.out",
      }
    );
  };

  // Cover eyes animation
  const coverEyes = () => {
    if (
      !armLRef.current ||
      !armRRef.current ||
      !bodyBGRef.current ||
      !bodyBGchangedRef.current
    )
      return;

    gsap.killTweensOf([armLRef.current, armRRef.current]);
    gsap.set([armLRef.current, armRRef.current], { visibility: "visible" });
    gsap.to(armLRef.current, {
      x: -93,
      y: 10,
      rotation: 0,
      duration: 0.45,
      ease: "quad.out",
    });
    gsap.to(armRRef.current, {
      x: -93,
      y: 10,
      rotation: 0,
      duration: 0.45,
      ease: "quad.out",
      delay: 0.1,
    });
    gsap.to(bodyBGRef.current, {
      morphSVG: bodyBGchangedRef.current,
      duration: 0.45,
      ease: "quad.out",
    });

    setEyesCovered(true);
  };

  // Uncover eyes animation
  const uncoverEyes = () => {
    if (
      !armLRef.current ||
      !armRRef.current ||
      !bodyBGRef.current ||
      !bodyBGchangedRef.current
    )
      return;

    gsap.killTweensOf([armLRef.current, armRRef.current]);
    gsap.to(armLRef.current, { y: 220, duration: 1.35, ease: "quad.out" });
    gsap.to(armLRef.current, {
      rotation: 105,
      duration: 1.35,
      ease: "quad.out",
      delay: 0.1,
    });
    gsap.to(armRRef.current, { y: 220, duration: 1.35, ease: "quad.out" });
    gsap.to(armRRef.current, {
      rotation: -105,
      duration: 1.35,
      ease: "quad.out",
      delay: 0.1,
      onComplete: () => {
        gsap.set([armLRef.current, armRRef.current], { visibility: "hidden" });
      },
    });
    gsap.to(bodyBGRef.current, {
      morphSVG: bodyBGRef.current,
      duration: 0.45,
      ease: "quad.out",
    });

    setEyesCovered(false);
  };

  // Spread fingers animation
  const spreadFingers = () => {
    if (!twoFingersRef.current) return;

    gsap.to(twoFingersRef.current, {
      transformOrigin: "bottom left",
      rotation: 30,
      x: -9,
      y: -2,
      duration: 0.35,
      ease: "power2.inOut",
    });
  };

  // Close fingers animation
  const closeFingers = () => {
    if (!twoFingersRef.current) return;

    gsap.to(twoFingersRef.current, {
      transformOrigin: "bottom left",
      rotation: 0,
      x: 0,
      y: 0,
      duration: 0.35,
      ease: "power2.inOut",
    });
  };

  // Start blinking animation
  const startBlinking = (delay = 1) => {
    if (!eyeLRef.current || !eyeRRef.current) return;

    const randomDelay = Math.floor(Math.random() * delay) || 1;

    gsap.to([eyeLRef.current, eyeRRef.current], {
      scaleY: 0,
      duration: 0.1,
      delay: randomDelay,
      yoyo: true,
      repeat: 1,
      transformOrigin: "center center",
      onComplete: () => startBlinking(12),
    });
  };

  // Initialize coordinates and measurements
  useEffect(() => {
    // Add a small delay to ensure DOM elements are fully rendered
    const initTimer = setTimeout(() => {
      if (!svgRef.current || !usernameInputRef.current) return;

      const getPosition = (el: Element) => {
        const rect = el.getBoundingClientRect();
        return {
          x: rect.left,
          y: rect.top,
        };
      };

      const svgCoords = getPosition(svgRef.current);
      const usernameCoords = getPosition(usernameInputRef.current);
      const screenCenter = svgCoords.x + svgRef.current.clientWidth / 2;

      setCoords({
        svgCoords,
        usernameCoords,
        screenCenter,
        eyeLCoords: { x: svgCoords.x + 84, y: svgCoords.y + 76 },
        eyeRCoords: { x: svgCoords.x + 113, y: svgCoords.y + 76 },
        noseCoords: { x: svgCoords.x + 97, y: svgCoords.y + 81 },
        mouthCoords: { x: svgCoords.x + 100, y: svgCoords.y + 100 },
        usernameScrollMax: usernameInputRef.current.scrollWidth,
      });

      // Set initial arm positions
      if (armLRef.current && armRRef.current) {
        gsap.set(armLRef.current, {
          x: -93,
          y: 220,
          rotation: 105,
          transformOrigin: "top left",
        });
        gsap.set(armRRef.current, {
          x: -93,
          y: 220,
          rotation: -105,
          transformOrigin: "top right",
        });
      }

      // Set initial mouth position
      if (mouthRef.current) {
        gsap.set(mouthRef.current, { transformOrigin: "center center" });
      }

      // Start blinking
      startBlinking(5);
    }, 500); // 500ms delay to ensure DOM is ready

    return () => clearTimeout(initTimer);
  }, []);

  // Re-initialize coordinates when window is resized
  useEffect(() => {
    const handleResize = () => {
      if (!svgRef.current || !usernameInputRef.current) return;

      const getPosition = (el: Element) => {
        const rect = el.getBoundingClientRect();
        return {
          x: rect.left,
          y: rect.top,
        };
      };

      const svgCoords = getPosition(svgRef.current);
      const usernameCoords = getPosition(usernameInputRef.current);
      const screenCenter = svgCoords.x + svgRef.current.clientWidth / 2;

      setCoords({
        svgCoords,
        usernameCoords,
        screenCenter,
        eyeLCoords: { x: svgCoords.x + 84, y: svgCoords.y + 76 },
        eyeRCoords: { x: svgCoords.x + 113, y: svgCoords.y + 76 },
        noseCoords: { x: svgCoords.x + 97, y: svgCoords.y + 81 },
        mouthCoords: { x: svgCoords.x + 100, y: svgCoords.y + 100 },
        usernameScrollMax: usernameInputRef.current.scrollWidth,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      interface ExtendedWindow extends Window {
        opera?: string;
      }
      const userAgent =
        navigator.userAgent ||
        navigator.vendor ||
        (window as ExtendedWindow).opera;
      return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
        (userAgent ?? "").toLowerCase()
      );
    };

    if (checkMobile()) {
      setShowPassword(true);
    }
  }, []);

  // Handle username input changes
  useEffect(() => {
    if (!usernameInputRef.current) return

    calculateFaceMove();

    if (username.length > 0) {
      if (mouthStatus === "small") {
        setMouthStatus("medium");
        morphMouth("medium");
        setEyeScale(0.85);
      }

      if (username.includes("@")) {
        setMouthStatus("large");
        morphMouth("large");
        setEyeScale(0.65);
      } else if (mouthStatus === "large") {
        setMouthStatus("medium");
        morphMouth("medium");
        setEyeScale(0.85);
      }
    } else {
      setMouthStatus("small");
      morphMouth("small");
      setEyeScale(1);
    }
  }, [username, mouthStatus]);

  // Handle password visibility toggle
  useEffect(() => {
    if (showPassword) {
      spreadFingers();
    } else {
      closeFingers();
    }
  }, [showPassword]);

  // Handle active element changes
  useEffect(() => {
    if (activeElement === "password" || activeElement === "toggle") {
      if (!eyesCovered) {
        coverEyes();
      }
    } else if (
      activeElement !== "password" &&
      activeElement !== "toggle" &&
      eyesCovered
    ) {
      uncoverEyes();
    }
  }, [activeElement, eyesCovered]);

  useEffect(() => {
    if (activeElement === "username") {
      // When username field gets focus, calculate face movement
      calculateFaceMove();

      // Set up an interval to continuously update face position while focused
      const intervalId = setInterval(() => {
        if (activeElement === "username") {
          calculateFaceMove();
        }
      }, 100);

      return () => clearInterval(intervalId);
    }
  }, [activeElement, username]);

  const value = {
    username,
    setUsername,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    activeElement,
    setActiveElement,
    eyesCovered,
    setEyesCovered,
    mouthStatus,
    setMouthStatus,
    eyeScale,
    setEyeScale,
    usernameInputRef,
    svgRef,
    coords,
    setCoords,
    calculateFaceMove,
    resetFace,
    coverEyes,
    uncoverEyes,
    spreadFingers,
    closeFingers,
    morphMouth,
    // SVG element refs
    eyeLRef,
    eyeRRef,
    noseRef,
    mouthRef,
    mouthBGRef,
    mouthSmallBGRef,
    mouthMediumBGRef,
    mouthLargeBGRef,
    mouthMaskPathRef,
    mouthOutlineRef,
    tongueRef,
    toothRef,
    chinRef,
    faceRef,
    eyebrowRef,
    outerEarLRef,
    outerEarRRef,
    earHairLRef,
    earHairRRef,
    hairRef,
    armLRef,
    armRRef,
    bodyBGRef,
    bodyBGchangedRef,
    twoFingersRef,
  };

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
};
