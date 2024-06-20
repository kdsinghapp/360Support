import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useEffect } from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import BackBtn from '../../../assets/svg/BackBtn.svg';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { get_my_child } from '../../../redux/feature/featuresSlice';
import Loading from '../../../configs/Loader';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import ScreenNameEnum from '../../../routes/screenName.enum';

export default function ChildrenProfiles() {
    const user = useSelector((state: RootState) => state.auth.userData);
    const isLoading = useSelector((state: RootState) => state.feature.isLoading);
    const getMyChild = useSelector((state: RootState) => state.feature.getMyChild);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    useEffect(() => {
        const params = {
            user_id: user.id
        }

        dispatch(get_my_child(params))
    }, [user])

    console.log('getMyChild=>>>>>>>>>>', getMyChild?.length);

    return (
        <View style={styles.container}>
            {isLoading ? <Loading /> : null}
            <View style={styles.colorDiv}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backButton}>
                        <BackBtn />
                    </TouchableOpacity>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>My Children</Text>
                    </View>

                    <View style={styles.addButton} />
                </View>
            </View>

            {getMyChild.length > 0 && (
                <View style={styles.childrenListContainer}>
                    <FlatList
                        data={getMyChild}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                            
                            onPress={()=>{
                                navigation.navigate(ScreenNameEnum.EditChildProfile,{child_id:item.id})
                            }}
                            style={styles.childItem}>
                                {item.image ? (
                                    <Image
                                        source={{ uri: item.image }}
                                        style={styles.childImage}
                                    />
                                ) : (
                                    <View style={styles.childImagePlaceholder}>
                                        <Text style={styles.childInitials}>
                                            {item.first_name[0]} {item.last_name[0]}
                                        </Text>
                                    </View>
                                )}
                                <View style={styles.childInfo}>
                                    <Text style={styles.childName}>{item.first_name} {item.last_name}</Text>
                                    <Text style={styles.childEmail}>{item.email}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        ListFooterComponent={<View style={styles.listFooter} />}
                    />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    backButton: {
        width: '40%',
    },
    titleContainer: {},
    title: {
        fontWeight: '700',
        fontSize: 22,
        lineHeight: 32,
        color: '#FFF',
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFDF5',
    },
    colorDiv: {
        backgroundColor: '#874be9',
        height: hp(8),
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 20,
    },
    addButton: {},
    childrenListContainer: {
        marginTop: hp(5),
        flex: 1,
    },
    childItem: {
        shadowColor: "#000",
        paddingHorizontal: 10,
        height: hp(8),
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: '#fff',
        marginHorizontal: 20,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    childImage: {
        height: 40,
        width: 40,
        borderRadius: 20,
    },
    childImagePlaceholder: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: '#874be9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    childInitials: {
        fontWeight: '600',
        color: '#fff',
        fontSize: 18,
    },
    childInfo: {
        marginLeft: 10,
    },
    childName: {
fontSize:14,color:'#000',fontWeight:'600',

    },
    childEmail: {
        fontSize:14,color:'#000',fontWeight:'600',

    },
    listFooter: {
        height: hp(5),
    },
});
