# 🌙 İftaraKala - Ramazan İmsakiyesi

[![React Native](https://img.shields.io/badge/React%20Native-0.81.5-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-~54.0-000020.svg?style=flat&logo=expo)](https://expo.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/Platform-Android%20%7C%20iOS-lightgrey.svg)](https://github.com/osmanncan/iftarakala-app)

Ramazan ayı boyunca namaz vakitleri, iftar ve sahur saatleri için dinamik imsakiye sunan modern bir React Native uygulaması. Müslümanlara Ramazan ayında rehberlik etmek için tasarlanmış kapsamlı özellikler içerir.

<p align="center">
  <img src="https://img.shields.io/badge/Status-Active-success" alt="Status">
  <img src="https://img.shields.io/badge/Maintained-Yes-success" alt="Maintained">
</p>

---

## ✨ Özellikler

### 🕌 Namaz ve İbadet
- ✨ **Dinamik İmsakiye** - Bulunduğunuz şehre göre otomatik namaz vakitleri hesaplama
- 📍 **Konum Bazlı Servis** - GPS kullanarak otomatik şehir tespiti
- 🕌 **Beş Vakit Namaz** - İmsak, Güneş, Öğle, İkindi, Akşam ve Yatsı vakitleri
- ⏰ **İftar ve Sahur Saatleri** - Ramazan ayına özel günlük saatler
- 📿 **Dijital Tesbih** - Zikir sayacı ve takibi

### 📅 Takvim ve Bilgi
- 📅 **Ramazan Takvimi** - İslami takvim entegrasyonu ve günlük takip
- 🌙 **İslami Özel Günler** - Mevlid Kandili, Regaip, Miraç gibi önemli günler
- 📖 **Zikir Rehberi** - Ramazan zikirleri, duaları ve anlamları
- ❓ **İslami Sorular** - Ramazan ve oruçla ilgili sıkça sorulan sorular
- 📚 **Eğitici İçerik** - Oruç kuralları ve ibadet rehberi

### 🎨 Kullanıcı Deneyimi
- 🎨 **Modern Arayüz** - Gradient tasarım ve akıcı animasyonlar
- 🌙 **Gece Modu Uyumlu** - Göz dostu renkler
- ⚡ **Hızlı ve Hafif** - Optimize edilmiş performans
- 📱 **Responsive Tasarım** - Tüm ekran boyutlarına uyumlu

---

## 🛠️ Teknoloji Stack

### Frontend & Mobile
- **Framework:** React Native 0.81.5
- **UI Library:** React Native
- **Runtime Platform:** Expo ~54.0
- **Language:** JavaScript (ES6+)

### Navigation & Routing
- **Navigation:** React Navigation 7.x
- **Native Stack:** @react-navigation/native-stack
- **Bottom Tabs:** @react-navigation/bottom-tabs

### Services & APIs
- **Location Service:** Expo Location ~19.0
- **Storage:** AsyncStorage 2.2.0
- **Status Bar:** Expo Status Bar ~3.0
- **Font Loading:** Expo Font ~14.0

### UI Components & Styling
- **Gradients:** React Native Linear Gradient 2.8.3
- **Icons:** React Native Vector Icons 10.3.0, @expo/vector-icons 15.0.3
- **Safe Area:** React Native Safe Area Context ~5.6.0

### Build & Development
- **Build Tool:** EAS (Expo Application Services)
- **Language Support:** TypeScript ~5.9.2
- **Type Definitions:** @types/react ~19.1.10

---

## 📦 Kurulum

### Gereksinimler

Aşağıdaki araçların sisteminizde kurulu olması gerekmektedir:

- **Node.js:** v16.0.0 veya üzeri ([İndir](https://nodejs.org/))
- **npm:** v7.0.0 veya üzeri (Node.js ile birlikte gelir)
- **Expo CLI:** Global olarak kurulmalı
  ```bash
  npm install -g expo-cli
  ```
- **Git:** Versiyon kontrolü için ([İndir](https://git-scm.com/))

#### Platform Gereksinimleri

**Android için:**
- Android Studio
- Android SDK (API Level 21+)
- Android emülatörü veya fiziksel cihaz

**iOS için (yalnızca macOS):**
- Xcode 12+
- iOS Simulator veya fiziksel cihaz
- CocoaPods

### Kurulum Adımları

1️⃣ **Repoyu klonlayın:**
```bash
git clone https://github.com/osmanncan/iftarakala-app.git
cd iftarakala-app
```

2️⃣ **Bağımlılıkları yükleyin:**
```bash
npm install
# veya yarn kullanıyorsanız
yarn install
```

3️⃣ **Expo ortamını başlatın:**
```bash
npm start
# veya
expo start
```

4️⃣ **Platform seçimi:**

Terminal'de açılan QR kodu okutarak veya klavye kısayollarıyla:
- **`a`** - Android emülatör/cihazda çalıştır
- **`i`** - iOS simulator'da çalıştır (yalnızca macOS)
- **`w`** - Web tarayıcıda çalıştır

### Alternatif Çalıştırma Komutları

```bash
# Web üzerinde çalıştırma
npm run web

# Android cihazda doğrudan çalıştırma
npm run android

# iOS cihazda doğrudan çalıştırma (macOS gerekli)
npm run ios
```

---

## 📁 Proje Yapısı

```
iftarakala-app/
├── 📱 App.js                      # Ana uygulama bileşeni ve navigasyon yapısı
├── 📄 index.js                    # Uygulama giriş noktası
├── 📦 package.json                # Bağımlılıklar ve betikler
├── ⚙️ app.json                     # Expo yapılandırması
├── 🔧 eas.json                     # EAS Build yapılandırması
├── 📝 tsconfig.json                # TypeScript yapılandırması
│
├── 📂 src/                         # Kaynak kod dosyaları
│   ├── HomeScreens.js             # 🏠 Ana ekran ve alt navigasyon
│   ├── SplashScreen.js            # 🌟 Açılış/yükleme ekranı
│   ├── PrayersScreens.js          # 🕌 Namaz vakitleri ekranı
│   ├── Calendar.js                # 📅 Ramazan takvimi ve günlük takip
│   ├── IslamDays.js               # 🌙 İslami özel günler
│   ├── Zikir.js                   # 📿 Zikir sayacı ve tesbih
│   ├── Questions.js               # ❓ Sıkça sorulan sorular
│   └── constants.js               # 🔐 Sabit değerler ve yapılandırmalar
│
├── 📂 assets/                      # Medya dosyaları
│   ├── icon.png                   # Uygulama ikonu
│   ├── splash.png                 # Splash screen görseli
│   └── ...                        # Diğer görseller
│
├── 📂 android/                     # Android native kod
│   ├── app/                       # Ana uygulama modülü
│   │   ├── src/main/              # Ana kaynak kodlar
│   │   │   ├── AndroidManifest.xml
│   │   │   ├── java/com/          # Java/Kotlin dosyaları
│   │   │   └── res/               # Android kaynakları
│   │   └── build.gradle           # Uygulama build yapılandırması
│   ├── build.gradle               # Proje build yapılandırması
│   ├── settings.gradle            # Gradle ayarları
│   └── gradle.properties          # Gradle özellikleri
│
├── 📂 iftarakala-privacy/         # Gizlilik politikası sayfası
│   └── index.html
│
├── 📄 privacy-policy.html         # Gizlilik politikası
└── 📄 README.md                   # Proje dokümantasyonu

```

### Dosya Açıklamaları

| Dosya/Klasör | Açıklama |
|-------------|----------|
| `App.js` | Ana uygulama bileşeni, navigation container ve route yapılandırması |
| `src/HomeScreens.js` | Alt navigasyon ve ana ekran yönetimi |
| `src/PrayersScreens.js` | Namaz vakitlerini API'den çekip gösteren ekran |
| `src/Calendar.js` | Ramazan takvimi ve günlük iftar/sahur saatleri |
| `src/Zikir.js` | İnteraktif dijital tesbih ve zikir sayacı |
| `src/constants.js` | API endpoint'leri ve sabit değerler |
| `android/` | Android platform spesifik native kodlar |
| `assets/` | İkonlar, görseller ve splash screen |

---

## 🎯 Temel Ekranlar ve Özellikler

### 🏠 Ana Ekran (HomeScreens)
- Bottom tab navigation ile hızlı geçiş
- Kullanıcı dostu arayüz
- Gradient arka plan tasarımı
- Ana menü ve hızlı erişim butonları

### 🕌 Namaz Vakitleri (PrayersScreens)
- **Gerçek zamanlı hesaplama:** Konum bazlı otomatik vakit belirleme
- **6 Vakit Gösterimi:** İmsak, Güneş, Öğle, İkindi, Akşam, Yatsı
- **Kalan Süre:** Bir sonraki namaz vaktine kalan süre göstergesi
- **Otomatik Güncelleme:** Gece yarısı otomatik vakit güncelleme
- **Bildirimler:** (Planlanan özellik) Vakit girdiğinde bildirim

### 📅 Ramazan Takvimi (Calendar)
- **Günlük İmsakiye:** Tüm Ramazan ayı için günlük sahur ve iftar saatleri
- **Geri Sayım:** İftara kalan süre canlı takip
- **Hijri Takvim:** İslami takvim entegrasyonu
- **Bugünün Vurgulanması:** Mevcut günün özel işaretlenmesi
- **Scroll Navigation:** Kolay tarih gezinme

### 🌙 İslami Günler (IslamDays)
- **Özel Günler:** Regaib, Miraç, Berat, Kadir gecesi gibi önemli günler
- **Açıklamalar:** Her günün önemi ve anlamı
- **Tarih Bilgisi:** Miladi ve Hijri tarih gösterimi
- **İbadet Rehberi:** Özel günlerde yapılacak ibadetler

### 📿 Zikir ve Tesbih (Zikir)
- **Dijital Sayaç:** Dokunmatik zikir sayma
- **Çoklu Zikir:** Farklı zikir türleri için ayrı sayaçlar
- **Progress Tracking:** İlerleme kaydetme
- **Reset Özelliği:** Sayaçları sıfırlama
- **Ses Geri Bildirimi:** (Opsiyonel) Titreşim/ses efekti

### ❓ Sorular (Questions)
- **S.S.S:** Ramazan ve oruçla ilgili sık sorulan sorular
- **Detaylı Cevaplar:** Kaynaklı ve açıklayıcı cevaplar
- **Kategori Sistemi:** Konu bazlı gruplama
- **Arama Özelliği:** (Planlanan) İçerik içinde arama

### 🌟 Splash Screen
- **Yükleme Animasyonu:** Uygulama açılışında profesyonel görünüm
- **Font Yükleme:** Custom fontların asenkron yüklenmesi
- **Konum İzni:** İlk açılışta konum izni kontrolü

---

## � API ve Servisler

### Namaz Vakitleri API
Uygulama, namaz vakitlerini almak için harici API kullanır:

```javascript
// constants.js içinde tanımlı
const PRAYER_TIMES_API = 'https://api.example.com/prayer-times';
```

**Kullanılan Endpoint'ler:**
- Günlük namaz vakitleri
- Aylık imsakiye verileri
- Şehir bazlı konum verileri

### Konum Servisleri
- **Expo Location:** GPS koordinatları alma
- **Reverse Geocoding:** Koordinatlardan şehir bilgisi çıkarma
- **İzin Yönetimi:** Kullanıcı konum izni kontrolü

### Veri Depolama
- **AsyncStorage:** Kullanıcı tercihlerini ve cache verilerini yerel olarak saklama
- **Konum Cache:** Son bilinen konumu hafızada tutma
- **Offline Support:** İnternet bağlantısı olmadan temel işlevsellik

---

## 🚀 Build ve Deployment

### Development Build

```bash
# Development build oluştur
expo build:android -t apk
expo build:ios -t simulator
```

### Production Build (EAS ile)

1. **EAS CLI'yi kurun:**
```bash
npm install -g eas-cli
```

2. **EAS hesabınıza giriş yapın:**
```bash
eas login
```

3. **Build konfigürasyonu:**
```bash
eas build:configure
```

4. **Android Production Build:**
```bash
eas build --platform android --profile production
```

5. **iOS Production Build:**
```bash
eas build --platform ios --profile production
```

### APK Oluşturma

```bash
# Android için APK
cd android
./gradlew assembleRelease

# Çıktı: android/app/build/outputs/apk/release/app-release.apk
```

### Play Store ve App Store Yayınlama

**Google Play Store için:**
1. Google Play Console'da uygulama oluştur
2. Signing key yapılandır
3. APK/AAB yükle
4. Store listing bilgilerini doldur
5. İncelemeye gönder

**Apple App Store için:**
1. App Store Connect'te uygulama oluştur
2. Xcode ile Archive oluştur
3. TestFlight'a yükle
4. Metadata ve screenshots ekle
5. İncelemeye gönder

---

## 🔐 Gizlilik ve Güvenlik

### Veri Gizliliği
Bu uygulama kullanıcı gizliliğini ön planda tutar:

✅ **Toplanan Veriler:**
- Konum bilgisi (yalnızca namaz vakti hesaplama için)
- Uygulama içi tercihler

❌ **Toplanmayan Veriler:**
- Kişisel kimlik bilgileri
- İletişim bilgileri
- Finansal bilgiler
- Tarama geçmişi

### Veri Kullanımı
- **Konum:** Yalnızca namaz vakitlerini hesaplamak için kullanılır
- **Depolama:** Tüm veriler cihazda yerel olarak saklanır
- **Paylaşım:** Hiçbir veri üçüncü taraflarla paylaşılmaz
- **Analitik:** Anonim kullanım istatistikleri (opsiyonel)

### Güvenlik Önlemleri
- HTTPS üzerinden güvenli API iletişimi
- Hassas verilerin şifrelenmesi
- Güvenli depolama best practices
- Düzenli güvenlik güncellemeleri

**Detaylı bilgi için:** [privacy-policy.html](privacy-policy.html)

---

## 🧪 Test ve Kalite

### Manuel Test
```bash
# Uygulamayı test modunda çalıştır
npm start
```

### Linting
```bash
# ESLint ile kod kontrolü (gelecekte eklenecek)
npm run lint
```

### Debug Mode
- Chrome DevTools ile debug
- React Native Debugger kullanımı
- Expo Developer Tools

---

## 🛠️ Geliştirme Rehberi

### Yeni Özellik Ekleme

1. **Yeni Ekran Eklemek:**
```javascript
// src/YeniEkran.js dosyası oluştur
import React from 'react';
import { View, Text } from 'react-native';

export default function YeniEkran() {
  return (
    <View>
      <Text>Yeni Ekran</Text>
    </View>
  );
}
```

2. **Navigation'a Eklemek:**
```javascript
// App.js içinde
import YeniEkran from './src/YeniEkran';

<Stack.Screen name="YeniEkran" component={YeniEkran} />
```

### Kod Stili ve Best Practices

#### ✅ Yapılması Gerekenler
- **Fonksiyonel Bileşenler:** Class component yerine function component kullan
- **React Hooks:** useState, useEffect gibi hook'ları kullan
- **Anlamlı İsimler:** Değişken ve fonksiyonlara açıklayıcı isimler ver
- **Modüler Kod:** Büyük bileşenleri küçük parçalara böl
- **Yorum Satırları:** Karmaşık mantık için açıklayıcı yorumlar ekle
- **Error Handling:** Try-catch blokları ile hata yönetimi

#### ❌ Yapılmaması Gerekenler
- Console.log'ları production'da bırakma
- Hardcoded değerler kullanma
- Inline style'ları fazla kullanma
- API key'leri kodda saklamafazla tekrar eden kod yazma

### Örnek Kod Yapısı

```javascript
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ExampleComponent() {
  // State tanımlamaları
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect ile veri çekme
  useEffect(() => {
    fetchData();
  }, []);

  // Yardımcı fonksiyonlar
  const fetchData = async () => {
    try {
      setLoading(true);
      // API çağrısı
      const response = await fetch('API_URL');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Hata:', error);
    } finally {
      setLoading(false);
    }
  };

  // Render
  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Yükleniyor...</Text>
      ) : (
        <Text>{data}</Text>
      )}
    </View>
  );
}

// Stil tanımlamaları
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```

---

## 🤝 Katkıda Bulunma

Projeye katkıda bulunmak isterseniz, aşağıdaki adımları takip edin:

### Katkı Süreci

1. **Fork Edin**
   - Projeyi GitHub'da fork edin
   - Kendi hesabınıza kopyalayın

2. **Klonlayın**
```bash
git clone https://github.com/[kullanici-adi]/iftarakala-app.git
cd iftarakala-app
```

3. **Branch Oluşturun**
```bash
git checkout -b feature/harika-ozellik
# veya
git checkout -b fix/hata-duzeltmesi
```

4. **Değişiklikleri Yapın**
   - Kodunuzu yazın
   - Test edin
   - Commit edin

5. **Commit Edin**
```bash
git add .
git commit -m "feat: Harika özellik eklendi"
```

**Commit Mesaj Formatı:**
- `feat:` Yeni özellik
- `fix:` Hata düzeltmesi
- `docs:` Dokümantasyon
- `style:` Kod formatı
- `refactor:` Kod yeniden yapılandırma
- `test:` Test ekleme
- `chore:` Bakım işleri

6. **Push Edin**
```bash
git push origin feature/harika-ozellik
```

7. **Pull Request Oluşturun**
   - GitHub'da Pull Request açın
   - Değişikliklerinizi açıklayın
   - Review bekleyin

### Katkı Kuralları

- ✅ Kod standartlarına uyun
- ✅ Açıklayıcı commit mesajları yazın
- ✅ Her özellik için ayrı branch kullanın
- ✅ Test edin ve çalıştığından emin olun
- ✅ Dokümantasyonu güncelleyin
- ❌ Ana branch'e doğrudan push yapmayın
- ❌ Büyük değişiklikleri tek commit'te yapmayın

### İletişim ve Destek

Sorularınız için:
- 🐛 **Bug Report:** [GitHub Issues](https://github.com/osmanncan/iftarakala-app/issues)
- 💡 **Feature Request:** [GitHub Discussions](https://github.com/osmanncan/iftarakala-app/discussions)
- 📧 **Email:** osmancann25@gmail.com

---

## 📄 Lisans

Bu proje **MIT Lisansı** altında lisanslanmıştır.

```
MIT License

Copyright (c) 2026 Osmancan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

Detaylar için [LICENSE](LICENSE) dosyasına bakabilirsiniz.

---

## 👨‍💻 Geliştirici

<div align="center">

### **Osmancan** 🚀

[![GitHub](https://img.shields.io/badge/GitHub-osmanncan-181717?style=for-the-badge&logo=github)](https://github.com/osmanncan)
[![Email](https://img.shields.io/badge/Email-osmancann25@gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:osmancann25@gmail.com)

*React Native Developer | Mobile App Enthusiast*

</div>

---

## 🙏 Teşekkürler

Bu projenin geliştirilmesinde katkıda bulunan ve ilham veren herkese teşekkürler:

### Açık Kaynak Topluluğu
- 🎨 **React Native Team** - Muhteşem framework için
- 📦 **Expo Team** - Geliştirmeyi kolaylaştıran araçlar için
- 🧭 **React Navigation** - Sorunsuz navigasyon için
- 🌟 **Tüm Paket Geliştiricileri** - Kullanılan kütüphaneler için

### İçerik ve Kaynaklar
- 📖 **Diyanet İşleri Başkanlığı** - Namaz vakitleri ve İslami bilgiler için
- 🕌 **İslami Web Siteleri** - Eğitici içerikler için
- 📚 **Açık Kaynak Projeleri** - İlham ve öğrenme için

### Topluluk
- 💬 **Stack Overflow** - Sorun çözümleri için
- 🎓 **React Native Community** - Destek ve rehberlik için
- 👥 **Tüm Katkıda Bulunanlar** - Pull request'ler ve bug report'lar için

---

## 📊 Proje İstatistikleri

<div align="center">

![GitHub Stars](https://img.shields.io/github/stars/osmanncan/iftarakala-app?style=social)
![GitHub Forks](https://img.shields.io/github/forks/osmanncan/iftarakala-app?style=social)
![GitHub Issues](https://img.shields.io/github/issues/osmanncan/iftarakala-app)
![GitHub Pull Requests](https://img.shields.io/github/issues-pr/osmanncan/iftarakala-app)

</div>

---

## 🔄 Versiyon Geçmişi

### 📌 v1.0.0 (Mevcut Versiyon) - Ocak 2026
**İlk Kararlı Sürüm**
- ✅ Namaz vakitleri entegrasyonu
- ✅ Ramazan takvimi
- ✅ İslami özel günler
- ✅ Dijital tesbih/zikir sayacı
- ✅ Soru-Cevap bölümü
- ✅ Konum bazlı servisler
- ✅ Modern UI/UX tasarımı

### 🚧 Gelecek Güncellemeler (Roadmap)

**v1.1.0 - Planlanan**
- 🔔 Push notification desteği
- 🌙 Karanlık mod (Dark mode)
- 🔊 Ezan sesi ve uyarılar
- 📍 Kıble yönü göstergesi
- 💾 Bulut senkronizasyonu

**v1.2.0 - Düşünülen**
- 🌍 Çoklu dil desteği (İngilizce, Arapça)
- 📊 İstatistikler ve raporlar
- 🤲 Dua koleksiyonu genişletmesi
- 📖 Kur'an-ı Kerim entegrasyonu (Meal)
- 👥 Sosyal özellikler ve paylaşım

---

## 📞 İletişim ve Destek

<div align="center">

### Bizimle İletişime Geçin

📧 **Email:** [osmancann25@gmail.com](mailto:osmancann25@gmail.com)  
🐙 **GitHub:** [@osmanncan](https://github.com/osmanncan)  
🐛 **Bug Reports:** [GitHub Issues](https://github.com/osmanncan/iftarakala-app/issues)  
💬 **Discussions:** [GitHub Discussions](https://github.com/osmanncan/iftarakala-app/discussions)

---

### ⭐ Projeyi Beğendiniz mi?

Eğer bu proje işinize yaradıysa, lütfen ⭐ **Star** vererek destekleyin!  
Bu bizi motive eder ve projenin gelişmesine katkıda bulunur.

---

</div>

## 📱 Ekran Görüntüleri

> 📸 Ekran görüntüleri yakında eklenecek

<div align="center">

| Ana Ekran | Namaz Vakitleri | Ramazan Takvimi |
|-----------|----------------|-----------------|
| Coming Soon | Coming Soon | Coming Soon |

| İslami Günler | Zikir Sayacı | Sorular |
|--------------|--------------|---------|
| Coming Soon | Coming Soon | Coming Soon |

</div>

---

## ⚠️ Bilinen Sorunlar

- 📍 iOS'ta konum izni ilk seferde verilmezse manuel yenileme gerekebilir
- 🔄 Bazı eski Android cihazlarda performans sorunları olabilir
- 🌐 Offline modda namaz vakitleri güncellenemeyebilir

**Sorun bildirmek için:** [Issues](https://github.com/osmanncan/iftarakala-app/issues) sayfasını kullanın.

---

## 💡 Sıkça Sorulan Sorular (FAQ)

**S: Uygulama hangi platformlarda çalışır?**  
C: iOS, Android ve Web'de çalışır.

**S: İnternet bağlantısı gerekli mi?**  
C: İlk kurulumda ve namaz vakitleri güncellemeleri için gereklidir. Daha sonra offline kullanılabilir.

**S: Konum bilgim paylaşılıyor mu?**  
C: Hayır, konum bilginiz sadece cihazınızda kullanılır ve hiçbir yere gönderilmez.

**S: Uygulama ücretsiz mi?**  
C: Evet, tamamen ücretsiz ve açık kaynak kodludur.

**S: Nasıl katkıda bulunabilirim?**  
C: Yukarıdaki "Katkıda Bulunma" bölümüne bakın veya GitHub'da pull request gönderin.

---

<div align="center">

## 🌙 Ramazan Mübarek Olsun! 

**"Allah'ım, bize Recep ve Şaban aylarını ulaştır ve Ramazan'a kavuştur."**  
*(Hz. Peygamber - SAV)*

---

[![Made with ❤️ by Osmancan](https://img.shields.io/badge/Made%20with%20%E2%9D%A4%EF%B8%8F%20by-Osmancan-red)](https://github.com/osmanncan)

**Son Güncelleme:** Ocak 2026  
**Versiyon:** 1.0.0  
**Durum:** 🟢 Aktif Geliştirme

---

⭐ **Projeyi beğendiyseniz yıldız vermeyi unutmayın!** ⭐

</div>
