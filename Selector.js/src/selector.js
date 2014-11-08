function Node(id_name, class_name, tag, content) {
    this.id = id_name;
    this.className = class_name;
    this.localName = tag;
    this.innerHTML = content;

}

var traverseDomAndCollectElements = function(matchFunc, startEl) {
  var resultSet = [];
  var children = [];
  
  if (typeof startEl === "undefined") {
    startEl = document.body;
  }
  // your code here
  // traverse the DOM tree and collect matching elements in resultSet
  // use matchFunc to identify matching elements
  var collect = function(start) {
    if (start.childNodes.length === 0) {
      var node = new Node(start.id, start.className, start.localName, start.innerHTML);
      children.push(node);
    }
    else {
      var node = new Node(start.id, start.className, start.localName, start.innerHTML);
      children.push(node);
      for (var i = 0; i < start.childNodes.length; i++) {
        collect(start.childNodes[i]);
      }

    }
  }

  collect(startEl);

  children.forEach(function(child) {
    if (matchFunc(child) === true) {
      resultSet.push(child);
    }
  });
  // for(var i = 0; i < children.length; i++) {
  //   if (matchFunc(children[i]) === true){
  //     resultSet.push(children[i]);
  //   }
  // }

  return resultSet;
};


// detect and return the type of selector
// return one of these types: id, class, tag.class, tag
//
var selectorTypeMatcher = function(selector) {
  // your code here
  var tags = ["h2","head", "body", "title", "h1", "div", "p", "img"];
  if (selector[0] === "#") {
      return "id";
  }
  else if (selector[0] === ".") {
      return "class";
  }
  else {
    var selector_split = selector.split(".");
    for (var i = 0; i < tags.length; i++) {
      if (tags[i] === selector_split[0]) {
        if (selector_split.length > 1) {
          return "tag.class";
        }
        else {
          return "tag";
        }
      }
    }
  }
};

var matchFunctionMaker = function(selector) {
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;
  if (selectorType === "id") {

    // check if "#selector" === <tag id = "selector">
    // define matchFunction for id
    selector = selector.slice(1);
    matchFunction = function(sample) {

      sample = sample.id;
      if (sample === selector){
        return true;
      }
      else {
        return false;
      }
    }

  } else if (selectorType === "class") {
    // define matchFunction for class
    selector = selector.slice(1);

    matchFunction = function(sample) {
      sample = sample.className;

      
      if (sample == undefined){
        if (sample === selector) {
          return true;
        }
        else {
          return false;
        }
      }
      else {
        var sample_list = sample.split(" ");
       for (var i = 0; i < sample_list.length; i++) {
          if (sample_list[i] === selector) {
            return true;
          }
        }
        return false;
      }
    }
  } else if (selectorType === "tag.class") {
    // define matchFunction for tag.class
    matchFunction = function(sample) {
      sample_class = sample.className;
      if (sample_class == undefined) {
        sample = sample.localName + "." + sample_class;
        if (sample === selector){
          return true;
        }
        else {
          return false;
        }
      }
      else {
        var sample_class_list = sample_class.split(" ");
       for (var i = 0; i < sample_class_list.length; i++) {
          sample = sample.localName + "." + sample_class_list[i];
          if (sample === selector) {
            return true;
          }
        }
        return false;
      }

    }
    
  } else if (selectorType === "tag") {

    matchFunction = function(sample) {
      sample = sample.localName;
      if (sample === selector){
        return true;
      }
      else {
        return false;
      }
    }
    // define matchFunction for tag
    
  }
  return matchFunction;
};

var $ = function(selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
