import React from 'react';
import { Alert, Platform, StyleSheet, View, Text, Image, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as authAction from '../redux/actions/authAction'

const formSchema = yup.object({
    firstName: yup.string().required().min(2),
    lastName: yup.string().required().min(2),
    email: yup.string().email().required(),
    password: yup.string().required().min(5)
})

const RegisterScreen = navData => {

    const dispatch = useDispatch();
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <ScrollView>
                <Formik
                    initialValues={{
                        firstName: "",
                        lastName:"",
                        email: "",
                        password: ""
                    }}
                    validationSchema={formSchema}
                    onSubmit={(values) => {
                        dispatch(authAction.registerUser(values))
                            .then(async result => {
                                if (result.success) {
                                    try {
                                        await AsyncStorage.setItem('token', result.token)
                                        navData.navigation.navigate('Home')
                                    } catch (err) {
                                        console.log(err)
                                    }

                                }
                                else {
                                    Alert.alert(result.message)
                                }
                            })
                            .catch(err => console.log(err))
                    }}
                >
                    {(props) => (
                        <View style={styles.container}>
                            <View style={styles.centerTitle}>
                                <Text style={styles.headerText}>Welcome!</Text>
                            </View>

                            <View style={styles.secondTitle}>
                                <Text>Already an account? </Text>
                                <TouchableOpacity onPress={() => navData.navigation.navigate('Login')} >
                                    <Text style={styles.loginText}>Login</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.inputBox}
                                    placeholder="First Name"
                                    placeholderTextColor="#fff"
                                    onChangeText={props.handleChange("firstName")}
                                    value={props.values.firstName}
                                    onBlur={props.handleBlur("firstName")}
                                />
                                <Text style={styles.error}>{props.touched.firstName && props.errors.firstName}</Text>
                                <TextInput
                                    style={styles.inputBox}
                                    placeholder="Last Name"
                                    placeholderTextColor="#fff"
                                    onChangeText={props.handleChange("lastName")}
                                    value={props.values.lastName}
                                    onBlur={props.handleBlur("lastName")}
                                />
   
                                <Text style={styles.error}>{props.touched.lastName && props.errors.lastName}</Text>
                                <TextInput
                                    style={styles.inputBox}
                                    placeholder="Email"
                                    placeholderTextColor="#fff"
                                    keyboardType="email-address"
                                    onChangeText={props.handleChange("email")}
                                    value={props.values.email}
                                    onBlur={props.handleBlur("email")}
                                />
                                <Text style={styles.error}>{props.touched.email && props.errors.email}</Text>
                                <TextInput
                                    style={styles.inputBox}
                                    placeholder="Password"
                                    placeholderTextColor="#fff"
                                    secureTextEntry={true}
                                    onChangeText={props.handleChange("password")}
                                    value={props.values.password}
                                    onBlur={props.handleBlur("password")} />
                                <Text style={styles.error}>{props.touched.password && props.errors.password}</Text>
                                <TouchableOpacity style={styles.button}
                                    onPress={props.handleSubmit}
                                >
                                    <Text style={styles.buttonText}>Register</Text>
                                </TouchableOpacity>
                                
                            </View>
                        </View>
                    )}
                </Formik>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerText: {
        marginTop: 150,
        fontSize: 30,
        fontWeight: 'bold',
    },
    centerTitle: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    secondTitle: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 5
    },
    loginText: {
        fontWeight: 'bold'
    },
    inputContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputBox: {
        width: 300,
        backgroundColor: '#B6BFC4',
        borderRadius: 15,
        padding: 16,
        fontSize: 16,
        marginVertical: 5
    },
    button: {
        width: 100,
        backgroundColor: '#008080',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'

    },
    
    error: {
        color: 'red'
    }

})

export default RegisterScreen;