# [Make header and footer files to be included in multiple html pages - Stack Overflow](https://stackoverflow.com/questions/18712338/make-header-and-footer-files-to-be-included-in-multiple-html-pages)

I want to create common header and footer pages that are included on several html pages.

I'd like to use javascript. Is there a way to do this using only html and JavaScript?

I want to load a header and footer page within another html page.



## Best Answer

You can accomplish this with [jquery](http://api.jquery.com/load/).

Place this code in `index.html`

```xml
<html>
<head>
<title></title>
<script
    src="https://code.jquery.com/jquery-3.3.1.js"
    integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60="
    crossorigin="anonymous">
</script>
<script> $(function(){  $("#header").load("header.html");   $("#footer").load("footer.html"); });
</script> 
</head>
<body>
<div id="header"></div>
<!--Remaining section-->
<div id="footer"></div>
</body>
</html>
```

and put this code in `header.html` and `footer.html`, at the same location as `index.html`

```xml
<a href="http://www.google.com">click here for google</a>
```

Now, when you visit `index.html`, you should be able to click the link tags.


