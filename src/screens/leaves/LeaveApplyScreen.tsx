import React, {useState} from 'react';
import {Alert, Keyboard, StyleSheet, View} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../../assets/colors/colors';
import {
  CustomButton,
  CustomHeader,
  CustomText,
  CustomTextInput,
} from '../../components';
import ScreenWrapper from '../../components/ScreenWrapper';
import Spacer from '../../components/Spacer';
import {commonStyles} from '../../styles/commonStyle';
import {isIOS, wp} from '../../utils/helpers';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import TextInputDatePicker from './components/TextInputDatePicker';
import dayjs from 'dayjs';
import {
  useApplyLeaveMutation,
  useGetLeavetypeQuery,
} from '../../services/apis/leave/leaveApi';
import {Toast} from 'react-native-toast-notifications';
import CustomDropDown from '../../components/CustomDropDown';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../types';

const leaveDummyData = [
  {
    name: 'Sick',
    description: 'sick leave',
    id: '860201a8-4b5a-46c8-966b-51756bb476a5',
    is_active: true,
    created_at: '2025-05-21T13:49:08.943011',
    updated_at: '2025-05-21T13:49:08.943013',
  },
  {
    name: 'Special',
    description: 'special leave',
    id: '7863cb1b-54ce-413d-91af-e43204f40c52',
    is_active: true,
    created_at: '2025-05-21T13:50:08.867652',
    updated_at: '2025-05-21T13:50:08.867653',
  },
  {
    name: 'Holiday',
    description: 'holiday leave',
    id: '92a5257a-a0cc-4ff7-8abe-74106c5ab5a1',
    is_active: true,
    created_at: '2025-05-21T13:50:20.875856',
    updated_at: '2025-05-21T13:50:20.875858',
  },
];

type ApplyLeaveFormType = {
  title: string;
  leaveType: string;
  contactNumber: string;
  startDate: string;
  endDate: string;
  reasoneForLeave: string;
};

const LeaveApplyScreen = () => {
  const GAP = RFPercentage(0.5);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [applyLeaveApi, {isLoading}] = useApplyLeaveMutation();
  const [form, setForm] = useState<ApplyLeaveFormType>({
    title: '',
    leaveType: '',
    contactNumber: '',
    startDate: '',
    endDate: '',
    reasoneForLeave: '',
  });

  const {data: leaveData} = useGetLeavetypeQuery();
  // console.log(' the leave data', data);

  const handleInputChange = (
    field: keyof ApplyLeaveFormType,
    value: string,
  ) => {
    if (field === 'endDate' && value) {
      const start = dayjs(form.startDate);
      const end = dayjs(value);
      if (form.startDate && end.isBefore(start, 'day')) {
        Alert.alert('End date cannot be earlier than start date.');
        return;
      }
    }

    setForm(prevForm => ({
      ...prevForm,
      [field]: value,
    }));
  };

  const onApplyLeavePress = async () => {
    const {leaveType, startDate, endDate, reasoneForLeave} = form;
    if (!leaveType || !startDate || !endDate || !reasoneForLeave) {
      Toast.show('Please fill all required fields.', {
        placement: 'bottom',
      });
      return;
    }

    const payload = new FormData();
    payload.append('leave_type_id', form.leaveType);
    payload.append('start_date', form.startDate);
    payload.append('end_date', form.endDate);
    payload.append('reason', form.reasoneForLeave);
    try {
      const res = await applyLeaveApi(payload).unwrap();
      Toast.show('Leave applied successfully!', {
        placement: 'bottom',
      });
      setTimeout(() => {
        navigation.goBack();
        setForm({
          title: '',
          leaveType: '',
          contactNumber: '',
          startDate: '',
          endDate: '',
          reasoneForLeave: '',
        });
      }, 10);
    } catch (error: any) {
      console.log(error, 'Apply leave api error');
      Toast.show(error?.data?.message || 'Something went wrong', {
        placement: 'bottom',
      });
    }
  };

  return (
    <>
      <ScreenWrapper
        conatinerStyle={styles.mainContainer}
        statusBarColor={colors.white}>
        <CustomHeader text="Apply Leave" />
        <Spacer gap={RFPercentage(1)} />
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'always'}
          enableOnAndroid={false}
          extraScrollHeight={20}
          extraHeight={20}
          style={{...commonStyles.flex1, ...commonStyles.paddingHorizontal5}}>
          <CustomText
            text={'Title'}
            fontSize={RFValue(10)}
            fontWeight={'400'}
            color="primary"
          />
          <CustomTextInput
            placeholder="Title"
            value={form.title}
            onChangeText={text => handleInputChange('title', text)}
            containerStyle={commonStyles.marginVertical1}
          />
          <Spacer gap={GAP} />
          <CustomText
            text={'Leave Type'}
            fontSize={RFValue(10)}
            fontWeight={'400'}
            color="primary"
          />
          <CustomDropDown
            onChange={value => {
              Keyboard.dismiss(), handleInputChange('leaveType', value);
            }}
            placeholder={'Leave Type'}
            value={form.leaveType}
            data={leaveData}
            valueField="id"
            labelField="name"
            tapperStyle={commonStyles.marginVertical1}
          />
          <Spacer gap={GAP} />
          <CustomText
            text={'Contact Number'}
            fontSize={RFValue(10)}
            fontWeight={'400'}
            color="primary"
          />
          <CustomTextInput
            placeholder="Contact Number"
            value={form.contactNumber}
            onChangeText={text => handleInputChange('contactNumber', text)}
            containerStyle={commonStyles.marginVertical1}
            keyboardType="number-pad"
          />
          <Spacer gap={GAP} />
          <TextInputDatePicker
            label="Start Date"
            inputContainerStyle={commonStyles.marginVertical1}
            leftIconName="calendar"
            leftIconType="AntDesign"
            value={form.startDate}
            onChangeText={text => handleInputChange('startDate', text)}
          />
          <Spacer gap={GAP} />
          <TextInputDatePicker
            label="End Date"
            inputContainerStyle={commonStyles.marginVertical1}
            leftIconName="calendar"
            leftIconType="AntDesign"
            value={form.endDate}
            onChangeText={text => handleInputChange('endDate', text)}
          />
          <Spacer gap={GAP} />
          <CustomText
            text={'Reason for Leave'}
            fontSize={RFValue(10)}
            fontWeight={'400'}
            color="primary"
          />
          <CustomTextInput
            placeholder="Reason for Leave"
            value={form.reasoneForLeave}
            onChangeText={text => handleInputChange('reasoneForLeave', text)}
            containerStyle={styles.multilineTextInput}
            multiline
          />
        </KeyboardAwareScrollView>

        <CustomButton
          text="Apply leave"
          onPress={onApplyLeavePress}
          isLoading={isLoading}
          containerStyle={{marginHorizontal: wp(5)}}
        />
        {isIOS && <Spacer gap={RFPercentage(2)} />}
      </ScreenWrapper>
    </>
  );
};

export default LeaveApplyScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  multilineTextInput: {
    height: RFPercentage(12),
    marginVertical: 5,
  },
});
