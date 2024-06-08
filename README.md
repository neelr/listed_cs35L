# <image src="Listed/assets/appicon.png" width=300 height=300>
# A _**; DROP TABLE Group Names**_ production.

## Installation Instructions
### Through Git Repository
#### NOTE: Installing this app is **FAR** simpler using the Expo Go app than with a simulator.
The repo will contain a directory called _**Listed**_, a directory called _**server**_, a .gitignore file, and this README file, as well as the expected .git directory.

After cloning the repository, and assuming your current working directory is the repository folder:  
1. Put the provided *.env* file (given in the submission) in the server directory.
2. Run the following commands in sequence, assuming your current working directory is the repository folder:
```
cd server
npm install
cd ../Listed
npm install
```
4. Staying in the _**Listed**_ subfolder, run ``` npx expo start --tunnel ``` to start the Expo server.
5. From here, you can run the app on either your own phone or an emulator.
    - **Using your own phone**
        1. Download the Expo Go app.
        2. Scan the provided QR code in the Camera app (iOS) or the Expo Go app (Android).
    - **Using an emulator**
        1. Install either [Xcode (Mac only)](https://developer.apple.com/documentation/safari-developer-tools/installing-xcode-and-simulators) or [Android Studio](https://developers.google.com/privacy-sandbox/relevance/setup/android/download#:~:text=Install%20the%20latest%20Canary%20build,it%20isn't%20already%20installed.) with an emulator.
        2. Press _**i**_ for an iOS emulator (Mac only) or _**a**_ for an Android emulator.
      
## Tech Stack
### Frontend
- React Native  
- TSX  
- Formik/Yup  
- Expo
- Axios  
- TanStack Query

### Backend
- AWS DynamoDB  
- Express.js
- TypeScript   
- JWT Library

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
