// index.js - Main application file for Zi Wei Dou Shu chart
import { generateZiWeiChart } from './calculation.js';

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
            year: 2025,  // Default values
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
        document.getElementById('generate-btn')?.addEventListener('click', () => this.generateFromForm());
        
        // Initial chart generation
        this.generate();
        this.renderToHTML('chart-container');
        this.displayCalculationDetails();
    }
    
    /**
     * Generate chart from form data
     */
    generateFromForm() {
        const year = parseInt(document.getElementById('year')?.value || 2025);
        const month = parseInt(document.getElementById('month')?.value || 2);
        const day = parseInt(document.getElementById('day')?.value || 11);
        const hour = parseInt(document.getElementById('hour')?.value || 6);
        const gender = document.getElementById('gender')?.value || 'male';
        
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
        const hourOptions = document.getElementById('hour')?.options;
        const hourText = hourOptions ? hourOptions[this.birthData.hour-1]?.text : '';
        
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

export default ZiWeiChart;
