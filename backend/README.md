# Rydr Backend API

This is the backend API for the Rydr ride-hailing application. It provides endpoints for user and captain (driver) registration, authentication, ride management, and integration with Google Maps for geolocation and fare calculation.


## Features

- User and Captain (driver) registration and login
- JWT-based authentication with token blacklisting (logout)
- Ride creation and fare calculation based on Google Maps Distance Matrix
- Google Maps address autocomplete and geocoding
- MongoDB data storage via Mongoose
- Input validation using express-validator

---

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (jsonwebtoken)
- bcryptjs
- Google Maps API
- express-validator

---

## API Endpoints

### User Endpoints

#### Register User

- **POST** `/users/register`
- **Body:**
  ```json
  {
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john.doe@example.com",
    "password": "yourpassword"
  }
  ```
- **Responses:**
  - `201 Created`: `{ "token": "<jwt>", "user": { ... } }`
  - `400 Bad Request`: Validation errors or user exists
  - `500 Internal Server Error`

#### Login User

- **POST** `/users/login`
- **Body:**
  ```json
  {
    "email": "john.doe@example.com",
    "password": "yourpassword"
  }
  ```
- **Responses:**
  - `200 OK`: `{ "token": "<jwt>", "user": { ... } }`
  - `400 Bad Request`: Validation errors
  - `401 Unauthorized`: Invalid credentials

#### Get User Profile

- **GET** `/users/profile`
- **Headers:** `Authorization: Bearer <jwt>`
- **Responses:**
  - `200 OK`: `{ "user": { ... } }`
  - `401 Unauthorized`: Missing/invalid token

#### Logout User

- **GET** `/users/logout`
- **Headers:** `Authorization: Bearer <jwt>`
- **Responses:**
  - `200 OK`: `{ "message": "Logged out successfully" }`
  - `401 Unauthorized`: Missing/invalid/blacklisted token

---

### Captain Endpoints

#### Register Captain

- **POST** `/captains/register`
- **Body:**
  ```json
  {
    "fullname": { "firstname": "Jane", "lastname": "Smith" },
    "email": "jane.smith@example.com",
    "password": "yourpassword",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
  ```
- **Responses:**
  - `201 Created`: `{ "token": "<jwt>", "captain": { ... } }`
  - `400 Bad Request`: Validation errors or captain exists

#### Login Captain

- **POST** `/captains/login`
- **Body:** Same as user login
- **Responses:** Same as user login

#### Get Captain Profile

- **GET** `/captains/profile`
- **Headers:** `Authorization: Bearer <jwt>`
- **Responses:**
  - `200 OK`: `{ "captain": { ... } }`
  - `401 Unauthorized`: Missing/invalid token

#### Logout Captain

- **GET** `/captains/logout`
- **Headers:** `Authorization: Bearer <jwt>`
- **Responses:** Same as user logout

---

### Ride Endpoints

#### Create Ride

- **POST** `/rides/create`
- **Headers:** `Authorization: Bearer <jwt>`
- **Body:**
  ```json
  {
    "pickup": "Pickup Address",
    "destination": "Destination Address",
    "vehicleType": "car" // or "auto", "motorcycle"
  }
  ```
- **Responses:**
  - `201 Created`: Ride object
  - `400 Bad Request`: Validation errors
  - `500 Internal Server Error`

#### Get Fares

- **POST** `/rides/get-fares`
- **Headers:** `Authorization: Bearer <jwt>`
- **Body:**
  ```json
  {
    "pickup": "Pickup Address",
    "destination": "Destination Address"
  }
  ```
- **Responses:**
  - `200 OK`: `{ "car": 123.45, "auto": 99.99, "motorcycle": 80.00 }`
  - `400 Bad Request`: Validation errors

---

### Maps Endpoints

#### Get Address Coordinates

- **GET** `/maps/get-coordinates?address=Some+Address`
- **Headers:** `Authorization: Bearer <jwt>`
- **Responses:**
  - `200 OK`: `{ "ltd": 23.123, "lng": 72.123 }`
  - `400 Bad Request`: Validation errors

#### Get Distance and Time

- **GET** `/maps/get-distance-time?origin=...&destination=...`
- **Headers:** `Authorization: Bearer <jwt>`
- **Responses:**
  - `200 OK`: `{ "distanceKm": 5.2, "durationMin": 14.5 }`
  - `400 Bad Request`: Validation errors

#### Get Autocomplete Suggestions

- **GET** `/maps/get-suggestions?input=Ahmedabad`
- **Headers:** `Authorization: Bearer <jwt>`
- **Responses:**
  - `200 OK`: `[ { "description": "...", ... }, ... ]`
  - `400 Bad Request`: Validation errors

---

## Authentication

- All protected endpoints require a JWT token, sent as a cookie or in the `Authorization: Bearer <token>` header.
- On logout, tokens are blacklisted and cannot be reused.

---

## Error Handling

- All endpoints return appropriate HTTP status codes and error messages.
- Validation errors are returned as an array in the `errors` field.
- Authentication errors return `401 Unauthorized`.
- Server errors return `500 Internal Server Error`.

---

## License

This project is licensed under the MIT License.
