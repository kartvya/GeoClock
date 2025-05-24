import dayjs from 'dayjs';
import React, {useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {colors} from '../../../assets/colors/colors';
import {CustomText} from '../../../components';
import {Icons} from '../../../components/Icons';
import Spacer from '../../../components/Spacer';
import {useLiveTimerFromLastLogin} from '../../../helpers/globalFunctions';
import {
  DailySummary,
  useClockInMutation,
  useClockOutMutation,
} from '../../../services/apis/user/userApi';
import AttendanceToggleButton from './AttendanceToggleButton';

interface AttendanceTrackerPayload {
  userAttendaceStatus: DailySummary;
  refetch: () => void;
  isLoading: boolean;
  selectedDate: string;
}

const HomeDatePicker: React.FC<AttendanceTrackerPayload> = ({
  userAttendaceStatus,
  refetch,
  isLoading,
  selectedDate,
}) => {
  const [clockIn] = useClockInMutation();
  const [clockOut] = useClockOutMutation();

  const [loading, setLoading] = useState(false);
  const formattedDate = dayjs().format('D MMMM dddd');

  const activeSession = useMemo(() => {
    return userAttendaceStatus?.attendances?.find(entry => !entry.check_out);
  }, [userAttendaceStatus?.attendances]);
  const isClockedIn = !!activeSession;

  const handleAttendanceToggle = async () => {
    setLoading(true);
    try {
      if (isClockedIn) {
        await clockOut().unwrap();
      } else {
        await clockIn().unwrap();
      }
      await refetch();
    } catch (error) {
      console.error('Clock in/out failed', error);
    } finally {
      setLoading(false);
    }
  };

  const {timeDiff, lastClockInTime} = useLiveTimerFromLastLogin(
    userAttendaceStatus?.attendances || [],
  );

  if (dayjs().utc().format('YYYY-MM-DD') !== selectedDate) return null;

  return (
    <>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.iconConatiner}>
              <Icons
                type="AntDesign"
                name="idcard"
                color={colors.black}
                size={RFPercentage(3)}
              />
            </View>
            <Spacer gap={RFPercentage(0.5)} />
            <View>
              <CustomText text="Attendance" fontWeight="600" />
              <View style={styles.row}>
                <CustomText text="Date:" fontWeight="400" />
                <Spacer gap={RFPercentage(0.5)} />
                <CustomText text={formattedDate} fontWeight="500" />
              </View>
            </View>
          </View>
          <Icons type="AntDesign" name="right" size={RFPercentage(2)} />
        </View>
        <Spacer gap={RFPercentage(0.5)} />
        <AttendanceToggleButton
          isClockedIn={isClockedIn}
          loading={loading || isLoading}
          onToggle={handleAttendanceToggle}
          timeSinceLastLogin={timeDiff}
          lastClockInTime={lastClockInTime || ''}
        />
      </View>
      {/* {showPicker &&
        (Platform.OS === 'ios' ? (
          <Modal transparent animationType="slide">
            <Pressable
              style={styles.modalContainer}
              onPress={() => {
                setSelectedDate(new Date()); // Reset to default
                setShowPicker(false);
              }}>
              <Pressable style={styles.pickerWrapper} onPress={() => {}}>
                <DateTimePicker
                  value={selectedDate}
                  mode="date"
                  display="spinner"
                  onChange={handleDateChange}
                  maximumDate={new Date()}
                />
                <Spacer gap={RFPercentage(0.5)} />
                <CustomButton
                  text="Done"
                  containerStyle={{
                    paddingHorizontal: RFPercentage(7),
                  }}
                  onPress={() => setShowPicker(false)}
                />
              </Pressable>
            </Pressable>
          </Modal>
        ) : (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
            maximumDate={new Date()}
          />
        ))} */}
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderRadius: 10,
    backgroundColor: colors.white,
    padding: RFPercentage(1),
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  pickerWrapper: {
    backgroundColor: colors.white,
    padding: RFPercentage(2),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  iconConatiner: {
    backgroundColor: colors.errorRed,
    height: RFPercentage(5),
    width: RFPercentage(5),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
});

export default HomeDatePicker;
