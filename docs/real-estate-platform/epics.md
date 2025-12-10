## Nền tảng Phân phối Bất động sản - Epic Breakdown

**Tác giả:** Luis (Dev Team) + Mary (Business Analyst)
**Ngày:** 06/12/2025
**Cấp độ dự án:** Enterprise
**Quy mô mục tiêu:** 1000+ người dùng
**Dựa trên:** PRD v1.3 (FINAL)

---

## Tổng quan

Tài liệu này mô tả đầy đủ cấu trúc Epic và Story cho Nền tảng Phân phối Bất động sản, chuyển hóa các yêu cầu trong [PRD v1.3](./prd-v1.3.md) thành các stories có thể triển khai cho đội dev.

## Tóm tắt Epic & Thứ tự thực hiện

### Triển khai theo Phase

**MVP (Phase 1)** - 5 tuần:
- Epic 1: Nền tảng & Khởi tạo hệ thống (Foundation & Setup)
- Epic 2: Quản lý Tồn kho Bất động sản (Property Inventory Management)
- Epic 3: Quản lý Khách hàng & Giao dịch (Customer & Deal Management)
- Epic 4: Công cụ cho Sales Agent (Sales Agent Tools)
- Epic 5: Quản lý Hoa hồng (Commission Management)

**Phase 2** - 2 tuần:
- Epic 6: Phân phối Lead & Tự động hóa (Lead Distribution & Automation)

**Phase 3** - 2 tuần:
- Epic 7: Vận hành & Mở rộng (Operations & Scale)

---

## Cấu trúc Epic (7 Epics, ~38 Stories)

### Epic 1: Nền tảng & Khởi tạo hệ thống 🏗️
**Giá trị:** Thiết lập nền tảng kỹ thuật và validate khả năng của Twenty CRM

**Phạm vi:**
- Kiểm chứng kỹ thuật Twenty CRM (Phase 0 POC)
- Thiết lập cấu trúc project và monorepo
- Xây nền schema database (metadata system của Twenty)
- Thiết lập CI/CD pipeline (Docker + Dokploy)
- Cấu hình xác thực & phân quyền (Authentication & RBAC)

**Số lượng story:** 5 stories
**Phụ thuộc:** Không (epic đầu tiên)
**Kết quả:** Có hạ tầng chạy được, sẵn sàng để build các tính năng phía trên

#### Detailed Stories

##### Story 1.1: Project Initialization 🚀
**As a** Developer
**I want** to clone and setup Twenty CRM v0.52.0
**So that** I have a working development environment

**Acceptance Criteria:**
- ✅ Given a fresh environment, When I run the clone command, Then Twenty CRM v0.52.0 is cloned successfully
- ✅ Given cloned repository, When I run `pnpm install`, Then all dependencies are installed without errors
- ✅ Given dependencies installed, When I check node version, Then Node.js 20.18.0 LTS is confirmed

**Tech Tasks:**
1. Clone Twenty CRM at exact version - Ref: `architecture.md` lines 28-36
   ```bash
   git clone --branch v0.52.0 https://github.com/twentyhq/twenty.git
   ```
2. Install dependencies with pnpm 9.14.2
3. Verify Node.js 20.18.0 LTS installed

**Estimate:** 2 hours
**Priority:** P0 (Blocking)

---

##### Story 1.2: Development Environment Setup 🔧
**As a** Developer
**I want** to configure PostgreSQL and Redis infrastructure
**So that** the application can run locally

**Acceptance Criteria:**
- ✅ Given `.env` configured with database credentials, When I run `docker compose up -d`, Then PostgreSQL 16.4 and Redis 7.4.1 containers start successfully
- ✅ Given infrastructure running, When I run `npx nx database:migrate twenty-server`, Then database schema is created
- ✅ Given all services running, When I access `http://localhost:3000`, Then Twenty API responds with health check
- ✅ Given all services running, When I access `http://localhost:3001`, Then Twenty frontend loads

**Tech Tasks:**
1. Copy `.env.example` to `.env` - Ref: `architecture.md` lines 38-43
2. Configure PostgreSQL connection string:
   ```
   PG_DATABASE_URL=postgres://postgres:postgres@localhost:5432/default
   ```
3. Configure Redis connection:
   ```
   REDIS_URL=redis://localhost:6379
   ```
4. Start Docker containers with `docker compose -f docker-compose.dev.yml up -d`
5. Run database migrations
6. Start backend and frontend servers

**Estimate:** 2 hours
**Priority:** P0 (Blocking)

---

##### Story 1.3: Real Estate Module Structure 📦
**As a** Developer
**I want** to create the real-estate module skeleton
**So that** we have a structured place for all real estate features

**Acceptance Criteria:**
- ✅ Given module file created, When imported in `app.module.ts`, Then no TypeScript compilation errors
- ✅ Given constants defined, Then `REAL_ESTATE_OBJECT_IDS` contains unique UUIDs for each entity
- ✅ Given empty workspace entities created, When server starts, Then Twenty metadata system recognizes new module
- ✅ Given module structure, Then folder matches architecture source tree exactly

**Tech Tasks:**
1. Create module folder structure - Ref: `architecture.md` lines 92-121
   ```
   packages/twenty-server/src/modules/real-estate/
   ├── standard-objects/
   ├── services/
   ├── jobs/
   ├── resolvers/
   ├── constants/
   └── real-estate.module.ts
   ```
2. Create `real-estate.module.ts` with NestJS module decorator
3. Create `constants/real-estate-object-ids.ts` with UUID constants
4. Create `constants/real-estate-field-ids.ts` with field UUID constants
5. Register module in `app.module.ts`
6. Verify server starts without errors

**Estimate:** 4 hours
**Priority:** P0 (Blocking)

---

##### Story 1.4: RBAC & Authentication Configuration 🔐
**As an** Admin
**I want** role-based access control configured
**So that** different user types have appropriate permissions

**Acceptance Criteria:**
- ✅ Given Admin role, When user logs in as Admin, Then full access to all modules is granted
- ✅ Given Sales Agent role, When accessing Commission module, Then view-only access is permitted
- ✅ Given Finance role, When accessing Property module, Then access is denied
- ✅ Given Manager role, When accessing Reports, Then read access is granted
- ✅ Given JWT authentication, When token expires after 7 days, Then user must re-authenticate

**Tech Tasks:**
1. Define roles in Twenty's permission system - Ref: `architecture.md` lines 653-660
   ```
   Admin: Full access all modules
   Sales Agent: Read projects/properties, Reserve, Manage own leads, View own commissions
   Finance: Read/Update commissions (approve/pay), Export CSV
   Manager: Read all, Reports, No edit
   ```
2. Configure JWT token expiry to 7 days
3. Setup automatic token refresh
4. Test each role's permissions

**Estimate:** 4 hours
**Priority:** P1 (High)

---

##### Story 1.5: Deployment Pipeline Setup 🚀
**As a** DevOps Engineer
**I want** Docker and Dokploy configured
**So that** we can deploy to production

**Acceptance Criteria:**
- ✅ Given Dockerfile, When built, Then image size is under 500MB
- ✅ Given Dokploy configuration, When deployed, Then application is accessible via domain
- ✅ Given environment secrets, When deployed, Then secrets are not exposed in container logs
- ✅ Given deployment, When Nginx configured, Then HTTPS works with SSL certificate

**Tech Tasks:**
1. Create/verify Dockerfile for production build
2. Configure Dokploy project - Ref: `architecture.md` lines 697-726
3. Setup Nginx reverse proxy configuration:
   ```
   :443 → twenty-front:3001
   /api → twenty-server:3000
   ```
4. Configure environment variables in Dokploy secrets
5. Setup Docker volumes for PostgreSQL and Redis persistence
6. Test deployment to staging environment

**Estimate:** 4 hours
**Priority:** P1 (High)

---

**Epic 1 Total:** 5 stories, ~16 hours

---

### Epic 2: Quản lý Tồn kho Bất động sản 📦
**Giá trị:** Cho phép theo dõi real-time tồn kho lô đất trên tất cả dự án

**Phạm vi:**
- Module Projects (CRUD + quản lý file gallery)
- Module Properties (CRUD + workflow trạng thái)
- Hệ thống giữ chỗ (reservation) với tự động release sau 24h
- Phòng tránh double-booking (ràng buộc DB + locking giao dịch)
- Dashboard real-time về trạng thái tồn kho

**Số lượng story:** 7 stories
**Phụ thuộc:** Epic 1 (nền tảng phải xong trước)
**Kết quả:** Admin có thể quản lý dự án/lô đất, theo dõi tồn kho theo thời gian thực

---

### Epic 3: Quản lý Khách hàng & Giao dịch 🤝
**Giá trị:** Theo dõi vòng đời khách hàng và pipeline giao dịch từ lead đến chốt deal

**Phạm vi:**
- Module Contact/Customer (CRUD + bảo mật dữ liệu cá nhân)
- Module Deal/Transaction (tự tạo khi khách đặt cọc)
- Workflow đồng bộ trạng thái Property–Deal
- Màn hình pipeline deal (Kanban theo trạng thái)
- Trigger tạo hoa hồng khi Deal ở trạng thái Won

**Số lượng story:** 5 stories
**Phụ thuộc:** Epic 2 (phải có Properties để gắn Deal)
**Kết quả:** Sales agent có thể theo dõi khách hàng và giao dịch end-to-end

---

### Epic 4: Công cụ cho Sales Agent 👨‍💼
**Giá trị:** Trao quyền cho sales với các công cụ tự phục vụ và nhìn thấy hiệu suất cá nhân

**Phạm vi:**
- Mở rộng đối tượng User (các trường dành riêng cho sales)
- Dashboard hiệu suất cho từng sales (personal view)
- Các widget hiệu suất (tổng số deal, tổng hoa hồng, leaderboard)
- Widget "Lô đất tôi đang giữ chỗ" (My Reserved Properties)
- Theo dõi hoa hồng (view-only cho sales)

**Số lượng story:** 6 stories
**Phụ thuộc:** Epic 2 (Properties), Epic 3 (Deals), Epic 5 (Commission)
**Kết quả:** Sales agent tự xem được tồn kho, pipeline của mình, và hoa hồng tương ứng

---

### Epic 5: Quản lý Hoa hồng 💰
**Giá trị:** Tự động hóa tính toán hoa hồng và đơn giản hóa quy trình chi trả

**Phạm vi:**
- Tự động tính hoa hồng (khi Deal chuyển sang trạng thái Won)
- Workflow phê duyệt hoa hồng (Admin review + approve)
- Export batch thanh toán (file CSV cho chuyển khoản hàng loạt)
- Báo cáo hoa hồng (theo sales, theo giai đoạn)
- Giao diện Finance để quản lý trạng thái thanh toán

**Số lượng story:** 5 stories
**Phụ thuộc:** Epic 3 (Deals phải tạo được commission)
**Kết quả:** Bộ phận Kế toán/Finance xử lý hoa hồng chính xác, minh bạch và tiết kiệm thời gian

---

### Epic 6: Phân phối Lead & Tự động hóa 🎯
**Giá trị:** Phân phối lead công bằng và tự động cho sales

**Phạm vi:**
- Mở rộng đối tượng Lead (assignedSales, trường SLA, v.v.)
- Thuật toán auto-assignment (round-robin, có xét sức chứa/capacity)
- Theo dõi SLA (thời gian phản hồi, nhắc nhở follow-up)
- Hệ thống thông báo (Email + tích hợp Zalo nếu khả thi)
- Dashboard phân phối lead (admin có thể override)

**Số lượng story:** 6 stories
**Phụ thuộc:** Epic 4 (User phải có các trường phục vụ tính capacity)
**Kết quả:** Lead được phân phối công bằng, có theo dõi SLA, giảm lead bị bỏ quên

**Lưu ý:** Đây là Phase 2, KHÔNG thuộc MVP.

---

### Epic 7: Vận hành & Mở rộng 📊
**Giá trị:** Tăng trải nghiệm người dùng và đảm bảo hệ thống scale tốt cho 1000+ users

**Phạm vi:**
- Bản đồ lô đất tương tác (interactive plot map) dùng SVG overlay trên masterPlanImage
- Báo cáo & analytics nâng cao (doanh số theo dự án, xu hướng hiệu suất sales)
- Công cụ hỗ trợ vận hành (admin impersonation, system health dashboard)
- Playbook triển khai pilot (rollout cho 200 sales agents)

**Số lượng story:** 4 stories
**Phụ thuộc:** Tất cả các epic trước (tính chất nâng cao/tối ưu)
**Kết quả:** Hệ thống sẵn sàng production cho 1000+ users, rollout pilot được quản lý tốt

**Lưu ý:** Đây là Phase 3, bao gồm phần hỗ trợ Pilot Program.

---

## Vì sao cấu trúc này hợp lý?

### Thứ tự theo Giá trị (Value-Based Sequencing) ✅
- Mỗi epic mang lại **giá trị kinh doanh độc lập**
- Không group theo layer kỹ thuật (không có epic kiểu "Backend" hay "Frontend")
- Đặt tên theo **khả năng/giá trị cho người dùng**, không phải chi tiết implementation

### Triển khai Gia tăng (Incremental Delivery) ✅
- Epic 1 xây nền tảng → các epic sau build chồng lên
- Epic 2–5 = MVP → Đã đủ để vận hành quản lý tồn kho và hoa hồng
- Epic 6 = Phase 2 → Thêm tự động hóa cho lead
- Epic 7 = Phase 3 → Nâng cao UX và khả năng scale

### Phụ thuộc Rõ ràng ✅
- Chuỗi tuyến tính: 1 → 2 → 3 → 4 & 5 (có thể song song) → 6 → 7
- Epic 4 và 5 có thể phát triển song song (overlap ít)
- Không có phụ thuộc ngược (mỗi story chỉ phụ thuộc vào story/epic trước đó)

### Kích thước Story Hợp lý ✅
- Tổng ~38 stories cho 7 epics
- Trung bình 5–6 stories/epic (scope vừa phải)
- Mỗi story đủ nhỏ để 1 dev làm trong 1 phiên tập trung (4–8 tiếng)

### Khớp với Phasing trong PRD ✅
- MVP (Epic 1–5) = PRD Phase 1 (5 tuần)
- Epic 6 = PRD Phase 2 (2 tuần)
- Epic 7 = PRD Phase 3 (2 tuần)
- Pilot program (Epic 7, 1 story riêng) = PRD Section 16.1.5

---

## Bước tiếp theo

Sau khi bạn đồng ý cấu trúc epic:
1. **Decompose Story:** Bẻ nhỏ từng epic thành stories chi tiết với acceptance criteria dạng BDD
2. **Architecture Planning:** Viết tech spec cho Epic 1 (foundation & setup)
3. **Sprint Planning:** Map stories vào các sprint 2 tuần

---

_Nếu bạn OK với cấu trúc epic này, chúng ta sẽ chuyển sang bước chi tiết hóa từng story._
