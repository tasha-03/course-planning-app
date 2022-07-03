# Приложение для планирования курсов

### /courses

###### POST /

req.body:

```
{
    "number": 1,
    "name": "test course",
    "startDate": "2022-09-01",
    "endDate": "2022-10-01",
    "hours": 12,
    "capacity": 15,
    "groupNumber": 1,
    "annotation": "No annotation",
    "SdoId": 1,
    "UtpId": 1,
    "RpId": 1,
    "FormId": 1,
    "Users": [1, 2],
    "ListenersCategories": [1]
}
```

res.body:

```
{
    "success": true,
    "data": {
        "id": 18,
        "number": 1,
        "name": "test course",
        "startDate": "2022-09-01",
        "endDate": "2022-10-01",
        "hours": 12,
        "capacity": 15,
        "groupNumber": 1,
        "annotation": "No annotation",
        "SdoId": 1,
        "UtpId": 1,
        "RpId": 1,
        "FormId": 1,
        "updatedAt": "2022-06-29T12:17:55.073Z",
        "createdAt": "2022-06-29T12:17:55.073Z"
    }
}
```

###### POST /all

req.body:

```
{
    "name": "",
    "startDate": "2022-08-31",
    "endDate": "",
    "hoursBottom": null,
    "hoursTop": null,
    "capacityBottom": null,
    "capacityTop": null,
    "groupNumberBottom": null,
    "groupNumberTop": null,
    "annotation": "",
    "listenersCategories": ""
}
```

res.body:

```
{
    "success": true,
    "data": [
        {
            "id": 17,
            "name": "test course",
            "startDate": "2022-09-01",
            "endDate": "2022-10-01",
            "hours": 12,
            "capacity": 15,
            "groupNumber": 1,
            "annotation": "No annotation",
            "Sdo": {
                "id": 1,
                "name": ...
            },
            "Utp": {
                "id": 1,
                "year": 2017
            },
            "Rp": {
                "id": 1,
                "year": 2017
            },
            "Form": {
                "id": 1,
                "name": ...
            },
            "ListenersCategories": [
                {
                    "id": 1,
                    "name": ...
                }
            ]
        }
    ]
}
```

### /sdos

###### POST /

req.body:

```
{
    "name": "Example SDO name"
}
```

res.body:

```
{
    "id": 1,
    "name": "Example SDO name"
}
```

### /users

###### POST /

req.body:

```
{
    "username": "example_username",
    "email": "example@email.com",
    "password": "example_password",
    "name": "Example Name",
    "role": "VIEWER",
    "CathedraId": 1
}
```

res.body:

```
{
    "success": true,
    "data": {
        "id": 1,
        "username": "example_username",
        "email": "example@email.com",
        "name": "Example Name",
        "role": "VIEWER",
        "CathedraId": 1
    }
}
```

###### POST /all

req.query:

```
?limit=20&page=1
```

req.body:

```
{
    "name": "",
    "cathedraName": ""
}
```

res.body:

```
{
    "success": true,
    "data": [
        {
            "id": ...,
            "name": ...,
            "Courses": [
                "id": ...,
                "name": ...,
                "startDate": ...,
                "endDate": ...,
                "hours": ...,
                "capacity": ...,
                "groupNumber": ...,
                "annotation": ...,
                "Sdo": {
                    "id": ...,
                    "name": ...,
                },
                "Utp": {
                    "id": ...,
                    "name": ...,
                },
                "Rp": {
                    "id": ...,
                    "name": ...,
                },
                "Form": {
                    "id": ...,
                    "name": ...,
                },
                "ListenersCategories: [
                    {
                        "id": ...,
                        "name": ...
                    }
                ]
            ],
            "Cathedra": {
                "id": ...,
                "name": ...,
            }
        }
    ]
}
```

### /years

###### POST /

req.body:

```
{
    "year": 2020
}
```

res.body:

```
{
    "id": 1,
    "year": 2020
}
```
