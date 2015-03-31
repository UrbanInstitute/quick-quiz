# Quick quiz generator

First, create an object or json file containing the questions.

```javascript
{
  "questions" : [
    {
      "prompt" : "Which of the following is the most real?",
      "answers" : [
        "Loch Ness Monster",
        "Centaur",
        "Unicorn",
        "Mermaid"
      ],
      "correct" : {
        "index" : 2,
        "text" : "The unicorn is a mythical creature. Strong, wild, and fierce, it was impossible to tame by man. Plinie, the Roman naturalist records it as \"a very ferocious beast, similar in the rest of its body to a horse, with the head of a deer, the feet of an elephant, the tail of a boar, a deep, bellowing voice, and a single black horn, two cubits in length, standing out in the middle of its forehead.\""
      }
    },
    {
      "prompt" : "What shade of white is this unicorn?",
      "image" : "unicorn.jpg",
      "answers" : [
        "Marshmallow",
        "Moon glow",
        "Egg shell"
      ],
      "correct" : {
        "index" : 1
      }
    }
  ]
}
```

Next, create a div to contain your quiz and include bootstrap and `quiz.js`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Quiz Example</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
  <link rel="stylesheet" href="quiz.css">
  <style>
    #quiz {
      height: 600px;
      display: block;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="col-md-12">
        <div id="quiz"></div>
    </div>
  </div>
  <script src="https://code.jquery.com/jquery-1.11.2.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
  <script src="quiz.js"></script>
</body>
</html>
```

Finally, initialize the quiz in your javascript

```html
<script>
  $(function() {
    // or, $("#quiz").quiz(questions), where questions is an object
    $('#quiz').quiz("unicorns.json");
  });
</script>
```