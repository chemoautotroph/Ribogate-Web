!function(n) {
    var t = {};
    function e(r) {
        if (t[r])
            return t[r].exports;
        var i = t[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return n[r].call(i.exports, i, i.exports, e),
        i.l = !0,
        i.exports
    }
    e.m = n,
    e.c = t,
    e.d = function(n, t, r) {
        e.o(n, t) || Object.defineProperty(n, t, {
            configurable: !1,
            enumerable: !0,
            get: r
        })
    }
    ,
    e.n = function(n) {
        var t = n && n.__esModule ? function() {
            return n.default
        }
        : function() {
            return n
        }
        ;
        return e.d(t, "a", t),
        t
    }
    ,
    e.o = function(n, t) {
        return Object.prototype.hasOwnProperty.call(n, t)
    }
    ,
    e.p = "../dist/",
    e(e.s = 7)
}([, function(n, t) {
    n.exports = vendor_e9401cd8e2a8df9a3c11
}
, , , , , , function(n, t, e) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = e(8)
      , i = (e.n(r),
    e(9))
      , o = (e.n(i),
    e(15))
      , a = e(16);
    e(10),
    e(11),
    e(12),
    window.QRious = e(13),
    //window.fornac = e(14), //Commented out by NK!!!!! 
    o.a.library.add(a.f, a.j, a.i, a.o, a.a, a.b, a.c, a.g, a.d, a.k, a.h, a.n, a.m, a.l, a.e, a.p)
}
, function(n, t) {}
, function(n, t, e) {
    n.exports = e(1)(64)
}
, function(n, t) {}
, function(n, t) {}
, function(n, t) {}
, function(n, t, e) {
    n.exports = e(1)(68)
}
, function(n, t, e) {
    var o;
    o = function() {
        return function(n) {
            function t(r) {
                if (e[r])
                    return e[r].exports;
                var i = e[r] = {
                    exports: {},
                    id: r,
                    loaded: !1
                };
                return n[r].call(i.exports, i, i.exports, t),
                i.loaded = !0,
                i.exports
            }
            var e = {};
            return t.m = n,
            t.c = e,
            t.p = "",
            t(0)
        }([ //Commented out by NK!!!!! 
		  /* function(n, t, e) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
			
            t.FornaContainer = function(n, t) {
                function e(n) {
                    return Math.sqrt(n[0] * n[0] + n[1] * n[1])
                }
                function s(n) {
                    var t = n
                      , r = n.prevNode;
                    if (null !== r && n.linked) {
                        var i = [-(t.x - r.x), -(t.y - r.y)]
                          , a = [-(i = [i[0] / e(i), i[1] / e(i)])[1], i[0]]
                          , u = [n.radius * i[0], n.radius * i[1]]
                          , l = "M" + (u[0] + 6 * (i[0] + a[0]) / 2) + "," + (u[1] + 6 * (i[1] + a[1]) / 2) + "L" + u[0] + "," + u[1] + "L" + (u[0] + 6 * (i[0] - a[0]) / 2) + "," + (u[1] + 6 * (i[1] - a[1]) / 2);
                        o.default.select(this).attr("d", l)
                    }
                }
                function c(n) {
                    return "basepair" == n.linkType || "backbone" == n.linkType || "pseudoknot" == n.linkType || "label_link" == n.linkType || "external" == n.linkType || "chain_chain" == n.linkType
                }
                function f(n, t, e) {
                    if (n.hasOwnProperty(t.num)) {
                        var r = parseFloat(n[t.num]);
                        return isNaN(r) ? n[t.num] : e(r)
                    }
                    return "white"
                }
                function h() {
                    x = null,
                    b = null
                }
                function p(n) {
                    var t = E.selectAll("g.gnode");
                    return t.filter(function(n) {
                        return n.selected
                    })
                }
                function d(n) {
                    var t = n.radius + 16
                      , e = n.x - t
                      , r = n.x + t
                      , i = n.y - t
                      , o = n.y + t;
                    return function(t, a, u, l, s) {
                        if (t.point && t.point !== n) {
                            var c = n.x - t.point.x
                              , f = n.y - t.point.y
                              , h = Math.sqrt(c * c + f * f)
                              , p = n.radius + t.point.radius;
                            p > h && (h = (h - p) / h * .1,
                            n.x -= c *= h,
                            n.y -= f *= h,
                            t.point.x += c,
                            t.point.y += f)
                        }
                        return a > r || e > l || u > o || i > s
                    }
                }
                function g() {
                    if (!m.deaf && !C) {
                        switch (o.default.event.keyCode) {
                        case 16:
                            C = !0;
                            break;
                        case 17:
                            z = !0;
                            break;
                        case 67:
                            m.centerView()
                        }
                        (C || z) && (N.call(m.zoomer).on("mousedown.zoom", null).on("touchstart.zoom", null).on("touchmove.zoom", null).on("touchend.zoom", null),
                        A.selectAll("g.gnode").on("mousedown.drag", null)),
                        z && (S.select(".background").style("cursor", "crosshair"),
                        S.call(m.brusher))
                    }
                }
                function v() {
                    C = !1,
                    z = !1,
                    S.call(m.brusher).on("mousedown.brush", null).on("touchstart.brush", null).on("touchmove.brush", null).on("touchend.brush", null),
                    S.select(".background").style("cursor", "auto"),
                    N.call(m.zoomer),
                    A.selectAll("g.gnode").call(P)
                }
                var m = this;
                if (m.options = {
                    displayAllLinks: !1,
                    labelInterval: 10,
                    applyForce: !0,
                    initialSize: null,
                    allowPanningAndZooming: !0,
                    transitionDuration: 500,
                    resizeSvgOnResize: !0
                },
                arguments.length > 1)
                    for (var y in t)
                        m.options.hasOwnProperty(y) && (m.options[y] = t[y]);
                null !== m.options.initialSize ? (m.options.svgW = m.options.initialSize[0],
                m.options.svgH = m.options.initialSize[1]) : (m.options.svgW = 800,
                m.options.svgH = 800),
                o.default.scale.category20();
                var x = null
                  , b = null
                  , k = o.default.scale.linear().domain([0, m.options.svgW]).range([0, m.options.svgW])
                  , M = o.default.scale.linear().domain([0, m.options.svgH]).range([0, m.options.svgH])
                  , w = m.graph = {
                    nodes: [],
                    links: []
                };
                m.linkStrengths = {
                    pseudoknot: 0,
                    proteinChain: 0,
                    chainChain: 0,
                    intermolecule: 10,
                    external: 0,
                    other: 10
                },
                m.displayParameters = {
                    displayBackground: "true",
                    displayNumbering: "true",
                    displayNodeOutline: "true",
                    displayNodeLabel: "true",
                    displayLinks: "true",
                    displayPseudoknotLinks: "true",
                    displayProteinLinks: "true"
                },
                m.colorScheme = "structure",
                m.customColors = {},
                m.animation = m.options.applyForce,
                m.deaf = !1,
                m.rnas = {},
                m.extraLinks = [],
                Array.prototype.equals = function(n) {
                    if (!n)
                        return !1;
                    if (this.length != n.length)
                        return !1;
                    for (var t = 0, e = this.length; e > t; t++)
                        if (this[t]instanceof Array && n[t]instanceof Array) {
                            if (!this[t].equals(n[t]))
                                return !1
                        } else if (this[t] != n[t])
                            return !1;
                    return !0
                }
                ,
                m.createInitialLayout = function(n, t) {
                    var e = {
                        sequence: "",
                        name: "empty",
                        positions: [],
                        labelInterval: m.options.labelInterval,
                        avoidOthers: !0,
                        uids: [],
                        circularizeExternal: !0
                    };
                    if (2 == arguments.length)
                        for (var r in t)
                            e.hasOwnProperty(r) && (e[r] = t[r]);
                    var i = new a.RNAGraph(e.sequence,n,e.name);
                    i.circularizeExternal = e.circularizeExternal;
                    var o = i.recalculateElements();
                    return 0 === e.positions.length && (e.positions = (0,
                    u.simpleXyCoordinates)(o.pairtable)),
                    o.elementsToJson().addUids(e.uids).addPositions("nucleotide", e.positions).addLabels(1, e.labelInterval).reinforceStems().reinforceLoops().connectFakeNodes().reassignLinkUids().breakNodesToFakeNodes()
                }
                ,
                m.addRNA = function(n, t) {
                    var e = m.createInitialLayout(n, t);
                    if (1 === arguments.length && (t = {}),
                    "extraLinks"in t) {
                        var r = m.addExternalLinks(e, t.extraLinks);
                        m.extraLinks = m.extraLinks.concat(r)
                    }
                    return "avoidOthers"in t ? m.addRNAJSON(e, t.avoidOthers) : m.addRNAJSON(e, !0),
                    e
                }
                ,
                m.addExternalLinks = function(n, t) {
                    for (var e = [], r = 0; r < t.length; r++) {
                        var i = {
                            linkType: "external",
                            value: 1,
                            uid: generateUUID(),
                            source: null,
                            target: null
                        };
                        if ("[object Array]" === Object.prototype.toString.call(t[r][0])) {
                            for (var o = 0; o < n.nodes.length; o++)
                                if ("nucs"in n.nodes[o] && n.nodes[o].nucs.equals(t[r][0])) {
                                    i.source = n.nodes[o];
                                    break
                                }
                        } else
                            for (o = 0; o < n.nodes.length; o++)
                                n.nodes[o].num == t[r][0] && (i.source = n.nodes[o]);
                        if ("[object Array]" === Object.prototype.toString.call(t[r][1]))
                            for (o = 0; o < n.nodes.length; o++)
                                "nucs"in n.nodes[o] && n.nodes[o].nucs.equals(t[r][1]) && (i.target = n.nodes[o]);
                        else
                            for (o = 0; o < n.nodes.length; o++)
                                n.nodes[o].num == t[r][1] && (i.target = n.nodes[o]);
                        null != i.source && null != i.target ? e.push(i) : console.log("ERROR: source or target of new link not found:", i, t[r])
                    }
                    return e
                }
                ,
                m.addRNAJSON = function(n, t) {
                    var e, r;
                    return t && (e = m.graph.nodes.length > 0 ? o.default.max(m.graph.nodes.map(function(n) {
                        return n.x
                    })) : 0,
                    r = o.default.min(n.nodes.map(function(n) {
                        return n.x
                    })),
                    n.nodes.forEach(function(n) {
                        n.x += e - r + 20,
                        n.px += e - r
                    })),
                    n.nodes.forEach(function(t) {
                        t.rna = n
                    }),
                    m.rnas[n.uid] = n,
                    m.recalculateGraph(),
                    m.update(),
                    m.centerView(),
                    n
                }
                ,
                m.transitionRNA = function(n, t) {
                    var e = m.options.transitionDuration
                      , r = {
                        uids: m.graph.nodes.filter(function(n) {
                            return "nucleotide" == n.nodeType
                        }).map(function(n) {
                            return n.uid
                        })
                    }
                      , i = m.createInitialLayout(n, r)
                      , o = E.selectAll("g.gnode").data(i.nodes, q);
                    0 === (e = m.options.transitionDuration) ? o.attr("transform", function(n) {
                        return "translate(" + [n.x, n.y] + ")"
                    }) : o.transition().attr("transform", function(n) {
                        return "translate(" + [n.x, n.y] + ")"
                    }).duration(e);
                    var a = L.selectAll("line.link").data(i.links.filter(c), O)
                      , u = m.createNewNodes(o.enter()).attr("transform", function(n) {
                        return void 0 !== n.x && void 0 !== n.y ? "translate(" + [0, 0] + ")" : ""
                    });
                    0 === e ? o.exit().remove() : o.exit().transition().attr("transform", function(n) {
                        return void 0 !== n.x && void 0 !== n.y ? "translate(" + [0, 0] + ")" : ""
                    }),
                    o.select("path").each(s),
                    m.graph.nodes = o.data(),
                    m.updateStyle(),
                    m.centerView(e),
                    a.exit().remove(),
                    0 === e ? (a.attr("x1", function(n) {
                        return n.source.x
                    }).attr("y1", function(n) {
                        return n.source.y
                    }).attr("x2", function(n) {
                        return n.target.x
                    }).attr("y2", function(n) {
                        return n.target.y
                    }),
                    m.createNewLinks(a.enter()),
                    m.graph.links = a.data(),
                    m.updateStyle()) : a.transition().attr("x1", function(n) {
                        return n.source.x
                    }).attr("y1", function(n) {
                        return n.source.y
                    }).attr("x2", function(n) {
                        return n.target.x
                    }).attr("y2", function(n) {
                        return n.target.y
                    }).duration(e).call(function(n, t) {
                        0 === n.size() && setTimeout(t, e);
                        var r = 0;
                        n.each(function() {
                            ++r
                        }).each("end", function() {
                            --r || t.apply(this, arguments)
                        })
                    }, function() {
                        m.createNewLinks(a.enter()),
                        m.graph.links = a.data(),
                        m.updateStyle(),
                        void 0 !== t && t()
                    }),
                    0 === e ? u.attr("transform", function(n) {
                        return void 0 !== n.x && void 0 !== n.y ? "translate(" + [n.x, n.y] + ")" : ""
                    }) : u.transition().attr("transform", function(n) {
                        return void 0 !== n.x && void 0 !== n.y ? "translate(" + [n.x, n.y] + ")" : ""
                    })
                }
                ,
                m.recalculateGraph = function() {
                    for (var n in m.graph.nodes = [],
                    m.graph.links = [],
                    m.rnas)
                        m.graph.nodes = m.graph.nodes.concat(m.rnas[n].nodes),
                        m.graph.links = m.graph.links.concat(m.rnas[n].links);
                    for (var t = {}, e = 0; e < m.graph.nodes.length; e++)
                        t[m.graph.nodes[e].uid] = m.graph.nodes[e];
                    for (m.graph.links.forEach(function(n) {
                        n.source = t[n.source.uid],
                        n.target = t[n.target.uid]
                    }),
                    e = 0; e < m.extraLinks.length; e++) {
                        if (m.extraLinks[e].target.uid in t || console.log("not there:", m.extraLinks[e]),
                        m.extraLinks[e].source = t[m.extraLinks[e].source.uid],
                        m.extraLinks[e].target = t[m.extraLinks[e].target.uid],
                        "intermolecule" == m.extraLinks[e].linkType) {
                            fakeLinks = m.graph.links.filter(function(n) {
                                return (n.source == m.extraLinks[e].source || n.source == m.extraLinks[e].target || n.target == m.extraLinks[e].source || n.target == m.extraLinks[e].source) && "fake" == n.linkType
                            });
                            for (var r = 0; r < fakeLinks.length; r++) {
                                var i = m.graph.links.indexOf(fakeLinks[r]);
                                m.graph.links.splice(i, 1)
                            }
                        }
                        w.links.push(m.extraLinks[e])
                    }
                }
                ,
                m.addNodes = function(n) {
                    n.links.forEach(function(t) {
                        "number" == typeof t.source && (t.source = n.nodes[t.source]),
                        "number" == typeof t.target && (t.target = n.nodes[t.target])
                    }),
                    m.graph.nodes.length > 0 ? (maxX = o.default.max(m.graph.nodes.map(function(n) {
                        return n.x
                    })),
                    maxY = o.default.max(m.graph.nodes.map(function(n) {
                        return n.y
                    }))) : (maxX = 0,
                    maxY = 0),
                    n.nodes.forEach(function(n) {
                        n.rna.uid in m.rnas || (m.rnas[n.rna.uid] = n.rna),
                        n.x += maxX,
                        n.px += maxX
                    }),
                    r = new a.RNAGraph("",""),
                    r.nodes = n.nodes,
                    r.links = n.links,
                    m.recalculateGraph(),
                    m.update(),
                    m.centerView()
                }
                ,
                m.addCustomColors = function(n) {
                    m.customColors = n
                }
                ,
                m.addCustomColorsText = function(n) {
                    var t = new l.ColorScheme(n);
                    m.customColors = t.colorsJson,
                    m.changeColorScheme("custom")
                }
                ,
                m.clearNodes = function() {
                    m.graph.nodes = [],
                    m.graph.links = [],
                    m.rnas = {},
                    m.extraLinks = [],
                    m.update()
                }
                ,
                m.toJSON = function() {
                    var n = {
                        rnas: m.rnas,
                        extraLinks: m.extraLinks
                    };
                    return JSON.stringify(n, function(n, t) {
                        return "rna" == n ? void 0 : t
                    }, "\t")
                }
                ,
                m.fromJSON = function(n) {
                    var t, e;
                    try {
                        var i = JSON.parse(n);
                        t = i.rnas,
                        e = i.extraLinks
                    } catch (n) {
                        throw n
                    }
                    for (var o in t)
                        "rna" == t[o].type ? (r = new a.RNAGraph,
                        r.seq = t[o].seq,
                        r.dotbracket = t[o].dotbracket,
                        r.circular = t[o].circular,
                        r.pairtable = t[o].pairtable,
                        r.uid = t[o].uid,
                        r.structName = t[o].structName,
                        r.nodes = t[o].nodes,
                        r.links = t[o].links,
                        r.rnaLength = t[o].rnaLength,
                        r.elements = t[o].elements,
                        r.nucsToNodes = t[o].nucsToNodes,
                        r.pseudoknotPairs = t[o].pseudoknotPairs) : (r = new ProteinGraph,
                        r.size = t[o].size,
                        r.nodes = t[o].nodes,
                        r.uid = t[o].uid),
                        m.addRNAJSON(r, !1);
                    e.forEach(function(n) {
                        m.extraLinks.push(n)
                    }),
                    m.recalculateGraph(),
                    m.update()
                }
                ,
                m.setSize = function() {
                    if (null == m.options.initialSize) {
                        var t = o.default.select(n).node().offsetHeight
                          , e = o.default.select(n).node().offsetWidth;
                        m.options.svgW = e,
                        m.options.svgH = t,
                        k.range([0, e]).domain([0, e]),
                        M.range([0, t]).domain([0, t]),
                        m.zoomer.x(k).y(M),
                        m.brusher.x(k).y(M),
                        m.centerView(),
                        m.options.resizeSvgOnResize && _.attr("width", e).attr("height", t)
                    }
                }
                ,
                m.setOutlineColor = function(n) {
                    E.selectAll("g.gnode").select("[node_type=nucleotide]").style("fill", n)
                }
                ,
                m.changeColorScheme = function(n) {
                    E.selectAll("[node_type=protein]").classed("protein", !0).attr("r", function(n) {
                        return n.radius
                    });
                    var t = (E.selectAll("g.gnode"),
                    E.selectAll("g.gnode").selectAll("circle"),
                    E.selectAll("g.gnode").select("[node_type=nucleotide]"));
                    if (m.colorScheme = n,
                    "sequence" == n) {
                        var e = o.default.scale.ordinal().range(["#dbdb8d", "#98df8a", "#ff9896", "#aec7e8", "#aec7e8"]).domain(["A", "C", "G", "U", "T"]);
                        t.style("fill", function(n) {
                            return e(n.name)
                        })
                    } else
                        "structure" == n ? (e = o.default.scale.category10().domain(["s", "m", "i", "e", "t", "h", "x"]).range(["lightgreen", "#ff9896", "#dbdb8d", "lightsalmon", "lightcyan", "lightblue", "transparent"]),
                        t.style("fill", function(n) {
                            return e(n.elemType)
                        })) : "positions" == n ? t.style("fill", function(n) {
                            return o.default.scale.linear().range(["#98df8a", "#dbdb8d", "#ff9896"]).interpolate(o.default.interpolateLab).domain([1, 1 + (n.rna.rnaLength - 1) / 2, n.rna.rnaLength])(n.num)
                        }) : "custom" == n && (void 0 !== m.customColors && "domain"in m.customColors && "range"in m.customColors && (e = o.default.scale.linear().interpolate(o.default.interpolateLab).domain(m.customColors.domain).range(m.customColors.range)),
                        t.style("fill", function(n) {
                            return void 0 !== m.customColors && m.customColors.hasOwnProperty("colorValues") ? m.customColors.colorValues.hasOwnProperty(n.structName) && m.customColors.colorValues[n.structName].hasOwnProperty(n.num) ? f(m.customColors.colorValues[n.structName], n, e) : m.customColors.colorValues.hasOwnProperty("") ? f(m.customColors.colorValues[""], n, e) : "white" : "white"
                        }))
                }
                ,
                window.addEventListener("resize", m.setSize, !1),
                m.zoomer = o.default.behavior.zoom().scaleExtent([.1, 10]).x(k).y(M).on("zoomstart", function() {
                    var n = E.selectAll("g.gnode").selectAll(".outline_node");
                    n.each(function(n) {
                        n.selected = !1,
                        n.previouslySelected = !1
                    }),
                    n.classed("selected", !1)
                }).on("zoom", function() {
                    A.attr("transform", "translate(" + o.default.event.translate + ") scale(" + o.default.event.scale + ")")
                }),
                o.default.select(n).select("svg").remove();
                var _ = o.default.select(n).attr("tabindex", 1).on("keydown.brush", g).on("keyup.brush", v).each(function() {
                    this.focus()
                }).append("svg:svg").attr("width", m.options.svgW).attr("height", m.options.svgH).attr("id", "plotting-area");
                m.options.svg = _;
                var N = _.append("svg:g").on("mousemove", function() {
                    x && (mpos = o.default.mouse(A.node()),
                    T.attr("x1", x.x).attr("y1", x.y).attr("x2", mpos[0]).attr("y2", mpos[1]))
                }).on("mousedown", function() {}).on("mouseup", function() {
                    x && T.attr("class", "drag_line_hidden"),
                    h()
                });
                m.options.allowPanningAndZooming && N.call(m.zoomer);
                var S = N.append("g").datum(function() {
                    return {
                        selected: !1,
                        previouslySelected: !1
                    }
                }).attr("class", "brush")
                  , A = N.append("svg:g")
                  , L = A.append("svg:g")
                  , E = A.append("svg:g");
                m.brusher = o.default.svg.brush().x(k).y(M).on("brushstart", function(n) {
                    E.selectAll("g.gnode").selectAll(".outline_node").each(function(n) {
                        n.previouslySelected = z && n.selected
                    })
                }).on("brush", function() {
                    var n = E.selectAll("g.gnode").selectAll(".outline_node")
                      , t = o.default.event.target.extent();
                    n.classed("selected", function(n) {
                        return n.selected = m.options.applyForce && n.previouslySelected ^ (t[0][0] <= n.x && n.x < t[1][0] && t[0][1] <= n.y && n.y < t[1][1])
                    })
                }).on("brushend", function() {
                    o.default.event.target.clear(),
                    o.default.select(this).call(o.default.event.target)
                }),
                S.call(m.brusher).on("mousedown.brush", null).on("touchstart.brush", null).on("touchmove.brush", null).on("touchend.brush", null),
                S.select(".background").style("cursor", "auto"),
                m.getBoundingBoxTransform = function() {
                    if (0 === m.graph.nodes.length)
                        return {
                            translate: [0, 0],
                            scale: 1
                        };
                    var n = o.default.min(m.graph.nodes.map(function(n) {
                        return n.x
                    }))
                      , t = o.default.min(m.graph.nodes.map(function(n) {
                        return n.y
                    }))
                      , e = o.default.max(m.graph.nodes.map(function(n) {
                        return n.x
                    })) - n
                      , r = o.default.max(m.graph.nodes.map(function(n) {
                        return n.y
                    })) - t
                      , i = m.options.svgW / (e + 1)
                      , a = m.options.svgH / (r + 1)
                      , u = .8 * Math.min(i, a)
                      , l = e * u
                      , s = r * u;
                    return {
                        translate: [-n * u + (m.options.svgW - l) / 2, -t * u + (m.options.svgH - s) / 2],
                        scale: u
                    }
                }
                ,
                m.centerView = function(n) {
                    0 === arguments.length && (n = 0);
                    var t = m.getBoundingBoxTransform();
                    null !== t && (A.transition().attr("transform", "translate(" + t.translate + ") scale(" + t.scale + ")").duration(n),
                    m.zoomer.translate(t.translate),
                    m.zoomer.scale(t.scale))
                }
                ,
                m.force = o.default.layout.force().charge(function(n) {
                    return n.nodeType,
                    -30
                }).chargeDistance(300).friction(.35).linkDistance(function(n) {
                    return 15 * n.value
                }).linkStrength(function(n) {
                    return n.linkType in m.linkStrengths ? m.linkStrengths[n.linkType] : m.linkStrengths.other
                }).gravity(0).nodes(m.graph.nodes).links(m.graph.links).chargeDistance(110).size([m.options.svgW, m.options.svgH]);
                var T = A.append("line").attr("class", "drag_line").attr("x1", 0).attr("y1", 0).attr("x2", 0).attr("y2", 0)
                  , C = !1
                  , z = !1;
                m.resumeForce = function() {
                    m.animation && m.force.resume()
                }
                ;
                var P = o.default.behavior.drag().on("dragstart", function(n) {
                    o.default.event.sourceEvent.stopPropagation(),
                    n.selected || z || E.selectAll("g.gnode").selectAll(".outline_node").classed("selected", function(n) {
                        return n.selected = m.options.applyForce && (n.previouslySelected = !1)
                    }),
                    o.default.select(this).select(".outline_node").classed("selected", function(t) {
                        return n.previouslySelected = n.selected,
                        n.selected = m.options.applyForce && !0
                    }),
                    p().each(function(n) {
                        n.fixed |= 2
                    })
                }).on("drag", function(n) {
                    p().each(function(n) {
                        n.x += o.default.event.dx,
                        n.y += o.default.event.dy,
                        n.px += o.default.event.dx,
                        n.py += o.default.event.dy
                    }),
                    m.resumeForce(),
                    o.default.event.sourceEvent.preventDefault()
                }).on("dragend", function(n) {
                    p().each(function(n) {
                        n.fixed &= -7
                    })
                });
                o.default.select(n).on("keydown", g).on("keyup", v).on("contextmenu", function() {
                    o.default.event.preventDefault()
                });
                var O = function(n) {
                    return n.uid
                }
                  , q = function(n) {
                    return n.uid
                }
                  , R = function(n) {
                    var t = n.getPositions("nucleotide")
                      , e = n.getPositions("label")
                      , r = n.getUids();
                    n.recalculateElements().elementsToJson().addPseudoknots().addPositions("nucleotide", t).addUids(r).addLabels(1, m.options.labelInterval).addPositions("label", e).reinforceStems().reinforceLoops().updateLinkUids()
                }
                  , j = function(n) {
                    C && (n.linkType in {
                        backbone: !0,
                        fake: !0,
                        fake_fake: !0,
                        label_link: !0
                    } || function(n) {
                        if (index = m.graph.links.indexOf(n),
                        index > -1) {
                            if (n.source.rna == n.target.rna) {
                                var t = n.source.rna;
                                t.addPseudoknots(),
                                t.pairtable[n.source.num] = 0,
                                t.pairtable[n.target.num] = 0,
                                R(t)
                            } else
                                extraLinkIndex = m.extraLinks.indexOf(n),
                                m.extraLinks.splice(extraLinkIndex, 1);
                            m.recalculateGraph()
                        }
                        m.update()
                    }(n))
                };
                m.addLink = function(n) {
                    n.source.rna == n.target.rna ? (r = n.source.rna,
                    r.pairtable[n.source.num] = n.target.num,
                    r.pairtable[n.target.num] = n.source.num,
                    R(r)) : (n.linkType = "intermolecule",
                    m.extraLinks.push(n)),
                    m.recalculateGraph(),
                    m.update()
                }
                ;
                var U = function(n) {
                    o.default.event.defaultPrevented || (z || E.selectAll("g.gnode").selectAll(".outline_node").classed("selected", function(n) {
                        return n.selected = m.options.applyForce && (n.previouslySelected = !1)
                    }),
                    o.default.select(this).select("circle").classed("selected", n.selected = m.options.applyForce && !n.previouslySelected))
                }
                  , D = function(n) {
                    if (x) {
                        if ((b = n) == x)
                            return void h();
                        var t = {
                            source: x,
                            target: b,
                            linkType: "basepair",
                            value: 1,
                            uid: generateUUID()
                        };
                        for (i = 0; i < m.graph.links.length; i++) {
                            if (!(m.graph.links[i].source != x && m.graph.links[i].target != x && m.graph.links[i].source != b && m.graph.links[i].target != b || "basepair" != m.graph.links[i].linkType && "pseudoknot" != m.graph.links[i].linkType))
                                return;
                            if ((m.graph.links[i].source == b && m.graph.links[i].target == x || m.graph.links[i].source == x && m.graph.links[i].target == b) && "backbone" == m.graph.links[i].linkType)
                                return
                        }
                        if ("middle" == b.nodeType || "middle" == x.nodeType || "label" == b.nodeType || "label" == x.nodeType)
                            return;
                        m.addLink(t)
                    }
                }
                  , F = function(n) {
                    n.selected || z || E.selectAll("g.gnode").selectAll(".outline_node").classed("selected", function(n) {
                        return n.selected = n.previouslySelected = !1
                    }),
                    o.default.select(this).classed("selected", function(t) {
                        return n.previouslySelected = n.selected,
                        n.selected = m.options.applyForce && !0
                    }),
                    C && (x = n,
                    T.attr("class", "drag_line").attr("x1", x.x).attr("y1", x.y).attr("x2", x.x).attr("y2", x.y))
                };
                m.startAnimation = function() {
                    m.animation = !0,
                    A.selectAll("g.gnode").call(P),
                    m.force.start()
                }
                ,
                m.stopAnimation = function() {
                    m.animation = !1,
                    A.selectAll("g.gnode").on("mousedown.drag", null),
                    m.force.stop()
                }
                ,
                m.setFriction = function(n) {
                    m.force.friction(n),
                    m.resumeForce()
                }
                ,
                m.setCharge = function(n) {
                    m.force.charge(n),
                    m.resumeForce()
                }
                ,
                m.setGravity = function(n) {
                    m.force.gravity(n),
                    m.resumeForce()
                }
                ,
                m.setPseudoknotStrength = function(n) {
                    m.linkStrengths.pseudoknot = n,
                    m.update()
                }
                ,
                m.displayBackground = function(n) {
                    m.displayParameters.displayBackground = n,
                    m.updateStyle()
                }
                ,
                m.displayNumbering = function(n) {
                    m.displayParameters.displayNumbering = n,
                    m.updateStyle()
                }
                ,
                m.displayNodeOutline = function(n) {
                    m.displayParameters.displayNodeOutline = n,
                    m.updateStyle()
                }
                ,
                m.displayNodeLabel = function(n) {
                    m.displayParameters.displayNodeLabel = n,
                    m.updateStyle()
                }
                ,
                m.displayLinks = function(n) {
                    m.displayParameters.displayLinks = n,
                    m.updateStyle()
                }
                ,
                m.displayPseudoknotLinks = function(n) {
                    m.displayParameters.displayPseudoknotLinks = n,
                    m.updateStyle()
                }
                ,
                m.displayProteinLinks = function(n) {
                    m.displayParameters.displayProteinLinks = n,
                    m.updateStyle()
                }
                ,
                m.updateStyle = function() {
                    E.selectAll("[node_type=label]").classed("transparent", !m.displayParameters.displayNumbering),
                    E.selectAll("[label_type=label]").classed("transparent", !m.displayParameters.displayNumbering),
                    L.selectAll("[linkType=label_link]").classed("transparent", !m.displayParameters.displayNumbering),
                    _.selectAll("circle").classed("hidden_outline", !m.displayParameters.displayNodeOutline),
                    E.selectAll("[label_type=nucleotide]").classed("transparent", !m.displayParameters.displayNodeLabel),
                    _.selectAll("[link_type=real],[link_type=basepair],[link_type=backbone],[link_type=pseudoknot],[link_type=protein_chain],[link_type=chain_chain],[link_type=external]").classed("transparent", !m.displayParameters.displayLinks),
                    _.selectAll("[link_type=pseudoknot]").classed("transparent", !m.displayParameters.displayPseudoknotLinks),
                    _.selectAll("[link_type=protein_chain]").classed("transparent", !m.displayParameters.displayProteinLinks),
                    L.selectAll("[link_type=fake]").classed("transparent", !m.options.displayAllLinks),
                    L.selectAll("[link_type=fake_fake]").classed("transparent", !m.options.displayAllLinks)
                }
                ,
                m.createNewLinks = function(n) {
                    var t = n.append("svg:line");
                    return t.append("svg:title").text(O),
                    t.classed("link", !0).attr("x1", function(n) {
                        return n.source.x
                    }).attr("y1", function(n) {
                        return n.source.y
                    }).attr("x2", function(n) {
                        return n.target.x
                    }).attr("y2", function(n) {
                        return n.target.y
                    }).attr("link_type", function(n) {
                        return n.linkType
                    }).attr("class", function(n) {
                        return o.default.select(this).attr("class") + " " + n.linkType
                    }).attr("pointer-events", function(n) {
                        return "fake" == n.linkType ? "none" : "all"
                    }),
                    t
                }
                ,
                m.createNewNodes = function(n) {
                    (n = n.append("g").classed("noselect", !0).classed("gnode", !0).attr("struct_name", function(n) {
                        return n.structName
                    }).attr("transform", function(n) {
                        return void 0 !== n.x && void 0 !== n.y ? "translate(" + [n.x, n.y] + ")" : ""
                    }).each(function(n) {
                        n.selected = n.previouslySelected = !1
                    })).call(P).on("mousedown", F).on("mousedrag", function(n) {}).on("mouseup", D).attr("num", function(n) {
                        return "n" + n.num
                    }).attr("rnum", function(n) {
                        return "n" + (n.rna.rnaLength - n.num + 1)
                    }).on("click", U).transition().duration(750).ease("elastic");
                    var t = n.filter(function(n) {
                        return "label" == n.nodeType || "protein" == n.nodeType
                    })
                      , e = n.filter(function(n) {
                        return "nucleotide" == n.nodeType
                    });
                    return t.append("svg:circle").attr("class", "outline_node").attr("r", function(n) {
                        return n.radius + 1
                    }),
                    e.append("svg:circle").attr("class", "outline_node").attr("r", function(n) {
                        return n.radius + 1
                    }),
                    t.append("svg:circle").attr("class", "node").classed("label", function(n) {
                        return "label" == n.nodeType
                    }).attr("r", function(n) {
                        return "middle" == n.nodeType ? 0 : n.radius
                    }).attr("node_type", function(n) {
                        return n.nodeType
                    }).attr("node_num", function(n) {
                        return n.num
                    }),
                    e.append("svg:circle").attr("class", "node").attr("node_type", function(n) {
                        return n.nodeType
                    }).attr("node_num", function(n) {
                        return n.num
                    }).attr("r", function(n) {
                        return n.radius
                    }).append("svg:title").text(function(n) {
                        return "nucleotide" == n.nodeType ? n.structName + ":" + n.num : ""
                    }),
                    e.append("svg:path").attr("class", "node").attr("node_type", function(n) {
                        return n.nodeType
                    }).attr("node_num", function(n) {
                        return n.num
                    }).append("svg:title").text(function(n) {
                        return "nucleotide" == n.nodeType ? n.structName + ":" + n.num : ""
                    }),
                    n.append("text").text(function(n) {
                        return n.name
                    }).attr("text-anchor", "middle").attr("font-size", 8).attr("font-weight", "bold").attr("y", 2.5).attr("class", "node-label").attr("label_type", function(n) {
                        return n.nodeType
                    }).append("svg:title").text(function(n) {
                        return "nucleotide" == n.nodeType ? n.structName + ":" + n.num : ""
                    }),
                    n
                }
                ,
                m.update = function() {
                    m.force.nodes(m.graph.nodes).links(m.graph.links),
                    m.animation && m.force.start();
                    var n = L.selectAll("line.link").data(m.graph.links.filter(c), O);
                    n.attr("class", "").classed("link", !0).attr("link_type", function(n) {
                        return n.linkType
                    }).attr("class", function(n) {
                        return o.default.select(this).attr("class") + " " + n.linkType
                    });
                    var t = n.enter();
                    m.createNewLinks(t),
                    n.exit().remove();
                    var e = (o.default.scale.category10().domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
                    E.selectAll("g.gnode").data(m.graph.nodes, q))
                      , r = e.enter();
                    m.createNewNodes(r),
                    e.exit().remove();
                    var i, a = m.graph.nodes.filter(function(n) {
                        return "nucleotide" == n.nodeType || "label" == n.nodeType
                    });
                    i = m.displayFakeLinks ? n : L.selectAll("[link_type=real],[link_type=pseudoknot],[link_type=protein_chain],[link_type=chain_chain],[link_type=label_link],[link_type=backbone],[link_type=basepair],[link_type=intermolecule],[link_type=external]"),
                    e.selectAll("path").each(s),
                    i.on("click", j),
                    m.force.on("tick", function() {
                        for (var n = o.default.geom.quadtree(a), t = 0, r = a.length; ++t < r; )
                            n.visit(d(a[t]));
                        i.attr("x1", function(n) {
                            return n.source.x
                        }).attr("y1", function(n) {
                            return n.source.y
                        }).attr("x2", function(n) {
                            return n.target.x
                        }).attr("y2", function(n) {
                            return n.target.y
                        }),
                        e.attr("transform", function(n) {
                            return "translate(" + [n.x, n.y] + ")"
                        }),
                        e.select("path").each(s)
                    }),
                    m.changeColorScheme(m.colorScheme),
                    m.animation && m.force.start(),
                    m.updateStyle()
                }
                ,
                m.setSize()
            }
            ;			
            var o = function(n) {
                return n && n.__esModule ? n : {
                    default: n
                }
            }(e(1));
            e(2);
            var a = e(6)
              , u = e(8)
              , l = e(7)
        }	
        , */ function(n, t, e) {
            var r, i;
            !function() {
                function o(n) {
                    return n && (n.ownerDocument || n.document || n).documentElement
                }
                function a(n) {
                    return n && (n.ownerDocument && n.ownerDocument.defaultView || n.document && n || n.defaultView)
                }
                function u(n, t) {
                    return t > n ? -1 : n > t ? 1 : n >= t ? 0 : NaN
                }
                function l(n) {
                    return null === n ? NaN : +n
                }
                function s(n) {
                    return !isNaN(n)
                }
                function c(n) {
                    return {
                        left: function(t, e, r, i) {
                            for (arguments.length < 3 && (r = 0),
                            arguments.length < 4 && (i = t.length); i > r; ) {
                                var o = r + i >>> 1;
                                n(t[o], e) < 0 ? r = o + 1 : i = o
                            }
                            return r
                        },
                        right: function(t, e, r, i) {
                            for (arguments.length < 3 && (r = 0),
                            arguments.length < 4 && (i = t.length); i > r; ) {
                                var o = r + i >>> 1;
                                n(t[o], e) > 0 ? i = o : r = o + 1
                            }
                            return r
                        }
                    }
                }
                function f(n) {
                    return n.length
                }
                function h(n, t) {
                    for (var e in t)
                        Object.defineProperty(n.prototype, e, {
                            value: t[e],
                            enumerable: !1
                        })
                }
                function p() {
                    this._ = Object.create(null)
                }
                function d(n) {
                    return (n += "") === so || n[0] === co ? co + n : n
                }
                function g(n) {
                    return (n += "")[0] === co ? n.slice(1) : n
                }
                function v(n) {
                    return d(n)in this._
                }
                function m(n) {
                    return (n = d(n))in this._ && delete this._[n]
                }
                function y() {
                    var n = [];
                    for (var t in this._)
                        n.push(g(t));
                    return n
                }
                function x() {
                    var n = 0;
                    for (var t in this._)
                        ++n;
                    return n
                }
                function b() {
                    for (var n in this._)
                        return !1;
                    return !0
                }
                function k() {
                    this._ = Object.create(null)
                }
                function M(n) {
                    return n
                }
                function w(n, t, e) {
                    return function() {
                        var r = e.apply(t, arguments);
                        return r === t ? n : r
                    }
                }
                function _(n, t) {
                    if (t in n)
                        return t;
                    t = t.charAt(0).toUpperCase() + t.slice(1);
                    for (var e = 0, r = fo.length; r > e; ++e) {
                        var i = fo[e] + t;
                        if (i in n)
                            return i
                    }
                }
                function N() {}
                function S() {}
                function A(n) {
                    function t() {
                        for (var t, r = e, i = -1, o = r.length; ++i < o; )
                            (t = r[i].on) && t.apply(this, arguments);
                        return n
                    }
                    var e = []
                      , r = new p;
                    return t.on = function(t, i) {
                        var o, a = r.get(t);
                        return arguments.length < 2 ? a && a.on : (a && (a.on = null,
                        e = e.slice(0, o = e.indexOf(a)).concat(e.slice(o + 1)),
                        r.remove(t)),
                        i && e.push(r.set(t, {
                            on: i
                        })),
                        n)
                    }
                    ,
                    t
                }
                function L() {
                    Ki.event.preventDefault()
                }
                function E() {
                    for (var n, t = Ki.event; n = t.sourceEvent; )
                        t = n;
                    return t
                }
                function T(n) {
                    for (var t = new S, e = 0, r = arguments.length; ++e < r; )
                        t[arguments[e]] = A(t);
                    return t.of = function(e, r) {
                        return function(i) {
                            try {
                                var o = i.sourceEvent = Ki.event;
                                i.target = n,
                                Ki.event = i,
                                t[i.type].apply(e, r)
                            } finally {
                                Ki.event = o
                            }
                        }
                    }
                    ,
                    t
                }
                function C(n) {
                    return po(n, yo),
                    n
                }
                function z(n) {
                    return "function" == typeof n ? n : function() {
                        return go(n, this)
                    }
                }
                function P(n) {
                    return "function" == typeof n ? n : function() {
                        return vo(n, this)
                    }
                }
                function O(n, t) {
                    return n = Ki.ns.qualify(n),
                    null == t ? n.local ? function() {
                        this.removeAttributeNS(n.space, n.local)
                    }
                    : function() {
                        this.removeAttribute(n)
                    }
                    : "function" == typeof t ? n.local ? function() {
                        var e = t.apply(this, arguments);
                        null == e ? this.removeAttributeNS(n.space, n.local) : this.setAttributeNS(n.space, n.local, e)
                    }
                    : function() {
                        var e = t.apply(this, arguments);
                        null == e ? this.removeAttribute(n) : this.setAttribute(n, e)
                    }
                    : n.local ? function() {
                        this.setAttributeNS(n.space, n.local, t)
                    }
                    : function() {
                        this.setAttribute(n, t)
                    }
                }
                function q(n) {
                    return n.trim().replace(/\s+/g, " ")
                }
                function R(n) {
                    return new RegExp("(?:^|\\s+)" + Ki.requote(n) + "(?:\\s+|$)","g")
                }
                function j(n) {
                    return (n + "").trim().split(/^|\s+/)
                }
                function U(n, t) {
                    var e = (n = j(n).map(D)).length;
                    return "function" == typeof t ? function() {
                        for (var r = -1, i = t.apply(this, arguments); ++r < e; )
                            n[r](this, i)
                    }
                    : function() {
                        for (var r = -1; ++r < e; )
                            n[r](this, t)
                    }
                }
                function D(n) {
                    var t = R(n);
                    return function(e, r) {
                        if (i = e.classList)
                            return r ? i.add(n) : i.remove(n);
                        var i = e.getAttribute("class") || "";
                        r ? (t.lastIndex = 0,
                        t.test(i) || e.setAttribute("class", q(i + " " + n))) : e.setAttribute("class", q(i.replace(t, " ")))
                    }
                }
                function F(n, t, e) {
                    return null == t ? function() {
                        this.style.removeProperty(n)
                    }
                    : "function" == typeof t ? function() {
                        var r = t.apply(this, arguments);
                        null == r ? this.style.removeProperty(n) : this.style.setProperty(n, r, e)
                    }
                    : function() {
                        this.style.setProperty(n, t, e)
                    }
                }
                function I(n, t) {
                    return null == t ? function() {
                        delete this[n]
                    }
                    : "function" == typeof t ? function() {
                        var e = t.apply(this, arguments);
                        null == e ? delete this[n] : this[n] = e
                    }
                    : function() {
                        this[n] = t
                    }
                }
                function H(n) {
                    return "function" == typeof n ? n : (n = Ki.ns.qualify(n)).local ? function() {
                        return this.ownerDocument.createElementNS(n.space, n.local)
                    }
                    : function() {
                        var t = this.ownerDocument
                          , e = this.namespaceURI;
                        return e ? t.createElementNS(e, n) : t.createElement(n)
                    }
                }
                function B() {
                    var n = this.parentNode;
                    n && n.removeChild(this)
                }
                function V(n) {
                    return {
                        __data__: n
                    }
                }
                function Y(n) {
                    return function() {
                        return mo(this, n)
                    }
                }
                function X(n, t) {
                    for (var e = 0, r = n.length; r > e; e++)
                        for (var i, o = n[e], a = 0, u = o.length; u > a; a++)
                            (i = o[a]) && t(i, a, e);
                    return n
                }
                function W(n) {
                    return po(n, bo),
                    n
                }
                function J(n, t, e) {
                    function r() {
                        var t = this[i];
                        t && (this.removeEventListener(n, t, t.$),
                        delete this[i])
                    }
                    var i = "__on" + n
                      , o = n.indexOf(".")
                      , a = G;
                    o > 0 && (n = n.slice(0, o));
                    var u = ko.get(n);
                    return u && (n = u,
                    a = Z),
                    o ? t ? function() {
                        var o = a(t, no(arguments));
                        r.call(this),
                        this.addEventListener(n, this[i] = o, o.$ = e),
                        o._ = t
                    }
                    : r : t ? N : function() {
                        var t, e = new RegExp("^__on([^.]+)" + Ki.requote(n) + "$");
                        for (var r in this)
                            if (t = r.match(e)) {
                                var i = this[r];
                                this.removeEventListener(t[1], i, i.$),
                                delete this[r]
                            }
                    }
                }
                function G(n, t) {
                    return function(e) {
                        var r = Ki.event;
                        Ki.event = e,
                        t[0] = this.__data__;
                        try {
                            n.apply(this, t)
                        } finally {
                            Ki.event = r
                        }
                    }
                }
                function Z(n, t) {
                    var e = G(n, t);
                    return function(n) {
                        var t = this
                          , r = n.relatedTarget;
                        r && (r === t || 8 & r.compareDocumentPosition(t)) || e.call(t, n)
                    }
                }
                function $(n) {
                    var t = ".dragsuppress-" + ++wo
                      , e = "click" + t
                      , r = Ki.select(a(n)).on("touchmove" + t, L).on("dragstart" + t, L).on("selectstart" + t, L);
                    if (null == Mo && (Mo = !("onselectstart"in n) && _(n.style, "userSelect")),
                    Mo) {
                        var i = o(n).style
                          , u = i[Mo];
                        i[Mo] = "none"
                    }
                    return function(n) {
                        if (r.on(t, null),
                        Mo && (i[Mo] = u),
                        n) {
                            var o = function() {
                                r.on(e, null)
                            };
                            r.on(e, function() {
                                L(),
                                o()
                            }, !0),
                            setTimeout(o, 0)
                        }
                    }
                }
                function K(n, t) {
                    t.changedTouches && (t = t.changedTouches[0]);
                    var e = n.ownerSVGElement || n;
                    if (e.createSVGPoint) {
                        var r = e.createSVGPoint();
                        if (0 > _o) {
                            var i = a(n);
                            if (i.scrollX || i.scrollY) {
                                var o = (e = Ki.select("body").append("svg").style({
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    margin: 0,
                                    padding: 0,
                                    border: "none"
                                }, "important"))[0][0].getScreenCTM();
                                _o = !(o.f || o.e),
                                e.remove()
                            }
                        }
                        return _o ? (r.x = t.pageX,
                        r.y = t.pageY) : (r.x = t.clientX,
                        r.y = t.clientY),
                        [(r = r.matrixTransform(n.getScreenCTM().inverse())).x, r.y]
                    }
                    var u = n.getBoundingClientRect();
                    return [t.clientX - u.left - n.clientLeft, t.clientY - u.top - n.clientTop]
                }
                function Q() {
                    return Ki.event.changedTouches[0].identifier
                }
                function nn(n) {
                    return n > 0 ? 1 : 0 > n ? -1 : 0
                }
                function tn(n, t, e) {
                    return (t[0] - n[0]) * (e[1] - n[1]) - (t[1] - n[1]) * (e[0] - n[0])
                }
                function en(n) {
                    return n > 1 ? 0 : -1 > n ? Ao : Math.acos(n)
                }
                function rn(n) {
                    return n > 1 ? To : -1 > n ? -To : Math.asin(n)
                }
                function on(n) {
                    return ((n = Math.exp(n)) + 1 / n) / 2
                }
                function an(n) {
                    return (n = Math.sin(n / 2)) * n
                }
                function un() {}
                function ln(n, t, e) {
                    return this instanceof ln ? (this.h = +n,
                    this.s = +t,
                    void (this.l = +e)) : arguments.length < 2 ? n instanceof ln ? new ln(n.h,n.s,n.l) : Mn("" + n, wn, ln) : new ln(n,t,e)
                }
                function sn(n, t, e) {
                    function r(n) {
                        return Math.round(255 * function(n) {
                            return n > 360 ? n -= 360 : 0 > n && (n += 360),
                            60 > n ? i + (o - i) * n / 60 : 180 > n ? o : 240 > n ? i + (o - i) * (240 - n) / 60 : i
                        }(n))
                    }
                    var i, o;
                    return n = isNaN(n) ? 0 : (n %= 360) < 0 ? n + 360 : n,
                    t = isNaN(t) ? 0 : 0 > t ? 0 : t > 1 ? 1 : t,
                    i = 2 * (e = 0 > e ? 0 : e > 1 ? 1 : e) - (o = .5 >= e ? e * (1 + t) : e + t - e * t),
                    new yn(r(n + 120),r(n),r(n - 120))
                }
                function cn(n, t, e) {
                    return this instanceof cn ? (this.h = +n,
                    this.c = +t,
                    void (this.l = +e)) : arguments.length < 2 ? n instanceof cn ? new cn(n.h,n.c,n.l) : dn(n instanceof hn ? n.l : (n = _n((n = Ki.rgb(n)).r, n.g, n.b)).l, n.a, n.b) : new cn(n,t,e)
                }
                function fn(n, t, e) {
                    return isNaN(n) && (n = 0),
                    isNaN(t) && (t = 0),
                    new hn(e,Math.cos(n *= Co) * t,Math.sin(n) * t)
                }
                function hn(n, t, e) {
                    return this instanceof hn ? (this.l = +n,
                    this.a = +t,
                    void (this.b = +e)) : arguments.length < 2 ? n instanceof hn ? new hn(n.l,n.a,n.b) : n instanceof cn ? fn(n.h, n.c, n.l) : _n((n = yn(n)).r, n.g, n.b) : new hn(n,t,e)
                }
                function pn(n, t, e) {
                    var r = (n + 16) / 116
                      , i = r + t / 500
                      , o = r - e / 200;
                    return new yn(mn(3.2404542 * (i = gn(i) * Fo) - 1.5371385 * (r = gn(r) * Io) - .4985314 * (o = gn(o) * Ho)),mn(-.969266 * i + 1.8760108 * r + .041556 * o),mn(.0556434 * i - .2040259 * r + 1.0572252 * o))
                }
                function dn(n, t, e) {
                    return n > 0 ? new cn(Math.atan2(e, t) * zo,Math.sqrt(t * t + e * e),n) : new cn(NaN,NaN,n)
                }
                function gn(n) {
                    return n > .206893034 ? n * n * n : (n - 4 / 29) / 7.787037
                }
                function vn(n) {
                    return n > .008856 ? Math.pow(n, 1 / 3) : 7.787037 * n + 4 / 29
                }
                function mn(n) {
                    return Math.round(255 * (.00304 >= n ? 12.92 * n : 1.055 * Math.pow(n, 1 / 2.4) - .055))
                }
                function yn(n, t, e) {
                    return this instanceof yn ? (this.r = ~~n,
                    this.g = ~~t,
                    void (this.b = ~~e)) : arguments.length < 2 ? n instanceof yn ? new yn(n.r,n.g,n.b) : Mn("" + n, yn, sn) : new yn(n,t,e)
                }
                function xn(n) {
                    return new yn(n >> 16,n >> 8 & 255,255 & n)
                }
                function bn(n) {
                    return xn(n) + ""
                }
                function kn(n) {
                    return 16 > n ? "0" + Math.max(0, n).toString(16) : Math.min(255, n).toString(16)
                }
                function Mn(n, t, e) {
                    var r, i, o, a = 0, u = 0, l = 0;
                    if (r = /([a-z]+)\((.*)\)/.exec(n = n.toLowerCase()))
                        switch (i = r[2].split(","),
                        r[1]) {
                        case "hsl":
                            return e(parseFloat(i[0]), parseFloat(i[1]) / 100, parseFloat(i[2]) / 100);
                        case "rgb":
                            return t(Sn(i[0]), Sn(i[1]), Sn(i[2]))
                        }
                    return (o = Yo.get(n)) ? t(o.r, o.g, o.b) : (null == n || "#" !== n.charAt(0) || isNaN(o = parseInt(n.slice(1), 16)) || (4 === n.length ? (a = (3840 & o) >> 4,
                    a |= a >> 4,
                    u = 240 & o,
                    u |= u >> 4,
                    l = 15 & o,
                    l |= l << 4) : 7 === n.length && (a = (16711680 & o) >> 16,
                    u = (65280 & o) >> 8,
                    l = 255 & o)),
                    t(a, u, l))
                }
                function wn(n, t, e) {
                    var r, i, o = Math.min(n /= 255, t /= 255, e /= 255), a = Math.max(n, t, e), u = a - o, l = (a + o) / 2;
                    return u ? (i = .5 > l ? u / (a + o) : u / (2 - a - o),
                    r = n == a ? (t - e) / u + (e > t ? 6 : 0) : t == a ? (e - n) / u + 2 : (n - t) / u + 4,
                    r *= 60) : (r = NaN,
                    i = l > 0 && 1 > l ? 0 : r),
                    new ln(r,i,l)
                }
                function _n(n, t, e) {
                    var r = vn((.4124564 * (n = Nn(n)) + .3575761 * (t = Nn(t)) + .1804375 * (e = Nn(e))) / Fo)
                      , i = vn((.2126729 * n + .7151522 * t + .072175 * e) / Io);
                    return hn(116 * i - 16, 500 * (r - i), 200 * (i - vn((.0193339 * n + .119192 * t + .9503041 * e) / Ho)))
                }
                function Nn(n) {
                    return (n /= 255) <= .04045 ? n / 12.92 : Math.pow((n + .055) / 1.055, 2.4)
                }
                function Sn(n) {
                    var t = parseFloat(n);
                    return "%" === n.charAt(n.length - 1) ? Math.round(2.55 * t) : t
                }
                function An(n) {
                    return "function" == typeof n ? n : function() {
                        return n
                    }
                }
                function Ln(n) {
                    return function(t, e, r) {
                        return 2 === arguments.length && "function" == typeof e && (r = e,
                        e = null),
                        En(t, e, n, r)
                    }
                }
                function En(n, t, e, r) {
                    function i() {
                        var n, t = l.status;
                        if (!t && function(n) {
                            var t = n.responseType;
                            return t && "text" !== t ? n.response : n.responseText
                        }(l) || t >= 200 && 300 > t || 304 === t) {
                            try {
                                n = e.call(o, l)
                            } catch (n) {
                                return void a.error.call(o, n)
                            }
                            a.load.call(o, n)
                        } else
                            a.error.call(o, l)
                    }
                    var o = {}
                      , a = Ki.dispatch("beforesend", "progress", "load", "error")
                      , u = {}
                      , l = new XMLHttpRequest
                      , s = null;
                    return !this.XDomainRequest || "withCredentials"in l || !/^(http(s)?:)?\/\//.test(n) || (l = new XDomainRequest),
                    "onload"in l ? l.onload = l.onerror = i : l.onreadystatechange = function() {
                        l.readyState > 3 && i()
                    }
                    ,
                    l.onprogress = function(n) {
                        var t = Ki.event;
                        Ki.event = n;
                        try {
                            a.progress.call(o, l)
                        } finally {
                            Ki.event = t
                        }
                    }
                    ,
                    o.header = function(n, t) {
                        return n = (n + "").toLowerCase(),
                        arguments.length < 2 ? u[n] : (null == t ? delete u[n] : u[n] = t + "",
                        o)
                    }
                    ,
                    o.mimeType = function(n) {
                        return arguments.length ? (t = null == n ? null : n + "",
                        o) : t
                    }
                    ,
                    o.responseType = function(n) {
                        return arguments.length ? (s = n,
                        o) : s
                    }
                    ,
                    o.response = function(n) {
                        return e = n,
                        o
                    }
                    ,
                    ["get", "post"].forEach(function(n) {
                        o[n] = function() {
                            return o.send.apply(o, [n].concat(no(arguments)))
                        }
                    }),
                    o.send = function(e, r, i) {
                        if (2 === arguments.length && "function" == typeof r && (i = r,
                        r = null),
                        l.open(e, n, !0),
                        null == t || "accept"in u || (u.accept = t + ",*/*"),
                        l.setRequestHeader)
                            for (var c in u)
                                l.setRequestHeader(c, u[c]);
                        return null != t && l.overrideMimeType && l.overrideMimeType(t),
                        null != s && (l.responseType = s),
                        null != i && o.on("error", i).on("load", function(n) {
                            i(null, n)
                        }),
                        a.beforesend.call(o, l),
                        l.send(null == r ? null : r),
                        o
                    }
                    ,
                    o.abort = function() {
                        return l.abort(),
                        o
                    }
                    ,
                    Ki.rebind(o, a, "on"),
                    null == r ? o : o.get(function(n) {
                        return 1 === n.length ? function(t, e) {
                            n(null == t ? e : null)
                        }
                        : n
                    }(r))
                }
                function Tn(n, t, e) {
                    var r = arguments.length;
                    2 > r && (t = 0),
                    3 > r && (e = Date.now());
                    var i = {
                        c: n,
                        t: e + t,
                        n: null
                    };
                    return Wo ? Wo.n = i : Xo = i,
                    Wo = i,
                    Jo || (Go = clearTimeout(Go),
                    Jo = 1,
                    Zo(Cn)),
                    i
                }
                function Cn() {
                    var n = zn()
                      , t = Pn() - n;
                    t > 24 ? (isFinite(t) && (clearTimeout(Go),
                    Go = setTimeout(Cn, t)),
                    Jo = 0) : (Jo = 1,
                    Zo(Cn))
                }
                function zn() {
                    for (var n = Date.now(), t = Xo; t; )
                        n >= t.t && t.c(n - t.t) && (t.c = null),
                        t = t.n;
                    return n
                }
                function Pn() {
                    for (var n, t = Xo, e = 1 / 0; t; )
                        t.c ? (t.t < e && (e = t.t),
                        t = (n = t).n) : t = n ? n.n = t.n : Xo = t.n;
                    return Wo = n,
                    e
                }
                function On(n, t) {
                    return t - (n ? Math.ceil(Math.log(n) / Math.LN10) : 1)
                }
                function qn(n) {
                    return n + ""
                }
                function Rn() {
                    this._ = new Date(arguments.length > 1 ? Date.UTC.apply(this, arguments) : arguments[0])
                }
                function jn(n, t, e) {
                    function r(t) {
                        var e = n(t)
                          , r = o(e, 1);
                        return r - t > t - e ? e : r
                    }
                    function i(e) {
                        return t(e = n(new ta(e - 1)), 1),
                        e
                    }
                    function o(n, e) {
                        return t(n = new ta(+n), e),
                        n
                    }
                    function a(n, r, o) {
                        var a = i(n)
                          , u = [];
                        if (o > 1)
                            for (; r > a; )
                                e(a) % o || u.push(new Date(+a)),
                                t(a, 1);
                        else
                            for (; r > a; )
                                u.push(new Date(+a)),
                                t(a, 1);
                        return u
                    }
                    n.floor = n,
                    n.round = r,
                    n.ceil = i,
                    n.offset = o,
                    n.range = a;
                    var u = n.utc = Un(n);
                    return u.floor = u,
                    u.round = Un(r),
                    u.ceil = Un(i),
                    u.offset = Un(o),
                    u.range = function(n, t, e) {
                        try {
                            ta = Rn;
                            var r = new Rn;
                            return r._ = n,
                            a(r, t, e)
                        } finally {
                            ta = Date
                        }
                    }
                    ,
                    n
                }
                function Un(n) {
                    return function(t, e) {
                        try {
                            ta = Rn;
                            var r = new Rn;
                            return r._ = t,
                            n(r, e)._
                        } finally {
                            ta = Date
                        }
                    }
                }
                function Dn(n, t, e) {
                    var r = 0 > n ? "-" : ""
                      , i = (r ? -n : n) + ""
                      , o = i.length;
                    return r + (e > o ? new Array(e - o + 1).join(t) + i : i)
                }
                function Fn(n) {
                    return new RegExp("^(?:" + n.map(Ki.requote).join("|") + ")","i")
                }
                function In(n) {
                    for (var t = new p, e = -1, r = n.length; ++e < r; )
                        t.set(n[e].toLowerCase(), e);
                    return t
                }
                function Hn(n, t, e) {
                    ia.lastIndex = 0;
                    var r = ia.exec(t.slice(e, e + 1));
                    return r ? (n.w = +r[0],
                    e + r[0].length) : -1
                }
                function Bn(n, t, e) {
                    ia.lastIndex = 0;
                    var r = ia.exec(t.slice(e));
                    return r ? (n.U = +r[0],
                    e + r[0].length) : -1
                }
                function Vn(n, t, e) {
                    ia.lastIndex = 0;
                    var r = ia.exec(t.slice(e));
                    return r ? (n.W = +r[0],
                    e + r[0].length) : -1
                }
                function Yn(n, t, e) {
                    ia.lastIndex = 0;
                    var r = ia.exec(t.slice(e, e + 4));
                    return r ? (n.y = +r[0],
                    e + r[0].length) : -1
                }
                function Xn(n, t, e) {
                    ia.lastIndex = 0;
                    var r = ia.exec(t.slice(e, e + 2));
                    return r ? (n.y = function(n) {
                        return n + (n > 68 ? 1900 : 2e3)
                    }(+r[0]),
                    e + r[0].length) : -1
                }
                function Wn(n, t, e) {
                    return /^[+-]\d{4}$/.test(t = t.slice(e, e + 5)) ? (n.Z = -t,
                    e + 5) : -1
                }
                function Jn(n, t, e) {
                    ia.lastIndex = 0;
                    var r = ia.exec(t.slice(e, e + 2));
                    return r ? (n.m = r[0] - 1,
                    e + r[0].length) : -1
                }
                function Gn(n, t, e) {
                    ia.lastIndex = 0;
                    var r = ia.exec(t.slice(e, e + 2));
                    return r ? (n.d = +r[0],
                    e + r[0].length) : -1
                }
                function Zn(n, t, e) {
                    ia.lastIndex = 0;
                    var r = ia.exec(t.slice(e, e + 3));
                    return r ? (n.j = +r[0],
                    e + r[0].length) : -1
                }
                function $n(n, t, e) {
                    ia.lastIndex = 0;
                    var r = ia.exec(t.slice(e, e + 2));
                    return r ? (n.H = +r[0],
                    e + r[0].length) : -1
                }
                function Kn(n, t, e) {
                    ia.lastIndex = 0;
                    var r = ia.exec(t.slice(e, e + 2));
                    return r ? (n.M = +r[0],
                    e + r[0].length) : -1
                }
                function Qn(n, t, e) {
                    ia.lastIndex = 0;
                    var r = ia.exec(t.slice(e, e + 2));
                    return r ? (n.S = +r[0],
                    e + r[0].length) : -1
                }
                function nt(n, t, e) {
                    ia.lastIndex = 0;
                    var r = ia.exec(t.slice(e, e + 3));
                    return r ? (n.L = +r[0],
                    e + r[0].length) : -1
                }
                function tt(n) {
                    var t = n.getTimezoneOffset()
                      , e = t > 0 ? "-" : "+"
                      , r = lo(t) / 60 | 0
                      , i = lo(t) % 60;
                    return e + Dn(r, "0", 2) + Dn(i, "0", 2)
                }
                function et(n, t, e) {
                    oa.lastIndex = 0;
                    var r = oa.exec(t.slice(e, e + 1));
                    return r ? e + r[0].length : -1
                }
                function rt(n) {
                    for (var t = n.length, e = -1; ++e < t; )
                        n[e][0] = this(n[e][0]);
                    return function(t) {
                        for (var e = 0, r = n[e]; !r[1](t); )
                            r = n[++e];
                        return r[0](t)
                    }
                }
                function it() {}
                function ot(n, t, e) {
                    var r = e.s = n + t
                      , i = r - n
                      , o = r - i;
                    e.t = n - o + (t - i)
                }
                function at(n, t) {
                    n && sa.hasOwnProperty(n.type) && sa[n.type](n, t)
                }
                function ut(n, t, e) {
                    var r, i = -1, o = n.length - e;
                    for (t.lineStart(); ++i < o; )
                        r = n[i],
                        t.point(r[0], r[1], r[2]);
                    t.lineEnd()
                }
                function lt(n, t) {
                    var e = -1
                      , r = n.length;
                    for (t.polygonStart(); ++e < r; )
                        ut(n[e], t, 1);
                    t.polygonEnd()
                }
                function st() {
                    function n(n, t) {
                        t = t * Co / 2 + Ao / 4;
                        var e = (n *= Co) - r
                          , a = e >= 0 ? 1 : -1
                          , u = a * e
                          , l = Math.cos(t)
                          , s = Math.sin(t)
                          , c = o * s
                          , f = i * l + c * Math.cos(u)
                          , h = c * a * Math.sin(u);
                        fa.add(Math.atan2(h, f)),
                        r = n,
                        i = l,
                        o = s
                    }
                    var t, e, r, i, o;
                    ha.point = function(a, u) {
                        ha.point = n,
                        r = (t = a) * Co,
                        i = Math.cos(u = (e = u) * Co / 2 + Ao / 4),
                        o = Math.sin(u)
                    }
                    ,
                    ha.lineEnd = function() {
                        n(t, e)
                    }
                }
                function ct(n) {
                    var t = n[0]
                      , e = n[1]
                      , r = Math.cos(e);
                    return [r * Math.cos(t), r * Math.sin(t), Math.sin(e)]
                }
                function ft(n, t) {
                    return n[0] * t[0] + n[1] * t[1] + n[2] * t[2]
                }
                function ht(n, t) {
                    return [n[1] * t[2] - n[2] * t[1], n[2] * t[0] - n[0] * t[2], n[0] * t[1] - n[1] * t[0]]
                }
                function pt(n, t) {
                    n[0] += t[0],
                    n[1] += t[1],
                    n[2] += t[2]
                }
                function dt(n, t) {
                    return [n[0] * t, n[1] * t, n[2] * t]
                }
                function gt(n) {
                    var t = Math.sqrt(n[0] * n[0] + n[1] * n[1] + n[2] * n[2]);
                    n[0] /= t,
                    n[1] /= t,
                    n[2] /= t
                }
                function vt(n) {
                    return [Math.atan2(n[1], n[0]), rn(n[2])]
                }
                function mt(n, t) {
                    return lo(n[0] - t[0]) < No && lo(n[1] - t[1]) < No
                }
                function yt(n, t) {
                    n *= Co;
                    var e = Math.cos(t *= Co);
                    xt(e * Math.cos(n), e * Math.sin(n), Math.sin(t))
                }
                function xt(n, t, e) {
                    ga += (n - ga) / ++pa,
                    va += (t - va) / pa,
                    ma += (e - ma) / pa
                }
                function bt() {
                    function n(n, i) {
                        n *= Co;
                        var o = Math.cos(i *= Co)
                          , a = o * Math.cos(n)
                          , u = o * Math.sin(n)
                          , l = Math.sin(i)
                          , s = Math.atan2(Math.sqrt((s = e * l - r * u) * s + (s = r * a - t * l) * s + (s = t * u - e * a) * s), t * a + e * u + r * l);
                        da += s,
                        ya += s * (t + (t = a)),
                        xa += s * (e + (e = u)),
                        ba += s * (r + (r = l)),
                        xt(t, e, r)
                    }
                    var t, e, r;
                    _a.point = function(i, o) {
                        i *= Co;
                        var a = Math.cos(o *= Co);
                        t = a * Math.cos(i),
                        e = a * Math.sin(i),
                        r = Math.sin(o),
                        _a.point = n,
                        xt(t, e, r)
                    }
                }
                function kt() {
                    _a.point = yt
                }
                function Mt() {
                    function n(n, t) {
                        n *= Co;
                        var e = Math.cos(t *= Co)
                          , a = e * Math.cos(n)
                          , u = e * Math.sin(n)
                          , l = Math.sin(t)
                          , s = i * l - o * u
                          , c = o * a - r * l
                          , f = r * u - i * a
                          , h = Math.sqrt(s * s + c * c + f * f)
                          , p = r * a + i * u + o * l
                          , d = h && -en(p) / h
                          , g = Math.atan2(h, p);
                        ka += d * s,
                        Ma += d * c,
                        wa += d * f,
                        da += g,
                        ya += g * (r + (r = a)),
                        xa += g * (i + (i = u)),
                        ba += g * (o + (o = l)),
                        xt(r, i, o)
                    }
                    var t, e, r, i, o;
                    _a.point = function(a, u) {
                        t = a,
                        e = u,
                        _a.point = n,
                        a *= Co;
                        var l = Math.cos(u *= Co);
                        r = l * Math.cos(a),
                        i = l * Math.sin(a),
                        o = Math.sin(u),
                        xt(r, i, o)
                    }
                    ,
                    _a.lineEnd = function() {
                        n(t, e),
                        _a.lineEnd = kt,
                        _a.point = yt
                    }
                }
                function wt(n, t) {
                    function e(e, r) {
                        return e = n(e, r),
                        t(e[0], e[1])
                    }
                    return n.invert && t.invert && (e.invert = function(e, r) {
                        return (e = t.invert(e, r)) && n.invert(e[0], e[1])
                    }
                    ),
                    e
                }
                function _t() {
                    return !0
                }
                function Nt(n, t, e, r, i) {
                    var o = []
                      , a = [];
                    if (n.forEach(function(n) {
                        if (!((t = n.length - 1) <= 0)) {
                            var t, e = n[0], r = n[t];
                            if (mt(e, r)) {
                                i.lineStart();
                                for (var u = 0; t > u; ++u)
                                    i.point((e = n[u])[0], e[1]);
                                return void i.lineEnd()
                            }
                            var l = new At(e,n,null,!0)
                              , s = new At(e,null,l,!1);
                            l.o = s,
                            o.push(l),
                            a.push(s),
                            s = new At(r,null,l = new At(r,n,null,!1),!0),
                            l.o = s,
                            o.push(l),
                            a.push(s)
                        }
                    }),
                    a.sort(t),
                    St(o),
                    St(a),
                    o.length) {
                        for (var u = 0, l = e, s = a.length; s > u; ++u)
                            a[u].e = l = !l;
                        for (var c, f, h = o[0]; ; ) {
                            for (var p = h, d = !0; p.v; )
                                if ((p = p.n) === h)
                                    return;
                            c = p.z,
                            i.lineStart();
                            do {
                                if (p.v = p.o.v = !0,
                                p.e) {
                                    if (d)
                                        for (u = 0,
                                        s = c.length; s > u; ++u)
                                            i.point((f = c[u])[0], f[1]);
                                    else
                                        r(p.x, p.n.x, 1, i);
                                    p = p.n
                                } else {
                                    if (d)
                                        for (u = (c = p.p.z).length - 1; u >= 0; --u)
                                            i.point((f = c[u])[0], f[1]);
                                    else
                                        r(p.x, p.p.x, -1, i);
                                    p = p.p
                                }
                                c = (p = p.o).z,
                                d = !d
                            } while (!p.v);
                            i.lineEnd()
                        }
                    }
                }
                function St(n) {
                    if (t = n.length) {
                        for (var t, e, r = 0, i = n[0]; ++r < t; )
                            i.n = e = n[r],
                            e.p = i,
                            i = e;
                        i.n = e = n[0],
                        e.p = i
                    }
                }
                function At(n, t, e, r) {
                    this.x = n,
                    this.z = t,
                    this.o = e,
                    this.e = r,
                    this.v = !1,
                    this.n = this.p = null
                }
                function Lt(n, t, e, r) {
                    return function(i, o) {
                        function a(t, e) {
                            var r = i(t, e);
                            n(t = r[0], e = r[1]) && o.point(t, e)
                        }
                        function u(n, t) {
                            var e = i(n, t);
                            v.point(e[0], e[1])
                        }
                        function l() {
                            y.point = u,
                            v.lineStart()
                        }
                        function s() {
                            y.point = a,
                            v.lineEnd()
                        }
                        function c(n, t) {
                            g.push([n, t]);
                            var e = i(n, t);
                            b.point(e[0], e[1])
                        }
                        function f() {
                            b.lineStart(),
                            g = []
                        }
                        function h() {
                            c(g[0][0], g[0][1]),
                            b.lineEnd();
                            var n, t = b.clean(), e = x.buffer(), r = e.length;
                            if (g.pop(),
                            d.push(g),
                            g = null,
                            r)
                                if (1 & t) {
                                    var i, a = -1;
                                    if ((r = (n = e[0]).length - 1) > 0) {
                                        for (k || (o.polygonStart(),
                                        k = !0),
                                        o.lineStart(); ++a < r; )
                                            o.point((i = n[a])[0], i[1]);
                                        o.lineEnd()
                                    }
                                } else
                                    r > 1 && 2 & t && e.push(e.pop().concat(e.shift())),
                                    p.push(e.filter(Et))
                        }
                        var p, d, g, v = t(o), m = i.invert(r[0], r[1]), y = {
                            point: a,
                            lineStart: l,
                            lineEnd: s,
                            polygonStart: function() {
                                y.point = c,
                                y.lineStart = f,
                                y.lineEnd = h,
                                p = [],
                                d = []
                            },
                            polygonEnd: function() {
                                y.point = a,
                                y.lineStart = l,
                                y.lineEnd = s,
                                p = Ki.merge(p);
                                var n = function(n, t) {
                                    var e = n[0]
                                      , r = n[1]
                                      , i = [Math.sin(e), -Math.cos(e), 0]
                                      , o = 0
                                      , a = 0;
                                    fa.reset();
                                    for (var u = 0, l = t.length; l > u; ++u) {
                                        var s = t[u]
                                          , c = s.length;
                                        if (c)
                                            for (var f = s[0], h = f[0], p = f[1] / 2 + Ao / 4, d = Math.sin(p), g = Math.cos(p), v = 1; ; ) {
                                                v === c && (v = 0);
                                                var m = (n = s[v])[0]
                                                  , y = n[1] / 2 + Ao / 4
                                                  , x = Math.sin(y)
                                                  , b = Math.cos(y)
                                                  , k = m - h
                                                  , M = k >= 0 ? 1 : -1
                                                  , w = M * k
                                                  , _ = w > Ao
                                                  , N = d * x;
                                                if (fa.add(Math.atan2(N * M * Math.sin(w), g * b + N * Math.cos(w))),
                                                o += _ ? k + M * Lo : k,
                                                _ ^ h >= e ^ m >= e) {
                                                    var S = ht(ct(f), ct(n));
                                                    gt(S);
                                                    var A = ht(i, S);
                                                    gt(A);
                                                    var L = (_ ^ k >= 0 ? -1 : 1) * rn(A[2]);
                                                    (r > L || r === L && (S[0] || S[1])) && (a += _ ^ k >= 0 ? 1 : -1)
                                                }
                                                if (!v++)
                                                    break;
                                                h = m,
                                                d = x,
                                                g = b,
                                                f = n
                                            }
                                    }
                                    return (-No > o || No > o && 0 > fa) ^ 1 & a
                                }(m, d);
                                p.length ? (k || (o.polygonStart(),
                                k = !0),
                                Nt(p, Ct, n, e, o)) : n && (k || (o.polygonStart(),
                                k = !0),
                                o.lineStart(),
                                e(null, null, 1, o),
                                o.lineEnd()),
                                k && (o.polygonEnd(),
                                k = !1),
                                p = d = null
                            },
                            sphere: function() {
                                o.polygonStart(),
                                o.lineStart(),
                                e(null, null, 1, o),
                                o.lineEnd(),
                                o.polygonEnd()
                            }
                        }, x = Tt(), b = t(x), k = !1;
                        return y
                    }
                }
                function Et(n) {
                    return n.length > 1
                }
                function Tt() {
                    var n, t = [];
                    return {
                        lineStart: function() {
                            t.push(n = [])
                        },
                        point: function(t, e) {
                            n.push([t, e])
                        },
                        lineEnd: N,
                        buffer: function() {
                            var e = t;
                            return t = [],
                            n = null,
                            e
                        },
                        rejoin: function() {
                            t.length > 1 && t.push(t.pop().concat(t.shift()))
                        }
                    }
                }
                function Ct(n, t) {
                    return ((n = n.x)[0] < 0 ? n[1] - To - No : To - n[1]) - ((t = t.x)[0] < 0 ? t[1] - To - No : To - t[1])
                }
                function zt(n, t, e, r) {
                    return function(i) {
                        var o, a = i.a, u = i.b, l = a.x, s = a.y, c = 0, f = 1, h = u.x - l, p = u.y - s;
                        if (o = n - l,
                        h || !(o > 0)) {
                            if (o /= h,
                            0 > h) {
                                if (c > o)
                                    return;
                                f > o && (f = o)
                            } else if (h > 0) {
                                if (o > f)
                                    return;
                                o > c && (c = o)
                            }
                            if (o = e - l,
                            h || !(0 > o)) {
                                if (o /= h,
                                0 > h) {
                                    if (o > f)
                                        return;
                                    o > c && (c = o)
                                } else if (h > 0) {
                                    if (c > o)
                                        return;
                                    f > o && (f = o)
                                }
                                if (o = t - s,
                                p || !(o > 0)) {
                                    if (o /= p,
                                    0 > p) {
                                        if (c > o)
                                            return;
                                        f > o && (f = o)
                                    } else if (p > 0) {
                                        if (o > f)
                                            return;
                                        o > c && (c = o)
                                    }
                                    if (o = r - s,
                                    p || !(0 > o)) {
                                        if (o /= p,
                                        0 > p) {
                                            if (o > f)
                                                return;
                                            o > c && (c = o)
                                        } else if (p > 0) {
                                            if (c > o)
                                                return;
                                            f > o && (f = o)
                                        }
                                        return c > 0 && (i.a = {
                                            x: l + c * h,
                                            y: s + c * p
                                        }),
                                        1 > f && (i.b = {
                                            x: l + f * h,
                                            y: s + f * p
                                        }),
                                        i
                                    }
                                }
                            }
                        }
                    }
                }
                function Pt(n, t, e, r) {
                    function i(r, i) {
                        return lo(r[0] - n) < No ? i > 0 ? 0 : 3 : lo(r[0] - e) < No ? i > 0 ? 2 : 1 : lo(r[1] - t) < No ? i > 0 ? 1 : 0 : i > 0 ? 3 : 2
                    }
                    function o(n, t) {
                        return a(n.x, t.x)
                    }
                    function a(n, t) {
                        var e = i(n, 1)
                          , r = i(t, 1);
                        return e !== r ? e - r : 0 === e ? t[1] - n[1] : 1 === e ? n[0] - t[0] : 2 === e ? n[1] - t[1] : t[0] - n[0]
                    }
                    return function(u) {
                        function l(o, u, l, s) {
                            var c = 0
                              , f = 0;
                            if (null == o || (c = i(o, l)) !== (f = i(u, l)) || a(o, u) < 0 ^ l > 0)
                                do {
                                    s.point(0 === c || 3 === c ? n : e, c > 1 ? r : t)
                                } while ((c = (c + l + 4) % 4) !== f);
                            else
                                s.point(u[0], u[1])
                        }
                        function s(i, o) {
                            return i >= n && e >= i && o >= t && r >= o
                        }
                        function c(n, t) {
                            s(n, t) && u.point(n, t)
                        }
                        function f(n, t) {
                            var e = s(n = Math.max(-Sa, Math.min(Sa, n)), t = Math.max(-Sa, Math.min(Sa, t)));
                            if (p && d.push([n, t]),
                            k)
                                g = n,
                                v = t,
                                m = e,
                                k = !1,
                                e && (u.lineStart(),
                                u.point(n, t));
                            else if (e && b)
                                u.point(n, t);
                            else {
                                var r = {
                                    a: {
                                        x: y,
                                        y: x
                                    },
                                    b: {
                                        x: n,
                                        y: t
                                    }
                                };
                                N(r) ? (b || (u.lineStart(),
                                u.point(r.a.x, r.a.y)),
                                u.point(r.b.x, r.b.y),
                                e || u.lineEnd(),
                                M = !1) : e && (u.lineStart(),
                                u.point(n, t),
                                M = !1)
                            }
                            y = n,
                            x = t,
                            b = e
                        }
                        var h, p, d, g, v, m, y, x, b, k, M, w = u, _ = Tt(), N = zt(n, t, e, r), S = {
                            point: c,
                            lineStart: function() {
                                S.point = f,
                                p && p.push(d = []),
                                k = !0,
                                b = !1,
                                y = x = NaN
                            },
                            lineEnd: function() {
                                h && (f(g, v),
                                m && b && _.rejoin(),
                                h.push(_.buffer())),
                                S.point = c,
                                b && u.lineEnd()
                            },
                            polygonStart: function() {
                                u = _,
                                h = [],
                                p = [],
                                M = !0
                            },
                            polygonEnd: function() {
                                u = w,
                                h = Ki.merge(h);
                                var t = function(n) {
                                    for (var t = 0, e = p.length, r = n[1], i = 0; e > i; ++i)
                                        for (var o, a = 1, u = p[i], l = u.length, s = u[0]; l > a; ++a)
                                            o = u[a],
                                            s[1] <= r ? o[1] > r && tn(s, o, n) > 0 && ++t : o[1] <= r && tn(s, o, n) < 0 && --t,
                                            s = o;
                                    return 0 !== t
                                }([n, r])
                                  , e = M && t
                                  , i = h.length;
                                (e || i) && (u.polygonStart(),
                                e && (u.lineStart(),
                                l(null, null, 1, u),
                                u.lineEnd()),
                                i && Nt(h, o, t, l, u),
                                u.polygonEnd()),
                                h = p = d = null
                            }
                        };
                        return S
                    }
                }
                function Ot(n) {
                    var t = 0
                      , e = Ao / 3
                      , r = Xt(n)
                      , i = r(t, e);
                    return i.parallels = function(n) {
                        return arguments.length ? r(t = n[0] * Ao / 180, e = n[1] * Ao / 180) : [t / Ao * 180, e / Ao * 180]
                    }
                    ,
                    i
                }
                function qt(n, t) {
                    function e(n, t) {
                        var e = Math.sqrt(o - 2 * i * Math.sin(t)) / i;
                        return [e * Math.sin(n *= i), a - e * Math.cos(n)]
                    }
                    var r = Math.sin(n)
                      , i = (r + Math.sin(t)) / 2
                      , o = 1 + r * (2 * i - r)
                      , a = Math.sqrt(o) / i;
                    return e.invert = function(n, t) {
                        var e = a - t;
                        return [Math.atan2(n, e) / i, rn((o - (n * n + e * e) * i * i) / (2 * i))]
                    }
                    ,
                    e
                }
                function Rt() {
                    function n(n, t) {
                        La += i * n - r * t,
                        r = n,
                        i = t
                    }
                    var t, e, r, i;
                    Pa.point = function(o, a) {
                        Pa.point = n,
                        t = r = o,
                        e = i = a
                    }
                    ,
                    Pa.lineEnd = function() {
                        n(t, e)
                    }
                }
                function jt(n) {
                    return "m0," + n + "a" + n + "," + n + " 0 1,1 0," + -2 * n + "a" + n + "," + n + " 0 1,1 0," + 2 * n + "z"
                }
                function Ut(n, t) {
                    ga += n,
                    va += t,
                    ++ma
                }
                function Dt() {
                    function n(n, r) {
                        var i = n - t
                          , o = r - e
                          , a = Math.sqrt(i * i + o * o);
                        ya += a * (t + n) / 2,
                        xa += a * (e + r) / 2,
                        ba += a,
                        Ut(t = n, e = r)
                    }
                    var t, e;
                    qa.point = function(r, i) {
                        qa.point = n,
                        Ut(t = r, e = i)
                    }
                }
                function Ft() {
                    qa.point = Ut
                }
                function It() {
                    function n(n, t) {
                        var e = n - r
                          , o = t - i
                          , a = Math.sqrt(e * e + o * o);
                        ya += a * (r + n) / 2,
                        xa += a * (i + t) / 2,
                        ba += a,
                        ka += (a = i * n - r * t) * (r + n),
                        Ma += a * (i + t),
                        wa += 3 * a,
                        Ut(r = n, i = t)
                    }
                    var t, e, r, i;
                    qa.point = function(o, a) {
                        qa.point = n,
                        Ut(t = r = o, e = i = a)
                    }
                    ,
                    qa.lineEnd = function() {
                        n(t, e)
                    }
                }
                function Ht(n) {
                    function t(n) {
                        return (u ? r : e)(n)
                    }
                    function e(t) {
                        return Vt(t, function(e, r) {
                            e = n(e, r),
                            t.point(e[0], e[1])
                        })
                    }
                    function r(t) {
                        function e(e, r) {
                            e = n(e, r),
                            t.point(e[0], e[1])
                        }
                        function r() {
                            y = NaN,
                            w.point = o,
                            t.lineStart()
                        }
                        function o(e, r) {
                            var o = ct([e, r])
                              , a = n(e, r);
                            i(y, x, m, b, k, M, y = a[0], x = a[1], m = e, b = o[0], k = o[1], M = o[2], u, t),
                            t.point(y, x)
                        }
                        function a() {
                            w.point = e,
                            t.lineEnd()
                        }
                        function l() {
                            r(),
                            w.point = s,
                            w.lineEnd = c
                        }
                        function s(n, t) {
                            o(f = n, t),
                            h = y,
                            p = x,
                            d = b,
                            g = k,
                            v = M,
                            w.point = o
                        }
                        function c() {
                            i(y, x, m, b, k, M, h, p, f, d, g, v, u, t),
                            w.lineEnd = a,
                            a()
                        }
                        var f, h, p, d, g, v, m, y, x, b, k, M, w = {
                            point: e,
                            lineStart: r,
                            lineEnd: a,
                            polygonStart: function() {
                                t.polygonStart(),
                                w.lineStart = l
                            },
                            polygonEnd: function() {
                                t.polygonEnd(),
                                w.lineStart = r
                            }
                        };
                        return w
                    }
                    function i(t, e, r, u, l, s, c, f, h, p, d, g, v, m) {
                        var y = c - t
                          , x = f - e
                          , b = y * y + x * x;
                        if (b > 4 * o && v--) {
                            var k = u + p
                              , M = l + d
                              , w = s + g
                              , _ = Math.sqrt(k * k + M * M + w * w)
                              , N = Math.asin(w /= _)
                              , S = lo(lo(w) - 1) < No || lo(r - h) < No ? (r + h) / 2 : Math.atan2(M, k)
                              , A = n(S, N)
                              , L = A[0]
                              , E = A[1]
                              , T = L - t
                              , C = E - e
                              , z = x * T - y * C;
                            (z * z / b > o || lo((y * T + x * C) / b - .5) > .3 || a > u * p + l * d + s * g) && (i(t, e, r, u, l, s, L, E, S, k /= _, M /= _, w, v, m),
                            m.point(L, E),
                            i(L, E, S, k, M, w, c, f, h, p, d, g, v, m))
                        }
                    }
                    var o = .5
                      , a = Math.cos(30 * Co)
                      , u = 16;
                    return t.precision = function(n) {
                        return arguments.length ? (u = (o = n * n) > 0 && 16,
                        t) : Math.sqrt(o)
                    }
                    ,
                    t
                }
                function Bt(n) {
                    this.stream = n
                }
                function Vt(n, t) {
                    return {
                        point: t,
                        sphere: function() {
                            n.sphere()
                        },
                        lineStart: function() {
                            n.lineStart()
                        },
                        lineEnd: function() {
                            n.lineEnd()
                        },
                        polygonStart: function() {
                            n.polygonStart()
                        },
                        polygonEnd: function() {
                            n.polygonEnd()
                        }
                    }
                }
                function Yt(n) {
                    return Xt(function() {
                        return n
                    })()
                }
                function Xt(n) {
                    function t(n) {
                        return [(n = u(n[0] * Co, n[1] * Co))[0] * h + l, s - n[1] * h]
                    }
                    function e(n) {
                        return (n = u.invert((n[0] - l) / h, (s - n[1]) / h)) && [n[0] * zo, n[1] * zo]
                    }
                    function r() {
                        u = wt(a = Zt(m, y, x), o);
                        var n = o(g, v);
                        return l = p - n[0] * h,
                        s = d + n[1] * h,
                        i()
                    }
                    function i() {
                        return c && (c.valid = !1,
                        c = null),
                        t
                    }
                    var o, a, u, l, s, c, f = Ht(function(n, t) {
                        return [(n = o(n, t))[0] * h + l, s - n[1] * h]
                    }), h = 150, p = 480, d = 250, g = 0, v = 0, m = 0, y = 0, x = 0, b = Na, k = M, w = null, _ = null;
                    return t.stream = function(n) {
                        return c && (c.valid = !1),
                        (c = Wt(b(a, f(k(n))))).valid = !0,
                        c
                    }
                    ,
                    t.clipAngle = function(n) {
                        return arguments.length ? (b = null == n ? (w = n,
                        Na) : function(n) {
                            function t(n, t) {
                                return Math.cos(n) * Math.cos(t) > i
                            }
                            function e(n, t, e) {
                                var r = [1, 0, 0]
                                  , o = ht(ct(n), ct(t))
                                  , a = ft(o, o)
                                  , u = o[0]
                                  , l = a - u * u;
                                if (!l)
                                    return !e && n;
                                var s = i * a / l
                                  , c = -i * u / l
                                  , f = ht(r, o)
                                  , h = dt(r, s);
                                pt(h, dt(o, c));
                                var p = f
                                  , d = ft(h, p)
                                  , g = ft(p, p)
                                  , v = d * d - g * (ft(h, h) - 1);
                                if (!(0 > v)) {
                                    var m = Math.sqrt(v)
                                      , y = dt(p, (-d - m) / g);
                                    if (pt(y, h),
                                    y = vt(y),
                                    !e)
                                        return y;
                                    var x, b = n[0], k = t[0], M = n[1], w = t[1];
                                    b > k && (x = b,
                                    b = k,
                                    k = x);
                                    var _ = k - b
                                      , N = lo(_ - Ao) < No;
                                    if (!N && M > w && (x = M,
                                    M = w,
                                    w = x),
                                    N || No > _ ? N ? M + w > 0 ^ y[1] < (lo(y[0] - b) < No ? M : w) : M <= y[1] && y[1] <= w : _ > Ao ^ (b <= y[0] && y[0] <= k)) {
                                        var S = dt(p, (-d + m) / g);
                                        return pt(S, h),
                                        [y, vt(S)]
                                    }
                                }
                            }
                            function r(t, e) {
                                var r = o ? n : Ao - n
                                  , i = 0;
                                return -r > t ? i |= 1 : t > r && (i |= 2),
                                -r > e ? i |= 4 : e > r && (i |= 8),
                                i
                            }
                            var i = Math.cos(n)
                              , o = i > 0
                              , a = lo(i) > No;
                            return Lt(t, function(n) {
                                var i, u, l, s, c;
                                return {
                                    lineStart: function() {
                                        s = l = !1,
                                        c = 1
                                    },
                                    point: function(f, h) {
                                        var p, d = [f, h], g = t(f, h), v = o ? g ? 0 : r(f, h) : g ? r(f + (0 > f ? Ao : -Ao), h) : 0;
                                        if (!i && (s = l = g) && n.lineStart(),
                                        g !== l && (p = e(i, d),
                                        (mt(i, p) || mt(d, p)) && (d[0] += No,
                                        d[1] += No,
                                        g = t(d[0], d[1]))),
                                        g !== l)
                                            c = 0,
                                            g ? (n.lineStart(),
                                            p = e(d, i),
                                            n.point(p[0], p[1])) : (p = e(i, d),
                                            n.point(p[0], p[1]),
                                            n.lineEnd()),
                                            i = p;
                                        else if (a && i && o ^ g) {
                                            var m;
                                            v & u || !(m = e(d, i, !0)) || (c = 0,
                                            o ? (n.lineStart(),
                                            n.point(m[0][0], m[0][1]),
                                            n.point(m[1][0], m[1][1]),
                                            n.lineEnd()) : (n.point(m[1][0], m[1][1]),
                                            n.lineEnd(),
                                            n.lineStart(),
                                            n.point(m[0][0], m[0][1])))
                                        }
                                        !g || i && mt(i, d) || n.point(d[0], d[1]),
                                        i = d,
                                        l = g,
                                        u = v
                                    },
                                    lineEnd: function() {
                                        l && n.lineEnd(),
                                        i = null
                                    },
                                    clean: function() {
                                        return c | (s && l) << 1
                                    }
                                }
                            }, ne(n, 6 * Co), o ? [0, -n] : [-Ao, n - Ao])
                        }((w = +n) * Co),
                        i()) : w
                    }
                    ,
                    t.clipExtent = function(n) {
                        return arguments.length ? (_ = n,
                        k = n ? Pt(n[0][0], n[0][1], n[1][0], n[1][1]) : M,
                        i()) : _
                    }
                    ,
                    t.scale = function(n) {
                        return arguments.length ? (h = +n,
                        r()) : h
                    }
                    ,
                    t.translate = function(n) {
                        return arguments.length ? (p = +n[0],
                        d = +n[1],
                        r()) : [p, d]
                    }
                    ,
                    t.center = function(n) {
                        return arguments.length ? (g = n[0] % 360 * Co,
                        v = n[1] % 360 * Co,
                        r()) : [g * zo, v * zo]
                    }
                    ,
                    t.rotate = function(n) {
                        return arguments.length ? (m = n[0] % 360 * Co,
                        y = n[1] % 360 * Co,
                        x = n.length > 2 ? n[2] % 360 * Co : 0,
                        r()) : [m * zo, y * zo, x * zo]
                    }
                    ,
                    Ki.rebind(t, f, "precision"),
                    function() {
                        return o = n.apply(this, arguments),
                        t.invert = o.invert && e,
                        r()
                    }
                }
                function Wt(n) {
                    return Vt(n, function(t, e) {
                        n.point(t * Co, e * Co)
                    })
                }
                function Jt(n, t) {
                    return [n, t]
                }
                function Gt(n, t) {
                    return [n > Ao ? n - Lo : -Ao > n ? n + Lo : n, t]
                }
                function Zt(n, t, e) {
                    return n ? t || e ? wt(Kt(n), Qt(t, e)) : Kt(n) : t || e ? Qt(t, e) : Gt
                }
                function $t(n) {
                    return function(t, e) {
                        return [(t += n) > Ao ? t - Lo : -Ao > t ? t + Lo : t, e]
                    }
                }
                function Kt(n) {
                    var t = $t(n);
                    return t.invert = $t(-n),
                    t
                }
                function Qt(n, t) {
                    function e(n, t) {
                        var e = Math.cos(t)
                          , u = Math.cos(n) * e
                          , l = Math.sin(n) * e
                          , s = Math.sin(t)
                          , c = s * r + u * i;
                        return [Math.atan2(l * o - c * a, u * r - s * i), rn(c * o + l * a)]
                    }
                    var r = Math.cos(n)
                      , i = Math.sin(n)
                      , o = Math.cos(t)
                      , a = Math.sin(t);
                    return e.invert = function(n, t) {
                        var e = Math.cos(t)
                          , u = Math.cos(n) * e
                          , l = Math.sin(n) * e
                          , s = Math.sin(t)
                          , c = s * o - l * a;
                        return [Math.atan2(l * o + s * a, u * r + c * i), rn(c * r - u * i)]
                    }
                    ,
                    e
                }
                function ne(n, t) {
                    var e = Math.cos(n)
                      , r = Math.sin(n);
                    return function(i, o, a, u) {
                        var l = a * t;
                        null != i ? (i = te(e, i),
                        o = te(e, o),
                        (a > 0 ? o > i : i > o) && (i += a * Lo)) : (i = n + a * Lo,
                        o = n - .5 * l);
                        for (var s, c = i; a > 0 ? c > o : o > c; c -= l)
                            u.point((s = vt([e, -r * Math.cos(c), -r * Math.sin(c)]))[0], s[1])
                    }
                }
                function te(n, t) {
                    var e = ct(t);
                    e[0] -= n,
                    gt(e);
                    var r = en(-e[1]);
                    return ((-e[2] < 0 ? -r : r) + 2 * Math.PI - No) % (2 * Math.PI)
                }
                function ee(n, t, e) {
                    var r = Ki.range(n, t - No, e).concat(t);
                    return function(n) {
                        return r.map(function(t) {
                            return [n, t]
                        })
                    }
                }
                function re(n, t, e) {
                    var r = Ki.range(n, t - No, e).concat(t);
                    return function(n) {
                        return r.map(function(t) {
                            return [t, n]
                        })
                    }
                }
                function ie(n) {
                    return n.source
                }
                function oe(n) {
                    return n.target
                }
                function ae(n, t) {
                    function e(t, e) {
                        var r = Math.cos(t)
                          , i = Math.cos(e)
                          , o = n(r * i);
                        return [o * i * Math.sin(t), o * Math.sin(e)]
                    }
                    return e.invert = function(n, e) {
                        var r = Math.sqrt(n * n + e * e)
                          , i = t(r)
                          , o = Math.sin(i)
                          , a = Math.cos(i);
                        return [Math.atan2(n * o, r * a), Math.asin(r && e * o / r)]
                    }
                    ,
                    e
                }
                function ue(n, t) {
                    function e(n, t) {
                        a > 0 ? -To + No > t && (t = -To + No) : t > To - No && (t = To - No);
                        var e = a / Math.pow(i(t), o);
                        return [e * Math.sin(o * n), a - e * Math.cos(o * n)]
                    }
                    var r = Math.cos(n)
                      , i = function(n) {
                        return Math.tan(Ao / 4 + n / 2)
                    }
                      , o = n === t ? Math.sin(n) : Math.log(r / Math.cos(t)) / Math.log(i(t) / i(n))
                      , a = r * Math.pow(i(n), o) / o;
                    return o ? (e.invert = function(n, t) {
                        var e = a - t
                          , r = nn(o) * Math.sqrt(n * n + e * e);
                        return [Math.atan2(n, e) / o, 2 * Math.atan(Math.pow(a / r, 1 / o)) - To]
                    }
                    ,
                    e) : se
                }
                function le(n, t) {
                    function e(n, t) {
                        var e = o - t;
                        return [e * Math.sin(i * n), o - e * Math.cos(i * n)]
                    }
                    var r = Math.cos(n)
                      , i = n === t ? Math.sin(n) : (r - Math.cos(t)) / (t - n)
                      , o = r / i + n;
                    return lo(i) < No ? Jt : (e.invert = function(n, t) {
                        var e = o - t;
                        return [Math.atan2(n, e) / i, o - nn(i) * Math.sqrt(n * n + e * e)]
                    }
                    ,
                    e)
                }
                function se(n, t) {
                    return [n, Math.log(Math.tan(Ao / 4 + t / 2))]
                }
                function ce(n) {
                    var t, e = Yt(n), r = e.scale, i = e.translate, o = e.clipExtent;
                    return e.scale = function() {
                        var n = r.apply(e, arguments);
                        return n === e ? t ? e.clipExtent(null) : e : n
                    }
                    ,
                    e.translate = function() {
                        var n = i.apply(e, arguments);
                        return n === e ? t ? e.clipExtent(null) : e : n
                    }
                    ,
                    e.clipExtent = function(n) {
                        var a = o.apply(e, arguments);
                        if (a === e) {
                            if (t = null == n) {
                                var u = Ao * r()
                                  , l = i();
                                o([[l[0] - u, l[1] - u], [l[0] + u, l[1] + u]])
                            }
                        } else
                            t && (a = null);
                        return a
                    }
                    ,
                    e.clipExtent(null)
                }
                function fe(n, t) {
                    return [Math.log(Math.tan(Ao / 4 + t / 2)), -n]
                }
                function he(n) {
                    return n[0]
                }
                function pe(n) {
                    return n[1]
                }
                function de(n) {
                    for (var t = n.length, e = [0, 1], r = 2, i = 2; t > i; i++) {
                        for (; r > 1 && tn(n[e[r - 2]], n[e[r - 1]], n[i]) <= 0; )
                            --r;
                        e[r++] = i
                    }
                    return e.slice(0, r)
                }
                function ge(n, t) {
                    return n[0] - t[0] || n[1] - t[1]
                }
                function ve(n, t, e) {
                    return (e[0] - t[0]) * (n[1] - t[1]) < (e[1] - t[1]) * (n[0] - t[0])
                }
                function me(n, t, e, r) {
                    var i = n[0]
                      , o = e[0]
                      , a = t[0] - i
                      , u = r[0] - o
                      , l = n[1]
                      , s = e[1]
                      , c = t[1] - l
                      , f = r[1] - s
                      , h = (u * (l - s) - f * (i - o)) / (f * a - u * c);
                    return [i + h * a, l + h * c]
                }
                function ye(n) {
                    var t = n[0]
                      , e = n[n.length - 1];
                    return !(t[0] - e[0] || t[1] - e[1])
                }
                function xe(n) {
                    var t = Ga.pop() || new function() {
                        Re(this),
                        this.edge = this.site = this.circle = null
                    }
                    ;
                    return t.site = n,
                    t
                }
                function be(n) {
                    Le(n),
                    Xa.remove(n),
                    Ga.push(n),
                    Re(n)
                }
                function ke(n) {
                    var t = n.circle
                      , e = t.x
                      , r = t.cy
                      , i = {
                        x: e,
                        y: r
                    }
                      , o = n.P
                      , a = n.N
                      , u = [n];
                    be(n);
                    for (var l = o; l.circle && lo(e - l.circle.x) < No && lo(r - l.circle.cy) < No; )
                        o = l.P,
                        u.unshift(l),
                        be(l),
                        l = o;
                    u.unshift(l),
                    Le(l);
                    for (var s = a; s.circle && lo(e - s.circle.x) < No && lo(r - s.circle.cy) < No; )
                        a = s.N,
                        u.push(s),
                        be(s),
                        s = a;
                    u.push(s),
                    Le(s);
                    var c, f = u.length;
                    for (c = 1; f > c; ++c)
                        s = u[c],
                        l = u[c - 1],
                        Pe(s.edge, l.site, s.site, i);
                    l = u[0],
                    (s = u[f - 1]).edge = Ce(l.site, s.site, null, i),
                    Ae(l),
                    Ae(s)
                }
                function Me(n) {
                    for (var t, e, r, i, o = n.x, a = n.y, u = Xa._; u; )
                        if ((r = we(u, a) - o) > No)
                            u = u.L;
                        else {
                            if (!((i = o - _e(u, a)) > No)) {
                                r > -No ? (t = u.P,
                                e = u) : i > -No ? (t = u,
                                e = u.N) : t = e = u;
                                break
                            }
                            if (!u.R) {
                                t = u;
                                break
                            }
                            u = u.R
                        }
                    var l = xe(n);
                    if (Xa.insert(t, l),
                    t || e) {
                        if (t === e)
                            return Le(t),
                            e = xe(t.site),
                            Xa.insert(l, e),
                            l.edge = e.edge = Ce(t.site, l.site),
                            Ae(t),
                            void Ae(e);
                        if (!e)
                            return void (l.edge = Ce(t.site, l.site));
                        Le(t),
                        Le(e);
                        var s = t.site
                          , c = s.x
                          , f = s.y
                          , h = n.x - c
                          , p = n.y - f
                          , d = e.site
                          , g = d.x - c
                          , v = d.y - f
                          , m = 2 * (h * v - p * g)
                          , y = h * h + p * p
                          , x = g * g + v * v
                          , b = {
                            x: (v * y - p * x) / m + c,
                            y: (h * x - g * y) / m + f
                        };
                        Pe(e.edge, s, d, b),
                        l.edge = Ce(s, n, null, b),
                        e.edge = Ce(n, d, null, b),
                        Ae(t),
                        Ae(e)
                    }
                }
                function we(n, t) {
                    var e = n.site
                      , r = e.x
                      , i = e.y
                      , o = i - t;
                    if (!o)
                        return r;
                    var a = n.P;
                    if (!a)
                        return -1 / 0;
                    var u = (e = a.site).x
                      , l = e.y
                      , s = l - t;
                    if (!s)
                        return u;
                    var c = u - r
                      , f = 1 / o - 1 / s
                      , h = c / s;
                    return f ? (-h + Math.sqrt(h * h - 2 * f * (c * c / (-2 * s) - l + s / 2 + i - o / 2))) / f + r : (r + u) / 2
                }
                function _e(n, t) {
                    var e = n.N;
                    if (e)
                        return we(e, t);
                    var r = n.site;
                    return r.y === t ? r.x : 1 / 0
                }
                function Ne(n) {
                    this.site = n,
                    this.edges = []
                }
                function Se(n, t) {
                    return t.angle - n.angle
                }
                function Ae(n) {
                    var t = n.P
                      , e = n.N;
                    if (t && e) {
                        var r = t.site
                          , i = n.site
                          , o = e.site;
                        if (r !== o) {
                            var a = i.x
                              , u = i.y
                              , l = r.x - a
                              , s = r.y - u
                              , c = o.x - a
                              , f = 2 * (l * (v = o.y - u) - s * c);
                            if (!(f >= -So)) {
                                var h = l * l + s * s
                                  , p = c * c + v * v
                                  , d = (v * h - s * p) / f
                                  , g = (l * p - c * h) / f
                                  , v = g + u
                                  , m = Za.pop() || new function() {
                                    Re(this),
                                    this.x = this.y = this.arc = this.site = this.cy = null
                                }
                                ;
                                m.arc = n,
                                m.site = i,
                                m.x = d + a,
                                m.y = v + Math.sqrt(d * d + g * g),
                                m.cy = v,
                                n.circle = m;
                                for (var y = null, x = Ja._; x; )
                                    if (m.y < x.y || m.y === x.y && m.x <= x.x) {
                                        if (!x.L) {
                                            y = x.P;
                                            break
                                        }
                                        x = x.L
                                    } else {
                                        if (!x.R) {
                                            y = x;
                                            break
                                        }
                                        x = x.R
                                    }
                                Ja.insert(y, m),
                                y || (Wa = m)
                            }
                        }
                    }
                }
                function Le(n) {
                    var t = n.circle;
                    t && (t.P || (Wa = t.N),
                    Ja.remove(t),
                    Za.push(t),
                    Re(t),
                    n.circle = null)
                }
                function Ee(n, t) {
                    var e = n.b;
                    if (e)
                        return !0;
                    var r, i, o = n.a, a = t[0][0], u = t[1][0], l = t[0][1], s = t[1][1], c = n.l, f = n.r, h = c.x, p = c.y, d = f.x, g = f.y, v = (h + d) / 2, m = (p + g) / 2;
                    if (g === p) {
                        if (a > v || v >= u)
                            return;
                        if (h > d) {
                            if (o) {
                                if (o.y >= s)
                                    return
                            } else
                                o = {
                                    x: v,
                                    y: l
                                };
                            e = {
                                x: v,
                                y: s
                            }
                        } else {
                            if (o) {
                                if (o.y < l)
                                    return
                            } else
                                o = {
                                    x: v,
                                    y: s
                                };
                            e = {
                                x: v,
                                y: l
                            }
                        }
                    } else if (i = m - (r = (h - d) / (g - p)) * v,
                    -1 > r || r > 1)
                        if (h > d) {
                            if (o) {
                                if (o.y >= s)
                                    return
                            } else
                                o = {
                                    x: (l - i) / r,
                                    y: l
                                };
                            e = {
                                x: (s - i) / r,
                                y: s
                            }
                        } else {
                            if (o) {
                                if (o.y < l)
                                    return
                            } else
                                o = {
                                    x: (s - i) / r,
                                    y: s
                                };
                            e = {
                                x: (l - i) / r,
                                y: l
                            }
                        }
                    else if (g > p) {
                        if (o) {
                            if (o.x >= u)
                                return
                        } else
                            o = {
                                x: a,
                                y: r * a + i
                            };
                        e = {
                            x: u,
                            y: r * u + i
                        }
                    } else {
                        if (o) {
                            if (o.x < a)
                                return
                        } else
                            o = {
                                x: u,
                                y: r * u + i
                            };
                        e = {
                            x: a,
                            y: r * a + i
                        }
                    }
                    return n.a = o,
                    n.b = e,
                    !0
                }
                function Te(n, t) {
                    this.l = n,
                    this.r = t,
                    this.a = this.b = null
                }
                function Ce(n, t, e, r) {
                    var i = new Te(n,t);
                    return Va.push(i),
                    e && Pe(i, n, t, e),
                    r && Pe(i, t, n, r),
                    Ya[n.i].edges.push(new Oe(i,n,t)),
                    Ya[t.i].edges.push(new Oe(i,t,n)),
                    i
                }
                function ze(n, t, e) {
                    var r = new Te(n,null);
                    return r.a = t,
                    r.b = e,
                    Va.push(r),
                    r
                }
                function Pe(n, t, e, r) {
                    n.a || n.b ? n.l === e ? n.b = r : n.a = r : (n.a = r,
                    n.l = t,
                    n.r = e)
                }
                function Oe(n, t, e) {
                    var r = n.a
                      , i = n.b;
                    this.edge = n,
                    this.site = t,
                    this.angle = e ? Math.atan2(e.y - t.y, e.x - t.x) : n.l === t ? Math.atan2(i.x - r.x, r.y - i.y) : Math.atan2(r.x - i.x, i.y - r.y)
                }
                function qe() {
                    this._ = null
                }
                function Re(n) {
                    n.U = n.C = n.L = n.R = n.P = n.N = null
                }
                function je(n, t) {
                    var e = t
                      , r = t.R
                      , i = e.U;
                    i ? i.L === e ? i.L = r : i.R = r : n._ = r,
                    r.U = i,
                    e.U = r,
                    e.R = r.L,
                    e.R && (e.R.U = e),
                    r.L = e
                }
                function Ue(n, t) {
                    var e = t
                      , r = t.L
                      , i = e.U;
                    i ? i.L === e ? i.L = r : i.R = r : n._ = r,
                    r.U = i,
                    e.U = r,
                    e.L = r.R,
                    e.L && (e.L.U = e),
                    r.R = e
                }
                function De(n) {
                    for (; n.L; )
                        n = n.L;
                    return n
                }
                function Fe(n, t) {
                    var e, r, i, o = n.sort(Ie).pop();
                    for (Va = [],
                    Ya = new Array(n.length),
                    Xa = new qe,
                    Ja = new qe; ; )
                        if (i = Wa,
                        o && (!i || o.y < i.y || o.y === i.y && o.x < i.x))
                            (o.x !== e || o.y !== r) && (Ya[o.i] = new Ne(o),
                            Me(o),
                            e = o.x,
                            r = o.y),
                            o = n.pop();
                        else {
                            if (!i)
                                break;
                            ke(i.arc)
                        }
                    t && (function(n) {
                        for (var t, e = Va, r = zt(n[0][0], n[0][1], n[1][0], n[1][1]), i = e.length; i--; )
                            (!Ee(t = e[i], n) || !r(t) || lo(t.a.x - t.b.x) < No && lo(t.a.y - t.b.y) < No) && (t.a = t.b = null,
                            e.splice(i, 1))
                    }(t),
                    function(n) {
                        for (var t, e, r, i, o, a, u, l, s, c, f = n[0][0], h = n[1][0], p = n[0][1], d = n[1][1], g = Ya, v = g.length; v--; )
                            if ((o = g[v]) && o.prepare())
                                for (l = (u = o.edges).length,
                                a = 0; l > a; )
                                    r = (c = u[a].end()).x,
                                    i = c.y,
                                    t = (s = u[++a % l].start()).x,
                                    e = s.y,
                                    (lo(r - t) > No || lo(i - e) > No) && (u.splice(a, 0, new Oe(ze(o.site, c, lo(r - f) < No && d - i > No ? {
                                        x: f,
                                        y: lo(t - f) < No ? e : d
                                    } : lo(i - d) < No && h - r > No ? {
                                        x: lo(e - d) < No ? t : h,
                                        y: d
                                    } : lo(r - h) < No && i - p > No ? {
                                        x: h,
                                        y: lo(t - h) < No ? e : p
                                    } : lo(i - p) < No && r - f > No ? {
                                        x: lo(e - p) < No ? t : f,
                                        y: p
                                    } : null),o.site,null)),
                                    ++l)
                    }(t));
                    var a = {
                        cells: Ya,
                        edges: Va
                    };
                    return Xa = Ja = Va = Ya = null,
                    a
                }
                function Ie(n, t) {
                    return t.y - n.y || t.x - n.x
                }
                function He(n, t, e) {
                    return (n.x - e.x) * (t.y - n.y) - (n.x - t.x) * (e.y - n.y)
                }
                function Be(n) {
                    return n.x
                }
                function Ve(n) {
                    return n.y
                }
                function Ye(n, t) {
                    n = Ki.rgb(n),
                    t = Ki.rgb(t);
                    var e = n.r
                      , r = n.g
                      , i = n.b
                      , o = t.r - e
                      , a = t.g - r
                      , u = t.b - i;
                    return function(n) {
                        return "#" + kn(Math.round(e + o * n)) + kn(Math.round(r + a * n)) + kn(Math.round(i + u * n))
                    }
                }
                function Xe(n, t) {
                    var e, r = {}, i = {};
                    for (e in n)
                        e in t ? r[e] = Ge(n[e], t[e]) : i[e] = n[e];
                    for (e in t)
                        e in n || (i[e] = t[e]);
                    return function(n) {
                        for (e in r)
                            i[e] = r[e](n);
                        return i
                    }
                }
                function We(n, t) {
                    return n = +n,
                    t = +t,
                    function(e) {
                        return n * (1 - e) + t * e
                    }
                }
                function Je(n, t) {
                    var e, r, i, o = Ka.lastIndex = Qa.lastIndex = 0, a = -1, u = [], l = [];
                    for (n += "",
                    t += ""; (e = Ka.exec(n)) && (r = Qa.exec(t)); )
                        (i = r.index) > o && (i = t.slice(o, i),
                        u[a] ? u[a] += i : u[++a] = i),
                        (e = e[0]) === (r = r[0]) ? u[a] ? u[a] += r : u[++a] = r : (u[++a] = null,
                        l.push({
                            i: a,
                            x: We(e, r)
                        })),
                        o = Qa.lastIndex;
                    return o < t.length && (i = t.slice(o),
                    u[a] ? u[a] += i : u[++a] = i),
                    u.length < 2 ? l[0] ? (t = l[0].x,
                    function(n) {
                        return t(n) + ""
                    }
                    ) : function() {
                        return t
                    }
                    : (t = l.length,
                    function(n) {
                        for (var e, r = 0; t > r; ++r)
                            u[(e = l[r]).i] = e.x(n);
                        return u.join("")
                    }
                    )
                }
                function Ge(n, t) {
                    for (var e, r = Ki.interpolators.length; --r >= 0 && !(e = Ki.interpolators[r](n, t)); )
                        ;
                    return e
                }
                function Ze(n, t) {
                    var e, r = [], i = [], o = n.length, a = t.length, u = Math.min(n.length, t.length);
                    for (e = 0; u > e; ++e)
                        r.push(Ge(n[e], t[e]));
                    for (; o > e; ++e)
                        i[e] = n[e];
                    for (; a > e; ++e)
                        i[e] = t[e];
                    return function(n) {
                        for (e = 0; u > e; ++e)
                            i[e] = r[e](n);
                        return i
                    }
                }
                function $e(n) {
                    return function(t) {
                        return 1 - n(1 - t)
                    }
                }
                function Ke(n) {
                    return function(t) {
                        return .5 * (.5 > t ? n(2 * t) : 2 - n(2 - 2 * t))
                    }
                }
                function Qe(n) {
                    return n * n
                }
                function nr(n) {
                    return n * n * n
                }
                function tr(n) {
                    if (0 >= n)
                        return 0;
                    if (n >= 1)
                        return 1;
                    var t = n * n
                      , e = t * n;
                    return 4 * (.5 > n ? e : 3 * (n - t) + e - .75)
                }
                function er(n) {
                    return 1 - Math.cos(n * To)
                }
                function rr(n) {
                    return Math.pow(2, 10 * (n - 1))
                }
                function ir(n) {
                    return 1 - Math.sqrt(1 - n * n)
                }
                function or(n) {
                    return 1 / 2.75 > n ? 7.5625 * n * n : 2 / 2.75 > n ? 7.5625 * (n -= 1.5 / 2.75) * n + .75 : 2.5 / 2.75 > n ? 7.5625 * (n -= 2.25 / 2.75) * n + .9375 : 7.5625 * (n -= 2.625 / 2.75) * n + .984375
                }
                function ar(n, t) {
                    return t -= n,
                    function(e) {
                        return Math.round(n + t * e)
                    }
                }
                function ur(n) {
                    var t = [n.a, n.b]
                      , e = [n.c, n.d]
                      , r = sr(t)
                      , i = lr(t, e)
                      , o = sr(function(n, t, e) {
                        return n[0] += e * t[0],
                        n[1] += e * t[1],
                        n
                    }(e, t, -i)) || 0;
                    t[0] * e[1] < e[0] * t[1] && (t[0] *= -1,
                    t[1] *= -1,
                    r *= -1,
                    i *= -1),
                    this.rotate = (r ? Math.atan2(t[1], t[0]) : Math.atan2(-e[0], e[1])) * zo,
                    this.translate = [n.e, n.f],
                    this.scale = [r, o],
                    this.skew = o ? Math.atan2(i, o) * zo : 0
                }
                function lr(n, t) {
                    return n[0] * t[0] + n[1] * t[1]
                }
                function sr(n) {
                    var t = Math.sqrt(lr(n, n));
                    return t && (n[0] /= t,
                    n[1] /= t),
                    t
                }
                function cr(n) {
                    return n.length ? n.pop() + "," : ""
                }
                function fr(n, t) {
                    var e = []
                      , r = [];
                    return n = Ki.transform(n),
                    t = Ki.transform(t),
                    function(n, t, e, r) {
                        if (n[0] !== t[0] || n[1] !== t[1]) {
                            var i = e.push("translate(", null, ",", null, ")");
                            r.push({
                                i: i - 4,
                                x: We(n[0], t[0])
                            }, {
                                i: i - 2,
                                x: We(n[1], t[1])
                            })
                        } else
                            (t[0] || t[1]) && e.push("translate(" + t + ")")
                    }(n.translate, t.translate, e, r),
                    function(n, t, e, r) {
                        n !== t ? (n - t > 180 ? t += 360 : t - n > 180 && (n += 360),
                        r.push({
                            i: e.push(cr(e) + "rotate(", null, ")") - 2,
                            x: We(n, t)
                        })) : t && e.push(cr(e) + "rotate(" + t + ")")
                    }(n.rotate, t.rotate, e, r),
                    function(n, t, e, r) {
                        n !== t ? r.push({
                            i: e.push(cr(e) + "skewX(", null, ")") - 2,
                            x: We(n, t)
                        }) : t && e.push(cr(e) + "skewX(" + t + ")")
                    }(n.skew, t.skew, e, r),
                    function(n, t, e, r) {
                        if (n[0] !== t[0] || n[1] !== t[1]) {
                            var i = e.push(cr(e) + "scale(", null, ",", null, ")");
                            r.push({
                                i: i - 4,
                                x: We(n[0], t[0])
                            }, {
                                i: i - 2,
                                x: We(n[1], t[1])
                            })
                        } else
                            (1 !== t[0] || 1 !== t[1]) && e.push(cr(e) + "scale(" + t + ")")
                    }(n.scale, t.scale, e, r),
                    n = t = null,
                    function(n) {
                        for (var t, i = -1, o = r.length; ++i < o; )
                            e[(t = r[i]).i] = t.x(n);
                        return e.join("")
                    }
                }
                function hr(n, t) {
                    return t = (t -= n = +n) || 1 / t,
                    function(e) {
                        return (e - n) / t
                    }
                }
                function pr(n, t) {
                    return t = (t -= n = +n) || 1 / t,
                    function(e) {
                        return Math.max(0, Math.min(1, (e - n) / t))
                    }
                }
                function dr(n) {
                    for (var t = n.source, e = n.target, r = function(n, t) {
                        if (n === t)
                            return n;
                        for (var e = gr(n), r = gr(t), i = e.pop(), o = r.pop(), a = null; i === o; )
                            a = i,
                            i = e.pop(),
                            o = r.pop();
                        return a
                    }(t, e), i = [t]; t !== r; )
                        t = t.parent,
                        i.push(t);
                    for (var o = i.length; e !== r; )
                        i.splice(o, 0, e),
                        e = e.parent;
                    return i
                }
                function gr(n) {
                    for (var t = [], e = n.parent; null != e; )
                        t.push(n),
                        n = e,
                        e = e.parent;
                    return t.push(n),
                    t
                }
                function vr(n) {
                    n.fixed |= 2
                }
                function mr(n) {
                    n.fixed &= -7
                }
                function yr(n) {
                    n.fixed |= 4,
                    n.px = n.x,
                    n.py = n.y
                }
                function xr(n) {
                    n.fixed &= -5
                }
                function br(n, t) {
                    return Ki.rebind(n, t, "sort", "children", "value"),
                    n.nodes = n,
                    n.links = Sr,
                    n
                }
                function kr(n, t) {
                    for (var e = [n]; null != (n = e.pop()); )
                        if (t(n),
                        (i = n.children) && (r = i.length))
                            for (var r, i; --r >= 0; )
                                e.push(i[r])
                }
                function Mr(n, t) {
                    for (var e = [n], r = []; null != (n = e.pop()); )
                        if (r.push(n),
                        (o = n.children) && (i = o.length))
                            for (var i, o, a = -1; ++a < i; )
                                e.push(o[a]);
                    for (; null != (n = r.pop()); )
                        t(n)
                }
                function wr(n) {
                    return n.children
                }
                function _r(n) {
                    return n.value
                }
                function Nr(n, t) {
                    return t.value - n.value
                }
                function Sr(n) {
                    return Ki.merge(n.map(function(n) {
                        return (n.children || []).map(function(t) {
                            return {
                                source: n,
                                target: t
                            }
                        })
                    }))
                }
                function Ar(n) {
                    return n.x
                }
                function Lr(n) {
                    return n.y
                }
                function Er(n, t, e) {
                    n.y0 = t,
                    n.y = e
                }
                function Tr(n) {
                    return Ki.range(n.length)
                }
                function Cr(n) {
                    for (var t = -1, e = n[0].length, r = []; ++t < e; )
                        r[t] = 0;
                    return r
                }
                function zr(n) {
                    for (var t, e = 1, r = 0, i = n[0][1], o = n.length; o > e; ++e)
                        (t = n[e][1]) > i && (r = e,
                        i = t);
                    return r
                }
                function Pr(n) {
                    return n.reduce(Or, 0)
                }
                function Or(n, t) {
                    return n + t[1]
                }
                function qr(n, t) {
                    return Rr(n, Math.ceil(Math.log(t.length) / Math.LN2 + 1))
                }
                function Rr(n, t) {
                    for (var e = -1, r = +n[0], i = (n[1] - r) / t, o = []; ++e <= t; )
                        o[e] = i * e + r;
                    return o
                }
                function jr(n) {
                    return [Ki.min(n), Ki.max(n)]
                }
                function Ur(n, t) {
                    return n.value - t.value
                }
                function Dr(n, t) {
                    var e = n._pack_next;
                    n._pack_next = t,
                    t._pack_prev = n,
                    t._pack_next = e,
                    e._pack_prev = t
                }
                function Fr(n, t) {
                    n._pack_next = t,
                    t._pack_prev = n
                }
                function Ir(n, t) {
                    var e = t.x - n.x
                      , r = t.y - n.y
                      , i = n.r + t.r;
                    return .999 * i * i > e * e + r * r
                }
                function Hr(n) {
                    function t(n) {
                        c = Math.min(n.x - n.r, c),
                        f = Math.max(n.x + n.r, f),
                        h = Math.min(n.y - n.r, h),
                        p = Math.max(n.y + n.r, p)
                    }
                    if ((e = n.children) && (s = e.length)) {
                        var e, r, i, o, a, u, l, s, c = 1 / 0, f = -1 / 0, h = 1 / 0, p = -1 / 0;
                        if (e.forEach(Br),
                        (r = e[0]).x = -r.r,
                        r.y = 0,
                        t(r),
                        s > 1 && ((i = e[1]).x = i.r,
                        i.y = 0,
                        t(i),
                        s > 2))
                            for (Yr(r, i, o = e[2]),
                            t(o),
                            Dr(r, o),
                            r._pack_prev = o,
                            Dr(o, i),
                            i = r._pack_next,
                            a = 3; s > a; a++) {
                                Yr(r, i, o = e[a]);
                                var d = 0
                                  , g = 1
                                  , v = 1;
                                for (u = i._pack_next; u !== i; u = u._pack_next,
                                g++)
                                    if (Ir(u, o)) {
                                        d = 1;
                                        break
                                    }
                                if (1 == d)
                                    for (l = r._pack_prev; l !== u._pack_prev && !Ir(l, o); l = l._pack_prev,
                                    v++)
                                        ;
                                d ? (v > g || g == v && i.r < r.r ? Fr(r, i = u) : Fr(r = l, i),
                                a--) : (Dr(r, o),
                                i = o,
                                t(o))
                            }
                        var m = (c + f) / 2
                          , y = (h + p) / 2
                          , x = 0;
                        for (a = 0; s > a; a++)
                            (o = e[a]).x -= m,
                            o.y -= y,
                            x = Math.max(x, o.r + Math.sqrt(o.x * o.x + o.y * o.y));
                        n.r = x,
                        e.forEach(Vr)
                    }
                }
                function Br(n) {
                    n._pack_next = n._pack_prev = n
                }
                function Vr(n) {
                    delete n._pack_next,
                    delete n._pack_prev
                }
                function Yr(n, t, e) {
                    var r = n.r + e.r
                      , i = t.x - n.x
                      , o = t.y - n.y;
                    if (r && (i || o)) {
                        var a = t.r + e.r
                          , u = i * i + o * o
                          , l = .5 + ((r *= r) - (a *= a)) / (2 * u)
                          , s = Math.sqrt(Math.max(0, 2 * a * (r + u) - (r -= u) * r - a * a)) / (2 * u);
                        e.x = n.x + l * i + s * o,
                        e.y = n.y + l * o - s * i
                    } else
                        e.x = n.x + r,
                        e.y = n.y
                }
                function Xr(n, t) {
                    return n.parent == t.parent ? 1 : 2
                }
                function Wr(n) {
                    var t = n.children;
                    return t.length ? t[0] : n.t
                }
                function Jr(n) {
                    var t, e = n.children;
                    return (t = e.length) ? e[t - 1] : n.t
                }
                function Gr(n, t, e) {
                    var r = e / (t.i - n.i);
                    t.c -= r,
                    t.s += e,
                    n.c += r,
                    t.z += e,
                    t.m += e
                }
                function Zr(n, t, e) {
                    return n.a.parent === t.parent ? n.a : e
                }
                function $r(n) {
                    return {
                        x: n.x,
                        y: n.y,
                        dx: n.dx,
                        dy: n.dy
                    }
                }
                function Kr(n, t) {
                    var e = n.x + t[3]
                      , r = n.y + t[0]
                      , i = n.dx - t[1] - t[3]
                      , o = n.dy - t[0] - t[2];
                    return 0 > i && (e += i / 2,
                    i = 0),
                    0 > o && (r += o / 2,
                    o = 0),
                    {
                        x: e,
                        y: r,
                        dx: i,
                        dy: o
                    }
                }
                function Qr(n) {
                    var t = n[0]
                      , e = n[n.length - 1];
                    return e > t ? [t, e] : [e, t]
                }
                function ni(n) {
                    return n.rangeExtent ? n.rangeExtent() : Qr(n.range())
                }
                function ti(n, t, e, r) {
                    var i = e(n[0], n[1])
                      , o = r(t[0], t[1]);
                    return function(n) {
                        return o(i(n))
                    }
                }
                function ei(n, t) {
                    var e, r = 0, i = n.length - 1, o = n[r], a = n[i];
                    return o > a && (e = r,
                    r = i,
                    i = e,
                    e = o,
                    o = a,
                    a = e),
                    n[r] = t.floor(o),
                    n[i] = t.ceil(a),
                    n
                }
                function ri(n) {
                    return n ? {
                        floor: function(t) {
                            return Math.floor(t / n) * n
                        },
                        ceil: function(t) {
                            return Math.ceil(t / n) * n
                        }
                    } : cu
                }
                function ii(n, t, e, r) {
                    var i = []
                      , o = []
                      , a = 0
                      , u = Math.min(n.length, t.length) - 1;
                    for (n[u] < n[0] && (n = n.slice().reverse(),
                    t = t.slice().reverse()); ++a <= u; )
                        i.push(e(n[a - 1], n[a])),
                        o.push(r(t[a - 1], t[a]));
                    return function(t) {
                        var e = Ki.bisect(n, t, 1, u) - 1;
                        return o[e](i[e](t))
                    }
                }
                function oi(n, t) {
                    return Ki.rebind(n, t, "range", "rangeRound", "interpolate", "clamp")
                }
                function ai(n, t) {
                    return ei(n, ri(ui(n, t)[2])),
                    ei(n, ri(ui(n, t)[2])),
                    n
                }
                function ui(n, t) {
                    null == t && (t = 10);
                    var e = Qr(n)
                      , r = e[1] - e[0]
                      , i = Math.pow(10, Math.floor(Math.log(r / t) / Math.LN10))
                      , o = t / r * i;
                    return .15 >= o ? i *= 10 : .35 >= o ? i *= 5 : .75 >= o && (i *= 2),
                    e[0] = Math.ceil(e[0] / i) * i,
                    e[1] = Math.floor(e[1] / i) * i + .5 * i,
                    e[2] = i,
                    e
                }
                function li(n, t) {
                    return Ki.range.apply(Ki, ui(n, t))
                }
                function si(n, t, e) {
                    var r = ui(n, t);
                    if (e) {
                        var i = Ko.exec(e);
                        if (i.shift(),
                        "s" === i[8]) {
                            var o = Ki.formatPrefix(Math.max(lo(r[0]), lo(r[1])));
                            return i[7] || (i[7] = "." + ci(o.scale(r[2]))),
                            i[8] = "f",
                            e = Ki.format(i.join("")),
                            function(n) {
                                return e(o.scale(n)) + o.symbol
                            }
                        }
                        i[7] || (i[7] = "." + function(n, t) {
                            var e = ci(t[2]);
                            return n in fu ? Math.abs(e - ci(Math.max(lo(t[0]), lo(t[1])))) + +("e" !== n) : e - 2 * ("%" === n)
                        }(i[8], r)),
                        e = i.join("")
                    } else
                        e = ",." + ci(r[2]) + "f";
                    return Ki.format(e)
                }
                function ci(n) {
                    return -Math.floor(Math.log(n) / Math.LN10 + .01)
                }
                function fi(n) {
                    return function(t) {
                        return 0 > t ? -Math.pow(-t, n) : Math.pow(t, n)
                    }
                }
                function hi() {
                    return 0
                }
                function pi(n) {
                    return n.innerRadius
                }
                function di(n) {
                    return n.outerRadius
                }
                function gi(n) {
                    return n.startAngle
                }
                function vi(n) {
                    return n.endAngle
                }
                function mi(n) {
                    return n && n.padAngle
                }
                function yi(n, t, e, r) {
                    return (n - e) * t - (t - r) * n > 0 ? 0 : 1
                }
                function xi(n, t, e, r, i) {
                    var o = n[0] - t[0]
                      , a = n[1] - t[1]
                      , u = (i ? r : -r) / Math.sqrt(o * o + a * a)
                      , l = u * a
                      , s = -u * o
                      , c = n[0] + l
                      , f = n[1] + s
                      , h = t[0] + l
                      , p = t[1] + s
                      , d = (c + h) / 2
                      , g = (f + p) / 2
                      , v = h - c
                      , m = p - f
                      , y = v * v + m * m
                      , x = e - r
                      , b = c * p - h * f
                      , k = (0 > m ? -1 : 1) * Math.sqrt(Math.max(0, x * x * y - b * b))
                      , M = (b * m - v * k) / y
                      , w = (-b * v - m * k) / y
                      , _ = (b * m + v * k) / y
                      , N = (-b * v + m * k) / y
                      , S = M - d
                      , A = w - g
                      , L = _ - d
                      , E = N - g;
                    return S * S + A * A > L * L + E * E && (M = _,
                    w = N),
                    [[M - l, w - s], [M * e / x, w * e / x]]
                }
                function bi(n) {
                    function t(t) {
                        function a() {
                            s.push("M", o(n(c), u))
                        }
                        for (var l, s = [], c = [], f = -1, h = t.length, p = An(e), d = An(r); ++f < h; )
                            i.call(this, l = t[f], f) ? c.push([+p.call(this, l, f), +d.call(this, l, f)]) : c.length && (a(),
                            c = []);
                        return c.length && a(),
                        s.length ? s.join("") : null
                    }
                    var e = he
                      , r = pe
                      , i = _t
                      , o = ki
                      , a = o.key
                      , u = .7;
                    return t.x = function(n) {
                        return arguments.length ? (e = n,
                        t) : e
                    }
                    ,
                    t.y = function(n) {
                        return arguments.length ? (r = n,
                        t) : r
                    }
                    ,
                    t.defined = function(n) {
                        return arguments.length ? (i = n,
                        t) : i
                    }
                    ,
                    t.interpolate = function(n) {
                        return arguments.length ? (a = "function" == typeof n ? o = n : (o = xu.get(n) || ki).key,
                        t) : a
                    }
                    ,
                    t.tension = function(n) {
                        return arguments.length ? (u = n,
                        t) : u
                    }
                    ,
                    t
                }
                function ki(n) {
                    return n.length > 1 ? n.join("L") : n + "Z"
                }
                function Mi(n) {
                    return n.join("L") + "Z"
                }
                function wi(n) {
                    for (var t = 0, e = n.length, r = n[0], i = [r[0], ",", r[1]]; ++t < e; )
                        i.push("V", (r = n[t])[1], "H", r[0]);
                    return i.join("")
                }
                function _i(n) {
                    for (var t = 0, e = n.length, r = n[0], i = [r[0], ",", r[1]]; ++t < e; )
                        i.push("H", (r = n[t])[0], "V", r[1]);
                    return i.join("")
                }
                function Ni(n, t) {
                    if (t.length < 1 || n.length != t.length && n.length != t.length + 2)
                        return ki(n);
                    var e = n.length != t.length
                      , r = ""
                      , i = n[0]
                      , o = n[1]
                      , a = t[0]
                      , u = a
                      , l = 1;
                    if (e && (r += "Q" + (o[0] - 2 * a[0] / 3) + "," + (o[1] - 2 * a[1] / 3) + "," + o[0] + "," + o[1],
                    i = n[1],
                    l = 2),
                    t.length > 1) {
                        u = t[1],
                        o = n[l],
                        l++,
                        r += "C" + (i[0] + a[0]) + "," + (i[1] + a[1]) + "," + (o[0] - u[0]) + "," + (o[1] - u[1]) + "," + o[0] + "," + o[1];
                        for (var s = 2; s < t.length; s++,
                        l++)
                            o = n[l],
                            u = t[s],
                            r += "S" + (o[0] - u[0]) + "," + (o[1] - u[1]) + "," + o[0] + "," + o[1]
                    }
                    if (e) {
                        var c = n[l];
                        r += "Q" + (o[0] + 2 * u[0] / 3) + "," + (o[1] + 2 * u[1] / 3) + "," + c[0] + "," + c[1]
                    }
                    return r
                }
                function Si(n, t) {
                    for (var e, r = [], i = (1 - t) / 2, o = n[0], a = n[1], u = 1, l = n.length; ++u < l; )
                        e = o,
                        o = a,
                        a = n[u],
                        r.push([i * (a[0] - e[0]), i * (a[1] - e[1])]);
                    return r
                }
                function Ai(n) {
                    if (n.length < 3)
                        return ki(n);
                    var t = 1
                      , e = n.length
                      , r = n[0]
                      , i = r[0]
                      , o = r[1]
                      , a = [i, i, i, (r = n[1])[0]]
                      , u = [o, o, o, r[1]]
                      , l = [i, ",", o, "L", Li(Mu, a), ",", Li(Mu, u)];
                    for (n.push(n[e - 1]); ++t <= e; )
                        r = n[t],
                        a.shift(),
                        a.push(r[0]),
                        u.shift(),
                        u.push(r[1]),
                        Ei(l, a, u);
                    return n.pop(),
                    l.push("L", r),
                    l.join("")
                }
                function Li(n, t) {
                    return n[0] * t[0] + n[1] * t[1] + n[2] * t[2] + n[3] * t[3]
                }
                function Ei(n, t, e) {
                    n.push("C", Li(bu, t), ",", Li(bu, e), ",", Li(ku, t), ",", Li(ku, e), ",", Li(Mu, t), ",", Li(Mu, e))
                }
                function Ti(n, t) {
                    return (t[1] - n[1]) / (t[0] - n[0])
                }
                function Ci(n) {
                    for (var t, e, r, i, o = [], a = function(n) {
                        for (var t = 0, e = n.length - 1, r = [], i = n[0], o = n[1], a = r[0] = Ti(i, o); ++t < e; )
                            r[t] = (a + (a = Ti(i = o, o = n[t + 1]))) / 2;
                        return r[t] = a,
                        r
                    }(n), u = -1, l = n.length - 1; ++u < l; )
                        t = Ti(n[u], n[u + 1]),
                        lo(t) < No ? a[u] = a[u + 1] = 0 : (i = (e = a[u] / t) * e + (r = a[u + 1] / t) * r) > 9 && (i = 3 * t / Math.sqrt(i),
                        a[u] = i * e,
                        a[u + 1] = i * r);
                    for (u = -1; ++u <= l; )
                        i = (n[Math.min(l, u + 1)][0] - n[Math.max(0, u - 1)][0]) / (6 * (1 + a[u] * a[u])),
                        o.push([i || 0, a[u] * i || 0]);
                    return o
                }
                function zi(n) {
                    for (var t, e, r, i = -1, o = n.length; ++i < o; )
                        e = (t = n[i])[0],
                        r = t[1] - To,
                        t[0] = e * Math.cos(r),
                        t[1] = e * Math.sin(r);
                    return n
                }
                function Pi(n) {
                    function t(t) {
                        function l() {
                            g.push("M", u(n(m), f), c, s(n(v.reverse()), f), "Z")
                        }
                        for (var h, p, d, g = [], v = [], m = [], y = -1, x = t.length, b = An(e), k = An(i), M = e === r ? function() {
                            return p
                        }
                        : An(r), w = i === o ? function() {
                            return d
                        }
                        : An(o); ++y < x; )
                            a.call(this, h = t[y], y) ? (v.push([p = +b.call(this, h, y), d = +k.call(this, h, y)]),
                            m.push([+M.call(this, h, y), +w.call(this, h, y)])) : v.length && (l(),
                            v = [],
                            m = []);
                        return v.length && l(),
                        g.length ? g.join("") : null
                    }
                    var e = he
                      , r = he
                      , i = 0
                      , o = pe
                      , a = _t
                      , u = ki
                      , l = u.key
                      , s = u
                      , c = "L"
                      , f = .7;
                    return t.x = function(n) {
                        return arguments.length ? (e = r = n,
                        t) : r
                    }
                    ,
                    t.x0 = function(n) {
                        return arguments.length ? (e = n,
                        t) : e
                    }
                    ,
                    t.x1 = function(n) {
                        return arguments.length ? (r = n,
                        t) : r
                    }
                    ,
                    t.y = function(n) {
                        return arguments.length ? (i = o = n,
                        t) : o
                    }
                    ,
                    t.y0 = function(n) {
                        return arguments.length ? (i = n,
                        t) : i
                    }
                    ,
                    t.y1 = function(n) {
                        return arguments.length ? (o = n,
                        t) : o
                    }
                    ,
                    t.defined = function(n) {
                        return arguments.length ? (a = n,
                        t) : a
                    }
                    ,
                    t.interpolate = function(n) {
                        return arguments.length ? (l = "function" == typeof n ? u = n : (u = xu.get(n) || ki).key,
                        s = u.reverse || u,
                        c = u.closed ? "M" : "L",
                        t) : l
                    }
                    ,
                    t.tension = function(n) {
                        return arguments.length ? (f = n,
                        t) : f
                    }
                    ,
                    t
                }
                function Oi(n) {
                    return n.radius
                }
                function qi(n) {
                    return [n.x, n.y]
                }
                function Ri() {
                    return 64
                }
                function ji() {
                    return "circle"
                }
                function Ui(n) {
                    var t = Math.sqrt(n / Ao);
                    return "M0," + t + "A" + t + "," + t + " 0 1,1 0," + -t + "A" + t + "," + t + " 0 1,1 0," + t + "Z"
                }
                function Di(n) {
                    return function() {
                        var t, e, r;
                        (t = this[n]) && (r = t[e = t.active]) && (r.timer.c = null,
                        r.timer.t = NaN,
                        --t.count ? delete t[e] : delete this[n],
                        t.active += .5,
                        r.event && r.event.interrupt.call(this, this.__data__, r.index))
                    }
                }
                function Fi(n, t, e) {
                    return po(n, Eu),
                    n.namespace = t,
                    n.id = e,
                    n
                }
                function Ii(n, t, e, r) {
                    var i = n.id
                      , o = n.namespace;
                    return X(n, "function" == typeof e ? function(n, a, u) {
                        n[o][i].tween.set(t, r(e.call(n, n.__data__, a, u)))
                    }
                    : (e = r(e),
                    function(n) {
                        n[o][i].tween.set(t, e)
                    }
                    ))
                }
                function Hi(n) {
                    return null == n && (n = ""),
                    function() {
                        this.textContent = n
                    }
                }
                function Bi(n) {
                    return null == n ? "__transition__" : "__transition_" + n + "__"
                }
                function Vi(n, t, e, r, i) {
                    function o(e) {
                        var i = h.active
                          , o = h[i];
                        for (var p in o && (o.timer.c = null,
                        o.timer.t = NaN,
                        --h.count,
                        delete h[i],
                        o.event && o.event.interrupt.call(n, n.__data__, o.index)),
                        h)
                            if (r > +p) {
                                var g = h[p];
                                g.timer.c = null,
                                g.timer.t = NaN,
                                --h.count,
                                delete h[p]
                            }
                        l.c = a,
                        Tn(function() {
                            return l.c && a(e || 1) && (l.c = null,
                            l.t = NaN),
                            1
                        }, 0, u),
                        h.active = r,
                        d.event && d.event.start.call(n, n.__data__, t),
                        f = [],
                        d.tween.forEach(function(e, r) {
                            (r = r.call(n, n.__data__, t)) && f.push(r)
                        }),
                        c = d.ease,
                        s = d.duration
                    }
                    function a(i) {
                        for (var o = i / s, a = c(o), u = f.length; u > 0; )
                            f[--u].call(n, a);
                        return o >= 1 ? (d.event && d.event.end.call(n, n.__data__, t),
                        --h.count ? delete h[r] : delete n[e],
                        1) : void 0
                    }
                    var u, l, s, c, f, h = n[e] || (n[e] = {
                        active: 0,
                        count: 0
                    }), d = h[r];
                    d || (u = i.time,
                    l = Tn(function(n) {
                        var t = d.delay;
                        return l.t = t + u,
                        n >= t ? o(n - t) : void (l.c = o)
                    }, 0, u),
                    d = h[r] = {
                        tween: new p,
                        time: u,
                        timer: l,
                        delay: i.delay,
                        duration: i.duration,
                        ease: i.ease,
                        index: t
                    },
                    i = null,
                    ++h.count)
                }
                function Yi(n, t, e) {
                    n.attr("transform", function(n) {
                        var r = t(n);
                        return "translate(" + (isFinite(r) ? r : e(n)) + ",0)"
                    })
                }
                function Xi(n, t, e) {
                    n.attr("transform", function(n) {
                        var r = t(n);
                        return "translate(0," + (isFinite(r) ? r : e(n)) + ")"
                    })
                }
                function Wi(n) {
                    return n.toISOString()
                }
                function Ji(n, t, e) {
                    function r(t) {
                        return n(t)
                    }
                    function i(n, e) {
                        var r = (n[1] - n[0]) / e
                          , i = Ki.bisect(Uu, r);
                        return i == Uu.length ? [t.year, ui(n.map(function(n) {
                            return n / 31536e6
                        }), e)[2]] : i ? t[r / Uu[i - 1] < Uu[i] / r ? i - 1 : i] : [Iu, ui(n, e)[2]]
                    }
                    return r.invert = function(t) {
                        return Gi(n.invert(t))
                    }
                    ,
                    r.domain = function(t) {
                        return arguments.length ? (n.domain(t),
                        r) : n.domain().map(Gi)
                    }
                    ,
                    r.nice = function(n, t) {
                        function e(e) {
                            return !isNaN(e) && !n.range(e, Gi(+e + 1), t).length
                        }
                        var o = r.domain()
                          , a = Qr(o)
                          , u = null == n ? i(a, 10) : "number" == typeof n && i(a, n);
                        return u && (n = u[0],
                        t = u[1]),
                        r.domain(ei(o, t > 1 ? {
                            floor: function(t) {
                                for (; e(t = n.floor(t)); )
                                    t = Gi(t - 1);
                                return t
                            },
                            ceil: function(t) {
                                for (; e(t = n.ceil(t)); )
                                    t = Gi(+t + 1);
                                return t
                            }
                        } : n))
                    }
                    ,
                    r.ticks = function(n, t) {
                        var e = Qr(r.domain())
                          , o = null == n ? i(e, 10) : "number" == typeof n ? i(e, n) : !n.range && [{
                            range: n
                        }, t];
                        return o && (n = o[0],
                        t = o[1]),
                        n.range(e[0], Gi(+e[1] + 1), 1 > t ? 1 : t)
                    }
                    ,
                    r.tickFormat = function() {
                        return e
                    }
                    ,
                    r.copy = function() {
                        return Ji(n.copy(), t, e)
                    }
                    ,
                    oi(r, n)
                }
                function Gi(n) {
                    return new Date(n)
                }
                function Zi(n) {
                    return JSON.parse(n.responseText)
                }
                function $i(n) {
                    var t = to.createRange();
                    return t.selectNode(to.body),
                    t.createContextualFragment(n.responseText)
                }
                var Ki = {
                    version: "3.5.13"
                }
                  , Qi = [].slice
                  , no = function(n) {
                    return Qi.call(n)
                }
                  , to = this.document;
                if (to)
                    try {
                        no(to.documentElement.childNodes)[0].nodeType
                    } catch (n) {
                        no = function(n) {
                            for (var t = n.length, e = new Array(t); t--; )
                                e[t] = n[t];
                            return e
                        }
                    }
                if (Date.now || (Date.now = function() {
                    return +new Date
                }
                ),
                to)
                    try {
                        to.createElement("DIV").style.setProperty("opacity", 0, "")
                    } catch (n) {
                        var eo = this.Element.prototype
                          , ro = eo.setAttribute
                          , io = eo.setAttributeNS
                          , oo = this.CSSStyleDeclaration.prototype
                          , ao = oo.setProperty;
                        eo.setAttribute = function(n, t) {
                            ro.call(this, n, t + "")
                        }
                        ,
                        eo.setAttributeNS = function(n, t, e) {
                            io.call(this, n, t, e + "")
                        }
                        ,
                        oo.setProperty = function(n, t, e) {
                            ao.call(this, n, t + "", e)
                        }
                    }
                Ki.ascending = u,
                Ki.descending = function(n, t) {
                    return n > t ? -1 : t > n ? 1 : t >= n ? 0 : NaN
                }
                ,
                Ki.min = function(n, t) {
                    var e, r, i = -1, o = n.length;
                    if (1 === arguments.length) {
                        for (; ++i < o; )
                            if (null != (r = n[i]) && r >= r) {
                                e = r;
                                break
                            }
                        for (; ++i < o; )
                            null != (r = n[i]) && e > r && (e = r)
                    } else {
                        for (; ++i < o; )
                            if (null != (r = t.call(n, n[i], i)) && r >= r) {
                                e = r;
                                break
                            }
                        for (; ++i < o; )
                            null != (r = t.call(n, n[i], i)) && e > r && (e = r)
                    }
                    return e
                }
                ,
                Ki.max = function(n, t) {
                    var e, r, i = -1, o = n.length;
                    if (1 === arguments.length) {
                        for (; ++i < o; )
                            if (null != (r = n[i]) && r >= r) {
                                e = r;
                                break
                            }
                        for (; ++i < o; )
                            null != (r = n[i]) && r > e && (e = r)
                    } else {
                        for (; ++i < o; )
                            if (null != (r = t.call(n, n[i], i)) && r >= r) {
                                e = r;
                                break
                            }
                        for (; ++i < o; )
                            null != (r = t.call(n, n[i], i)) && r > e && (e = r)
                    }
                    return e
                }
                ,
                Ki.extent = function(n, t) {
                    var e, r, i, o = -1, a = n.length;
                    if (1 === arguments.length) {
                        for (; ++o < a; )
                            if (null != (r = n[o]) && r >= r) {
                                e = i = r;
                                break
                            }
                        for (; ++o < a; )
                            null != (r = n[o]) && (e > r && (e = r),
                            r > i && (i = r))
                    } else {
                        for (; ++o < a; )
                            if (null != (r = t.call(n, n[o], o)) && r >= r) {
                                e = i = r;
                                break
                            }
                        for (; ++o < a; )
                            null != (r = t.call(n, n[o], o)) && (e > r && (e = r),
                            r > i && (i = r))
                    }
                    return [e, i]
                }
                ,
                Ki.sum = function(n, t) {
                    var e, r = 0, i = n.length, o = -1;
                    if (1 === arguments.length)
                        for (; ++o < i; )
                            s(e = +n[o]) && (r += e);
                    else
                        for (; ++o < i; )
                            s(e = +t.call(n, n[o], o)) && (r += e);
                    return r
                }
                ,
                Ki.mean = function(n, t) {
                    var e, r = 0, i = n.length, o = -1, a = i;
                    if (1 === arguments.length)
                        for (; ++o < i; )
                            s(e = l(n[o])) ? r += e : --a;
                    else
                        for (; ++o < i; )
                            s(e = l(t.call(n, n[o], o))) ? r += e : --a;
                    return a ? r / a : void 0
                }
                ,
                Ki.quantile = function(n, t) {
                    var e = (n.length - 1) * t + 1
                      , r = Math.floor(e)
                      , i = +n[r - 1]
                      , o = e - r;
                    return o ? i + o * (n[r] - i) : i
                }
                ,
                Ki.median = function(n, t) {
                    var e, r = [], i = n.length, o = -1;
                    if (1 === arguments.length)
                        for (; ++o < i; )
                            s(e = l(n[o])) && r.push(e);
                    else
                        for (; ++o < i; )
                            s(e = l(t.call(n, n[o], o))) && r.push(e);
                    return r.length ? Ki.quantile(r.sort(u), .5) : void 0
                }
                ,
                Ki.variance = function(n, t) {
                    var e, r, i = n.length, o = 0, a = 0, u = -1, c = 0;
                    if (1 === arguments.length)
                        for (; ++u < i; )
                            s(e = l(n[u])) && (a += (r = e - o) * (e - (o += r / ++c)));
                    else
                        for (; ++u < i; )
                            s(e = l(t.call(n, n[u], u))) && (a += (r = e - o) * (e - (o += r / ++c)));
                    return c > 1 ? a / (c - 1) : void 0
                }
                ,
                Ki.deviation = function() {
                    var n = Ki.variance.apply(this, arguments);
                    return n ? Math.sqrt(n) : n
                }
                ;
                var uo = c(u);
                Ki.bisectLeft = uo.left,
                Ki.bisect = Ki.bisectRight = uo.right,
                Ki.bisector = function(n) {
                    return c(1 === n.length ? function(t, e) {
                        return u(n(t), e)
                    }
                    : n)
                }
                ,
                Ki.shuffle = function(n, t, e) {
                    (o = arguments.length) < 3 && (e = n.length,
                    2 > o && (t = 0));
                    for (var r, i, o = e - t; o; )
                        i = Math.random() * o-- | 0,
                        r = n[o + t],
                        n[o + t] = n[i + t],
                        n[i + t] = r;
                    return n
                }
                ,
                Ki.permute = function(n, t) {
                    for (var e = t.length, r = new Array(e); e--; )
                        r[e] = n[t[e]];
                    return r
                }
                ,
                Ki.pairs = function(n) {
                    for (var t = 0, e = n.length - 1, r = n[0], i = new Array(0 > e ? 0 : e); e > t; )
                        i[t] = [r, r = n[++t]];
                    return i
                }
                ,
                Ki.zip = function() {
                    if (!(r = arguments.length))
                        return [];
                    for (var n = -1, t = Ki.min(arguments, f), e = new Array(t); ++n < t; )
                        for (var r, i = -1, o = e[n] = new Array(r); ++i < r; )
                            o[i] = arguments[i][n];
                    return e
                }
                ,
                Ki.transpose = function(n) {
                    return Ki.zip.apply(Ki, n)
                }
                ,
                Ki.keys = function(n) {
                    var t = [];
                    for (var e in n)
                        t.push(e);
                    return t
                }
                ,
                Ki.values = function(n) {
                    var t = [];
                    for (var e in n)
                        t.push(n[e]);
                    return t
                }
                ,
                Ki.entries = function(n) {
                    var t = [];
                    for (var e in n)
                        t.push({
                            key: e,
                            value: n[e]
                        });
                    return t
                }
                ,
                Ki.merge = function(n) {
                    for (var t, e, r, i = n.length, o = -1, a = 0; ++o < i; )
                        a += n[o].length;
                    for (e = new Array(a); --i >= 0; )
                        for (t = (r = n[i]).length; --t >= 0; )
                            e[--a] = r[t];
                    return e
                }
                ;
                var lo = Math.abs;
                Ki.range = function(n, t, e) {
                    if (arguments.length < 3 && (e = 1,
                    arguments.length < 2 && (t = n,
                    n = 0)),
                    (t - n) / e == 1 / 0)
                        throw new Error("infinite range");
                    var r, i = [], o = function(n) {
                        for (var t = 1; n * t % 1; )
                            t *= 10;
                        return t
                    }(lo(e)), a = -1;
                    if (n *= o,
                    t *= o,
                    0 > (e *= o))
                        for (; (r = n + e * ++a) > t; )
                            i.push(r / o);
                    else
                        for (; (r = n + e * ++a) < t; )
                            i.push(r / o);
                    return i
                }
                ,
                Ki.map = function(n, t) {
                    var e = new p;
                    if (n instanceof p)
                        n.forEach(function(n, t) {
                            e.set(n, t)
                        });
                    else if (Array.isArray(n)) {
                        var r, i = -1, o = n.length;
                        if (1 === arguments.length)
                            for (; ++i < o; )
                                e.set(i, n[i]);
                        else
                            for (; ++i < o; )
                                e.set(t.call(n, r = n[i], i), r)
                    } else
                        for (var a in n)
                            e.set(a, n[a]);
                    return e
                }
                ;
                var so = "__proto__"
                  , co = "\0";
                h(p, {
                    has: v,
                    get: function(n) {
                        return this._[d(n)]
                    },
                    set: function(n, t) {
                        return this._[d(n)] = t
                    },
                    remove: m,
                    keys: y,
                    values: function() {
                        var n = [];
                        for (var t in this._)
                            n.push(this._[t]);
                        return n
                    },
                    entries: function() {
                        var n = [];
                        for (var t in this._)
                            n.push({
                                key: g(t),
                                value: this._[t]
                            });
                        return n
                    },
                    size: x,
                    empty: b,
                    forEach: function(n) {
                        for (var t in this._)
                            n.call(this, g(t), this._[t])
                    }
                }),
                Ki.nest = function() {
                    function n(o, a, u) {
                        if (u >= i.length)
                            return e ? e.call(r, a) : t ? a.sort(t) : a;
                        for (var l, s, c, f, h = -1, d = a.length, g = i[u++], v = new p; ++h < d; )
                            (f = v.get(l = g(s = a[h]))) ? f.push(s) : v.set(l, [s]);
                        return o ? (s = o(),
                        c = function(t, e) {
                            s.set(t, n(o, e, u))
                        }
                        ) : (s = {},
                        c = function(t, e) {
                            s[t] = n(o, e, u)
                        }
                        ),
                        v.forEach(c),
                        s
                    }
                    var t, e, r = {}, i = [], o = [];
                    return r.map = function(t, e) {
                        return n(e, t, 0)
                    }
                    ,
                    r.entries = function(t) {
                        return function n(t, e) {
                            if (e >= i.length)
                                return t;
                            var r = []
                              , a = o[e++];
                            return t.forEach(function(t, i) {
                                r.push({
                                    key: t,
                                    values: n(i, e)
                                })
                            }),
                            a ? r.sort(function(n, t) {
                                return a(n.key, t.key)
                            }) : r
                        }(n(Ki.map, t, 0), 0)
                    }
                    ,
                    r.key = function(n) {
                        return i.push(n),
                        r
                    }
                    ,
                    r.sortKeys = function(n) {
                        return o[i.length - 1] = n,
                        r
                    }
                    ,
                    r.sortValues = function(n) {
                        return t = n,
                        r
                    }
                    ,
                    r.rollup = function(n) {
                        return e = n,
                        r
                    }
                    ,
                    r
                }
                ,
                Ki.set = function(n) {
                    var t = new k;
                    if (n)
                        for (var e = 0, r = n.length; r > e; ++e)
                            t.add(n[e]);
                    return t
                }
                ,
                h(k, {
                    has: v,
                    add: function(n) {
                        return this._[d(n += "")] = !0,
                        n
                    },
                    remove: m,
                    values: y,
                    size: x,
                    empty: b,
                    forEach: function(n) {
                        for (var t in this._)
                            n.call(this, g(t))
                    }
                }),
                Ki.behavior = {},
                Ki.rebind = function(n, t) {
                    for (var e, r = 1, i = arguments.length; ++r < i; )
                        n[e = arguments[r]] = w(n, t, t[e]);
                    return n
                }
                ;
                var fo = ["webkit", "ms", "moz", "Moz", "o", "O"];
                Ki.dispatch = function() {
                    for (var n = new S, t = -1, e = arguments.length; ++t < e; )
                        n[arguments[t]] = A(n);
                    return n
                }
                ,
                S.prototype.on = function(n, t) {
                    var e = n.indexOf(".")
                      , r = "";
                    if (e >= 0 && (r = n.slice(e + 1),
                    n = n.slice(0, e)),
                    n)
                        return arguments.length < 2 ? this[n].on(r) : this[n].on(r, t);
                    if (2 === arguments.length) {
                        if (null == t)
                            for (n in this)
                                this.hasOwnProperty(n) && this[n].on(r, null);
                        return this
                    }
                }
                ,
                Ki.event = null,
                Ki.requote = function(n) {
                    return n.replace(ho, "\\$&")
                }
                ;
                var ho = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g
                  , po = {}.__proto__ ? function(n, t) {
                    n.__proto__ = t
                }
                : function(n, t) {
                    for (var e in t)
                        n[e] = t[e]
                }
                  , go = function(n, t) {
                    return t.querySelector(n)
                }
                  , vo = function(n, t) {
                    return t.querySelectorAll(n)
                }
                  , mo = function(n, t) {
                    var e = n.matches || n[_(n, "matchesSelector")];
                    return (mo = function(n, t) {
                        return e.call(n, t)
                    }
                    )(n, t)
                };
                "function" == typeof Sizzle && (go = function(n, t) {
                    return Sizzle(n, t)[0] || null
                }
                ,
                vo = Sizzle,
                mo = Sizzle.matchesSelector),
                Ki.selection = function() {
                    return Ki.select(to.documentElement)
                }
                ;
                var yo = Ki.selection.prototype = [];
                yo.select = function(n) {
                    var t, e, r, i, o = [];
                    n = z(n);
                    for (var a = -1, u = this.length; ++a < u; ) {
                        o.push(t = []),
                        t.parentNode = (r = this[a]).parentNode;
                        for (var l = -1, s = r.length; ++l < s; )
                            (i = r[l]) ? (t.push(e = n.call(i, i.__data__, l, a)),
                            e && "__data__"in i && (e.__data__ = i.__data__)) : t.push(null)
                    }
                    return C(o)
                }
                ,
                yo.selectAll = function(n) {
                    var t, e, r = [];
                    n = P(n);
                    for (var i = -1, o = this.length; ++i < o; )
                        for (var a = this[i], u = -1, l = a.length; ++u < l; )
                            (e = a[u]) && (r.push(t = no(n.call(e, e.__data__, u, i))),
                            t.parentNode = e);
                    return C(r)
                }
                ;
                var xo = {
                    svg: "http://www.w3.org/2000/svg",
                    xhtml: "http://www.w3.org/1999/xhtml",
                    xlink: "http://www.w3.org/1999/xlink",
                    xml: "http://www.w3.org/XML/1998/namespace",
                    xmlns: "http://www.w3.org/2000/xmlns/"
                };
                Ki.ns = {
                    prefix: xo,
                    qualify: function(n) {
                        var t = n.indexOf(":")
                          , e = n;
                        return t >= 0 && "xmlns" !== (e = n.slice(0, t)) && (n = n.slice(t + 1)),
                        xo.hasOwnProperty(e) ? {
                            space: xo[e],
                            local: n
                        } : n
                    }
                },
                yo.attr = function(n, t) {
                    if (arguments.length < 2) {
                        if ("string" == typeof n) {
                            var e = this.node();
                            return (n = Ki.ns.qualify(n)).local ? e.getAttributeNS(n.space, n.local) : e.getAttribute(n)
                        }
                        for (t in n)
                            this.each(O(t, n[t]));
                        return this
                    }
                    return this.each(O(n, t))
                }
                ,
                yo.classed = function(n, t) {
                    if (arguments.length < 2) {
                        if ("string" == typeof n) {
                            var e = this.node()
                              , r = (n = j(n)).length
                              , i = -1;
                            if (t = e.classList) {
                                for (; ++i < r; )
                                    if (!t.contains(n[i]))
                                        return !1
                            } else
                                for (t = e.getAttribute("class"); ++i < r; )
                                    if (!R(n[i]).test(t))
                                        return !1;
                            return !0
                        }
                        for (t in n)
                            this.each(U(t, n[t]));
                        return this
                    }
                    return this.each(U(n, t))
                }
                ,
                yo.style = function(n, t, e) {
                    var r = arguments.length;
                    if (3 > r) {
                        if ("string" != typeof n) {
                            for (e in 2 > r && (t = ""),
                            n)
                                this.each(F(e, n[e], t));
                            return this
                        }
                        if (2 > r) {
                            var i = this.node();
                            return a(i).getComputedStyle(i, null).getPropertyValue(n)
                        }
                        e = ""
                    }
                    return this.each(F(n, t, e))
                }
                ,
                yo.property = function(n, t) {
                    if (arguments.length < 2) {
                        if ("string" == typeof n)
                            return this.node()[n];
                        for (t in n)
                            this.each(I(t, n[t]));
                        return this
                    }
                    return this.each(I(n, t))
                }
                ,
                yo.text = function(n) {
                    return arguments.length ? this.each("function" == typeof n ? function() {
                        var t = n.apply(this, arguments);
                        this.textContent = null == t ? "" : t
                    }
                    : null == n ? function() {
                        this.textContent = ""
                    }
                    : function() {
                        this.textContent = n
                    }
                    ) : this.node().textContent
                }
                ,
                yo.html = function(n) {
                    return arguments.length ? this.each("function" == typeof n ? function() {
                        var t = n.apply(this, arguments);
                        this.innerHTML = null == t ? "" : t
                    }
                    : null == n ? function() {
                        this.innerHTML = ""
                    }
                    : function() {
                        this.innerHTML = n
                    }
                    ) : this.node().innerHTML
                }
                ,
                yo.append = function(n) {
                    return n = H(n),
                    this.select(function() {
                        return this.appendChild(n.apply(this, arguments))
                    })
                }
                ,
                yo.insert = function(n, t) {
                    return n = H(n),
                    t = z(t),
                    this.select(function() {
                        return this.insertBefore(n.apply(this, arguments), t.apply(this, arguments) || null)
                    })
                }
                ,
                yo.remove = function() {
                    return this.each(B)
                }
                ,
                yo.data = function(n, t) {
                    function e(n, e) {
                        var r, i, o, a = n.length, c = e.length, f = Math.min(a, c), h = new Array(c), d = new Array(c), g = new Array(a);
                        if (t) {
                            var v, m = new p, y = new Array(a);
                            for (r = -1; ++r < a; )
                                (i = n[r]) && (m.has(v = t.call(i, i.__data__, r)) ? g[r] = i : m.set(v, i),
                                y[r] = v);
                            for (r = -1; ++r < c; )
                                (i = m.get(v = t.call(e, o = e[r], r))) ? !0 !== i && (h[r] = i,
                                i.__data__ = o) : d[r] = V(o),
                                m.set(v, !0);
                            for (r = -1; ++r < a; )
                                r in y && !0 !== m.get(y[r]) && (g[r] = n[r])
                        } else {
                            for (r = -1; ++r < f; )
                                i = n[r],
                                o = e[r],
                                i ? (i.__data__ = o,
                                h[r] = i) : d[r] = V(o);
                            for (; c > r; ++r)
                                d[r] = V(e[r]);
                            for (; a > r; ++r)
                                g[r] = n[r]
                        }
                        d.update = h,
                        d.parentNode = h.parentNode = g.parentNode = n.parentNode,
                        u.push(d),
                        l.push(h),
                        s.push(g)
                    }
                    var r, i, o = -1, a = this.length;
                    if (!arguments.length) {
                        for (n = new Array(a = (r = this[0]).length); ++o < a; )
                            (i = r[o]) && (n[o] = i.__data__);
                        return n
                    }
                    var u = W([])
                      , l = C([])
                      , s = C([]);
                    if ("function" == typeof n)
                        for (; ++o < a; )
                            e(r = this[o], n.call(r, r.parentNode.__data__, o));
                    else
                        for (; ++o < a; )
                            e(r = this[o], n);
                    return l.enter = function() {
                        return u
                    }
                    ,
                    l.exit = function() {
                        return s
                    }
                    ,
                    l
                }
                ,
                yo.datum = function(n) {
                    return arguments.length ? this.property("__data__", n) : this.property("__data__")
                }
                ,
                yo.filter = function(n) {
                    var t, e, r, i = [];
                    "function" != typeof n && (n = Y(n));
                    for (var o = 0, a = this.length; a > o; o++) {
                        i.push(t = []),
                        t.parentNode = (e = this[o]).parentNode;
                        for (var u = 0, l = e.length; l > u; u++)
                            (r = e[u]) && n.call(r, r.__data__, u, o) && t.push(r)
                    }
                    return C(i)
                }
                ,
                yo.order = function() {
                    for (var n = -1, t = this.length; ++n < t; )
                        for (var e, r = this[n], i = r.length - 1, o = r[i]; --i >= 0; )
                            (e = r[i]) && (o && o !== e.nextSibling && o.parentNode.insertBefore(e, o),
                            o = e);
                    return this
                }
                ,
                yo.sort = function(n) {
                    n = function(n) {
                        return arguments.length || (n = u),
                        function(t, e) {
                            return t && e ? n(t.__data__, e.__data__) : !t - !e
                        }
                    }
                    .apply(this, arguments);
                    for (var t = -1, e = this.length; ++t < e; )
                        this[t].sort(n);
                    return this.order()
                }
                ,
                yo.each = function(n) {
                    return X(this, function(t, e, r) {
                        n.call(t, t.__data__, e, r)
                    })
                }
                ,
                yo.call = function(n) {
                    var t = no(arguments);
                    return n.apply(t[0] = this, t),
                    this
                }
                ,
                yo.empty = function() {
                    return !this.node()
                }
                ,
                yo.node = function() {
                    for (var n = 0, t = this.length; t > n; n++)
                        for (var e = this[n], r = 0, i = e.length; i > r; r++) {
                            var o = e[r];
                            if (o)
                                return o
                        }
                    return null
                }
                ,
                yo.size = function() {
                    var n = 0;
                    return X(this, function() {
                        ++n
                    }),
                    n
                }
                ;
                var bo = [];
                Ki.selection.enter = W,
                Ki.selection.enter.prototype = bo,
                bo.append = yo.append,
                bo.empty = yo.empty,
                bo.node = yo.node,
                bo.call = yo.call,
                bo.size = yo.size,
                bo.select = function(n) {
                    for (var t, e, r, i, o, a = [], u = -1, l = this.length; ++u < l; ) {
                        r = (i = this[u]).update,
                        a.push(t = []),
                        t.parentNode = i.parentNode;
                        for (var s = -1, c = i.length; ++s < c; )
                            (o = i[s]) ? (t.push(r[s] = e = n.call(i.parentNode, o.__data__, s, u)),
                            e.__data__ = o.__data__) : t.push(null)
                    }
                    return C(a)
                }
                ,
                bo.insert = function(n, t) {
                    return arguments.length < 2 && (t = function(n) {
                        var t, e;
                        return function(r, i, o) {
                            var a, u = n[o].update, l = u.length;
                            for (o != e && (e = o,
                            t = 0),
                            i >= t && (t = i + 1); !(a = u[t]) && ++t < l; )
                                ;
                            return a
                        }
                    }(this)),
                    yo.insert.call(this, n, t)
                }
                ,
                Ki.select = function(n) {
                    var t;
                    return "string" == typeof n ? (t = [go(n, to)]).parentNode = to.documentElement : (t = [n]).parentNode = o(n),
                    C([t])
                }
                ,
                Ki.selectAll = function(n) {
                    var t;
                    return "string" == typeof n ? (t = no(vo(n, to))).parentNode = to.documentElement : (t = no(n)).parentNode = null,
                    C([t])
                }
                ,
                yo.on = function(n, t, e) {
                    var r = arguments.length;
                    if (3 > r) {
                        if ("string" != typeof n) {
                            for (e in 2 > r && (t = !1),
                            n)
                                this.each(J(e, n[e], t));
                            return this
                        }
                        if (2 > r)
                            return (r = this.node()["__on" + n]) && r._;
                        e = !1
                    }
                    return this.each(J(n, t, e))
                }
                ;
                var ko = Ki.map({
                    mouseenter: "mouseover",
                    mouseleave: "mouseout"
                });
                to && ko.forEach(function(n) {
                    "on" + n in to && ko.remove(n)
                });
                var Mo, wo = 0;
                Ki.mouse = function(n) {
                    return K(n, E())
                }
                ;
                var _o = this.navigator && /WebKit/.test(this.navigator.userAgent) ? -1 : 0;
                Ki.touch = function(n, t, e) {
                    if (arguments.length < 3 && (e = t,
                    t = E().changedTouches),
                    t)
                        for (var r, i = 0, o = t.length; o > i; ++i)
                            if ((r = t[i]).identifier === e)
                                return K(n, r)
                }
                ,
                Ki.behavior.drag = function() {
                    function n() {
                        this.on("mousedown.drag", i).on("touchstart.drag", o)
                    }
                    function t(n, t, i, o, a) {
                        return function() {
                            var u, l = this, s = Ki.event.target, c = l.parentNode, f = e.of(l, arguments), h = 0, p = n(), d = ".drag" + (null == p ? "" : "-" + p), g = Ki.select(i(s)).on(o + d, function() {
                                var n, e, r = t(c, p);
                                r && (n = r[0] - m[0],
                                e = r[1] - m[1],
                                h |= n | e,
                                m = r,
                                f({
                                    type: "drag",
                                    x: r[0] + u[0],
                                    y: r[1] + u[1],
                                    dx: n,
                                    dy: e
                                }))
                            }).on(a + d, function() {
                                t(c, p) && (g.on(o + d, null).on(a + d, null),
                                v(h),
                                f({
                                    type: "dragend"
                                }))
                            }), v = $(s), m = t(c, p);
                            r ? u = [(u = r.apply(l, arguments)).x - m[0], u.y - m[1]] : u = [0, 0],
                            f({
                                type: "dragstart"
                            })
                        }
                    }
                    var e = T(n, "drag", "dragstart", "dragend")
                      , r = null
                      , i = t(N, Ki.mouse, a, "mousemove", "mouseup")
                      , o = t(Q, Ki.touch, M, "touchmove", "touchend");
                    return n.origin = function(t) {
                        return arguments.length ? (r = t,
                        n) : r
                    }
                    ,
                    Ki.rebind(n, e, "on")
                }
                ,
                Ki.touches = function(n, t) {
                    return arguments.length < 2 && (t = E().touches),
                    t ? no(t).map(function(t) {
                        var e = K(n, t);
                        return e.identifier = t.identifier,
                        e
                    }) : []
                }
                ;
                var No = 1e-6
                  , So = No * No
                  , Ao = Math.PI
                  , Lo = 2 * Ao
                  , Eo = Lo - No
                  , To = Ao / 2
                  , Co = Ao / 180
                  , zo = 180 / Ao
                  , Po = Math.SQRT2;
                Ki.interpolateZoom = function(n, t) {
                    var e, r, i = n[0], o = n[1], a = n[2], u = t[0], l = t[1], s = t[2], c = u - i, f = l - o, h = c * c + f * f;
                    if (So > h)
                        r = Math.log(s / a) / Po,
                        e = function(n) {
                            return [i + n * c, o + n * f, a * Math.exp(Po * n * r)]
                        }
                        ;
                    else {
                        var p = Math.sqrt(h)
                          , d = (s * s - a * a + 4 * h) / (2 * a * 2 * p)
                          , g = (s * s - a * a - 4 * h) / (2 * s * 2 * p)
                          , v = Math.log(Math.sqrt(d * d + 1) - d)
                          , m = Math.log(Math.sqrt(g * g + 1) - g);
                        r = (m - v) / Po,
                        e = function(n) {
                            var t = n * r
                              , e = on(v)
                              , u = a / (2 * p) * (e * function(n) {
                                return ((n = Math.exp(2 * n)) - 1) / (n + 1)
                            }(Po * t + v) - function(n) {
                                return ((n = Math.exp(n)) - 1 / n) / 2
                            }(v));
                            return [i + u * c, o + u * f, a * e / on(Po * t + v)]
                        }
                    }
                    return e.duration = 1e3 * r,
                    e
                }
                ,
                Ki.behavior.zoom = function() {
                    function n(n) {
                        n.on(E, c).on(qo + ".zoom", h).on("dblclick.zoom", p).on(P, f)
                    }
                    function t(n) {
                        return [(n[0] - w.x) / w.k, (n[1] - w.y) / w.k]
                    }
                    function e(n) {
                        w.k = Math.max(N[0], Math.min(N[1], n))
                    }
                    function r(n, t) {
                        t = function(n) {
                            return [n[0] * w.k + w.x, n[1] * w.k + w.y]
                        }(t),
                        w.x += n[0] - t[0],
                        w.y += n[1] - t[1]
                    }
                    function i(t, i, o, a) {
                        t.__chart__ = {
                            x: w.x,
                            y: w.y,
                            k: w.k
                        },
                        e(Math.pow(2, a)),
                        r(g = i, o),
                        t = Ki.select(t),
                        S > 0 && (t = t.transition().duration(S)),
                        t.call(n.event)
                    }
                    function o() {
                        b && b.domain(x.range().map(function(n) {
                            return (n - w.x) / w.k
                        }).map(x.invert)),
                        M && M.domain(k.range().map(function(n) {
                            return (n - w.y) / w.k
                        }).map(k.invert))
                    }
                    function u(n) {
                        A++ || n({
                            type: "zoomstart"
                        })
                    }
                    function l(n) {
                        o(),
                        n({
                            type: "zoom",
                            scale: w.k,
                            translate: [w.x, w.y]
                        })
                    }
                    function s(n) {
                        --A || (n({
                            type: "zoomend"
                        }),
                        g = null)
                    }
                    function c() {
                        var n = this
                          , e = O.of(n, arguments)
                          , i = 0
                          , o = Ki.select(a(n)).on(C, function() {
                            i = 1,
                            r(Ki.mouse(n), c),
                            l(e)
                        }).on(z, function() {
                            o.on(C, null).on(z, null),
                            f(i),
                            s(e)
                        })
                          , c = t(Ki.mouse(n))
                          , f = $(n);
                        Lu.call(n),
                        u(e)
                    }
                    function f() {
                        function n() {
                            var n = Ki.touches(d);
                            return p = w.k,
                            n.forEach(function(n) {
                                n.identifier in v && (v[n.identifier] = t(n))
                            }),
                            n
                        }
                        function o() {
                            var t = Ki.event.target;
                            Ki.select(t).on(b, a).on(k, h),
                            M.push(t);
                            for (var e = Ki.event.changedTouches, r = 0, o = e.length; o > r; ++r)
                                v[e[r].identifier] = null;
                            var u = n()
                              , l = Date.now();
                            if (1 === u.length) {
                                if (500 > l - y) {
                                    var s = u[0];
                                    i(d, s, v[s.identifier], Math.floor(Math.log(w.k) / Math.LN2) + 1),
                                    L()
                                }
                                y = l
                            } else if (u.length > 1) {
                                s = u[0];
                                var c = u[1]
                                  , f = s[0] - c[0]
                                  , p = s[1] - c[1];
                                m = f * f + p * p
                            }
                        }
                        function a() {
                            var n, t, i, o, a = Ki.touches(d);
                            Lu.call(d);
                            for (var u = 0, s = a.length; s > u; ++u,
                            o = null)
                                if (i = a[u],
                                o = v[i.identifier]) {
                                    if (t)
                                        break;
                                    n = i,
                                    t = o
                                }
                            if (o) {
                                var c = (c = i[0] - n[0]) * c + (c = i[1] - n[1]) * c
                                  , f = m && Math.sqrt(c / m);
                                n = [(n[0] + i[0]) / 2, (n[1] + i[1]) / 2],
                                t = [(t[0] + o[0]) / 2, (t[1] + o[1]) / 2],
                                e(f * p)
                            }
                            y = null,
                            r(n, t),
                            l(g)
                        }
                        function h() {
                            if (Ki.event.touches.length) {
                                for (var t = Ki.event.changedTouches, e = 0, r = t.length; r > e; ++e)
                                    delete v[t[e].identifier];
                                for (var i in v)
                                    return void n()
                            }
                            Ki.selectAll(M).on(x, null),
                            _.on(E, c).on(P, f),
                            N(),
                            s(g)
                        }
                        var p, d = this, g = O.of(d, arguments), v = {}, m = 0, x = ".zoom-" + Ki.event.changedTouches[0].identifier, b = "touchmove" + x, k = "touchend" + x, M = [], _ = Ki.select(d), N = $(d);
                        o(),
                        u(g),
                        _.on(E, null).on(P, o)
                    }
                    function h() {
                        var n = O.of(this, arguments);
                        m ? clearTimeout(m) : (Lu.call(this),
                        d = t(g = v || Ki.mouse(this)),
                        u(n)),
                        m = setTimeout(function() {
                            m = null,
                            s(n)
                        }, 50),
                        L(),
                        e(Math.pow(2, .002 * Oo()) * w.k),
                        r(g, d),
                        l(n)
                    }
                    function p() {
                        var n = Ki.mouse(this)
                          , e = Math.log(w.k) / Math.LN2;
                        i(this, n, t(n), Ki.event.shiftKey ? Math.ceil(e) - 1 : Math.floor(e) + 1)
                    }
                    var d, g, v, m, y, x, b, k, M, w = {
                        x: 0,
                        y: 0,
                        k: 1
                    }, _ = [960, 500], N = Ro, S = 250, A = 0, E = "mousedown.zoom", C = "mousemove.zoom", z = "mouseup.zoom", P = "touchstart.zoom", O = T(n, "zoomstart", "zoom", "zoomend");
                    return qo || (qo = "onwheel"in to ? (Oo = function() {
                        return -Ki.event.deltaY * (Ki.event.deltaMode ? 120 : 1)
                    }
                    ,
                    "wheel") : "onmousewheel"in to ? (Oo = function() {
                        return Ki.event.wheelDelta
                    }
                    ,
                    "mousewheel") : (Oo = function() {
                        return -Ki.event.detail
                    }
                    ,
                    "MozMousePixelScroll")),
                    n.event = function(n) {
                        n.each(function() {
                            var n = O.of(this, arguments)
                              , t = w;
                            Su ? Ki.select(this).transition().each("start.zoom", function() {
                                w = this.__chart__ || {
                                    x: 0,
                                    y: 0,
                                    k: 1
                                },
                                u(n)
                            }).tween("zoom:zoom", function() {
                                var e = _[0]
                                  , r = _[1]
                                  , i = g ? g[0] : e / 2
                                  , o = g ? g[1] : r / 2
                                  , a = Ki.interpolateZoom([(i - w.x) / w.k, (o - w.y) / w.k, e / w.k], [(i - t.x) / t.k, (o - t.y) / t.k, e / t.k]);
                                return function(t) {
                                    var r = a(t)
                                      , u = e / r[2];
                                    this.__chart__ = w = {
                                        x: i - r[0] * u,
                                        y: o - r[1] * u,
                                        k: u
                                    },
                                    l(n)
                                }
                            }).each("interrupt.zoom", function() {
                                s(n)
                            }).each("end.zoom", function() {
                                s(n)
                            }) : (this.__chart__ = w,
                            u(n),
                            l(n),
                            s(n))
                        })
                    }
                    ,
                    n.translate = function(t) {
                        return arguments.length ? (w = {
                            x: +t[0],
                            y: +t[1],
                            k: w.k
                        },
                        o(),
                        n) : [w.x, w.y]
                    }
                    ,
                    n.scale = function(t) {
                        return arguments.length ? (w = {
                            x: w.x,
                            y: w.y,
                            k: null
                        },
                        e(+t),
                        o(),
                        n) : w.k
                    }
                    ,
                    n.scaleExtent = function(t) {
                        return arguments.length ? (N = null == t ? Ro : [+t[0], +t[1]],
                        n) : N
                    }
                    ,
                    n.center = function(t) {
                        return arguments.length ? (v = t && [+t[0], +t[1]],
                        n) : v
                    }
                    ,
                    n.size = function(t) {
                        return arguments.length ? (_ = t && [+t[0], +t[1]],
                        n) : _
                    }
                    ,
                    n.duration = function(t) {
                        return arguments.length ? (S = +t,
                        n) : S
                    }
                    ,
                    n.x = function(t) {
                        return arguments.length ? (b = t,
                        x = t.copy(),
                        w = {
                            x: 0,
                            y: 0,
                            k: 1
                        },
                        n) : b
                    }
                    ,
                    n.y = function(t) {
                        return arguments.length ? (M = t,
                        k = t.copy(),
                        w = {
                            x: 0,
                            y: 0,
                            k: 1
                        },
                        n) : M
                    }
                    ,
                    Ki.rebind(n, O, "on")
                }
                ;
                var Oo, qo, Ro = [0, 1 / 0];
                Ki.color = un,
                un.prototype.toString = function() {
                    return this.rgb() + ""
                }
                ,
                Ki.hsl = ln;
                var jo = ln.prototype = new un;
                jo.brighter = function(n) {
                    return n = Math.pow(.7, arguments.length ? n : 1),
                    new ln(this.h,this.s,this.l / n)
                }
                ,
                jo.darker = function(n) {
                    return n = Math.pow(.7, arguments.length ? n : 1),
                    new ln(this.h,this.s,n * this.l)
                }
                ,
                jo.rgb = function() {
                    return sn(this.h, this.s, this.l)
                }
                ,
                Ki.hcl = cn;
                var Uo = cn.prototype = new un;
                Uo.brighter = function(n) {
                    return new cn(this.h,this.c,Math.min(100, this.l + Do * (arguments.length ? n : 1)))
                }
                ,
                Uo.darker = function(n) {
                    return new cn(this.h,this.c,Math.max(0, this.l - Do * (arguments.length ? n : 1)))
                }
                ,
                Uo.rgb = function() {
                    return fn(this.h, this.c, this.l).rgb()
                }
                ,
                Ki.lab = hn;
                var Do = 18
                  , Fo = .95047
                  , Io = 1
                  , Ho = 1.08883
                  , Bo = hn.prototype = new un;
                Bo.brighter = function(n) {
                    return new hn(Math.min(100, this.l + Do * (arguments.length ? n : 1)),this.a,this.b)
                }
                ,
                Bo.darker = function(n) {
                    return new hn(Math.max(0, this.l - Do * (arguments.length ? n : 1)),this.a,this.b)
                }
                ,
                Bo.rgb = function() {
                    return pn(this.l, this.a, this.b)
                }
                ,
                Ki.rgb = yn;
                var Vo = yn.prototype = new un;
                Vo.brighter = function(n) {
                    n = Math.pow(.7, arguments.length ? n : 1);
                    var t = this.r
                      , e = this.g
                      , r = this.b
                      , i = 30;
                    return t || e || r ? (t && i > t && (t = i),
                    e && i > e && (e = i),
                    r && i > r && (r = i),
                    new yn(Math.min(255, t / n),Math.min(255, e / n),Math.min(255, r / n))) : new yn(i,i,i)
                }
                ,
                Vo.darker = function(n) {
                    return new yn((n = Math.pow(.7, arguments.length ? n : 1)) * this.r,n * this.g,n * this.b)
                }
                ,
                Vo.hsl = function() {
                    return wn(this.r, this.g, this.b)
                }
                ,
                Vo.toString = function() {
                    return "#" + kn(this.r) + kn(this.g) + kn(this.b)
                }
                ;
                var Yo = Ki.map({
                    aliceblue: 15792383,
                    antiquewhite: 16444375,
                    aqua: 65535,
                    aquamarine: 8388564,
                    azure: 15794175,
                    beige: 16119260,
                    bisque: 16770244,
                    black: 0,
                    blanchedalmond: 16772045,
                    blue: 255,
                    blueviolet: 9055202,
                    brown: 10824234,
                    burlywood: 14596231,
                    cadetblue: 6266528,
                    chartreuse: 8388352,
                    chocolate: 13789470,
                    coral: 16744272,
                    cornflowerblue: 6591981,
                    cornsilk: 16775388,
                    crimson: 14423100,
                    cyan: 65535,
                    darkblue: 139,
                    darkcyan: 35723,
                    darkgoldenrod: 12092939,
                    darkgray: 11119017,
                    darkgreen: 25600,
                    darkgrey: 11119017,
                    darkkhaki: 12433259,
                    darkmagenta: 9109643,
                    darkolivegreen: 5597999,
                    darkorange: 16747520,
                    darkorchid: 10040012,
                    darkred: 9109504,
                    darksalmon: 15308410,
                    darkseagreen: 9419919,
                    darkslateblue: 4734347,
                    darkslategray: 3100495,
                    darkslategrey: 3100495,
                    darkturquoise: 52945,
                    darkviolet: 9699539,
                    deeppink: 16716947,
                    deepskyblue: 49151,
                    dimgray: 6908265,
                    dimgrey: 6908265,
                    dodgerblue: 2003199,
                    firebrick: 11674146,
                    floralwhite: 16775920,
                    forestgreen: 2263842,
                    fuchsia: 16711935,
                    gainsboro: 14474460,
                    ghostwhite: 16316671,
                    gold: 16766720,
                    goldenrod: 14329120,
                    gray: 8421504,
                    green: 32768,
                    greenyellow: 11403055,
                    grey: 8421504,
                    honeydew: 15794160,
                    hotpink: 16738740,
                    indianred: 13458524,
                    indigo: 4915330,
                    ivory: 16777200,
                    khaki: 15787660,
                    lavender: 15132410,
                    lavenderblush: 16773365,
                    lawngreen: 8190976,
                    lemonchiffon: 16775885,
                    lightblue: 11393254,
                    lightcoral: 15761536,
                    lightcyan: 14745599,
                    lightgoldenrodyellow: 16448210,
                    lightgray: 13882323,
                    lightgreen: 9498256,
                    lightgrey: 13882323,
                    lightpink: 16758465,
                    lightsalmon: 16752762,
                    lightseagreen: 2142890,
                    lightskyblue: 8900346,
                    lightslategray: 7833753,
                    lightslategrey: 7833753,
                    lightsteelblue: 11584734,
                    lightyellow: 16777184,
                    lime: 65280,
                    limegreen: 3329330,
                    linen: 16445670,
                    magenta: 16711935,
                    maroon: 8388608,
                    mediumaquamarine: 6737322,
                    mediumblue: 205,
                    mediumorchid: 12211667,
                    mediumpurple: 9662683,
                    mediumseagreen: 3978097,
                    mediumslateblue: 8087790,
                    mediumspringgreen: 64154,
                    mediumturquoise: 4772300,
                    mediumvioletred: 13047173,
                    midnightblue: 1644912,
                    mintcream: 16121850,
                    mistyrose: 16770273,
                    moccasin: 16770229,
                    navajowhite: 16768685,
                    navy: 128,
                    oldlace: 16643558,
                    olive: 8421376,
                    olivedrab: 7048739,
                    orange: 16753920,
                    orangered: 16729344,
                    orchid: 14315734,
                    palegoldenrod: 15657130,
                    palegreen: 10025880,
                    paleturquoise: 11529966,
                    palevioletred: 14381203,
                    papayawhip: 16773077,
                    peachpuff: 16767673,
                    peru: 13468991,
                    pink: 16761035,
                    plum: 14524637,
                    powderblue: 11591910,
                    purple: 8388736,
                    rebeccapurple: 6697881,
                    red: 16711680,
                    rosybrown: 12357519,
                    royalblue: 4286945,
                    saddlebrown: 9127187,
                    salmon: 16416882,
                    sandybrown: 16032864,
                    seagreen: 3050327,
                    seashell: 16774638,
                    sienna: 10506797,
                    silver: 12632256,
                    skyblue: 8900331,
                    slateblue: 6970061,
                    slategray: 7372944,
                    slategrey: 7372944,
                    snow: 16775930,
                    springgreen: 65407,
                    steelblue: 4620980,
                    tan: 13808780,
                    teal: 32896,
                    thistle: 14204888,
                    tomato: 16737095,
                    turquoise: 4251856,
                    violet: 15631086,
                    wheat: 16113331,
                    white: 16777215,
                    whitesmoke: 16119285,
                    yellow: 16776960,
                    yellowgreen: 10145074
                });
                Yo.forEach(function(n, t) {
                    Yo.set(n, xn(t))
                }),
                Ki.functor = An,
                Ki.xhr = Ln(M),
                Ki.dsv = function(n, t) {
                    function e(n, e, o) {
                        arguments.length < 3 && (o = e,
                        e = null);
                        var a = En(n, t, null == e ? r : i(e), o);
                        return a.row = function(n) {
                            return arguments.length ? a.response(null == (e = n) ? r : i(n)) : e
                        }
                        ,
                        a
                    }
                    function r(n) {
                        return e.parse(n.responseText)
                    }
                    function i(n) {
                        return function(t) {
                            return e.parse(t.responseText, n)
                        }
                    }
                    function o(t) {
                        return t.map(a).join(n)
                    }
                    function a(n) {
                        return u.test(n) ? '"' + n.replace(/\"/g, '""') + '"' : n
                    }
                    var u = new RegExp('["' + n + "\n]")
                      , l = n.charCodeAt(0);
                    return e.parse = function(n, t) {
                        var r;
                        return e.parseRows(n, function(n, e) {
                            if (r)
                                return r(n, e - 1);
                            var i = new Function("d","return {" + n.map(function(n, t) {
                                return JSON.stringify(n) + ": d[" + t + "]"
                            }).join(",") + "}");
                            r = t ? function(n, e) {
                                return t(i(n), e)
                            }
                            : i
                        })
                    }
                    ,
                    e.parseRows = function(n, t) {
                        function e() {
                            if (c >= s)
                                return a;
                            if (i)
                                return i = !1,
                                o;
                            var t = c;
                            if (34 === n.charCodeAt(t)) {
                                for (var e = t; e++ < s; )
                                    if (34 === n.charCodeAt(e)) {
                                        if (34 !== n.charCodeAt(e + 1))
                                            break;
                                        ++e
                                    }
                                return c = e + 2,
                                13 === (r = n.charCodeAt(e + 1)) ? (i = !0,
                                10 === n.charCodeAt(e + 2) && ++c) : 10 === r && (i = !0),
                                n.slice(t + 1, e).replace(/""/g, '"')
                            }
                            for (; s > c; ) {
                                var r, u = 1;
                                if (10 === (r = n.charCodeAt(c++)))
                                    i = !0;
                                else if (13 === r)
                                    i = !0,
                                    10 === n.charCodeAt(c) && (++c,
                                    ++u);
                                else if (r !== l)
                                    continue;
                                return n.slice(t, c - u)
                            }
                            return n.slice(t)
                        }
                        for (var r, i, o = {}, a = {}, u = [], s = n.length, c = 0, f = 0; (r = e()) !== a; ) {
                            for (var h = []; r !== o && r !== a; )
                                h.push(r),
                                r = e();
                            t && null == (h = t(h, f++)) || u.push(h)
                        }
                        return u
                    }
                    ,
                    e.format = function(t) {
                        if (Array.isArray(t[0]))
                            return e.formatRows(t);
                        var r = new k
                          , i = [];
                        return t.forEach(function(n) {
                            for (var t in n)
                                r.has(t) || i.push(r.add(t))
                        }),
                        [i.map(a).join(n)].concat(t.map(function(t) {
                            return i.map(function(n) {
                                return a(t[n])
                            }).join(n)
                        })).join("\n")
                    }
                    ,
                    e.formatRows = function(n) {
                        return n.map(o).join("\n")
                    }
                    ,
                    e
                }
                ,
                Ki.csv = Ki.dsv(",", "text/csv"),
                Ki.tsv = Ki.dsv("\t", "text/tab-separated-values");
                var Xo, Wo, Jo, Go, Zo = this[_(this, "requestAnimationFrame")] || function(n) {
                    setTimeout(n, 17)
                }
                ;
                Ki.timer = function() {
                    Tn.apply(this, arguments)
                }
                ,
                Ki.timer.flush = function() {
                    zn(),
                    Pn()
                }
                ,
                Ki.round = function(n, t) {
                    return t ? Math.round(n * (t = Math.pow(10, t))) / t : Math.round(n)
                }
                ;
                var $o = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"].map(function(n, t) {
                    var e = Math.pow(10, 3 * lo(8 - t));
                    return {
                        scale: t > 8 ? function(n) {
                            return n / e
                        }
                        : function(n) {
                            return n * e
                        }
                        ,
                        symbol: n
                    }
                });
                Ki.formatPrefix = function(n, t) {
                    var e = 0;
                    return (n = +n) && (0 > n && (n *= -1),
                    t && (n = Ki.round(n, On(n, t))),
                    e = 1 + Math.floor(1e-12 + Math.log(n) / Math.LN10),
                    e = Math.max(-24, Math.min(24, 3 * Math.floor((e - 1) / 3)))),
                    $o[8 + e / 3]
                }
                ;
                var Ko = /(?:([^{])?([<>=^]))?([+\- ])?([$#])?(0)?(\d+)?(,)?(\.-?\d+)?([a-z%])?/i
                  , Qo = Ki.map({
                    b: function(n) {
                        return n.toString(2)
                    },
                    c: function(n) {
                        return String.fromCharCode(n)
                    },
                    o: function(n) {
                        return n.toString(8)
                    },
                    x: function(n) {
                        return n.toString(16)
                    },
                    X: function(n) {
                        return n.toString(16).toUpperCase()
                    },
                    g: function(n, t) {
                        return n.toPrecision(t)
                    },
                    e: function(n, t) {
                        return n.toExponential(t)
                    },
                    f: function(n, t) {
                        return n.toFixed(t)
                    },
                    r: function(n, t) {
                        return (n = Ki.round(n, On(n, t))).toFixed(Math.max(0, Math.min(20, On(n * (1 + 1e-15), t))))
                    }
                })
                  , na = Ki.time = {}
                  , ta = Date;
                Rn.prototype = {
                    getDate: function() {
                        return this._.getUTCDate()
                    },
                    getDay: function() {
                        return this._.getUTCDay()
                    },
                    getFullYear: function() {
                        return this._.getUTCFullYear()
                    },
                    getHours: function() {
                        return this._.getUTCHours()
                    },
                    getMilliseconds: function() {
                        return this._.getUTCMilliseconds()
                    },
                    getMinutes: function() {
                        return this._.getUTCMinutes()
                    },
                    getMonth: function() {
                        return this._.getUTCMonth()
                    },
                    getSeconds: function() {
                        return this._.getUTCSeconds()
                    },
                    getTime: function() {
                        return this._.getTime()
                    },
                    getTimezoneOffset: function() {
                        return 0
                    },
                    valueOf: function() {
                        return this._.valueOf()
                    },
                    setDate: function() {
                        ea.setUTCDate.apply(this._, arguments)
                    },
                    setDay: function() {
                        ea.setUTCDay.apply(this._, arguments)
                    },
                    setFullYear: function() {
                        ea.setUTCFullYear.apply(this._, arguments)
                    },
                    setHours: function() {
                        ea.setUTCHours.apply(this._, arguments)
                    },
                    setMilliseconds: function() {
                        ea.setUTCMilliseconds.apply(this._, arguments)
                    },
                    setMinutes: function() {
                        ea.setUTCMinutes.apply(this._, arguments)
                    },
                    setMonth: function() {
                        ea.setUTCMonth.apply(this._, arguments)
                    },
                    setSeconds: function() {
                        ea.setUTCSeconds.apply(this._, arguments)
                    },
                    setTime: function() {
                        ea.setTime.apply(this._, arguments)
                    }
                };
                var ea = Date.prototype;
                na.year = jn(function(n) {
                    return (n = na.day(n)).setMonth(0, 1),
                    n
                }, function(n, t) {
                    n.setFullYear(n.getFullYear() + t)
                }, function(n) {
                    return n.getFullYear()
                }),
                na.years = na.year.range,
                na.years.utc = na.year.utc.range,
                na.day = jn(function(n) {
                    var t = new ta(2e3,0);
                    return t.setFullYear(n.getFullYear(), n.getMonth(), n.getDate()),
                    t
                }, function(n, t) {
                    n.setDate(n.getDate() + t)
                }, function(n) {
                    return n.getDate() - 1
                }),
                na.days = na.day.range,
                na.days.utc = na.day.utc.range,
                na.dayOfYear = function(n) {
                    var t = na.year(n);
                    return Math.floor((n - t - 6e4 * (n.getTimezoneOffset() - t.getTimezoneOffset())) / 864e5)
                }
                ,
                ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"].forEach(function(n, t) {
                    t = 7 - t;
                    var e = na[n] = jn(function(n) {
                        return (n = na.day(n)).setDate(n.getDate() - (n.getDay() + t) % 7),
                        n
                    }, function(n, t) {
                        n.setDate(n.getDate() + 7 * Math.floor(t))
                    }, function(n) {
                        var e = na.year(n).getDay();
                        return Math.floor((na.dayOfYear(n) + (e + t) % 7) / 7) - (e !== t)
                    });
                    na[n + "s"] = e.range,
                    na[n + "s"].utc = e.utc.range,
                    na[n + "OfYear"] = function(n) {
                        var e = na.year(n).getDay();
                        return Math.floor((na.dayOfYear(n) + (e + t) % 7) / 7)
                    }
                }),
                na.week = na.sunday,
                na.weeks = na.sunday.range,
                na.weeks.utc = na.sunday.utc.range,
                na.weekOfYear = na.sundayOfYear;
                var ra = {
                    "-": "",
                    _: " ",
                    0: "0"
                }
                  , ia = /^\s*\d+/
                  , oa = /^%/;
                Ki.locale = function(n) {
                    return {
                        numberFormat: function(n) {
                            var t = n.decimal
                              , e = n.thousands
                              , r = n.grouping
                              , i = n.currency
                              , o = r && e ? function(n, t) {
                                for (var i = n.length, o = [], a = 0, u = r[0], l = 0; i > 0 && u > 0 && (l + u + 1 > t && (u = Math.max(1, t - l)),
                                o.push(n.substring(i -= u, i + u)),
                                !((l += u + 1) > t)); )
                                    u = r[a = (a + 1) % r.length];
                                return o.reverse().join(e)
                            }
                            : M;
                            return function(n) {
                                var e = Ko.exec(n)
                                  , r = e[1] || " "
                                  , a = e[2] || ">"
                                  , u = e[3] || "-"
                                  , l = e[4] || ""
                                  , s = e[5]
                                  , c = +e[6]
                                  , f = e[7]
                                  , h = e[8]
                                  , p = e[9]
                                  , d = 1
                                  , g = ""
                                  , v = ""
                                  , m = !1
                                  , y = !0;
                                switch (h && (h = +h.substring(1)),
                                (s || "0" === r && "=" === a) && (s = r = "0",
                                a = "="),
                                p) {
                                case "n":
                                    f = !0,
                                    p = "g";
                                    break;
                                case "%":
                                    d = 100,
                                    v = "%",
                                    p = "f";
                                    break;
                                case "p":
                                    d = 100,
                                    v = "%",
                                    p = "r";
                                    break;
                                case "b":
                                case "o":
                                case "x":
                                case "X":
                                    "#" === l && (g = "0" + p.toLowerCase());
                                case "c":
                                    y = !1;
                                case "d":
                                    m = !0,
                                    h = 0;
                                    break;
                                case "s":
                                    d = -1,
                                    p = "r"
                                }
                                "$" === l && (g = i[0],
                                v = i[1]),
                                "r" != p || h || (p = "g"),
                                null != h && ("g" == p ? h = Math.max(1, Math.min(21, h)) : ("e" == p || "f" == p) && (h = Math.max(0, Math.min(20, h)))),
                                p = Qo.get(p) || qn;
                                var x = s && f;
                                return function(n) {
                                    var e = v;
                                    if (m && n % 1)
                                        return "";
                                    var i = 0 > n || 0 === n && 0 > 1 / n ? (n = -n,
                                    "-") : "-" === u ? "" : u;
                                    if (0 > d) {
                                        var l = Ki.formatPrefix(n, h);
                                        n = l.scale(n),
                                        e = l.symbol + v
                                    } else
                                        n *= d;
                                    var b, k, M = (n = p(n, h)).lastIndexOf(".");
                                    if (0 > M) {
                                        var w = y ? n.lastIndexOf("e") : -1;
                                        0 > w ? (b = n,
                                        k = "") : (b = n.substring(0, w),
                                        k = n.substring(w))
                                    } else
                                        b = n.substring(0, M),
                                        k = t + n.substring(M + 1);
                                    !s && f && (b = o(b, 1 / 0));
                                    var _ = g.length + b.length + k.length + (x ? 0 : i.length)
                                      , N = c > _ ? new Array(_ = c - _ + 1).join(r) : "";
                                    return x && (b = o(N + b, N.length ? c - k.length : 1 / 0)),
                                    i += g,
                                    n = b + k,
                                    ("<" === a ? i + n + N : ">" === a ? N + i + n : "^" === a ? N.substring(0, _ >>= 1) + i + n + N.substring(_) : i + (x ? n : N + n)) + e
                                }
                            }
                        }(n),
                        timeFormat: function(n) {
                            function t(n) {
                                function t(t) {
                                    for (var e, i, o, a = [], u = -1, l = 0; ++u < r; )
                                        37 === n.charCodeAt(u) && (a.push(n.slice(l, u)),
                                        null != (i = ra[e = n.charAt(++u)]) && (e = n.charAt(++u)),
                                        (o = b[e]) && (e = o(t, null == i ? "e" === e ? " " : "0" : i)),
                                        a.push(e),
                                        l = u + 1);
                                    return a.push(n.slice(l, u)),
                                    a.join("")
                                }
                                var r = n.length;
                                return t.parse = function(t) {
                                    var r = {
                                        y: 1900,
                                        m: 0,
                                        d: 1,
                                        H: 0,
                                        M: 0,
                                        S: 0,
                                        L: 0,
                                        Z: null
                                    };
                                    if (e(r, n, t, 0) != t.length)
                                        return null;
                                    "p"in r && (r.H = r.H % 12 + 12 * r.p);
                                    var i = null != r.Z && ta !== Rn
                                      , o = new (i ? Rn : ta);
                                    return "j"in r ? o.setFullYear(r.y, 0, r.j) : "W"in r || "U"in r ? ("w"in r || (r.w = "W"in r ? 1 : 0),
                                    o.setFullYear(r.y, 0, 1),
                                    o.setFullYear(r.y, 0, "W"in r ? (r.w + 6) % 7 + 7 * r.W - (o.getDay() + 5) % 7 : r.w + 7 * r.U - (o.getDay() + 6) % 7)) : o.setFullYear(r.y, r.m, r.d),
                                    o.setHours(r.H + (r.Z / 100 | 0), r.M + r.Z % 100, r.S, r.L),
                                    i ? o._ : o
                                }
                                ,
                                t.toString = function() {
                                    return n
                                }
                                ,
                                t
                            }
                            function e(n, t, e, r) {
                                for (var i, o, a, u = 0, l = t.length, s = e.length; l > u; ) {
                                    if (r >= s)
                                        return -1;
                                    if (37 === (i = t.charCodeAt(u++))) {
                                        if (a = t.charAt(u++),
                                        !(o = k[a in ra ? t.charAt(u++) : a]) || (r = o(n, e, r)) < 0)
                                            return -1
                                    } else if (i != e.charCodeAt(r++))
                                        return -1
                                }
                                return r
                            }
                            var r = n.dateTime
                              , i = n.date
                              , o = n.time
                              , a = n.periods
                              , u = n.days
                              , l = n.shortDays
                              , s = n.months
                              , c = n.shortMonths;
                            t.utc = function(n) {
                                function e(n) {
                                    try {
                                        var t = new (ta = Rn);
                                        return t._ = n,
                                        r(t)
                                    } finally {
                                        ta = Date
                                    }
                                }
                                var r = t(n);
                                return e.parse = function(n) {
                                    try {
                                        ta = Rn;
                                        var t = r.parse(n);
                                        return t && t._
                                    } finally {
                                        ta = Date
                                    }
                                }
                                ,
                                e.toString = r.toString,
                                e
                            }
                            ,
                            t.multi = t.utc.multi = rt;
                            var f = Ki.map()
                              , h = Fn(u)
                              , p = In(u)
                              , d = Fn(l)
                              , g = In(l)
                              , v = Fn(s)
                              , m = In(s)
                              , y = Fn(c)
                              , x = In(c);
                            a.forEach(function(n, t) {
                                f.set(n.toLowerCase(), t)
                            });
                            var b = {
                                a: function(n) {
                                    return l[n.getDay()]
                                },
                                A: function(n) {
                                    return u[n.getDay()]
                                },
                                b: function(n) {
                                    return c[n.getMonth()]
                                },
                                B: function(n) {
                                    return s[n.getMonth()]
                                },
                                c: t(r),
                                d: function(n, t) {
                                    return Dn(n.getDate(), t, 2)
                                },
                                e: function(n, t) {
                                    return Dn(n.getDate(), t, 2)
                                },
                                H: function(n, t) {
                                    return Dn(n.getHours(), t, 2)
                                },
                                I: function(n, t) {
                                    return Dn(n.getHours() % 12 || 12, t, 2)
                                },
                                j: function(n, t) {
                                    return Dn(1 + na.dayOfYear(n), t, 3)
                                },
                                L: function(n, t) {
                                    return Dn(n.getMilliseconds(), t, 3)
                                },
                                m: function(n, t) {
                                    return Dn(n.getMonth() + 1, t, 2)
                                },
                                M: function(n, t) {
                                    return Dn(n.getMinutes(), t, 2)
                                },
                                p: function(n) {
                                    return a[+(n.getHours() >= 12)]
                                },
                                S: function(n, t) {
                                    return Dn(n.getSeconds(), t, 2)
                                },
                                U: function(n, t) {
                                    return Dn(na.sundayOfYear(n), t, 2)
                                },
                                w: function(n) {
                                    return n.getDay()
                                },
                                W: function(n, t) {
                                    return Dn(na.mondayOfYear(n), t, 2)
                                },
                                x: t(i),
                                X: t(o),
                                y: function(n, t) {
                                    return Dn(n.getFullYear() % 100, t, 2)
                                },
                                Y: function(n, t) {
                                    return Dn(n.getFullYear() % 1e4, t, 4)
                                },
                                Z: tt,
                                "%": function() {
                                    return "%"
                                }
                            }
                              , k = {
                                a: function(n, t, e) {
                                    d.lastIndex = 0;
                                    var r = d.exec(t.slice(e));
                                    return r ? (n.w = g.get(r[0].toLowerCase()),
                                    e + r[0].length) : -1
                                },
                                A: function(n, t, e) {
                                    h.lastIndex = 0;
                                    var r = h.exec(t.slice(e));
                                    return r ? (n.w = p.get(r[0].toLowerCase()),
                                    e + r[0].length) : -1
                                },
                                b: function(n, t, e) {
                                    y.lastIndex = 0;
                                    var r = y.exec(t.slice(e));
                                    return r ? (n.m = x.get(r[0].toLowerCase()),
                                    e + r[0].length) : -1
                                },
                                B: function(n, t, e) {
                                    v.lastIndex = 0;
                                    var r = v.exec(t.slice(e));
                                    return r ? (n.m = m.get(r[0].toLowerCase()),
                                    e + r[0].length) : -1
                                },
                                c: function(n, t, r) {
                                    return e(n, b.c.toString(), t, r)
                                },
                                d: Gn,
                                e: Gn,
                                H: $n,
                                I: $n,
                                j: Zn,
                                L: nt,
                                m: Jn,
                                M: Kn,
                                p: function(n, t, e) {
                                    var r = f.get(t.slice(e, e += 2).toLowerCase());
                                    return null == r ? -1 : (n.p = r,
                                    e)
                                },
                                S: Qn,
                                U: Bn,
                                w: Hn,
                                W: Vn,
                                x: function(n, t, r) {
                                    return e(n, b.x.toString(), t, r)
                                },
                                X: function(n, t, r) {
                                    return e(n, b.X.toString(), t, r)
                                },
                                y: Xn,
                                Y: Yn,
                                Z: Wn,
                                "%": et
                            };
                            return t
                        }(n)
                    }
                }
                ;
                var aa = Ki.locale({
                    decimal: ".",
                    thousands: ",",
                    grouping: [3],
                    currency: ["$", ""],
                    dateTime: "%a %b %e %X %Y",
                    date: "%m/%d/%Y",
                    time: "%H:%M:%S",
                    periods: ["AM", "PM"],
                    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
                });
                Ki.format = aa.numberFormat,
                Ki.geo = {},
                it.prototype = {
                    s: 0,
                    t: 0,
                    add: function(n) {
                        ot(n, this.t, ua),
                        ot(ua.s, this.s, this),
                        this.s ? this.t += ua.t : this.s = ua.t
                    },
                    reset: function() {
                        this.s = this.t = 0
                    },
                    valueOf: function() {
                        return this.s
                    }
                };
                var ua = new it;
                Ki.geo.stream = function(n, t) {
                    n && la.hasOwnProperty(n.type) ? la[n.type](n, t) : at(n, t)
                }
                ;
                var la = {
                    Feature: function(n, t) {
                        at(n.geometry, t)
                    },
                    FeatureCollection: function(n, t) {
                        for (var e = n.features, r = -1, i = e.length; ++r < i; )
                            at(e[r].geometry, t)
                    }
                }
                  , sa = {
                    Sphere: function(n, t) {
                        t.sphere()
                    },
                    Point: function(n, t) {
                        n = n.coordinates,
                        t.point(n[0], n[1], n[2])
                    },
                    MultiPoint: function(n, t) {
                        for (var e = n.coordinates, r = -1, i = e.length; ++r < i; )
                            n = e[r],
                            t.point(n[0], n[1], n[2])
                    },
                    LineString: function(n, t) {
                        ut(n.coordinates, t, 0)
                    },
                    MultiLineString: function(n, t) {
                        for (var e = n.coordinates, r = -1, i = e.length; ++r < i; )
                            ut(e[r], t, 0)
                    },
                    Polygon: function(n, t) {
                        lt(n.coordinates, t)
                    },
                    MultiPolygon: function(n, t) {
                        for (var e = n.coordinates, r = -1, i = e.length; ++r < i; )
                            lt(e[r], t)
                    },
                    GeometryCollection: function(n, t) {
                        for (var e = n.geometries, r = -1, i = e.length; ++r < i; )
                            at(e[r], t)
                    }
                };
                Ki.geo.area = function(n) {
                    return ca = 0,
                    Ki.geo.stream(n, ha),
                    ca
                }
                ;
                var ca, fa = new it, ha = {
                    sphere: function() {
                        ca += 4 * Ao
                    },
                    point: N,
                    lineStart: N,
                    lineEnd: N,
                    polygonStart: function() {
                        fa.reset(),
                        ha.lineStart = st
                    },
                    polygonEnd: function() {
                        var n = 2 * fa;
                        ca += 0 > n ? 4 * Ao + n : n,
                        ha.lineStart = ha.lineEnd = ha.point = N
                    }
                };
                Ki.geo.bounds = function() {
                    function n(n, t) {
                        x.push(b = [c = n, h = n]),
                        f > t && (f = t),
                        t > p && (p = t)
                    }
                    function t(t, e) {
                        var r = ct([t * Co, e * Co]);
                        if (m) {
                            var i = ht(m, r)
                              , o = ht([i[1], -i[0], 0], i);
                            gt(o),
                            o = vt(o);
                            var a = t - d
                              , l = a > 0 ? 1 : -1
                              , s = o[0] * zo * l
                              , g = lo(a) > 180;
                            if (g ^ (s > l * d && l * t > s))
                                (v = o[1] * zo) > p && (p = v);
                            else if (g ^ ((s = (s + 360) % 360 - 180) > l * d && l * t > s)) {
                                var v = -o[1] * zo;
                                f > v && (f = v)
                            } else
                                f > e && (f = e),
                                e > p && (p = e);
                            g ? d > t ? u(c, t) > u(c, h) && (h = t) : u(t, h) > u(c, h) && (c = t) : h >= c ? (c > t && (c = t),
                            t > h && (h = t)) : t > d ? u(c, t) > u(c, h) && (h = t) : u(t, h) > u(c, h) && (c = t)
                        } else
                            n(t, e);
                        m = r,
                        d = t
                    }
                    function e() {
                        k.point = t
                    }
                    function r() {
                        b[0] = c,
                        b[1] = h,
                        k.point = n,
                        m = null
                    }
                    function i(n, e) {
                        if (m) {
                            var r = n - d;
                            y += lo(r) > 180 ? r + (r > 0 ? 360 : -360) : r
                        } else
                            g = n,
                            v = e;
                        ha.point(n, e),
                        t(n, e)
                    }
                    function o() {
                        ha.lineStart()
                    }
                    function a() {
                        i(g, v),
                        ha.lineEnd(),
                        lo(y) > No && (c = -(h = 180)),
                        b[0] = c,
                        b[1] = h,
                        m = null
                    }
                    function u(n, t) {
                        return (t -= n) < 0 ? t + 360 : t
                    }
                    function l(n, t) {
                        return n[0] - t[0]
                    }
                    function s(n, t) {
                        return t[0] <= t[1] ? t[0] <= n && n <= t[1] : n < t[0] || t[1] < n
                    }
                    var c, f, h, p, d, g, v, m, y, x, b, k = {
                        point: n,
                        lineStart: e,
                        lineEnd: r,
                        polygonStart: function() {
                            k.point = i,
                            k.lineStart = o,
                            k.lineEnd = a,
                            y = 0,
                            ha.polygonStart()
                        },
                        polygonEnd: function() {
                            ha.polygonEnd(),
                            k.point = n,
                            k.lineStart = e,
                            k.lineEnd = r,
                            0 > fa ? (c = -(h = 180),
                            f = -(p = 90)) : y > No ? p = 90 : -No > y && (f = -90),
                            b[0] = c,
                            b[1] = h
                        }
                    };
                    return function(n) {
                        if (p = h = -(c = f = 1 / 0),
                        x = [],
                        Ki.geo.stream(n, k),
                        o = x.length) {
                            x.sort(l);
                            for (var t = 1, e = [d = x[0]]; o > t; ++t)
                                s((i = x[t])[0], d) || s(i[1], d) ? (u(d[0], i[1]) > u(d[0], d[1]) && (d[1] = i[1]),
                                u(i[0], d[1]) > u(d[0], d[1]) && (d[0] = i[0])) : e.push(d = i);
                            for (var r, i, o, a = -1 / 0, d = (t = 0,
                            e[o = e.length - 1]); o >= t; d = i,
                            ++t)
                                i = e[t],
                                (r = u(d[1], i[0])) > a && (a = r,
                                c = i[0],
                                h = d[1])
                        }
                        return x = b = null,
                        c === 1 / 0 || f === 1 / 0 ? [[NaN, NaN], [NaN, NaN]] : [[c, f], [h, p]]
                    }
                }(),
                Ki.geo.centroid = function(n) {
                    pa = da = ga = va = ma = ya = xa = ba = ka = Ma = wa = 0,
                    Ki.geo.stream(n, _a);
                    var t = ka
                      , e = Ma
                      , r = wa
                      , i = t * t + e * e + r * r;
                    return So > i && (t = ya,
                    e = xa,
                    r = ba,
                    No > da && (t = ga,
                    e = va,
                    r = ma),
                    So > (i = t * t + e * e + r * r)) ? [NaN, NaN] : [Math.atan2(e, t) * zo, rn(r / Math.sqrt(i)) * zo]
                }
                ;
                var pa, da, ga, va, ma, ya, xa, ba, ka, Ma, wa, _a = {
                    sphere: N,
                    point: yt,
                    lineStart: bt,
                    lineEnd: kt,
                    polygonStart: function() {
                        _a.lineStart = Mt
                    },
                    polygonEnd: function() {
                        _a.lineStart = bt
                    }
                }, Na = Lt(_t, function(n) {
                    var t, e = NaN, r = NaN, i = NaN;
                    return {
                        lineStart: function() {
                            n.lineStart(),
                            t = 1
                        },
                        point: function(o, a) {
                            var u = o > 0 ? Ao : -Ao
                              , l = lo(o - e);
                            lo(l - Ao) < No ? (n.point(e, r = (r + a) / 2 > 0 ? To : -To),
                            n.point(i, r),
                            n.lineEnd(),
                            n.lineStart(),
                            n.point(u, r),
                            n.point(o, r),
                            t = 0) : i !== u && l >= Ao && (lo(e - i) < No && (e -= i * No),
                            lo(o - u) < No && (o -= u * No),
                            r = function(n, t, e, r) {
                                var i, o, a = Math.sin(n - e);
                                return lo(a) > No ? Math.atan((Math.sin(t) * (o = Math.cos(r)) * Math.sin(e) - Math.sin(r) * (i = Math.cos(t)) * Math.sin(n)) / (i * o * a)) : (t + r) / 2
                            }(e, r, o, a),
                            n.point(i, r),
                            n.lineEnd(),
                            n.lineStart(),
                            n.point(u, r),
                            t = 0),
                            n.point(e = o, r = a),
                            i = u
                        },
                        lineEnd: function() {
                            n.lineEnd(),
                            e = r = NaN
                        },
                        clean: function() {
                            return 2 - t
                        }
                    }
                }, function(n, t, e, r) {
                    var i;
                    if (null == n)
                        i = e * To,
                        r.point(-Ao, i),
                        r.point(0, i),
                        r.point(Ao, i),
                        r.point(Ao, 0),
                        r.point(Ao, -i),
                        r.point(0, -i),
                        r.point(-Ao, -i),
                        r.point(-Ao, 0),
                        r.point(-Ao, i);
                    else if (lo(n[0] - t[0]) > No) {
                        var o = n[0] < t[0] ? Ao : -Ao;
                        i = e * o / 2,
                        r.point(-o, i),
                        r.point(0, i),
                        r.point(o, i)
                    } else
                        r.point(t[0], t[1])
                }, [-Ao, -Ao / 2]), Sa = 1e9;
                Ki.geo.clipExtent = function() {
                    var n, t, e, r, i, o, a = {
                        stream: function(n) {
                            return i && (i.valid = !1),
                            (i = o(n)).valid = !0,
                            i
                        },
                        extent: function(u) {
                            return arguments.length ? (o = Pt(n = +u[0][0], t = +u[0][1], e = +u[1][0], r = +u[1][1]),
                            i && (i.valid = !1,
                            i = null),
                            a) : [[n, t], [e, r]]
                        }
                    };
                    return a.extent([[0, 0], [960, 500]])
                }
                ,
                (Ki.geo.conicEqualArea = function() {
                    return Ot(qt)
                }
                ).raw = qt,
                Ki.geo.albers = function() {
                    return Ki.geo.conicEqualArea().rotate([96, 0]).center([-.6, 38.7]).parallels([29.5, 45.5]).scale(1070)
                }
                ,
                Ki.geo.albersUsa = function() {
                    function n(n) {
                        var o = n[0]
                          , a = n[1];
                        return t = null,
                        e(o, a),
                        t || (r(o, a),
                        t) || i(o, a),
                        t
                    }
                    var t, e, r, i, o = Ki.geo.albers(), a = Ki.geo.conicEqualArea().rotate([154, 0]).center([-2, 58.5]).parallels([55, 65]), u = Ki.geo.conicEqualArea().rotate([157, 0]).center([-3, 19.9]).parallels([8, 18]), l = {
                        point: function(n, e) {
                            t = [n, e]
                        }
                    };
                    return n.invert = function(n) {
                        var t = o.scale()
                          , e = o.translate()
                          , r = (n[0] - e[0]) / t
                          , i = (n[1] - e[1]) / t;
                        return (i >= .12 && .234 > i && r >= -.425 && -.214 > r ? a : i >= .166 && .234 > i && r >= -.214 && -.115 > r ? u : o).invert(n)
                    }
                    ,
                    n.stream = function(n) {
                        var t = o.stream(n)
                          , e = a.stream(n)
                          , r = u.stream(n);
                        return {
                            point: function(n, i) {
                                t.point(n, i),
                                e.point(n, i),
                                r.point(n, i)
                            },
                            sphere: function() {
                                t.sphere(),
                                e.sphere(),
                                r.sphere()
                            },
                            lineStart: function() {
                                t.lineStart(),
                                e.lineStart(),
                                r.lineStart()
                            },
                            lineEnd: function() {
                                t.lineEnd(),
                                e.lineEnd(),
                                r.lineEnd()
                            },
                            polygonStart: function() {
                                t.polygonStart(),
                                e.polygonStart(),
                                r.polygonStart()
                            },
                            polygonEnd: function() {
                                t.polygonEnd(),
                                e.polygonEnd(),
                                r.polygonEnd()
                            }
                        }
                    }
                    ,
                    n.precision = function(t) {
                        return arguments.length ? (o.precision(t),
                        a.precision(t),
                        u.precision(t),
                        n) : o.precision()
                    }
                    ,
                    n.scale = function(t) {
                        return arguments.length ? (o.scale(t),
                        a.scale(.35 * t),
                        u.scale(t),
                        n.translate(o.translate())) : o.scale()
                    }
                    ,
                    n.translate = function(t) {
                        if (!arguments.length)
                            return o.translate();
                        var s = o.scale()
                          , c = +t[0]
                          , f = +t[1];
                        return e = o.translate(t).clipExtent([[c - .455 * s, f - .238 * s], [c + .455 * s, f + .238 * s]]).stream(l).point,
                        r = a.translate([c - .307 * s, f + .201 * s]).clipExtent([[c - .425 * s + No, f + .12 * s + No], [c - .214 * s - No, f + .234 * s - No]]).stream(l).point,
                        i = u.translate([c - .205 * s, f + .212 * s]).clipExtent([[c - .214 * s + No, f + .166 * s + No], [c - .115 * s - No, f + .234 * s - No]]).stream(l).point,
                        n
                    }
                    ,
                    n.scale(1070)
                }
                ;
                var Aa, La, Ea, Ta, Ca, za, Pa = {
                    point: N,
                    lineStart: N,
                    lineEnd: N,
                    polygonStart: function() {
                        La = 0,
                        Pa.lineStart = Rt
                    },
                    polygonEnd: function() {
                        Pa.lineStart = Pa.lineEnd = Pa.point = N,
                        Aa += lo(La / 2)
                    }
                }, Oa = {
                    point: function(n, t) {
                        Ea > n && (Ea = n),
                        n > Ca && (Ca = n),
                        Ta > t && (Ta = t),
                        t > za && (za = t)
                    },
                    lineStart: N,
                    lineEnd: N,
                    polygonStart: N,
                    polygonEnd: N
                }, qa = {
                    point: Ut,
                    lineStart: Dt,
                    lineEnd: Ft,
                    polygonStart: function() {
                        qa.lineStart = It
                    },
                    polygonEnd: function() {
                        qa.point = Ut,
                        qa.lineStart = Dt,
                        qa.lineEnd = Ft
                    }
                };
                Ki.geo.path = function() {
                    function n(n) {
                        return n && ("function" == typeof u && o.pointRadius(+u.apply(this, arguments)),
                        a && a.valid || (a = i(o)),
                        Ki.geo.stream(n, a)),
                        o.result()
                    }
                    function t() {
                        return a = null,
                        n
                    }
                    var e, r, i, o, a, u = 4.5;
                    return n.area = function(n) {
                        return Aa = 0,
                        Ki.geo.stream(n, i(Pa)),
                        Aa
                    }
                    ,
                    n.centroid = function(n) {
                        return ga = va = ma = ya = xa = ba = ka = Ma = wa = 0,
                        Ki.geo.stream(n, i(qa)),
                        wa ? [ka / wa, Ma / wa] : ba ? [ya / ba, xa / ba] : ma ? [ga / ma, va / ma] : [NaN, NaN]
                    }
                    ,
                    n.bounds = function(n) {
                        return Ca = za = -(Ea = Ta = 1 / 0),
                        Ki.geo.stream(n, i(Oa)),
                        [[Ea, Ta], [Ca, za]]
                    }
                    ,
                    n.projection = function(n) {
                        return arguments.length ? (i = (e = n) ? n.stream || function(n) {
                            var t = Ht(function(t, e) {
                                return n([t * zo, e * zo])
                            });
                            return function(n) {
                                return Wt(t(n))
                            }
                        }(n) : M,
                        t()) : e
                    }
                    ,
                    n.context = function(n) {
                        return arguments.length ? (o = null == (r = n) ? new function() {
                            function n(n, t) {
                                a.push("M", n, ",", t, o)
                            }
                            function t(n, t) {
                                a.push("M", n, ",", t),
                                u.point = e
                            }
                            function e(n, t) {
                                a.push("L", n, ",", t)
                            }
                            function r() {
                                u.point = n
                            }
                            function i() {
                                a.push("Z")
                            }
                            var o = jt(4.5)
                              , a = []
                              , u = {
                                point: n,
                                lineStart: function() {
                                    u.point = t
                                },
                                lineEnd: r,
                                polygonStart: function() {
                                    u.lineEnd = i
                                },
                                polygonEnd: function() {
                                    u.lineEnd = r,
                                    u.point = n
                                },
                                pointRadius: function(n) {
                                    return o = jt(n),
                                    u
                                },
                                result: function() {
                                    if (a.length) {
                                        var n = a.join("");
                                        return a = [],
                                        n
                                    }
                                }
                            };
                            return u
                        }
                        : new function(n) {
                            function t(t, e) {
                                n.moveTo(t + a, e),
                                n.arc(t, e, a, 0, Lo)
                            }
                            function e(t, e) {
                                n.moveTo(t, e),
                                u.point = r
                            }
                            function r(t, e) {
                                n.lineTo(t, e)
                            }
                            function i() {
                                u.point = t
                            }
                            function o() {
                                n.closePath()
                            }
                            var a = 4.5
                              , u = {
                                point: t,
                                lineStart: function() {
                                    u.point = e
                                },
                                lineEnd: i,
                                polygonStart: function() {
                                    u.lineEnd = o
                                },
                                polygonEnd: function() {
                                    u.lineEnd = i,
                                    u.point = t
                                },
                                pointRadius: function(n) {
                                    return a = n,
                                    u
                                },
                                result: N
                            };
                            return u
                        }
                        (n),
                        "function" != typeof u && o.pointRadius(u),
                        t()) : r
                    }
                    ,
                    n.pointRadius = function(t) {
                        return arguments.length ? (u = "function" == typeof t ? t : (o.pointRadius(+t),
                        +t),
                        n) : u
                    }
                    ,
                    n.projection(Ki.geo.albersUsa()).context(null)
                }
                ,
                Ki.geo.transform = function(n) {
                    return {
                        stream: function(t) {
                            var e = new Bt(t);
                            for (var r in n)
                                e[r] = n[r];
                            return e
                        }
                    }
                }
                ,
                Bt.prototype = {
                    point: function(n, t) {
                        this.stream.point(n, t)
                    },
                    sphere: function() {
                        this.stream.sphere()
                    },
                    lineStart: function() {
                        this.stream.lineStart()
                    },
                    lineEnd: function() {
                        this.stream.lineEnd()
                    },
                    polygonStart: function() {
                        this.stream.polygonStart()
                    },
                    polygonEnd: function() {
                        this.stream.polygonEnd()
                    }
                },
                Ki.geo.projection = Yt,
                Ki.geo.projectionMutator = Xt,
                (Ki.geo.equirectangular = function() {
                    return Yt(Jt)
                }
                ).raw = Jt.invert = Jt,
                Ki.geo.rotation = function(n) {
                    function t(t) {
                        return (t = n(t[0] * Co, t[1] * Co))[0] *= zo,
                        t[1] *= zo,
                        t
                    }
                    return n = Zt(n[0] % 360 * Co, n[1] * Co, n.length > 2 ? n[2] * Co : 0),
                    t.invert = function(t) {
                        return (t = n.invert(t[0] * Co, t[1] * Co))[0] *= zo,
                        t[1] *= zo,
                        t
                    }
                    ,
                    t
                }
                ,
                Gt.invert = Jt,
                Ki.geo.circle = function() {
                    function n() {
                        var n = "function" == typeof r ? r.apply(this, arguments) : r
                          , t = Zt(-n[0] * Co, -n[1] * Co, 0).invert
                          , i = [];
                        return e(null, null, 1, {
                            point: function(n, e) {
                                i.push(n = t(n, e)),
                                n[0] *= zo,
                                n[1] *= zo
                            }
                        }),
                        {
                            type: "Polygon",
                            coordinates: [i]
                        }
                    }
                    var t, e, r = [0, 0], i = 6;
                    return n.origin = function(t) {
                        return arguments.length ? (r = t,
                        n) : r
                    }
                    ,
                    n.angle = function(r) {
                        return arguments.length ? (e = ne((t = +r) * Co, i * Co),
                        n) : t
                    }
                    ,
                    n.precision = function(r) {
                        return arguments.length ? (e = ne(t * Co, (i = +r) * Co),
                        n) : i
                    }
                    ,
                    n.angle(90)
                }
                ,
                Ki.geo.distance = function(n, t) {
                    var e, r = (t[0] - n[0]) * Co, i = n[1] * Co, o = t[1] * Co, a = Math.sin(r), u = Math.cos(r), l = Math.sin(i), s = Math.cos(i), c = Math.sin(o), f = Math.cos(o);
                    return Math.atan2(Math.sqrt((e = f * a) * e + (e = s * c - l * f * u) * e), l * c + s * f * u)
                }
                ,
                Ki.geo.graticule = function() {
                    function n() {
                        return {
                            type: "MultiLineString",
                            coordinates: t()
                        }
                    }
                    function t() {
                        return Ki.range(Math.ceil(o / v) * v, i, v).map(h).concat(Ki.range(Math.ceil(s / m) * m, l, m).map(p)).concat(Ki.range(Math.ceil(r / d) * d, e, d).filter(function(n) {
                            return lo(n % v) > No
                        }).map(c)).concat(Ki.range(Math.ceil(u / g) * g, a, g).filter(function(n) {
                            return lo(n % m) > No
                        }).map(f))
                    }
                    var e, r, i, o, a, u, l, s, c, f, h, p, d = 10, g = d, v = 90, m = 360, y = 2.5;
                    return n.lines = function() {
                        return t().map(function(n) {
                            return {
                                type: "LineString",
                                coordinates: n
                            }
                        })
                    }
                    ,
                    n.outline = function() {
                        return {
                            type: "Polygon",
                            coordinates: [h(o).concat(p(l).slice(1), h(i).reverse().slice(1), p(s).reverse().slice(1))]
                        }
                    }
                    ,
                    n.extent = function(t) {
                        return arguments.length ? n.majorExtent(t).minorExtent(t) : n.minorExtent()
                    }
                    ,
                    n.majorExtent = function(t) {
                        return arguments.length ? (o = +t[0][0],
                        i = +t[1][0],
                        s = +t[0][1],
                        l = +t[1][1],
                        o > i && (t = o,
                        o = i,
                        i = t),
                        s > l && (t = s,
                        s = l,
                        l = t),
                        n.precision(y)) : [[o, s], [i, l]]
                    }
                    ,
                    n.minorExtent = function(t) {
                        return arguments.length ? (r = +t[0][0],
                        e = +t[1][0],
                        u = +t[0][1],
                        a = +t[1][1],
                        r > e && (t = r,
                        r = e,
                        e = t),
                        u > a && (t = u,
                        u = a,
                        a = t),
                        n.precision(y)) : [[r, u], [e, a]]
                    }
                    ,
                    n.step = function(t) {
                        return arguments.length ? n.majorStep(t).minorStep(t) : n.minorStep()
                    }
                    ,
                    n.majorStep = function(t) {
                        return arguments.length ? (v = +t[0],
                        m = +t[1],
                        n) : [v, m]
                    }
                    ,
                    n.minorStep = function(t) {
                        return arguments.length ? (d = +t[0],
                        g = +t[1],
                        n) : [d, g]
                    }
                    ,
                    n.precision = function(t) {
                        return arguments.length ? (y = +t,
                        c = ee(u, a, 90),
                        f = re(r, e, y),
                        h = ee(s, l, 90),
                        p = re(o, i, y),
                        n) : y
                    }
                    ,
                    n.majorExtent([[-180, -90 + No], [180, 90 - No]]).minorExtent([[-180, -80 - No], [180, 80 + No]])
                }
                ,
                Ki.geo.greatArc = function() {
                    function n() {
                        return {
                            type: "LineString",
                            coordinates: [t || r.apply(this, arguments), e || i.apply(this, arguments)]
                        }
                    }
                    var t, e, r = ie, i = oe;
                    return n.distance = function() {
                        return Ki.geo.distance(t || r.apply(this, arguments), e || i.apply(this, arguments))
                    }
                    ,
                    n.source = function(e) {
                        return arguments.length ? (r = e,
                        t = "function" == typeof e ? null : e,
                        n) : r
                    }
                    ,
                    n.target = function(t) {
                        return arguments.length ? (i = t,
                        e = "function" == typeof t ? null : t,
                        n) : i
                    }
                    ,
                    n.precision = function() {
                        return arguments.length ? n : 0
                    }
                    ,
                    n
                }
                ,
                Ki.geo.interpolate = function(n, t) {
                    return function(n, t, e, r) {
                        var i = Math.cos(t)
                          , o = Math.sin(t)
                          , a = Math.cos(r)
                          , u = Math.sin(r)
                          , l = i * Math.cos(n)
                          , s = i * Math.sin(n)
                          , c = a * Math.cos(e)
                          , f = a * Math.sin(e)
                          , h = 2 * Math.asin(Math.sqrt(an(r - t) + i * a * an(e - n)))
                          , p = 1 / Math.sin(h)
                          , d = h ? function(n) {
                            var t = Math.sin(n *= h) * p
                              , e = Math.sin(h - n) * p
                              , r = e * l + t * c
                              , i = e * s + t * f
                              , a = e * o + t * u;
                            return [Math.atan2(i, r) * zo, Math.atan2(a, Math.sqrt(r * r + i * i)) * zo]
                        }
                        : function() {
                            return [n * zo, t * zo]
                        }
                        ;
                        return d.distance = h,
                        d
                    }(n[0] * Co, n[1] * Co, t[0] * Co, t[1] * Co)
                }
                ,
                Ki.geo.length = function(n) {
                    return Ra = 0,
                    Ki.geo.stream(n, ja),
                    Ra
                }
                ;
                var Ra, ja = {
                    sphere: N,
                    point: N,
                    lineStart: function() {
                        function n(n, i) {
                            var o = Math.sin(i *= Co)
                              , a = Math.cos(i)
                              , u = lo((n *= Co) - t)
                              , l = Math.cos(u);
                            Ra += Math.atan2(Math.sqrt((u = a * Math.sin(u)) * u + (u = r * o - e * a * l) * u), e * o + r * a * l),
                            t = n,
                            e = o,
                            r = a
                        }
                        var t, e, r;
                        ja.point = function(i, o) {
                            t = i * Co,
                            e = Math.sin(o *= Co),
                            r = Math.cos(o),
                            ja.point = n
                        }
                        ,
                        ja.lineEnd = function() {
                            ja.point = ja.lineEnd = N
                        }
                    },
                    lineEnd: N,
                    polygonStart: N,
                    polygonEnd: N
                }, Ua = ae(function(n) {
                    return Math.sqrt(2 / (1 + n))
                }, function(n) {
                    return 2 * Math.asin(n / 2)
                });
                (Ki.geo.azimuthalEqualArea = function() {
                    return Yt(Ua)
                }
                ).raw = Ua;
                var Da = ae(function(n) {
                    var t = Math.acos(n);
                    return t && t / Math.sin(t)
                }, M);
                (Ki.geo.azimuthalEquidistant = function() {
                    return Yt(Da)
                }
                ).raw = Da,
                (Ki.geo.conicConformal = function() {
                    return Ot(ue)
                }
                ).raw = ue,
                (Ki.geo.conicEquidistant = function() {
                    return Ot(le)
                }
                ).raw = le;
                var Fa = ae(function(n) {
                    return 1 / n
                }, Math.atan);
                (Ki.geo.gnomonic = function() {
                    return Yt(Fa)
                }
                ).raw = Fa,
                se.invert = function(n, t) {
                    return [n, 2 * Math.atan(Math.exp(t)) - To]
                }
                ,
                (Ki.geo.mercator = function() {
                    return ce(se)
                }
                ).raw = se;
                var Ia = ae(function() {
                    return 1
                }, Math.asin);
                (Ki.geo.orthographic = function() {
                    return Yt(Ia)
                }
                ).raw = Ia;
                var Ha = ae(function(n) {
                    return 1 / (1 + n)
                }, function(n) {
                    return 2 * Math.atan(n)
                });
                (Ki.geo.stereographic = function() {
                    return Yt(Ha)
                }
                ).raw = Ha,
                fe.invert = function(n, t) {
                    return [-t, 2 * Math.atan(Math.exp(n)) - To]
                }
                ,
                (Ki.geo.transverseMercator = function() {
                    var n = ce(fe)
                      , t = n.center
                      , e = n.rotate;
                    return n.center = function(n) {
                        return n ? t([-n[1], n[0]]) : [(n = t())[1], -n[0]]
                    }
                    ,
                    n.rotate = function(n) {
                        return n ? e([n[0], n[1], n.length > 2 ? n[2] + 90 : 90]) : [(n = e())[0], n[1], n[2] - 90]
                    }
                    ,
                    e([0, 0, 90])
                }
                ).raw = fe,
                Ki.geom = {},
                Ki.geom.hull = function(n) {
                    function t(n) {
                        if (n.length < 3)
                            return [];
                        var t, i = An(e), o = An(r), a = n.length, u = [], l = [];
                        for (t = 0; a > t; t++)
                            u.push([+i.call(this, n[t], t), +o.call(this, n[t], t), t]);
                        for (u.sort(ge),
                        t = 0; a > t; t++)
                            l.push([u[t][0], -u[t][1]]);
                        var s = de(u)
                          , c = de(l)
                          , f = c[0] === s[0]
                          , h = c[c.length - 1] === s[s.length - 1]
                          , p = [];
                        for (t = s.length - 1; t >= 0; --t)
                            p.push(n[u[s[t]][2]]);
                        for (t = +f; t < c.length - h; ++t)
                            p.push(n[u[c[t]][2]]);
                        return p
                    }
                    var e = he
                      , r = pe;
                    return arguments.length ? t(n) : (t.x = function(n) {
                        return arguments.length ? (e = n,
                        t) : e
                    }
                    ,
                    t.y = function(n) {
                        return arguments.length ? (r = n,
                        t) : r
                    }
                    ,
                    t)
                }
                ,
                Ki.geom.polygon = function(n) {
                    return po(n, Ba),
                    n
                }
                ;
                var Ba = Ki.geom.polygon.prototype = [];
                Ba.area = function() {
                    for (var n, t = -1, e = this.length, r = this[e - 1], i = 0; ++t < e; )
                        n = r,
                        r = this[t],
                        i += n[1] * r[0] - n[0] * r[1];
                    return .5 * i
                }
                ,
                Ba.centroid = function(n) {
                    var t, e, r = -1, i = this.length, o = 0, a = 0, u = this[i - 1];
                    for (arguments.length || (n = -1 / (6 * this.area())); ++r < i; )
                        t = u,
                        u = this[r],
                        e = t[0] * u[1] - u[0] * t[1],
                        o += (t[0] + u[0]) * e,
                        a += (t[1] + u[1]) * e;
                    return [o * n, a * n]
                }
                ,
                Ba.clip = function(n) {
                    for (var t, e, r, i, o, a, u = ye(n), l = -1, s = this.length - ye(this), c = this[s - 1]; ++l < s; ) {
                        for (t = n.slice(),
                        n.length = 0,
                        i = this[l],
                        o = t[(r = t.length - u) - 1],
                        e = -1; ++e < r; )
                            ve(a = t[e], c, i) ? (ve(o, c, i) || n.push(me(o, a, c, i)),
                            n.push(a)) : ve(o, c, i) && n.push(me(o, a, c, i)),
                            o = a;
                        u && n.push(n[0]),
                        c = i
                    }
                    return n
                }
                ;
                var Va, Ya, Xa, Wa, Ja, Ga = [], Za = [];
                Ne.prototype.prepare = function() {
                    for (var n, t = this.edges, e = t.length; e--; )
                        (n = t[e].edge).b && n.a || t.splice(e, 1);
                    return t.sort(Se),
                    t.length
                }
                ,
                Oe.prototype = {
                    start: function() {
                        return this.edge.l === this.site ? this.edge.a : this.edge.b
                    },
                    end: function() {
                        return this.edge.l === this.site ? this.edge.b : this.edge.a
                    }
                },
                qe.prototype = {
                    insert: function(n, t) {
                        var e, r, i;
                        if (n) {
                            if (t.P = n,
                            t.N = n.N,
                            n.N && (n.N.P = t),
                            n.N = t,
                            n.R) {
                                for (n = n.R; n.L; )
                                    n = n.L;
                                n.L = t
                            } else
                                n.R = t;
                            e = n
                        } else
                            this._ ? (n = De(this._),
                            t.P = null,
                            t.N = n,
                            n.P = n.L = t,
                            e = n) : (t.P = t.N = null,
                            this._ = t,
                            e = null);
                        for (t.L = t.R = null,
                        t.U = e,
                        t.C = !0,
                        n = t; e && e.C; )
                            e === (r = e.U).L ? (i = r.R) && i.C ? (e.C = i.C = !1,
                            r.C = !0,
                            n = r) : (n === e.R && (je(this, e),
                            e = (n = e).U),
                            e.C = !1,
                            r.C = !0,
                            Ue(this, r)) : (i = r.L) && i.C ? (e.C = i.C = !1,
                            r.C = !0,
                            n = r) : (n === e.L && (Ue(this, e),
                            e = (n = e).U),
                            e.C = !1,
                            r.C = !0,
                            je(this, r)),
                            e = n.U;
                        this._.C = !1
                    },
                    remove: function(n) {
                        n.N && (n.N.P = n.P),
                        n.P && (n.P.N = n.N),
                        n.N = n.P = null;
                        var t, e, r, i = n.U, o = n.L, a = n.R;
                        if (e = o ? a ? De(a) : o : a,
                        i ? i.L === n ? i.L = e : i.R = e : this._ = e,
                        o && a ? (r = e.C,
                        e.C = n.C,
                        e.L = o,
                        o.U = e,
                        e !== a ? (i = e.U,
                        e.U = n.U,
                        n = e.R,
                        i.L = n,
                        e.R = a,
                        a.U = e) : (e.U = i,
                        i = e,
                        n = e.R)) : (r = n.C,
                        n = e),
                        n && (n.U = i),
                        !r) {
                            if (n && n.C)
                                return void (n.C = !1);
                            do {
                                if (n === this._)
                                    break;
                                if (n === i.L) {
                                    if ((t = i.R).C && (t.C = !1,
                                    i.C = !0,
                                    je(this, i),
                                    t = i.R),
                                    t.L && t.L.C || t.R && t.R.C) {
                                        t.R && t.R.C || (t.L.C = !1,
                                        t.C = !0,
                                        Ue(this, t),
                                        t = i.R),
                                        t.C = i.C,
                                        i.C = t.R.C = !1,
                                        je(this, i),
                                        n = this._;
                                        break
                                    }
                                } else if ((t = i.L).C && (t.C = !1,
                                i.C = !0,
                                Ue(this, i),
                                t = i.L),
                                t.L && t.L.C || t.R && t.R.C) {
                                    t.L && t.L.C || (t.R.C = !1,
                                    t.C = !0,
                                    je(this, t),
                                    t = i.L),
                                    t.C = i.C,
                                    i.C = t.L.C = !1,
                                    Ue(this, i),
                                    n = this._;
                                    break
                                }
                                t.C = !0,
                                n = i,
                                i = i.U
                            } while (!n.C);
                            n && (n.C = !1)
                        }
                    }
                },
                Ki.geom.voronoi = function(n) {
                    function t(n) {
                        var t = new Array(n.length)
                          , r = u[0][0]
                          , i = u[0][1]
                          , o = u[1][0]
                          , a = u[1][1];
                        return Fe(e(n), u).cells.forEach(function(e, u) {
                            var l = e.edges
                              , s = e.site;
                            (t[u] = l.length ? l.map(function(n) {
                                var t = n.start();
                                return [t.x, t.y]
                            }) : s.x >= r && s.x <= o && s.y >= i && s.y <= a ? [[r, a], [o, a], [o, i], [r, i]] : []).point = n[u]
                        }),
                        t
                    }
                    function e(n) {
                        return n.map(function(n, t) {
                            return {
                                x: Math.round(o(n, t) / No) * No,
                                y: Math.round(a(n, t) / No) * No,
                                i: t
                            }
                        })
                    }
                    var r = he
                      , i = pe
                      , o = r
                      , a = i
                      , u = $a;
                    return n ? t(n) : (t.links = function(n) {
                        return Fe(e(n)).edges.filter(function(n) {
                            return n.l && n.r
                        }).map(function(t) {
                            return {
                                source: n[t.l.i],
                                target: n[t.r.i]
                            }
                        })
                    }
                    ,
                    t.triangles = function(n) {
                        var t = [];
                        return Fe(e(n)).cells.forEach(function(e, r) {
                            for (var i, o = e.site, a = e.edges.sort(Se), u = -1, l = a.length, s = a[l - 1].edge, c = s.l === o ? s.r : s.l; ++u < l; )
                                s,
                                i = c,
                                c = (s = a[u].edge).l === o ? s.r : s.l,
                                r < i.i && r < c.i && He(o, i, c) < 0 && t.push([n[r], n[i.i], n[c.i]])
                        }),
                        t
                    }
                    ,
                    t.x = function(n) {
                        return arguments.length ? (o = An(r = n),
                        t) : r
                    }
                    ,
                    t.y = function(n) {
                        return arguments.length ? (a = An(i = n),
                        t) : i
                    }
                    ,
                    t.clipExtent = function(n) {
                        return arguments.length ? (u = null == n ? $a : n,
                        t) : u === $a ? null : u
                    }
                    ,
                    t.size = function(n) {
                        return arguments.length ? t.clipExtent(n && [[0, 0], n]) : u === $a ? null : u && u[1]
                    }
                    ,
                    t)
                }
                ;
                var $a = [[-1e6, -1e6], [1e6, 1e6]];
                Ki.geom.delaunay = function(n) {
                    return Ki.geom.voronoi().triangles(n)
                }
                ,
                Ki.geom.quadtree = function(n, t, e, r, i) {
                    function o(n) {
                        function o(n, t, e, r, i, o, a, u) {
                            if (!isNaN(e) && !isNaN(r))
                                if (n.leaf) {
                                    var l = n.x
                                      , c = n.y;
                                    if (null != l)
                                        if (lo(l - e) + lo(c - r) < .01)
                                            s(n, t, e, r, i, o, a, u);
                                        else {
                                            var f = n.point;
                                            n.x = n.y = n.point = null,
                                            s(n, f, l, c, i, o, a, u),
                                            s(n, t, e, r, i, o, a, u)
                                        }
                                    else
                                        n.x = e,
                                        n.y = r,
                                        n.point = t
                                } else
                                    s(n, t, e, r, i, o, a, u)
                        }
                        function s(n, t, e, r, i, a, u, l) {
                            var s = .5 * (i + u)
                              , c = .5 * (a + l)
                              , f = e >= s
                              , h = r >= c
                              , p = h << 1 | f;
                            n.leaf = !1,
                            n = n.nodes[p] || (n.nodes[p] = {
                                leaf: !0,
                                nodes: [],
                                point: null,
                                x: null,
                                y: null,
                                add: function(n) {
                                    o(N, n, +x(n, ++p), +b(n, p), g, v, m, y)
                                }
                            }),
                            f ? i = s : u = s,
                            h ? a = c : l = c,
                            o(n, t, e, r, i, a, u, l)
                        }
                        var c, f, h, p, d, g, v, m, y, x = An(u), b = An(l);
                        if (null != t)
                            g = t,
                            v = e,
                            m = r,
                            y = i;
                        else if (m = y = -(g = v = 1 / 0),
                        f = [],
                        h = [],
                        d = n.length,
                        a)
                            for (p = 0; d > p; ++p)
                                (c = n[p]).x < g && (g = c.x),
                                c.y < v && (v = c.y),
                                c.x > m && (m = c.x),
                                c.y > y && (y = c.y),
                                f.push(c.x),
                                h.push(c.y);
                        else
                            for (p = 0; d > p; ++p) {
                                var k = +x(c = n[p], p)
                                  , M = +b(c, p);
                                g > k && (g = k),
                                v > M && (v = M),
                                k > m && (m = k),
                                M > y && (y = M),
                                f.push(k),
                                h.push(M)
                            }
                        var w = m - g
                          , _ = y - v;
                        w > _ ? y = v + w : m = g + _;
                        var N = {
                            leaf: !0,
                            nodes: [],
                            point: null,
                            x: null,
                            y: null,
                            add: function(n) {
                                o(N, n, +x(n, ++p), +b(n, p), g, v, m, y)
                            }
                        };
                        if (N.visit = function(n) {
                            !function n(t, e, r, i, o, a) {
                                if (!t(e, r, i, o, a)) {
                                    var u = .5 * (r + o)
                                      , l = .5 * (i + a)
                                      , s = e.nodes;
                                    s[0] && n(t, s[0], r, i, u, l),
                                    s[1] && n(t, s[1], u, i, o, l),
                                    s[2] && n(t, s[2], r, l, u, a),
                                    s[3] && n(t, s[3], u, l, o, a)
                                }
                            }(n, N, g, v, m, y)
                        }
                        ,
                        N.find = function(n) {
                            return function(n, t, e, r, i, o, a) {
                                var u, l = 1 / 0;
                                return function n(s, c, f, h, p) {
                                    if (!(c > o || f > a || r > h || i > p)) {
                                        if (d = s.point) {
                                            var d, g = t - s.x, v = e - s.y, m = g * g + v * v;
                                            if (l > m) {
                                                var y = Math.sqrt(l = m);
                                                r = t - y,
                                                i = e - y,
                                                o = t + y,
                                                a = e + y,
                                                u = d
                                            }
                                        }
                                        for (var x = s.nodes, b = .5 * (c + h), k = .5 * (f + p), M = (e >= k) << 1 | t >= b, w = M + 4; w > M; ++M)
                                            if (s = x[3 & M])
                                                switch (3 & M) {
                                                case 0:
                                                    n(s, c, f, b, k);
                                                    break;
                                                case 1:
                                                    n(s, b, f, h, k);
                                                    break;
                                                case 2:
                                                    n(s, c, k, b, p);
                                                    break;
                                                case 3:
                                                    n(s, b, k, h, p)
                                                }
                                    }
                                }(n, r, i, o, a),
                                u
                            }(N, n[0], n[1], g, v, m, y)
                        }
                        ,
                        p = -1,
                        null == t) {
                            for (; ++p < d; )
                                o(N, n[p], f[p], h[p], g, v, m, y);
                            --p
                        } else
                            n.forEach(N.add);
                        return f = h = n = c = null,
                        N
                    }
                    var a, u = he, l = pe;
                    return (a = arguments.length) ? (u = Be,
                    l = Ve,
                    3 === a && (i = e,
                    r = t,
                    e = t = 0),
                    o(n)) : (o.x = function(n) {
                        return arguments.length ? (u = n,
                        o) : u
                    }
                    ,
                    o.y = function(n) {
                        return arguments.length ? (l = n,
                        o) : l
                    }
                    ,
                    o.extent = function(n) {
                        return arguments.length ? (null == n ? t = e = r = i = null : (t = +n[0][0],
                        e = +n[0][1],
                        r = +n[1][0],
                        i = +n[1][1]),
                        o) : null == t ? null : [[t, e], [r, i]]
                    }
                    ,
                    o.size = function(n) {
                        return arguments.length ? (null == n ? t = e = r = i = null : (t = e = 0,
                        r = +n[0],
                        i = +n[1]),
                        o) : null == t ? null : [r - t, i - e]
                    }
                    ,
                    o)
                }
                ,
                Ki.interpolateRgb = Ye,
                Ki.interpolateObject = Xe,
                Ki.interpolateNumber = We,
                Ki.interpolateString = Je;
                var Ka = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g
                  , Qa = new RegExp(Ka.source,"g");
                Ki.interpolate = Ge,
                Ki.interpolators = [function(n, t) {
                    var e = typeof t;
                    return ("string" === e ? Yo.has(t.toLowerCase()) || /^(#|rgb\(|hsl\()/i.test(t) ? Ye : Je : t instanceof un ? Ye : Array.isArray(t) ? Ze : "object" === e && isNaN(t) ? Xe : We)(n, t)
                }
                ],
                Ki.interpolateArray = Ze;
                var nu = function() {
                    return M
                }
                  , tu = Ki.map({
                    linear: nu,
                    poly: function(n) {
                        return function(t) {
                            return Math.pow(t, n)
                        }
                    },
                    quad: function() {
                        return Qe
                    },
                    cubic: function() {
                        return nr
                    },
                    sin: function() {
                        return er
                    },
                    exp: function() {
                        return rr
                    },
                    circle: function() {
                        return ir
                    },
                    elastic: function(n, t) {
                        var e;
                        return arguments.length < 2 && (t = .45),
                        arguments.length ? e = t / Lo * Math.asin(1 / n) : (n = 1,
                        e = t / 4),
                        function(r) {
                            return 1 + n * Math.pow(2, -10 * r) * Math.sin((r - e) * Lo / t)
                        }
                    },
                    back: function(n) {
                        return n || (n = 1.70158),
                        function(t) {
                            return t * t * ((n + 1) * t - n)
                        }
                    },
                    bounce: function() {
                        return or
                    }
                })
                  , eu = Ki.map({
                    in: M,
                    out: $e,
                    "in-out": Ke,
                    "out-in": function(n) {
                        return Ke($e(n))
                    }
                });
                Ki.ease = function(n) {
                    var t = n.indexOf("-")
                      , e = t >= 0 ? n.slice(0, t) : n
                      , r = t >= 0 ? n.slice(t + 1) : "in";
                    return e = tu.get(e) || nu,
                    function(n) {
                        return function(t) {
                            return 0 >= t ? 0 : t >= 1 ? 1 : n(t)
                        }
                    }((r = eu.get(r) || M)(e.apply(null, Qi.call(arguments, 1))))
                }
                ,
                Ki.interpolateHcl = function(n, t) {
                    n = Ki.hcl(n),
                    t = Ki.hcl(t);
                    var e = n.h
                      , r = n.c
                      , i = n.l
                      , o = t.h - e
                      , a = t.c - r
                      , u = t.l - i;
                    return isNaN(a) && (a = 0,
                    r = isNaN(r) ? t.c : r),
                    isNaN(o) ? (o = 0,
                    e = isNaN(e) ? t.h : e) : o > 180 ? o -= 360 : -180 > o && (o += 360),
                    function(n) {
                        return fn(e + o * n, r + a * n, i + u * n) + ""
                    }
                }
                ,
                Ki.interpolateHsl = function(n, t) {
                    n = Ki.hsl(n),
                    t = Ki.hsl(t);
                    var e = n.h
                      , r = n.s
                      , i = n.l
                      , o = t.h - e
                      , a = t.s - r
                      , u = t.l - i;
                    return isNaN(a) && (a = 0,
                    r = isNaN(r) ? t.s : r),
                    isNaN(o) ? (o = 0,
                    e = isNaN(e) ? t.h : e) : o > 180 ? o -= 360 : -180 > o && (o += 360),
                    function(n) {
                        return sn(e + o * n, r + a * n, i + u * n) + ""
                    }
                }
                ,
                Ki.interpolateLab = function(n, t) {
                    n = Ki.lab(n),
                    t = Ki.lab(t);
                    var e = n.l
                      , r = n.a
                      , i = n.b
                      , o = t.l - e
                      , a = t.a - r
                      , u = t.b - i;
                    return function(n) {
                        return pn(e + o * n, r + a * n, i + u * n) + ""
                    }
                }
                ,
                Ki.interpolateRound = ar,
                Ki.transform = function(n) {
                    var t = to.createElementNS(Ki.ns.prefix.svg, "g");
                    return (Ki.transform = function(n) {
                        if (null != n) {
                            t.setAttribute("transform", n);
                            var e = t.transform.baseVal.consolidate()
                        }
                        return new ur(e ? e.matrix : ru)
                    }
                    )(n)
                }
                ,
                ur.prototype.toString = function() {
                    return "translate(" + this.translate + ")rotate(" + this.rotate + ")skewX(" + this.skew + ")scale(" + this.scale + ")"
                }
                ;
                var ru = {
                    a: 1,
                    b: 0,
                    c: 0,
                    d: 1,
                    e: 0,
                    f: 0
                };
                Ki.interpolateTransform = fr,
                Ki.layout = {},
                Ki.layout.bundle = function() {
                    return function(n) {
                        for (var t = [], e = -1, r = n.length; ++e < r; )
                            t.push(dr(n[e]));
                        return t
                    }
                }
                ,
                Ki.layout.chord = function() {
                    function n() {
                        var n, s, f, h, p, d = {}, g = [], v = Ki.range(o), m = [];
                        for (e = [],
                        r = [],
                        n = 0,
                        h = -1; ++h < o; ) {
                            for (s = 0,
                            p = -1; ++p < o; )
                                s += i[h][p];
                            g.push(s),
                            m.push(Ki.range(o)),
                            n += s
                        }
                        for (a && v.sort(function(n, t) {
                            return a(g[n], g[t])
                        }),
                        u && m.forEach(function(n, t) {
                            n.sort(function(n, e) {
                                return u(i[t][n], i[t][e])
                            })
                        }),
                        n = (Lo - c * o) / n,
                        s = 0,
                        h = -1; ++h < o; ) {
                            for (f = s,
                            p = -1; ++p < o; ) {
                                var y = v[h]
                                  , x = m[y][p]
                                  , b = i[y][x]
                                  , k = s
                                  , M = s += b * n;
                                d[y + "-" + x] = {
                                    index: y,
                                    subindex: x,
                                    startAngle: k,
                                    endAngle: M,
                                    value: b
                                }
                            }
                            r[y] = {
                                index: y,
                                startAngle: f,
                                endAngle: s,
                                value: g[y]
                            },
                            s += c
                        }
                        for (h = -1; ++h < o; )
                            for (p = h - 1; ++p < o; ) {
                                var w = d[h + "-" + p]
                                  , _ = d[p + "-" + h];
                                (w.value || _.value) && e.push(w.value < _.value ? {
                                    source: _,
                                    target: w
                                } : {
                                    source: w,
                                    target: _
                                })
                            }
                        l && t()
                    }
                    function t() {
                        e.sort(function(n, t) {
                            return l((n.source.value + n.target.value) / 2, (t.source.value + t.target.value) / 2)
                        })
                    }
                    var e, r, i, o, a, u, l, s = {}, c = 0;
                    return s.matrix = function(n) {
                        return arguments.length ? (o = (i = n) && i.length,
                        e = r = null,
                        s) : i
                    }
                    ,
                    s.padding = function(n) {
                        return arguments.length ? (c = n,
                        e = r = null,
                        s) : c
                    }
                    ,
                    s.sortGroups = function(n) {
                        return arguments.length ? (a = n,
                        e = r = null,
                        s) : a
                    }
                    ,
                    s.sortSubgroups = function(n) {
                        return arguments.length ? (u = n,
                        e = null,
                        s) : u
                    }
                    ,
                    s.sortChords = function(n) {
                        return arguments.length ? (l = n,
                        e && t(),
                        s) : l
                    }
                    ,
                    s.chords = function() {
                        return e || n(),
                        e
                    }
                    ,
                    s.groups = function() {
                        return r || n(),
                        r
                    }
                    ,
                    s
                }
                ,
                Ki.layout.force = function() {
                    function n(n) {
                        return function(t, e, r, i) {
                            if (t.point !== n) {
                                var o = t.cx - n.x
                                  , a = t.cy - n.y
                                  , u = i - e
                                  , l = o * o + a * a;
                                if (l > u * u / m) {
                                    if (g > l) {
                                        var s = t.charge / l;
                                        n.px -= o * s,
                                        n.py -= a * s
                                    }
                                    return !0
                                }
                                if (t.point && l && g > l) {
                                    s = t.pointCharge / l;
                                    n.px -= o * s,
                                    n.py -= a * s
                                }
                            }
                            return !t.charge
                        }
                    }
                    function t(n) {
                        n.px = Ki.event.x,
                        n.py = Ki.event.y,
                        l.resume()
                    }
                    var e, r, i, o, a, u, l = {}, s = Ki.dispatch("start", "tick", "end"), c = [1, 1], f = .9, h = iu, p = ou, d = -30, g = au, v = .1, m = .64, y = [], x = [];
                    return l.tick = function() {
                        if ((i *= .99) < .005)
                            return e = null,
                            s.end({
                                type: "end",
                                alpha: i = 0
                            }),
                            !0;
                        var t, r, l, h, p, g, m, b, k, M = y.length, w = x.length;
                        for (r = 0; w > r; ++r)
                            h = (l = x[r]).source,
                            (g = (b = (p = l.target).x - h.x) * b + (k = p.y - h.y) * k) && (b *= g = i * a[r] * ((g = Math.sqrt(g)) - o[r]) / g,
                            k *= g,
                            p.x -= b * (m = h.weight + p.weight ? h.weight / (h.weight + p.weight) : .5),
                            p.y -= k * m,
                            h.x += b * (m = 1 - m),
                            h.y += k * m);
                        if ((m = i * v) && (b = c[0] / 2,
                        k = c[1] / 2,
                        r = -1,
                        m))
                            for (; ++r < M; )
                                (l = y[r]).x += (b - l.x) * m,
                                l.y += (k - l.y) * m;
                        if (d)
                            for (function n(t, e, r) {
                                var i = 0
                                  , o = 0;
                                if (t.charge = 0,
                                !t.leaf)
                                    for (var a, u = t.nodes, l = u.length, s = -1; ++s < l; )
                                        null != (a = u[s]) && (n(a, e, r),
                                        t.charge += a.charge,
                                        i += a.charge * a.cx,
                                        o += a.charge * a.cy);
                                if (t.point) {
                                    t.leaf || (t.point.x += Math.random() - .5,
                                    t.point.y += Math.random() - .5);
                                    var c = e * r[t.point.index];
                                    t.charge += t.pointCharge = c,
                                    i += c * t.point.x,
                                    o += c * t.point.y
                                }
                                t.cx = i / t.charge,
                                t.cy = o / t.charge
                            }(t = Ki.geom.quadtree(y), i, u),
                            r = -1; ++r < M; )
                                (l = y[r]).fixed || t.visit(n(l));
                        for (r = -1; ++r < M; )
                            (l = y[r]).fixed ? (l.x = l.px,
                            l.y = l.py) : (l.x -= (l.px - (l.px = l.x)) * f,
                            l.y -= (l.py - (l.py = l.y)) * f);
                        s.tick({
                            type: "tick",
                            alpha: i
                        })
                    }
                    ,
                    l.nodes = function(n) {
                        return arguments.length ? (y = n,
                        l) : y
                    }
                    ,
                    l.links = function(n) {
                        return arguments.length ? (x = n,
                        l) : x
                    }
                    ,
                    l.size = function(n) {
                        return arguments.length ? (c = n,
                        l) : c
                    }
                    ,
                    l.linkDistance = function(n) {
                        return arguments.length ? (h = "function" == typeof n ? n : +n,
                        l) : h
                    }
                    ,
                    l.distance = l.linkDistance,
                    l.linkStrength = function(n) {
                        return arguments.length ? (p = "function" == typeof n ? n : +n,
                        l) : p
                    }
                    ,
                    l.friction = function(n) {
                        return arguments.length ? (f = +n,
                        l) : f
                    }
                    ,
                    l.charge = function(n) {
                        return arguments.length ? (d = "function" == typeof n ? n : +n,
                        l) : d
                    }
                    ,
                    l.chargeDistance = function(n) {
                        return arguments.length ? (g = n * n,
                        l) : Math.sqrt(g)
                    }
                    ,
                    l.gravity = function(n) {
                        return arguments.length ? (v = +n,
                        l) : v
                    }
                    ,
                    l.theta = function(n) {
                        return arguments.length ? (m = n * n,
                        l) : Math.sqrt(m)
                    }
                    ,
                    l.alpha = function(n) {
                        return arguments.length ? (n = +n,
                        i ? n > 0 ? i = n : (e.c = null,
                        e.t = NaN,
                        e = null,
                        s.end({
                            type: "end",
                            alpha: i = 0
                        })) : n > 0 && (s.start({
                            type: "start",
                            alpha: i = n
                        }),
                        e = Tn(l.tick)),
                        l) : i
                    }
                    ,
                    l.start = function() {
                        function n(n, r) {
                            if (!e) {
                                for (e = new Array(i),
                                l = 0; i > l; ++l)
                                    e[l] = [];
                                for (l = 0; s > l; ++l) {
                                    var o = x[l];
                                    e[o.source.index].push(o.target),
                                    e[o.target.index].push(o.source)
                                }
                            }
                            for (var a, u = e[t], l = -1, c = u.length; ++l < c; )
                                if (!isNaN(a = u[l][n]))
                                    return a;
                            return Math.random() * r
                        }
                        var t, e, r, i = y.length, s = x.length, f = c[0], g = c[1];
                        for (t = 0; i > t; ++t)
                            (r = y[t]).index = t,
                            r.weight = 0;
                        for (t = 0; s > t; ++t)
                            "number" == typeof (r = x[t]).source && (r.source = y[r.source]),
                            "number" == typeof r.target && (r.target = y[r.target]),
                            ++r.source.weight,
                            ++r.target.weight;
                        for (t = 0; i > t; ++t)
                            r = y[t],
                            isNaN(r.x) && (r.x = n("x", f)),
                            isNaN(r.y) && (r.y = n("y", g)),
                            isNaN(r.px) && (r.px = r.x),
                            isNaN(r.py) && (r.py = r.y);
                        if (o = [],
                        "function" == typeof h)
                            for (t = 0; s > t; ++t)
                                o[t] = +h.call(this, x[t], t);
                        else
                            for (t = 0; s > t; ++t)
                                o[t] = h;
                        if (a = [],
                        "function" == typeof p)
                            for (t = 0; s > t; ++t)
                                a[t] = +p.call(this, x[t], t);
                        else
                            for (t = 0; s > t; ++t)
                                a[t] = p;
                        if (u = [],
                        "function" == typeof d)
                            for (t = 0; i > t; ++t)
                                u[t] = +d.call(this, y[t], t);
                        else
                            for (t = 0; i > t; ++t)
                                u[t] = d;
                        return l.resume()
                    }
                    ,
                    l.resume = function() {
                        return l.alpha(.1)
                    }
                    ,
                    l.stop = function() {
                        return l.alpha(0)
                    }
                    ,
                    l.drag = function() {
                        return r || (r = Ki.behavior.drag().origin(M).on("dragstart.force", vr).on("drag.force", t).on("dragend.force", mr)),
                        arguments.length ? void this.on("mouseover.force", yr).on("mouseout.force", xr).call(r) : r
                    }
                    ,
                    Ki.rebind(l, s, "on")
                }
                ;
                var iu = 20
                  , ou = 1
                  , au = 1 / 0;
                Ki.layout.hierarchy = function() {
                    function n(i) {
                        var o, a = [i], u = [];
                        for (i.depth = 0; null != (o = a.pop()); )
                            if (u.push(o),
                            (s = e.call(n, o, o.depth)) && (l = s.length)) {
                                for (var l, s, c; --l >= 0; )
                                    a.push(c = s[l]),
                                    c.parent = o,
                                    c.depth = o.depth + 1;
                                r && (o.value = 0),
                                o.children = s
                            } else
                                r && (o.value = +r.call(n, o, o.depth) || 0),
                                delete o.children;
                        return Mr(i, function(n) {
                            var e, i;
                            t && (e = n.children) && e.sort(t),
                            r && (i = n.parent) && (i.value += n.value)
                        }),
                        u
                    }
                    var t = Nr
                      , e = wr
                      , r = _r;
                    return n.sort = function(e) {
                        return arguments.length ? (t = e,
                        n) : t
                    }
                    ,
                    n.children = function(t) {
                        return arguments.length ? (e = t,
                        n) : e
                    }
                    ,
                    n.value = function(t) {
                        return arguments.length ? (r = t,
                        n) : r
                    }
                    ,
                    n.revalue = function(t) {
                        return r && (kr(t, function(n) {
                            n.children && (n.value = 0)
                        }),
                        Mr(t, function(t) {
                            var e;
                            t.children || (t.value = +r.call(n, t, t.depth) || 0),
                            (e = t.parent) && (e.value += t.value)
                        })),
                        t
                    }
                    ,
                    n
                }
                ,
                Ki.layout.partition = function() {
                    function n(n, r) {
                        var i = t.call(this, n, r);
                        return function n(t, e, r, i) {
                            var o = t.children;
                            if (t.x = e,
                            t.y = t.depth * i,
                            t.dx = r,
                            t.dy = i,
                            o && (a = o.length)) {
                                var a, u, l, s = -1;
                                for (r = t.value ? r / t.value : 0; ++s < a; )
                                    n(u = o[s], e, l = u.value * r, i),
                                    e += l
                            }
                        }(i[0], 0, e[0], e[1] / function n(t) {
                            var e = t.children
                              , r = 0;
                            if (e && (i = e.length))
                                for (var i, o = -1; ++o < i; )
                                    r = Math.max(r, n(e[o]));
                            return 1 + r
                        }(i[0])),
                        i
                    }
                    var t = Ki.layout.hierarchy()
                      , e = [1, 1];
                    return n.size = function(t) {
                        return arguments.length ? (e = t,
                        n) : e
                    }
                    ,
                    br(n, t)
                }
                ,
                Ki.layout.pie = function() {
                    function n(a) {
                        var u, l = a.length, s = a.map(function(e, r) {
                            return +t.call(n, e, r)
                        }), c = +("function" == typeof r ? r.apply(this, arguments) : r), f = ("function" == typeof i ? i.apply(this, arguments) : i) - c, h = Math.min(Math.abs(f) / l, +("function" == typeof o ? o.apply(this, arguments) : o)), p = h * (0 > f ? -1 : 1), d = Ki.sum(s), g = d ? (f - l * p) / d : 0, v = Ki.range(l), m = [];
                        return null != e && v.sort(e === uu ? function(n, t) {
                            return s[t] - s[n]
                        }
                        : function(n, t) {
                            return e(a[n], a[t])
                        }
                        ),
                        v.forEach(function(n) {
                            m[n] = {
                                data: a[n],
                                value: u = s[n],
                                startAngle: c,
                                endAngle: c += u * g + p,
                                padAngle: h
                            }
                        }),
                        m
                    }
                    var t = Number
                      , e = uu
                      , r = 0
                      , i = Lo
                      , o = 0;
                    return n.value = function(e) {
                        return arguments.length ? (t = e,
                        n) : t
                    }
                    ,
                    n.sort = function(t) {
                        return arguments.length ? (e = t,
                        n) : e
                    }
                    ,
                    n.startAngle = function(t) {
                        return arguments.length ? (r = t,
                        n) : r
                    }
                    ,
                    n.endAngle = function(t) {
                        return arguments.length ? (i = t,
                        n) : i
                    }
                    ,
                    n.padAngle = function(t) {
                        return arguments.length ? (o = t,
                        n) : o
                    }
                    ,
                    n
                }
                ;
                var uu = {};
                Ki.layout.stack = function() {
                    function n(u, l) {
                        if (!(h = u.length))
                            return u;
                        var s = u.map(function(e, r) {
                            return t.call(n, e, r)
                        })
                          , c = s.map(function(t) {
                            return t.map(function(t, e) {
                                return [o.call(n, t, e), a.call(n, t, e)]
                            })
                        })
                          , f = e.call(n, c, l);
                        s = Ki.permute(s, f),
                        c = Ki.permute(c, f);
                        var h, p, d, g, v = r.call(n, c, l), m = s[0].length;
                        for (d = 0; m > d; ++d)
                            for (i.call(n, s[0][d], g = v[d], c[0][d][1]),
                            p = 1; h > p; ++p)
                                i.call(n, s[p][d], g += c[p - 1][d][1], c[p][d][1]);
                        return u
                    }
                    var t = M
                      , e = Tr
                      , r = Cr
                      , i = Er
                      , o = Ar
                      , a = Lr;
                    return n.values = function(e) {
                        return arguments.length ? (t = e,
                        n) : t
                    }
                    ,
                    n.order = function(t) {
                        return arguments.length ? (e = "function" == typeof t ? t : lu.get(t) || Tr,
                        n) : e
                    }
                    ,
                    n.offset = function(t) {
                        return arguments.length ? (r = "function" == typeof t ? t : su.get(t) || Cr,
                        n) : r
                    }
                    ,
                    n.x = function(t) {
                        return arguments.length ? (o = t,
                        n) : o
                    }
                    ,
                    n.y = function(t) {
                        return arguments.length ? (a = t,
                        n) : a
                    }
                    ,
                    n.out = function(t) {
                        return arguments.length ? (i = t,
                        n) : i
                    }
                    ,
                    n
                }
                ;
                var lu = Ki.map({
                    "inside-out": function(n) {
                        var t, e, r = n.length, i = n.map(zr), o = n.map(Pr), a = Ki.range(r).sort(function(n, t) {
                            return i[n] - i[t]
                        }), u = 0, l = 0, s = [], c = [];
                        for (t = 0; r > t; ++t)
                            e = a[t],
                            l > u ? (u += o[e],
                            s.push(e)) : (l += o[e],
                            c.push(e));
                        return c.reverse().concat(s)
                    },
                    reverse: function(n) {
                        return Ki.range(n.length).reverse()
                    },
                    default: Tr
                })
                  , su = Ki.map({
                    silhouette: function(n) {
                        var t, e, r, i = n.length, o = n[0].length, a = [], u = 0, l = [];
                        for (e = 0; o > e; ++e) {
                            for (t = 0,
                            r = 0; i > t; t++)
                                r += n[t][e][1];
                            r > u && (u = r),
                            a.push(r)
                        }
                        for (e = 0; o > e; ++e)
                            l[e] = (u - a[e]) / 2;
                        return l
                    },
                    wiggle: function(n) {
                        var t, e, r, i, o, a, u, l, s, c = n.length, f = n[0], h = f.length, p = [];
                        for (p[0] = l = s = 0,
                        e = 1; h > e; ++e) {
                            for (t = 0,
                            i = 0; c > t; ++t)
                                i += n[t][e][1];
                            for (t = 0,
                            o = 0,
                            u = f[e][0] - f[e - 1][0]; c > t; ++t) {
                                for (r = 0,
                                a = (n[t][e][1] - n[t][e - 1][1]) / (2 * u); t > r; ++r)
                                    a += (n[r][e][1] - n[r][e - 1][1]) / u;
                                o += a * n[t][e][1]
                            }
                            p[e] = l -= i ? o / i * u : 0,
                            s > l && (s = l)
                        }
                        for (e = 0; h > e; ++e)
                            p[e] -= s;
                        return p
                    },
                    expand: function(n) {
                        var t, e, r, i = n.length, o = n[0].length, a = 1 / i, u = [];
                        for (e = 0; o > e; ++e) {
                            for (t = 0,
                            r = 0; i > t; t++)
                                r += n[t][e][1];
                            if (r)
                                for (t = 0; i > t; t++)
                                    n[t][e][1] /= r;
                            else
                                for (t = 0; i > t; t++)
                                    n[t][e][1] = a
                        }
                        for (e = 0; o > e; ++e)
                            u[e] = 0;
                        return u
                    },
                    zero: Cr
                });
                Ki.layout.histogram = function() {
                    function n(n, o) {
                        for (var a, u, l = [], s = n.map(e, this), c = r.call(this, s, o), f = i.call(this, c, s, o), h = (o = -1,
                        s.length), p = f.length - 1, d = t ? 1 : 1 / h; ++o < p; )
                            (a = l[o] = []).dx = f[o + 1] - (a.x = f[o]),
                            a.y = 0;
                        if (p > 0)
                            for (o = -1; ++o < h; )
                                (u = s[o]) >= c[0] && u <= c[1] && ((a = l[Ki.bisect(f, u, 1, p) - 1]).y += d,
                                a.push(n[o]));
                        return l
                    }
                    var t = !0
                      , e = Number
                      , r = jr
                      , i = qr;
                    return n.value = function(t) {
                        return arguments.length ? (e = t,
                        n) : e
                    }
                    ,
                    n.range = function(t) {
                        return arguments.length ? (r = An(t),
                        n) : r
                    }
                    ,
                    n.bins = function(t) {
                        return arguments.length ? (i = "number" == typeof t ? function(n) {
                            return Rr(n, t)
                        }
                        : An(t),
                        n) : i
                    }
                    ,
                    n.frequency = function(e) {
                        return arguments.length ? (t = !!e,
                        n) : t
                    }
                    ,
                    n
                }
                ,
                Ki.layout.pack = function() {
                    function n(n, o) {
                        var a = e.call(this, n, o)
                          , u = a[0]
                          , l = i[0]
                          , s = i[1]
                          , c = null == t ? Math.sqrt : "function" == typeof t ? t : function() {
                            return t
                        }
                        ;
                        if (u.x = u.y = 0,
                        Mr(u, function(n) {
                            n.r = +c(n.value)
                        }),
                        Mr(u, Hr),
                        r) {
                            var f = r * (t ? 1 : Math.max(2 * u.r / l, 2 * u.r / s)) / 2;
                            Mr(u, function(n) {
                                n.r += f
                            }),
                            Mr(u, Hr),
                            Mr(u, function(n) {
                                n.r -= f
                            })
                        }
                        return function n(t, e, r, i) {
                            var o = t.children;
                            if (t.x = e += i * t.x,
                            t.y = r += i * t.y,
                            t.r *= i,
                            o)
                                for (var a = -1, u = o.length; ++a < u; )
                                    n(o[a], e, r, i)
                        }(u, l / 2, s / 2, t ? 1 : 1 / Math.max(2 * u.r / l, 2 * u.r / s)),
                        a
                    }
                    var t, e = Ki.layout.hierarchy().sort(Ur), r = 0, i = [1, 1];
                    return n.size = function(t) {
                        return arguments.length ? (i = t,
                        n) : i
                    }
                    ,
                    n.radius = function(e) {
                        return arguments.length ? (t = null == e || "function" == typeof e ? e : +e,
                        n) : t
                    }
                    ,
                    n.padding = function(t) {
                        return arguments.length ? (r = +t,
                        n) : r
                    }
                    ,
                    br(n, e)
                }
                ,
                Ki.layout.tree = function() {
                    function n(n, l) {
                        var s = i.call(this, n, l)
                          , c = s[0]
                          , f = function(n) {
                            for (var t, e = {
                                A: null,
                                children: [n]
                            }, r = [e]; null != (t = r.pop()); )
                                for (var i, o = t.children, a = 0, u = o.length; u > a; ++a)
                                    r.push((o[a] = i = {
                                        _: o[a],
                                        parent: t,
                                        children: (i = o[a].children) && i.slice() || [],
                                        A: null,
                                        a: null,
                                        z: 0,
                                        m: 0,
                                        c: 0,
                                        s: 0,
                                        t: null,
                                        i: a
                                    }).a = i);
                            return e.children[0]
                        }(c);
                        if (Mr(f, t),
                        f.parent.m = -f.z,
                        kr(f, e),
                        u)
                            kr(c, r);
                        else {
                            var h = c
                              , p = c
                              , d = c;
                            kr(c, function(n) {
                                n.x < h.x && (h = n),
                                n.x > p.x && (p = n),
                                n.depth > d.depth && (d = n)
                            });
                            var g = o(h, p) / 2 - h.x
                              , v = a[0] / (p.x + o(p, h) / 2 + g)
                              , m = a[1] / (d.depth || 1);
                            kr(c, function(n) {
                                n.x = (n.x + g) * v,
                                n.y = n.depth * m
                            })
                        }
                        return s
                    }
                    function t(n) {
                        var t = n.children
                          , e = n.parent.children
                          , r = n.i ? e[n.i - 1] : null;
                        if (t.length) {
                            !function(n) {
                                for (var t, e = 0, r = 0, i = n.children, o = i.length; --o >= 0; )
                                    (t = i[o]).z += e,
                                    t.m += e,
                                    e += t.s + (r += t.c)
                            }(n);
                            var i = (t[0].z + t[t.length - 1].z) / 2;
                            r ? (n.z = r.z + o(n._, r._),
                            n.m = n.z - i) : n.z = i
                        } else
                            r && (n.z = r.z + o(n._, r._));
                        n.parent.A = function(n, t, e) {
                            if (t) {
                                for (var r, i = n, a = n, u = t, l = i.parent.children[0], s = i.m, c = a.m, f = u.m, h = l.m; u = Jr(u),
                                i = Wr(i),
                                u && i; )
                                    l = Wr(l),
                                    (a = Jr(a)).a = n,
                                    (r = u.z + f - i.z - s + o(u._, i._)) > 0 && (Gr(Zr(u, n, e), n, r),
                                    s += r,
                                    c += r),
                                    f += u.m,
                                    s += i.m,
                                    h += l.m,
                                    c += a.m;
                                u && !Jr(a) && (a.t = u,
                                a.m += f - c),
                                i && !Wr(l) && (l.t = i,
                                l.m += s - h,
                                e = n)
                            }
                            return e
                        }(n, r, n.parent.A || e[0])
                    }
                    function e(n) {
                        n._.x = n.z + n.parent.m,
                        n.m += n.parent.m
                    }
                    function r(n) {
                        n.x *= a[0],
                        n.y = n.depth * a[1]
                    }
                    var i = Ki.layout.hierarchy().sort(null).value(null)
                      , o = Xr
                      , a = [1, 1]
                      , u = null;
                    return n.separation = function(t) {
                        return arguments.length ? (o = t,
                        n) : o
                    }
                    ,
                    n.size = function(t) {
                        return arguments.length ? (u = null == (a = t) ? r : null,
                        n) : u ? null : a
                    }
                    ,
                    n.nodeSize = function(t) {
                        return arguments.length ? (u = null == (a = t) ? null : r,
                        n) : u ? a : null
                    }
                    ,
                    br(n, i)
                }
                ,
                Ki.layout.cluster = function() {
                    function n(n, o) {
                        var a, u = t.call(this, n, o), l = u[0], s = 0;
                        Mr(l, function(n) {
                            var t = n.children;
                            t && t.length ? (n.x = function(n) {
                                return n.reduce(function(n, t) {
                                    return n + t.x
                                }, 0) / n.length
                            }(t),
                            n.y = function(n) {
                                return 1 + Ki.max(n, function(n) {
                                    return n.y
                                })
                            }(t)) : (n.x = a ? s += e(n, a) : 0,
                            n.y = 0,
                            a = n)
                        });
                        var c = function n(t) {
                            var e = t.children;
                            return e && e.length ? n(e[0]) : t
                        }(l)
                          , f = function n(t) {
                            var e, r = t.children;
                            return r && (e = r.length) ? n(r[e - 1]) : t
                        }(l)
                          , h = c.x - e(c, f) / 2
                          , p = f.x + e(f, c) / 2;
                        return Mr(l, i ? function(n) {
                            n.x = (n.x - l.x) * r[0],
                            n.y = (l.y - n.y) * r[1]
                        }
                        : function(n) {
                            n.x = (n.x - h) / (p - h) * r[0],
                            n.y = (1 - (l.y ? n.y / l.y : 1)) * r[1]
                        }
                        ),
                        u
                    }
                    var t = Ki.layout.hierarchy().sort(null).value(null)
                      , e = Xr
                      , r = [1, 1]
                      , i = !1;
                    return n.separation = function(t) {
                        return arguments.length ? (e = t,
                        n) : e
                    }
                    ,
                    n.size = function(t) {
                        return arguments.length ? (i = null == (r = t),
                        n) : i ? null : r
                    }
                    ,
                    n.nodeSize = function(t) {
                        return arguments.length ? (i = null != (r = t),
                        n) : i ? r : null
                    }
                    ,
                    br(n, t)
                }
                ,
                Ki.layout.treemap = function() {
                    function n(n, t) {
                        for (var e, r, i = -1, o = n.length; ++i < o; )
                            r = (e = n[i]).value * (0 > t ? 0 : t),
                            e.area = isNaN(r) || 0 >= r ? 0 : r
                    }
                    function t(e) {
                        var o = e.children;
                        if (o && o.length) {
                            var a, u, l, s = f(e), c = [], h = o.slice(), d = 1 / 0, g = "slice" === p ? s.dx : "dice" === p ? s.dy : "slice-dice" === p ? 1 & e.depth ? s.dy : s.dx : Math.min(s.dx, s.dy);
                            for (n(h, s.dx * s.dy / e.value),
                            c.area = 0; (l = h.length) > 0; )
                                c.push(a = h[l - 1]),
                                c.area += a.area,
                                "squarify" !== p || (u = r(c, g)) <= d ? (h.pop(),
                                d = u) : (c.area -= c.pop().area,
                                i(c, g, s, !1),
                                g = Math.min(s.dx, s.dy),
                                c.length = c.area = 0,
                                d = 1 / 0);
                            c.length && (i(c, g, s, !0),
                            c.length = c.area = 0),
                            o.forEach(t)
                        }
                    }
                    function e(t) {
                        var r = t.children;
                        if (r && r.length) {
                            var o, a = f(t), u = r.slice(), l = [];
                            for (n(u, a.dx * a.dy / t.value),
                            l.area = 0; o = u.pop(); )
                                l.push(o),
                                l.area += o.area,
                                null != o.z && (i(l, o.z ? a.dx : a.dy, a, !u.length),
                                l.length = l.area = 0);
                            r.forEach(e)
                        }
                    }
                    function r(n, t) {
                        for (var e, r = n.area, i = 0, o = 1 / 0, a = -1, u = n.length; ++a < u; )
                            (e = n[a].area) && (o > e && (o = e),
                            e > i && (i = e));
                        return t *= t,
                        (r *= r) ? Math.max(t * i * d / r, r / (t * o * d)) : 1 / 0
                    }
                    function i(n, t, e, r) {
                        var i, o = -1, a = n.length, u = e.x, s = e.y, c = t ? l(n.area / t) : 0;
                        if (t == e.dx) {
                            for ((r || c > e.dy) && (c = e.dy); ++o < a; )
                                (i = n[o]).x = u,
                                i.y = s,
                                i.dy = c,
                                u += i.dx = Math.min(e.x + e.dx - u, c ? l(i.area / c) : 0);
                            i.z = !0,
                            i.dx += e.x + e.dx - u,
                            e.y += c,
                            e.dy -= c
                        } else {
                            for ((r || c > e.dx) && (c = e.dx); ++o < a; )
                                (i = n[o]).x = u,
                                i.y = s,
                                i.dx = c,
                                s += i.dy = Math.min(e.y + e.dy - s, c ? l(i.area / c) : 0);
                            i.z = !1,
                            i.dy += e.y + e.dy - s,
                            e.x += c,
                            e.dx -= c
                        }
                    }
                    function o(r) {
                        var i = a || u(r)
                          , o = i[0];
                        return o.x = o.y = 0,
                        o.value ? (o.dx = s[0],
                        o.dy = s[1]) : o.dx = o.dy = 0,
                        a && u.revalue(o),
                        n([o], o.dx * o.dy / o.value),
                        (a ? e : t)(o),
                        h && (a = i),
                        i
                    }
                    var a, u = Ki.layout.hierarchy(), l = Math.round, s = [1, 1], c = null, f = $r, h = !1, p = "squarify", d = .5 * (1 + Math.sqrt(5));
                    return o.size = function(n) {
                        return arguments.length ? (s = n,
                        o) : s
                    }
                    ,
                    o.padding = function(n) {
                        function t(t) {
                            return Kr(t, n)
                        }
                        return arguments.length ? (f = null == (c = n) ? $r : "function" == (e = typeof n) ? function(t) {
                            var e = n.call(o, t, t.depth);
                            return null == e ? $r(t) : Kr(t, "number" == typeof e ? [e, e, e, e] : e)
                        }
                        : "number" === e ? (n = [n, n, n, n],
                        t) : t,
                        o) : c;
                        var e
                    }
                    ,
                    o.round = function(n) {
                        return arguments.length ? (l = n ? Math.round : Number,
                        o) : l != Number
                    }
                    ,
                    o.sticky = function(n) {
                        return arguments.length ? (h = n,
                        a = null,
                        o) : h
                    }
                    ,
                    o.ratio = function(n) {
                        return arguments.length ? (d = n,
                        o) : d
                    }
                    ,
                    o.mode = function(n) {
                        return arguments.length ? (p = n + "",
                        o) : p
                    }
                    ,
                    br(o, u)
                }
                ,
                Ki.random = {
                    normal: function(n, t) {
                        var e = arguments.length;
                        return 2 > e && (t = 1),
                        1 > e && (n = 0),
                        function() {
                            var e, r, i;
                            do {
                                i = (e = 2 * Math.random() - 1) * e + (r = 2 * Math.random() - 1) * r
                            } while (!i || i > 1);
                            return n + t * e * Math.sqrt(-2 * Math.log(i) / i)
                        }
                    },
                    logNormal: function() {
                        var n = Ki.random.normal.apply(Ki, arguments);
                        return function() {
                            return Math.exp(n())
                        }
                    },
                    bates: function(n) {
                        var t = Ki.random.irwinHall(n);
                        return function() {
                            return t() / n
                        }
                    },
                    irwinHall: function(n) {
                        return function() {
                            for (var t = 0, e = 0; n > e; e++)
                                t += Math.random();
                            return t
                        }
                    }
                },
                Ki.scale = {};
                var cu = {
                    floor: M,
                    ceil: M
                };
                Ki.scale.linear = function() {
                    return function n(t, e, r, i) {
                        function o() {
                            var n = Math.min(t.length, e.length) > 2 ? ii : ti
                              , o = i ? pr : hr;
                            return u = n(t, e, o, r),
                            l = n(e, t, o, Ge),
                            a
                        }
                        function a(n) {
                            return u(n)
                        }
                        var u, l;
                        return a.invert = function(n) {
                            return l(n)
                        }
                        ,
                        a.domain = function(n) {
                            return arguments.length ? (t = n.map(Number),
                            o()) : t
                        }
                        ,
                        a.range = function(n) {
                            return arguments.length ? (e = n,
                            o()) : e
                        }
                        ,
                        a.rangeRound = function(n) {
                            return a.range(n).interpolate(ar)
                        }
                        ,
                        a.clamp = function(n) {
                            return arguments.length ? (i = n,
                            o()) : i
                        }
                        ,
                        a.interpolate = function(n) {
                            return arguments.length ? (r = n,
                            o()) : r
                        }
                        ,
                        a.ticks = function(n) {
                            return li(t, n)
                        }
                        ,
                        a.tickFormat = function(n, e) {
                            return si(t, n, e)
                        }
                        ,
                        a.nice = function(n) {
                            return ai(t, n),
                            o()
                        }
                        ,
                        a.copy = function() {
                            return n(t, e, r, i)
                        }
                        ,
                        o()
                    }([0, 1], [0, 1], Ge, !1)
                }
                ;
                var fu = {
                    s: 1,
                    g: 1,
                    p: 1,
                    r: 1,
                    e: 1
                };
                Ki.scale.log = function() {
                    return function n(t, e, r, i) {
                        function o(n) {
                            return (r ? Math.log(0 > n ? 0 : n) : -Math.log(n > 0 ? 0 : -n)) / Math.log(e)
                        }
                        function a(n) {
                            return r ? Math.pow(e, n) : -Math.pow(e, -n)
                        }
                        function u(n) {
                            return t(o(n))
                        }
                        return u.invert = function(n) {
                            return a(t.invert(n))
                        }
                        ,
                        u.domain = function(n) {
                            return arguments.length ? (r = n[0] >= 0,
                            t.domain((i = n.map(Number)).map(o)),
                            u) : i
                        }
                        ,
                        u.base = function(n) {
                            return arguments.length ? (e = +n,
                            t.domain(i.map(o)),
                            u) : e
                        }
                        ,
                        u.nice = function() {
                            var n = ei(i.map(o), r ? Math : pu);
                            return t.domain(n),
                            i = n.map(a),
                            u
                        }
                        ,
                        u.ticks = function() {
                            var n = Qr(i)
                              , t = []
                              , u = n[0]
                              , l = n[1]
                              , s = Math.floor(o(u))
                              , c = Math.ceil(o(l))
                              , f = e % 1 ? 2 : e;
                            if (isFinite(c - s)) {
                                if (r) {
                                    for (; c > s; s++)
                                        for (var h = 1; f > h; h++)
                                            t.push(a(s) * h);
                                    t.push(a(s))
                                } else
                                    for (t.push(a(s)); s++ < c; )
                                        for (h = f - 1; h > 0; h--)
                                            t.push(a(s) * h);
                                for (s = 0; t[s] < u; s++)
                                    ;
                                for (c = t.length; t[c - 1] > l; c--)
                                    ;
                                t = t.slice(s, c)
                            }
                            return t
                        }
                        ,
                        u.tickFormat = function(n, t) {
                            if (!arguments.length)
                                return hu;
                            arguments.length < 2 ? t = hu : "function" != typeof t && (t = Ki.format(t));
                            var r = Math.max(1, e * n / u.ticks().length);
                            return function(n) {
                                var i = n / a(Math.round(o(n)));
                                return e - .5 > i * e && (i *= e),
                                r >= i ? t(n) : ""
                            }
                        }
                        ,
                        u.copy = function() {
                            return n(t.copy(), e, r, i)
                        }
                        ,
                        oi(u, t)
                    }(Ki.scale.linear().domain([0, 1]), 10, !0, [1, 10])
                }
                ;
                var hu = Ki.format(".0e")
                  , pu = {
                    floor: function(n) {
                        return -Math.ceil(-n)
                    },
                    ceil: function(n) {
                        return -Math.floor(-n)
                    }
                };
                Ki.scale.pow = function() {
                    return function n(t, e, r) {
                        function i(n) {
                            return t(o(n))
                        }
                        var o = fi(e)
                          , a = fi(1 / e);
                        return i.invert = function(n) {
                            return a(t.invert(n))
                        }
                        ,
                        i.domain = function(n) {
                            return arguments.length ? (t.domain((r = n.map(Number)).map(o)),
                            i) : r
                        }
                        ,
                        i.ticks = function(n) {
                            return li(r, n)
                        }
                        ,
                        i.tickFormat = function(n, t) {
                            return si(r, n, t)
                        }
                        ,
                        i.nice = function(n) {
                            return i.domain(ai(r, n))
                        }
                        ,
                        i.exponent = function(n) {
                            return arguments.length ? (o = fi(e = n),
                            a = fi(1 / e),
                            t.domain(r.map(o)),
                            i) : e
                        }
                        ,
                        i.copy = function() {
                            return n(t.copy(), e, r)
                        }
                        ,
                        oi(i, t)
                    }(Ki.scale.linear(), 1, [0, 1])
                }
                ,
                Ki.scale.sqrt = function() {
                    return Ki.scale.pow().exponent(.5)
                }
                ,
                Ki.scale.ordinal = function() {
                    return function n(t, e) {
                        function r(n) {
                            return a[((o.get(n) || ("range" === e.t ? o.set(n, t.push(n)) : NaN)) - 1) % a.length]
                        }
                        function i(n, e) {
                            return Ki.range(t.length).map(function(t) {
                                return n + e * t
                            })
                        }
                        var o, a, u;
                        return r.domain = function(n) {
                            if (!arguments.length)
                                return t;
                            t = [],
                            o = new p;
                            for (var i, a = -1, u = n.length; ++a < u; )
                                o.has(i = n[a]) || o.set(i, t.push(i));
                            return r[e.t].apply(r, e.a)
                        }
                        ,
                        r.range = function(n) {
                            return arguments.length ? (a = n,
                            u = 0,
                            e = {
                                t: "range",
                                a: arguments
                            },
                            r) : a
                        }
                        ,
                        r.rangePoints = function(n, o) {
                            arguments.length < 2 && (o = 0);
                            var l = n[0]
                              , s = n[1]
                              , c = t.length < 2 ? (l = (l + s) / 2,
                            0) : (s - l) / (t.length - 1 + o);
                            return a = i(l + c * o / 2, c),
                            u = 0,
                            e = {
                                t: "rangePoints",
                                a: arguments
                            },
                            r
                        }
                        ,
                        r.rangeRoundPoints = function(n, o) {
                            arguments.length < 2 && (o = 0);
                            var l = n[0]
                              , s = n[1]
                              , c = t.length < 2 ? (l = s = Math.round((l + s) / 2),
                            0) : (s - l) / (t.length - 1 + o) | 0;
                            return a = i(l + Math.round(c * o / 2 + (s - l - (t.length - 1 + o) * c) / 2), c),
                            u = 0,
                            e = {
                                t: "rangeRoundPoints",
                                a: arguments
                            },
                            r
                        }
                        ,
                        r.rangeBands = function(n, o, l) {
                            arguments.length < 2 && (o = 0),
                            arguments.length < 3 && (l = o);
                            var s = n[1] < n[0]
                              , c = n[s - 0]
                              , f = (n[1 - s] - c) / (t.length - o + 2 * l);
                            return a = i(c + f * l, f),
                            s && a.reverse(),
                            u = f * (1 - o),
                            e = {
                                t: "rangeBands",
                                a: arguments
                            },
                            r
                        }
                        ,
                        r.rangeRoundBands = function(n, o, l) {
                            arguments.length < 2 && (o = 0),
                            arguments.length < 3 && (l = o);
                            var s = n[1] < n[0]
                              , c = n[s - 0]
                              , f = n[1 - s]
                              , h = Math.floor((f - c) / (t.length - o + 2 * l));
                            return a = i(c + Math.round((f - c - (t.length - o) * h) / 2), h),
                            s && a.reverse(),
                            u = Math.round(h * (1 - o)),
                            e = {
                                t: "rangeRoundBands",
                                a: arguments
                            },
                            r
                        }
                        ,
                        r.rangeBand = function() {
                            return u
                        }
                        ,
                        r.rangeExtent = function() {
                            return Qr(e.a[0])
                        }
                        ,
                        r.copy = function() {
                            return n(t, e)
                        }
                        ,
                        r.domain(t)
                    }([], {
                        t: "range",
                        a: [[]]
                    })
                }
                ,
                Ki.scale.category10 = function() {
                    return Ki.scale.ordinal().range(du)
                }
                ,
                Ki.scale.category20 = function() {
                    return Ki.scale.ordinal().range(gu)
                }
                ,
                Ki.scale.category20b = function() {
                    return Ki.scale.ordinal().range(vu)
                }
                ,
                Ki.scale.category20c = function() {
                    return Ki.scale.ordinal().range(mu)
                }
                ;
                var du = [2062260, 16744206, 2924588, 14034728, 9725885, 9197131, 14907330, 8355711, 12369186, 1556175].map(bn)
                  , gu = [2062260, 11454440, 16744206, 16759672, 2924588, 10018698, 14034728, 16750742, 9725885, 12955861, 9197131, 12885140, 14907330, 16234194, 8355711, 13092807, 12369186, 14408589, 1556175, 10410725].map(bn)
                  , vu = [3750777, 5395619, 7040719, 10264286, 6519097, 9216594, 11915115, 13556636, 9202993, 12426809, 15186514, 15190932, 8666169, 11356490, 14049643, 15177372, 8077683, 10834324, 13528509, 14589654].map(bn)
                  , mu = [3244733, 7057110, 10406625, 13032431, 15095053, 16616764, 16625259, 16634018, 3253076, 7652470, 10607003, 13101504, 7695281, 10394312, 12369372, 14342891, 6513507, 9868950, 12434877, 14277081].map(bn);
                Ki.scale.quantile = function() {
                    return function n(t, e) {
                        function r() {
                            var n = 0
                              , r = e.length;
                            for (o = []; ++n < r; )
                                o[n - 1] = Ki.quantile(t, n / r);
                            return i
                        }
                        function i(n) {
                            return isNaN(n = +n) ? void 0 : e[Ki.bisect(o, n)]
                        }
                        var o;
                        return i.domain = function(n) {
                            return arguments.length ? (t = n.map(l).filter(s).sort(u),
                            r()) : t
                        }
                        ,
                        i.range = function(n) {
                            return arguments.length ? (e = n,
                            r()) : e
                        }
                        ,
                        i.quantiles = function() {
                            return o
                        }
                        ,
                        i.invertExtent = function(n) {
                            return 0 > (n = e.indexOf(n)) ? [NaN, NaN] : [n > 0 ? o[n - 1] : t[0], n < o.length ? o[n] : t[t.length - 1]]
                        }
                        ,
                        i.copy = function() {
                            return n(t, e)
                        }
                        ,
                        r()
                    }([], [])
                }
                ,
                Ki.scale.quantize = function() {
                    return function n(t, e, r) {
                        function i(n) {
                            return r[Math.max(0, Math.min(u, Math.floor(a * (n - t))))]
                        }
                        function o() {
                            return a = r.length / (e - t),
                            u = r.length - 1,
                            i
                        }
                        var a, u;
                        return i.domain = function(n) {
                            return arguments.length ? (t = +n[0],
                            e = +n[n.length - 1],
                            o()) : [t, e]
                        }
                        ,
                        i.range = function(n) {
                            return arguments.length ? (r = n,
                            o()) : r
                        }
                        ,
                        i.invertExtent = function(n) {
                            return [n = 0 > (n = r.indexOf(n)) ? NaN : n / a + t, n + 1 / a]
                        }
                        ,
                        i.copy = function() {
                            return n(t, e, r)
                        }
                        ,
                        o()
                    }(0, 1, [0, 1])
                }
                ,
                Ki.scale.threshold = function() {
                    return function n(t, e) {
                        function r(n) {
                            return n >= n ? e[Ki.bisect(t, n)] : void 0
                        }
                        return r.domain = function(n) {
                            return arguments.length ? (t = n,
                            r) : t
                        }
                        ,
                        r.range = function(n) {
                            return arguments.length ? (e = n,
                            r) : e
                        }
                        ,
                        r.invertExtent = function(n) {
                            return n = e.indexOf(n),
                            [t[n - 1], t[n]]
                        }
                        ,
                        r.copy = function() {
                            return n(t, e)
                        }
                        ,
                        r
                    }([.5], [0, 1])
                }
                ,
                Ki.scale.identity = function() {
                    return function n(t) {
                        function e(n) {
                            return +n
                        }
                        return e.invert = e,
                        e.domain = e.range = function(n) {
                            return arguments.length ? (t = n.map(e),
                            e) : t
                        }
                        ,
                        e.ticks = function(n) {
                            return li(t, n)
                        }
                        ,
                        e.tickFormat = function(n, e) {
                            return si(t, n, e)
                        }
                        ,
                        e.copy = function() {
                            return n(t)
                        }
                        ,
                        e
                    }([0, 1])
                }
                ,
                Ki.svg = {},
                Ki.svg.arc = function() {
                    function n() {
                        var n = Math.max(0, +e.apply(this, arguments))
                          , s = Math.max(0, +r.apply(this, arguments))
                          , c = a.apply(this, arguments) - To
                          , f = u.apply(this, arguments) - To
                          , h = Math.abs(f - c)
                          , p = c > f ? 0 : 1;
                        if (n > s && (d = s,
                        s = n,
                        n = d),
                        h >= Eo)
                            return t(s, p) + (n ? t(n, 1 - p) : "") + "Z";
                        var d, g, v, m, y, x, b, k, M, w, _, N, S = 0, A = 0, L = [];
                        if ((m = (+l.apply(this, arguments) || 0) / 2) && (v = o === yu ? Math.sqrt(n * n + s * s) : +o.apply(this, arguments),
                        p || (A *= -1),
                        s && (A = rn(v / s * Math.sin(m))),
                        n && (S = rn(v / n * Math.sin(m)))),
                        s) {
                            y = s * Math.cos(c + A),
                            x = s * Math.sin(c + A),
                            b = s * Math.cos(f - A),
                            k = s * Math.sin(f - A);
                            var E = Math.abs(f - c - 2 * A) <= Ao ? 0 : 1;
                            if (A && yi(y, x, b, k) === p ^ E) {
                                var T = (c + f) / 2;
                                y = s * Math.cos(T),
                                x = s * Math.sin(T),
                                b = k = null
                            }
                        } else
                            y = x = 0;
                        if (n) {
                            M = n * Math.cos(f - S),
                            w = n * Math.sin(f - S),
                            _ = n * Math.cos(c + S),
                            N = n * Math.sin(c + S);
                            var C = Math.abs(c - f + 2 * S) <= Ao ? 0 : 1;
                            if (S && yi(M, w, _, N) === 1 - p ^ C) {
                                var z = (c + f) / 2;
                                M = n * Math.cos(z),
                                w = n * Math.sin(z),
                                _ = N = null
                            }
                        } else
                            M = w = 0;
                        if (h > No && (d = Math.min(Math.abs(s - n) / 2, +i.apply(this, arguments))) > .001) {
                            g = s > n ^ p ? 0 : 1;
                            var P = d
                              , O = d;
                            if (Ao > h) {
                                var q = null == _ ? [M, w] : null == b ? [y, x] : me([y, x], [_, N], [b, k], [M, w])
                                  , R = y - q[0]
                                  , j = x - q[1]
                                  , U = b - q[0]
                                  , D = k - q[1]
                                  , F = 1 / Math.sin(Math.acos((R * U + j * D) / (Math.sqrt(R * R + j * j) * Math.sqrt(U * U + D * D))) / 2)
                                  , I = Math.sqrt(q[0] * q[0] + q[1] * q[1]);
                                O = Math.min(d, (n - I) / (F - 1)),
                                P = Math.min(d, (s - I) / (F + 1))
                            }
                            if (null != b) {
                                var H = xi(null == _ ? [M, w] : [_, N], [y, x], s, P, p)
                                  , B = xi([b, k], [M, w], s, P, p);
                                d === P ? L.push("M", H[0], "A", P, ",", P, " 0 0,", g, " ", H[1], "A", s, ",", s, " 0 ", 1 - p ^ yi(H[1][0], H[1][1], B[1][0], B[1][1]), ",", p, " ", B[1], "A", P, ",", P, " 0 0,", g, " ", B[0]) : L.push("M", H[0], "A", P, ",", P, " 0 1,", g, " ", B[0])
                            } else
                                L.push("M", y, ",", x);
                            if (null != _) {
                                var V = xi([y, x], [_, N], n, -O, p)
                                  , Y = xi([M, w], null == b ? [y, x] : [b, k], n, -O, p);
                                d === O ? L.push("L", Y[0], "A", O, ",", O, " 0 0,", g, " ", Y[1], "A", n, ",", n, " 0 ", p ^ yi(Y[1][0], Y[1][1], V[1][0], V[1][1]), ",", 1 - p, " ", V[1], "A", O, ",", O, " 0 0,", g, " ", V[0]) : L.push("L", Y[0], "A", O, ",", O, " 0 0,", g, " ", V[0])
                            } else
                                L.push("L", M, ",", w)
                        } else
                            L.push("M", y, ",", x),
                            null != b && L.push("A", s, ",", s, " 0 ", E, ",", p, " ", b, ",", k),
                            L.push("L", M, ",", w),
                            null != _ && L.push("A", n, ",", n, " 0 ", C, ",", 1 - p, " ", _, ",", N);
                        return L.push("Z"),
                        L.join("")
                    }
                    function t(n, t) {
                        return "M0," + n + "A" + n + "," + n + " 0 1," + t + " 0," + -n + "A" + n + "," + n + " 0 1," + t + " 0," + n
                    }
                    var e = pi
                      , r = di
                      , i = hi
                      , o = yu
                      , a = gi
                      , u = vi
                      , l = mi;
                    return n.innerRadius = function(t) {
                        return arguments.length ? (e = An(t),
                        n) : e
                    }
                    ,
                    n.outerRadius = function(t) {
                        return arguments.length ? (r = An(t),
                        n) : r
                    }
                    ,
                    n.cornerRadius = function(t) {
                        return arguments.length ? (i = An(t),
                        n) : i
                    }
                    ,
                    n.padRadius = function(t) {
                        return arguments.length ? (o = t == yu ? yu : An(t),
                        n) : o
                    }
                    ,
                    n.startAngle = function(t) {
                        return arguments.length ? (a = An(t),
                        n) : a
                    }
                    ,
                    n.endAngle = function(t) {
                        return arguments.length ? (u = An(t),
                        n) : u
                    }
                    ,
                    n.padAngle = function(t) {
                        return arguments.length ? (l = An(t),
                        n) : l
                    }
                    ,
                    n.centroid = function() {
                        var n = (+e.apply(this, arguments) + +r.apply(this, arguments)) / 2
                          , t = (+a.apply(this, arguments) + +u.apply(this, arguments)) / 2 - To;
                        return [Math.cos(t) * n, Math.sin(t) * n]
                    }
                    ,
                    n
                }
                ;
                var yu = "auto";
                Ki.svg.line = function() {
                    return bi(M)
                }
                ;
                var xu = Ki.map({
                    linear: ki,
                    "linear-closed": Mi,
                    step: function(n) {
                        for (var t = 0, e = n.length, r = n[0], i = [r[0], ",", r[1]]; ++t < e; )
                            i.push("H", (r[0] + (r = n[t])[0]) / 2, "V", r[1]);
                        return e > 1 && i.push("H", r[0]),
                        i.join("")
                    },
                    "step-before": wi,
                    "step-after": _i,
                    basis: Ai,
                    "basis-open": function(n) {
                        if (n.length < 4)
                            return ki(n);
                        for (var t, e = [], r = -1, i = n.length, o = [0], a = [0]; ++r < 3; )
                            t = n[r],
                            o.push(t[0]),
                            a.push(t[1]);
                        for (e.push(Li(Mu, o) + "," + Li(Mu, a)),
                        --r; ++r < i; )
                            t = n[r],
                            o.shift(),
                            o.push(t[0]),
                            a.shift(),
                            a.push(t[1]),
                            Ei(e, o, a);
                        return e.join("")
                    },
                    "basis-closed": function(n) {
                        for (var t, e, r = -1, i = n.length, o = i + 4, a = [], u = []; ++r < 4; )
                            e = n[r % i],
                            a.push(e[0]),
                            u.push(e[1]);
                        for (t = [Li(Mu, a), ",", Li(Mu, u)],
                        --r; ++r < o; )
                            e = n[r % i],
                            a.shift(),
                            a.push(e[0]),
                            u.shift(),
                            u.push(e[1]),
                            Ei(t, a, u);
                        return t.join("")
                    },
                    bundle: function(n, t) {
                        var e = n.length - 1;
                        if (e)
                            for (var r, i, o = n[0][0], a = n[0][1], u = n[e][0] - o, l = n[e][1] - a, s = -1; ++s <= e; )
                                i = s / e,
                                (r = n[s])[0] = t * r[0] + (1 - t) * (o + i * u),
                                r[1] = t * r[1] + (1 - t) * (a + i * l);
                        return Ai(n)
                    },
                    cardinal: function(n, t) {
                        return n.length < 3 ? ki(n) : n[0] + Ni(n, Si(n, t))
                    },
                    "cardinal-open": function(n, t) {
                        return n.length < 4 ? ki(n) : n[1] + Ni(n.slice(1, -1), Si(n, t))
                    },
                    "cardinal-closed": function(n, t) {
                        return n.length < 3 ? Mi(n) : n[0] + Ni((n.push(n[0]),
                        n), Si([n[n.length - 2]].concat(n, [n[1]]), t))
                    },
                    monotone: function(n) {
                        return n.length < 3 ? ki(n) : n[0] + Ni(n, Ci(n))
                    }
                });
                xu.forEach(function(n, t) {
                    t.key = n,
                    t.closed = /-closed$/.test(n)
                });
                var bu = [0, 2 / 3, 1 / 3, 0]
                  , ku = [0, 1 / 3, 2 / 3, 0]
                  , Mu = [0, 1 / 6, 2 / 3, 1 / 6];
                Ki.svg.line.radial = function() {
                    var n = bi(zi);
                    return n.radius = n.x,
                    delete n.x,
                    n.angle = n.y,
                    delete n.y,
                    n
                }
                ,
                wi.reverse = _i,
                _i.reverse = wi,
                Ki.svg.area = function() {
                    return Pi(M)
                }
                ,
                Ki.svg.area.radial = function() {
                    var n = Pi(zi);
                    return n.radius = n.x,
                    delete n.x,
                    n.innerRadius = n.x0,
                    delete n.x0,
                    n.outerRadius = n.x1,
                    delete n.x1,
                    n.angle = n.y,
                    delete n.y,
                    n.startAngle = n.y0,
                    delete n.y0,
                    n.endAngle = n.y1,
                    delete n.y1,
                    n
                }
                ,
                Ki.svg.chord = function() {
                    function n(n, a) {
                        var u = t(this, i, n, a)
                          , l = t(this, o, n, a);
                        return "M" + u.p0 + e(u.r, u.p1, u.a1 - u.a0) + (function(n, t) {
                            return n.a0 == t.a0 && n.a1 == t.a1
                        }(u, l) ? r(u.r, u.p1, u.r, u.p0) : r(u.r, u.p1, l.r, l.p0) + e(l.r, l.p1, l.a1 - l.a0) + r(l.r, l.p1, u.r, u.p0)) + "Z"
                    }
                    function t(n, t, e, r) {
                        var i = t.call(n, e, r)
                          , o = a.call(n, i, r)
                          , s = u.call(n, i, r) - To
                          , c = l.call(n, i, r) - To;
                        return {
                            r: o,
                            a0: s,
                            a1: c,
                            p0: [o * Math.cos(s), o * Math.sin(s)],
                            p1: [o * Math.cos(c), o * Math.sin(c)]
                        }
                    }
                    function e(n, t, e) {
                        return "A" + n + "," + n + " 0 " + +(e > Ao) + ",1 " + t
                    }
                    function r(n, t, e, r) {
                        return "Q 0,0 " + r
                    }
                    var i = ie
                      , o = oe
                      , a = Oi
                      , u = gi
                      , l = vi;
                    return n.radius = function(t) {
                        return arguments.length ? (a = An(t),
                        n) : a
                    }
                    ,
                    n.source = function(t) {
                        return arguments.length ? (i = An(t),
                        n) : i
                    }
                    ,
                    n.target = function(t) {
                        return arguments.length ? (o = An(t),
                        n) : o
                    }
                    ,
                    n.startAngle = function(t) {
                        return arguments.length ? (u = An(t),
                        n) : u
                    }
                    ,
                    n.endAngle = function(t) {
                        return arguments.length ? (l = An(t),
                        n) : l
                    }
                    ,
                    n
                }
                ,
                Ki.svg.diagonal = function() {
                    function n(n, i) {
                        var o = t.call(this, n, i)
                          , a = e.call(this, n, i)
                          , u = (o.y + a.y) / 2
                          , l = [o, {
                            x: o.x,
                            y: u
                        }, {
                            x: a.x,
                            y: u
                        }, a];
                        return "M" + (l = l.map(r))[0] + "C" + l[1] + " " + l[2] + " " + l[3]
                    }
                    var t = ie
                      , e = oe
                      , r = qi;
                    return n.source = function(e) {
                        return arguments.length ? (t = An(e),
                        n) : t
                    }
                    ,
                    n.target = function(t) {
                        return arguments.length ? (e = An(t),
                        n) : e
                    }
                    ,
                    n.projection = function(t) {
                        return arguments.length ? (r = t,
                        n) : r
                    }
                    ,
                    n
                }
                ,
                Ki.svg.diagonal.radial = function() {
                    var n = Ki.svg.diagonal()
                      , t = qi
                      , e = n.projection;
                    return n.projection = function(n) {
                        return arguments.length ? e(function(n) {
                            return function() {
                                var t = n.apply(this, arguments)
                                  , e = t[0]
                                  , r = t[1] - To;
                                return [e * Math.cos(r), e * Math.sin(r)]
                            }
                        }(t = n)) : t
                    }
                    ,
                    n
                }
                ,
                Ki.svg.symbol = function() {
                    function n(n, r) {
                        return (wu.get(t.call(this, n, r)) || Ui)(e.call(this, n, r))
                    }
                    var t = ji
                      , e = Ri;
                    return n.type = function(e) {
                        return arguments.length ? (t = An(e),
                        n) : t
                    }
                    ,
                    n.size = function(t) {
                        return arguments.length ? (e = An(t),
                        n) : e
                    }
                    ,
                    n
                }
                ;
                var wu = Ki.map({
                    circle: Ui,
                    cross: function(n) {
                        var t = Math.sqrt(n / 5) / 2;
                        return "M" + -3 * t + "," + -t + "H" + -t + "V" + -3 * t + "H" + t + "V" + -t + "H" + 3 * t + "V" + t + "H" + t + "V" + 3 * t + "H" + -t + "V" + t + "H" + -3 * t + "Z"
                    },
                    diamond: function(n) {
                        var t = Math.sqrt(n / (2 * Nu))
                          , e = t * Nu;
                        return "M0," + -t + "L" + e + ",0 0," + t + " " + -e + ",0Z"
                    },
                    square: function(n) {
                        var t = Math.sqrt(n) / 2;
                        return "M" + -t + "," + -t + "L" + t + "," + -t + " " + t + "," + t + " " + -t + "," + t + "Z"
                    },
                    "triangle-down": function(n) {
                        var t = Math.sqrt(n / _u)
                          , e = t * _u / 2;
                        return "M0," + e + "L" + t + "," + -e + " " + -t + "," + -e + "Z"
                    },
                    "triangle-up": function(n) {
                        var t = Math.sqrt(n / _u)
                          , e = t * _u / 2;
                        return "M0," + -e + "L" + t + "," + e + " " + -t + "," + e + "Z"
                    }
                });
                Ki.svg.symbolTypes = wu.keys();
                var _u = Math.sqrt(3)
                  , Nu = Math.tan(30 * Co);
                yo.transition = function(n) {
                    for (var t, e, r = Su || ++Tu, i = Bi(n), o = [], a = Au || {
                        time: Date.now(),
                        ease: tr,
                        delay: 0,
                        duration: 250
                    }, u = -1, l = this.length; ++u < l; ) {
                        o.push(t = []);
                        for (var s = this[u], c = -1, f = s.length; ++c < f; )
                            (e = s[c]) && Vi(e, c, i, r, a),
                            t.push(e)
                    }
                    return Fi(o, i, r)
                }
                ,
                yo.interrupt = function(n) {
                    return this.each(null == n ? Lu : Di(Bi(n)))
                }
                ;
                var Su, Au, Lu = Di(Bi()), Eu = [], Tu = 0;
                Eu.call = yo.call,
                Eu.empty = yo.empty,
                Eu.node = yo.node,
                Eu.size = yo.size,
                Ki.transition = function(n, t) {
                    return n && n.transition ? Su ? n.transition(t) : n : Ki.selection().transition(n)
                }
                ,
                Ki.transition.prototype = Eu,
                Eu.select = function(n) {
                    var t, e, r, i = this.id, o = this.namespace, a = [];
                    n = z(n);
                    for (var u = -1, l = this.length; ++u < l; ) {
                        a.push(t = []);
                        for (var s = this[u], c = -1, f = s.length; ++c < f; )
                            (r = s[c]) && (e = n.call(r, r.__data__, c, u)) ? ("__data__"in r && (e.__data__ = r.__data__),
                            Vi(e, c, o, i, r[o][i]),
                            t.push(e)) : t.push(null)
                    }
                    return Fi(a, o, i)
                }
                ,
                Eu.selectAll = function(n) {
                    var t, e, r, i, o, a = this.id, u = this.namespace, l = [];
                    n = P(n);
                    for (var s = -1, c = this.length; ++s < c; )
                        for (var f = this[s], h = -1, p = f.length; ++h < p; )
                            if (r = f[h]) {
                                o = r[u][a],
                                e = n.call(r, r.__data__, h, s),
                                l.push(t = []);
                                for (var d = -1, g = e.length; ++d < g; )
                                    (i = e[d]) && Vi(i, d, u, a, o),
                                    t.push(i)
                            }
                    return Fi(l, u, a)
                }
                ,
                Eu.filter = function(n) {
                    var t, e, r = [];
                    "function" != typeof n && (n = Y(n));
                    for (var i = 0, o = this.length; o > i; i++) {
                        r.push(t = []);
                        for (var a, u = 0, l = (a = this[i]).length; l > u; u++)
                            (e = a[u]) && n.call(e, e.__data__, u, i) && t.push(e)
                    }
                    return Fi(r, this.namespace, this.id)
                }
                ,
                Eu.tween = function(n, t) {
                    var e = this.id
                      , r = this.namespace;
                    return arguments.length < 2 ? this.node()[r][e].tween.get(n) : X(this, null == t ? function(t) {
                        t[r][e].tween.remove(n)
                    }
                    : function(i) {
                        i[r][e].tween.set(n, t)
                    }
                    )
                }
                ,
                Eu.attr = function(n, t) {
                    function e() {
                        this.removeAttribute(o)
                    }
                    function r() {
                        this.removeAttributeNS(o.space, o.local)
                    }
                    if (arguments.length < 2) {
                        for (t in n)
                            this.attr(t, n[t]);
                        return this
                    }
                    var i = "transform" == n ? fr : Ge
                      , o = Ki.ns.qualify(n);
                    return Ii(this, "attr." + n, t, o.local ? function(n) {
                        return null == n ? r : (n += "",
                        function() {
                            var t, e = this.getAttributeNS(o.space, o.local);
                            return e !== n && (t = i(e, n),
                            function(n) {
                                this.setAttributeNS(o.space, o.local, t(n))
                            }
                            )
                        }
                        )
                    }
                    : function(n) {
                        return null == n ? e : (n += "",
                        function() {
                            var t, e = this.getAttribute(o);
                            return e !== n && (t = i(e, n),
                            function(n) {
                                this.setAttribute(o, t(n))
                            }
                            )
                        }
                        )
                    }
                    )
                }
                ,
                Eu.attrTween = function(n, t) {
                    var e = Ki.ns.qualify(n);
                    return this.tween("attr." + n, e.local ? function(n, r) {
                        var i = t.call(this, n, r, this.getAttributeNS(e.space, e.local));
                        return i && function(n) {
                            this.setAttributeNS(e.space, e.local, i(n))
                        }
                    }
                    : function(n, r) {
                        var i = t.call(this, n, r, this.getAttribute(e));
                        return i && function(n) {
                            this.setAttribute(e, i(n))
                        }
                    }
                    )
                }
                ,
                Eu.style = function(n, t, e) {
                    function r() {
                        this.style.removeProperty(n)
                    }
                    var i = arguments.length;
                    if (3 > i) {
                        if ("string" != typeof n) {
                            for (e in 2 > i && (t = ""),
                            n)
                                this.style(e, n[e], t);
                            return this
                        }
                        e = ""
                    }
                    return Ii(this, "style." + n, t, function(t) {
                        return null == t ? r : (t += "",
                        function() {
                            var r, i = a(this).getComputedStyle(this, null).getPropertyValue(n);
                            return i !== t && (r = Ge(i, t),
                            function(t) {
                                this.style.setProperty(n, r(t), e)
                            }
                            )
                        }
                        )
                    })
                }
                ,
                Eu.styleTween = function(n, t, e) {
                    return arguments.length < 3 && (e = ""),
                    this.tween("style." + n, function(r, i) {
                        var o = t.call(this, r, i, a(this).getComputedStyle(this, null).getPropertyValue(n));
                        return o && function(t) {
                            this.style.setProperty(n, o(t), e)
                        }
                    })
                }
                ,
                Eu.text = function(n) {
                    return Ii(this, "text", n, Hi)
                }
                ,
                Eu.remove = function() {
                    var n = this.namespace;
                    return this.each("end.transition", function() {
                        var t;
                        this[n].count < 2 && (t = this.parentNode) && t.removeChild(this)
                    })
                }
                ,
                Eu.ease = function(n) {
                    var t = this.id
                      , e = this.namespace;
                    return arguments.length < 1 ? this.node()[e][t].ease : ("function" != typeof n && (n = Ki.ease.apply(Ki, arguments)),
                    X(this, function(r) {
                        r[e][t].ease = n
                    }))
                }
                ,
                Eu.delay = function(n) {
                    var t = this.id
                      , e = this.namespace;
                    return arguments.length < 1 ? this.node()[e][t].delay : X(this, "function" == typeof n ? function(r, i, o) {
                        r[e][t].delay = +n.call(r, r.__data__, i, o)
                    }
                    : (n = +n,
                    function(r) {
                        r[e][t].delay = n
                    }
                    ))
                }
                ,
                Eu.duration = function(n) {
                    var t = this.id
                      , e = this.namespace;
                    return arguments.length < 1 ? this.node()[e][t].duration : X(this, "function" == typeof n ? function(r, i, o) {
                        r[e][t].duration = Math.max(1, n.call(r, r.__data__, i, o))
                    }
                    : (n = Math.max(1, n),
                    function(r) {
                        r[e][t].duration = n
                    }
                    ))
                }
                ,
                Eu.each = function(n, t) {
                    var e = this.id
                      , r = this.namespace;
                    if (arguments.length < 2) {
                        var i = Au
                          , o = Su;
                        try {
                            Su = e,
                            X(this, function(t, i, o) {
                                Au = t[r][e],
                                n.call(t, t.__data__, i, o)
                            })
                        } finally {
                            Au = i,
                            Su = o
                        }
                    } else
                        X(this, function(i) {
                            var o = i[r][e];
                            (o.event || (o.event = Ki.dispatch("start", "end", "interrupt"))).on(n, t)
                        });
                    return this
                }
                ,
                Eu.transition = function() {
                    for (var n, t, e, r = this.id, i = ++Tu, o = this.namespace, a = [], u = 0, l = this.length; l > u; u++) {
                        a.push(n = []);
                        for (var s, c = 0, f = (s = this[u]).length; f > c; c++)
                            (t = s[c]) && Vi(t, c, o, i, {
                                time: (e = t[o][r]).time,
                                ease: e.ease,
                                delay: e.delay + e.duration,
                                duration: e.duration
                            }),
                            n.push(t)
                    }
                    return Fi(a, o, i)
                }
                ,
                Ki.svg.axis = function() {
                    function n(n) {
                        n.each(function() {
                            var n, s = Ki.select(this), c = this.__chart__ || e, f = this.__chart__ = e.copy(), h = null == l ? f.ticks ? f.ticks.apply(f, u) : f.domain() : l, p = null == t ? f.tickFormat ? f.tickFormat.apply(f, u) : M : t, d = s.selectAll(".tick").data(h, f), g = d.enter().insert("g", ".domain").attr("class", "tick").style("opacity", No), v = Ki.transition(d.exit()).style("opacity", No).remove(), m = Ki.transition(d.order()).style("opacity", 1), y = Math.max(i, 0) + a, x = ni(f), b = s.selectAll(".domain").data([0]), k = (b.enter().append("path").attr("class", "domain"),
                            Ki.transition(b));
                            g.append("line"),
                            g.append("text");
                            var w, _, N, S, A = g.select("line"), L = m.select("line"), E = d.select("text").text(p), T = g.select("text"), C = m.select("text"), z = "top" === r || "left" === r ? -1 : 1;
                            if ("bottom" === r || "top" === r ? (n = Yi,
                            w = "x",
                            N = "y",
                            _ = "x2",
                            S = "y2",
                            E.attr("dy", 0 > z ? "0em" : ".71em").style("text-anchor", "middle"),
                            k.attr("d", "M" + x[0] + "," + z * o + "V0H" + x[1] + "V" + z * o)) : (n = Xi,
                            w = "y",
                            N = "x",
                            _ = "y2",
                            S = "x2",
                            E.attr("dy", ".32em").style("text-anchor", 0 > z ? "end" : "start"),
                            k.attr("d", "M" + z * o + "," + x[0] + "H0V" + x[1] + "H" + z * o)),
                            A.attr(S, z * i),
                            T.attr(N, z * y),
                            L.attr(_, 0).attr(S, z * i),
                            C.attr(w, 0).attr(N, z * y),
                            f.rangeBand) {
                                var P = f
                                  , O = P.rangeBand() / 2;
                                c = f = function(n) {
                                    return P(n) + O
                                }
                            } else
                                c.rangeBand ? c = f : v.call(n, f, c);
                            g.call(n, c, f),
                            m.call(n, f, f)
                        })
                    }
                    var t, e = Ki.scale.linear(), r = Cu, i = 6, o = 6, a = 3, u = [10], l = null;
                    return n.scale = function(t) {
                        return arguments.length ? (e = t,
                        n) : e
                    }
                    ,
                    n.orient = function(t) {
                        return arguments.length ? (r = t in zu ? t + "" : Cu,
                        n) : r
                    }
                    ,
                    n.ticks = function() {
                        return arguments.length ? (u = no(arguments),
                        n) : u
                    }
                    ,
                    n.tickValues = function(t) {
                        return arguments.length ? (l = t,
                        n) : l
                    }
                    ,
                    n.tickFormat = function(e) {
                        return arguments.length ? (t = e,
                        n) : t
                    }
                    ,
                    n.tickSize = function(t) {
                        var e = arguments.length;
                        return e ? (i = +t,
                        o = +arguments[e - 1],
                        n) : i
                    }
                    ,
                    n.innerTickSize = function(t) {
                        return arguments.length ? (i = +t,
                        n) : i
                    }
                    ,
                    n.outerTickSize = function(t) {
                        return arguments.length ? (o = +t,
                        n) : o
                    }
                    ,
                    n.tickPadding = function(t) {
                        return arguments.length ? (a = +t,
                        n) : a
                    }
                    ,
                    n.tickSubdivide = function() {
                        return arguments.length && n
                    }
                    ,
                    n
                }
                ;
                var Cu = "bottom"
                  , zu = {
                    top: 1,
                    right: 1,
                    bottom: 1,
                    left: 1
                };
                Ki.svg.brush = function() {
                    function n(o) {
                        o.each(function() {
                            var o = Ki.select(this).style("pointer-events", "all").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)").on("mousedown.brush", i).on("touchstart.brush", i)
                              , a = o.selectAll(".background").data([0]);
                            a.enter().append("rect").attr("class", "background").style("visibility", "hidden").style("cursor", "crosshair"),
                            o.selectAll(".extent").data([0]).enter().append("rect").attr("class", "extent").style("cursor", "move");
                            var u = o.selectAll(".resize").data(g, M);
                            u.exit().remove(),
                            u.enter().append("g").attr("class", function(n) {
                                return "resize " + n
                            }).style("cursor", function(n) {
                                return Pu[n]
                            }).append("rect").attr("x", function(n) {
                                return /[ew]$/.test(n) ? -3 : null
                            }).attr("y", function(n) {
                                return /^[ns]/.test(n) ? -3 : null
                            }).attr("width", 6).attr("height", 6).style("visibility", "hidden"),
                            u.style("display", n.empty() ? "none" : null);
                            var l, f = Ki.transition(o), h = Ki.transition(a);
                            s && (l = ni(s),
                            h.attr("x", l[0]).attr("width", l[1] - l[0]),
                            e(f)),
                            c && (l = ni(c),
                            h.attr("y", l[0]).attr("height", l[1] - l[0]),
                            r(f)),
                            t(f)
                        })
                    }
                    function t(n) {
                        n.selectAll(".resize").attr("transform", function(n) {
                            return "translate(" + f[+/e$/.test(n)] + "," + h[+/^s/.test(n)] + ")"
                        })
                    }
                    function e(n) {
                        n.select(".extent").attr("x", f[0]),
                        n.selectAll(".extent,.n>rect,.s>rect").attr("width", f[1] - f[0])
                    }
                    function r(n) {
                        n.select(".extent").attr("y", h[0]),
                        n.selectAll(".extent,.e>rect,.w>rect").attr("height", h[1] - h[0])
                    }
                    function i() {
                        function i() {
                            var n = Ki.mouse(x)
                              , i = !1;
                            y && (n[0] += y[0],
                            n[1] += y[1]),
                            S || (Ki.event.altKey ? (m || (m = [(f[0] + f[1]) / 2, (h[0] + h[1]) / 2]),
                            E[0] = f[+(n[0] < m[0])],
                            E[1] = h[+(n[1] < m[1])]) : m = null),
                            _ && g(n, s, 0) && (e(M),
                            i = !0),
                            N && g(n, c, 1) && (r(M),
                            i = !0),
                            i && (t(M),
                            k({
                                type: "brush",
                                mode: S ? "move" : "resize"
                            }))
                        }
                        function g(n, t, e) {
                            var r, i, a = ni(t), l = a[0], s = a[1], c = E[e], g = e ? h : f, v = g[1] - g[0];
                            return S && (l -= c,
                            s -= v + c),
                            r = (e ? d : p) ? Math.max(l, Math.min(s, n[e])) : n[e],
                            S ? i = (r += c) + v : (m && (c = Math.max(l, Math.min(s, 2 * m[e] - r))),
                            r > c ? (i = r,
                            r = c) : i = c),
                            g[0] != r || g[1] != i ? (e ? u = null : o = null,
                            g[0] = r,
                            g[1] = i,
                            !0) : void 0
                        }
                        function v() {
                            i(),
                            M.style("pointer-events", "all").selectAll(".resize").style("display", n.empty() ? "none" : null),
                            Ki.select("body").style("cursor", null),
                            T.on("mousemove.brush", null).on("mouseup.brush", null).on("touchmove.brush", null).on("touchend.brush", null).on("keydown.brush", null).on("keyup.brush", null),
                            A(),
                            k({
                                type: "brushend"
                            })
                        }
                        var m, y, x = this, b = Ki.select(Ki.event.target), k = l.of(x, arguments), M = Ki.select(x), w = b.datum(), _ = !/^(n|s)$/.test(w) && s, N = !/^(e|w)$/.test(w) && c, S = b.classed("extent"), A = $(x), E = Ki.mouse(x), T = Ki.select(a(x)).on("keydown.brush", function() {
                            32 == Ki.event.keyCode && (S || (m = null,
                            E[0] -= f[1],
                            E[1] -= h[1],
                            S = 2),
                            L())
                        }).on("keyup.brush", function() {
                            32 == Ki.event.keyCode && 2 == S && (E[0] += f[1],
                            E[1] += h[1],
                            S = 0,
                            L())
                        });
                        if (Ki.event.changedTouches ? T.on("touchmove.brush", i).on("touchend.brush", v) : T.on("mousemove.brush", i).on("mouseup.brush", v),
                        M.interrupt().selectAll("*").interrupt(),
                        S)
                            E[0] = f[0] - E[0],
                            E[1] = h[0] - E[1];
                        else if (w) {
                            var C = +/w$/.test(w)
                              , z = +/^n/.test(w);
                            y = [f[1 - C] - E[0], h[1 - z] - E[1]],
                            E[0] = f[C],
                            E[1] = h[z]
                        } else
                            Ki.event.altKey && (m = E.slice());
                        M.style("pointer-events", "none").selectAll(".resize").style("display", null),
                        Ki.select("body").style("cursor", b.style("cursor")),
                        k({
                            type: "brushstart"
                        }),
                        i()
                    }
                    var o, u, l = T(n, "brushstart", "brush", "brushend"), s = null, c = null, f = [0, 0], h = [0, 0], p = !0, d = !0, g = Ou[0];
                    return n.event = function(n) {
                        n.each(function() {
                            var n = l.of(this, arguments)
                              , t = {
                                x: f,
                                y: h,
                                i: o,
                                j: u
                            }
                              , e = this.__chart__ || t;
                            this.__chart__ = t,
                            Su ? Ki.select(this).transition().each("start.brush", function() {
                                o = e.i,
                                u = e.j,
                                f = e.x,
                                h = e.y,
                                n({
                                    type: "brushstart"
                                })
                            }).tween("brush:brush", function() {
                                var e = Ze(f, t.x)
                                  , r = Ze(h, t.y);
                                return o = u = null,
                                function(i) {
                                    f = t.x = e(i),
                                    h = t.y = r(i),
                                    n({
                                        type: "brush",
                                        mode: "resize"
                                    })
                                }
                            }).each("end.brush", function() {
                                o = t.i,
                                u = t.j,
                                n({
                                    type: "brush",
                                    mode: "resize"
                                }),
                                n({
                                    type: "brushend"
                                })
                            }) : (n({
                                type: "brushstart"
                            }),
                            n({
                                type: "brush",
                                mode: "resize"
                            }),
                            n({
                                type: "brushend"
                            }))
                        })
                    }
                    ,
                    n.x = function(t) {
                        return arguments.length ? (g = Ou[!(s = t) << 1 | !c],
                        n) : s
                    }
                    ,
                    n.y = function(t) {
                        return arguments.length ? (g = Ou[!s << 1 | !(c = t)],
                        n) : c
                    }
                    ,
                    n.clamp = function(t) {
                        return arguments.length ? (s && c ? (p = !!t[0],
                        d = !!t[1]) : s ? p = !!t : c && (d = !!t),
                        n) : s && c ? [p, d] : s ? p : c ? d : null
                    }
                    ,
                    n.extent = function(t) {
                        var e, r, i, a, l;
                        return arguments.length ? (s && (e = t[0],
                        r = t[1],
                        c && (e = e[0],
                        r = r[0]),
                        o = [e, r],
                        s.invert && (e = s(e),
                        r = s(r)),
                        e > r && (l = e,
                        e = r,
                        r = l),
                        (e != f[0] || r != f[1]) && (f = [e, r])),
                        c && (i = t[0],
                        a = t[1],
                        s && (i = i[1],
                        a = a[1]),
                        u = [i, a],
                        c.invert && (i = c(i),
                        a = c(a)),
                        i > a && (l = i,
                        i = a,
                        a = l),
                        (i != h[0] || a != h[1]) && (h = [i, a])),
                        n) : (s && (o ? (e = o[0],
                        r = o[1]) : (e = f[0],
                        r = f[1],
                        s.invert && (e = s.invert(e),
                        r = s.invert(r)),
                        e > r && (l = e,
                        e = r,
                        r = l))),
                        c && (u ? (i = u[0],
                        a = u[1]) : (i = h[0],
                        a = h[1],
                        c.invert && (i = c.invert(i),
                        a = c.invert(a)),
                        i > a && (l = i,
                        i = a,
                        a = l))),
                        s && c ? [[e, i], [r, a]] : s ? [e, r] : c && [i, a])
                    }
                    ,
                    n.clear = function() {
                        return n.empty() || (f = [0, 0],
                        h = [0, 0],
                        o = u = null),
                        n
                    }
                    ,
                    n.empty = function() {
                        return !!s && f[0] == f[1] || !!c && h[0] == h[1]
                    }
                    ,
                    Ki.rebind(n, l, "on")
                }
                ;
                var Pu = {
                    n: "ns-resize",
                    e: "ew-resize",
                    s: "ns-resize",
                    w: "ew-resize",
                    nw: "nwse-resize",
                    ne: "nesw-resize",
                    se: "nwse-resize",
                    sw: "nesw-resize"
                }
                  , Ou = [["n", "e", "s", "w", "nw", "ne", "se", "sw"], ["e", "w"], ["n", "s"], []]
                  , qu = na.format = aa.timeFormat
                  , Ru = qu.utc
                  , ju = Ru("%Y-%m-%dT%H:%M:%S.%LZ");
                qu.iso = Date.prototype.toISOString && +new Date("2000-01-01T00:00:00.000Z") ? Wi : ju,
                Wi.parse = function(n) {
                    var t = new Date(n);
                    return isNaN(t) ? null : t
                }
                ,
                Wi.toString = ju.toString,
                na.second = jn(function(n) {
                    return new ta(1e3 * Math.floor(n / 1e3))
                }, function(n, t) {
                    n.setTime(n.getTime() + 1e3 * Math.floor(t))
                }, function(n) {
                    return n.getSeconds()
                }),
                na.seconds = na.second.range,
                na.seconds.utc = na.second.utc.range,
                na.minute = jn(function(n) {
                    return new ta(6e4 * Math.floor(n / 6e4))
                }, function(n, t) {
                    n.setTime(n.getTime() + 6e4 * Math.floor(t))
                }, function(n) {
                    return n.getMinutes()
                }),
                na.minutes = na.minute.range,
                na.minutes.utc = na.minute.utc.range,
                na.hour = jn(function(n) {
                    var t = n.getTimezoneOffset() / 60;
                    return new ta(36e5 * (Math.floor(n / 36e5 - t) + t))
                }, function(n, t) {
                    n.setTime(n.getTime() + 36e5 * Math.floor(t))
                }, function(n) {
                    return n.getHours()
                }),
                na.hours = na.hour.range,
                na.hours.utc = na.hour.utc.range,
                na.month = jn(function(n) {
                    return (n = na.day(n)).setDate(1),
                    n
                }, function(n, t) {
                    n.setMonth(n.getMonth() + t)
                }, function(n) {
                    return n.getMonth()
                }),
                na.months = na.month.range,
                na.months.utc = na.month.utc.range;
                var Uu = [1e3, 5e3, 15e3, 3e4, 6e4, 3e5, 9e5, 18e5, 36e5, 108e5, 216e5, 432e5, 864e5, 1728e5, 6048e5, 2592e6, 7776e6, 31536e6]
                  , Du = [[na.second, 1], [na.second, 5], [na.second, 15], [na.second, 30], [na.minute, 1], [na.minute, 5], [na.minute, 15], [na.minute, 30], [na.hour, 1], [na.hour, 3], [na.hour, 6], [na.hour, 12], [na.day, 1], [na.day, 2], [na.week, 1], [na.month, 1], [na.month, 3], [na.year, 1]]
                  , Fu = qu.multi([[".%L", function(n) {
                    return n.getMilliseconds()
                }
                ], [":%S", function(n) {
                    return n.getSeconds()
                }
                ], ["%I:%M", function(n) {
                    return n.getMinutes()
                }
                ], ["%I %p", function(n) {
                    return n.getHours()
                }
                ], ["%a %d", function(n) {
                    return n.getDay() && 1 != n.getDate()
                }
                ], ["%b %d", function(n) {
                    return 1 != n.getDate()
                }
                ], ["%B", function(n) {
                    return n.getMonth()
                }
                ], ["%Y", _t]])
                  , Iu = {
                    range: function(n, t, e) {
                        return Ki.range(Math.ceil(n / e) * e, +t, e).map(Gi)
                    },
                    floor: M,
                    ceil: M
                };
                Du.year = na.year,
                na.scale = function() {
                    return Ji(Ki.scale.linear(), Du, Fu)
                }
                ;
                var Hu = Du.map(function(n) {
                    return [n[0].utc, n[1]]
                })
                  , Bu = Ru.multi([[".%L", function(n) {
                    return n.getUTCMilliseconds()
                }
                ], [":%S", function(n) {
                    return n.getUTCSeconds()
                }
                ], ["%I:%M", function(n) {
                    return n.getUTCMinutes()
                }
                ], ["%I %p", function(n) {
                    return n.getUTCHours()
                }
                ], ["%a %d", function(n) {
                    return n.getUTCDay() && 1 != n.getUTCDate()
                }
                ], ["%b %d", function(n) {
                    return 1 != n.getUTCDate()
                }
                ], ["%B", function(n) {
                    return n.getUTCMonth()
                }
                ], ["%Y", _t]]);
                Hu.year = na.year.utc,
                na.scale.utc = function() {
                    return Ji(Ki.scale.linear(), Hu, Bu)
                }
                ,
                Ki.text = Ln(function(n) {
                    return n.responseText
                }),
                Ki.json = function(n, t) {
                    return En(n, "application/json", Zi, t)
                }
                ,
                Ki.html = function(n, t) {
                    return En(n, "text/html", $i, t)
                }
                ,
                Ki.xml = Ln(function(n) {
                    return n.responseXML
                }),
                this.d3 = Ki,
                void 0 === (i = "function" == typeof (r = Ki) ? r.call(t, e, t, n) : r) || (n.exports = i)
            }()
        }
        , function(n, t, e) {
            var r = e(3);
            "string" == typeof r && (r = [[n.id, r, ""]]),
            e(5)(r, {}),
            r.locals && (n.exports = r.locals)
        }
        , function(n, t, e) {
            (n.exports = e(4)()).push([n.id, "svg {\n  display: block;\n  min-width: 100%;\n  width: 100%;\n  min-height: 100%;\n}\n\ncircle.node {\n  stroke: #ccc;\n  stroke-width: 1px;\n  opacity: 1;\n  fill: white;\n}\n\npolygon.node {\n  stroke: #ccc;\n  stroke-width: 1px;\n  opacity: 1;\n  fill: white;\n}\n\ncircle.node.label {\n    stroke: transparent;\n    stroke-width: 0;\n    fill: white;\n    display: inline;\n}\n\ncircle.outline_node {\n    stroke-width: 1px;\n    fill: red;\n}\n\ncircle.protein {\n    fill: gray;\n    fill-opacity: 0.5;\n    stroke-width: 4;\n}\n\ncircle.hidden_outline {\n    stroke-width: 0px;\n}\n\n\nline.link {\n  stroke: #999;\n  stroke-opacity: 0.8;\n  stroke-width: 2;\n}\n\nline.pseudoknot {\n    stroke: red;\n}\n\nline.basepair {\n  stroke: red;\n}\n\nline.intermolecule {\n  stroke: blue;\n}\n\nline.chain_chain {\n  stroke-dasharray: 3,3;\n}\n\nline.fake {\n  stroke: green;\n}\n\n.transparent {\n    fill: transparent;\n    stroke-width: 0;\n    stroke-opacity: 0;\n    opacity: 0;\n    visibility: hidden;\n}\n\n.drag_line {\n  stroke: #999;\n  stroke-width: 2;\n  pointer-events: none;\n}\n\n.drag_line_hidden {\n  stroke: #999;\n  stroke-width: 0;\n  pointer-events: none;\n}\n\n.d3-tip {\n    line-height: 1;\n    font-weight: bold;\n    padding: 6px;\n    background: rgba(0, 0, 0, 0.6);\n    color: #fff;\n    border-radius: 4px;\n    pointer-events: none;\n          }\n\ntext.node-label {\n    font-weight: bold;\n    font-family: Tahoma, Geneva, sans-serif;\n    color: rgb(100,100,100);\n    pointer-events: none;\n}\n\ntext {\n    pointer-events: none;\n}\n\ng.gnode {\n\n}\n\ncircle.outline_node.selected {\n    visibility: visible;\n}\n\ncircle.outline_node {\n    visibility: hidden;\n}\n\n.brush .extent {\n  fill-opacity: .1;\n  stroke: #fff;\n  shape-rendering: crispEdges;\n}\n\n.noselect {\n    -webkit-touch-callout: none;\n    -webkit-user-select: none;\n    -khtml-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n}\n", ""])
        }
        , function(n, t) {
            n.exports = function() {
                var n = [];
                return n.toString = function() {
                    for (var n = [], t = 0; t < this.length; t++) {
                        var e = this[t];
                        e[2] ? n.push("@media " + e[2] + "{" + e[1] + "}") : n.push(e[1])
                    }
                    return n.join("")
                }
                ,
                n.i = function(t, e) {
                    "string" == typeof t && (t = [[null, t, ""]]);
                    for (var r = {}, i = 0; i < this.length; i++) {
                        var o = this[i][0];
                        "number" == typeof o && (r[o] = !0)
                    }
                    for (i = 0; i < t.length; i++) {
                        var a = t[i];
                        "number" == typeof a[0] && r[a[0]] || (e && !a[2] ? a[2] = e : e && (a[2] = "(" + a[2] + ") and (" + e + ")"),
                        n.push(a))
                    }
                }
                ,
                n
            }
        }
        , function(n, t, e) {
            function r(n, t) {
                for (var e = 0; e < n.length; e++) {
                    var r = n[e]
                      , i = f[r.id];
                    if (i) {
                        i.refs++;
                        for (var o = 0; o < i.parts.length; o++)
                            i.parts[o](r.parts[o]);
                        for (; o < r.parts.length; o++)
                            i.parts.push(s(r.parts[o], t))
                    } else {
                        var a = [];
                        for (o = 0; o < r.parts.length; o++)
                            a.push(s(r.parts[o], t));
                        f[r.id] = {
                            id: r.id,
                            refs: 1,
                            parts: a
                        }
                    }
                }
            }
            function i(n) {
                for (var t = [], e = {}, r = 0; r < n.length; r++) {
                    var i = n[r]
                      , o = i[0]
                      , a = {
                        css: i[1],
                        media: i[2],
                        sourceMap: i[3]
                    };
                    e[o] ? e[o].parts.push(a) : t.push(e[o] = {
                        id: o,
                        parts: [a]
                    })
                }
                return t
            }
            function o(n, t) {
                var e = d()
                  , r = m[m.length - 1];
                if ("top" === n.insertAt)
                    r ? r.nextSibling ? e.insertBefore(t, r.nextSibling) : e.appendChild(t) : e.insertBefore(t, e.firstChild),
                    m.push(t);
                else {
                    if ("bottom" !== n.insertAt)
                        throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
                    e.appendChild(t)
                }
            }
            function a(n) {
                n.parentNode.removeChild(n);
                var t = m.indexOf(n);
                t >= 0 && m.splice(t, 1)
            }
            function u(n) {
                var t = document.createElement("style");
                return t.type = "text/css",
                o(n, t),
                t
            }
            function l(n) {
                var t = document.createElement("link");
                return t.rel = "stylesheet",
                o(n, t),
                t
            }
            function s(n, t) {
                var e, r, i;
                if (t.singleton) {
                    var o = v++;
                    e = g || (g = u(t)),
                    r = c.bind(null, e, o, !1),
                    i = c.bind(null, e, o, !0)
                } else
                    n.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (e = l(t),
                    r = function(n, t) {
                        var e = t.css
                          , r = (t.media,
                        t.sourceMap);
                        r && (e += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(r)))) + " */");
                        var i = new Blob([e],{
                            type: "text/css"
                        })
                          , o = n.href;
                        n.href = URL.createObjectURL(i),
                        o && URL.revokeObjectURL(o)
                    }
                    .bind(null, e),
                    i = function() {
                        a(e),
                        e.href && URL.revokeObjectURL(e.href)
                    }
                    ) : (e = u(t),
                    r = function(n, t) {
                        var e = t.css
                          , r = t.media;
                        if (t.sourceMap,
                        r && n.setAttribute("media", r),
                        n.styleSheet)
                            n.styleSheet.cssText = e;
                        else {
                            for (; n.firstChild; )
                                n.removeChild(n.firstChild);
                            n.appendChild(document.createTextNode(e))
                        }
                    }
                    .bind(null, e),
                    i = function() {
                        a(e)
                    }
                    );
                return r(n),
                function(t) {
                    if (t) {
                        if (t.css === n.css && t.media === n.media && t.sourceMap === n.sourceMap)
                            return;
                        r(n = t)
                    } else
                        i()
                }
            }
            function c(n, t, e, r) {
                var i = e ? "" : r.css;
                if (n.styleSheet)
                    n.styleSheet.cssText = y(t, i);
                else {
                    var o = document.createTextNode(i)
                      , a = n.childNodes;
                    a[t] && n.removeChild(a[t]),
                    a.length ? n.insertBefore(o, a[t]) : n.appendChild(o)
                }
            }
            var f = {}
              , h = function(n) {
                var t;
                return function() {
                    return void 0 === t && (t = n.apply(this, arguments)),
                    t
                }
            }
              , p = h(function() {
                return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())
            })
              , d = h(function() {
                return document.head || document.getElementsByTagName("head")[0]
            })
              , g = null
              , v = 0
              , m = [];
            n.exports = function(n, t) {
                void 0 === (t = t || {}).singleton && (t.singleton = p()),
                void 0 === t.insertAt && (t.insertAt = "bottom");
                var e = i(n);
                return r(e, t),
                function(n) {
                    for (var o = [], a = 0; a < e.length; a++) {
                        var u = e[a];
                        (l = f[u.id]).refs--,
                        o.push(l)
                    }
                    n && r(i(n), t);
                    for (a = 0; a < o.length; a++) {
                        var l;
                        if (0 === (l = o[a]).refs) {
                            for (var s = 0; s < l.parts.length; s++)
                                l.parts[s]();
                            delete f[l.id]
                        }
                    }
                }
            }
            ;
            var y = function() {
                var n = [];
                return function(t, e) {
                    return n[t] = e,
                    n.filter(Boolean).join("\n")
                }
            }()
        }
        , function(n, t, e) {
            "use strict";
            function r() {
                var n = (new Date).getTime();
                return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t) {
                    var e = (n + 16 * Math.random()) % 16 | 0;
                    return n = Math.floor(n / 16),
                    ("x" == t ? e : 3 & e | 8).toString(16)
                })
            }
            function i(n, t, e) {
                var i = this;
                i.type = "protein",
                i.size = t,
                i.nodes = [{
                    name: "P",
                    num: 1,
                    radius: 3 * Math.sqrt(t),
                    rna: i,
                    nodeType: "protein",
                    structName: n,
                    elemType: "p",
                    size: t,
                    uid: r()
                }],
                i.links = [],
                i.uid = r(),
                i.addUids = function(n) {
                    for (var t = 0; t < n.length; t++)
                        i.nodes[t].uid = n[t];
                    return i
                }
                ,
                i.getUids = function() {
                    uids = [];
                    for (var n = 0; n < i.dotbracket.length; n++)
                        uids.push(i.nodes[n].uid);
                    return uids
                }
            }
            function o(n, t, e, i) {
                var o = this;
                o.type = "rna",
                o.circularizeExternal = !1,
                0 === arguments.length ? (o.seq = "",
                o.dotbracket = "",
                o.structName = "") : (o.seq = n,
                o.dotbracket = t,
                o.structName = e),
                arguments.length < 4 && (i = 1),
                o.circular = !1,
                o.dotbracket.length > 0 && "*" == o.dotbracket[o.dotbracket.length - 1] && (o.dotbracket = o.dotbracket.slice(0, o.dotbracket.length - 1),
                o.circular = !0),
                o.uid = r(),
                o.elements = [],
                o.pseudoknotPairs = [],
                o.nucsToNodes = {},
                o.addUids = function(n) {
                    for (var t = o.nodes.filter(function(n) {
                        return "nucleotide" == n.nodeType
                    }), e = 0; e < n.length && e < t.length; e++)
                        t[e].uid = n[e];
                    return o
                }
                ,
                o.computePairtable = function() {
                    o.pairtable = a.rnaUtilities.dotbracketToPairtable(o.dotbracket)
                }
                ,
                o.removeBreaks = function(n) {
                    for (var t = [], e = -1; (e = n.indexOf("&")) >= 0; )
                        t.push(e),
                        n = n.substring(0, e) + "oo" + n.substring(e + 1, n.length);
                    return {
                        targetString: n,
                        breaks: t
                    }
                }
                ;
                var l = o.removeBreaks(o.dotbracket);
                o.dotbracket = l.targetString,
                o.dotBracketBreaks = l.breaks,
                l = o.removeBreaks(o.seq),
                o.seq = l.targetString,
                o.seqBreaks = l.breaks,
                o.calculateStartNumberArray = function() {
                    o.startNumberArray = [];
                    for (var n = 0; n < o.dotbracket.length; n++)
                        o.startNumberArray.push(i),
                        "o" == o.dotbracket[n] && (i = -n)
                }
                ,
                o.calculateStartNumberArray(),
                o.rnaLength = o.dotbracket.length,
                (0,
                a.arraysEqual)(o.dotBracketBreaks, o.seqBreaks) || (console.log("WARNING: Sequence and structure breaks not equal"),
                console.log("WARNING: Using the breaks in the structure")),
                o.computePairtable(),
                o.addPositions = function(n, t) {
                    for (var e = o.nodes.filter(function(t) {
                        return t.nodeType == n
                    }), r = 0; r < e.length; r++)
                        e[r].x = t[r][0],
                        e[r].px = t[r][0],
                        e[r].y = t[r][1],
                        e[r].py = t[r][1];
                    return o
                }
                ,
                o.breakNodesToFakeNodes = function() {
                    for (var n = o.nodes.filter(function(n) {
                        return "nucleotide" == n.nodeType
                    }), t = 0; t < n.length; t++)
                        "o" == o.dotbracket[t] && (n[t].nodeType = "middle");
                    for (t = 0; t < o.elements.length; t++) {
                        for (var e = !1, r = 0; r < o.elements[t][2].length; r++)
                            o.dotBracketBreaks.indexOf(o.elements[t][2][r]) >= 0 && (e = !0);
                        e ? o.elements[t][2].map(function(n) {
                            0 != n && (o.nodes[n - 1].elemType = "e")
                        }) : o.elements[t][2].map(function(n) {
                            0 != n && (o.nodes[n - 1].elemType = o.elements[t][0])
                        })
                    }
                    return o
                }
                ,
                o.getPositions = function(n) {
                    for (var t = [], e = o.nodes.filter(function(t) {
                        return t.nodeType == n
                    }), r = 0; r < e.length; r++)
                        t.push([e[r].x, e[r].y]);
                    return t
                }
                ,
                o.getUids = function() {
                    for (var n = [], t = 0; t < o.dotbracket.length; t++)
                        n.push(o.nodes[t].uid);
                    return n
                }
                ,
                o.reinforceStems = function() {
                    for (var n = o.pairtable, t = o.elements.filter(function(n) {
                        return "s" == n[0] && n[2].length >= 4
                    }), e = 0; e < t.length; e++)
                        for (var r = t[e][2], i = r.slice(0, r.length / 2), a = 0; a < i.length - 1; a++)
                            o.addFakeNode([i[a], i[a + 1], n[i[a + 1]], n[i[a]]]);
                    return o
                }
                ,
                o.reinforceLoops = function() {
                    for (var n = function(n) {
                        return 0 !== n && n <= o.dotbracket.length
                    }, t = 0; t < o.elements.length; t++)
                        if ("s" != o.elements[t][0] && (o.circularizeExternal || "e" != o.elements[t][0])) {
                            var e = o.elements[t][2].filter(n);
                            if ("e" == o.elements[t][0]) {
                                var i = {
                                    name: "",
                                    num: -3,
                                    radius: 0,
                                    rna: o,
                                    nodeType: "middle",
                                    elemType: "f",
                                    nucs: [],
                                    x: o.nodes[o.rnaLength - 1].x,
                                    y: o.nodes[o.rnaLength - 1].y,
                                    px: o.nodes[o.rnaLength - 1].px,
                                    py: o.nodes[o.rnaLength - 1].py,
                                    uid: r()
                                }
                                  , a = {
                                    name: "",
                                    num: -2,
                                    radius: 0,
                                    rna: o,
                                    nodeType: "middle",
                                    elemType: "f",
                                    nucs: [],
                                    x: o.nodes[0].x,
                                    y: o.nodes[0].y,
                                    px: o.nodes[0].px,
                                    py: o.nodes[0].py,
                                    uid: r()
                                };
                                e.push(o.nodes.length + 1),
                                e.push(o.nodes.length + 2),
                                o.nodes.push(i),
                                o.nodes.push(a)
                            }
                            o.addFakeNode(e)
                        }
                    return o
                }
                ,
                o.updateLinkUids = function() {
                    for (var n = 0; n < o.links.length; n++)
                        o.links[n].uid = o.links[n].source.uid + o.links[n].target.uid;
                    return o
                }
                ,
                o.addFakeNode = function(n) {
                    for (var t = 6.283 / (2 * n.length), e = 18 / (2 * Math.tan(t)), i = "", a = 0; a < n.length; a++)
                        i += o.nodes[n[a] - 1].uid;
                    var u = {
                        name: "",
                        num: -1,
                        radius: e,
                        rna: o,
                        nodeType: "middle",
                        elemType: "f",
                        nucs: n,
                        uid: i
                    };
                    o.nodes.push(u);
                    var l = 0
                      , s = 0
                      , c = 0;
                    t = 3.14159 * (n.length - 2) / (2 * n.length),
                    e = .5 / Math.cos(t);
                    for (var f = 0; f < n.length; f++)
                        if (!(0 === n[f] || n[f] > o.dotbracket.length)) {
                            o.links.push({
                                source: o.nodes[n[f] - 1],
                                target: o.nodes[o.nodes.length - 1],
                                linkType: "fake",
                                value: e,
                                uid: r()
                            }),
                            n.length > 4 && o.links.push({
                                source: o.nodes[n[f] - 1],
                                target: o.nodes[n[(f + Math.floor(n.length / 2)) % n.length] - 1],
                                linkType: "fake",
                                value: 2 * e,
                                uid: r()
                            });
                            var h = 3.14159 * (n.length - 2) / n.length
                              , p = 2 * Math.cos(1.570795 - h / 2);
                            o.links.push({
                                source: o.nodes[n[f] - 1],
                                target: o.nodes[n[(f + 2) % n.length] - 1],
                                linkType: "fake",
                                value: p
                            });
                            var d = o.nodes[n[f] - 1];
                            "x"in d && (l += d.x,
                            s += d.y,
                            c += 1)
                        }
                    return c > 0 && (u.x = l / c,
                    u.y = s / c,
                    u.px = u.x,
                    u.py = u.y),
                    o
                }
                ,
                o.connectFakeNodes = function() {
                    for (var n = {}, t = o.nodes.filter(function(n) {
                        return "middle" == n.nodeType
                    }), e = new Set, r = 1; r <= o.nodes.length; r++)
                        n[r] = [];
                    for (r = 0; r < t.length; r++)
                        for (var i = t[r], a = 0; a < i.nucs.length; a++) {
                            for (var u = i.nucs[a], l = 0; l < n[u].length; l++)
                                if (!e.has(JSON.stringify([n[u][l].uid, i.uid].sort()))) {
                                    var s = n[u][l].radius + i.radius;
                                    o.links.push({
                                        source: n[u][l],
                                        target: i,
                                        value: s / 18,
                                        linkType: "fake_fake"
                                    }),
                                    e.add(JSON.stringify([n[u][l].uid, i.uid].sort()))
                                }
                            n[u].push(i)
                        }
                    return o
                }
                ,
                o.addExtraLinks = function(n) {
                    if (void 0 === n)
                        return o;
                    for (var t = 0; t < n.length; t++) {
                        var e = {
                            source: o.getNodeFromNucleotides(n[t].from),
                            target: o.getNodeFromNucleotides(n[t].to),
                            linkType: "extra",
                            extraLinkType: n[t].linkType,
                            uid: r()
                        };
                        o.links.push(e)
                    }
                    return o
                }
                ,
                o.elementsToJson = function() {
                    var n = o.pairtable;
                    o.elements,
                    o.nodes = [],
                    o.links = [];
                    var t = {};
                    o.elements.sort();
                    for (var e = 0; e < o.elements.length; e++)
                        for (var i = o.elements[e][2], a = 0; a < i.length; a++)
                            t[i[a]] = o.elements[e][0];
                    for (e = 1; e <= n[0]; e++) {
                        var u = o.seq[e - 1];
                        (o.dotBracketBreaks.indexOf(e - 1) >= 0 || o.dotBracketBreaks.indexOf(e - 2) >= 0) && (u = ""),
                        o.nodes.push({
                            name: u,
                            num: e + o.startNumberArray[e - 1] - 1,
                            radius: 5,
                            rna: o,
                            nodeType: "nucleotide",
                            structName: o.structName,
                            elemType: t[e],
                            uid: r(),
                            linked: !1
                        })
                    }
                    for (e = 0; e < o.nodes.length; e++)
                        o.nodes[e].prevNode = 0 === e ? null : o.nodes[e - 1],
                        e == o.nodes.length - 1 ? o.nodes[e].nextNode = null : o.nodes[e].nextNode = o.nodes[e + 1];
                    for (e = 1; e <= n[0]; e++)
                        0 !== n[e] && o.links.push({
                            source: o.nodes[e - 1],
                            target: o.nodes[n[e] - 1],
                            linkType: "basepair",
                            value: 1,
                            uid: r()
                        }),
                        e > 1 && -1 === o.dotBracketBreaks.indexOf(e - 1) && -1 == o.dotBracketBreaks.indexOf(e - 2) && -1 == o.dotBracketBreaks.indexOf(e - 3) && (o.links.push({
                            source: o.nodes[e - 2],
                            target: o.nodes[e - 1],
                            linkType: "backbone",
                            value: 1,
                            uid: r()
                        }),
                        o.nodes[e - 1].linked = !0);
                    for (e = 0; e < o.pseudoknotPairs.length; e++)
                        o.links.push({
                            source: o.nodes[o.pseudoknotPairs[e][0] - 1],
                            target: o.nodes[o.pseudoknotPairs[e][1] - 1],
                            linkType: "pseudoknot",
                            value: 1,
                            uid: r()
                        });
                    return o.circular && o.links.push({
                        source: o.nodes[0],
                        target: o.nodes[o.rnaLength - 1],
                        linkType: "backbone",
                        value: 1,
                        uid: r()
                    }),
                    o
                }
                ,
                o.ptToElements = function(n, t, e, r) {
                    var i = []
                      , a = [e - 1]
                      , l = [r + 1];
                    if (e > r)
                        return [];
                    for (; 0 === n[e]; e++)
                        a.push(e);
                    for (; 0 === n[r]; r--)
                        l.push(r);
                    if (e > r) {
                        if (a.push(e),
                        0 === t)
                            return [["e", t, a.sort(u)]];
                        for (var s = !1, c = [], f = [], h = 0; h < a.length; h++)
                            s ? f.push(a[h]) : c.push(a[h]),
                            o.dotBracketBreaks.indexOf(a[h]) >= 0 && (s = !0);
                        return [["h", t, a.sort(u)]]
                    }
                    if (n[e] != r) {
                        var p = a;
                        h = e;
                        for (p.push(h); r >= h; ) {
                            for (i = i.concat(o.ptToElements(n, t, h, n[h])),
                            p.push(n[h]),
                            h = n[h] + 1; 0 === n[h] && r >= h; h++)
                                p.push(h);
                            p.push(h)
                        }
                        return p.pop(),
                        (p = p.concat(l)).length > 0 && (0 === t ? i.push(["e", t, p.sort(u)]) : i.push(["m", t, p.sort(u)])),
                        i
                    }
                    n[e] === r && (a.push(e),
                    l.push(r),
                    a.concat(l).length > 4 && (0 === t ? i.push(["e", t, a.concat(l).sort(u)]) : i.push(["i", t, a.concat(l).sort(u)])));
                    for (var d = []; n[e] === r && r > e; )
                        d.push(e),
                        d.push(r),
                        e += 1,
                        r -= 1,
                        t += 1;
                    return a = [e - 1],
                    l = [r + 1],
                    i.push(["s", t, d.sort(u)]),
                    i.concat(o.ptToElements(n, t, e, r))
                }
                ,
                o.addLabels = function(n, t) {
                    if (0 === arguments.length && (1,
                    t = 10),
                    1 === arguments.length && (t = 10),
                    0 === t)
                        return o;
                    0 >= t && console.log("The label interval entered in invalid:", t);
                    for (var e = 1; e <= o.pairtable[0]; e++)
                        if (e % t == 0) {
                            var i, a, u, l, s = o.nodes[e - 1];
                            1 == o.rnaLength ? (l = [s.x - 15, s.y],
                            u = [s.x - 15, s.y]) : (i = 1 == e ? o.nodes[o.rnaLength - 1] : o.nodes[e - 2],
                            a = e == o.rnaLength ? o.nodes[0] : o.nodes[e],
                            0 !== o.pairtable[a.num] && 0 !== o.pairtable[i.num] && 0 !== o.pairtable[s.num] && (i = a = o.nodes[o.pairtable[s.num] - 1]),
                            0 === o.pairtable[s.num] || 0 !== o.pairtable[a.num] && 0 !== o.pairtable[i.num] ? (l = [a.x - s.x, a.y - s.y],
                            u = [i.x - s.x, i.y - s.y]) : (l = [s.x - a.x, s.y - a.y],
                            u = [s.x - i.x, s.y - i.y]));
                            var c = [l[0] + u[0], l[1] + u[1]]
                              , f = Math.sqrt(c[0] * c[0] + c[1] * c[1])
                              , h = [c[0] / f, c[1] / f]
                              , p = [-15 * h[0], -15 * h[1]]
                              , d = o.nodes[e - 1].x + p[0]
                              , g = o.nodes[e - 1].y + p[1]
                              , v = {
                                name: e + o.startNumberArray[e - 1] - 1,
                                num: -1,
                                radius: 6,
                                rna: o,
                                nodeType: "label",
                                structName: o.structName,
                                elemType: "l",
                                x: d,
                                y: g,
                                px: d,
                                py: g,
                                uid: r()
                            }
                              , m = {
                                source: o.nodes[e - 1],
                                target: v,
                                value: 1,
                                linkType: "label_link",
                                uid: r()
                            };
                            o.nodes.push(v),
                            o.links.push(m)
                        }
                    return o
                }
                ,
                o.recalculateElements = function() {
                    if (o.removePseudoknots(),
                    o.elements = o.ptToElements(o.pairtable, 0, 1, o.dotbracket.length),
                    o.circular && (externalLoop = o.elements.filter(function(n) {
                        return "e" == n[0] || void 0
                    }),
                    externalLoop.length > 0)) {
                        eloop = externalLoop[0],
                        nucs = eloop[2].sort(u),
                        prev = nucs[0],
                        hloop = !0,
                        numGreater = 0;
                        for (var n = 1; n < nucs.length; n++)
                            nucs[n] - prev > 1 && (numGreater += 1),
                            prev = nucs[n];
                        1 == numGreater ? eloop[0] = "h" : 2 == numGreater ? eloop[0] = "i" : eloop[0] = "m"
                    }
                    return o
                }
                ,
                o.reassignLinkUids = function() {
                    for (var n = 0; n < o.links.length; n++)
                        o.links[n].uid = o.links[n].source.uid + o.links[n].target.uid;
                    return o
                }
                ,
                o.removePseudoknots = function() {
                    return o.pairtable.length > 1 && (o.pseudoknotPairs = o.pseudoknotPairs.concat(a.rnaUtilities.removePseudoknotsFromPairtable(o.pairtable))),
                    o
                }
                ,
                o.addPseudoknots = function() {
                    for (var n = o.pairtable, t = o.pseudoknotPairs, e = 0; e < t.length; e++)
                        n[t[e][0]] = t[e][1],
                        n[t[e][1]] = t[e][0];
                    return o.pseudoknotPairs = [],
                    o
                }
                ,
                o.addName = function(n) {
                    return void 0 === n ? (o.name = "",
                    o) : (o.name = n,
                    o)
                }
                ,
                o.rnaLength > 0 && o.recalculateElements()
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.ProteinGraph = i,
            t.RNAGraph = o,
            t.moleculesToJson = function(n) {
                for (var t = {}, e = [], a = [], u = 0; u < n.molecules.length; u++) {
                    var l, s = n.molecules[u];
                    "rna" == s.type ? ((l = new o(s.seq,s.ss,s.header)).circularizeExternal = !0,
                    l.elementsToJson().addPositions("nucleotide", s.positions).addLabels().reinforceStems().reinforceLoops()) : "protein" == s.type && (l = new i(s.header,s.size)),
                    l.addUids(s.uids);
                    for (var c = 0; c < l.nodes.length; c++)
                        t[l.nodes[c].uid] = l.nodes[c];
                    e.push(l)
                }
                for (u = 0; u < n.extraLinks.length; u++)
                    link = n.extraLinks[u],
                    link.source = t[link.source],
                    link.target = t[link.target],
                    link.uid = r(),
                    a.push(link);
                return {
                    graphs: e,
                    extraLinks: a
                }
            }
            ;
            var a = e(7)
              , u = function(n, t) {
                return n - t
            };
            void 0 === String.prototype.trim && (String.prototype.trim = function() {
                return String(this).replace(/^\s+|\s+$/g, "")
            }
            )
        }
        , function(n, t, e) {
            n.exports = function(n) {
                function t(r) {
                    if (e[r])
                        return e[r].exports;
                    var i = e[r] = {
                        exports: {},
                        id: r,
                        loaded: !1
                    };
                    return n[r].call(i.exports, i, i.exports, t),
                    i.loaded = !0,
                    i.exports
                }
                var e = {};
                return t.m = n,
                t.c = e,
                t.p = "",
                t(0)
            }([function(n, t, e) {
                n.exports = e(1)
            }
            , function(n, t) {
                "use strict";
                function e() {
                    var n = this;
                    n.bracketLeft = "([{<ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
                    n.bracketRight = ")]}>abcdefghijklmnopqrstuvwxyz".split(""),
                    n.inverseBrackets = function(n) {
                        for (var t = {}, e = 0; e < n.length; e++)
                            t[n[e]] = e;
                        return t
                    }
                    ,
                    n.maximumMatching = function(n) {
                        for (var t = n[0], e = new Array(t + 1), r = 0; t >= r; r++) {
                            e[r] = new Array(t + 1);
                            for (var i = r; t >= i; i++)
                                e[r][i] = 0
                        }
                        for (var o = 0, r = t - 0 - 1; r > 0; r--)
                            for (var i = r + 0 + 1; t >= i; i++) {
                                o = e[r][i - 1];
                                for (var a = i - 0 - 1; a >= r; a--)
                                    n[a] === i && (o = Math.max(o, (a > r ? e[r][a - 1] : 0) + 1 + (i - a - 1 > 0 ? e[a + 1][i - 1] : 0)));
                                e[r][i] = o
                            }
                        return o = e[1][t],
                        e
                    }
                    ,
                    n.backtrackMaximumMatching = function(t, e) {
                        var r = Array.apply(null, Array(t.length)).map(function() {
                            return 0
                        });
                        return n.mmBt(t, r, e, 1, t.length - 1),
                        r
                    }
                    ,
                    n.mmBt = function(t, e, r, i, o) {
                        var a = t[i][o];
                        if (!(0 > o - i - 1)) {
                            if (t[i][o - 1] == a)
                                return void n.mmBt(t, e, r, i, o - 1);
                            for (var u = o - 0 - 1; u >= i; u--)
                                if (r[o] === u) {
                                    var l = u > i ? t[i][u - 1] : 0
                                      , s = o - u - 1 > 0 ? t[u + 1][o - 1] : 0;
                                    if (l + s + 1 == a)
                                        return e[u] = o,
                                        e[o] = u,
                                        u > i && n.mmBt(t, e, r, i, u - 1),
                                        void n.mmBt(t, e, r, u + 1, o - 1)
                                }
                            console.log("FAILED!!!" + i + "," + o + ": backtracking failed!")
                        }
                    }
                    ,
                    n.dotbracketToPairtable = function(t) {
                        var e = Array.apply(null, new Array(t.length + 1)).map(Number.prototype.valueOf, 0);
                        e[0] = t.length;
                        for (var r = {}, i = 0; i < n.bracketLeft.length; i++)
                            r[i] = [];
                        for (var o = n.inverseBrackets(n.bracketLeft), a = n.inverseBrackets(n.bracketRight), i = 0; i < t.length; i++) {
                            var u = t[i]
                              , l = i + 1;
                            if ("." == u || "o" == u)
                                e[l] = 0;
                            else if (u in o)
                                r[o[u]].push(l);
                            else {
                                if (!(u in a))
                                    throw "Unknown symbol in dotbracket string";
                                var s = r[a[u]].pop();
                                e[l] = s,
                                e[s] = l
                            }
                        }
                        for (var c in r)
                            if (r[c].length > 0)
                                throw "Unmatched base at position " + r[c][0];
                        return e
                    }
                    ,
                    n.insertIntoStack = function(n, t, e) {
                        for (var r = 0; n[r].length > 0 && n[r][n[r].length - 1] < e; )
                            r += 1;
                        return n[r].push(e),
                        r
                    }
                    ,
                    n.deleteFromStack = function(n, t) {
                        for (var e = 0; 0 === n[e].length || n[e][n[e].length - 1] != t; )
                            e += 1;
                        return n[e].pop(),
                        e
                    }
                    ,
                    n.pairtableToDotbracket = function(t) {
                        for (var e = {}, r = 0; r < t[0]; r++)
                            e[r] = [];
                        for (var i = {}, o = "", r = 1; r < t[0] + 1; r++) {
                            if (0 !== t[r] && t[r]in i)
                                throw "Invalid pairtable contains duplicate entries";
                            i[t[r]] = !0,
                            o += 0 === t[r] ? "." : t[r] > r ? n.bracketLeft[n.insertIntoStack(e, r, t[r])] : n.bracketRight[n.deleteFromStack(e, r)]
                        }
                        return o
                    }
                    ,
                    n.findUnmatched = function(t, e, r) {
                        for (var i = [], o = [], a = e, u = r, l = e; r >= l; l++)
                            0 !== t[l] && (t[l] < e || t[l] > r) && o.push([l, t[l]]);
                        for (var l = a; u >= l; l++) {
                            for (; 0 === t[l] && u >= l; )
                                l++;
                            for (r = t[l]; t[l] === r; )
                                l++,
                                r--;
                            i = i.concat(n.findUnmatched(t, l, r))
                        }
                        return o.length > 0 && i.push(o),
                        i
                    }
                    ,
                    n.removePseudoknotsFromPairtable = function(t) {
                        for (var e = n.maximumMatching(t), r = n.backtrackMaximumMatching(e, t), i = [], o = 1; o < t.length; o++)
                            t[o] < o || r[o] != t[o] && (i.push([o, t[o]]),
                            t[t[o]] = 0,
                            t[o] = 0);
                        return i
                    }
                    ,
                    n.ptToElements = function(t, e, i, o, a) {
                        var u = []
                          , l = [i - 1]
                          , s = [o + 1];
                        if (arguments.length < 5 && (a = []),
                        i > o)
                            return [];
                        for (; 0 === t[i]; i++)
                            l.push(i);
                        for (; 0 === t[o]; o--)
                            s.push(o);
                        if (i > o) {
                            if (l.push(i),
                            0 === e)
                                return [["e", e, l.sort(r)]];
                            for (var c = !1, f = [], h = [], p = 0; p < l.length; p++)
                                c ? h.push(l[p]) : f.push(l[p]),
                                a.indexOf(l[p]) >= 0 && (c = !0);
                            return [["h", e, l.sort(r)]]
                        }
                        if (t[i] != o) {
                            var d = l
                              , p = i;
                            for (d.push(p); o >= p; ) {
                                for (u = u.concat(n.ptToElements(t, e, p, t[p], a)),
                                d.push(t[p]),
                                p = t[p] + 1; 0 === t[p] && o >= p; p++)
                                    d.push(p);
                                d.push(p)
                            }
                            return d.pop(),
                            (d = d.concat(s)).length > 0 && (0 === e ? u.push(["e", e, d.sort(r)]) : u.push(["m", e, d.sort(r)])),
                            u
                        }
                        if (t[i] === o) {
                            l.push(i),
                            s.push(o);
                            var g = l.concat(s);
                            g.length > 4 && (0 === e ? u.push(["e", e, l.concat(s).sort(r)]) : u.push(["i", e, l.concat(s).sort(r)]))
                        }
                        for (var v = []; t[i] === o && o > i; )
                            v.push(i),
                            v.push(o),
                            i += 1,
                            o -= 1,
                            e += 1;
                        return l = [i - 1],
                        s = [o + 1],
                        u.push(["s", e, v.sort(r)]),
                        u.concat(n.ptToElements(t, e, i, o, a))
                    }
                }
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                t.arraysEqual = function(n, t) {
                    if (n === t)
                        return !0;
                    if (null === n || null === t)
                        return !1;
                    if (n.length != t.length)
                        return !1;
                    for (var e = 0; e < n.length; ++e)
                        if (n[e] !== t[e])
                            return !1;
                    return !0
                }
                ,
                t.RNAUtilities = e,
                t.ColorScheme = function(n) {
                    var t = this;
                    return t.colorsText = n,
                    t.parseRange = function(n) {
                        for (var t = n.split(","), e = [], r = 0; r < t.length; r++) {
                            var i = t[r].split("-");
                            if (1 == i.length)
                                e.push(parseInt(i[0]));
                            else if (2 == i.length)
                                for (var o = parseInt(i[0]), a = parseInt(i[1]), u = o; a >= u; u++)
                                    e.push(u);
                            else
                                console.log("Malformed range (too many dashes):", n)
                        }
                        return e
                    }
                    ,
                    t.parseColorText = function(n) {
                        for (var e = n.split("\n"), r = "", i = 1, o = {
                            colorValues: {
                                "": {}
                            },
                            range: ["white", "steelblue"]
                        }, a = [], u = 0; u < e.length; u++)
                            if (">" != e[u][0])
                                for (var l = e[u].trim().split(/[\s]+/), s = 0; s < l.length; s++)
                                    if (isNaN(l[s])) {
                                        if (0 === l[s].search("range")) {
                                            var c = l[s].split("=")
                                              , f = c[1].split(":");
                                            o.range = [f[0], f[1]];
                                            continue
                                        }
                                        if (0 == l[s].search("domain")) {
                                            var h = l[s].split("=")
                                              , f = h[1].split(":");
                                            o.domain = [f[0], f[1]];
                                            continue
                                        }
                                        for (var p = l[s].split(":"), d = t.parseRange(p[0]), g = p[1], v = 0; v < d.length; v++)
                                            isNaN(g) ? o.colorValues[r][d[v]] = g : (o.colorValues[r][d[v]] = +g,
                                            a.push(Number(g)))
                                    } else
                                        o.colorValues[r][i] = Number(l[s]),
                                        i += 1,
                                        a.push(Number(l[s]));
                            else
                                r = e[u].trim().slice(1),
                                i = 1,
                                o.colorValues[r] = {};
                        return "domain"in o || (o.domain = [Math.min.apply(null, a), Math.max.apply(null, a)]),
                        t.colorsJson = o,
                        t
                    }
                    ,
                    t.normalizeColors = function() {
                        var n;
                        for (var e in t.colorsJson) {
                            var r = Number.MAX_VALUE
                              , i = Number.MIN_VALUE;
                            for (var o in t.colorsJson.colorValues[e])
                                "number" == typeof (n = t.colorsJson.colorValues[e][o]) && (r > n && (r = n),
                                n > i && (i = n));
                            for (o in t.colorsJson.colorValues[e])
                                "number" == typeof (n = t.colorsJson.colorValues[e][o]) && (t.colorsJson.colorValues[e][o] = (n - r) / (i - r))
                        }
                        return t
                    }
                    ,
                    t.parseColorText(t.colorsText),
                    t
                }
                ;
                var r = function(n, t) {
                    return n - t
                };
                t.rnaUtilities = new e
            }
            ])
        }
        , function(n, t) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.simpleXyCoordinates = function(n) {
                var t, e, r, i = [], o = [];
                e = n[0];
                var a = Array.apply(null, new Array(e + 5)).map(Number.prototype.valueOf, 0)
                  , u = Array.apply(null, new Array(16 + Math.floor(e / 5))).map(Number.prototype.valueOf, 0)
                  , l = Array.apply(null, new Array(16 + Math.floor(e / 5))).map(Number.prototype.valueOf, 0)
                  , s = 0
                  , c = 0
                  , f = Math.PI / 2;
                (function n(t, e, r) {
                    var i, o, h, p, d, g, v, m, y, x, b, k, M = 2, w = 0, _ = 0, N = Array.apply(null, new Array(3 + 2 * Math.floor((e - t) / 5))).map(Number.prototype.valueOf, 0);
                    for (i = t - 1,
                    e++; t != e; )
                        if ((o = r[t]) && 0 != t) {
                            M += 2,
                            h = t,
                            p = o,
                            N[++w] = h,
                            N[++w] = p,
                            t = o + 1,
                            d = h,
                            g = p,
                            m = 0;
                            do {
                                h++,
                                p--,
                                m++
                            } while (r[h] == p && r[h] > h);
                            if (v = m - 2,
                            m >= 2 && (a[d + 1 + v] += f,
                            a[g - 1 - v] += f,
                            a[d] += f,
                            a[g] += f,
                            m > 2))
                                for (; v >= 1; v--)
                                    a[d + v] = Math.PI,
                                    a[g - v] = Math.PI;
                            l[++c] = m,
                            p >= h && n(h, p, r)
                        } else
                            t++,
                            M++,
                            _++;
                    for (k = Math.PI * (M - 2) / M,
                    N[++w] = e,
                    y = 0 > i ? 0 : i,
                    x = 1; w >= x; x++) {
                        for (b = N[x] - y,
                        v = 0; b >= v; v++)
                            a[y + v] += k;
                        if (x > w)
                            break;
                        y = N[++x]
                    }
                    u[++s] = _
                }
                )(0, e + 1, n),
                u[s] -= 2,
                r = 0,
                i[0] = 100,
                o[0] = 100;
                var h = [];
                for (h.push([i[0], o[0]]),
                t = 1; e > t; t++)
                    i[t] = i[t - 1] + 15 * Math.cos(r),
                    o[t] = o[t - 1] + 15 * Math.sin(r),
                    h.push([i[t], o[t]]),
                    r += Math.PI - a[t + 1];
                return h
            }
        }
        ])
    }
    ,
    n.exports = o()
}
, function(n, t, e) {
    "use strict";
    var r = function() {}
      , i = {}
      , o = {}
      , a = null
      , u = {
        mark: r,
        measure: r
    };
    try {
        "undefined" != typeof window && (i = window),
        "undefined" != typeof document && (o = document),
        "undefined" != typeof MutationObserver && (a = MutationObserver),
        "undefined" != typeof performance && (u = performance)
    } catch (n) {}
    var l = (i.navigator || {}).userAgent
      , s = void 0 === l ? "" : l
      , c = i
      , f = o
      , h = a
      , p = u
      , d = !!c.document
      , g = !!f.documentElement && !!f.head && "function" == typeof f.addEventListener && "function" == typeof f.createElement
      , v = ~s.indexOf("MSIE") || ~s.indexOf("Trident/")
      , m = 16
      , y = "data-fa-i2svg"
      , x = "data-fa-pseudo-element"
      , b = "fontawesome-i2svg"
      , k = function() {
        try {
            return !0
        } catch (n) {
            return !1
        }
    }()
      , M = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      , w = M.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20])
      , _ = ["class", "data-prefix", "data-icon", "data-fa-transform", "data-fa-mask"]
      , N = ["xs", "sm", "lg", "fw", "ul", "li", "border", "pull-left", "pull-right", "spin", "pulse", "rotate-90", "rotate-180", "rotate-270", "flip-horizontal", "flip-vertical", "stack", "stack-1x", "stack-2x", "inverse", "layers", "layers-text", "layers-counter"].concat(M.map(function(n) {
        return n + "x"
    })).concat(w.map(function(n) {
        return "w-" + n
    }))
      , S = function(n, t) {
        if (!(n instanceof t))
            throw new TypeError("Cannot call a class as a function")
    }
      , A = function() {
        function n(n, t) {
            for (var e = 0; e < t.length; e++) {
                var r = t[e];
                r.enumerable = r.enumerable || !1,
                r.configurable = !0,
                "value"in r && (r.writable = !0),
                Object.defineProperty(n, r.key, r)
            }
        }
        return function(t, e, r) {
            return e && n(t.prototype, e),
            r && n(t, r),
            t
        }
    }()
      , L = Object.assign || function(n) {
        for (var t = 1; t < arguments.length; t++) {
            var e = arguments[t];
            for (var r in e)
                Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r])
        }
        return n
    }
      , E = function(n) {
        if (Array.isArray(n)) {
            for (var t = 0, e = Array(n.length); t < n.length; t++)
                e[t] = n[t];
            return e
        }
        return Array.from(n)
    }
      , T = c.FontAwesomeConfig || {}
      , C = Object.keys(T)
      , z = L({
        familyPrefix: "fa",
        replacementClass: "svg-inline--fa",
        autoReplaceSvg: !0,
        autoAddCss: !0,
        autoA11y: !0,
        searchPseudoElements: !1,
        observeMutations: !0,
        keepOriginalSource: !0,
        measurePerformance: !1,
        showMissingIcons: !0
    }, T);
    z.autoReplaceSvg || (z.observeMutations = !1);
    var P = L({}, z);
    function O(n) {
        var t = (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}).asNewDefault
          , e = void 0 !== t && t
          , r = Object.keys(P)
          , i = e ? function(n) {
            return ~r.indexOf(n) && !~C.indexOf(n)
        }
        : function(n) {
            return ~r.indexOf(n)
        }
        ;
        Object.keys(n).forEach(function(t) {
            i(t) && (P[t] = n[t])
        })
    }
    c.FontAwesomeConfig = P;
    var q = c || {};
    q.___FONT_AWESOME___ || (q.___FONT_AWESOME___ = {}),
    q.___FONT_AWESOME___.styles || (q.___FONT_AWESOME___.styles = {}),
    q.___FONT_AWESOME___.hooks || (q.___FONT_AWESOME___.hooks = {}),
    q.___FONT_AWESOME___.shims || (q.___FONT_AWESOME___.shims = []);
    var R = q.___FONT_AWESOME___
      , j = []
      , U = !1;
    g && ((U = (f.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(f.readyState)) || f.addEventListener("DOMContentLoaded", function n() {
        f.removeEventListener("DOMContentLoaded", n),
        U = 1,
        j.map(function(n) {
            return n()
        })
    }));
    var D = function(n) {
        g && (U ? setTimeout(n, 0) : j.push(n))
    }
      , F = m
      , I = {
        size: 16,
        x: 0,
        y: 0,
        rotate: 0,
        flipX: !1,
        flipY: !1
    };
    function H(n) {
        if (n && g) {
            var t = f.createElement("style");
            t.setAttribute("type", "text/css"),
            t.innerHTML = n;
            for (var e = f.head.childNodes, r = null, i = e.length - 1; i > -1; i--) {
                var o = e[i]
                  , a = (o.tagName || "").toUpperCase();
                ["STYLE", "LINK"].indexOf(a) > -1 && (r = o)
            }
            return f.head.insertBefore(t, r),
            n
        }
    }
    var B = 0;
    function V() {
        return ++B
    }
    function Y(n) {
        for (var t = [], e = (n || []).length >>> 0; e--; )
            t[e] = n[e];
        return t
    }
    function X(n) {
        return n.classList ? Y(n.classList) : (n.getAttribute("class") || "").split(" ").filter(function(n) {
            return n
        })
    }
    function W(n, t) {
        var e, r = t.split("-"), i = r[0], o = r.slice(1).join("-");
        return i !== n || "" === o || (e = o,
        ~N.indexOf(e)) ? null : o
    }
    function J(n) {
        return ("" + n).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    }
    function G(n) {
        return Object.keys(n || {}).reduce(function(t, e) {
            return t + (e + ": ") + n[e] + ";"
        }, "")
    }
    function Z(n) {
        return n.size !== I.size || n.x !== I.x || n.y !== I.y || n.rotate !== I.rotate || n.flipX || n.flipY
    }
    function $(n) {
        var t = n.transform
          , e = n.containerWidth
          , r = n.iconWidth;
        return {
            outer: {
                transform: "translate(" + e / 2 + " 256)"
            },
            inner: {
                transform: "translate(" + 32 * t.x + ", " + 32 * t.y + ") " + " " + ("scale(" + t.size / 16 * (t.flipX ? -1 : 1) + ", " + t.size / 16 * (t.flipY ? -1 : 1) + ") ") + " " + ("rotate(" + t.rotate + " 0 0)")
            },
            path: {
                transform: "translate(" + r / 2 * -1 + " -256)"
            }
        }
    }
    var K = {
        x: 0,
        y: 0,
        width: "100%",
        height: "100%"
    }
      , Q = function(n) {
        var t = n.children
          , e = n.attributes
          , r = n.main
          , i = n.mask
          , o = n.transform
          , a = r.width
          , u = r.icon
          , l = i.width
          , s = i.icon
          , c = $({
            transform: o,
            containerWidth: l,
            iconWidth: a
        })
          , f = {
            tag: "rect",
            attributes: L({}, K, {
                fill: "white"
            })
        }
          , h = {
            tag: "g",
            attributes: L({}, c.inner),
            children: [{
                tag: "path",
                attributes: L({}, u.attributes, c.path, {
                    fill: "black"
                })
            }]
        }
          , p = {
            tag: "g",
            attributes: L({}, c.outer),
            children: [h]
        }
          , d = "mask-" + V()
          , g = "clip-" + V()
          , v = {
            tag: "defs",
            children: [{
                tag: "clipPath",
                attributes: {
                    id: g
                },
                children: [s]
            }, {
                tag: "mask",
                attributes: L({}, K, {
                    id: d,
                    maskUnits: "userSpaceOnUse",
                    maskContentUnits: "userSpaceOnUse"
                }),
                children: [f, p]
            }]
        };
        return t.push(v, {
            tag: "rect",
            attributes: L({
                fill: "currentColor",
                "clip-path": "url(#" + g + ")",
                mask: "url(#" + d + ")"
            }, K)
        }),
        {
            children: t,
            attributes: e
        }
    }
      , nn = function(n) {
        var t = n.children
          , e = n.attributes
          , r = n.main
          , i = n.transform
          , o = G(n.styles);
        if (o.length > 0 && (e.style = o),
        Z(i)) {
            var a = $({
                transform: i,
                containerWidth: r.width,
                iconWidth: r.width
            });
            t.push({
                tag: "g",
                attributes: L({}, a.outer),
                children: [{
                    tag: "g",
                    attributes: L({}, a.inner),
                    children: [{
                        tag: r.icon.tag,
                        children: r.icon.children,
                        attributes: L({}, r.icon.attributes, a.path)
                    }]
                }]
            })
        } else
            t.push(r.icon);
        return {
            children: t,
            attributes: e
        }
    }
      , tn = function(n) {
        var t = n.children
          , e = n.main
          , r = n.mask
          , i = n.attributes
          , o = n.styles
          , a = n.transform;
        if (Z(a) && e.found && !r.found) {
            var u = {
                x: e.width / e.height / 2,
                y: .5
            };
            i.style = G(L({}, o, {
                "transform-origin": u.x + a.x / 16 + "em " + (u.y + a.y / 16) + "em"
            }))
        }
        return [{
            tag: "svg",
            attributes: i,
            children: t
        }]
    }
      , en = function(n) {
        var t = n.prefix
          , e = n.iconName
          , r = n.children
          , i = n.attributes
          , o = n.symbol
          , a = !0 === o ? t + "-" + P.familyPrefix + "-" + e : o;
        return [{
            tag: "svg",
            attributes: {
                style: "display: none;"
            },
            children: [{
                tag: "symbol",
                attributes: L({}, i, {
                    id: a
                }),
                children: r
            }]
        }]
    };
    function rn(n) {
        var t = n.icons
          , e = t.main
          , r = t.mask
          , i = n.prefix
          , o = n.iconName
          , a = n.transform
          , u = n.symbol
          , l = n.title
          , s = n.extra
          , c = n.watchable
          , f = void 0 !== c && c
          , h = r.found ? r : e
          , p = h.width
          , d = h.height
          , g = "fa-w-" + Math.ceil(p / d * 16)
          , v = [P.replacementClass, o ? P.familyPrefix + "-" + o : "", g].concat(s.classes).join(" ")
          , m = {
            children: [],
            attributes: L({}, s.attributes, {
                "data-prefix": i,
                "data-icon": o,
                class: v,
                role: "img",
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 " + p + " " + d
            })
        };
        f && (m.attributes[y] = ""),
        l && m.children.push({
            tag: "title",
            attributes: {
                id: m.attributes["aria-labelledby"] || "title-" + V()
            },
            children: [l]
        });
        var x = L({}, m, {
            prefix: i,
            iconName: o,
            main: e,
            mask: r,
            transform: a,
            symbol: u,
            styles: s.styles
        })
          , b = r.found && e.found ? Q(x) : nn(x)
          , k = b.children
          , M = b.attributes;
        return x.children = k,
        x.attributes = M,
        u ? en(x) : tn(x)
    }
    function on(n) {
        var t = n.content
          , e = n.width
          , r = n.height
          , i = n.transform
          , o = n.title
          , a = n.extra
          , u = n.watchable
          , l = void 0 !== u && u
          , s = L({}, a.attributes, o ? {
            title: o
        } : {}, {
            class: a.classes.join(" ")
        });
        l && (s[y] = "");
        var c = L({}, a.styles);
        Z(i) && (c.transform = function(n) {
            var t = n.transform
              , e = n.width
              , r = void 0 === e ? m : e
              , i = n.height
              , o = void 0 === i ? m : i
              , a = n.startCentered
              , u = void 0 !== a && a
              , l = "";
            return l += u && v ? "translate(" + (t.x / F - r / 2) + "em, " + (t.y / F - o / 2) + "em) " : u ? "translate(calc(-50% + " + t.x / F + "em), calc(-50% + " + t.y / F + "em)) " : "translate(" + t.x / F + "em, " + t.y / F + "em) ",
            l += "scale(" + t.size / F * (t.flipX ? -1 : 1) + ", " + t.size / F * (t.flipY ? -1 : 1) + ") ",
            l += "rotate(" + t.rotate + "deg) "
        }({
            transform: i,
            startCentered: !0,
            width: e,
            height: r
        }),
        c["-webkit-transform"] = c.transform);
        var f = G(c);
        f.length > 0 && (s.style = f);
        var h = [];
        return h.push({
            tag: "span",
            attributes: s,
            children: [t]
        }),
        o && h.push({
            tag: "span",
            attributes: {
                class: "sr-only"
            },
            children: [o]
        }),
        h
    }
    var an = function() {}
      , un = P.measurePerformance && p && p.mark && p.measure ? p : {
        mark: an,
        measure: an
    }
      , ln = function(n) {
        un.mark('FA "5.0.7" ' + n + " ends"),
        un.measure('FA "5.0.7" ' + n, 'FA "5.0.7" ' + n + " begins", 'FA "5.0.7" ' + n + " ends")
    }
      , sn = {
        begin: function(n) {
            return un.mark('FA "5.0.7" ' + n + " begins"),
            function() {
                return ln(n)
            }
        },
        end: ln
    }
      , cn = function(n, t, e, r) {
        var i, o, a, u = Object.keys(n), l = u.length, s = void 0 !== r ? function(n, t) {
            return function(e, r, i, o) {
                return n.call(t, e, r, i, o)
            }
        }(t, r) : t;
        for (void 0 === e ? (i = 1,
        a = n[u[0]]) : (i = 0,
        a = e); i < l; i++)
            a = s(a, n[o = u[i]], o, n);
        return a
    }
      , fn = R.styles
      , hn = R.shims
      , pn = {}
      , dn = {}
      , gn = {}
      , vn = function() {
        var n = function(n) {
            return cn(fn, function(t, e, r) {
                return t[r] = cn(e, n, {}),
                t
            }, {})
        };
        pn = n(function(n, t, e) {
            return n[t[3]] = e,
            n
        }),
        dn = n(function(n, t, e) {
            var r = t[2];
            return n[e] = e,
            r.forEach(function(t) {
                n[t] = e
            }),
            n
        });
        var t = "far"in fn;
        gn = cn(hn, function(n, e) {
            var r = e[0]
              , i = e[1]
              , o = e[2];
            return "far" !== i || t || (i = "fas"),
            n[r] = {
                prefix: i,
                iconName: o
            },
            n
        }, {})
    };
    vn();
    var mn = R.styles
      , yn = function() {
        return {
            prefix: null,
            iconName: null,
            rest: []
        }
    };
    function xn(n) {
        return n.reduce(function(n, t) {
            var e = W(P.familyPrefix, t);
            if (mn[t])
                n.prefix = t;
            else if (e) {
                var r = "fa" === n.prefix ? gn[e] || {
                    prefix: null,
                    iconName: null
                } : {};
                n.iconName = r.iconName || e,
                n.prefix = r.prefix || n.prefix
            } else
                t !== P.replacementClass && 0 !== t.indexOf("fa-w-") && n.rest.push(t);
            return n
        }, yn())
    }
    function bn(n, t, e) {
        if (n && n[t] && n[t][e])
            return {
                prefix: t,
                iconName: e,
                icon: n[t][e]
            }
    }
    function kn(n) {
        var t = n.tag
          , e = n.attributes
          , r = void 0 === e ? {} : e
          , i = n.children
          , o = void 0 === i ? [] : i;
        return "string" == typeof n ? J(n) : "<" + t + " " + function(n) {
            return Object.keys(n || {}).reduce(function(t, e) {
                return t + (e + '="') + J(n[e]) + '" '
            }, "").trim()
        }(r) + ">" + o.map(kn).join("") + "</" + t + ">"
    }
    var Mn = function() {};
    function wn(n) {
        return "string" == typeof (n.getAttribute ? n.getAttribute(y) : null)
    }
    var _n = {
        replace: function(n) {
            var t = n[0]
              , e = n[1].map(function(n) {
                return kn(n)
            }).join("\n");
            if (t.parentNode && t.outerHTML)
                t.outerHTML = e + (P.keepOriginalSource && "svg" !== t.tagName.toLowerCase() ? "\x3c!-- " + t.outerHTML + " --\x3e" : "");
            else if (t.parentNode) {
                var r = document.createElement("span");
                t.parentNode.replaceChild(r, t),
                r.outerHTML = e
            }
        },
        nest: function(n) {
            var t = n[0]
              , e = n[1];
            if (~X(t).indexOf(P.replacementClass))
                return _n.replace(n);
            var r = new RegExp(P.familyPrefix + "-.*");
            delete e[0].attributes.style;
            var i = e[0].attributes.class.split(" ").reduce(function(n, t) {
                return t === P.replacementClass || t.match(r) ? n.toSvg.push(t) : n.toNode.push(t),
                n
            }, {
                toNode: [],
                toSvg: []
            });
            e[0].attributes.class = i.toSvg.join(" ");
            var o = e.map(function(n) {
                return kn(n)
            }).join("\n");
            t.setAttribute("class", i.toNode.join(" ")),
            t.setAttribute(y, ""),
            t.innerHTML = o
        }
    };
    function Nn(n, t) {
        var e = "function" == typeof t ? t : Mn;
        0 === n.length ? e() : (c.requestAnimationFrame || function(n) {
            return n()
        }
        )(function() {
            var t = !0 === P.autoReplaceSvg ? _n.replace : _n[P.autoReplaceSvg] || _n.replace
              , r = sn.begin("mutate");
            n.map(t),
            r(),
            e()
        })
    }
    var Sn = !1;
    var An = null;
    var Ln = function(n) {
        var t = n.getAttribute("style")
          , e = [];
        return t && (e = t.split(";").reduce(function(n, t) {
            var e = t.split(":")
              , r = e[0]
              , i = e.slice(1);
            return r && i.length > 0 && (n[r] = i.join(":").trim()),
            n
        }, {})),
        e
    };
    var En = function(n) {
        var t, e, r = n.getAttribute("data-prefix"), i = n.getAttribute("data-icon"), o = void 0 !== n.innerText ? n.innerText.trim() : "", a = xn(X(n));
        return r && i && (a.prefix = r,
        a.iconName = i),
        a.prefix && o.length > 1 ? a.iconName = (t = a.prefix,
        e = n.innerText,
        dn[t][e]) : a.prefix && 1 === o.length && (a.iconName = function(n, t) {
            return pn[n][t]
        }(a.prefix, function(n) {
            for (var t = "", e = 0; e < n.length; e++)
                t += ("000" + n.charCodeAt(e).toString(16)).slice(-4);
            return t
        }(n.innerText))),
        a
    }
      , Tn = function(n) {
        var t = {
            size: 16,
            x: 0,
            y: 0,
            flipX: !1,
            flipY: !1,
            rotate: 0
        };
        return n ? n.toLowerCase().split(" ").reduce(function(n, t) {
            var e = t.toLowerCase().split("-")
              , r = e[0]
              , i = e.slice(1).join("-");
            if (r && "h" === i)
                return n.flipX = !0,
                n;
            if (r && "v" === i)
                return n.flipY = !0,
                n;
            if (i = parseFloat(i),
            isNaN(i))
                return n;
            switch (r) {
            case "grow":
                n.size = n.size + i;
                break;
            case "shrink":
                n.size = n.size - i;
                break;
            case "left":
                n.x = n.x - i;
                break;
            case "right":
                n.x = n.x + i;
                break;
            case "up":
                n.y = n.y - i;
                break;
            case "down":
                n.y = n.y + i;
                break;
            case "rotate":
                n.rotate = n.rotate + i
            }
            return n
        }, t) : t
    }
      , Cn = function(n) {
        return Tn(n.getAttribute("data-fa-transform"))
    }
      , zn = function(n) {
        var t = n.getAttribute("data-fa-symbol");
        return null !== t && ("" === t || t)
    }
      , Pn = function(n) {
        var t = Y(n.attributes).reduce(function(n, t) {
            return "class" !== n.name && "style" !== n.name && (n[t.name] = t.value),
            n
        }, {})
          , e = n.getAttribute("title");
        return P.autoA11y && (e ? t["aria-labelledby"] = P.replacementClass + "-title-" + V() : t["aria-hidden"] = "true"),
        t
    }
      , On = function(n) {
        var t = n.getAttribute("data-fa-mask");
        return t ? xn(t.split(" ").map(function(n) {
            return n.trim()
        })) : yn()
    };
    function qn(n) {
        this.name = "MissingIcon",
        this.message = n || "Icon unavailable",
        this.stack = (new Error).stack
    }
    qn.prototype = Object.create(Error.prototype),
    qn.prototype.constructor = qn;
    var Rn = {
        fill: "currentColor"
    }
      , jn = {
        attributeType: "XML",
        repeatCount: "indefinite",
        dur: "2s"
    }
      , Un = {
        tag: "path",
        attributes: L({}, Rn, {
            d: "M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"
        })
    }
      , Dn = L({}, jn, {
        attributeName: "opacity"
    })
      , Fn = {
        tag: "g",
        children: [Un, {
            tag: "circle",
            attributes: L({}, Rn, {
                cx: "256",
                cy: "364",
                r: "28"
            }),
            children: [{
                tag: "animate",
                attributes: L({}, jn, {
                    attributeName: "r",
                    values: "28;14;28;28;14;28;"
                })
            }, {
                tag: "animate",
                attributes: L({}, Dn, {
                    values: "1;0;1;1;0;1;"
                })
            }]
        }, {
            tag: "path",
            attributes: L({}, Rn, {
                opacity: "1",
                d: "M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"
            }),
            children: [{
                tag: "animate",
                attributes: L({}, Dn, {
                    values: "1;0;0;0;0;1;"
                })
            }]
        }, {
            tag: "path",
            attributes: L({}, Rn, {
                opacity: "0",
                d: "M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"
            }),
            children: [{
                tag: "animate",
                attributes: L({}, Dn, {
                    values: "0;0;1;1;0;0;"
                })
            }]
        }]
    }
      , In = R.styles
      , Hn = "fa-layers-text"
      , Bn = /Font Awesome 5 (Solid|Regular|Light|Brands)/
      , Vn = {
        Solid: "fas",
        Regular: "far",
        Light: "fal",
        Brands: "fab"
    };
    function Yn(n, t) {
        var e = {
            found: !1,
            width: 512,
            height: 512,
            icon: Fn
        };
        if (n && t && In[t] && In[t][n]) {
            var r = In[t][n];
            e = {
                found: !0,
                width: r[0],
                height: r[1],
                icon: {
                    tag: "path",
                    attributes: {
                        fill: "currentColor",
                        d: r.slice(4)[0]
                    }
                }
            }
        } else if (n && t && !P.showMissingIcons)
            throw new qn("Icon is missing for prefix " + t + " with icon name " + n);
        return e
    }
    function Xn(n) {
        var t = function(n) {
            var t = En(n)
              , e = t.iconName
              , r = t.prefix
              , i = t.rest
              , o = Ln(n)
              , a = Cn(n)
              , u = zn(n)
              , l = Pn(n)
              , s = On(n);
            return {
                iconName: e,
                title: n.getAttribute("title"),
                prefix: r,
                transform: a,
                symbol: u,
                mask: s,
                extra: {
                    classes: i,
                    styles: o,
                    attributes: l
                }
            }
        }(n);
        return ~t.extra.classes.indexOf(Hn) ? function(n, t) {
            var e = t.title
              , r = t.transform
              , i = t.extra
              , o = null
              , a = null;
            if (v) {
                var u = parseInt(getComputedStyle(n).fontSize, 10)
                  , l = n.getBoundingClientRect();
                o = l.width / u,
                a = l.height / u
            }
            return P.autoA11y && !e && (i.attributes["aria-hidden"] = "true"),
            [n, on({
                content: n.innerHTML,
                width: o,
                height: a,
                transform: r,
                title: e,
                extra: i,
                watchable: !0
            })]
        }(n, t) : function(n, t) {
            var e = t.iconName
              , r = t.title
              , i = t.prefix
              , o = t.transform
              , a = t.symbol
              , u = t.mask
              , l = t.extra;
            return [n, rn({
                icons: {
                    main: Yn(e, i),
                    mask: Yn(u.iconName, u.prefix)
                },
                prefix: i,
                iconName: e,
                transform: o,
                symbol: a,
                mask: u,
                title: r,
                extra: l,
                watchable: !0
            })]
        }(n, t)
    }
    function Wn(n) {
        "function" == typeof n.remove ? n.remove() : n && n.parentNode && n.parentNode.removeChild(n)
    }
    function Jn(n) {
        if (g) {
            var t = sn.begin("searchPseudoElements");
            Sn = !0,
            function() {
                Y(n.querySelectorAll("*")).forEach(function(n) {
                    [":before", ":after"].forEach(function(t) {
                        var e = c.getComputedStyle(n, t)
                          , r = e.getPropertyValue("font-family").match(Bn)
                          , i = Y(n.children).filter(function(n) {
                            return n.getAttribute(x) === t
                        })[0];
                        if (i && (i.nextSibling && i.nextSibling.textContent.indexOf(x) > -1 && Wn(i.nextSibling),
                        Wn(i),
                        i = null),
                        r && !i) {
                            var o = e.getPropertyValue("content")
                              , a = f.createElement("i");
                            a.setAttribute("class", "" + Vn[r[1]]),
                            a.setAttribute(x, t),
                            a.innerText = 3 === o.length ? o.substr(1, 1) : o,
                            ":before" === t ? n.insertBefore(a, n.firstChild) : n.appendChild(a)
                        }
                    })
                })
            }(),
            Sn = !1,
            t()
        }
    }
    function Gn(n) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
        if (g) {
            var e = f.documentElement.classList
              , r = function(n) {
                return e.add(b + "-" + n)
            }
              , i = function(n) {
                return e.remove(b + "-" + n)
            }
              , o = Object.keys(In)
              , a = ["." + Hn + ":not([" + y + "])"].concat(o.map(function(n) {
                return "." + n + ":not([" + y + "])"
            })).join(", ");
            if (0 !== a.length) {
                var u = Y(n.querySelectorAll(a));
                if (u.length > 0) {
                    r("pending"),
                    i("complete");
                    var l = sn.begin("onTree")
                      , s = u.reduce(function(n, t) {
                        try {
                            var e = Xn(t);
                            e && n.push(e)
                        } catch (n) {
                            k || n instanceof qn && console.error(n)
                        }
                        return n
                    }, []);
                    l(),
                    Nn(s, function() {
                        r("active"),
                        r("complete"),
                        i("pending"),
                        "function" == typeof t && t()
                    })
                }
            }
        }
    }
    function Zn(n) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null
          , e = Xn(n);
        e && Nn([e], t)
    }
    var $n = function() {
        var n = "svg-inline--fa"
          , t = P.familyPrefix
          , e = P.replacementClass
          , r = 'svg:not(:root).svg-inline--fa {\n  overflow: visible; }\n\n.svg-inline--fa {\n  display: inline-block;\n  font-size: inherit;\n  height: 1em;\n  overflow: visible;\n  vertical-align: -.125em; }\n  .svg-inline--fa.fa-lg {\n    vertical-align: -.225em; }\n  .svg-inline--fa.fa-w-1 {\n    width: 0.0625em; }\n  .svg-inline--fa.fa-w-2 {\n    width: 0.125em; }\n  .svg-inline--fa.fa-w-3 {\n    width: 0.1875em; }\n  .svg-inline--fa.fa-w-4 {\n    width: 0.25em; }\n  .svg-inline--fa.fa-w-5 {\n    width: 0.3125em; }\n  .svg-inline--fa.fa-w-6 {\n    width: 0.375em; }\n  .svg-inline--fa.fa-w-7 {\n    width: 0.4375em; }\n  .svg-inline--fa.fa-w-8 {\n    width: 0.5em; }\n  .svg-inline--fa.fa-w-9 {\n    width: 0.5625em; }\n  .svg-inline--fa.fa-w-10 {\n    width: 0.625em; }\n  .svg-inline--fa.fa-w-11 {\n    width: 0.6875em; }\n  .svg-inline--fa.fa-w-12 {\n    width: 0.75em; }\n  .svg-inline--fa.fa-w-13 {\n    width: 0.8125em; }\n  .svg-inline--fa.fa-w-14 {\n    width: 0.875em; }\n  .svg-inline--fa.fa-w-15 {\n    width: 0.9375em; }\n  .svg-inline--fa.fa-w-16 {\n    width: 1em; }\n  .svg-inline--fa.fa-w-17 {\n    width: 1.0625em; }\n  .svg-inline--fa.fa-w-18 {\n    width: 1.125em; }\n  .svg-inline--fa.fa-w-19 {\n    width: 1.1875em; }\n  .svg-inline--fa.fa-w-20 {\n    width: 1.25em; }\n  .svg-inline--fa.fa-pull-left {\n    margin-right: .3em;\n    width: auto; }\n  .svg-inline--fa.fa-pull-right {\n    margin-left: .3em;\n    width: auto; }\n  .svg-inline--fa.fa-border {\n    height: 1.5em; }\n  .svg-inline--fa.fa-li {\n    width: 2em; }\n  .svg-inline--fa.fa-fw {\n    width: 1.25em; }\n\n.fa-layers svg.svg-inline--fa {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0; }\n\n.fa-layers {\n  display: inline-block;\n  height: 1em;\n  position: relative;\n  text-align: center;\n  vertical-align: -.125em;\n  width: 1em; }\n  .fa-layers svg.svg-inline--fa {\n    -webkit-transform-origin: center center;\n            transform-origin: center center; }\n\n.fa-layers-text, .fa-layers-counter {\n  display: inline-block;\n  position: absolute;\n  text-align: center; }\n\n.fa-layers-text {\n  left: 50%;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  -webkit-transform-origin: center center;\n          transform-origin: center center; }\n\n.fa-layers-counter {\n  background-color: #ff253a;\n  border-radius: 1em;\n  color: #fff;\n  height: 1.5em;\n  line-height: 1;\n  max-width: 5em;\n  min-width: 1.5em;\n  overflow: hidden;\n  padding: .25em;\n  right: 0;\n  text-overflow: ellipsis;\n  top: 0;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: top right;\n          transform-origin: top right; }\n\n.fa-layers-bottom-right {\n  bottom: 0;\n  right: 0;\n  top: auto;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: bottom right;\n          transform-origin: bottom right; }\n\n.fa-layers-bottom-left {\n  bottom: 0;\n  left: 0;\n  right: auto;\n  top: auto;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: bottom left;\n          transform-origin: bottom left; }\n\n.fa-layers-top-right {\n  right: 0;\n  top: 0;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: top right;\n          transform-origin: top right; }\n\n.fa-layers-top-left {\n  left: 0;\n  right: auto;\n  top: 0;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: top left;\n          transform-origin: top left; }\n\n.fa-lg {\n  font-size: 1.33333em;\n  line-height: 0.75em;\n  vertical-align: -.0667em; }\n\n.fa-xs {\n  font-size: .75em; }\n\n.fa-sm {\n  font-size: .875em; }\n\n.fa-1x {\n  font-size: 1em; }\n\n.fa-2x {\n  font-size: 2em; }\n\n.fa-3x {\n  font-size: 3em; }\n\n.fa-4x {\n  font-size: 4em; }\n\n.fa-5x {\n  font-size: 5em; }\n\n.fa-6x {\n  font-size: 6em; }\n\n.fa-7x {\n  font-size: 7em; }\n\n.fa-8x {\n  font-size: 8em; }\n\n.fa-9x {\n  font-size: 9em; }\n\n.fa-10x {\n  font-size: 10em; }\n\n.fa-fw {\n  text-align: center;\n  width: 1.25em; }\n\n.fa-ul {\n  list-style-type: none;\n  margin-left: 2.5em;\n  padding-left: 0; }\n  .fa-ul > li {\n    position: relative; }\n\n.fa-li {\n  left: -2em;\n  position: absolute;\n  text-align: center;\n  width: 2em;\n  line-height: inherit; }\n\n.fa-border {\n  border: solid 0.08em #eee;\n  border-radius: .1em;\n  padding: .2em .25em .15em; }\n\n.fa-pull-left {\n  float: left; }\n\n.fa-pull-right {\n  float: right; }\n\n.fa.fa-pull-left,\n.fas.fa-pull-left,\n.far.fa-pull-left,\n.fal.fa-pull-left,\n.fab.fa-pull-left {\n  margin-right: .3em; }\n\n.fa.fa-pull-right,\n.fas.fa-pull-right,\n.far.fa-pull-right,\n.fal.fa-pull-right,\n.fab.fa-pull-right {\n  margin-left: .3em; }\n\n.fa-spin {\n  -webkit-animation: fa-spin 2s infinite linear;\n          animation: fa-spin 2s infinite linear; }\n\n.fa-pulse {\n  -webkit-animation: fa-spin 1s infinite steps(8);\n          animation: fa-spin 1s infinite steps(8); }\n\n@-webkit-keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg); } }\n\n@keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg); } }\n\n.fa-rotate-90 {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=1)";\n  -webkit-transform: rotate(90deg);\n          transform: rotate(90deg); }\n\n.fa-rotate-180 {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2)";\n  -webkit-transform: rotate(180deg);\n          transform: rotate(180deg); }\n\n.fa-rotate-270 {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=3)";\n  -webkit-transform: rotate(270deg);\n          transform: rotate(270deg); }\n\n.fa-flip-horizontal {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1)";\n  -webkit-transform: scale(-1, 1);\n          transform: scale(-1, 1); }\n\n.fa-flip-vertical {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)";\n  -webkit-transform: scale(1, -1);\n          transform: scale(1, -1); }\n\n.fa-flip-horizontal.fa-flip-vertical {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)";\n  -webkit-transform: scale(-1, -1);\n          transform: scale(-1, -1); }\n\n:root .fa-rotate-90,\n:root .fa-rotate-180,\n:root .fa-rotate-270,\n:root .fa-flip-horizontal,\n:root .fa-flip-vertical {\n  -webkit-filter: none;\n          filter: none; }\n\n.fa-stack {\n  display: inline-block;\n  height: 2em;\n  position: relative;\n  width: 2em; }\n\n.fa-stack-1x,\n.fa-stack-2x {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0; }\n\n.svg-inline--fa.fa-stack-1x {\n  height: 1em;\n  width: 1em; }\n\n.svg-inline--fa.fa-stack-2x {\n  height: 2em;\n  width: 2em; }\n\n.fa-inverse {\n  color: #fff; }\n\n.sr-only {\n  border: 0;\n  clip: rect(0, 0, 0, 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  width: 1px; }\n\n.sr-only-focusable:active, .sr-only-focusable:focus {\n  clip: auto;\n  height: auto;\n  margin: 0;\n  overflow: visible;\n  position: static;\n  width: auto; }\n';
        if ("fa" !== t || e !== n) {
            var i = new RegExp("\\.fa\\-","g")
              , o = new RegExp("\\." + n,"g");
            r = r.replace(i, "." + t + "-").replace(o, "." + e)
        }
        return r
    };
    function Kn(n) {
        return {
            found: !0,
            width: n[0],
            height: n[1],
            icon: {
                tag: "path",
                attributes: {
                    fill: "currentColor",
                    d: n.slice(4)[0]
                }
            }
        }
    }
    var Qn = !1;
    function nt() {
        P.autoAddCss && (Qn || H($n()),
        Qn = !0)
    }
    function tt(n, t) {
        return Object.defineProperty(n, "abstract", {
            get: t
        }),
        Object.defineProperty(n, "html", {
            get: function() {
                return n.abstract.map(function(n) {
                    return kn(n)
                })
            }
        }),
        Object.defineProperty(n, "node", {
            get: function() {
                if (g) {
                    var t = f.createElement("div");
                    return t.innerHTML = n.html,
                    t.children
                }
            }
        }),
        n
    }
    function et(n) {
        var t = n.prefix
          , e = void 0 === t ? "fa" : t
          , r = n.iconName;
        if (r)
            return bn(it.definitions, e, r) || bn(R.styles, e, r)
    }
    var rt, it = new (function() {
        function n() {
            S(this, n),
            this.definitions = {}
        }
        return A(n, [{
            key: "add",
            value: function() {
                for (var n = this, t = arguments.length, e = Array(t), r = 0; r < t; r++)
                    e[r] = arguments[r];
                var i = e.reduce(this._pullDefinitions, {});
                Object.keys(i).forEach(function(t) {
                    n.definitions[t] = L({}, n.definitions[t] || {}, i[t]),
                    function n(t, e) {
                        var r = Object.keys(e).reduce(function(n, t) {
                            var r = e[t];
                            return r.icon ? n[r.iconName] = r.icon : n[t] = r,
                            n
                        }, {});
                        "function" == typeof R.hooks.addPack ? R.hooks.addPack(t, r) : R.styles[t] = L({}, R.styles[t] || {}, r),
                        "fas" === t && n("fa", e)
                    }(t, i[t])
                })
            }
        }, {
            key: "reset",
            value: function() {
                this.definitions = {}
            }
        }, {
            key: "_pullDefinitions",
            value: function(n, t) {
                var e = t.prefix && t.iconName && t.icon ? {
                    0: t
                } : t;
                return Object.keys(e).map(function(t) {
                    var r = e[t]
                      , i = r.prefix
                      , o = r.iconName
                      , a = r.icon;
                    n[i] || (n[i] = {}),
                    n[i][o] = a
                }),
                n
            }
        }]),
        n
    }()), ot = (rt = function(n) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
          , e = t.transform
          , r = void 0 === e ? I : e
          , i = t.symbol
          , o = void 0 !== i && i
          , a = t.mask
          , u = void 0 === a ? null : a
          , l = t.title
          , s = void 0 === l ? null : l
          , c = t.classes
          , f = void 0 === c ? [] : c
          , h = t.attributes
          , p = void 0 === h ? {} : h
          , d = t.styles
          , g = void 0 === d ? {} : d;
        if (n) {
            var v = n.prefix
              , m = n.iconName
              , y = n.icon;
            return tt(L({
                type: "icon"
            }, n), function() {
                return nt(),
                P.autoA11y && (s ? p["aria-labelledby"] = P.replacementClass + "-title-" + V() : p["aria-hidden"] = "true"),
                rn({
                    icons: {
                        main: Kn(y),
                        mask: u ? Kn(u.icon) : {
                            found: !1,
                            width: null,
                            height: null,
                            icon: {}
                        }
                    },
                    prefix: v,
                    iconName: m,
                    transform: L({}, I, r),
                    symbol: o,
                    title: s,
                    extra: {
                        attributes: p,
                        styles: g,
                        classes: f
                    }
                })
            })
        }
    }
    ,
    function(n) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
          , e = (n || {}).icon ? n : et(n || {})
          , r = t.mask;
        return r && (r = (r || {}).icon ? r : et(r || {})),
        rt(e, L({}, t, {
            mask: r
        }))
    }
    ), at = {
        noAuto: function() {
            var n;
            O({
                autoReplaceSvg: n = !1,
                observeMutations: n
            }),
            An && An.disconnect()
        },
        dom: {
            i2svg: function() {
                var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                if (g) {
                    nt();
                    var t = n.node
                      , e = void 0 === t ? f : t
                      , r = n.callback
                      , i = void 0 === r ? function() {}
                    : r;
                    P.searchPseudoElements && Jn(e),
                    Gn(e, i)
                }
            },
            css: $n,
            insertCss: function() {
                H($n())
            }
        },
        library: it,
        parse: {
            transform: function(n) {
                return Tn(n)
            }
        },
        findIconDefinition: et,
        icon: ot,
        text: function(n) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
              , e = t.transform
              , r = void 0 === e ? I : e
              , i = t.title
              , o = void 0 === i ? null : i
              , a = t.classes
              , u = void 0 === a ? [] : a
              , l = t.attributes
              , s = void 0 === l ? {} : l
              , c = t.styles
              , f = void 0 === c ? {} : c;
            return tt({
                type: "text",
                content: n
            }, function() {
                return nt(),
                on({
                    content: n,
                    transform: L({}, I, r),
                    title: o,
                    extra: {
                        attributes: s,
                        styles: f,
                        classes: [P.familyPrefix + "-layers-text"].concat(E(u))
                    }
                })
            })
        },
        layer: function(n) {
            return tt({
                type: "layer"
            }, function() {
                nt();
                var t = [];
                return n(function(n) {
                    Array.isArray(n) ? n.map(function(n) {
                        t = t.concat(n.abstract)
                    }) : t = t.concat(n.abstract)
                }),
                [{
                    tag: "span",
                    attributes: {
                        class: P.familyPrefix + "-layers"
                    },
                    children: t
                }]
            })
        }
    }, ut = function() {
        g && P.autoReplaceSvg && at.dom.i2svg({
            node: f
        })
    };
    Object.defineProperty(at, "config", {
        get: function() {
            return P
        },
        set: function(n) {
            O(n)
        }
    }),
    g && function(n) {
        try {
            n()
        } catch (n) {
            if (!k)
                throw n
        }
    }(function() {
        d && (c.FontAwesome || (c.FontAwesome = at),
        D(function() {
            Object.keys(R.styles).length > 0 && ut(),
            P.observeMutations && "function" == typeof MutationObserver && function(n) {
                if (h) {
                    var t = n.treeCallback
                      , e = n.nodeCallback
                      , r = n.pseudoElementsCallback;
                    An = new h(function(n) {
                        Sn || Y(n).forEach(function(n) {
                            if ("childList" === n.type && n.addedNodes.length > 0 && !wn(n.addedNodes[0]) && (P.searchPseudoElements && r(n.target),
                            t(n.target)),
                            "attributes" === n.type && n.target.parentNode && P.searchPseudoElements && r(n.target.parentNode),
                            "attributes" === n.type && wn(n.target) && ~_.indexOf(n.attributeName))
                                if ("class" === n.attributeName) {
                                    var i = xn(X(n.target))
                                      , o = i.prefix
                                      , a = i.iconName;
                                    o && n.target.setAttribute("data-prefix", o),
                                    a && n.target.setAttribute("data-icon", a)
                                } else
                                    e(n.target)
                        })
                    }
                    ),
                    g && An.observe(f.getElementsByTagName("body")[0], {
                        childList: !0,
                        attributes: !0,
                        characterData: !0,
                        subtree: !0
                    })
                }
            }({
                treeCallback: Gn,
                nodeCallback: Zn,
                pseudoElementsCallback: Jn
            })
        })),
        R.hooks = L({}, R.hooks, {
            addPack: function(n, t) {
                R.styles[n] = L({}, R.styles[n] || {}, t),
                vn(),
                ut()
            },
            addShims: function(n) {
                var t;
                (t = R.shims).push.apply(t, E(n)),
                vn(),
                ut()
            }
        })
    });
    at.config;
    t.a = at
}
, function(n, t, e) {
    "use strict";
    e.d(t, "a", function() {
        return r
    }),
    e.d(t, "b", function() {
        return i
    }),
    e.d(t, "c", function() {
        return o
    }),
    e.d(t, "d", function() {
        return a
    }),
    e.d(t, "e", function() {
        return u
    }),
    e.d(t, "f", function() {
        return l
    }),
    e.d(t, "g", function() {
        return s
    }),
    e.d(t, "h", function() {
        return c
    }),
    e.d(t, "i", function() {
        return f
    }),
    e.d(t, "j", function() {
        return h
    }),
    e.d(t, "k", function() {
        return p
    }),
    e.d(t, "l", function() {
        return d
    }),
    e.d(t, "m", function() {
        return g
    }),
    e.d(t, "n", function() {
        return v
    }),
    e.d(t, "o", function() {
        return m
    }),
    e.d(t, "p", function() {
        return y
    });
    var r = {
        prefix: "fas",
        iconName: "arrow-left",
        icon: [448, 512, [], "f060", "M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"]
    }
      , i = {
        prefix: "fas",
        iconName: "check",
        icon: [512, 512, [], "f00c", "M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"]
    }
      , o = {
        prefix: "fas",
        iconName: "check-circle",
        icon: [512, 512, [], "f058", "M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"]
    }
      , a = {
        prefix: "fas",
        iconName: "circle-notch",
        icon: [512, 512, [], "f1ce", "M288 39.056v16.659c0 10.804 7.281 20.159 17.686 23.066C383.204 100.434 440 171.518 440 256c0 101.689-82.295 184-184 184-101.689 0-184-82.295-184-184 0-84.47 56.786-155.564 134.312-177.219C216.719 75.874 224 66.517 224 55.712V39.064c0-15.709-14.834-27.153-30.046-23.234C86.603 43.482 7.394 141.206 8.003 257.332c.72 137.052 111.477 246.956 248.531 246.667C393.255 503.711 504 392.788 504 256c0-115.633-79.14-212.779-186.211-240.236C302.678 11.889 288 23.456 288 39.056z"]
    }
      , u = {
        prefix: "fas",
        iconName: "download",
        icon: [512, 512, [], "f019", "M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"]
    }
      , l = {
        prefix: "fas",
        iconName: "edit",
        icon: [576, 512, [], "f044", "M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"]
    }
      , s = {
        prefix: "fas",
        iconName: "exclamation-triangle",
        icon: [576, 512, [], "f071", "M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"]
    }
      , c = {
        prefix: "fas",
        iconName: "filter",
        icon: [512, 512, [], "f0b0", "M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z"]
    }
      , f = {
        prefix: "fas",
        iconName: "info-circle",
        icon: [512, 512, [], "f05a", "M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"]
    }
      , h = {
        prefix: "fas",
        iconName: "plus-circle",
        icon: [512, 512, [], "f055", "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"]
    }
      , p = {
        prefix: "fas",
        iconName: "question-circle",
        icon: [512, 512, [], "f059", "M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"]
    }
      , d = {
        prefix: "fas",
        iconName: "sort",
        icon: [320, 512, [], "f0dc", "M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z"]
    }
      , g = {
        prefix: "fas",
        iconName: "sort-down",
        icon: [320, 512, [], "f0dd", "M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"]
    }
      , v = {
        prefix: "fas",
        iconName: "sort-up",
        icon: [320, 512, [], "f0de", "M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"]
    }
      , m = {
        prefix: "fas",
        iconName: "trash",
        icon: [448, 512, [], "f1f8", "M0 84V56c0-13.3 10.7-24 24-24h112l9.4-18.7c4-8.2 12.3-13.3 21.4-13.3h114.3c9.1 0 17.4 5.1 21.5 13.3L312 32h112c13.3 0 24 10.7 24 24v28c0 6.6-5.4 12-12 12H12C5.4 96 0 90.6 0 84zm415.2 56.7L394.8 467c-1.6 25.3-22.6 45-47.9 45H101.1c-25.3 0-46.3-19.7-47.9-45L32.8 140.7c-.4-6.9 5.1-12.7 12-12.7h358.5c6.8 0 12.3 5.8 11.9 12.7z"]
    }
      , y = {
        prefix: "fas",
        iconName: "upload",
        icon: [512, 512, [], "f093", "M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"]
    }
}
]);
