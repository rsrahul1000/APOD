import React from "react";
import { DateRangePickerWidget } from "./DateRangePickerWidget";
import logo from '../logo.png'
import { DateRange } from "../types/types";
import { Link } from "react-router-dom";

interface Props {
  selectDateRange: DateRange,
  setSelectDateRange: React.Dispatch<React.SetStateAction<DateRange>>
}

export const TopNavBar: React.FC<Props> = ({selectDateRange, setSelectDateRange}: Props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-dark shadow-sm d-none d-lg-flex">
      <Link className="navvbar-brand" to='/'>
        <img src={logo} alt="Logo" className="d-inline align-top" style={{height: "30px"}}/>
      </Link>
      <ul className="navbar-nav flex-row mr-auto">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/favorite" className="nav-link">
            Favorite
          </Link>
        </li>
      </ul>
      <div className="d-flex align-items-center">
        <DateRangePickerWidget selectDateRange={selectDateRange} setSelectDateRange={setSelectDateRange} />
      </div>
    </nav>
  );
};
