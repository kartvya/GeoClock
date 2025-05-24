import {apiMethod, endpoint} from '../../config/apiConstants';
import backendBaseApi from '../../config/backendBaseApi';

export interface Attendance {
  staff_id: string;
  date: string;
  check_in: string;
  check_out: string | null;
  total_hours: number | null;
  effective_hours: number | null;
  is_auto_checkout: boolean;
  id: string;
  created_at: string;
  updated_at: string;
}

export interface DailySummary {
  date: string;
  total_hours: number;
  effective_hours: number;
  attendances: Attendance[];
}

interface OverallSummary {
  total_hours: number;
  effective_hours: number;
}

export interface UserSummary {
  daily_summaries: DailySummary[];
  overall_summary: OverallSummary;
}

const UserService = backendBaseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: build => ({
    refreshToken: build.mutation({
      query: refreshToken => ({
        url: endpoint.refreshToken,
        method: apiMethod.post,
        body: {refreshToken},
      }),
    }),

    getUserProfileDetails: build.query<any, void>({
      query: () => ({
        url: endpoint.getUserInfo,
        method: apiMethod.get,
      }),
      keepUnusedDataFor: 0,
    }),

    clockIn: build.mutation<any, void>({
      query: () => ({
        url: endpoint.clockIn,
        method: apiMethod.post,
      }),
    }),

    clockOut: build.mutation<any, void>({
      query: () => ({
        url: endpoint.clockOut,
        method: apiMethod.post,
      }),
    }),

    getClockStatus: build.query<UserSummary, {start: string; end: string}>({
      query: ({start, end}) => {
        const url = `${endpoint.clockStatus}?start_date=${start}&end_date=${end}`;
        return {
          url,
          method: apiMethod.get,
        };
      },
      keepUnusedDataFor: 0,
    }),

    getTodaysAttendance: build.query<DailySummary, void>({
      query: () => ({
        url: endpoint.getTodaysAttendance,
        method: apiMethod.get,
      }),
      keepUnusedDataFor: 0,
    }),
  }),
});

export const {
  useLazyGetUserProfileDetailsQuery,
  useClockInMutation,
  useClockOutMutation,
  useGetClockStatusQuery,
  useLazyGetClockStatusQuery,
  useGetTodaysAttendanceQuery,
  useRefreshTokenMutation,
} = UserService;
