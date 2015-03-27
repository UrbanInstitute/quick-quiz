/*
  Quick quiz bootstrap extension
*/


(function($) {


$.fn.quiz = function(question_filename) {
  $.getJSON(question_filename, render.bind(this));
}


var quiz_count = 0;

function render(opts) {

  // list of questions to insert into quiz
  var questions = opts.questions;

  var quiz = $(this)
    .attr("class", "carousel slide")
    .attr("data-ride", "carousel");

  var indicators = $("<ol>")
    .attr("class", "carousel-indicators")
    .appendTo(quiz);

  var slides = $("<div>")
    .attr("class", "carousel-inner")
    .attr("role", "list-box")
    .appendTo(quiz);

  quiz.append(control("left", "prev", "Previous"))
      .append(control("right", "next", "Next"));

  var name = quiz.attr("id");

  // add question number indicators
  $.each(questions, function(i, q) {
    indicators.append(
      $("<li>")
        .attr("data-target", "#" + name)
        .attr("data-slide-to", i)
        .attr("class", i ? "" : "active")
    );
  });

  $.each(questions, function(i, q) {

    var item = $("<div>").attr("class", "item" + (i ? "" : " active"));

    if (q.image) {
      item.append($("<img>").attr("src", q.image));
    }

    item.append(
      $("<div>").attr("class", "carousel-caption")
        .text(q.prompt)
    );

    slides.append(item);
  })

  quiz.carousel({
    "interval" : false
  });

}


function control(side, slide, text) {

  var cntrl = $("<a>")
    .attr("class", side + " carousel-control")
    .attr("href", name)
    .attr("role", "button")
    .attr("data-slide", slide);

  cntrl.append(
    $("<span>")
      .attr("class", "glyphicon glyphicon-chevron-" + side)
      .attr("aria-hidden", "true")
  );

  cntrl.append(
    $("<span>")
      .attr("class", "sr-only")
      .text(text)
  );

  return cntrl;
}




})(jQuery);