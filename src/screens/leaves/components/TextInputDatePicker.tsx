import {
  Platform,
  Pressable,
  StyleSheet,
  View,
  Modal,
  ViewStyle,
  TextStyle,
} from 'react-native';
import React, {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import {CustomText, CustomTextInput, CustomButton} from '../../../components';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {ColorTypes} from '../../../types';
import Spacer from '../../../components/Spacer';
import {isIOS} from '../../../utils/helpers';

dayjs.extend(utc); // enable UTC plugin

interface TextInputDatePickerProps {
  label: string;
  value: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  editable?: boolean;
  inputContainerStyle?: ViewStyle;
  labelFontSize?: number;
  labelFontWeight?: TextStyle['fontWeight'];
  labelColor?: keyof ColorTypes;
  leftIconName?: string;
  leftIconType?: string;
}

const TextInputDatePicker: React.FC<TextInputDatePickerProps> = ({
  label,
  value,
  placeholder,
  onChangeText,
  editable = false,
  inputContainerStyle,
  labelFontSize = RFValue(10),
  labelFontWeight = '400',
  labelColor = 'primary',
  leftIconName = 'calendar',
  leftIconType = 'AntDesign',
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const formatToUTC = (date: Date) => dayjs(date).utc().format('YYYY-MM-DD');

  const handleDateChange = (_: any, date?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }

    if (date) {
      setSelectedDate(date);
      onChangeText?.(formatToUTC(date));
    }
  };

  return (
    <View>
      <CustomText
        text={label}
        fontSize={labelFontSize}
        fontWeight={labelFontWeight}
        color={labelColor}
      />
      <CustomTextInput
        placeholder={placeholder || label}
        value={value}
        onChangeText={onChangeText}
        containerStyle={inputContainerStyle}
        leftIconName={leftIconName}
        //@ts-ignore
        leftIconType={leftIconType}
        onLeftIconPress={() => setShowPicker(true)}
        onPress={() => setShowPicker(true)}
        editable={false}
      />

      {showPicker &&
        (Platform.OS === 'ios' ? (
          <Modal transparent animationType="slide">
            <Pressable
              style={styles.modalContainer}
              onPress={() => setShowPicker(false)}>
              <Pressable style={styles.pickerWrapper} onPress={() => {}}>
                <DateTimePicker
                  value={selectedDate}
                  mode="date"
                  display="spinner"
                  onChange={(_, date) => date && setSelectedDate(date)}
                  maximumDate={new Date()}
                />
                <Spacer gap={RFPercentage(0.5)} />
                <CustomButton
                  text="Done"
                  containerStyle={{
                    paddingHorizontal: RFPercentage(7),
                    marginBottom: isIOS ? RFPercentage(2) : 0,
                  }}
                  onPress={() => {
                    onChangeText?.(formatToUTC(selectedDate));
                    setShowPicker(false);
                  }}
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
        ))}
    </View>
  );
};

export default TextInputDatePicker;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  pickerWrapper: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
});
