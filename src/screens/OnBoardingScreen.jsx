import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import GamingImg from '../assets/gaming.svg'

const OnBoardingScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.safeViewStyle}>
      <View style={{marginTop: 20}}>
        <Text style={styles.GameText}>GAMEON</Text>
      </View>
      <View style={styles.container}>
        <GamingImg
          width={300}
          height={300}
          style={{transform: [{rotate: '-15deg'}]}}
        />
      </View>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.btnText}>Let's Begin</Text>
        <MaterialIcons name="arrow-forward-ios" size={22} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default OnBoardingScreen;

const styles = StyleSheet.create({
  safeViewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  GameText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#283151',
  },
  btn: {
    backgroundColor: '#AD48AF',
    padding: 20,
    width: '90%',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 50,
  },
  btnText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Roboto-MediumItalic',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
