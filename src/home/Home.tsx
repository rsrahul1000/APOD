import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Cards } from "../layout/Cards";
import { fetchLatestImages } from "../redux/redux-toolkit";
import { imageData, State } from "../types/types";

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
  //   if (fetchStatus !== "success") return <div className="p-5">Loading</div>;
  //   else
  return (
    <div className="row m-0 mt-5 pt-3">
      <div className="col-xl-12 mx-auto">
        <div className="row m-0">
          <div className="col-lg-9 mx-auto p-0">
            <div className="row">
              <Cards allImageData={allImageData} fetchStatus={fetchStatus} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
