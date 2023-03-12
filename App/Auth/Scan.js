import React, { useContext, useEffect, useState,  } from 'react';
import {BackHandler} from 'react-native';
import { StyleSheet, View, Text, Image, Dimensions, ActivityIndicator, NativeModules, TouchableOpacity } from 'react-native';
import { BackToFromContext, LanguageContext, TempContext, UserContext, TimeArrayContext, Array0Context, Array1Context, Array2Context} from '../context';
import { PicoDevice } from '../Main/Home/Connect/FindPicoToScan';
import colors from '../src/colors';
import cal from '../src/calculate';
import cnt from '../src/constant';
import RNFetchBlob from 'react-native-fetch-blob';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';


export const Scan = ({ navigation, route }) => {

  const { area } = route.params;
  //const {area} = this.props.route.params;
  Geocoder.init('AIzaSyADiif-VkiHzwaWfz1RsvoWF5ZjhdGfmpo', {
    language: locale,
  });


  //console.log("평 수는 ------------------------------"+ area);

  const strings = useContext(LanguageContext);
  const tempMod = useContext(TempContext);
  const from = useContext(BackToFromContext);
  const userInfo = useContext(UserContext);
  const { array0Setting, array1Setting, array2Setting } = useContext(TimeArrayContext);
  const arr0 = useContext(Array0Context);
  const arr1 = useContext(Array1Context);
  const arr2 = useContext(Array2Context);

  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);

  const [pm25, setPm25] = useState(PicoDevice.data != null ? '-' : 0);
  const [pm10, setPm10] = useState(PicoDevice.data != null ? '-' : 0);
  const [temp, setTemp] = useState(PicoDevice.data != null ? '-' : 0);
  const [humd, setHumd] = useState(PicoDevice.data != null ? '-' : 0);
  const [vocs, setVOCs] = useState(PicoDevice.data != null ? '-' : 0);
  const [co2, setCO2] = useState(PicoDevice.data != null ? '-' : 0);
  const [co, setCO] = useState(PicoDevice.data != null ? '-' : 0);
  const [ch4, setCH4] = useState(PicoDevice.data != null ? '-' : 0);
  const [fire, setFire] = useState(PicoDevice.data != null ? '-' : 0);
  const [secCount, setSecCount] = useState(PicoDevice.data != null ? '-' : 0);

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [addressName, setAddressName] = useState('-');

  const [date, setDate] = useState(new Date());
  const [amPm, setAmPm] = useState('AM');
  const [publicAirInfo, setPublicAirInfo] = useState(null);


  const [publicStateInfo, setPublicStateInfo] = useState(null);
  const [publicPm25, setPublicPm25] = useState(0);
  const [publicPm10, setPublicPm10] = useState(0);
  const [publicO3, setPublicO3] = useState(0);
  const [publicPollenTree, setPublicPollenTree] = useState(0);
  const [publicPollenWeed, setPublicPollenWeed] = useState(0);

  const [pollenExplain, setPollenEx] = useState(false);
  const [settingExplain, setSettingExplain] = useState(false);
  const [bleErrorExplain, setBleErrorExplain] = useState(false);

  var time_sequence= [100,100,100];
  var scantime_count=1;

  
    //====================================================================================================
    // Month와 Day정보 return
  function monthAndDay() {
      let month = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
      let monthIdx = date.getMonth();
      let dayIdx = leadingZeros(date.getDate(), 2);
      let s = month[monthIdx] + '.' + dayIdx;
      return s;
  }
  
    // 한자리 수 숫자일 경우 십의 자리 수에 0추가
  function leadingZeros(n, digits) {
      let zero = '';
      n = n.toString();
      if (n.length < digits) {
        for (let i = 0; i < digits - n.length; i++) zero += '0';
      }
      return zero + n;
  }
  
    // 1초 마다 Screen render
    // Hour와 Minute 갱신을 위해서 사용
    // 인터넷이 연결되어 있는지 1초마다 확인
  // function tick() {
  //     setDate(new Date());
  //     makeAmPm();
  // }
  
    // Hour값이 12보다 작으면 'AM'반환
    // Hour값이 12보다 크면 'PM'반환
  function makeAmPm() {
      if (date.getHours() < 12) {
        setAmPm('AM');
      } else {
        setAmPm('PM');
      }
  }

    //=====================================================================================
  function handleBackButtonClick() {
    //navigation.navigate('RealTimeStack');
    return true;
  }
  // 1초 마다 블루투스 연결된 PiCO로 부터 데이터를 읽어오기 위해 호출
  function tick() {
    update();
    setDate(new Date());
    makeAmPm();
  }

    //    const values = [
    //   ['pm25', 0],
    //   ['pm10', 0],
    //   ['temp', 0],
    //   ['humd', 0],
    //   ['vocs', 0],
    //   ['co2', 0],
    //   ['co', 0],
    //   ['ch4', 0],
    // ];

  function update() {
    PicoDevice.reload();
    setPm25(PicoDevice.data != null ? PicoDevice.data.pm25.value : 0);
    setPm10(PicoDevice.data != null ? PicoDevice.data.pm10.value : 0);
    setTemp(PicoDevice.data != null ? PicoDevice.data.temp.value : 0);
    setHumd(PicoDevice.data != null ? PicoDevice.data.humd.value : 0);
    setVOCs(PicoDevice.data != null ? PicoDevice.data.vocs.value : 0);
    setCO2(PicoDevice.data != null ? PicoDevice.data.co2.value : 0);
    setCO(PicoDevice.data != null ? PicoDevice.data.co.value : 0);
    setCH4(PicoDevice.data != null ? PicoDevice.data.ch4.value : 0);
    setFire(PicoDevice.data != null ? PicoDevice.data.fire.value : 0);
    setSecCount(PicoDevice.data != null ? PicoDevice.data.count.value : 0);

    if(fire == 1){
      navigation.navigate('Alert', { area });
    }

    array0Setting(arr1);
    array1Setting(arr2);
    array2Setting(secCount);
    

    if((arr0== arr1) && (arr1== arr2)){
      console.log("ENd bluetooth");
      setBleErrorExplain(true);
    }


     //1열에는 컬럼명

     //const values= [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];

    //  const values = [
    //   ['pm25', pm25],
    //   ['pm10', pm10],
    //   ['temp', temp],
    //   ['humd', humd],
    //   ['vocs', vocs],
    //   ['co2', co2],
    //   ['co', co],
    //   ['ch4', ch4],
    // ];
    
    // //values.push(values2);
    // console.log(values);
    // // construct csvString
    // const headerString = 'event,timestamp\n';
    // const rowString = values.map(d => `${d[0]},${d[1]}\n`).join('');
    // const csvString = `${headerString}${rowString}`;
    
    // // write the current list of answers to a local csv file
    // const pathToWrite = `${RNFetchBlob.fs.dirs.DownloadDir}/dataaaa1.csv`;
    // console.log('pathToWrite', pathToWrite);
    // // pathToWrite /storage/emulated/0/Download/data.csv
    // RNFetchBlob.fs
    //   .writeFile(pathToWrite, csvString, 'utf8')
    //   .then(() => {
    //     console.log(`wrote file ${pathToWrite}`);
    //     // wrote file /storage/emulated/0/Download/data.csv
    //   })
    //   .catch(error => console.error(error));

    // const values = [
    //   ['build', '2017-11-05T05:40:35.515Z'],
    //   ['deploy', '2017-11-05T05:42:04.810Z']
    // ];
    
    // // construct csvString
    // const headerString = 'event,timestamp\n';
    // const rowString = values.map(d => `${d[0]},${d[1]}\n`).join('');
    // const csvString = `${headerString}${rowString}`;
    
    // // write the current list of answers to a local csv file
    // const pathToWrite = `${RNFetchBlob.fs.dirs.DownloadDir}/data.csv`;
    // console.log('pathToWrite', pathToWrite);
    // // pathToWrite /storage/emulated/0/Download/data.csv
    // RNFetchBlob.fs
    //   .writeFile(pathToWrite, csvString, 'utf8')
    //   .then(() => {
    //     console.log(`wrote file ${pathToWrite}`);
    //     // wrote file /storage/emulated/0/Download/data.csv
    //   })
    //   .catch(error => console.error(error));

    
    //   const values = [
    //   ['pm25', pm25],
    //   ['pm10', pm10],
    //   ['temp', temp],
    //   ['humd', humd],
    //   ['vocs', vocs],
    //   ['co2', co2],
    //   ['co', co],
    //   ['ch4', ch4],
    // ];


    // var dt = new Date(Date.parse(serverDate));
    // var localDate = dt;
    
    // var gmt = localDate;
    //     var min = gmt.getTime() / 1000 / 60; // convert gmt date to minutes
    //     var localNow = new Date().getTimezoneOffset(); // get the timezone
    //     // offset in minutes
    //     var localTime = min - localNow; // get the local time

    // var dateStr = new Date(localTime * 1000 * 60);
    // // dateStr = dateStr.toISOString("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"); // this will return as just the server date format i.e., yyyy-MM-dd'T'HH:mm:ss.SSS'Z'
    // dateStr = dateStr.toString("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");

    


  var m = new Date();
  var dateString = m.getUTCFullYear() +"/"+ (m.getUTCMonth()+1) +"/"+ m.getUTCDate() + " " + m.getUTCHours() + ":" + m.getUTCMinutes() + ":" + m.getUTCSeconds();

    const values = [[dateString, pm25, pm10, temp, humd, vocs, co2, co, ch4]]


    //values.push(values2);
    //console.log(values)---------------------------------
    
    // construct csvString
    // const headerString = 'event,value\n';
    // const rowString = values.map(d => `${d[0]},${d[1]}\n`).join('');
    // const csvString = `${headerString}${rowString}`;
    
        
    //construct csvString
    const headerString = 'time,pm25,pm10,temp,humd,vocs,co2,co,ch4\n';
    const rowString = values.map(d => `${d[0]},${d[1]},${d[2]},${d[3]},${d[4]},${d[5]},${d[6]},${d[7]},${d[8]}\n`).join('');
    const csvString = `${rowString}`;

    // write the current list of answers to a local csv file
    const pathToWrite = `${RNFetchBlob.fs.dirs.DownloadDir}/data_air.csv`;
    //console.log('pathToWrite', pathToWrite);-------------------
    // pathToWrite /storage/emulated/0/Download/data.csv

    //console.log(csvString);
    // RNFetchBlob.fs
    //   .writeFile(pathToWrite, csvString, 'utf8')
    //   .then(() => {
    //     console.log(`wrote file ${pathToWrite}`);
    //     // wrote file /storage/emulated/0/Download/data.csv
    //   })
    //   .catch(error => console.error(error));

      RNFetchBlob.fs
      .appendFile(pathToWrite, csvString, 'utf8')
      .then(() => {
       // console.log(`wrote file ${pathToWrite}`);----------------------------
        // wrote file /storage/emulated/0/Download/data.csv
      })
      .catch(error => console.error(error));
      
    if (count > 5) {
      setIsLoading(true);
    }
    if (count < 10) {
      setCount(count + 1);
    }
  }

    // Background color값 반환
    const getBackgroundState = value => {
      if (cal.boundaryPM25(value) === cnt.PM25_GOOD)
        return 'rgba(0, 172, 255, 0.3)';
      else if (cal.boundaryPM25(value) === cnt.PM25_MOD)
        return 'rgba(121, 191, 0, 0.3)';
      else if (cal.boundaryPM25(value) === cnt.PM25_BAD)
        return 'rgba(255, 160, 64, 0.3)';
      else if (cal.boundaryPM25(value) === cnt.PM25_VERY_BAD)
        return 'rgba(252, 83, 69, 0.3)';
  
      return 'rgba(252, 83, 69, 0.3)';
    };
  
    // Background Layer1의 color에 해당하는 이미지 반환
    const getBackWaveLayerState1 = value => {
      if (cal.boundaryPM25(value) === cnt.PM25_GOOD)
        return require('../../Assets/img/waveLayerGood1.png');
      else if (cal.boundaryPM25(value) === cnt.PM25_MOD)
        return require('../../Assets/img/waveLayerModerate1.png');
      else if (cal.boundaryPM25(value) === cnt.PM25_BAD)
        return require('../../Assets/img/waveLayerBad1.png');
      else if (cal.boundaryPM25(value) === cnt.PM25_VERY_BAD)
        return require('../..//Assets/img/waveLayerVeryBad1.png');
    };
  
    // Background Layer2의 color에 해당하는 이미지 반환
    const getBackWaveLayerState2 = value => {
      if (cal.boundaryPM25(value) === cnt.PM25_GOOD)
        return require('../../Assets/img/waveLayerGood2.png');
      else if (cal.boundaryPM25(value) === cnt.PM25_MOD)
        return require('../../Assets/img/waveLayerModerate2.png');
      else if (cal.boundaryPM25(value) === cnt.PM25_BAD)
        return require('../../Assets/img/waveLayerBad2.png');
      else if (cal.boundaryPM25(value) === cnt.PM25_VERY_BAD)
        return require('../../Assets/img/waveLayerVeryBad2.png');
    }
  
    // public Pm25의 color값 반환
    const getPublicPm25TextColor = value => {
      if (cal.boundaryPM25(value) === cnt.PM25_GOOD)
        return { color: colors.azure };
      else if (cal.boundaryPM25(value) === cnt.PM25_MOD)
        return { color: colors.darkLimeGreen };
      else if (cal.boundaryPM25(value) === cnt.PM25_BAD)
        return { color: colors.lightOrange };
      else if (cal.boundaryPM25(value) === cnt.PM25_VERY_BAD)
        return { color: colors.coral };
    };
  
    // public Pm10의 color값 반환
    const getPublicPm10TextColor = (props) => {
      if (0 <= props && props <= 30) {
        return { color: colors.azure };
      } else if (31 <= props && props <= 80) {
        return { color: colors.darkLimeGreen };
      } else if (81 <= props && props <= 150) {
        return { color: colors.lightOrange };
      } else {
        return { color: colors.coral };
      }
    };
  
    // public Ozone의 color값 반환
    // Ozone의 ppb기준 상태 수치 필요 (현재는 임의 설정)
    const getPublicO3TextColor = (props) => {
      if (0 <= props && props <= 50) {
        return { color: colors.azure };
      } else if (51 <= props && props <= 100) {
        return { color: colors.darkLimeGreen };
      } else if (101 <= props && props <= 150) {
        return { color: colors.lightOrange };
      } else {
        return { color: colors.coral };
      }
    };
  
    // public Pollen_Tree의 color값 반환
    const getPublicPollenTreeTextColor = (props) => {
      if (props === null) {
        return { color: colors.blueGrey };
      } else if (props === 0 || props === 1) {
        return { color: colors.azure };
      } else if (props === 2) {
        return { color: colors.darkLimeGreen };
      } else if (props === 3 || props === 4) {
        return { color: colors.lightOrange };
      } else {
        return { color: colors.coral };
      }
    };
  
    // public Pollen_Weed의 color값 반환
    const getPublicPollenWeedTextColor = (props) => {
      if (props === null) {
        return { color: colors.blueGrey };
      } else if (props === 0 || props === 1) {
        return { color: colors.azure };
      } else if (props === 2) {
        return { color: colors.darkLimeGreen };
      } else if (props === 3 || props === 4) {
        return { color: colors.lightOrange };
      } else {
        return { color: colors.coral };
      }
    };

  const getPm25Color = (value) => {
    if (cal.boundaryPM25(value) === cnt.PM25_GOOD)
      return colors.azure;
    else if (cal.boundaryPM25(value) === cnt.PM25_MOD)
      return colors.darkLimeGreen;
    else if (cal.boundaryPM25(value) === cnt.PM25_BAD)
      return colors.lightOrange;
    else if (cal.boundaryPM25(value) === cnt.PM25_VERY_BAD)
      return colors.coral;
  };

  const getPm25Picture = (value) => {
    if (cal.boundaryPM25(value) === cnt.PM25_GOOD)
      return require('../../Assets/img/icPm25Blue.png');
    else if (cal.boundaryPM25(value) === cnt.PM25_MOD)
      return require('../../Assets/img/icPm25Green.png');
    else if (cal.boundaryPM25(value) === cnt.PM25_BAD)
      return require('../../Assets/img/icPm25Orange.png');
    else if (cal.boundaryPM25(value) === cnt.PM25_VERY_BAD)
      return require('../../Assets/img/icPm25Red.png');
  };

  const getPm10Color = (value) => {
    if (0 <= value && value <= 30) {
      return colors.azure;
    } else if (31 <= value && value <= 80) {
      return colors.darkLimeGreen;
    } else if (81 <= value && value <= 150) {
      return colors.lightOrange;
    } else {
      return colors.coral;
    }
  };

  const getPm10Picture = (value) => {
    if (0 <= value && value <= 30) {
      return require('../../Assets/img/icPm10Blue.png');
    } else if (31 <= value && value <= 80) {
      return require('../../Assets/img/icPm10Green.png');
    } else if (81 <= value && value <= 150) {
      return require('../../Assets/img/icPm10Orange.png');
    } else {
      return require('../../Assets/img/icPm10Red.png');
    }
  };

  const getTemperatureColor = (value) => {
    if (value <= 9) {
      return colors.azure;
    } else if (9 < value && value <= 29) {
      return colors.darkLimeGreen;
    } else if (29 < value && value <= 49) {
      return colors.lightOrange;
    } else {
      return colors.coral;
    }
  };

  const getTemperaturePicture = (value) => {
    if (value <= 9) {
      return require('../../Assets/img/icTemperatureSettingBlue.png');
    } else if (9 < value && value <= 29) {
      return require('../../Assets/img/icTemperatureSettingGreen.png');
    } else if (29 < value && value <= 49) {
      return require('../../Assets/img/icTemperatureSettingOrange.png');
    } else {
      return require('../../Assets/img/icTemperatureSettingRed.png');
    }
  };

  const getHumidColor = (value) => {
    if (0 <= value && value <= 39) {
      return colors.lightOrange;
    } else if (39 < value && value <= 60) {
      return colors.darkLimeGreen;
    } else {
      return colors.azure;
    }
  };

  const getHumidPicture = (value) => {
    if (0 <= value && value <= 39) {
      return require('../../Assets/img/icHumidityOrange.png');
    } else if (39 < value && value <= 60) {
      return require('../../Assets/img/icHumidityGreen.png');
    } else {
      return require('../../Assets/img/icHumidityBlue.png');
    }
  };

  const getCoColor = (value) => {
    if (0 <= value && value <= 20) {
      return colors.azure;
    } else if (21 <= value && value <= 3200) {
      return colors.darkLimeGreen;
    } else if (3201 <= value && value <= 6400) {
      return colors.lightOrange;
    } else {
      return colors.coral;
    }
  };

  const getCoPicture = (value) => {
    if (0 <= value && value <= 20) {
      return require('../../Assets/img/icCoBlue.png');
    } else if (21 <= value && value <= 3200) {
      return require('../../Assets/img/icCoGreen.png');
    } else if (3201 <= value && value <= 6400) {
      return require('../../Assets/img/icCoOrange.png');
    } else {
      return require('../../Assets/img/icCoRed.png');
    }
  };

  const getCh4Color = (value) => {
    if (0 <= value && value <= 5) {
      return colors.azure;
    } else if (6 <= value && value <= 10) {
      return colors.darkLimeGreen;
    } else if (11 <= value && value <= 15) {
      return colors.lightOrange;
    } else {
      return colors.coral;
    }
  };

  const getCh4Picture = (value) => {
    if (0 <= value && value <= 5) {
      return require('../../Assets/img/icCh4Blue.png');
    } else if (6 <= value && value <= 10) {
      return require('../../Assets/img/icCh4Green.png');
    } else if (11 <= value && value <= 15) {
      return require('../../Assets/img/icCh4Orange.png');
    } else {
      return require('../../Assets/img/icCh4Red.png');
    }
  };

  const getTvocColor = (value) => {
    if (0 <= value && value <= 249) {
      return colors.azure;
    } else if (250 <= value && value <= 449) {
      return colors.darkLimeGreen;
    } else {
      return colors.coral;
    }
  };

  const getTvocPicture = (value) => {
    if (0 <= value && value <= 249) {
      return require('../../Assets/img/icVocBlue.png');
    } else if (250 <= value && value <= 449) {
      return require('../../Assets/img/icVocGreen.png');
    } else {
      return require('../../Assets/img/icVocRed.png');
    }
  };

  const getCo2Color = (value) => {
    if (0 <= value && value <= 800) {
      return colors.azure;
    } else if (801 <= value && value <= 1000) {
      return colors.darkLimeGreen;
    } else if (1001 <= value && value <= 2000) {
      return colors.lightOrange;
    } else {
      return colors.coral;
    }
  };

  const getCo2Picture = (value) => {
    if (0 <= value && value <= 800) {
      return require('../../Assets/img/icCo2Blue.png');
    } else if (801 <= value && value <= 1000) {
      return require('../../Assets/img/icCo2Green.png');
    } else if (1001 <= value && value <= 2000) {
      return require('../../Assets/img/icCo2Orange.png');
    } else {
      return require('../../Assets/img/icCo2Red.png');
    }
  };

  function getPublicWeatherInfo() {
    fetch('https://us-central1-pico-home.cloudfunctions.net/GetPublicWeatherInfo', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userid: userInfo.userid, // userInfo.userid,
        latitude: latitude,
        longitude: longitude,
        apiKey: userInfo.apiKey, // userInfo.apiKey,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.Status === 'ERROR' && res.Msg === 'err_invalid_api_key')
          setIsForcedLogout(true)
        else
          setPublicAirInfo(res)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    Geolocation.getCurrentPosition((success)=>{
      setLongitude(success.coords.longitude);
      setLatitude(success.coords.latitude);
    });
  }, []);

  // 현재 위치의 위,경도 값을 기준으로 주소지 설정
  useEffect(() => {
    //console.log(latitude);
    //console.log(longitude);
    if (latitude != null && longitude != null) {
      getPublicWeatherInfo(); // Temperature/Humid/Ozone 설정
      Geocoder.from(latitude, longitude)
        .then((res) => {
          let position = res.results[0].address_components;
          let len = res.results[0].address_components.length;
          //console.log(len);
          let address = '';
          for (let i = len - 3; i >= len-5; i--) {
            if (i === len-5) {
              //test
              address += position[i].long_name;
              break;
            }
            address = address + position[i].long_name + ' ';
          }
          setAddressName(address); // 주소지 설정
        })
        .catch((error) => console.warn(error));
    }
  }, [latitude, longitude]);

  useEffect(() => {
    if (latitude != null && longitude != null) {
      let url =
        'https://api.tomorrow.io/v4/timelines?location=' +
        latitude +
        ',' +
        longitude +
        '&fields=particulateMatter25,particulateMatter10,pollutantO3,treeIndex,weedIndex&timesteps=current&units=metric&apikey=pyZzjTuiJMvG8VZSfF9PqPxXXPlizgo5';
      fetch(url)
        .then((response) => response.json())
        .then((responseJson) =>
        {
          //console.log(url);
          // console.log(responseJson.data.timelines[0].intervals[0].values);

          setPublicStateInfo(responseJson)});
    }
  }, [addressName]);

  useEffect(() => {
    try{
      setPublicPm25(publicStateInfo?.data?.timelines[0]?.intervals[0]?.values?.particulateMatter25 || 0);
      setPublicPm10(publicStateInfo?.data?.timelines[0]?.intervals[0]?.values?.particulateMatter10 || 0);
      setPublicO3(publicStateInfo?.data?.timelines[0]?.intervals[0]?.values?.pollutantO3 || 0);
      setPublicPollenTree(publicStateInfo?.data?.timelines[0]?.intervals[0]?.values?.treeIndex || 0);
      setPublicPollenWeed(publicStateInfo?.data?.timelines[0]?.intervals[0]?.values?.weedIndex || 0);

  }catch(exception){
      setPublicPm25(0);
      setPublicPm10(0);
      setPublicO3(0);
      setPublicPollenTree(0);
      setPublicPollenWeed(0);}

}, [publicStateInfo]);

  // 1초 마다 블루투스에서 가져오는 값 갱신
  useEffect(() => {
    var timerID = setInterval(() => tick(), 1000);
    return function cleanup() {
      clearInterval(timerID);
    };
  });

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, []);

  return (
    // <View style={styles.container}>

    //   {isLoading ? (
    //     <View>
    //       <View style={{ height: height * 0.05 }}></View>
    //       <View style={styles.box_pm25}>
    //         <View style={styles.stateBox}>
    //           <View style={[styles.bgStateBar, { backgroundColor: getPm25Color(pm25) }]}></View>
    //           <Image style={styles.icPm25} source={getPm25Picture(pm25)} />
    //           <Text style={[styles.pm25, { color: getPm25Color(pm25) }]}>{strings.scan_label_pm25}</Text>
    //           <View style={styles.pm25ValueView}>
    //             <Text style={[styles.pm25Value, { color: getPm25Color(pm25) }]}>{pm25}</Text>
    //           </View>
    //           <Text style={[styles.pm25m3, { color: getPm25Color(pm25) }]}>μg/m³</Text>
    //         </View>
    //       </View>
    //       <View style={styles.box}>
    //         <View style={styles.stateBox}>
    //           <View style={[styles.bgStateBar, { backgroundColor: getPm10Color(pm10) }]}></View>
    //           <Image style={styles.icPm10} source={getPm10Picture(pm10)} />
    //           <Text style={[styles.pm10, { color: getPm10Color(pm10) }]}>{strings.scan_label_pm10}</Text>
    //           <View style={styles.pm10ValueView}>
    //             <Text style={[styles.pm10Value, { color: getPm10Color(pm10) }]}>{pm10}</Text>
    //           </View>
    //           <Text style={[styles.pm10m3, { color: getPm10Color(pm10) }]}>μg/m³</Text>
    //         </View>
    //       </View>
    //       <View style={styles.box}>
    //         <View style={styles.stateBox}>
    //           <View style={[styles.bgStateBar, { backgroundColor: getTemperatureColor(temp) }]}></View>
    //           <Image style={styles.icTemp} source={getTemperaturePicture(temp)} />
    //           <Text style={[styles.temperature, { color: getTemperatureColor(temp) }]}>{strings.scan_label_temperature}</Text>
    //           <View style={styles.tempValueView}>
    //             <Text style={[styles.temperatureValue, { color: getTemperatureColor(temp) }]}>{temp}</Text>
    //           </View>
    //           <Text style={[styles.temperatureC, { color: getTemperatureColor(temp) }]}>°C</Text>
    //         </View>
    //       </View>
    //       <View style={styles.box}>
    //         <View style={styles.stateBox}>
    //           <View style={[styles.bgStateBar, { backgroundColor: getHumidColor(humd) }]}></View>
    //           <Image style={styles.icHumdi} source={getHumidPicture(humd)} />
    //           <Text style={[styles.humidity, { color: getHumidColor(humd) }]}>{strings.scan_label_humidity}</Text>
    //           <View style={styles.humdiValueView}>
    //             <Text style={[styles.humidityValue, { color: getHumidColor(humd) }]}>{humd}</Text>
    //           </View>
    //           <Text style={[styles.humidityPercent, { color: getHumidColor(humd) }]}>%</Text>
    //         </View>
    //       </View>
    //       <View style={styles.box}>
    //         <View style={styles.stateBox}>
    //           <View style={[styles.bgStateBar, { backgroundColor: getTvocColor(vocs) }]}></View>
    //           <Image style={styles.icVoc} source={getTvocPicture(vocs)} />
    //           <Text style={[styles.Voc, { color: getTvocColor(vocs) }]}>{strings.scan_label_vocs}</Text>
    //           <View style={styles.vocValueView}>
    //             <Text style={[styles.VocValue, { color: getTvocColor(vocs) }]}>{vocs}</Text>
    //           </View>
    //           <Text style={[styles.Vocppb, { color: getTvocColor(vocs) }]}>ppb</Text>
    //         </View>
    //       </View>
    //       <View style={styles.box}>
    //         <View style={styles.stateBox}>
    //           <View style={[styles.bgStateBar, { backgroundColor: getCo2Color(co2) }]}></View>
    //           <Image style={styles.icCO2} source={getCo2Picture(co2)} />
    //           <Text style={[styles.CO2, { color: getCo2Color(co2) }]}>{strings.scan_label_co2}</Text>
    //           <View style={styles.co2ValueView}>
    //             <Text style={[styles.CO2Value, { color: getCo2Color(co2) }]}>{co2}</Text>
    //           </View>
    //           <Text style={[styles.CO2ppm, { color: getCo2Color(co2) }]}>ppm</Text>
    //         </View>
    //       </View>
    //       <View style={styles.box}>
    //         <View style={styles.stateBox}>
    //           <View style={[styles.bgStateBar, { backgroundColor: getCoColor(co) }]}></View>
    //           <Image style={styles.icCO2} source={getCoPicture(co)} />
    //           <Text style={[styles.CO2, { color: getCoColor(co) }]}>일산화탄소</Text>
    //           <View style={styles.co2ValueView}>
    //             <Text style={[styles.CO2Value, { color: getCoColor(co) }]}>{co}</Text>
    //           </View>
    //           <Text style={[styles.CO2ppm, { color: getCoColor(co) }]}>ppm</Text>
    //         </View>
    //       </View>
    //       <View style={styles.box}>
    //         <View style={styles.stateBox}>
    //           <View style={[styles.bgStateBar, { backgroundColor: getCh4Color(ch4) }]}></View>
    //           <Image style={styles.icCO2} source={getCh4Picture(ch4)} />
    //           <Text style={[styles.CO2, { color: getCh4Color(ch4) }]}>메테인</Text>
    //           <View style={styles.co2ValueView}>
    //             <Text style={[styles.CO2Value, { color: getCh4Color(ch4) }]}>{ch4}</Text>
    //           </View>
    //           <Text style={[styles.CO2ppm, { color: getCh4Color(ch4) }]}>ppm</Text>
    //         </View>
    //       </View>
    //     </View>
    //   ) : (
    //     <View style={styles.indicator}>
    //       <ActivityIndicator size="large" color={colors.azure} />
    //     </View>
    //   )}
    // </View>

    <View style={styles.home_container}>
      <View style={{ alignItems: 'center' }}>
      <LinearGradient
            colors={[getBackgroundState(parseInt(publicPm25)), 'transparent']}
            style={styles.home_linearGradientStyle}/>
          <View style={{ position: 'absolute' }}>
            <Image style={{ width: width, height: height * 0.1 }} source={getBackWaveLayerState1(parseInt(publicPm25))} />
          </View>
          <View style={{ position: 'absolute' }}>
            <Image style={{ width: width, height: height * 0.1 }} source={getBackWaveLayerState2(parseInt(publicPm25))} />
          </View>
          <View style={styles.home_headerStyle}>
            <View style={styles.home_headerViewStyle}>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={styles.home_icApps} onPress={() => navigation.navigate('ViewAllScan')}>
                  <Image source={require('../../Assets/img/icApps.png')} />
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.icComments} onPress={() => navigation.navigate('Message')}>
                  <Image source={require('../../../../Assets/img/icComments.png')} />
                </TouchableOpacity> */}
              </View>
              <TouchableOpacity style={styles.home_icSettings} onPress={() => setSettingExplain(true)}>
                <Image source={require('../../Assets/img/icSettings.png')} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.home_locationInfoStyle}>
            <View style={styles.home_locationDateTime}>
              <View style={styles.home_dateStyle}>
                <Text
                  style={styles.home_dateText}
                  allowFontScaling={false}
                >
                  {monthAndDay()}
                </Text>
              </View>
              <View style={styles.home_divider}/>
              <View style={styles.home_timeStyle}>
                <Text
                  style={styles.home_timeText}
                  allowFontScaling={false}
                >
                  {amPm}
                </Text>
                <Text style={styles.home_timeText}> </Text>
                <Text
                  style={styles.home_timeText}
                  allowFontScaling={false}
                >
                  {leadingZeros(date.getHours(), 2)}
                </Text>
                <Text
                  style={styles.home_timeText}
                  allowFontScaling={false}
                >
                  {':'}
                </Text>
                <Text
                  style={styles.home_timeText}
                  allowFontScaling={false}
                >
                  {leadingZeros(date.getMinutes(), 2)}
                </Text>
              </View>
            </View>
            <View style={styles.home_locationPlaceStyle}>
              <Text
                style={styles.home_locationPlaceTextStyle}
                allowFontScaling={false}
              >
                {addressName}
              </Text>
              <Image style={{ marginLeft: 4 }} source={require('../../Assets/img/icMap.png')} />
            </View>
            <View style={styles.home_tempAndHumidityStyle}>
              <Text
                style={styles.home_temp}
                allowFontScaling={false}
              >
                {publicAirInfo
                  ? tempMod
                    ? parseInt(publicAirInfo.Info.WeatherInfo.Temperature * 1.8 + 32)
                    : parseInt(publicAirInfo.Info.WeatherInfo.Temperature)
                  : '-'}
              </Text>
              <Text
                style={styles.home_tempMod}
                allowFontScaling={false}
              >
                {tempMod ? '°F' : '°C'}
              </Text>
              <Text
                style={styles.home_humidity}
                allowFontScaling={false}
              >
                {publicAirInfo ? publicAirInfo.Info.WeatherInfo.Humid : '-'}
              </Text>
              <Text
                style={styles.home_percent}
                allowFontScaling={false}
              >
                %
              </Text>
            </View>
          </View>
          <View style={styles.home_stateStyle}>
            <View style={styles.home_stateViewStyle}>
              <Text
                style={styles.home_pm25Style}
                allowFontScaling={false}
              >
                {strings.home_main_label_pm25}
              </Text>
              <View style={styles.home_pm25StateViewStyle}>
                <Text
                  style={[styles.home_pm25Layer, getPublicPm25TextColor(parseInt(publicPm25))]}
                  allowFontScaling={false}
                >
                  {parseInt(publicPm25)}
                </Text>
                <Text
                  style={styles.home_pm25StateUnit}
                  allowFontScaling={false}
                >
                  {strings.main_label_pm_unit}
                </Text>
              </View>
            </View>
            <View style={styles.home_stateViewStyle}>
              <Text
                style={styles.home_pm10Style}
                allowFontScaling={false}
              >
                {strings.main_label_pm10}
              </Text>
              <View style={styles.home_pm10StateViewStyle}>
                <Text
                  style={[styles.home_pm10Layer, getPublicPm10TextColor(parseInt(publicPm10))]}
                  allowFontScaling={false}
                >
                  {parseInt(publicPm10)}
                </Text>
                <Text
                  style={styles.home_pm10StateUnit}
                  allowFontScaling={false}
                >
                  {strings.main_label_pm_unit}
                </Text>
              </View>
            </View>
            <View style={styles.home_stateViewStyle}>
              <Text
                style={styles.home_ozoneStyle}
                allowFontScaling={false}
              >
                {strings.main_label_ozone}
              </Text>
              <View style={styles.home_ozoneViewStyle}>
                <Text
                  style={[styles.home_ozoneLayer, getPublicO3TextColor(publicO3)]}
                  allowFontScaling={false}
                >
                  {parseInt(publicO3)}
                </Text>
                <Text
                  style={styles.home_ozoneStateUnit}
                  allowFontScaling={false}
                >
                  {strings.main_label_ppb}
                </Text>
              </View>
            </View>
            <View style={styles.home_stateViewStyle}>
              <Text
                style={styles.home_pollenStyle}
                allowFontScaling={false}
              >
                {strings.main_label_pollen}
              </Text>
              <View style={styles.home_pollenViewStyle}>
                {publicPollenTree === null ? (
                  <Text style={styles.home_pollenText}>-</Text>
                ) : (
                  <Text
                    style={[styles.home_pollenLayer, getPublicPollenTreeTextColor(publicPollenTree)]}
                    allowFontScaling={false}
                  >
                    {publicPollenTree.toString()}
                  </Text>
                )}
                <Text
                  style={[styles.home_pollenStateUnit, { marginRight: 2 }]}
                  allowFontScaling={false}
                >
                  /
                </Text>
                {publicPollenWeed === null ? (
                  <Text style={styles.home_pollenText}>-</Text>
                ) : (
                  <Text
                    style={[styles.home_pollenLayer, getPublicPollenWeedTextColor(publicPollenWeed)]}
                    allowFontScaling={false}
                  >
                    {publicPollenWeed.toString()}
                  </Text>
                )}
                <Text
                  style={styles.home_pollenStateUnit}
                  allowFontScaling={false}
                >
                  {strings.main_label_index}
                </Text>
              </View>
            </View>
            <View style={styles.home_pollenView}>
              <TouchableOpacity onPress={() => setPollenEx(true)}>
                <Image source={require('../../Assets/img/icInformation.png')} />
              </TouchableOpacity>
            </View>
            <Modal isVisible={settingExplain} onBackdropPress={() => setSettingExplain(false)}>
              <View style={styles.home_modalContainer}>
                <View style={styles.home_modalCancel}>
                  <TouchableOpacity onPress={() => setSettingExplain(false)}>
                    <Image source={require('../../Assets/img/icCancel.png')} />
                  </TouchableOpacity>
                </View>
                <View style={styles.home_modalSubTextView}>
                  <Text style={styles.home_modalSubText_settings}>설정을 이용하시려면 Safe Home의 블루투스 연결을 종료 시킨 후 이용해주세요</Text>
                </View>
                <TouchableOpacity onPress={() => setSettingExplain(false)}>
                  <View style={[styles.home_modalButton, { width: width * 0.8 }]}>
                    <Text style={styles.home_modalButtonText}>{strings.main_popup_pollen_button_ok}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </Modal>
            <Modal isVisible={pollenExplain} onBackdropPress={() => setPollenEx(false)}>
              <View style={styles.home_modalContainer}>
                <View style={styles.home_modalCancel}>
                  <TouchableOpacity onPress={() => setPollenEx(false)}>
                    <Image source={require('../../Assets/img/icCancel.png')} />
                  </TouchableOpacity>
                </View>
                <View style={styles.home_modalHeaderTextView}>
                  <Text style={styles.home_modalHeaderText}>{strings.main_popup_pollen_title}</Text>
                </View>
                <View style={styles.home_modalSubTextView}>
                  <Text style={styles.home_modalSubText}>{strings.main_popup_pollen_contents_title}</Text>
                  <Text style={styles.home_modalSubText}></Text>
                  <Text style={[styles.home_modalSubText, { fontWeight: 'bold' }]}>{strings.main_popup_pollen_contents_text1}</Text>
                  <Text style={styles.home_modalSubText}>{strings.main_popup_pollen_contents_text2}</Text>
                  <Text style={styles.home_modalSubText}>{strings.main_popup_pollen_contents_text3}</Text>
                  <Text style={styles.home_modalSubText}>{strings.main_popup_pollen_contents_text4}</Text>
                  <Text style={styles.home_modalSubText}>{strings.main_popup_pollen_contents_text5}</Text>
                </View>
                <TouchableOpacity onPress={() => setPollenEx(false)}>
                  <View style={[styles.home_modalButton, { width: width * 0.8 }]}>
                    <Text style={styles.home_modalButtonText}>{strings.main_popup_pollen_button_ok}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </Modal>
            <Modal isVisible={bleErrorExplain} onBackdropPress={() => navigation.navigate('RealTime')}>
              <View style={styles.home_modalContainer}>
                <View style={styles.home_modalCancel}>
                  <TouchableOpacity onPress={() => setPollenEx(false)}>
                    <Image source={require('../../Assets/img/icCancel.png')} />
                  </TouchableOpacity>
                </View>
                <View style={styles.home_modalHeaderTextView}>
                  <Text style={styles.home_modalHeaderText}>BLE 연결 에러</Text>
                </View>
                <View style={styles.home_modalSubTextView}>
                  <Text style={styles.home_modalSubText}>휴대폰과 센서의 BLE연결이 끊겼습니다.</Text>
                  <Text style={styles.home_modalSubText}>연결을 다시 시도해주세요.</Text>
                  {/* <Text style={styles.home_modalSubText}></Text>
                  <Text style={[styles.home_modalSubText, { fontWeight: 'bold' }]}>{strings.main_popup_pollen_contents_text1}</Text>
                  <Text style={styles.home_modalSubText}>{strings.main_popup_pollen_contents_text2}</Text>
                  <Text style={styles.home_modalSubText}>{strings.main_popup_pollen_contents_text3}</Text>
                  <Text style={styles.home_modalSubText}>{strings.main_popup_pollen_contents_text4}</Text>
                  <Text style={styles.home_modalSubText}>{strings.main_popup_pollen_contents_text5}</Text> */}
                </View>
                <TouchableOpacity onPress={() =>  navigation.navigate('RealTime')}>
                  <View style={[styles.home_modalButton, { width: width * 0.8 }]}>
                    <Text style={styles.home_modalButtonText}>{strings.main_popup_pollen_button_ok}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </Modal>



          </View>

          {isLoading?(
          <View style={styles.home_viewBox}>
                        <TouchableOpacity onPress={() => navigation.navigate('RealTime')} style = {{height:23, width:70, marginLeft:width*0.02,borderRadius:5,backgroundColor:colors.coral, justifyContent:'center', alignItems:'center', alignSelf:'flex-end',marginBottom:7,}}>
              <Text style={{color:'white', fontSize:10}}>연결 종료하기</Text></TouchableOpacity>
            <View style={styles.home_viewBox2}>
            <View style={{flexDirection:'row'}}>
            <Text style = {{fontSize:15, fontFamily:'NotoSans-Regular', fontWeight:'bold',marginTop:10, marginBottom:6, color: '#444444'}}>Safe Home Connected</Text>
            {/* <TouchableOpacity onPress={() => navigation.navigate('RealTime')} style = {{height:30, width:70, marginLeft:width*0.02,borderRadius:5,backgroundColor:colors.coral, justifyContent:'center', alignItems:'center', alignSelf:'flex-end',marginBottom:7,}}>
              <Text style={{color:'white', fontSize:10}}>연결 종료하기</Text></TouchableOpacity> */}
            </View>
                <View style={styles.home_scan_box}>
                  <View style={styles.home_scan_stateBox}>
                    <View style={[styles.home_scan_bgStateBar, { backgroundColor: getPm25Color(pm25) }]}></View>
                    <Image style={styles.home_scan_icPm25} source={getPm25Picture(pm25)} />
                    <Text style={[styles.home_scan_pm25, { color: getPm25Color(pm25) }]}>{strings.scan_label_pm25}</Text>
                    <View style={styles.home_scan_pm25ValueView}>               
                      <Text Text style={[styles.home_scan_pm25Value, { color: getPm25Color(pm25) }]}>{parseInt(pm25)}</Text>
                    </View>
                    <Text style={[styles.home_scan_pm25m3, { color: getPm25Color(pm25) }]}>μg/m³</Text>  
                  </View>
                </View>

                <View style={styles.home_scan_box}>
                  <View style={styles.home_scan_stateBox}>
                    <View style={[styles.home_scan_bgStateBar, { backgroundColor: getPm10Color(pm10) }]}></View>
                    <Image style={styles.home_scan_icPm10} source={getPm10Picture(pm10)} />
                    <Text style={[styles.home_scan_pm10, { color: getPm10Color(pm10) }]}>{strings.scan_label_pm10}</Text>  
                    <View style={styles.home_scan_pm10ValueView}>         
                      <Text style={[styles.home_scan_pm10Value, { color: getPm10Color(pm10) }]}>{parseInt(pm10)}</Text>
                    </View> 
                    <Text style={[styles.home_scan_pm10m3, { color: getPm10Color(pm10) }]}>μg/m³</Text>  
                  </View>
                </View>
                <View style={styles.home_scan_box}>
                  <View style={styles.home_scan_stateBox}>
                    <View style={[styles.home_scan_bgStateBar, { backgroundColor: getTemperatureColor(temp) }]}></View>
                    <Image style={styles.home_scan_icTemp} source={getTemperaturePicture(temp)} />
                    <Text style={[styles.home_scan_temperature, { color: getTemperatureColor(temp) }]}>{strings.scan_label_temperature}</Text>
                    <View style={styles.home_scan_tempValueView}>
                      <Text style={[styles.home_scan_temperatureValue, { color: getTemperatureColor(temp) }]}>{tempMod ? parseInt(temp*1.8 +32) : parseInt(temp)}</Text>
                    </View>
                    <Text style={[styles.home_scan_temperatureC, { color: getTemperatureColor(temp) }]}>{tempMod ? '°F' : '°C'}</Text>  
                  </View>
                </View>
                <View style={styles.home_scan_box}>
                  <View style={styles.home_scan_stateBox}>
                    <View style={[styles.home_scan_bgStateBar, { backgroundColor: getHumidColor(humd) }]}></View>
                    <Image style={styles.home_scan_icHumdi} source={getHumidPicture(humd)} />
                    <Text style={[styles.home_scan_humidity, { color: getHumidColor(humd) }]}>{strings.scan_label_humidity}</Text>
                    <View style={styles.home_scan_humdiValueView}>
                      <Text style={[styles.home_scan_humidityValue, { color: getHumidColor(humd) }]}>{parseInt(humd)}</Text>
                    </View>
                    <Text style={[styles.home_scan_humidityPercent, { color: getHumidColor(humd) }]}>%</Text>
                  </View>
                </View>
                <View style={styles.home_scan_box}>
                  <View style={styles.home_scan_stateBox}>
                    <View style={[styles.home_scan_bgStateBar, { backgroundColor: getTvocColor(vocs) }]}></View>
                    <Image style={styles.home_scan_icVoc} source={getTvocPicture(vocs)} />
                    <Text style={[styles.home_scan_Voc, { color: getTvocColor(vocs) }]}>{strings.scan_label_vocs}</Text>
                    <View style={styles.home_scan_vocValueView}>
                      <Text style={[styles.home_scan_VocValue, { color: getTvocColor(vocs) }]}>{parseInt(vocs)}</Text>
                    </View>
                    <Text style={[styles.home_scan_Vocppb, { color: getTvocColor(vocs) }]}>ppb</Text>
                  </View>
                </View>
                <View style={styles.home_scan_box}>
                  <View style={styles.home_scan_stateBox}>
                    <View style={[styles.home_scan_bgStateBar, { backgroundColor: getCo2Color(co2) }]}></View>
                    <Image style={styles.home_scan_icCO2} source={getCo2Picture(co2)} />
                    <Text style={[styles.home_scan_CO2, { color: getCo2Color(co2) }]}>{strings.scan_label_co2}</Text>
                    <View style={styles.home_scan_co2ValueView}>
                      <Text style={[styles.home_scan_CO2Value, { color: getCo2Color(co2) }]}>{parseInt(co2)}</Text>
                    </View>
                    <Text style={[styles.home_scan_CO2ppm, { color: getCo2Color(co2) }]}>ppm</Text>
                  </View>
                </View>

                <View style={styles.home_scan_box}>
                  <View style={styles.home_scan_stateBox}>
                    <View style={[styles.home_scan_bgStateBar, { backgroundColor: getCoColor(co) }]}></View>
                    <Image style={styles.home_scan_icC0} source={getCoPicture(co)} />
                    <Text style={[styles.home_scan_CO, { color: getCoColor(co) }]}>일산화탄소</Text>
                    <View style={styles.home_scan_coValueView}>
                      <Text style={[styles.home_scan_COValue, { color: getCoColor(co) }]}>{parseInt(co)}</Text>
                    </View>
                    <Text style={[styles.home_scan_COppm, { color: getCoColor(co) }]}>ppm</Text>
                  </View>
                </View>

                <View style={styles.home_scan_box_last}>
                  <View style={styles.home_scan_stateBox}>
                    <View style={[styles.home_scan_bgStateBar, { backgroundColor: getCh4Color(ch4) }]}></View>
                    <Image style={styles.home_scan_icCH4} source={getCh4Picture(ch4)} />
                    <Text style={[styles.home_scan_CH4, { color: getCh4Color(ch4) }]}>메테인</Text>
                    <View style={styles.home_scan_ch4ValueView}>
                      <Text style={[styles.home_scan_CH4Value, { color: getCh4Color(ch4) }]}>{parseInt(ch4)}</Text>
                    </View>
                    <Text style={[styles.home_scan_CH4ppm, { color: getCh4Color(ch4) }]}>ppb</Text>
                  </View>
                </View>
                {/* <View>
                  <Text style={{fontSize:15, marginTop:height*0.15}}>아래의 + 버튼을 눌러 Sai Home을 연결해주세요.</Text>
                </View>
                <View>
                  <TouchableOpacity style = {{height:70, width:70, borderRadius:100, backgroundColor:colors.azure, justifyContent:'center', alignItems:'center',marginBottom:7,marginTop:height*0.08}}>
                  <Text style={{fontSize:40,color:'white'}}>+</Text></TouchableOpacity>
                </View> */}
            </View>
          </View>
          ):(
            <View style={styles.indicator}>
              <ActivityIndicator size="large" color={colors.azure} />
            </View>
          )}
          
      </View>
    </View>
  );
};

// const locale = NativeModules.I18nManager.localeIdentifier;
// const { width, height } = Dimensions.get('window');

const { width, height } = Dimensions.get('window');
const imageWidth = width * 0.9;
const imageHeight = height * 0.62;
const addWidth = 35;
const addHeight = 35;

const locale = NativeModules.I18nManager.localeIdentifier;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.veryLightPink,
  },
  indicator: {
    width: width,
    height: height*0.6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  backButton: { position: 'absolute', width: width * 0.9, top: height * 0.055, left: width * 0.04 },
 
  box_pm25: {
    width: width * 0.9,
    height: height * 0.09,
    marginTop: height * 0.05,
    marginBottom: height * 0.01,
    marginRight: height * 0.01,
    marginLeft: height * 0.01,
    borderRadius: 4,
    backgroundColor: colors.white,
  },

  box: {
    width: width * 0.9,
    height: height * 0.09,
    margin: height * 0.01,
    borderRadius: 4,
    backgroundColor: colors.white,
  },
  stateBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bgStateBar: {
    width: 12,
    height: height * 0.09,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    backgroundColor: colors.veryLightPink,
  },
  icPm25: {
    marginLeft: width * 0.05,
  },
  pm25: {
    marginLeft: width * 0.025,
    fontFamily: 'NotoSans-Bold',
    fontSize: 13,
    color: colors.veryLightPink,
  },
  pm25ValueView: {
    position: 'absolute',
    marginLeft: width * 0.5,
    width: width * 0.25,
  },
  pm25Value: {
    textAlign: 'right',
    fontFamily: 'godoRounded R',
    fontSize: 35,
    lineHeight: 45,
    bottom: 5,
    color: colors.veryLightPink,
  },
  pm25m3: {
    position: 'absolute',
    marginLeft: width * 0.77,
    textAlign: 'center',
    fontFamily: 'NotoSans-Regular',
    fontSize: 12,
    color: colors.veryLightPink,
  },
  icPm10: {
    marginLeft: width * 0.05,
  },
  pm10: {
    marginLeft: width * 0.025,
    fontFamily: 'NotoSans-Bold',
    fontSize: 13,
    color: colors.azure,
  },
  pm10ValueView: {
    position: 'absolute',
    marginLeft: width * 0.5,
    width: width * 0.25,
  },
  pm10Value: {
    textAlign: 'right',
    fontFamily: 'godoRounded R',
    fontSize: 35,
    lineHeight: 45,
    bottom: 5,
    color: colors.azure,
  },
  pm10m3: {
    position: 'absolute',
    marginLeft: width * 0.77,
    textAlign: 'center',
    fontFamily: 'NotoSans-Regular',
    fontSize: 12,
    color: colors.azure,
  },
  icTemp: {
    marginLeft: width * 0.05,
  },
  temperature: {
    marginLeft: width * 0.025,
    fontFamily: 'NotoSans-Bold',
    fontSize: 13,
    color: colors.azure,
  },
  tempValueView: {
    position: 'absolute',
    marginLeft: width * 0.5,
    width: width * 0.25,
  },
  temperatureValue: {
    textAlign: 'right',
    fontFamily: 'godoRounded R',
    fontSize: 35,
    lineHeight: 45,
    bottom: 5,
    color: colors.azure,
  },
  temperatureC: {
    position: 'absolute',
    marginLeft: width * 0.77,
    textAlign: 'center',
    fontFamily: 'NotoSans-Regular',
    fontSize: 12,
    color: colors.azure,
  },
  icHumdi: {
    marginLeft: width * 0.05,
  },
  humidity: {
    marginLeft: width * 0.025,
    fontFamily: 'NotoSans-Bold',
    fontSize: 13,
    color: colors.azure,
  },
  humdiValueView: {
    position: 'absolute',
    marginLeft: width * 0.5,
    width: width * 0.25,
  },
  humidityValue: {
    textAlign: 'right',
    fontFamily: 'godoRounded R',
    fontSize: 35,
    lineHeight: 45,
    bottom: 5,
    color: colors.azure,
  },
  humidityPercent: {
    position: 'absolute',
    marginLeft: width * 0.77,
    textAlign: 'center',
    fontFamily: 'NotoSans-Regular',
    fontSize: 12,
    color: colors.azure,
  },
  icVoc: {
    marginLeft: width * 0.05,
  },
  Voc: {
    marginLeft: width * 0.025,
    fontFamily: 'NotoSans-Bold',
    fontSize: 13,
    color: colors.coral,
  },
  vocValueView: {
    position: 'absolute',
    marginLeft: width * 0.5,
    width: width * 0.25,
  },
  VocValue: {
    textAlign: 'right',
    fontFamily: 'godoRounded R',
    fontSize: 35,
    lineHeight: 45,
    bottom: 5,
    color: colors.coral,
  },
  Vocppb: {
    position: 'absolute',
    marginLeft: width * 0.77,
    textAlign: 'center',
    fontFamily: 'NotoSans-Regular',
    fontSize: 12,
    color: colors.coral,
  },
  icCO2: {
    marginLeft: width * 0.05,
  },
  CO2: {
    marginLeft: width * 0.025,
    fontFamily: 'NotoSans-Bold',
    fontSize: 13,
    color: colors.lightOrange,
  },
  co2ValueView: {
    position: 'absolute',
    marginLeft: width * 0.5,
    width: width * 0.25,
  },
  CO2Value: {
    textAlignVertical: "center",
    textAlign: 'right',
    fontFamily: 'godoRounded R',
    fontSize: 35,
    lineHeight: 45,
    bottom: 5,
    color: colors.lightOrange,
  },
  CO2ppm: {
    position: 'absolute',
    marginLeft: width * 0.77,
    textAlign: 'center',
    fontFamily: 'NotoSans-Regular',
    fontSize: 12,
    color: colors.lightOrange,
  },

  home_container: {
    height: height,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  home_linearGradientStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 210,
  },
  home_linearFldPosition: {
    position: 'absolute',
    top: 0,
  },
  home_tutorialContainer: {
    width: width,
    height: height,
  },
  home_headerStyle: {
    width: width,
    marginTop: height * 0.0316,
    alignItems: 'center',
  },
  home_headerViewStyle: {
    flexDirection: 'row',
    width: width,
    margin: width * 0.05,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  home_icApps: {
    marginLeft: width * 0.05,
    marginRight: width * 0.0156,
  },
  home_icComments: { marginLeft: width * 0.0156 },
  home_icSettings: { marginRight: width * 0.05 },
  home_locationInfoStyle: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  home_locationDateTime: {
    width: width,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  home_dateStyle: { position: 'absolute', left: width * 0.36 },
  home_dateText: {
    textAlign: 'center',
    fontFamily: 'NotoSans-Regular',
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.brownishGrey,
  },
  home_divider: {
    position: 'absolute',
    width: 1.5,
    height: 10,
    backgroundColor: colors.brownGrey,
  },
  home_timeStyle: { position: 'absolute', flexDirection: 'row', right: width * 0.343 },
  home_timeText: {
    textAlign: 'center',
    fontFamily: 'NotoSans-Regular',
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.brownishGrey,
  },
  home_locationPlaceStyle: { width: width * 0.8, flexDirection: 'row', justifyContent: 'center' },
  home_locationPlaceTextStyle: {
    textAlign: 'center',
    fontFamily: 'NotoSans-Bold',
    fontSize: 15,
    color: colors.marineBlue,
  },
  home_tempAndHumidityStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  home_temp: {
    fontFamily: 'NotoSans-Bold',
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.blueGrey,
  },
  home_tempMod: {
    marginTop: 4,
    marginRight: 4,
    fontFamily: 'NotoSans-Regular',
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.blueGrey,
  },
  home_humidity: {
    marginLeft: 4,
    fontFamily: 'NotoSans-Bold',
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.blueGrey,
  },
  home_percent: {
    marginTop: 4,
    marginLeft: 2,
    fontFamily: 'NotoSans-Regular',
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.blueGrey,
  },
  home_stateStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  home_stateViewStyle: {
    height: width * 0.156,
    margin: width * 0.0312,
    alignItems: 'center',
    flexDirection: 'column',
  },
  home_pm25Style: {
    textAlign: 'center',
    fontFamily: 'NotoSans-Regular',
    fontSize: 13.75,
    marginBottom: 3,
    color: colors.blueGrey,
  },
  home_pm25StateViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  home_pm25Layer: {
    fontFamily: 'godoRounded R',
    fontSize: 32,
    lineHeight: 35,
  },
  home_pm25StateUnit: {
    marginLeft: 2,
    marginTop: 7,
    fontFamily: 'NotoSans-Regular',
    fontSize: 10,
    color: colors.blueGrey,
  },
  home_pm10Style: {
    textAlign: 'center',
    fontFamily: 'NotoSans-Regular',
    fontSize: 13.75,
    marginBottom: 3,
    color: colors.blueGrey,
  },
  home_pm10StateViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  home_pm10Layer: {
    fontFamily: 'godoRounded R',
    fontSize: 32,
    lineHeight: 35,
  },
  home_pm10StateUnit: {
    marginLeft: 2,
    marginTop: 7,
    fontFamily: 'NotoSans-Regular',
    fontSize: 10,
    color: colors.blueGrey,
  },
  home_ozoneStyle: {
    textAlign: 'center',
    fontFamily: 'NotoSans-Regular',
    fontSize: 13.75,
    marginBottom: 3,
    color: colors.blueGrey,
  },
  home_ozoneViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  home_ozoneLayer: {
    fontFamily: 'godoRounded R',
    fontSize: 32,
    lineHeight: 35,
  },
  home_ozoneStateUnit: {
    marginLeft: 2,
    marginTop: 7,
    fontFamily: 'NotoSans-Regular',
    fontSize: 10,
    color: colors.blueGrey,
  },
  home_pollenStyle: {
    textAlign: 'center',
    fontFamily: 'NotoSans-Regular',
    fontSize: 13.75,
    marginBottom: 3,
    color: colors.blueGrey,
  },
  home_pollenViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  home_pollenText: {
    fontFamily: 'NotoSans-Bold',
    marginTop: 10,
    color: colors.blueGrey,
  },
  home_pollenLayer: {
    fontFamily: 'godoRounded R',
    fontSize: 32,
    lineHeight: 35,
  },
  home_pollenStateUnit: {
    marginLeft: 2,
    marginTop: 7,
    fontFamily: 'NotoSans-Regular',
    fontSize: 10,
    color: colors.blueGrey,
  },
  home_pollenView: {
    position: 'absolute',
    right: 5,
    top: 0,
  },
  home_viewBox: {
    width: width * 0.9,
    height: height*0.67,
    alignItems: 'center',
  },
  home_viewBox2: {
    width: width * 0.9,
    height: height*0.68,
    alignItems: 'center',
    backgroundColor : '#EDEDED',
    //marginTop: 10,
    borderRadius: 10,
    // flexDirection: "column",
    //justifyContent: 'center',
  },

  home_viewBox3: {
    width: width * 0.8,
    height: width * 0.13,
    backgroundColor : '#FFFFFF',
    marginTop: 10,
    marginBottom: 100,
    borderRadius: 10,
   flexDirection: 'row'
  
  },

  home_viewBox4: {
    width: width * 0.8,
    height: width * 0.13,
    backgroundColor : '#FFFFFF',
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 10,
  },

  home_edgeBox: {
    flex:0.5,
    width: width * 0.1,
    // alignSelf:'flex-start',
    // flexDirection: 'row',
    // justifyContent: 'flex-start',
    backgroundColor : 'red',
    borderTopLeftRadius :10,
    borderBottomLeftRadius:15,
    marginRight:10
  },

  home_pm25_string: {
    // padding: '10',
    fontFamily: 'godoRounded R',
    fontSize: 13,
    lineHeight: 35,
    textAlignVertical: 'center',
  },

  home_pm25Box1: {
    flex:4,
    backgroundColor:'pink',
    flexDirection:'row'
  },

  home_pm25Box2: {
    flex:4,
    backgroundColor:'yellow',
    flexDirection:'row'
  },

  home_pm25Box3: {
    flex:1,
    // padding: '10',
    fontFamily: 'godoRounded R',
    fontSize: 32,
    lineHeight: 35,
    textAlignVertical: 'center',
  },

  home_picoHomeContainer: {
    marginTop: height * 0.05281,
  },
  home_swipeContainer: { width: width, alignItems: 'center' },
  home_picoHomeImageStyle: {
    flexDirection: 'column',
    width: imageWidth,
    height: imageHeight,
    marginTop: height * 0.06,
    borderRadius: 15,
    backgroundColor: colors.white,
  },
  home_picoOff: { width: 72, height: 72 },
  home_picoInfo: {
    marginTop: 30,
  },
  home_picoOffText: {
    color: colors.azure,
    textAlign: 'center',
    fontFamily: 'NotoSans-Regular',
    fontSize: 30,
  },
  home_picoDeviceSetting: {
    position: 'absolute',
    top: 80,
    right: 5,
  },
  home_picoName: {
    textAlign: 'center',
    fontFamily: 'NotoSans-Regular',
    fontSize: 10,
    color: colors.white,
  },
  home_picoPlace: {
    textAlign: 'center',
    fontFamily: 'NotoSans-Bold',
    fontSize: 13,
    color: colors.white,
  },
  home_picoHomeState: {
    textAlign: 'center',
    fontFamily: 'NotoSans-Regular',
    fontSize: 30,
    textShadowColor: 'rgba(27, 142, 255, 0.58)',
    textShadowOffset: {
      width: 0,
      height: 1,
    },
    textShadowRadius: 4,
    color: colors.white,
  },
  home_picoTempAndHumdi: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  home_picoTemp: {
    fontFamily: 'NotoSans-Regular',
    fontSize: 12,
    color: colors.white,
  },
  home_picoTempUnit: {
    marginTop: 2,
    fontFamily: 'NotoSans-Regular',
    fontSize: 10,
    color: colors.white,
  },
  home_picoHumdi: {
    fontFamily: 'NotoSans-Regular',
    fontSize: 12,
    color: colors.white,
  },
  home_picoHumdiUnit: {
    marginTop: 2,
    fontFamily: 'NotoSans-Regular',
    fontSize: 10,
    color: colors.white,
  },
  home_picoStateInfo: {
    flexDirection: 'row',
    width: imageWidth,
    justifyContent: 'center',
  },
  home_picoOffInfo: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 5,
  },
  home_picoOffInfoText: {
    color: colors.azure,
    fontFamily: 'NotoSans-Regular',
    fontSize: 15,
    fontWeight: 'normal',
    fontStyle: 'normal',
    textAlign: 'center',
  },
  home_picoStatePm25Style: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  home_picoStatePm25Text: {
    fontFamily: 'NotoSans-Regular',
    fontSize: 12,
    color: colors.white,
  },
  home_picoStatePm25: {
    fontFamily: 'godoRounded R',
    fontSize: 32,
    lineHeight: 35,
    marginTop: 5,
    color: colors.white,
  },
  home_picoStatePm25Unit: {
    fontFamily: 'NotoSans-Regular',
    fontSize: 10,
    color: colors.white,
  },
  home_picoStatePm10Style: {
    flexDirection: 'column',
    marginLeft: width * 0.015,
    alignItems: 'center',
  },
  home_picoStatePm10Text: {
    fontFamily: 'NotoSans-Regular',
    fontSize: 12,
    color: colors.white,
  },
  home_picoStatePm10: {
    fontFamily: 'godoRounded R',
    fontSize: 32,
    lineHeight: 35,
    marginTop: 5,
    color: colors.white,
  },
  home_picoStatePm10Unit: {
    fontFamily: 'NotoSans-Regular',
    fontSize: 10,
    color: colors.white,
  },
  home_picoStateVOCStyle: {
    flexDirection: 'column',
    marginLeft: width * 0.015,
    alignItems: 'center',
  },
  home_picoStateVOCText: {
    fontFamily: 'NotoSans-Regular',
    fontSize: 12,
    textAlign: 'center',
    color: colors.white,
  },
  home_picoStateVOC: {
    fontFamily: 'godoRounded R',
    fontSize: 32,
    lineHeight: 35,
    marginTop: 5,
    color: colors.white,
  },
  home_picoStateVOCUnit: {
    fontFamily: 'NotoSans-Regular',
    fontSize: 10,
    color: colors.white,
  },
  home_picoStateCO2Style: {
    flexDirection: 'column',
    marginLeft: width * 0.015,
    alignItems: 'center',
  },
  home_picoStateCO2Text: {
    fontFamily: 'NotoSans-Regular',
    fontSize: 12,
    color: colors.white,
  },
  home_picoStateCO2: {
    fontFamily: 'godoRounded R',
    fontSize: 32,
    lineHeight: 35,
    marginTop: 5,
    color: colors.white,
  },
  home_picoStateCO2Unit: {
    fontFamily: 'NotoSans-Regular',
    fontSize: 10,
    color: colors.white,
  },
  home_connectPico: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  home_connectPico2: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  home_connectPicoPlus: {
    width: addWidth,
    height: addHeight,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 10,
    backgroundColor: colors.marineBlue,
  },
  home_connectPicoPlus2: {
    width: addWidth,
    height: addHeight,
    borderTopLeftRadius: 50,
    borderBottomRightRadius: 10,
    backgroundColor: colors.marineBlue,
  },
  home_whiteBox: {
    width: width * 0.96,
    height: width * 1.0,
    alignItems: 'center',
  },

  
  home_stateBox: {
    position: 'absolute',
    top: 22,
    width: width * 0.77,
    height: width * 0.81,
    alignItems: 'center',
  },
  home_icAdd: {
    position: 'absolute',
    top: addHeight * 0.28,
    left: addWidth * 0.15,
  },
  home_swiperBox: {
    width: width * 0.85,

    alignItems: 'center',
    justifyContent: 'center',
  },
  home_indicator: {
    height: height * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  home_modalContainer: {
    width: width * 0.9,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: colors.white,
  },
  home_modalCancel: { position: 'absolute', top: 12, right: 12 },
  home_modalHeaderTextView: {
    width: width * 0.9,
    alignItems: 'center',
  },
  home_modalHeaderText: { fontSize: 22, fontFamily: 'NotoSans-Bold' },
  home_modalSubTextView: {
    width: width * 0.75,
    marginTop: height * 0.0281,
  },
  home_modalSubText: {
    textAlign: 'center',
    fontFamily: 'NotoSans-Regular',
    fontSize: 14,
    color: colors.brownGrey,
  },
  home_modalSubText_settings: {
    textAlign: 'center',
    fontFamily: 'NotoSans-Regular',
    fontSize: 14,
  },
  home_modalSubTextNotCenter: {
    fontFamily: 'NotoSans-Regular',
    fontSize: 13,
    color: colors.brownGrey,
  },
  home_modalButton: {
    width: width * 0.3875,
    height: height * 0.0704,
    marginTop: height * 0.0423,
    marginHorizontal: 4,
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
  home_modalButtonText: {
    fontSize: 14,
    fontFamily: 'NotoSans-Bold',
    color: colors.white,
  },
  home_scan_box: {
    width: width * 0.8,
    height: height * 0.065,
    margin: height * 0.004,
    borderRadius: 4,
    backgroundColor: colors.white,
  },

  home_scan_box_last: {
    width: width * 0.8,
    height: height * 0.065,
    margin: height * 0.005,
    marginBottom: height * 0.015,
    borderRadius: 4,
    backgroundColor: colors.white,
  },

  home_scan_stateBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  home_scan_bgStateBar: {
    width: 12,
    height: height * 0.065,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    backgroundColor: colors.veryLightPink,
  },

  home_scan_icPm25: {
    marginLeft: width * 0.05,
  },
  home_scan_pm25: {
    marginLeft: width * 0.025,
    fontFamily: 'NotoSans-Bold',
    fontSize: 13,
    color: colors.veryLightPink,
  },

  home_scan_pm25ValueView: {
    position: 'absolute',
    marginLeft: width * 0.44,
    width: width * 0.25,
  },
  home_scan_pm25Value: {
    textAlignVertical:'center',
    textAlign:'right',
    fontFamily:'godoRounded R',
    fontSize: 20,
    lineHeight:45,
    bottom:3,
    alignItems: 'center'
  },
  home_scan_pm25m3: {
    position: 'absolute',
    marginLeft: width * 0.7,
    textAlign: 'center',
    fontFamily: 'NotoSans-Regular',
    fontSize: 9,
    color: colors.veryLightPink,
    alignItems: 'center'
  },
  home_scan_icPm10: {
    marginLeft: width * 0.05,
  },
  home_scan_pm10: {
    marginLeft: width * 0.025,
    fontFamily: 'NotoSans-Bold',
    fontSize: 13,
    color: colors.azure,
  },
  home_scan_pm10ValueView: {
    position: 'absolute',
    marginLeft: width * 0.44,
    width: width * 0.25,
  },
  home_scan_pm10Value: {
    textAlignVertical:'center',
    textAlign:'right',
    fontFamily:'godoRounded R',
    fontSize: 20,
    lineHeight:45,
    bottom:3,
    color: colors.azure,
  },
  home_scan_pm10m3: {
    position: 'absolute',
    marginLeft: width * 0.7,
    textAlign: 'center',
    fontFamily: 'NotoSans-Regular',
    fontSize: 9,
    color: colors.veryLightPink,

  },
  home_scan_icTemp: {
    marginLeft: width * 0.05,
  },
  home_scan_temperature: {
    marginLeft: width * 0.025,
    fontFamily: 'NotoSans-Bold',
    fontSize: 13,
    color: colors.azure,
  },
  home_scan_tempValueView: {
    position: 'absolute',
    marginLeft: width * 0.44,
    width: width * 0.25,
  },
  home_scan_temperatureValue: {
    textAlignVertical:'center',
    textAlign:'right',
    fontFamily:'godoRounded R',
    fontSize: 20,
    lineHeight:45,
    bottom:3,
    color: colors.azure,
  },
  home_scan_temperatureC: {
    position: 'absolute',
    marginLeft: width * 0.7,
    textAlign: 'center',
    fontFamily: 'NotoSans-Regular',
    fontSize: 9,
    color: colors.azure,
  },
  home_scan_icHumdi: {
    marginLeft: width * 0.05,
  },
  home_scan_humidity: {
    marginLeft: width * 0.025,
    fontFamily: 'NotoSans-Bold',
    fontSize: 13,
    color: colors.azure,
  },
  home_scan_humdiValueView: {
    position: 'absolute',
    marginLeft: width * 0.44,
    width: width * 0.25,
  },
  home_scan_humidityValue: {
    textAlignVertical:'center',
    textAlign:'right',
    fontFamily:'godoRounded R',
    fontSize: 20,
    lineHeight:45,
    bottom:3,
    color: colors.azure,
  },

  home_scan_humidityPercent: {
    position: 'absolute',
    marginLeft: width * 0.7,
    textAlign: 'center',
    fontFamily: 'NotoSans-Regular',
    fontSize: 9,
    color: colors.azure,
  },
  home_scan_icVoc: {
    marginLeft: width * 0.05,
  },
  home_scan_Voc: {
    marginLeft: width * 0.025,
    fontFamily: 'NotoSans-Bold',
    fontSize: 13,
    color: colors.coral,
  },
  home_scan_vocValueView: {
    position: 'absolute',
    marginLeft: width * 0.44,
    width: width * 0.25,
  },
  home_scan_VocValue: {
    textAlignVertical:'center',
    textAlign:'right',
    fontFamily:'godoRounded R',
    fontSize: 20,
    lineHeight:45,
    bottom:3,
    color: colors.coral,
  },
  home_scan_Vocppb: {
    position: 'absolute',
    marginLeft: width * 0.7,
    textAlign: 'center',
    fontFamily: 'NotoSans-Regular',
    fontSize: 9,
    color: colors.coral,
  },
  home_scan_icCO2: {
    marginLeft: width * 0.05,
  },
  home_scan_CO2: {
    marginLeft: width * 0.025,
    fontFamily: 'NotoSans-Bold',
    fontSize: 13,
    color: colors.lightOrange,
  },
  home_scan_co2ValueView: {
    position: 'absolute',
    marginLeft: width * 0.44,
    width: width * 0.25,
  },
  home_scan_CO2Value: {
    // marginLeft: width * 0.62,
    // position: 'absolute',
    // fontFamily: 'godoRounded R',
    // textAlign: 'center',
    // fontSize: 22,
    // color: colors.lightOrange,
    textAlignVertical:'center',
    textAlign:'right',
    fontFamily:'godoRounded R',
    fontSize: 20,
    lineHeight:45,
    bottom:3,
    color: colors.lightOrange,
  },
  home_scan_CO2ppm: {
    position: 'absolute',
    marginLeft: width * 0.7,
    textAlign: 'center',
    fontFamily: 'NotoSans-Regular',
    fontSize: 9,
    color: colors.lightOrange,
  },

  home_scan_icCO: {
    marginLeft: width * 0.05,
  },
  home_scan_CO: {
    marginLeft: width * 0.025,
    fontFamily: 'NotoSans-Bold',
    fontSize: 13,
    color: colors.lightOrange,
  },
  home_scan_coValueView: {
    position: 'absolute',
    marginLeft: width * 0.44,
    width: width * 0.25,
  },
  home_scan_COValue: {
    // marginLeft: width * 0.62,
    // position: 'absolute',
    // fontFamily: 'godoRounded R',
    // textAlign: 'center',
    // fontSize: 22,
    // color: colors.lightOrange,
    textAlignVertical:'center',
    textAlign:'right',
    fontFamily:'godoRounded R',
    fontSize: 20,
    lineHeight:45,
    bottom:3,
    color: colors.lightOrange,
  },
  home_scan_COppm: {
    position: 'absolute',
    marginLeft: width * 0.7,
    textAlign: 'center',
    fontFamily: 'NotoSans-Regular',
    fontSize: 9,
    color: colors.lightOrange,
  },

  home_scan_icCH4: {
    marginLeft: width * 0.05,
  },
  home_scan_CH4: {
    marginLeft: width * 0.025,
    fontFamily: 'NotoSans-Bold',
    fontSize: 13,
    color: colors.lightOrange,
  },
  home_scan_ch4ValueView: {
    position: 'absolute',
    marginLeft: width * 0.44,
    width: width * 0.25,
  },
  home_scan_CH4Value: {
    textAlignVertical:'center',
    textAlign:'right',
    fontFamily:'godoRounded R',
    fontSize: 20,
    lineHeight:45,
    bottom:3,
    color: colors.lightOrange,
  },
  home_scan_CH4ppm: {
    position: 'absolute',
    marginLeft: width * 0.7,
    textAlign: 'center',
    fontFamily: 'NotoSans-Regular',
    fontSize: 9,
    color: colors.lightOrange,
  },
});
