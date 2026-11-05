# 💈 Elit Berber - Sadece Arayüz (UI) Ödevi

Bu klasör, **Web Tasarımı Dersi** bu haftaki **"Sadece Arayüz (UI)"** ödevi için özel olarak hazırlanmıştır.

---

## 📌 Dosya Yapısı

Tüm kodlar birbirinden bağımsız, temiz ve standart dosyalar halinde ayrılmıştır:

```text
berber-arayuz-odevi/
├── index.html        # Saf ve semantik HTML5 iskeleti
├── style.css         # Beyaz zemin, mavi & kırmızı berber çizgileri içeren CSS3 dosyası
├── script.js         # Yalnızca arayüz (UI) etkileşimlerini yöneten JavaScript dosyası
├── images/
│   └── logo.png      # Berber direği logosu
└── README.md         # Arayüz ödevi dokümantasyonu
```

---

## ✨ Arayüz Özellikleri

1. **Beyaz Arka Plan & Berber Çizgileri:**
   - Web sitesinin tamamında temiz ve ferah beyaz (`#FFFFFF`) arka plan kullanılmıştır.
   - Üst ve alt kenarlarda geleneksel berber direğini simgeleyen **Kırmızı, Beyaz ve Mavi** açılı şeritler (`repeating-linear-gradient`) yer alır.
   - Başlık ve butonlarda kurumsal Berber Mavisi (`#1D4ED8`) ve Berber Kırmızısı (`#DC2626`) uygulanmıştır.

2. **İnteraktif Randevu Formu:**
   - Ad Soyad ve Telefon giriş alanları.
   - Usta Seçimi (Can Usta, Ahmet Usta, Emre Usta, Burak Usta).
   - Tıklanabilir ve çoklu seçilebilir hizmet kartları (Saç Kesimi, Sakal Tıraşı, Cilt Bakımı vb.).
   - Dinamik randevu saati butonları (09:00 - 19:30).
   - Form doldurulurken seçilen usta, hizmetler ve toplam tutarı anlık gösteren canlı özet paneli.

3. **Başarı Modalı (Popup):**
   - "Randevuyu Onayla" butonuna basıldığında açılan yeşil onay ikonlu modern arayüz popup penceresi.
   - Randevu özeti fiş formatında gösterilir.

4. **Oluşturulan Randevular (Arayüz Vitrini):**
   - Alınmış randevuların listesi, dinamik arama çubuğu ve kart silme (İptal Et) butonları.

5. **%100 Mobil Uyumlu:**
   - Telefon ve tabletlerde otomatik açılır/kapanır hamburger menü ile tam responsive arayüz.

---

## 🚀 Nasıl Çalıştırılır?

1. Klasör içindeki `index.html` dosyasına çift tıklayarak herhangi bir tarayıcıda (Chrome, Edge, Firefox) doğrudan açabilirsiniz.
2. Sunucuya, Node.js'e veya harici kurulumlara ihtiyaç duymaz; saf HTML, CSS ve JavaScript ile çalışır.
