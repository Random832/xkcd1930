function pick(items) {
    return items[Math.floor(Math.random()*items.length)];
}

function s() {
    var x = Array.from(arguments);
    x.mode = "s";
    return x;
}

function r() {
    var x = Array.from(arguments);
    x.mode = "r";
    return x;
}

mainstuff = s("Did you know that",
    r(s("the", r("fall", "spring"), "equinox"),
        s("the", r("winter", "summer"), r("solstice", "olympics")),
        s("the", r("earliest", "latest"), r("sunrise", "sunset")),
        s("daylight", r("saving", "savings"), "time"),
        s("leap", r("day", "year")),
        s("the", r("harvest", "blood", "super"), "moon"),
        "easter", "Toyota truck month", "shark week"),
    r(s("happens", r("earlier", "later", "at the wrong time"), "every year"),
        s("drifts out of sync with the",
            r("sun", "moon", "zodiac", s(r("Gregorian", "Mayan", "lunar", "iPhone"), "calendar"))),
        s("might", r("not happen", "happen twice"), "this year")),
    "because of",
    r(s("time zone legislation in", r("Indiana", "Arizona", "Russia")),
        s("a decree by the pope in the 1500s"),
        s(r("precession", "liberation", "nutation", "libation", "eccentricity", "obliquity"),
            "of the",
            r("moon", "sun", "earth's axis", "equator", "prime meridian", "international date line", "Mason-Dixon line")),
        "magnetic field reversal",
        s("an arbitrary decision by", r("Benjamin Franklin", "Isaac Newton", "FDR"))),
    "? Apparently",
    r("it causes a predictable increase in car accidents.",
        "that's why we have leap seconds.",
        "scientists are really worried.",
        s("it was even more extreme during the", r("bronze age.", "ice age.", "Cretaceous.", "1900s.")),
        s("there's a proposal to fix it, but it",
            r("will never happen.", "actually makes things worse.", "is stalled in Congress.", "might be unconstitutional.")),
        "it's getting worse and no one knows why."))

altstuff = s(
    "While it may seem like trivia, it",
    r("causes huge headaches for software developers",
        "is taken advantage of by high-speed traders",
        "triggered the 2003 Northeast Blackout",
        "has to be corrected for by GPS satellites",
        "is now recognized as a major cause of World War I"),
    ".");

function doit(stuff) {
    if(!stuff) stuff = mainstuff
    let buf = []
    function out() {
        for(let arg of arguments) {
            if(typeof(arg) === "string") {
                buf[buf.length] = arg;
            } else if(arg.mode == "r") {
                out(pick(arg));
            } else { /* mode == "s" */
                out.apply(undefined, arg);
            }
        }
    }

    buf.length = 0;
    out(stuff);
    let val = buf.join(" ")
    buf.length = 0;
    return val.replace(/ ([.!?])/g, "$1")
}

function onclick_html() {
    let val = doit();
    let alt = doit(altstuff);
    let atxt = document.getElementById("atxt");
    let txt = document.getElementById("txt");
    console.log(val);
    console.log(alt);
    txt.value = val;
    atxt.value = alt;
}

function wrap(str) {
    /* TODO pass length */
    return (str+" ").replace(/(.{1,65})\s/g, "$1\n");
}

function main_node() {
    console.log(wrap(doit()));
    console.log(wrap(doit(altstuff)));
}

function main() {
    let is_html;
    try {
        document;
        is_html = true;
    } catch(e) {
        is_html = false;
    }
    if(is_html) {
        /* We're in an HTML document, set up the clicker */
        let but = document.getElementById("but");
        but.onclick = onclick_html;
        onclick_html();
    } else {
        main_node();
    }
}
/* TODO figure out how to be a node module */
main();
