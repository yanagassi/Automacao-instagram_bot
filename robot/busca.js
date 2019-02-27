var casper = require("casper").create({
    pageSettings: {
        loadImages: true,
        userAgent: 'Mozilla/45.0.2 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.75 Safari/537.36'
    },
    viewportSize: {
        width: 320,
        heigth:500
    }
});
casper.userAgent('Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:25.0) Gecko/20100101 Firefox/25.0');


function init(){   // INICIANDO SISTEMA DE LOGIN.

    casper.start('https://www.instagram.com/accounts/login/', function() {
       // console.log("[NOTICIA] -->  Abrindo site.");
    });
    casper.then(function(){
        // console.log("[NOTICIA] -->  Logando.");
        this.fill('form[class=HmktE]', {
                'username': casper.cli.get(0),
                'password': casper.cli.get(1)
            }, true);
    });
    casper.wait(2000, function() { // carregnado a pagina
        // console.log("[NOTICIA] -->  Printando");
        // this.capture('login.png');
    });
    casper.run(function() {
        this.clear();
    });

    // PEGANDO PRIMEIRA POSTAGEM BASEADA EM URLS.

    casper.then(function(){
        var pessoa = [casper.cli.get(2)]; // Array de pessoas.
        pessoa.forEach(function(pessoa){ // buscando as urls das pessoas.
            casper.then(function(){      
                casper.thenOpen('https://www.instagram.com/'+pessoa, function() {
                    casper.wait(2000, function() { // carregnado a pagina
                        this.mouse.click("._81NM2");
                    });
                    casper.wait(2000,function(){
                        //this.capture("prints/"+Date() + ".png");
                        this.capture("prints/print.png");
                        this.exit();
                    })
                });
            });
        });
    });
}


this.init();


