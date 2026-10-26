<a name="readme-top"></a>

<!-- TABLE OF CONTENTS -->

# 📗 Table of Contents

- [📖 About the Project](#about-project)
  - [🛠 Built With](#built-with)
    - [Tech Stack](#tech-stack)
    - [Key Features](#key-features)
    - [API and Routes](#api-and-routes)
  - [🚀 Live Demo](#live-demo)
- [💻 Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
  - [Install](#install)
  - [Usage](#usage)
  - [Run tests](#run-tests)
- [👥 Authors](#authors)
- [🔭 Future Features](#future-features)
- [🤝 Contributing](#contributing)
- [⭐️ Show your support](#support)
- [🙏 Acknowledgements](#acknowledgements)
- [📝 License](#license)

<!-- PROJECT DESCRIPTION -->

# 📖 Space Travelers' Hub <a name="about-project"></a>

**Space Travelers' Hub** lets users browse rockets, reserve them locally, and select launches and crew members.

- **Rockets:** browse rocket details and reserve or cancel a reservation. Rocket cards display names, descriptions, and reservation controls using the Pipeworx SpaceX revival API. Failed requests display a retry button.
- **Launches:** browse upcoming and past launches from Pipeworx, including dates, status, descriptions, and webcast links when available. Add or remove launches from My Launches.
- **Crew:** browse astronaut photos, roles, agencies, status, and assigned missions from `https://gateway.pipeworx.io/spacex/v4/crew`. Add or remove members from My Crew. Missing or failed photos display a fallback.
- **My Profile:** view selected launches, crew members with their photos, and reserved rockets.

Launches replaces the former Missions section at `/launches`; old `/missions` links redirect there. Crew has its own page at `/crew`. Selections are held in Redux memory and reset on page refresh. They do not create real bookings.

## 🛠 Built With <a name="built-with"></a>

### Tech Stack <a name="tech-stack"></a>

<details>
  <summary>Client</summary>
  <ul>
    <li><a href="https://reactjs.org/">React.js</a></li>
    <li><a href="https://redux.js.org/">Redux</a></li>
    <li><a href="https://getbootstrap.com/">Bootstrap</a></li>
  </ul>
</details>

<!-- Features -->

### Key Features <a name="key-features"></a>

- Rocket reservations with cancellation.
- Upcoming and past launch lists with local dates, status, and webcast links when available.
- Crew profiles with photos, roles, agencies, and assigned missions.
- A profile that collects selected launches, selected crew, and reserved rockets.
- Loading, empty, and retry states for API requests.
- Responsive layouts and a fallback for unavailable crew photos.

### API and Routes <a name="api-and-routes"></a>

Catalog data comes from the [Pipeworx SpaceX revival](https://pipeworx.io/blog/spacex-api-revived/). Requests use `https://gateway.pipeworx.io/spacex/v4` as their base URL.

| Page | App route | API endpoints |
| --- | --- | --- |
| Rockets | `/` | `/rockets` |
| Launches | `/launches` | `/launches/upcoming`, `/launches/past` |
| Crew | `/crew` | `/crew` |
| My Profile | `/my_profile` | Uses selections already in Redux |

The API response shapes differ from the original SpaceX API. `src/redux/api.js` maps them into the app's data model. Rocket records have no photos, so rocket cards contain text and reservation controls. Historical launches may have fewer details than upcoming launches. Crew biography links are displayed only when available.

Catalog pages fetch data when first visited and retain it while the app stays open. Redux tracks request status to prevent duplicate loads, including under React Strict Mode. Failed requests can be retried.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LIVE DEMO -->

## 🚀 Live Demo <a name="live-demo"></a>

- [Netlify](https://elsonotake-space-travelers.netlify.app)
- [Vercel](https://space-travelers-steel.vercel.app/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## 💻 Getting Started <a name="getting-started"></a>

To get a local copy up and running, follow these steps.

### Prerequisites

- [Node.js](https://nodejs.org/) **22.x** and **npm 10 or newer**, as declared in `package.json`.
- Internet access to load catalog data and crew photos.

If you use nvm, select the supported Node version before installing dependencies:

```sh
nvm install 22
nvm use 22
```

### Setup

Clone this repository to your desired folder:

using HTTPS:
```sh
  git clone https://github.com/ElsonOtake/Space-Travelers.git
  cd Space-Travelers
```

using an SSH key:
```sh
  git clone git@github.com:ElsonOtake/Space-Travelers.git
  cd Space-Travelers
```

using GitHub CLI:
```sh
  gh repo clone ElsonOtake/Space-Travelers
  cd Space-Travelers
```

### Install

Install this project with:

```sh
  npm install
```

### Usage

Start the development server with automatic reloads:

```sh
npm run dev
```

Open `http://localhost:3000`.

To serve a production build through Express, build the app first:

```sh
npm run build
npm start
```

The Express server serves the `build` directory on port 3000 by default. Set the `PORT` environment variable to use another port. Rebuild after source changes when using `npm start`.

### Run tests

To run tests, run the following command:

```sh
npm test
```

For a single test run:

```sh
CI=true npm test -- --watchAll=false --runInBand
```

API calls are mocked in tests. Coverage includes response mapping, reservations, launch and crew selections across navigation, the `/missions` redirect, retry and empty states, duplicate request prevention, and crew photo fallback.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- AUTHORS -->

## 👥 Authors <a name="authors"></a>

👤 **Walter Velasquez**

- GitHub: [Sirvelasque](https://github.com/Sirvelasque)
- Twitter: [@Walterwalte](https://twitter.com/Walterwalte)
- LinkedIn: [sirvelasque](https://www.linkedin.com/in/sirvelasque)

👤 **Elson Otake**

- GitHub: [elsonotake](https://github.com/elsonotake)
- Twitter: [@elsonotake](https://twitter.com/elsonotake)
- LinkedIn: [elsonotake](https://linkedin.com/in/elsonotake)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- FUTURE FEATURES -->

## 🔭 Future Features <a name="future-features"></a>

- [ ] **Persist profile selections across page refreshes**

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## 🤝 Contributing <a name="contributing"></a>

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](../../issues/).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- SUPPORT -->

## ⭐️ Show your support <a name="support"></a>

Give a ⭐️ if you like this project!

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGEMENTS -->

## 🙏 Acknowledgments <a name="acknowledgements"></a>

I would like to thank:

- [Microverse](https://www.microverse.org/)
- [Freepik](https://www.flaticon.com/free-icons/planet)
- [W3Schools](https://www.w3schools.com/)
- [Stack Overflow](https://stackoverflow.com/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## 📝 License <a name="license"></a>

This project is [MIT](./MIT.md) licensed.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
