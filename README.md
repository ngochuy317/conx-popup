# Thiết lập dự án với Docker

Hướng dẫn này sẽ giúp bạn thiết lập và chạy dự án sử dụng Docker và Docker Compose.

## Yêu cầu

Đảm bảo rằng bạn đã cài đặt các phần mềm sau trên máy của mình:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Bắt đầu

Làm theo các bước sau để thiết lập và chạy dự án:

### 1. Clone Repository

Clone repository về máy của bạn:

```sh
git clone https://github.com/ngochuy317/conx-popup
cd conx-popup
```

### 2. Build và Chạy các Container
Sử dụng Docker Compose để build và chạy các container:

```sh
docker-compose up --build
```
Lệnh này sẽ build các Docker image và khởi động các container được định nghĩa trong file `docker-compose.yml`.

### 3. Truy cập các dịch vụ
Khi các container đã được khởi động, bạn có thể truy cập các dịch vụ:

- Django Backend: http://localhost:28000
- React Frontend: http://localhost:3000

### 4. Dừng các Container
Để dừng các container đang chạy, sử dụng lệnh sau:

```sh
docker-compose down
```

Lệnh này sẽ dừng và xóa các container.


### Cấu trúc thư mục
Dưới đây là tổng quan về các file và thư mục quan trọng:

```sh
conx-popup/
├── django-backend/          # Mã nguồn Django backend
├── frontend/
│   └── react-template/      # Mã nguồn React frontend
└── docker-compose.yml       # Cấu hình Docker Compose
```

### HTMX
```sh
http://localhost:28000/customer/htmx/
```
### AlpineJs
```sh
http://localhost:28000/customer/alpine/
```
### ReactJS
```sh
http://localhost:3000/
```