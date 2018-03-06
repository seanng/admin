## INITIAL SETUP
- install postgres and start it as a service
- `psql -d postgres -f ./postgres-setup.sql --echo-all`
- `cp .env.example .env`

## RUN
```
yarn
yarn start
```
- website should be accessible at localhost:5050
