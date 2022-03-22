# [Find overriding CSS declarations - Chrome Developers](https://developer.chrome.com/docs/devtools/css/overrides/)



Suppose that you just added some CSS to your nav and want to make sure the new styles are being applied properly. When you refresh the page the nav looks the same as before. Something is wrong. The first thing to do is [inspect the element](https://developer.chrome.com/docs/devtools/css/reference#select) and make sure that your new CSS is actually being applied to the nav. If you can see your new CSS in the Styles pane, but your new CSS is crossed out, it means that there's some other CSS that is overriding your new CSS. In CSS terminology this concept is called [Specificity](https://developer.mozilla.org/docs/Web/CSS/Specificity). Chrome DevTools can help you find the old CSS that is causing your new CSS to not be applied.



# [Font Awesome CSS overriding my CSS - Stack Overflow](https://stackoverflow.com/questions/28769297/font-awesome-css-overriding-my-css)

I am working on a page - [click here for link](https://www.agentpro.co.uk/marketing-overview/). The icons are all supposed to have the font size of .side-icon:

```xml
.side-icon{ 
    font-size:28px;
}
```

BUT a style in font-awesome.css is overriding this, no matter where I include the library in the layout.

At the moment I have included the css in the top of a work around sheet (font-awesome-fix.css) using an @import, but I cannot get the 'font: normal normal normal 14px/1 FontAwesome;' to disappear at all.



## Best Answer

Make your selector more specific :

```xml
.side-icon.fa
```

See [here](http://www.w3.org/TR/CSS2/cascade.html#specificity) how the priorities of the selectors are calculated.


