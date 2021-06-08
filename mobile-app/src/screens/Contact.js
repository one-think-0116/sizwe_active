import React ,{useContext, useState, useEffect} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableWithoutFeedback,
    Dimensions,
    Image,
    Alert,
    TouchableOpacity,
    TextInput,
    ScrollView,
} from 'react-native';
import { Icon, Button, Header, Input } from 'react-native-elements'
var { width, height } = Dimensions.get('window');
import { language } from 'config';
import { useSelector, useDispatch } from 'react-redux';
import { FirebaseContext } from 'common/src';
import { colors } from '../common/theme';

export default function ContactPage(props) {
    const { api } = useContext(FirebaseContext);
    const {
        sendContact
    } = api;
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const contact = useSelector(state => state.contact);
    const [loading, setLoading] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');
    // console.log("auth",auth)
    // console.log("sendContact",sendContact)
    const onPressContact = () => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(firstName == ""){
            Alert.alert(language.alert,"Please input your first name.");
            return;
        }else if(lastName == ""){
            Alert.alert(language.alert,"Please input your last name."); 
            return;
        }else if(email == ""){
            Alert.alert(language.alert,"Please input your email."); 
            return;
        }else if(subject == ""){
            Alert.alert(language.alert,"Please input your subject."); 
            return;
        }else if(content == ""){
            Alert.alert(language.alert,"Please input your content."); 
            return;
        }else{
            if(re.test(email)){
                const contactData = {
                    firstName:firstName,
                    lastName:lastName,
                    email:email,
                    subject:subject,
                    content:content,
                    read:false
                }
                dispatch(sendContact(contactData))
                Alert.alert(language.alert,"Your comment is sent to Active rides team."); 
            }else{
                Alert.alert(language.alert,"Your email is invalid."); 
            }
        }
    }
    useEffect(() => {
       if(auth.info){
            setFirstName(auth.info.profile.firstName)
            setLastName(auth.info.profile.lastName)
            setEmail(auth.info.profile.email)
       }else{

       }
    }, [auth.info]);
    useEffect(() => {
        if(contact.loading){
           setLoading(true);
        }else{
           setLoading(false);
        }
     }, [contact]);
    return (
        <View style={styles.mainView}>
            
            {auth.info?
            <Header
                backgroundColor={colors.GREY.default}
                leftComponent={{ icon: 'md-menu', type: 'ionicon', color: colors.WHITE, size: 30, component: TouchableWithoutFeedback, onPress: () => { props.navigation.toggleDrawer(); } }}
                centerComponent={<Text style={styles.headerTitleStyle}>Contact Us</Text>}
                containerStyle={styles.headerStyle}
                innerContainerStyles={{ marginLeft: 10, marginRight: 10 }}
            />
            : 
            <View style={styles.topBar}>
                <TouchableOpacity style={styles.backButton} onPress={() => { props.navigation.navigate('Intro') }}>
                    <Image
                        source={require("../../assets/images/back.png")}
                        resizeMode="contain"
                        style={styles.backButtonImage}
                    ></Image>
                </TouchableOpacity>
            </View>
            }
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollStyle}>
                <View>
                    <View styles={{ flex: 1 }}>
                        <View style={{ height: auth.info? 200: 200, width: width, marginTop: 0, marginBottom: 40, alignSelf: 'center' }}>
                            <Image
                                style={{ width: width, height: auth.info? 200: 200, borderRadius: 0,resizeMode: 'stretch',}}
                                source={require('../../assets/images/contact-banner.jpeg')}
                            />
                        </View>
                        <View style={{ width: width, paddingLeft: 40, paddingRight: 40 }}>
                            <Text style={{ textAlign: 'justify', fontSize: 20, lineHeight: 28 }}>
                                First Name 
                            </Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder={"Please enter your firstname"}
                                onChangeText={(value) => setFirstName(value)}
                                value={firstName}
                                editable = {auth.info? false:true}
                            />
                        </View>
                        <View style={{ width: width, paddingLeft: 40, paddingRight: 40, marginTop: 20 }}>
                            <Text style={{ textAlign: 'justify', fontSize: 20, lineHeight: 28 }}>
                                Last Name 
                            </Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder={"Please enter your lastname"}
                                onChangeText={(value) => setLastName(value)}
                                value={lastName}
                                editable = {auth.info? false:true}
                            />
                        </View>
                        <View style={{ width: width, paddingLeft: 40, paddingRight: 40, marginTop: 20 }}>
                            <Text style={{ textAlign: 'justify', fontSize: 20, lineHeight: 28 }}>
                                Email
                            </Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder={"Please enter your email"}
                                onChangeText={(value) => setEmail(value)}
                                value={email}
                                editable = {auth.info? false:true}
                            />
                        </View>
                        <View style={{ width: width, paddingLeft: 40, paddingRight: 40, marginTop: 20 }}>
                            <Text style={{ textAlign: 'justify', fontSize: 20, lineHeight: 28 }}>
                                Subject
                            </Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder={"Please enter your subject"}
                                onChangeText={(value) => setSubject(value)}
                                value={subject}
                            />
                        </View>
                        <View style={{ width: width, paddingLeft: 40, paddingRight: 40, marginTop: 20 }}>
                            <Text style={{ textAlign: 'justify', fontSize: 20, lineHeight: 28 }}>
                                Content
                            </Text>
                            <TextInput
                                multiline
                                maxLines={2}
                                style={styles.multiTextInput}
                                placeholder={"Please enter your content"}
                                onChangeText={(value) => setContent(value)}
                                value={content}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button
                                icon={
                                    <Icon
                                    name="send"
                                    size={30}
                                    color="white"
                                    style={{marginRight:10}}
                                    />
                                }
                                onPress={onPressContact}
                                title="Send Us"
                                loading={loading}
                                titleStyle={styles.contactButtonTitle}
                                buttonStyle={styles.contactButton}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: colors.WHITE,
        //marginTop: StatusBar.currentHeight,
    },
    headerStyle: {
        backgroundColor: colors.GREY.default,
        borderBottomWidth: 0
    },
    headerTitleStyle: {
        color: colors.WHITE,
        fontFamily: 'Roboto-Bold',
        fontSize: 20
    },
    aboutTitleStyle: {
        color: colors.BLACK,
        fontFamily: 'Roboto-Bold',
        fontSize: 20,
        marginLeft: 8,
        marginTop: 8
    },
    aboutcontentmainStyle: {
        marginTop: 12,
        marginBottom: 60
    },
    aboutcontentStyle: {
        color: colors.GREY.secondary,
        fontFamily: 'Roboto-Regular',
        fontSize: 15,
        textAlign: "justify",
        alignSelf: 'center',
        width: width - 20,
        letterSpacing: 1,
        marginTop: 6,
    },
    contact: {
        marginTop: 6,
        marginLeft: 8,
        //flexDirection:'row',
        width: "100%",
        marginBottom: 30
    },
    contacttype1: {
        textAlign: 'left',
        color: colors.GREY.secondary,
        fontFamily: 'Roboto-Bold',
        fontSize: 15,
    },
    contacttype2: {
        textAlign: 'left',
        marginTop: 4,
        color: colors.GREY.secondary,
        fontFamily: 'Roboto-Bold',
        fontSize: 15,
    },
    textInput: {
        color: colors.GREY.background,
        fontSize: 18,
        fontFamily: "Roboto-Regular",
        textAlign: "left",
        marginTop: 8,
        marginLeft: 5,
        borderBottomColor: colors.BLACK,
        borderBottomWidth: 1
    },
    multiTextInput: {
        color: colors.GREY.background,
        fontSize: 18,
        fontFamily: "Roboto-Regular",
        textAlign: "left",
        marginTop: 8,
        height: 108,
        marginLeft: 5,
        borderColor: colors.BLACK,
        borderWidth: 1
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 40,
        marginTop: 20,
    },
    contactButton: {
        backgroundColor: colors.SKY,
        width: 180,
        height: 50,
        borderColor: colors.TRANSPARENT,
        borderWidth: 0,
        marginTop: 10,
        borderRadius: 15,
    },
    buttonTitle: {
        fontSize: 16
    },
    topBar: {
        position: "absolute",
        marginTop: 0,
        marginLeft: 0,
        marginRight: 0,
        zIndex:10
    },
    backButton: {
        height: 40,
        width: 40,
        marginLeft: 35,
        marginTop: 45
    },
    backButtonImage: {
        height: 40,
        width: 40,
    },
    scrollStyle: {
        flex: 1,
        height: height,
        backgroundColor: colors.WHITE
    },
})