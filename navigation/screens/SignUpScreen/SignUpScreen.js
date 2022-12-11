import React, {useState} from 'react';
import { View, Text, StyleSheet} from 'react-native';
import CustomInput from '../CustomInput';
import CustomButton from '../CustomButton/CustomButton';

const SignUpScreen = () => {
    const {firstName, setFirstName} = useState('');
    const {lastName, setLastName} = useState('');
    const {email, setEmail} = useState('');
    const {emailRepeat, setEmailRepeat} = useState('');
    const {companyName, setCompanyName} = useState('');


    //SignUp button pressed
    const onSignUpPressed = () => {
        console.warn("onSignUpPressed()");
    };

    //Hyperlinks
    const onTermsOfUsePressed = () => {
        console.warn("onTermsOfUsePressed()");
    };
    const onPrivacyPressed = () => {
        console.warn("onPrivacyPressed()");
    };

    
    return (
        <View style={styles.root}>

            <Text style={styles.title}>S'incscrire</Text>
            <Text style={styles.comment}>Ceci est une demande, elle sera envoyer à un administrateur afin de verifier votre admissibilité </Text>
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
            placeholder="* Vérification Email"
            value={emailRepeat}
            setValue={setEmailRepeat}
            />
            <CustomInput 
            placeholder="* Société" 
            value={companyName} 
            setValue={setCompanyName}
            />
            {/* <Text style={styles.comment}>Optionnel</Text> */}
            <CustomInput 
            placeholder="Commentaire" 
            value={companyName} 
            setValue={setCompanyName}
            />
            <CustomButton 
            text="S'inscrire" 
            onPress={onSignUpPressed}
            type="PRIMARY"
            />
                        <Text style={styles.RGPD}>En créant un compte, vous accepter les{' '}
                        <Text style={styles.hyperlink} onPress={onTermsOfUsePressed}> Termes et Conditions d'utilisation</Text> 
                        ainsi que la{' '}
                        <Text style={styles.hyperlink} onPress={onPrivacyPressed}> Politique de Confidentialité </Text> 
                        de l'entreprise
                        </Text>
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
        color: 'white',
        margin: 10,
    },
    comment:{
        marginTop: 10,
        marginBottom: 10,
        // marginBottom: 20,
        width: '70%',
        textAlign: 'center',
        color: 'white',
    },
    RGPD:{
        marginTop: 20,
        fontStyle: 'italic',
        textAlign:'justify',
        color:'grey',
        fontSize: 12,
    },
    hyperlink:{
        color:'#0096FF'
    },
});

export default SignUpScreen;