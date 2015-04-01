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

  var state = {
    correct : 0,
    total : 0
  };

  // list of questions to insert into quiz
  var questions = opts.questions;

  var $quiz = $(this)
    .attr("class", "carousel slide")
    .attr("data-ride", "carousel");

  var height = $quiz.height();

  var $slides = $("<div>")
    .attr("class", "carousel-inner")
    .attr("role", "listbox")
    .appendTo($quiz);

  // unique ID for container to refer to in carousel
  var name = $quiz.attr("id") || "urban_quiz_" + (++quiz_count);

  $quiz.attr('id', name);

  $.each(questions, function(i, question) {

    var $item = $("<div>")
      .attr("class", "item" + (i ? "" : " active"))
      .attr("height", height + "px");


    $("<div>")
      .attr("class", "quiz-question")
      .text(question.prompt)
      .appendTo($item);

    var $answers = $("<div>")
      .attr("class", "quiz-answers")
      .appendTo($item);

    var $img_div;
    if (question.image) {

      $img_div = $('<div>')
        .attr('class', 'question-image')
        .appendTo($item);

      $("<img>")
        .attr("class", "img-responsive img-rounded")
        .attr("src", question.image)
        .appendTo($img_div);

    }

    $.each(question.answers, function(j, answer) {
      var ans_btn = $("<button>")
        .attr('class', 'btn')
        .text(answer)
        .appendTo($answers);

      var correct = (question.correct.index === j);

      // default opts for both outcomes
      var opts = {
        allowOutsideClick : false,
        allowEscapeKey : false,
        confirmButtonText: "Next Question"
      };

      if (correct) {
        opts = $.extend(opts, {
          title: "Nice!",
          text: "Correct! Great Job!",
          type: "success"
        });
      } else {
        opts = $.extend(opts, {
          title: "Oh No!",
          text: (
            "Nope, not quite right! The correct answer was \"" +
            question.answers[question.correct.index] + "\"."
          ),
          type: "error"
        });
      }
      ans_btn.on('click', function() {
        swal(opts, function() { $quiz.carousel('next'); });
      });

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

})(jQuery);