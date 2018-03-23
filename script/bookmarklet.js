/* General bookmarklet script:
javascript:(
function(){
  var courses = [];
  var inputs = document.getElementsByName('Callnum'); //contains all 10 Add class inputs but also hidden callnums for classes already registered
  var courseIndex = 0;

  for(var i = 0; i < inputs.length && courseIndex < courses.length; i++)
  {
    if(inputs[i].getAttribute('type') == 'text') //need to make sure it's a text input and not a hidden callnum field
    {
      inputs[i].value = courses[courseIndex++];
    }
  }
  document.forms['StuForm'].submit(); //optional line to submit form once call numbers are copied
})();

Condensed into one line:
javascript:(function(){var courses=[];var inputs=document.getElementsByName('Callnum');var courseIndex=0;for(var i=0;i<inputs.length&&courseIndex<courses.length;i++){if(inputs[i].getAttribute('type')=='text'){inputs[i].value=courses[courseIndex++];}}document.forms['StuForm'].submit();})();
*/

function createBookmarklet(callNumList, autoSubmit)
{
  var str = "javascript:(function(){var courses=[";
  str += callNumList.toString();
  str += "];var inputs=document.getElementsByName('Callnum');var courseIndex=0;for(var i=0;i<inputs.length&&courseIndex<courses.length;i++){if(inputs[i].getAttribute('type')=='text'){inputs[i].value=courses[courseIndex++];}}";
  if(autoSubmit)
    str += "document.forms['StuForm'].submit();";
  str += "})();";
  return str
}

function parseURL(url)
{
  var callNumList = [];
  var urlParams = url.split('#')[1]; //get second half of url
  var termList = urlParams.split('&'); //split into separate terms (scheduler lets you add courses from different terms)
  termList.forEach(function(term) {
    var callNums = term.substr(6).split(','); //remove first 6 characters (ex: '2017S=') then split into each callnum
    callNumList = callNumList.concat(callNums); //concat array to total callNumList array
  });
  return callNumList;
}

function validateURL(url)
{
  return url.includes("web.stevens.edu/scheduler");
}

function generate()
{
  var bookmarkletText = createBookmarklet(parseURL($('#scheduleLink').val()), $('autosubmit').is(':checked'));

  $('#bookmarkletResult').removeClass('hidden');
  $('#bookmarklet').attr('href',bookmarkletText);
}

function setUrlError(error)
{
  if(error)
  {
    $('#scheduleLinkDiv').addClass('has-error');
    $('#scheduleLinkError').removeClass('hidden');
  }
  else
  {
    $('#scheduleLinkDiv').removeClass('has-error');
    $('#scheduleLinkError').addClass('hidden');
  }
}
