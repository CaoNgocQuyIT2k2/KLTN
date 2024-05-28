import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { dateFormate } from "../../utils";
import SocialLink from "../../data/social/SocialLink.json";
import OffcanvasMenu from "./OffcanvasMenu";
import Menu from "./Menu";
import axios from 'axios';
import { message } from "antd";
import dynamic from 'next/dynamic';
import { useRouter } from "next/router";

// Dynamic import for SearchImage component
const SearchImage = dynamic(() => import("../objectDetector/SearchImage"), {
  ssr: false
});

const HeaderOne = () => {
  const router = useRouter();
  const menuRef = useRef();
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    const toggleDropdownMenu = () => {
      const dropdownSelect = menuRef.current.childNodes;
      let dropdownList = [];

      for (let i = 0; i < dropdownSelect.length; i++) {
        const element = dropdownSelect[i];
        if (element.classList.contains("has-dropdown")) {
          dropdownList.push(element);
        }
      }
      if (dropdownSelect.length > 0) {
        dropdownList.forEach((element) => {
          element.children[0].addEventListener("click", (e) => {
            e.preventDefault();

            if (element.classList.contains("active")) {
              element.classList.remove("active");
              element.childNodes[1].classList.remove("opened");
            } else {
              dropdownList.forEach((submenu) => {
                submenu.classList.remove("active");
                submenu.childNodes[1].classList.remove("opened");
              });

              element.classList.add("active");
              element.childNodes[1].classList.add("opened");
            }
          });
        });
      } else {
        console.error("Dropdown select is empty!");
      }
    };

    toggleDropdownMenu();
  }, []);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [searchshow, setSearchShow] = useState(false);

  const headerSearchShow = () => {
    setSearchShow(true);
  };
  const headerSearchClose = () => {
    setSearchShow(false);
  };

  const [mobileToggle, setMobileToggle] = useState(false);

  const MobileMenuToggler = () => {
    setMobileToggle(!mobileToggle);
    const HtmlTag = document.querySelector("html");
    const menuSelect = document.querySelectorAll(".main-navigation li");

    if (HtmlTag.classList.contains("main-menu-opened")) {
      HtmlTag.classList.remove("main-menu-opened");
    } else {
      setTimeout(() => {
        HtmlTag.classList.add("main-menu-opened");
      }, 800);
    }

    menuSelect.forEach((element) => {
      element.addEventListener("click", function () {
        if (!element.classList.contains("has-dropdown")) {
          HtmlTag.classList.remove("main-menu-opened");
          setMobileToggle(false);
        }
      });
    });
  };

  const handleSearchButtonClick = async () => {
    if (!searchKeyword) {
      message.error("Please enter a search keyword");
      return;
    }

    try {
      const response = await axios.get('/api/Search', {
        params: { keyList: searchKeyword }
      });

      if (response.status === 200) {
        console.log("Kết quả tìm kiếm:", response.data);
        router.push(`/search/${searchKeyword}`);
      } else {
        message.error("Search failed");
      }
    } catch (error) {
      console.error('Error:', error);
      message.error("Internal Server Error");
    }
  };

  return (
    <>
      <OffcanvasMenu ofcshow={show} ofcHandleClose={handleClose} />
      <header className="page-header">
        <div className="header-top bg-grey-dark-one">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md">
                <ul className="header-top-nav list-inline justify-content-center justify-content-md-start">
                  <li className="current-date">{dateFormate()}</li>
                  <li>
                    <Link href="/">
                      <a>Advertisement</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/about-us">
                      <a>About</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact">
                      <a>Contact</a>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-md-auto">
                <ul className="ml-auto social-share header-top__social-share">
                  <li>
                    <a href={SocialLink.fb.url}>
                      <i className={SocialLink.fb.icon} />
                    </a>
                  </li>
                  <li>
                    <a href={SocialLink.twitter.url}>
                      <i className={SocialLink.twitter.icon} />
                    </a>
                  </li>
                  <a href={SocialLink.instagram.url}>
                    <i className={SocialLink.instagram.icon} />
                  </a>
                  <li>
                    <Link href="/login">
                      <a>
                        <i className="feather icon-log-in" /> Log in
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <nav className="navbar bg-white">
          <div className="container">
            <div className="navbar-inner">
              <div className="brand-logo-container">
                <Link href="/">
                  <a>
                    <Image
                      src="/images/logo-black.svg"
                      alt="brand-logo"
                      width={102}
                      height={34}
                    />
                  </a>
                </Link>
              </div>
              <div className="main-nav-wrapper">
                <div ref={menuRef}>
                  <Menu />
                </div>
              </div>
              <div className="navbar-extra-features ml-auto">
                <form
                  action="#"
                  className={`navbar-search ${searchshow ? "show-nav-search" : ""}`}
                >
                  <div className="search-field">
                    {/* Include the SearchImage component */}
                    <input
                      type="text"
                      className="navbar-search-field"
                      placeholder="Search Here..."
                      value={ searchKeyword} // Sử dụng classNames nếu có, nếu không thì sử dụng searchKeyword
                      onChange={(e) => setSearchKeyword(e.target.value)}
                    />

                    <SearchImage setSearchKeyword={setSearchKeyword} />
                    <button
                      className="navbar-search-btn"
                      type="button"
                      onClick={handleSearchButtonClick}
                    >
                      <i className="fal fa-search" />
                    </button>
                  </div>
                  <span
                    className="navbar-search-close"
                    onClick={headerSearchClose}
                  >
                    <i className="fal fa-times" />
                  </span>
                </form>
                <button
                  className="nav-search-field-toggler"
                  onClick={headerSearchShow}
                >
                  <i className="far fa-search" />
                </button>
                <button className="side-nav-toggler" onClick={handleShow}>
                  <span />
                  <span />
                  <span />
                </button>
              </div>
              <div
                className={`main-nav-toggler d-block d-lg-none ${mobileToggle ? "expanded" : ""}`}
              >
                <div className="toggler-inner" onClick={MobileMenuToggler}>
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default HeaderOne;

