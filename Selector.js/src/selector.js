function Node(id_name, class_name, tag, content) {
    this.id = id_name;
    this.className = class_name;
    this.localName = tag;
    this.innerHTML = content;

}

function selectorMatch(sample, selector) {
  if (sample === selector) {
    return true;
  } else { return false; }
};

var traverseDomAndCollectElements = function(matchFunc, startEl) {
  var resultSet = [];
  var children = [];
  
  if (typeof startEl === "undefined") {
    startEl = document.body;
  }
  // traverse the DOM tree and collect matching elements in resultSet
  // use matchFunc to identify matching elements
  var collect = function(start) {
    var node = new Node(start.id, start.className, start.localName, start.innerHTML);
      children.push(node);
      for (var i = 0; i < start.childNodes.length; i++) {
        collect(start.childNodes[i]);
    }
  }

  collect(startEl);

  children.forEach(function(child) {
    if (matchFunc(child) === true) {
      resultSet.push(child);
    }
  });
  return resultSet;
};

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
    selector = selector.slice(1);
    matchFunction = function(sample) {

      sample = sample.id;
      return selectorMatch(sample, selector);
    }

  } else if (selectorType === "class") {
    selector = selector.slice(1);

    matchFunction = function(sample) {
      sample = sample.className;
     
      if (sample == undefined){
        return selectorMatch(sample, selector);
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
    matchFunction = function(sample) {
      sample_class = sample.className;
      if (sample_class == undefined) {
        sample = sample.localName + "." + sample_class;
        return selectorMatch(sample, selector);
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
      return selectorMatch(sample, selector);
    }    
  }
  return matchFunction;
};

var $ = function(selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};