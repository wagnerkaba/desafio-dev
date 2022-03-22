# [Use a DIV as a background for another element - Stack Overflow](https://stackoverflow.com/questions/25970787/use-a-div-as-a-background-for-another-element)



If I have a `div` that contains images and text, is it possible to use this `div`'s content as a background for, let's say, a `section` ?



Here I made an example with 2 divs:

- .content which contains everything you need in frontend
- .background - with text, images and everything else in background

To overwrap one div on another (make an overlay) you have to put them into same element, in this example it's #wrapper div. Put position: relative and width/height for wrapper; position: relative also should be set for your content div and position: absolute; top: 0; left: 0; for your background.

The final step is to setup z-index. Element containing a bigger value in z-index is rendered above elements with smaller z-index value. In other words you should set z-index for background div smaller then for content div.

**Final HTML:**

```xml
<div id="wrapper">
    <div class="content">    
        <p>This text is in frontend</p>
    </div>
    <div class="background">
        <p>Background text</p>
        <img src="http://nuclearpixel.com/content/icons/2010-02-09_stellar_icons_from_space_from_2005/earth_128.png" alt="background" />
        <img src="http://upload.wikimedia.org/wikipedia/en/0/0c/IrfanView_Logo.png" alt="background 2" />

    </div>
</div>
```

**Final CSS:**

```xml
#wrapper{
    position: relative;
    width: 200px;
    height: 200px;
}

.content{
    color: #FFFFFF;
    font-size: 26px;
    font-weight: bold;
    text-shadow: -1px -1px 1px #000, 1px 1px 1px #000;
    position: relative;
    z-index: 100;
}

.background{
    color: #999999;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -100;
}
```

**View live example:**

[Edit fiddle - JSFiddle - Code Playground](http://jsfiddle.net/1fevoyze/)


