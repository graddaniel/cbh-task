# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

I have renamed variables and function names to reflect what they actually do/store. I have extracted common logic (hashing), to avoid code duplication. I have put the constants at the beginning of the file, not to pollute the logic with such definitions. I have flattened the code, which makes it easier to understand. I have reordered the code to return early if certain conditions are satisfied to avoid unneccesary code execution, or to cover "unhappy paths". I have got rid of variables overwriting to avoid confusion about what they contain/represent. I've used ternary operator to flatten and simplify conditions resulting in assignment.
Finally I would also like to refactor the unit tests to fit the new code (maybe that's not neccesary), but I don't have anough time.
