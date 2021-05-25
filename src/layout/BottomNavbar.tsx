import React from "react";
import { Link, NavLink } from "react-router-dom";
import { DateRangePickerWidget } from "./DateRangePickerWidget";

interface Props {}

export const BottomNavbar: React.FC<Props> = (props: Props) => {
  return (
    <div
      className="position-fixed absolute w-100 shadow d-lg-none bg-dark"
      style={{ bottom: 0, zIndex: 9999, cursor: "pointer" }}
    >
      <div className="d-flex flex-row m-0 text-center adaptive-back-grad pt-1">
        <div className="flex-fill order-first w-100">
          <NavLink className="text-decoration-none text-white" to="/" exact={true}>
            <i className="material-icons align-middle">home</i>
            <br />
            <small>Home</small>
          </NavLink>
        </div>
        <div className="flex-fill order-first w-100">
          <NavLink className="text-decoration-none text-white" to="/favorite">
            <i className="material-icons align-middle">favorite</i>
            <br />
            <small>Favorite</small>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
