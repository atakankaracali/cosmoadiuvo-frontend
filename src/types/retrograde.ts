export interface RetrogradeData {
    mercury?: {
      start_date: string;
      end_date: string;
      zodiac_signs: string[];
      effects: string;
    }[];
    venus?: {
      start_date: string;
      end_date: string;
      zodiac_signs: string[];
      effects: string;
    }[];
    mars?: {
      start_date: string;
      end_date: string;
      zodiac_signs: string[];
      effects: string;
    }[];
    jupiter?: {
      start_date: string;
      end_date: string;
      zodiac_signs: string[];
      effects: string;
    }[];
    saturn?: {
      start_date: string;
      end_date: string;
      zodiac_signs: string[];
      effects: string;
    }[];
    uranus?: {
      start_date: string;
      end_date: string;
      zodiac_signs: string[];
      effects: string;
    }[];
    neptune?: {
      start_date: string;
      end_date: string;
      zodiac_signs: string[];
      effects: string;
    }[];
    pluto?: {
      start_date: string;
      end_date: string;
      zodiac_signs: string[];
      effects: string;
    }[];
  }
  
  export interface RetrogradeItem {
    start_date: string;
    end_date: string;
    zodiac_signs: string[];
    effects: string;
  }