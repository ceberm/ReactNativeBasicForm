import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, Button, TouchableHighlight, Alert, ScrollView } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from 'shortid';

const AddAppointmentForm = ({appointments, setAppointments, setShowForm}) => {

  const [date, saveDate] = useState('');
  const [time, saveTime] = useState('');
  const [patient, savePatient] = useState('');
  const [name, saveName] = useState('');
  const [symptoms, saveSymptoms] = useState('');
  const [phone, savePhone] = useState('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const options = {year: "numeric", month: "long", day: "2-digit"}
    saveDate(date.toLocaleDateString('en-US', options));
    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const confirmTime = (time) => {
    const options = { hour: 'numeric', minute: '2-digit', hour12: false}
    saveTime(time.toLocaleString('en-US', options));
    hideTimePicker();
  };

  const createNewAppointment = () => {

    if(patient.trim() === '' ||
      name.trim() === '' ||
      phone.trim() === '' ||
      symptoms.trim() === ''){
        showAlert();

        return ;
      }

      const appointment = { patient, name, symptoms, phone, date, time };

      appointment.id = shortid.generate();

      const newAppointments = [...appointments, appointment];
      setAppointments(newAppointments);

      setShowForm(false);
  }

  const showAlert = () => {
    Alert.alert(
      'Error',
      'All fields are required',
      [{ text: 'OK' }]
    )
  }

  return (
    <>
    <ScrollView style={styles.container}>
        <View>
          <Text style={styles.label}>Patient:</Text>
          <TextInput
            style={styles.input}
            onChangeText={ text => savePatient(text)}
          />
        </View>
        <View>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={styles.input}
            onChangeText={ text => saveName(text)}
          />
        </View>
        <View>
          <Text style={styles.label}>Phone:</Text>
          <TextInput
            style={styles.input}
            onChangeText={ text => savePhone(text)}
            keyboardType='numeric'
          />
        </View>
        <View>
          <Text style={styles.label}>Date:</Text>
          <Button title="Show Date Picker" onPress={showDatePicker} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <Text>{date}</Text>
        </View>
        <View>
          <Text style={styles.label}>Time:</Text>
          <Button title="Show Time Picker" onPress={showTimePicker} />
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={confirmTime}
            onCancel={hideTimePicker}
          />
          <Text>{time}</Text>
        </View>
        <View>
          <Text style={styles.label}>Symptoms:</Text>
          <TextInput
            multiline
            style={styles.input}
            onChangeText={ text => saveSymptoms(text)}
          />
        </View>

        <View>
          <TouchableHighlight onPress={ () => createNewAppointment()} style={styles.submitBtn}>
            <Text style={styles.submitText}>Add</Text>
          </TouchableHighlight>
        </View>

      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 13
  },
  input: {
    marginTop: 10,
    height: 50,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  container: {
    backgroundColor: '#FFF',
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginHorizontal: '2.5%'
  },
  submitBtn: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#7D024B'
  },
  submitText: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center'
  }
})

export default AddAppointmentForm;
