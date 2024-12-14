let isSimplified = false;

function switchLanguage() {
    console.log('Button clicked!');
    isSimplified = !isSimplified;
    
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

    // Update language switch button text
    document.getElementById('langText').textContent = isSimplified ? '简' : '繁';

    // Convert all text in the body
    document.body.childNodes.forEach(node => convertText(node, isSimplified));
}