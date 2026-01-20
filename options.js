
function saveOptions(e) {
    e.preventDefault();
    browser.storage.sync.set({
        librarian_address: document.querySelector("#librarian_address").value,
        token: document.querySelector("#token").value
    });
}

function restoreOptions() {
    function setCurrentChoice(result) {
        document.querySelector("#librarian_address").value = result.librarian_address ?? "https://www.rsslibrarian.ch/librarian.php";
        document.querySelector("#token").value = result.token ?? "";

    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    let getting = browser.storage.sync.get();
    getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
