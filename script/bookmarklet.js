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

/* General bookmarklet script:
javascript:(
function(){
  var courses = [];
  var inputs = document.getElementsByName('Callnum');
  var courseIndex = 0;

  for(var i = 0; i < inputs.length && courseIndex < courses.length; i++)
  {
    if(inputs[i].getAttribute('type') == 'text')
    {
      inputs[i].value = courses[courseIndex++];
    }
  }
  document.forms['StuForm'].submit();
})();

CONDENSED:
javascript:(function(){var courses=[];var inputs=document.getElementsByName('Callnum');var courseIndex=0;for(var i=0;i<inputs.length&&courseIndex<courses.length;i++){if(inputs[i].getAttribute('type')=='text'){inputs[i].value=courses[courseIndex++];}}document.forms['StuForm'].submit();})();
*/
