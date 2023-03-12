import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import { SettingContext, NoticeContext, TempContext, UserDetailInfoContext, LanguageContext, SnsContext } from '../../../context';
import ToggleSwitch from '../../../component/ToggleSwitch';
import colors from '../../../src/colors';

export function AppInfo({ navigation }) {
  const { changeNotification, changeTempMod } = useContext(SettingContext);
  const strings = useContext(LanguageContext);
  const userDetailInfo = useContext(UserDetailInfoContext);
  const sns = useContext(SnsContext);
  const isNoticeEnabled = useContext(NoticeContext);
  const isTempEnabled = useContext(TempContext);

  const [isNoticeAlert, setNoticeAlert] = useState(false);

  const toggleNoticeSwitch = () => {
    changeNotification();
    if (isNoticeEnabled === false) {
      setNoticeAlert(true);
    }
  };

  const toggleTempSwitch = () => {
    changeTempMod();
  };

  useEffect(() => {
    console.log('sns: ' + sns);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.settingViewStyle}>

          <View style={styles.managePicoHomeSetting}>
            <View style={styles.icStuff}>
            </View>
            <View style={styles.manageMyPicoHomeTextStyle}>
              {/* <Text style={styles.manageMyPiCoHomeText}>{strings.setting_list_managing}</Text> */}
              <Text style={styles.manageMyPiCoHomeText}>앱 명칭</Text>
            </View>
            <View style={styles.icNextArrow}>
              <Text style={styles.manageMyPiCoHomeText}>Safe Home Care Aero System</Text>
            </View>
          </View>

 
          <View style={styles.managePicoHomeSetting}>
            <View style={styles.icStuff}>
            </View>
            <View style={styles.manageMyPicoHomeTextStyle}>
              {/* <Text style={styles.manageMyPiCoHomeText}>{strings.setting_list_managing}</Text> */}
              <Text style={styles.manageMyPiCoHomeText}>버전</Text>
            </View>
            <View style={styles.icNextArrow}>
                <Text style={styles.manageMyPiCoHomeText}>v.1.0.0</Text>
            </View>
          </View>

          <View style={styles.managePicoHomeSetting}>
            <View style={styles.icStuff}>
            </View>
            <View style={styles.manageMyPicoHomeTextStyle}>
              {/* <Text style={styles.manageMyPiCoHomeText}>{strings.setting_list_managing}</Text> */}
              <Text style={styles.manageMyPiCoHomeText}>개발사</Text>
            </View>
            <View style={styles.icNextArrow}>
              <Text style={styles.manageMyPiCoHomeText}>한방유비스 주식회사</Text>
            </View>
          </View>

          <View style={styles.managePicoHomeSetting}>
            <View style={styles.icStuff}>
            </View>
            <View style={styles.manageMyPicoHomeTextStyle}>
              {/* <Text style={styles.manageMyPiCoHomeText}>{strings.setting_list_managing}</Text> */}
            </View>
          </View>
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
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

  managePicoHomeSetting2: {
    flexDirection: 'row',
    width: width * 0.85,
    height: height * 0.0845,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.veryLightPink,
  },
  icStuff: {
    marginHorizontal: width * 0.0125,
    alignItems: 'center',
    justifyContent: 'center',
  },

  icStuff2: {
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
    //marginTop: height * 0.127,
    marginTop: height * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appInfoTitle: {
    textAlign: 'left',
    fontFamily: 'NotoSans-Bord',
    fontSize: 13,
    color: colors.brownGrey,
  },
  appInfoContents: {
    textAlign: 'left',
    fontFamily: 'NotoSans-Bord',
    fontSize: 11,
    color: colors.brownGrey,
  },
  appInfoSingle: {
    alignItems: 'flex-start',
    paddingTop: 2,
    paddingBottom: 2,
    paddingEnd: 200,
  },
  appInfoBundle: {
    paddingTop: 15,
  },
  versionStyle: {
    textAlign: 'center',
    fontFamily: 'NotoSans-Regular',
    fontSize: 11,
    color: colors.brownGrey,
  },
});
