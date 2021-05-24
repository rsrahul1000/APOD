import React from "react";
import { DateRange } from "../types/types";
import { DateRangePickerWidget } from "./DateRangePickerWidget";

interface Props {
  selectDateRange: DateRange,
  setSelectDateRange: React.Dispatch<React.SetStateAction<DateRange>>
}

export const TopNavBarMobile = ({selectDateRange, setSelectDateRange}: Props) => {
  return (
    <nav className="navbar navbar-dark d-xxl-none d-xl-none d-lg-none fixed-top bg-dark shadow-sm">
      {/* <a
        className="navbar-brand search-toggle"
        href="/"
        style={{ display: "block" }}
      >
        <img
          src="{{ url_for('static', filename='assets/images/persistent-systems-header-logo.png') }}"
          width="14"
          className="d-inline-block align-top"
          alt=""
        />
      </a> */}

      <div className="mx-auto order-0">
      <DateRangePickerWidget selectDateRange={selectDateRange} setSelectDateRange={setSelectDateRange} />
      </div>
      <div id="dateBarMobile" className="w-100 allign">
        
      </div>
    </nav>
  );
};