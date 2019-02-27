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


function getLinks(containText) {
    var links = document.querySelectorAll('a');
    return Array.prototype.map.call(links, function(e) {
        return e.getAttribute('href');
    }).filter(function(e) {
        return e.indexOf(containText) !== -1;
    });
}

function liked(url){     // DANDO LIKE EM FOTOS
    casper.then(function(){
        casper.thenOpen(url, function() {
        });
        casper.wait(5000, function() {
            this.echo("Click: "+ this.getCurrentUrl());
            this.mouse.click(".fr66n");
            this.capture("prints/"+Date() + ".png");
        });
        this.clear();
    });
    
}


function seguir(url){

    casper.then(function(){
        casper.thenOpen(url, function() {
        });
        casper.wait(2000, function() {
            //this.echo("[NOTICIA] --> Seguindo : "+ this.getCurrentUrl());
            this.echo(JSON.stringify({
                status:'sucess',
                url:this.getCurrentUrl(),
            }));
            this.mouse.click(".Y2E37");
            this.capture("prints/"+Date() + ".png");
            this.clear();
            this.exit();
        });
    });
    
    
}


function login(){   // INICIANDO SISTEMA DE LOGIN.

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
                if(false){
                    casper.thenOpen('https://www.instagram.com/'+pessoa, function() {
                    });
                    casper.wait(5000, function() {
                        var data = this.getElementsInfo("a");
                        for(var i=0;i<data.length;i++){
                            var url = data[i]["attributes"].href;
                            if(!url.indexOf("/p/")){
                                url = 'https://www.instagram.com'+url;
                                liker.push(url);
                                liked(url);
                               /// seguir(url);
                                break;
                            }
                        }
                    });
                }else{
                    seguir('https://www.instagram.com/'+pessoa);
                }
            });
        });
    });
}


this.login();
