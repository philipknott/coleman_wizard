const express = require('express')
const bodyparser = require('body-parser')

/* API stuff */
const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const TOKEN_PATH = 'token.json';

/* debug stuff */
const ids = require('./ids.json')

var app = express()

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(bodyparser.json())

app.listen(3000, () => { console.log('listening on 3000') })

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})

app.get('/submit', (req, res) => {
    res.sendFile(__dirname + '/views/submit.html')
})

app.post('/submit', (req, res) => {
    let event = {
        summary: req.body.summary,
        description: req.body.description,
        start: {
            dateTime: `${req.body.date}T${req.body.start}:00`,
            timeZone: 'America/Denver'
        },
        end: {
            dateTime: `${req.body.date}T${req.body.end}:00`,
            timeZone: 'America/Denver'
        }
    }

    fs.readFile('credentials.json', (err, content) => {
        let credentials = JSON.parse(content);
        const { client_secret, client_id, redirect_uris } = credentials.installed;
        const oAuth2Client = new google.auth.OAuth2(
            client_id, client_secret, redirect_uris[0]);

        fs.readFile(TOKEN_PATH, (err, token) => {
            oAuth2Client.setCredentials(JSON.parse(token));
            addEvent(oAuth2Client, event);
        });
    });

    res.redirect('/submit')
})

function addEvent(auth, event) {
    const calendar = google.calendar({ version: 'v3', auth });
    let calendarId = ids.calendarId;

    calendar.events.insert({
        calendarId,
        resource: event
    }, (err, event) => {
        if (err) console.log(err)
        else console.log('event created!')
    })
}