import React, { Component } from 'react';
import moment from 'moment';
import Calendar from 'react-native-calendar-picker';
import { connectStyle, Item } from './';
import { resetPadding } from '../../../constants/style';

type Props = {
  style?: {},
  selectedStartDate: {},
  onDateChange: () => void,
};
class ItemCalendar extends Component<Props> {
  props: Props;
  render() {
    const { selectedStartDate, onDateChange, style } = this.props;
    return <Item
      pushTop
      pushBottom
      style={resetPadding}
    >
      <Calendar
        todayBackgroundColor={'transparent'}
        minDate={moment()}
        selectedStartDate={selectedStartDate}
        onDateChange={onDateChange}
        style={style}
      />
    </Item>;
  }
}

export default connectStyle('NativeBase.ItemCalendar', {})(ItemCalendar);
