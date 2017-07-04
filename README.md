## javery

### Features
- Select html elements by id, class or tag
- Add and Remove class to a tag
- Add and Remove elements on a page
- Traverse DOM using parent and children
- Make AJAX requests

### Implementation

#### $j(argument)

- Returns an instance of DOMNodeCollection with a list of all the elements within the document that match the provided string with CSS selector

- If argument is an HTML element it returns an instance of DOMNodeCollection with a list of all the elements within the document.

- If argument is a function it adds the function to a callback queue so it can be called after document loads.

#### DOMNodeCollection prototypes
  - html(el)
    -  sets or gets innerHTML of 'el' based on the type of el
  - empty
    - Erases content of all nodes  
  - append(child)
    -  Appends the outerHTML of an HTML element, a string, or each element in a javery wrapped collection to the innerHTML of all the nodes  
  - attr(key, value)
    - If key is the only argument provided, it returns the value for that key. If both arguments are provided it sets the value for the provided key for all the nodes
  - addClass(class)
    - Adds class to all the nodes
  - removeClass(class)
    - Removes class from all the nodes
### Future Plans
