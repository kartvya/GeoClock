import {useEffect, useState, useRef, useMemo} from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import {Attendance} from '../services/apis/user/userApi';

dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

export const useLiveTimerFromLastLogin = (dailySummaries: Attendance[]) => {
  const [timeDiff, setTimeDiff] = useState('00:00:00');
  const [lastClockInTime, setLastClockInTime] = useState<string | null>(null);

  const activeAttendance = useMemo(() => {
    return dailySummaries
      ?.slice()
      .reverse()
      .find(att => att.check_out === null);
  }, [dailySummaries]);

  const checkInTimeRef = useRef<dayjs.Dayjs | null>(null);

  useEffect(() => {
    if (!activeAttendance) {
      setTimeDiff('00:00:00');
      setLastClockInTime(null);
      checkInTimeRef.current = null;
      return;
    }

    const checkInTime = dayjs.utc(activeAttendance.check_in).local();
    checkInTimeRef.current = checkInTime;

    setLastClockInTime(checkInTime.format('hh:mm A'));

    const interval = setInterval(() => {
      if (!checkInTimeRef.current) return;

      const now = dayjs();
      const diff = now.diff(checkInTimeRef.current);
      const d = dayjs.duration(diff);

      const hours = String(Math.floor(d.asHours())).padStart(2, '0');
      const minutes = String(d.minutes()).padStart(2, '0');
      const seconds = String(d.seconds()).padStart(2, '0');

      setTimeDiff(`${hours}:${minutes}:${seconds}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [activeAttendance]);

  return {timeDiff, lastClockInTime};
};
