(function () {
  'use strict';

  var app = document.getElementById('app');
  var toastRegion = document.getElementById('toastRegion');
  var params = new URLSearchParams(window.location.search);
  var screenId = (params.get('screen') || 'D01').toUpperCase();
  var state = (params.get('state') || 'default').toLowerCase();
  var captureMode = params.get('capture') === '1';
  var myMapsId = '162tQYhvtsP6Em5ssfK6v2SnuCO3J94w';
  var myMapsCenter = '11.482778221248616,108.04957928253076';
  var myMapsEmbedUrl = 'https://www.google.com/maps/d/embed?mid=' + myMapsId + '&ll=' + myMapsCenter + '&z=9&ehbc=2E312F';
  var myMapsViewerUrl = 'https://www.google.com/maps/d/viewer?mid=' + myMapsId + '&ll=' + myMapsCenter + '&z=9';

  var icons = {
    grid: '<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
    map: '<path d="m3 6 5-3 8 3 5-3v15l-5 3-8-3-5 3V6Z"/><path d="M8 3v15m8-12v15"/>',
    route: '<circle cx="6" cy="19" r="2.5"/><circle cx="18" cy="5" r="2.5"/><path d="M8.5 19h2a3 3 0 0 0 3-3v-1a3 3 0 0 0-3-3h-1a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3h6"/>',
    alert: '<path d="M10.3 4.1 2.7 17a2 2 0 0 0 1.7 3h15.2a2 2 0 0 0 1.7-3L13.7 4.1a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4m0 3.5v.1"/>',
    tool: '<path d="m14.7 6.3 3-3a5 5 0 0 1-6.3 6.3L5.7 15.3a2.4 2.4 0 1 0 3.4 3.4l5.7-5.7a5 5 0 0 1 6.2-6.3l-3 3-3.3-.8-.8-3.3Z"/>',
    bridge: '<path d="M3 19h18M5 19V9m14 10V9M5 13h14M7 13a5 5 0 0 1 10 0M3 9h18"/>',
    chart: '<path d="M4 20V10m6 10V4m6 16v-7m4 7H2"/>',
    folder: '<path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"/><path d="m8 14 2.5 2.5L16 11"/>',
    file: '<path d="M6 2h8l4 4v16H6V2Z"/><path d="M14 2v5h5M9 12h6m-6 4h6"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9m-8 12h4"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    filter: '<path d="M4 5h16M7 12h10m-7 7h4"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    pin: '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    x: '<path d="m6 6 12 12M18 6 6 18"/>',
    upload: '<path d="M12 16V4m0 0L7 9m5-5 5 5"/><path d="M4 15v5h16v-5"/>',
    wifi: '<path d="M5 12.5a10 10 0 0 1 14 0M8 16a6 6 0 0 1 8 0m-5 3a1.5 1.5 0 0 1 2 0"/>',
    refresh: '<path d="M20 7v5h-5M4 17v-5h5"/><path d="M6.1 9A7 7 0 0 1 18 7l2 5M18 15a7 7 0 0 1-12 2l-2-5"/>',
    database: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
    phone: '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M10 18h4"/>',
    camera: '<path d="M4 7h3l2-3h6l2 3h3v12H4V7Z"/><circle cx="12" cy="13" r="3"/>',
    layers: '<path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 17l9 5 9-5"/>',
    lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    download: '<path d="M12 3v12m0 0 5-5m-5 5-5-5"/><path d="M4 19h16"/>',
    chevron: '<path d="m9 18 6-6-6-6"/>'
  };

  function icon(name) {
    return '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">' + (icons[name] || icons.grid) + '</svg>';
  }

  function badge(text, tone) {
    return '<span class="badge ' + (tone || '') + '">' + text + '</span>';
  }

  function button(text, kind, action, iconName) {
    return '<button class="button ' + (kind || 'secondary') + '" data-action="' + (action || text) + '">' + (iconName ? icon(iconName) : '') + text + '</button>';
  }

  function metric(label, value, unit, foot, tone, trend) {
    return '<article class="card metric-card">' +
      '<div class="metric-top"><span class="metric-icon ' + (tone || '') + '">' + icon(tone === 'red' ? 'alert' : tone === 'amber' ? 'chart' : tone === 'teal' ? 'route' : 'grid') + '</span><span class="trend ' + (trend && trend.indexOf('-') === 0 ? 'down' : '') + '">' + (trend || '') + '</span></div>' +
      '<span class="metric-label">' + label + '</span><strong class="metric-value">' + value + ' <small>' + unit + '</small></strong>' +
      '<div class="metric-foot"><span>' + foot + '</span><span>Chi tiết →</span></div></article>';
  }

  function card(title, eyebrow, body, tools, extraClass) {
    return '<article class="card ' + (extraClass || '') + '"><div class="card-head"><div><span class="eyebrow">' + (eyebrow || '') + '</span><h2>' + title + '</h2></div>' + (tools || '') + '</div><div class="card-body">' + body + '</div></article>';
  }

  function queueItem(title, sub, tone, status, time, selected) {
    return '<button class="queue-item ' + (selected ? 'selected' : '') + '" data-action="Mở hồ sơ: ' + title + '"><span class="queue-icon ' + (tone || '') + '">' + icon(tone === 'red' ? 'alert' : tone === 'amber' ? 'clock' : tone === 'teal' ? 'check' : 'file') + '</span><span class="queue-copy"><strong>' + title + '</strong><small>' + sub + '</small></span><span class="queue-meta">' + badge(status, tone === 'red' ? 'danger' : tone === 'amber' ? 'warning' : tone === 'teal' ? 'success' : 'info') + '<small>' + time + '</small></span></button>';
  }

  function mapBlock(options) {
    options = options || {};
    var compact = Boolean(options.compact);
    var offline = Boolean(options.offline);
    var callouts = {
      incident: badge('Khẩn cấp', 'danger') + '<strong>Sạt lở taluy dương</strong><small>QL.1 · Km 1692+000 · dữ liệu nghiệp vụ minh họa</small>',
      asset: badge('Tài sản đang chọn', 'info') + '<strong>CONG-004218 · Cống hộp</strong><small>QL.1 · Km 1692+000 · GPS RTK ± 0,42 m</small>',
      qa: badge('Bị chặn QA', 'danger') + '<strong>CONG-004218 · nghi trùng</strong><small>Khoảng cách 3,2 m · sai số mobile 12,8 m</small>',
      public: badge('Đang xử lý', 'warning') + '<strong>Điểm sạt lở/ngập nước</strong><small>Thông tin portal minh họa trên nền map tham chiếu</small>'
    };
    var classes = ['map', 'google-map'];
    if (compact) classes.push('mobile-map');
    if (offline) classes.push('offline-map-preview');
    if (offline || captureMode) classes.push('static-map-preview');
    if (options.publicMap) classes.push('public-google-map');
    if (options.className) classes.push(options.className);

    var interactiveFrame = (!offline && !captureMode) ? '<iframe class="google-map-frame" data-google-map title="Bản đồ phạm vi Văn phòng Quản lý đường bộ IV.1 trên Google My Maps" src="' + myMapsEmbedUrl + '" loading="eager" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>' : '';

    return '<div class="' + classes.join(' ') + '">' +
      '<div class="map-fallback">' + icon('map') + '<strong>Đang tải Google My Maps</strong><small>Cần Internet để tải bản đồ tham chiếu.</small></div>' +
      '<img class="map-reference-image" src="assets/google-mymaps-reference.png" alt="Ảnh tham chiếu từ bản đồ Google My Maps phạm vi Văn phòng Quản lý đường bộ IV.1">' +
      interactiveFrame +
      (offline ? '<span class="map-status-chip offline">Mô phỏng nền map đã cache · 06:24</span>' : '<span class="map-status-chip">Google My Maps · nguồn tham chiếu công khai</span>') +
      (compact ? '<span class="gps-chip">GPS ± ' + (options.gpsError || '4,8 m') + ' · ' + (options.chainage || 'Km 42+680') + '</span>' : '') +
      (options.callout && callouts[options.callout] ? '<div class="map-callout">' + callouts[options.callout] + '</div>' : '') +
      '<a class="map-source-link" href="' + myMapsViewerUrl + '" target="_blank" rel="noreferrer" aria-label="Mở bản đồ nguồn trên Google My Maps">' + icon('map') + '<span>Mở map nguồn</span></a>' +
      '</div>';
  }

  function table(headers, rows) {
    return '<div class="table-wrap"><table class="data-table"><thead><tr>' + headers.map(function (h) { return '<th>' + h + '</th>'; }).join('') + '</tr></thead><tbody>' +
      rows.map(function (row) { return '<tr>' + row.map(function (cell) { return '<td>' + cell + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>';
  }

  function timeline(items) {
    return '<div class="timeline">' + items.map(function (item) {
      return '<div class="timeline-item ' + (item[3] || '') + '"><div><strong>' + item[0] + '</strong><small>' + item[1] + '</small></div><time>' + item[2] + '</time></div>';
    }).join('') + '</div>';
  }

  function stepper(labels, active) {
    return '<div class="stepper">' + labels.map(function (label, index) {
      return '<div class="step ' + (index < active ? 'done' : index === active ? 'active' : '') + '"><b>' + (index < active ? '✓' : index + 1) + '</b><span>' + label + '</span></div>';
    }).join('') + '</div>';
  }

  var navGroups = [
    { label: 'Điều hành', items: [['D01', 'grid', 'Tổng quan'], ['D02', 'map', 'Trung tâm GIS'], ['D04', 'alert', 'Tiếp nhận & tuần kiểm']] },
    { label: 'Nghiệp vụ', items: [['D05', 'tool', 'Công việc & duy tu'], ['D03', 'bridge', 'Tài sản & quy hoạch'], ['D07', 'folder', 'Dự án & vốn'], ['D10', 'file', 'Hồ sơ số'], ['D11', 'chart', 'Báo cáo']] },
    { label: 'Nền tảng', items: [['D13', 'shield', 'Quản trị & audit'], ['D14', 'database', 'Vận hành hệ thống'], ['M01', 'phone', 'Ứng dụng hiện trường']] }
  ];

  function sidebar(active) {
    var nav = navGroups.map(function (group) {
      return '<span class="nav-caption">' + group.label + '</span>' + group.items.map(function (item) {
        return '<button class="nav-item ' + (item[0] === active ? 'active' : '') + '" data-screen="' + item[0] + '">' + icon(item[1]) + '<span>' + item[2] + '</span>' + (item[0] === 'D04' ? '<span class="nav-badge danger">5</span>' : '') + '</button>';
      }).join('');
    }).join('');
    return '<aside class="sidebar"><div class="brand"><span class="brand-mark"></span><span class="brand-copy"><strong>Hạ tầng số</strong><small>Quản lý bảo trì đường bộ</small></span></div><div class="nav-scroll">' + nav + '</div><div class="sidebar-foot"><button class="tenant-card" data-action="Đổi phạm vi dữ liệu">' + icon('map') + '<span><strong>Đơn vị quản lý mẫu</strong><small>03 tuyến · 428 km</small></span></button><button class="user-card" data-action="Mở hồ sơ người dùng"><span class="avatar">NM</span><span><strong>Nguyễn Minh</strong><small>Lãnh đạo điều hành</small></span></button></div></aside>';
  }

  function stateBanner() {
    if (state === 'default') return '';
    var states = {
      loading: ['Đang tải dữ liệu', 'Hệ thống đang lấy dữ liệu mới nhất theo phạm vi đã chọn.', 'info'],
      empty: ['Không có dữ liệu phù hợp', 'Hãy thay đổi bộ lọc hoặc phạm vi tuyến.', 'info'],
      error: ['Không thể tải dữ liệu', 'Kết nối dịch vụ tạm thời gián đoạn. Dữ liệu gần nhất vẫn được giữ.', ''],
      permission: ['Không đủ quyền truy cập', 'Vai trò hiện tại không được xem trường dữ liệu nhạy cảm này.', 'warning'],
      stale: ['Dữ liệu có thể đã cũ', 'Lần đồng bộ cuối 35 phút trước. Kiểm tra kết nối trước khi ra quyết định.', 'warning']
    };
    var item = states[state] || states.error;
    return '<div class="alert-banner ' + item[2] + ' state-banner">' + icon(item[2] === 'warning' ? 'clock' : 'alert') + '<div><strong>' + item[0] + '</strong><small>' + item[1] + '</small></div></div>';
  }

  function desktop(meta, body) {
    document.title = meta.code + ' — ' + meta.title;
    return '<div class="app-shell">' + sidebar(meta.nav || meta.code) + '<div class="workspace"><header class="topbar"><div class="breadcrumb"><span>Hạ tầng số</span>' + icon('chevron') + '<strong>' + meta.breadcrumb + '</strong></div><div class="top-actions"><label class="search-box">' + icon('search') + '<input type="search" aria-label="Tìm kiếm toàn hệ thống" placeholder="Tìm mã, tuyến, Km+m…"><kbd>Ctrl K</kbd></label><button class="icon-button notification-dot" aria-label="Thông báo" data-action="Mở trung tâm thông báo">' + icon('bell') + '</button>' + button('Tạo nhanh', 'primary', 'Mở menu tạo nhanh', 'plus') + '</div></header><main class="content"><div class="page-head"><div><span class="eyebrow">' + meta.code + ' · ' + meta.eyebrow + '</span><h1>' + meta.title + '</h1><p>' + meta.description + '</p></div><div class="page-actions">' + badge('Dữ liệu minh họa', 'warning') + badge(meta.ids, 'info') + (meta.actions || button('Bộ lọc', 'secondary small', 'Mở bộ lọc', 'filter')) + '</div></div>' + stateBanner() + body + '</main></div></div>';
  }

  function mobile(meta, body, active) {
    document.title = meta.code + ' — ' + meta.title;
    var nav = [['M01', 'grid', 'Hôm nay'], ['M03', 'tool', 'Việc'], ['M02', 'map', 'Bản đồ'], ['M04', 'plus', 'Ghi nhận'], ['M05', 'refresh', 'Đồng bộ']];
    return '<div class="mobile-app"><div class="mobile-status"><span>06:42</span><span>4G · 82%</span></div><header class="mobile-top"><div><small>' + meta.code + ' · DỮ LIỆU MINH HỌA</small><h1>' + meta.title + '</h1></div><button class="mobile-icon" aria-label="Thông báo" data-action="Mở thông báo">' + icon('bell') + '</button></header><main class="mobile-content">' + stateBanner() + body + '</main><nav class="mobile-nav">' + nav.map(function (item) { return '<button class="' + (item[0] === active ? 'active' : '') + '" data-screen="' + item[0] + '">' + icon(item[1]) + '<span>' + item[2] + '</span></button>'; }).join('') + '</nav></div>';
  }

  function D01() {
    var metrics = '<div class="grid-4">' +
      metric('Sự cố đang mở', '18', 'vụ', '5 vụ quá SLA', 'red', '+3 mới') +
      metric('Phủ tuần đường', '78', '%', '126,8 / 162 km', 'teal', '+8,2%') +
      metric('Giải ngân SCĐK', '68,4', '%', '342 / 500 tỷ', 'amber', '+4,6%') +
      metric('Tài sản đủ dữ liệu', '92,6', '%', '12.482 tài sản', '', '+1,4%') + '</div>';
    var queue = '<div class="queue">' +
      queueItem('Sạt lở taluy dương', 'QL.1 · Km 1692+000 · chưa xác nhận', 'red', 'Quá SLA 18′', '08:42', true) +
      queueItem('Dự án SCĐK-07 chậm 12 ngày', 'ĐT.155 · Giải ngân thấp hơn kế hoạch', 'amber', 'Cần quyết định', '34′') +
      queueItem('03 bảo lãnh sắp hết hạn', 'Nhóm hồ sơ hợp đồng · trong 05 ngày', '', 'Sắp đến hạn', '1 giờ') +
      queueItem('396/428 tài sản đã đạt QA', 'Dự án cầu Nậm Xé · chờ phê duyệt', 'teal', 'Chờ duyệt', 'Hôm nay') + '</div>';
    var lower = '<div class="grid-2 mt-14">' +
      card('Công việc hôm nay', 'Thực thi', '<div class="status-strip"><div><small>Tổng việc</small><strong>32</strong></div><div><small>Hoàn thành</small><strong>21</strong></div><div><small>Đang làm</small><strong>8</strong></div><div><small>Quá hạn</small><strong style="color:var(--red-700)">3</strong></div></div><div style="padding-top:12px"><div class="progress"><i style="width:66%"></i></div></div>', button('Xem kế hoạch', 'secondary small', 'Mở kế hoạch')) +
      card('Sai lệch tiến độ & giải ngân', 'Dự án cần chú ý', table(['Dự án', 'Thi công', 'Giải ngân', 'Sai lệch'], [
        ['<strong>SCĐK QL.4D</strong><small>SCĐK-03</small>', '88%', '85%', '<span class="trend">+2 ngày</span>'],
        ['<strong>Cải tạo ĐT.155</strong><small>SCĐK-07</small>', '62%', '65%', '<span class="trend down">−12 ngày</span>'],
        ['<strong>Cầu Nậm Xé</strong><small>XDCB-12</small>', '54%', '46%', '<span class="trend down">−6 ngày</span>']
      ]), button('Phân tích', 'secondary small', 'Mở phân tích')) + '</div>';
    return desktop({ code: 'D01', nav: 'D01', eyebrow: 'Dashboard theo vai trò', breadcrumb: 'Tổng quan', title: 'Trung tâm điều hành', description: 'Ngoại lệ cần quyết định trên toàn bộ mạng lưới, có kỳ dữ liệu và truy ngược về bản ghi nguồn.', ids: 'G2.01 · E06 · E07', actions: button('Tháng 07/2026', 'secondary', 'Đổi kỳ dữ liệu', 'clock') + button('Xuất báo cáo', 'primary', 'Xuất báo cáo điều hành', 'download') }, metrics + '<div class="split-main mt-14">' + card('Tình hình trên mạng lưới', 'Google My Maps · phạm vi VP QLĐB IV.1', mapBlock({ callout: 'incident' }), '<div class="chips"><button class="chip active" data-tab>Tất cả</button><button class="chip" data-tab>Sự cố</button><button class="chip" data-tab>Dự án</button></div>', 'map-card') + card('Cần quyết định hôm nay', 'Ưu tiên theo SLA', queue, button('Xem tất cả 18 mục', 'secondary small', 'Mở hàng đợi')) + '</div>' + lower);
  }

  function D02() {
    var layers = card('Lớp dữ liệu', 'Preset điều hành', '<div class="folder-tree"><div class="folder-row active">' + icon('alert') + ' Sự cố đang mở <b>18</b></div><div class="folder-row">' + icon('route') + ' Tổ tuần trực tuyến <b>12</b></div><div class="folder-row">' + icon('bridge') + ' Hiện trạng tài sản <b>13.478</b></div><div class="folder-row">' + icon('folder') + ' Dự án đang thi công <b>24</b></div><div class="folder-row">' + icon('layers') + ' Quy hoạch đến 2030 <b>07</b></div></div><div class="alert-banner info mt-14">' + icon('wifi') + '<div><strong>12/15 tổ đang trực tuyến</strong><small>Cập nhật vị trí 30 giây trước</small></div></div>', '<button class="chip active" data-tab>Điều hành</button>');
    var commandMap = '<div class="card" style="overflow:hidden">' + mapBlock({ callout: 'incident' }) + '<div class="status-strip"><div><small>Đối tượng đã chọn</small><strong>SC-2026-018</strong></div><div><small>Thời điểm</small><strong>08:42</strong></div><div><small>Phụ trách</small><strong>Đội BT số 1</strong></div><div><small>SLA còn lại</small><strong style="color:var(--red-700)">Quá 18 phút</strong></div></div></div>';
    var queue = card('Hàng đợi điều hành', '18 mục đang mở', '<div class="queue">' + queueItem('Sạt lở taluy dương', 'QL.1 · Km 1692+000', 'red', 'Khẩn', 'Quá 18′', true) + queueItem('Ca tuần chưa bắt đầu', 'QL.1 · Ca 07:00', 'amber', 'Chậm 42′', '07:42') + queueItem('Ngập cục bộ sau mưa', 'QL.1 · Km 1651+100', '', 'Chờ xác minh', '12′') + queueItem('Vá ổ gà quá hạn', 'QL.1 · Km 1705+300', 'amber', 'Quá hạn', '1 ngày') + '</div>', button('Phân công', 'primary small', 'Phân công xử lý'));
    return desktop({ code: 'D02', nav: 'D02', eyebrow: 'Bản đồ trực tuyến', breadcrumb: 'Trung tâm điều hành', title: 'Điều hành GIS theo thời gian thực', description: 'Đồng bộ lựa chọn giữa bản đồ, hàng đợi và ngữ cảnh tuyến; chỉ bật các lớp cần cho nhiệm vụ hiện tại.', ids: 'A02 · A05 · B01 · G3.02', actions: button('Lưu góc nhìn', 'secondary', 'Lưu góc nhìn', 'layers') }, '<div style="display:grid;grid-template-columns:245px minmax(0,1fr) 330px;gap:14px">' + layers + commandMap + queue + '</div>');
  }

  function D03() {
    var stats = '<div class="status-strip card"><div><small>Tổng tài sản</small><strong>13.478</strong></div><div><small>Đủ dữ liệu</small><strong>92,6%</strong></div><div><small>Cần bảo trì</small><strong>386</strong></div><div><small>Chờ QA</small><strong>47</strong></div></div>';
    var linear = '<div class="linear-view"><span class="linear-axis"></span><span class="km-tick" style="left:8%">Km 40</span><span class="km-tick" style="left:30%">Km 42</span><span class="km-tick" style="left:52%">Km 44</span><span class="km-tick" style="left:74%">Km 46</span><span class="km-tick" style="left:94%">Km 48</span><span class="asset-pin teal" style="left:18%">' + icon('bridge') + '</span><span class="asset-pin selected" style="left:36%">' + icon('alert') + '</span><span class="asset-pin amber" style="left:56%">' + icon('tool') + '</span><span class="asset-pin" style="left:78%">' + icon('pin') + '</span></div>';
    var assetTable = table(['Mã tài sản', 'Loại', 'Tuyến · lý trình', 'Tình trạng', 'Cập nhật'], [
      ['<strong>CAU-QL1-1654</strong><small>Cầu trên phạm vi tuyến</small>', 'Cầu', 'QL.1 · Km 1654+000', badge('Tốt', 'success'), '17/07/2026'],
      ['<strong>CONG-004218</strong><small>Cống hộp 2×2 m</small>', 'Cống', 'QL.1 · Km 1692+000', badge('Cần kiểm tra', 'warning'), '16/07/2026'],
      ['<strong>BB-001705</strong><small>Biển cảnh báo</small>', 'Biển báo', 'QL.1 · Km 1705+300', badge('Hư hỏng', 'danger'), '12/07/2026']
    ]);
    var detail = card('CONG-004218', 'Tài sản đang chọn', badge('Cần kiểm tra', 'warning') + '<h3 style="margin-top:12px">Cống hộp 2×2 m</h3><p>QL.1 · Km 1692+000 · Chiều tăng Km</p><div class="health-row"><span class="health-dot"></span><div><strong>Vị trí tin cậy</strong><small>GNSS RTK · sai số 0,42 m</small></div><b>98%</b></div><div class="health-row"><span class="health-dot warning"></span><div><strong>Lịch sử duy tu</strong><small>03 lần · gần nhất 12/06/2026</small></div><b>03</b></div>' + button('Mở hồ sơ vòng đời', 'primary full', 'Mở hồ sơ tài sản'), '');
    return desktop({ code: 'D03', nav: 'D03', eyebrow: 'Collection đồng bộ', breadcrumb: 'Tài sản & quy hoạch', title: 'Sổ tài sản theo tuyến', description: 'Một tập dữ liệu, một bộ lọc và một đối tượng được chọn xuyên suốt Bản đồ, Bình đồ và Bảng.', ids: 'D01 · D03 · C03 · G3.02', actions: button('Thêm tài sản', 'primary', 'Thêm tài sản', 'plus') }, stats + '<div class="tabs mt-14"><button class="tab active" data-tab>Bản đồ</button><button class="tab" data-tab>Bình đồ</button><button class="tab" data-tab>Bảng</button><button class="tab" data-tab>So sánh quy hoạch</button></div><div class="split-main mt-14"><div class="stack">' + card('Bản đồ tài sản trên phạm vi quản lý', 'Google My Maps · cột Km và lớp điểm tuyến', mapBlock({ callout: 'asset', className: 'asset-google-map' }), '<div class="chips"><button class="chip active" data-tab>Tất cả lớp</button><button class="chip" data-tab>Tài sản</button></div>', 'map-card') + card('Danh mục trong phạm vi', '03 / 1.284 tài sản', assetTable, button('Tùy chỉnh cột', 'secondary small', 'Tùy chỉnh cột')) + '</div>' + detail + '</div>');
  }

  function D04() {
    var inbox = '<div class="queue">' +
      queueItem('Sạt lở taluy dương', 'Ứng dụng hiện trường · Tổ tuần 02', 'red', 'Khẩn cấp', '8′', true) +
      queueItem('Xe quá tải ước tính 38%', 'Camera kiểm soát · QL.279 Km 18+100', 'amber', 'Vi phạm', '24′') +
      queueItem('Nhật ký ca CA-0717-07', 'Cán bộ tuần kiểm · 02 chỉ đạo', '', 'Chờ duyệt', '42′') +
      queueItem('Ngập cục bộ sau mưa', 'Hotline · ĐT.155 Km 09+450', '', 'Chờ xác minh', '1 giờ') +
      queueItem('Lấn chiếm hành lang ATGT', 'Đơn vị quản lý tuyến · có 04 ảnh', 'amber', 'Vi phạm', '2 giờ') + '</div>';
    var evidence = '<div class="alert-banner">' + icon('alert') + '<div><strong>Sự cố nghiêm trọng · SLA xác nhận 15 phút</strong><small>Đã quá 03 phút, chưa có người xác nhận tiếp nhận.</small></div></div><div class="media-grid mt-14"><div class="media-tile"><span>Ảnh gốc · 08:42</span></div><div class="media-tile after"><span>Video 00:18 · GPS ±4,8 m</span></div></div><div class="health-row"><span class="health-dot"></span><div><strong>Nguồn bằng chứng hợp lệ</strong><small>Thiết bị MB-07 · hash đã ghi nhận</small></div>' + badge('Tin cậy', 'success') + '</div><div class="health-row"><span class="health-dot warning"></span><div><strong>Nguy cơ trùng bản ghi</strong><small>01 phản ánh cách vị trí 28 m</small></div>' + badge('So sánh', 'warning') + '</div><div class="grid-2 mt-14">' + button('Xác nhận đã nhận', 'primary', 'Xác nhận sự cố') + button('Giao Đội BT số 1', 'secondary', 'Giao xử lý') + '</div>';
    return desktop({ code: 'D04', nav: 'D04', eyebrow: 'Hộp thư nghiệp vụ', breadcrumb: 'Sự cố & tuần kiểm', title: 'Tiếp nhận, xác minh và chỉ đạo xử lý', description: 'Hợp nhất nguồn gửi, phát hiện trùng và tạo gói bằng chứng mà không nhập lại vị trí hoặc media.', ids: 'A04 · A05 · B01 · B03', actions: button('Xuất nhật ký', 'secondary', 'Xuất nhật ký', 'download') }, '<div class="tabs"><button class="tab active" data-tab>Tất cả <b>18</b></button><button class="tab" data-tab>Khẩn cấp <b>5</b></button><button class="tab" data-tab>Vi phạm <b>4</b></button><button class="tab" data-tab>Tuần kiểm <b>7</b></button></div><div class="split-main mt-14">' + card('Hàng đợi tiếp nhận', 'Theo SLA và nguồn gửi', inbox, '<div class="chips"><button class="chip active" data-tab>Mới nhất</button><button class="chip" data-tab>Quá SLA</button></div>') + card('SC-2026-018', 'Chi tiết bằng chứng', evidence, badge('QL.4D · Km 42+700', 'info')) + '</div>');
  }

  function D05() {
    var header = '<div class="card pad"><div style="display:flex;justify-content:space-between;gap:14px;align-items:flex-start"><div><div class="chips">' + badge('Đang làm lại', 'warning') + badge('Liên kết SC-2026-015', 'info') + '</div><h2 style="font-size:20px;margin-top:9px">Vá ổ gà cục bộ · CV-0717-024</h2><p>QL.279 · Km 18+120 · Đội bảo trì số 2 · Hạn 18/07/2026 16:00</p></div><div class="page-actions">' + button('Xem sự cố nguồn', 'secondary', 'Mở sự cố nguồn') + button('Nộp lại nghiệm thu', 'primary', 'Nộp lại nghiệm thu') + '</div></div>' + stepper(['Giao việc', 'Thực hiện', 'Nghiệm thu 1', 'Làm lại', 'Đóng'], 3) + '</div>';
    var checklist = '<div class="checklist"><div class="check-item"><span class="check-mark">' + icon('check') + '</span><div><strong>Đúng phạm vi và lý trình</strong><small>Đối chiếu GPS và ảnh toàn cảnh</small></div>' + badge('Đạt', 'success') + '</div><div class="check-item failed"><span class="check-mark">' + icon('x') + '</span><div><strong>Độ bằng phẳng bề mặt</strong><small>Chênh cao 8 mm, giới hạn minh họa 5 mm</small></div>' + badge('Không đạt', 'danger') + '</div><div class="check-item"><span class="check-mark">' + icon('check') + '</span><div><strong>Vệ sinh hiện trường</strong><small>Ảnh sau thi công 15:28</small></div>' + badge('Đạt', 'success') + '</div></div><div class="alert-banner warning mt-14">' + icon('clock') + '<div><strong>Yêu cầu làm lại trước 14:00 hôm nay</strong><small>Lý do và toàn bộ bằng chứng lần 1 được giữ nguyên trong lịch sử.</small></div></div>';
    var history = timeline([['Nộp kết quả làm lại', 'Đội BT số 2 · 06 ảnh mới', '09:14', ''], ['Nghiệm thu lần 1: Không đạt', 'Nguyễn Văn An · lý do đã ký', 'Hôm qua 16:20', 'danger'], ['Nộp kết quả lần 1', '42 m² · 04 ảnh', 'Hôm qua 15:32', ''], ['Giao lệnh từ sự cố SC-2026-015', 'Không nhập lại vị trí và media', '17/07 08:10', '']]);
    return desktop({ code: 'D05', nav: 'D05', eyebrow: 'Detail workspace', breadcrumb: 'Công việc & duy tu', title: 'Lệnh công việc và nghiệm thu', description: 'Theo dõi đầy đủ vòng làm lại, checklist và bằng chứng append-only theo từng lần nộp.', ids: 'C01 · C02 · C03', actions: button('Thao tác khác', 'secondary', 'Mở thao tác khác') }, header + '<div class="tabs mt-14"><button class="tab active" data-tab>Nghiệm thu</button><button class="tab" data-tab>Khối lượng</button><button class="tab" data-tab>Media</button><button class="tab" data-tab>Hồ sơ</button><button class="tab" data-tab>Lịch sử</button></div><div class="grid-3 mt-14">' + card('Bằng chứng trước — sau', 'Lần nộp thứ 2', '<div class="media-grid"><div class="media-tile"><span>Trước · 08:16</span></div><div class="media-tile after"><span>Sau · 09:08</span></div></div><p style="font-size:10px;margin:10px 0 0">Ảnh gốc, timestamp, GPS và hash được giữ riêng cho từng lần.</p>', '') + card('Checklist nghiệm thu', 'Mẫu BDTX · phiên bản 03', checklist, '') + card('Timeline bất biến', 'Toàn bộ thao tác', history, '') + '</div>');
  }

  function D06() {
    var editor = '<div class="card" style="overflow:hidden">' + mapBlock({ callout: 'qa' }) + '<div class="card-body"><div class="status-strip"><div><small>Hệ quy chiếu</small><strong>VN-2000</strong></div><div><small>Nguồn đo</small><strong>GNSS RTK</strong></div><div><small>Sai số</small><strong style="color:var(--red-700)">12,8 m</strong></div><div><small>Phiên bản</small><strong>Bản nháp 04</strong></div></div></div></div>';
    var qa = '<div class="queue">' + queueItem('CONG-004218 · nghi trùng', 'Cách tài sản hiện hữu 3,2 m', 'red', 'Bị chặn', '12,8 m', true) + queueItem('BB-006291 · thiếu ảnh', 'ĐT.155 · Km 06+291', 'amber', 'Cần bổ sung', '1 giờ') + queueItem('TIM-QL279 · lệch tuyến', 'Đoạn Km 72–74 · 18 đỉnh', 'amber', 'Cần duyệt', 'Hôm qua') + queueItem('12 cọc tiêu mới', 'QL.4D · đợt khảo sát KS-018', 'teal', 'Đạt QA', 'Hôm qua') + '</div>';
    var compare = '<div class="grid-2"><div class="alert-banner warning">' + icon('pin') + '<div><strong>Bản ghi mobile</strong><small>Km 1692+000 · sai số 12,8 m</small></div></div><div class="alert-banner info">' + icon('database') + '<div><strong>Tài sản hiện hữu</strong><small>Km 1691+997 · sai số 0,42 m</small></div></div></div><div class="health-row"><span class="health-dot danger"></span><div><strong>Khoảng cách 3,2 m</strong><small>Vượt ngưỡng nghi trùng 5 m</small></div>' + badge('98% trùng', 'danger') + '</div><div class="grid-2">' + button('Yêu cầu đo lại', 'secondary', 'Yêu cầu đo lại') + button('Hợp nhất bản ghi', 'primary', 'Hợp nhất bản ghi') + '</div>';
    return desktop({ code: 'D06', nav: 'D03', eyebrow: 'GIS quality workbench', breadcrumb: 'Tài sản & GIS', title: 'QA dữ liệu và biên tập bản đồ', description: 'Bản nháp tách khỏi lớp công bố; mọi chỉnh sửa có nguồn đo, sai số, phiên bản và người duyệt.', ids: 'D02 · D04 · G3.01 · G3.03', actions: button('Chạy 12 rule QA', 'primary', 'Chạy kiểm tra QA', 'check') }, '<div class="split-main"><div class="stack">' + editor + card('So sánh bản ghi nghi trùng', 'CONG-004218', compare, '') + '</div>' + card('Hàng đợi kiểm soát chất lượng', '47 bản ghi', qa, '<div class="chips"><button class="chip active" data-tab>Lỗi</button><button class="chip" data-tab>Chờ duyệt</button></div>') + '</div>');
  }

  function D07() {
    var projectHead = '<div class="card pad"><div style="display:flex;justify-content:space-between;gap:14px"><div><div class="chips">' + badge('XDCB', 'violet') + badge('Đang thực hiện', 'success') + badge('Chậm 6 ngày', 'danger') + '</div><h2 style="font-size:20px;margin-top:9px">Cầu Nậm Xé và đường dẫn hai đầu cầu</h2><p>XDCB-12 · QL.279 Km 73+240 · Tổng mức đầu tư minh họa 121 tỷ đồng</p></div><div class="page-actions">' + button('Mở vị trí GIS', 'secondary', 'Mở GIS', 'map') + button('Cập nhật mốc', 'primary', 'Cập nhật mốc', 'plus') + '</div></div>' + stepper(['Chuẩn bị đầu tư', 'Thực hiện đầu tư', 'Kết thúc · quyết toán', 'Bàn giao tài sản'], 1) + '</div>';
    var gantt = '<div class="gantt"><div class="gantt-label"><strong>Gói thầu cầu chính</strong></div><div class="gantt-track"><span class="gantt-today"></span><i class="gantt-bar" style="left:5%;width:70%"></i><i class="gantt-bar actual late" style="left:5%;width:55%"></i></div><div class="gantt-label">Đường dẫn đầu cầu</div><div class="gantt-track"><span class="gantt-today"></span><i class="gantt-bar" style="left:28%;width:52%"></i><i class="gantt-bar actual" style="left:28%;width:37%"></i></div><div class="gantt-label">Hệ thống ATGT</div><div class="gantt-track"><span class="gantt-today"></span><i class="gantt-bar" style="left:66%;width:27%"></i></div><div class="gantt-label">Nghiệm thu · bàn giao</div><div class="gantt-track"><span class="gantt-today"></span><i class="gantt-bar" style="left:82%;width:15%"></i></div></div>';
    var docs = '<div class="queue">' + queueItem('Bảo lãnh thực hiện hợp đồng', 'HĐ-07 · hết hạn sau 05 ngày', 'red', 'Sắp hết hạn', '22/07') + queueItem('Thiết kế bản vẽ thi công', 'Phiên bản 05 · đã phê duyệt', 'teal', 'Hiệu lực', '15/06') + queueItem('Biên bản nghiệm thu mố M2', 'Chờ chữ ký chủ đầu tư', 'amber', 'Chờ ký', 'Hôm nay') + '</div>';
    return desktop({ code: 'D07', nav: 'D07', eyebrow: 'Project Core', breadcrumb: 'Dự án & vốn', title: 'Workspace dự án dùng chung', description: 'SCĐK và XDCB dùng cùng lõi dự án, mốc, hợp đồng, hồ sơ, GIS và bàn giao; quy trình thay đổi theo template.', ids: 'E01 · E03 · F01 · F02 · F03 · F05', actions: button('Đổi dự án', 'secondary', 'Đổi dự án', 'search') }, projectHead + '<div class="grid-2 mt-14">' + card('Kế hoạch và thực tế', 'Tiến độ tổng thể 54%', gantt, '<div class="chips"><span class="badge info">Kế hoạch</span><span class="badge success">Thực tế</span></div>') + card('Hồ sơ và mốc đến hạn', '03 ngoại lệ', docs, button('Kho hồ sơ', 'secondary small', 'Mở kho hồ sơ')) + '</div>');
  }

  function D08() {
    var metrics = '<div class="grid-4">' + metric('Kế hoạch vốn 2026', '500', 'tỷ', 'Phiên bản điều chỉnh 02', '', '+40 tỷ') + metric('Khối lượng được nghiệm thu', '368', 'tỷ', '73,6% kế hoạch', 'teal', '+18 tỷ') + metric('Đã giải ngân', '342', 'tỷ', '68,4% kế hoạch', 'amber', '+4,6%') + metric('Hồ sơ đang chờ', '07', 'bộ', '126 tỷ đồng', 'red', '2 quá hạn') + '</div>';
    var financeTable = table(['Dự án', 'Kế hoạch vốn', 'Nghiệm thu', 'Thanh toán', 'Giải ngân', 'Cảnh báo'], [
      ['<strong>SCĐK QL.4D</strong><small>SCĐK-03</small>', '148 tỷ', '130,2 tỷ', '126,4 tỷ', '85%', badge('Đúng kế hoạch', 'success')],
      ['<strong>Cải tạo ĐT.155</strong><small>SCĐK-07</small>', '120 tỷ', '74,4 tỷ', '78,2 tỷ', '65%', badge('Chậm 12 ngày', 'danger')],
      ['<strong>Cầu Nậm Xé</strong><small>XDCB-12</small>', '121 tỷ', '65,3 tỷ', '55,7 tỷ', '46%', badge('Giải ngân thấp', 'warning')]
    ]);
    var payment = '<div class="alert-banner warning">' + icon('alert') + '<div><strong>SCĐK-07 lệch giữa khối lượng và thanh toán</strong><small>Hồ sơ TT-04 bao gồm 3,8 tỷ chưa đủ chứng từ đối soát.</small></div></div><div class="health-row"><span class="health-dot"></span><div><strong>Khối lượng nghiệm thu</strong><small>62% · 74,4 / 120 tỷ</small></div><b>74,4</b></div><div class="health-row"><span class="health-dot warning"></span><div><strong>Hồ sơ thanh toán hợp lệ</strong><small>05/07 bộ</small></div><b>78,2</b></div><div class="health-row"><span class="health-dot danger"></span><div><strong>Chênh lệch cần đối soát</strong><small>Chưa có biên bản xác nhận</small></div><b>3,8</b></div>' + button('Mở hồ sơ đối soát', 'primary full', 'Mở hồ sơ đối soát');
    return desktop({ code: 'D08', nav: 'D07', eyebrow: 'Tài chính dự án', breadcrumb: 'Dự án & vốn', title: 'Vốn, khối lượng, thanh toán và giải ngân', description: 'Đối chiếu kế hoạch vốn có phiên bản với khối lượng nghiệm thu, hồ sơ thanh toán và số giải ngân.', ids: 'E02 · E03 · E04 · E05 · E06 · E07', actions: button('Phiên bản vốn 02', 'secondary', 'Xem lịch sử vốn', 'clock') }, metrics + '<div class="split-main mt-14">' + card('Tiến độ & giải ngân theo dự án', 'Nguồn vốn bảo trì 2026', financeTable, button('Xuất đối soát', 'secondary small', 'Xuất bảng đối soát', 'download')) + card('Ngoại lệ cần xử lý', 'SCĐK-07', payment, badge('Rủi ro cao', 'danger')) + '</div>');
  }

  function D09() {
    var mapping = table(['Nguồn bàn giao', 'Đích CSDL tài sản', 'Thao tác', 'QA', 'Trạng thái'], [
      ['<strong>Trụ T1–T6</strong><small>06 đối tượng IFC/GIS</small>', 'Cầu Nậm Xé · kết cấu', 'Tạo mới 06', badge('Đạt', 'success'), badge('Sẵn sàng', 'success')],
      ['<strong>Biển báo Km 73+100</strong><small>Mã tạm BB-041</small>', 'BB-QL279-73100', 'Cập nhật 01', badge('Cần xem', 'warning'), badge('Nghi trùng', 'warning')],
      ['<strong>Tim đường dẫn</strong><small>2,8 km geometry</small>', 'Đoạn QL.279', 'Cập nhật hình học', badge('Lỗi 02', 'danger'), badge('Bị chặn', 'danger')],
      ['<strong>Hồ sơ hoàn công</strong><small>24 tệp đã ký</small>', 'Kho hồ sơ tài sản', 'Liên kết', badge('Đạt', 'success'), badge('Sẵn sàng', 'success')]
    ]);
    var summary = '<div class="stat-ring" style="--value:92;position:relative;margin:0 auto 12px"><span><strong>92%</strong><small>396 / 428 đạt</small></span></div><div class="health-row"><span class="health-dot"></span><div><strong>Tạo mới</strong><small>312 tài sản</small></div><b>312</b></div><div class="health-row"><span class="health-dot"></span><div><strong>Cập nhật hiện hữu</strong><small>84 tài sản · không nhập lại</small></div><b>84</b></div><div class="health-row"><span class="health-dot danger"></span><div><strong>Bị chặn bởi QA</strong><small>18 lỗi · 14 cảnh báo</small></div><b>32</b></div>' + '<button class="button primary full" disabled>' + icon('upload') + 'Công bố 428 tài sản</button><p style="font-size:9px;margin:8px 0 0;text-align:center">Chỉ bật khi toàn bộ lỗi chặn đã được xử lý và người duyệt xác nhận.</p>';
    return desktop({ code: 'D09', nav: 'D07', eyebrow: 'Bàn giao liên thông', breadcrumb: 'Dự án & vốn', title: 'Bàn giao dự án sang CSDL tài sản', description: 'Ánh xạ tài sản mới và tài sản cập nhật, kiểm soát chất lượng trước khi công bố mà không nhập liệu lại.', ids: 'F06 · D04', actions: button('Lưu bản nháp', 'secondary', 'Lưu bản nháp') }, '<div class="card pad">' + stepper(['Chọn gói bàn giao', 'Ánh xạ trường', 'Kiểm tra QA', 'Phê duyệt', 'Công bố'], 2) + '</div><div class="split-main mt-14">' + card('Ánh xạ và kiểm soát chất lượng', 'XDCB-12 · Gói bàn giao 03', mapping, '<div class="chips"><button class="chip active" data-tab>Tất cả 428</button><button class="chip" data-tab>Lỗi 18</button></div>') + card('Kết quả kiểm tra', 'Chưa thể công bố', summary, badge('QA đang chặn', 'danger')) + '</div>');
  }

  function D10() {
    var folders = '<div class="folder-tree"><div class="folder-row active">' + icon('folder') + ' Tất cả hồ sơ <b>8.624</b></div><div class="folder-row indent">' + icon('folder') + ' Công trình & tài sản <b>3.286</b></div><div class="folder-row indent">' + icon('folder') + ' Dự án SCĐK <b>1.842</b></div><div class="folder-row indent">' + icon('folder') + ' Dự án XDCB <b>2.194</b></div><div class="folder-row indent">' + icon('folder') + ' Nhật ký tuần đường <b>1.302</b></div><div class="folder-row">' + icon('clock') + ' Đến hạn / quá hạn <b style="color:var(--red-700)">12</b></div><div class="folder-row">' + icon('refresh') + ' Đang mượn bản gốc <b>07</b></div></div>';
    var docs = table(['Hồ sơ', 'Đối tượng liên kết', 'Phiên bản', 'Hiệu lực', 'Bản gốc'], [
      ['<strong>Hồ sơ hoàn công cầu Nậm Xé</strong><small>HS-XDCB12-024</small>', 'XDCB-12 · 428 tài sản', 'v05 · đã ký', badge('Hiệu lực', 'success'), badge('Đang mượn', 'warning')],
      ['<strong>Biên bản nghiệm thu mố M2</strong><small>BBNT-0716-08</small>', 'Gói thầu 07', 'v02', badge('Chờ ký', 'warning'), 'Kho A-03'],
      ['<strong>Sổ nhật ký QL.4D tháng 06</strong><small>NK-QL4D-202606</small>', 'QL.4D', 'v01', badge('Đã khóa', 'info'), 'Chỉ bản số']
    ]);
    var loan = '<div class="alert-banner">' + icon('clock') + '<div><strong>Quá hạn trả 02 ngày</strong><small>Hồ sơ hoàn công XDCB-12 · mã vạch HS-008624</small></div></div><div style="margin:14px auto;width:210px;height:60px;background:repeating-linear-gradient(90deg,#10263a 0 2px,transparent 2px 5px);border:12px solid #fff;box-shadow:0 0 0 1px var(--line)"></div>' + timeline([['Nguyễn Văn Hòa nhận bản gốc', 'Biên nhận MN-2026-0712', '12/07 09:14', ''], ['Kho A-03 bàn giao', 'Quét mã HS-008624', '12/07 09:10', ''], ['Trưởng phòng phê duyệt mượn', 'Hạn trả 16/07/2026', '11/07 16:42', '']]) + '<div class="grid-2 mt-14">' + button('Nhắc trả', 'secondary', 'Gửi nhắc trả') + button('Xác nhận trả', 'primary', 'Xác nhận trả hồ sơ') + '</div>';
    return desktop({ code: 'D10', nav: 'D10', eyebrow: 'Repository dùng chung', breadcrumb: 'Hồ sơ số', title: 'Kho hồ sơ và chuỗi mượn–trả bản gốc', description: 'Một kho phiên bản dùng chung cho tài sản, công việc và dự án; truy vết đầy đủ người giữ bản gốc.', ids: 'C04 · F02 · F04 · F05', actions: button('Thêm hồ sơ', 'primary', 'Thêm hồ sơ', 'plus') }, '<div style="display:grid;grid-template-columns:245px minmax(0,1fr) 330px;gap:14px">' + card('Phân loại hồ sơ', '8.624 tệp', folders, '') + card('Danh mục hồ sơ', 'Theo quyền và phạm vi', docs, '<label class="search-box" style="width:220px">' + icon('search') + '<input placeholder="Tìm mã, tên hồ sơ…"></label>') + card('Chuỗi bàn giao bản gốc', 'HS-008624', loan, badge('Quá hạn', 'danger')) + '</div>');
  }

  function D11() {
    var templates = '<div class="grid-3"><button class="quick-action" data-action="Mở mẫu Nhật ký tuần đường"><span class="mobile-action-icon">' + icon('route') + '</span><strong>Nhật ký tuần đường</strong><small>BM-TD-04 · v03 · DOCX/PDF</small></button><button class="quick-action danger" data-action="Mở mẫu Báo cáo vi phạm"><span class="mobile-action-icon">' + icon('alert') + '</span><strong>Báo cáo vi phạm</strong><small>BM-VP-02 · v02 · DOCX</small></button><button class="quick-action teal" data-action="Mở mẫu Đánh giá BDTX"><span class="mobile-action-icon">' + icon('check') + '</span><strong>Đánh giá BDTX</strong><small>BM-BDTX-07 · v04 · PDF</small></button></div>';
    var builder = '<div class="form-row"><label class="field"><span>Nhóm dữ liệu</span><select><option>Sự cố & vi phạm</option></select></label><label class="field"><span>Phạm vi tuyến</span><select><option>Tất cả tuyến quản lý</option></select></label></div><div class="form-row"><label class="field"><span>Kỳ báo cáo</span><select><option>Tháng 07/2026</option></select></label><label class="field"><span>Định dạng</span><select><option>PDF + XLSX</option></select></label></div><label class="field"><span>Trường dữ liệu đã chọn</span><input value="Mã, trạng thái, tuyến, Km+m, SLA, đơn vị xử lý"></label>' + button('Xem trước báo cáo', 'primary full', 'Tạo bản xem trước', 'chart');
    var metadata = '<div class="health-row"><span class="health-dot"></span><div><strong>Mã biểu mẫu</strong><small>BM-BDTX-07 · phiên bản 04</small></div>' + badge('Hiệu lực', 'success') + '</div><div class="health-row"><span class="health-dot"></span><div><strong>Căn cứ cấu hình</strong><small>TT 41/2024 · cập nhật TT 72/2025</small></div><b>01/01/2026</b></div><div class="health-row"><span class="health-dot warning"></span><div><strong>Ngày hết hiệu lực</strong><small>Chưa xác định · cần quản trị xác nhận</small></div>' + badge('Cần rà soát', 'warning') + '</div><div class="media-tile after" style="min-height:150px"><span>Bản xem trước · Trang 1/8</span></div>';
    return desktop({ code: 'D11', nav: 'D11', eyebrow: 'BI & biểu mẫu', breadcrumb: 'Báo cáo & phân tích', title: 'Báo cáo và thư viện biểu mẫu có phiên bản', description: 'Tự tạo báo cáo từ dataset được phân quyền và xuất theo mẫu có mã, căn cứ, thời gian hiệu lực.', ids: 'A04 · G2.02 · G2.03', actions: button('Lịch gửi báo cáo', 'secondary', 'Mở lịch gửi', 'clock') }, card('Mẫu thường dùng', 'Theo vai trò hiện tại', templates, button('Quản lý thư viện', 'secondary small', 'Mở thư viện')) + '<div class="grid-2 mt-14">' + card('Trình tạo báo cáo', 'Phân tích nhanh', builder, badge('Autosave', 'info')) + card('Bản xem trước & metadata', 'BM-BDTX-07', metadata, button('Xuất PDF', 'primary small', 'Xuất PDF', 'download')) + '</div>');
  }

  function D12() {
    document.title = 'D12 — Bản đồ sự cố công khai';
    var list = '<div class="queue">' + queueItem('Sạt lở taluy dương', 'QL.1 · Km 1692+000 · cập nhật 09:10', 'red', 'Đang xử lý', '8′', true) + queueItem('Ngập cục bộ sau mưa', 'QL.1 · Km 1651+100', 'amber', 'Đã cảnh báo', '1 giờ') + queueItem('Mặt đường hư hỏng', 'QL.1 · Km 1705+300', '', 'Đang sửa chữa', 'Hôm qua') + '</div><div class="card-body"><div class="alert-banner info">' + icon('shield') + '<div><strong>Dữ liệu portal phải được kiểm duyệt</strong><small>Không hiển thị người báo, thông tin nội bộ, media gốc hoặc dữ liệu tài chính.</small></div></div></div>';
    return '<div class="public-shell"><header class="public-header"><div class="public-brand"><span class="brand-mark"></span><span><strong>Hạ tầng số</strong><small>Bản đồ thông tin đường bộ công khai</small></span></div><nav class="public-nav"><a href="#">Bản đồ sự cố</a><a href="#">Tình trạng tuyến</a><a href="#">Hướng dẫn</a><a href="#">Trợ năng</a></nav><span>Cập nhật 09:12 · 18/07/2026</span></header><main class="public-main"><div class="public-hero"><div><span class="eyebrow">D12 · Dataset công khai riêng</span><h1>Tình trạng giao thông và sự cố hạ tầng</h1><p>Nền Google My Maps do người dùng cung cấp; dữ liệu portal sản xuất vẫn phải qua quy trình duyệt và lược bỏ trường nhạy cảm.</p></div><label class="search-box" style="width:360px;background:#fff">' + icon('search') + '<input placeholder="Tìm tuyến, Km+m hoặc địa điểm…"></label></div><div class="public-map-layout">' + mapBlock({ callout: 'public', publicMap: true }) + '<aside class="card"><div class="card-head"><div><span class="eyebrow">03 thông tin nổi bật</span><h2>Đang ảnh hưởng lưu thông</h2></div>' + badge('UI minh họa', 'warning') + '</div>' + list + '</aside></div></main></div>';
  }

  function D13() {
    var matrix = '<div class="permission-grid"><div class="permission-row header"><span>Nghiệp vụ / hành động</span><span>Xem</span><span>Tạo</span><span>Giao</span><span>Duyệt</span><span>Xuất</span></div><div class="permission-row"><strong>Sự cố & vi phạm</strong><span class="perm-on">✓</span><span class="perm-on">✓</span><span class="perm-on">✓</span><span class="perm-scope">Theo tuyến</span><span class="perm-on">✓</span></div><div class="permission-row"><strong>Nghiệm thu BDTX</strong><span class="perm-on">✓</span><span class="perm-off">—</span><span class="perm-off">—</span><span class="perm-scope">Theo đơn vị</span><span class="perm-on">✓</span></div><div class="permission-row"><strong>Tài chính dự án</strong><span class="perm-scope">Có che trường</span><span class="perm-off">—</span><span class="perm-off">—</span><span class="perm-off">—</span><span class="perm-scope">Cần phê duyệt</span></div><div class="permission-row"><strong>Biên tập GIS</strong><span class="perm-on">✓</span><span class="perm-on">✓</span><span class="perm-off">—</span><span class="perm-off">—</span><span class="perm-off">—</span></div></div>';
    var scopes = '<div class="folder-tree"><div class="folder-row active">' + icon('users') + ' Điều phối viên tuyến <b>18 user</b></div><div class="folder-row indent">' + icon('map') + ' QL.4D · Km 00–80</div><div class="folder-row indent">' + icon('map') + ' QL.279 · Km 00–92</div><div class="folder-row">' + icon('folder') + ' Dự án được phân công <b>06</b></div><div class="folder-row">' + icon('lock') + ' Trường dữ liệu nhạy cảm <b>04</b></div></div><div class="alert-banner warning mt-14">' + icon('lock') + '<div><strong>Xuất dữ liệu tài chính cần phê duyệt</strong><small>Luôn ghi mục đích, phạm vi trường và người nhận.</small></div></div>';
    var audit = timeline([['Xuất báo cáo giải ngân', 'Nguyễn Minh · 24 trường · 06 dự án', '09:18', 'warning'], ['Thay đổi phạm vi tuyến', 'Quản trị tenant · QL.279 Km 00–92', '08:44', ''], ['Từ chối nghiệm thu CV-0717-024', 'Nguyễn Văn An · lý do bắt buộc', 'Hôm qua', 'danger'], ['Đăng nhập MFA thành công', 'Thiết bị VP-02 · 10.10.24.18', 'Hôm qua', '']]);
    return desktop({ code: 'D13', nav: 'D13', eyebrow: 'Identity & governance', breadcrumb: 'Quản trị hệ thống', title: 'Vai trò, phạm vi dữ liệu và audit', description: 'Kết hợp RBAC với tổ chức, tuyến/đoạn/dự án, hành động và độ nhạy của từng trường dữ liệu.', ids: 'G1.01 · G1.02 · G1.03 · G7.02', actions: button('Tạo vai trò', 'primary', 'Tạo vai trò', 'plus') }, '<div class="tabs"><button class="tab active" data-tab>Vai trò & quyền</button><button class="tab" data-tab>Phạm vi dữ liệu</button><button class="tab" data-tab>Chính sách trường</button><button class="tab" data-tab>Nhật ký audit</button></div><div class="split-main mt-14"><div class="stack">' + card('Ma trận quyền · Điều phối viên tuyến', '28 quyền · cập nhật hôm qua', matrix, button('So sánh vai trò', 'secondary small', 'So sánh vai trò')) + card('Nhật ký thao tác bất biến', '04 sự kiện gần nhất', audit, '') + '</div>' + card('Phạm vi và chính sách dữ liệu', 'Tenant: Đơn vị quản lý mẫu', scopes, badge('SaaS tenant', 'violet')) + '</div>');
  }

  function D14() {
    var top = '<div class="grid-4">' + metric('Thông báo 24 giờ', '1.284', 'lượt', '98,7% đã giao', 'teal', '+2,1%') + metric('Quy tắc đang bật', '26', 'rule', '03 rule cảnh báo cao', 'amber', '2 thử nghiệm') + metric('Kết nối tích hợp', '05/06', 'online', '01 cần đối soát', '', '99,2%') + metric('Backup gần nhất', '02:00', 'hôm nay', 'RPO minh họa 24 giờ', 'teal', 'Thành công') + '</div>';
    var notices = '<div class="health-row"><span class="health-dot"></span><div><strong>Ứng dụng / PWA</strong><small>984 đã giao · 962 đã đọc</small></div>' + badge('99,1%', 'success') + '</div><div class="health-row"><span class="health-dot"></span><div><strong>Email</strong><small>242 đã giao · 04 bounce</small></div>' + badge('98,4%', 'success') + '</div><div class="health-row"><span class="health-dot warning"></span><div><strong>SMS / Zalo</strong><small>58 đã gửi · 03 chờ biên nhận</small></div>' + badge('94,8%', 'warning') + '</div>';
    var connectors = '<div class="health-row"><span class="health-dot"></span><div><strong>Hệ thống đầu tư công</strong><small>Đồng bộ 08:30 · 1.842 bản ghi</small></div>' + badge('Online', 'success') + '</div><div class="health-row"><span class="health-dot warning"></span><div><strong>Cổng thông tin tỉnh</strong><small>02 bản ghi chờ duyệt công bố</small></div>' + badge('Cần đối soát', 'warning') + '</div><div class="health-row"><span class="health-dot"></span><div><strong>API chia sẻ dữ liệu</strong><small>12 consumer · 1,8M request/tháng</small></div>' + badge('Online', 'success') + '</div>';
    var rules = table(['Quy tắc', 'Điều kiện minh họa', 'Kênh', 'Trạng thái'], [
      ['<strong>Sự cố nghiêm trọng</strong>', 'Chưa xác nhận sau 15 phút', 'App + SMS', badge('Đang bật', 'success')],
      ['<strong>Giải ngân thấp</strong>', '< 70% kế hoạch kỳ', 'App + Email', badge('Thử nghiệm', 'warning')],
      ['<strong>Hồ sơ sắp hết hạn</strong>', 'Trước 30 / 15 / 5 ngày', 'Email', badge('Đang bật', 'success')]
    ]);
    var backup = timeline([['Backup toàn phần thành công', 'Mã BK-20260718-0200 · kiểm tra hash đạt', '02:00', ''], ['Kiểm thử phục hồi bản sao', 'Môi trường cô lập · 38 phút', '17/07', ''], ['Điều chỉnh chính sách lưu giữ', '365 ngày · quản trị tenant', '15/07', 'warning']]);
    return desktop({ code: 'D14', nav: 'D14', eyebrow: 'Platform operations', breadcrumb: 'Quản trị hệ thống', title: 'Thông báo, tích hợp và vận hành nền tảng', description: 'Quan sát biên nhận đa kênh, thử ngưỡng cảnh báo, đối soát connector và audit backup/phục hồi.', ids: 'G5.01 · G5.02 · G6.01 · G6.02 · G6.03 · G7.01 · G7.03', actions: button('Kiểm tra sức khỏe', 'primary', 'Chạy health check', 'refresh') }, top + '<div class="grid-2 mt-14">' + card('Biên nhận thông báo đa kênh', '24 giờ gần nhất', notices, button('Mở inbox', 'secondary small', 'Mở inbox')) + card('Sức khỏe tích hợp & chia sẻ', '06 connector', connectors, button('Đối soát', 'secondary small', 'Đối soát kết nối')) + '</div><div class="grid-2 mt-14">' + card('Quy tắc cảnh báo', 'Có chế độ thử nghiệm', rules, button('Tạo quy tắc', 'secondary small', 'Tạo quy tắc')) + card('Backup & phục hồi', 'Minh họa UI vận hành', backup, badge('Lần cuối: đạt', 'success')) + '</div>');
  }

  function M01() {
    var body = '<div class="mobile-offline">' + icon('wifi') + '<span>Sẵn sàng offline · 07 mục chưa đồng bộ</span></div><section class="mobile-card shift-card"><div class="mobile-card-body"><div class="shift-route"><div><small>CA HÔM NAY · CA-0718-02</small><h2>QL.4D</h2><p>Km 20+000 → Km 52+000 · chiều tăng Km</p></div>' + badge('Đã tải gói tuyến', 'success') + '</div><div class="route-meta"><span><small>Thời gian</small><strong>06:30–11:30</strong></span><span><small>Nhân sự</small><strong>02 người</strong></span><span><small>Dung lượng</small><strong>186 MB</strong></span></div><button class="mobile-primary" data-action="Bắt đầu ca tuần">' + icon('route') + 'BẮT ĐẦU TUẦN ĐƯỜNG</button></div></section><section class="mobile-card"><div class="mobile-card-head"><h2>Ghi nhận nhanh</h2><small>Dùng được khi mất mạng</small></div><div class="mobile-card-body"><div class="quick-grid"><button class="quick-action danger" data-screen="M02"><span class="mobile-action-icon">' + icon('alert') + '</span><strong>Ghi sự cố</strong></button><button class="quick-action amber" data-action="Ghi vi phạm"><span class="mobile-action-icon">' + icon('camera') + '</span><strong>Ghi vi phạm</strong></button><button class="quick-action teal" data-screen="M04"><span class="mobile-action-icon">' + icon('bridge') + '</span><strong>Cập nhật tài sản</strong></button><button class="quick-action" data-screen="M03"><span class="mobile-action-icon">' + icon('tool') + '</span><strong>Kết quả công việc</strong></button></div></div></section><section class="mobile-card"><div class="mobile-card-head"><h2>Nhiệm vụ ưu tiên</h2>' + badge('02 việc', 'warning') + '</div><div class="mobile-card-body mobile-list"><div class="mobile-list-item"><span class="queue-icon red">' + icon('alert') + '</span><span><strong>Kiểm tra điểm sạt lở cũ</strong><small>Km 41+800 · trước 08:30</small></span>' + icon('chevron') + '</div><div class="mobile-list-item"><span class="queue-icon amber">' + icon('tool') + '</span><span><strong>Nghiệm thu vá ổ gà</strong><small>Km 28+300 · 42 m²</small></span>' + icon('chevron') + '</div></div></section>';
    return mobile({ code: 'M01', title: 'Hiện trường hôm nay' }, body, 'M01');
  }

  function M02() {
    var body = '<div class="mobile-offline">' + icon('wifi') + '<span>ĐANG OFFLINE · Dữ liệu sẽ lưu trên thiết bị</span></div><section class="mobile-card" style="overflow:hidden"><div class="mobile-card-head"><div><h2>Ca tuần CA-0718-02</h2><small>Đã đi 22,6 / 32 km · 01:42:18</small></div>' + badge('Đang chạy', 'success') + '</div>' + mapBlock({ compact: true, offline: true, gpsError: '4,8 m', chainage: 'Km 1692+000' }) + '</section><section class="capture-sheet"><div style="display:flex;justify-content:space-between;align-items:start"><div><span class="eyebrow">Ghi nhanh sự cố khẩn</span><h2>Sạt lở taluy dương</h2></div>' + badge('Khẩn cấp', 'danger') + '</div><div class="form-row"><label class="field"><span>Tuyến · lý trình dự kiến</span><input value="QL.1 · Km 1692+000"></label><label class="field"><span>Sai số GPS</span><input value="± 4,8 m"></label></div><div class="evidence-row"><button class="evidence" data-action="Chụp ảnh">' + icon('camera') + ' Ảnh 1</button><button class="evidence" data-action="Quay video">' + icon('camera') + ' Video</button><button class="evidence" data-action="Ghi âm">' + icon('plus') + ' Ghi âm</button></div><div class="alert-banner warning mt-14">' + icon('wifi') + '<div><strong>Chưa thể gửi cảnh báo dữ liệu</strong><small>Sẽ lưu trên thiết bị; hãy gọi số trực khẩn nếu cần.</small></div></div><div class="form-row mt-14"><button class="button danger" data-action="Gọi số trực khẩn">' + icon('phone') + 'Gọi số trực</button><button class="button primary" data-action="Đã lưu trên thiết bị">' + icon('check') + 'Lưu trên máy</button></div></section>';
    return mobile({ code: 'M02', title: 'Ca tuần đang chạy' }, body, 'M02');
  }

  function M03() {
    var body = '<div class="mobile-offline">' + icon('refresh') + '<span>Autosave 09:18 · Chờ đồng bộ 02 media</span></div><section class="mobile-card"><div class="mobile-card-head"><div><h2>Khơi thông cống ngang</h2><small>CV-0718-019 · ĐT.155 Km 11+250</small></div>' + badge('Đang làm', 'info') + '</div><div class="mobile-card-body"><div class="progress"><i style="width:70%"></i></div><div class="route-meta" style="color:var(--ink);border-color:var(--line)"><span><small>Hạn</small><strong>14:00</strong></span><span><small>Chỉ đạo</small><strong>Ưu tiên 1</strong></span><span><small>Khối lượng</small><strong>70%</strong></span></div><div class="alert-banner info">' + icon('users') + '<div><strong>Chỉ đạo tuần kiểm</strong><small>Chụp rõ cửa vào, cửa ra và dòng chảy sau xử lý.</small></div></div></div></section><section class="mobile-card"><div class="mobile-card-head"><h2>Khối lượng thực hiện</h2>' + badge('BOQ 01', 'violet') + '</div><div class="mobile-card-body"><div class="form-row"><label class="field"><span>Khối lượng hôm nay</span><input value="01"></label><label class="field"><span>Đơn vị</span><select><option>Cống</option></select></label></div><label class="field"><span>Ghi chú hiện trường</span><textarea rows="2">Đã khơi thông hoàn toàn, dòng chảy ổn định.</textarea></label><div class="evidence-row"><button class="evidence">' + icon('camera') + ' Trước</button><button class="evidence">' + icon('camera') + ' Sau</button><button class="evidence">' + icon('plus') + ' Thêm</button></div></div></section><div class="mobile-save"><button class="button secondary" data-action="Lưu nháp">Lưu nháp</button><button class="button primary" data-action="Gửi kết quả">Gửi kết quả</button></div>';
    return mobile({ code: 'M03', title: 'Việc của tôi' }, body, 'M03');
  }

  function M04() {
    var body = '<div class="mobile-offline">' + icon('wifi') + '<span>OFFLINE · Bản nháp tài sản #TS-LOCAL-018</span></div><section class="mobile-card"><div class="mobile-card-body">' + stepper(['Vị trí', 'Thông tin', 'Bằng chứng', 'Kiểm tra'], 3) + '</div></section><section class="mobile-card" style="overflow:hidden"><div class="mobile-card-head"><div><h2>Vị trí và lý trình</h2><small>GPS tự động · có thể sửa kèm lý do</small></div>' + badge('Sai số cao', 'danger') + '</div>' + mapBlock({ compact: true, offline: true, gpsError: '12,8 m', chainage: 'Km 1692+000' }) + '<div class="mobile-card-body"><div class="form-row"><label class="field"><span>Lý trình dự kiến</span><input value="QL.1 · Km 1692+000"></label><label class="field"><span>Sai số</span><input value="± 12,8 m"></label></div></div></section><section class="mobile-card conflict-card"><div class="mobile-card-head"><h2>Phát hiện tài sản nghi trùng</h2>' + badge('98% trùng', 'warning') + '</div><div class="mobile-card-body"><div class="alert-banner warning">' + icon('lock') + '<div><strong>Chặn công bố trực tiếp</strong><small>Bản ghi phải chuyển sang hàng đợi QA.</small></div></div><div class="compare" style="margin-top:7px"><div><small>Bản ghi mới</small><strong>Cống hộp 2×2 m</strong><span>Km 1692+000 · sai số 12,8 m</span></div><div><small>CSDL hiện hữu</small><strong>CONG-004218</strong><span>Km 1691+997 · cách 3,2 m</span></div></div><button class="button primary full" style="margin-top:7px" data-action="Gửi sang QA">' + icon('upload') + 'Gửi bản ghi sang QA</button></div></section>';
    return mobile({ code: 'M04', title: 'Cập nhật tài sản' }, body, 'M04');
  }

  function M05() {
    var body = '<section class="mobile-card sync-overview"><div class="mobile-card-body"><div class="sync-summary"><div class="sync-ring"><strong>74%</strong></div><div><span class="eyebrow">Đồng bộ hai chiều</span><h2 style="margin-bottom:3px">07 mục đang chờ</h2><p style="font-size:9px;margin:0">Wi-Fi ổn định · còn khoảng 2 phút</p></div></div></div></section>' +
      '<section class="mobile-card sync-queue"><div class="mobile-card-head"><h2>Hàng đợi theo bản ghi</h2><div class="mobile-card-tools">' + badge('1 lỗi · 1 xung đột', 'danger') + '<button class="badge warning badge-button" data-retry-all>Thử lại tất cả</button></div></div>' +
      '<div class="mobile-card-body mobile-list">' +
      '<div class="mobile-list-item"><span class="queue-icon">' + icon('clock') + '</span><span><strong>BB-LOCAL-043 · Biển báo</strong><small>Đã lưu trên thiết bị · chờ kết nối ổn định</small></span>' + badge('Chờ gửi', 'offline') + '</div>' +
      '<div class="mobile-list-item"><span class="queue-icon teal">' + icon('upload') + '</span><span><strong>SC-LOCAL-018 · Sạt lở</strong><small>Đang tải video · 18 / 42 MB</small><div class="progress sync-progress"><i style="width:43%"></i></div></span>' + badge('Đang gửi', 'info') + '</div>' +
      '<div class="mobile-list-item"><span class="queue-icon red">' + icon('alert') + '</span><span><strong>TS-LOCAL-018 · Cống hộp</strong><small>Xung đột với bản máy chủ</small></span>' + badge('Cần chọn', 'danger') + '</div>' +
      '<div class="mobile-list-item"><span class="queue-icon amber">' + icon('refresh') + '</span><span><strong>CV-0718-019 · Kết quả việc</strong><small>Mất kết nối · lần thử 2/5</small></span><button class="badge warning badge-button" data-retry>Thử lại</button></div>' +
      '<div class="mobile-list-item"><span class="queue-icon teal">' + icon('check') + '</span><span><strong>CA-0718-02 · Vệt hành trình</strong><small>Máy chủ nhận lúc 09:12 · #RC-84219</small></span>' + badge('Đã nhận', 'success') + '</div>' +
      '</div></section>' +
      '<section class="mobile-card conflict-card"><div class="mobile-card-head"><h2>Chọn cách xử lý xung đột</h2>' + badge('TS-LOCAL-018', 'warning') + '</div><div class="mobile-card-body"><div class="compare"><div><small>Trên thiết bị</small><strong>Km 42+680</strong><span>Ảnh mới · 09:06 · sai số 12,8 m</span></div><div><small>Trên máy chủ</small><strong>Km 42+677</strong><span>Cập nhật 08:55 · sai số 0,42 m</span></div></div><div class="form-row sync-conflict-actions"><button class="button secondary" data-action="Giữ cả hai">Giữ cả hai</button><button class="button primary" data-action="Gửi sang QA">So sánh tại QA</button></div></div></section>';
    return mobile({ code: 'M05', title: 'Đồng bộ hiện trường' }, body, 'M05');
  }

  var views = { D01: D01, D02: D02, D03: D03, D04: D04, D05: D05, D06: D06, D07: D07, D08: D08, D09: D09, D10: D10, D11: D11, D12: D12, D13: D13, D14: D14, M01: M01, M02: M02, M03: M03, M04: M04, M05: M05 };

  function render() {
    if (!views[screenId]) screenId = 'D01';
    document.body.classList.toggle('mobile-mode', screenId.charAt(0) === 'M');
    app.innerHTML = views[screenId]();
    app.setAttribute('data-screen', screenId);
    app.setAttribute('data-state', state);
    bindInteractions();
  }

  function navigate(id) {
    var next = new URL(window.location.href);
    next.searchParams.set('screen', id);
    next.searchParams.set('state', 'default');
    window.location.href = next.toString();
  }

  function showToast(message) {
    var item = document.createElement('div');
    item.className = 'toast';
    item.innerHTML = icon('check') + '<strong>' + message + '</strong>';
    toastRegion.appendChild(item);
    window.setTimeout(function () { item.remove(); }, 2400);
  }

  function bindInteractions() {
    document.querySelectorAll('[data-screen]').forEach(function (buttonEl) {
      buttonEl.addEventListener('click', function () { navigate(buttonEl.getAttribute('data-screen')); });
    });
    document.querySelectorAll('[data-action]').forEach(function (buttonEl) {
      buttonEl.addEventListener('click', function () { showToast(buttonEl.getAttribute('data-action') + ' · thao tác minh họa'); });
    });
    document.querySelectorAll('[data-tab]').forEach(function (tabEl) {
      tabEl.addEventListener('click', function () {
        var parent = tabEl.parentElement;
        parent.querySelectorAll('[data-tab]').forEach(function (item) { item.classList.remove('active'); });
        tabEl.classList.add('active');
        showToast('Đã chuyển sang: ' + tabEl.textContent.trim());
      });
    });
    document.querySelectorAll('[data-google-map]').forEach(function (mapFrame) {
      mapFrame.addEventListener('load', function () {
        var mapContainer = mapFrame.closest('.google-map');
        if (mapContainer) mapContainer.classList.add('is-loaded');
      });
    });
    document.querySelectorAll('[data-retry]').forEach(function (retryButton) {
      retryButton.addEventListener('click', function () {
        var row = retryButton.closest('.mobile-list-item');
        var detail = row && row.querySelector('small');
        retryButton.className = 'badge info badge-button';
        retryButton.textContent = 'Đang gửi';
        retryButton.disabled = true;
        if (detail) detail.textContent = 'Đã xếp lại hàng đợi · lần thử 3/5';
        showToast('Đã thử lại bản ghi lỗi');
      });
    });
    document.querySelectorAll('[data-retry-all]').forEach(function (retryAllButton) {
      retryAllButton.addEventListener('click', function () {
        document.querySelectorAll('[data-retry]').forEach(function (item) { item.click(); });
        retryAllButton.textContent = 'Đã xếp hàng';
        retryAllButton.disabled = true;
        showToast('Đã xếp lại các bản ghi có thể thử lại');
      });
    });
  }

  document.addEventListener('keydown', function (event) {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      var search = document.querySelector('.search-box input');
      if (search) search.focus();
    }
  });

  render();
}());
