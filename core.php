<?php
// This is a mock-up of what the core.php file might look like
// In a real implementation, this would contain the actual logic for generating horoscope data

header('Content-Type: application/json');

// Get parameters from request
$hoten = isset($_GET['hoten']) ? $_GET['hoten'] : '';
$isDuong = isset($_GET['isDuong']) ? $_GET['isDuong'] : 1;
$isNam = isset($_GET['isNam']) ? $_GET['isNam'] : 1;
$gio = isset($_GET['gio']) ? $_GET['gio'] : 0;
$ngay = isset($_GET['ngay']) ? $_GET['ngay'] : 1;
$thang = isset($_GET['thang']) ? $_GET['thang'] : 1;
$nam = isset($_GET['nam']) ? $_GET['nam'] : 2000;
$namHan = isset($_GET['namHan']) ? $_GET['namHan'] : date('Y');

// Create mock horoscope data
$response = [
    'Info' => [
        'SQL' => '',
        'Nam' => 'Canh Thân',
        'Thang' => 'Tháng 1',
        'Ngay' => 'Ngày 1',
        'ThangCC' => 'Giáp Dần',
        'ThangCCNH' => 3,
        'NgayCC' => 'Đinh Sửu',
        'NgayCCNH' => 4,
        'GioCC' => 'Mậu Tý',
        'GioCCNH' => 5,
        'AmDuong' => 'Dương Nam',
        'MenhCuc' => 'Mệnh Kim',
        'MenhCuc2' => 4,
        'Cuc' => 'Cục Thổ',
        'CucNH' => 5,
        'Cuc2' => 5,
        'Que' => 'Càn',
        'ChuMenh' => 'Thái Dương',
        'ChuThan' => 'Thiên Cơ',
        'VTMenh' => 2,
        'CanNam' => 0,
        'NguyetHan' => 1,
        'NamHan' => 'Giáp Tý',
        'NguHanhHan' => 3,
        'SaoHan' => 'La Hầu',
        'Tuoi' => '35',
        'Tuoi2' => 35,
        'GioPham' => 'Tý, Ngọ, Mão, Dậu'
    ],
    'Cung' => []
];

// Create 12 mock cung (houses)
for ($i = 0; $i < 12; $i++) {
    $names = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
    $than = ($i == 2) ? 1 : 0; // Example: Than at Dần
    
    $cung = [
        'Name' => $names[$i],
        'Than' => $than,
        'CanCung' => ($i % 10),
        'ChiCung' => $i,
        'NguHanhCung' => (($i % 5) + 2),
        'TrangSinh' => 'Tử',
        'SoCuc' => '5',
        'TieuHan' => '2025',
        'LocNhap' => 'Dần',
        'KyNhap' => 'Thân',
        'LuuDaiHan' => 0,
        'LuuDaiHanTen' => '',
        'LuuTieuHanTen' => '',
        'ThangHan' => ($i + 1),
        'Tuan' => ($i == 3) ? 1 : 0,
        'Triet' => ($i == 9) ? 1 : 0,
        'LuuTuan' => 0,
        'LuuTriet' => 0,
        'nChinhTinh' => 2,
        'ChinhTinh' => [
            ['Name' => 'Tử Vi', 'Status' => 'Đ', 'NguHanh' => 5],
            ['Name' => 'Thiên Cơ', 'Status' => 'M', 'NguHanh' => 3]
        ],
        'nSaoTot' => 3,
        'Saotot' => [
            ['Name' => 'Thiên Đức', 'NguHanh' => 4, 'Highline' => 1],
            ['Name' => 'Nguyệt Đức', 'NguHanh' => 3, 'Highline' => 0],
            ['Name' => 'Thiên Quý', 'NguHanh' => 5, 'Highline' => 0]
        ],
        'nSaoXau' => 2,
        'Saoxau' => [
            ['Name' => 'Địa Không', 'NguHanh' => 2, 'Highline' => 1],
            ['Name' => 'Địa Kiếp', 'NguHanh' => 4, 'Highline' => 0]
        ]
    ];
    
    $response['Cung'][] = $cung;
}

echo json_encode($response);
?>
