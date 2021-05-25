export interface imageData {
  copyright?: string;
  date: Date | string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version?: string;
  title: string;
  url: string;
  like?: boolean;
}

export interface DateRange {
  start: moment.Moment;
  end: moment.Moment;
}

export interface ErrorReveive {
  code: number;
  msg: string;
  service_version: string;
};

export interface State {
  allImageData: imageData[] | ErrorRecieve;
  favorateData: imageData[];
  status: string | null;
}
