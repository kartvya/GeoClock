import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../../../assets/colors/colors';
import {CustomText} from '../../../components';

interface LeaveDetailInfoCardProps {
  data: {
    id: string;
    fromDate: string;
    toDate: string;
    applyDays: number;
    leaveBalance: number;
    approvedBy: string;
    status: 'Approved' | 'Rejected' | 'Pending';
  };
}

const LeaveDetailInfoCard: React.FC<LeaveDetailInfoCardProps> = ({data}) => {
  const {fromDate, toDate, applyDays, leaveBalance, approvedBy, status} = data;

  const getStatusStyle = () => {
    switch (status) {
      case 'Approved':
        return styles.approved;
      case 'Rejected':
        return styles.rejected;
      case 'Pending':
        return styles.pending;
      default:
        return {};
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <CustomText
          style={styles.dateTextStyle}
          text={'Date'}
          fontSize={RFValue(10)}
        />
        <View style={[styles.statusBadge, getStatusStyle()]}>
          <CustomText style={styles.statusText} text={status} color="black" />
        </View>
      </View>
      <CustomText style={styles.value} text={`${fromDate} - ${toDate}`} />
      <View style={styles.line} />
      <View style={styles.infoRow}>
        <View>
          <CustomText style={styles.label} text={'Apply Days'} />
          <CustomText style={styles.value} text={`${applyDays} Days`} />
        </View>
        <View>
          <CustomText style={styles.label} text={'Leave Balance'} />
          <CustomText style={styles.value} text={leaveBalance} />
        </View>
        <View>
          <CustomText style={styles.label} text={'Approved By'} />
          <CustomText style={styles.value} text={approvedBy} />
        </View>
      </View>
    </View>
  );
};

export default LeaveDetailInfoCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 16,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginHorizontal: 4,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: RFValue(10),
    fontWeight: '300',
    marginBottom: RFPercentage(0.5),
  },
  value: {
    fontSize: RFValue(12),
    color: colors.black,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusBadge: {
    height: RFPercentage(3),
    width: RFPercentage(10),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    fontSize: RFValue(10),
  },
  approved: {
    backgroundColor: '#d7fbe3',
  },
  rejected: {
    backgroundColor: '#fcdcdc',
  },
  pending: {
    backgroundColor: '#fff4cc',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: colors.lightGray,
    marginVertical: RFPercentage(1.5),
  },
  dateTextStyle: {
    marginTop: 8,
    fontWeight: '300',
  },
});
