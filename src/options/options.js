function save_options() {

    // Get our input from user
    var dayColor = document.getElementById('dayColor').value;
    var weekColor = document.getElementById('weekColor').value;
    var monthColor = document.getElementById('monthColor').value;
    var yearColor = document.getElementById('yearColor').value;
    var backgroundColor = document.getElementById('backgroundColor').value;

    // Store our options
    chrome.storage.sync.set({

        dayColor: dayColor,
        weekColor: weekColor,
        monthColor: monthColor,
        yearColor: yearColor,
        backgroundColor: backgroundColor

    }, function() {

    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);

    });
}

// Load the user options
function restore_options() {
    chrome.storage.sync.get({
        dayColor: '#FF00FF',
        weekColor: '#00FFFF',
        monthColor: '#FFFF00',
        yearColor: '#4cff7c',
        backgroundColor: '#191919'
    }, function(items) {
        document.getElementById('dayColor').value = items.dayColor;
        document.getElementById('weekColor').value = items.weekColor;
        document.getElementById('monthColor').value = items.monthColor;
        document.getElementById('yearColor').value = items.yearColor;
        document.getElementById('backgroundColor').value = items.backgroundColor;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
