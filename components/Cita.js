import React from 'react';
import { Text, StyleSheet, View, TouchableHighlight } from 'react-native';

const Cita = ({item, deletePacient}) => {

  const deleteDialog = id => {
    console.log("Deleting..." + id);

    deletePacient(id);
  }

  return (
    <View style={styles.cita}>
      <View>
        <Text style={styles.label}>Pacient:</Text>
        <Text style={styles.texto}>{item.patient}</Text>
      </View>

      <View>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.texto}>{item.name}</Text>
      </View>

      <View>
        <Text style={styles.label}>Symptoms:</Text>
        <Text style={styles.texto}>{item.symptoms}</Text>
      </View>

      <View>
        <TouchableHighlight onPress={ () => deleteDialog(item.id)} style={styles.deleteBtn}>
          <Text style={styles.deleteText}>Delete &times;</Text>
        </TouchableHighlight>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  cita:{
    backgroundColor: '#FFF',
    borderBottomColor: '#e1e1e1',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,

  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 13
  },
  texto: {
    fontSize: 18,
  },
  deleteBtn: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: 'red'
  },
  deleteText: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center'
  }
})

export default Cita;
