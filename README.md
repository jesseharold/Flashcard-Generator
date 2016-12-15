# Flashcard-Generator
a backend API that generates and stores user-defined flashcards, and a front-end web application that displays them

## To Do List
 * fix undefined before cloze card
 * give a visual cue for where to start the cloze
 * make it so it can take more than one hidden portion
 -maybe-
 * create front end that can take images as front of basic card


## Unit 11 Assignment

### Overview

In this week's assignment, you will create the backend for a basic flashcard application.

The backend will essentially constitute an API that allows users to create two types of flashcards.

1. **Basic** flashcards, which have a front (*"Who was the first president of the United States?"*), and a back (*"George Washington"*).

2. **Cloze-Deleted** flashcards, which present *partial* text (*"... was the first president of the United States."*), and the full text when the user requests it (*"George Washington was the first president of the United States."*)

As your application will not have a front end, you only need to determine an efficient way to store cloze-deleted cards&mdash;you don't have to solve the problem of displaying them. You are free to decide how you'd like to implement this. One might represent the above flashcard thus:

```
{
  cloze : "{{c1::George Washington}} was the first president of the United States."
}
```

...And expect the front-end to simply hide any part of the string wrapped in `{{c1::...}}`. This works, but there are better ways to do it&mdash;try to think of one.

## Instructions

* Create a new GitHub repository, named `Flashcard-Generator` or something similar. Clone this to your local drive.

* Create a `BasicFlashcard` constructor. It should accept `front` and `back` arguments.

* Create a `ClozeFlashcard` constructor. It should accept `text` and `cloze` arguments.

    * `ClozeFlashcard` should have a method that returns *only* the cloze-deleted portion of the text.

    * You are free to experiment with the other details of your implementation, but you must store at least one property, and equip cloze-deleted flashcards with at least one additional method.

* Your application should provide a way for users to save any flashcards they might create to a text file.

    * What data should you save?

    * Where might it make sense to add a method for saving flashcards?

## Bonus
    * Create a frontend that uses your flashcard data. This front-end can be either a command-line prompt or a browser-based application.

    * When passed a basic flashcard, this program should present the front text; wait for user input; and then display the back text.

    * When passed a cloze-deleted flashcard, this program should present the partial text; wait for user input; and then display the full text.

## Copyright

Coding Boot Camp &copy; 2016. All Rights Reserved.