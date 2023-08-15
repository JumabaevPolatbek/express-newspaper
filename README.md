# NewsPaper REST api

http://localhost:3000

## API Reference

#### Auth login

```http
POST /auth/signin
```

```
Request Body
```

| Parameter  | Type     | Description            |
| :--------- | :------- | :--------------------- |
| `username` | `string` | **Required**. Login    |
| `password` | `string` | **Required**. Password |

<details>
    <summary>Response</summary>
    <pre>
        {
            token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5MTY2MDU2MywiZXhwIjoxNjkxNzQ2OTYzfQ.rFO0sYnzdaw45vrpshHRBxwrsj0iT7Z_zKPz1nVXoI0'
        }
    </pre>
</details>

#### Get Users rights Admin only

```http
GET /users
```

<details>
    <summary>Response</summary>
    <pre>
        [
            {
                "description": null,
                "createdAt": "2023-08-12T10:39:08.000Z",
                "updatedAt": "2023-08-12T10:39:08.000Z",
                "user": {
                    "id": 13,
                    "username": "Polat",
                    "email": "polat@mail.ru",
                    "first_name": null,
                    "last_name": null,
                    "info": null,
                    "imageId": null,
                    "createdAt": "2023-08-12T10:39:08.000Z",
                    "updatedAt": "2023-08-12T10:39:08.000Z",
                    "permissions": [
                        {
                            "id": 11,
                            "show_posts": true,
                            "edit_posts": true,
                            "delete_posts": true,
                            "access_cms": true,
                            "is_admin": true,
                            "show_users": true,
                            "edit_users": true,
                            "delete_users": true,
                            "createdAt": "2023-08-12T10:39:08.000Z",
                            "updatedAt": "2023-08-12T10:39:08.000Z"
                        }
                    ]
                }
            }
        ]
    </pre>
</details>

#### Create User with Admin rights Admin only

```http
POST /users/add
```

```
Request Body
```

| Parameter                 | Type      | Description                      |
| :------------------------ | :-------- | :------------------------------- |
| `username`                | `string`  | **Required**. User Name          |
| `password`                | `string`  | **Required**. Password           |
| `email`                   | `string`  | **Required**. email              |
| `permission.access_cms`   | `boolean` | **Required**. Access cms rigth   |
| `permission.is_admin`     | `boolean` | **Required**. is Admin rigth     |
| `permission.show_users`   | `boolean` | **Required**. Show users rigth   |
| `permission.edit_users`   | `boolean` | **Required**. Edit users rigth   |
| `permission.delete_users` | `boolean` | **Required**. Delete users rigth |

<details>
    <summary>Response</summary>
    <pre>
        {
            "id":1,
            "description":"null",
            "createdAt": "2023-08-12T10:39:08.000Z",
            "updatedAt": "2023-08-12T10:39:08.000Z",
            "userId":1,
            "permissionId":1
        }
    </pre>
</details>

#### Delete user if you have permission to delete

```http
DELETE /users/{userId}
```

<details>
    <summary>Response</summary>
    <pre>
        {
            message: 'User ${userId} deleted successfully
        }
    </pre>
</details>

#### User edited

```http
PATCH /users/{userId}
```

```
Request Body Content-type form-data
```

| Parameter                 | Type      | Description                      |
| :------------------------ | :-------- | :------------------------------- |
| `password`                | `string`  | **Required**. Password           |
| `email`                   | `string`  | **Required**. email              |
| `permission.access_cms`   | `boolean` | **Required**. Access cms rigth   |
| `permission.is_admin`     | `boolean` | **Required**. is Admin rigth     |
| `permission.show_users`   | `boolean` | **Required**. Show users rigth   |
| `permission.edit_users`   | `boolean` | **Required**. Edit users rigth   |
| `permission.delete_users` | `boolean` | **Required**. Delete users rigth |

<details>
    <sumamry>Response</summary>
    <pre>
        {
            message: '{userId} has changed'
        }
    </pre>
</details>

#### GROUP

#### Get all group only acces cms right

```http
GET /group/all
```

<details>
    <summary>Response</summary>
    <pre>
        [
            {
                "id": 3,
                "name": "Editors",
                "createdAt": "2023-08-10T12:32:06.000Z",
                "updatedAt": "2023-08-10T12:32:06.000Z"
            },
            {
                "id": 4,
                "name": "Creators",
                "createdAt": "2023-08-10T12:33:21.000Z",
                "updatedAt": "2023-08-10T12:33:21.000Z"
            }
        ]
    </pre>
</details>

#### Create Group rights Admin access_cms

```http
POST /group/add
```

```
Request Body
```

| Parameter | Type     | Description              |
| :-------- | :------- | :----------------------- |
| `name`    | `string` | **Required**. Group Name |

<details>
    <summary>Response</summary>
    <pre>
        {
            "id": 4,
            "name": "Creators",
            "createdAt": "2023-08-10T12:33:21.626Z",
            "updatedAt": "2023-08-10T12:33:21.627Z"
        }
    </pre>
</details>

#### User connect to group only if edit user right

```http
POST /users/group
```

```
Request Body
```

| Parameter | Type     | Description            |
| :-------- | :------- | :--------------------- |
| `groupId` | `number` | **Required**. Group Id |
| `userId`  | `number` | **Required**. User Id  |

<details>
    <summary>
        Response
    </summary>
    <pre>
        {
            "userId": userId,
            "groupId": groupId,
            "createdAt": "2023-08-12T12:15:09.033Z",
            "updatedAt": "2023-08-12T12:15:09.033Z"
        }
    </pre>
</details>

#### Remove Group only if access cms right

```http
DELETE /group/{groupId}
```

<details>
    <summary>Response</summary>
    <pre>
        {
            message:'Group #{groupId} has removed'
        }
    </pre>
</details>

#### Change name group if access cms right

```http
PATCH /group/{groupId}
```

```
Request Body
```

| Parameter | Type     | Description                         |
| :-------- | :------- | :---------------------------------- |
| `name`    | `number` | **Required**. Group Name lower case |

<details>
    <summary>Response</summary>
    <pre>
        {
            "message": "Group # 3 changed to Editors"
        }
    </pre>
</details>

#### Languages

#### Get Languages

```http
GET /language/all
```

<details>
    <summary>Response</summary>
    <pre>
        [
            {
                "id": 1,
                "name": "Karakalpak",
                "country": "Karakalpakstan",
                "iso_639_code": "kaa"
            }
        ]
    </pre>

</details>

#### Add language only admin right

```http
POST /language/add
```

```
Request body
```

| Parameter      | Type     | Description                                                                   |
| :------------- | :------- | :---------------------------------------------------------------------------- |
| `name`         | `string` | **Required**. Language name lower case                                        |
| `country`      | `string` | **Required**. Language Country only english letters and lower case            |
| `iso_639_code` | `string` | **Required**. ISO Languages code only english letters and lenght 3,lower case |

<details>
    <summary>Response</summary>
    <pre>
        {
            "id": 2,
            "name": "Русский",
            "country": "Russia",
            "iso_639_code": "ru",
            "updatedAt": "2023-08-13T11:58:08.909Z",
            "createdAt": "2023-08-13T11:58:08.909Z"
        }
    </pre>
</details>

#### Edit language only admin right

```http
PATCH /language/{languageId}
```

```
    Request Body
```

| Parameter      | Type     | Description                                                     |
| :------------- | :------- | :-------------------------------------------------------------- |
| `name`         | `string` | Language name lower case                                        |
| `country`      | `string` | Language Country only english letters and lower case            |
| `iso_639_code` | `string` | ISO Languages code only english letters and lenght 3,lower case |

<details>
    <summary>Response </summary>
    <pre>
        {
            message: ${name} success edit
        }
    </pre>
</details>

#### Delete language only admin right

```http
DELETE /language/{languageId}
```

<details>
    <summary>Response </summary>
    <pre>
        {
            message: 'Selected language successfully removed',
        }
    </pre>
</details>

#### Menus

#### Add menus with admin right

```http
POST /menus/add
```

```
Request Body
```

| Parameter       | Type     | Description                      |
| :-------------- | :------- | :------------------------------- |
| `menus.title`   | `string` | **Required**. Title menu         |
| `menus.slug`    | `string` | Slug menu                        |
| `menus.url`     | `string` | Url menu                         |
| `menus.content` | `text`   | Content menu                     |
| `description`   | `string` | Description menu                 |
| `languageId`    | `number` | **Required**. Language id number |

<details>
    <summary>Response</summary>
    <pre>
        {
            "id": 4,
            "description": "KAA Jan'aliqlar",
            "createdAt": "2023-08-15T11:14:30.000Z",
            "updatedAt": "2023-08-15T11:14:30.000Z",
            "menu": {
                "id": 4,
                "title": "Jan'aliqlar",
                "slug": "news",
                "url": null,
                "content": null,
                "createdAt": "2023-08-15T11:14:30.000Z",
                "updatedAt": "2023-08-15T11:14:30.000Z"
            },
            "language": {
                "id": 1,
                "name": "Karakalpak",
                "country": "Karakalpakstan",
                "iso_639_code": "kaa",
                "createdAt": "2023-08-13T08:23:36.000Z",
                "updatedAt": "2023-08-13T08:23:36.000Z"
            }
        }
    </pre>
</details>

#### Edit menu with admin right

```http
PATCH /menus/{menuId}
```

```
  Request body
```

| Parameter       | Type     | Description                      |
| :-------------- | :------- | :------------------------------- |
| `menus.title`   | `string` | **Required**. Title menu         |
| `menus.slug`    | `string` | Slug menu                        |
| `menus.url`     | `string` | Url menu                         |
| `menus.content` | `text`   | Content menu                     |
| `description`   | `string` | Description menu                 |
| `languageId`    | `number` | **Required**. Language id number |

<details>
    <summary>Response</summary>
    <pre>
        {
            "id": 4,
            "description": "KAA Jan'aliqlar",
            "createdAt": "2023-08-15T11:14:30.000Z",
            "updatedAt": "2023-08-15T11:14:30.000Z",
            "menu": {
                "id": 4,
                "title": "Jan'aliqlar",
                "slug": "news",
                "url": null,
                "content": null,
                "createdAt": "2023-08-15T11:14:30.000Z",
                "updatedAt": "2023-08-15T11:14:30.000Z"
            },
            "language": {
                "id": 1,
                "name": "Karakalpak",
                "country": "Karakalpakstan",
                "iso_639_code": "kaa",
                "createdAt": "2023-08-13T08:23:36.000Z",
                "updatedAt": "2023-08-13T08:23:36.000Z"
            }
        }
    </pre>
</details>
