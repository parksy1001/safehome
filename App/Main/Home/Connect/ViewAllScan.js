import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import {
  DeviceAndAirInfoContext,
  SettingContext,
  SnapShotAndCountContext,
  UserContext,
  DeviceContext,
  LanguageContext,
  OnlineContext,
} from '../../../context';
import Modal from 'react-native-modal';
import colors from '../../../src/colors';
import cal from '../../../src/calculate';
import cnt from '../../../src/constant';
import { Pm25Explain } from '../../../component/Explain/Pm25Explain';
import { Pm10Explain } from '../../../component/Explain/Pm10Explain';
import { VOCsExplain } from '../../../component/Explain/VOCsExplain';
import { CO2Explain } from '../../../component/Explain/CO2Explain';
import { COExplain } from '../../../component/Explain/COExplain';
import { CH4Explain } from '../../../component/Explain/CH4Explain';


export const ViewAllScan = ({ navigation }) => {
  const { getDeviceState } = useContext(SettingContext);
  const strings = useContext(LanguageContext);
  const isOnline = useContext(OnlineContext);
  const userInfo = useContext(UserContext);

  const devices = useContext(DeviceContext);
  const deviceAndAirInfo = useContext(DeviceAndAirInfoContext);
  const snapShotAndCount = useContext(SnapShotAndCountContext);

  const numColumns = 3;

  const [statePm25, setStatePm25] = useState(true);
  const [statePm10, setStatePm10] = useState(false);
  const [stateVOCs, setStateVOCs] = useState(false);
  const [stateCO2, setStateCO2] = useState(false);
  const [stateCO, setStateCO] = useState(false);
  const [stateCH4, setStateCH4] = useState(false);

  const activePm25 = () => {
    setStatePm25(true);
    setStatePm10(false);
    setStateVOCs(false);
    setStateCO2(false);
    setStateCO(false);
    setStateCH4(false);
  };

  const activePm10 = () => {
    setStatePm25(false);
    setStatePm10(true);
    setStateVOCs(false);
    setStateCO2(false);
    setStateCO(false);
    setStateCH4(false);
  };

  const activeVOCs = () => {
    setStatePm25(false);
    setStatePm10(false);
    setStateVOCs(true);
    setStateCO2(false);
    setStateCO(false);
    setStateCH4(false);
  };

  const activeCO2 = () => {
    setStatePm25(false);
    setStatePm10(false);
    setStateVOCs(false);
    setStateCO2(true);
    setStateCO(false);
    setStateCH4(false);
  };

    const activeCO = () => {
      setStatePm25(false);
      setStatePm10(false);
      setStateVOCs(false);
      setStateCO2(false);
      setStateCO(true);
      setStateCH4(false);
  };

  const activeCH4 = () => {
    setStatePm25(false);
    setStatePm10(false);
    setStateVOCs(false);
    setStateCO2(false);
    setStateCO(false);
    setStateCH4(true);
  };


  const getExplain = () => {
    if (statePm25 === true && statePm10 === false && stateVOCs === false && stateCO2 === false && stateCO === false && stateCH4 === false) {
      return <Pm25Explain />;
    } else if (statePm25 === false && statePm10 === true && stateVOCs === false && stateCO2 === false && stateCO === false && stateCH4 === false) {
      return <Pm10Explain />;
    } else if (statePm25 === false && statePm10 === false && stateVOCs === true && stateCO2 === false && stateCO === false && stateCH4 === false) {
      return <VOCsExplain />;
    } else if (statePm25 === false && statePm10 === false && stateVOCs === false && stateCO2 === true && stateCO === false && stateCH4 === false) {
      return <CO2Explain />;
    } else if (statePm25 === false && statePm10 === false && stateVOCs === false && stateCO2 === false && stateCO === true && stateCH4 === false) {
      return <COExplain />;
    } else if (statePm25 === false && statePm10 === false && stateVOCs === false && stateCO2 === false && stateCO === false && stateCH4 === true) {
      return <CH4Explain />;
    }
  };

  const getDeviceNum = (len) => {
    let good = 0;
    let mod = 0;
    let bad = 0;
    let vbad = 0;
    let empty = 0

    for (let i = 0; i < len; i++) {
      if (snapShotAndCount.length !== 0 && snapShotAndCount[i].c >= 5) {
        continue;
      } else {
        if (cal.boundaryPM25(deviceAndAirInfo[i].stateInfo.pm25) === cnt.PM25_GOOD)
          good++
        else if (cal.boundaryPM25(deviceAndAirInfo[i].stateInfo.pm25) === cnt.PM25_MOD)
          mod++
        else if (cal.boundaryPM25(deviceAndAirInfo[i].stateInfo.pm25) === cnt.PM25_BAD)
          bad++
        else if (cal.boundaryPM25(deviceAndAirInfo[i].stateInfo.pm25) === cnt.PM25_VERY_BAD)
          vbad++
        else if (cal.boundaryPM25(deviceAndAirInfo[i].stateInfo.pm25) === cnt.PM25_EMPTY)
          empty++
      }
    }
    setGood(good);
    setMod(mod);
    setBad(bad);
    setVeryBad(vbad);
    setEmpty(empty)
  };

  const getDeviceStateColor = value => {
    if (cal.boundaryPM25(value) === cnt.PM25_GOOD)
      return goodState.bgColor
    else if (cal.boundaryPM25(value) === cnt.PM25_MOD)
      return modState.bgColor
    else if (cal.boundaryPM25(value) === cnt.PM25_BAD)
      return badState.bgColor
    else if (cal.boundaryPM25(value) === cnt.PM25_VERY_BAD)
      return veryBadState.bgColor
    else
      return emptyState.bgColor
  };

  const getDeviceTextPlaceColor = value => {
    if (cal.boundaryPM25(value) === cnt.PM25_GOOD)
      return goodState.txtPlaceColor
    else if (cal.boundaryPM25(value) === cnt.PM25_MOD)
      return modState.txtPlaceColor
    else if (cal.boundaryPM25(value) === cnt.PM25_BAD)
      return badState.txtPlaceColor
    else if (cal.boundaryPM25(value) === cnt.PM25_VERY_BAD)
      return veryBadState.txtPlaceColor
    else
      return emptyState.txtPlaceColor
  };

  const getDeviceTextPicoColor = value => {
    if (cal.boundaryPM25(value) === cnt.PM25_GOOD)
      return goodState.txtpiCo
    else if (cal.boundaryPM25(value) === cnt.PM25_MOD)
      return modState.txtpiCo
    else if (cal.boundaryPM25(value) === cnt.PM25_BAD)
      return badState.txtpiCo
    else if (cal.boundaryPM25(value) === cnt.PM25_VERY_BAD)
      return veryBadState.txtpiCo
    else
      return emptyState.txtpiCo
  };


  return (
    <View style={styles.container}>

<View style={styles.tipStyle}>
              {/* 곧 업데이트될 예정입니다.
            <View style={styles.place}>
              <View style={styles.placeStyle}>
                {house ? <View style={styles.placeActivatedDot}></View> : <View style={styles.placeInactivatedDot}></View>}
                <TouchableOpacity style={house ? styles.placeActivated : styles.placeInactivated} onPress={() => activeHouse()}>
                  <Image source={require('../../../../Assets/img/icHouse.png')} />
                </TouchableOpacity>
                <View style={styles.placeTextViewStyle}>
                  <Text style={house ? styles.placeActivatedText : styles.placeInactivatedText}>House</Text>
                </View>
              </View>
              <View style={styles.placeStyle}>
                {office ? <View style={styles.placeActivatedDot}></View> : <View style={styles.placeInactivatedDot}></View>}
                <TouchableOpacity
                  style={office ? styles.placeActivated : styles.placeInactivated}
                  onPress={() => activeOffice()}>
                  <Image source={require('../../../../Assets/img/icOffice.png')} />
                </TouchableOpacity>
                <View style={styles.placeTextViewStyle}>
                  <Text style={office ? styles.placeActivatedText : styles.placeInactivatedText}>Office</Text>
                </View>
              </View>
              <View style={styles.placeStyle}>
                {car ? <View style={styles.placeActivatedDot}></View> : <View style={styles.placeInactivatedDot}></View>}
                <TouchableOpacity style={car ? styles.placeActivated : styles.placeInactivated} onPress={() => activeCar()}>
                  <Image source={require('../../../../Assets/img/icCar.png')} />
                </TouchableOpacity>
                <View style={styles.placeTextViewStyle}>
                  <Text style={car ? styles.placeActivatedText : styles.placeInactivatedText}>Car</Text>
                </View>
              </View>
              <View style={styles.placeStyle}>
                {outDoor ? <View style={styles.placeActivatedDot}></View> : <View style={styles.placeInactivatedDot}></View>}
                <TouchableOpacity
                  style={outDoor ? styles.placeActivated : styles.placeInactivated}
                  onPress={() => activeOutDoor()}>
                  <Image source={require('../../../../Assets/img/icOutdoor.png')} />
                </TouchableOpacity>
                <View style={styles.placeTextViewStyle}>
                  <Text style={outDoor ? styles.placeActivatedText : styles.placeInactivatedText}>Outdoor</Text>
                </View>
              </View>
            </View>
            <View style={styles.tipTextViewFirst}>
              <Text style={[styles.tipText, { marginTop: 0 }]}>
                Today you can use artificial tears to clean your eyes after going out.
              </Text>
              <Text style={styles.tipText}>And the best way to prevent yourself is to wash your hands often.</Text>
            </View>
            */}
              <View style={styles.state}>
                <View style={styles.stateStyle}>
                  {statePm25 ? <View style={styles.stateActivatedDot}></View> : <View style={styles.stateInactivatedDot}></View>}
                  <TouchableOpacity
                    style={statePm25 ? styles.stateActivated : styles.stateInactivated}
                    onPress={() => activePm25()}>
                    <Image source={require('../../../../Assets/img/icPm25.png')} />
                  </TouchableOpacity>
                  <View style={styles.stateTextViewStyle}>
                    <Text style={statePm25 ? styles.stateActivatedText : styles.stateInactivatedText}>
                      {strings.detail_tip_info_label_pm25}
                    </Text>
                  </View>
                </View>
                <View style={styles.stateStyle}>
                  {statePm10 ? <View style={styles.stateActivatedDot}></View> : <View style={styles.stateInactivatedDot}></View>}
                  <TouchableOpacity
                    style={statePm10 ? styles.stateActivated : styles.stateInactivated}
                    onPress={() => activePm10()}>
                    <Image source={require('../../../../Assets/img/icPm10.png')} />
                  </TouchableOpacity>
                  <View style={styles.stateTextViewStyle}>
                    <Text style={statePm10 ? styles.stateActivatedText : styles.stateInactivatedText}>
                      {strings.detail_tip_info_label_pm10}
                    </Text>
                  </View>
                </View>
                <View style={styles.stateStyle}>
                  {stateVOCs ? <View style={styles.stateActivatedDot}></View> : <View style={styles.stateInactivatedDot}></View>}
                  <TouchableOpacity
                    style={stateVOCs ? styles.stateActivated : styles.stateInactivated}
                    onPress={() => activeVOCs()}>
                    <Image source={require('../../../../Assets/img/icVoc.png')} />
                  </TouchableOpacity>
                  <View style={styles.stateTextViewStyle}>
                    <Text style={stateVOCs ? styles.stateActivatedText : styles.stateInactivatedText}>
                      {strings.detail_tip_info_label_vocs}
                    </Text>
                  </View>
                </View>
                <View style={styles.stateStyle}>
                  {stateCO2 ? <View style={styles.stateActivatedDot}></View> : <View style={styles.stateInactivatedDot}></View>}
                  <TouchableOpacity
                    style={stateCO2 ? styles.stateActivated : styles.stateInactivated}
                    onPress={() => activeCO2()}>
                    <Image source={require('../../../../Assets/img/icCo2.png')} />
                  </TouchableOpacity>
                  <View style={styles.stateTextViewStyle}>
                    <Text style={stateCO2 ? styles.stateActivatedText : styles.stateInactivatedText}>
                      {strings.detail_tip_info_label_co2}
                    </Text>
                  </View>
                </View>
                <View style={styles.stateStyle}>
                  {stateCO ? <View style={styles.stateActivatedDot}></View> : <View style={styles.stateInactivatedDot}></View>}
                  <TouchableOpacity
                    style={stateCO ? styles.stateActivated : styles.stateInactivated}
                    onPress={() => activeCO()}>
                    <Image source={require('../../../../Assets/img/icCo.png')} />
                  </TouchableOpacity>
                  <View style={styles.stateTextViewStyle}>
                    <Text style={stateCO ? styles.stateActivatedText : styles.stateInactivatedText}>
                      일산화탄소
                    </Text>
                  </View>
                </View>
                <View style={styles.stateStyle}>
                  {stateCH4 ? <View style={styles.stateActivatedDot}></View> : <View style={styles.stateInactivatedDot}></View>}
                  <TouchableOpacity
                    style={stateCH4 ? styles.stateActivated : styles.stateInactivated}
                    onPress={() => activeCH4()}>
                    <Image source={require('../../../../Assets/img/icCH4.png')} />
                  </TouchableOpacity>
                  <View style={styles.stateTextViewStyle}>
                    <Text style={stateCH4? styles.stateActivatedText : styles.stateInactivatedText}>
                      메테인
                    </Text>
                  </View>
                </View>
              </View>
              {getExplain()}
              <View style={{ marginBottom: 40 }}></View>
            </View>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: height,
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  deleteViewStyle: {
    flexDirection: 'row',
    width: width,
    height: height * 0.075,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deleteButton: { margin: width * 0.05, marginTop: 60 },
  deviceNumberByPm25: { marginTop: height * 0.0423, alignItems: 'center' },
  pm25Text: {
    textAlign: 'center',
    fontFamily: 'NotoSans-Regular',
    fontSize: 12,
    color: colors.greyishBrown,
  },
  deviceNumberView: { flexDirection: 'row' },
  deviceNumberBox: {
    margin: width * 0.03125,
    alignItems: 'center',
    flexDirection: 'row',
  },
  flatListView: { marginTop: height * 0.04 },
  deviceBgWhite: {
    flexDirection: 'column',
    width: width * 0.281,
    height: width * 0.281,
    margin: width * 0.0156,
    borderRadius: 4,
    backgroundColor: colors.white,
  },
  bgColor: {
    width: width * 0.281,
    height: height * 0.0211,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    backgroundColor: colors.brownGrey,
    shadowColor: 'rgba(0, 172, 255, 0.2)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 16,
    shadowOpacity: 1,
    elevation: 1,
  },
  devicePlace: {
    width: width * 0.2,
    height: height * 0.0774,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtPlaceColor: { textAlign: 'center', fontFamily: 'NotoSans-Bold', fontSize: 13, color: colors.brownGrey },
  txtpiCo: { fontFamily: 'NotoSans-Regular', fontSize: 11, color: colors.brownGrey },
  deviceDeleteButton: {
    position: 'absolute',
  },
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
  modalSubText: { fontSize: 16, color: colors.brownGrey },
  modalButton: {
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
  modalButtonText: {
    fontSize: 14,
    fontFamily: 'NotoSans-Bold',
    color: colors.white,
  },
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scene: {
    height: height * 0.5,
  },
  comfortZoneText: {
    marginLeft: 12,
    fontFamily: 'NotoSans-Regular',
    fontSize: 12,
    color: colors.greyishBrown,
  },
  indicator: {
    height: height * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipText: {
    fontFamily: 'NotoSans-Regular',
    fontSize: 11,
    color: colors.brownGrey,
  },
  text: {
    fontFamily: 'NotoSans-Regular',
    color: colors.brownGrey,
  },
  tipStyle: { alignItems: 'center', flexDirection: 'column', marginTop: 60 },
  /* 곧 업데이트될 예정입니다.
  place: { flexDirection: 'row', width: width * 0.9 },
  placeStyle: {
    flexDirection: 'column',
    alignItems: 'center',
    margin: 16,
    marginHorizontal: width * 0.05,
  },
  placeActivatedDot: {
    width: 6,
    height: 6,
    borderRadius: 10,
    backgroundColor: colors.azure,
  },
  placeInactivatedDot: {
    width: 6,
    height: 6,
    borderRadius: 5,
  },
  placeActivated: {
    marginTop: 8,
    width: 48,
    height: 48,
    backgroundColor: colors.azure,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeInactivated: {
    marginTop: 8,
    width: 48,
    height: 48,
    backgroundColor: colors.veryLightPink,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeTextViewStyle: { marginTop: 4 },
  placeActivatedText: { color: colors.azure, fontFamily: 'regular' },
  placeInactivatedText: { color: colors.brownGrey, fontFamily: 'regular' },
  tipTextViewFirst: { width: width * 0.9, height: 80 },
  tipTextViewSecond: { width: width * 0.9 },
  tipText: {
    color: '#757575',
    lineHeight: 20,
    fontStyle: 'normal',
    fontSize: 12,
    letterSpacing: 0,
    marginTop: 16,
  },
  */
  stateStyle: {
    flexDirection: 'column',
    alignItems: 'center',
    margin: 10,
    marginHorizontal: width * 0.01,
  },
  state: { flexDirection: 'row', marginTop: 16 },
  stateActivatedDot: {
    width: 6,
    height: 6,
    borderRadius: 10,
    backgroundColor: colors.azure,
  },
  stateInactivatedDot: {
    width: 6,
    height: 6,
  },
  stateActivated: {
    marginTop: 8,
    width: 48,
    height: 48,
    backgroundColor: colors.azure,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stateInactivated: {
    marginTop: 8,
    width: 48,
    height: 48,
    backgroundColor: colors.veryLightPink,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stateTextViewStyle: { marginTop: 4 },
  stateActivatedText: { color: colors.azure, fontFamily: 'NotoSans-Regular', textAlign: 'center', fontSize:12 },
  stateInactivatedText: {
    color: colors.brownGrey,
    fontFamily: 'NotoSans-Regular',
    textAlign: 'center',
    fontSize:12
  },
});

const goodState = StyleSheet.create({
  indicator: {
    margin: 2,
    width: 8,
    height: 8,
    backgroundColor: colors.azure,
  },
  text: {
    margin: 2,
    fontFamily: 'NotoSans-Bold',
    fontSize: 16,
  },
  bgColor: {
    width: width * 0.281,
    height: height * 0.0211,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    backgroundColor: colors.azure,
    shadowColor: 'rgba(0, 172, 255, 0.2)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 16,
    shadowOpacity: 1,
    elevation: 1,
  },
  txtPlaceColor: {
    textAlign: 'center',
    fontFamily: 'NotoSans-Bold',
    fontSize: 13,
    color: colors.azure,
  },
  txtpiCo: {
    fontFamily: 'NotoSans-Regular',
    fontSize: 11,
    color: colors.azure,
  },
});

const modState = StyleSheet.create({
  indicator: {
    margin: 2,
    width: 8,
    height: 8,
    backgroundColor: colors.lichen,
  },
  text: {
    margin: 2,
    fontFamily: 'NotoSans-Bold',
    fontSize: 16,
  },
  bgColor: {
    width: width * 0.281,
    height: height * 0.0211,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    backgroundColor: colors.lichen,
    shadowColor: 'rgba(121, 191, 0, 0.2)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 16,
    shadowOpacity: 1,
    elevation: 1,
  },
  txtPlaceColor: {
    textAlign: 'center',
    fontFamily: 'NotoSans-Bold',
    fontSize: 13,
    color: colors.darkLimeGreen,
  },
  txtpiCo: {
    fontFamily: 'NotoSans-Regular',
    fontSize: 11,
    color: colors.darkLimeGreen,
  },
});

const badState = StyleSheet.create({
  indicator: {
    margin: 2,
    width: 8,
    height: 8,
    backgroundColor: colors.lightOrange,
  },
  text: {
    margin: 2,
    fontFamily: 'NotoSans-Bold',
    fontSize: 16,
  },
  bgColor: {
    width: width * 0.281,
    height: height * 0.0211,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    backgroundColor: colors.lightOrange,
    shadowColor: 'rgba(255, 160, 64, 0.2)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 16,
    shadowOpacity: 1,
    elevation: 1,
  },
  txtPlaceColor: {
    textAlign: 'center',
    fontFamily: 'NotoSans-Bold',
    fontSize: 13,
    color: colors.lightOrange,
  },
  txtpiCo: {
    fontFamily: 'NotoSans-Regular',
    fontSize: 11,
    color: colors.lightOrange,
  },
});

const veryBadState = StyleSheet.create({
  indicator: {
    margin: 2,
    width: 8,
    height: 8,
    backgroundColor: colors.coral,
  },
  text: {
    margin: 2,
    fontFamily: 'NotoSans-Bold',
    fontSize: 16,
  },
  bgColor: {
    width: width * 0.281,
    height: height * 0.0211,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    backgroundColor: colors.coral,
    shadowColor: 'rgba(252, 83, 69, 0.2)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 16,
    shadowOpacity: 1,
    elevation: 1,
  },
  txtPlaceColor: {
    textAlign: 'center',
    fontFamily: 'NotoSans-Bold',
    fontSize: 13,
    color: colors.coral,
  },
  txtpiCo: {
    fontFamily: 'NotoSans-Regular',
    fontSize: 11,
    color: colors.coral,
  },
});

const emptyState = StyleSheet.create({
  indicator: {
    margin: 2,
    width: 8,
    height: 8,
    backgroundColor: colors.brownGrey,
  },
  text: {
    margin: 2,
    fontFamily: 'NotoSans-Bold',
    fontSize: 16,
  },
  bgColor: {
    width: width * 0.281,
    height: height * 0.0211,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    backgroundColor: colors.brownGrey,
    shadowColor: 'rgba(252, 83, 69, 0.2)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 16,
    shadowOpacity: 1,
    elevation: 1,
  },
  txtPlaceColor: {
    textAlign: 'center',
    fontFamily: 'NotoSans-Bold',
    fontSize: 13,
    color: colors.brownishGrey,
  },
  txtpiCo: {
    fontFamily: 'NotoSans-Regular',
    fontSize: 11,
    color: colors.brownishGrey,
  },

  
});
