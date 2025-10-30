# Background Service POC
### Why use background tasks?
- sync data
- download updates ahead of time
- prefetching content

### When use?
- by default 12h
- minimun 15 min

### Required Systems Constraints
- Battery cannot be low
- Airplane mode off
- Need connection with internet
- Background app refresh ON
- App needs to be in the background, if user quit the app, background task dont work

### Best Practices
- Do light tasks
- group tasks

### Use Cases
- Sync user data(offline database, files)
- Upload logs
- short backups
- Prefetch content

### How to test?
- Android -> you can test on android simulator
- Ios -> you only test on real devices
