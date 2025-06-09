# BACKEND API  Documentation

## POST `/users/register`

### Description
Registers a new user in the system. On success, returns a JWT token and the created user object.

### Request Body

Send a JSON object with the following structure:

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

Send a JSON object with the following structure:

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