function fetchMovieNameYear() {
  var cardElements = $(".ptrack-content");
  var anchorElements;
  if (cardElements) {
    anchorElements = cardElements.find("a.slider-refocus");
  } else {
    return;
  }

  if (cardElements === undefined || cardElements[0] === undefined) {
    return;
  }

  window.sessionStorage.clear();

  for (var i = 0; i < anchorElements.length; i++) {
    var title = anchorElements[i].innerText;
    var jqueryObject = $(anchorElements[i]);
    var existingIMDBRating = window.sessionStorage.getItem(title);
    if (existingIMDBRating) {
      var idname = existingIMDBRating.name.replace(/\s/g, '');
      if (!$('#' + idname).length)
        $('<div id="' + idname + '">IMDB: ' + existingIMDBRating.name + '</div>').insertAfter(jqueryObject);
    } else {
      makeRequestAndAddRating(title, jqueryObject);
    }
  }
}

if (window.sessionStorage !== "undefined") {
  var target = document.body;
  // create an observer instance
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === 'childList') {

        }
        else if (mutation.type === 'attributes') {
          window.setTimeout(fetchMovieNameYear, 5);
        }
    });
  });
  // configuration of the observer:
  var config = {
    attributes: true,
    childList: true,
  };
  observer.observe(target, config);
}

function makeRequestAndAddRating(name, jqueryObject) {
  var url = "https://www.omdbapi.com/?apikey=da37df7e&t=" + encodeURI(name);

  var xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.onload = function () {
    if (xhr.status === 200) {
      var apiResponse = JSON.parse(xhr.responseText);
      var imdbRating = apiResponse["imdbRating"];
      var year = apiResponse["Year"];
      window.sessionStorage.setItem(name, { name: name, imdbRating: imdbRating });
      var idname = name.replace(/\s/g, '');
      idname = makeNameId(idname);
      if (!$('#' + idname).length) {
        if (imdbRating)
          $('<div id="' + idname + '">' + year + ', IMDB: ' + imdbRating + '</div>').insertAfter($(jqueryObject));
      }
        
    }
  };
  xhr.send();
}

function makeNameId(string) {
    return string.replace(/(^-\d-|^\d|^-\d|^--)/,'a$1').replace(/[\W]/g, '-');
}
