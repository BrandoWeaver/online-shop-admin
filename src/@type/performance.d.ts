declare namespace IshopPerformance {
  export interface IWeeklyPerformance {
    weeklyPerformance: WeeklyPerformance[];
    specificWeek: SpecificWeek;
  }

  export interface WeeklyPerformance {
    _id: Id;
    totalOrders: number;
    totalAmount: number;
  }

  export interface Id {
    year: number;
    week: number;
    status: string;
  }

  export interface SpecificWeek {
    year: number;
    week: number;
    totalOrders: number;
    totalAmount: string;
    pending: number;
    processing: number;
    completed: number;
    cancelled: number;
  }

  export interface TotalIncome {
    message: string;
    data: Data;
  }

  export interface Data {
    totalIncome: number;
    totalOrders: number;
  }
}
