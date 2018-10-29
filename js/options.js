function Options() {
    this.backgroundColor = '';

    chrome.storage.sync.get({
        backgroundColor: '#191919'
    }, function(items) {
        this.backgroundColor = items.backgroundColor;
        console.log(this.backgroundColor);
    });

    console.log(this.backgroundColor);
}
