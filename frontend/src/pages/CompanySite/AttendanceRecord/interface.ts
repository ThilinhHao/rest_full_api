import { ETimeShift } from 'constants/constants';

export interface ITimeAttendance {
  date: string;
  day_shift: ETimeShift.ACTIVITY | ETimeShift.NOT_ACTIVITY;
  id?: number;
  leave: number;
  night_shift: number;
  staff_id: number;
}
export const defaultTimeAttendance = {
  date: '',
  day_shift: ETimeShift.NOT_ACTIVITY,
  leave: ETimeShift.NOT_ACTIVITY,
  night_shift: ETimeShift.NOT_ACTIVITY,
  staff_id: ETimeShift.NOT_ACTIVITY,
};

export interface IStaff {
  name: string;
  staff_id: number;
  staff_disconnect_time: string | null;
  time_attendance: ITimeAttendance[];
}

export type IWeekType = 0 | 1 | 2 | 3 | 4 | 5 | 6;
