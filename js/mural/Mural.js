const Mural = (function(_render, Filtro){
    "use strict"

    let cartoes = pegaCartoesUsuario(); 
    
    cartoes.forEach(cartao => {
        preparaCartao(cartao);
    });
    const render = () => _render({cartoes: cartoes, filtro: Filtro.tagsETexto});
    render();
    Filtro.on("filtrado", render)
    
    function pegaCartoesUsuario() {
        let cartoesLocal = JSON.parse(localStorage.getItem(usuario));
        return cartoesLocal ? cartoesLocal.map( cartaoLocal => new Cartao(cartaoLocal.conteudo, cartaoLocal.tipo)): []; 
    };

    function salvaCartoes(){
        localStorage.setItem(usuario, JSON.stringify(
            cartoes.map(cartao => ({conteudo: cartao.conteudo, tipo: cartao.tipo}))
        ));
    }

    function preparaCartao(cartao) {
        const urlsImagens  = Cartao.pegaImagens(cartao);
        urlsImagens.forEach(url => {
            fetch(url).then(resp => {
                caches.open("ceep=imagens").then(cache => {
                    cache.put(url, resp);
                });
            });
        });
        cartao.on("mudanca.**", salvaCartoes);
        cartao.on("remocao", ()=>{
            cartoes = cartoes.slice(0);
            cartoes.splice(cartoes.indexOf(cartao),1);
            salvaCartoes();
            render();
        })
    }

    login.on("login", () => {
        cartoes = pegaCartoesUsuario(); 
        render();
    });

    login.on("logout", () => {
        cartoes = [];
        render();
    });

    function adiciona(cartao){
        if(logado) {
            cartoes.push(cartao)
            salvaCartoes();
            cartao.on("mudanca.**", render)
            preparaCartao(cartao)
            render()
            return true
        } else {
            alert("Voce nao esta logado!");
        }
    }

    return Object.seal({
        adiciona
    })

})(Mural_render, Filtro)
