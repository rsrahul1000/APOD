import {
  configureStore,
  createSlice,
  createAsyncThunk,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
// import axios from "axios";
import { imageData } from "../types/types";
import logger from "redux-logger";

type allImageDataType = {
  allImageData: imageData[];
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
  allImageData: [
    // {
    //   date: "2006-03-27",
    //   explanation:
    //     "Why are there so many moonquakes?   A recent reanalysis of seismometers left on the moon by the Apollo moon landings has revealed a surprising number of moonquakes occurring within 30 kilometers of the surface.   In fact, 28 moonquakes were detected in data recorded between 1972 and 1977.   These moonquakes were not only strong enough to move furniture but the stiff rock of the moon continued vibrating for many minutes, significantly longer than the soft rock earthquakes on Earth.   The cause of the moonquakes remains unknown, with one hypothesis holding that landslides in craters cause the vibrations.   Regardless of the source, future moon buildings need to be built to withstand the frequent shakings.   Pictured above in 1969, Apollo 11 astronaut Buzz Aldrin stands besides a recently deployed lunar seismometer, looking back toward the lunar landing module.",
    //   hdurl:
    //     "https://apod.nasa.gov/apod/image/0603/aldrinseismometer_apollo11_big.jpg",
    //   media_type: "image",
    //   service_version: "v1",
    //   title: "Moonquakes Surprisingly Common",
    //   url: "https://apod.nasa.gov/apod/image/0603/aldrinseismometer_apollo11.jpg",
    // },
    // {
    //   copyright: "Bill Jelen",
    //   date: "2017-02-18",
    //   explanation:
    //     "As seen from Cocoa Beach Pier, Florida, planet Earth, the Moon rose at sunset on February 10 while gliding through Earth's faint outer shadow. In progress was the first eclipse of 2017, a penumbral lunar eclipse followed in this digital stack of seaside exposures. Of course, the penumbral shadow is lighter than the planet's umbral shadow. That central, dark, shadow is easily seen on the lunar disk during a total or partial lunar eclipse. Still, in this penumbral eclipse the limb of the Moon grows just perceptibly darker as it rises above the eastern horizon. The second eclipse of 2017 could be more dramatic though. With viewing from a path across planet Earth's southern hemisphere, on February 26 there will be an annular eclipse of the Sun.",
    //   hdurl:
    //     "https://apod.nasa.gov/apod/image/1702/BillJelenLunarEclipse10Stack-1.jpg",
    //   media_type: "image",
    //   service_version: "v1",
    //   title: "Penumbral Eclipse Rising",
    //   url: "https://apod.nasa.gov/apod/image/1702/BillJelenLunarEclipse10Stack-1.jpg",
    // },
  ],
  status: null,
};

function custom_sort(a: imageData, b: imageData) {
  return new Date(a.date).getDate() - new Date(b.date).getDate();
}

const allImageDataSlice = createSlice({
  name: "allImageData",
  initialState: allImageInitialDataType,
  reducers: {
    // get: (state, { payload }: PayloadAction<{ url: string }>) => {
    //   const imgData = state.find((img) => img.url === payload.url);
    //   if (imgData) {
    //     imgData;
    //   }
    // },
  },
  extraReducers: {
    [fetchLatestImages.pending.type]: (state, action) => {
      state.status = "loading";
    },
    [fetchLatestImages.fulfilled.type]: (state, action) => {
      action.payload.sort((a: imageData, b: imageData) =>  new Date(a.date).getDate() - new Date(b.date).getDate());
      state.allImageData = state.allImageData.concat(action.payload);
      state.status = "success";
    },
    [fetchLatestImages.rejected.type]: (state, action) => {
      state.status = "failed";
    },
  },
});

const reducer = {
  allImageData: allImageDataSlice.reducer,
};

export default configureStore({
  reducer,
  devTools: true,
  middleware: [...getDefaultMiddleware(), logger],
});
