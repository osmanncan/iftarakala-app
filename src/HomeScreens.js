import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, StatusBar, Modal, ActivityIndicator, Animated, Easing } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

import Calendar from './Calendar';
import PrayersScreens from './PrayersScreens';
import Zikir from './Zikir';
import IslamDays from './IslamDays';
import Assistant from './Assistant';
import { CITIES } from './constants';
import RatingPrompt, { incrementUsageAndCheckMilestone } from './RatingPrompt';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

// Reklam Birim Kimlikleri (AdMob Panelinden aldığınızla değiştirin)
// Banner ID aşağıda kullanılıyor


export default function HomeScreens() {
  const insets = useSafeAreaInsets();

  const [activeTab, setActiveTab] = useState('home');
  const [city, setCity] = useState({ name: 'İstanbul', key: 'Istanbul' });
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [notification, setNotification] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [monthlySchedule, setMonthlySchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState("00:00:00");
  const [nextPrayerLabel, setNextPrayerLabel] = useState("Yükleniyor...");
  const [todayDate, setTodayDate] = useState(null);
  const [showRating, setShowRating] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);

  const showNotification = (type, message, duration = 3000) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), duration);
  };



  useEffect(() => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [activeTab]);


  const tabOrder = ['home', 'calendar', 'gunler', 'zikir', 'dua', 'asistan'];

  useEffect(() => {
    loadCity();
    checkRatingMilestone();
  }, []);

  // Session bazlı rating kontrolü
  const checkRatingMilestone = async () => {
    const result = await incrementUsageAndCheckMilestone();
    setSessionCount(result.count);
    if (result.shouldShowRating) {
      // 2 saniye bekle, uygulama yüklensin
      setTimeout(() => {
        setShowRating(true);
      }, 2000);
    }
  };

  const loadCity = async () => {
    setLoading(true);

    const savedCity = await AsyncStorage.getItem('selectedCity');
    if (savedCity) {
      const cityData = JSON.parse(savedCity);
      setCity(cityData);
      showNotification('success', `${cityData.name} şehri yüklendi`);
      setLoading(false);
      return;
    }

    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      showNotification('warning', 'Konum izni verilmedi. Varsayılan: İstanbul', 4000);
      setLoading(false);
      return;
    }

    try {
      showNotification('info', 'Konumunuz alınıyor...', 2000);

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        timeout: 15000
      });

      const geocode = await Location.reverseGeocodeAsync(location.coords);
      const locationName = geocode[0]?.region || geocode[0]?.city || geocode[0]?.adminArea;

      if (locationName) {
        const matchedCity = findCity(locationName);

        if (matchedCity) {
          setCity(matchedCity);
          await AsyncStorage.setItem('selectedCity', JSON.stringify(matchedCity));
          showNotification('success', `${matchedCity.name} konumu tespit edildi`, 3000);
        } else {
          showNotification('warning', `${locationName} listede bulunamadı. Menüden seçebilirsiniz.`, 5000);
        }
      }
    } catch (error) {
      console.log('Konum hatası:', error);
      showNotification('warning', 'Konum alınamadı. Varsayılan: İstanbul', 4000);
    }

    setLoading(false);
  };

  const findCity = (locationName) => {
    const normalize = (text) => text
      .toLowerCase()
      .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
      .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c');

    const normalizedLocation = normalize(locationName);
    return CITIES.find(c =>
      normalize(c.name) === normalizedLocation ||
      normalize(c.key) === normalizedLocation
    );
  };

  useEffect(() => {
    fetchPrayerTimes();
  }, [city]);

  const fetchPrayerTimes = async () => {
    setLoading(true);
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    try {
      const response = await fetch(
        `https://api.aladhan.com/v1/calendarByCity?city=${city.key}&country=Turkey&method=13&month=${month}&year=${year}`
      );
      const data = await response.json();

      if (data.code === 200) {
        setMonthlySchedule(data.data);

        const todayString = `${date.getDate().toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;
        const todayData = data.data.find(d => d.date.gregorian.date === todayString);

        if (todayData) {
          setPrayerTimes(todayData.timings);
          const [day, mon, yr] = todayData.date.gregorian.date.split('-');
          setTodayDate(new Date(yr, mon - 1, day, 0, 0, 0));
        }
      }
    } catch (error) {
      showNotification('warning', 'İnternet bağlantısı kurulamadı', 4000);
      setNextPrayerLabel("Bağlantı hatası");
    }

    setLoading(false);
  };

  useEffect(() => {
    if (!prayerTimes || !todayDate) return;

    const timer = setInterval(() => {
      const now = new Date();

      const getTime = (timeStr) => {
        const [hour, minute] = timeStr.split(' ')[0].split(':').map(Number);
        return new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate(), hour, minute, 0);
      };

      const sahurTime = getTime(prayerTimes.Fajr);
      const iftarTime = getTime(prayerTimes.Maghrib);

      let targetTime;
      let label;

      if (now >= sahurTime && now < iftarTime) {
        targetTime = iftarTime;
        label = "İFTARA KALAN SÜRE";
      } else {
        label = "SAHURA KALAN SÜRE";

        if (now < sahurTime) {
          targetTime = sahurTime;
        } else {
          const tomorrow = new Date(todayDate);
          tomorrow.setDate(tomorrow.getDate() + 1);

          const tomorrowStr = `${tomorrow.getDate().toString().padStart(2, '0')}-${(tomorrow.getMonth() + 1).toString().padStart(2, '0')}-${tomorrow.getFullYear()}`;
          const nextDay = monthlySchedule.find(d => d.date.gregorian.date === tomorrowStr);

          const nextSahur = nextDay ? nextDay.timings.Fajr : prayerTimes.Fajr;
          targetTime = getTime(nextSahur);
          targetTime.setDate(tomorrow.getDate());
        }
      }
      const diff = targetTime - now;
      if (diff > 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        setNextPrayerLabel(label);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [prayerTimes, monthlySchedule, todayDate]);

  const renderHome = () => (
    <View style={styles.centerContent}>
      {loading ? (
        <ActivityIndicator size="large" color="#EAB308" />
      ) : (
        <>
          <Text style={styles.subHeader}>{city.name} için</Text>
          <Text style={styles.mainHeader}>{nextPrayerLabel}</Text>

          <View style={styles.timerCircle}>
            <Text style={styles.timerText}>{timeLeft}</Text>
            <Ionicons name="moon" size={20} color="#FACC15" style={{ marginTop: 8, opacity: 0.4 }} />
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>İmsak</Text>
              <Text style={styles.infoValue}>{prayerTimes?.Fajr.split(' ')[0] || '--:--'}</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>İftar</Text>
              <Text style={[styles.infoValue, { color: '#FACC15' }]}>
                {prayerTimes?.Maghrib.split(' ')[0] || '--:--'}
              </Text>
            </View>
          </View>

          <Text style={styles.warningText}>
            Not: Bulunduğunuz lokasyona göre sahur ve iftar saati 1-2 dakika farklılık gösterebilir. Lütfen ezanın okunmasına dikkat ediniz.
          </Text>
        </>
      )}
    </View>
  );

  const handleCitySelect = async (selectedCity) => {
    setCity(selectedCity);
    setIsMenuVisible(false);
    showNotification('success', `${selectedCity.name} seçildi`, 2000);
    await AsyncStorage.setItem('selectedCity', JSON.stringify(selectedCity));
  };

  const getNotificationStyle = (type) => {
    if (type === 'success') return { backgroundColor: '#16A34A' };
    if (type === 'warning') return { backgroundColor: '#D97706' };
    return { backgroundColor: '#0284C7' };
  };

  const getNotificationIcon = (type) => {
    if (type === 'success') return 'checkmark-circle';
    if (type === 'warning') return 'warning';
    return 'information-circle';
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="moon" size={24} color="#FACC15" />
          <Text style={styles.headerTitle}>Hayırlı Ramazanlar</Text>
        </View>
        <TouchableOpacity onPress={() => setIsMenuVisible(true)}>
          <Ionicons name="menu" size={28} color="#FFF" />
        </TouchableOpacity>
      </View>

      {notification && (
        <View style={[styles.notificationBanner, getNotificationStyle(notification.type)]}>
          <Ionicons name={getNotificationIcon(notification.type)} size={20} color="#FFF" />
          <Text style={styles.notificationText}>{notification.message}</Text>
        </View>
      )}

      <Modal visible={isMenuVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Şehir Seç</Text>
              <TouchableOpacity onPress={() => setIsMenuVisible(false)}>
                <Ionicons name="close" size={24} color="#FFF" />
              </TouchableOpacity>
            </View>
            <ScrollView>
              {CITIES.map((c) => (
                <TouchableOpacity
                  key={c.key}
                  style={[styles.cityButton, city.key === c.key && styles.activeCityButton]}
                  onPress={() => handleCitySelect(c)}
                >
                  <Text style={[styles.cityText, city.key === c.key && { color: '#FFF' }]}>
                    {c.name}
                  </Text>
                  {city.key === c.key && <Ionicons name="checkmark" size={20} color="#FFF" />}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Session bazlı Rating Prompt */}
      <RatingPrompt
        visible={showRating}
        onClose={() => setShowRating(false)}
        message={`Uygulamayı ${sessionCount}. kez açtınız! 🌙`}
      />

      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {activeTab === 'home' && renderHome()}
        {activeTab === 'calendar' && <Calendar loading={loading} monthlySchedule={monthlySchedule} />}
        {activeTab === 'dua' && <PrayersScreens />}
        {activeTab === 'zikir' && <Zikir />}
        {activeTab === 'gunler' && <IslamDays />}
        {activeTab === 'asistan' && <Assistant />}
      </Animated.View>

      <View style={styles.adContainer}>
        {/* AdMob only works in native builds, this check prevents crash in Expo Go */}
        {(BannerAd && TestIds.BANNER) ? (
          <BannerAd
            unitId={__DEV__ ? TestIds.BANNER : process.env.EXPO_PUBLIC_AD_BANNER_UNIT_ID}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
            onAdFailedToLoad={(error) => console.log('Ad failed to load: ', error)}
          />
        ) : (
          <View style={{ height: 50, justifyContent: 'center' }}>
            <Text style={{ color: '#64748B', fontSize: 10 }}>Reklam Alanı (Sadece Native Modda)</Text>
          </View>
        )}
      </View>

      <View style={[styles.tabBar, { paddingBottom: Math.max(insets.bottom, 8) }]}>
        <TouchableOpacity onPress={() => setActiveTab('home')} style={styles.tabItem}>
          <Ionicons name="time" size={24} color={activeTab === 'home' ? '#FACC15' : '#64748B'} />
          <Text style={styles.tabText}>Vakit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('calendar')} style={styles.tabItem}>
          <Ionicons name="calendar" size={24} color={activeTab === 'calendar' ? '#FACC15' : '#64748B'} />
          <Text style={styles.tabText}>İmsakiye</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('gunler')} style={styles.tabItem}>
          <Ionicons name="star-outline" size={24} color={activeTab === 'gunler' ? '#FACC15' : '#64748B'} />
          <Text style={styles.tabText}>Dini Günler</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('zikir')} style={styles.tabItem}>
          <Ionicons name="add-circle-outline" size={24} color={activeTab === 'zikir' ? '#FACC15' : '#64748B'} />
          <Text style={styles.tabText}>Zikir</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('dua')} style={styles.tabItem}>
          <Ionicons name="book" size={24} color={activeTab === 'dua' ? '#FACC15' : '#64748B'} />
          <Text style={styles.tabText}>Dualar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('asistan')} style={styles.tabItem}>
          <Ionicons name="chatbubbles" size={24} color={activeTab === 'asistan' ? '#FACC15' : '#64748B'} />
          <Text style={styles.tabText}>Asistan</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1E293B',
    borderBottomWidth: 1,
    borderBottomColor: '#334155'
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#EAB308',
    marginLeft: 8
  },
  notificationBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8
  },
  notificationText: {
    color: '#FFF',
    fontSize: 14,
    flex: 1,
    fontWeight: '500'
  },
  content: {
    flex: 1
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  subHeader: {
    color: '#94A3B8',
    fontSize: 23,
    marginBottom: 4
  },
  mainHeader: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 22
  },
  timerCircle: {
    width: 285,
    height: 285,
    borderRadius: 142.5,
    borderWidth: 11,
    borderColor: '#334155',
    backgroundColor: '#1E293B',
    shadowColor: '#FACC15',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32
  },
  timerText: {
    fontSize: 46,
    fontWeight: 'bold',
    color: '#FACC15'
  },
  infoRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20
  },
  infoBox: {
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    width: 130,
    borderWidth: 2,
    borderColor: '#334155',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5
  },
  infoLabel: {
    color: '#94A3B8',
    fontSize: 12
  },
  infoValue: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 4
  },
  warningText: {
    color: '#94A3B8',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
    lineHeight: 16
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: '#1E293B',
    width: '80%',
    maxHeight: '80%',
    borderRadius: 12,
    padding: 16
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  modalTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold'
  },
  cityButton: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  activeCityButton: {
    backgroundColor: '#A16207',
    borderRadius: 8
  },
  cityText: {
    color: '#CBD5E1',
    fontSize: 16
  },
  adContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F172A',
    width: '100%'
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#1E293B',
    borderTopWidth: 1,
    borderTopColor: '#334155',
    paddingTop: 0,
    position: 'relative'
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8
  },
  tabText: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 4
  },
});
