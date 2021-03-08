const express = require('express')
const bodyparser = require('body-parser')
const ejs = require('ejs')

/* API stuff */
const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const TOKEN_PATH = 'token.json';

const calendarId = require('./calendarId.json');
const { json } = require('body-parser');
const { oauth2 } = require('googleapis/build/src/apis/oauth2');

var app = express()

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(bodyparser.json())

app.listen(3000, () => { console.log('listening on 3000') })

// Main Route that updates events.json, then displays homepage
app.get('/', (req, res) => {
    // Get all events from calendar and update events.json
    fs.readFile('credentials.json', (err, content) => {
        let credentials = JSON.parse(content);
        const { client_secret, client_id, redirect_uris } = credentials.installed;
        const oAuth2Client = new google.auth.OAuth2(
            client_id, client_secret, redirect_uris[0]);

        fs.readFile(TOKEN_PATH, (err, token) => {
            oAuth2Client.setCredentials(JSON.parse(token));
            addEventsFromCalendar(oAuth2Client);
        });
    })

    // Render homepage
    fs.readFile('events.json', (err, data) => {
        if (err) return console.error('Error retrieving events.json:', err)
        res.render('index.ejs', {
            events: JSON.parse(data)
        })
    })
})

app.get('/view-events', (req, res) => {
    fs.readFile('events.json', (err, data) => {
        if (err) return console.error('Error retrieving events.json:', err)
        res.render('viewEvents.ejs', {
            events: JSON.parse(data)
        })
    })
})

// Route that will authorize and call addEvent() function with given event
app.post('/add-event', (req, res) => {
    let event = req.body

    fs.readFile('credentials.json', (err, content) => {
        let credentials = JSON.parse(content);
        const { client_secret, client_id, redirect_uris } = credentials.installed;
        const oAuth2Client = new google.auth.OAuth2(
            client_id, client_secret, redirect_uris[0]);

        fs.readFile(TOKEN_PATH, (err, token) => {
            oAuth2Client.setCredentials(JSON.parse(token));
            addEvent(oAuth2Client, event);
        });
    })
})

// Route that will save POST data to local server file
app.post('/save', (req, res) => {
    fs.writeFile('savefile.json', JSON.stringify(req.body), (err) => {
        if (err) {
            res.status(500).send('Could not save data.')
        }
        else {
            res.send('Data saved.')
        }
    })
})

// Route that will send data from local server file
app.get('/load', (req, res) => {
    fs.readFile('savefile.json', (err, data) => {
        if (err) {
            console.error(err)
            res.status(500).send('Could not load data.')
        }
        else {
            res.json(JSON.parse(data))
        }
    })
})

// Route that will authorize and call clearAllEvents() function
app.get('/clear-all-events', (req, res) => {
    fs.readFile('credentials.json', (err, content) => {
        let credentials = JSON.parse(content);
        const { client_secret, client_id, redirect_uris } = credentials.installed;
        const oAuth2Client = new google.auth.OAuth2(
            client_id, client_secret, redirect_uris[0]);

        fs.readFile(TOKEN_PATH, (err, token) => {
            oAuth2Client.setCredentials(JSON.parse(token));
            clearAllEvents(oAuth2Client);
        });
    })
})

function addEventsFromCalendar(auth) {
    const calendar = google.calendar({ version: 'v3', auth });

    // Get all events
    calendar.events.list({
        calendarId
    }, (err, res) => {
        if (err) return console.error('Error retrieving calendar events:', err)

        // Add events to events.json in a readable format
        let events = []
        res.data.items.forEach(e => {
            events.push({
                command: e.summary,
                time: e.start.dateTime.split('T')[1].split('-')[0],
                day: new Date(e.start.dateTime).getDay()
            })
        })

        fs.writeFile('events.json', JSON.stringify(events), (err) => {
            if (err) return console.error('Erorr writing to events.json:', err)
        })
    })
}

function addEvent(auth, event) {
    const calendar = google.calendar({ version: 'v3', auth });

    // Add event to calendar
    calendar.events.insert({
        calendarId,
        resource: event
    }, (err) => {
        if (err) return console.error(err)
        // Update events.json 
        addEventsFromCalendar(auth)
    })
}

function clearAllEvents(auth) {
    const calendar = google.calendar({ version: 'v3', auth })

    // Get all events
    calendar.events.list({
        calendarId
    }, (err, res) => {
        if (err) return console.error(err)

        // Delete each event 
        res.data.items.forEach(e => {
            calendar.events.delete({
                calendarId,
                eventId: e.id
            }, (err, res) => {
                if (err) return console.error(err)
                console.log('Event deleted:', e.summary)
            })
        })
    })

    // Clear events.json file
    fs.writeFile('events.json', '[]', (err) => {
        if (err) return console.error(err)
    })
}

function save(data) {
    fs.writeFile('savefile.json', JSON.stringify(data), (err) => {
        if (err) return console.error('Error saving to safefile:', err)
    })
}