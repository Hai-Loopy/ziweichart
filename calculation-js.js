// calculation.js - Core calculation functions for Zi Wei Dou Shu chart

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

// Export the functions
export {
    calculateChineseCalendarData,
    calculateBirthPalace,
    calculateBodyPalace,
    calculateZiWeiPosition,
    calculateMainStars,
    calculateMinorStars,
    generateZiWeiChart
};
