import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Cards } from "../layout/Cards";
import { TopNavBar } from "../layout/TopNavBar";
import { TopNavBarMobile } from "../layout/TopNavBarMobile";
import { ErrorReveive, imageData } from "../types/types";
import { getAllFavorite } from "../redux/redux-toolkit";

interface Props {}

export const Favorate: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();

  const error = useSelector(
    (state: any) => state.allImageData.error
  ) as null | ErrorReveive;
  const fetchStatus = useSelector((state: any) => state.allImageData.status) as
    | string
    | null;
  const favorateImageData = useSelector(
    (state: any) => state.allImageData.favorateData
  ) as imageData[];

  useEffect(() => {
    // favorateImageData = JSON.parse(localStorage.getItem('favorite')!) || [];
    dispatch(getAllFavorite());
  }, []);

  const [selectDateRange, setSelectDateRange] = useState({
    start: moment(), //.subtract(29, "days"),
    end: moment(),
  });

  return (
    <>
      <TopNavBar
        selectDateRange={selectDateRange}
        setSelectDateRange={setSelectDateRange}
      />
      <TopNavBarMobile
        selectDateRange={selectDateRange}
        setSelectDateRange={setSelectDateRange}
      />
      <div className="row m-0 mt-5 pt-3">
        <div className="col-lg-9 mx-auto">
          <div className="row m-0">
            <Cards
              allImageData={favorateImageData}
              fetchStatus={fetchStatus}
              error={error}
            />
          </div>
        </div>
      </div>
    </>
  );
};
