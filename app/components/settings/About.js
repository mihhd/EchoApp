import React from "react";
import { AppRegistry, View, StyleSheet, Text, Image, ScrollView, Linking, TouchableOpacity } from "react-native";

function About(props) {
  return <View style={styles.container}>
     <ScrollView style={{ height: '100%'}}><Image 
    style={styles.logo}
    source={require("../../assets/Echo.png")}></Image>
    <Text style={styles.h1}>About Us</Text>
   <Text style={styles.paragraph}> Echo is an AAC (Alternative and Augmentative Communications) application. The
application is an assistive communication software for individuals with disabilities and special needs who require AAC. Example users are, but not limited to,
persons on the autism spectrum or persons with aphasia. The app provides an opportunity for these persons to communicate
seamlessly and comprehensively. Unlike many high quality AAC software and apps, Echo is open source, free forever and available in multiple
languages. The app is designed to be inclusive and customizable for various cases with the help of special
educators Anita Najdoska and Danijela Petreska from the Educational and Creative Centre - SvetlinaPlus.

</Text>

<Text style={styles.paragraph}>Echo is a project that was supported and enabled by the YES Kennedy-Lugar program, The U.S. State department, and American Councils.</Text>
<Text style={styles.h2}>Where to find us?</Text>

<View  style={{ width: 360, display: "flex", flexDirection: "row", flexWrap: "wrap", alignContent: "center", alignItems: "center", justifyContent: "center" }}>
    <TouchableOpacity onPress={() => {
      Linking.openURL('https://www.facebook.com/echoaacapp');
    }}><Image source={require("../../assets/facebook.png")} 
    style={{ width: 48, height: 48 }}
     /></TouchableOpacity>
    <Text>                 </Text>
    <TouchableOpacity onPress={() => {
      Linking.openURL('https://www.twitter.com/davorpetreski2');
    }}><Image source={require("../../assets/twitter.png")} 
    style={{ width: 48, height: 48 }}
     /></TouchableOpacity>
    <Text>                 </Text>
    <TouchableOpacity onPress={() => {
      Linking.openURL('https://www.linkedin.com/in/davor-peterski/');
    }}><Image source={require("../../assets/linkedin.png")} 
    style={{ width: 48, height: 48 }}
     /></TouchableOpacity>

</View>

<Text style={styles.h1}>Our Partners</Text>
 
    <Image style={styles.partnersLogo}
    source={require("../../assets/YESLogo.png")}></Image>   
    <Text style={styles.h2}>  YES Kennedy-Lugar</Text>

    <Image style={styles.partnersLogoUS}
    source={require("../../assets/StateDept.png")}></Image>   
    <Text style={styles.h2}>United States Department of State</Text>

    <Image style={styles.partnersLogoAC}
    source={require("../../assets/ACLogo.png")}></Image>   
    <Text style={styles.h2}>  American Councils - Skopje</Text>

    <Image style={styles.partnersLogo}
    source={require("../../assets/svetlinaplus.png")}></Image>   
    <Text style={styles.h2}>  Educational and Creative Centre - SvetlinaPlus</Text>
    
</ScrollView>
  </View>;
}

const styles = StyleSheet.create({
  container: {},
  h1: {
paddingTop: 10,
color: 'white',
textAlign: 'left',
fontSize: 50,
fontWeight: 'bold',
  },
  h2: {
color: 'white',
textAlign: 'center',
fontSize: 20,
fontWeight: 'bold',
paddingBottom: 20,
  },
  paragraph: {
    paddingTop:10,
    color: 'white',
    textAlign: 'left',
    fontSize: 18,
  },

  social: {
    width:30,
    height: 30,
  },

  logo: {
    alignSelf:'stretch',
    width:360,
    height: 185,
  },
  partnersLogo: {
    paddingTop: 40,
    alignSelf: 'center',
    width:120,
    height: 120,
  },
  partnersLogoUS: {
    paddingTop: 40,
    alignSelf: 'center',
    width:252,
    height: 110,
  },

  partnersLogoAC: {
    paddingTop: 40,
    alignSelf: 'center',
    width:232.8,
    height: 60,
  },
});

export default About;
