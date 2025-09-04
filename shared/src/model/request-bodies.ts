export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface CreateTripRequest {
  tripName: string;
  destination: string;
  startingDate: Date;
  endingDate: Date;
}
