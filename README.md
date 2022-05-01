# DRUG API

## Features

* View all drugs api: 
```
    <BASE_URL>/api/drugs/
```

* View a selected drug api: 
```
    <BASE_URL>/api/drug/<DRUG_ID>
```

* Edit generic data api: 
```
    <BASE_URL>/api/editdrug/?genericid=<GENERIC_ID>
```

* Add brand data api: 
```
    <BASE_URL>/api/addbrand/?genericid=<GENERIC_ID>
```

* Edit brand data api: 
```
    <BASE_URL>/api/editbrand/?genericid=<GENERIC_ID>&brandid=<BRAND_ID>
```

* Delete many generic data api:
GENERIC_ID is comma seperated strings with the last trailing comma
e.g id1,id2,id3,
```
    <BASE_URL>/api/deletemanygenerics/?genericids=<GENERIC_ID,GENERIC_ID,GENERIC_ID,...,GENERIC_ID,>
```

* Delete one generic data api:
```
    <BASE_URL>/api/deleteonegeneric/?genericid=<GENERIC_ID>
```

* Delete many brands data api:
BRAND_ID is comma seperated strings with the last trailing comma
e.g id1,id2,id3,
```
    <BASE_URL>/api/deletemanygenerics/?genericids=<GENERIC_ID>&brandid=<BRAND_ID,BRAND_ID,...,BRAND_ID,>
```

* Delete one brand data api:
```
    <BASE_URL>/api/deleteonebrand/?genericid=<GENERIC_ID>&brandid=<BRAND_ID>
```
