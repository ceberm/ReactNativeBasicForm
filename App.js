import React, { useState } from 'react';
import { Text, StyleSheet, View, FlatList, TouchableHighlight, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Cita from './components/Cita';
import AddAppointmentForm from './components/addAppointment';

const App = () => {

const [showForm, setShowForm] = useState(false);

  const [appointments, setAppointments] = useState([
      {id: "1", patient: "Hook", name: "Juan", symptoms:"Cho Picha"},
      {id: "2", patient: "Hook", name: "Birrin", symptoms:"Cho Picha"},
      {id: "3", patient: "Hook", name: "Jose", symptoms:"Cho Picha"}
  ]);

  const deletePacient = id => {
    setAppointments( (currentAppointments) => {
        return currentAppointments.filter( cita => cita.id !== id);
    })
  }

  const makeFormVisible = () => {
    setShowForm(!showForm);
  }

  const closeSoftKeyboard = () => {
    Keyboard.dismiss();
  }

  return (
    <TouchableWithoutFeedback onPress={ () => closeSoftKeyboard()}>
      <View style={styles.container}>
        <Text style={styles.title}>Manage Appointments</Text>

        <View>
          <TouchableHighlight onPress={ () => makeFormVisible()} style={styles.submitBtn}>
            <Text style={styles.submitText}>{showForm? 'Hide Form' : 'Show Form'}</Text>
          </TouchableHighlight>
        </View>

        <View style={styles.content}>
          {showForm ? (
              <>
                <Text style={styles.subTitle}>Create New Appointment</Text>
                <AddAppointmentForm appointments={appointments}
                  setAppointments={setAppointments}
                  setShowForm={setShowForm}
                />
              </>
            ) : (
              <>
                <Text style={styles.title}> {appointments.length > 0 ? 'Your Appointments' : 'No Appointments'} </Text>
                <FlatList
                  style={styles.list}
                  data={appointments}
                  renderItem = { ({item}) => <Cita item={item} deletePacient={deletePacient}/> }
                  keyExtractor={ item => item.id}
                  />
              </>
              )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#AA076B',
      flex: 1
    },
    title: {
      marginBottom: 20,
      marginTop: Platform.OS === 'ios' ? 40 : 20,
      fontWeight: 'bold',
      fontSize: 24,
      textAlign: 'center',
      color: '#fff'
    },
    subTitle: {
      marginBottom: 20,
      marginTop: 20,
      fontWeight: 'bold',
      fontSize: 24,
      textAlign: 'center',
      color: '#fff'
    },
    content: {
      flex: 1,
      marginHorizontal: '2.5%'
    },
    list: {
      flex: 1,
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
});

export default App;
