/*
  Quick quiz bootstrap extension
*/


;(function($) {

// keep track of number of quizes added to page
var quiz_count = 0;

// add jQuery selection method to create
// quiz structure from question json file
// "filename" can be path to question json
// or javascript object
$.fn.quiz = function(filename) {
  if (typeof filename === "string") {
    $.getJSON(filename, render.bind(this));
  } else {
    render.call(this, filename);
  }
};

// create html structure for quiz
// using loaded questions json
function render(opts) {

  // list of questions to insert into quiz
  var questions = opts.questions;

  var $quiz = $(this)
    .attr("class", "carousel slide")
    .attr("data-ride", "carousel");

  var height = $quiz.height();

  var $indicators = $("<ol>")
    .attr("class", "carousel-indicators")
    .appendTo($quiz);

  var $slides = $("<div>")
    .attr("class", "carousel-inner")
    .attr("role", "listbox")
    .appendTo($quiz);

  // unique ID for container to refer to in carousel
  var name = $quiz.attr("id") || "urban_quiz_" + (++quiz_count);

  $quiz.attr('id', name);

  // add question number indicators
  $.each(questions, function(i, question) {
    $("<li>")
      .attr("data-target", "#" + name)
      .attr("data-slide-to", i)
      .attr("class", i ? "" : "active")
      .appendTo($indicators);
  });

  $.each(questions, function(i, question) {

    var $item = $("<div>")
      .attr("class", "item" + (i ? "" : " active"))
      .attr("height", height + "px");

    if (question.image) {
      $item.attr("background-image", "url(\"" + question.image + "\")");
    }

    $("<div>")
      .attr("class", "quiz-question")
      .text(question.prompt)
      .appendTo($item);

    var $answers = $("<div>")
      .attr("class", "quiz-answers")
      .appendTo($item);

    $.each(question.answers, function(j, answer) {
      $("<button>")
        .attr('class', 'btn')
        .text(answer)
        .appendTo($answers);
    });

    $slides.append($item);
  });

  $quiz.carousel({
    "interval" : false
  });

  $(window).on('resize', function() {
    $quiz.find(".item")
      .attr('height', $quiz.height() + "px");
  });

}


/*
  Quiz navigation class
*/
function Quiz(questions) {
  this.questions = questions;
  this.index = 0;
}

Quiz.prototype.next = function() {
  // body...
};

Quiz.prototype.prev = function() {
  // body...
};

Quiz.prototype.correct = function() {
  // body...
};

Quiz.prototype.wrong = function() {
  // body...
};

Quiz.prototype.reset = function() {
  // body...
};


})(jQuery);