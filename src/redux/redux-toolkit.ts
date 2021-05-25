import {
  configureStore,
  createSlice,
  createAsyncThunk,
  getDefaultMiddleware,
  PayloadAction,
} from "@reduxjs/toolkit";
// import axios from "axios";
import { DateRange, imageData } from "../types/types";
import logger from "redux-logger";

type allImageDataType = {
  allImageData: imageData[];
  favorateData: imageData[];
  status: string | null;
};

const BASE_URL =
  "https://api.nasa.gov/planetary/apod?api_key=booqP1GLK8AtqxLZPVtrvdokY8UJG4wJHSJUJ6WQ";

// Fetch Images for Default Home Images
export const fetchLatestImages = createAsyncThunk(
  "get/latest10Images",
  async () => {
    return fetch(`${BASE_URL}&count=10`)
      .then((res) => res.json())
      .catch((error) => console.log(error));
  }
);

// Fetch Image Data Based on Date Range
export const fetchDateRangeImages = createAsyncThunk(
  "get/dateRangeImages",
  async ({ start, end }: DateRange) => {
    return fetch(
      `${BASE_URL}&start_date=${start.format(
        "YYYY-MM-DD"
      )}&end_date=${end.format("YYYY-MM-DD")}`
    )
      .then((res) => res.json())
      .catch((error) => console.log(error));
  }
);

const allImageInitialDataType: allImageDataType = {
  allImageData: [],
  favorateData: JSON.parse(localStorage.getItem("favorate")!) || [],
  status: null,
};

const allImageDataSlice = createSlice({
  name: "allImageData",
  initialState: allImageInitialDataType,
  reducers: {
    getAllFavorite: (state) => {
      state.favorateData = JSON.parse(localStorage.getItem("favorate")!) || [];
      state.status = "success";
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
          localStorage.setItem("favorate", JSON.stringify(state.favorateData));
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
      state.allImageData = state.allImageData.reduce<imageData[]>((acc, current:imageData) => {
        const x = acc.find(item => item.url === current.url);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);
      state.status = "success";
    },
    [fetchLatestImages.rejected.type]: (state, action) => {
      state.status = "failed";
    },
    [fetchDateRangeImages.pending.type]: (state) => {
      state.status = "loading";
    },
    [fetchDateRangeImages.fulfilled.type]: (state, action) => {
      state.allImageData = action.payload;
      state.status = "success";
    },
    [fetchDateRangeImages.rejected.type]: (state) => {
      state.status = "failed";
    },
  },
});

export const { favorate: favorate, getAllFavorite: getAllFavorite } =
  allImageDataSlice.actions;

const reducer = {
  allImageData: allImageDataSlice.reducer,
};

export default configureStore({
  reducer,
  devTools: true,
  middleware: [...getDefaultMiddleware(), logger],
});
