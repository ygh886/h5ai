const {win} = require('./globals');
const {dom} = require('./dom');
const {each} = require('./lo');
const XHR = win.XMLHttpRequest;

const request = data => {
    return new Promise(resolve => {
        const xhr = new XHR();
        const callback = () => {
            if (xhr.readyState === XHR.DONE) {
                try {
                    resolve(JSON.parse(xhr.responseText));
                } catch (err) {
                    resolve({err, txt: xhr.responseText});
                }
            }
        };

        xhr.open('POST', '?', true);
        xhr.onreadystatechange = callback;
        xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
        xhr.send(JSON.stringify(data));
    });
};

const formRequest = data => {
    const $form = dom('<form method="post" action="?" style="display:none;"/>');

    each(data, (val, key) => {
        dom('<input type="hidden"/>')
            .attr('name', key)
            .attr('value', val)
            .appTo($form);
    });

    $form.appTo('body');
    $form[0].submit();
    $form.rm();
};

module.exports = {
    request,
    formRequest
};
