import React from "react";
import { AppRegistry, View, StyleSheet, Text, Image, ScrollView, Linking, TouchableOpacity } from "react-native";


function Donate(props) {
  return <View style={styles.container}>
  <ScrollView style={{ height: '100%'}}><Image 
 style={styles.logo}
 source={require("../../assets/Echo.png")}></Image>


<Text></Text>
<Text style={styles.h2}>Support us on Patreon through monthly donations</Text>
<TouchableOpacity style={{alignSelf: 'center'}} onPress={() => {
   Linking.openURL('https://www.patreon.com/bePatron?u=51840513');
 }}><Image source={require("../../assets/patreon.png")} 
 style={{ width: 320, height: 106.5 }}
  /></TouchableOpacity>

<Text></Text>

<Text style={styles.h2}>Want to support us in other ways?</Text>
<Text style={styles.p}>First of all, thank you for taking the interest in supporting us! </Text>
<Text style={styles.p}>We are aware that currently only monthly donations are available online through Patreon, howeverr,
if you would like to support us through a one time donation, plese contact us on: </Text>
<Text style={styles.h2}>echoapp@gmail.com</Text>

<Text style={styles.p}>You can also give us your support by giving our app a rating and 
feedback on the App Store or Playstore and connecting with us on social media</Text>
 
</ScrollView>
</View>;
}

const styles = StyleSheet.create({
container: {},
h2: {
color: 'white',
textAlign: 'center',
fontSize: 20,
fontWeight: 'bold',
paddingBottom: 20,
},
p: {
 paddingTop:10,
 color: 'white',
 textAlign: 'left',
 fontSize: 18,
},

logo: {
 alignSelf:'stretch',
 width:360,
 height: 185,
},
});

export default Donate;
