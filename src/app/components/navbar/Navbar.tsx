"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import classNames from "classnames";
import Link from "next/link";
import ComponentsNavBottom from "../../../components/ComponentsNavBottom";

const motionVariants = {
  open: {
    opacity: 1,
    transition: { staggerChildren: 0.1, ease: "easeOut", type: "Spring" },
  },
  closed: {
    opacity: 0,
    transition: { staggerChildren: 0, duration: 0 },
  },
};

const listItemsVariant = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.75,
      ease: "easeOut",
      staggerChildren: 1,
      when: "afterChildren",
    },
  },
  closed: {
    y: 100,
    opacity: 0,
    transition: {
      duration: 0,
    },
  },
};

const NavbarLink = ({ href, label }: { href: any; label: any }) => (
  <motion.div className="pt-4 text-center md:pt-0" variants={listItemsVariant}>
    <a href={href}>{label}</a>
  </motion.div>
);

const NavbarButton = ({
  className,
  src,
  alt,
  onClick,
}: {
  className: any;
  src: any;
  alt: any;
  onClick: any;
}) => {
  return (
    <button onClick={onClick} aria-label={alt}>
      <Image src={src} className={className} alt={alt} width={56} height={56} />
    </button>
  );
};

const Navbar = () => {
  const [burgerMenuActive, setBurgerMenuActive] = useState(false);

  const toggleBurgerMenu = () => {
    setBurgerMenuActive((prev) => !prev);
  };

  const links = [
    { href: "/residences", label: "Residences" },
    { href: "/amenities", label: "Amenities" },
    { href: "/neighborhood", label: "Neighborhood" },
    { href: "/leasing", label: "Leasing" },
    { href: "/about-us", label: "About us" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        backgroundImage: burgerMenuActive
          ? "url(/photos/home/banners.png)"
          : "none",
        backgroundPosition: burgerMenuActive ? "center" : "initial",
        transition: "background-image 10s ease-in-out",
      }}
      className={classNames(
        "pointer-events-none fixed inset-x-0 z-50 flex flex-col items-center justify-center px-4 pt-4",
        { "h-full": burgerMenuActive, "h-20": !burgerMenuActive },
      )}
    >
      <div className="pointer-events-auto flex w-full items-center justify-between text-white lg:w-3/4">
        <Link href="/">
          <Image
            src={
              "https://ik.imagekit.io/heykhoiruuuls/public/logos/verde-two-active.svg"
            }
            alt={"alt"}
            width={75}
            height={75}
          />
        </Link>
        <div className="hidden h-full items-center space-x-6 rounded-full bg-stone-900 bg-opacity-35 px-8 text-sm backdrop-blur-sm backdrop-filter md:flex">
          {links.map((link, index) => (
            <NavbarLink key={index} href={link.href} label={link.label} />
          ))}
        </div>
        <div className="flex h-20 items-center rounded-full bg-stone-900 bg-opacity-35 backdrop-blur-sm backdrop-filter md:hidden">
          <NavbarButton
            onClick={toggleBurgerMenu}
            className="flex h-6 items-center px-4 md:h-8"
            src={
              burgerMenuActive
                ? "https://ik.imagekit.io/heykhoiruuuls/public/icons/close.svg"
                : "https://ik.imagekit.io/heykhoiruuuls/public/icons/menu.svg"
            }
            alt={burgerMenuActive ? "Close menu" : "Open menu"}
          />
        </div>
      </div>
      {burgerMenuActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="pointer-events-auto mt-10 h-full w-full rounded-t-3xl bg-stone-900 bg-opacity-35 px-4 pb-8 pt-4 text-white backdrop-blur-sm backdrop-filter lg:max-w-lg"
        >
          <motion.h3
            className="text-white"
            variants={motionVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {links.map((link, index) => (
              <NavbarLink key={index} href={link.href} label={link.label} />
            ))}
          </motion.h3>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Navbar;
