# core-system-themes/jquery-scroller

jQuery based smooth scrolling plugin.

## Summary

- [Installation & Dependencies](#installation)
- [Usage](#usage)
- [Options](#options)
- [Events](#events)

## Installation

__Bower__

```
$ bower install core-jquery-scroller
```

__Manual__

Download project from `github` repository

__Dependencies__

```
"dependencies": {
    "jquery": "^3.1.0",
    "jquery-ui": "^1.12.0"
  }
```

> Installed via `bower` file

## Usage

```html
<!-- Include after jQuery and jQuery UI files -->
<script src="dist/jquery.scroller.min.js" type="text/javascript"></script>
```

__Basic usage__

```javascript
$('body').scroller();
```

__Usage with options__

```javascript
$('body').scroller({
    option: 'value'
});
```

__Events usage__

```javascript
// Before scroll event
$('body').on('scroller:beforeScroll', function(){

});
// After scroll event
$('body').on('scroller:afterScroll', function(){

});
```

## Options

__Main configuration__

| Option | Type | Default | Description |
| ------ | ---- | ------- | ----------- |
| element | string | 'body' | scroller element selector |
| duration | int | 750 | scroll animation duration |
| easing | string | null | jQuery UI easing plugin |
| vertical | bool | false | turns on/off vertical scrolling |
| offset | int | 0 | Scrolling effect offset |
| delay | int | 0 | Scrolling effect start delay |
| lengthDelayLimit | int | 2.5 | max viewport length time delay calculation limit |
| lengthDelay | bool | true | turns on/off viewport length time delay calculation |
| pushState | bool | false | push anchor ID to URL |
| pushHistory | bool | false | if `true` use `pushState()` method for anchor URL injection. if `false` use `replaceState()` method |
| callback | function | null | Scroll animation callback closure inject |
| topButton | bool | false | turns on/off top button visibility |
| button | object | - | Scroll top button configuration object | 

__Button configuration object__
           
| Option | Type | Default | Description |
| ------ | ---- | ------- | ----------- |
| id | string | 'scroller-top-button' | `id=""` HTML attribute value for scroll top button |
| class | string | null | `class=""` HTML attribute value for scroll top button |
| hide | int | 0 | scrolling position where scroll top button is showed |
| fade | int | 0 | fade in/out time for showing/hiding scroll top button |
| element | string | 'body' | element where is top scroll button append |
| content | string | 'TOP' | button element content |
| disableLayout | bool | false | disable scroll top button default layout |
| bottom | int | 10 | scroll top button bottom viewport position |
| right | int | 10 | scroll top button right viewport position |

## Events

> Scroller callback closure is called when scroll animation is complete and before `afterScroll` event is fired.

| Event | Params | Description |
| ------ | ------ | ----------- |
| scroller:beforeScroll | event | This event fires before scroll action is called |
| scroller:afterScroll | event | This event fires after scroll animation callback ends |