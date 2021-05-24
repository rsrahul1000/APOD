import React from "react";

interface Props {}

export const BottomNavbar: React.FC<Props> = (props: Props) => {
  return (
    <div
      className="position-fixed w-100 shadow d-lg-none bg-dark"
      style={{ bottom: 0, zIndex: 9999, cursor: "pointer" }}
    >
      <div className="d-flex flex-row m-0 text-center adaptive-back-grad pt-1">
        <div className="flex-fill order-first w-100">
          <a className="text-decoration-none text-white" href="">
            <i className="material-icons align-middle">home</i>
            <br />
            <small>Home</small>
          </a>
        </div>
        <div className="flex-fill order-first w-100">
          <a className="text-decoration-none text-white" href="">
            <i className="material-icons align-middle">date_range</i>
            <br />
            <small>Date Range</small>
          </a>
        </div>
        <div className="flex-fill order-first w-100">
          <a className="text-decoration-none text-white" href="">
            <i className="material-icons align-middle">favorite</i>
            <br />
            <small>Favorite</small>
          </a>
        </div>
      </div>
    </div>
  );
};
