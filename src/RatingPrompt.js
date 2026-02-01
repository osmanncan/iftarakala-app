import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Linking, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as StoreReview from 'expo-store-review';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RATING_STORAGE_KEY = 'rating_prompt_status';
const APP_USAGE_COUNT_KEY = 'app_usage_count';

// Rating durumlarını kontrol etmek için yardımcı fonksiyonlar
export const checkShouldShowRating = async () => {
  try {
    const status = await AsyncStorage.getItem(RATING_STORAGE_KEY);
    if (status === 'never_show') return false;
    
    // Daha önce değerlendirdiyse veya "daha sonra" dediyse
    if (status === 'rated') return false;
    
    // "Daha sonra" dediyse, en az 3 gün bekle
    if (status) {
      const lastPrompt = JSON.parse(status);
      if (lastPrompt.action === 'later') {
        const daysSince = (Date.now() - lastPrompt.timestamp) / (1000 * 60 * 60 * 24);
        if (daysSince < 3) return false;
      }
    }
    
    return true;
  } catch {
    return true;
  }
};

export const incrementUsageCount = async () => {
  try {
    const count = await AsyncStorage.getItem(APP_USAGE_COUNT_KEY);
    const newCount = (parseInt(count) || 0) + 1;
    await AsyncStorage.setItem(APP_USAGE_COUNT_KEY, newCount.toString());
    return newCount;
  } catch {
    return 0;
  }
};

export const getUsageCount = async () => {
  try {
    const count = await AsyncStorage.getItem(APP_USAGE_COUNT_KEY);
    return parseInt(count) || 0;
  } catch {
    return 0;
  }
};

const RatingPrompt = ({ visible, onClose, message = "Hayırlı zikirler! 🌙" }) => {
  
  const handleRate = async () => {
    try {
      // Önce in-app review mümkün mü kontrol et
      const isAvailable = await StoreReview.isAvailableAsync();
      
      if (isAvailable) {
        await StoreReview.requestReview();
      } else {
        // Değilse doğrudan Play Store'a yönlendir
        const storeUrl = Platform.select({
          android: 'https://play.google.com/store/apps/details?id=com.osmancan.iftarakala',
          ios: 'https://apps.apple.com/app/idXXXXXXXXXX', // iOS app ID'nizi buraya ekleyin
        });
        
        if (storeUrl) {
          await Linking.openURL(storeUrl);
        }
      }
      
      await AsyncStorage.setItem(RATING_STORAGE_KEY, 'rated');
      onClose();
    } catch (error) {
      console.log('Rating error:', error);
      onClose();
    }
  };

  const handleLater = async () => {
    await AsyncStorage.setItem(RATING_STORAGE_KEY, JSON.stringify({
      action: 'later',
      timestamp: Date.now()
    }));
    onClose();
  };

  const handleNeverAsk = async () => {
    await AsyncStorage.setItem(RATING_STORAGE_KEY, 'never_show');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Üst kısım - İkon ve mesaj */}
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Ionicons name="star" size={40} color="#FACC15" />
            </View>
            <Text style={styles.title}>{message}</Text>
            <Text style={styles.subtitle}>
              Uygulamamızı beğendiyseniz, 5 saniyenizi ayırıp değerlendirir misiniz? Desteğiniz bizim için çok değerli!
            </Text>
          </View>

          {/* Butonlar */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.primaryButton} onPress={handleRate}>
              <Ionicons name="star" size={20} color="#0F172A" />
              <Text style={styles.primaryButtonText}>Değerlendir</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryButton} onPress={handleLater}>
              <Ionicons name="time-outline" size={18} color="#94A3B8" />
              <Text style={styles.secondaryButtonText}>Daha Sonra</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.textButton} onPress={handleNeverAsk}>
              <Text style={styles.textButtonText}>Bir Daha Sorma</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default RatingPrompt;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#1E293B',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#334155',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FACC15',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    gap: 12,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FACC15',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  primaryButtonText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#334155',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 6,
  },
  secondaryButtonText: {
    fontSize: 15,
    color: '#94A3B8',
    fontWeight: '500',
  },
  textButton: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  textButtonText: {
    fontSize: 14,
    color: '#64748B',
  },
});
