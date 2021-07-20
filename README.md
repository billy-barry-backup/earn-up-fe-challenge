# EarnUp FE Challenge

Hello, it's excellent to see you here! We are excited to continue the conversation.

This repo contains a challenge we'd like you to complete so we can assess some of your technical chops 💪. Spoiler: it's some UI and some API integration.

We have a starter kit for you so you can avoid doing basic boilerplate and can focus on the problem with the following tools (relevent to our own stack):

- Create React App (https://github.com/facebook/create-react-app)
- Material UI (https://material-ui.com/)
- Redux (https://redux.js.org/)
- React Router (https://reacttraining.com/react-router/web/guides/philosophy)

However, the boilerplate code in this project should serve as a foundation; feel free to make modifications, write helper functions, create shared components, etc.

## Timing

This project is designed to take **45 minutes**, no more than 1 hour, but we respect your right to work on it as needed on your own time. Please send the recruiter a link to your solution within a week.

# Getting Started

Make sure you have `node` and `nodemon` installed globally.

```
npm i -g nodemon
```

1. Clone this repository
1. Navigate to client folder: `cd fe-challenge`
1. Install node modules: `npm install`
1. Start the client: `npm start`

Now you can start the problem!

# The Challenge

We would like you to do the following:

1. Fetch some loan data from: https://my-json-server.typicode.com/EarnUp/demo
    - Response should be a list of loans and basic details. Loan info includes:
      - Lender name
      - Monthly payment amount due
      - Debit start date
      - Debit schedule type. This can be one of the following:
        - Biweekly (every 2 weeks)
        - Semimonthly (twice a month)
      - Days of month: a list of days associated with semi-monthly debits.
        - Examples: [1, 15], [5], []
      - Debit day of week: day of the week associated with biweekly debits.
        - Available values: `monday`, `tuesday`, `wednesday`, `thursday`, `friday`, and `“”`
      - Day of the month when payments are due (eg, the 30th)
1. Save the response in the redux store
    - A redux example is available for you to reference at: http://localhost:3002/example-redux
1. Render the loans from the store into the `Home` container
    - Each loan should be rendered in an individual card
    - *Bonus*: An example card template is provided, but feel free to spruce it and the container up with your best judgement and creative use of the MUI library.

# Turn in your solution

1. Check in your code to a new Github repo
1. Email a link of the repo to the recruitor
1. Wait as we review and provide feedback

⭐ Good luck! ⭐