// Constants for Thien Luong style calculations
const THIEN_LUONG = {
  // Vietnamese zodiac
  CAN: ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'],
  CHI: ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'],
  
  // Major stars
  CHINH_TINH: [
    'TỬ VI', 'THIÊN CƠ', 'THÁI DƯƠNG', 'VŨ KHÚC', 'THIÊN ĐỒNG', 'LIÊM TRINH',
    'THIÊN PHỦ', 'THÁI ÂM', 'THAM LANG', 'CỰ MÔN', 'THIÊN TƯỚNG', 'THIÊN LƯƠNG',
    'THẤT SÁT', 'PHÁ QUÂN'
  ],
  
  // Star types with corresponding colors (from the image)
  STAR_TYPES: {
    'TỬ VI': { color: 'purple', type: 'M' },
    'THIÊN CƠ': { color: 'purple', type: 'M' },
    'THÁI DƯƠNG': { color: 'red', type: 'M' },
    'VŨ KHÚC': { color: 'green', type: 'M' },
    'THIÊN ĐỒNG': { color: 'purple', type: 'M' },
    'LIÊM TRINH': { color: 'red', type: 'V' },
    'THIÊN PHỦ': { color: 'purple', type: 'M' },
    'THÁI ÂM': { color: 'green', type: 'M' },
    'THAM LANG': { color: 'purple', type: 'V' },
    'CỰ MÔN': { color: 'green', type: 'M' },
    'THIÊN TƯỚNG': { color: 'purple', type: 'V' },
    'THIÊN LƯƠNG': { color: 'purple', type: 'Đ' },
    'THẤT SÁT': { color: 'red', type: 'M' },
    'PHÁ QUÂN': { color: 'red', type: 'M' },
    'THIÊN PHỦ': { color: 'black', type: 'M' },
    'LỘC TỒN': { color: 'green', type: '' },
    'VĂN XƯƠNG': { color: 'green', type: '' },
    'VĂN KHÚC': { color: 'green', type: '' },
    'ĐƯỜNG PHÙ': { color: 'green', type: '' },
    'HÓA LỘC': { color: 'green', type: '' },
    'HÓA QUYỀN': { color: 'purple', type: '' },
    'HÓA KHOA': { color: 'purple', type: '' },
    'HÓA KỴ': { color: 'red', type: '' },
    'THIÊN KHÔI': { color: 'black', type: '' },
    'THIÊN VIỆT': { color: 'black', type: '' },
    'THIÊN MÃ': { color: 'black', type: '' },
    'THIÊN KHỐC': { color: 'black', type: '' },
    'THIÊN HƯ': { color: 'black', type: '' },
    'ĐÀO HOA': { color: 'green', type: '' },
    'HỒNG LOAN': { color: 'green', type: '' },
    'THIÊN RẾU': { color: 'black', type: '' },
    'THIÊN Y': { color: 'black', type: '' },
    'QUỐC ẤN': { color: 'black', type: '' },
    'ĐƯỜNG PHÙ': { color: 'black', type: '' },
    'LƯU HÀ': { color: 'black', type: '' },
  },
  
  // Palace names in Vietnamese
  CUNG_NAMES: [
    'MỆNH', 'PHỤ MẪU', 'PHÚC ĐỨC', 'ĐIỀN TRẠCH', 'QUAN LỘC', 'NÔ BỘC',
    'THIÊN DI', 'TẬT ÁCH', 'TÀI BẠCH', 'TỬ TỨC', 'PHU THÊ', 'HUYNH ĐỆ'
  ],
  
  // Element associations (ngũ hành)
  ELEMENTS: {
    'KIM': 'metal',
    'MỘC': 'wood',
    'THỦY': 'water',
    'HỎA': 'fire',
    'THỔ': 'earth'
  },
  
  // Palace elements (based on arrangement in the image)
  PALACE_ELEMENTS: [
    'KIM', 'THỔ', 'HỎA', 'MỘC',
    'MỘC', 'HỎA', 'THỔ', 'KIM',
    'KIM', 'THỔ', 'HỎA', 'MỘC'
  ],
  
  // Palace positions (dịch cung) as seen in the Thien Luong chart
  PALACE_POSITIONS: [
    { index: 0, position: 'TÝ', degree: 1 },
    { index: 1, position: 'SỬU', degree: 2 },
    { index: 2, position: 'DẦN', degree: 3 },
    { index: 3, position: 'MÃO', degree: 4 },
    { index: 4, position: 'THÌN', degree: 5 },
    { index: 5, position: 'TỴ', degree: 6 },
    { index: 6, position: 'NGỌ', degree: 7 },
    { index: 7, position: 'MÙI', degree: 8 },
    { index: 8, position: 'THÂN', degree: 9 },
    { index: 9, position: 'DẬU', degree: 10 },
    { index: 10, position: 'TUẤT', degree: 11 },
    { index: 11, position: 'HỢI', degree: 12 }
  ],
  
  // Minor stars from the Thien Luong chart
  PHU_TINH: [
    'LỘC TỒN', 'VĂN XƯƠNG', 'VĂN KHÚC', 'THIÊN KHÔI', 'THIÊN VIỆT',
    'THIÊN MÃ', 'HÓA LỘC', 'HÓA QUYỀN', 'HÓA KHOA', 'HÓA KỴ',
    'ĐÀO HOA', 'HỒNG LOAN', 'THIÊN RẾU', 'THIÊN Y', 'QUỐC ẤN',
    'ĐƯỜNG PHỦ', 'LƯU HÀ', 'THIÊN KHÔNG', 'THIÊN KHỐC', 'THIÊN HƯ'
  ]
};

// Wait for DOM content to be loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM loaded, initializing Tử Vi chart...");
  
  // Ensure iztro is loaded
  if (typeof window.iztro === 'undefined') {
    console.error('iztro library not loaded! Please check your internet connection.');
    alert('Thư viện tử vi chưa được tải. Vui lòng kiểm tra kết nối internet và tải lại trang.');
    return;
  }

  // Initialize Thien Luong enhanced calculation
  initThienLuongCalculation();
});

function initThienLuongCalculation() {
  document.getElementById('chartForm').onsubmit = function(e) {
    e.preventDefault();

    const birthDate = document.getElementById('birthDate').value;
    const birthTime = parseInt(document.getElementById('birthTime').value, 10);
    const gender = document.getElementById('gender').value;

    if (!birthDate || isNaN(birthTime) || !gender) {
      alert('Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    try {
      console.log("Generating Tử Vi chart for:", birthDate, birthTime, gender);
      
      // Calculate the chart
      const thienLuongChart = calculateThienLuongChart(birthDate, birthTime, gender);
      
      // Display the enhanced chart
      displayThienLuongChart(thienLuongChart);
      
      console.log('Generated chart data:', thienLuongChart);
    } catch (error) {
      console.error('Error generating chart:', error);
      alert('Đã xảy ra lỗi trong khi tạo lá số. Vui lòng kiểm tra thông tin và thử lại.');
    }
  };
}

// Calculate birth chart using Thien Luong style methods
function calculateThienLuongChart(birthDate, birthTime, gender) {
  // Parse the birth date
  const date = new Date(birthDate);
  const day = date.getDate();
  const month = date.getMonth() + 1; // JavaScript months are 0-indexed
  const year = date.getFullYear();
  
  // Calculate Lunar Year
  const lunarYear = calculateLunarYear(year, month, day);
  
  // Calculate Can Chi (Heavenly Stems and Earthly Branches)
  const canIndex = (lunarYear - 4) % 10;
  const chiIndex = (lunarYear - 4) % 12;
  
  const can = THIEN_LUONG.CAN[canIndex];
  const chi = THIEN_LUONG.CHI[chiIndex];
  
  // Calculate birth hour Chi
  const hourChi = THIEN_LUONG.CHI[Math.floor(birthTime / 2) % 12];
  
  // Generate person info
  const personName = "Người Dùng"; // Placeholder for user name
  
  // Calculate main star positions (simplified algorithm)
  // In a real implementation, this would be much more complex
  const tuViPosition = (lunarYear % 12); // Example algorithm
  
  // Generate palaces with Thien Luong data structure
  const palaces = [];
  
  for (let i = 0; i < 12; i++) {
    // Calculate palace position (Chi) 
    const palaceChiIndex = (tuViPosition + i) % 12;
    const palaceChi = THIEN_LUONG.CHI[palaceChiIndex];
    
    // Determine main stars for this palace (simplified)
    const mainStars = calculateMainStars(i, tuViPosition, lunarYear, gender);
    
    // Determine secondary stars
    const secondaryStars = calculateSecondaryStars(i, lunarYear, month, day, birthTime, gender);
    
    // Create palace object
    palaces.push({
      index: i,
      name: THIEN_LUONG.CUNG_NAMES[i],
      chi: palaceChi,
      position: THIEN_LUONG.PALACE_POSITIONS[i].position,
      degree: THIEN_LUONG.PALACE_POSITIONS[i].degree,
      element: THIEN_LUONG.PALACE_ELEMENTS[i],
      mainStars: mainStars,
      secondaryStars: secondaryStars
    });
  }
  
  // Create full chart data
  return {
    info: {
      name: personName,
      gender: gender,
      birthDate: birthDate,
      birthTime: birthTime,
      hourChi: hourChi,
      lunarYear: lunarYear,
      canChi: `${can} ${chi}`,
      tuViStarPosition: tuViPosition
    },
    palaces: palaces
  };
}

// Calculate main stars for a palace (based on Thien Luong example)
function calculateMainStars(palaceIndex, tuViPosition, lunarYear, gender) {
  const stars = [];
  
  // This is a simplified algorithm based on Thien Luong style calculations
  // Real Tu Vi calculations are much more complex and based on specific formulas
  
  // Example: TU VI star appears in the main palace (Menh palace) if it's a specific pattern
  if (palaceIndex === 0) {
    stars.push({
      name: 'TỬ VI', 
      type: THIEN_LUONG.STAR_TYPES['TỬ VI'].type,
      color: THIEN_LUONG.STAR_TYPES['TỬ VI'].color
    });
  }
  
  // THIEN PHU often appears with TU VI
  if (palaceIndex === 0 || palaceIndex === 6) {
    stars.push({
      name: 'THIÊN PHỦ',
      type: THIEN_LUONG.STAR_TYPES['THIÊN PHỦ'].type,
      color: THIEN_LUONG.STAR_TYPES['THIÊN PHỦ'].color
    });
  }
  
  // THAI DUONG (Sun) often in the 2nd palace
  if (palaceIndex === 2) {
    stars.push({
      name: 'THÁI DƯƠNG',
      type: THIEN_LUONG.STAR_TYPES['THÁI DƯƠNG'].type,
      color: THIEN_LUONG.STAR_TYPES['THÁI DƯƠNG'].color
    });
  }
  
  // THAI AM (Moon) often in the 8th palace (opposite to Sun)
  if (palaceIndex === 8) {
    stars.push({
      name: 'THÁI ÂM',
      type: THIEN_LUONG.STAR_TYPES['THÁI ÂM'].type,
      color: THIEN_LUONG.STAR_TYPES['THÁI ÂM'].color
    });
  }
  
  // Add other stars based on various patterns
  // THIEN CO often appears in the 1st palace
  if (palaceIndex === 1) {
    stars.push({
      name: 'THIÊN CƠ',
      type: THIEN_LUONG.STAR_TYPES['THIÊN CƠ'].type,
      color: THIEN_LUONG.STAR_TYPES['THIÊN CƠ'].color
    });
  }
  
  // LIEM TRINH often appears in the 3rd palace
  if (palaceIndex === 3) {
    stars.push({
      name: 'LIÊM TRINH',
      type: THIEN_LUONG.STAR_TYPES['LIÊM TRINH'].type,
      color: THIEN_LUONG.STAR_TYPES['LIÊM TRINH'].color
    });
  }
  
  // VU KHUC often appears in the 4th palace
  if (palaceIndex === 4) {
    stars.push({
      name: 'VŨ KHÚC',
      type: THIEN_LUONG.STAR_TYPES['VŨ KHÚC'].type,
      color: THIEN_LUONG.STAR_TYPES['VŨ KHÚC'].color
    });
  }
  
  // THIEN DONG often appears in the 5th palace
  if (palaceIndex === 5) {
    stars.push({
      name: 'THIÊN ĐỒNG',
      type: THIEN_LUONG.STAR_TYPES['THIÊN ĐỒNG'].type,
      color: THIEN_LUONG.STAR_TYPES['THIÊN ĐỒNG'].color
    });
  }
  
  // THAM LANG often appears in the 7th palace
  if (palaceIndex === 7) {
    stars.push({
      name: 'THAM LANG',
      type: THIEN_LUONG.STAR_TYPES['THAM LANG'].type,
      color: THIEN_LUONG.STAR_TYPES['THAM LANG'].color
    });
  }
  
  // CU MON often appears in the 9th palace
  if (palaceIndex === 9) {
    stars.push({
      name: 'CỰ MÔN',
      type: THIEN_LUONG.STAR_TYPES['CỰ MÔN'].type,
      color: THIEN_LUONG.STAR_TYPES['CỰ MÔN'].color
    });
  }
  
  // THIEN TUONG often appears in the 10th palace
  if (palaceIndex === 10) {
    stars.push({
      name: 'THIÊN TƯỚNG',
      type: THIEN_LUONG.STAR_TYPES['THIÊN TƯỚNG'].type,
      color: THIEN_LUONG.STAR_TYPES['THIÊN TƯỚNG'].color
    });
  }
  
  // THIEN LUONG often appears in the 11th palace
  if (palaceIndex === 11) {
    stars.push({
      name: 'THIÊN LƯƠNG',
      type: THIEN_LUONG.STAR_TYPES['THIÊN LƯƠNG'].type,
      color: THIEN_LUONG.STAR_TYPES['THIÊN LƯƠNG'].color
    });
  }
  
  // THAT SAT often appears in the 6th palace
  if (palaceIndex === 6) {
    stars.push({
      name: 'THẤT SÁT',
      type: THIEN_LUONG.STAR_TYPES['THẤT SÁT'].type,
      color: THIEN_LUONG.STAR_TYPES['THẤT SÁT'].color
    });
  }
  
  // PHA QUAN often appears in the 12th palace
  if (palaceIndex === 12 % 12) {
    stars.push({
      name: 'PHÁ QUÂN',
      type: THIEN_LUONG.STAR_TYPES['PHÁ QUÂN'].type,
      color: THIEN_LUONG.STAR_TYPES['PHÁ QUÂN'].color
    });
  }
  
  return stars;
}

// Calculate secondary stars for a palace
function calculateSecondaryStars(palaceIndex, lunarYear, month, day, birthTime, gender) {
  const stars = [];
  
  // Again, this is a simplified algorithm based on Thien Luong style
  // Real calculations would be much more complex
  
  // Example: LOC TON appears based on lunar year
  if ((lunarYear + palaceIndex) % 12 === 0) {
    stars.push({
      name: 'LỘC TỒN',
      color: THIEN_LUONG.STAR_TYPES['LỘC TỒN']?.color || 'green'
    });
  }
  
  // HOA LOC often appears related to LOC TON
  if ((lunarYear + palaceIndex) % 12 === 1) {
    stars.push({
      name: 'HÓA LỘC',
      color: THIEN_LUONG.STAR_TYPES['HÓA LỘC']?.color || 'green'
    });
  }
  
  // HOA QUYEN based on another pattern
  if ((lunarYear + palaceIndex + month) % 12 === 2) {
    stars.push({
      name: 'HÓA QUYỀN',
      color: THIEN_LUONG.STAR_TYPES['HÓA QUYỀN']?.color || 'purple'
    });
  }
  
  // HOA KHOA based on another pattern
  if ((lunarYear + palaceIndex + day % 12) === 3) {
    stars.push({
      name: 'HÓA KHOA',
      color: THIEN_LUONG.STAR_TYPES['HÓA KHOA']?.color || 'purple'
    });
  }
  
  // HOA KY based on another pattern
  if ((lunarYear + palaceIndex + birthTime) % 12 === 4) {
    stars.push({
      name: 'HÓA KỴ',
      color: THIEN_LUONG.STAR_TYPES['HÓA KỴ']?.color || 'red'
    });
  }
  
  // Add more secondary stars based on different patterns
  const additionalStarCount = (palaceIndex + lunarYear) % 3;
  const baseIndex = (lunarYear + palaceIndex + month + day) % THIEN_LUONG.PHU_TINH.length;
  
  for (let i = 0; i < additionalStarCount; i++) {
    const starIndex = (baseIndex + i) % THIEN_LUONG.PHU_TINH.length;
    const starName = THIEN_LUONG.PHU_TINH[starIndex];
    
    stars.push({
      name: starName,
      color: THIEN_LUONG.STAR_TYPES[starName]?.color || 'black'
    });
  }
  
  return stars;
}

// Helper function: Calculate lunar year (simplified)
function calculateLunarYear(solarYear, solarMonth, solarDay) {
  // This is a simplified approximation
  // For accurate lunar year calculation, a full lunar calendar conversion would be needed
  
  // If before Lunar New Year (approximately early February), it's previous lunar year
  if (solarMonth === 1 || (solarMonth === 2 && solarDay < 10)) {
    return solarYear - 1;
  }
  
  return solarYear;
}

// Display the Thien Luong style chart
function displayThienLuongChart(chartData) {
  try {
    const palaces = document.querySelectorAll('.palace');
    
    if (!chartData || !chartData.palaces || !Array.isArray(chartData.palaces)) {
      throw new Error('Dữ liệu không hợp lệ');
    }
    
    // Update chart info section
    updateChartInfo(chartData.info);
    
    // Update each palace with data
    palaces.forEach((palace, index) => {
      if (index < chartData.palaces.length) {
        const palaceData = chartData.palaces[index];
        updatePalace(palace, palaceData);
      }
    });
    
    // Show success message
    alert('Lá số đã được tạo thành công!');
  } catch (error) {
    console.error('Lỗi hiển thị:', error);
    alert('Đã xảy ra lỗi trong khi hiển thị lá số.');
  }
}

// Update the chart info section
function updateChartInfo(info) {
  // Find or create the chart info element
  let infoElement = document.querySelector('.chart-info');
  if (!infoElement) {
    infoElement = document.createElement('div');
    infoElement.className = 'chart-info';
    
    // Insert before the chart grid
    const chartContainer = document.querySelector('.chart-container');
    if (chartContainer) {
      chartContainer.insertBefore(infoElement, chartContainer.firstChild);
    }
  }
  
  // Format date
  const birthDate = new Date(info.birthDate);
  const formattedDate = `${birthDate.getDate()}/${birthDate.getMonth() + 1}/${birthDate.getFullYear()}`;
  
  // Update info content
  infoElement.innerHTML = `
    <h3>Thông tin lá số</h3>
    <div class="person-info">
      <p><strong>Họ tên:</strong> ${info.name || 'Người dùng'}</p>
      <p><strong>Giới tính:</strong> ${info.gender === 'male' ? 'Nam' : 'Nữ'}</p>
      <p><strong>Ngày sinh:</strong> ${formattedDate}</p>
      <p><strong>Giờ sinh:</strong> ${info.hourChi} (${getHourRange(info.birthTime)})</p>
      <p><strong>Năm:</strong> ${info.lunarYear} (${info.canChi})</p>
    </div>
  `;
}

// Update a palace with Tu Vi data
function updatePalace(palaceElement, palaceData) {
  // Clear current content
  palaceElement.innerHTML = '';
  
  // Create palace header (name and position)
  const header = document.createElement('div');
  header.className = 'palace-header';
  header.innerHTML = `
    <div class="palace-name">${palaceData.name}</div>
    <div class="palace-position">${palaceData.position} (${palaceData.degree}°)</div>
  `;
  
  // Create main stars section
  const mainStars = document.createElement('div');
  mainStars.className = 'main-stars';
  
  // Add each main star
  if (palaceData.mainStars && palaceData.mainStars.length > 0) {
    palaceData.mainStars.forEach(star => {
      const starElement = document.createElement('div');
      starElement.className = `star star-main star-${star.color}`;
      starElement.innerHTML = `
        <span class="star-name">${star.name}</span>
        ${star.type ? `<span class="star-type">(${star.type})</span>` : ''}
      `;
      mainStars.appendChild(starElement);
    });
  }
  
  // Create secondary stars section
  const secondaryStars = document.createElement('div');
  secondaryStars.className = 'secondary-stars';
  
  // Add each secondary star
  if (palaceData.secondaryStars && palaceData.secondaryStars.length > 0) {
    palaceData.secondaryStars.forEach(star => {
      const starElement = document.createElement('div');
      starElement.className = `star star-secondary star-${star.color}`;
      starElement.innerHTML = `<span class="star-name">${star.name}</span>`;
      secondaryStars.appendChild(starElement);
    });
  }
  
  // Add element indicator
  const elementIndicator = document.createElement('div');
  elementIndicator.className = `element-indicator element-${THIEN_LUONG.ELEMENTS[palaceData.element] || 'none'}`;
  elementIndicator.textContent = palaceData.element || '';
  
  // Append all sections to the palace
  palaceElement.appendChild(header);
  palaceElement.appendChild(mainStars);
  palaceElement.appendChild(secondaryStars);
  palaceElement.appendChild(elementIndicator);
  
  // Add a click handler for detailed view
  palaceElement.addEventListener('click', function() {
    showPalaceDetails(palaceData);
  });
  
  // Add relevant classes to the palace element
  palaceElement.classList.add(`palace-${palaceData.index}`);
  palaceElement.classList.add(`element-${THIEN_LUONG.ELEMENTS[palaceData.element] || 'none'}`);
}

// Get hour range based on time index
function getHourRange(timeIndex) {
  const hours = [
    "23h-1h", "1h-3h", "3h-5h", "5h-7h", "7h-9h", "9h-11h", 
    "11h-13h", "13h-15h", "15h-17h", "17h-19h", "19h-21h", "21h-23h"
  ];
  
  return hours[Math.floor(timeIndex / 2) % 12] || "Không xác định";
}

// Show palace details when clicked
function showPalaceDetails(palaceData) {
  const detailsDiv = document.querySelector('.chart-details');
  if (!detailsDiv) return;
  
  // Create detail content
  let content = `<h3>Chi tiết cung ${palaceData.name}</h3>`;
  
  // Add palace info
  content += `
    <div class="palace-details">
      <p><strong>Vị trí:</strong> ${palaceData.position} (${palaceData.degree}°)</p>
      <p><strong>Ngũ hành:</strong> ${palaceData.element}</p>
    </div>
  `;
  
  // Add main stars with descriptions
  if (palaceData.mainStars && palaceData.mainStars.length > 0) {
    content += `<h4>Chính tinh</h4><ul class="star-list">`;
    palaceData.mainStars.forEach(star => {
      content += `
        <li class="star-${star.color}">
          <strong>${star.name}</strong>
          ${star.type ? `<span class="star-type">(${star.type})</span>` : ''}
        </li>`;
    });
    content += `</ul>`;
  } else {
    content += `<p>Không có chính tinh trong cung này.</p>`;
  }
  
  // Add secondary stars
  if (palaceData.secondaryStars && palaceData.secondaryStars.length > 0) {
    content += `<h4>Phụ tinh</h4><ul class="star-list">`;
    palaceData.secondaryStars.forEach(star => {
      content += `<li class="star-${star.color}"><strong>${star.name}</strong></li>`;
    });
    content += `</ul>`;
  } else {
    content += `<p>Không có phụ tinh trong cung này.</p>`;
  }
  
  // Add interpretations based on palace type
  content += `<h4>Ý nghĩa cung ${palaceData.name}</h4>`;
  content += interpretPalaceMeaning(palaceData.name);
  
  detailsDiv.innerHTML = content;
  
  // Scroll to details
  detailsDiv.scrollIn
