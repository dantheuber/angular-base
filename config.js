System.config({
  "transpiler": "traceur",
  "paths": {
    "*": "*.js",
    "bower:*": "jspm_packages/bower/*.js",
    "github:*": "jspm_packages/github/*.js",
    "npm:*": "jspm_packages/npm/*.js"
  }
});

System.config({
  "map": {
    "angular": "npm:angular@1.4.6",
    "angular-material": "bower:angular-material@0.11.1",
    "angular-query-string": "bower:angular-query-string@1.0.1",
    "angular-route": "npm:angular-route@1.4.6",
    "angular-sanitize": "npm:angular-sanitize@1.4.6",
    "json": "github:systemjs/plugin-json@0.1.0",
    "ngSmoothScroll": "github:d-oliveros/ngSmoothScroll@1.7.1",
    "traceur": "github:jmcriffey/bower-traceur@0.0.88",
    "traceur-runtime": "github:jmcriffey/bower-traceur-runtime@0.0.88",
    "bower:angular-animate@1.4.6": {
      "angular": "bower:angular@1.4.6"
    },
    "bower:angular-aria@1.4.6": {
      "angular": "bower:angular@1.4.6"
    },
    "bower:angular-material@0.11.1": {
      "angular": "bower:angular@1.4.6",
      "angular-animate": "bower:angular-animate@1.4.6",
      "angular-aria": "bower:angular-aria@1.4.6",
      "css": "github:systemjs/plugin-css@0.1.18"
    },
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "npm:angular@1.4.6": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    }
  }
});

