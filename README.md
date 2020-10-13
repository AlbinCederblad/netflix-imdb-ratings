# netflix-imdb-ratings
chrome extension that shows imdb ratings when browsing netflix

could use improvements, feel free to improve on it.

# Usage
1.  clone project
2.  go to http://www.omdbapi.com/

      get an API key
      
      go to the content.js file
      
      search for <api_key_here>
      
      replace it with your API key you got in the email
      
3.  go to chrome://extensions/

    "load unpacked" and choose the project folder


# current bugs/todos:

some titles on netflix are incomplete/wrong thus the API will fetch the wrong title

netflix sometimes displays the same title on multiple places when browsing, 
thus only one of them will have the IMDB rating underneath.
