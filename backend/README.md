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

- **200 Created**
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