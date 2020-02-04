# Backend

# Chore Tracking API

The back-end for the Lambda School Build Week Chore Tracking project.

## Base URL

- https://choretracker01.herokuapp.com

## Register a New Parent

HTTP Method: POST

URL: /api/auth/register

### Headers

| Name         | Type   | Required | Description              |
| ------------ | ------ | -------- | ------------------------ |
| Content-Type | String | Yes      | Must be application/json |

### Body

| Name     | Type   | Required | Description              |
| -------- | ------ | -------- | ------------------------ |
| name     | String | Yes      | First name of parent     |
| username | String | Yes      | username of parent       |
| email    | String | Yes      | Parent's email address   |
| password | String | Yes      | Parent's chosen password |

### Example

```json
{
  "name": "Brittany",
  "username": "brittany01",
  "email": "new@parent.com",
  "password": "password"
}
```

### Response

**201 (Created)**

> If successfully registered, endpoint will return HTTP response with status code and a body with a token, welcome message and parent information.

**400 (Bad Request)**

> If required information is missing, the endpoint will return an HTTP response with a status code of 400

**500 (Internal Server Error)**

> If there was a server error registering the user, a response with status code 500 will be returned.

## Register a New Child

HTTP Method: POST

URL: /api/auth/register/:id

### Headers

| Name         | Type   | Required | Description              |
| ------------ | ------ | -------- | ------------------------ |
| Content-Type | String | Yes      | Must be application/json |

### Body

| Name     | Type   | Required | Description             |
| -------- | ------ | -------- | ----------------------- |
| name     | String | Yes      | First name of child     |
| username | String | Yes      | username of child       |
| password | String | Yes      | Child's chosen password |

### Example

```json
{
  "name": "Michael ",
  "email": "new@child.com",
  "password": "password"
}
```

### Response

**201 (Created)**

> If successfully registered, endpoint will return HTTP response with status code and a body with a token, welcome message and child information.

**400 (Bad Request)**

> If required information is missing, the endpoint will return an HTTP response with a status code of 400

**500 (Internal Server Error)**

> If there was a server error registering the user, a response with status code 500 will be returned.

## Login a Parent

HTTP Method: POST

URL: /api/auth/login

### Headers

| Name         | Type   | Required | Description              |
| ------------ | ------ | -------- | ------------------------ |
| Content-Type | String | Yes      | Must be application/json |

### Body

| Name     | Type   | Required | Description        |
| -------- | ------ | -------- | ------------------ |
| username | String | Yes      | username of parent |
| password | String | Yes      | parent's password  |

### Example

```json
{
  "name": "Brittany",
  "password": "password"
}
```

### Response

**200 (Created)**

> If successfully logged in, endpoint will return HTTP response with status code and a body with a token, welcome message and parent's information.

**400 (Bad Request)**

> If required information is missing, the endpoint will return an HTTP response with a status code of 401.

**500 (Internal Server Error)**

> If there was a server error logging in the user, a response with status code 500 will be returned.

## Login a Child

HTTP Method: POST

URL: /api/auth/login

### Headers

| Name         | Type   | Required | Description              |
| ------------ | ------ | -------- | ------------------------ |
| Content-Type | String | Yes      | Must be application/json |

### Body

| Name     | Type   | Required | Description        |
| -------- | ------ | -------- | ------------------ |
| username | String | Yes      | username of parent |
| password | String | Yes      | parent's password  |

### Example

```json
{
  "name": "Michael",
  "password": "password"
}
```

### Response

**200 (Created)**

> If successfully logged in, endpoint will return HTTP response with status code and a body with a token, welcome message and child's information.

**400 (Bad Request)**

> If required information is missing, the endpoint will return an HTTP response with a status code of 401.

**500 (Internal Server Error)**

> If there was a server error logging in the user, a response with status code 500 will be returned.
