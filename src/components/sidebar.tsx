"use client"
import Image from "next/image";
import { useEffect, useState } from "react";

const socialNetworks = [
  { name: "tik-tok", link: "https://www.tiktok.com/@educacion_del_futuro?_t=8goiE5HX1TK&_r=1" },
  { name: "instagram", link: "https://www.instagram.com/edf_academia/" },
  { name: "telegram", link: "#" },
  { name: "whatsapp", link: "https://wa.link/e2sutu" },
  { name: "location", link: "https://maps.app.goo.gl/MWu3qJRXeDL2qupB7" },
];

const Sidebar = () => {

  const [isSideBarVisible, setIsSideBarVisible] = useState(false);

  useEffect(() => {
    if(window.location.pathname === "/") {
    const delayTimer = setTimeout(() => {
      setIsSideBarVisible(true);
    }, 1000);
    return () => clearTimeout(delayTimer);
  } else {
    setIsSideBarVisible(true);
  }
  }, []);

  return (
    <div className={`fixed top-1/2 right-2 md:right-4 transform -translate-y-1/2 bg-secondary/80 p-4 rounded-full duration-300 ${
      !isSideBarVisible ? "translate-x-32" : "translate-x-0"
    }`}>
      {socialNetworks.map((network) => (
        <a
          key={network.name}
          href={network.link}
          className="block py-3 hover:bg-card p-2 rounded-full"
          target="_blank"
        >
          <Image
            src={`/icons/${network.name}.png`}
            alt={network.name}
            width={24}
            height={24}
            className="dark:invert"
          />
        </a>
      ))}
    </div>
  );
};

export default Sidebar;
