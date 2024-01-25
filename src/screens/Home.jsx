import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Carousel from 'react-native-snap-carousel';
import {freeGames, paidGames, sliderData} from '../model/data';
import BannerSlider from '../components/BannerSlider';
import {windowWidth} from '../utils/Dimensions';
import CustomSwitch from '../components/CustomSwitch';
import {useEffect, useState} from 'react';
import ListItem from '../components/ListItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({navigation}) => {
  const [userData, setUserData] = useState([]);
  const [gamesTab, setGamesTab] = useState(1);
  const renderBanner = ({item, index}) => {
    return <BannerSlider data={item} />;
  };

  const onSelectSwitch = value => {
    setGamesTab(value);
  };

  const getData = async () => {
    let data = await AsyncStorage.getItem('user');
    if (data) {
      data = JSON.parse(data);
      console.log(data,"I am data");
      setUserData(data);
      console.log(userData,"i am user data");
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <SafeAreaView style={styles.SafeViewStyle}>
      <ScrollView style={{padding: 20}}>
        <View style={styles.container}>
          <Text style={{fontSize: 18, fontFamily: 'Roboto-Medium'}}>
            Hello,{userData.fullname}
          </Text>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <ImageBackground
              source={require('../assets/images/user-profile.jpg')}
              style={{width: 35, height: 35}}
              imageStyle={{borderRadius: 25}}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            borderColor: '#C6C6C6',
            borderWidth: 1,
            borderRadius: 10,
            paddingHorizontal: 10,
            paddingVertical: 2,
          }}>
          <Feather
            name="search"
            size={20}
            color="#C6C6C6"
            style={{marginRight: 5, marginTop: 14}}
          />
          <TextInput placeholder="Search" />
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 15,
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 18, fontFamily: 'Roboto-Medium'}}>
            Upcoming Games
          </Text>
          <TouchableOpacity>
            <Text style={{color: '#8aada8'}}>See all</Text>
          </TouchableOpacity>
        </View>
        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          data={sliderData}
          renderItem={renderBanner}
          sliderWidth={windowWidth - 40}
          itemWidth={300}
          loop={true}
        />
        <View style={{marginVertical: 20}}>
          <CustomSwitch
            selectionMode={1}
            option1="Free to play"
            option2="Paid games"
            onSelectSwitch={onSelectSwitch}
          />
        </View>
        {gamesTab == 1 &&
          freeGames.map(item => (
            <ListItem
              key={item.id}
              photo={item.poster}
              title={item.title}
              subtitle={item.subtitle}
              isFree={item.isFree}
              price={item.price}
              onPress={() =>
                navigation.navigate('GameDetails', {
                  title: item.title,
                  id: item.id,
                })
              }
            />
          ))}
        {gamesTab == 2 &&
          paidGames.map(item => (
            <ListItem
              key={item.id}
              photo={item.poster}
              title={item.title}
              subtitle={item.subtitle}
              isFree={item.isFree}
              price={item.price}
              onPress={() =>
                navigation.navigate('GameDetails', {
                  title: item.title,
                  id: item.id,
                })
              }
            />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  SafeViewStyle: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});
