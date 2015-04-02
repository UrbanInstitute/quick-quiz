# Quick quiz generator

## Example

See an [example quiz](http://urbaninstitute.github.io/quick-quiz/)

## Usage

First, create a quiz text file using the following format (named `unicorns.quiz` for example)

```
// example quiz text
// @bsouthga
// <- (this is a comment and will be ignored)

// this is the url for the parent
url: http://urbaninstitute.github.io/quick-quiz/

// this is the title of the quiz
# How well do you know real creatures?

// this is an example question.
// the number signifies the question order,
// meaning questions can be placed in random order
// within the file
1) Which of the following is the most real?

  // these are answers, a correct answer
  // is indicated by a "*"
  - Loch Ness Monster
  - Centaur
  * Unicorn
  - Mermaid

  // this is a reponse text paragraph
  // it will be displayed upon answering
  // the question correctly
  The unicorn is a mythical creature. Strong, wild, and fierce, it was impossible to tame by man. Plinie, the Roman naturalist records it as "a very ferocious beast, similar in the rest of its body to a horse, with the head of a deer, the feet of an elephant, the tail of a boar, a deep, bellowing voice, and a single black horn, two cubits in length, standing out in the middle of its forehead."


2) Unicorns are real?
  * True
  - False

3) What shade of white is this unicorn?
  - Marshmallow
  * Moon glow
  - Egg shell

  // this image will appear along with
  // the question pompt
  (image) unicorn.jpg
```

Then, parse it into a json file using `quiz_questions.py`...
```shell
python quiz_questions.py unicorns.quiz
```

This produces a formatted json file like this...

```javascript
{
  "questions": [
    {
      "answers": [
        "Loch Ness Monster",
        "Centaur",
        "Unicorn",
        "Mermaid"
      ],
      "correct": {
        "index": 2,
        "text": "The unicorn is a mythical creature. Strong, wild, and fierce, it was impossible to tame by man. Plinie, the Roman naturalist records it as \"a very ferocious beast, similar in the rest of its body to a horse, with the head of a deer, the feet of an elephant, the tail of a boar, a deep, bellowing voice, and a single black horn, two cubits in length, standing out in the middle of its forehead.\""
      },
      "number": 1,
      "prompt": "Which of the following is the most real?"
    },
    {
      "answers": [
        "True",
        "False"
      ],
      "correct": {
        "index": 0
      },
      "number": 2,
      "prompt": "Unicorns are real?"
    },
    {
      "answers": [
        "Marshmallow",
        "Moon glow",
        "Egg shell"
      ],
      "correct": {
        "index": 1
      },
      "image": "unicorn.jpg",
      "number": 3,
      "prompt": "What shade of white is this unicorn?"
    }
  ],
  "title": "How well do you know real creatures?",
  "url": "http://urbaninstitute.github.io/quick-quiz/"
}
```

Finally, create a div to contain your quiz and include bootstrap and `quiz.js`


```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Quiz Example</title>
  <link href="http://fonts.googleapis.com/css?family=Lato:300,400" rel="stylesheet" type="text/css">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
  <link rel="stylesheet" type="text/css" href="sweet-alert.css">
  <link rel="stylesheet" href="quiz.css">
  <style>
    #quiz {
      height: 600px;
      display: block;
    }
  </style>
</head>
<body>
  <div class="container-fluid">
    <div id="quiz"></div>
  </div>
  <script src="https://code.jquery.com/jquery-1.11.2.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
  <script src="sweet-alert.min.js"></script>
  <script src="quiz.js"></script>
  <script>
    $(function() {
      $('#quiz').quiz("unicorns.json");
    });
  </script>
</body>
</html>
```
