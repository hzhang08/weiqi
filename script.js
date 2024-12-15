let isSimplified = false;

// Scroll to About section
function scrollToAbout() {
    const aboutSection = document.querySelector('.about-section');
    if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const moreButton = document.querySelector('.more-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const closeMenuButton = document.querySelector('.close-menu');
    const aboutLink = document.querySelector('.about-link');
    
    // Toggle mobile menu
    function showMobileMenu() {
        mobileMenu.classList.add('show');
        mobileMenuOverlay.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    function hideMobileMenu() {
        mobileMenu.classList.remove('show');
        mobileMenuOverlay.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    moreButton.addEventListener('click', function(e) {
        e.stopPropagation();
        showMobileMenu();
    });
    
    closeMenuButton.addEventListener('click', hideMobileMenu);
    mobileMenuOverlay.addEventListener('click', hideMobileMenu);
    
    // Handle About link click
    aboutLink.addEventListener('click', function() {
        hideMobileMenu();
        scrollToAbout();
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenu.contains(e.target) && !moreButton.contains(e.target)) {
            hideMobileMenu();
        }
    });

    // Update both language text elements
    const updateLanguageText = () => {
        document.getElementById('langText').textContent = isSimplified ? '简' : '繁';
        document.getElementById('mobileLangText').textContent = isSimplified ? '简' : '繁';
    };

    // Override the original switchLanguage function
    window.switchLanguage = function() {
        isSimplified = !isSimplified;
        document.body.childNodes.forEach(node => convertText(node, isSimplified));
        updateLanguageText();
        hideMobileMenu();
    };
});

// Traditional to Simplified mapping
const simplifiedMap = {
    '傳': '传',
    '奇': '奇',
    '圍': '围',
    '棋': '棋',
    '道': '道',
    '場': '场',
    '關': '关',
    '於': '于',
    '學': '学',
    '生': '生',
    '中': '中',
    '心': '心',
    '美': '美',
    '國': '国',
    '小': '小',
    '孩': '孩',
    '的': '的',
    '思': '思',
    '維': '维',
    '伴': '伴',
    '侶': '侣',
    '聯': '联',
    '繫': '系',
    '們': '们',
    '標': '标',
    '誌': '志',
    '輔': '辅',
    '助': '助',
    '訓': '训',
    '練': '练'
};

function convertText(element, toSimplified) {
    if (element.nodeType === Node.TEXT_NODE) {
        let text = element.textContent;
        if (toSimplified) {
            for (let [trad, simp] of Object.entries(simplifiedMap)) {
                text = text.replace(new RegExp(trad, 'g'), simp);
            }
        } else {
            for (let [trad, simp] of Object.entries(simplifiedMap)) {
                text = text.replace(new RegExp(simp, 'g'), trad);
            }
        }
        element.textContent = text;
    } else {
        element.childNodes.forEach(child => convertText(child, toSimplified));
    }
}