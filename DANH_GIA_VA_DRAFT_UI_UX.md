# Đánh giá yêu cầu và Draft UI/UX

## Hệ thống quản lý bảo trì kết cấu hạ tầng đường bộ

**Trạng thái:** Draft 0.1 để rà soát nghiệp vụ và định hướng giao diện  
**Nguồn đầu vào:** `Khai quat cac chuc nang.docx`  
**Lưu ý:** Dữ liệu hiển thị trong prototype là dữ liệu minh họa, không phải dữ liệu vận hành thực tế.

---

## 1. Kết luận nhanh

Tài liệu đầu vào bao phủ tốt các trụ cột cần có của một hệ thống quản lý bảo trì đường bộ: hiện trường, sự cố, công việc duy tu, tài sản/GIS, dự án, giải ngân, hồ sơ, báo cáo và nền tảng quản trị. Điểm mạnh nhất là định hướng dùng chung một nền GIS, một ứng dụng hiện trường có offline và chuyển giao dữ liệu dự án hoàn thành sang cơ sở dữ liệu tài sản.

Tuy nhiên, tài liệu hiện là **checklist tính năng**, chưa phải đặc tả đủ để phát triển. Trước khi khóa thiết kế chi tiết cần bổ sung tối thiểu: vai trò và quyền, vòng đời/trạng thái, cấp duyệt, SLA, trường dữ liệu, công thức KPI, tiêu chí nghiệm thu, quy tắc offline, quy tắc công khai và yêu cầu phi chức năng.

Đề xuất sản phẩm không tách 48 mục thành 48 màn hình độc lập. Hệ thống nên được tổ chức quanh một vòng nghiệp vụ khép kín:

```text
Tuyến / đoạn / lý trình
        ↓
Tuần đường, tuần kiểm hoặc nguồn tiếp nhận khác
        ↓
Phát hiện → Sự cố / vi phạm
        ↓
Xác minh → Phân công → Lệnh công việc
        ↓
Thực hiện → Kiểm tra / nghiệm thu → Làm lại nếu không đạt
        ↓
Cập nhật tình trạng tài sản + lịch sử duy tu
        ↓
Kế hoạch bảo trì / dự án / vốn / thanh toán / giải ngân
```

MVP nên tập trung vào vòng khép kín **tuần đường offline → phát hiện → xử lý → nghiệm thu → lịch sử tài sản**, thay vì triển khai đồng thời toàn bộ phạm vi.

---

## 2. Hai điểm cần hiệu chỉnh ngay trong tài liệu

### 2.1. Tổng số tính năng đang bị cộng sai

| Nhóm | Số ghi trong tài liệu | Số kiểm đếm thực tế |
|---|---:|---:|
| A. Tuần đường, tuần kiểm | 5 | 5 |
| B. Sự cố và vi phạm | 3 | 3 |
| C. Nghiệm thu và lịch sử duy tu | 4 | 4 |
| D. Cơ sở dữ liệu tài sản | 4 | 4 |
| E. SCĐK và giải ngân | 7 | 7 |
| F. XDCB | 6 | 6 |
| G. Nền tảng dùng chung | **16** | **19** |
| **Tổng** | **45** | **48** |

Nhóm G thực tế có `3 + 3 + 3 + 2 + 2 + 3 + 3 = 19` mục. Nên sửa tổng nhóm G thành 19 và tổng toàn bộ thành 48 để tránh thất thoát phạm vi khi lập backlog, dự toán và nghiệm thu phần mềm.

### 2.2. Căn cứ biểu mẫu/nghiệm thu cần cập nhật

- Thông tư 41/2024/TT-BGTVT có hiệu lực từ 01/01/2025 và đã bãi bỏ Thông tư 48/2019/TT-BGTVT. Vì vậy mục C không nên tiếp tục ghi nghiệm thu theo Thông tư 48/2019 như một căn cứ hiện hành.
- Thông tư 72/2025/TT-BXD ban hành ngày 31/12/2025 tiếp tục sửa đổi Thông tư 41/2024, trong đó có thay một số mẫu, cập nhật thuật ngữ và cơ quan thực hiện.
- Thiết kế đúng là quản lý **bộ biểu mẫu có mã, phiên bản, ngày hiệu lực, ngày hết hiệu lực, phạm vi áp dụng và văn bản căn cứ**. Không hard-code biểu mẫu hoặc tên cơ quan vào mã nguồn.
- Các nhãn tổ chức như “Sở GTVT”, “Sở Xây dựng”, “Khu QLĐB”, đơn vị cấp xã… cần cấu hình theo tenant/địa phương và thời kỳ hiệu lực.

Nguồn kiểm tra:

- [Thông tư 41/2024/TT-BGTVT trên CSDL VBPL](https://vbpl.vn/FileData/TW/Lists/vbpq/Attachments/173115/VanBanGoc_Th%C3%B4ng%20t%C6%B0%2041.2024.TT-BGTVT.pdf)
- [Thông tư 72/2025/TT-BXD trên CSDL VBPL](https://vbpl.vn/TW/Pages/vbpq-print.aspx?ItemID=187796)
- [Thông tin Thông tư 48/2019/TT-BGTVT và quan hệ văn bản](https://vbpl.vn/TW/Pages/vbpq-luocdo.aspx?ItemID=139585)

---

## 3. Đánh giá phạm vi hiện tại

### 3.1. Điểm tốt

1. **Bao phủ khá trọn vòng đời nghiệp vụ:** từ kiểm tra hiện trường đến xử lý, nghiệm thu, tài sản, dự án và vốn.
2. **GIS dùng chung:** tránh mỗi module duy trì một bản đồ và một mã tuyến riêng.
3. **Mobile offline được xác định từ đầu:** phù hợp thực tế tuyến đường có vùng mất sóng.
4. **Có audit và phân quyền theo phạm vi:** cần thiết với dữ liệu nhà nước, hồ sơ và tài chính.
5. **Có liên kết XDCB → tài sản:** giảm nhập lại dữ liệu sau bàn giao.
6. **Có hồ sơ số và mượn–trả hồ sơ gốc:** phản ánh đúng công việc văn thư thực tế, không chỉ tập trung vào bản đồ.

### 3.2. Khoảng trống nghiệp vụ quan trọng

| Khoảng trống | Rủi ro nếu chưa làm rõ | Đề xuất |
|---|---|---|
| Vai trò, quyền và phạm vi dữ liệu | Người dùng thấy sai dữ liệu hoặc thực hiện sai thẩm quyền | Lập ma trận vai trò × hành động × tuyến/đơn vị/dự án |
| Trạng thái và cấp duyệt | Không biết nút hành động nào xuất hiện ở từng bước | Chốt state machine cho ca tuần, sự cố, công việc, nghiệm thu, dự án, hồ sơ |
| SLA và mức độ khẩn | Cảnh báo nhiều nhưng không có cơ chế điều hành | Quy định thời gian xác nhận, phản hồi, xử lý và escalation theo loại/mức độ |
| Mô hình tuyến/lý trình | GPS tự động ra sai Km+m; dữ liệu các module không nối được | Chuẩn hóa tim tuyến, chiều tăng Km, nhánh, chiều/làn, đoạn quản lý và linear referencing |
| Công thức KPI tài chính | Cùng một “tỷ lệ giải ngân” nhưng mỗi nơi hiểu khác | Ghi rõ tử số, mẫu số, kỳ khóa sổ, điều chỉnh vốn và nguồn chứng từ |
| Quy tắc offline/xung đột | Mất bản ghi, ghi đè hoặc người dùng tưởng đã gửi cảnh báo khẩn | Có hàng đợi đồng bộ, retry, biên nhận, so sánh xung đột và trạng thái từng bản ghi |
| Giá trị pháp lý của bằng chứng | Ảnh/video/nhật ký có thể không đủ căn cứ nghiệm thu | Quy định timestamp, vị trí, sai số, người/thiết bị, hash, chữ ký số, lưu bản gốc |
| Công khai cho người dân | Lộ dữ liệu nội bộ hoặc công bố thông tin chưa duyệt | Dùng dataset công khai riêng, workflow duyệt và bộ trường được phép công bố |
| Yêu cầu phi chức năng | Khó báo giá, kiểm thử và vận hành | Chốt quy mô km/tài sản/user/media, uptime, RPO/RTO, retention, MFA, browser/OS |

### 3.3. Các chồng lấn cần hợp nhất

- **Sự cố và công việc duy tu:** sự cố là đầu vào; lệnh công việc là phương tiện xử lý. Hai module phải liên kết một-một hoặc một-nhiều, không nhập lại vị trí và bằng chứng.
- **SCĐK và XDCB:** nên dùng chung một “Project Core” gồm dự án, giai đoạn, mốc, hợp đồng, nhà thầu, hồ sơ, khối lượng; SCĐK và XDCB là hai template/quy trình.
- **Hồ sơ:** là dịch vụ dùng chung cho tài sản, công việc và dự án; không tạo ba kho file riêng.
- **GIS, cảnh báo, báo cáo, audit:** là năng lực nền dùng chung, không phải silo độc lập.

---

## 4. Mô hình người dùng đề xuất

| Nhóm người dùng | Mục tiêu chính | Giao diện ưu tiên |
|---|---|---|
| Lãnh đạo/điều hành | Xem ngoại lệ, chậm tiến độ, rủi ro và ra quyết định | Dashboard, bản đồ điểm nóng, danh sách cần quyết định |
| Điều phối/đơn vị quản lý tuyến | Lập lịch, xác minh, phân công, theo dõi SLA | Trung tâm điều hành map + queue |
| Nhân viên tuần đường | Hoàn thành ca và ghi nhận nhanh ngoài hiện trường | Mobile, offline, thao tác một tay |
| Cán bộ tuần kiểm | Kiểm tra hoạt động tuần đường, chỉ đạo và theo dõi xử lý | Nhật ký, queue chờ duyệt, bản đồ tuyến |
| Nhà thầu/đội BDTX | Nhận việc, báo kết quả và bằng chứng | Việc của tôi, cập nhật trước–sau, khối lượng |
| Giám sát/nghiệm thu | Kiểm tra, chấm, đạt/không đạt, yêu cầu làm lại | Workbench nghiệm thu, checklist, chữ ký |
| Cán bộ tài sản/GIS | Bảo đảm dữ liệu đúng, đủ và có lịch sử | Sổ tài sản, bản đồ, bình đồ tuyến, QA |
| Chủ đầu tư/BQLDA | Quản lý mốc, khối lượng, hồ sơ, bàn giao | Project workspace, Gantt, hồ sơ |
| Kế hoạch/tài chính | Theo dõi vốn, thanh toán, giải ngân, đối soát | Bảng tài chính, dashboard sai lệch |
| Văn thư/kho hồ sơ | Quản lý bản số và chuỗi mượn–trả bản gốc | Kho hồ sơ, barcode, lịch hạn trả |
| Quản trị/kiểm toán | Quản lý người dùng, phạm vi, cấu hình và audit | Admin, audit explorer, integration health |
| Người dân | Xem thông tin đã được duyệt công khai | Cổng công khai tách biệt |

Phân quyền nên kết hợp:

```text
Vai trò (RBAC)
  + phạm vi tổ chức
  + phạm vi tuyến/đoạn/dự án
  + hành động (xem/tạo/sửa/giao/duyệt/nghiệm thu/công bố/xuất)
  + mức nhạy cảm của trường dữ liệu
```

---

## 5. Kiến trúc thông tin đề xuất

```text
Tổng quan
Việc của tôi
Trung tâm điều hành
├─ Bản đồ trực tuyến
├─ Bình đồ duỗi thẳng
└─ Hàng đợi cảnh báo
Hiện trường
├─ Lịch tuần đường/tuần kiểm
├─ Phiên tuần trực tiếp
└─ Nhật ký
Sự cố & vi phạm
├─ Hộp thư tiếp nhận
├─ Sự cố
├─ Vi phạm
└─ Chờ duyệt công khai
Công việc & duy tu
├─ Kế hoạch/danh mục công việc
├─ Lệnh công việc
├─ Kiểm tra/nghiệm thu
└─ Lịch sử duy tu
Tài sản & quy hoạch
├─ Sổ tài sản
├─ Bản đồ/bình đồ tuyến
├─ Khảo sát/cập nhật
├─ Kiểm soát chất lượng
└─ Biên tập GIS
Dự án & vốn
├─ SCĐK
├─ XDCB
├─ Gantt và mốc
├─ Khối lượng nghiệm thu
├─ Thanh toán/giải ngân
└─ Bàn giao sang tài sản
Hồ sơ số
├─ Kho hồ sơ
├─ Hồ sơ đến hạn
└─ Mượn–trả hồ sơ gốc
Báo cáo & phân tích
Thông báo
Quản trị hệ thống
```

Menu được lọc theo vai trò. Thanh trên cùng dùng chung gồm: tìm kiếm toàn hệ thống, đơn vị/phạm vi, tuyến, thời gian, tạo nhanh, thông báo, trạng thái đồng bộ/dữ liệu và tài khoản.

---

## 6. Pattern giao diện dùng chung

Thay vì thiết kế riêng 48 kiểu màn hình, dùng bốn pattern nhất quán:

1. **Dashboard:** KPI có thể drill-down → xu hướng → ngoại lệ → hành động.
2. **Collection:** cùng một tập dữ liệu có ba chế độ `Bản đồ | Bình đồ | Bảng`, giữ nguyên bộ lọc và mục đang chọn.
3. **Detail workspace:** tiêu đề đối tượng + trạng thái + tuyến/lý trình + phụ trách + hạn; các tab `Tổng quan | Vị trí | Công việc | Media | Hồ sơ | Liên quan | Lịch sử`.
4. **Wizard/workbench:** form theo bước, autosave, kiểm tra lỗi trước khi gửi và thanh hành động theo quyền/trạng thái.

Mỗi collection nên có:

- Tìm kiếm theo mã, tuyến, Km+m, địa chỉ, tài sản hoặc dự án.
- Bộ lọc đã lưu và chia sẻ link giữ đúng ngữ cảnh.
- Cột tối thiểu: mã, trạng thái, mức độ, tuyến–lý trình, phụ trách, hạn/SLA, cập nhật gần nhất.
- Bulk action có kiểm soát và xác nhận rõ phạm vi.
- Empty, loading, error, offline, permission-denied và stale-data state.

---

## 7. Draft các màn hình trọng yếu

### 7.1. Dashboard lãnh đạo

```text
┌──────────────────────────────────────────────────────────────────────┐
│ Tìm kiếm  | Đơn vị | Tuyến | Thời gian | + Tạo nhanh | Chuông | User│
├───────────┬──────────────────────────────────────────────────────────┤
│ Sidebar   │ Sự cố mở | Quá SLA | Phủ tuần | Giải ngân | Dự án chậm │
│           ├────────────────────────────────────┬─────────────────────┤
│           │ Bản đồ điểm nóng                  │ Cần quyết định hôm  │
│           │ sự cố / tài sản / dự án           │ nay                 │
│           ├────────────────────┬───────────────┴─────────────────────┤
│           │ Xu hướng sự cố    │ Tiến độ và giải ngân lệch kế hoạch │
└───────────┴────────────────────┴─────────────────────────────────────┘
```

Nguyên tắc:

- KPI luôn có đơn vị, kỳ dữ liệu, thời điểm cập nhật và định nghĩa.
- Bấm KPI đi tới danh sách bản ghi nguồn đã lọc.
- Ưu tiên “cần hành động” thay vì biểu đồ trang trí.
- Dữ liệu tài chính chỉ hiển thị cho đúng quyền.

### 7.2. Trung tâm điều hành GIS

```text
┌──────────────────────────────────────────────────────────────────────┐
│ Search | Bộ lọc | Bản đồ / Bình đồ / Bảng | Lớp | Saved view       │
├────────────────────────────────────────────┬─────────────────────────┤
│                                            │ HÀNG ĐỢI                │
│ BẢN ĐỒ / BÌNH ĐỒ TUYẾN 65%                │ • Khẩn · quá SLA        │
│                                            │ • Chờ xác minh          │
│ Chọn đối tượng → highlight đồng thời       │ • Ca chưa bắt đầu       │
│ trên bản đồ, bình đồ và danh sách          │ • Công việc chậm        │
├────────────────────────────────────────────┴─────────────────────────┤
│ Drawer chi tiết: vị trí, bằng chứng, timeline, hành động theo quyền │
└──────────────────────────────────────────────────────────────────────┘
```

Không bật tất cả lớp bản đồ mặc định. Cần preset theo nhiệm vụ: `Điều hành`, `Tài sản`, `Quy hoạch`, `Dự án`; có legend, cluster, lọc theo thời gian và độ tin cậy vị trí.

### 7.3. Chi tiết sự cố/lệnh công việc

Header nhất quán:

```text
SC-2026-0148 | Khẩn | QL.1 · Km 123+450 | Quá SLA 01:35
Phụ trách: Đội BDTX 2 | [Xác minh] [Giao việc] [Nâng mức khẩn] [...]
```

Nội dung:

- Tổng quan và mô tả.
- Bản đồ + lý trình + độ chính xác GPS + nguồn xác định.
- Ảnh/video trước–sau.
- Timeline toàn bộ thay đổi và người thực hiện.
- Lệnh công việc, khối lượng, nhà thầu, hạn.
- Checklist nghiệm thu và lý do không đạt.
- Tài sản, dự án, hồ sơ và báo cáo liên quan.

### 7.4. Mobile hiện trường

```text
┌──────────────────────────────┐
│ OFFLINE · 7 mục chưa đồng bộ│
├──────────────────────────────┤
│ Ca hôm nay · QL.1            │
│ Km 105+000 → Km 132+500      │
│ [ BẮT ĐẦU TUẦN ĐƯỜNG ]       │
├──────────────────────────────┤
│ [Ghi sự cố] [Ghi vi phạm]    │
│ [Tài sản]    [Kết quả việc]  │
├──────────────────────────────┤
│ Nhiệm vụ ưu tiên             │
│ Bản nháp / lỗi đồng bộ       │
├──────────────────────────────┤
│ Hôm nay | Việc | Bản đồ | + │
└──────────────────────────────┘
```

Form ghi nhận theo bước:

```text
Vị trí → Loại & mức độ → Bằng chứng → Liên quan/chỉ đạo → Kiểm tra & gửi
```

- Tự điền tuyến, lý trình dự kiến, thời gian, người dùng và thời tiết nếu có nguồn phù hợp.
- Luôn hiện tọa độ, sai số GPS và điểm snap lên tuyến; cho sửa có lý do và đưa vào hàng chờ kiểm duyệt.
- Nút chạm tối thiểu 44–48 px, tương phản cao khi dùng ngoài trời, hạn chế nhập chữ.
- Khi offline phải ghi “Đã lưu trên thiết bị, chưa gửi”, không được báo “Đã gửi thành công”.
- Sự cố khẩn có nút gọi/kênh dự phòng nếu dữ liệu chưa thể đồng bộ.

---

## 8. Các vòng đời đề xuất

### 8.1. Ca tuần đường

```text
Nháp lịch → Đã giao → Đang thực hiện → Chờ duyệt → Hoàn thành
                    ↘ Bỏ lỡ / Hủy       ↘ Cần bổ sung
```

### 8.2. Sự cố

```text
Mới → Chờ xác minh → Đã xác minh → Đã phân công → Đang xử lý
    → Chờ nghiệm thu → Đã đóng
Ngoại lệ: Trùng / Báo nhầm / Từ chối / Mở lại
```

### 8.3. Lệnh công việc và nghiệm thu

```text
Nháp → Đã duyệt → Đã giao → Đang làm → Đã nộp kết quả
     → Chờ nghiệm thu → Đạt → Đóng
                         ↘ Không đạt → Làm lại
```

### 8.4. Dự án

```text
Chuẩn bị đầu tư → Thực hiện → Nghiệm thu hoàn thành
→ Quyết toán → Bàn giao → Bảo hành/đóng dự án
```

Mỗi chuyển trạng thái phải ghi người, thời gian, lý do, dữ liệu trước/sau và chứng từ nếu bắt buộc.

---

## 9. GIS và dữ liệu vị trí

GIS là ngữ cảnh chung, nhưng không phải mọi tác vụ đều dùng bản đồ làm giao diện chính.

- Điều hành, sự cố và tài sản: ưu tiên map/list split view.
- Quản lý theo tuyến: có bình đồ duỗi thẳng theo Km+m, chiều và làn.
- Tài chính, hồ sơ và phê duyệt: bảng/workbench là chính, bản đồ chỉ bổ sung ngữ cảnh.
- Mọi đối tượng không gian lưu: mã tuyến, Km+m đầu/cuối, phía/chiều/làn, hình học, hệ tọa độ, sai số, nguồn/cách xác định, ngày hiệu lực và phiên bản.
- “Sai số dưới 1 m” không nên được xem chỉ là một tính năng app. Cần xác nhận thiết bị GNSS/RTK, hệ tọa độ, quy trình khảo sát/QC và metadata độ chính xác.
- Không biểu diễn điểm GPS sai số cao như một vị trí tuyệt đối chính xác.
- Bản đồ công khai lấy dữ liệu đã duyệt và lược bỏ trường nhạy cảm, không đọc trực tiếp CSDL nghiệp vụ.

---

## 10. Offline và đồng bộ

Trước ca, ứng dụng tải “gói tuyến” gồm bản đồ, tim tuyến/lý trình, tài sản, danh mục, biểu mẫu, nhiệm vụ và quyền còn hiệu lực.

Trạng thái đồng bộ phải rõ ở cả cấp ứng dụng và từng bản ghi:

```text
Online | Offline | Đang đồng bộ | Chờ gửi | Có lỗi | Có xung đột | Đã đồng bộ
```

Nguyên tắc:

- Tạo ID ngay trên thiết bị; lưu thời gian thiết bị và thời gian máy chủ.
- Sự kiện hiện trường ưu tiên append-only, tránh ghi đè âm thầm.
- Media upload tiếp tục được sau gián đoạn; có thumbnail và tiến độ từng file.
- Xung đột trường lõi có màn hình so sánh bản trên thiết bị và bản máy chủ.
- Có biên nhận sau khi máy chủ chấp nhận bản ghi.
- Cache mã hóa, khóa ứng dụng, thu hồi thiết bị và xóa dữ liệu theo chính sách.
- Tracking chỉ bật trong ca/nhiệm vụ, hiển thị rõ cho người dùng và có chính sách retention.

---

## 11. Định hướng hình ảnh và design system

- **Phong cách:** sáng, nghiêm túc, tin cậy, mật độ vừa/compact cho nghiệp vụ quản lý.
- **Màu chính:** xanh navy/xanh dương cho điều hướng và hành động; teal cho trạng thái ổn định.
- **Màu cảnh báo:** đỏ, cam, vàng chỉ dùng cho mức độ/rủi ro và luôn đi cùng chữ hoặc icon.
- **Nền:** neutral sáng; card có viền nhẹ, hạn chế bóng đổ và gradient trang trí.
- **Typography:** sans-serif dễ đọc, số liệu dùng tabular figures; hỗ trợ đầy đủ dấu tiếng Việt.
- **Khoảng cách:** hệ 4/8 px; desktop compact, mobile thoáng hơn.
- **Khả năng tiếp cận:** không truyền đạt trạng thái chỉ bằng màu; focus rõ, dùng được bằng bàn phím, tương phản phù hợp và vùng chạm mobile đủ lớn.
- **Ngôn ngữ:** dùng một từ điển thuật ngữ thống nhất cho mức độ, trạng thái, Km+m, đơn vị và loại công việc.

---

## 12. Phân kỳ đề xuất

### P0 — Discovery và nền dữ liệu

- Workshop RACI, state machine, KPI, biểu mẫu và SLA.
- Chuẩn hóa mạng đường/lý trình, taxonomy tài sản và từ điển dữ liệu.
- Khảo sát dữ liệu cũ, thiết bị, mạng thực địa và tích hợp.
- Prototype + pilot trên một tuyến/một đơn vị.

### P1 — MVP vòng khép kín BDTX

- Đăng nhập, tổ chức, RBAC + phạm vi, audit.
- GIS tuyến/lý trình và tra cứu tài sản cơ bản.
- Mobile offline: lịch/ca, GPS trace, phát hiện, ảnh/video, sync queue.
- Sự cố: xác minh, mức độ, SLA, cảnh báo, giao việc.
- Thực hiện → nghiệm thu/làm lại → đóng → lịch sử duy tu.
- Nhật ký và các báo cáo bắt buộc; dashboard ngoại lệ cơ bản.

### P2 — Tài sản, hồ sơ và GIS nâng cao

- Sổ tài sản có phiên bản/lịch sử tình trạng.
- Bình đồ duỗi thẳng, QA dữ liệu, quy hoạch và biên tập GIS.
- Hồ sơ số, OCR/chữ ký nếu xác định trong phạm vi, mượn–trả barcode.
- Bộ biểu mẫu cấu hình và thông báo đa kênh.

### P3 — Project Core, SCĐK và tài chính

- Dự án, mốc/Gantt, hợp đồng/BOQ, khối lượng nghiệm thu.
- Kế hoạch/điều chỉnh/phân bổ vốn, tạm ứng, thanh toán, giải ngân, đối soát.
- Dashboard và cảnh báo sai lệch.

### P4 — XDCB, tích hợp, BI và công khai

- Vòng đời XDCB, quyết toán, bảo hành, bàn giao sang tài sản.
- API hệ thống ngoài, SSO/chữ ký số nếu áp dụng.
- Cổng bản đồ công khai sau khi hoàn thiện data governance.
- Trình tạo báo cáo/BI nâng cao.

---

## 13. Kịch bản bắt buộc dùng để duyệt UX

1. Nhân viên tuần đường hoàn thành ca khi mất mạng, ghi một sự cố và đồng bộ lại sau đó.
2. Sự cố nghiêm trọng được cảnh báo, có người xác nhận đã nhận, phân công và xử lý đúng SLA.
3. Lệnh duy tu bị nghiệm thu không đạt, trả làm lại và giữ đầy đủ hai lần bằng chứng.
4. Cập nhật tài sản có GPS sai số cao hoặc nghi trùng; hệ thống chặn công bố và đưa sang QA.
5. Dự án chậm tiến độ; đối chiếu kế hoạch vốn, khối lượng nghiệm thu, hồ sơ thanh toán và số đã giải ngân.
6. Dự án hoàn thành bàn giao nhiều tài sản mới và cập nhật tài sản hiện hữu mà không nhập lại.
7. Hồ sơ gốc được mượn, nhắc quá hạn, trả lại và truy được toàn bộ chuỗi bàn giao.

---

## 14. Các quyết định cần người sử dụng xác nhận ở vòng tiếp theo

1. Hệ thống dùng cho một đơn vị, một tỉnh, nhiều Khu QLĐB hay mô hình SaaS nhiều tenant?
2. Cơ cấu tổ chức và danh sách vai trò thực tế; ai giao, ai duyệt, ai nghiệm thu, ai được mở lại?
3. Danh mục tuyến, cách quản lý Km+m, chiều/làn/nhánh và nguồn tim tuyến chuẩn hiện có.
4. Năm luồng nào cần ưu tiên nhất ở giai đoạn đầu?
5. Danh sách biểu mẫu/báo cáo bắt buộc và mẫu file thực tế đang dùng.
6. Công thức chính thức của các KPI, đặc biệt tỷ lệ phủ tuần đường, tỷ lệ đạt nghiệm thu và giải ngân.
7. Dữ liệu nào được công khai; người dân chỉ xem hay được gửi phản ánh?
8. Thiết bị hiện trường, hệ điều hành, vùng mất mạng, nhu cầu ảnh/video và yêu cầu độ chính xác dưới 1 m.
9. Các hệ thống hiện có cần tích hợp: đầu tư công, Kho bạc/tài chính, cổng tỉnh, SSO, chữ ký số, SMS/Zalo/email.
10. Quy mô dự kiến: số km, số tài sản, người dùng đồng thời, dung lượng media và thời gian lưu giữ.

Khi các quyết định trên được xác nhận, draft này có thể chuyển thành sitemap chốt, user flow chi tiết, wireframe từng trạng thái và backlog có tiêu chí nghiệm thu.
