export interface IGaussPoint {
  x: number;
  y: number;
}

export interface IDataAnalys {
  dispersion: number;
  mathExpec: number;
  pointCount: number;
  averSqrtDev: number;
}

export interface IPoint {
  N: number;
  x: number;
  deviation: number;
  sqrtDev: number;
}

export interface IResult {
  Xaver: number;
  kStudent: number;
  averMathAverDev: number;
  averDev: number;
  dovInter: number;
  dispersion: number;
  count: number;
  data: number[];
  resData: IPoint[];
  absErr: number;
  otnErr: number;
}
