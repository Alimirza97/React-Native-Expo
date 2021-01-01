import * as React from 'react';
import { Home } from './pages/Home.js';
import { Calendar } from './pages/Calendar.js';
import { Memory } from './pages/Memory.js';
import { Notes } from './pages/Notes.js';
import { Login } from './pages/Login.js';
import { Register } from './pages/Register.js';
import { LoadingScreen } from './pages/LoadingScreen.js';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect } from 'react';
import { useState } from 'react';
import { Text, TouchableOpacity} from 'react-native';
import * as firebase from 'firebase';

const Tab = createBottomTabNavigator();
const StackNav = createStackNavigator();

function TabNavigator() {
  return (
    /*<Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Calendar" component={Calendar} />
      <Tab.Screen name="Memory" component={Memory} />
    </Tab.Navigator>*/

    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Ana Sayfa',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={Calendar}
        options={{
          tabBarLabel: 'Takvim',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar" color={color} size={size} />
          ),
          //tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="Memory"
        component={Memory}
        options={{
          tabBarLabel: 'Anılar',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="book-open-variant" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

function LogOut() {
  var email = firebase.auth().currentUser.email;
  firebase.auth()
    .signOut()
    .then(() => console.log('App', `${email} hesabindan cikis yapti`));
}
export default function App() {
  const [load, setLoad] = useState(0);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  useEffect(() => {
    var firebaseConfig = {
      apiKey: "AIzaSyBRGyru61byBVw5baOKO9f7c5JTUjI1crY",
      authDomain: "mobil-proje-fc262.firebaseapp.com",
      databaseURL: "https://mobil-proje-fc262-default-rtdb.firebaseio.com/",
      projectId: "mobil-proje-fc262",
      storageBucket: "mobil-proje-fc262.appspot.com",
      messagingSenderId: "35066978719",
      appId: "1:35066978719:web:cc892ec4bf702ad5641daa",
      measurementId: "G-MCCPCVZK3E"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    setLoad(true);
    /*firebase.database().ref('users').child('1').set({
      email: "Taha@gmail.com"});
      
    firebase.database().ref('events/').on('value', snapshot => {
        this.setState({ events: snapshot.val()})
    });*/
  }, []);
  if (load == true) {
    return (
      <NavigationContainer>
        <StackNav.Navigator initialRouteName="LoadingScreen">
          <StackNav.Screen name="Home" component={TabNavigator} options={{
            headerTitle: '  Uygulamanın Adı', headerLeft: null, headerRight: () => (
              <TouchableOpacity
                onPress={LogOut}
              >
                <Text style={{
                  color: "red",
                  fontSize: 15,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>Çıkış Yap       </Text>
              </TouchableOpacity>
            ),
          }} />
          <StackNav.Screen name="Calendar" component={TabNavigator} options={{ title: 'Takvim' }} />
          <StackNav.Screen name="Memory" component={TabNavigator} options={{ title: 'Anılar' }} />
          <StackNav.Screen name="Notes" component={Notes} options={{ title: 'Notlar' }} />
          <StackNav.Screen name="Login" component={Login} options={{ title: '  Giriş Yap', headerLeft: null }} />
          <StackNav.Screen name="Register" component={Register} options={{ title: 'Kayıt Ol' }} />
          <StackNav.Screen name="LoadingScreen" component={LoadingScreen} options={{ title: '' }} />
        </StackNav.Navigator>
      </NavigationContainer>
    );
  }
  else {
    return (
      <Text>
        İnternet Bağlantınızı Kontrol Edin.
      </Text>
    );

  }
}
