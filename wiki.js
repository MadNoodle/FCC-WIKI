//global variables
var baseURL = 'https://en.wikipedia.org/w/api.php?action=query&prop=extracts|pageimages&format=json&exsentences=1&exlimit=max&exintro=&explaintext=&exsectionformat=plain&generator=search&gsrnamespace=0&callback=?&gsrsearch=';
var results;

// fetching data via ajax call
function fetchData(query) {
  $('.wiki-img').addClass('spin-away');
  $('.searchContainer').addClass('searchNewLoc');
  return $.ajax({
    url: baseURL + encodeURIComponent(query),
    dataType: 'json',
    type: 'GET',
    header: {
      'Api-User-Agent': 'mjanneau@gmail.com',
    },
    success: function(data) {
      results = data;
      console.log(data);
    }
  });
}

function displayResult() {
  $('#result').html('');
  var pagelist = Object.keys(results.query.pages);
  var res = pagelist.map(function(key) {
    return results.query.pages[key];
    });
    res.sort(function(a, b) {
          return a.index - b.index;
  });

  res.forEach(function(item) {
    var output = '<hr class="divider"><a target="_blank" href="http://en.wikipedia.org/?curid=' + item.pageid + '">';
    output += '<h2>//' + item.title + '</h2></a>';
    output += '<p>' + item.extract + '</p>';
    $('#result').append('<div class="resultBox">'+ output + '</div><hr class="divider">');
  });

}

$(document).ready(function() {
  $('#search-input').keyup(function(key) {
    if (key.keyCode == 13) {
      var xhr = fetchData($(this).val());
      $.when(xhr).done(function(data) {
        console.log(data);
        displayResult();
      });
    }
  });
});

//TODO: (3)setup autocomplete
