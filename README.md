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

<img width="293" height="633" alt="Simulator Screenshot - iPhone 13 Pro - 2025-10-30 at 01 05 52" src="https://github.com/user-attachments/assets/55ca5249-3590-4e97-a3da-681b4b70445c" />
<img width="735" height="40" alt="Screenshot 2025-10-30 at 01 07 49" src="https://github.com/user-attachments/assets/54a3360b-1062-4fdf-a14d-b93f8332699a" />

