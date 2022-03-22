# CSS The !important Rule

## What is !important?

The `!important` rule in CSS is used to add more importance to a property/value than normal.

In fact, if you use the `!important` rule, it will override ALL previous styling rules for that specific property on that element!

Let us look at an example:

### Example

```
#myid { background-color: blue;}  

.myclass { background-color: gray;}  

p { background-color: red !important;}

```

### Example Explained

In the example above. all three paragraphs will get a red background color, <mark>even though the ID selector and the class selector has a higher specificity. </mark>The `!important` rule overrides the `background-color` property in both cases.



**Tip:** It is good to know about the `!important` rule, you might see it in some CSS source code. <mark>However, do not use it unless you absolutely have to.</mark>


