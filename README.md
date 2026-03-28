# MovieKam

Films and TV series, official trailer searcher for Youtube and TheMovie
###### Setup environment

```properties
NODE_ENV=development
NODE_PORT=

# Service TheMovie database
URL_HOST_MOVIE_DB='api.themoviedb.org'
# Sign up for the free personal plan and get your access token at the 
# following link. https://www.themoviedb.org/subscription
API_TOKEN_ACCESS_MOVIE_DB=''

# Service google api to access a youtube api
URL_HOST_GOOGLE_API='www.googleapis.com'
# To create credentials that can be used with Google Accounts, 
# follow the instructions at the following link. https://console.cloud.google.com/
API_KEY_GOOGLE_API=''
```

###### Server packages installation

```bash
npm install
```

###### Client packages installation

```bash
cd client && npm install
```

###### Building client application

```bash
cd client && npm run build
```

##### Running the localhost application

###### Run server on localhost

```bash
npm run dev
```

###### Run client on localhost

```bash
npm run dev
```
