/**
 * Saves a given javascript object to server in JSON format.
 * @param {object} data A javascript object to be stored on the server.
 */
async function saveData(data) {

    // Make POST request with data to server
    const response = await fetch('/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })

    // Check for errors
    if (!response.ok) {
        const err = await response.text()
        console.log(err)
        return
    }

    // Give response to user
    const text = await response.text()
    console.log(text)
}

/**
 * Retrieves saved JSON data from server and passes it to given callback function.
 * @param {function} callback Function to be called with stored data.
 */
async function loadData(callback, name = undefined) {

    // Make GET request to server
    const response = await fetch('/load')

    // Check for errors
    if (!response.ok) {
        const err = await response.text()
        console.log('Error:', err)
        return
    }

    // Call callback function with JSON result
    const data = await response.json()

    if (name) {
        callback(data[name])
    }
    else {
        callback(data)
    }
}

/**
 * Sends request to server to reset the server save file.
 */
async function resetSaveData() {
    const response = await fetch('/reset-savefile')

    if (!response.ok) {
        const err = await response.text()
        console.log('Error:', err)
        return
    }

    const text = await response.text()
    console.log(text)
}

/**
 * Prints data to console. Used as a test callback function for load().
 * @param {object} data Javascript object to be outputted.
 */
function test(data) {
    console.log('--- TEST ---')
    console.log(data)
    console.log('--- END ----')
}

// ------------------------------------------------
// INCLUDE CALLBACK FUNCTION(s) TO HANDLE DATA HERE
// ------------------------------------------------
