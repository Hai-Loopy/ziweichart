// Vietnamese Tu Vi birth chart calculator based on tuvi.cohoc.net
document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM loaded, initializing Tử Vi chart calculator...");
  
  // Initialize event handlers
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
      generateTuViChart(birthDate, birthTime, gender);
    } catch (error) {
      console.error('Error generating chart:', error);
      alert('Đã xảy ra lỗi trong khi tạo lá số. Vui lòng kiểm tra thông tin và thử lại.');
    }
  };
});

// Generate Tu Vi chart in the cohoc.net style
function generateTuViChart(birthDate, birthTime, gender) {
  // Parse birth date
  const date = new Date(birthDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  
  // Calculate Can Chi (stems and branches) for the year
  const canChiYear = calculateCanChiYear(year);
  
  // Create the chart HTML structure similar to cohoc.net
  const chartHTML = `
    <div class="tu-vi-chart">
      <div class="chart-title">
        <h2>Lá Số Tử Vi - ${gender === 'male' ? 'Nam' : 'Nữ'} mạng</h2>
        <p>Sinh ngày ${day} tháng ${month} năm ${year} (${canChiYear})</p>
        <p>Giờ sinh: ${convertHourToText(birthTime)}</p>
      </div>
      
      <div class="chart-grid">
        <!-- Top row -->
        <div class="chart-cell top-cell tuvipalace palace-7">
          <div class="palace-name">TẬT ÁCH</div>
          <div class="palace-content">
            <div class="main-star">THAM LANG</div>
            <div class="secondary-stars">
              <span class="good-star">Hồng Loan</span>
              <span class="bad-star">Thiên Khốc</span>
            </div>
          </div>
        </div>
        <div class="chart-cell top-cell tuvipalace palace-8">
          <div class="palace-name">TÀI BẠCH</div>
          <div class="palace-content">
            <div class="main-star">THÁI ÂM</div>
            <div class="secondary-stars">
              <span class="good-star">Hóa Lộc</span>
              <span class="neutral-star">Đường Phù</span>
            </div>
          </div>
        </div>
        <div class="chart-cell top-cell tuvipalace palace-9">
          <div class="palace-name">TỬ TỨC</div>
          <div class="palace-content">
            <div class="main-star">CỰ MÔN</div>
            <div class="secondary-stars">
              <span class="good-star">Thiên Khôi</span>
              <span class="bad-star">Thiên Hình</span>
            </div>
          </div>
        </div>
        <div class="chart-cell top-cell tuvipalace palace-10">
          <div class="palace-name">PHU THÊ</div>
          <div class="palace-content">
            <div class="main-star">THIÊN TƯỚNG</div>
            <div class="secondary-stars">
              <span class="good-star">Đào Hoa</span>
              <span class="neutral-star">Quốc Ấn</span>
            </div>
          </div>
        </div>
        
        <!-- Middle rows -->
        <div class="chart-cell left-cell tuvipalace palace-6">
          <div class="palace-name">THIÊN DI</div>
          <div class="palace-content">
            <div class="main-star">THẤT SÁT</div>
            <div class="secondary-stars">
              <span class="good-star">Thiên Mã</span>
              <span class="bad-star">Hóa Kỵ</span>
            </div>
          </div>
        </div>
        
        <div class="chart-central central-info">
          <div class="person-info">
            <p><strong>Tuổi:</strong> ${canChiYear}</p>
            <p><strong>Mệnh:</strong> ${calculateMenh(year, gender)}</p>
            <p><strong>Cung:</strong> ${calculateCung(birthDate, birthTime, gender)}</p>
            <p><strong>Thân:</strong> ${calculateThan(birthDate, birthTime, gender)}</p>
          </div>
        </div>
        
        <div class="chart-cell right-cell tuvipalace palace-11">
          <div class="palace-name">HUYNH ĐỆ</div>
          <div class="palace-content">
            <div class="main-star">THIÊN LƯƠNG</div>
            <div class="secondary-stars">
              <span class="good-star">Thiên Phúc</span>
              <span class="neutral-star">Lưu Hà</span>
            </div>
          </div>
        </div>
        
        <div class="chart-cell left-cell tuvipalace palace-5">
          <div class="palace-name">NÔ BỘC</div>
          <div class="palace-content">
            <div class="main-star">THIÊN ĐỒNG</div>
            <div class="secondary-stars">
              <span class="good-star">Văn Xương</span>
              <span class="bad-star">Đại Hao</span>
            </div>
          </div>
        </div>
        
        <div class="chart-cell right-cell tuvipalace palace-0">
          <div class="palace-name">MỆNH</div>
          <div class="palace-content">
            <div class="main-star">TỬ VI</div>
            <div class="secondary-stars">
              <span class="good-star">Thiên Phúc</span>
              <span class="good-star">Thiên Quý</span>
            </div>
          </div>
        </div>
        
        <!-- Bottom row -->
        <div class="chart-cell bottom-cell tuvipalace palace-4">
          <div class="palace-name">QUAN LỘC</div>
          <div class="palace-content">
            <div class="main-star">VŨ KHÚC</div>
            <div class="secondary-stars">
              <span class="good-star">Hóa Quyền</span>
              <span class="neutral-star">Thiên Việt</span>
            </div>
          </div>
        </div>
        <div class="chart-cell bottom-cell tuvipalace palace-3">
          <div class="palace-name">ĐIỀN TRẠCH</div>
          <div class="palace-content">
            <div class="main-star">LIÊM TRINH</div>
            <div class="secondary-stars">
              <span class="good-star">Hóa Khoa</span>
              <span class="bad-star">Thiên Hư</span>
            </div>
          </div>
        </div>
        <div class="chart-cell bottom-cell tuvipalace palace-2">
          <div class="palace-name">PHÚC ĐỨC</div>
          <div class="palace-content">
            <div class="main-star">THÁI DƯƠNG</div>
            <div class="secondary-stars">
              <span class="good-star">Văn Khúc</span>
              <span class="neutral-star">Thiên Tài</span>
            </div>
          </div>
        </div>
        <div class="chart-cell bottom-cell tuvipalace palace-1">
          <div class="palace-name">PHỤ MẪU</div>
          <div class="palace-content">
            <div class="main-star">THIÊN CƠ</div>
            <div class="secondary-stars">
              <span class="good-star">Thiên Quan</span>
              <span class="bad-star">Tử Phù</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="chart-legend">
        <h3>Chú thích</h3>
        <div class="legend-item">
          <span class="legend-main-star">CHÍNH TINH</span>: Các sao chính
        </div>
        <div class="legend-item">
          <span class="legend-good">Phụ tốt</span>: Các sao phụ tốt
        </div>
        <div class="legend-item">
          <span class="legend-bad">Phụ xấu</span>: Các sao phụ xấu
        </div>
        <div class="legend-item">
          <span class="legend-neutral">Phụ bình</span>: Các sao phụ bình thường
        </div>
      </div>
      
      <div class="chart-details">
        <h3>Luận Giải</h3>
        <div class="palace-details">
          <p>Nhấp vào từng cung để xem chi tiết.</p>
        </div>
      </div>
    </div>
  `;
  
  // Create a chart container if it doesn't exist
  let chartContainer = document.querySelector('.chart-container');
  if (!chartContainer) {
    chartContainer = document.createElement('div');
    chartContainer.className = 'chart-container';
    document.querySelector('.container').appendChild(chartContainer);
  }
  
  // Insert chart into container
  chartContainer.innerHTML = chartHTML;
  
  // Add click events to palaces
  const palaces = document.querySelectorAll('.tuvipalace');
  palaces.forEach(palace => {
    palace.addEventListener('click', function() {
      const palaceName = this.querySelector('.palace-name').textContent;
      showPalaceDetails(palaceName);
    });
  });
}

// Helper function to calculate Can Chi for a year
function calculateCanChiYear(year) {
  const CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
  const CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
  
  const canIndex = (year - 4) % 10;
  const chiIndex = (year - 4) % 12;
  
  return `${CAN[canIndex]} ${CHI[chiIndex]}`;
}

// Helper function to convert hour index to text
function convertHourToText(hourIndex) {
  const hours = [
    "Tý (23h-1h)", "Sửu (1h-3h)", "Dần (3h-5h)", "Mão (5h-7h)", 
    "Thìn (7h-9h)", "Tỵ (9h-11h)", "Ngọ (11h-13h)", "Mùi (13h-15h)", 
    "Thân (15h-17h)", "Dậu (17h-19h)", "Tuất (19h-21h)", "Hợi (21h-23h)"
  ];
  
  return hours[Math.floor(hourIndex / 2) % 12] || "Không xác định";
}

// Calculate the menh element based on year and gender
function calculateMenh(year, gender) {
  // This is a simplified calculation
  const elements = ['Kim', 'Thủy', 'Hỏa', 'Thổ', 'Mộc'];
  const descriptions = {
    'Kim': 'Kim (vàng, kim loại)',
    'Thủy': 'Thủy (nước)',
    'Hỏa': 'Hỏa (lửa)',
    'Thổ': 'Thổ (đất)',
    'Mộc': 'Mộc (gỗ, cây)'
  };
  
  // Simple algorithm for demo purposes
  const index = (year + (gender === 'male' ? 0 : 1)) % 5;
  return descriptions[elements[index]];
}

// Calculate cung based on birth date, time and gender
function calculateCung(birthDate, birthTime, gender) {
  // Simplified calculation
  const cungNames = [
    'Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 
    'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'
  ];
  
  const date = new Date(birthDate);
  const month = date.getMonth() + 1;
  
  // Simple algorithm for demo purposes
  const index = (month + birthTime + (gender === 'male' ? 0 : 6)) % 12;
  return cungNames[index];
}

// Calculate than based on birth date, time and gender
function calculateThan(birthDate, birthTime, gender) {
  // Simplified calculation
  const thanNames = [
    'Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 
    'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'
  ];
  
  const date = new Date(birthDate);
  const day = date.getDate();
  
  // Simple algorithm for demo purposes
  const index = (day + birthTime + (gender === 'male' ? 6 : 0)) % 12;
  return thanNames[index];
}

// Show details for a specific palace
function showPalaceDetails(palaceName) {
  const palaceDetailsContent = getPalaceDescription(palaceName);
  const detailsContainer = document.querySelector('.palace-details');
  
  if (detailsContainer) {
    detailsContainer.innerHTML = `
      <h4>${palaceName}</h4>
      ${palaceDetailsContent}
    `;
    
    // Scroll to details
    detailsContainer.scrollIntoView({ behavior: 'smooth' });
  }
}

// Get description for a palace
function getPalaceDescription(palaceName) {
  const descriptions = {
    'MỆNH': `
      <p>Cung Mệnh chỉ tính cách, số phận và vận mệnh của con người. Đây là cung quan trọng nhất trong lá số Tử Vi.</p>
      <p>Với sao Tử Vi tọa mệnh, người này có số mệnh tốt, có cơ hội thăng tiến trong công việc, cuộc sống hạnh phúc và tuổi thọ cao.</p>
      <p>Thiên Phúc và Thiên Quý hội tụ: Người này được trời ban nhiều phúc lộc, dễ gặp quý nhân giúp đỡ, cuộc đời nhiều may mắn.</p>
    `,
    'PHỤ MẪU': `
      <p>Cung Phụ Mẫu chỉ mối quan hệ với cha mẹ, người bề trên và cấp trên.</p>
      <p>Với sao Thiên Cơ: Người này thông minh, có trí tuệ tốt, quan hệ với bề trên tương đối thuận lợi nhưng đôi khi thiếu sự ổn định.</p>
      <p>Thiên Quan: Được cấp trên nâng đỡ, giúp đỡ. Tử Phù: Có thể có xung đột hoặc khó khăn trong mối quan hệ với cha mẹ.</p>
    `,
    'PHÚC ĐỨC': `
      <p>Cung Phúc Đức nói về phúc báo, đức độ, tâm linh và sự bình an trong tâm hồn.</p>
      <p>Thái Dương ở cung Phúc Đức: Người này có phúc lớn, được hưởng cuộc sống sung túc, có sức khỏe tốt và tâm hồn thanh thản.</p>
      <p>Văn Khúc: Có năng khiếu văn chương, nghệ thuật, mang đến niềm vui trong cuộc sống. Thiên Tài: Có tài lộc bất ngờ.</p>
    `,
    'ĐIỀN TRẠCH': `
      <p>Cung Điền Trạch chỉ về nhà cửa, đất đai, tài sản cố định.</p>
      <p>Liêm Trinh tọa cung Điền Trạch: Việc mua bán nhà đất cần cẩn trọng, có thể gặp tranh chấp, kiện tụng liên quan đến tài sản.</p>
      <p>Hóa Khoa: Giúp giảm thiểu rủi ro, việc mua bán nhà đất có thể thuận lợi hơn. Thiên Hư: Cần đề phòng mất mát, hư hỏng về nhà cửa.</p>
    `,
    'QUAN LỘC': `
      <p>Cung Quan Lộc nói về sự nghiệp, công danh, địa vị xã hội.</p>
      <p>Vũ Khúc tọa cung Quan Lộc: Người này có khả năng quản lý tài chính tốt, thích hợp làm việc trong lĩnh vực ngân hàng, tài chính, kế toán.</p>
      <p>Hóa Quyền: Có quyền lực, khả năng lãnh đạo, dễ thăng tiến trong sự nghiệp. Thiên Việt: Có danh tiếng, được người khác tôn trọng.</p>
    `,
    'NÔ BỘC': `
      <p>Cung Nô Bộc nói về mối quan hệ với bạn bè, đồng nghiệp, người giúp việc.</p>
      <p>Thiên Đồng tọa cung Nô Bộc: Người này được bạn bè, đồng nghiệp quý mến, giúp đỡ, có các mối quan hệ tốt đẹp.</p>
      <p>Văn Xương: Có bạn bè học thức, tài năng. Đại Hao: Cần cẩn thận khi cho bạn bè vay mượn tiền bạc.</p>
    `,
    'THIÊN DI': `
      <p>Cung Thiên Di liên quan đến việc đi lại, du lịch, sống xa quê hương.</p>
      <p>Thất Sát tọa cung Thiên Di: Người này năng động, thích đi lại, nhưng có thể gặp rủi ro khi đi xa, nên cẩn thận khi di chuyển.</p>
      <p>Thiên Mã: Thường xuyên di chuyển, đi xa, có cơ hội phát triển ở nơi xa quê. Hóa Kỵ: Cần đề phòng tai nạn khi đi xa.</p>
    `,
    'TẬT ÁCH': `
      <p>Cung Tật Ách nói về sức khỏe, bệnh tật, tai ương.</p>
      <p>Tham Lang tọa cung Tật Ách: Người này có thể mắc các bệnh liên quan đến tiêu hóa, gan, mật. Cần chú ý chế độ ăn uống hợp lý.</p>
      <p>Hồng Loan: Có thể có các vấn đề liên quan đến sinh lý, nội tiết. Thiên Khốc: Có thể gặp các bệnh mãn tính, khó chữa.</p>
    `,
    'TÀI BẠCH': `
      <p>Cung Tài Bạch nói về tiền bạc, thu nhập, của cải.</p>
      <p>Thái Âm tọa cung Tài Bạch: Tài chính của người này thay đổi thất thường, có lúc lên lúc xuống, nhưng nhìn chung khá dồi dào.</p>
      <p>Hóa Lộc: Có tài lộc tốt, dễ kiếm tiền, có của cải dư dả. Đường Phù: Có nguồn thu nhập ổn định, đều đặn.</p>
    `,
    'TỬ TỨC': `
      <p>Cung Tử Tức nói về con cái, tình duyên với con cái.</p>
      <p>Cự Môn tọa cung Tử Tức: Quan hệ với con cái có thể có nhiều xung đột, cần kiên nhẫn và khéo léo trong cách giáo dục con.</p>
      <p>Thiên Khôi: Con cái thông minh, có triển vọng. Thiên Hình: Có thể con cái bướng bỉnh, khó dạy.</p>
    `,
    'PHU THÊ': `
      <p>Cung Phu Thê nói về hôn nhân, vợ chồng, tình duyên.</p>
      <p>Thiên Tướng tọa cung Phu Thê: Người phối ngẫu có tính cách mạnh mẽ, quyết đoán, có khả năng lãnh đạo, chỉ huy.</p>
      <p>Đào Hoa: Đời sống vợ chồng hạnh phúc, có tình yêu đẹp. Quốc Ấn: Người phối ngẫu có địa vị trong xã hội.</p>
    `,
    'HUYNH ĐỆ': `
      <p>Cung Huynh Đệ nói về anh chị em, mối quan hệ với anh chị em ruột.</p>
      <p>Thiên Lương tọa cung Huynh Đệ: Người này có mối quan hệ tốt đẹp với anh chị em, luôn được họ giúp đỡ, hỗ trợ.</p>
      <p>Thiên Phúc: Anh chị em sống hòa thuận, giúp đỡ lẫn nhau. Lưu Hà: Có thể có khoảng cách về địa lý với anh chị em.</p>
    `
  };
  
  return descriptions[palaceName] || '<p>Không có thông tin chi tiết cho cung này.</p>';
}
