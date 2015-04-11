// about tag
$(function(){
  var tagInput = $('#tag-input');
  var tagArea = $('.tag-area');

  createTags(tagInput.val())
  tagInput.keyup(function(){
    createTags($(this).val())
  }).change(function(){
    createTags($(this).val())
  });

  function createTags(tagContent) {
    tagArea.html('');
    var tags = $.trim(tagContent).split(/\s+/);
    for(var i in tags) {
      tagArea.append($("<span/>").addClass('tag-info').html(
        $("<i/>").addClass("glyphicon glyphicon-tag")).append(" " + tags[i]));
    }
  }

  var option={
      target:'.suMarkdown',
      preview:true
  };
  SuMarkdown(option);
});

