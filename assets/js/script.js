function check() {
    "use strict";

    if (typeof Symbol == "undefined") return false;
    try {
        eval("class Foo {}");
        eval("var bar = (x) => x+1");
    } catch (e) { return false; }

    return true;
}

if (check()) {
    window.onload = function(event) {
        let palletGenerator = new PalletGenerator();
        palletGenerator.refreshOnInputChange();

        $('#inputs-container > input').on("keyup", palletGenerator.refreshOnInputChange);
    };
} else {
   document.getElementById('pallet-view').innerHTML = 'Twoja przeglądarka nie jest wspierana. Skorzystaj z nowoczesnej przeglądarki.'
}