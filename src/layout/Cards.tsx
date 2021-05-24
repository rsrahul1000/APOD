import React, { useState } from "react";
import { imageData, State } from "../types/types";
import { Modal } from "./Modal";

interface Props {
  allImageData: imageData[];
  fetchStatus: string | null;
}

export const Cards: React.FC<Props> = ({
  allImageData,
  fetchStatus,
}: Props) => {
  const [openedModal, setOpenedModal] = useState(null as null | string);
  const closeModal = () => {
    setOpenedModal(null);
  }
  if (fetchStatus !== "success") return <div className="p-5">Loading</div>;
  else
    return (
      <>
        {fetchStatus === "success" &&
          allImageData &&
          allImageData.map((data, index) => {
            return (
              <div
                className="col-lg-4 col-md-6 col-sm-12 mb-2 p-2 post-preview d-flex"
                key={data.url}
              >
                <div className="card post-content">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <h4 className="card-title text-wrap text-break">
                        {data.title}
                      </h4>
                    </div>
                    <p
                      className="d-flex card-text"
                      style={{ marginBottom: "-13px" }}
                    >
                      <small
                        className="text-muted text-truncate"
                        style={{ maxWidth: "33%" }}
                      >
                        {data.date}
                      </small>
                      {data.copyright && (
                        <>
                          <small className="px-2">|</small>
                          <small
                            className="text-muted text-truncate"
                            style={{ maxWidth: "33%" }}
                          >
                            {data.copyright}
                          </small>
                        </>
                      )}
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
                      <i className="material-icons align-middle">
                        favorite_border
                      </i>
                    </button>
                    <button
                      type="button"
                      className="btn blog-btn-grad btn-primary"
                      data-toggle="modal"
                      data-target="#apodDataModal"
                      onClick={() => setOpenedModal(data.url)}
                    >
                      Read More
                    </button>
                    {data.url == openedModal && <Modal data={data} key={data.url} closeModal={closeModal} /> }
                  </div>
                </div>
              </div>
            );
          })}
      </>
    );
};
