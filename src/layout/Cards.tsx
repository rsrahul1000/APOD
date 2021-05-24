import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { fetchLatestImages } from "../redux/redux-toolkit";
import { imageData, State } from "../types/types";

interface Props {
  allImageData: imageData[];
  fetchStatus: string | null;
}

export const Cards: React.FC<Props> = ({
  allImageData,
  fetchStatus,
}: Props) => {
  if (fetchStatus !== "success") return <div className="p-5">Loading</div>;
  else
  return <> {
    fetchStatus === "success" &&
      allImageData &&
      allImageData.map((data) => {
        return (
          <div className="col-lg-4 col-md-6 col-sm-12 mb-2 p-2 post-preview d-flex">
            <div className="card post-content">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h3 className="card-title text-wrap text-break">
                    {data.title}
                  </h3>
                </div>
                <p className="card-text" style={{ marginBottom: "-13px" }}>
                  <div className="d-flex">
                    <small
                      className="text-muted text-truncate py-1"
                      style={{ maxWidth: "33%" }}
                    >
                      {data.date}
                    </small>
                    {data.copyright && (
                      <div>
                        <small className="px-2">|</small>
                        <small
                          className="text-muted text-truncate"
                          style={{ maxWidth: "33%" }}
                        >
                          {data.copyright}
                        </small>
                      </div>
                    )}
                  </div>
                </p>
                <div className="justify-content-between">
                  <img
                    src={data.url}
                    alt=""
                    className="card-img w-50 mx-auto p-4"
                  />
                </div>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <button type="button" className="btn btn-secondary">
                  <i className="material-icons align-middle">favorite_border</i>
                </button>
                <a href="#" className="btn blog-btn-grad btn-primary">
                  Read More
                </a>
              </div>
            </div>
          </div>
        );
      })
  } </>
};

// const mapStateToProps = (state: State) => {
//   return {
//     allImageData: state.allImageData,
//     status: state.status
//   }
// }

// export default connect(mapStateToProps)(Cards);
