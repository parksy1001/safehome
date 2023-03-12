import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  NativeModules,
} from 'react-native';
import { LanguageContext } from '../../../context';
import { BleManager } from 'react-native-ble-plx';
import colors from '../../../src/colors';
import Modal from 'react-native-modal';
import initialPlace from '../../../src/InitialPlace';

export const Connect = ({ navigation }) => {
  const bleManager = new BleManager();

  const strings = useContext(LanguageContext);
  const [connectInfo, setConnectInfo] = useState(false);
  const [bleModal, setBleModal] = useState(false);
  const [scanLoading, setScanLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isArea, setIsArea] = useState(false);

  const [newDeviceName, setNewDeviceName] = useState(strings.wifisetting_4_input_name);
  const [newDevicePlace, setNewDevicePlace] = useState(strings.wifisetting_4_select_place_room);
  //const [firmwareVer, setNewDevicePlace] = useState(strings.wifisetting_4_select_place_room);
  const [devicePlaceAccess, setDevicePlaceAccess] = useState(false);

  const [showPlace, setShowPlace] = useState(false);
  const [showAddPlace, setShowAddPlace] = useState(false);
  const [registError, setRegistError] = useState(false);

  const [placeList, setPlaceList] = useState([]);
  const locale = NativeModules.I18nManager.localeIdentifier;
  const defaultPlaceList = initialPlace[locale].split('/');
  //var area =0;
  const [area, setArea] = useState(0);
  const [areaExplain, setAreaEx] = useState(false);

  // 블루투스 권한 요청 처리
  // 블루투스 On => 바로 Find PiCOHOME
  // 블루투스 Off => 권한요청 Modal => Allow : Find PiCOHOME / Deny : Modal Off, stay
  const getBLEPermission = () => {
    if (area == 0) {
      setAreaEx(true);
    } else {
      bleManager.state().then((res) => {
        if (res === 'PoweredOff') {
          setBleModal(true);
        } else {
          navigation.navigate('FindPicoToScan', { strings: strings, area: area });
        }
      });
    }
  };

  // const getBLEPermission = () => {
  //   bleManager.state().then((res) => {
  //     if (res === 'PoweredOff') {
  //       setBleModal(true);
  //     } else {
  //       navigation.navigate('FindPicoToScan', { strings: strings, area: area });
  //     }
  //   });
  // };

  const onBleGoScan = () => {
    bleManager.enable();
    setScanLoading(true);
    setTimeout(() => {
      setBleModal(false);
      setScanLoading(false);
      navigation.navigate('FindPicoToScan', { strings: strings });
    }, 3000);
  };

  //   return (
  //     <View style={styles.container}>
  //       <View style={styles.noticeButton}>
  //         <TouchableOpacity onPress={() => setConnectInfo(true)}>
  //           <Image source={require('../../../../Assets/img/icInformation.png')} />
  //         </TouchableOpacity>
  //       </View>
  //       <View style={styles.box}>
  //         <Text style={styles.finishSetup}>{strings.connecting_list_bluetooth}</Text>
  //         <Text style={styles.useWithBluetooth}>블루투스로 Sai Home 사용하기</Text>
  //         <TouchableOpacity style={styles.button} onPress={() => getBLEPermission()}>
  //           <Text style={styles.buttonText}>{strings.connecting_button_bluetooth}</Text>
  //         </TouchableOpacity>
  //       </View>
  //       <View style={styles.box}>
  //         <Text style={styles.continueToSetUp}>{strings.connecting_list_wifi}</Text>
  //         <Text style={styles.useWithWiFiNetwo}>와이파이로 Sai Home 사용하기</Text>
  //         <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FindPicoToWiFi', { strings: strings })}>
  //           <Text style={styles.buttonText}>{strings.connecting_button_wifi}</Text>
  //         </TouchableOpacity>
  //       </View>
  //       {/* Modal Hide */}
  //       {/* <Modal isVisible={bleModal} onBackdropPress={() => setBleModal(false)}>
  //         <View>
  //           {scanLoading ? (
  //             <View style={[styles.modalContainer, { height: height * 0.3 }]}>
  //               <View style={styles.indicator}>
  //                 <ActivityIndicator size="large" color={colors.azure} />
  //               </View>
  //             </View>
  //           ) : (
  //             <View style={styles.modalContainer}>
  //               <View style={styles.modalCancel}>
  //                 <TouchableOpacity onPress={() => setBleModal(false)}>
  //                   <Image source={require('../../../../Assets/img/icCancel.png')} />
  //                 </TouchableOpacity>
  //               </View>
  //               <View style={styles.modalHeaderTextView}>
  //                 <Text style={styles.modalHeaderText}>{strings.ble_permission_popup_title}</Text>
  //               </View>
  //               <View style={styles.modalSubTextView}>
  //                 <Text style={styles.modalSubText}>{strings.ble_permission_popup_contents}</Text>
  //               </View>
  //               <View style={{ flexDirection: 'row' }}>
  //                 <TouchableOpacity onPress={() => setBleModal(false)}>
  //                   <View style={[styles.modalButton, { backgroundColor: colors.veryLightPink }]}>
  //                     <Text style={styles.modalButtonText}>{strings.ble_permission_popup_button_deny}</Text>
  //                   </View>
  //                 </TouchableOpacity>
  //                 <TouchableOpacity onPress={() => onBleGoScan()}>
  //                   <View style={styles.modalButton}>
  //                     <Text style={styles.modalButtonText}>{strings.ble_permission_popup_button_allow}</Text>
  //                   </View>
  //                 </TouchableOpacity>
  //               </View>
  //             </View>
  //           )}
  //         </View>
  //       </Modal> */}
  //       {/* <Modal isVisible={connectInfo} onBackdropPress={() => setConnectInfo(false)}>
  //         <View style={styles.modalContainer}>
  //           <View style={styles.modalCancel}>
  //             <TouchableOpacity onPress={() => setConnectInfo(false)}>
  //               <Image source={require('../../../../Assets/img/icCancel.png')} />
  //             </TouchableOpacity>
  //           </View>
  //           <View style={styles.modalHeaderTextView}>
  //             <Text style={styles.modalHeaderText}>{strings.connecting_popup_title}</Text>
  //           </View>
  //           <View style={styles.modalSubTextView}>
  //             <Text style={styles.modalSubText}>{strings.connecting_popup_contents}</Text>
  //           </View>
  //           <TouchableOpacity onPress={() => setConnectInfo(false)}>
  //             <View style={[styles.modalButton, { width: width * 0.8 }]}>
  //               <Text style={styles.modalButtonText}>OK</Text>
  //             </View>
  //           </TouchableOpacity>
  //         </View>
  //       </Modal> */}
  //     </View>
  //   );
  // };

  return (
    <View style={styles.container2}>
      {isLoading ? (
        <View style={{ flex: 1 }}>
          {/* <View style={styles.box}>
        <Text style={styles.picoNameText}>{strings.wifisetting_4_label_name}</Text>
        <TextInput
          style={styles.picoNameTextInput}
          onChangeText={(text) => setNewDeviceName(text.trim())}
          placeholder={strings.wifisetting_4_input_name}></TextInput>
      </View> */}
          {/* <View style={styles.placeContainer}>
        <Text style={styles.placeText}>{strings.wifisetting_4_label_place}</Text>
        <TouchableOpacity onPress={() => setShowPlace(true)}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <TextInput
              style={styles.placeTextInput}
              //onChangeText={(text) => checkPlaceAccess(text.trim())}
              placeholder={strings.wifisetting_4_select_place_room}
              value={devicePlaceAccess ? newDevicePlace : null}
            />
            <Image source={require('../../../../Assets/img/icMiniarrowBottom.png')} />
          </View>
        </TouchableOpacity>
         <Modal isVisible={showPlace} onBackdropPress={() => setShowPlace(false)}>
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.modalCancel} onPress={() => setShowPlace(false)}>
              <Image source={require('../../../../Assets/img/icCancel.png')} />
            </TouchableOpacity>
            <FlatList data={[...defaultPlaceList , ...placeList]} renderItem={(item) => makePlaceList(item)} />
            <TouchableOpacity
              onPress={() => {
                setShowPlace(false), setShowAddPlace(true);
              }}
              style={{ paddingTop: 8, paddingBottom: 8 }}>
              <Text style={{ color: '#999' }}>{strings.wifisetting_4_select_place_add}</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal isVisible={showAddPlace} onBackdropPress={() => setShowAddPlace(false)}>
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.modalCancel} onPress={() => setShowAddPlace(false)}>
              <Image source={require('../../../../Assets/img/icCancel.png')} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{strings.wifisetting_4_popup_title}</Text>
            <View style={styles.modalBox}>
              <Text style={{ color: colors.black }}>{strings.wifisetting_4_popup_label_place}</Text>
              <TextInput style={styles.placeTextInput} onChangeText={(text) => checkPlaceAccess(text.trim())} />
            </View>
            <TouchableOpacity style={styles.placeList} onPress={() => addPlaceList()}>
              <Text style={styles.buttonText}>{strings.wifisetting_4_popup_button_ok}</Text>
            </TouchableOpacity>
          </View>
        </Modal> 
      </View>*/}
          <View style={styles.box2}>
            <Text style={styles.picoNameText}>평형 수</Text>
            <TextInput
              style={styles.picoNameTextInput}
              // onChangeText={(text) => setNewDeviceName(text.trim())}
              keyboardType="numeric"
              onChangeText={(text) => setArea(text.trim())}
              placeholder="평형 수를 입력하세요."></TextInput>
          </View>
          <View style={styles.picoHomeBig}>
            <Image
              style={{ width: width * 0.3, height: height * 0.45 }}
              source={require('../../../../Assets/img/saihome_img.png')}
            />
          </View>
          {/* <View style={styles.picoHomeBig}>
        <Image source={require('../../../../Assets/img/ic_Sensor3.png')} />
      </View> */}
          <TouchableOpacity style={styles.button2} onPress={() => getBLEPermission()}>
            <Text style={styles.buttonText}>Safe Home 블루투스 연결하기</Text>
          </TouchableOpacity>

          <Modal isVisible={areaExplain} onBackdropPress={() => setAreaEx(false)}>
            <View style={styles.home_modalContainer}>
              <View style={styles.home_modalCancel}>
                <TouchableOpacity onPress={() => setAreaEx(false)}>
                  <Image source={require('../../../../Assets/img/icCancel.png')} />
                </TouchableOpacity>
              </View>
              <View style={styles.home_modalSubTextView}>
                <Text style={styles.home_modalSubText_area}>평형 수를 입력해주세요.</Text>
              </View>
              <TouchableOpacity onPress={() => setAreaEx(false)}>
                <View style={[styles.home_modalButton, { width: width * 0.8 }]}>
                  <Text style={styles.home_modalButtonText}>{strings.main_popup_pollen_button_ok}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </Modal>

          <Modal isVisible={bleModal} onBackdropPress={() => setBleModal(false)}>
            <View>
              {scanLoading ? (
                <View style={[styles.modalContainer, { height: height * 0.3 }]}>
                  <View style={styles.indicator}>
                    <ActivityIndicator size="large" color={colors.azure} />
                  </View>
                </View>
              ) : (
                <View style={styles.modalContainer}>
                  <View style={styles.modalCancel}>
                    <TouchableOpacity onPress={() => setBleModal(false)}>
                      <Image source={require('../../../../Assets/img/icCancel.png')} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.modalHeaderTextView}>
                    <Text style={styles.modalHeaderText}>{strings.ble_permission_popup_title}</Text>
                  </View>
                  <View style={styles.modalSubTextView}>
                    <Text style={styles.modalSubText}>{strings.ble_permission_popup_contents}</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => setBleModal(false)}>
                      <View style={[styles.modalButton, { backgroundColor: colors.veryLightPink }]}>
                        <Text style={styles.modalButtonText}>{strings.ble_permission_popup_button_deny}</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onBleGoScan()}>
                      <View style={styles.modalButton}>
                        <Text style={styles.modalButtonText}>{strings.ble_permission_popup_button_allow}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </Modal>
        </View>
      ) : (
        <View style={styles.indicator}>
          <ActivityIndicator size="large" color={colors.azure} />
        </View>
      )}
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: height,
    marginTop: height * 0.0423,
    alignItems: 'center',
    backgroundColor: colors.veryLightPink,
  },
  box: {
    width: width * 0.9,
    height: height * 0.375,
    margin: width * 0.025,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: colors.white,
  },
  noticeButton: {
    width: width * 0.9,
    marginTop: height * 0.05,
    alignItems: 'flex-end',
  },
  button: {
    position: 'absolute',
    bottom: 24,
    width: width * 0.75,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    backgroundColor: colors.azure,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 16,
    shadowOpacity: 1,
    elevation: 3,
  },
  buttonText: {
    textAlign: 'center',
    fontFamily: 'NotoSans-Bold',
    fontSize: 12,
    color: colors.white,
  },
  finishSetup: {
    marginTop: height * 0.0933,
    textAlign: 'center',
    fontFamily: 'NotoSans-Bold',
    fontSize: 15,
    color: colors.azure,
  },
  useWithBluetooth: {
    marginTop: 4,
    textAlign: 'center',
    fontFamily: 'NotoSans-Regular',
    fontSize: 12,
    lineHeight: 20,
    color: colors.brownishGrey,
  },
  continueToSetUp: {
    marginTop: height * 0.0933,
    textAlign: 'center',
    fontFamily: 'NotoSans-Bold',
    fontSize: 15,
    color: colors.azure,
  },
  useWithWiFiNetwo: {
    marginTop: 4,
    textAlign: 'center',
    fontFamily: 'NotoSans-Regular',
    fontSize: 12,
    lineHeight: 20,
    color: colors.brownishGrey,
  },
  modalContainer: {
    width: width * 0.9,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
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
  modalSubText: {
    textAlign: 'center',
    fontFamily: 'NotoSans-Regular',
    fontSize: 14,
    color: colors.brownGrey,
  },
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

  container2: {
    height: height,
    alignItems: 'center',
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: 'center',
  },
  box: {
    flexDirection: 'column',
    width: width * 0.85,
    height: height * 0.0845,
    marginTop: 24,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.veryLightPink,
  },
  box2: {
    flexDirection: 'column',
    width: width * 0.85,
    height: height * 0.0845,
    marginTop: height * 0.15,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.veryLightPink,
  },
  picoNameText: {
    fontFamily: 'NotoSans-Regular',
    fontSize: 11,
    color: colors.brownGrey,
  },
  picoNameTextInput: {
    fontFamily: 'NotoSans-Regular',
    fontSize: 14,
    color: colors.greyishBrown,
  },
  placeContainer: {
    flexDirection: 'column',
    width: width * 0.85,
    marginTop: height * 0.0423,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.veryLightPink,
  },
  placeText: {
    fontFamily: 'NotoSans-Regular',
    fontSize: 11,
    color: colors.brownGrey,
  },
  placeTextViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  placeTextInput: { width: 220, fontFamily: 'NotoSans-Regular', color: colors.greyishBrown },
  placeList: {
    width: width * 0.75,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    borderRadius: 24,
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
  modalView: {
    borderRadius: 15,
    paddingVertical: 24,
    backgroundColor: '#efefef',
    alignItems: 'center',
  },
  modalCancel: { position: 'absolute', right: 12, top: 12 },
  modalTitle: { fontFamily: 'NotoSans-Bold', fontSize: 18, marginBottom: 20 },
  modalSubText: {
    fontSize: 14,
    fontFamily: 'NotoSans-Regular',
    color: colors.brownGrey,
  },
  modalBox: {
    flexDirection: 'column',
    width: width * 0.75,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.greyishBrown,
  },
  picoHomeBig: { marginTop: height * 0.15, alignItems: 'center' },

  //picoHomeBig: { marginTop: height*0.2,alignItems: 'center', width:width, height:height*0.4},

  button2: {
    alignSelf: 'flex-end',
    position: 'absolute',
    //top: height * 0.74,
    bottom: 30,
    width: width * 0.85,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
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
  buttonText: {
    textAlign: 'center',
    fontFamily: 'NotoSans-Bold',
    fontSize: 12,
    color: colors.white,
  },
  boxInput: {
    fontFamily: 'NotoSans-Regular',
    fontSize: 14,
    color: colors.greyishBrown,
  },
  indicator: {
    flex: 1,
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
  home_modalSubText_area: {
    textAlign: 'center',
    fontFamily: 'NotoSans-Regular',
    fontSize: 14,
  },
});
