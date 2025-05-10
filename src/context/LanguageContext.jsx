import React, { createContext, useState, useContext, useEffect } from 'react';

// Translation objects
const translations = {
    MK: {
        // Navigation
        home: 'Дома',
        clickSafe: 'Кликни безбедно',
        whatIs: 'Што е CyberForge?',
        whySecurity: 'Зошто безбедност?',
        aboutUs: 'За нас',
        
        // Hero Section
        heroTitle: 'Секој клик е нова авантура!',
        heroSubtitle: 'Зачекори безбедно во дигиталниот свет.',
        
        // Link Form
        checkUrl: 'Провери',
        enterUrl: 'Внесете URL за проверка',
        checking: 'Проверка...',
        safe: 'Вашиот линк е безбеден!',
        dangerous: 'Вашиот линк е опасен, бидете внимателни!',
        warning: 'Линкот е сигурен, но покажува знаци на сомнителност.',
        error: 'Се случи грешка: ',
        notExist: 'Внесениот линк не постои или не е достапен.',
        suspicious: 'ВНИМАНИЕ: Линкот изгледа сомнително!',
        
        // About Section
        aboutDescription: 'CyberForge е водечка платформа за кибербезбедност посветена на заштита на бизнисите и поединците од дигитални закани.',
        keyFeatures: 'Клучни карактеристики',
        feature1: 'Напредно откривање на закани',
        feature2: 'Мониторинг во реално време',
        feature3: 'Поддршка за безбедност 24/7',
        feature4: 'Прилагодени безбедносни решенија',
        
        // About Us Section
        ourMission: 'Нашата мисија',
        missionDescription: 'Во CyberForge, посветени сме на обезбедување на најсовремени решенија за кибербезбедност за заштита на бизнисите и поединците во дигиталната ера.',
        ourTeam: 'Нашиот тим',
        teamDescription: 'Ние сме тим од искусни професионалци за кибербезбедност посветени на изврсност и иновации.',
        ourValues: 'Нашите вредности',
        value1: 'Безбедност на прво место',
        value2: 'Доверба на клиентите',
        value3: 'Иновации',
        value4: 'Изврсност',
        
        // Contact Section
        contactUs: 'Контактирајте нè',
        name: 'Име:',
        email: 'Е-пошта:',
        message: 'Порака:',
        sendMessage: 'Испрати порака'
    },
    EN: {
        // Navigation
        home: 'Home',
        clickSafe: 'Click Safe',
        whatIs: 'What is CyberForge?',
        whySecurity: 'Why Security?',
        aboutUs: 'About Us',
        
        // Hero Section
        heroTitle: 'Every click is a new adventure!',
        heroSubtitle: 'Step safely into the digital world.',
        
        // Link Form
        checkUrl: 'Check',
        enterUrl: 'Enter URL to check',
        checking: 'Checking...',
        safe: 'Your link is safe!',
        dangerous: 'Your link is dangerous, be careful!',
        warning: 'The link is safe but shows signs of suspicion.',
        error: 'An error occurred: ',
        notExist: 'The entered link does not exist or is not accessible.',
        suspicious: 'WARNING: The link appears suspicious!',
        
        // About Section
        aboutDescription: 'CyberForge is a leading cybersecurity platform dedicated to protecting businesses and individuals from digital threats.',
        keyFeatures: 'Key Features',
        feature1: 'Advanced Threat Detection',
        feature2: 'Real-time Monitoring',
        feature3: '24/7 Security Support',
        feature4: 'Custom Security Solutions',
        
        // About Us Section
        ourMission: 'Our Mission',
        missionDescription: 'At CyberForge, we are dedicated to providing cutting-edge cybersecurity solutions to protect businesses and individuals in the digital age.',
        ourTeam: 'Our Team',
        teamDescription: 'We are a team of experienced cybersecurity professionals committed to excellence and innovation.',
        ourValues: 'Our Values',
        value1: 'Security First',
        value2: 'Client Trust',
        value3: 'Innovation',
        value4: 'Excellence',
        
        // Contact Section
        contactUs: 'Contact Us',
        name: 'Name:',
        email: 'Email:',
        message: 'Message:',
        sendMessage: 'Send Message'
    },
    SQ: {
        // Navigation
        home: 'Kryefaqja',
        clickSafe: 'Kliko Sigurt',
        whatIs: 'Çfarë është CyberForge?',
        whySecurity: 'Pse Siguria?',
        aboutUs: 'Rreth Nesh',
        
        // Hero Section
        heroTitle: 'Çdo klikim është një aventurë e re!',
        heroSubtitle: 'Hap hapat sigurt në botën dixhitale.',
        
        // Link Form
        checkUrl: 'Kontrollo',
        enterUrl: 'Vendosni URL për të kontrolluar',
        checking: 'Duke kontrolluar...',
        safe: 'Lidhja juaj është e sigurt!',
        dangerous: 'Lidhja juaj është e rrezikshme, kini kujdes!',
        warning: 'Lidhja është e sigurt por tregon shenja dyshimi.',
        error: 'Ndodhi një gabim: ',
        notExist: 'Lidhja e vendosur nuk ekziston ose nuk është e aksesueshme.',
        suspicious: 'KUJDES: Lidhja duket e dyshimtë!',
        
        // About Section
        aboutDescription: 'CyberForge është një platformë kryesore e sigurisë kibernetike e dedikuar për mbrojtjen e bizneseve dhe individëve nga kërcënimet dixhitale.',
        keyFeatures: 'Veçoritë Kryesore',
        feature1: 'Zbulimi i Avancuar i Kërcënimeve',
        feature2: 'Monitorimi në Kohë Reale',
        feature3: 'Mbështetje Sigurie 24/7',
        feature4: 'Zgjidhje të Përshtatshme Sigurie',
        
        // About Us Section
        ourMission: 'Misioni Ynë',
        missionDescription: 'Në CyberForge, ne jemi të dedikuar për të ofruar zgjidhje moderne të sigurisë kibernetike për të mbrojtur bizneset dhe individët në epokën dixhitale.',
        ourTeam: 'Ekipa Jonë',
        teamDescription: 'Ne jemi një ekip profesionistësh me përvojë në sigurinë kibernetike të angazhuar për përsosmëri dhe inovacion.',
        ourValues: 'Vlerat Tona',
        value1: 'Siguria në Radhë të Parë',
        value2: 'Besimi i Klientit',
        value3: 'Inovacioni',
        value4: 'Përsosmëria',
        
        // Contact Section
        contactUs: 'Na Kontaktoni',
        name: 'Emri:',
        email: 'Email:',
        message: 'Mesazhi:',
        sendMessage: 'Dërgo Mesazhin'
    }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(() => {
        const savedLanguage = localStorage.getItem('language');
        return savedLanguage || 'MK';
    });

    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    const value = {
        language,
        setLanguage,
        t: translations[language]
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
} 