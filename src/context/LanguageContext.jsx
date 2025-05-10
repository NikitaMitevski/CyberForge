import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';

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
        aboutDescription: '🌐 Како функционира CyberForge?\n\nCyberForge е твојата прва линија на одбрана од опасни линкови на интернет. Со нашата алатка, секој корисник може лесно да внесе било кој линк во полето на почетната страница и за само неколку секунди да добие информација дали тој линк е безбеден или потенцијално опасен.',
        keyFeatures: 'Како работи:',
        feature1: 'Го внесуваш линкот во полето на почетната страница',
        feature2: 'Системот автоматски го анализира URL-то и го споредува со најновите бази на податоци за фишинг, малициозни и измамнички страници',
        feature3: 'Користи напредни алгоритми и машинско учење за препознавање на нови закани',
        feature4: 'Брза и јасна информација за безбедноста на секој линк',
        aboutBenefits: 'Што добиваш:',
        benefit1: 'Брза и јасна информација за безбедноста на секој линк',
        benefit2: 'Заштита од најчестите интернет закани',
        benefit3: 'Мирен ум при секое сурфање',
        aboutCallToAction: '👉 Провери го секој линк пред да кликнеш со CyberForge!',
        
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
        sendMessage: 'Испрати порака',

        // Why Security Section
        securityIntro: 'Во дигиталниот свет, безбедноста не е само избор, туку неопходност. Секојдневно сме изложени на различни сајбер закани – од фишинг и малициозен софтвер до кражба на лични податоци и финансиски измами. Само со свесност и проактивен пристап можеме да ги намалиме ризиците и да уживаме во интернетот без страв од злоупотреба.',
        risksTitle: 'Ризици:',
        risk1: 'Фишинг напади',
        risk2: 'Кражба на идентитет',
        risk3: 'Малициозен софтвер',
        protectionTitle: 'Како да се заштитиш:',
        protection1: 'Користи силни лозинки',
        protection2: 'Вклучи двојна автентикација',
        protection3: 'Проверувај сомнителни линкови',
        securityCallToAction: '👉 Провери го секој линк пред да кликнеш!'
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
        aboutDescription: '🌐 How does CyberForge work?\n\nCyberForge is your first line of defense against dangerous links on the internet. With our tool, every user can easily enter any link in the field on the homepage and within seconds get information about whether that link is safe or potentially dangerous.',
        keyFeatures: 'How it works:',
        feature1: 'Enter the link in the field on the homepage',
        feature2: 'The system automatically analyzes the URL and compares it with the latest databases of phishing, malicious and fraudulent pages',
        feature3: 'Uses advanced algorithms and machine learning to recognize new threats',
        feature4: 'Quick and clear information about the safety of each link',
        aboutBenefits: 'What you get:',
        benefit1: 'Quick and clear information about the safety of each link',
        benefit2: 'Protection from the most common internet threats',
        benefit3: 'Peace of mind while surfing',
        aboutCallToAction: '👉 Check every link before you click with CyberForge!',
        
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
        sendMessage: 'Send Message',

        // Why Security Section
        securityIntro: 'In the digital world, security is not just a choice, but a necessity. We are daily exposed to various cyber threats – from phishing and malware to identity theft and financial fraud. Only through awareness and a proactive approach can we reduce risks and enjoy the internet without fear of abuse.',
        risksTitle: 'Risks:',
        risk1: 'Phishing attacks',
        risk2: 'Identity theft',
        risk3: 'Malware',
        protectionTitle: 'How to protect yourself:',
        protection1: 'Use strong passwords',
        protection2: 'Enable two-factor authentication',
        protection3: 'Check suspicious links',
        securityCallToAction: '👉 Check every link before you click!'
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
        aboutDescription: '🌐 Si funksionon CyberForge?\n\nCyberForge është vija juaj e parë e mbrojtjes kundër lidhjeve të rrezikshme në internet. Me mjetin tonë, çdo përdorues mund të futë lehtësisht çdo lidhje në fushën në faqen kryesore dhe brenda sekondave të marrë informacion nëse ajo lidhje është e sigurt apo potencialisht e rrezikshme.',
        keyFeatures: 'Si funksionon:',
        feature1: 'Fut lidhjen në fushën në faqen kryesore',
        feature2: 'Sistemi automatikisht analizon URL-në dhe e krahason me bazat e të dhënave më të fundit të faqeve të phishing, malicioze dhe mashtruese',
        feature3: 'Përdor algoritme të avancuara dhe mësimin e makinerisë për të njohur kërcënimet e reja',
        feature4: 'Informacion i shpejtë dhe i qartë për sigurinë e çdo lidhjeje',
        aboutBenefits: 'Çfarë merrni:',
        benefit1: 'Informacion i shpejtë dhe i qartë për sigurinë e çdo lidhjeje',
        benefit2: 'Mbrojtje nga kërcënimet më të zakonshme të internetit',
        benefit3: 'Qetësi mendore gjatë surfimit',
        aboutCallToAction: '👉 Kontrolloni çdo lidhje para se të klikoni me CyberForge!',
        
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
        sendMessage: 'Dërgo Mesazhin',

        // Why Security Section
        securityIntro: 'Në botën dixhitale, siguria nuk është thjesht një zgjedhje, por një domosdoshmëri. Ne jemi të ekspozuar çdo ditë ndaj kërcënimeve të ndryshme kibernetike – nga phishing dhe malware deri te vjedhja e identitetit dhe mashtrimet financiare. Vetëm përmes ndërgjegjësimit dhe një qasjeje proaktive mund të zvogëlojmë rreziqet dhe të shijojmë internetin pa frikë nga abuzimi.',
        risksTitle: 'Rreziqet:',
        risk1: 'Sulmet phishing',
        risk2: 'Vjedhja e identitetit',
        risk3: 'Malware',
        protectionTitle: 'Si të mbroheni:',
        protection1: 'Përdorni fjalëkalime të forta',
        protection2: 'Aktivizoni autentifikimin me dy faktorë',
        protection3: 'Kontrolloni lidhjet e dyshimta',
        securityCallToAction: '👉 Kontrolloni çdo lidhje para se të klikoni!'
    }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(() => {
        // Use a try-catch block to handle potential localStorage errors
        try {
            const savedLanguage = localStorage.getItem('language');
            return savedLanguage || 'MK';
        } catch (error) {
            console.error('Error accessing localStorage:', error);
            return 'MK';
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('language', language);
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    }, [language]);

    // Memoize the context value to prevent unnecessary re-renders
    const value = useMemo(() => ({
        language,
        setLanguage,
        t: translations[language]
    }), [language]);

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