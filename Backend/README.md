# Register Route Documentation

## Overview

The `/users/register` route is used to register a new user in the system. It accepts user details such as `fullname`, `email`, and `password`, validates the input, hashes the password, creates a new user in the database, and returns a JSON Web Token (JWT) along with the user details.

---

## Endpoint

**POST** `/users/register`

---

## Request Body

The request body should be in JSON format and must include the following fields:

| Field             | Type     | Required | Description                                      |
|--------------------|----------|----------|--------------------------------------------------|
| `fullname`         | Object   | Yes      | Contains `firstname` and `lastname`.            |
| `fullname.firstname` | String | Yes      | First name of the user (minimum 3 characters).  |
| `fullname.lastname`  | String | Yes      | Last name of the user (minimum 3 characters).   |
| `email`            | String   | Yes      | Email address of the user (must be valid).      |
| `password`         | String   | Yes      | Password for the user (minimum 6 characters).   |

---

## Validation Rules

1. `email` must be a valid email address.
2. `fullname.firstname` must be at least 3 characters long.
3. `password` must be at least 6 characters long.

If any of these validations fail, the server will respond with a `400 Bad Request` status and a list of validation errors.

---

## Response

### Success Response

- **Status Code:** `200 OK`
- **Body:**

```json
{
  "token": "JWT_TOKEN_HERE",
  "user": {
    "_id": "USER_ID",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}