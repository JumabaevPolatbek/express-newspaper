# NewsPaper REST api

http://localhost:3000

## API Reference

####Auth login

```http
POST /auth/signin
```

```
Reques Body
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
