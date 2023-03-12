import React, { useContext } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { LanguageContext } from '../../context';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../src/colors';

export const CH4Explain = () => {
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
          <Text style={[styles.linearGradientText, { marginLeft: width * 0.1812 }]}>5</Text>
          <Text style={[styles.linearGradientText, { marginLeft: width * 0.16 }]}>  10  </Text>
          <Text style={[styles.linearGradientText, { marginLeft: width * 0.16 }]}>  15  </Text>
        </View>
      </View>
      <View style={styles.stateGradeTextViewStyle}>
        <Text style={styles.stateGradeText}>0 - 5 : 정상 / 하늘색</Text>
        <Text style={styles.stateGradeText}>6 - 10 : 위험 / 초록색</Text>
        <Text style={styles.stateGradeText}>11 - 15 : 아주 위험 / 주황색</Text>
        <Text style={styles.stateGradeText}>16 이상 : 나쁨 / 빨강색</Text>
        <Text style={styles.stateGradeText}>(단위: kg/m3)</Text>
      </View>
      <View style={styles.tipTextViewSecond}>
        <Text style={styles.tipText}>지구 상에서 가장 풍부한 유기 화합물로서, 천연가스의 주성분이다.태우면 일산화탄소 및 수소의 방출 등 여러 단계의 화학 반응을 거치면서 물과 이산화 탄소로 바뀌며 1몰(mol)당 891 kJ의 열량을 낸다.</Text>
        <Text style={styles.tipText}>메테인 자체는 냄새가 없으나, 부패 등으로 생성된 경우는 황화수소 등 다른 성분이 섞여서 냄새가 난다. 즉, 방귀가 냄새나는 원인도 메테인 때문은 아니다. 무색무취의 폭발물이라는 점이 위험할 수 있으므로 휴대용 연료 등으로 공급되는 메테인은 새어나갈 때 조기에 인지하고 대처하기 쉽도록 일부러 냄새나는 부취제[3]를 섞는다. 독성은 없지만 폭발 위험이 있고 농도가 높으면 질식의 우려가 있으니 주의해야한다.</Text>
        {/* <Text style={styles.tipText}>{strings.detail_tip_info_contents_co2_2}</Text> */}
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
