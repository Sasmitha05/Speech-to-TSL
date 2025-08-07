# Silent Gestures: A Speech-to-Sign Language Translator
Silent Gestures is an innovative web application designed to enhance communication between spoken and sign language users. This project leverages modern web technologies to recognize Tamil speech and display corresponding Tamil Sign Language (TSL) gestures as GIFs.

# Features
1.User Authentication
   
Login Page: Allows registered users to securely log in to the application.

Signup Page: Enables new users to create an account with proper validation for user credentials.

2.Speech Recognition
   
Uses the React-Speech-Recognition library to capture and process Tamil speech in real-time.

Displays recognized words or phrases in text format.

If the recognized phrase matches predefined Tamil Sign Language phrases, the corresponding TSL GIF is displayed dynamically.

3.Interactive User Interface
   
The interface is designed with custom styling using CSS for an elegant and responsive user experience.

Includes custom font integration for enhanced visual appeal.

# How It Works

The user logs in to the application using valid credentials.

After logging in, they can navigate to the Speech Recognition page.

On this page, they can:

Start speech recognition by clicking the "Start Listening" button.

View the live transcription of the recognized speech.

If a recognized phrase matches one from the predefined TSL phrase list, a GIF is displayed showcasing the respective Tamil Sign Language gesture.

Stop recognition anytime using the "Stop Listening" button.

# Technology Stack

Frontend: React.js, HTML, CSS

Backend: Node.js (if integrated), REST APIs (optional for user authentication)

Speech Recognition: React-Speech-Recognition library

Database: MongoDB (for storing user credentials, if applicable)

# Screen recording
[sign-language-demo.webm](https://github.com/user-attachments/assets/aa4e4936-ab79-4f8d-b43d-ef9679179717)

# Future Enhancements

Add multilingual support for other regional languages.

Integrate real-time translation for other sign languages.

Expand the TSL phrase library to support more words and phrases.

Implement an AI-powered translator for speech-to-gesture conversion.
