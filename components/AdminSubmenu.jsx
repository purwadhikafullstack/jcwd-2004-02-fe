import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

function Submenu({ route, isOpen, setIsOpen }) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsOpen(true);
  };

  useEffect(() => {
    if (!isOpen) {
      setIsMenuOpen(false);
    }
  }, [isOpen]);

  return (
    <>
      {router.pathname == route.path ? (
        <div className="flex menu-clicked cursor-pointer" onClick={toggleMenu}>
          <div className="menu-icon">
            <Image src={route.coloredicon} layout="fill" objectFit="cover" />
          </div>
          <div className="text-purple-400 pl-[12px] h-[20px] w-[150px] mb-1">
            {route.name}
          </div>
          <div className="text-purple-400">
            <FiChevronUp />
          </div>
        </div>
      ) : (
        <div
          className="flex menu-container cursor-pointer"
          onClick={toggleMenu}
        >
          <div className="menu-icon">
            <Image src={route.icon} layout="fill" objectFit="cover" />
          </div>
          <div className="text-slate-400 pl-[12px] w-[150px] h-[20px] mb-2">
            {route.name}
          </div>
          <div className="text-slate-400">
            <FiChevronDown />
          </div>
        </div>
      )}

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-25%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={{ opacity: -2, y: "-25%" }}
          >
            {isMenuOpen == true
              ? route.subroutes.map((subroute, i) => (
                  <>
                    {router.pathname == subroute.path ? (
                      <div
                        key={i}
                        className="text-purple-400 submenu-container pt-3 cursor-pointer"
                      >
                        {subroute.name}
                      </div>
                    ) : (
                      <Link href={subroute.path}>
                        <div
                          key={i}
                          className="text-slate-400 submenu-container pt-3 cursor-pointer"
                        >
                          {subroute.name}
                        </div>
                      </Link>
                    )}
                  </>
                ))
              : null}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Submenu;
