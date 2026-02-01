import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SYSTEM_PROMPT = `Sen, Ramazan ayına özel hazırlanmış bir mobil uygulamada yer alan, nazik, saygılı ve bilgili bir "Dijital İslami Asistan"sın.

GÖREVLERİN:
1. Kullanıcıların oruç, iftar, sahur, teravih, namaz vakitleri, dualar ve genel İslami ahlak ile ilgili sorularını yanıtlamak.
2. Cevaplarını Kuran-ı Kerim ayetleri ve sahih hadisler ışığında, Ehl-i Sünnet görüşüne uygun, birleştirici ve ılımlı bir dille sunmak.
3. Ramazan'ın manevi atmosferine uygun; motive edici, sabrı ve şükrü tavsiye eden bir üslup kullanmak.

KESİN KURALLAR VE SINIRLAR (GÜVENLİK PROTOKOLÜ):
- SEN BİR MÜFTÜ VEYA ALİM DEĞİLSİN: Asla kesin fetva verme (örneğin: "Bu kesin haramdır", "Bu boşanma sebebidir" gibi keskin hukuki/fıkhi hükümlerden kaçın). Bunun yerine "Genel kabul gören görüşe göre...", "Kaynaklarda belirtildiği üzere..." gibi ifadeler kullan.
- HASSAS KONULAR: Boşanma, miras, ticari fıkıh veya karmaşık ailevi meselelerde yüzeysel bilgi verip, mutlaka "Bu konu kişisel durumunuza göre değişebilir, lütfen detaylı bilgi için Alo 190 Fetva Hattı'na veya uzman bir din görevlisine danışınız" uyarısını ekle.
- SİYASET VE TARTIŞMA: Siyasi yorumlardan, mezhepsel tartışmalardan ve ayrıştırıcı dilden kesinlikle uzak dur.
- SAĞLIK: Oruçla ilgili sağlık sorularında (örneğin: "Şeker hastasıyım oruç tutabilir miyim?") asla tıbbi tavsiye verme. "Bu konuda doktorunuza danışmanız ve onun tavsiyesine göre hareket etmeniz dinen en doğrusudur" de.

ÜSLUP:
- Samimi, sıcak ama laubali olmayan, "Siz" diliyle konuşan bir tarzın olsun.
- Cevapların sonuna, konuya uygun kısa bir dua veya "Hayırlı Ramazanlar" temennisi ekle.

Eğer kullanıcı senin alanın dışına çıkan (örneğin futbol, teknoloji, matematik ödevi) bir soru sorarsa: "Ben sadece Ramazan ve İslami konular hakkında sohbet etmek için tasarlandım, ancak dualarınızın kabulünü dilerim." diyerek nazikçe konuyu kapat.`;

// Groq API
const GROQ_API_KEY = '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';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const Assistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Selamün Aleyküm! 🌙\n\nBen İslami Asistanınızım. Ramazan, oruç, namaz, dualar ve İslami konularda sorularınızı yanıtlamak için buradayım.\n\nSize nasıl yardımcı olabilirim?',
      isUser: false,
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef();

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const sendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputText.trim(),
      isUser: true,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [
            {
              role: 'system',
              content: SYSTEM_PROMPT,
            },
            {
              role: 'user',
              content: userMessage.text,
            },
          ],
          temperature: 0.7,
          max_tokens: 1024,
        }),
      });

      const data = await response.json();

      let assistantText = 'Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.';

      if (data.choices && data.choices[0]?.message?.content) {
        assistantText = data.choices[0].message.content;
      } else if (data.error) {
        console.error('API Error:', data.error);
        
        if (data.error.code === 429 || data.error.code === 'rate_limit_exceeded') {
          assistantText = '⏳ Şu an çok fazla istek var. Lütfen birkaç dakika sonra tekrar deneyin.\n\nBu sürede "Sıkça Sorulan Sorular" bölümümüzden faydalanabilirsiniz.';
        } else if (data.error.code === 403) {
          assistantText = '🔐 API erişim hatası. Lütfen daha sonra tekrar deneyin.';
        } else {
          assistantText = 'Bağlantı hatası oluştu. Lütfen internet bağlantınızı kontrol edip tekrar deneyin.';
        }
      }

      const assistantMessage = {
        id: Date.now() + 1,
        text: assistantText,
        isUser: false,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Network Error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Bağlantı hatası oluştu. Lütfen internet bağlantınızı kontrol edip tekrar deneyin.',
        isUser: false,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = (message) => (
    <View
      key={message.id}
      style={[
        styles.messageContainer,
        message.isUser ? styles.userMessageContainer : styles.assistantMessageContainer,
      ]}
    >
      {!message.isUser && (
        <View style={styles.avatarContainer}>
          <Ionicons name="moon" size={20} color="#FACC15" />
        </View>
      )}
      <View
        style={[
          styles.messageBubble,
          message.isUser ? styles.userBubble : styles.assistantBubble,
        ]}
      >
        <Text style={[styles.messageText, message.isUser && styles.userMessageText]}>
          {message.text}
        </Text>
      </View>
      {message.isUser && (
        <View style={styles.userAvatarContainer}>
          <Ionicons name="person" size={18} color="#0F172A" />
        </View>
      )}
    </View>
  );

  const quickQuestions = [
    'Orucu bozan şeyler nelerdir?',
    'Teravih namazı kaç rekattır?',
    'Sahur duası nedir?',
  ];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <View style={styles.headerBar}>
        <Ionicons name="chatbubbles" size={22} color="#FACC15" />
        <Text style={styles.headerTitle}>İslami Asistan</Text>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map(renderMessage)}

        {isLoading && (
          <View style={styles.loadingContainer}>
            <View style={styles.avatarContainer}>
              <Ionicons name="moon" size={20} color="#FACC15" />
            </View>
            <View style={styles.loadingBubble}>
              <ActivityIndicator size="small" color="#FACC15" />
              <Text style={styles.loadingText}>Yanıt hazırlanıyor...</Text>
            </View>
          </View>
        )}

        {messages.length === 1 && (
          <View style={styles.quickQuestionsContainer}>
            <Text style={styles.quickQuestionsTitle}>Hızlı Sorular:</Text>
            {quickQuestions.map((question, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickQuestionButton}
                onPress={() => setInputText(question)}
              >
                <Ionicons name="chatbubble-ellipses-outline" size={16} color="#FACC15" />
                <Text style={styles.quickQuestionText}>{question}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Sorunuzu yazın..."
          placeholderTextColor="#64748B"
          multiline
          maxLength={500}
          editable={!isLoading}
        />
        <TouchableOpacity
          style={[styles.sendButton, (!inputText.trim() || isLoading) && styles.sendButtonDisabled]}
          onPress={sendMessage}
          disabled={!inputText.trim() || isLoading}
        >
          <Ionicons
            name="send"
            size={20}
            color={inputText.trim() && !isLoading ? '#0F172A' : '#64748B'}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Assistant;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
    gap: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FACC15',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 8,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
  },
  assistantMessageContainer: {
    justifyContent: 'flex-start',
  },
  avatarContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  userAvatarContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FACC15',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 14,
    borderRadius: 18,
  },
  userBubble: {
    backgroundColor: '#FACC15',
    borderBottomRightRadius: 4,
  },
  assistantBubble: {
    backgroundColor: '#1E293B',
    borderBottomLeftRadius: 4,
    borderLeftWidth: 3,
    borderLeftColor: '#FACC15',
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#E2E8F0',
  },
  userMessageText: {
    color: '#0F172A',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  loadingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    padding: 14,
    borderRadius: 18,
    borderBottomLeftRadius: 4,
    borderLeftWidth: 3,
    borderLeftColor: '#FACC15',
    gap: 10,
  },
  loadingText: {
    color: '#94A3B8',
    fontSize: 14,
  },
  quickQuestionsContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#1E293B',
    borderRadius: 16,
  },
  quickQuestionsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94A3B8',
    marginBottom: 12,
  },
  quickQuestionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: '#0F172A',
    borderRadius: 12,
    marginBottom: 8,
    gap: 10,
  },
  quickQuestionText: {
    color: '#E2E8F0',
    fontSize: 14,
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 12,
    paddingBottom: 8,
    backgroundColor: '#1E293B',
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#0F172A',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingRight: 12,
    fontSize: 15,
    color: '#FFF',
    maxHeight: 100,
    marginRight: 10,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FACC15',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#334155',
  },
});
