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
  "username": "michael01",
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

URL: /api/auth/login/child

### Headers

| Name         | Type   | Required | Description              |
| ------------ | ------ | -------- | ------------------------ |
| Content-Type | String | Yes      | Must be application/json |

### Body

| Name     | Type   | Required | Description       |
| -------- | ------ | -------- | ----------------- |
| username | String | Yes      | username of child |
| password | String | Yes      | child's password  |

### Example

```json
{
  "username": "michael01",
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

## Get a Parent's Information

HTTP Method: GET

URL: /api/parent/:id

### Headers

| Name          | Type   | Required | Description                        |
| ------------- | ------ | -------- | ---------------------------------- |
| Content-Type  | String | Yes      | Must be application/json           |
| Authorization | String | Yes      | Uses the token from login/register |

### Example

```json
{
  "id": 2,
  "username": "steph01",
  "name": "Stephanie",
  "email": "steph@email.com",
  "role": "parent"
}
```

### Response

**200 (OK)**

> If successfully found, endpoint will return HTTP response with status code and a body similar to example above

**404 (Not Found)**

> If no user found, status code 404 will be returned

**401 (Unauthorized)**

> If token information does not match user id in URL parameters status code 401 will be returned

**500 (Internal Server Error)**

> If there was a server error registering the user, a response with status code 500 will be returned.

## Update a Parent's Information

HTTP Method: PUT

URL: /api/parent/:id

### Headers

| Name          | Type   | Required | Description                        |
| ------------- | ------ | -------- | ---------------------------------- |
| Content-Type  | String | Yes      | Must be application/json           |
| Authorization | String | Yes      | Uses the token from login/register |

### Body

| Name     | Type   | Required | Description            |
| -------- | ------ | -------- | ---------------------- |
| name     | String | No       | First name of parent   |
| username | String | No       | username of parent     |
| email    | String | No       | Parent's email address |

### Example

```json
{
  "id": 2,
  "username": "steph01",
  "name": "Stephanie",
  "email": "steph@email.com",
  "role": "parent"
}
```

### Response

**200 (OK)**

> If successfully found, endpoint will return HTTP response with status code and a body similar to example above

**404 (Not Found)**

> If no user found, status code 404 will be returned

**401 (Unauthorized)**

> If token information does not match user id in URL parameters status code 401 will be returned

**500 (Internal Server Error)**

> If there was a server error registering the user, a response with status code 500 will be returned.

## Get a Childs's Information

HTTP Method: GET

URL: /api/child/:id

### Headers

| Name          | Type   | Required | Description                        |
| ------------- | ------ | -------- | ---------------------------------- |
| Content-Type  | String | Yes      | Must be application/json           |
| Authorization | String | Yes      | Uses the token from login/register |

### Example

```json
{
  "id": 2,
  "username": "carl01",
  "name": "Carlin",
  "parent_id": 2,
  "role": "child",
  "total_points": 0,
  "current_streaks": 0,
  "highest_points": 0
}
```

### Response

**200 (OK)**

> If successfully found, endpoint will return HTTP response with status code and a body similar to example above

**404 (Not Found)**

> If no user found, status code 404 will be returned

**401 (Unauthorized)**

> If token information does not match user id in URL parameters status code 401 will be returned

**500 (Internal Server Error)**

> If there was a server error registering the user, a response with status code 500 will be returned.

## Update a Childs's Information

HTTP Method: PUT

URL: /api/child/:id

### Headers

| Name          | Type   | Required | Description                        |
| ------------- | ------ | -------- | ---------------------------------- |
| Content-Type  | String | Yes      | Must be application/json           |
| Authorization | String | Yes      | Uses the token from login/register |

### Body

| Name            | Type   | Required | Description              |
| --------------- | ------ | -------- | ------------------------ |
| name            | String | No       | First name of child      |
| username        | String | No       | Username of child        |
| total_points    | String | No       | Total points for a child |
| current_streaks | String | No       | Chore completing streak  |
| highest_points  | String | No       | Longest running streak   |

### Example

```json
{
  "id": 2,
  "username": "carl01",
  "name": "Carlin",
  "parent_id": 2,
  "role": "child",
  "total_points": 0,
  "current_streaks": 0,
  "highest_points": 0
}
```

### Response

**200 (OK)**

> If successfully found, endpoint will return HTTP response with status code and a body similar to example above

**404 (Not Found)**

> If no user found, status code 404 will be returned

**401 (Unauthorized)**

> If token information does not match user id in URL parameters, status code 401 will be returned

**500 (Internal Server Error)**

> If there was a server error registering the user, a response with status code 500 will be returned.

## Get Parent's information with an array of kids attached

HTTP Method: GET

URL: /api/parent/combined/:id

### Headers

| Name          | Type   | Required | Description                        |
| ------------- | ------ | -------- | ---------------------------------- |
| Content-Type  | String | Yes      | Must be application/json           |
| Authorization | String | Yes      | Uses the token from login/register |

### Example

```json
{
  "parent": {
    "id": 2,
    "username": "steph01",
    "password": "stephanie",
    "name": "Stephanie",
    "email": "steph@email.com",
    "role": "parent"
  },
  "children": [
    {
      "id": 2,
      "name": "Carlin",
      "role": "child",
      "parent_id": 2,
      "current_streaks": 0,
      "total_points": 0,
      "highest_points": 0
    }
  ]
}
```

### Response

**200 (OK)**

> If successful, endpoint will return a JSON array in the format of the example above.

**401 (Unauthorized)**

> If the token provided does not match to an admin account or the user id from the token does not match the id in the URL, or if a token is not provided, status code 401 will be returned

**500 (Internal Server Error)**

> If there was a server error retrieving the project, a response with status code 500 will be returned.

## Get an Array of a Parent's children

HTTP Method: GET

URL: /api/parent/children/:id

### Headers

| Name          | Type   | Required | Description                        |
| ------------- | ------ | -------- | ---------------------------------- |
| Content-Type  | String | Yes      | Must be application/json           |
| Authorization | String | Yes      | Uses the token from login/register |

### Example

```json
[
  {
    "id": 4,
    "name": "child1",
    "role": "child",
    "parent_id": 5,
    "current_streaks": 0,
    "total_points": 0,
    "highest_points": 0
  },
  {
    "id": 5,
    "name": "child2",
    "role": "child",
    "parent_id": 5,
    "current_streaks": 0,
    "total_points": 0,
    "highest_points": 0
  }
]
```

### Response

**200 (OK)**

> If successful, endpoint will return a JSON array in the format of the example above.

**401 (Unauthorized)**

> If the token provided does not match to an admin account or the user id from the token does not match the id in the URL, or if a token is not provided, status code 401 will be returned

**500 (Internal Server Error)**

> If there was a server error retrieving the project, a response with status code 500 will be returned.

## Get a list of Common Chores

HTTP Method: GET

URL: /api/chores/comChores

### Headers

| Name          | Type   | Required | Description                        |
| ------------- | ------ | -------- | ---------------------------------- |
| Content-Type  | String | Yes      | Must be application/json           |
| Authorization | String | Yes      | Uses the token from login/register |

### Example

```json
[
  {
    "id": 1,
    "name": "Dusting",
    "description": "make sure all surfaces are free of dust",
    "points": 100,
    "createdAt": "2020-02-04 20:19:06",
    "updatedAt": "2020-02-04 20:19:06",
    "parent_id": 1
  },
  {
    "id": 2,
    "name": "Dishes",
    "description": "wash, dry and put away all dishes",
    "points": 100,
    "createdAt": "2020-02-04 20:19:06",
    "updatedAt": "2020-02-04 20:19:06",
    "parent_id": 1
  }
]
```

### Response

**200 (OK)**

> If successful, endpoint will return a JSON array in the format of the example above.

**401 (Unauthorized)**

> If the token provided does not match to an admin account or the user id from the token does not match the id in the URL, or if a token is not provided, status code 401 will be returned

**500 (Internal Server Error)**

> If there was a server error retrieving the project, a response with status code 500 will be returned.

## Get a list of Just the Family's Chores

HTTP Method: GET

URL: /api/chores/:parentId

### Headers

| Name          | Type   | Required | Description                        |
| ------------- | ------ | -------- | ---------------------------------- |
| Content-Type  | String | Yes      | Must be application/json           |
| Authorization | String | Yes      | Uses the token from login/register |

### Example

```json
[
  {
    "id": 6,
    "name": "testing",
    "description": "testing",
    "points": 100,
    "createdAt": "2020-02-04 20:39:25",
    "updatedAt": "2020-02-04 20:39:25",
    "parent_id": 2
  }
]
```

### Response

**200 (OK)**

> If successful, endpoint will return a JSON array in the format of the example above.

**401 (Unauthorized)**

> If the token provided does not match to an admin account or the user id from the token does not match the id in the URL, or if a token is not provided, status code 401 will be returned

**500 (Internal Server Error)**

> If there was a server error retrieving the project, a response with status code 500 will be returned.

## Get a list of Common Chores and the Family's Chores Combined

HTTP Method: GET

URL: /api/chores/combined/:id

### Headers

| Name          | Type   | Required | Description                        |
| ------------- | ------ | -------- | ---------------------------------- |
| Content-Type  | String | Yes      | Must be application/json           |
| Authorization | String | Yes      | Uses the token from login/register |

### Example

```json
[
  {
    "id": 1,
    "name": "Sweeping Kitchen Floor",
    "description": "sweep free of debris",
    "points": 100,
    "createdAt": "2020-02-04 20:38:34",
    "updatedAt": "2020-02-04 20:38:34",
    "parent_id": 1
  },
  {
    "id": 2,
    "name": "testing",
    "description": "testing",
    "points": 100,
    "createdAt": "2020-02-04 20:39:25",
    "updatedAt": "2020-02-04 20:39:25",
    "parent_id": 2
  }
]
```

### Response

**200 (OK)**

> If successful, endpoint will return a JSON array in the format of the example above.

**401 (Unauthorized)**

> If the token provided does not match to an admin account or the user id from the token does not match the id in the URL, or if a token is not provided, status code 401 will be returned

**500 (Internal Server Error)**

> If there was a server error retrieving the project, a response with status code 500 will be returned.

## Create a Custom Family Chore

HTTP Method: POST

URL: /api/chores/:parentId

### Headers

| Name          | Type   | Required | Description                   |
| ------------- | ------ | -------- | ----------------------------- |
| Content-Type  | String | Yes      | Must be application/json      |
| Authorization | String | Yes      | Token from registration/login |

### Body

| Name        | Type   | Required | Description          |
| ----------- | ------ | -------- | -------------------- |
| name        | String | Yes      | Name of Chore        |
| description | String | Yes      | Description of chore |

### Example

```json
{
  "name": "chore",
  "description": "description of chore"
}
```

### Response

**201 (Created)**

> If successfully created, endpoint will return HTTP response with status code 200 and the chore information.

**406 (Not Acceptable)**

> If required information is missing, the endpoint will return an HTTP response with a status code of 400

**401 (Not Authorized)**

> If token is not provided, the endpoint will return HTTP response with status code 401

**500 (Internal Server Error)**

> If there was a server error creating the project, a response with status code 500 will be returned.
