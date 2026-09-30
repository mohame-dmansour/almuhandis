// ===== قائمة الموبايل =====
function toggleMenu() {
    const nav = document.querySelector('.nav');
    nav.classList.toggle('open');
}

// إغلاق القائمة عند الضغط على أي رابط
document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav').classList.remove('open');
    });
});

// ===== تأثير ظهور العناصر عند التمرير =====
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// تطبيق التأثير على الكروت
document.querySelectorAll('.sector-card, .section-title, .section-text').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

// ===== تأثير سكرول الهيدر =====
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 25px rgba(0,0,0,0.12)';
        header.style.padding = '10px 0';
    } else {
        header.style.boxShadow = '0 2px 15px rgba(0,0,0,0.06)';
        header.style.padding = '15px 0';
    }
    
    lastScroll = currentScroll;
});
// ===== فلتر المشاريع =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // إزالة active من الكل
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || filter === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ===== نموذج التواصل =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // إظهار رسالة نجاح
        const successMsg = document.createElement('div');
        successMsg.className = 'form-success';
        successMsg.innerHTML = '<i class="fas fa-check-circle"></i> تم إرسال رسالتك بنجاح! سنتواصل معك قريبًا.';
        
        contactForm.insertBefore(successMsg, contactForm.firstChild);

        // إخفاء الرسالة بعد 5 ثواني
        setTimeout(() => {
            successMsg.style.opacity = '0';
            setTimeout(() => successMsg.remove(), 400);
        }, 5000);

        // إعادة تعيين النموذج
        contactForm.reset();
    });
}

// ===== تأثير ظهور إضافي للصفحات الداخلية =====
document.querySelectorAll('.vm-card, .service-card, .project-card, .info-card, .about-image').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.7s ease ${index * 0.1}s, transform 0.7s ease ${index * 0.1}s`;
    
    const elObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                elObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elObserver.observe(el);
});