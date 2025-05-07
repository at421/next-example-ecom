'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useOnClickOutside from "use-onclickoutside"; // Assuming this hook is compatible

import type { RootState } from "@/store";

import Logo from "@/assets/icons/logo";

type HeaderType = {
  isErrorPage?: boolean;
};

const Header = ({ isErrorPage }: HeaderType) => {
  const pathname = usePathname();
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const arrayPaths = ["/"];

  const [onTop, setOnTop] = useState(
    !(!arrayPaths.includes(pathname) || isErrorPage),
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navRef = useRef(null);
  const searchRef = useRef(null);

  const headerClass = () => {
    if (window.pageYOffset === 0) {
      setOnTop(true);
    } else {
      setOnTop(false);
    }
  };

  useEffect(() => {
    if (!arrayPaths.includes(pathname) || isErrorPage) {
      return;
    }

    headerClass();
    window.onscroll = function () {
      headerClass();
    };

    return () => {
      window.onscroll = null; // Cleanup
    };
  }, [pathname, isErrorPage]); // Added dependencies for useEffect

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const closeSearch = () => {
    setSearchOpen(false);
  };

  // on click outside
  useOnClickOutside(navRef, closeMenu);
  useOnClickOutside(searchRef, closeSearch);

  return (
    <header className={`site-header ${!onTop ? "site-header--fixed" : ""}`}>
      <div className="container">
        <Link href="/">
          <h1 className="site-logo">
            <Logo />
            E-Shop
          </h1>
        </Link>
        <nav
          ref={navRef}
          className={`site-nav ${menuOpen ? "site-nav--open" : ""}`}
        >
          <Link href="/products">Products</Link>
          <a href="#">Inspiration</a> {/* Keep as a tag if it's not a Next.js route */}
          <a href="#">Rooms</a> {/* Keep as a tag if it's not a Next.js route */}
          {/* Assuming Account button triggers client-side logic or uses a Link */}
          <Link href="/login">
            <button className="site-nav__btn">
              <p>Account</p>
            </button>
          </Link>
        </nav>

        <div className="site-header__actions">
          <button
            ref={searchRef}
            className={`search-form-wrapper ${searchOpen ? "search-form--active" : ""}`}
            onClick={() => setSearchOpen(!searchOpen)} // Toggle search form visibility
          >
             {/* The button now wraps the form/icon, handle click on button */}
            <form className="search-form">
              {/* Icon inside form, maybe for closing? */}
              <i
                className="icon-cancel"
                onClick={(e) => { e.stopPropagation(); setSearchOpen(false); }} // Stop propagation to not close the button
              />
              <input
                type="text"
                name="search"
                placeholder="Enter the product you are looking for"
                onClick={(e) => e.stopPropagation()} // Stop propagation to not close the button
              />
            </form>
             {/* Icon outside form, for opening/toggling */}
             <i
              className="icon-search"
            />
          </button>
          {/* Removed legacyBehavior */}
          <Link href="/cart">
            <button className="btn-cart">
              <i className="icon-cart" />
              {cartItems.length > 0 && (
                <span className="btn-cart__count">{cartItems.length}</span>
              )}
            </button>
          </Link>
          {/* Removed legacyBehavior */}
          <Link href="/login">
            <button className="site-header__btn-avatar">
              <i className="icon-avatar" />
            </button>
          </Link>
          <button
            onClick={() => setMenuOpen(true)}
            className="site-header__btn-menu"
          >
            <i className="btn-hamburger">
              <span />
            </i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;