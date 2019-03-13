# BS-Area Platform &middot;
The platform to improve productivity.

## Installing / Getting started / Prerequisites

Install Brew
```shell
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install)"
```

Install Node
```shell
brew install node
```

Install Docker
[Docker](https://docs.docker.com/install/)

Install Yarn
```shell
brew install yarn
```

## Developing

### Built With

React.JS, Node.JS, MySQL, ReactNative, Docker...

### Setting up Dev

Here's a brief intro about what a developer must do in order to start developing
the project further:

```shell
docker-compose down -v
docker-compose build
docker-compose up
```

[Web App](http://localhost:8081/)
[Mobile App](http://localhost:8081/client.apk)
[Server](http://localhost:8080/)


## Ultimate BS AREA API
Here is documentation for the AREA API. For every request you must include in the header: 
Content-Type: application/json 

For protected routes by authorization we use JWT. Each of these have a lock by them. Must include a Bearer Token in the header 
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ...

### Version: 1.4.2

**Contact information:**  
bs.ind.shop@gmail.com  

**License:** BSLicence

### /areas

#### POST
##### Summary:

Creates Area

##### Description:

This can only be done by the logged in user.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body | Creates area | Yes | [CreateArea](#createarea) |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 401 | unauthorized |

#### GET
##### Summary:

Return All User's Areas

##### Description:

This can only be done by the logged in user.

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 401 | unauthorized |

### /areas/{area_id}

#### GET
##### Summary:

Return Area

##### Description:

Returns informations about an area

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| area_id | path | Id of an area | Yes | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 401 | unauthorized |

#### PUT
##### Summary:

Update Area

##### Description:

Update area informations

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| area_id | path | Id of an area | Yes | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 401 | unauthorized |

#### DELETE
##### Summary:

Delete Area

##### Description:

Delete an area

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| area_id | path | Id of an area | Yes | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 401 | unauthorized |

### /users

#### POST
##### Summary:

Create user

##### Description:

Creates user that can now be used for authentication

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body | Creates user | Yes | [CreateUser](#createuser) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 201 | successful operation | [CreateUserResponse](#createuserresponse) |
| 422 | Invalid operation | [ApiErrorResponse](#apierrorresponse) |

#### GET
##### Summary:

Return user

##### Description:

This can only be done by the logged in user.

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | [ReturnUserResponse](#returnuserresponse) |
| 401 | unauthorized | [ApiUnauthorizezdResponse](#apiunauthorizezdresponse) |

#### PUT
##### Summary:

Update user

##### Description:

This can only be done by the logged in user.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body | Creates user | Yes | [UpdateUserBody](#updateuserbody) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful request | [ApiSuccessResponse](#apisuccessresponse) |
| 401 | unauthorized | [ApiUnauthorizezdResponse](#apiunauthorizezdresponse) |

#### DELETE
##### Summary:

Soft delete user

##### Description:

This can only be done by the logged in user.

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 204 | success | [ApiSuccessResponse](#apisuccessresponse) |
| 401 | unauthorized | [ApiUnauthorizezdResponse](#apiunauthorizezdresponse) |
| default | successful operation |  |

### /users/login

#### POST
##### Summary:

User Login

##### Description:

Returns Bearer Token for JWT authentication

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body | List of user object | Yes | [ [CreateUser](#createuser) ] |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 204 | success | [LoginUserResponse](#loginuserresponse) |
| 422 | error | [ApiErrorResponse](#apierrorresponse) |

### /actions/all/{service_id}

#### GET
##### Summary:

Returns Actions from Service

##### Description:

Returns all available actions from a service

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| service_id | path | Id of a service | Yes | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 401 | unauthorized |

### /actions/{action_id}

#### GET
##### Summary:

Returns Action

##### Description:

Returns informations about an action

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| action_id | path | Id of an action | Yes | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 401 | unauthorized |

### /reactions/all/{service_id}

#### GET
##### Summary:

Returns Reactions from Service

##### Description:

Returns all available reactions from a service

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| service_id | path | Id of a service | Yes | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 401 | unauthorized |

### /reactions/{reaction_id}

#### GET
##### Summary:

Returns Reaction

##### Description:

Returns informations about a reaction

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| reaction_id | path | Id of a reaction | Yes | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 401 | unauthorized |

### /services

#### GET
##### Summary:

Returns Services

##### Description:

Returns all available services

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 401 | unauthorized |

### /services/actions

#### GET
##### Summary:

Returns Services

##### Description:

Returns all available services

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 401 | unauthorized |

### /services/reactions

#### GET
##### Summary:

Returns Services

##### Description:

Returns all available services

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 401 | unauthorized |

### /tokens

#### POST
##### Summary:

Creates Token

##### Description:

Creates a new token

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | Yes | [ [CreateToken](#createtoken) ] |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 401 | unauthorized |

#### GET
##### Summary:

Returns Tokens

##### Description:

Returns all tokens from current user

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 401 | unauthorized |

#### DELETE
##### Summary:

Deletes Tokens

##### Description:

Deletes all tokens from current user

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 401 | unauthorized |

### Models

#### CreateUser

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| email | string |  | No |
| password | string |  | No |

#### CreateArea

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| ActionId | integer |  | No |
| ReactionId | integer |  | No |
| ActionParam | string |  | No |
| ReactionParam | string |  | No |

#### CreateToken

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| Token | string |  | No |

#### CreateUserResponse

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| success | boolean |  | No |
| message | string |  | No |
| token | string | Authentication token | No |

#### LoginUserResponse

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| success | boolean |  | No |
| token | string | Authentication token | No |

#### ReturnUserResponse

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| success | boolean |  | No |
| user | object |  | No |

#### UpdateUserBody

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| email | string |  | No |

#### ApiErrorResponse

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| success | boolean |  | No |
| error | string |  | No |

#### ApiSuccessResponse

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| success | boolean |  | No |
| message | string |  | No |

#### ApiUnauthorizezdResponse

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| ApiUnauthorizezdResponse | string |  |  |
