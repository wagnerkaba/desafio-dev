# [Passing form data to another HTML page - Stack Overflow](https://stackoverflow.com/questions/14693758/passing-form-data-to-another-html-page)

I have two HTML pages: form.html and display.html. In form.html, there is a form:

```xml
<form action="display.html">
    <input type="text" name="serialNumber" />
    <input type="submit" value="Submit" />
</form>
```

The form data is sent to display.html. I want to display and use the form data `serialNumber` in display.html, as shown below:

```xml
<body>
    <div id="write">
        <p>The serial number is: </p>
    </div>
    <script>
    function show() {        document.getElementById("write").innerHTML = serialNumber;    }    </script>
</body>
```

So how can I pass the `serialNumber` variable from form.html to display.html so that the above code in display.html will show the serial number and the JavaScript function show() gets the `serialNumber` from the first HTML?

## Answer

If you have no option to use server-side programming, such as PHP, you could use the query string, or GET parameters.

In the form, add a `method="GET"` attribute:

```xml
<form action="display.html" method="GET">
    <input type="text" name="serialNumber" />
    <input type="submit" value="Submit" />
</form>
```

When they submit this form, the user will be directed to an address which includes the `serialNumber` value as a parameter. Something like:

```csharp
http://www.example.com/display.html?serialNumber=XYZ
```

You should then be able to parse the query string - which will contain the `serialNumber` parameter value - from JavaScript, using the `window.location.search` value:

```javascript
// from display.html
document.getElementById("write").innerHTML = window.location.search; // you will have to parse
                                                                     // the query string to extract the
                                                                     // parameter you need
```

The alternative is to store the values in cookies when the form is submit and read them out of the cookies again once the `display.html` page loads.

See also [How to use JavaScript to fill a form on another page](https://stackoverflow.com/questions/12183572/how-to-use-javascript-to-fill-a-form-on-another-page/12183659#12183659).

# [How to use JavaScript to fill a form on another page](https://stackoverflow.com/questions/12183572/how-to-use-javascript-to-fill-a-form-on-another-page)

You're trying to maintain state between pages. Conventionally there are two ways to maintain state:

- Store state in cookies
- Store state in the query string

Either way your first page has to persist state (to either cookies or the query string) and the other page has to - separately - restore the state. You can't use the same script across both pages.

# Example: Using Cookies

**See also: [JavaScript Cookies](https://www.w3schools.com/js/js_cookies.asp)**

Using cookies, the first page would have to write all the form data you'll need on the next page to cookies:

```javascript
<!DOCTYPE html>
<html>
 <head>
     <title>Maintaining State With Cookies</title>
 </head>
 <body>
     <div>
         Setting cookies and redirecting...     </div>
     <script>
         // document.cookie is not a real string
         document.cookie = 'form/title=My Name is Richard; expires=Tue, 29 Aug 2017 12:00:01 UTC'
         document.cookie = 'form/text=I am demoing how to use cookies in JavaScript; expires=Tue, 29 Aug 2017 12:00:01 UT';         setTimeout(function(){             window.location = "./form-cookies.html";         }, 1000);     </script>
 </body>
</html>
```

... and the second page would then read those cookies and populate the form fields with them:

```javascript
<!DOCTYPE html>
<html>
 <head>
     <title>Maintaining State With Cookies</title>
 </head>
 <body>
     <form id="myForm" action="submit.mumps.cgi" method="POST">
         <input type="text" name="title" />
         <textarea name="text"></textarea>
     </form>
     <script>
         var COOKIES = {};         var cookieStr = document.cookie;         cookieStr.split(/; /).forEach(function(keyValuePair) { // not necessarily the best way to parse cookies
             var cookieName = keyValuePair.replace(/=.*$/, ""); // some decoding is probably necessary
             var cookieValue = keyValuePair.replace(/^[^=]*\=/, ""); // some decoding is probably necessary
             COOKIES[cookieName] = cookieValue;         });         document.getElementById("myForm").getElementsByTagName("input")[0].value = COOKIES["form/title"];         document.getElementById("myForm").getElementsByTagName("textarea")[0].value = COOKIES["form/text"];     </script>
 </body>
</html>
```

# Example: Using the Query String

In the case of using the Query String, the first page would just include the query string in the redirect URL, like so:

```javascript
<!DOCTYPE html>
<html>
 <head>
     <title>Maintaining State With The Query String</title>
 </head>
 <body>
     <div>
         Redirecting...     </div>
     <script>
         setTimeout(function(){             window.location = "./form-querystring.html?form/title=My Name is Richard&form/text=I am demoing how to use the query string in JavaScript";         }, 1000);     </script>
 </body>
</html>
```

...while the form would then parse the query string (available in JavaScript via `window.location.search` - prepended with a `?`):

```javascript
<!DOCTYPE html>
<html>
 <head>
     <title>Maintaining State With The Query String</title>
 </head>
 <body>
     <form id="myForm" action="submit.mumps.cgi" method="POST">
         <input type="text" name="title" />
         <textarea name="text"></textarea>
     </form>
     <script>
         var GET = {};         var queryString = window.location.search.replace(/^\?/, '');         queryString.split(/\&/).forEach(function(keyValuePair) {             var paramName = keyValuePair.replace(/=.*$/, ""); // some decoding is probably necessary
             var paramValue = keyValuePair.replace(/^[^=]*\=/, ""); // some decoding is probably necessary
             GET[paramName] = paramValue;         });         document.getElementById("myForm").getElementsByTagName("input")[0].value = GET["form/title"];         document.getElementById("myForm").getElementsByTagName("textarea")[0].value = GET["form/text"];     </script>
 </body>
</html>
```

# Example: With a Fragment Identifier

There's one more option: since state is being maintained strictly on the client side (not on th server side) you could put the information in a fragment identifier (the "hash" part of a URL).

The first script is very similar to the Query String example above: the redirect URL just includes the fragment identifier. I'm going to re-use query string formatting for convenience, but notice the `#` in the place where a `?` used to be:

```javascript
<!DOCTYPE html>
<html>
 <head>
     <title>Maintaining State With The Fragment Identifier</title>
 </head>
 <body>
     <div>
         Redirecting...     </div>
     <script>
         setTimeout(function(){             window.location = "./form-fragmentidentifier.html#form/title=My Name is Richard&form/text=I am demoing how to use the fragment identifier in JavaScript";         }, 1000);     </script>
 </body>
</html>
```

... and then the form has to parse the fragment identifier etc:

```javascript
<!DOCTYPE html>
<html>
 <head>
     <title>Maintaining State With The Fragment Identifier</title>
 </head>
 <body>
     <form id="myForm" action="submit.mumps.cgi" method="POST">
         <input type="text" name="title" />
         <textarea name="text"></textarea>
     </form>
     <script>
         var HASH = {};         var hashString = window.location.hash.replace(/^#/, '');         hashString.split(/\&/).forEach(function(keyValuePair) {             var paramName = keyValuePair.replace(/=.*$/, ""); // some decoding is probably necessary
             var paramValue = keyValuePair.replace(/^[^=]*\=/, ""); // some decoding is probably necessary
             HASH[paramName] = paramValue;         });         document.getElementById("myForm").getElementsByTagName("input")[0].value = HASH["form/title"];         document.getElementById("myForm").getElementsByTagName("textarea")[0].value = HASH["form/text"];     </script>
 </body>
</html>
```

# And if you can't edit the code for the form page

[Try a greasemonkey script.](http://userscripts.org/scripts/show/39313)
