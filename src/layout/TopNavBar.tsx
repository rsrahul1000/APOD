import React from "react";
import { DateRangePickerWidget } from "./DateRangePickerWidget";
import logo from '../logo.png'
import { DateRange } from "../types/types";

interface Props {
  selectDateRange: DateRange,
  setSelectDateRange: React.Dispatch<React.SetStateAction<DateRange>>
}

export const TopNavBar: React.FC<Props> = ({selectDateRange, setSelectDateRange}: Props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-dark shadow-sm d-none d-lg-flex">
      <a className="navvbar-brand" href='/'>
        <img src={logo} alt="Logo" className="d-inline align-top" style={{height: "30px"}}/>
      </a>
      <ul className="navbar-nav flex-row mr-auto">
        <li className="nav-item">
          <a href="/" className="nav-link">
            Home
          </a>
        </li>
        <li className="nav-item">
          <a href="/favorite" className="nav-link">
            Favorite
          </a>
        </li>
      </ul>
      <div className="d-flex align-items-center">
        <DateRangePickerWidget selectDateRange={selectDateRange} setSelectDateRange={setSelectDateRange} />
      </div>
    </nav>
  );
};
