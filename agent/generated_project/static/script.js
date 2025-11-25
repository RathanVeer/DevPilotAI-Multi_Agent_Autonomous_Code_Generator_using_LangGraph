// Guestbook client-side script
// Enhances UX by preventing double submissions and optionally refreshing the guest list via AJAX.

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('guestForm');
    const submitBtn = document.getElementById('submitBtn');
    const guestList = document.getElementById('guestList');

    // ---------------------------------------------------------------------
    // 1. Prevent double submission
    // ---------------------------------------------------------------------
    if (form && submitBtn) {
        form.addEventListener('submit', function (e) {
            // Disable the submit button immediately to guard against rapid clicks.
            submitBtn.disabled = true;
            // Re‑enable after a short timeout (e.g., 1 second). This also covers
            // the edge‑case where the form submission fails and the page does not
            // navigate away.
            setTimeout(function () {
                submitBtn.disabled = false;
            }, 1000);
            // Allow the form to submit normally (no e.preventDefault()).
        });
    }

    // ---------------------------------------------------------------------
    // 2. Optional AJAX Guest List Refresh
    // ---------------------------------------------------------------------
    // Define a function that fetches the current page HTML, extracts the
    // <ul id="guestList"> element, and updates the DOM without a full reload.
    function fetchGuestList() {
        // Only attempt the fetch if the guest list element exists.
        if (!guestList) return;
        fetch('/')
            .then(function (response) {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.text();
            })
            .then(function (html) {
                // Parse the returned HTML string.
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const newList = doc.getElementById('guestList');
                if (newList) {
                    guestList.innerHTML = newList.innerHTML;
                }
            })
            .catch(function (err) {
                // Silently ignore errors – the list will simply not update.
                console.error('Failed to fetch guest list:', err);
            });
    }

    // Run the fetch function every 10 seconds to keep the list up‑to‑date.
    // The interval is started only if the element exists on the page.
    if (guestList) {
        // Initial fetch to ensure the list is current (in case the page was
        // loaded from cache). This is optional but harmless.
        fetchGuestList();
        setInterval(fetchGuestList, 10000); // 10,000 ms = 10 seconds
    }
});
