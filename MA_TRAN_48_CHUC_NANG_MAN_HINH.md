# Ma trận 48 chức năng → khu vực giao diện

Tài liệu nguồn ghi tổng 45, nhưng kiểm đếm thực tế là 48 do nhóm G có 19 thay vì 16 chức năng. Ma trận này dùng để kiểm soát không bỏ sót yêu cầu khi chuyển từ checklist sang sitemap/backlog.

| ID | Chức năng nguồn | Khu vực/màn hình chính đề xuất | Pattern UX |
|---|---|---|---|
| A01 | Khai báo vị trí tuần đường, tự xác định vị trí/lý trình/địa chỉ, chụp ảnh, không cần mạng | Mobile › Bắt đầu ca / Ghi nhận hiện trường | Wizard offline + map |
| A02 | Theo dõi lịch trình, thời gian, địa điểm, nhân sự | Hiện trường › Phiên tuần trực tiếp | Live map + timeline |
| A03 | Ghi kết quả tuần đường bằng mobile, ảnh/video, cảnh báo khẩn | Mobile › Ghi sự cố/nhật ký | Quick capture + emergency action |
| A04 | Xuất sổ nhật ký tuần đường theo mẫu | Hiện trường › Nhật ký › Xuất báo cáo | Preview + versioned template |
| A05 | Tuần kiểm trên mobile, tiếp nhận/chỉ đạo xử lý | Mobile/Web › Tuần kiểm | Queue + detail workbench |
| B01 | Theo dõi sự cố kết cấu hạ tầng trực tuyến | Sự cố › Danh sách/Bản đồ | Map/list collection |
| B02 | Bản đồ sự cố công khai cho người dân | Cổng công khai tách biệt | Public map + sanitized detail |
| B03 | Tiếp nhận/báo cáo vi phạm cho cơ quan xử lý | Vi phạm › Hộp thư/Chi tiết | Intake + evidence package |
| C01 | Danh mục và tiến độ công việc duy tu | Công việc › Kế hoạch/Lệnh công việc | Table/Kanban + detail |
| C02 | Đánh giá kết quả duy tu bảo dưỡng | Công việc › Kiểm tra–nghiệm thu | Checklist workbench |
| C03 | Tra cứu lịch sử duy tu theo vòng đời công trình | Tài sản/Công trình › Lịch sử | Timeline + filters |
| C04 | Hồ sơ số và mượn–trả hồ sơ gốc | Hồ sơ › Kho số/Mượn–trả | Repository + barcode flow |
| D01 | Hiện trạng tài sản trên bản đồ và bình đồ duỗi thẳng | Tài sản › Bản đồ/Bình đồ/Bảng | Synced multi-view collection |
| D02 | Cập nhật tài sản bằng mobile, tự tính lý trình | Mobile › Cập nhật tài sản | Offline wizard + duplicate check |
| D03 | Quản lý quy hoạch tích hợp hiện trạng | Tài sản & quy hoạch › Lớp quy hoạch | Layer preset + compare |
| D04 | Thu thập CSDL tài sản độ chính xác cao | Tài sản › Đợt khảo sát/QA | Survey batch + quality queue |
| E01 | Danh mục dự án SCĐK gắn bản đồ | Dự án › SCĐK › Danh mục | Table/map + project detail |
| E02 | Kế hoạch/phân bổ vốn theo năm và nguồn | Dự án & vốn › Kế hoạch vốn | Financial grid + version history |
| E03 | Tiến độ thi công theo mốc, kế hoạch–thực tế | Dự án › Tiến độ | Gantt + milestone exceptions |
| E04 | Cập nhật khối lượng nghiệm thu ngoài hiện trường | Mobile/Web › Khối lượng | BOQ entry + evidence |
| E05 | Hồ sơ thanh toán, tạm ứng, giải ngân | Dự án & vốn › Hồ sơ thanh toán | Payment workbench |
| E06 | Dashboard tỷ lệ giải ngân | Tổng quan/Dự án › Giải ngân | KPI + drill-down |
| E07 | Cảnh báo chậm tiến độ/chậm giải ngân | Hàng đợi cảnh báo/Thông báo | Exception queue + escalation |
| F01 | Quản lý vòng đời dự án XDCB | Dự án › XDCB › Workspace | Stage-gate workspace |
| F02 | Hồ sơ pháp lý dự án tập trung | Dự án › Hồ sơ pháp lý | Versioned repository |
| F03 | Liên kết hồ sơ dự án với GIS | Dự án › Vị trí/phạm vi tuyến | Map context tab |
| F04 | Mượn–trả hồ sơ gốc dự án | Hồ sơ › Mượn–trả | Approval + barcode chain |
| F05 | Cảnh báo hạn hồ sơ, thủ tục, bảo hành, hợp đồng | Dự án › Mốc/Hạn | Due-date queue + notification |
| F06 | Chuyển dữ liệu hoàn thành sang CSDL tài sản | Dự án › Bàn giao tài sản | Mapping + QA + publish workflow |
| G1.01 | Phân quyền theo vai trò | Quản trị › Vai trò & quyền | Permission matrix |
| G1.02 | Phân quyền theo phạm vi tuyến/khu vực | Quản trị › Phạm vi dữ liệu | Scope tree/map |
| G1.03 | Nhật ký thao tác người dùng | Quản trị › Audit | Searchable immutable timeline |
| G2.01 | Dashboard tổng hợp cho lãnh đạo | Tổng quan | Role-based dashboard |
| G2.02 | Tự tạo báo cáo tùy biến | Báo cáo › Trình tạo báo cáo | Dataset/field builder |
| G2.03 | Xuất báo cáo theo mẫu, nhiều định dạng | Báo cáo › Thư viện mẫu | Template/version/export center |
| G3.01 | Một hệ tọa độ/CSDL không gian dùng chung | Quản trị GIS › Hệ quy chiếu & mạng đường | Admin configuration/QA |
| G3.02 | Chồng lớp hiện trạng–quy hoạch–sự cố–dự án | Trung tâm điều hành › Lớp bản đồ | Layer manager/presets |
| G3.03 | Biên tập/cập nhật dữ liệu bản đồ | Tài sản & GIS › Biên tập | Map editor + review/publish |
| G4.01 | Một app mobile dùng chung cho nghiệp vụ hiện trường | Mobile shell theo vai trò | Adaptive home + quick actions |
| G4.02 | Đồng bộ hai chiều sau khi offline | Mobile › Hàng đợi đồng bộ | Per-record sync/conflict UI |
| G5.01 | Notification chung qua app/email/SMS/Zalo | Thông báo › Inbox/Kênh gửi | Unified inbox + delivery receipt |
| G5.02 | Cấu hình ngưỡng cảnh báo | Quản trị › Quy tắc cảnh báo | Rule builder + test mode |
| G6.01 | API hệ thống đầu tư công/mua sắm công | Quản trị › Tích hợp/API | Connector health + reconciliation |
| G6.02 | Kết nối cổng dịch vụ công/cổng tỉnh | Quản trị › Tích hợp/Công khai | Publication connector |
| G6.03 | Chia sẻ dữ liệu cho hệ thống khác | Quản trị › Chia sẻ dữ liệu | Dataset/API permission center |
| G7.01 | Sao lưu và phục hồi định kỳ | Quản trị › Vận hành hệ thống | Backup status/restore audit |
| G7.02 | Quyền truy cập dữ liệu nhạy cảm | Quản trị › Chính sách dữ liệu | Field/action policy + export log |
| G7.03 | SaaS, truy cập web và mobile | Nền tảng/tenant configuration | Tenant switch/configuration |

## Nhóm màn hình có thể tái sử dụng

Ma trận trên được gom vào các pattern để giảm chi phí học và phát triển:

1. `Map | Bình đồ | Bảng` cho sự cố, tài sản, công việc và dự án.
2. Detail workspace có cùng header, tab vị trí, media, hồ sơ, liên quan và lịch sử.
3. Queue cho xác minh, cảnh báo, nghiệm thu, QA, hồ sơ đến hạn và lỗi tích hợp.
4. Wizard có autosave cho ghi nhận hiện trường, cập nhật tài sản, khối lượng và bàn giao.
5. Dashboard có drill-down đến bản ghi nguồn; không tạo KPI không truy ngược được.

## Ghi chú kiểm soát phạm vi

- Một chức năng có thể xuất hiện ở nhiều vai trò nhưng dùng cùng dữ liệu lõi.
- “Mobile dùng chung” không đồng nghĩa đưa toàn bộ Gantt, BI và cấu hình phức tạp lên mobile; app chỉ ưu tiên tác vụ hiện trường.
- Cổng công khai là một giao diện/dataset tách biệt với shell quản trị nội bộ.
- Các mục về backup, SaaS, CSDL không gian và API có phần UI quản trị nhưng phần lớn là yêu cầu kiến trúc/vận hành, không nên nghiệm thu chỉ bằng ảnh màn hình.
