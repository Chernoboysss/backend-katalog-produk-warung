# API Documentation

Dokumentasi untuk API Katalog Warung

## 1. User Registration

**Endpoint**: `/register`  
**Method**: `POST`  
**Description**: Mendaftarkan pengguna baru.

### Request Body:
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```
### Response:
**Success (201 Created)**:
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "email": "test@example.com",
    "createdAt": "2024-12-10T00:00:00Z",
    "updatedAt": "2024-12-10T00:00:00Z"
  }
}
```
**Error (500 Internal Server Error)**
```json
{
  "error": "User registration failed"
}
```
## 2. User Login
**Endpoint** : `/login`
**Method**: `POST`
**Description**: Mengautentikasi pengguna dan menghasilkan token JWT.

### Request Body:
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```
## Response:
***Success (200 OK)***:
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIiwiaWF0IjoxNzMzODE5NDQxLCJleHAiOjE3MzM4MjMwNDF9.hl6qxHn4samS0wmKEnTOHoKO83NLbVQXrsLoww6WQVQ"
}
```
***Error (401 Unauthorized)***:
```json
{
  "error": "Invalid email or password"
}
```
3. Logout
**Endpoint**: `/logout`
**Method**: `POST`
**Description**: Logout pengguna dan memasukkan token ke dalam blacklist.

### Request Headers:
text
Authorization: Bearer your_jwt_token_here
## Response:
***Success (200 OK)***:
```json
{
  "message": "Logout successful"
}
```

***Error (400 Bad Request)***:
```json
{
  "error": "Token required"
}
```
***Error (401 Unauthorized)***:
```json
{
  "error": "Token has been invalidated"
}
```
## 4. Get All Products (Public)
**Endpoint**: `/products/all`
**Method**: `GET`
**Description**: Mendapatkan semua produk (tanpa autentikasi) dengan hanya menampilkan nama dan gambar produk.

## Response:
***Success (200 OK)***:
```json
{
  "products": [
    {
      "name": "Product 1",
      "image": "image_url_1.jpg"
    },
    {
      "name": "Product 2",
      "image": "image_url_2.jpg"
    }
  ]
}
```
***Error (500 Internal Server Error)***:
```json
{
  "error": "Failed to fetch products"
}
```
## 5. Create Product
**Endpoint**: `/products`
**Method**:`POST`
**Description**: Menambahkan produk baru (diperlukan autentikasi).

## Request Headers:
text
Authorization: Bearer your_jwt_token_here
### Request Body:
```json
{
  "name": "Product 1",
  "image": "image_url_1.jpg",
  "size": "M",
  "price": 10000,
  "qty": 50
}
```
## Response:
***Success (201 Created)***:
```json
{
  "message": "Product created successfully",
  "product": {
    "id": 1,
    "name": "Product 1",
    "image": "image_url_1.jpg",
    "size": "M",
    "price": 10000,
    "qty": 50,
    "userId": 1,
    "createdAt": "2024-12-10T00:00:00Z",
    "updatedAt": "2024-12-10T00:00:00Z"
  }
}
```
***Error (500 Internal Server Error)***:
```json
{
  "error": "Failed to create product"
}
```
## 6. Get All Products for Logged-in User
**Endpoint**: `/products`
**Method**: `GET`
**Description**: Mendapatkan semua produk untuk pengguna yang sedang login.
### Request Headers:
text
Authorization: Bearer your_jwt_token_here
## Response:
***Success (200 OK)***:
```json
{
  "products": [
    {
      "id": 1,
      "name": "Product 1",
      "image": "image_url_1.jpg",
      "size": "M",
      "price": 10000,
      "qty": 50,
      "userId": 1,
      "createdAt": "2024-12-10T00:00:00Z",
      "updatedAt": "2024-12-10T00:00:00Z"
    },
    {
      "id": 2,
      "name": "Product 2",
      "image": "image_url_2.jpg",
      "size": "L",
      "price": 20000,
      "qty": 30,
      "userId": 1,
      "createdAt": "2024-12-10T00:00:00Z",
      "updatedAt": "2024-12-10T00:00:00Z"
    }
  ]
}
```
***Error (500 Internal Server Error)***:
```json
{
  "error": "Failed to fetch products"
}
```
## 7. Update Product
**Endpoint**: `/products/:id`
**Method**: `PUT`
**Description**: Mengubah informasi produk (diperlukan autentikasi dan pemilik produk yang benar).

### Request Headers:
text
Authorization: Bearer your_jwt_token_here
### Request Body:
```json
{
  "name": "Updated Product",
  "image": "updated_image_url.jpg",
  "size": "L",
  "price": 15000,
  "qty": 40
}
```
## Response:
***Success (200 OK)***:
```json
{
  "message": "Product updated successfully"
}
```
***Error (404 Not Found)***:
```json
{
  "error": "Product not found or unauthorized"
}
```
***Error (500 Internal Server Error)***:
```json
{
  "error": "Failed to update product"
}
```
## 8. Delete Product
**Endpoint**: `/products/:id`
**Method**: `DELETE`
**Description**: Menghapus produk (diperlukan autentikasi dan pemilik produk yang benar).

### Request Headers:
text
Authorization: Bearer your_jwt_token_here
### Response:
***Success (200 OK)***:

Salin kode
```json
{
  "message": "Product deleted successfully"
}
```
***Error (404 Not Found)***:
```json
{
  "error": "Product not found or unauthorized"
}
```
***Error (500 Internal Server Error)***
```json
{
  "error": "Failed to delete product"
}
```
## Endpoints Summary
| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
|/register |    POST    | Register a new user   |      No         |
|/login    |    POST    |Login a user and generate JWT             |        No       |
|/logout |POST  |Logout and invalidate token             |         Yes      |
|/products/all		          | GET       |	Get all products (public)             | No               |
|/products			          |GET        | Get all products for logged-in user            |Yes               |
|/products			          |POST        |Create a new product             |Yes               |
|/products/:id			          |PUT        |Update product details             |Yes               |
|/products/:id			          |DELETE        |Delete a product             |Yes               |



