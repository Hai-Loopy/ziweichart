
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
    const astrolabe = window.iztro.astro.bySolar(birthDate, birthTime, gender, true, 'vi-VN');
    displayChart(astrolabe);
  } catch (error) {
    console.error('Lỗi:', error);
    alert('Đã xảy ra lỗi trong khi tạo lá số. Vui lòng kiểm tra thông tin và thử lại.');
  }
};

function displayChart(astrolabe) {
  const palaces = document.querySelectorAll('.palace');
  palaces.forEach((palace, index) => {
    const palaceData = astrolabe.chart.palaces[index];
    palace.innerHTML = `<strong>${palaceData.name.vi}</strong><br>${palaceData.majorStars.map(star => star.name.vi).join(', ')}`;
  });

  document.querySelector('.chart-details').innerHTML = `<pre>${JSON.stringify(astrolabe, null, 2)}</pre>`;
}
