import React, { useContext, useState, useMemo } from 'react';
import { Image } from 'react-native';
import { BackToFromContext, LanguageContext, TimeArrayContext, Array0Context, Array1Context, Array2Context} from '../../../context';
import { createStackNavigator,HeaderBackButton} from '@react-navigation/stack';
import { Connect } from './Connect';
import { FindWiFi } from './FindWiFi';
import { SetUpPico } from './SetUpPico';
import { ConnectWiFi } from './ConnectWiFi';
import { ViewAllScan} from './ViewAllScan';
import { Scan } from '../../../Auth/Scan';
import FindPicoToScan from './FindPicoToScan';
import FindPicoToWiFi from './FindPicoToWiFi';
import {Alert} from '../RealTime/Alert';


import colors from '../../../src/colors';

const ConnectStack = createStackNavigator();
export const ConnectStackScreen = () => {
  const strings = useContext(LanguageContext);

  const [isArray0, setIsArray0] = useState(0);
  const [isArray1, setIsArray1] = useState(2);
  const [isArray2, setIsArray2] = useState(4);

  const timearrayContext = useMemo(() => {
    return {
      array0Setting: (arr) => {
        setIsArray0(arr);
      },

      array1Setting: (arr) => {
        setIsArray1(arr);
      },

      array2Setting: (arr) => {
        setIsArray2(arr);
      },

    };
  }, []);



  return (
    <TimeArrayContext.Provider value={timearrayContext}>
    <Array0Context.Provider value={isArray0}>
    <Array1Context.Provider value={isArray1}>
    <Array2Context.Provider value={isArray2}>
    <BackToFromContext.Provider value="Connect">
      <ConnectStack.Navigator>
        <ConnectStack.Screen
          name="Connect"
          component={Connect}
          options={{
            title: strings.connecting_title,
            headerTransparent: true,
            headerTitleAlign: 'center',
            headerTitleStyle: { fontFamily: 'NotoSans-Bold' },
            headerBackImage: () => <Image source={require('../../../../Assets/img/icArrowLeft.png')} />,
          }}
        />
        <ConnectStack.Screen
          name="FindWiFi"
          component={FindWiFi}
          options={{
            title: strings.wifisetting_2_title,
            headerStyle: {
              borderBottomWidth: 0,
              backgroundColor: colors.white,
              shadowOpacity: 0,
              elevation: 0,
            },
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'NotoSans-Bold',
            },
            headerBackImage: () => <Image source={require('../../../../Assets/img/icArrowLeft.png')} />,
          }}
        />
        <ConnectStack.Screen
          name="FindPicoToScan"
          component={FindPicoToScan}
          options={{
            title: strings.wifisetting_1_title,
            headerStyle: {
              borderBottomWidth: 0,
              backgroundColor: colors.white,
              shadowOpacity: 0,
              elevation: 0,
            },
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'NotoSans-Bold',
            },
            headerBackImage: () => <Image source={require('../../../../Assets/img/icArrowLeft.png')} />,
          }}
        />
        <ConnectStack.Screen
          name="FindPicoToWiFi"
          component={FindPicoToWiFi}
          options={{
            title: strings.wifisetting_1_title,
            headerStyle: {
              borderBottomWidth: 0,
              backgroundColor: colors.white,
              shadowOpacity: 0,
              elevation: 0,
            },
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'NotoSans-Bold',
            },
            headerBackImage: () => <Image source={require('../../../../Assets/img/icArrowLeft.png')} />,
          }}
        />
   <ConnectStack.Screen
          name="Scan"
          component={Scan}
          options={({navigation, route}) => ({
            title: ' ',
            headerTransparent: 'true',
            headerTitleAlign: 'center',
            headerTitleStyle: {
            fontFamily: 'NotoSans-Bold',
            fontWeight: 'bold',
          },

          headerLeft:()=> null

            // headerLeft: (props) => (
            //   <HeaderBackButton
            //     {...props}
            //     onPress={() => navigation.navigate('Connect')}
            //   />
            // ),
       })}

        />

    <ConnectStack.Screen
          name="Alert"
          component={Alert}
          options={({navigation, route}) => ({
            title: 'Scan',
            headerTransparent: 'true',
            headerTitleAlign: 'center',
            headerTitleStyle: {
            fontFamily: 'NotoSans-Bold',
            fontWeight: 'bold',
          },

            headerLeft: (props) => (
              <HeaderBackButton
                {...props}
                onPress={() => navigation.navigate('Connect')}
              />
            ),
       })}

        />


        <ConnectStack.Screen
          name="ViewAllScan"
          component={ViewAllScan}
          options={{
            title: " ",
            headerTransparent: true,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'NotoSans-Bold',
            },
            headerBackImage: () => <Image source={require('../../../../Assets/img/icArrowLeft.png')} />,
          }}
        />

        <ConnectStack.Screen
          name="ConnectWiFi"
          component={ConnectWiFi}
          options={{
            title: strings.wifisetting_3_title,
            headerStyle: {
              borderBottomWidth: 0,
              backgroundColor: colors.white,
              shadowOpacity: 0,
              elevation: 0,
            },
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'NotoSans-Bold',
            },
            headerBackImage: () => <Image source={require('../../../../Assets/img/icArrowLeft.png')} />,
          }}
        />
        <ConnectStack.Screen
          name="SetUpPico"
          component={SetUpPico}
          options={{
            title: strings.wifisetting_4_title,
            headerStyle: {
              borderBottomWidth: 0,
              backgroundColor: colors.white,
              shadowOpacity: 0,
              elevation: 0,
            },
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'NotoSans-Bold',
            },
            headerBackImage: () => <Image source={require('../../../../Assets/img/icArrowLeft.png')} />,
          }}
        />
      </ConnectStack.Navigator>
    </BackToFromContext.Provider>
    </Array2Context.Provider>
    </Array1Context.Provider>
    </Array0Context.Provider>
    </TimeArrayContext.Provider>
  );
};