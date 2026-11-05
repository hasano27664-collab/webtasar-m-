/**
 * ELİT BERBER - SADECE ARAYÜZ (UI) JAVASCRIPT KODLARI
 * Web Tasarımı Dersi Ödevi
 * 
 * Bu dosya yalnızca kullanıcı arayüzü (UI) etkileşimlerini yönetir:
 * 1. Hizmet ve saat kartlarına tıklama / aktifleşme durumları
 * 2. Formdaki özet kutusunun (Usta, Hizmetler, Tutar) canlı güncellenmesi
 * 3. Hizmet veya Usta kartından forma hızlı seçim yapma
 * 4. Randevu Onay Modalı (Popup) açma ve kapatma
 * 5. Randevu kartını arayüzden kaldırma (İptal etme)
 * 6. Mobil hamburger menü kontrolü
 */

document.addEventListener('DOMContentLoaded', () => {
    initUI();
});

function initUI() {
    setupDate();
    setupServiceSelection();
    setupTimeSelection();
    setupBarberChange();
    setupQuickPickButtons();
    setupAppointmentForm();
    setupSearchFilter();
    setupMobileMenu();
}

/**
 * 1. TARİH ALANI: Bugünden önceki günleri seçmeyi engelleme
 */
function setupDate() {
    const dateInput = document.getElementById('randevuTarih');
    if (!dateInput) return;

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    
    // min niteliği ile geçmiş tarihleri kilitliyoruz
    dateInput.min = `${yyyy}-${mm}-${dd}`;
    dateInput.value = `${yyyy}-${mm}-${dd}`;
}

/**
 * 2. HİZMET KARTLARI SEÇİMİ: Tıklanınca seçili yapma ve özeti güncelleme
 */
function setupServiceSelection() {
    const chips = document.querySelectorAll('.select-chip');
    
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            // Tıklanan kartın seçim durumunu tersine çevir (toggle)
            chip.classList.toggle('selected');
            updateSummary();
        });
    });
}

/**
 * 3. SAAT BUTONLARI SEÇİMİ: Tıklanan saati aktif yapma
 */
function setupTimeSelection() {
    const timeButtons = document.querySelectorAll('.time-chip');
    
    timeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Diğer tüm butonların seçimini kaldır
            timeButtons.forEach(b => b.classList.remove('selected'));
            // Tıklanan butonu seçili yap
            btn.classList.add('selected');
        });
    });
}

/**
 * 4. USTA SEÇİMİ DEĞİŞTİĞİNDE ÖZETİ GÜNCELLEME
 */
function setupBarberChange() {
    const barberSelect = document.getElementById('personelSecim');
    const ozetUsta = document.getElementById('ozetUsta');
    
    if (barberSelect && ozetUsta) {
        barberSelect.addEventListener('change', () => {
            ozetUsta.textContent = barberSelect.value || 'Seçilmedi';
        });
    }
}

/**
 * 5. CANLI ÖZET KUTUSUNU HESAPLAMA (Usta, Hizmetler, Toplam Fiyat)
 */
function updateSummary() {
    const selectedChips = document.querySelectorAll('.select-chip.selected');
    const ozetHizmetler = document.getElementById('ozetHizmetler');
    const ozetTutar = document.getElementById('ozetTutar');

    let total = 0;
    const names = [];

    selectedChips.forEach(chip => {
        const price = parseInt(chip.dataset.price, 10) || 0;
        const name = chip.dataset.name || '';
        total += price;
        names.push(name);
    });

    if (ozetHizmetler) {
        ozetHizmetler.textContent = names.length > 0 ? names.join(', ') : 'Hizmet seçilmedi';
    }

    if (ozetTutar) {
        ozetTutar.textContent = `₺${total}`;
    }
}

/**
 * 6. HİZMETLER VE USTALAR BÖLÜMÜNDEN HIZLI SEÇİM BUTONLARI
 */
function setupQuickPickButtons() {
    // Hizmet kartlarındaki "Seç +" butonları
    document.querySelectorAll('.btn-select-hizmet').forEach(btn => {
        btn.addEventListener('click', () => {
            const serviceName = btn.dataset.serviceName;
            const targetChip = document.querySelector(`.select-chip[data-name="${serviceName}"]`);
            
            if (targetChip) {
                targetChip.classList.add('selected');
                updateSummary();
            }
            
            // Randevu formuna yumuşakça kaydır
            document.getElementById('randevu').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Usta kartlarındaki "Bu Ustadan Randevu Al" butonları
    document.querySelectorAll('.btn-pick-barber').forEach(btn => {
        btn.addEventListener('click', () => {
            const barberName = btn.dataset.barberName;
            const selectEl = document.getElementById('personelSecim');
            const ozetUsta = document.getElementById('ozetUsta');
            
            if (selectEl) {
                selectEl.value = barberName;
                if (ozetUsta) ozetUsta.textContent = barberName;
            }
            
            // Randevu formuna kaydır
            document.getElementById('randevu').scrollIntoView({ behavior: 'smooth' });
        });
    });
}

/**
 * 7. RANDEVU FORMU GÖNDERME -> BAŞARI MODALINI AÇMA
 */
function setupAppointmentForm() {
    const form = document.getElementById('appointmentUiForm');
    const modal = document.getElementById('successModal');
    const closeBtn = document.getElementById('modalCloseBtn');

    if (form && modal) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Sayfanın yeniden yüklenmesini engeller

            // Formdaki bilgileri alalım
            const name = document.getElementById('adSoyad').value || 'Ahmet Yılmaz';
            const barber = document.getElementById('personelSecim').value || 'Can Usta';
            const selectedTimeBtn = document.querySelector('.time-chip.selected');
            const time = selectedTimeBtn ? selectedTimeBtn.textContent : '14:00';
            
            const selectedChips = document.querySelectorAll('.select-chip.selected');
            const services = [];
            let total = 0;
            selectedChips.forEach(c => {
                services.push(c.dataset.name);
                total += parseInt(c.dataset.price, 10) || 0;
            });

            // Modal içine aktaralım
            document.getElementById('modalName').textContent = name;
            document.getElementById('modalBarber').textContent = barber;
            document.getElementById('modalTime').textContent = time;
            document.getElementById('modalServices').textContent = services.length > 0 ? services.join(', ') : 'Saç Kesimi';
            document.getElementById('modalTotal').textContent = total > 0 ? `₺${total}` : '₺250';

            // Modalı görünür yap
            modal.classList.add('active');
        });
    }

    // Modal Kapatma
    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            if (form) form.reset();
            updateSummary();
        });
    }

    // Modalın dışındaki karanlık alana tıklayınca kapatma
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
}

/**
 * 8. ARAYÜZDEN RANDEVU SİLME (İptal Butonu)
 */
window.silRandevu = function(buttonElement) {
    if (confirm('Bu randevuyu arayüzden kaldırmak istediğinize emin misiniz?')) {
        const card = buttonElement.closest('.appt-card');
        if (card) {
            // Zarif silinme efekti
            card.style.opacity = '0';
            card.style.transform = 'translateX(20px)';
            card.style.transition = 'all 0.3s ease';
            setTimeout(() => {
                card.remove();
                // Kalan kart sayısını güncelle
                const count = document.querySelectorAll('.appt-card').length;
                const pill = document.querySelector('.count-pill');
                if (pill) pill.textContent = `Toplam ${count} Randevu`;
            }, 300);
        }
    }
};

/**
 * 9. ARAMA FİLTRESİ (Arayüzde İsim veya Usta Arama)
 */
function setupSearchFilter() {
    const searchInput = document.getElementById('aramaInput');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const cards = document.querySelectorAll('.appt-card');

        cards.forEach(card => {
            const text = card.textContent.toLowerCase();
            if (text.includes(query)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

/**
 * 10. MOBİL MENÜ HAMBURGER BUTONU
 */
function setupMobileMenu() {
    const toggle = document.getElementById('menuToggle');
    const links = document.getElementById('navLinks');

    if (toggle && links) {
        toggle.addEventListener('click', () => {
            links.classList.toggle('open');
        });

        // Menüdeki bir bağlantıya tıklandığında menüyü kapat
        links.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                links.classList.remove('open');
            });
        });
    }
}
