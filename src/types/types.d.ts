export interface imageData {
  copyright?: string;
  date: Date | string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version?: string;
  title: string;
  url: string;
}

export interface DateRange {
  start: moment.Moment;
  end: moment.Moment;
}

export interface State {
  allImageData: imageData[];
  status: string | null;
}
