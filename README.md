## INITIAL SETUP
- install postgres and start it as a service
- `psql -d postgres -f ./postgres-setup.sql --echo-all`
- install redis and start it as a service
- `cp .env.example .env`

## RUN
```
redis-server
yarn
yarn start
```
- website should be accessible at localhost:5050
