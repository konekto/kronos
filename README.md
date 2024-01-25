# kronos

Kronos enables you to trigger https requests at specific times
It uses the cron syntax for the timings

Jobs are configured like this

```
NAME test get
CRON * * * * *
GET https://konek.to


NAME test post
CRON * * * * *
POST https://konek.to

```
