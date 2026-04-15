/* ========================================
   月恒净化 - Site Script
   ======================================== */

// ========== Page Preloader ==========
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => preloader.remove(), 700);
        }, 2200);
    }
});

// ========== Global Cursor Glow ==========
(function() {
    const glow = document.getElementById('cursor-glow');
    if (!glow || window.innerWidth < 768 || 'ontouchstart' in window) return;
    let mx = 0, my = 0, gx = 0, gy = 0;

    document.addEventListener('mousemove', (e) => {
        mx = e.clientX;
        my = e.clientY;
        glow.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        glow.style.opacity = '0';
    });

    function animate() {
        gx += (mx - gx) * 0.12;
        gy += (my - gy) * 0.12;
        glow.style.left = gx + 'px';
        glow.style.top = gy + 'px';
        requestAnimationFrame(animate);
    }
    animate();
})();

// ========== Mobile Menu ==========
function openMobileMenu() {
    document.getElementById('mobile-menu').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    document.getElementById('mobile-menu').classList.remove('open');
    document.body.style.overflow = '';
}

// ========== Scroll Reveal (IntersectionObserver) ==========
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-zoom, .stagger-children, .animated-underline').forEach(el => {
    revealObserver.observe(el);
});

// ========== Scroll Progress Bar ==========
const progressBar = document.getElementById('scroll-progress');
function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = scrollPercent + '%';
}

// ========== Navbar Shrink on Scroll ==========
const nav = document.querySelector('nav');
function updateNavbar() {
    if (window.scrollY > 60) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
}

// ========== Active Nav Link ==========
function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active-link');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active-link');
        }
    });
}

// ========== Back-to-Top Visibility ==========
const backToTop = document.getElementById('back-to-top');
function updateBackToTop() {
    if (window.scrollY > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
}

// ========== Parallax Hero Background ==========
const parallaxBg = document.querySelector('.parallax-bg');
function updateParallax() {
    if (parallaxBg && window.scrollY < window.innerHeight) {
        parallaxBg.style.transform = 'translateY(' + (window.scrollY * 0.35) + 'px) scale(1.1)';
    }
}

// ========== Counter Animation ==========
function animateCounters() {
    document.querySelectorAll('[data-counter]').forEach(el => {
        const target = parseInt(el.getAttribute('data-counter'));
        const suffix = el.textContent.includes('+') ? '+' : (el.textContent.includes('%') ? '%' : '');
        const steps = 60;
        let step = 0;
        const timer = setInterval(() => {
            step++;
            const progress = 1 - Math.pow(1 - step / steps, 3);
            const current = Math.floor(target * progress);
            if (step >= steps) {
                el.textContent = target.toLocaleString() + suffix;
                clearInterval(timer);
            } else {
                el.textContent = current.toLocaleString() + suffix;
            }
        }, 25);
    });
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            counterObserver.disconnect();
        }
    });
}, { threshold: 0.3 });

const statsSection = document.querySelector('[data-counter]');
if (statsSection) {
    counterObserver.observe(statsSection.closest('section') || statsSection.parentElement);
}

// ========== Hero Particles ==========
function createParticles() {
    const container = document.getElementById('hero-particles');
    if (!container) return;
    const colors = [
        'rgba(126, 200, 240, 0.6)',
        'rgba(255, 255, 255, 0.5)',
        'rgba(196, 151, 90, 0.4)',
        'rgba(42, 92, 170, 0.5)',
    ];
    for (let i = 0; i < 25; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 5 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.animationDuration = (Math.random() * 10 + 8) + 's';
        particle.style.animationDelay = (Math.random() * 8) + 's';
        container.appendChild(particle);
    }
}
createParticles();

// ========== Unified Scroll Handler ==========
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            updateScrollProgress();
            updateNavbar();
            updateBackToTop();
            updateParallax();
            updateActiveLink();
            ticking = false;
        });
        ticking = true;
    }
});

// ========== Contact Form ==========
const contactForm = document.getElementById('contact-form');
const formHint = document.getElementById('form-hint');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = contactForm.querySelector('[name="name"]').value.trim();
        const phone = contactForm.querySelector('[name="phone"]').value.trim();
        if (!name || !phone) {
            if (formHint) {
                formHint.textContent = '请填写联系人和联系电话';
                formHint.style.color = '#ef4444';
            }
            return;
        }
        if (formHint) {
            formHint.textContent = '提交成功！我们会尽快与您联系。';
            formHint.style.color = '#22c55e';
        }
        contactForm.reset();
    });
}

// ========== Site Content Data ==========
const siteContent = {
    services: [
        { img: 'https://images.pexels.com/photos/8442537/pexels-photo-8442537.jpeg?auto=compress&cs=tinysrgb&w=600', icon: 'ph-duotone ph-clipboard-text', title: '净化工程项目咨询', enTitle: 'Consultation', desc: '提供洁净室系统工程全方位咨询，根据行业标准和客户需求制定专业方案。' },
        { img: 'https://images.pexels.com/photos/9574516/pexels-photo-9574516.jpeg?auto=compress&cs=tinysrgb&w=600', icon: 'ph-duotone ph-pencil-ruler', title: '净化工程优化设计', enTitle: 'Design', desc: '专业团队进行净化系统优化设计，确保气流组织、温湿度控制达到最优效果。' },
        { img: 'https://images.pexels.com/photos/5118462/pexels-photo-5118462.jpeg?auto=compress&cs=tinysrgb&w=600', icon: 'ph-duotone ph-hard-hat', title: '净化工程施工', enTitle: 'Construction', desc: '严格按照国家标准和行业规范进行净化工程施工，保障工程质量和进度。' },
        { img: 'https://images.pexels.com/photos/9574572/pexels-photo-9574572.jpeg?auto=compress&cs=tinysrgb&w=600', icon: 'ph-duotone ph-wrench', title: '净化系统装置维护', enTitle: 'Maintenance', desc: '提供净化系统设备安装、调试及定期维护保养服务，保障系统稳定运行。' },
        { img: 'https://images.pexels.com/photos/8442513/pexels-photo-8442513.jpeg?auto=compress&cs=tinysrgb&w=600', icon: 'ph-duotone ph-chart-line-up', title: '净化工程检测', enTitle: 'Testing', desc: '运用先进检测设备对洁净室进行全面性能检测，出具专业检测报告。' },
        { img: 'https://images.pexels.com/photos/8442447/pexels-photo-8442447.jpeg?auto=compress&cs=tinysrgb&w=600', icon: 'ph-duotone ph-certificate', title: '净化工程认证', enTitle: 'Certification', desc: '协助客户完成洁净室检测与认证，确保工程达到设计标准和验收要求。' },
    ],
    cases: [
        { img: 'https://images.pexels.com/photos/5953827/pexels-photo-5953827.jpeg?auto=compress&cs=tinysrgb&w=600', icon: 'ph-duotone ph-flask', title: '实验室', enTitle: 'LABORATORY', desc: '为科研院所和企业实验室提供高标准的洁净环境解决方案。' },
        { img: 'https://images.pexels.com/photos/9574352/pexels-photo-9574352.jpeg?auto=compress&cs=tinysrgb&w=600', icon: 'ph-duotone ph-first-aid-kit', title: '医药工程', enTitle: 'MEDICAL ENGINEERING', desc: '满足GMP标准的制药车间净化工程设计与施工。' },
        { img: 'https://images.pexels.com/photos/10514768/pexels-photo-10514768.jpeg?auto=compress&cs=tinysrgb&w=600', icon: 'ph-duotone ph-warehouse', title: '洁净车间', enTitle: 'CLEAN WORKSHOP', desc: '电子、食品、化妆品等行业洁净车间整体解决方案。' },
        { img: 'https://images.pexels.com/photos/9574476/pexels-photo-9574476.jpeg?auto=compress&cs=tinysrgb&w=600', icon: 'ph-duotone ph-buildings', title: '其它净化工程', enTitle: 'OTHER WORKS', desc: '手术室、ICU、PCR实验室等各类净化工程。' },
    ],
    insights: [
        { date: '2025-03-15', title: '月恒净化承建某三甲医院洁净手术室项目顺利通过验收' },
        { date: '2025-02-20', title: '公司获得ISO9001质量管理体系认证续期' },
        { date: '2025-01-10', title: '月恒净化参加2025中国国际洁净技术与设备展览会' },
        { date: '2024-12-08', title: '新型高效空气过滤器产品通过第三方检测认证' },
    ],
    products: [
        { img: 'https://images.pexels.com/photos/8940360/pexels-photo-8940360.jpeg?auto=compress&cs=tinysrgb&w=600', icon: 'ph-duotone ph-lamp', title: '蚊蝇诱灭灯', desc: '洁净室专用蚊蝇诱灭设备，高效灭杀，守护洁净环境。' },
        { img: 'https://images.pexels.com/photos/36847822/pexels-photo-36847822.jpeg?auto=compress&cs=tinysrgb&w=600', icon: 'ph-duotone ph-wall', title: '手工岩棉夹芯板', desc: '防火隔热、隔音降噪，洁净室墙体围护系统优选材料。' },
        { img: 'https://images.pexels.com/photos/9574540/pexels-photo-9574540.jpeg?auto=compress&cs=tinysrgb&w=600', icon: 'ph-duotone ph-square-half', title: '手工彩钢外墙板', desc: '高强度彩钢板材，适用于洁净厂房外墙装饰与保温。' },
        { img: 'https://images.pexels.com/photos/33514502/pexels-photo-33514502.jpeg?auto=compress&cs=tinysrgb&w=600', icon: 'ph-duotone ph-drop', title: '百级净化罩', desc: '局部百级洁净环境设备，适用于关键工位洁净度保障。' },
    ],
};

// ========== Render Dynamic Content ==========
function renderServices() {
    const grid = document.getElementById('services-grid');
    if (!grid) return;
    grid.innerHTML = siteContent.services.map((s, i) => `
        <div class="card-level-1 group">
            <div class="w-full aspect-[4/3] overflow-hidden bg-gradient-to-br from-[#e8f4fd] to-[#d1e9f9]">
                <img src="${s.img}" alt="${s.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                     onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=\\'flex items-center justify-center w-full h-full\\'><i class=\\'${s.icon} text-5xl text-brand-blue/50\\'></i></div>';">
            </div>
            <div class="p-6 text-center">
                <h3 class="font-serif font-bold text-lg text-brand-navy mb-2">${s.title}</h3>
                <p class="text-brand-copper text-xs tracking-widest uppercase mb-3">${s.enTitle}</p>
                <p class="text-gray-600 text-sm leading-relaxed">${s.desc}</p>
            </div>
        </div>
    `).join('');
}

function renderCases() {
    const grid = document.getElementById('cases-grid');
    if (!grid) return;
    grid.innerHTML = siteContent.cases.map((c, i) => `
        <div class="card-level-1 group">
            <div class="w-full aspect-[4/3] overflow-hidden">
                <img src="${c.img}" alt="${c.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                     onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=\\'flex items-center justify-center w-full h-full bg-gradient-to-br from-brand-blue to-brand-accent\\'><i class=\\'${c.icon} text-5xl text-white/60\\'></i></div>';">
            </div>
            <div class="p-6 text-center">
                <h3 class="font-serif font-bold text-xl text-brand-navy mb-1">${c.title}</h3>
                <p class="text-brand-copper text-xs tracking-widest uppercase mb-3">${c.enTitle}</p>
                <p class="text-gray-600 text-sm leading-relaxed">${c.desc}</p>
            </div>
        </div>
    `).join('');
}

function renderInsights() {
    const grid = document.getElementById('insights-grid');
    if (!grid) return;
    grid.innerHTML = siteContent.insights.map(n => `
        <a href="#" class="news-card flex flex-col md:flex-row items-start md:items-center p-6 group transition-all duration-500 rounded-2xl hover:-translate-y-1 bg-white/95 backdrop-blur-md border border-white/30 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)]">
            <div class="w-36 md:w-44 shrink-0 font-bold tracking-wide" style="font-family: 'Cinzel', serif; color: #C4975A; font-size: 22px;">${n.date}</div>
            <div class="flex-grow mt-2 md:mt-0">
                <h3 class="text-lg font-semibold text-[#0F172A] group-hover:text-brand-blue transition-colors">${n.title}</h3>
            </div>
        </a>
    `).join('');
}

function renderProducts() {
    const grid = document.getElementById('products-grid');
    if (!grid) return;
    grid.innerHTML = siteContent.products.map(p => `
        <div class="card-level-2 group">
            <div class="w-full aspect-[4/3] overflow-hidden bg-white">
                <img src="${p.img}" alt="${p.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                     onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=\\'flex items-center justify-center w-full h-full\\'><i class=\\'${p.icon} text-5xl text-brand-blue/40\\'></i></div>';">
            </div>
            <div class="p-6 text-center">
                <h3 class="font-serif font-bold text-lg text-brand-navy mb-3">${p.title}</h3>
                <p class="text-gray-600 text-sm leading-relaxed">${p.desc}</p>
            </div>
        </div>
    `).join('');
}

// Initialize
renderServices();
renderCases();
renderInsights();
renderProducts();

// ========== Hero Carousel ==========
(function() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    const heroContent = document.querySelector('.hero-content');
    const progressBar = document.getElementById('carousel-progress');
    if (slides.length === 0) return;

    let currentSlide = 0;
    let carouselInterval;
    let isTransitioning = false;

    function goToSlide(index) {
        if (isTransitioning || index === currentSlide) return;
        isTransitioning = true;

        const prev = slides[currentSlide];
        const next = slides[index];

        // Remove all states, re-trigger animations
        prev.classList.remove('active');
        prev.classList.add('leaving');

        next.classList.remove('leaving');
        // Force reflow to restart animation
        void next.offsetWidth;
        next.classList.add('active');

        dots.forEach(d => d.classList.remove('active'));
        dots[index].classList.add('active');

        currentSlide = index;

        // Hero content re-entrance
        if (heroContent) {
            heroContent.classList.remove('hero-content-transition');
            void heroContent.offsetWidth;
            heroContent.classList.add('hero-content-transition');
        }

        // Reset progress bar
        if (progressBar) {
            progressBar.classList.remove('running');
            void progressBar.offsetWidth;
            progressBar.classList.add('running');
        }

        // Clean up after transition
        setTimeout(() => {
            prev.classList.remove('leaving');
            isTransitioning = false;
        }, 2000);
    }

    function nextSlide() {
        goToSlide((currentSlide + 1) % slides.length);
    }

    function startCarousel() {
        carouselInterval = setInterval(nextSlide, 4000);
    }

    function resetCarousel() {
        clearInterval(carouselInterval);
        startCarousel();
    }

    // Expose changeSlide globally for prev/next buttons
    window.changeSlide = function(direction) {
        const newIndex = (currentSlide + direction + slides.length) % slides.length;
        goToSlide(newIndex);
        resetCarousel();
    };

    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        heroSection.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        heroSection.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                window.changeSlide(diff > 0 ? 1 : -1);
            }
        }, { passive: true });
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-slide'));
            goToSlide(index);
            resetCarousel();
        });
    });

    startCarousel();
})();

// ========== Premium Interactive Effects ==========

// Mouse-following glow + 3D tilt on cards
function initCardEffects() {
    const cards = document.querySelectorAll('.card-level-1, .card-level-2');
    cards.forEach(card => {
        if (card.dataset.effectsInit) return;
        card.dataset.effectsInit = '1';

        const shine = document.createElement('div');
        shine.className = 'shine-sweep';
        card.appendChild(shine);

        const glow = document.createElement('div');
        glow.className = 'card-glow-spot';
        card.appendChild(glow);

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            glow.style.left = x + 'px';
            glow.style.top = y + 'px';
            glow.style.opacity = '1';

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -4;
            const rotateY = ((x - centerX) / centerX) * 4;
            card.style.transform = 'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-4px)';
        });

        card.addEventListener('mouseleave', () => {
            glow.style.opacity = '0';
            card.style.transform = '';
        });
    });
}

// Inject ambient floating orbs
function initAmbientOrbs() {
    const sections = document.querySelectorAll('#about, #products');
    sections.forEach(section => {
        if (section.dataset.orbsInit) return;
        section.dataset.orbsInit = '1';
        for (let i = 0; i < 3; i++) {
            const orb = document.createElement('div');
            orb.className = 'ambient-orb';
            const size = 200 + Math.random() * 300;
            orb.style.width = size + 'px';
            orb.style.height = size + 'px';
            orb.style.left = (Math.random() * 80 + 10) + '%';
            orb.style.top = (Math.random() * 60 + 20) + '%';
            orb.style.background = i % 2 === 0
                ? 'rgba(42, 92, 170, 0.08)'
                : 'rgba(196, 151, 90, 0.06)';
            orb.style.animationDelay = (i * 3) + 's';
            orb.style.animationDuration = (10 + Math.random() * 8) + 's';
            section.appendChild(orb);
        }
    });
}

// Magnetic hover on CTA / primary buttons
function initMagneticButtons() {
    const buttons = document.querySelectorAll('a[href="#contact"], .group\\/btn, button[type="submit"]');
    buttons.forEach(btn => {
        if (btn.dataset.magneticInit) return;
        btn.dataset.magneticInit = '1';
        btn.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';

        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = 'translate(' + (x * 0.15) + 'px, ' + (y * 0.15) + 'px) scale(1.03)';
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
}

// Smooth parallax-like depth on scroll
function initParallaxScroll() {
    const hero = document.querySelector('#hero');
    const stats = document.querySelectorAll('[data-counter]');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollY = window.scrollY;

                // Hero depth effect
                if (hero) {
                    const overlay = hero.querySelector('.absolute.inset-0');
                    if (overlay) {
                        overlay.style.transform = 'translateY(' + (scrollY * 0.15) + 'px)';
                    }
                }

                // Stats subtle float on scroll
                stats.forEach((stat, i) => {
                    const offset = Math.sin(scrollY * 0.003 + i) * 3;
                    stat.style.transform = 'translateY(' + offset + 'px)';
                });

                ticking = false;
            });
            ticking = true;
        }
    });
}

// Staggered reveal: enhance existing IntersectionObserver reveals
function initStaggeredReveal() {
    const grids = document.querySelectorAll('#services-grid, #cases-grid, #products-grid, #insights-grid');
    grids.forEach(grid => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const children = entry.target.children;
                    Array.from(children).forEach((child, i) => {
                        child.style.transitionDelay = (i * 0.08) + 's';
                        child.classList.add('revealed');
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        observer.observe(grid);
    });
}

// Re-init card effects after dynamic rendering
const originalRenderServices = renderServices;
const originalRenderCases = renderCases;
const originalRenderProducts = renderProducts;

renderServices = function() { originalRenderServices(); initCardEffects(); };
renderCases = function() { originalRenderCases(); initCardEffects(); };
renderProducts = function() { originalRenderProducts(); initCardEffects(); };

// Initialize all premium effects
renderServices();
renderCases();
renderProducts();
initAmbientOrbs();
initMagneticButtons();
initParallaxScroll();
initStaggeredReveal();

// ========== Smooth Text Counter Enhancement ==========
(function() {
    const counters = document.querySelectorAll('[data-counter]');
    counters.forEach(el => {
        el.style.transition = 'transform 0.3s ease';
        el.addEventListener('mouseenter', () => {
            el.style.transform = 'scale(1.08)';
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = '';
        });
    });
})();

// ========== Image Placeholder Premium Gradient ==========
(function() {
    document.querySelectorAll('.card-level-1 .aspect-\\[4\\/3\\], .card-level-2 .aspect-square').forEach(el => {
        if (!el.querySelector('img') || el.querySelector('img').style.display === 'none') {
            el.style.background = 'linear-gradient(135deg, #EBF2FF 0%, #E8EFF7 50%, #E3EDFF 100%)';
        }
    });
})();
