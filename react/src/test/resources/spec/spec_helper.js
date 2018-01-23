require.config({
  baseUrl: "src",
  
  paths: {
    "react":          "/webjars/jsx-requirejs-plugin/0.6.0/js/react-with-addons",
    "JSXTransformer": "/webjars/jsx-requirejs-plugin/0.6.0/js/JSXTransformer",
    "jsx":            "/webjars/jsx-requirejs-plugin/0.6.0/js/jsx",
    "text":           "/webjars/jsx-requirejs-plugin/0.6.0/js/text",
    "moment":         "/webjars/momentjs/2.18.1/min/moment.min.js"
  },

  jsx: {
    fileExtension: ".jsx",
    harmony:       true,
    stripTypes:    true
  },

  waitSeconds: 0
});