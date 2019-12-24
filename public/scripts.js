window.addEventListener("load", function () {
    function sendData() {
        const XHR = new XMLHttpRequest();
        const FORM_DATA = new FormData(form);
        const QUERY_PARAMS = new URLSearchParams(FORM_DATA).toString()

        XHR.onreadystatechange = function () {
            if (XHR.readyState === 4) {
                if (XHR.status === 200) {
                    showMessage('Data sent!');
                    document.getElementById("user-state").innerHTML = XHR.responseText;
                } else {
                    showMessage('Oops! Something went wrong, error: ' + XHR.statusText);
                }
            }
        };
        
        XHR.open("GET", `/collect?${QUERY_PARAMS}`);
        XHR.send();
    }

    let form = document.getElementById("details-form");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        sendData();
    });
});

function showMessage(msg) {
    let message_placeholder = document.getElementById("message");
    message_placeholder.innerHTML = msg;
    setTimeout(function () {
        message_placeholder.innerHTML = '';
    }, 3000);
}