# Exhibit-X-Web
Exhibit X is a dynamic, digital, art exhibit on the OSU cascades campus. Exhibit X makes use of a number of sensors, most notably a Microsoft Kinect. It uses the information pulled from the sensors to create evocative and compelling pieces of art. And the best part is that you can submit your own "sketches" to be displayed on Exhibit X!

Exhibit-x-web is a web app that serves three main purposes
- Receive uploaded user sketches
- Help administrators manage the exhibit and user sketches
- Provide control commands to the exhibit computer

## Quick Setup
1. Start postgreSQL instance on local computer. You should probably use docker for this.
2. Create and fill out .env file with database connection details
3. `npm install`
4. `npx prisma migrate dev`
4. `npm start`

## Deploy
1. Setup heroku on development computer
2. `git push heroku`
3. `heroku run npx prisma migrate deploy` to migrate production database

## Roadmap
- [ ] API security before deployment
- [x] Sketch writing guidance for users
- [x] Sketch rotation
- [x] Email users when sketch status changes
- [ ] P5js support
- [ ] P5js editor
- [ ] Automatic sketch checking

## Technical Details
Exhibit-x-web is written in javascript and is based on the [express](https://expressjs.com/) web framework. Persistent data is stored in a postgresql database. Communication between the app and database is managed by [prisma](https://www.prisma.io/).

### Sketch uploading
Once authenticated, users have the ability to upload their own sketch files from the index page. Sketches must be contained in a flat zip directory that has the same name as the main sketch file. The sketch zip is stored in S3 and a new entry for the sketch is added to the postgres database.

Uploaded sketches are initially considered unapproved. Unapproved sketches cannot be scheduled to run on the exhibit until approved by an administrator. This mechanism helps prevent abuse by malicious users.

### Sketch Running
Currently, only one sketch can run at a time and an administrator must select the sketch to run. Choosing a new sketch to run marks the sketch as pending. The sketch remains in the pending state until the exhibit confirms that it is running the new sketch. After which, the new sketch is marked as running.

## Exhibit API
The following json api is used by the exhibit computer to receive new commands and download sketches

### GET `/current`
Returns id of the sketch that should be running on the exhibit. This will be the pending sketch if it exists, otherwise the currently running sketch
#### Parameters
None

#### Returns
- `sketchID` - Integer: ID of the sketch
- `downloadURL` - String: URL from which the sketch zip can be downloaded
- `title` - String: Human readable sketch title

### POST `/exhibit/heartbeat`
Used by the exhibit computer to post status updates to the server. The server uses these messages to determine which sketch is running and if the machine is alive

#### Parameters
`activeSketch` - Integer: ID of the currently running sketch. If this ID and the pending sketch ID match, then the pending sketch is marked running

#### Returns
Nothing
