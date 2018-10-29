var fonts = ["Montez","Lobster","Josefin Sans","Shadows Into Light","Pacifico","Amatic SC", "Orbitron", "Rokkitt","Righteous","Dancing Script","Bangers","Chewy","Sigmar One","Architects Daughter","Abril Fatface","Covered By Your Grace","Kaushan Script","Gloria Hallelujah","Satisfy","Lobster Two","Comfortaa","Cinzel","Courgette"];
var string = "";
var select = document.getElementById("select")
for(var a = 0; a < fonts.length ; a++){
    var opt = document.createElement('option');
    opt.value = opt.innerHTML = fonts[a];
    opt.style.fontFamily = fonts[a];
    select.add(opt);
}
function fontChange(){
    var x = document.getElementById("select").selectedIndex;
    var y = document.getElementById("select").options;
    document.body.insertAdjacentHTML("beforeend", "<style> #text{ font-family:'"+y[x].text+"';}"+
        "#select{font-family:'"+y[x].text+"';</style>");
    var tl = new TimelineLite,
        mySplitText = new SplitText("#h1", {type:"words,chars"}),
        chars = mySplitText.chars; //an array of all the divs that wrap each character
    TweenLite.set("#h1", {perspective:400});
}
fontChange();