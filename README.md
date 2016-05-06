![](http://res.cloudinary.com/dmj8qtant/image/upload/c_scale,w_600/v1461262068/hrmewamnwo9vij01w212.png)
# albumland

## Tech
Express, EJS, MongoDB, AngularJS (ngAlertify, NgEnter), JQuery, Salvatorre

## Niceties
New Image and New Gallery -> UI integration, Folder-style

### Details
#### Routes
| GET        | POST           | PUT  | DELETE  |
| ---------- |:--------------:| ----:| -------:|
| Home   |   Gallery(Add)   |      |         |
| :username       |  Gallery(Remove)       |      |         |
|        |   Gallery(Rename)   |      |         |
|        |   Image(Add)   |      |         |
|        |   Image(Remove)   |      |         |
#### CSS
 - Folder-style
 - X on New Gallery (rotates from +) and Rename Gallery
 - Hidden ```<textarea>``` that 

#### JS
- Double-click directive ```data-ng-dblclick="editName($index, gallery.name)"```
- ![Ng-enter directive](https://github.com/vtange/albumland/blob/master/public/directives.js)
- Click-outside canceling ```data-ng-blur="cancelName()"```
- Prevent Bubbling of Events (with New Gallery Tab)
```
//index.html ====
	<li id="new-gallery-btn" data-ng-click="newGallForm()">
		<form  data-ng-style="widenForm()" data-ng-submit="newGall()">
            <input data-ng-style="showInput()" data-ng-click="preventClose($event)" 
            
            
//controllers.js ====
/* prevent ng-click from going up to parent elements */
$scope.preventClose = function($event){
	$event.stopPropagation() 
};
```
- Array.indexOf but with criteria
```
Array.prototype.getFirstIndexThat = function(test) {

    for(var i = 0; i < this.length; i++)
    {
        if (test(this[i])){
			return i;
		}
    }
	return null;
}
```
