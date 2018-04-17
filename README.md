# ASIE-Resume-Database

This repo contains the source code for a resume database. Prospective candidates will be able to upload interests, skills, portfolio entries, and more. Employers are able to submit an email-like request for facilitators to review and match the most fitting candidate.

## To install
Install backend node_modules

`cd ASIE-Resume-Database`

`npm install`

## Database

Create a config file in `src/server/config/config.js`. There is a sample in `src/server/config/config.js.sample`.

## To run

`cd ASIE-Resume-Database`

`npm run webpack`

`npm start`

Or if you prefer to run both of these commands concurrently for developmental purposes

`npm run dev`

This command will run the previous two commands using the `concurrently` modudle.

For production mode, you may want to run `webpack` in optimized mode.

`npm run heroku-postbuild`
