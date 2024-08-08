# CoffeeConnect events platform Backend

## Instructions to run locally

To clone the repository, open the terminal on your device and change the current working directory to the location where you want the cloned directory.

Type `git clone https://github.com/dylank03/events-platform-be.git` and press enter to create your local clone.

Open the cloned repository in a code editor such as VS code. You will need to create a .env file to store the API_KEY and DATABASE_URI values. To access an api key you will need to have an account with eventbrite. Follow this link for more instructions https://www.eventbrite.co.uk/help/en-gb/articles/849962/generate-an-api-key/. For a database uri you will need an account with mongodb atlas. Follow this link for more details https://www.mongodb.com/docs/guides/atlas/connection-string/. To run the server locally on port 9090 enter `npm run dev` in the terminal and use ctrl + c to close the server.

To run the testing suite enter `npm t app` in the terminal.
