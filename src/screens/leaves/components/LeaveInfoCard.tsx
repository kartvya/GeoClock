import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {CustomText} from '../../../components';
import Spacer from '../../../components/Spacer';
import {colors} from '../../../assets/colors/colors';

interface LeaveInfoCardProps {
  label: string;
  value: string | number;
  borderColor: string;
  backgroundColor: string;
}

const leaveData: LeaveInfoCardProps[] = [
  {
    label: 'Leave Balance',
    value: 10,
    borderColor: colors.blueLight,
    backgroundColor: colors.lightBlueBackground,
  },
  {
    label: 'Leave Approved',
    value: 5,
    borderColor: colors.green,
    backgroundColor: colors.lightGreenBackground,
  },
  {
    label: 'Leave Pending',
    value: 2,
    borderColor: colors.teal,
    backgroundColor: colors.mintBackground,
  },
  {
    label: 'Leave Cancellation',
    value: 1,
    borderColor: colors.coralRed,
    backgroundColor: colors.softPinkBackground,
  },
];

const LeaveInfoCard: React.FC<LeaveInfoCardProps & {style?: any}> = ({
  label,
  value,
  style,
  borderColor,
  backgroundColor,
}) => (
  <View
    style={[
      styles.cardContainer,
      style,
      {borderColor: borderColor, backgroundColor: backgroundColor},
    ]}>
    <CustomText text={label} fontSize={RFValue(14)} numberOfLines={2} />
    <Spacer gap={RFPercentage(0.6)} />
    <CustomText
      text={String(value)}
      fontSize={RFValue(16)}
      style={{color: borderColor}}
    />
  </View>
);

const LeaveInfoGrid: React.FC = () => (
  <View>
    <FlatList
      data={leaveData}
      renderItem={({item, index}) => (
        <LeaveInfoCard
          {...item}
          style={index % 2 === 0 ? {marginRight: RFPercentage(1)} : undefined}
        />
      )}
      keyExtractor={item => item.label}
      numColumns={2}
      scrollEnabled={false}
      contentContainerStyle={{gap: RFPercentage(1)}}
    />
  </View>
);

export default LeaveInfoGrid;

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 1,
    borderRadius: 14,
    flex: 1,
    height: RFPercentage(14),
    justifyContent: 'center',
    paddingHorizontal: RFPercentage(3),
  },
});
