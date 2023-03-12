import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity, Button, Linking, BackHandler} from 'react-native';
import { SettingContext, NoticeContext, TempContext, UserDetailInfoContext, LanguageContext } from '../../../context';
import ToggleSwitch from '../../../component/ToggleSwitch';
import colors from '../../../src/colors';
import Modal from 'react-native-modal';
//import Sound from 'react-native-sound';

var Sound = require('react-native-sound');

// Sound.setCategory('Playback');

// var ding = new Sound('siren.mp3', Sound.MAIN_BUNDLE, (error) => {
//   if (error) {
//       console.log('failed to load the sound', error);
//       return;
//     }
//     // if loaded successfully
//     console.log('duration in seconds: ' + ding.getDuration() + 'number of channels: ' + ding.getNumberOfChannels());
  
//   });

export function Alert({ navigation, route }) {

  const { area } = route.params;
  const [timerCount, setTimer] = useState(30);


  useEffect(() => {
    if(area>=0 && area<=30){
      setTimer(60);
    }else if(area>30 && area<=60){
      setTimer(120);
    }else if(area>61){
      setTimer(180);
    }

  }, []);


  var Sound = require('react-native-sound');
  Sound.setCategory('Playback');

  var ding = new Sound('siren.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
        //console.log('failed to load the sound', error);
        return;
      }
      // if loaded successfully
      //console.log('duration in seconds: ' + ding.getDuration() + 'number of channels: ' + ding.getNumberOfChannels());
    });


  useEffect(() => {
    //console.log("use effecr 1");
    ding.setVolume(1);
    return () => {
      ding.release();
    };
  }, []);

  // useEffect(() => {
  //   BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
  //   return () => {
  //     BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
  //   };
  // }, []);


  // const playPause = () => {
  //   ding.play(success => {
  //     if (success) {
  //       console.log('successfully finished playing');
  //     } else {
  //       console.log('playback failed due to audio decoding errors');
  //     }
  //   });

  //   ding.setNumberOfLoops(-1);
  // };


  useEffect(() => {
    setTimeout(() => {
      ding.play(success => {
        if (success) {
          //console.log('successfully finished playing');
        } else {
          //console.log('playback failed due to audio decoding errors');
        }
      });
  
      ding.setNumberOfLoops(-1);
    }, 3000);

  }, []);



  useEffect(() => {
    let interval = setInterval(() => {
      setTimer(lastTimerCount => {
          lastTimerCount <= 1 && clearInterval(interval)
          return lastTimerCount - 1
      })
    }, 1000) //each count lasts for a second
    //cleanup the interval on complete
    return () => clearInterval(interval)
  }, []);


  return (
    <View style={styles.container}>
    <View style={styles.headerViewStyle}>

    </View>

    <View style={{alignItems:'center'}}>
    <Text style={{color:'red', fontWeight:'bold', fontSize:50}}>
        대피시간
    </Text>
    <View style={{flexDirection: "row", alignItems:'flex-end'}}>
    <Text style={{color:'red', fontWeight:'bold' ,fontSize:150,}}>
        {timerCount}
    </Text>
    <Text style={{color:'red',fontWeight:'bold' ,fontSize:70, marginBottom:20}}>
        초
    </Text>
    </View>
    </View>
    <TouchableOpacity onPress={()=>{Linking.openURL('tel:119');}} style={{flexDirection: "row" , backgroundColor:'red', borderRadius:20, alignItems:'center', paddingTop:10, paddingBottom:10, width: width*0.9, justifyContent:'center', marginBottom:20, marginTop:100}} >
        <Image source={require('../../../../Assets/img/alert_199.png')} style={{width:30, height:30}}></Image>
        <Text style={{color:'white',fontWeight:'bold' , fontSize:20,}}> 119 연결</Text>
    </TouchableOpacity>

  </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  headerViewStyle: {
    width: width,
    marginTop: height * 0.176,
    alignItems: 'center',
  },
  editProfileEmail: {
    flexDirection: 'row',
    margin: 4,
    justifyContent: 'center',
  },
  editEmail: {
    margin: 2,
    textAlign: 'center',
    fontFamily: 'NotoSans-Regular',
    fontSize: 12,
    color: colors.brownishGrey,
  },
  settingViewStyle: {
    flexDirection: 'column',
    width: width * 0.85,
    marginTop: height * 0.06,
    justifyContent: 'space-around',
  },
  managePicoHomeSetting: {
    flexDirection: 'row',
    width: width * 0.85,
    height: height * 0.0845,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.veryLightPink,
  },
  icStuff: {
    marginHorizontal: width * 0.0125,
    alignItems: 'center',
    justifyContent: 'center',
  },
  manageMyPicoHomeTextStyle: {
    width: width * 0.6875,
    marginHorizontal: width * 0.0125,
    alignItems: 'flex-start',
  },
  manageMyPiCoHomeText: {
    fontFamily: 'NotoSans-Regular',
    fontSize: 12,
    color: colors.black,
  },
  icNextArrow: {
    position: 'absolute',
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationSetting: {
    flexDirection: 'row',
    width: width * 0.85,
    height: height * 0.0845,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.veryLightPink,
  },
  icNotification: {
    marginHorizontal: width * 0.0125,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationTextStyle: {
    width: width * 0.6875,
    marginHorizontal: width * 0.0125,
    alignItems: 'flex-start',
  },
  notificationText: {
    fontFamily: 'NotoSans-Regular',
    fontSize: 12,
    color: colors.black,
  },
  notiToggleButton: { position: 'absolute', right: 0 },
  modalContainer: {
    width: width * 0.9,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: colors.white,
  },
  modalCancel: { position: 'absolute', top: 12, right: 12 },
  modalHeaderTextView: {
    width: width * 0.9,
    alignItems: 'center',
  },
  modalHeaderText: { fontSize: 22, fontFamily: 'NotoSans-Bold' },
  modalSubTextView: {
    width: width * 0.75,
    marginTop: height * 0.0281,
  },
  modalSubText: { fontFamily: 'NotoSans-Regular', fontSize: 16, color: colors.brownGrey },
  modalButton: {
    width: width * 0.8,
    height: height * 0.0704,
    marginTop: height * 0.0423,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor: colors.azure,
    shadowColor: 'rgba(0, 172, 255, 0.2)',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 16,
    shadowOpacity: 1,
    elevation: 1,
  },
  modalButtonText: {
    fontSize: 20,
    fontFamily: 'NotoSans-Bold',
    color: colors.white,
  },
  temperatureSetting: {
    flexDirection: 'row',
    width: width * 0.85,
    height: height * 0.0845,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.veryLightPink,
    borderBottomWidth: 1,
    borderBottomColor: colors.veryLightPink,
  },
  icTemperature: {
    marginHorizontal: width * 0.0125,
    alignItems: 'center',
    justifyContent: 'center',
  },
  temperatureTextStyle: {
    width: width * 0.6875,
    marginHorizontal: width * 0.0125,
    alignItems: 'flex-start',
  },
  temperatureText: {
    fontFamily: 'NotoSans-Regular',
    fontSize: 12,
    color: colors.black,
  },
  linkFldViewStyle: { flexDirection: 'row', marginTop: height * 0.056 },
  linkFldUnitStyle: { flexDirection: 'column', alignItems: 'center' },
  icCart: {
    width: 40,
    height: 40,
    marginHorizontal: 20,
    marginBottom: 4,
  },
  icQuestion: {
    width: 40,
    height: 40,
    marginHorizontal: 20,
    marginBottom: 4,
  },
  icTerms: {
    width: 40,
    height: 40,
    marginHorizontal: 20,
    marginBottom: 4,
  },
  storeText: {
    textAlign: 'center',
    fontFamily: 'NotoSans-Regular',
    fontSize: 10,
    color: colors.brownGrey,
  },
  infoText: {
    textAlign: 'center',
    fontFamily: 'NotoSans-Regular',
    fontSize: 10,
    color: colors.brownGrey,
  },
  termsText: {
    textAlign: 'center',
    fontFamily: 'NotoSans-Regular',
    fontSize: 10,
    color: colors.brownGrey,
  },
  versionViewStyle: {
    marginTop: height * 0.127,
    alignItems: 'center',
    justifyContent: 'center',
  },
  versionStyle: {
    textAlign: 'center',
    fontFamily: 'NotoSans-Regular',
    fontSize: 11,
    color: colors.brownGrey,
  },
});
