1. `yarn install`

2. `yarn pod`

3. Set environment variables

   **Android:**

   - On UNIX-based systems (macOS, Linux):
     ```bash
     export GOOGLE_API_KEY=your_actual_api_key
     ```
   - On Windows (Command Prompt):
     ```cmd
     set GOOGLE_API_KEY=your_actual_api_key
     ```

   **iOS:**

   - Create a `Config.xcconfig` file inside the `ios` folder with the content:
     ```
     GOOGLE_API_KEY = your_actual_api_key
     ```
