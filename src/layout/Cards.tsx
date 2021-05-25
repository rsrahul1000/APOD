import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { favorate } from "../redux/redux-toolkit";
import { ErrorReveive, imageData } from "../types/types";
import { Modal } from "./Modal";
import NoData from "../assets/images/empty.svg";
import moment from "moment";

interface Props {
  allImageData: imageData[];
  fetchStatus: string | null;
  isFetching?: boolean;
  error?: ErrorReveive | null;
}

export const Cards: React.FC<Props> = ({
  allImageData,
  fetchStatus,
  isFetching,
  error,
}: Props) => {
  const dispatch = useDispatch();
  const [openedModal, setOpenedModal] = useState(null as null | string);
  const closeModal = () => {
    setOpenedModal(null);
  };

  const handleLike = (data: imageData) => {
    dispatch(favorate({ data }));
  };

  const youtube_parser = (url: string) => {
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : "";
  };

  const vimeo_parser = (url: string) => {
    var regExp =
      /https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/;
    var match = url.match(regExp);
    return match ? match[3] : "";
  };
  if (error) {
    return (
      <div className="justify-content-center">
        <img
          src={NoData}
          alt="No Data"
          className="card-img mx-auto my-auto w-50"
        />
        <h3 className="mt-2">{error.code}</h3>
        <p className="strong mx-auto">{error.msg}</p>
      </div>
    );
  } else if (
    fetchStatus === "success" &&
    allImageData.length === 0 &&
    !isFetching
  )
    return (
      <div className="justify-content-center">
        <img
          src={NoData}
          alt="No Data"
          className="card-img mx-auto my-auto w-50"
        />
         <h4 className="mt-2">No Data</h4>
      </div>
    );
  else
    return (
      <>
        {allImageData &&
          allImageData.length > 0 &&
          allImageData.map((data) => {
            return (
              <div
                className="col-lg-4 col-md-6 col-sm-12 mb-2 p-2 post-preview d-flex align-items-stretch justify-content-center"
                key={data.url}>
                <div className="card post-content d-flex align-items-stretch">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <h4 className="card-title text-wrap text-break">
                        {data.title}
                      </h4>
                    </div>
                    <p
                      className="d-flex card-text"
                      style={{ marginBottom: "-13px" }}>
                      <small
                        className="text-muted text-truncate"
                        style={{ maxWidth: "33%" }}>
                        {moment(data.date).format("LL")}
                      </small>
                      {data.copyright && (
                        <>
                          <small className="px-2">|</small>
                          <small
                            className="text-muted text-truncate"
                            style={{ maxWidth: "33%" }}>
                            {data.copyright}
                          </small>
                        </>
                      )}
                      <small className="px-2">|</small>
                      <small
                        className="text-muted text-truncate"
                        style={{ maxWidth: "33%" }}>
                        {data.media_type}
                      </small>
                    </p>
                    <div className="justify-content-between">
                      <img
                        src={
                          data.media_type === "video" &&
                          youtube_parser(data.url) !== ""
                            ? `https://img.youtube.com/vi/${youtube_parser(
                                data.url
                              )}/0.jpg`
                            : vimeo_parser(data.url) !== ""
                            ? `https://vumbnail.com/${vimeo_parser(
                                data.url
                              )}.jpg`
                            : data.url
                        }
                        alt=""
                        className="card-img w-50 mx-auto p-4"
                      />
                    </div>
                  </div>
                  <div className="card-footer d-flex justify-content-between">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => handleLike(data)}>
                      <i className="material-icons align-middle">
                        {data.like ? "favorite" : "favorite_border"}
                      </i>
                    </button>
                    <button
                      type="button"
                      className="btn blog-btn-grad btn-primary"
                      data-toggle="modal"
                      data-target="#apodDataModal"
                      onClick={() => setOpenedModal(data.url)}>
                      Read More
                    </button>
                    {data.url === openedModal && (
                      <Modal
                        data={data}
                        key={data.url}
                        closeModal={closeModal}
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </>
    );
};
