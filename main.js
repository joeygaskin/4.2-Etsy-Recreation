var etsyUrl = 'https://api.etsy.com/v2/listings/active.js?api_key=usm4ba26aa5on39m0ri9foie&keywords=star%20wars&includes=Images,Shop';

function fetchJSONP(url, callback) {
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    var script = document.createElement('script');

    window[callbackName] = function(data) {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
    };

    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
}
fetchJSONP(etsyUrl, function(response) {
  console.log(response);
  var items = response.results;
  items.forEach(displayItem);
});

function displayItem(item) {
  var source = document.querySelector('#item-template').innerHTML;

  var template = Handlebars.compile(source);
  var outputHTML = template(item);

  var itemsUl = document.querySelector('.items');
  itemsUl.insertAdjacentHTML('beforeend', outputHTML);
}
