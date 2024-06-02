export interface ICommonResponse {
    message: string;
    statusCode: number; // Assuming you want to use the numeric representation of HttpStatusCode
    data: any;
  }