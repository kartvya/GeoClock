import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import {RFPercentage} from 'react-native-responsive-fontsize';
import {colors} from '../../assets/colors/colors';
import {CustomText} from '../../components';
import ScreenWrapper from '../../components/ScreenWrapper';
import Spacer from '../../components/Spacer';
import {
  DailySummary,
  useGetTodaysAttendanceQuery,
  useLazyGetClockStatusQuery,
} from '../../services/apis/user/userApi';
import {commonStyles} from '../../styles/commonStyle';
import {wp} from '../../utils/helpers';
import {AttendenceCard} from './components';
import ActivityCard from './components/ActivityCard';
import HomeDatePicker from './components/HomeDatePicker';
import HomeHeader from './components/HomeHeader';
import DateSelectionScrollView from './components/DateSelectionScrollView';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const HomeScreen = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    dayjs().utc().format('YYYY-MM-DD'),
  );

  const [fetchAttendance, {data: userAttendaceStatus, isLoading, error}] =
    useLazyGetClockStatusQuery();

  useEffect(() => {
    const start = dayjs.utc(selectedDate).format('DD-MM-YYYY');
    const end = start;
    fetchAttendance({start, end});
  }, [selectedDate]);

  return (
    <ScreenWrapper
      conatinerStyle={StyleSheet.flatten([
        commonStyles.mainContainer,
        commonStyles.paddingHorizontal5,
      ])}
      statusBarColor={colors.white}>
      <HomeHeader />
      <Spacer gap={RFPercentage(1)} />
      <DateSelectionScrollView onDateChange={setSelectedDate} />
      <Spacer gap={RFPercentage(1)} />
      <HomeDatePicker
        userAttendaceStatus={
          userAttendaceStatus?.daily_summaries[0] ?? ({} as DailySummary)
        }
        isLoading={isLoading}
        refetch={() => {
          const formattedDate = dayjs.utc(selectedDate).format('DD-MM-YYYY');
          fetchAttendance({start: formattedDate, end: formattedDate});
        }}
        selectedDate={selectedDate}
      />
      <Spacer gap={RFPercentage(1)} />
      <View style={styles.cardStyle}>
        <AttendenceCard
          iconType="Feather"
          iconName="coffee"
          titleText="Break Time"
          time="00:30 min"
          description="Avg Time 30 min"
        />
        <AttendenceCard
          iconType="AntDesign"
          iconName="calendar"
          titleText="Total Days"
          time="28 days"
          description="Working Days"
        />
      </View>
      <Spacer gap={RFPercentage(1)} />
      <View style={styles.activityHeader}>
        <CustomText text={'Your Activity'} fontSize={18} color="black" />
        <CustomText
          text={'View All'}
          fontSize={15}
          color="primary"
          fontWeight={400}
        />
      </View>
      <Spacer gap={RFPercentage(0.5)} />
      {userAttendaceStatus?.daily_summaries[0]?.attendances &&
      userAttendaceStatus?.daily_summaries[0]?.attendances?.length > 0 ? (
        <FlatList
          data={userAttendaceStatus?.daily_summaries[0]?.attendances}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <Spacer gap={RFPercentage(0.6)} />}
          contentContainerStyle={{padding: 2, paddingBottom: RFPercentage(2)}}
          renderItem={({item}) => <ActivityCard item={item} />}
        />
      ) : (
        <View style={styles.noData}>
          <CustomText
            text={'No user activity'}
            fontSize={20}
            color="gray"
            fontWeight={400}
          />
        </View>
      )}
    </ScreenWrapper>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  cardStyle: {
    ...commonStyles.rowView,
    ...commonStyles.marginBottom3,
    justifyContent: 'space-between',
    gap: wp(3),
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  noData: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
