import React from "react";
import "./Navbar.css";
import Mulearn from "./assets/Mulearn.png";

const Navbar = () => {
  return (
    <nav>
      <div class="navbar navbar-expand-lg navbar-light ">
        <div class="container">
          <a class="navbar-brand" href="/">
            <img className="mulearn-logo" src={Mulearn} alt="Mulearn" />
          </a>

          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div
            class="navbar-styles collapse navbar-collapse"
            id="navbarNavDropdown"
          >
            <div class="navbar-dropdowns">
              <ul class="navbar-nav">
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="/#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Program
                  </a>
                  <ul
                    class="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <li>
                      <a class="dropdown-item" href="https://yip.mulearn.org">
                        YIP
                      </a>
                    </li>
                    <li>
                      <a
                        class="dropdown-item"
                        href="https://foundation.mulearn.org"
                      >
                        Foundation Program
                      </a>
                    </li>
                    <li>
                      <a
                        class="dropdown-item"
                        href="https://rebrand.ly/mulearncalendar"
                      >
                        Global Calendar
                      </a>
                    </li>
                  </ul>
                </li>

                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="/#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Events
                  </a>
                  <ul
                    class="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <li>
                      <a class="dropdown-item" href="/announcements">
                        µ-Announcements
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="/events/isr">
                        Inspiration Station
                      </a>
                    </li>
                    <li>
                      <a
                        class="dropdown-item"
                        href="https://events.mulearn.org/"
                      >
                        Events
                      </a>
                    </li>
                  </ul>
                </li>

                <li class="nav-item dropdown">
                  <a class="nav-link" href="https://careers.mulearn.org/">
                    Careers
                  </a>
                </li>

                <li class="nav-item dropdown">
                  <a class="nav-link" href="https://learn.mulearn.org/">
                    Interest Groups
                  </a>
                </li>

                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="/#"
                    target="_blank"
                    rel="noopener noreferrer"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    About
                  </a>
                  <ul
                    class="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <li>
                      <a class="dropdown-item" href="https://team.mulearn.org/">
                        Our Team
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>

            <div class="nav-barbtn">
              <a
                href="https://discord.com/invite/Jt7sv3chZP"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button class="join-discord">Join Discord Server</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
