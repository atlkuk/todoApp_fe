# todoApp_fe

Go to www/todoApp folder previously generated

## How to install via git
clone repository `git clone https://github.com/atlkuk/todoApp_fe.git` into todoApp folder in www directory

move into **todoApp_fe** folder and run npm install

## Configure endpoint

configure **todoApp_fe/src/shared/app.globals.ts** file
```
...
readonly baseAppUrl: string = 'http://localhost/todoApp/todoApp_be/public/api/';
...
```

## Compile and Run
into **todoApp_fe** folder run `ng serve`

go to http://locahost:4200/ and all it's done!!
