/**
 * Creates an event in the Coleman calendar following the Google API Event format.
 * @param {number} day A number from 0 to 6 representing the weekday (0=sunday, 6=saturday).
 * @param {string} time The time of the event in 'HH:MM:SS' format.
 * @param {string} command Either a specific color or 'off'.
 */
function createEvent(day, time, command) {

    // Find the next instance of the given weekday
    let date = new Date()
    let currentDay = date.getDay()
    if (day < currentDay) {
        date.setDate(date.getDate() + (7 - currentDay) + day)
    }
    else if (day > currentDay) {
        date.setDate(date.getDate() + (day - currentDay))
    }

    // Create string for end time (start time + 1 hour)
    let endTime = time.split(':')
    endTime[0] = String(parseInt(endTime[0]) + 1).padStart(2, '00')
    endTime = endTime.join(':')

    // Get strings for start/end time in DateTime format (YYYY-MM-DDTHH:mm:SS)
    let startDateTime = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '00')}-${String(date.getDate()).padStart(2, '00')}T${time}`
    let endDateTime = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '00')}-${String(date.getDate()).padStart(2, '00')}T${endTime}`

    // Create Event Object
    let event = {
        summary: command,
        start: {
            dateTime: startDateTime,
            timeZone: 'America/Denver'
        },
        end: {
            dateTime: endDateTime,
            timeZone: 'America/Denver'
        },
        recurrence: [
            'RRULE:FREQ=WEEKLY;COUNT=52'
        ],
    }

    // Create POST request to server
    fetch('/add-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
    })
}