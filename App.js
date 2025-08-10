
import React from 'react';
import { Text, View, ScrollView, Image, TextInput, Button, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen({navigation}){
  return (
    <ScrollView style={{padding:16, backgroundColor:'#fff0f5'}}>
      <Text style={{fontSize:24, fontWeight:'700', color:'#b30059'}}>EstheConnect Center</Text>
      <Text style={{marginTop:8}}>Chirurgie & Soins Esthétiques</Text>
      <TouchableOpacity onPress={()=>navigation.navigate('Devis')} style={{marginTop:12, backgroundColor:'#d4af37', padding:12, borderRadius:8}}>
        <Text style={{color:'#fff', fontWeight:'700'}}>Demander un devis</Text>
      </TouchableOpacity>
      <Text style={{marginTop:20, fontSize:18, fontWeight:'600'}}>Services</Text>
      <View style={{marginTop:8}}>
        <View style={{backgroundColor:'#fff', padding:12, borderRadius:10, marginBottom:8}}>
          <Text style={{fontWeight:'700', color:'#b30059'}}>Hollywood Smile</Text>
          <Text>Facettes dentaires esthétiques</Text>
        </View>
        <View style={{backgroundColor:'#fff', padding:12, borderRadius:10, marginBottom:8}}>
          <Text style={{fontWeight:'700', color:'#b30059'}}>Greffe de cheveux</Text>
          <Text>FUE / DHI</Text>
        </View>
      </View>
    </ScrollView>
  );
}

function DevisScreen(){
  return (
    <ScrollView style={{padding:16, backgroundColor:'#fff0f5'}}>
      <Text style={{fontSize:20, fontWeight:'700', color:'#b30059'}}>Demander un devis</Text>
      <TextInput placeholder='Prénom' style={{borderWidth:1, padding:8, marginTop:12, borderRadius:8}} />
      <TextInput placeholder='Nom' style={{borderWidth:1, padding:8, marginTop:8, borderRadius:8}} />
      <TextInput placeholder='WhatsApp' style={{borderWidth:1, padding:8, marginTop:8, borderRadius:8}} />
      <TextInput placeholder='Service souhaité' style={{borderWidth:1, padding:8, marginTop:8, borderRadius:8}} />
      <TextInput placeholder='Message' multiline style={{borderWidth:1, padding:8, marginTop:8, borderRadius:8, height:120}} />
      <Button title='Envoyer ma demande' onPress={()=>alert('Formulaire envoyé (simulation)')} color='#b30059' />
    </ScrollView>
  );
}

const Stack = createStackNavigator();
export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={HomeScreen} options={{headerShown:false}} />
        <Stack.Screen name='Devis' component={DevisScreen} options={{title:'Demande de devis'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
