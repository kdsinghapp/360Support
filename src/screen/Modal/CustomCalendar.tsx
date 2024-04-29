import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { addMonths, format, getDaysInMonth, startOfWeek, addDays } from 'date-fns';

const CustomCalendar = ({ startingMonth }) => {

  if (!(startingMonth instanceof Date && !isNaN(startingMonth))) {
    throw new Error('Invalid startingMonth');
  }


  const data = Array.from({ length: 12 }, (_, index) => addMonths(startingMonth, index));



  const renderItem = ({ item }) => {

    const monthName = format(item, 'MMMM yyyy'); 
    const daysInMonth = getDaysInMonth(item); 
    const firstDayOfMonth = new Date(item.getFullYear(), item.getMonth(), 1); // Get the first day of the month
  
    const startDayOfWeek = firstDayOfMonth.getDay(); // Get the day of the week (0-6) for the first day of the month
    const offset = startDayOfWeek; // Use this offset to determine the starting position in the calendar grid
  
   
  
console.log(offset);

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
      <View style={styles.card}>
        <Text style={styles.monthHeader}>{monthName}</Text>
        <View style={styles.daysHeader}>
          {/* Render day name headers */}
          {dayNames.map(day => (
            <Text key={day} style={styles.dayHeader}>{day}</Text>
          ))}
        </View>
        <View style={styles.daysContainer}>
          {/* Render empty cells for days before the start of the month */}
          {Array.from({ length:firstDayOfMonth.getDay() }).map((_, index) => (
            <Text key={`empty-${index}`} style={styles.day}></Text>
          ))}
          {/* Render day cells for each day of the month */}
          {Array.from({ length: daysInMonth }, (_, index) => {
            const day = index + 1;
            const currentDate = addDays(firstDayOfMonth, index);
            return (
              <Text key={currentDate} style={styles.day}>{day}</Text>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(_, index) => index.toString()}
      contentContainerStyle={styles.container}
      numColumns={2} // Display two columns
    />
  );
};

// Styles for the CustomCalendar component
const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 5,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '48%', // Width for each month card (occupies 48% to allow for spacing)
    margin: 5, // Margin between month cards
  },
  monthHeader: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  daysHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dayHeader: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 8,
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  day: {
    
   width:12.4,
   marginLeft:6,
 
   height:10,
    fontSize: 8,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CustomCalendar;
