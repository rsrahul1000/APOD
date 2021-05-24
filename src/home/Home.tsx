import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Cards } from "../layout/Cards";
import { TopNavBar } from "../layout/TopNavBar";
import { TopNavBarMobile } from "../layout/TopNavBarMobile";
import { fetchLatestImages } from "../redux/redux-toolkit";
import { imageData, State } from "../types/types";
import GridLoader from "react-spinners/GridLoader";

interface Props {}

export const Home: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const fetchStatus = useSelector((state: any) => state.allImageData.status) as
    | string
    | null;
  const allImageData = useSelector(
    (state: any) => state.allImageData.allImageData
  ) as imageData[];

  useEffect(() => {
    dispatch(fetchLatestImages());
  }, [dispatch]);

  const [selectDateRange, setSelectDateRange] = useState({
    start: moment().subtract(29, "days"),
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
      {fetchStatus !== "success" ? (
        <div className="loader">
          <GridLoader
            color={"#000000"}
            loading={fetchStatus !== "success"}
            size={10}
          />
        </div>
      ) : (
        <div className="row m-0 mt-5 pt-3">
          <div className="col-xl-12 mx-auto">
            <div className="row m-0">
              <div className="col-lg-9 mx-auto p-0">
                <div className="row">
                  <Cards
                    allImageData={allImageData}
                    fetchStatus={fetchStatus}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
