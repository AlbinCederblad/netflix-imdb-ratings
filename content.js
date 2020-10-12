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
    console.log("inside");
    var title = anchorElements[i].innerText;
    var jqueryObject = $(anchorElements[i]);
    var existingIMDBRating = window.sessionStorage.getItem(title);
    if (existingIMDBRating) {
      console.log("already exists", existingIMDBRating);
      var idname = existingIMDBRating.name.replace(/\s/g, '');
      if (!$('#' + idname).length)
        $('<div id="' + idname + '">IMDB: ' + existingIMDBRating.name + '</div>').insertAfter(jqueryObject);
    } else {
      makeRequestAndAddRating(title, jqueryObject);
    }
    title = null;
    jqueryObject = null;
    existingIMDBRating = null;
  }
}

if (window.sessionStorage !== "undefined") {
  var target = document.body;
  // create an observer instance
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === 'childList') {
          console.log('A child node has been added or removed.');
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
      window.sessionStorage.setItem(name, { name: name, imdbRating: imdbRating });
      var idname = name.replace(/\s/g, '');
      idname = encodeURI(idname);
      if (!$('#' + idname).length)
        $('<div id="' + idname + '">IMDB: ' + imdbRating + '</div>').insertAfter($(jqueryObject));
    }
  };
  xhr.send();
}
function makeNameId($string) {
    //Lower case everything
    $string = strtolower($string);
    //Make alphanumeric (removes all other characters)
    $string = preg_replace("/[^a-z0-9_\s-]/", "", $string);
    //Clean up multiple dashes or whitespaces
    $string = preg_replace("/[\s-]+/", " ", $string);
    //Convert whitespaces and underscore to dash
    $string = preg_replace("/[\s_]/", "-", $string);
    return $string;
}
