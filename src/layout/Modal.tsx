import React from "react";
import { imageData } from "../types/types";

interface Props {
  data: imageData;
  closeModal: () => void;
}

export const Modal: React.FC<Props> = ({ data, closeModal }: Props) => {
  return (
    <div
      className="modal fade"
      id="apodDataModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="apodDataModalLongTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg pb-5" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="apodDataModalLongTitle">
              {data.title}
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="card">
              <div className="card-body">
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
                        src={data.hdurl}
                        alt=""
                        className="card-img w-50 mx-auto p-4"
                      />
                    </div> 
                <p className="card-text w-100" id="previewPost" style={{textAlign:"justify"}}>
                    {data.explanation}
                </p>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={() => closeModal()}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
