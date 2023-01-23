import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const jwtDecode = require('jwt-decode');

const HomeScreen = props => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const loadProfile = async () => {
        const token = await AsyncStorage.getItem('token');
        if(!token) {
            props.navigation.navigate('Login');
        }

        const decoded = jwtDecode(token);
        setFirstName(decoded.firstName);
        setLastName(decoded.lastName);
        setEmail(decoded.email);
    }

    const logout = props => {
        AsyncStorage.removeItem('token')
            .then(() => {
                props.navigation.replace('Login')
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        loadProfile();
    });

    return(
        <View style={styles.container}>
            <View>
                <Text style={styles.text}>Welcome {firstName ? firstName : ''}!</Text>
            </View>
            
            <View>
                <Button 
                    title="Logout"
                    onPress={() => logout(props)}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 40
    },
    text: {
        fontSize: 22
    }
})

export default HomeScreen;