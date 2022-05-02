# EKO GLOBAL SERVER API

# Descriptions

* View all drugs api: get request
```
    <BASE_URL>/api/drugs/
```

* View a selected drug api: get request
```
    <BASE_URL>/api/drug/<DRUG_ID>
```

* Add generic data api: post request
```
    <BASE_URL>/api/adddrugs/
```

* Edit generic data api: put request
```
    <BASE_URL>/api/editdrug/?genericid=<GENERIC_ID>
```

* Add brand data api: put request
```
    <BASE_URL>/api/addbrand/?genericid=<GENERIC_ID>
```

* Edit brand data api: put request
```
    <BASE_URL>/api/editbrand/?genericid=<GENERIC_ID>&brandid=<BRAND_ID>
```

* Delete many generic data api: delete request
GENERIC_ID is comma seperated strings with the last trailing comma
e.g id1,id2,id3,
```
    <BASE_URL>/api/deletemanygenerics/?genericids=<GENERIC_ID,GENERIC_ID,GENERIC_ID,...,GENERIC_ID,>
```

* Delete one generic data api: delete request
```
    <BASE_URL>/api/deleteonegeneric/?genericid=<GENERIC_ID>
```

* Delete many brands data api: delete request
BRAND_ID is comma seperated strings with the last trailing comma
e.g id1,id2,id3,
```
    <BASE_URL>/api/deletemanygenerics/?genericids=<GENERIC_ID>&brandid=<BRAND_ID,BRAND_ID,...,BRAND_ID,>
```

* Delete one brand data api: delete request
```
    <BASE_URL>/api/deleteonebrand/?genericid=<GENERIC_ID>&brandid=<BRAND_ID>
```

##### Stay turned!
