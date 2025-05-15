export interface HoroscopeResponse {
    sign: string;
    date: string;
    language: string;
    generalMessage: string;
    ratings: {
      love: number;
      luck: number;
      career: number;
      health: number;
    };
  }
  