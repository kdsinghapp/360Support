

<View style={{marginHorizontal: 15, marginTop: 30}}>
<Text
style={{
fontSize: 18,
color: '#294247',
fontWeight: '700',
lineHeight: 24,
}}>
Upcoming Events
</Text>
</View>
<View style={{height:hp(20),width:'100%'}}>
<FlatList
horizontal
data={EventList}
showsHorizontalScrollIndicator={false}
renderItem={({item}) => (
<TouchableOpacity
onPress={() => {
navigation.navigate(ScreenNameEnum.UPCOMING_EVENT);
}}
style={[
styles.shdow,
styles.Event,
{marginVertical: 10, marginLeft: 10},
]}>
<View>
<Line />
</View>
<View>
<Text
style={[
styles.txt,
{
fontSize: 22,
fontWeight: '700',
lineHeight: 33,
},
]}>
12
</Text>
<Text style={styles.txt}>Oct</Text>
</View>

<View style={{width: '65%'}}>
<Text
style={[
styles.txt,
{
fontSize: 18,
fontWeight: '700',
lineHeight: 24,
},
]}>
VS Eastside
</Text>
<Text style={styles.txt}>Saturday 15:00 PM</Text>
<Text style={styles.txt}>Homefields</Text>
</View>
<View>
<Text style={styles.txt}>Match</Text>
</View>
</TouchableOpacity>
)}
/>
</View>
<View
style={{
marginHorizontal: 15,
marginTop: 30,
flexDirection: 'row',
alignContent: 'center',
justifyContent: 'space-between',
}}>
<Text
style={[
styles.txt,
{
color: '#000000',
fontSize: 20,
fontWeight: '700',
lineHeight: 24,
},
]}>
Recent Post
</Text>
<TouchableOpacity
onPress={() => {
navigation.navigate(ScreenNameEnum.coachWall);
}}
style={{paddingHorizontal: 15}}>
<Text
style={[
styles.txt,
{
color: '#874BE9',
fontSize: 16,
fontWeight: '700',
lineHeight: 24,
},
]}>
See all
</Text>
</TouchableOpacity>
</View>
<View style={{flex: 1, paddingTop: 20}}>
<FlatList
data={data}
renderItem={RecentListItem}
keyExtractor={item => item.id}
/>
</View>
<View style={{marginHorizontal: 15, marginTop: 30}}>
<Text
style={[
styles.txt,
{
color: '#000000',
fontSize: 20,
fontWeight: '700',
lineHeight: 24,
},
]}>
Registrations
</Text>
</View>

<View style={{marginTop: 10, height: hp(8), justifyContent: 'center'}}>
<View style={[styles.shdow, styles.search]}>
<SearchIcon />
<TextInput
placeholder="Search"
placeholderTextColor={'#000'}
style={{
marginLeft: 10,
fontSize: 14,
color: '#000',
lineHeight: 18,
}}
/>
</View>
</View>
<View style={{flex: 1}}>
<FlatList
data={RegisterList}
renderItem={({item}) => (
<View
style={[
styles.shdow,
{

height: hp(20),
backgroundColor: '#FFF',
marginVertical: 5,
borderRadius: 15,
padding: 20,
},
]}>
<View style={{width: '100%', flexDirection: 'row'}}>
<View>
<Image
source={item.img}
style={{
height: 45,
width: 45,
}}
/>
</View>
<View style={{marginLeft: 10}}>
<Text
style={{
fontSize: 18,
color: '#000',
fontWeight: '700',
}}>
{item.titile}
</Text>
<Text
style={{
fontSize: 15,
color: '#000',
fontWeight: '500',
}}>
{item.description}
</Text>
</View>
</View>

<TouchableOpacity
onPress={() => setModalVisible(true)}
style={{
backgroundColor: '#e7dbfb',
height: 55,
width: '100%',
marginTop: 20,
borderRadius: 15,
alignItems: 'center',
justifyContent: 'center',
}}>
<Text
style={{
fontSize: 18,
fontWeight: '700',
color: '#874BE9',
}}>
Register
</Text>
</TouchableOpacity>
<BottomToTopModal
visible={modalVisible}
data={item}
onClose={() => setModalVisible(false)}
/>
</View>
)}
/>

</View>