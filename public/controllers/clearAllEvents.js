/**
 * Deletes all events under the Coleman calendar.
 */
function clearAllEvents() {
    // Create GET request on server 
    // (not POST because no data is being passed)
    fetch('/clear-all-events')
}