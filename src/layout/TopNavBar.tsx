import React from "react";

interface Props {}

export const TopNavBar: React.FC<Props> = (props: Props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-dark shadow-sm d-none d-lg-flex">
      <a className="navvbar-brand" href="">
        <img src="" alt="Logo" className="d-inline align-top" />
      </a>
      <ul className="navbar-nav flex-row mr-auto">
        <li className="nav-item">
          <a href="/" className="nav-link">Home</a>
        </li>
        <li className="nav-item">
          <a href="/favorite" className="nav-link">Favorite</a>
        </li>
      </ul>
      <a href="/favorite" className="nav-link">Date Picker</a>
    </nav>
  );
};
