// Vietnamese Tu Vi birth chart calculator
// Based on khamthientuhoa.com reference

// Constants for Vietnamese Tu Vi calculations
const TU_VI = {
  // Vietnamese zodiac
  CAN: ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'],
  CHI: ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'],
  
  // Major stars (Chính tinh)
  CHINH_TINH: [
    'Tử Vi', 'Thiên Cơ', 'Thái Dương', 'Vũ Khúc', 'Thiên Đồng', 'Liêm Trinh',
    'Thiên Phủ', 'Thái Âm', 'Tham Lang', 'Cự Môn', 'Thiên Tướng', 'Thiên Lương',
    'Thất Sát', 'Phá Quân'
  ],
  
  // Star types
  STAR_TYPES: {
    'good': {
      stars: ['Tử Vi', 'Thiên Phủ', 'Thái Dương', 'Thái Âm', 'Thiên Cơ', 'Thiên Lương', 'Thiên Đồng'],
      color: 'green'
    },
    'neutral': {
      stars: ['Cự Môn', 'Thiên Tướng', 'Vũ Khúc', 'Liêm Trinh', 'Tham Lang'],
      color: 'black'
    },
    'bad': {
      stars: ['Thất Sát', 'Phá Quân'],
      color: 'red'
    }
  },
  
  // Secondary stars (Phụ tinh)
  PHU_TINH: {
    'good': {
      stars: ['Văn Xương', 'Văn Khúc', 'Thiên Khôi', 'Thiên Việt', 'Đào Hoa', 'Hồng Loan', 
              'Thiên Hỷ', 'Thiên Quý', 'Long Trì', 'Phượng Các', 'Giải Thần', 'Thiên Mã', 
              'Thiên Quan', 'Thiên Phúc', 'Hóa Lộc', 'Hóa Quyền', 'Hóa Khoa'],
      color: 'green'
    },
    'neutral': {
      stars: ['Địa Không', 'Địa Kiếp', 'Quốc Ấn', 'Đường Phù', 'Thiên Thọ', 'Thiên Tài'],
      color: 'black'
    },
    'bad': {
      stars: ['Thiên Hình', 'Thiên Riêu', 'Thiên Khốc', 'Thiên Hư', 'Đại Hao', 'Tiểu Hao', 
              'Tang Môn', 'Bạch Hổ', 'Quan Phủ', 'Tử Phù', 'Hóa Kỵ'],
      color: 'red'
    }
  },
  
  // Palace names (Cung)
  CUNG_NAMES: [
    'Mệnh', 'Phụ Mẫu', 'Phúc Đức', 'Điền Trạch', 'Quan Lộc', 'Nô Bộc',
    'Thiên Di', 'Tật Ách', 'Tài Bạch', 'Tử Tức', 'Phu Thê', 'Huynh Đệ'
  ],
  
  // Element associations (ngũ hành)
  ELEMENTS: {
    'Kim': 'metal',
    'Mộc': 'wood',
    'Thủy': 'water',
    'Hỏa': 'fire',
    'Thổ': 'earth'
  },
  
  // Palace and star meanings for interpretations
  MEANINGS: {
    'Mệnh': 'Cung Mệnh biểu thị tính cách, bản chất, sức mạnh và đặc điểm chung của cuộc đời người đó.',
    'Phụ Mẫu': 'Cung Phụ Mẫu cho biết mối quan hệ với cha mẹ, cấp trên và người lớn tuổi.',
    'Phúc Đức': 'Cung Phúc Đức cho biết phúc phần, sự may mắn và tâm linh của người đó.',
    'Điền Trạch': 'Cung Điền Trạch liên quan đến nhà cửa, đất đai, tài sản cố định.',
    'Quan Lộc': 'Cung Quan Lộc liên quan đến sự nghiệp, công danh, địa vị xã hội.',
    'Nô Bộc': 'Cung Nô Bộc chỉ mối quan hệ với người giúp việc, nhân viên, người dưới quyền.',
    'Thiên Di': 'Cung Thiên Di liên quan đến việc đi lại, du lịch, sinh sống ở xa.',
    'Tật Ách': 'Cung Tật Ách chỉ sức khỏe, bệnh tật và khó khăn trong cuộc sống.',
    'Tài Bạch': 'Cung Tài Bạch liên quan đến tiền bạc, của cải, thu nhập.',
    'Tử Tức': 'Cung Tử Tức chỉ con cái và sáng tạo.',
    'Phu Thê': 'Cung Phu Thê liên quan đến hôn nhân, vợ chồng, tình yêu.',
    'Huynh Đệ': 'Cung Huynh Đệ liên quan đến anh chị em, bạn bè, đồng nghiệp.'
  },
  
  // Star descriptions for interpretations
  STAR_MEANINGS: {
    'Tử Vi': 'Sao Tử Vi là một trong những sao tốt nhất trong lá số, chủ về quyền lực, phúc lộc, danh vọng.',
    'Thiên Cơ': 'Sao Thiên Cơ chủ về trí tuệ, thông minh, có khả năng suy luận và tính toán.',
    'Thái Dương': 'Sao Thái Dương là sao tốt, mang đến ánh sáng, danh vọng, quyền lực, sự nổi tiếng.',
    'Vũ Khúc': 'Sao Vũ Khúc chủ về tiền tài, của cải, khả năng quản lý tài chính.',
    'Thiên Đồng': 'Sao Thiên Đồng chủ về niềm vui, hạnh phúc, sự suôn sẻ, thuận lợi.',
    'Liêm Trinh': 'Sao Liêm Trinh chủ về sự nghiêm khắc, kỷ luật, liêm chính.',
    'Thiên Phủ': 'Sao Thiên Phủ là sao tốt, chủ về tài lộc, sự phát đạt, giàu có.',
    'Thái Âm': 'Sao Thái Âm chủ về tình cảm, trực giác, sự êm đềm, hòa thuận.',
    'Tham Lang': 'Sao Tham Lang chủ về ham muốn, dục vọng, tham vọng.',
    'Cự Môn': 'Sao Cự Môn chủ về khả năng ngôn ngữ, giao tiếp, biện luận.',
    'Thiên Tướng': 'Sao Thiên Tướng chủ về lãnh đạo, chỉ huy, sức mạnh thể chất.',
    'Thiên Lương': 'Sao Thiên Lương là sao tốt, chủ về đạo đức, lương thiện, trung thực.',
    'Thất Sát': 'Sao Thất Sát chủ về quyết đoán, mạnh mẽ, nhưng cũng mang tính bạo lực, khắc nghiệt.',
    'Phá Quân': 'Sao Phá Quân chủ về sự phá cách, cải cách, đột phá nhưng cũng gây xáo trộn.'
  }
};

// Wait for DOM content to be loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM loaded, initializing Tử Vi chart calculator...");
  
  // Initialize event handlers
  initTuViCalculator();
});

function initTuViCalculator() {
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
      
      // Calculate the chart data
      const tuViChart = calculateTuViChart(birthDate, birthTime, gender);
      
      // Display the chart
      displayTuViChart(tuViChart);
      
      console.log('Generated chart data:', tuViChart);
    } catch (error) {
      console.error('Error generating chart:', error);
      alert('Đã xảy ra lỗi trong khi tạo lá số. Vui lòng kiểm tra thông tin và thử lại.');
    }
  };
}

// Calculate birth chart using Tu Vi methods
function calculateTuViChart(birthDate, birthTime, gender) {
  // Parse the birth date
  const date = new Date(birthDate);
  const day = date.getDate();
  const month = date.getMonth() + 1; // JavaScript months are 0-indexed
  const year = date.getFullYear();
  
  // Calculate Lunar Year (simplified)
  const lunarYear = calculateLunarYear(year, month, day);
  
  // Calculate Can Chi for year (Heavenly Stems and Earthly Branches)
  const canIndex = (lunarYear - 4) % 10;
  const chiIndex = (lunarYear - 4) % 12;
  
  const can = TU_VI.CAN[canIndex];
  const chi = TU_VI.CHI[chiIndex];
  
  // Calculate birth hour Chi
  const hourChi = TU_VI.CHI[Math.floor(birthTime / 2) % 12];
  
  // Calculate Tử Vi position (the main star that determines palace positions)
  // This is a simplified algorithm - real Tu Vi calculations are more complex
  let tuViPosition = Math.abs((lunarYear * 2 + month * 2 + day) % 12);
  
  // Adjust for gender (simplified)
  if (gender === 'female') {
    tuViPosition = (tuViPosition + 6) % 12; // Offset by half the zodiac for females
  }
  
  // Generate palaces
  const palaces = [];
  
  for (let i = 0; i < 12; i++) {
    // Determine palace position
    const palacePosition = (tuViPosition + i) % 12;
    const palaceChi = TU_VI.CHI[palacePosition];
    
    // Calculate element based on the palace Chi
    const palaceElement = determineElement(palaceChi);
    
    // Determine major stars for this palace
    const majorStars = calculateMajorStars(i, palacePosition, lunarYear, month, day, gender);
    
    // Determine minor stars
    const minorStars = calculateMinorStars(i, palacePosition, lunarYear, month, day, birthTime, gender);
    
    // Create palace object
    palaces.push({
      index: i,
      name: TU_VI.CUNG_NAMES[i],
      position: palacePosition,
      chi: palaceChi,
      element: palaceElement,
      majorStars: majorStars,
      minorStars: minorStars
    });
  }
  
  // Create complete chart data
  return {
    info: {
      birthDate: birthDate,
      birthTime: birthTime,
      birthTimeText: getHourRange(birthTime),
      hourChi: hourChi,
      gender: gender,
      lunarYear: lunarYear,
      canChi: `${can} ${chi}`,
      tuViPosition: tuViPosition
    },
    palaces: palaces
  };
}

// Determine element based on Chi
function determineElement(chi) {
  const elements = {
    'Tý': 'Thủy', 'Sửu': 'Thổ', 'Dần': 'Mộc', 'Mão': 'Mộc',
    'Thìn': 'Thổ', 'Tỵ': 'Hỏa', 'Ngọ': 'Hỏa', 'Mùi': 'Thổ',
    'Thân': 'Kim', 'Dậu': 'Kim', 'Tuất': 'Thổ', 'Hợi': 'Thủy'
  };
  
  return elements[chi] || 'Thổ';
}

// Calculate major stars for a palace
function calculateMajorStars(palaceIndex, palacePosition, lunarYear, month, day, gender) {
  const stars = [];
  
  // This is a simplified algorithm - real Tu Vi calculations are more complex
  
  // Example: Tử Vi star appears in a specific palace based on birth year
  if (palaceIndex === 0) {
    stars.push({
      name: 'Tử Vi',
      type: getStarType('Tử Vi'),
      color: getStarColor('Tử Vi')
    });
  }
  
  // Thiên Phủ often appears opposite to Tử Vi
  if (palaceIndex === 6) {
    stars.push({
      name: 'Thiên Phủ',
      type: getStarType('Thiên Phủ'),
      color: getStarColor('Thiên Phủ')
    });
  }
  
  // Thái Dương (Sun) often in a specific palace
  if (palaceIndex === 2) {
    stars.push({
      name: 'Thái Dương',
      type: getStarType('Thái Dương'),
      color: getStarColor('Thái Dương')
    });
  }
  
  // Thái Âm (Moon) often appears opposite to Thái Dương
  if (palaceIndex === 8) {
    stars.push({
      name: 'Thái Âm',
      type: getStarType('Thái Âm'),
      color: getStarColor('Thái Âm')
    });
  }
  
  // Add more stars based on palace index to simulate realistic distribution
  switch (palaceIndex) {
    case 1:
      stars.push({
        name: 'Thiên Cơ',
        type: getStarType('Thiên Cơ'),
        color: getStarColor('Thiên Cơ')
      });
      break;
    case 3:
      stars.push({
        name: 'Liêm Trinh',
        type: getStarType('Liêm Trinh'),
        color: getStarColor('Liêm Trinh')
      });
      break;
    case 4:
      stars.push({
        name: 'Vũ Khúc',
        type: getStarType('Vũ Khúc'),
        color: getStarColor('Vũ Khúc')
      });
      break;
    case 5:
      stars.push({
        name: 'Thiên Đồng',
        type: getStarType('Thiên Đồng'),
        color: getStarColor('Thiên Đồng')
      });
      break;
    case 7:
      stars.push({
        name: 'Tham Lang',
        type: getStarType('Tham Lang'),
        color: getStarColor('Tham Lang')
      });
      break;
    case 9:
      stars.push({
        name: 'Cự Môn',
        type: getStarType('Cự Môn'),
        color: getStarColor('Cự Môn')
      });
      break;
    case 10:
      stars.push({
        name: 'Thiên Tướng',
        type: getStarType('Thiên Tướng'),
        color: getStarColor('Thiên Tướng')
      });
      break;
    case 11:
      stars.push({
        name: 'Thiên Lương',
        type: getStarType('Thiên Lương'),
        color: getStarColor('Thiên Lương')
      });
      break;
  }
  
  // Add Thất Sát and Phá Quân based on birth year
  const specialIndex = lunarYear % 4;
  
  if (specialIndex === 0 && (palaceIndex === 3 || palaceIndex === 7)) {
    stars.push({
      name: 'Thất Sát',
      type: getStarType('Thất Sát'),
      color: getStarColor('Thất Sát')
    });
  }
  
  if (specialIndex === 2 && (palaceIndex === 1 || palaceIndex === 11)) {
    stars.push({
      name: 'Phá Quân',
      type: getStarType('Phá Quân'),
      color: getStarColor('Phá Quân')
    });
  }
  
  return stars;
}

// Calculate minor stars for a palace
function calculateMinorStars(palaceIndex, palacePosition, lunarYear, month, day, birthTime, gender) {
  const stars = [];
  
  // This is a simplified algorithm - real Tu Vi calculations are more complex
  
  // Good stars
  const goodStars = TU_VI.PHU_TINH.good.stars;
  const badStars = TU_VI.PHU_TINH.bad.stars;
  const neutralStars = TU_VI.PHU_TINH.neutral.stars;
  
  // Distribute good stars
  const goodStarCount = Math.min(2, Math.abs((palaceIndex + lunarYear + month) % 3));
  for (let i = 0; i < goodStarCount; i++) {
    const starIndex = (palaceIndex + lunarYear + month + i) % goodStars.length;
    const starName = goodStars[starIndex];
    stars.push({
      name: starName,
      type: 'good',
      color: TU_VI.PHU_TINH.good.color
    });
  }
  
  // Distribute bad stars
  const badStarCount = Math.min(1, Math.abs((palaceIndex + lunarYear + day) % 2));
  for (let i = 0; i < badStarCount; i++) {
    const starIndex = (palaceIndex + day + month + i) % badStars.length;
    const starName = badStars[starIndex];
    stars.push({
      name: starName,
      type: 'bad',
      color: TU_VI.PHU_TINH.bad.color
    });
  }
  
  // Distribute neutral stars
  const neutralStarCount = Math.min(1, Math.abs((palaceIndex + birthTime) % 2));
  for (let i = 0; i < neutralStarCount; i++) {
    const starIndex = (palaceIndex + birthTime + i) % neutralStars.length;
    const starName = neutralStars[starIndex];
    stars.push({
      name: starName,
      type: 'neutral',
      color: TU_VI.PHU_TINH.neutral.color
    });
  }
  
  // Add special transformations (Hóa) based on gender and birth year
  if ((lunarYear + palaceIndex) % 12 === 0) {
    stars.push({
      name: 'Hóa Lộc',
      type: 'good',
      color: TU_VI.PHU_TINH.good.color
    });
  }
  
  if ((lunarYear + palaceIndex + 4) % 12 === 0) {
    stars.push({
      name: 'Hóa Quyền',
      type: 'good',
      color: TU_VI.PHU_TINH.good.color
    });
  }
  
  if ((lunarYear + palaceIndex + 8) % 12 === 0) {
    stars.push({
      name: 'Hóa Khoa',
      type: 'good',
      color: TU_VI.PHU_TINH.good.color
    });
  }
  
  if ((lunarYear + palaceIndex + 6) % 12 === 0) {
    stars.push({
      name: 'Hóa Kỵ',
      type: 'bad',
      color: TU_VI.PHU_TINH.bad.color
    });
  }
  
  return stars;
}

// Get star type based on its name
function getStarType(starName) {
  for (const type in TU_VI.STAR_TYPES) {
    if (TU_VI.STAR_TYPES[type].stars.includes(starName)) {
      return type;
    }
  }
  return 'neutral';
}

// Get star color based on its name
function getStarColor(starName) {
  for (const type in TU_VI.STAR_TYPES) {
    if (TU_VI.STAR_TYPES[type].stars.includes(starName)) {
      return TU_VI.STAR_TYPES[type].color;
    }
  }
  return 'black';
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

// Get hour range based on time index
function getHourRange(timeIndex) {
  const hours = [
    "23h-1h (Tý)", "1h-3h (Sửu)", "3h-5h (Dần)", "5h-7h (Mão)", 
    "7h-9h (Thìn)", "9h-11h (Tỵ)", "11h-13h (Ngọ)", "13h-15h (Mùi)", 
    "15h-17h (Thân)", "17h-19h (Dậu)", "19h-21h (Tuất)", "21h-23h (Hợi)"
  ];
  
  return hours[Math.floor(timeIndex / 2) % 12] || "Không xác định";
}

// Display the Tu Vi chart
function displayTuViChart(chartData) {
  try {
    const palaces = document.querySelectorAll('.palace');
    
    if (!chartData || !chartData.palaces || !Array.isArray(chartData.palaces)) {
      throw new Error('Dữ liệu lá số không hợp lệ');
    }
    
    // Update chart info
    updateChartInfo(chartData.info);
    
    // Update palaces
    palaces.forEach((palace, index) => {
      if (index < chartData.palaces.length) {
        const palaceData = chartData.palaces[index];
        updatePalace(palace, palaceData);
      }
    });
    
    // Update chart details area
    updateChartDetails(chartData);
    
    // Show success message
    alert('Lá số Tử Vi đã được tạo thành công!');
  } catch (error) {
    console.error('Lỗi hiển thị lá số:', error);
    alert('Đã xảy ra lỗi trong khi hiển thị lá số. Vui lòng thử lại.');
  }
}

// Update chart info section
function updateChartInfo(info) {
  // Find or create info element
  let infoElement = document.querySelector('.chart-info');
  if (!infoElement) {
    infoElement = document.createElement('div');
    infoElement.className = 'chart-info';
    
    // Insert before chart grid
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
    <h3>Thông Tin Lá Số Tử Vi</h3>
    <div class="person-info">
      <p><strong>Giới tính:</strong> ${info.gender === 'male' ? 'Nam' : 'Nữ'}</p>
      <p><strong>Ngày sinh:</strong> ${formattedDate}</p>
      <p><strong>Giờ sinh:</strong> ${info.birthTimeText}</p>
      <p><strong>Năm sinh âm lịch:</strong> ${info.lunarYear} (${info.canChi} niên)</p>
    </div>
  `;
}

// Update a palace with Tu Vi data
function updatePalace(palaceElement, palaceData) {
  // Clear existing content
  palaceElement.innerHTML = '';
  
  // Create palace header
  const header = document.createElement('div');
  header.className = 'palace-header';
  header.innerHTML = `
    <div class="palace-name">${palaceData.name}</div>
    <div class="palace-chi">${palaceData.chi}</div>
  `;
  
  // Create major stars section
  const majorStars = document.createElement('div');
  majorStars.className = 'major-stars';
  
  if (palaceData.majorStars && palaceData.majorStars.length > 0) {
    palaceData.majorStars.forEach(star => {
      const starSpan = document.createElement('span');
      starSpan.className = `star star-${star.type} star-${star.color}`;
      starSpan.textContent = star.name;
      starSpan.title = TU_VI.STAR_MEANINGS[star.name] || '';
      majorStars.appendChild(starSpan);
    });
  }
  
  // Create minor stars section
  const minorStars = document.createElement('div');
  minorStars.className = 'minor-stars';
  
  if (palaceData.minorStars && palaceData.minorStars.length > 0) {
    palaceData.minorStars.forEach(star => {
      const starSpan = document.createElement('span');
      starSpan.className = `star star-${star.type} star-${star.color}`;
      starSpan.textContent = star.name;
      minorStars.appendChild(starSpan);
    });
  }
  
  // Append sections to palace
  palaceElement.appendChild(header);
  palaceElement.appendChild(majorStars);
  palaceElement.appendChild(minorStars);
  
  // Add element indicator
  const elementDiv = document.createElement('div');
  elementDiv.className = `element element-${TU_VI.ELEMENTS[palaceData.element] || 'earth'}`;
  elementDiv.textContent = palaceData.element;
  palaceElement.appendChild(elementDiv);
  
  // Add click handler for details
  palaceElement.addEventListener('click', () => {
    showPalaceDetails(palaceData);
  });
  
  // Add data attributes
  palaceElement.setAttribute('data-index', palaceData.index);
  palaceElement.setAttribute('data-name', palaceData.name);
}

// Update chart details area with overall information
function updateChartDetails(chartData) {
  const detailsDiv = document.querySelector('.chart-details');
  if (!detailsDiv) return;
  
  // Create initial content
  detailsDiv.innerHTML = `
    <h3>Luận Giải Lá Số Tử Vi</h3>
    <p>Nhấp vào từng cung để xem chi tiết ý nghĩa và luận giải.</p>
    <div class="overall-analysis"></div>
  `;
  
  // Add general chart analysis
  const overallDiv = detailsDiv.querySelector('.overall-analysis');
  if (overallDiv) {
    overallDiv.innerHTML = `
      <h4>Tổng Quan
