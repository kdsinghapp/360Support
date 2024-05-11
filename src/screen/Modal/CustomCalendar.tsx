import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { addMonths, format, getDaysInMonth, startOfWeek, addDays, DateResult } from 'date-fns';

interface CustomCalendarProps {
  startingMonth: Date;
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({ startingMonth }) => {

  if (!(startingMonth instanceof Date && !isNaN(startingMonth.getTime()))) {
    throw new Error('Invalid startingMonth');
  }

  const data: Date[] = Array.from({ length: 12 }, (_, index) => addMonths(startingMonth, index));

  const renderItem = ({ item }: { item: Date }) => {
    const monthName: string = format(item, 'MMMM yyyy'); 
    const daysInMonth: number = getDaysInMonth(item); 
    const firstDayOfMonth: Date = new Date(item.getFullYear(), item.getMonth(), 1); 
  
    const startDayOfWeek: number = firstDayOfMonth.getDay(); 
    const offset: number = startDayOfWeek; 
  
    const dayNames: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
      <View style={styles.card}>
        <Text style={styles.monthHeader}>{monthName}</Text>
        <View style={styles.daysHeader}>
          {dayNames.map(day => (
            <Text key={day} style={styles.dayHeader}>{day}</Text>
          ))}
        </View>
        <View style={styles.daysContainer}>
          {Array.from({ length: firstDayOfMonth.getDay() }).map((_, index) => (
            <Text key={`empty-${index}`} style={styles.day}></Text>
          ))}
          {Array.from({ length: daysInMonth }, (_, index) => {
            const day: number = index + 1;
            const currentDate: Date = addDays(firstDayOfMonth, index);
            return (
              <Text key={currentDate.toDateString()} style={styles.day}>{day}</Text>
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
      numColumns={2}
    />
  );
};

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
    width: '48%',
    margin: 5,
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
    width: 12.4,
    marginLeft: 6,
    height: 10,
    fontSize: 8,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CustomCalendar;
