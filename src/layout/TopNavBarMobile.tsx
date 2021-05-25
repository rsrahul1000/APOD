import React from "react";
import { DateRange } from "../types/types";
import { DateRangePickerWidget } from "./DateRangePickerWidget";
import logo from "../logo.png";

interface Props {
  selectDateRange: DateRange;
  setSelectDateRange: React.Dispatch<React.SetStateAction<DateRange>>;
}

export const TopNavBarMobile = ({
  selectDateRange,
  setSelectDateRange,
}: Props) => {
  return (
    <nav className="navbar navbar-dark d-xxl-none d-xl-none d-lg-none fixed-top bg-dark shadow-sm">
      <a className="navvbar-brand" href="/">
        <img
          src={logo}
          alt="Logo"
          className="d-inline align-top"
          style={{ height: "30px" }}
        />
      </a>

      {window.location.pathname !== "/favorite" && (
        <div className="ml-auto order-0">
          <DateRangePickerWidget
            selectDateRange={selectDateRange}
            setSelectDateRange={setSelectDateRange}
          />
        </div>
      )}
      <div id="dateBarMobile" className="w-100 allign"></div>
    </nav>
  );
};
