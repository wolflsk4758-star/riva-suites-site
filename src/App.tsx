import { useState, useEffect, useRef } from 'react';

// Translation dictionary
const translations = {
  ar: {
    dir: 'rtl',
    lang: 'ar',
    nav: {
      home: 'الرئيسية',
      about: 'من نحن',
      suites: 'الأجنحة',
      services: 'الخدمات',
      location: 'الموقع',
      contact: 'تواصل معنا',
    },
    header: {
      bookNow: 'احجز الآن',
    },
    hero: {
      title: 'وجهتكم الأولى للإقامة المريحة والفاخرة في إربد',
      subtitle: 'في ريڤا تبدأ تجربة إقامة مختلفة، عنوانها الراحة، الخصوصية، والجودة. أجنحة عائلية مجهزة بالكامل لراحتكم.',
      whatsapp: 'تواصل عبر واتساب',
      booking: 'احجز عبر Booking.com',
      viewMap: '📍 عرض الموقع على الخارطة',
    },
    about: {
      title: 'من نحن',
      subtitle: 'تجربة إقامة استثنائية في قلب إربد',
      description: 'ريفا للأجنحة السكنية تقدم لكم تجربة إقامة فندقية راقية في مدينة إربد. نجمع بين فخامة الفنادق وخصوصية الشقق المفروشة لنقدم لكم إقامة لا تُنسى.',
      audience: 'مثالية للطلاب، السياح، الزوار، والعائلات الباحثين عن شقق مفروشة للإيجار بأعلى معايير الجودة والنظافة.',
      features: [
        { icon: 'fa-star', text: 'نظافة استثنائية' },
        { icon: 'fa-users', text: 'فريق عمل محترف' },
        { icon: 'fa-lock', text: 'خصوصية تامة' },
        { icon: 'fa-gem', text: 'جودة غرف فاخرة' },
      ],
    },
    features: {
      title: 'الخدمات والمرافق',
      subtitle: 'كل ما تحتاجه لإقامة مريحة',
      items: [
        { icon: 'fa-couch', title: 'مفروشة بالكامل', desc: 'أثاث فاخر وتجهيزات حديثة' },
        { icon: 'fa-wifi', title: 'واي فاي مجاني', desc: 'إنترنت سريع ومستقر' },
        { icon: 'fa-concierge-bell', title: 'خدمات فندقية', desc: 'خدمة غرف يومية' },
        { icon: 'fa-map-marker-alt', title: 'موقع مميز', desc: 'في قلب مدينة إربد' },
        { icon: 'fa-headset', title: 'دعم 24/7', desc: 'فريق دعم متاح دائماً' },
        { icon: 'fa-snowflake', title: 'تكييف مركزي', desc: 'تحكم كامل بالحرارة' },
        { icon: 'fa-child', title: 'مناسب للعائلات', desc: 'مساحات واسعة وآمنة' },
        { icon: 'fa-tv', title: 'ترفيه متكامل', desc: 'شاشات ذكية وقنوات متنوعة' },
      ],
    },
    gallery: {
      title: 'معرض الصور',
      subtitle: 'اكتشف فخامة أجنحتنا',
    },
    location: {
      title: 'موقعنا',
      subtitle: 'نقع في قلب إربد، على مقربة من أهم المعالم والخدمات.',
      address: 'إربد، المملكة الأردنية الهاشمية',
      nearby: 'قريب من الجامعات والأسواق والمرافق الحيوية',
    },
    contact: {
      title: 'تواصل معنا',
      subtitle: 'نحن هنا لخدمتكم',
      phone: 'الهاتف',
      whatsapp: 'واتساب',
      location: 'الموقع',
      locationText: 'إربد، الأردن',
      social: 'تابعنا',
    },
    footer: {
      rights: '© 2024 ريفا للأجنحة السكنية. جميع الحقوق محفوظة.',
      quickLinks: 'روابط سريعة',
    },
    floating: {
      text: 'تواصل معنا',
    },
  },
  en: {
    dir: 'ltr',
    lang: 'en',
    nav: {
      home: 'Home',
      about: 'About Us',
      suites: 'Suites',
      services: 'Services',
      location: 'Location',
      contact: 'Contact',
    },
    header: {
      bookNow: 'Book Now',
    },
    hero: {
      title: 'Your Premier Destination for Comfortable & Luxury Stays in Irbid',
      subtitle: 'At Riva, a different stay experience begins—defined by comfort, privacy, and quality. Fully equipped family suites designed for your utmost comfort.',
      whatsapp: 'Contact via WhatsApp',
      booking: 'Book via Booking.com',
      viewMap: '📍 View Location on Map',
    },
    about: {
      title: 'About Us',
      subtitle: 'An Exceptional Stay Experience in the Heart of Irbid',
      description: 'Riva Suites offers you a premium hotel-like living experience in Irbid city. We combine the luxury of hotels with the privacy of furnished apartments to deliver an unforgettable stay.',
      audience: 'Perfect for students, tourists, visitors, and families seeking furnished apartments for rent with the highest standards of quality and cleanliness.',
      features: [
        { icon: 'fa-star', text: 'Exceptional Cleanliness' },
        { icon: 'fa-users', text: 'Professional Staff' },
        { icon: 'fa-lock', text: 'Complete Privacy' },
        { icon: 'fa-gem', text: 'Premium Room Quality' },
      ],
    },
    features: {
      title: 'Features & Amenities',
      subtitle: 'Everything You Need for a Comfortable Stay',
      items: [
        { icon: 'fa-couch', title: 'Fully Furnished', desc: 'Luxury furniture & modern amenities' },
        { icon: 'fa-wifi', title: 'Free Wi-Fi', desc: 'Fast & stable internet' },
        { icon: 'fa-concierge-bell', title: 'Hotel Services', desc: 'Daily room service' },
        { icon: 'fa-map-marker-alt', title: 'Prime Location', desc: 'In the heart of Irbid' },
        { icon: 'fa-headset', title: '24/7 Support', desc: 'Support team always available' },
        { icon: 'fa-snowflake', title: 'Air Conditioning', desc: 'Full temperature control' },
        { icon: 'fa-child', title: 'Family Friendly', desc: 'Spacious & safe areas' },
        { icon: 'fa-tv', title: 'Entertainment', desc: 'Smart TVs & diverse channels' },
      ],
    },
    gallery: {
      title: 'Gallery',
      subtitle: 'Discover the Luxury of Our Suites',
    },
    location: {
      title: 'Our Location',
      subtitle: 'Located in the heart of Irbid, close to key landmarks and services.',
      address: 'Irbid, Hashemite Kingdom of Jordan',
      nearby: 'Close to universities, markets, and vital facilities',
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'We Are Here to Serve You',
      phone: 'Phone',
      whatsapp: 'WhatsApp',
      location: 'Location',
      locationText: 'Irbid, Jordan',
      social: 'Follow Us',
    },
    footer: {
      rights: '© 2024 Riva Suites. All Rights Reserved.',
      quickLinks: 'Quick Links',
    },
    floating: {
      text: 'Chat with us',
    },
  },
};

function App() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const t = translations[lang];

  useEffect(() => {
    document.documentElement.dir = t.dir;
    document.documentElement.lang = t.lang;
  }, [lang, t.dir, t.lang]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLang = () => {
    setLang(prev => prev === 'ar' ? 'en' : 'ar');
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const whatsappLink = 'https://wa.me/962790097564?text=' + encodeURIComponent(lang === 'ar' ? 'مرحباً، أود الاستفسار عن الأجنحة السكنية' : 'Hello, I would like to inquire about the suites');
  const instagramLink = 'https://www.instagram.com/rivasuites?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==';
  const facebookLink = 'https://www.facebook.com/profile.php?id=61591212942882';
  const googleMapsLink = 'https://www.google.com/maps/place/%D8%B1%D9%8A%DA%A4%D8%A7+%D9%84%D9%84%D8%A3%D8%AC%D9%86%D8%AD%D8%A9+%D8%A7%D9%84%D8%B3%D9%83%D9%86%D9%8A%D8%A9%E2%80%AD/@32.5375484,35.862416,17z/data=!3m1!4b1!4m9!3m8!1s0x151c7708837391cb:0x6f7e35ce224a5937!5m2!4m1!1i2!8m2!3d32.5375484!4d35.862416!16s%2Fg%2F11ytfhls0s!5m1!1e1?entry=ttu&g_ep=EgoyMDI2MDkwOS4wIKXMDSoASAFQAw%3D%3D';
  const googleMapsEmbed = 'https://maps.google.com/maps?q=32.5375484,35.862416&hl=' + lang + '&z=15&output=embed';

  return (
    <div className={`min-h-screen font-sans ${lang === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
      {/* ===== HEADER ===== */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-2">
              <img src="/images/logo.png" alt="Riva Suites Logo" className="w-12 h-12 md:w-16 md:h-16 object-contain drop-shadow-md" />
              <div className="flex flex-col">
                <span className={`font-bold text-sm md:text-base ${isScrolled ? 'text-[#2C3E50]' : 'text-white'}`}>
                  {lang === 'ar' ? 'ريفا للأجنحة' : 'Riva Suites'}
                </span>
                <span className={`text-xs ${isScrolled ? 'text-[#4A6B8A]' : 'text-gray-200'}`}>
                  {lang === 'ar' ? 'للأجنحة السكنية' : 'Residential Suites'}
                </span>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {[
                { key: 'home', id: 'hero' },
                { key: 'about', id: 'about' },
                { key: 'suites', id: 'gallery' },
                { key: 'services', id: 'features' },
                { key: 'location', id: 'location' },
                { key: 'contact', id: 'contact' },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors hover:text-[#C9A96E] ${
                    isScrolled ? 'text-[#2C3E50]' : 'text-white'
                  }`}
                >
                  {t.nav[item.key as keyof typeof t.nav]}
                </button>
              ))}
            </nav>

            {/* Right side: Lang + CTA + Mobile Menu */}
            <div className="flex items-center gap-3">
              {/* Language Switcher */}
              <button
                onClick={toggleLang}
                className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                  isScrolled
                    ? 'border-[#4A6B8A] text-[#4A6B8A] hover:bg-[#4A6B8A] hover:text-white'
                    : 'border-white text-white hover:bg-white hover:text-[#4A6B8A]'
                }`}
              >
                {lang === 'ar' ? 'EN' : 'عربي'}
              </button>

              {/* CTA Button */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-[#C9A96E] to-[#B8860B] text-white px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all"
              >
                <i className="fab fa-whatsapp"></i>
                {t.header.bookNow}
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`md:hidden p-2 rounded-lg ${isScrolled ? 'text-[#2C3E50]' : 'text-white'}`}
              >
                <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-xl border-t">
            <div className="px-4 py-4 space-y-3">
              {[
                { key: 'home', id: 'hero' },
                { key: 'about', id: 'about' },
                { key: 'suites', id: 'gallery' },
                { key: 'services', id: 'features' },
                { key: 'location', id: 'location' },
                { key: 'contact', id: 'contact' },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-start text-[#2C3E50] font-medium py-2 hover:text-[#C9A96E] transition-colors"
                >
                  {t.nav[item.key as keyof typeof t.nav]}
                </button>
              ))}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#C9A96E] to-[#B8860B] text-white px-4 py-3 rounded-full text-sm font-semibold"
              >
                <i className="fab fa-whatsapp"></i>
                {t.header.bookNow}
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ===== HERO SECTION ===== */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/hero-bg.jpg"
            alt="Riva Suites"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e]/80 via-[#16213e]/70 to-[#0f3460]/90"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center pt-20">
          <div className="mb-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
            <i className="fas fa-map-marker-alt text-[#C9A96E]"></i>
            <span className="text-white/90 text-sm">
              {lang === 'ar' ? 'إربد، الأردن' : 'Irbid, Jordan'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            {t.hero.title}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-10 leading-relaxed">
            {t.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#20BA5C] hover:shadow-2xl hover:shadow-green-500/30 transition-all animate-pulse-slow"
            >
              <i className="fab fa-whatsapp text-2xl group-hover:scale-110 transition-transform"></i>
              {t.hero.whatsapp}
            </a>
            <a
              href="https://www.booking.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border-2 border-white/40 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-[#2C3E50] transition-all"
            >
              <i className="fas fa-calendar-check text-xl"></i>
              {t.hero.booking}
            </a>
          </div>

          {/* Map Link */}
          <div className="mt-6">
            <a
              href={googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/80 hover:text-[#C9A96E] transition-colors duration-300 group"
            >
              <i className="fas fa-map-marker-alt text-[#C9A96E] group-hover:scale-125 transition-transform duration-300"></i>
              <span className="text-sm md:text-base font-medium border-b border-dashed border-white/40 group-hover:border-[#C9A96E] pb-0.5 transition-colors duration-300">
                {t.hero.viewMap}
              </span>
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="mt-16 animate-bounce">
            <i className="fas fa-chevron-down text-white/60 text-2xl"></i>
          </div>
        </div>
      </section>

      {/* ===== ABOUT SECTION ===== */}
      <section id="about" className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-[#4A6B8A]/10 text-[#4A6B8A] px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              {t.about.title}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C3E50] mb-4">
              {t.about.subtitle}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image Side */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/images/hero-bg.jpg"
                  alt="Riva Suites Interior"
                  className="w-full h-80 md:h-96 object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-[#C9A96E] to-[#B8860B] text-white p-6 rounded-2xl shadow-xl hidden md:block">
                <div className="text-center">
                  <span className="text-3xl font-bold">5★</span>
                  <p className="text-sm mt-1">{lang === 'ar' ? 'تقييم الضيوف' : 'Guest Rating'}</p>
                </div>
              </div>
            </div>

            {/* Text Side */}
            <div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {t.about.description}
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                {t.about.audience}
              </p>

              <div className="grid grid-cols-2 gap-4">
                {t.about.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-[#4A6B8A]/10 flex items-center justify-center flex-shrink-0">
                      <i className={`fas ${feature.icon} text-[#4A6B8A]`}></i>
                    </div>
                    <span className="text-sm font-semibold text-[#2C3E50]">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section id="features" className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-[#C9A96E]/10 text-[#C9A96E] px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              {t.features.title}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C3E50] mb-4">
              {t.features.subtitle}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {t.features.items.map((item, idx) => (
              <div
                key={idx}
                className="group bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#4A6B8A]/10 to-[#C9A96E]/10 flex items-center justify-center group-hover:from-[#4A6B8A] group-hover:to-[#2C3E50] transition-all duration-300">
                  <i className={`fas ${item.icon} text-2xl text-[#4A6B8A] group-hover:text-white transition-colors`}></i>
                </div>
                <h3 className="font-bold text-[#2C3E50] mb-2 text-sm md:text-base">{item.title}</h3>
                <p className="text-gray-500 text-xs md:text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GALLERY SECTION (CAROUSEL) ===== */}
      <section id="gallery" className="py-20 md:py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-[#4A6B8A]/10 text-[#4A6B8A] px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              {t.gallery.title}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C3E50] mb-4">
              {t.gallery.subtitle}
            </h2>
          </div>

          <div className="relative group">
            {/* Prev Button */}
            <button
              onClick={() => scrollSlider(lang === 'ar' ? 'right' : 'left')}
              className="absolute top-1/2 -left-2 md:-left-6 -translate-y-1/2 z-10 bg-white shadow-lg text-[#2C3E50] w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center hover:bg-[#C9A96E] hover:text-white transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
            >
              <i className={`fas fa-chevron-${lang === 'ar' ? 'right' : 'left'}`}></i>
            </button>

            {/* Slider Container */}
            <div
              ref={sliderRef}
              className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {/* Array of 15 dynamically calling 1.jpg to 15.jpg */}
              {[...Array(15)].map((_, idx) => (
                <div
                  key={idx}
                  className="relative flex-shrink-0 w-[85vw] sm:w-[60vw] md:w-[40vw] lg:w-[25vw] snap-center rounded-2xl overflow-hidden cursor-pointer"
                >
                  <img
                    src={`/images/${idx + 1}.jpg`}
                    alt={`Suite Image ${idx + 1}`}
                    className="w-full h-64 md:h-80 object-cover hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={() => scrollSlider(lang === 'ar' ? 'left' : 'right')}
              className="absolute top-1/2 -right-2 md:-right-6 -translate-y-1/2 z-10 bg-white shadow-lg text-[#2C3E50] w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center hover:bg-[#C9A96E] hover:text-white transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
            >
              <i className={`fas fa-chevron-${lang === 'ar' ? 'left' : 'right'}`}></i>
            </button>
          </div>
        </div>
        
        {/* Hide default scrollbar with CSS block directly */}
        <style dangerouslySetInnerHTML={{__html: `
          #gallery ::-webkit-scrollbar { display: none; }
        `}} />
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="py-16 bg-gradient-to-r from-[#2C3E50] via-[#4A6B8A] to-[#2C3E50] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-40 h-40 bg-[#C9A96E] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-[#C9A96E] rounded-full translate-x-1/3 translate-y-1/3"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
            {lang === 'ar' ? 'جاهز لحجز إقامتك المثالية؟' : 'Ready to Book Your Perfect Stay?'}
          </h2>
          <p className="text-gray-200 text-lg mb-8">
            {lang === 'ar' ? 'تواصل معنا الآن واحصل على أفضل العروض' : 'Contact us now and get the best offers'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#20BA5C] hover:shadow-xl transition-all"
            >
              <i className="fab fa-whatsapp text-2xl"></i>
              {t.hero.whatsapp}
            </a>
            <a
              href="tel:+962790097564"
              className="flex items-center gap-3 bg-white/10 border-2 border-white/40 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-[#2C3E50] transition-all"
            >
              <i className="fas fa-phone text-xl"></i>
              {lang === 'ar' ? 'اتصل بنا' : 'Call Us'}
            </a>
          </div>
        </div>
      </section>

      {/* ===== LOCATION SECTION ===== */}
      <section id="location" className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#4A6B8A]/10 text-[#4A6B8A] px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              <i className="fas fa-map-marker-alt mr-2"></i>
              {t.location.title}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C3E50] mb-4">
              {t.location.title}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {t.location.subtitle}
            </p>
          </div>

          {/* Map Info Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#4A6B8A]/10 to-[#C9A96E]/10 flex items-center justify-center flex-shrink-0">
                <i className="fas fa-map-pin text-2xl text-[#4A6B8A]"></i>
              </div>
              <div>
                <h4 className="font-bold text-[#2C3E50] mb-1">
                  {lang === 'ar' ? 'العنوان' : 'Address'}
                </h4>
                <p className="text-gray-600 text-sm">{t.location.address}</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#4A6B8A]/10 to-[#C9A96E]/10 flex items-center justify-center flex-shrink-0">
                <i className="fas fa-location-dot text-2xl text-[#C9A96E]"></i>
              </div>
              <div>
                <h4 className="font-bold text-[#2C3E50] mb-1">
                  {lang === 'ar' ? 'مواقع قريبة' : 'Nearby'}
                </h4>
                <p className="text-gray-600 text-sm">{t.location.nearby}</p>
              </div>
            </div>
          </div>

          {/* Embedded Google Map */}
          <div className="relative w-full h-96 rounded-2xl shadow-lg border border-gray-200 overflow-hidden mt-6">
            <iframe
              src={googleMapsEmbed}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Riva Suites Location - Irbid, Jordan"
              className="absolute inset-0 w-full h-full"
            ></iframe>
          </div>

          {/* Open in Google Maps Button */}
          <div className="text-center mt-6">
            <a
              href={googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#4A6B8A] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#2C3E50] transition-all duration-300 hover:shadow-lg"
            >
              <i className="fas fa-directions"></i>
              {lang === 'ar' ? 'احصل على الاتجاهات' : 'Get Directions'}
            </a>
          </div>
        </div>
      </section>

      {/* ===== CONTACT & FOOTER ===== */}
      <footer id="contact" className="bg-[#1a1a2e] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Brand Column */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <img src="/images/logo.png" alt="Riva Suites Logo" className="w-14 h-14 object-contain" />
                <div>
                  <h3 className="font-bold text-lg">
                    {lang === 'ar' ? 'ريفا للأجنحة السكنية' : 'Riva Suites'}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {lang === 'ar' ? 'إربد، الأردن' : 'Irbid, Jordan'}
                  </p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed text-sm">
                {lang === 'ar'
                  ? 'وجهتكم الأولى للإقامة المريحة والفاخرة في إربد. نقدم أجنحة عائلية مجهزة بالكامل مع خدمات فندقية راقية.'
                  : 'Your premier destination for comfortable & luxury stays in Irbid. We offer fully equipped family suites with premium hotel services.'}
              </p>
            </div>

            {/* Contact Column */}
            <div>
              <h3 className="font-bold text-lg mb-6 text-[#C9A96E]">{t.contact.title}</h3>
              <div className="space-y-4">
                <a href="tel:+962790097564" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <i className="fas fa-phone text-[#C9A96E]"></i>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{t.contact.phone}</p>
                    <p className="font-medium" dir="ltr">+962 79 009 7564</p>
                  </div>
                </a>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <i className="fab fa-whatsapp text-[#25D366]"></i>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{t.contact.whatsapp}</p>
                    <p className="font-medium" dir="ltr">+962 79 009 7564</p>
                  </div>
                </a>
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <i className="fas fa-map-marker-alt text-[#C9A96E]"></i>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{t.contact.location}</p>
                    <p className="font-medium">{t.contact.locationText}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links & Social */}
            <div>
              <h3 className="font-bold text-lg mb-6 text-[#C9A96E]">{t.footer.quickLinks}</h3>
              <div className="space-y-3 mb-8">
                {[
                  { key: 'home', id: 'hero' },
                  { key: 'about', id: 'about' },
                  { key: 'suites', id: 'gallery' },
                  { key: 'services', id: 'features' },
                  { key: 'location', id: 'location' },
                  { key: 'contact', id: 'contact' },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => scrollToSection(item.id)}
                    className="block text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {t.nav[item.key as keyof typeof t.nav]}
                  </button>
                ))}
              </div>

              <h4 className="font-semibold text-sm text-gray-400 mb-3">{t.contact.social}</h4>
              <div className="flex items-center gap-3">
                <a
                  href={instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white hover:scale-110 transition-transform"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href={facebookLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white hover:scale-110 transition-transform"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white hover:scale-110 transition-transform"
                >
                  <i className="fab fa-whatsapp"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-white/10 mt-12 pt-8 text-center">
            <p className="text-gray-500 text-sm">{t.footer.rights}</p>
          </div>
        </div>
      </footer>

      {/* ===== FLOATING WHATSAPP BUTTON ===== */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-6 ${lang === 'ar' ? 'left-6' : 'right-6'} z-50 group`}
        aria-label="Chat on WhatsApp"
      >
        <div className="relative">
          {/* Pulse ring */}
          <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-30"></div>
          {/* Button */}
          <div className="relative w-14 h-14 md:w-16 md:h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
            <i className="fab fa-whatsapp text-white text-2xl md:text-3xl"></i>
          </div>
          {/* Tooltip */}
          <div className={`absolute bottom-full mb-2 ${lang === 'ar' ? 'left-0' : 'right-0'} bg-white text-[#2C3E50] text-xs font-semibold px-3 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap`}>
            {t.floating.text}
          </div>
        </div>
      </a>
    </div>
  );
}

export default App;