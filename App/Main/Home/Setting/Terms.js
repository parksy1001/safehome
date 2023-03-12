import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity, Button, Linking, BackHandler, ScrollView, FlatList} from 'react-native';
import colors from '../../../src/colors';
import Unorderedlist from 'react-native-unordered-list';

// Sound.setCategory('Playback');

// var ding = new Sound('siren.mp3', Sound.MAIN_BUNDLE, (error) => {
//   if (error) {
//       console.log('failed to load the sound', error);
//       return;
//     }
//     // if loaded successfully
//     console.log('duration in seconds: ' + ding.getDuration() + 'number of channels: ' + ding.getNumberOfChannels());
  
//   });

export function Terms({ navigation, route }) {

  return (
  
  <View style={styles.container}>
      <ScrollView>
      <View>
          <Text style={styles.header_text}>개인정보취급방침 Ver.1.0</Text>
      </View>
      <Image source={require("./../../../../Assets/img/term_head1.png")} style={{ width:width*0.95, flex:1, resizeMode:'contain', alignSelf:'center'}}/>
      <View style={styles.container_term}>
          <Text >1. 수집하는 개인정보{"\n"}</Text>
          <Text style={{fontSize:13}}>이용자가 서비스 이용에 가입할 경우, 한방은 서비스 이용에 필요한 최소한의 개인정보를 수집합니다.{"\n"}</Text>
          <Text style={{fontSize:13}}>이용자가 한방에 가입할 때 수집하는 개인정보는 다음과 같습니다. 이용자의 아이디, 비밀번호, 이름, 생년월일, 성별, 이메일 주소는 이용자가 한방에 가입할 때 수집하는 필수 정보입니다. 이용자가 제공한 생년월일이 만 14세 미만인 경우에는 서비스를 이용하실 수 없습니다.{"\n"}</Text>
          <Text style={{fontSize:13}}>서비스 이용 과정에서 IP 주소, 서비스 이용 기록, 기기 정보, 위치 정보가 생성되어 수집될 수 있습니다.{"\n"} </Text>
          <Text style={{fontSize:13}}>즉, 1) 정보통신서비스 제공자는 사용자가 서비스를 이용하는 과정에서 자동으로 사용자에 관한 정보를 생성하여 저장(수집)하거나, 2) 사용자의 기기에 고유한 정보를 안전하게 확보한 후 수집할 수 있습니다. 원래 값을 식별할 수 없도록 변환됩니다.{"\n"} </Text>
          <Text style={{fontSize:13}}>서비스 이용 시 위치정보 수집 및 저장에 관한 사항은 "위치기반서비스 이용약관"에서 규정하고 있습니다.{"\n"}</Text>
          <Text style={{fontSize:13}}>한방은 개인정보를 수집하기 위해 다음과 같은 방법을 사용합니다.{"\n"}</Text>
          <View style={{marginLeft:width*0.02, marginRight:width*0.02}}>
            <Unorderedlist><Text style={{fontSize:13}}>개인정보 수집은 이용자가 개인정보 수집에 동의하고, 가입 과정 또는 서비스 이용 과정에서 개인이 직접 삽입한 경우에 수집됩니다.{"\n"}</Text></Unorderedlist>
            <Unorderedlist><Text style={{fontSize:13}}>이용자의 개인정보는 고객센터에서 제공하는 상담 시 홈페이지, 이메일, 팩스, 전화 등을 통하여 수집합니다.{"\n"}</Text></Unorderedlist>
            <Unorderedlist><Text style={{fontSize:13}}>개인정보는 오프라인으로 진행되는 행사나 세미나에서 문서를 통해 수집합니다.{"\n"}</Text></Unorderedlist>
            <Unorderedlist><Text style={{fontSize:13}}>개인 정보는 한방과 협력 관계에 있는 외부 회사 또는 조직에서 수집합니다. 이 경우 제휴사는 정보통신망법에서 요구하는 바에 따라 
            에 개인정보를 제공하는 것에 대해 사용자의 동의를 얻은 후 한방에 정보를 제공합니다.{"\n"}</Text></Unorderedlist>
            <Unorderedlist><Text style={{fontSize:13}}>디바이스 정보 등 생성되는 정보는 사용자가 PC 웹 또는 모바일 웹/앱을 사용하는 과정에서 자동으로 생성되어 수집됩니다.{"\n"}</Text></Unorderedlist>
         </View>
      </View>

      <View style={styles.container_term}>
          <Text style={{fontSize:13}}>{"\n"}{"\n"}{"\n"}2. 수집한 개인정보의 활용{"\n"}</Text>
          <Text style={{fontSize:13}}>한방은 가입자 관리, 서비스 개발, 제공 및 개선, 안전한 인터넷 사용자 환경 조성을 포함하여 아래에 설명된 목적으로만 개인 정보를 사용합니다. {"\n"}</Text>
          <View style={{marginLeft:width*0.02, marginRight:width*0.02}}>
            <Unorderedlist><Text style={{fontSize:13}}>개인정보는 이용자의 한방 가입의사 확인, 이용자의 연령 및 법정대리인 동의 여부 확인, 이용자 및 법정대리인의 본인 확인, 이용자 식별, 한방의 탈퇴의사 확인, 기타의 목적으로 이용됩니다. 가입자 관리 목적. {"\n"}</Text></Unorderedlist>
            <Unorderedlist><Text style={{fontSize:13}}>콘텐츠, 광고 등 기존 서비스 제공에 이용되며, 이용자의 개인정보 및 관심분야, 서비스 방문 및 이용기록 등을 기반으로 인구통계학적 데이터 및 알고리즘 분석, 맞춤형 서비스 제공 및 환경지도 서비스 제공, 새로운 서비스를 개발하거나 기존 서비스를 개선하는 데 사용할 수 있는 기타 요소. {"\n"}</Text></Unorderedlist>
            <Unorderedlist><Text style={{fontSize:13}}>법령 및 한방의 이용약관을 위반한 이용자의 서비스 이용제한, 불량행위 등 서비스의 원활한 운영을 방해하는 행위의 방지 및 제한, 계정사기 및 불법거래 방지, 계약갱신에 대한 안내 등을 위해 개인정보를 처리합니다. , 분쟁조정에 관한 기록의 저장, 민원처리, 기타 이용자 보호 및 서비스 운영을 목적으로 합니다.{"\n"} </Text></Unorderedlist>
            <Unorderedlist><Text style={{fontSize:13}}>개인정보는 프리미엄 서비스 제공 시 본인 확인, 구매 및 결제, 상품 및 서비스 제공을 위해 이용됩니다. {"\n"}</Text></Unorderedlist>
            <Unorderedlist><Text style={{fontSize:13}}>이벤트 정보 제공 및 참여기회 제공, 광고성 제공, 기타 마케팅 및 프로모션 목적으로 개인정보를 처리합니다.{"\n"}</Text></Unorderedlist>
            <Unorderedlist><Text style={{fontSize:13}}>서비스 이용기록 및 접속 빈도 분석, 서비스 이용 통계 산정, 서비스 분석 및 통계에 따른 맞춤 서비스 제공, 광고 게재 등을 위해 개인정보를 이용합니다.{"\n"}</Text></Unorderedlist>
            <Unorderedlist><Text style={{fontSize:13}}>개인 정보는 보안, 개인 정보 보호 및 안전이 요구되는 상황에서 사용자를 안심시키고 사용 가능한 서비스 환경을 구축하는 데 사용됩니다.{"\n"}</Text></Unorderedlist>
         </View>
      </View>

      <View style={styles.container_term}>
          <Text style={{fontSize:13}}>{"\n"}{"\n"}{"\n"}3. 개인정보의 제공 및 위탁{"\n"}</Text>
          <Text style={{fontSize:13}}>한방은 원칙적으로 이용자의 동의 없이 개인정보를 외부에 제공하지 않습니다.{"\n"}</Text>
          <Text style={{fontSize:13}}>한방은 이용자의 동의 없이 개인정보를 외부에 제공하지 않습니다. 단, 개인정보는 관련 법령에 따라 한방이 개인정보를 제출할 의무가 있는 경우, 외부 협력업체의 서비스 이용을 위해 개인정보 제공에 대해 이용자가 직접 동의한 경우에 한하여 제공됩니다. 생명이나 안전이 위협받는 것으로 확인됨.{"\n"}</Text>
          <Text style={{fontSize:13}}>한방은 정보통신망법에 따라 개인정보를 안전하게 보호하기 위하여 필요한 규정을 두고 있으며 이에 따라 개인정보를 관리·감독하고 있습니다.{"\n"}</Text>
      </View>

      <View style={styles.container_term}>
          <Text style={{fontSize:13}}>{"\n"}{"\n"}{"\n"}4. 개인정보의 파기{"\n"}</Text>
          <Text style={{fontSize:13}}>회사는 원칙적으로 이용자가 서비스를 탈퇴한 후 즉시 개인정보를 파기합니다. {"\n"}</Text>
          <Text style={{fontSize:13}}>다만, 한방이 이용자로부터 별도의 동의를 얻은 개인정보를 일정 기간 보유하거나 회사가 법령에 의한 의무를 지는 경우에는 이용자가 탈퇴한 후에도 지정된 기간 동안 개인정보를 안전하게 보관할 수 있습니다. 특정 기간 동안 정보를 저장합니다. {"\n"}</Text>
          <Text style={{fontSize:13}}>전자상거래 등에서의 소비자 보호에 관한 법률, 전자금융거래에 관한 법률, 통신비밀보호법 등의 법령에 의하여 한방은 아래와 같이 일정기간 정보를 보관하도록 규정하고 있습니다. 한방은 법률이 정하는 기간 동안 개인정보를 보관하며, 다른 목적으로 이용하지 않습니다. {"\n"}</Text>
          <View style={{marginLeft:width*0.02, marginRight:width*0.02}}>
            <Unorderedlist><Text style={{fontSize:13}}>전자상거래 등에서의 소비자보호에 관한 법률 {"\n"}</Text></Unorderedlist>
            <Unorderedlist><Text style={{fontSize:13}}>가입 또는 청약철회에 관한 기록 : 5년 보관 {"\n"}</Text></Unorderedlist>
            <Unorderedlist><Text style={{fontSize:13}}>대금결제 및 재화 등의 공급에 관한 기록 : 5년 보관{"\n"} </Text></Unorderedlist>
            <Unorderedlist><Text style={{fontSize:13}}>고객의 불만 또는 분쟁처리에 관한 기록 : 3년 보관 {"\n"}</Text></Unorderedlist>
            <Unorderedlist><Text style={{fontSize:13}}>전자금융거래법{"\n"}</Text></Unorderedlist>
            <Unorderedlist><Text style={{fontSize:13}}>전자금융에 관한 기록 : 5년 보관{"\n"}</Text></Unorderedlist>
            <Unorderedlist><Text style={{fontSize:13}}>통신비밀보호법.{"\n"}</Text></Unorderedlist>
            <Unorderedlist><Text style={{fontSize:13}}>로그인에 관한 기록 : 3개월간 보관{"\n"}</Text></Unorderedlist>
         </View>
         <Text style={{fontSize:13}}>이용자의 서비스 탈퇴, 서비스 해지, 이용자가 동의한 개인정보 보유기간의 만료 등 정보 수집 및 보관 목적이 달성된 후에는 개인정보를 지체 없이 파기합니다. 법령에 의한 의무에 의해 보관된 개인정보는, 보존기간이 경과한 후에는 즉시 복구 불가능한 상태로 파기합니다. {"\n"}</Text>         
      </View>

      <View style={styles.container_term}>
          <Text style={{fontSize:13}}>{"\n"}{"\n"}{"\n"}5. 이용자 및 법정대리인의 권리와 그 행사방법 {"\n"}</Text>
           <View style={{marginLeft:width*0.02, marginRight:width*0.02}}>
            <Unorderedlist><Text style={{fontSize:13}}>이용자는 언제든지 '프로필'에서 자신의 개인정보를 조회하거나 수정할 수 있습니다.{"\n"}</Text></Unorderedlist>
            <Unorderedlist><Text style={{fontSize:13}}>이용자는 언제든지 '청약철회'를 통하여 개인정보 수집 및 이용에 대한 동의를 철회하실 수 있습니다.{"\n"}</Text></Unorderedlist>
            <Unorderedlist><Text style={{fontSize:13}}>이용자가 개인정보의 오류에 대한 정정을 요구한 경우에는 정정될 때까지 당해 개인정보를 이용 또는 제공할 수 없습니다. 이미 잘못된 개인정보를 제3자에게 제공한 경우에는 정정된 정보를 제3자에게 즉시 통지하여 필요한 정정이 이루어질 수 있도록 합니다.{"\n"} </Text></Unorderedlist>
         </View>
      </View>

      <View style={styles.container_term}>
          <Text style={{fontSize:13}}>{"\n"}{"\n"}{"\n"}6. 개인정보 보호책임자 및 담당자 {"\n"}</Text>
          <Text style={{fontSize:13}}>한방은 개인정보 보호책임자 및 개인정보관리책임자를 다음과 같이 지정하고 있습니다. 한방 이용자의 개인정보 문의에 대한 답변 및 불만처리 등을 담당합니다.{"\n"}</Text>

          <View style={{marginLeft:width*0.02, marginRight:width*0.02}}>
              <Text style={{fontSize:13}}>성명 : 최두찬</Text>
              <Text style={{fontSize:13}}>소속 및 직위 : 대표이사</Text>
              <Text style={{fontSize:13}}>전화: 02-2023-5030</Text>
              <Text style={{fontSize:13}}>이메일: cdc4111_kfubis@entumoffice.com {"\n"}</Text>
          </View>

          <View style={{marginLeft:width*0.02, marginRight:width*0.02}}>
              <Text style={{fontSize:13}}>이름: 고민혁</Text>
              <Text style={{fontSize:13}}>소속 및 직위: 대리</Text>
              <Text style={{fontSize:13}}>전화: 02-6959-5538</Text>
              <Text style={{fontSize:13}}>이메일: kmh4271@kfubis.com</Text>
          </View>
      </View>

      <View style={styles.container_term}>
          <Text style={{fontSize:13}}>{"\n"}{"\n"}{"\n"}{"\n"}7. 개정 전 고지의 의무{"\n"}</Text>
          <Text style={{fontSize:13}}>신규 추가, 삭제, 갱신된 사항을 포함하여 본 개인정보취급방침이 개정되는 경우에는 개정 최소 7일 전부터 '공지사항'을 통해 고지할 것입니다. 다만, 수집하는 개인정보의 변경 및 이용목적의 변경 등 이용자의 권리에 영향을 미치는 중요한 변경사항에 대해서는 변경일자 최소 30일 이전에 고지합니다. 필요한 경우 이용자의 동의를 다시 받습니다. {"\n"}</Text>
      </View>

      <View style={styles.container_term}>
          <Text style={{fontSize:13}}>{"\n"}{"\n"}{"\n"}공고일자: 2022년 12월 26일</Text>
          <Text style={{fontSize:13}}>발효일: 2022년 12월 26일</Text>
      </View>
      </ScrollView>
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

  container_term: {
      marginLeft:width*0.05,
      marginRight:width*0.05
  },

  
  container_term2: {
    marginLeft:width*0.05,
    marginRight:width*0.05,
}, 
  header_text:{
      fontSize:20,
      fontWeight: 'bold',
      alignSelf:'center'
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
