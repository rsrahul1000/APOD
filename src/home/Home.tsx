import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Cards } from "../layout/Cards";
import { TopNavBar } from "../layout/TopNavBar";
import { TopNavBarMobile } from "../layout/TopNavBarMobile";
import {
  fetchLatestImages,
  fetchDateRangeImages,
} from "../redux/redux-toolkit";
import { imageData } from "../types/types";
import GridLoader from "react-spinners/GridLoader";
import CircleLoader from "react-spinners/CircleLoader";

interface Props {}

export const Home: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();

  const fetchStatus = useSelector((state: any) => state.allImageData.status) as
    | string
    | null;
  const allImageData = useSelector(
    (state: any) => state.allImageData.allImageData
  ) as imageData[];

  // Lazy Loading Logic
  const [isFetching, setIsFetching] = useState(false);
  const [firstLoad, setFirstLoad] = useState(false);
  useEffect(() => {
    dispatch(fetchLatestImages());
    setFirstLoad(true);
    window.addEventListener("scroll", handleScroll);
  }, [dispatch]);

  const handleScroll = () => {
    if (
      Math.ceil(window.innerHeight + document.documentElement.scrollTop) !==
        document.documentElement.offsetHeight ||
      isFetching
    )
      return;
    setIsFetching(true);
  };

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreImageData();
    // return () => setIsFetching(false);
  }, [isFetching]);

  const fetchMoreImageData = () => {
    dispatch(fetchLatestImages());
    setIsFetching(false);
  };

  // Date Range Logic
  const [selectDateRange, setSelectDateRange] = useState({
    start: moment(), //.subtract(29, "days"),
    end: moment(),
  });

  useEffect(() => {
    if (firstLoad) dispatch(fetchDateRangeImages(selectDateRange));
  }, [selectDateRange]);

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
      {fetchStatus !== "success" && allImageData.length === 0 ? (
        <div className="loader">
          <GridLoader
            color={"#000000"}
            loading={fetchStatus !== "success"}
            size={10}
          />
        </div>
      ) : (
        <>
          <div className="row m-0 mt-5 pt-3">
            <div className="col-xl-12 mx-auto">
              <div className="row m-0">
                <div className="col-lg-9 mx-auto p-0">
                  <div className="row">
                    <Cards
                      allImageData={allImageData}
                      fetchStatus={fetchStatus}
                      isFetching={isFetching}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {(isFetching || fetchStatus === "loading") && (
            <div className="row pb-5 mb-3 justify-content-center">
              <CircleLoader color={"#000000"} loading={true} size={30} />
            </div>
          )}
        </>
      )}
    </>
  );
};
