# Top NEWS Backend API Documentation

## Base URL
```
http://localhost:3000
```

## Authentication
Most endpoints require authentication via JWT token. Include the token in one of these ways:
- **Cookie**: `token=your_jwt_token`
- **Header**: `Authorization: Bearer your_jwt_token`
- **Header**: `Authorization: your_jwt_token`

---

## 📋 API Endpoints Overview

### 🔐 User Routes (`/user`)
### 📰 News Routes (`/news`)
### 🤖 AI Routes (`/ai`)
### 👨‍💼 Admin Routes (`/admin`)

---

## 🔐 User Routes (`/user`)

### 1. Register User
**POST** `/user/register`

**Description**: Register a new user account

**Request Body**:
```json
{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Validation Rules**:
- `firstname`: String, 3-15 characters
- `lastname`: String, 3-15 characters
- `email`: Valid email format
- `password`: String, minimum 6 characters

**Success Response** (201):
```json
{
  "user": {
    "_id": "user_id",
    "name": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "profilePic": "url_or_null",
    "googleId": "null_or_google_id"
  },
  "token": "jwt_token_here"
}
```

**Error Response** (400):
```json
{
  "errors": [
    {
      "msg": "Email must be a valid email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

---

### 2. Login User
**POST** `/user/login`

**Description**: Authenticate user and return JWT token

**Request Body**:
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Validation Rules**:
- `email`: Valid email format
- `password`: String, minimum 6 characters

**Success Response** (200):
```json
{
  "user": {
    "_id": "user_id",
    "name": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "profilePic": "url_or_null"
  },
  "token": "jwt_token_here"
}
```

**Error Response** (401):
```json
{
  "message": "Invalid credentials"
}
```

---

### 3. Get User Profile
**GET** `/user/profile`

**Authentication**: Required (JWT Token)

**Success Response** (200):
```json
{
  "user": {
    "_id": "user_id",
    "name": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "profilePic": "url_or_null",
    "googleId": "null_or_google_id"
  }
}
```

---

### 4. Logout User
**GET** `/user/logout`

**Authentication**: Required (JWT Token)

**Success Response** (200):
```json
{
  "message": "Log Out"
}
```

---

### 5. Contact Us
**POST** `/user/contactus`

**Authentication**: Required (JWT Token)

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "message": "Your message here"
}
```

**Validation Rules**:
- `name`: String, 3-15 characters
- `email`: Valid email format
- `message`: String, minimum 1 character

**Success Response** (200):
```json
{
  "result": "Contact message sent successfully"
}
```

---

### 6. Google Login
**POST** `/user/google-login`

**Request Body**:
```json
{
  "token": "google_id_token"
}
```

**Success Response** (200):
```json
{
  "user": {
    "_id": "user_id",
    "name": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@gmail.com",
    "profilePic": "google_profile_pic_url",
    "googleId": "google_user_id"
  },
  "token": "jwt_token_here"
}
```

---

### 7. Upload Profile Picture
**POST** `/user/upload-profile`

**Authentication**: Required (JWT Token)

**Content-Type**: `multipart/form-data`

**Request Body**: Form data with `profile` field containing image file

**Success Response** (200):
```json
{
  "message": "Profile Update SuccessFully!"
}
```

---

### 8. Forgot Password
**POST** `/user/forgot-password`

**Request Body**:
```json
{
  "email": "john.doe@example.com"
}
```

**Success Response** (200):
```json
{
  "email": "john.doe@example.com",
  "message": "Otp Send SuccessFully!"
}
```

---

### 9. Enter OTP
**POST** `/user/enter-otp`

**Request Body**:
```json
{
  "email": "john.doe@example.com",
  "newotp": "123456"
}
```

**Success Response** (200):
```json
{
  "email": "john.doe@example.com"
}
```

---

### 10. Change Password
**POST** `/user/change_pass`

**Request Body**:
```json
{
  "email": "john.doe@example.com",
  "newpassword": "newpassword123"
}
```

**Success Response** (201):
```json
{
  "message": "password Change SuccessFully!",
  "user": {
    "_id": "user_id",
    "email": "john.doe@example.com"
  }
}
```

---

### 11. Get User Logs
**GET** `/user/logs/:email`

**Description**: Get activity logs for a specific user

**URL Parameters**:
- `email`: User's email address

**Success Response** (200):
```json
{
  "email": "john.doe@example.com",
  "logs": [
    {
      "ip": "192.168.1.1",
      "userAgent": "Mozilla/5.0...",
      "timestamp": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### 12. Get All User Logs
**GET** `/user/logs`

**Description**: Get activity logs for all users

**Success Response** (200):
```json
{
  "totalUsers": 10,
  "users": [
    {
      "_id": "user_id",
      "email": "john.doe@example.com",
      "name": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "logs": [...]
    }
  ]
}
```

---

## 📰 News Routes (`/news`)

### 1. Get News
**POST** `/news/getnews`

**Authentication**: Required (JWT Token)

**Request Body**:
```json
{
  "prompt": "technology news"
}
```

**Validation Rules**:
- `prompt`: String, minimum 3 characters

**Success Response** (200):
```json
{
  "result": {
    "articles": [
      {
        "title": "News Title",
        "description": "News Description",
        "url": "https://example.com",
        "publishedAt": "2024-01-01T00:00:00Z"
      }
    ]
  }
}
```

---

### 2. Get More Description
**POST** `/news/moredescription`

**Authentication**: Required (JWT Token)

**Request Body**:
```json
{
  "prompt": "Article content to summarize"
}
```

**Validation Rules**:
- `prompt`: String, minimum 3 characters

**Success Response** (200):
```json
{
  "result": "AI-generated summary of the article content"
}
```

---

### 3. Text to Speech
**POST** `/news/texttospeech`

**Authentication**: Required (JWT Token)

**Request Body**:
```json
{
  "prompt": "Text to convert to speech"
}
```

**Validation Rules**:
- `prompt`: String, minimum 3 characters

**Success Response** (200):
- **Content-Type**: `audio/mpeg`
- **Body**: Binary audio file (MP3)

---

## 🤖 AI Routes (`/ai`)

### 1. Get Summary
**POST** `/ai/getsummery`

**Authentication**: Required (JWT Token)

**Request Body**:
```json
{
  "prompt": "Article content to summarize"
}
```

**Validation Rules**:
- `prompt`: String, minimum 3 characters

**Success Response** (200):
```json
{
  "result": "AI-generated summary"
}
```

---

### 2. Translate Text
**POST** `/ai/translate`

**Authentication**: Required (JWT Token)

**Request Body**:
```json
{
  "text": "Text to translate",
  "language": "spanish"
}
```

**Validation Rules**:
- `text`: String, minimum 3 characters
- `language`: String, minimum 2 characters

**Success Response** (200):
```json
{
  "result": "Translated text"
}
```

---

## 👨‍💼 Admin Routes (`/admin`)

### 1. Admin Login
**POST** `/admin/login`

**Request Body**:
```json
{
  "email": "admin@gmail.com",
  "password": "123456"
}
```

**Validation Rules**:
- `email`: Valid email format
- `password`: String, minimum 6 characters

**Success Response** (200):
```json
{
  "token": "jwt_token_here"
}
```

**Error Response** (401):
```json
{
  "message": "admin is not Authenticated"
}
```

---

### 2. Add Subscriber
**POST** `/admin/subscribe`

**Request Body**:
```json
{
  "email": "subscriber@example.com"
}
```

**Validation Rules**:
- `email`: Valid email format

**Success Response** (200):
```json
{
  "message": "Subscribe Successfully✅"
}
```

---

### 3. Send Updates
**POST** `/admin/sendupdates`

**Authentication**: Required (Admin JWT Token)

**Content-Type**: `multipart/form-data`

**Request Body**: Form data with:
- `name`: String (news update title)
- `description`: String (news update content)
- `image`: File (image file)

**Success Response** (200):
```json
{
  "message": "Email sent successfully"
}
```

**Error Response** (400):
```json
{
  "error": "Image is required"
}
```

---

### 4. Get Admin Profile
**GET** `/admin/profile`

**Authentication**: Required (Admin JWT Token)

**Success Response** (200):
```json
{
  "email": "admin@gmail.com"
}
```

---

## 🔒 Authentication & Authorization

### User Authentication
- Most user routes require JWT token authentication
- Token can be provided via cookie or Authorization header
- Blacklisted tokens are rejected

### Admin Authentication
- Admin routes require admin JWT token
- Admin credentials: `admin@gmail.com` / `123456`
- Admin tokens are separate from user tokens

---

## 📝 Error Handling

### Common Error Responses

**401 Unauthorized**:
```json
{
  "message": "Unauthorized User: No token provided"
}
```

**400 Bad Request**:
```json
{
  "errors": [
    {
      "msg": "Validation error message",
      "param": "field_name",
      "location": "body"
    }
  ]
}
```

**500 Internal Server Error**:
```json
{
  "message": "Server Side Error"
}
```

---

## 🛠️ Development Notes

### File Uploads
- Profile pictures use `uploadDisk` (saves to disk)
- Admin updates use `uploadMemory` (processes in memory)
- Supported formats: Common image formats

### Database Models
- Users: `userModel` with profile, logs, and authentication
- Blacklisted tokens: `blacklistTokenModel` for logout functionality

### External Services
- Cloudinary: For image storage
- Google OAuth: For Google login
- Email service: For password reset and updates
- AI services: For text processing and translation

---

## 📊 Status Codes

- **200**: Success
- **201**: Created
- **400**: Bad Request (validation errors)
- **401**: Unauthorized (authentication required/failed)
- **404**: Not Found
- **500**: Internal Server Error

---

*Last updated: January 2024*
