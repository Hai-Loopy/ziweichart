// ===== CALCULATION FUNCTIONS =====

/**
 * Calculate the Chinese year data (Heavenly Stems and Earthly Branches)
 * @param {number} year - The Gregorian year
 * @returns {Object} Chinese calendar data
 */
function calculateChineseCalendarData(year) {
    const stemIndex = (year - 4) % 10;
    const branchIndex = (year - 4) % 12;
    
    const stems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
    const branches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
    
    return {
        stem: stems[stemIndex],
        branch: branches[branchIndex],
        stemIndex: stemIndex,
        branchIndex: branchIndex,
        yearCycle: `${stems[stemIndex]}${branches[branchIndex]}`
    };
}

/**
 * Calculate Birth Palace (命宫) Position
 * @param {number} month - Month (1-12)
 * @param {number} hour - Chinese double-hour (1-12)
 * @returns {number} Birth Palace position (1-12)
 */
function calculateBirthPalace(month, hour) {
    // Birth Palace = (Month + Hour - 2) % 12
    let position = (month + hour - 2) % 12;
    if (position <= 0) position += 12;
    
    return position;
}

/**
 * Calculate Body Palace (身宫) Position - Opposite to Birth Palace
 * @param {number} birthPalace - Birth Palace position
 * @returns {number} Body Palace position
 */
function calculateBodyPalace(birthPalace) {
    return ((birthPalace + 6 - 1) % 12) + 1;
}

/**
 * Calculate Zi Wei Star Position based on Birth Day and Year Stem
 * @param {number} day - Day of birth (1-30)
 * @param {number} stemIndex - Heavenly Stem index (0-9)
 * @returns {number} Zi Wei position (1-12)
 */
function calculateZiWeiPosition(day, stemIndex) {
    // These are the lookup tables for Zi Wei position based on the day and year stem
    const ziWeiPositionTables = {
        0: [11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4],
        1: [9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2],
        2: [7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        3: [5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        4: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8],
        5: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6],
        6: [11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4],
        7: [9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2],
        8: [7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        9: [5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    };
    
    // If day is out of bounds, default to day 1
    const adjustedDay = (day >= 1 && day <= 30) ? day : 1;
    const dayIndex = adjustedDay - 1;
    
    return ziWeiPositionTables[stemIndex][dayIndex];
}

/**
 * Calculate positions of all main stars based on Zi Wei position
 * @param {number} ziWeiPosition - Zi Wei star position
 * @param {number} stemIndex - Heavenly Stem index
 * @param {number} branchIndex - Earthly Branch index
 * @returns {Object} Main stars positions
 */
function calculateMainStars(ziWeiPosition, stemIndex, branchIndex) {
    const stars = {};
    
    // Emperor Group stars (紫微垣)
    stars.ziwei = ziWeiPosition;
    stars.tianji = ((ziWeiPosition + 0) % 12) + 1;
    stars.taiyang = ((ziWeiPosition + 2) % 12) + 1;
    stars.wuqu = ((ziWeiPosition + 3) % 12) + 1;
    stars.tiantong = ((ziWeiPosition + 4) % 12) + 1;
    stars.lianzhen = ((ziWeiPosition + 6) % 12) + 1;
    stars.tianxiang = ((ziWeiPosition + 8) % 12) + 1;
    
    // Calculate Tian Fu position (opposite to Zi Wei, with adjustment)
    const tianFuPosition = ((ziWeiPosition + 4) % 12) + 1;
    stars.tianfu = tianFuPosition;
    
    // Empress Group stars (天府垣)
    stars.taiyin = ((tianFuPosition + 0) % 12) + 1;
    stars.tanlang = ((tianFuPosition + 1) % 12) + 1;
    stars.jumen = ((tianFuPosition + 2) % 12) + 1;
    stars.tianliang = ((tianFuPosition + 4) % 12) + 1;
    stars.qisha = ((tianFuPosition + 5) % 12) + 1;
    stars.pojun = ((tianFuPosition + 9) % 12) + 1;
    
    return stars;
}

/**
 * Calculate positions of important minor stars
 * @param {number} birthPalace - Birth Palace position
 * @param {number} stemIndex - Heavenly Stem index
 * @param {number} branchIndex - Earthly Branch index
 * @param {string} gender - Gender ('male' or 'female')
 * @returns {Object} Minor stars positions
 */
function calculateMinorStars(birthPalace, stemIndex, branchIndex, gender) {
    const stars = {};
    
    // Left Assistant and Right Assistant
    stars.zuofu = ((birthPalace + stemIndex - 1) % 12) + 1;
    stars.youbi = ((birthPalace - stemIndex + 11) % 12) + 1;
    
    // Literary stars
    stars.wenchang = ((birthPalace + 12 - branchIndex) % 12) + 1;
    stars.wenqu = ((birthPalace + branchIndex - 1) % 12) + 1;
    
    // Gender-specific calculations
    if (gender === 'female') {
        // For female charts
        stars.tiankui = [1, 3, 5, 7, 9][stemIndex % 5];
        stars.tianyue = [11, 9, 7, 5, 3][stemIndex % 5];
    } else {
        // For male charts
        stars.tiankui = [2, 4, 6, 8, 10][stemIndex % 5];
        stars.tianyue = [12, 10, 8, 6, 4][stemIndex % 5];
    }
    
    // Additional minor stars
    stars.huagai = ((birthPalace + 11 - branchIndex) % 12) + 1;
    stars.tianyao = ((birthPalace + branchIndex - 1) % 12) + 1;
    stars.longchi = (((birthPalace + 4) % 12) + 1);
    stars.fengge = (((birthPalace + 8) % 12) + 1);
    
    return stars;
}

/**
 * Generate a complete Zi Wei Dou Shu chart
 * @param {Object} birthData - Object containing birth information
 * @returns {Object} Complete chart data
 */
function generateZiWeiChart(birthData) {
    const { year, month, day, hour, gender } = birthData;
    
    // 1. Calculate Chinese calendar data
    const chineseData = calculateChineseCalendarData(year);
    
    // 2. Calculate birth palace
    const birthPalace = calculateBirthPalace(month, hour);
    
    // 3. Calculate body palace
    const bodyPalace = calculateBodyPalace(birthPalace);
    
    // 4. Calculate Zi Wei position
    const ziWeiPosition = calculateZiWeiPosition(day, chineseData.stemIndex);
    
    // 5. Calculate main stars positions
    const mainStars = calculateMainStars(ziWeiPosition, chineseData.stemIndex, chineseData.branchIndex);
    
    // 6. Calculate minor stars positions
    const minorStars = calculateMinorStars(birthPalace, chineseData.stemIndex, chineseData.branchIndex, gender);
    
    // 7. Generate palace map
    const palaces = {};
    for (let i = 1; i <= 12; i++) {
        palaces[i] = {
            position: i,
            isBirthPalace: (i === birthPalace),
            isBodyPalace: (i === bodyPalace),
            stars: {
                main: [],
                minor: []
            }
        };
    }
    
    // Assign main stars to palaces
    for (const [key, position] of Object.entries(mainStars)) {
        palaces[position].stars.main.push(key);
    }
    
    // Assign minor stars to palaces
    for (const [key, position] of Object.entries(minorStars)) {
        palaces[position].stars.minor.push(key);
    }
    
    return {
        birthData,
        chineseData,
        birthPalace,
        bodyPalace,
        ziWeiPosition,
        mainStars,
        minorStars,
        palaces
    };
}

// ===== MAIN APPLICATION =====

// Star and palace name mappings (full Chinese characters)
const STAR_NAMES = {
    // Main stars (14 major stars)
    ziwei: '紫微',
    tianji: '天機',
    taiyang: '太陽',
    wuqu: '武曲',
    tianfu: '天府',
    tianxiang: '天相',
    lianzhen: '廉貞',
    tiantong: '天同',
    taiyin: '太陰',
    tanlang: '貪狼',
    jumen: '巨門',
    tianliang: '天梁',
    qisha: '七殺',
    pojun: '破軍',
    
    // Minor stars
    zuofu: '左輔',
    youbi: '右弼',
    wenchang: '文昌',
    wenqu: '文曲',
    tiankui: '天魁',
    tianyue: '天鉞',
    huagai: '華蓋',
    tianyao: '天鑰',
    longchi: '龍池',
    fengge: '鳳閣'
};

// Palace names in correct order
const PALACE_NAMES = [
    '命宮', '兄弟宮', '夫妻宮', '子女宮',
    '財帛宮', '疾厄宮', '遷移宮', '交友宮',
    '官祿宮', '田宅宮', '福德宮', '父母宮'
];

class ZiWeiChart {
    constructor() {
        this.birthData = {
            year: 2025,  // Default values matching example
            month: 2,
            day: 11,
            hour: 6,    // 9:00-10:59 (Snake hour)
            gender: 'male'
        };
        
        this.chartData = null;
        this.initialize();
    }
    
    /**
     * Initialize the chart and UI
     */
    initialize() {
        // Add event listeners to form inputs
        document.getElementById('generate-btn').addEventListener('click', () => this.generateFromForm());
        
        // Initial chart generation
        this.generate();
        this.renderToHTML('chart-container');
        this.displayCalculationDetails();
    }
    
    /**
     * Generate chart from form data
     */
    generateFromForm() {
        const year = parseInt(document.getElementById('year').value || 2025);
        const month = parseInt(document.getElementById('month').value || 2);
        const day = parseInt(document.getElementById('day').value || 11);
        const hour = parseInt(document.getElementById('hour').value || 6);
        const gender = document.getElementById('gender').value || 'male';
        
        this.setBirthData({ year, month, day, hour, gender });
    }
    
    /**
     * Set birth data and generate chart
     * @param {Object} birthData - Object containing birth information
     */
    setBirthData(birthData) {
        this.birthData = {
            ...this.birthData,
            ...birthData
        };
        
        this.generate();
        this.renderToHTML('chart-container');
        this.displayCalculationDetails();
    }
    
    /**
     * Generate the Zi Wei Dou Shu chart
     */
    generate() {
        this.chartData = generateZiWeiChart(this.birthData);
        return this.chartData;
    }
    
    /**
     * Get star name by key
     * @param {string} key - Star key
     * @returns {string} Star name
     */
    getStarName(key) {
        return STAR_NAMES[key] || key;
    }
    
    /**
     * Get palace name by position
     * @param {number} position - Palace position (1-12)
     * @returns {string} Palace name
     */
    getPalaceName(position) {
        return PALACE_NAMES[(position - 1) % 12];
    }
    
    /**
     * Render the chart to HTML
     * @param {string} containerId - Container element ID
     */
    renderToHTML(containerId) {
        if (!this.chartData) this.generate();
        
        const container = document.getElementById(containerId);
        if (!container) return;
        
        // Clear the container
        container.innerHTML = '';
        
        // Create palace elements
        for (let i = 1; i <= 12; i++) {
            const palace = this.chartData.palaces[i];
            const palaceElement = document.createElement('div');
            palaceElement.className = `palace palace-${i}`;
            if (palace.isBirthPalace) palaceElement.classList.add('birth-palace');
            if (palace.isBodyPalace) palaceElement.classList.add('body-palace');
            
            // Palace header
            const palaceHeader = document.createElement('div');
            palaceHeader.className = 'palace-header';
            palaceHeader.textContent = this.getPalaceName(i);
            
            // Add special markers for birth and body palaces
            if (palace.isBirthPalace || palace.isBodyPalace) {
                let specialText = '';
                if (palace.isBirthPalace) specialText += '命宮 ';
                if (palace.isBodyPalace) specialText += '身宮';
                
                const specialMarker = document.createElement('span');
                specialMarker.className = 'special-marker';
                specialMarker.textContent = specialText;
                palaceHeader.appendChild(specialMarker);
            }
            
            palaceElement.appendChild(palaceHeader);
            
            // Main stars
            if (palace.stars.main.length > 0) {
                const mainStarsContainer = document.createElement('div');
                mainStarsContainer.className = 'main-stars';
                
                palace.stars.main.forEach(starKey => {
                    const starElement = document.createElement('div');
                    starElement.className = 'star main-star';
                    starElement.textContent = this.getStarName(starKey);
                    mainStarsContainer.appendChild(starElement);
                });
                
                palaceElement.appendChild(mainStarsContainer);
            }
            
            // Minor stars
            if (palace.stars.minor.length > 0) {
                const minorStarsContainer = document.createElement('div');
                minorStarsContainer.className = 'minor-stars';
                
                palace.stars.minor.forEach(starKey => {
                    const starElement = document.createElement('div');
                    starElement.className = 'star minor-star';
                    starElement.textContent = this.getStarName(starKey);
                    minorStarsContainer.appendChild(starElement);
                });
                
                palaceElement.appendChild(minorStarsContainer);
            }
            
            container.appendChild(palaceElement);
        }
    }
    
    /**
     * Display calculation details in the info section
     */
    displayCalculationDetails() {
        if (!this.chartData) return;
        
        const birthInfoElement = document.getElementById('birth-info');
        const calculationElement = document.getElementById('calculation-details');
        
        if (!birthInfoElement || !calculationElement) return;
        
        // Display birth information
        const hourOptions = document.getElementById('hour').options;
        const hourText = hourOptions ? hourOptions[this.birthData.hour-1].text : '';
        
        birthInfoElement.innerHTML = `
            <p><strong>Date:</strong> ${this.birthData.year}-${this.birthData.month}-${this.birthData.day}</p>
            <p><strong>Hour:</strong> ${hourText || `Hour ${this.birthData.hour}`}</p>
            <p><strong>Gender:</strong> ${this.birthData.gender === 'male' ? 'Male' : 'Female'}</p>
            <p><strong>Chinese Year:</strong> ${this.chartData.chineseData.yearCycle} Year</p>
        `;
        
        // Display calculation details
        calculationElement.innerHTML = `
            <p><strong>Birth Palace:</strong> Palace ${this.chartData.birthPalace} - ${this.getPalaceName(this.chartData.birthPalace)}</p>
            <p><strong>Body Palace:</strong> Palace ${this.chartData.bodyPalace} - ${this.getPalaceName(this.chartData.bodyPalace)}</p>
            <p><strong>Zi Wei Position:</strong> Palace ${this.chartData.ziWeiPosition}</p>
            
            <h4>Main Stars Positions:</h4>
            <ul>
                ${Object.entries(this.chartData.mainStars).map(([key, position]) => 
                    `<li>${this.getStarName(key)}: Palace ${position}</li>`
                ).join('')}
            </ul>
            
            <h4>Minor Stars Positions:</h4>
            <ul>
                ${Object.entries(this.chartData.minorStars).map(([key, position]) => 
                    `<li>${this.getStarName(key)}: Palace ${position}</li>`
                ).join('')}
            </ul>
        `;
    }
}

// Initialize on document ready
document.addEventListener('DOMContentLoaded', () => {
    // Create a new chart instance
    window.ziWeiChart = new ZiWeiChart();
});
