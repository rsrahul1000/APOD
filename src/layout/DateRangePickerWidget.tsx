import moment from "moment";
import React from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { DateRange } from "../types/types";

interface Props {
  selectDateRange: DateRange;
  setSelectDateRange: React.Dispatch<React.SetStateAction<DateRange>>;
}

export const DateRangePickerWidget: React.FC<Props> = ({
  selectDateRange,
  setSelectDateRange,
}: Props) => {
  const handleDateRangeSelectionCallback = (
    start: moment.Moment,
    end: moment.Moment
  ) => {
    setSelectDateRange({ start, end });
  };

  const { start, end } = selectDateRange;
  const label =
    start.format("MMMM D, YYYY") + " - " + end.format("MMMM D, YYYY");

  return (
    <DateRangePicker
      initialSettings={{
        startDate: start.toDate(),
        endDate: end.toDate(),
        ranges: {
          Today: [moment().toDate(), moment().toDate()],
          Yesterday: [
            moment().subtract(1, "days").toDate(),
            moment().subtract(1, "days").toDate(),
          ],
          "Last 7 Days": [
            moment().subtract(7, "days").toDate(),
            moment().subtract(1, "days").toDate(),
          ],
          "Last 30 Days": [
            moment().subtract(30, "days").toDate(),
            moment().subtract(1, "days").toDate(),
          ],
          "This Month": [
            moment().startOf("month").toDate(),
            moment().endOf("month").toDate(),
          ],
          "Last Month": [
            moment().subtract(1, "month").startOf("month").toDate(),
            moment().subtract(1, "month").endOf("month").toDate(),
          ],
        },
      }}
      onCallback={handleDateRangeSelectionCallback}>
      <div
        id="reportrange"
        className="col-auto ml-sm-auto"
        style={{
          background: "#fff",
          cursor: "pointer",
          padding: "5px 10px",
          border: "1px solid #ccc",
          width: "fit-content",
        }}>
        <i className="fa fa-calendar"></i>&nbsp;
        <span>{label}</span> <i className="fa fa-caret-down"></i>
      </div>
    </DateRangePicker>
  );
};
