"use client";

import { useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Home, FolderKanban, Mail, Plus } from "lucide-react";

type NavItem = {
  id: string;
  icon: React.ElementType;
  label: string;
  angle: number;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  { id: "home", icon: Home, label: "Home", angle: 270, href: "/" },
  { id: "projects", icon: FolderKanban, label: "Projects", angle: 30, href: "/projects" },
  { id: "contact", icon: Mail, label: "Contact", angle: 150, href: "/contact" },
];

const ORBIT_RADIUS = 90;
const ITEM_SIZE = 48;

function getPolarPosition(angleDeg: number, radius: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: radius * Math.cos(rad),
    y: radius * Math.sin(rad),
  };
}

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isCenterHovered, setIsCenterHovered] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const activeId = NAV_ITEMS.find((item) => item.href === pathname)?.id ?? "home";

  const toggleNav = useCallback(() => setIsOpen((prev) => !prev), []);

  const handleNavigate = useCallback((href: string) => {
    router.push(href);
    setIsOpen(false);
  }, [router]);

  return (
    <div className="fixed top-8 left-8 z-50">
      {/* Ambient glow behind the nav */}
      <motion.div
        className="absolute rounded-full blur-3xl pointer-events-none"
        initial={false}
        animate={{
          width: isOpen ? 280 : 80,
          height: isOpen ? 280 : 80,
          x: isOpen ? -140 + 32 : -40 + 32,
          y: isOpen ? -140 + 32 : -40 + 32,
          opacity: isOpen ? 0.15 : 0.1,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
        style={{
          background: "var(--primary)",
        }}
      />

      {/* Main container */}
      <motion.div
        className="relative"
        initial={false}
        animate={{
          width: isOpen ? 220 : 64,
          height: isOpen ? 220 : 64,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Outer ring when expanded */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute inset-0 rounded-full"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              style={{
                background: "color-mix(in oklch, var(--primary) 8%, transparent)",
                border: "1px solid color-mix(in oklch, var(--primary) 15%, transparent)",
                backdropFilter: "blur(12px)",
              }}
            />
          )}
        </AnimatePresence>

        {/* Navigation items */}
        <AnimatePresence>
          {isOpen &&
            NAV_ITEMS.map((item, index) => {
              const { x, y } = getPolarPosition(item.angle, ORBIT_RADIUS);
              const Icon = item.icon;
              const isActive = activeId === item.id;
              const isHovered = hoveredId === item.id;

              return (
                <motion.button
                  key={item.id}
                  className="absolute flex items-center justify-center rounded-full cursor-pointer group z-20"
                  style={{
                    width: ITEM_SIZE,
                    height: ITEM_SIZE,
                    left: "50%",
                    top: "50%",
                  }}
                  initial={{
                    x: -ITEM_SIZE / 2,
                    y: -ITEM_SIZE / 2,
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    x: x - ITEM_SIZE / 2,
                    y: y - ITEM_SIZE / 2,
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    x: -ITEM_SIZE / 2,
                    y: -ITEM_SIZE / 2,
                    opacity: 0,
                    scale: 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                    delay: index * 0.05,
                  }}
                  onClick={() => handleNavigate(item.href)}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Button background */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    initial={false}
                    animate={{
                      scale: isHovered ? 1.1 : 1,
                      background: isActive
                        ? "var(--primary)"
                        : "rgba(255,255,255,0.9)",
                      boxShadow: isActive
                        ? "0 4px 20px color-mix(in oklch, var(--primary) 40%, transparent), inset 0 1px 0 rgba(255,255,255,0.2)"
                        : isHovered
                        ? "0 4px 16px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.8)"
                        : "0 2px 8px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    style={{
                      border: isActive ? "none" : "1px solid rgba(0,0,0,0.06)",
                    }}
                  />

                  {/* Icon */}
                  <motion.div
                    className="relative z-10"
                    animate={{
                      scale: isHovered ? 1.1 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    style={{
                      color: isActive ? "var(--primary-foreground)" : "var(--muted-foreground)",
                    }}
                  >
                    <Icon size={20} strokeWidth={2} />
                  </motion.div>

                  {/* Tooltip */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        className="absolute left-full ml-3 px-3 py-1.5 rounded-lg whitespace-nowrap pointer-events-none z-[100]"
                        initial={{ opacity: 0, x: -8, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -4, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        style={{
                          background: "rgba(20,20,20,0.9)",
                          backdropFilter: "blur(8px)",
                          color: "#fff",
                          fontSize: "13px",
                          fontWeight: 500,
                          letterSpacing: "0.01em",
                        }}
                      >
                        {item.label}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
        </AnimatePresence>

        {/* Center button */}
        <motion.button
          onClick={toggleNav}
          onMouseEnter={() => setIsCenterHovered(true)}
          onMouseLeave={() => setIsCenterHovered(false)}
          className="absolute rounded-full flex items-center justify-center cursor-pointer overflow-hidden z-10"
          style={{
            width: 64,
            height: 64,
            left: "50%",
            top: "50%",
            x: "-50%",
            y: "-50%",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Gradient background */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: isOpen
                ? "linear-gradient(135deg, rgba(40,40,40,0.95) 0%, rgba(20,20,20,0.98) 100%)"
                : "var(--primary)",
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Shine effect */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 50%)",
            }}
          />

          {/* Border glow */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              boxShadow: isOpen
                ? "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)"
                : "0 4px 24px color-mix(in oklch, var(--primary) 40%, transparent), 0 0 0 1px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.2)",
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Pulsing ring when closed */}
          <AnimatePresence>
            {!isOpen && (
              <motion.div
                className="absolute inset-0 rounded-full"
                initial={{ opacity: 0, scale: 1 }}
                animate={{
                  opacity: [0.6, 0],
                  scale: [1, 1.5],
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                style={{
                  border: "2px solid var(--primary)",
                }}
              />
            )}
          </AnimatePresence>

          {/* Icon - Plus rotates to X */}
          <motion.div
            className="relative z-10"
            style={{ color: isOpen ? "#fff" : "var(--primary-foreground)" }}
            initial={false}
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 25, duration: 0.15 }}
          >
            <Plus size={24} strokeWidth={2.5} />
          </motion.div>

          {/* Tooltip */}
          <AnimatePresence>
            {isCenterHovered && (
              <motion.div
                className="absolute left-full ml-4 px-3 py-1.5 rounded-lg whitespace-nowrap pointer-events-none"
                initial={{ opacity: 0, x: -8, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -4, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                style={{
                  background: "rgba(20,20,20,0.9)",
                  backdropFilter: "blur(8px)",
                  color: "#fff",
                  fontSize: "13px",
                  fontWeight: 500,
                  letterSpacing: "0.01em",
                }}
              >
                {isOpen ? "Close" : "Menu"}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>
    </div>
  );
}
