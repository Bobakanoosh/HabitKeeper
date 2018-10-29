//TODO: FONT
//TODO: Animations
//TODO: Preview Presets - not sure how to do this, external link?
//TODO: homepage url in manifest.json

let dayCountOverall = 0;
let dayCount = 0;
let weekCount = 0;
let monthCount = 0;
let yearCount = 0;
let w;
let h;

let lastPreset = 'None';

// Options
var backgroundColor = '#191919';
var dayColor = '#FF00FF';
var weekColor = '#00FFFF';
var monthColor = '#FFFF00';
var yearColor = '#4cff7c';
var fontColor = '#FFFFFF';
var spacing = 30;
var thickness = 10;
var fontSize = 72;
var radius = 850;
var resetAfter48hoursMissed = false;
var hideHelpText = false;
var dev = false;

var presets = ['None', 'Classic', 'Greyscale', 'Winter', 'Flowers', '70s', 'Samling', 'Fox', 'Violet'];

// Stats
var lastClickTime = 0;
var lastClickDay = 0;

let gui;
let presetGui;
let guiHidden = true;
let pGuiHidden = true;

let counter = 0;

function setup() {
    // Load our options
    loadOptions();

    createCanvas(window.innerWidth, window.innerHeight);
    angleMode(DEGREES);
    radius = 850;
    w = width / 2;
    h = height / 2;

    createPresetsGui();
    frameRate(60);

    let githubA = createA("https://github.com/Bobakanoosh/HabitKeeper/");
    githubA.html("<img src=/../../icons/transparent.png alt='Github' style='height: 80px; opacity: 0.3'>")
    githubA.position(0, window.innerHeight-85);

    // let img = createImg('/../icons/transparent.png');
    // img.style('height','80px');
    // img.position(0, window.innerHeight-80);
    // img.html('<a href=https://github.com/Bobakanoosh/HabitKeeper/>');

    let a = createA('https://www.paypal.me/Bobakanoosh', 'Donate');
    a.style('text-decoration', 'none');
    a.style('font-size', '16px');
    a.position(window.innerWidth-70, window.innerHeight-30);

}

function draw() {
    background(backgroundColor);
    drawCircle(dayColor, 7, 0, dayCount);
    drawCircle(weekColor, 4, 1, weekCount);
    drawCircle(monthColor, 12, 2, monthCount);
    drawCircle(yearColor, 5, 3, yearCount);
    drawText();
    drawHelpText();
    checkPresetChange();
    drawTemp();
}

// On window resized, adjust.
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    radius = height - 50;
    w = width / 2;
    h = height / 2;
}

// On key pressed, toggle settings.
function keyPressed() {

    // H, h, esc
    if(keyCode == 104 || keyCode == 72 || keyCode == 27) {
        toggleGui();
        togglePresetsGui();
    }

}

function mouseReleased() {
    counter = 0;
}

function mouseClicked() {

    saveOptions();

    if(!guiHidden || !pGuiHidden) {
        return;
    }

    // If today is the day they last clicked
    if(day() == lastClickDay) {
        //TODO: Play sound?
        displayMessage("You've already completed today's goal!", 2000);
        if(!dev)
            return;
    }

}

function incrementDays() {

    dayCount++;
    dayCountOverall++;

    if (dayCount % 8 == 0) {
        dayCount = 1;
        weekCount++;

        if (weekCount % 4 == 0) {
            weekCount = 0;
            monthCount++;

            if (monthCount % 12 == 0) {
                monthCount = 0;
                yearCount++;
            }
        }
    }

    lastClickTime = Math.floor((new Date).getTime()/1000);
    lastClickDay = day();

    saveOptions();

}

// Color Scheme Presets
function checkPresetChange() {

    // There's no way (to my knowledge) to check when a drop down menu from the p5.gui
    // is changed, so instead we set the lastPreset variable equal to whatever preset
    // so that we can detect when they've changed it, and only change it once, instead
    // of overwriting every future change they make.

    if (presets == lastPreset) {
        return;
    }

    //TODO:: this.addObject?? for button
    if (presets === 'Classic') {

        // If the last preset is what's already selected, we DO NOT want to overwrite their options
        if (lastPreset === presets)
            return;

        backgroundColor = '#191919';
        dayColor = '#FFFF00';
        weekColor = '#FF00FF';
        monthColor = '#00FFFF';
        yearColor = '#4cff7c';
        lastPreset = presets;

    } else if (presets === 'Greyscale') {

        if (lastPreset === presets)
            return;

        backgroundColor = '#191919';
        dayColor = '#5d5e5e';
        weekColor = '#8b8987';
        monthColor = '#b4b4bb';
        yearColor = '#fafbff';
        lastPreset = presets;

    } else if (presets === 'Winter') {

        if (lastPreset === presets)
            return;

        backgroundColor = '#283044';
        dayColor = '#A9BCD0';
        weekColor = '#98D2EB';
        monthColor = '#78A1BB';
        yearColor = '#D8DBE2';
        lastPreset = presets;

    } else if (presets === 'Flowers') {

        if (lastPreset === presets)
            return;

        backgroundColor = '#4F2941';
        dayColor = '#EDE28B';
        weekColor = '#5B70C6';
        monthColor = '#AC9ED2';
        yearColor = '#D8D3EA';
        lastPreset = presets;

    } else if (presets === '70s') {

        if (lastPreset === presets)
            return;

        backgroundColor = '#D81159';
        dayColor = '#FBB13C';
        weekColor = '#73D2DE';
        monthColor = '#218380';
        yearColor = '#8F2D56';
        lastPreset = presets;

    } else if (presets === 'Samling') {

        if (lastPreset === presets)
            return;

        backgroundColor = '#24282E';
        dayColor = '#34495E';
        weekColor = '#EB5255';
        monthColor = '#FFFFFF';
        yearColor = '#9C9C9C';
        lastPreset = presets;

    } else if (presets === 'Fox') {

        if (lastPreset === presets)
            return;

        backgroundColor = '#DDA544';
        dayColor = '#433727';
        weekColor = '#745636';
        monthColor = '#DFE1D9';
        yearColor = '#c5670a';
        lastPreset = presets;

    } else if (presets === 'Violet') {

        if (lastPreset === presets)
            return;

        backgroundColor = '#131b3c';
        dayColor = '#45b5ba';
        weekColor = '#9f39c6';
        monthColor = '#a95682';
        yearColor = '#4cff7c';
        lastPreset = presets;

    }

    saveOptions();

}

function createPresetsGui() {

    // Create the GUI
    presetGui = createGui('Presets',innerWidth-230, 10);
    presetGui.addGlobals(
        'presets'
    );

    presetGui.hide();
    pGuiHidden = true;

}

function displayMessage(msg, delay) {

    p = createP(msg);
    p.position(19, 30);
    p.style('color', '#FFFFFF');
    p.style('font-size', '16px');
    p.style('text-align', 'left');
    p.style('text-shadow', '-1px -1px 0 #000,\
                            1px -1px 0 #000,\
                            -1px 1px 0 #000,\
                            1px 1px 0 #000');

    // After 2 seconds, remove the message.
    setTimeout(function() {
        p.remove();
    }, delay);

}

function drawHelpText() {

    if(hideHelpText)
        return;

    // Opaque white text w/ black outline incase background is white.
    fill(255, 255, 255, 100);
    stroke(0);
    strokeWeight(1);
    textSize(16);
    text("Press `esc` for options!", 100, 30);
}

function drawText() {

    let num = dayCount + weekCount*7 + monthCount*28 + yearCount*365;
    fill(fontColor);
    // Change based on day/week/month/year colors
    // if(yearCount > 0)
    //     fill(yearColor);
    // else if(monthCount > 0)
    //     fill(monthColor);
    // else if(weekCount > 0)
    //     fill(weekColor);
    // else if(dayCount > 0)
    //     fill(dayColor);
    // else
    //     fill(255);

    noStroke();
    textSize(fontSize);
    textAlign(CENTER);

    // Adjust text based on font size to be centered, definetly not perfect.
    text(num, w, h+fontSize/3);

}

// Function for holding click to mark you've completed your goal for the day, which
// takes a few seconds so users dont accidentally advance the clock.
function drawTemp() {

    if(!guiHidden || !pGuiHidden) {
        return;
    }

    if(day() == lastClickDay) {
        if(!dev)
            return;
    }

    if(mouseIsPressed) {

        counter += 3;

        let startDeg = -90;
        let endDeg = counter - 90;
        noFill();
        strokeWeight(thickness);
        stroke(yearColor);

        let adj = spacing * 5;
        arc(w, h, radius - adj, radius - adj, startDeg, endDeg);

        if(counter >= 362) {
            incrementDays();
            counter = 0;
        }
    }

}

function drawCircle(color, val, mult, count) {

    // Draw 1/7th of the arc per click
    let startDeg = -90;
    let endDeg = ((360 / val) * count) - 90;

    noFill();
    strokeWeight(thickness);
    stroke(color);

    let adj = spacing*mult;

    if ((endDeg + 90) % 360 == 0 && count != 0) {

        ellipse(w, h, radius - adj, radius - adj);

    } else {

        arc(w, h, radius - adj, radius - adj, startDeg, endDeg);

    }

}

function createOptionsGui(options) {

    backgroundColor = options.backgroundColor;
    dayColor = options.dayColor;
    weekColor = options.weekColor;
    monthColor = options.monthColor;
    yearColor = options.yearColor;
    fontColor = options.fontColor;
    spacing = options.spacing;
    thickness = options.thickness;
    fontSize = options.fontSize;
    dayCount = options.dayCount;
    weekCount = options.weekCount;
    monthCount = options.monthCount;
    yearCount = options.yearCount;
    hideHelpText = options.hideHelpText;
    resetAfter48hoursMissed = options.resetAfter48hoursMissed;
    radius = options.radius;
    lastClickTime = options.lastClickTime;
    lastClickDay = options.lastClickDay;

    var time = Math.floor((new Date).getTime()/1000);
    let dayseconds = 86400;
    let threshhold = 2;

    if(time-dayseconds*threshhold >= lastClickTime && lastClickTime != 0) {

        if(resetAfter48hoursMissed) {

            displayMessage("You didn't complete your goal for 48 hours,\n" +
                " so your progress has been reset. You can disable this feature\n" +
                " in the options menu (esc).", 6000);

            resetProgress();

        }

    }

    // Create the GUI
    sliderRange(0, 900, 1);
    gui = createGui('Options',10, 10);
    gui.addGlobals(
        'backgroundColor',
        'dayColor',
        'weekColor',
        'monthColor',
        'yearColor',
        'fontColor',
        'spacing',
        'radius',
        'thickness',
        'fontSize',
        'hideHelpText',
        'resetAfter48hoursMissed'
    );

    gui.hide();
    guiHidden = true;

}

function loadOptions() {

    chrome.storage.sync.get({
        backgroundColor: '#191919',
        dayColor: '#FF00FF',
        weekColor: '#00FFFF',
        monthColor: '#FFFF00',
        yearColor: '#4cff7c',
        fontColor: '#FFFFFF',
        spacing: 30,
        thickness: 10,
        radius: 850,
        fontSize: 72,
        dayCount: 0,
        weekCount: 0,
        monthCount: 0,
        yearCount: 0,
        hideHelpText: false,
        resetAfter48hoursMissed: false,
        lastClickTime: 0,
        lastClickDay: 0
    }, function(items) {
        createOptionsGui({
            backgroundColor: items.backgroundColor,
            dayColor: items.dayColor,
            weekColor: items.weekColor,
            monthColor: items.monthColor,
            yearColor: items.yearColor,
            fontColor: items.fontColor,
            spacing: items.spacing,
            thickness: items.thickness,
            radius: items.radius,
            fontSize: items.fontSize,
            dayCount: items.dayCount,
            weekCount: items.weekCount,
            monthCount: items.monthCount,
            yearCount: items.yearCount,
            hideHelpText: items.hideHelpText,
            resetAfter48hoursMissed: items.resetAfter48hoursMissed,
            lastClickDay: items.lastClickDay,
            lastClickTime: items.lastClickTime
        });

    });

}


function saveOptions() {

    // Store our options
    chrome.storage.sync.set({
        dayColor: dayColor,
        weekColor: weekColor,
        monthColor: monthColor,
        yearColor: yearColor,
        backgroundColor: backgroundColor,
        fontColor: fontColor,
        spacing: spacing,
        thickness: thickness,
        radius: radius,
        fontSize: fontSize,
        dayCount: dayCount,
        weekCount: weekCount,
        monthCount: monthCount,
        yearCount: yearCount,
        hideHelpText: hideHelpText,
        resetAfter48hoursMissed: resetAfter48hoursMissed,
        lastClickDay: lastClickDay,
        lastClickTime: lastClickTime
    }, function() {
    });
}


function toggleGui() {
    gui.toggleVisibility();
    guiHidden = !guiHidden;
}

function togglePresetsGui() {
    presetGui.toggleVisibility();
    pGuiHidden = !pGuiHidden;
}

function resetProgress() {

    dayCount = 0;
    weekCount = 0;
    monthCount = 0;
    yearCount = 0;
    lastClickTime = 0;
    lastClickDay = 0;
    saveOptions();

}

function toggleDev() {
    dev = !dev;
}
