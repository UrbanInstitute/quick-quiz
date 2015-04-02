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

  // keep track of the state of correct
  // answers to the quiz so far
  var state = {
    correct : 0,
    total : questions.length
  };

  var $quiz = $(this)
    .attr("class", "carousel slide")
    .attr("data-ride", "carousel");

  // unique ID for container to refer to in carousel
  var name = $quiz.attr("id") || "urban_quiz_" + (++quiz_count);

  $quiz.attr('id', name);

  var height = $quiz.height();

  var $slides = $("<div>")
    .attr("class", "carousel-inner")
    .attr("role", "listbox")
    .appendTo($quiz);


  /*
    Create title slide
  */
  var $title_slide = $("<div>")
    .attr("class", "item active")
    .attr("height", height + "px")
    .appendTo($slides);

  $('<h1>')
    .text(opts.title)
    .attr('class', 'quiz-title')
    .appendTo($title_slide);

  var $start_button = $("<div>")
    .attr("class", "quiz-answers")
    .appendTo($title_slide);

  $("<button>")
    .attr('class', 'quiz-button btn')
    .text("Take the quiz!")
    .click(function() {
      $quiz.carousel('next');
    })
    .appendTo($start_button);


  /*
    Add all question slides
  */
  $.each(questions, function(question_index, question) {

    var last_question = (question_index + 1 === state.total);

    var $item = $("<div>")
      .attr("class", "item")
      .attr("height", height + "px")
      .appendTo($slides);

    $("<div>")
      .attr("class", "quiz-question")
      .text(question.prompt)
      .appendTo($item);

    var $answers = $("<div>")
      .attr("class", "quiz-answers")
      .appendTo($item);

    // if the question has an image
    // append a container with the image to the item
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

    // for each possible answer to the question
    // add a button with a click event
    $.each(question.answers, function(answer_index, answer) {

      // create an answer button div
      // and add to the answer container
      var ans_btn = $("<button>")
        .attr('class', 'quiz-button btn')
        .text(answer)
        .appendTo($answers);

      // This question is correct if it's
      // index is the correct index
      var correct = (question.correct.index === answer_index);

      // default opts for both outcomes
      var opts = {
        allowOutsideClick : false,
        allowEscapeKey : false,
        confirmButtonText: "Next Question",
        html : true,
        confirmButtonColor: "#0096D2"
      };

      // set options for correct/incorrect
      // answer dialogue
      if (correct) {
        opts = $.extend(opts, {
          title: "Nice!",
          text: "Correct! Great Job!" + (
            question.correct.text ?
            ("<div class=\"correct-text\">" +
              question.correct.text +
              "</div>"
            ) : ""),
          type: "success"
        });
      } else {
        opts = $.extend(opts, {
          title: "Oh No!",
          text: (
            "Nope, not quite right!<br/><br/>" +
            "The correct answer was \"" +
            question.answers[question.correct.index] + "\"."
          ),
          type: "error"
        });
      }

      if (last_question) {
        opts.confirmButtonText = "View Results!";
      }

      // bind click event to answer button,
      // using specified sweet alert options
      ans_btn.on('click', function() {
        swal(opts, function() {
          // if correct answer is selected,
          // keep track in total
          correct && state.correct++;
          $quiz.carousel('next');
          // if we've reached the final question
          // set the results text
          if (last_question) {
            $results_title.text(resultsText(state));
            $results_ratio.text(
              "You got " +
              Math.round(100*(state.correct/state.total)) +
              "% of the questions correct!"
            );
          }
        });
      });

    });

  });


  // final results slide
  var $results_slide = $("<div>")
    .attr("class", "item")
    .attr("height", height + "px")
    .appendTo($slides);

  var $results_title = $('<h1>')
    .attr('class', 'quiz-title')
    .appendTo($results_slide);

  var $results_ratio = $('<div>')
    .attr('class', 'results-ratio')
    .appendTo($results_slide);

  var $restart_button = $("<div>")
    .attr("class", "quiz-answers")
    .appendTo($results_slide);

  $("<button>")
    .attr('class', 'quiz-button btn')
    .text("Try again?")
    .click(function() {
      state.correct = 0;
      $quiz.carousel(0);
    })
    .appendTo($restart_button);

  $quiz.carousel({
    "interval" : false
  });

  $(window).on('resize', function() {
    $quiz.find(".item")
      .attr('height', $quiz.height() + "px");
  });

}

function resultsText(state) {

  var ratio = state.correct / state.total;
  var text;

  switch (true) {
    case (ratio === 1):
      text = "Wow you got a perfect score!";
      break;
    case (ratio > 0.9):
      text = "Awesome job, you got most of them right!";
      break;
    case (ratio > 0.60):
      text = "Pretty good, we'll say that's a pass!";
      break;
    case (ratio > 0.5):
      text = "Well, at least you got half of them right...";
      break;
    case (ratio < 0.5 && ratio !== 0):
      text = "Looks like this was a tough one, better luck next time!";
      break;
    case (ratio === 0):
      text = "Yikes, none correct. Well, maybe it was rigged?";
      break;
  }
  return text;

}


})(jQuery);