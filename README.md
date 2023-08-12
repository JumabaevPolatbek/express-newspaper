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

| Parameter | Type     | Description              |
| :-------- | :------- | :----------------------- |
| `name`    | `number` | **Required**. Group Name |

<details>
    <summary>Response</summary>
    <pre>
        {
            "message": "Group # 3 changed to Editors"
        }
    </pre>
</details>
