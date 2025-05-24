import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CustomText} from '../../../components';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {Icons} from '../../../components/Icons';
import Spacer from '../../../components/Spacer';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../types';

const Header = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View style={styles.conatinerStyle}>
      <CustomText text={'All leaves'} fontSize={RFValue(16)} />
      <View style={styles.conatinerStyle}>
        <Pressable
          onPress={() =>
            navigation.navigate('HomeStack', {screen: 'LeaveApplyScreen'})
          }>
          <Icons type="Feather" name={'plus-square'} size={RFPercentage(3)} />
        </Pressable>
        <Spacer gap={RFPercentage(0.6)} />
        <Pressable>
          <Icons type="Feather" name={'sliders'} size={RFPercentage(3)} />
        </Pressable>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  conatinerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
