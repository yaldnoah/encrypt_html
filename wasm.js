'use strict';
const WASM_URL = 'http://10.0.12.226:6868/encode_tiny.wasm';

function init() {
    const go = new Go();
    if ('instantiateStreaming' in WebAssembly) {
        WebAssembly.instantiateStreaming(fetch(WASM_URL), go.importObject).then(function (obj) {
            go.run(obj.instance);
        })
    } else {
        fetch(WASM_URL).then(resp =>
            resp.arrayBuffer()
        ).then(bytes =>
            WebAssembly.instantiate(bytes, go.importObject).then(function (obj) {
                go.run( obj.instance);
            })
        )
    }
}
init();