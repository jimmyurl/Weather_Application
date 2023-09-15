# Weather_Application
A simple weather application in React Js that allows users to search for weather information by entering the name of a city. The app fetches weather data from the OpenWeatherMap API and displays the temperature, description of weather conditions, feels-like temperature, and humidity for the specified city. 
Here's how you can setup you app similar to this:

1. **Dependencies and Imports:**
   - Import the necessary dependencies and styles at the beginning of `App.js` file, including Axios for making API requests and React libraries for managing state and rendering the UI.

2. **State Setup:**
   - Use the `useState` hook to create two state variables:
     - `weatherData`: This state variable will store the weather data for the selected city once it's fetched from the API.
     - `city`: This state variable is used to store the city name entered by the user in the search input.

3. **Fetching Weather Data:**
   - Define an `useEffect` hook that triggers whenever the `city` state changes. Inside this effect, create an asynchronous function called `fetchWeatherData`.

   - `fetchWeatherData` makes an API request to OpenWeatherMap using Axios. It constructs the URL with the API key and the user's input city name.

   - If the request is successful, it sets the fetched weather data into the `weatherData` state variable. If there is an error, it logs the error to the console.

4. **Search Input Handling:**
   - The input field is controlled by the `city` state. When the user types in the input field, the `handleSearch` function is called, updating the `city` state with the user's input.

5. **Rendering the Weather Data:**
   - The weather data fetched from the API is conditionally displayed in the UI. Check if `weatherData` is not null (i.e., data has been fetched) before rendering the weather information.

   - The weather information includes the city name, temperature in Celsius, weather description, feels like temperature, humidity percentage, and wind speed.

6. **Rendering in index.js:**
   - In the `index.js` file, create a React root element using `createRoot` and render your `App` component wrapped in `StrictMode`. `StrictMode` is used for highlighting potential problems in the app during development.


![dar](https://github.com/jimmyurl/Weather_Application/assets/33938444/f2988141-e6e8-4b61-893b-485c9d9ce48a)
