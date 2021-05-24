import {
  configureStore,
  createSlice,
  createAsyncThunk,
  getDefaultMiddleware,
  PayloadAction,
} from "@reduxjs/toolkit";
// import axios from "axios";
import { imageData } from "../types/types";
import logger from "redux-logger";

type allImageDataType = {
  allImageData: imageData[];
  favorateData: imageData[];
  status: string | null;
};

const BASE_URL =
  "https://api.nasa.gov/planetary/apod?api_key=booqP1GLK8AtqxLZPVtrvdokY8UJG4wJHSJUJ6WQ";

export const fetchLatestImages = createAsyncThunk(
  "get/latest10Images",
  async () => {
    //await axios.get(`${BASE_URL}&count=10`)
    return fetch(`${BASE_URL}&count=10`)
      .then((res) => res.json())
      .catch((error) => console.log(error));
  }
);

const allImageInitialDataType: allImageDataType = {
  allImageData: [],
  favorateData: JSON.parse(localStorage.getItem("favorate")!) || [],
  status: null,
};

// function custom_sort(a: imageData, b: imageData) {
//   return new Date(a.date).getDate() - new Date(b.date).getDate();
// }

const allImageDataSlice = createSlice({
  name: "allImageData",
  initialState: allImageInitialDataType,
  reducers: {
    get: (state, { payload }: PayloadAction<{ url: string }>) => {
      const imgData = state.allImageData.find((img) => img.url === payload.url);
      if (imgData) {
        // imgData;
      }
    },
    favorate: (state, { payload }: PayloadAction<{ data: imageData }>) => {
      const imgData = state.allImageData.find(
        (img) => img.url === payload.data.url
      );
      if (imgData) {
        imgData.like = payload.data.like ? false : true;
        if (imgData.like) {
          state.favorateData.push(imgData);
          localStorage.setItem("favorate", JSON.stringify(state.favorateData));
        } else {
          const favorateDataIndex = state.favorateData.findIndex(
            (img) => img.url === payload.data.url
          );
          if (favorateDataIndex !== -1) {
            state.favorateData.splice(favorateDataIndex, 1);
            localStorage.setItem(
              "favorate",
              JSON.stringify(state.favorateData)
            );
          }
        }
      } else {
        const favorateDataIndex = state.favorateData.findIndex(
          (img) => img.url === payload.data.url
        );
        if (favorateDataIndex !== -1) {
          state.favorateData.splice(favorateDataIndex, 1);
          localStorage.setItem(
            "favorate",
            JSON.stringify(state.favorateData)
          );
        }
      }
    },
  },
  extraReducers: {
    [fetchLatestImages.pending.type]: (state, action) => {
      state.status = "loading";
    },
    [fetchLatestImages.fulfilled.type]: (state, action) => {
      action.payload.sort(
        (a: imageData, b: imageData) =>
          new Date(a.date).getDate() - new Date(b.date).getDate()
      );
      state.allImageData = state.allImageData.concat(action.payload);
      state.status = "success";
    },
    [fetchLatestImages.rejected.type]: (state, action) => {
      state.status = "failed";
    },
  },
});

export const { favorate: favorate } = allImageDataSlice.actions;

const reducer = {
  allImageData: allImageDataSlice.reducer,
};

export default configureStore({
  reducer,
  devTools: true,
  middleware: [...getDefaultMiddleware(), logger],
});
