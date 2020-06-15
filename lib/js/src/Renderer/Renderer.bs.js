// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var List = require("bs-platform/lib/js/list.js");
var Vdom = require("bucklescript-tea/lib/js/src-ocaml/vdom.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Global = require("./Global.bs.js");
var Tea_app = require("bucklescript-tea/lib/js/src-ocaml/tea_app.js");
var Tea_cmd = require("bucklescript-tea/lib/js/src-ocaml/tea_cmd.js");
var Tea_sub = require("bucklescript-tea/lib/js/src-ocaml/tea_sub.js");
var FileTree = require("./FileTree.bs.js");
var PassList = require("./PassList.bs.js");
var Tea_html = require("bucklescript-tea/lib/js/src-ocaml/tea_html.js");
var MonacoEditor = require("./MonacoEditor.bs.js");
var Web_document = require("bucklescript-tea/lib/js/src-ocaml/web_document.js");

function $great$great(f, g, a) {
  return Curry._1(g, Curry._1(f, a));
}

function $less$less(f, g, a) {
  return Curry._1(f, Curry._1(g, a));
}

function fileTreeMsg(param_0) {
  return /* FileTreeMsg */Block.__(0, [param_0]);
}

function passListMsg(param_0) {
  return /* PassListMsg */Block.__(1, [param_0]);
}

function globalMsg(param_0) {
  return /* GlobalMsg */Block.__(2, [param_0]);
}

function editorMsg(param_0) {
  return /* EditorMsg */Block.__(3, [param_0]);
}

function init(param) {
  var match = FileTree.init(FileTree.Path.resolve("./src"));
  return /* tuple */[
          {
            fileTree: match[0],
            global: Global.init(undefined),
            editor: MonacoEditor.init("Ready to roll"),
            passes: PassList.init(undefined)
          },
          Tea_cmd.map((function (v) {
                  return /* FileTreeMsg */Block.__(0, [v]);
                }), match[1])
        ];
}

var loadFile = (function (path) {
    return require("fs").readFileSync(path, "utf-8")
});

function update(model, msg) {
  if (typeof msg === "number") {
    return /* tuple */[
            model,
            Tea_cmd.none
          ];
  }
  switch (msg.tag | 0) {
    case /* FileTreeMsg */0 :
        var match = FileTree.update(model.fileTree, msg[0]);
        var intent = match[2];
        var appCmds = match[1];
        if (intent) {
          return /* tuple */[
                  {
                    fileTree: model.fileTree,
                    global: model.global,
                    editor: {
                      value: loadFile(FileTree.Path.asString(intent[0]))
                    },
                    passes: model.passes
                  },
                  Tea_cmd.map((function (v) {
                          return /* GlobalMsg */Block.__(2, [v]);
                        }), appCmds)
                ];
        } else {
          return /* tuple */[
                  {
                    fileTree: match[0],
                    global: model.global,
                    editor: model.editor,
                    passes: model.passes
                  },
                  Tea_cmd.map((function (v) {
                          return /* GlobalMsg */Block.__(2, [v]);
                        }), appCmds)
                ];
        }
    case /* PassListMsg */1 :
        var passes = PassList.update(model.passes, msg[0]);
        return /* tuple */[
                {
                  fileTree: model.fileTree,
                  global: model.global,
                  editor: model.editor,
                  passes: passes
                },
                Tea_cmd.none
              ];
    case /* GlobalMsg */2 :
        var globalState = Global.update(model.global, msg[0]);
        return /* tuple */[
                {
                  fileTree: model.fileTree,
                  global: globalState,
                  editor: model.editor,
                  passes: model.passes
                },
                Tea_cmd.none
              ];
    case /* EditorMsg */3 :
        return /* tuple */[
                {
                  fileTree: model.fileTree,
                  global: model.global,
                  editor: MonacoEditor.update(model.editor, msg[0]),
                  passes: model.passes
                },
                Tea_cmd.none
              ];
    
  }
}

function sidebar(fileTree, passList) {
  return Tea_html.div(undefined, undefined, /* :: */[
              Tea_html.class$prime("sidebar"),
              /* [] */0
            ], /* :: */[
              Vdom.map((function (v) {
                      return /* PassListMsg */Block.__(1, [v]);
                    }), passList),
              /* :: */[
                Vdom.map((function (v) {
                        return /* FileTreeMsg */Block.__(0, [v]);
                      }), fileTree),
                /* [] */0
              ]
            ]);
}

function view(model) {
  var match = FileTree.view(model.fileTree);
  var param = PassList.view(model.passes);
  var globalItems = List.concat(/* :: */[
        List.map((function (param) {
                return Vdom.map((function (v) {
                              return /* PassListMsg */Block.__(1, [v]);
                            }), param);
              }), param[1]),
        /* :: */[
          List.map((function (param) {
                  return Vdom.map((function (v) {
                                return /* FileTreeMsg */Block.__(0, [v]);
                              }), param);
                }), match[1]),
          /* [] */0
        ]
      ]);
  return Vdom.node(undefined, "transparent", undefined, undefined, /* :: */[
              Vdom.style("display", "contents"),
              /* [] */0
            ], List.concat(/* :: */[
                  /* :: */[
                    sidebar(match[0], param[0]),
                    /* [] */0
                  ],
                  /* :: */[
                    /* :: */[
                      Tea_html.div(undefined, undefined, /* :: */[
                            Tea_html.class$prime("main-view"),
                            /* [] */0
                          ], /* :: */[
                            Vdom.map((function (v) {
                                    return /* EditorMsg */Block.__(3, [v]);
                                  }), MonacoEditor.view(model.editor)),
                            /* [] */0
                          ]),
                      /* [] */0
                    ],
                    /* :: */[
                      List.map((function (param) {
                              return Vdom.map((function (v) {
                                            return /* GlobalMsg */Block.__(2, [v]);
                                          }), param);
                            }), Global.view(model.global)),
                      /* :: */[
                        globalItems,
                        /* [] */0
                      ]
                    ]
                  ]
                ]));
}

function rendererEntry(param) {
  return Tea_app.standardProgram({
              init: init,
              update: update,
              view: view,
              subscriptions: (function (param) {
                  return Tea_sub.none;
                })
            }, Web_document.getElementById("app"), undefined);
}

var noOp = /* NoOp */0;

exports.$great$great = $great$great;
exports.$less$less = $less$less;
exports.fileTreeMsg = fileTreeMsg;
exports.passListMsg = passListMsg;
exports.globalMsg = globalMsg;
exports.editorMsg = editorMsg;
exports.noOp = noOp;
exports.init = init;
exports.loadFile = loadFile;
exports.update = update;
exports.sidebar = sidebar;
exports.view = view;
exports.rendererEntry = rendererEntry;
/* FileTree Not a pure module */