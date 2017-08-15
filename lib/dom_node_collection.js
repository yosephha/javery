class DOMNodeCollection {
  constructor(elements){
    this.elements = elements;
  }

  html(str){
    if(!str){
      return this.elements[0].innerHTML;
    } else {
      for (let i = 0; i < this.elements.length; i++) {
        this.elements[i].innerHTML = str;
      }
    }
  }

  empty(){
    for (var i = 0; i < this.elements.length; i++) {
      this.elements[i].innerHTML = '';
    }
  }

  append(children) {
    if (this.elements.length === 0) return;

    if (typeof children === 'object' &&
        !(children instanceof DomNodeCollection)) {
      children = $l(children);
    }

    if (typeof children === "string") {
      this.elements.forEach(node => node.innerHTML += children);
    } else if (children instanceof DomNodeCollection) {
      this.elements.forEach(node => {
        children.elements.forEach(childNode => {
          node.appendChild(childNode.cloneNode(true))
        });
      })
    }
  }

  attr(attributeName, value){
    if (value === undefined){
      return this.elements[0].getAttribute(attributeName);
    } else {
      for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].setAttribute(attributeName, value);
      }
    }
  }

  addClass(newClass) {
    this.elements.forEach(node => node.classList.add(newClass));
  }

  removeClass(cName){
    this.elements.forEach(node => node.classList.remove(cName));
  }

  children(){
    let newarray = [];
    for (let i = 0; i < this.elements.length; i++) {
      const childs = Array.from(this.elements[i].children);
      newarray = newarray.concat(childs);
    }

    return new DOMNodeCollection(newarray);
  }

  parent(){
    var newarray = [];
    for (var i = 0; i < this.elements.length; i++) {
      if(newarray.includes(this.elements[i].parentNode)) continue;
        newarray.push(this.elements[i].parentNode);
    }
    return new DOMNodeCollection(newarray);
  }

  find(element){
    let newarray = [];

    for (var i = 0; i < this.elements.length; i++) {
      let arrayfied = Array.from(this.elements[i].querySelectorAll(element));
      newarray = newarray.concat(arrayfied);
    }
    return new DOMNodeCollection(newarray);
  }

  on(eventName, callback) {
  this.elements.forEach(node => {
    node.addEventListener(eventName, callback);
    const eventKey = `jqliteEvents-${eventName}`;
    if (typeof node[eventKey] === "undefined") {
      node[eventKey] = [];
    }
    node[eventKey].push(callback);
  });
}

off(eventName) {
  this.elements.forEach(node => {
    const eventKey = `jqliteEvents-${eventName}`;
    if (node[eventKey]) {
      node[eventKey].forEach(callback => {
        node.removeEventListener(eventName, callback);
      });
    }
    node[eventKey] = [];
  });
}


}

module.exports = DOMNodeCollection;
