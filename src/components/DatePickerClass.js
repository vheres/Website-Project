import React, { Component } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import moment from 'moment';

class DateClass extends Component {
  handleDayChange(selectedDay, modifiers, dayPickerInput) {
    const input = dayPickerInput.getInput();
    this.props.datePick(input);
  }

  render() {
    return (
      <div>
        <DayPickerInput
          placeholder={`${moment().format('YYYY-MM-DD')}`}
          onDayChange = {this.handleDayChange.bind(this)}
          
        />
      </div>
    );
  }
}
export default DateClass;