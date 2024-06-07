# Listed
A _**; DROP TABLE Group Names**_ production.

## Installation Instructions
### Through Git Repository <!-- (More complicated) -->
#### NOTE: Installing this app is **FAR** simpler using the Expo Go app than with a simulator.
The repo will have a directory called _**Listed**_, a directory called _**server**_, a .gitignore file, and this README file.  
1. Put the provided *.env* file in the server directory.
2. In each of the _**server**_ and _**Listed**_ directories of the git repository, run
``` npm install ```.
3. In the _**Listed**_ subfolder, run ``` npx expo start --tunnel ``` to start the Expo server.
4. From here, you can run the app on either your own phone or an emulator.
    - **Using your own phone**
        1. Download the Expo Go app.
        2. Scan the provided QR code in the Camera app (iOS) or the Expo Go app (Android).
    - **Using an emulator**
        1. Install either [Xcode (Mac only)](https://developer.apple.com/documentation/safari-developer-tools/installing-xcode-and-simulators) or [Android Studio](https://developers.google.com/privacy-sandbox/relevance/setup/android/download#:~:text=Install%20the%20latest%20Canary%20build,it%20isn't%20already%20installed.) with an emulator.
        2. Press _**i**_ for an iOS emulator (Mac only) or _**a**_ for an Android emulator. 

<!-- ### Through Phone Beta Test Links (Simpler)
Download either the TestFlight app (iOS) or Google Play Console (Android).  
- iOS: [Apple TestFlight link](https://eelslap.com)
- Android: [Google Play Console link](https://www.youtube.com/@DougDeMuro)   -->

## Tech Stack
### Frontend
- React Native  
- TypeScript  
- Formik/Yup  
- Expo

### Backend
- AWS DynamoDB  
- Express.js  
- Axios  
- TanStack Query

## Features
- Authentication  
- Add, edit, and delete tasks
- Public and private tasks
- Marker for overdue tasks
- Marking tasks as complete
- Shared tasks
- Searching for users to add as friends
- Profile screen with display 
- Seeing users' friends and public tasks
- Log out and delete account