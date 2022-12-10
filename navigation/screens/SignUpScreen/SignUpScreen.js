import React, {useState} from 'react';
import { View, Text, StyleSheet} from 'react-native';
import CustomInput from '../CustomInput';
import CustomButton from '../CustomButton/CustomButton';

const SignUpScreen = () => {
    const {firstName, setFirstName} = useState('');
    const {lastName, setLastName} = useState('');
    const {email, setEmail} = useState('');
    const {verifyEmail, setVerifyEmail} = useState('');
    const {companyName, setCompanyName} = useState('');

    // const {height} = useWindowDimensions();

    // const onForgotPasswordPressed = () => {
    //     console.warn("onForgotPasswordPressed()");
    // };
    // const onSignUpPressed = () => {
    //     console.warn("onSignUpPressed()");
    // };
    const onSignUpPressed = () => {
        console.warn("onSignUpPressed()");
    };

    return (
        <View style={styles.root}>

            <Text style={styles.title}>S'incscrire</Text>
            <Text style={styles.comment}>Votre demande sera envoyer à un administrateur afin de verifier votre admissibilité </Text>
            <CustomInput 
            placeholder="* Prénom" 
            value={firstName} 
            setValue={setFirstName}
            />
            <CustomInput 
            placeholder="* Nom" 
            value={lastName} 
            setValue={setLastName}
            />
            <CustomInput 
            placeholder="* Adresse mail" 
            value={email} 
            setValue={setEmail}
            />
            <CustomInput 
            placeholder="* Verification Email" 
            value={verifyEmail} 
            setValue={setVerifyEmail}
            />
            <CustomInput 
            placeholder="* Société" 
            value={companyName} 
            setValue={setCompanyName}
            />
            <Text style={styles.comment}>Optionnel</Text>
            <CustomInput 
            placeholder="Commentaire" 
            value={companyName} 
            setValue={setCompanyName}
            />
            <CustomButton 
            text="S'identifier" 
            onPress={onSignUpPressed}
            type="PRIMARY"
            />
            <Text style={styles.comment}>Un mot de passe temporaire vous sera envoyer séparément</Text>

        </View>
    );
};

const styles = StyleSheet.create({
    logo:{
        marginTop: 15,
        height: 300,
        width: 300,
        maxHeight: 300,
        maxWidth: 300,
    },
    root:{
        alignItems: 'center',
        padding: 20,
        textAlign: 'center',
    },
    title:{
        fontSize: 24,
        textAlign: 'center',
        color: '#000000',
        padding: 20,
    },
    comment:{
        marginTop: 10,
        // marginBottom: 20,
        width: '70%',
        textAlign: 'center',
        color: 'white',
    },
});

export default SignUpScreen;