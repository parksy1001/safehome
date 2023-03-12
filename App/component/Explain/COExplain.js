import React, { useContext } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { LanguageContext } from '../../context';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../src/colors';

export const COExplain = () => {
  const strings = useContext(LanguageContext);
  return (
    <>
      <View>
        <LinearGradient
          style={styles.linearGradientStyle}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          location={[0, 0.32, 0.76, 1]}
          colors={['rgb(0, 172, 255)', 'rgb(121, 191, 0)', 'rgb(255, 195, 52)', 'rgb(252, 83, 69)']}></LinearGradient>
        <View style={styles.linearGradientTextViewStyle}>
          <Text style={styles.linearGradientText}>0</Text>
          <Text style={[styles.linearGradientText, { marginLeft: width * 0.1812 }]}>20</Text>
          <Text style={[styles.linearGradientText, { marginLeft: width * 0.16 }]}>3,200</Text>
          <Text style={[styles.linearGradientText, { marginLeft: width * 0.16 }]}>6,400</Text>
        </View>
      </View>
      <View style={styles.stateGradeTextViewStyle}>
        <Text style={styles.stateGradeText}>0 - 20 : 정상 / 하늘색</Text>
        <Text style={styles.stateGradeText}>20 - 3200 : 두통 및 메스꺼움 / 초록색</Text>
        <Text style={styles.stateGradeText}>3200 - 6400 : 2시간 이내 사망 / 주황색</Text>
        <Text style={styles.stateGradeText}>6401 이상 : 15분 내 사망 / 빨강색</Text>
        <Text style={styles.stateGradeText}>(단위: kg/m3)</Text>
      </View>
      <View style={styles.tipTextViewSecond}>
        <Text style={styles.tipText}>탄소가 포함된 연료가 산소가 부족한 환경, 또는 저온의 환경에서 불완전연소할때 나오는 물질이다. 굉장히 위험한 물질로 적혈구의 헤모글로빈에 대한 결합력이 산소보다 엄청나게 높아서 이것이 과다하게 흡입되면 생물은 산소부족으로 죽게 된다. 결합력의 차이는 대략 200:1. 따라서 공기 중에 극히 소량만 존재하더라도 문제가 되는데, 이는 소량이라 할지라도 거의 모두 인체에 흡수되어 작용하기 때문이다. 또, 산소 운반기능 저하 이외에 미토콘드리아의 세포내 호흡을 차단하는 역할도 동시에 한다. 효과는 동일. 시안화칼륨, 시안화수소 등에 들어 있는 시안(CN-)기도 이런 식으로 독성을 나타내는 것이다. 그래서 일산화탄소의 혈중 포화도가 55~57% 수준이면 전신 마비와 신경세포 사멸이 시작되며, 60%를 넘어가면 산소부족으로 사망한다.미량만 흡입해도 매우 위험한 독성 기체인 반면 체내에서 일산화질소(NO)와 더불어 국소조절 가스로 작용하기도 한다.</Text>
        <View style={{ marginBottom: 40 }}></View>
      </View>
    </>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  linearGradientStyle: {
    marginTop: 16,
    width: width * 0.9,
    height: 9,
    borderRadius: 4.5,
  },
  linearGradientTextViewStyle: {
    flexDirection: 'row',
    marginTop: 4,
  },
  linearGradientText: {
    fontFamily: 'NotoSans-Regular',
    fontSize: 11,
    color: colors.brownishGrey,
  },
  tipTextViewFirst: { width: width * 0.9, height: 80 },
  tipTextViewSecond: { width: width * 0.9 },
  tipText: {
    color: '#757575',
    fontFamily: 'NotoSans-Regular',
    fontSize: 12,
    lineHeight: 20,
    marginTop: 16,
  },
  stateGradeTextViewStyle: { width: width * 0.9, marginTop: 16 },
  stateGradeText: {
    color: '#757575',
    fontSize: 12,
    fontFamily: 'NotoSans-Bold',
    lineHeight: 20,
  },
});
