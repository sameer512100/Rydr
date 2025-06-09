# BACKEND API Documentation

---

## POST `/users/register`

### Description
Registers a new user in the system. On success, returns a JWT token and the created user object.

### Request Body

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

#### Field Requirements

- `fullname.firstname` (string, required): Minimum 3 characters.
- `fullname.lastname` (string, required): Minimum 3 characters.
- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.

### Responses

- **201 Created**
  - **Description:** User registered successfully.
  - **Body:**
    ```json
    {
      "token": "<jwt>",
      "user": {
        "_id": "user_id",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com"
      }
    }
    ```

- **400 Bad Request**
  - **Description:** Validation failed. Returns an array of error messages.
  - **Body:**
    ```json
    {
      "errors": [
        {
          "msg": "Error message",
          "param": "field",
          "location": "body"
        }
      ]
    }
    ```

- **500 Internal Server Error**
  - **Description:** Server error or missing required fields.

---

## POST `/users/login`

### Description
Authenticates a user using email and password. Returns a JWT token and the user object on success.

### Request Body

```json
{
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

#### Field Requirements

- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.

### Responses

- **200 OK**
  - **Description:** User logged in successfully.
  - **Body:**
    ```json
    {
      "token": "<jwt>",
      "user": {
        "_id": "user_id",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com"
      }
    }
    ```

- **400 Bad Request**
  - **Description:** Validation failed. Returns an array of error messages.
  - **Body:**
    ```json
    {
      "errors": [
        {
          "msg": "Error message",
          "param": "field",
          "location": "body"
        }
      ]
    }
    ```

- **401 Unauthorized**
  - **Description:** Invalid email or password.
  - **Body:**
    ```json
    {
      "error": "Invalid email or password"
    }
    ```

- **500 Internal Server Error**
  - **Description:** Server error.

---

## GET `/users/profile`

### Description
Returns the authenticated user's profile. Requires authentication via JWT token (sent as a cookie or in the `Authorization: Bearer <token>` header).

### Headers

- `Authorization: Bearer <jwt>` (optional if cookie is used)

### Responses

- **200 OK**
  - **Description:** Returns the user's profile.
  - **Body:**
    ```json
    {
      "user": {
        "_id": "user_id",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com"
      }
    }
    ```

- **401 Unauthorized**
  - **Description:** Missing or invalid token, or user not found.
  - **Body:**
    ```json
    {
      "error": "Authentication token is missing"
    }
    ```
    or
    ```json
    {
      "error": "User not found"
    }
    ```
    or
    ```json
    {
      "message": "unauthorized access"
    }
    ```

---

## GET `/users/logout`

### Description
Logs out the authenticated user by blacklisting the current JWT token and clearing the authentication cookie. Requires authentication.

### Headers

- `Authorization: Bearer <jwt>` (optional if cookie is used)

### Responses

- **200 OK**
  - **Description:** User logged out successfully.
  - **Body:**
    ```json
    {
      "message": "Logged out successfully"
    }
    ```

- **401 Unauthorized**
  - **Description:** Missing or invalid token, or token is blacklisted.
  - **Body:**
    ```json
    {
      "error": "Authentication token is missing"
    }
    ```
    or
    ```json
    {
      "error": "Token is blacklisted"
    }
    ```
    or
    ```json
    {
      "message": "unauthorized access"
    }
    ```

- **500 Internal Server Error**
  - **Description:** Server error.

---

## POST `/captains/register`

### Description
Registers a new captain (driver) in the system. On success, returns a JWT token and the created captain object.

### Request Body

```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Smith"
  },
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

#### Field Requirements

- `fullname.firstname` (string, required): Minimum 3 characters.
- `fullname.lastname` (string, required): Minimum 3 characters.
- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.
- `vehicle.color` (string, required): Minimum 3 characters.
- `vehicle.plate` (string, required): Minimum 3 characters.
- `vehicle.capacity` (integer, required): Must be at least 1.
- `vehicle.vehicleType` (string, required): Must be one of `car`, `auto`, or `motorcycle`.

### Responses

- **201 Created**
  - **Description:** Captain registered successfully.
  - **Body:**
    ```json
    {
      "token": "<jwt>",
      "captain": {
        "_id": "captain_id",
        "fullname": {
          "firstname": "Jane",
          "lastname": "Smith"
        },
        "email": "jane.smith@example.com",
        "vehicle": {
          "color": "Red",
          "plate": "ABC123",
          "capacity": 4,
          "vehicleType": "car"
        }
      }
    }
    ```

- **400 Bad Request**
  - **Description:** Validation failed or captain already exists.
  - **Body:**
    ```json
    {
      "errors": [
        {
          "msg": "Error message",
          "param": "field",
          "location": "body"
        }
      ]
    }
    ```
    or
    ```json
    {
      "error": "Captain already exists"
    }
    ```

- **500 Internal Server Error**
  - **Description:** Server error or missing required fields.

---