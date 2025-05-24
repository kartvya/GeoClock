import React, {useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {colors} from '../../assets/colors/colors';
import ScreenWrapper from '../../components/ScreenWrapper';
import Spacer from '../../components/Spacer';
import {commonStyles} from '../../styles/commonStyle';
import Header from './components/Header';
import LeaveInfoCard from './components/LeaveInfoCard';
import CustomTabNav from '../../components/CustomeTabNav';
import {leaveData} from '../../data/LeaveInfoData';
import LeaveDetailInfoCard from './components/LeaveDetailInfoCard';

const LeaveScreen = () => {
  const tabKeys = ['Upcoming', 'Past'] as const;
  const [selectedTab, setSelectedTab] = useState(0);
  const handleTabChange = (index: number) => {
    setSelectedTab(index);
  };

  return (
    <ScreenWrapper
      conatinerStyle={StyleSheet.flatten([
        commonStyles.mainContainer,
        commonStyles.paddingHorizontal5,
      ])}
      statusBarColor={colors.white}>
      <Header />
      <Spacer gap={RFPercentage(1)} />
      <LeaveInfoCard />
      <Spacer gap={RFPercentage(1)} />
      <CustomTabNav tabs={['Upcoming', 'Past']} onTabPress={handleTabChange} />
      <Spacer gap={RFPercentage(1)} />
      <ScrollView>
        {leaveData[tabKeys[selectedTab]].map(item => (
          <LeaveDetailInfoCard key={item.id} data={item} />
        ))}
      </ScrollView>
    </ScreenWrapper>
  );
};

export default LeaveScreen;
