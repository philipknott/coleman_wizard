const express = require('express')
const bodyparser = require('body-parser')

/* API stuff */
const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const TOKEN_PATH = 'token.json';

const calendarId = require('./calendarId.json')

var app = express()

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(bodyparser.json())

app.listen(3000, () => { console.log('listening on 3000') })

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})

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

function addEvent(auth, event) {
    const calendar = google.calendar({ version: 'v3', auth });

    calendar.events.insert({
        calendarId,
        resource: event
    }, (err, event) => {
        if (err) console.log(err)
        else console.log('event created!')
    })
}

function clearAllEvents(auth) {
    const calendar = google.calendar({ version: 'v3', auth })

    // Get all events
    calendar.events.list({
        calendarId
    }, (err, res) => {
        if (err) console.log(err)
        // Delete each event 
        res.data.items.forEach(e => {
            console.log(e.summary, e.id)
            calendar.events.delete({
                calendarId, 
                eventId: e.id
            }, (err, res) => {
                if (err) console.error(err)
                console.log('Event deleted:', e.summary)
            })
        })
    })
} 