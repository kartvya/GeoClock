import React from 'react';
import {View, Text, FlatList, StyleSheet, Image} from 'react-native';
import {CustomHeader, CustomText} from '../../components';
import ScreenWrapper from '../../components/ScreenWrapper';
import {colors} from '../../assets/colors/colors';

import Spacer from '../../components/Spacer';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {commonStyles} from '../../styles/commonStyle';
import {Icons} from '../../components/Icons';

type Notification = {
  id: string;
  type: string;
  title: string;
  message: string;
  time: string;
  icon?: string;
  image?: string;
};

const notifications: Notification[] = [
  {
    id: '1',
    type: 'profile',
    title: 'You update your profile picture',
    message: 'You just update your profile picture.',
    time: 'Just Now',
    icon: 'user',
  },
  {
    id: '2',
    type: 'password',
    title: 'Password Changed',
    message: 'You’ve completed change the password.',
    time: 'April 12, 2023 at 22:22 Pm',
    icon: 'lock',
  },
  {
    id: '3',
    type: 'leave',
    title: 'Mark Alen Applied for Leave',
    message: 'Please accept my leave request.',
    time: 'February 23, 2022 at 21:22 Pm',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: '4',
    type: 'update',
    title: 'System Update',
    message: 'Please update to newest app, for get amazing experience.',
    time: 'April 15, 2023 at 21:22 Pm',
    icon: 'download',
  },
  {
    id: '5',
    type: 'profile',
    title: 'You update your profile picture',
    message: 'You just update your profile picture.',
    time: 'Just Now',
    icon: 'user',
  },
  {
    id: '6',
    type: 'password',
    title: 'Password Changed',
    message: 'You’ve completed change the password.',
    time: 'April 12, 2023 at 22:22 Pm',
    icon: 'lock',
  },
];

type NotificationItemProps = {
  item: Notification;
};

const NotificationItem = ({item}: NotificationItemProps) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.iconContainer}>
        {item.image ? (
          <Image source={{uri: item.image}} style={styles.avatar} />
        ) : (
          <View style={styles.iconCircle}>
            <Icons
              type="Feather"
              name={item.icon!}
              size={20}
              color={colors.primary}
            />
          </View>
        )}
      </View>
      <View style={styles.textContainer}>
        <CustomText text={item.title} color="black" fontSize={RFValue(14)} />
        <Spacer gap={RFPercentage(0.3)} />
        <CustomText
          text={item.message}
          color="gray"
          fontSize={RFValue(12)}
          fontWeight={'400'}
        />
        <Spacer gap={RFPercentage(0.3)} />
        <CustomText text={item.time} color="lightGray" fontSize={RFValue(9)} />
      </View>
    </View>
  );
};

const NotificationScreen = () => {
  return (
    <ScreenWrapper
      conatinerStyle={styles.mainContainer}
      statusBarColor={colors.white}>
      <CustomHeader text="Notification" />
      <Spacer gap={RFPercentage(0.5)} />
      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        renderItem={({item}) => <NotificationItem item={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.line} />}
      />
    </ScreenWrapper>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  listContent: {...commonStyles.paddingHorizontal5},
  itemContainer: {
    flexDirection: 'row',
    paddingVertical: RFPercentage(2),
  },
  iconContainer: {
    marginRight: 12,
  },
  iconCircle: {
    width: RFPercentage(5),
    height: RFPercentage(5),
    borderRadius: 100,
    backgroundColor: '#F3F6FD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#F0F0F0',
  },
});
