var _bind = {
    def: {},
    fn: {},
    base: {},
    device: {},
    loader: {},
    slide: {},
    menu: {},
    other: {},
    bridge: {},
    resize: {},
    window: {
        _width: $(window).width(),
        _height: $(window).height()
    },
    syncLoad: !0,
    status: {
        getStatus: function() {
            var e = this,
                t = window.frameElement;
            if (null !== t && !_bind.fn.isEmpty(t)) {
                var i = t.id;
                if ("preview-area" === i) {
                    var a = $(t).attr("src");
                    e.sitePreview = !0, -1 < a.indexOf("bindapp=1") && (e.siteEditing = !0), -1 < a.indexOf("bindapp=3") && (e.siteEditing = !0)
                } else "id-template-item-preview" === i ? e.dressListPreview = !0 : "id-preview" === i && (e.dressPreview = !0)
            }
        },
        dressListPreview: !1,
        dressPreview: !1,
        siteEditing: !1,
        sitePreview: !1
    }
};
! function(r) {
    r.base.accordion = {
        target: null,
        init: function() {
            var a = 400,
                e = $(this.target).closest(".b-accordion"),
                n = e.find(".column"),
                s = e.find(".b-accordion_navigation"),
                o = !1,
                t = "click";
            e.hasClass("-mo") && (t = "mouseenter"), "first" === e.data("open-columns") || "last" === e.data("open-columns") ? ("first" === e.data("open-columns") ? (r.fn.moveClass(s.first()), n.first().show()) : "last" === e.data("open-columns") && (r.fn.moveClass(s.last()), n.last().show()), e.hasClass("-mo") && s.on("click", function(e) {
                e.preventDefault()
            }), s.on(t, function(e) {
                if (e.preventDefault(), o) return !1;
                o = !0;
                var t = $(this);
                if (t.hasClass("-active")) return o = !1;
                var i = s.index(t);
                s.removeClass("-active"), t.addClass("-active"), n.stop(!0, !1).velocity("slideUp", a, "easeOutExpo", function() {
                    o = !1
                }), n.eq(i).stop(!0, !1).velocity("slideDown", a, "easeOutExpo", function() {
                    $(this).show(), o = !1, _.defer(function() {
                        n.find($("img").length) && $(window).trigger("resize")
                    })
                }), n.find($("img").length) && $(window).trigger("resize")
            })) : "all" !== e.data("open-columns") && "allClose" !== e.data("open-columns") || ("all" === e.data("open-columns") && (r.fn.moveClass(s), n.show()), e.hasClass("-mo") && s.on("click", function(e) {
                e.preventDefault()
            }), s.on(t, function(e) {
                if (e.preventDefault(), o) return !1;
                o = !0;
                var t = $(this),
                    i = s.index(t);
                t.hasClass("-active") ? (n.eq(i).stop(!0, !1).velocity("slideUp", a, "easeOutExpo", function() {
                    o = !1
                }), r.fn.moveClass(null, t)) : (n.eq(i).stop(!0, !1).velocity("slideDown", a, "easeOutExpo", function() {
                    $(this).show(), o = !1, _.defer(function() {
                        n.find($("img").length) && $(window).trigger("resize")
                    })
                }), r.fn.moveClass(t)), n.find($("img").length) && $(window).trigger("resize")
            }))
        },
        resize: function() {
            return !1
        }
    }
}(_bind), _bind.base.bgMovie = {
        target: null,
        nowDevice: null,
        movieTarget: null,
        init: function() {
            var i = this;
            if (i.nowDevice === _bind.fn.nowDevice()) return !1;
            setTimeout(function() {
                var e, t = $(i.target);
                if (i.nowDevice = _bind.fn.nowDevice(), "sp" === i.nowDevice || _bind.fn.isEditBlock()) return i.movieTarget && t.YTPPlayerDestroy(), void("page" === t.attr("id") && t.css("backgroundImage", "none"));
                e = t.hasClass("bg-window") ? "body" : t, i.movieTarget = null, i.movieTarget = t.mb_YTPlayer({
                    videoURL: t.data("video"),
                    autoPlay: !0,
                    showControls: !1,
                    mute: t.data("mute"),
                    loop: t.data("loop"),
                    containment: e
                }), i.soundBtnMuted(), t.on("YTPEnd", function() {
                    setTimeout(function() {
                        t.css("background", "transparent")
                    }, 1)
                })
            }, 100)
        },
        soundBtnMuted: function() {
            var e = $(this.target),
                t = $(".c-sound_btn1,.c-sound_btn2,.c-sound_btn3,.c-sound_btn4");
            (_bind.device.mobile || _bind.device.ipad || _bind.device.android) && t.addClass("js-hide"), e.data("mute") ? t.removeClass("on") : t.addClass("on"), e.on("YTPReady", function() {
                t.on("click", function() {
                    t.toggleClass("on"), e.toggleVolume()
                })
            })
        },
        resize: function() {
            this.init()
        }
    },
    function(d) {
        d.base.blockAnimation = {
            target: null,
            status: {
                animationTarget: [],
                windowEndPoint: 0,
                animationEndFlag: !1
            },
            init: function() {
                var e, t = this.status,
                    i = $(".init-block_animation"),
                    a = $(".init-sp-block_animation");
                if (t.animationTarget = [], "sp" !== d.fn.nowDevice() ? ((e = i).each(function() {
                        t.animationTarget.push($(this))
                    }), i.removeClass("init-block_animation")) : ((e = a).each(function() {
                        t.animationTarget.push($(this))
                    }), a.removeClass("init-sp-block_animation")), d.fn.isAnimationOff()) return !1;
                var n = "sp" === d.fn.nowDevice() ? "init-sp-block_animation" : "init-block_animation";
                _.each(t.animationTarget, function(e) {
                    if (t.animationEndFlag) return !1;
                    e.find(".column").addClass(n)
                }), this.eachAnimation(e)
            },
            eachAnimation: function(e) {
                var t = this;
                t.animationMain(e), $(window).off("scroll.scrollBlockAnimation"), $(window).on("scroll.scrollBlockAnimation", function() {
                    t.animationMain(e)
                })
            },
            animationMain: function(e) {
                var l = this;
                e.each(function() {
                    var e = $(this),
                        t = d.fn.nowDevice(),
                        i = "sp" === t ? e.data("sp-animated") : e.data("animated");
                    if (!i || "true" === e.data("block-animation-flag")) return !1;
                    var a = $(window).scrollTop();
                    l.status.windowEndPoint = a + d.window._height;
                    var n = e.offset().top;
                    if (l.status.windowEndPoint - d.window._height / 4 > n || Math.abs(d.window._height - $("body").get(0).scrollHeight) < 300 || l.status.windowEndPoint === $("body").get(0).scrollHeight && a + 300 < n) {
                        var s = $("#js-globalNavigation");
                        0 < $("#js-globalMegaMenu").length && (s = $("#js-globalMegaMenu"));
                        var o = s.data("slide-type"),
                            r = "pc" !== t && ("rightSlide" === o || "leftSlide" === o);
                        e.data("block-animation-flag", !0), e.find(".column").each(function(e) {
                            var t = $(this);
                            setTimeout(function() {
                                r && s.hide(), t.addClass("-" + i)
                            }, 100 * e), t.on("webkitAnimationEnd AnimationEnd", function() {
                                r && s.show(), l.animationEndActions(t, i)
                            })
                        })
                    }
                })
            },
            animationEndActions: function(e, t) {
                this.status.animationEndFlag = !0, "sp" !== d.fn.nowDevice() ? e.removeClass("init-block_animation") : e.removeClass("init-sp-block_animation")
            },
            resize: function() {
                var e = this.status,
                    t = $(".init-block_animation"),
                    i = $(".init-sp-block_animation");
                t.removeClass("init-block_animation"), i.removeClass("init-sp-block_animation"), "sp" !== d.fn.nowDevice() ? _.each(e.animationTarget, function(e) {
                    $(e).addClass("init-block_animation")
                }) : _.each(e.animationTarget, function(e) {
                    $(e).addClass("init-sp-block_animation")
                }), this.init()
            }
        }
    }(_bind),
    function(a) {
        a.base.blockSticky = {
            target: null,
            status: {
                beforeScrollTop: 0
            },
            init: function() {
                var t = this,
                    e = $(t.target);
                e.attr("id") && (e = $("#" + e.attr("id")));
                var i = a.fn.nowDevice();
                if (a.fn.isEditBlock() || "sp" === i || "tablet" === i) return $(".-js-block_sticky").each(function() {
                    var e = $(this);
                    e.removeClass("-js-block_sticky").css({
                        width: "auto",
                        top: "auto"
                    }), t.removeFakebox(e.attr("id"))
                }), !1;
                e.removeClass("-js-block_sticky"), t.status.stickyTop = e.offset().top, "none" !== $(document.body).data("page-animation") && _.delay(function() {
                    t.status.stickyTop = e.offset().top
                }, 1500), $("#page").hasClass("animsition") || t.stickyMainLogic(e), $(window).on("scroll.scrollBlockSticky", function() {
                    t.stickyMainLogic(e)
                })
            },
            stickyMainLogic: function(e) {
                var t = this,
                    i = 0,
                    a = $("#a-header"),
                    n = $("#a-ghost_header"),
                    s = 0;
                a.data("float") && (s += a.outerHeight()), i = 0 == n.length ? s : n.outerHeight();
                var o = $(window).scrollTop() + i;
                o > t.status.beforeScrollTop ? o > t.status.stickyTop - s && (t.stickyModeTransition(e, i), t.fakeBoxExistFlag(e.attr("id")) || e.after(t.createFakebox(e.attr("id")))) : o < t.status.stickyTop - s ? t.removeSticky(e.attr("id")) : (t.stickyModeTransition(e, i), t.fakeBoxExistFlag(e.attr("id")) || e.after(t.createFakebox(e.attr("id")))), t.status.beforeScrollTop = o
            },
            stickyModeTransition: function(e, t) {
                e.offset().left;
                var i = e.outerWidth(!0);
                e.addClass("-js-block_sticky").css({
                    width: i,
                    top: t
                })
            },
            fakeBoxExistFlag: function(e) {
                var t = !1;
                return 0 < $("#fakebox-" + e).length && (t = !0), t
            },
            createFakebox: function(e) {
                var t = $("#" + e),
                    i = $("<div />").attr("id", "fakebox-" + e);
                return i.css({
                    width: t.outerWidth(!0),
                    height: t.outerHeight(!0)
                }), i
            },
            removeSticky: function(e) {
                var t = $("#" + e);
                t.removeClass("-js-block_sticky").css({
                    left: "auto",
                    width: "auto"
                }), this.removeFakebox(t.attr("id"))
            },
            removeFakebox: function(e) {
                $("#fakebox-" + e).remove()
            },
            getTopPositionInt: function(e) {
                return parseInt(e.css("top").replace("px", ""), 10)
            },
            resize: function() {
                $(window).off("scroll.scrollBlockSticky"), this.removeSticky($(this.target).attr("id")), this.init()
            }
        }
    }(_bind),
    function(f) {
        f.base.fixedController = {
            target: null,
            mainMargin: {
                pc: null,
                sp: null
            },
            init: function(e) {
                if (f.fn.isEditBlock()) return !1;
                var r = $(window),
                    i = $("#a-header"),
                    t = $("#a-footer"),
                    a = $("#a-billboard"),
                    n = $("#a-side-a"),
                    s = $("#a-side-b"),
                    o = $("#a-main"),
                    l = $("#a-site_contents"),
                    d = !1,
                    c = !0,
                    h = $("body").attr("id");
                if ("l-5" === h && (null === this.mainMargin.pc && "sp" !== f.fn.nowDevice() ? this.mainMargin.pc = parseInt(Math.floor(o.css("marginLeft").replace("px", 0)), 10) - 1 : null === this.mainMargin.sp && "sp" === f.fn.nowDevice() && (this.mainMargin.sp = parseInt(Math.floor(o.css("marginLeft").replace("px", 0)), 10) - 1)), i.data("float")) {
                    d = !0, i.css({
                        position: "fixed",
                        zIndex: 170,
                        width: "100%",
                        maxWidth: "none",
                        top: 0
                    }), setTimeout(function() {
                        ("sp" !== f.fn.nowDevice() && !$("#a-billboard").hasClass("-height100") || "sp" === f.fn.nowDevice() && !$("#a-billboard").hasClass("-sp-height100")) && a.css("paddingTop", i.outerHeight(!0))
                    }, 10)
                } else setTimeout(function() {
                    ("sp" !== f.fn.nowDevice() && $("#a-billboard").hasClass("-height100") || "sp" === f.fn.nowDevice() && $("#a-billboard").hasClass("-sp-height100")) && a.css("min-height", "calc(100vh - " + i.outerHeight(!0) + "px)")
                }, 10);

                function p(n, t) {
                    if ("sp" === f.fn.nowDevice()) return !1;
                    var s = n.find(">div");
                    n.css("position", "relative"), s.css({
                        position: "absolute",
                        top: 0,
                        width: n.width()
                    });
                    var o = 0,
                        e = $("#a-ghost_header");
                    d ? o = i.outerHeight(!0) : e[0] && (o = e.outerHeight(!0)), r.on("scroll.fixedable", function(e) {
                        0 < t && clearTimeout(t), t = setTimeout(function() {
                            var e = r.scrollTop() + o,
                                t = n.offset().top;
                            t < e ? e -= t : e = 0;
                            var i = l.height(),
                                a = s.height();
                            i < a + e && (e = i - a), e < 0 && (e = 0, l.css("minHeight", a)), d && c && (e = 0, c = !1), s.velocity("stop").velocity({
                                top: e
                            }, 1e3, "easeOutExpo")
                        }, 100)
                    })
                }
                if (t.data("float") && (!0, t.css({
                        position: "fixed",
                        zIndex: 170,
                        width: "100%",
                        maxWidth: "none",
                        bottom: 0
                    })), n.data("float")) {
                    p(n, 0), "sp" !== f.fn.nowDevice() && "l-5" === h ? o.css("marginLeft", this.mainMargin.pc + n.outerWidth(!0)) : o.css("marginLeft", this.mainMargin.sp)
                }
                if (s.data("float")) {
                    p(s, 0)
                }(n.data("float") || s.data("float")) && r.scroll()
            },
            resize: function() {
                var e = $("#a-side-a"),
                    t = $("#a-side-b"),
                    i = $("#a-main");
                "sp" === f.fn.nowDevice() ? (e.data("float") && ($(window).off("scroll.fixedable"), e.find(">div").css({
                    width: "100%",
                    position: "static"
                }), i.css("marginLeft", this.mainMargin.sp)), t.data("float") && ($(window).off("scroll.fixedable"), t.find(">div").css({
                    width: "100%",
                    position: "static"
                }))) : this.init()
            }
        }
    }(_bind),
    function(m) {
        m.base.floatContents = {
            target: null,
            _marginWide: null,
            _targetColumns: null,
            _isResizing: !1,
            _isFixedWidthColumnsFlag: !1,
            _waitLoadImages: !0,
            gutter: null,
            init: function() {
                var t = this,
                    e = $(t.target),
                    i = e.data("float-width"),
                    a = e.find(">div").hasClass("column") ? e : e.find(">div"),
                    n = a.find("div.column").eq(0);
                if (0 != n.length) {
                    "sp" !== m.fn.nowDevice() ? e.hasClass("c-space_normal") ? t._marginWide = .04 : e.hasClass("c-space_wide") ? t._marginWide = .06 : e.hasClass("c-space_narrow") ? t._marginWide = .02 : t._marginWide = 0 : e.hasClass("c-sp-space_normal") ? t._marginWide = .04 : e.hasClass("c-sp-space_wide") ? t._marginWide = .06 : e.hasClass("c-sp-space_narrow") ? t._marginWide = .02 : e.hasClass("c-sp-space_init") && (t._marginWide = 0);
                    var s = a[0].className,
                        o = null === s ? null : s.split(" ");
                    _.each(o, function(e) {
                        "sp" !== m.fn.nowDevice() ? e.match(/-col\d/) && !e.match(/-sp-col\d/) && (t._targetColumns = parseInt(e.replace("-col", ""), 10)) : e.match(/-sp-col\d/) && (t._targetColumns = parseInt(e.replace("-sp-col", ""), 10))
                    }), null === t._targetColumns && (t._targetColumns = 1);
                    var r, l = m.fn.paddings(n).left + m.fn.paddings(n).right + (m.fn.margins(n).left + m.fn.margins(n).right) + (parseInt(n.css("borderLeftWidth").replace("px", ""), 10) + parseInt(n.css("borderRightWidth").replace("px", ""), 10)),
                        d = window.getComputedStyle(a[0], ""),
                        c = a[0].clientWidth - parseFloat(d.paddingLeft, 10) - parseFloat(d.paddingRight, 10),
                        h = m.device.sf && a.hasClass("-col5") ? 1 : 0;
                    if (i && "sp" !== m.fn.nowDevice()) {
                        if (-1 !== i.indexOf("px")) {
                            t._isFixedWidthColumnsFlag = !0;
                            var p = parseInt(i.replace("px", ""), 10);
                            t._targetColumns = Math.floor(c / (p - l)), a.find("div.column").width(p - l)
                        } else if (-1 !== i.indexOf("%")) {
                            var f = i.replace("%", ""),
                                g = .01 * parseInt(f, 10),
                                u = Math.floor(c * g);
                            r = u, t._targetColumns = Math.floor(c / u - l), a.find("div.column").width(r - l)
                        }
                    } else r = c - c * (1.5 * t._marginWide), a.find("div.column").width(r / t._targetColumns - l - h);
                    if (1 !== t._targetColumns || t._isFixedWidthColumnsFlag ? t.gutter = a.width() / t._targetColumns * (1.88 * t._marginWide) : t.gutter = 0, !t._isResizing && (a.hasClass("g-column") && a.imagesLoaded(function() {
                            a.masonry({
                                itemSelector: "div.column",
                                gutter: t.gutter
                            })
                        }), 0 < e.find("img").length)) {
                        if (0 == t._waitLoadImages) return;
                        e.imagesLoaded(function() {
                            t.resize(), t._waitLoadImages = !1
                        })
                    }
                }
            },
            resize: function() {
                var e = $(this.target).find(">div");
                this._isResizing = !0, this.init(), e.hasClass("g-column") && (e.masonry({
                    itemSelector: "div.column",
                    gutter: this.gutter
                }), e.masonry("reloadItems"))
            }
        }
    }(_bind),
    function(s) {
        s.base.followBlocks = {
            target: null,
            init: function() {
                if (s.fn.isEditBlock()) return !1;
                var e = this,
                    t = $(e.target),
                    i = "sp" !== s.fn.nowDevice() ? t.data("follow-blocks") : t.data("sp-follow-blocks"),
                    a = $("#" + i);
                if (!i) return t.data("follow-blocks") && e.resets(a), t.data("sp-follow-blocks") && e.resets(a), !1;
                t.closest(s.def.allFoundationIds);
                e.resets(t);
                var n = a.position().top;
                a.addClass("-follow-target"), t.addClass("-follow-blocks").css({
                    top: n,
                    width: "100%"
                }), a.ready(function() {
                    a.find(".js-slide").length || t.css({
                        top: n,
                        height: a.outerHeight(!0),
                        width: a.outerWidth(!0)
                    }), ("sp" !== s.fn.nowDevice() ? t.data("accept-click") : t.data("sp-accept-click")) && t.addClass("-accept-click")
                }), setTimeout(function() {
                    s.syncLoad || e.loadTimer()
                }, 1)
            },
            loadTimer: function() {
                var t = this,
                    i = function e() {
                        return setTimeout(function() {
                            s.syncLoad ? (t.init(), clearTimeout(i)) : e()
                        }, 100)
                    }()
            },
            resets: function(e) {
                e.removeClass("-follow-blocks").css({
                    top: "auto",
                    height: "auto",
                    width: "auto"
                })
            },
            resize: function() {
                this.init()
            }
        }
    }(_bind),
    function(s) {
        s.base.ghostHeader = {
            target: null,
            status: {
                startPoint: 0
            },
            init: function() {
                var e = this,
                    t = $("#a-header"),
                    i = $(e.target),
                    a = s.fn.nowDevice();
                if (s.fn.isEditBlock() || "sp" === a || "tablet" === a) return i.removeClass("js-ghost_mode"), $(window).off("scroll.ghostHeaderScroll"), !1;
                i.addClass("js-ghost_mode"), setTimeout(function() {
                    $(window).scroll()
                }, 1);
                var n = i.data("effect");
                e.status.startPoint = t.outerHeight(!0), $(window).off("scroll.ghostHeaderScroll"), $(window).on("scroll.ghostHeaderScroll", function() {
                    $(window).scrollTop() > e.status.startPoint && "fade" === n ? i.addClass("-fade-mode").css({
                        left: t.offset().left
                    }) : i.removeClass("-fade-mode").css({
                        left: "auto"
                    })
                })
            },
            resize: function() {
                this.init()
            }
        }
    }(_bind),
    function(l) {
        l.base.height100 = {
            target: null,
            init: function() {
                var e = this.target,
                    t = e.find("div.site_frame"),
                    i = $("#a-header").data("float");
                if (t.css("top", "auto"), e.css("paddingTop", 0), "sp" === l.fn.nowDevice()) return !1;
                var a, n = l.window._height,
                    s = e.attr("class");
                _.each(s.split(" "), function(e) {
                    if (e.match("-catch") && !e.match("-sp-catch")) {
                        var t = e.replace("-catch-", "").split("_");
                        a = t[1]
                    }
                });
                var o = t.outerHeight(!0),
                    r = 0;
                "top" === a ? r = 0 : "center" === a ? ((r = (n - o) / 2) < 0 && (r = 0), i && (r -= $("#a-header").outerHeight(!0) / 2)) : "bottom" === a && (r = n - o), t.css({
                    top: r
                })
            },
            resize: function() {
                this.init()
            }
        }, l.base.height100Sp = {
            target: null,
            init: function() {
                var e = this.target,
                    t = e.find("div.site_frame"),
                    i = $("#a-header").data("float");
                if (e.hasClass("-height100") && "sp" !== l.fn.nowDevice()) return !1;
                if (t.css("top", "auto"), "sp" !== l.fn.nowDevice()) return !1;
                var a, n = l.window._height;
                i || e.css("paddingTop", $("#a-header").outerHeight(!0));
                var s = e.attr("class");
                _.each(s.split(" "), function(e) {
                    if (e.match("-sp-catch")) {
                        var t = e.replace("-sp-catch-", "").split("_");
                        a = t[1]
                    }
                });
                var o = t.outerHeight(!0);
                i && (o -= $("#a-header").outerHeight(!0));
                var r = 0;
                "top" === a ? r = 0 : "center" === a ? (r = (n - o) / 2, i && (r -= $("#a-header").outerHeight(!0) / 2)) : "bottom" === a && (r = n - o), t.css({
                    top: r
                })
            },
            resize: function() {
                this.init()
            }
        }
    }(_bind),
    function(u) {
        u.base.heightColumnController = {
            target: null,
            resizeFlag: !0,
            waitLoadImages: !0,
            init: function() {
                var t, e = this,
                    i = $(e.target),
                    a = i.find("div.column"),
                    n = a.length,
                    s = 0 < i.find("div.g-column").length ? i.find("div.g-column").attr("class") : null,
                    o = null === s ? null : s.split(" ");
                if (!(n <= 1)) {
                    if (null === o ? t = 1 : (_.each(o, function(e) {
                            "sp" !== _bind.fn.nowDevice() ? e.match(/-col\d/) && !e.match(/-sp-col\d/) && (t = parseInt(e.replace("-col", ""), 10)) : e.match(/-sp-col\d/) && (t = parseInt(e.replace("-sp-col", ""), 10))
                        }), isNaN(t) && (t = 1)), a.height("auto"), "sp" === u.fn.nowDevice() && 1 === t) return !1;
                    for (var r = Math.ceil(n / t), l = 1; l <= r; l++) {
                        for (var d = 0, c = 0; c < t; c++) {
                            var h = c + (l - 1) * t;
                            if (n - 1 < h) break;
                            a.eq(h).height("auto");
                            var p = a.eq(h)[0],
                                f = window.getComputedStyle(p, ""),
                                g = p.clientHeight - parseFloat(f.paddingTop, 10) - parseFloat(f.paddingBottom, 10);
                            d < g && (d = g)
                        }
                        0 < d && a.each(function(e) {
                            t < l * t - e || l * t <= e || $(this).height(d)
                        })
                    }
                    if (0 < i.find("img").length) {
                        if (0 == e.waitLoadImages) return;
                        i.imagesLoaded(function() {
                            e.resize(), e.waitLoadImages = !1
                        })
                    }
                    e.resizeFlag && $("body").hasClass("l-fixed-side") && setTimeout(function() {
                        u.fn.heightRefresh(), e.resizeFlag = !1
                    }, 10)
                }
            },
            resize: function() {
                this.init()
            }
        }
    }(_bind),
    function(l) {
        l.base.megaMenu = {
            target: null,
            animationSpeed: 0,
            spAnimationSpeed: 0,
            animationType: "",
            spAnimationType: "",
            isGlobalNavigation: !0,
            init: function() {
                var e = $(this.target);
                this.animationSpeed = e.data("anim-speed"), this.spAnimationSpeed = e.data("anim-sp-speed"), this.animationType = e.data("anim-type"), this.spAnimationType = e.data("anim-sp-type"), this.isGlobalNavigation = 0 < $("#js-globalNavigation").length;
                var t = this.isGlobalNavigation ? $("#js-globalNavigation") : $("#js-tapMenu");
                0 < t.find(".b-megamenu_navigation").length && (t.attr("id", this.isGlobalNavigation ? "js-globalMegaMenu" : "js-tapMegaMenu"), t.children("ul").addClass("megamenu-list"));
                var i = e.children("nav").children("ul");
                0 < i.length ? i.addClass("megamenu-list") : 0 < e.children("nav").children("div#js-noNavigation").length && e.children("nav").children("div#js-noNavigation").children("ul").addClass("megamenu-list"), $(".b-megamenu_navigation").each(function() {
                    var e = $(this),
                        t = e.find("a");
                    0 < e.next(".b-megamenu_contents").length ? (e.addClass("-under"), 0 < t.length && (e.prepend(t.text()), t.remove())) : 0 === t.length ? e.addClass("c-unlink") : e.css("padding", "0")
                }), this.resize()
            },
            eventHandle: function(i) {
                var a = this,
                    e = $(a.target).find(".b-megamenu_navigation");
                if ($(a.target).hasClass("js-globalNavigationBaseBlock")) {
                    var t = this.isGlobalNavigation ? "#js-globalMegaMenu" : "#js-tapMegaMenu";
                    e = $(t).find(".b-megamenu_navigation")
                }
                e.off(), e.parent("li").off().on("mouseenter", function() {
                    $(this).find(".b-megamenu_navigation").hasClass("-under") && $(this).find(".b-megamenu_navigation").addClass("-active");
                    var e = $(this).find(".b-megamenu_contents");
                    e.css({
                        visibility: "hidden",
                        height: "auto",
                        "z-index": "211"
                    });
                    var t = e.outerHeight(!0);
                    return e.css({
                        visibility: "visible",
                        height: "0"
                    }), 0 < $(a.target).find("#js-tapMegaMenu").length && "pc" !== i && (e.css({
                        left: $("#js-tapMegaMenu").offset().left - $(this).find(".b-megamenu_navigation").offset().left
                    }), $(".menu-display").height(t + e.offset().top - $(".megamenu-list").offset().top)), e.velocity("stop").velocity({
                        height: t
                    }, a.animationSpeed, a.animationType), !1
                }).on("mouseleave", function() {
                    $(this).find(".b-megamenu_navigation").removeClass("-active");
                    var e = $(this).find(".b-megamenu_contents");
                    return e.css("z-index", ""), e.velocity("stop").velocity({
                        height: 0
                    }, a.animationSpeed, a.animationType), !1
                })
            },
            spEventHandle: function(n) {
                var s = this,
                    e = $(s.target).find(".b-megamenu_navigation"),
                    t = $(s.target).hasClass("js-globalNavigationBaseBlock");
                if (t) {
                    var i = this.isGlobalNavigation ? "#js-globalMegaMenu" : "#js-tapMegaMenu";
                    e = $(i).find(".b-megamenu_navigation")
                }
                var o = s.animationSpeed,
                    r = s.animationType;
                (t && "tablet" === n || l.device.mobile && "tablet" === n || "sp" === n) && (o = s.spAnimationSpeed, r = s.spAnimationType), e.parent("li").off(), e.each(function() {
                    var a = $(this);
                    0 < a.next(".b-megamenu_contents").length && a.off().on("click", function() {
                        var e = a.next(".b-megamenu_contents");
                        if (a.hasClass("-active")) a.removeClass("-active"), e.velocity("stop").velocity({
                            height: 0
                        }, o, r, function() {
                            $(".menu-display").height($(".megamenu-list").height())
                        }), e.off();
                        else {
                            var t = a.closest("ul");
                            t.children("li").each(function() {
                                $(this).find(".b-megamenu_navigation").removeClass("-active")
                            }), a.hasClass("-under") && a.addClass("-active"), e.css({
                                visibility: "hidden",
                                height: "auto"
                            });
                            var i = e.outerHeight(!0);
                            e.css({
                                visibility: "visible",
                                height: "0"
                            }), 0 < $(s.target).find("#js-tapMegaMenu").length && "pc" !== n && (e.css({
                                left: $("#js-tapMegaMenu").offset().left - a.offset().left
                            }), $(".menu-display").height(i + e.offset().top - $(".megamenu-list").offset().top)), t.find(".b-megamenu_contents").stop(!0, !1).velocity({
                                height: 0
                            }, o, r), e.stop(!0, !1).velocity({
                                height: i
                            }, o, r), e.off().on({
                                "touchstart mousedown": function(e) {
                                    e.stopPropagation()
                                },
                                "touchmove mousemove": function(e) {
                                    e.stopPropagation()
                                }
                            })
                        }
                        return !1
                    })
                })
            },
            resize: function() {
                if (!l.status.siteEditing) {
                    var a = this;
                    return _.delay(function() {
                        var e = window.innerWidth,
                            t = (e < l.device.spSize ? "sp" : e <= l.device.tabletSize && "tablet") || "pc",
                            i = l.device.mobile || l.device.ipad || !l.device.mobile && l.device.android;
                        $(a.target).hasClass("js-globalNavigationBaseBlock") && "tablet" === t || "sp" === t || i ? a.spEventHandle(t) : ((0 < $(".tapmenu-scroll").length || 0 < $(".tapmenu-step").length) && $(".b-megamenu_contents").css({
                            height: "",
                            left: ""
                        }), a.eventHandle(t))
                    }, 100), !1
                }
            }
        }
    }(_bind),
    function(e) {
        e.base.blogNewIcon = {
            target: null,
            init: function() {
                var e = $(this.target);
                new Date(e.data("expired")) < new Date && e.addClass("js-hide")
            },
            resize: function() {
                return !1
            }
        }, e.base.smoothContact = {
            target: null,
            init: function() {
                var e = $(this.target);
                "sp" !== _bind.fn.nowDevice() ? (e.width(e.data("width")), e.height(e.data("height"))) : (e.width(e.data("sp-width")), e.height(e.data("sp-height")))
            },
            resize: function() {
                this.init()
            }
        }, e.base.tracking = {
            target: null,
            init: function() {
                var e = $(this.target),
                    t = $("body").data("ga-tracking"),
                    i = (e.attr("href"), e.data("download-mode"), e.data("after-link")),
                    a = e.data("tracking-id");
                if (_bind.fn.isEditBlock()) return !1;
                e.on("click", function(e) {
                    _bind.fn.isEmpty(t) || ga("send", {
                        hitType: "event",
                        eventCategory: a,
                        eventAction: "Download"
                    }), _bind.fn.isEmpty(i) || setTimeout('document.location = "' + i + '"', 200)
                })
            }
        }, e.base.cartThumbnail = {
            target: null,
            init: function() {
                var t = $(this.target).closest("div.g-column").find("img.js-change_cart_img");
                $(this.target).find("li a").on("click", function(e) {
                    return e.preventDefault(), t.attr("src", $(this).attr("href")), !1
                })
            }
        }
    }(_bind),
    function(r) {
        r.base.pageAnimation = {
            target: null,
            init: function() {
                var e = $(".bg-window"),
                    t = $("#js-globalNavigation");
                if (0 < $("#js-globalMegaMenu").length && (t = $("#js-globalMegaMenu")), r.fn.isAnimationOff()) e.removeClass("animsition");
                else {
                    var i = $(document.body).data("page-animation");
                    if ("none" != i) {
                        var a = t.data("slide-type"),
                            n = "pc" !== r.fn.nowDevice() && ("rightSlide" === a || "leftSlide" === a),
                            s = "",
                            o = "";
                        "fade" == i ? (s = "fade-in", o = "fade-out") : "fade-down" == i ? (s = "fade-in-down-sm", o = "fade-out-down-sm") : "fade-up" == i ? (s = "fade-in-up-sm", o = "fade-out-up-sm") : "fade-left" == i ? (s = "fade-in-left-sm", o = "fade-out-left-sm") : "fade-right" == i ? (s = "fade-in-right-sm", o = "fade-out-right-sm") : "zoom" == i ? (s = "zoom-in", o = "zoom-out") : "flip-x" == i ? (s = "flip-in-x-fr", o = "flip-out-x-fr") : "flip-y" == i ? (s = "flip-in-y-fr", o = "flip-out-y-fr") : "rotate" == i && (s = "rotate-in-sm", o = "rotate-out-sm"), e.animsition({
                            inClass: s,
                            outClass: o,
                            linkElement: 'a[href]:not(.js-link_scroller,.js-zoomImage,.js-popup,[target=_blank],#js-sp-menu_closer,[href^="mailto:"],[href^="tel:"],[href="javascript:;"],[rel=history],[class~=tab])'
                        }).on("animsition.inStart animsition.outStart", function() {
                            n && t.hide()
                        }).on("animsition.inEnd", function() {
                            n && t.show()
                        })
                    }
                }
            }
        }
    }(_bind),
    function(u) {
        u.base.photoAlbum = {
            target: null,
            init: function() {
                var i = this;

                function a() {
                    i.$overLay = $("<div />").addClass("c-overlay").hide(), i.$overLay.fadeIn(200), i.$overLay.on("click", function(e) {
                        e.preventDefault();
                        var t = $(this);
                        i.removeFadeoutBox(t), i.loadEnd()
                    }), $("body").append(i.$overLay)
                }
                i.$block = $(i.target), i.$column = $(i.target).find("div.column"), i.$cImg = i.$column.find(".js-zoomImage").closest("div.c-img"), i.$columnZoom = i.$cImg.find(".js-zoomImage"), i.columnZoomLength = -1, i.activeNow = 0, i.$cImg.each(function() {
                    var t = $(this),
                        e = t.find(".js-zoomImage");
                    0 !== e.length && (i.columnZoomLength++, (0 < t.find(".js-zoomImage").next("div.c-mouseover_position").length ? t.find("div.c-mouseover_position") : e).on("click", function(e) {
                        return e.preventDefault(), !(0 < $("div.c-overlay").length) && (i.activeNow = 0, u.status.sitePreview ? (alert("画像拡大機能はプレビュー状態時のみ確認いただけます。"), !1) : (a(), i.activeNow = i.$cImg.index(t.closest("div.c-img")), 0 < i.$cImg.find(".js-zoomImage").next("div.c-mouseover_position").length ? i.$commentBox = i.$cImg.eq(i.activeNow).find(".js-zoomImage").next("div.c-mouseover_position") : 0 < t.find(".c-img_comment").length ? i.$commentBox = t.find(".c-img_comment") : i.$commentBox = null, i.activeChanger(i.activeNow), void i.changeImages("firstFlag")))
                    }))
                }), i.$column.on("click", ".js-zoomImage", function() {
                    if (0 < $("div.c-overlay").length) return !1;
                    var e = $(this);
                    return 0 == e.closest("div.c-img").length ? (u.status.sitePreview ? alert("画像拡大機能はプレビュー状態時のみ確認いただけます。") : (a(), i.$commentBox = null, i.changeImages("shift2Flag", e)), !1) : void 0
                }), $(window).off("keydown"), $(window).on("keydown", function(e) {
                    i.keyDownAction(e.keyCode)
                })
            },
            changeImages: function(e, t) {
                var o = this,
                    r = "firstFlag" === e,
                    l = "shift2Flag" === e;
                if (r) {
                    o.$imageBox = $("<div />").addClass("c-overlay_outerBox");
                    var d = o.$imageBox.addClass("js-no_scroll"),
                        c = $("<div />").addClass("c-overlay_imageInner"),
                        h = (g = o.$activecImg.find(".js-zoomImage")).children("picture"),
                        p = $("<img />"),
                        f = $('<picture><source type="image/webp"><img></picture>')
                } else if (l) {
                    o.$imageBox = $("<div />").addClass("c-overlay_outerBox");
                    d = o.$imageBox.addClass("js-no_scroll"), c = $("<div />").addClass("c-overlay_imageInner"), h = (g = t).children("picture"), p = $("<img />"), f = $('<picture><source type="image/webp"><img></picture>')
                } else {
                    d = o.$imageBox.addClass("js-no_scroll");
                    var g, i = (g = o.$columnZoom.eq(e)).closest(".c-img");
                    c = o.$imageBox.find(".c-overlay_imageInner"), h = g.children("picture"), p = c.find("img"), f = $('<picture><source type="image/webp"><img></picture>');
                    0 < i.find(".js-zoomImage").next("div.c-mouseover_position").length ? o.$commentBox = i.find(".js-zoomImage").next("div.c-mouseover_position") : 0 < i.find(".c-img_comment").length ? o.$commentBox = i.find(".c-img_comment") : (c.find(".c-overlay_commentBox").remove(), o.$commentBox = null)
                }
                if (p.on("load", function() {
                        var e = p.attr("src").replace(".jpg", ".webp"),
                            t = $(new Image);
                        if (t.attr("src", e), t.on("error", function() {
                                e = ""
                            }), (r || l) && (0 !== h.length && (f.children("source").attr("srcset", e), f.children("img").attr("src", p.attr("src")), p = f), c.append(p), d.append(c), d.css({
                                left: "50%",
                                top: "50%",
                                width: "auto",
                                height: "auto"
                            }), o.$overLay.append(d), d.on("click", function(e) {
                                e.stopPropagation()
                            })), !_bind.fn.isEmpty(o.$commentBox))
                            if (0 === $("div.c-overlay div.c-overlay_commentBox").length) {
                                var i = $("<div />").addClass("c-overlay_commentBox");
                                (a = o.$commentBox.clone()).find(".js-photo_mouseover").css({
                                    width: "auto",
                                    height: "auto"
                                }), a.find(".js-photo_mouseover").closest(".c-mouseover_position").css({
                                    width: "auto",
                                    height: "auto"
                                }), i.append(a), c.append(i)
                            } else {
                                var a;
                                (a = o.$commentBox.clone()).find(".js-photo_mouseover").css({
                                    width: "auto",
                                    height: "auto"
                                }), a.find(".js-photo_mouseover").closest(".c-mouseover_position").css({
                                    width: "auto",
                                    height: "auto"
                                }), c.find(".c-overlay_commentBox").html(a)
                            } var n = g.attr("rel").split(","),
                            s = {};
                        _.each(n, function(e) {
                                e.match("width=") ? s.width = parseInt(e.replace("width=", ""), 10) : e.match("height=") && (s.height = parseInt(e.replace("height=", ""), 10))
                            }), o.maxImageSize = {
                                width: s.width,
                                height: s.height
                            }, _bind.fn.isEmpty(o.$commentBox) ? o.goalSize = {
                                width: s.width + u.fn.paddings(d).left + u.fn.paddings(d).right,
                                height: s.height + u.fn.paddings(d).top + u.fn.paddings(d).bottom
                            } : (o.goalSize = {
                                width: s.width + u.fn.paddings(d).left + u.fn.paddings(d).right,
                                height: s.height + u.fn.paddings(d).top + u.fn.paddings(d).bottom
                            }, .9 * _bind.window._height > o.goalSize.height && (o.goalSize.height += c.find(".c-overlay_commentBox").outerHeight(!0))),
                            //!_bind.fn.isEmpty($commentBox) ? $(this).height() + _bd.fn.paddings($imageBox).top + _bd.fn.paddings($imageBox).bottom + $commentBox.outerHeight(true) : $(this).height() + _bd.fn.paddings($imageBox).top + _bd.fn.paddings($imageBox).bottom
                            o.loadEnd(), (r || l) && (d.width(10), d.height(10)), o.imageBoxResizer(), r ? (o.nextBtns(), o.prevBtns(), o.closeBtns(), o.btnController()) : l && o.closeBtns(), _bind.fn.isEmpty(o.$commentBox) || o.commentFadein(c.find(".c-img_comment")), p.off()
                    }), o.loadStart(), p.attr("src", g.attr("href")), 0 !== p.parent("picture").length) {
                    var a = p.attr("src").replace(".jpg", ".webp"),
                        n = $(new Image);
                    n.attr("src", a), n.on("error", function() {
                        a = ""
                    }), p.parent("picture").children("source").attr("srcset", a)
                }
            },
            removeFadeoutBox: function(e) {
                var t = this;
                e.fadeOut(200, function() {
                    e.remove(), t.activeRemove()
                })
            },
            activeRemove: function() {
                this.$cImg.removeClass("active")
            },
            activeChanger: function(e) {
                this.activeRemove(), this.$cImg.eq(e).addClass("active"), this.$activecImg = this.$cImg.filter(".active")
            },
            loadStart: function() {
                var e = $("<div />").addClass("js-loading").attr("id", "js-loading");
                $("body").append(e)
            },
            loadEnd: function() {
                $("#js-loading").remove()
            },
            nextBtns: function() {
                var t = this;
                if (0 < $("div.c-overlay div.c-overlay-next").length) return !1;
                var e = $("<div />").addClass("c-overlay-next"),
                    i = $("<span />").addClass("icon-right_arrow");
                e.append(i), $("div.c-overlay div.c-overlay_outerBox").append(e), e.on("click", function(e) {
                    e.preventDefault(), e.stopPropagation(), t.columnZoomLength > t.activeNow && (t.activeChanger(++t.activeNow), t.changeImages(t.activeNow), t.btnController())
                })
            },
            prevBtns: function() {
                var t = this;
                if (0 < $("div.c-overlay div.c-overlay-prev").length) return !1;
                var e = $("<div />").addClass("c-overlay-prev"),
                    i = $("<span />").addClass("icon-left_arrow");
                e.append(i), $("div.c-overlay div.c-overlay_outerBox").append(e), e.on("click", function(e) {
                    e.preventDefault(), e.stopPropagation(), 0 !== t.activeNow && (t.activeChanger(--t.activeNow), t.changeImages(t.activeNow), t.btnController())
                })
            },
            closeBtns: function() {
                if (0 < $("div.c-overlay div.c-overlay-close_btn").length) return !1;
                var t = this,
                    e = $("<div />").addClass("c-overlay-close_btn"),
                    i = $("<span />").addClass("icon-close");
                e.append(i), $("div.c-overlay div.c-overlay_outerBox").append(e), e.on("click", function(e) {
                    e.preventDefault(), t.removeFadeoutBox($("div.c-overlay"))
                })
            },
            commentFadein: function(e) {
                e.hide(), setTimeout(function() {
                    e.fadeIn(200)
                }, 400)
            },
            btnController: function() {
                var e = this;
                e.$imageBox.find("div.c-overlay-prev").removeClass("js-hide"), e.$imageBox.find("div.c-overlay-next").removeClass("js-hide"), 0 === e.activeNow && $("div.c-overlay .c-overlay-prev").addClass("js-hide"), e.columnZoomLength <= e.activeNow && $("div.c-overlay .c-overlay-next").addClass("js-hide")
            },
            rationImageMeasure: function() {
                var e = this,
                    t = _bind.window._width > _bind.window._height ? "horizontal" : "vertical",
                    i = e.goalSize.width > e.goalSize.height ? "horizontal" : "vertical",
                    a = "horizontal" == t ? _bind.window._height / _bind.window._width : _bind.window._width / _bind.window._height;
                return {
                    windowOrientation: t,
                    orientation: i,
                    imgRation: "horizontal" == i ? e.goalSize.height / e.goalSize.width : e.goalSize.width / e.goalSize.height,
                    imgRationOpposite: "horizontal" == i ? e.goalSize.width / e.goalSize.height : e.goalSize.height / e.goalSize.width,
                    windowRation: a
                }
            },
            commentHeightCal: function(e) {
                var t, i = e || 500,
                    a = this.$commentBox.clone();
                return a.css({
                    height: "auto",
                    width: i
                }).find("*").css({
                    height: "auto",
                    width: i
                }), $("body").append(a), t = a.height() ? a.height() : 0, a.remove(), t
            },
            maxSizeController: function(e) {
                var t = this,
                    i = 0;
                t.$commentBox && (i = t.commentHeightCal(.9 * _bind.window._width));
                var a = {
                    width: .9 * _bind.window._width,
                    height: .9 * _bind.window._height - i
                };
                t.goalSize.width = t.maxImageSize.width, t.goalSize.height = t.maxImageSize.height;
                _bind.fn.paddings("div.c-overlay_outerBox");
                "horizontal" === e.windowOrientation ? "horizontal" === e.orientation ? (a.width < t.goalSize.width && (t.goalSize.width = a.width, t.goalSize.height = a.width * e.imgRation), a.height < t.goalSize.height && (t.goalSize.height = a.height, t.goalSize.width = t.goalSize.height * e.imgRationOpposite)) : (a.height < t.goalSize.height && (t.goalSize.height = a.height, t.goalSize.width = a.height * e.imgRation), a.width < t.goalSize.width && (t.goalSize.width = a.width, t.goalSize.height = a.width * e.imgRationOpposite)) : "horizontal" === e.orientation ? (a.width < t.goalSize.width && (t.goalSize.width = a.width, t.goalSize.height = a.width * e.imgRation), a.height < t.goalSize.height && (t.goalSize.height = a.height, t.goalSize.width = a.height * e.imgRationOpposite)) : (a.height < t.goalSize.height && (t.goalSize.height = a.height, t.goalSize.width = a.height * e.imgRation), a.width < t.goalSize.width && (t.goalSize.width = a.width, t.goalSize.height = t.goalSize.width * e.imgRationOpposite)), t.goalSize.height += i
            },
            imageBoxResizer: function() {
                var e = this,
                    t = e.rationImageMeasure();
                e.maxSizeController(t), e.$imageBox.velocity("stop").velocity({
                    left: (u.window._width - e.goalSize.width) / 2,
                    top: (u.window._height - e.goalSize.height) / 2,
                    width: e.goalSize.width,
                    height: e.goalSize.height
                })
            },
            keyDownAction: function(e) {
                var t = $("div.c-overlay");
                switch (e) {
                    case 27:
                        this.removeFadeoutBox(t);
                        break;
                    case 39:
                        if (t.find("div.c-overlay-next").hasClass("js-hide")) return !1;
                        t.find("div.c-overlay-next").click();
                        break;
                    case 37:
                        if (t.find("div.c-overlay-prev").hasClass("js-hide")) return !1;
                        t.find("div.c-overlay-prev").click();
                        break;
                    default:
                        return !1
                }
            },
            resize: function() {
                void 0 !== this.goalSize && this.imageBoxResizer()
            }
        }
    }(_bind), _bind.base.photoComment = {
        target: null,
        init: function(e) {
            var t = $(this.target);
            t.ready(function() {
                t.find(".js-photo_mouseover").css({
                    width: t.outerWidth(!0),
                    height: t.outerHeight(!0)
                }), t.find(".js-photo_mouseover").closest(".c-mouseover_position").css({
                    width: t.outerWidth(!0),
                    height: t.outerHeight(!0)
                })
            });
            var i = t.find(".js-photo_mouseover").closest(".c-mouseover_position").prev();
            if (0 < i.length && !i.hasClass("js-zoomImage") && "A" == i[0].tagName) {
                t.find(".js-photo_mouseover").addClass("js-mouse_pointer");
                var a = t.find(".js-photo_mouseover").closest(".c-mouseover_position").prev();
                t.find(".js-photo_mouseover").off("click").on("click", function(e) {
                    e.preventDefault(), a.hasClass("js-popup") ? a.trigger("click") : "_blank" === a.attr("target") ? window.open(a.attr("href")) : window.location = a.attr("href")
                })
            }
        },
        resize: function() {
            this.init()
        }
    },
    function(s) {
        s.base.popupWindow = {
            init: function() {
                var a = this;
                $("#page").on("click", ".js-popup", function(e) {
                    e.preventDefault();
                    var t = $(this),
                        i = a.createOverlayBox(t);
                    a.addImageBox(i, t)
                })
            },
            createOverlayBox: function(e) {
                var t = $("<div />").addClass("c-overlay").hide();
                t.fadeIn(200), this.scrollController(!0);
                var i = this;
                return t.on("click", function(e) {
                    e.preventDefault();
                    var t = $(this);
                    i.removeFadeoutBox(t), i.scrollController(!1)
                }), $("body").append(t), t
            },
            addImageBox: function(e, t) {
                var i = $("<div />").addClass("c-overlay_outerBox"),
                    a = $("<iframe />").addClass("c-popup_iframe");
                a.attr("src", t.attr("href")), i.css({
                    left: "50%",
                    top: "50%",
                    width: "auto",
                    height: "auto"
                }), e.append(i), i.on("click", function(e) {
                    e.stopPropagation()
                }), i.width(10), i.height(10), this.imageBoxResizer(i, a, t), this.closeBtns()
            },
            imageBoxResizer: function(e, t, i) {
                var a = this.maxSizeController(i);
                e.velocity("stop").velocity({
                    left: (s.window._width - a.width) / 2,
                    top: (s.window._height - a.height) / 2,
                    width: a.width,
                    height: a.height
                }, function() {
                    e.append(t)
                })
            },
            maxSizeController: function(e) {
                var t = e.data("width"),
                    i = e.data("height"),
                    a = !_bind.fn.isEmpty(e.data("resize")) && e.data("resize"),
                    n = {
                        width: 0,
                        height: 0
                    };
                return .9 * s.window._width < t && a ? n.width = .9 * s.window._width : n.width = t, .9 * s.window._height < i && a ? n.height = .9 * s.window._height : n.height = i, n
            },
            removeFadeoutBox: function(e) {
                e.fadeOut(200, function() {
                    e.remove()
                })
            },
            closeBtns: function() {
                if (0 < $("div.c-overlay div.c-overlay-close_btn").length) return !1;
                var e = $("<div />").addClass("c-overlay-close_btn"),
                    t = $("<span />").addClass("icon-close");
                e.append(t), $("div.c-overlay div.c-overlay_outerBox").append(e);
                var i = this;
                e.on("click", function(e) {
                    e.preventDefault(), i.removeFadeoutBox($("div.c-overlay")), i.scrollController(!1)
                })
            },
            scrollController: function(e) {
                e ? $("body").addClass("js-no_scroll") : $("body").removeClass("js-no_scroll")
            },
            resize: function() {
                return !1
            }
        }
    }(_bind),
    function(E) {
        function z(e, t) {
            for (var i = 0, a = e.length; i < a; i++) {
                var n = e[i];
                if (n.sid == t) return n.pathToFolder
            }
            return ""
        }
        E.base.pressIndex = {
            target: null,
            init: function() {
                var e = $(this.target),
                    t = JSON.parse(e.text()),
                    i = e.nearest(".js-press.-index-end"),
                    a = E.fn.getParentBlock(e);
                E.fn.isEmpty(a) || a.hasClass("-blog-index") || a.addClass("-blog-index");
                var n = null,
                    s = {
                        start: -1,
                        end: -1
                    },
                    o = e.parent(),
                    r = o[0].tagName.toLowerCase();
                if ("th" == r) n = e.closest("tbody"), e.closest("tr").remove(), i.closest("tr").remove();
                else if ("li" == r) n = o.parent(), e.closest("li").remove(), i.closest("li").remove();
                else {
                    if (n = e.closest(".column"), 0 == $.contains(n[0], i[0])) n = n.parent(), i.closest(".column").remove();
                    else {
                        var l = $.makeArray(n.children()).map(function(e) {
                                return $(e)
                            }),
                            d = l.findIndex(function(e) {
                                return e.is(o)
                            }),
                            c = l.findIndex(function(e) {
                                return e.is(i.parent())
                            }); - 1 < d && -1 < c && d < c && (s = {
                            start: d,
                            end: c
                        })
                    }
                    "div" == r && 1 === o.children().length ? o.remove() : e.remove(), 0 < i.parent().length && "div" == i.parent()[0].tagName.toLowerCase() && 1 === i.parent().children().length ? i.parent().remove() : i.remove()
                }
                n.css("opacity", 0), n.imagesLoaded(function() {
                    var e = [];
                    n.find("img").each(function() {
                            e.push(E.press.calcImageAspect(this))
                        }),
                        function(d, c, h, p) {
                            var f, g = 1 == E.fn.parseInt(d.article_new_offset),
                                u = E.fn.parseInt(d.article_new_offset_num),
                                m = $.makeArray(c.children()).map(function(e) {
                                    return $(e)
                                });
                            if (0 < p.start && p.end > p.start) {
                                var t = $("<div>");
                                m.slice(p.start, p.end).forEach(function(e) {
                                    t.append(e)
                                }), f = E.press.createTemplate(t, !0, g, !1)
                            } else f = E.press.createTemplate(c, !0, g, !1);
                            c.empty();
                            var a = [],
                                v = [],
                                b = [],
                                w = "";
                            d.blogs.forEach(function(e) {
                                a.push(e.sid);
                                var t = e.categories.split(",");
                                if (v = v.concat(t), e.tags) {
                                    var i = e.tags.split(",");
                                    b = b.concat(i)
                                }
                                E.fn.isEmpty(w) && (w = e.order)
                            });
                            var e = E.def.pressUrl + "posts?b=" + a.join(",");
                            if (1 == E.fn.parseInt(d.articleType)) {
                                var y = E.fn.parseInt(d.limit_article_num);
                                0 < y && (e += "&limit=" + y)
                            }
                            var i = E.fn.parseInt(d.article_disp_offset),
                                x = 0;
                            if (1 == i) {
                                -1 < (x = E.fn.parseInt(d.article_disp_offset_num) - 1) && (e += "&offset=" + x)
                            }
                            e += "&o=" + w, 0 < v.length && (e += "&c=" + v.join(","));
                            0 < b.length && (e += "&t=" + b.join(","));

                            function C(e) {
                                if (0 < p.start && p.end > p.start) {
                                    var t = m.slice(0, p.start),
                                        i = m.slice(p.end, m.length),
                                        a = e.posts.map(function(e) {
                                            var t = z(d.blogs, e.blog_sid),
                                                i = E.press.formatData(e, t, h, g, u);
                                            return i.lead = E.press.deleteParagraphStyle(i.lead), i.article = E.press.deleteParagraphStyle(i.article), f(i)
                                        });
                                    t.concat(a, i).forEach(function(e) {
                                        c.append(e), E.press.replaceEditorTag(c)
                                    })
                                } else e.posts.forEach(function(e) {
                                    var t = z(d.blogs, e.blog_sid),
                                        i = E.press.formatData(e, t, h, g, u);
                                    i.lead = E.press.deleteParagraphStyle(i.lead), i.article = E.press.deleteParagraphStyle(i.article), c.append(f(i)), E.press.replaceEditorTag(c)
                                });
                                if (c.hasClass("g-column")) {
                                    for (var n = c[0].className.split(" "), s = 1, o = 0, r = n.length; o < r; o++) {
                                        var l = n[o];
                                        if (0 == l.indexOf("-col")) {
                                            s = parseInt(l.substring(4), 10);
                                            break
                                        }
                                    }
                                    c.children(".column").each(function(e, t) {
                                        var i = $(t),
                                            a = e % s + 1;
                                        1 < a && i.hasClass("-column1") && i.removeClass("-column1"), i.addClass("-column" + a), a == s && i.addClass("-column-lasts")
                                    })
                                }
                                c.imagesLoaded().always(function() {
                                    c.find(".c-photo_mouseover").each(function() {
                                        E.loader.loadManager(this, "photoComment")
                                    }), E.fn.heightRefresh(), c.find(".c-blog-hide").removeClass("c-blog-hide"), c.velocity({
                                        opacity: 1
                                    }, 600, "easeOutExpo"), E.fn.heightRefresh(), E.fn.setFooter(), E.fn.bdRefresh()
                                }), "undefined" != typeof FONTPLUS && FONTPLUS.reload()
                            }
                            var k = [];
                            if (E.press.isPublishLocal) {
                                var S = window.innerWidth == E.device.spSize ? 5 : 10,
                                    j = "sp" == E.fn.nowDevice() ? 3 : 6,
                                    M = "sp" == E.fn.nowDevice() ? 2 : 4,
                                    s = a.length;
                                _.each(a, function(e) {
                                    E.press.loadJson(E.press.getLocalURL(e), function(e) {
                                        if (s -= 1, k = k.concat(e.posts), 0 == s) {
                                            var t = E.press.getLocalPosts(k, v, b, w, x, y);
                                            C({
                                                posts: t.posts
                                            });
                                            var l, i = c.nearest("a[data-press-navi='prev']").on("click", function() {
                                                    x -= y;
                                                    var e = E.press.getLocalPosts(k, v, b, w, x, y);
                                                    c.empty(), C({
                                                        posts: e.posts
                                                    }), n()
                                                }),
                                                a = c.nearest("a[data-press-navi='next']").on("click", function() {
                                                    x += y;
                                                    var e = E.press.getLocalPosts(k, v, b, w, x, y);
                                                    c.empty(), C({
                                                        posts: e.posts
                                                    }), n()
                                                }),
                                                n = function() {
                                                    x <= 0 ? i.hide() : i.show(), k.length <= x + y ? a.hide() : a.show()
                                                };
                                            n(), l = 0 < k.length % y ? parseInt(k.length / y) + 1 : parseInt(k.length / y);
                                            var d = function() {
                                                var e = c.nearest('nav[data-press-navi="pagination"]');
                                                e.empty(), e.hasClass("c-blog-pagination") || e.addClass("c-blog-pagination");
                                                var t = $('<a class="c-blog-pagination-previous">Previous</a>').appendTo(e),
                                                    i = $('<a class="c-blog-pagination-next">Next page</a>').appendTo(e),
                                                    a = $('<ul class="c-blog-pagination-list">').appendTo(e),
                                                    n = parseInt(x / y) + 1,
                                                    s = 0,
                                                    o = l;
                                                S < l && (o = n < j ? S : l < n + M ? (s = l - S, l) : (s = n - j, n + M));
                                                for (var r = s; r < o; r++) $('<li><a class="c-blog-pagination-link" data-page="' + (r + 1) + '">' + (r + 1) + "</a></li>").appendTo(a);
                                                t.on("click", function() {
                                                    x -= y;
                                                    var e = E.press.getLocalPosts(k, v, b, w, x, y);
                                                    c.empty(), C({
                                                        posts: e.posts
                                                    }), d()
                                                }), i.on("click", function() {
                                                    x += y;
                                                    var e = E.press.getLocalPosts(k, v, b, w, x, y);
                                                    c.empty(), C({
                                                        posts: e.posts
                                                    }), d()
                                                }), a.find("a").on("click", function() {
                                                    x = (parseInt($(this).data("page")) - 1) * y;
                                                    var e = E.press.getLocalPosts(k, v, b, w, x, y);
                                                    c.empty(), C({
                                                        posts: e.posts
                                                    }), d()
                                                }), 1 == n ? t.addClass("-disabled") : t.removeClass("-disabled"), n == l ? i.addClass("-disabled") : i.removeClass("-disabled"), e.find(".c-blog-pagination-list a").removeClass("-current"), e.find(".c-blog-pagination-list li:nth-child(" + (n - s) + ") > a").addClass("-current")
                                            };
                                            d()
                                        }
                                    })
                                })
                            } else E.press.loadJson(e, C)
                        }(t, n, e, s)
                })
            },
            resize: function() {
                return !1
            }
        }
    }(_bind),
    function(h) {
        h.base.pressPagination = {
            target: null,
            totalPosts: 0,
            totalPages: 0,
            currentPage: 0,
            displayLimit: window.innerWidth == h.device.spSize ? 5 : 10,
            init: function(e) {
                var t = $(this.target);
                this.totalPosts = t.data("total"), this.totalPages = Math.floor(this.totalPosts / h.press.postsPerPage), 0 < this.totalPosts % h.press.postsPerPage && this.totalPages++, (this.currentPage = 1) != this.totalPages && this.render()
            },
            render: function() {
                var e = this,
                    t = $(e.target);
                t.empty();
                var i = $('<a class="c-blog-pagination-previous">Previous</a>').appendTo(t),
                    a = $('<a class="c-blog-pagination-next">Next page</a>').appendTo(t),
                    n = $('<ul class="c-blog-pagination-list">').appendTo(t),
                    s = "sp" == h.fn.nowDevice() ? 3 : 6,
                    o = "sp" == h.fn.nowDevice() ? 2 : 4,
                    r = 0,
                    l = this.totalPages;
                this.totalPages > this.displayLimit && (l = e.currentPage < s ? this.displayLimit : e.currentPage + o > this.totalPages ? (r = this.totalPages - this.displayLimit, this.totalPages) : (r = e.currentPage - s, e.currentPage + o));
                for (var d = r; d < l; d++) {
                    var c = d + 1;
                    $('<li><a class="c-blog-pagination-link" data-page="' + c + '">' + c + "</a></li>").appendTo(n)
                }
                i.on("click", function() {
                    e.currentPage--, e.render(), h.press.goPage(e.currentPage)
                }), a.on("click", function() {
                    e.currentPage++, e.render(), h.press.goPage(e.currentPage)
                }), n.find("a").on("click", function() {
                    e.currentPage = $(this).data("page"), e.render(), h.press.goPage(e.currentPage)
                }), 1 == this.currentPage ? i.addClass("-disabled") : i.removeClass("-disabled"), this.currentPage == this.totalPages ? a.addClass("-disabled") : a.removeClass("-disabled"), t.find(".c-blog-pagination-list a").removeClass("-current"), t.find(".c-blog-pagination-list li:nth-child(" + (this.currentPage - r) + ") > a").addClass("-current")
            },
            resize: function() {
                var e = h.fn.nowDevice();
                return ("sp" == e && 10 == this.displayLimit || "sp" != e && 5 == this.displayLimit) && (this.displayLimit = "sp" == e ? 5 : 10, this.render()), !1
            }
        }
    }(_bind),
    function(d) {
        d.base.pressSNS = {
            target: null,
            init: function() {
                var a = $(this.target),
                    e = a.data("sns-service"),
                    t = a.data("sns-url");
                if (t.startsWith("<")) return $(t).insertBefore(a), void a.remove();
                var i = "",
                    n = "json";
                switch (e) {
                    case "Facebook":
                        i = -1 < t.indexOf("video") ? "https://www.facebook.com/plugins/video/oembed.json/?url=" + encodeURIComponent(t) : "https://www.facebook.com/plugins/post/oembed.json/?url=" + encodeURIComponent(t), n = "jsonp";
                        break;
                    case "Instagram":
                        i = "https://api.instagram.com/oembed/?url=" + t;
                        break;
                    case "Twitter":
                        i = "https://api.twitter.com/1/statuses/oembed.json?url=" + t, n = "jsonp";
                        break;
                    case "YouTube":
                        var s = "",
                            o = t.indexOf("&"),
                            r = "";
                        d.device.mobile && (r = d.window._width - 40), -1 < o && (t = t.substring(0, o)), s = -1 < (o = t.indexOf("/watch?v=")) ? t.substring(o + 9) : t.substring(t.lastIndexOf("index.html") + 1), i = d.device.mobile ? d.def.pressUrl + "sns/youtube/" + s + "/" + r : d.def.pressUrl + "sns/youtube/" + s;
                        break;
                    case "SoundCloud":
                        i = "https://soundcloud.com/oembed?url=" + t;
                        break;
                    case "note":
                        var l = t.substring(t.lastIndexOf("index.html") + 1);
                        $('<iframe class="note-embed" src="https://note.com/embed/notes/' + l + '" style="border: 0; display: block; max-width: 99%; width: 494px; padding: 0px; margin: 10px 0px; position: static; visibility: visible;" height="400"></iframe><script async src="https://note.com/scripts/embed.js" charset="utf-8"><\/script>').insertBefore(a), a.remove();
                        break;
                    case "Others":
                        -1 < t.indexOf("vimeo.com/index.html") && (i = "http://vimeo.com/api/oembed.json?url=" + t)
                }
                "" != i && $.ajax({
                    type: "GET",
                    scriptCharset: "utf-8",
                    dataType: n,
                    cashe: !1,
                    url: i
                }).done(function(e, t, i) {
                    e.html && ($(e.html).insertBefore(a), a.remove())
                }).fail(function(e, t, i) {
                    console.error(t)
                })
            },
            resize: function() {
                return !1
            }
        }
    }(_bind),
    function(n) {
        n.base.pressYMArchive = {
            target: null,
            dispCalenderPos: 0,
            init: function() {
                var t = this,
                    i = $(t.target),
                    a = JSON.parse(i.text());
                if (!n.fn.isEmpty(a) && !n.fn.isEmpty(a.sid))
                    if (i.hasClass("-ymlist")) {
                        var e = n.def.pressUrl + "api/get_yearmonth?b=" + a.sid;
                        n.press.loadJson(e, function(e) {
                            t.ymlist(i, e.data, a.pathToFolder)
                        })
                    } else {
                        e = n.def.pressUrl + "api/get_calendar?b=" + a.sid;
                        n.press.loadJson(e, function(e) {
                            t.calender(i, e.data, a.pathToFolder)
                        })
                    }
            },
            ymlist: function(e, t, i) {
                e.html(['<ul class="ym-list">', t.map(function(e) {
                    return ['<li class="ym-item">', '<a href="' + i + e.replace("index.html", "-") + '.html">', dayjs(e + "/1").format("YYYY年MM月") + "</a></li>"].join("")
                }).join(""), "</ul>"].join("")).css("display", "")
            },
            calender: function(e, t, i) {
                var a = this;
                e.html(['<div class="calender-root">', '<div class="control-header">', '<div class="nav prev">', '<svg class="prevLogo" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">', '<defs><style>.a{opacity:0.999;}.b{fill:none;}</style></defs><g class="a" transform="translate(0 48) rotate(-90)">', '<path d="M13.414,16.243,0,2.828,2.828,0,13.414,10.585,24,0l2.828,2.828Z" transform="translate(10.586 16.586)"/>', '<rect class="b" width="48" height="48"/></g></svg>', "</div>", '<div class="dispYM"></div>', '<div class="nav next">', '<svg class="nextLogo" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">', '<defs><style>.a{opacity:0.999;}.b{fill:none;}</style></defs><g class="a" transform="translate(0 48) rotate(-90)">', '<path d="M13.414,16.243,0,2.828,2.828,0,13.414,10.585,24,0l2.828,2.828Z" transform="translate(10.586 16.586)"/>', '<rect class="b" width="48" height="48"/></g></svg>', "</div>", "</div>", '<div class="days-header">', ["日", "月", "火", "水", "木", "金", "土"].map(function(e) {
                    return '<div class="days">' + e + "</div>"
                }).join(""), "</div>", '<div class="date-body"></div>', "</div>"].join("")).css("display", ""), e.find(".prev").off().on("click", function() {
                    a.displayCalender(-1, t, i)
                }), e.find(".next").off().on("click", function() {
                    a.displayCalender(1, t, i)
                }), a.displayCalender(0, t, i)
            },
            displayCalender: function(e, t, i) {
                var a = $(this.target).children(".calender-root"),
                    n = a.children(".control-header").children(".dispYM"),
                    s = a.children(".date-body"),
                    o = dayjs();
                this.dispCalenderPos += e;
                var r = (o = dayjs().add(this.dispCalenderPos, "month")).startOf("month"),
                    l = o.endOf("month"),
                    d = l.get("date"),
                    c = r.add(-1, "day").get("date"),
                    h = r.get("day"),
                    p = l.get("day");
                n.children("span").remove(), n.append("<span>" + o.format("YYYY") + "年 " + o.format("M") + "月</span>"), s.children().remove(), 0 !== h && s.append('<div class="week" />');
                for (var f = h; 0 < f; f--) s.children(".week").append('<div class="date last-month"><span>' + (c - f + 1) + "</span></div>");
                for (f = 1; f <= d; f++) {
                    var g = o.set("date", f).get("day"),
                        u = o.format("YYYY") + "/" + ("0" + o.format("M")).slice(-2) + "/" + ("0" + f).slice(-2);
                    0 === g && s.append('<div class="week" />');
                    var m = _.findIndex(t, function(e) {
                        return e.post_date == u
                    }); - 1 !== m ? s.children(".week:last").append(['<div class="date"><span class="created-date">', '<a href="' + i + t[m].filename + '">' + f + "</a>", "</span></div>"].join("")) : s.children(".week:last").append('<div class="date"><span>' + f + "</span></div>")
                }
                for (f = 1; f < 7 - p; f++) s.children(".week:last").append('<div class="date next-month"><span>' + f + "</span></div>")
            },
            resize: function() {
                return !1
            }
        }
    }(_bind),
    function(s) {
        s.base.sideFixedColumn = {
            target: null,
            init: function() {
                if ("sp" === s.fn.nowDevice()) {
                    var e = $("#a-side-a"),
                        t = $("#a-side-b");
                    e.width("auto"), t.width("auto")
                } else {
                    var i = $(this.target).data("layout-type"),
                        a = (e = $("#a-side-a"), t = $("#a-side-b"), $("#a-main"), e.data("fixed-size")),
                        n = t.data("fixed-size");
                    "sidefixed" === i && (a && "null" !== a && e.width(a), n && "null" !== n && t.width(n))
                }
            },
            resize: function() {
                this.init()
            }
        }
    }(_bind),
    function(d) {
        d.base.smoothScroll = {
            target: null,
            init: function(e) {
                if (d.fn.isEditBlock()) return !1;
                var t = $(this.target),
                    i = t.attr("href"),
                    a = !1,
                    n = i.split("index.html"),
                    s = this._replaceDots(n).toString(),
                    o = document.location.pathname.split("index.html"),
                    r = this._replaceDots(o).toString();
                if ("/" === r.substr(0, 1) && (r = r.substr(1)), s.toString() === r.toString() && (a = !0), "#" === i && t.hasClass("c-link_top") || "" === i && t.hasClass("c-link_top") || "javascript:void(0);" === i && t.hasClass("c-link_top")) t.on("click", function(e) {
                    var t = $("html,body");
                    d.fn.scrollAnimation(t, 0)
                });
                else if (i.match("#") || i.match("#") && a) {
                    var l = i.split("#").pop();
                    try {
                        "" != l && 0 < $("#" + l).length && t.on("click", function(e) {
                            d.fn.smoothScroll(e, l)
                        })
                    } catch (e) {}
                }
            },
            _replaceDots: function(e) {
                var i = e;
                return _.each(i, function(e, t) {
                    ".." !== e && "" !== e || i.splice(t, t + 1)
                }), i.pop(), i || null
            }
        }
    }(_bind),
    function(x) {
        x.base.spGlobalNavigation = {
            target: null,
            slideType: null,
            onAnim: !1,
            _slideAnimationSpeed: 400,
            init: function() {
                var i = this,
                    a = $("body"),
                    e = ($(window), $("#spNavigationTrigger"));
                if (e.data("isLoadTrigger")) return e.removeClass("js-hide"), !1;
                var t = x.fn.nowDevice(),
                    n = location.hostname.replace("www.", ""),
                    s = "pc" === x.base.viewPcSite.getHostItem(n),
                    o = $("#js-globalNavigation");
                if (0 < $("#js-globalMegaMenu").length) o = $("#js-globalMegaMenu");
                else if (0 < $("#js-tapMenu").length || 0 < $("#js-tapMegaMenu").length) {
                    $("#spNavigationTrigger").hide();
                    var r = $("#js-tapMenu");
                    0 === r.length && (r = $("#js-tapMegaMenu"));
                    var l = r.find(".c-menu");
                    0 < r.find(".m-motion").length ? l = r.find(".m-motion") : 0 < r.find(".b-megamenu_navigation").length && (l = r.children("ul"));
                    var d = l.children("li");
                    d.children("ul").hide(), "scroll" === r.data("layout") ? r.addClass("tapmenu-scroll") : r.addClass("tapmenu-step"), "auto" === r.data("steps") && (l.addClass("steps-auto"), d.addClass("steps-auto"), r.height(l.outerHeight()))
                }
                var c = o.closest("div[data-bk-id]");
                c.addClass("js-globalNavigationBaseBlock"), o.data("block", c), "pc" === t || s ? e.ready(function() {
                    e.before(o), o.children("div").css("height", "")
                }) : (i.setBlockDress(o, !0), o.prependTo(a)), i.slideType = o.data("slide-type");
                var h = o.data("btn-position"),
                    p = o.data("relative-on-tablet");
                if ("pc" === (i.beforeDevice = t)) i.removeCloseBtn();
                else {
                    if (0 < $("#js-sp-menu_closer").length) return !1;
                    i.appendCloseBtn(), i.closeBtnAction()
                }
                i.navigationHeightControll(), e.data("isLoadTrigger", !0), e.append($("<div />").addClass("c-sp-navigation_line1 c-sp-navigation_line")), e.append($("<div />").addClass("c-sp-navigation_line2 c-sp-navigation_line")), e.append($("<div />").addClass("c-sp-navigation_line3 c-sp-navigation_line")), setTimeout(function() {
                    "rightSlide" === i.slideType ? (o.addClass("-js-menuSlide-right_side_sliders"), e.on("click", function(e) {
                        e.preventDefault(), "block" !== o.css("display") || 0 !== o.offset().left ? 1 != i.onAnim ? (i.onAnim = !0, a.addClass("js-no_scroll"), i.navigationHeightControll(), o.show().stop(!0, !0).velocity({
                            left: 0
                        }, i._slideAnimationSpeed, function() {
                            i.onAnim = !1
                        }), $("#page").on("touchmove.noScroll", function(e) {
                            e.preventDefault()
                        })) : e.stopPropagation() : $("#js-sp-menu_closer").trigger("click")
                    }), i.closeBtnAction(i.slideType)) : "leftSlide" === i.slideType ? (o.addClass("-js-menuSlide-left_side_sliders"), e.on("click", function(e) {
                        e.preventDefault();
                        var t = o.parent().innerWidth() - (o.offset().left + o.outerWidth());
                        "block" !== o.css("display") || 0 != t ? 1 != i.onAnim ? (i.onAnim = !0, a.addClass("js-no_scroll"), i.navigationHeightControll(), o.show().stop(!0, !0).velocity({
                            right: 0
                        }, i._slideAnimationSpeed, function() {
                            i.onAnim = !1
                        }), $("#page").on("touchmove.noScroll", function(e) {
                            e.preventDefault()
                        })) : e.stopPropagation() : $("#js-sp-menu_closer").trigger("click")
                    }), i.closeBtnAction(i.slideType)) : "upSlide" === i.slideType ? (o.addClass("-js-menuSlide-up_sliders"), e.on("click", function(e) {
                        e.preventDefault(), "block" !== o.css("display") ? 1 != i.onAnim ? (i.onAnim = !0, a.addClass("js-no_scroll"), i.navigationHeightControll(), o.show().stop(!0, !0).velocity("slideDown", i._slideAnimationSpeed, function() {
                            i.onAnim = !1
                        }), $("#page").on("touchmove.noScroll", function(e) {
                            e.preventDefault()
                        })) : e.stopPropagation() : $("#js-sp-menu_closer").trigger("click")
                    }), i.closeBtnAction(i.slideType)) : null === i.slideType && (o.addClass("-js-menuSlide-no_animation"), e.on("click", function(e) {
                        e.preventDefault(), "block" !== o.css("display") ? (a.addClass("js-no_scroll"), i.navigationHeightControll(), o.show(), $("#page").on("touchmove.noScroll", function(e) {
                            e.preventDefault()
                        })) : $("#js-sp-menu_closer").trigger("click")
                    }), i.closeBtnAction(i.slideType)), "leftTop" === h ? e.addClass("-js-menuPosition-left_top") : "rightTop" === h ? e.addClass("-js-menuPosition-right_top") : "top" === h ? e.addClass("-js-menuPosition-top") : "leftTop_fixed" === h ? e.addClass("-js-menuPosition-left_top_fixed") : "rightTop_fixed" === h ? e.addClass("-js-menuPosition-right_top_fixed") : "top_fixed" === h && e.addClass("-js-menuPosition-top_fixed"), p && e.addClass("-js-menuPosition-relative_on_tablet")
                }, 10)
            },
            navigationHeightControll: function() {
                var e, t = $("#js-globalNavigation");
                0 < $("#js-globalMegaMenu").length && (t = $("#js-globalMegaMenu")), 0 !== t.length && ("none" === t.css("display") ? (t.css("visibility", "hidden").show(), e = t.find("ul")[0].scrollHeight, t.css("visibility", "").hide()) : e = t.find("ul")[0].scrollHeight, e > x.window._height && (t.height(x.window._height), t.children("div").height(x.window._height)))
            },
            appendCloseBtn: function() {
                var e = $("<li />").addClass("c-right c-sp-closer"),
                    t = $("<a />").attr("id", "js-sp-menu_closer").attr("href", "#"),
                    i = $("<span />").addClass("icon-close");
                t.append(i), e.append(t), 0 < $("#js-globalMegaMenu").length ? $("#js-globalMegaMenu ul").first().prepend(e) : $("#js-globalNavigation ul").first().prepend(e)
            },
            removeCloseBtn: function() {
                0 < $("#js-globalMegaMenu").length ? $("#js-globalMegaMenu li.c-sp-closer").remove() : $("#js-globalNavigation li.c-sp-closer").remove()
            },
            closeBtnAction: function() {
                var t = this,
                    i = $("body"),
                    a = ($(window), $("#js-globalNavigation"));
                0 < $("#js-globalMegaMenu").length && (a = $("#js-globalMegaMenu"));
                var n = $("#js-sp-menu_closer");
                n.off(), "rightSlide" === t.slideType ? n.on("click", function(e) {
                    e.preventDefault(), 1 != t.onAnim ? (t.onAnim = !0, i.removeClass("js-no_scroll"), $("#page").off(".noScroll"), a.stop(!0, !0).velocity({
                        left: x.window._width
                    }, t._slideAnimationSpeed, function() {
                        t.onAnim = !1
                    })) : e.stopPropagation()
                }) : "leftSlide" === t.slideType ? n.on("click", function(e) {
                    e.preventDefault(), 1 != t.onAnim ? (t.onAnim = !0, i.removeClass("js-no_scroll"), $("#page").off(".noScroll"), a.stop(!0, !0).velocity({
                        right: x.window._width
                    }, t._slideAnimationSpeed, function() {
                        t.onAnim = !1
                    })) : e.stopPropagation()
                }) : "upSlide" === t.slideType ? n.on("click", function(e) {
                    e.preventDefault(), 1 != t.onAnim ? (t.onAnim = !0, i.removeClass("js-no_scroll"), $("#page").off(".noScroll"), a.stop(!0, !0).velocity("slideUp", t._slideAnimationSpeed, function() {
                        t.onAnim = !1
                    })) : e.stopPropagation()
                }) : null === t.slideType && n.on("click", function(e) {
                    e.preventDefault(), i.removeClass("js-no_scroll"), $("#page").off(".noScroll"), a.hide()
                });
                var e = a.find("li").find("a:not(#js-sp-menu_closer)");
                if (e.off("click.closeSpMenu"), "pc" === x.fn.nowDevice()) return !1;
                e.on("click.closeSpMenu", function(e) {
                    n.click()
                })
            },
            resize: function() {
                var y = this;
                _.delay(function() {
                    var e = window.innerWidth,
                        t = (e < x.device.spSize ? "sp" : e <= x.device.tabletSize && "tablet") || "pc";
                    if (0 < $(".tapmenu-scroll").length || 0 < $(".tapmenu-step").length) {
                        var o = $("#js-tapMenu"),
                            r = o.find(".c-menu");
                        0 === r.length && (r = o.find(".m-motion"));
                        var l = r.children("li"),
                            d = l.children("ul"),
                            c = !1;
                        if (0 < $("#js-tapMegaMenu").length && (o = $("#js-tapMegaMenu"), r = o.find(".megamenu-list"), (l = r.children("li")).children(".b-megamenu_contents").width(Math.ceil(o.width()))), "pc" !== t) {
                            0 === o.find(".menu-display").length && r.wrap('<div class="menu-display"></div>');
                            var h = o.find(".menu-display");
                            r.find(".c-unlink").each(function(e, t) {
                                0 === $(t).html().length && r.find(".c-unlink").parent("li").remove()
                            }), r.css("position", ""), l.css("z-index", ""), r.css({
                                "border-left": "none",
                                "border-right": "none"
                            });
                            var i = o.data("layout"),
                                a = o.data("steps");
                            if ("auto" !== a) {
                                a > l.length && (a = l.length);
                                var n = "scroll" === i ? h.width() : r.width();
                                l.width(n / a)
                            }
                            if ("scroll" === i && r.width() > o.width() && 0 === o.children(".tapmenu-nav").length) {
                                var p = $('<div class="tapmenu-nav next"><svg class="nextLogo" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><defs><style>.a{opacity:0.999;}.b{fill:none;}</style></defs><g class="a" transform="translate(0 48) rotate(-90)"><path d="M13.414,16.243,0,2.828,2.828,0,13.414,10.585,24,0l2.828,2.828Z" transform="translate(10.586 16.586)"/><rect class="b" width="48" height="48"/></g></svg></div>'),
                                    f = $('<div class="tapmenu-nav prev"><svg class="prevLogo" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><defs><style>.a{opacity:0.999;}.b{fill:none;}</style></defs><g class="a" transform="translate(0 48) rotate(-90)"><path d="M13.414,16.243,0,2.828,2.828,0,13.414,10.585,24,0l2.828,2.828Z" transform="translate(10.586 16.586)"/><rect class="b" width="48" height="48"/></g></svg></div>');
                                f.hide(), o.append(p), o.append(f);
                                var g = !1;
                                p.off().on("click", function() {
                                    if (!g) {
                                        g = !0, d.hide(), h.css({
                                            height: r.outerHeight(),
                                            top: ""
                                        }), l.children(".b-megamenu_navigation").hasClass("-active") && l.children(".b-megamenu_navigation").removeClass("-active"), r.css("bottom", ""), f.show();
                                        var e = parseFloat(r.css("left")),
                                            i = o.width(),
                                            t = 0,
                                            a = 0,
                                            n = 0;
                                        l.each(function(e, t) {
                                            i -= $(t).outerWidth()
                                        });
                                        for (var s = 0; s < l.length; s++)
                                            if ((t -= $(l[s]).outerWidth()) < e - o.width()) {
                                                a = Math.round(t - (e - o.width())), n = $(l[s + 1]).outerWidth();
                                                break
                                            } 0 !== a ? e += a : e -= n, (e < i || Math.abs(Math.round(i) - Math.round(e)) <= 1) && (e = i), r.velocity({
                                            left: e + "px"
                                        }, {
                                            duration: 600,
                                            easing: "easeOutExpo",
                                            complete: function() {
                                                g = !1, parseFloat(r.css("left")) <= i && p.hide()
                                            }
                                        })
                                    }
                                }), f.off().on("click", function() {
                                    if (!g) {
                                        g = !0, d.hide(), h.css({
                                            height: r.outerHeight(),
                                            top: ""
                                        }), l.children(".b-megamenu_navigation").hasClass("-active") && l.children(".b-megamenu_navigation").removeClass("-active"), r.css("bottom", ""), p.show();
                                        for (var e = parseFloat(r.css("left")), t = 0, i = 0; i < l.length; i++)
                                            if ((t -= $(l[i]).outerWidth()) < e) {
                                                var a = Math.round(e - (t + $(l[i]).outerWidth())),
                                                    n = $(l[i - 1]).outerWidth();
                                                break
                                            } 0 !== a ? e -= a : e += n, 0 < e && (e = 0), r.velocity({
                                            left: e + "px"
                                        }, {
                                            duration: 600,
                                            easing: "easeOutExpo",
                                            complete: function() {
                                                g = !1, 0 <= parseInt(r.css("left")) && f.hide()
                                            }
                                        })
                                    }
                                });
                                var s = "ontouchstart" in window;
                                "pc" !== t && (s = !0), r.on({
                                    "touchstart mousedown": function(e) {
                                        this.touched = !0, void 0 !== event.changedTouches && (this.pageX = s ? event.changedTouches[0].pageX : e.pageX, this.leftBegin = parseInt($(this).css("left")), this.left = parseInt($(this).css("left")))
                                    },
                                    "touchmove mousemove": function(e) {
                                        if (this.touched && (e.preventDefault(), void 0 !== event.changedTouches)) {
                                            d.hide(), h.css({
                                                height: r.outerHeight(),
                                                top: ""
                                            }), l.children(".b-megamenu_navigation").hasClass("-active") && l.children(".b-megamenu_navigation").removeClass("-active"), r.css("bottom", ""), c = !1;
                                            var t = s ? event.changedTouches[0].pageX : e.pageX,
                                                i = o.width();
                                            return l.each(function(e, t) {
                                                i -= $(t).outerWidth()
                                            }), this.left = this.left - (this.pageX - t), this.pageX = t, this.left < 0 && this.left > i ? ($(this).css({
                                                left: this.left
                                            }), $(".prev").show(), $(".next").show()) : 0 <= this.left ? ($(this).css({
                                                left: "0"
                                            }), $(".prev").hide()) : this.left <= i && ($(this).css({
                                                left: i
                                            }), $(".next").hide()), !1
                                        }
                                    }
                                });

                                function u(e) {
                                    var t = e.offset().left,
                                        i = e.outerWidth(),
                                        a = parseFloat(l.css("font-size")),
                                        n = t - (o.width() - i) / 2 - a,
                                        s = o.width();
                                    l.each(function(e, t) {
                                        s -= $(t).outerWidth()
                                    }), 0 <= -n ? (n = 0, $(".prev").hide(), $(".next").show()) : -n < s ? (n = -s, $(".prev").show(), $(".next").hide()) : ($(".prev").show(), $(".next").show()), r.css("left", -n)
                                }
                                if (0 < r.find(".c-current").length) {
                                    var m = r.find(".c-current"),
                                        v = m.parent("li");
                                    ("LI" === m[0].tagName && 0 === m.parents("li").length || "A" === m[0].tagName && 0 === m.parents("ul").parent("li").length) && ("LI" === m[0].tagName && (v = m), u(v))
                                } else if (0 < r.find(".b-megamenu_navigation a").length) {
                                    r.find(".b-megamenu_navigation a");
                                    r.find(".b-megamenu_navigation a").each(function(e, t) {
                                        location.href == t.href && u($(t).parents("li"))
                                    })
                                }
                            }
                            var b = 0;
                            if (l.each(function(e, t) {
                                    b < $(t).height() && (b = $(t).height())
                                }), l.height(b), 0 < d.length) {
                                d.width(Math.ceil(o.width())).hide();
                                var w = 0;
                                d.each(function(e, t) {
                                    w < $(t).height() && (w = $(t).height())
                                }), l.each(function(e, t) {
                                    var s = $(t);
                                    0 < s.children("ul").length && s.off().on("click", function(e) {
                                        var t = s.children("ul"),
                                            i = document.documentElement.scrollHeight - o.offset().top - o.height() > w;
                                        if (!c) {
                                            if (t.off().on({
                                                    click: function(e) {
                                                        e.stopPropagation()
                                                    },
                                                    "touchstart mousedown": function(e) {
                                                        e.stopPropagation()
                                                    },
                                                    "touchmove mousemove": function(e) {
                                                        e.stopPropagation()
                                                    }
                                                }), 0 < o.parents("#a-footer").length && !i) {
                                                t.css("height", "auto");
                                                var a = t.height();
                                                h.css("top", -a), t.css({
                                                    top: 0,
                                                    height: 0,
                                                    overflow: "hidden"
                                                }), "js-tapMenu" !== h.parent("div").attr("id") && h.parent("div").height(r.outerHeight()), r.css("bottom", 0), h.height(r.outerHeight() + a), t.css("left", o.offset().left - s.offset().left), t.show().stop(!0, !1).velocity({
                                                    height: a,
                                                    top: -a
                                                }, {
                                                    duration: 400
                                                })
                                            } else h.height(r.outerHeight() + t.height()), t.css({
                                                left: o.offset().left - s.offset().left,
                                                top: o.hasClass("tapmenu-scroll") ? r.outerHeight() : ""
                                            }), t.show().velocity("slideDown", {
                                                duration: 400
                                            });
                                            var n = t.children("li").children(".c-current");
                                            return 0 < n.length && "A" === n[0].tagName && "rgb(255, 255, 255)" === n.css("color") && n.css("color", "initial"), !(c = !0)
                                        }
                                        e.stopPropagation(), "none" === t.css("display") ? (0 < o.parents("#a-footer").length && !i && d.css({
                                            top: 0,
                                            height: 0,
                                            overflow: "visible"
                                        }), d.hide(), h.css({
                                            height: r.outerHeight(),
                                            top: ""
                                        }), c = !1, t.off(), s.trigger("click")) : (0 < o.parents("#a-footer").length && !i ? t.stop(!0, !1).velocity({
                                            height: 0,
                                            top: 0
                                        }, {
                                            duration: 400,
                                            complete: function() {
                                                t.css("overflow", "visible"), t.hide(), h.css({
                                                    height: r.outerHeight(),
                                                    top: ""
                                                }), r.css("bottom", "")
                                            }
                                        }) : d.velocity("slideUp", {
                                            duration: 400,
                                            complete: function() {
                                                h.css({
                                                    height: r.outerHeight(),
                                                    top: ""
                                                })
                                            }
                                        }), c = !1, t.off())
                                    })
                                })
                            }
                            o.height(r.outerHeight())
                        } else 0 < o.parents("#a-footer").length && "js-tapMenu" !== o.find(".menu-display").parent("div").attr("id") && o.find(".menu-display").parent("div").css("height", ""), 0 < $("#js-tapMegaMenu").length && (l.children(".b-megamenu_contents").css("width", ""), l.children(".b-megamenu_navigation").hasClass("-active") && l.children(".b-megamenu_navigation").removeClass("-active")), 0 < o.find(".menu-display").length && r.unwrap(), o.find(".next").remove(), o.find(".prev").remove(), l.off("click"), o.find(".lavalamp-object").css({
                            display: ""
                        }), o.css({
                            height: ""
                        }), r.css({
                            left: 0,
                            bottom: "",
                            "border-left": "",
                            "border-right": ""
                        }), l.css({
                            width: "",
                            height: ""
                        }), d.css({
                            height: "",
                            width: "",
                            display: "",
                            left: "",
                            top: "",
                            opacity: ""
                        }), d.children("li").css({
                            color: ""
                        })
                    } else {
                        var _ = $("#js-globalNavigation");
                        if (0 < $("#js-globalMegaMenu").length && (_ = $("#js-globalMegaMenu")), "pc" === t) $("body").removeClass("js-no_scroll"), y.removeCloseBtn(), $("#spNavigationTrigger").ready(function() {
                            y.setBlockDress(_, !1), $("#spNavigationTrigger").before(_), _.children("div").css("height", "")
                        });
                        else if ("pc" === y.beforeDevice) {
                            if ("rightSlide" === y.slideType ? _.css("left", x.window._width) : "leftSlide" === y.slideType && _.css("right", x.window._width), y.setBlockDress(_, !0), _.prependTo($("body")), 0 < $("#js-sp-menu_closer").length) return !1;
                            y.appendCloseBtn(), y.closeBtnAction(), y.navigationHeightControll()
                        } else $("body").removeClass("js-no_scroll")
                    }
                    y.beforeDevice = t
                }, 100)
            },
            setBlockDress: function(e, t) {
                var i = e.data("block");
                if (i && !x.fn.isEmpty(i.attr("class"))) {
                    var a = _.find(i.attr("class").split(/\s+/), function(e) {
                        return 0 == e.indexOf("-dress_") || "-preview_dress" == e
                    });
                    a && (t ? e.addClass(a) : e.removeClass(a))
                }
            }
        }
    }(_bind),
    function(f) {
        f.base.tab = {
            target: null,
            type: null,
            slideGap: 0,
            init: function() {
                var l = this,
                    d = $(l.target).closest(".b-tab"),
                    c = d.find(".b-tab_contents");
                if ("sp" === _bind.fn.nowDevice() && d.find(".b-tab_navigation li").length >= c.children().length || "sp" !== _bind.fn.nowDevice()) {
                    var e = "click";
                    if ((d.hasClass("-mo") || d.hasClass("-slider")) && (e = "mouseenter"), d.hasClass("-slider")) {
                        l.type = "slider";
                        var r, a = d.find(".column"),
                            n = $("<div />").addClass("b-tab_outer-slidebox"),
                            h = -1 < d.find(".g-column").length ? d.find(".g-column")[0].offsetWidth : d.find(".column").first().outerWidth(),
                            p = [];
                        n.width("auto"), a.height("auto"), c.height("auto"), a.each(function() {
                            var e = $(this),
                                t = 0 < e.closest("div.g-column").length,
                                i = t ? e.closest("div.g-column") : e,
                                a = f.fn.paddings(i).left,
                                n = f.fn.paddings(i).right,
                                s = 0;
                            t && (s = f.fn.paddings(e).left + f.fn.paddings(e).right);
                            var o = h - a - n - s;
                            r = h - a - n, e.width(o), p.push(e.outerHeight(!0))
                        }), n.append(a), n.width(a.length * h), a.height(Math.max.apply(null, p));
                        var t = f.fn.paddings(c).top + f.fn.paddings(c).bottom;
                        c.height(Math.max.apply(null, p) - t), c.append(n), d.find(".b-tab_navigation li").on("click", function(e) {
                            return !1
                        }), d.find(".b-tab_navigation li").on(e, function(e) {
                            e.preventDefault(), e.stopPropagation(), !0;
                            var t = $(this),
                                i = d.find(".b-tab_navigation li").index(t);
                            a.eq(i).outerHeight(!0);
                            f.fn.moveClass(t, d.find(".b-tab_navigation li")), l.slideGap = r, n.velocity("stop", !0).velocity({
                                left: l.slideGap * i * -1
                            }, 400, "easeOutExpo", function() {
                                !1
                            })
                        })
                    } else l.type = "another", d.hasClass("-mo") && d.find(".b-tab_navigation li").on("click", function(e) {
                        return !1
                    }), d.find(".b-tab_navigation li").on(e, function(e) {
                        e.preventDefault(), e.stopPropagation(), !0;
                        var t = $(this),
                            i = t.closest(".b-tab"),
                            a = i.find(".b-tab_contents"),
                            n = i.find(".b-tab_navigation li").index(t),
                            s = d.find(".column"),
                            o = s.eq(n);
                        f.fn.moveClass(t, d.find(".b-tab_navigation li"));
                        var r = d.find(".b-tab_navigation");
                        c.css("minHeight", "auto"), r.css("minHeight", "auto"), s.removeClass("js-show"), o.addClass("js-show"), _.defer(function() {
                            var e = o.outerHeight(!0) + _bind.fn.paddings(a).top + _bind.fn.paddings(a).bottom;
                            a.velocity("stop", !0).velocity({
                                height: e
                            }, function() {
                                if (!1, "sp" !== _bind.fn.nowDevice() && d.hasClass("-menu")) {
                                    var e = Math.max.apply(null, [r.outerHeight(!0), c.outerHeight(!0)]);
                                    c.css("minHeight", e), r.css("minHeight", e)
                                }
                                l.resize()
                            }), f.fn.setFooter()
                        }), c.find($("img").length) && $(window).trigger("resize")
                    });
                    var i = location.search.substring(1).split("&").find(function(e) {
                        return -1 < e.indexOf("tabindex=")
                    });
                    if (i) {
                        var s = i.replace("tabindex=", "");
                        d.find(".b-tab_navigation li #" + s).closest(".b-tab_navigation li").eq(0).trigger(e)
                    } else d.find(".b-tab_navigation li").eq(0).trigger(e)
                }
            },
            resize: function() {
                var e = $(this.target).closest(".b-tab"),
                    t = e.find(".b-tab_contents"),
                    i = e.find(".b-tab_navigation");
                e.find(".column");
                if (null !== f.fn.documentGetFullscreenElement(document)) return !1;
                if ("slider" === this.type) this.init();
                else if (t.css({
                        minHeight: "auto",
                        height: "auto"
                    }), i.css({
                        minHeight: "auto",
                        height: "auto"
                    }), "sp" !== f.fn.nowDevice() && e.hasClass("-menu")) {
                    var a = Math.max.apply(null, [i.outerHeight(!0), t.outerHeight(!0)]);
                    t.css({
                        minHeight: a,
                        height: a
                    }), i.css({
                        minHeight: a,
                        height: a
                    })
                }
            }
        }
    }(_bind),
    function(s) {
        s.base.viewPcSite = {
            target: null,
            status: !1,
            init: function() {
                var t = this;
                if ("sp" === s.fn.nowDevice() || t.status) {
                    t.status = !0, $(".c-device_outer").remove();
                    var i = location.hostname.replace("www.", ""),
                        e = $("<div />").addClass("c-device_outer"),
                        a = $("<button />").addClass("c-device_changer"),
                        n = $("body").data("view-pc-position");
                    "pc" === t.getHostItem(i) ? (t.setViewportPcSize(), a.html("スマホサイトを表示する"), a.on("click", function(e) {
                        return e.preventDefault(), t.removeHostItem(i), t.setViewportSpSize(), (s.device.ipad || s.device.iphone) && t.resizeiOS(), !1
                    })) : (a.html("PCサイトを表示する"), a.on("click", function(e) {
                        return e.preventDefault(), t.setHostItem(i), t.setViewportPcSize(), (s.device.ipad || s.device.iphone) && t.resizeiOS(), !1
                    })), e.append(a), "top" === n ? $("body").prepend(e) : $("body").append(e)
                }
            },
            setViewportPcSize: function() {
                $("#a-viewport").attr("content", "width=980, maximum-scale=1")
            },
            setViewportSpSize: function() {
                $("#a-viewport").attr("content", "width=device-width, initial-scale=1")
            },
            setHostItem: function(e) {
                localStorage.setItem(e + "_compulsoryPc", "pc")
            },
            removeHostItem: function(e) {
                localStorage.setItem(e + "_compulsoryPc", "sp")
            },
            getHostItem: function(e) {
                return localStorage.getItem(e + "_compulsoryPc")
            },
            resizeiOS: function() {
                $(window).trigger("orientationchange"), s.window._width = $(window).width(), s.base.ghostHeader.resize(), s.base.spGlobalNavigation.resize()
            },
            resize: function() {
                this.init()
            }
        }
    }(_bind),
    function(u) {
        u.base.widget = {
            target: null,
            status: {},
            init: function() {
                var e = this.target;
                e.dataset.dispOnScroll || e.dataset.followHeader || e.dataset.followFooter ? this.scroll() : $(e).velocity({
                    opacity: 1
                }, 500), this.closeBtn()
            },
            scroll: function() {
                var o = $("#a-header"),
                    r = $("#a-footer"),
                    l = $("#a-ghost_header"),
                    d = $(this.target);
                if (0 != u.fn.isEditBlock()) return $(window).off("scroll.widgetScroll"), d.css("opacity", "1"), !1;
                setTimeout(function() {
                    $(window).scroll()
                }, 1);
                var c = d.data("disp-on-scroll"),
                    h = d.data("follow-header"),
                    p = d.data("follow-footer"),
                    f = o.data("float"),
                    g = r.data("float");
                $(window).on("scroll.widgetScroll", function() {
                    var e = $(window).scrollTop();
                    if (h) {
                        var t = o.outerHeight(!0);
                        f ? d.css("top", t + "px") : e < t ? d.css("top", t - e + "px") : 0 < l.length && "block" == l.css("display") ? d.css("top", l.outerHeight(!0) + "px") : d.css("top", "0px")
                    }
                    if (p) {
                        var i = r.outerHeight(!0);
                        if (g) d.css("bottom", i + "px");
                        else {
                            var a = $(window).height();
                            if (u.device.mobile) {
                                var n = $('<div style="height: 100vh;">').appendTo("body");
                                a = n.height(), n.remove()
                            }
                            var s = $(document.body).height();
                            s - a - i < e ? d.css("bottom", e - (s - a - i) + "px") : d.css("bottom", "0px")
                        }
                    }
                    c && 0 == e ? d.velocity("stop", !0, !1).velocity({
                        opacity: 0
                    }, 500) : d.velocity({
                        opacity: 1
                    }, 500)
                })
            },
            closeBtn: function() {
                var e = this.target,
                    t = $(e),
                    i = t.find(".c-widget-close_btn"),
                    a = $("#w-bottom-right").find('[id^="bk"]'),
                    n = $.makeArray(a).some(function(e) {
                        return "none" != $(e).css("display")
                    });
                e.dataset.dispCloseBtn && 0 == i.length && n ? $('<div class="c-widget-close_btn"><span class="icon-close"></span></div>').on("click", function() {
                    t.velocity("stop", !0, !1).velocity({
                        opacity: 0
                    }, {
                        duration: 200,
                        display: "none"
                    })
                }).prependTo(t) : 0 < i.length && !n && i.remove()
            },
            resize: function() {
                var e = this.target;
                (e.dataset.dispOnScroll || e.dataset.followHeader || e.dataset.followFooter) && this.scroll(), this.closeBtn()
            }
        }
    }(_bind),
    function(e) {
        e.bridge = {
            onInit: function() {
                if (-1 < location.search.indexOf("bindapp=1") && e.loader.loadJS(parent.ctxpath + "/template/sitetemplate/" + parent.responsiveModuleVer + "/_editor/scripts/blockEditor.js"), -1 < location.search.indexOf("bindapp=3") && e.loader.loadJS(parent.ctxpath + "/template/sitetemplate/" + parent.responsiveModuleVer + "/_editor/scripts/widgetEditor.js"), -1 < location.search.indexOf("bindapp=2")) {
                    var i = [parent.ctxpath + "/template/sitetemplate/" + parent.responsiveModuleVer + "/_editor/lib/lib.js", parent.ctxpath + "/template/sitetemplate/" + parent.responsiveModuleVer + "/_editor/scripts/layoutEditor.js"],
                        a = i.length,
                        n = 0;
                    ! function e() {
                        var t = document.createElement("script");
                        t.src = i[n], document.body.appendChild(t), ++n < a && (t.onload = e)
                    }(), e.loader.loadCSS(parent.ctxpath + "/template/sitetemplate/" + parent.responsiveModuleVer + "/_editor/styles/bind.css"), e.loader.loadCSS(parent.ctxpath + "_modules/css/blockEditor.css")
                }
            }
        }
    }(_bind),
    function(e) {
        var t = document.getElementById("script-js").src,
            n = {};
        _.each(t.replace(/^.*\?(.*)$/g, "$1").split(","), function(e) {
            var t = e.split("="),
                i = t[0],
                a = t[1];
            "l" == i && (n.level = a), "s" == i && (n.textsize = a), "t" == i && (n.theme = a), "f" == i && (n.font = a), "fs" == i && (n.fontsize = a), "rs" == i && (n.rs = a), "wf" == i && (n.wf = a), "c" == i && (n.cornerskin = a), "v" == i && (n.version = a)
        });
        var i = t.split("scripts/bind.html")[0].split("index.html");
        i = (i = _.initial(i)).join("index.html") + "/_plugins/", e.def = {
            appParam: n,
            urlModule: t.split("scripts/bind.html")[0],
            urlPlugins: i,
            urlSync: "//sync5-res.digitalstage.jp/",
            urlCart: "//shops-api2.weblife.me/",
            urlCartOem: "//shops-api.blks.jp/",
            allFoundationIds: "#a-header,#a-ghost_header,#a-billboard,#a-site_contents,#a-main,#a-side-a,#a-side-b,#a-footer",
            spSize: 640,
            resizeTime: 100,
            responsive: !0,
            version: n.version ? "?v=" + n.version : "",
            pressUrl: "https://press.bindcloud.jp/",
            supportedWebP: !0
        }
    }(_bind),
    function(e) {
        var t = navigator.userAgent.toLowerCase(),
            i = -1 < t.indexOf("windows") || -1 < t.indexOf("win32"),
            a = -1 < t.indexOf("opera");
        e.device = {
            spSize: 641,
            tabletSize: 768,
            ua: t,
            win: i,
            win7: i && -1 < t.indexOf("nt 6.1"),
            vista: i && -1 < t.indexOf("nt 6.0"),
            xp: i && (-1 < t.indexOf("nt 5.1") || 0 < t.indexOf("windows xp")),
            mac: -1 < t.indexOf("macintosh") || -1 < t.indexOf("mac_power"),
            ie: (-1 < t.indexOf("msie") || -1 < t.indexOf("trident")) && !a,
            edge: 0 < t.indexOf("edge"),
            ffx: 0 < t.indexOf("firefox"),
            chr: 0 < t.indexOf("chrome/index.html") && -1 == t.indexOf("edge"),
            ie110: 0 < t.indexOf("trident/7") && !a,
            ie100: 0 < t.indexOf("msie 10") && !a,
            ie90: 0 < t.indexOf("msie 9") && !a,
            ie80: 0 < t.indexOf("msie 8") && !a,
            sf: 0 < t.indexOf("safari") && -1 == t.indexOf("chrome") && -1 == t.indexOf("edge"),
            ipad: (0 < t.indexOf("ipad") || 0 < t.indexOf("macintosh")) && 0 < t.indexOf("safari") && "ontouchend" in document,
            iphone: 0 < t.indexOf("iphone") && 0 < t.indexOf("safari"),
            android: 0 < t.indexOf("android"),
            mobile: -1 != t.indexOf("windows") && -1 != t.indexOf("phone") || -1 != t.indexOf("iphone") || -1 != t.indexOf("ipod") || -1 != t.indexOf("android") && -1 != t.indexOf("mobile") || -1 != t.indexOf("firefox") && -1 != t.indexOf("mobile") || -1 != t.indexOf("blackberry")
        }
    }(_bind);
var _dress = {};

function popup(e, t, i, a, n, s) {
    if (_bind.fn.isEditBlock()) return !1;
    var o = "";
    0 < i && (o += "width=" + i + ","), 0 < a && (o += "height=" + a + ","), o += "scrollbars=" + (n ? "yes" : "no") + ",resizable=" + (s ? "yes" : "no"), "_blank" == (t = t || "_blank") && (o += ",noopener=yes,noreferrer=yes");
    var r = window.open(e, t, o);
    r && r.focus()
}

function idflash(e, t, i, a) {
    var n = navigator.userAgent,
        s = (new Date).getTime(),
        o = e.substring(0, e.lastIndexOf("index.html") + 1),
        r = "";
    r = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,45,0"', r += ' id="idswf"', r += ' width="' + t + '"', r += ' height="' + i + '"', r += ">", r += '<param name="movie" value="' + e + "&tm=" + s + '" />', r += '<param name="base" value="." />', r += '<param name="bgcolor" value="' + a + '" />', r += '<param name="wmode" value="transparent" />', r += '<param name="FlashVars" value="b=' + n + "&idbase=" + o + '"/>', r += '<embed src="' + e + "&tm=" + s + '" type="application/x-shockwave-flash"', r += ' id="idswf"', r += ' width="' + t + '"', r += ' height="' + i + '"', r += ' base="."', r += ' wmode="transparent"', r += ' bgcolor="' + a + '"', r += ' FlashVars="b=' + n + "&idbase=" + o + '"', r += "></embed>", r += "</object>", document.write(r)
}! function(a) {
    a.selected = {
        init: function(e, t) {
            return this.highlighter(e), this.domPreview(e, t)
        },
        highlighter: function(e) {
            var t = document.createRange();
            t.selectNodeContents(e[0]);
            var i = window.getSelection();
            i.removeAllRanges(), i.addRange(t)
        },
        domPreview: function(e, t) {
            var i = this,
                a = "",
                n = t.extrablocks.split(","),
                s = t.outers.split(","),
                o = t.parts.split(","),
                r = t.component.split(","),
                l = t.tagstableparts.split(","),
                d = t.tagslist.split(","),
                c = t.taganchor.split(",");
            return a += i.domSearcher(e, n) ? i.domSearcher(e, n) + " " : "", a += i.domSearcher(e, s) ? i.domSearcher(e, s) + " " : "", a += i.domSearcher(e, o) ? i.domSearcher(e, o) + " " : "", a += i.domSearcher(e, r) ? i.domSearcher(e, r) + " " : "", a += i.domSearcher(e, l) ? i.domSearcher(e, l) + " " : "", a += i.domSearcher(e, d) ? i.domSearcher(e, d) + " " : "", a += i.domSearcher(e, c) ? i.domSearcher(e, c) + " " : ""
        },
        domSearcher: function(t, e, i) {
            var a;
            return i ? (0 < t.closest(e).length || t.hasClass(e.replace(".", ""))) && (a = e) : _.each(e, function(e) {
                (0 < t.closest(e).length || t.hasClass(e.replace(".", ""))) && (a = e)
            }), a
        }
    }, $(window).on("load", function() {
        _bind.status.dressPreview && window.addEventListener("message", function(t) {
            var e = location.protocol,
                i = location.host;
            if (t.origin !== e + "//" + i) return !1;
            "removed" === t.data ? $("*").off("click.selected") : ($("*").off("click.selected"), $("*").on("click.selected", function(e) {
                e.preventDefault(), e.stopPropagation(), t.source.postMessage(a.selected.init($(this), t.data), t.origin)
            }))
        }, !1)
    })
}(_dress),
function(n) {
    n.fn = {
        isEmpty: function(e) {
            var t = !1;
            return void 0 === e ? t = !0 : null === e ? t = !0 : "" === e ? t = !0 : 0 === e.length && (t = !0), t
        },
        onResize: function(e, t) {
            t || _.defer(e, {
                type: "load"
            }), $(window).on("resize", _.throttle(e, n.def.resizeTime))
        },
        isEditBlock: function() {
            return -1 < location.search.indexOf("bindapp=1") ? 1 : -1 < location.search.indexOf("bindapp=2") ? 2 : -1 < location.search.indexOf("bindapp=3") && 3
        },
        isAnimationOff: function() {
            var e = !1;
            return this.isEditBlock() ? e = !0 : -1 != location.search.indexOf("animation_off=1") && (e = !0), e
        },
        bdRefresh: function() {
            this.isEditBlock() && (n.blockEdit ? n.blockEdit.resize() : setTimeout(function() {
                n.blockEdit && n.blockEdit.resize()
            }, 1e3))
        },
        heightRefresh: function(e) {
            this.bdRefresh();
            var t = n.device.ipad || n.device.iphone ? "orientationchange" : "resize";
            $(window).trigger(t)
        },
        setFooter: function(e) {
            var t = $("#a-footer");
            if (t.data("float")) return !1;
            var i = t.attr("style");
            if (t.css("margin-top", ""), 0 < t.length && t[0].offsetTop + t.outerHeight() < _bind.window._height)
                if (_bind.fn.isEditBlock()) {
                    var a = 0 === t.outerHeight() ? 100 : t.outerHeight();
                    if ((n = _bind.window._height - t.offset().top - a - 34) < 0) return !1;
                    t.css("marginTop", n)
                } else {
                    var n;
                    if ((n = _bind.window._height - t.offset().top - t.outerHeight()) < 0) return !1;
                    t.css("marginTop", n)
                }
            else !e && _bind.fn.isEditBlock() && t.attr("style", i)
        },
        nowDevice: function() {
            return n.window._width < n.device.spSize ? "sp" : n.window._width <= n.device.tabletSize ? "tablet" : "pc"
        },
        moveClass: function(e, t) {
            t && t.removeClass("-active"), e && e.addClass("-active")
        },
        calcHeaderHeight: function() {
            var i = $("#a-header").data("float") ? -1 * $("#a-header").outerHeight(!0) : 0;
            return $("[data-bk-id]").each(function() {
                var e = $(this);
                if (e.data("sticky") && 0 == e.parents('[id^="a-side-"]').length && "pc" == n.fn.nowDevice()) {
                    var t = e.outerHeight(!0);
                    i -= t
                }
            }), i
        },
        smoothScroll: function(e, t) {
            e.preventDefault();
            var i = $("#" + decodeURIComponent(t)),
                a = n.fn.calcHeaderHeight();
            n.fn.scrollAnimation(i, a)
        },
        scrollAnimation: function(e, t) {
            if (t) var i = t;
            else i = 0;
            e.velocity("stop").velocity("scroll", {
                offset: i,
                duration: 500
            })
        },
        paddings: function(e) {
            var t = $(e);
            return !(t.length <= 0) && {
                top: parseInt(t.css("paddingTop").replace("px", ""), 10),
                right: parseInt(t.css("paddingRight").replace("px", ""), 10),
                bottom: parseInt(t.css("paddingBottom").replace("px", ""), 10),
                left: parseInt(t.css("paddingLeft").replace("px", ""), 10)
            }
        },
        margins: function(e) {
            var t = $(e);
            return !(t.length <= 0) && {
                top: parseInt(t.css("marginTop").replace("px", ""), 10),
                right: parseInt(t.css("marginRight").replace("px", ""), 10),
                bottom: parseInt(t.css("marginBottom").replace("px", ""), 10),
                left: parseInt(t.css("marginLeft").replace("px", ""), 10)
            }
        },
        documentGetFullscreenElement: function(e) {
            return e.fullscreenElement || e.webkitFullscreenElement || e.webkitCurrentFullscreenElement || e.mozFullScreenElement || e.msFullscreenElement || null
        },
        relative2absolute: function(e) {
            var t = location.origin;
            if (0 == e.indexOf("index.html")) return t + e;
            if (e.indexOf("index.html") < 0) return e;
            var i = e.split("index.html"),
                a = location.pathname.split("index.html");
            return a.splice(a.length - i.length), t + a.join("index.html") + "/" + i[i.length - 1]
        },
        getParentBlock: function(e) {
            if ($elem = $(e), 0 == $elem.length) return null;
            for (var t = $elem.parent();;) {
                if (0 == t.length) return null;
                if (t.hasClass("b-plain") || t.hasClass("b-float") || t.hasClass("b-both_diff") || t.hasClass("b-album") || t.hasClass("b-tab") || t.hasClass("b-accordion") || t.hasClass("b-headlines") || t.hasClass("b-megamenu")) return t;
                if ("body" == t[0].tagName.toLowerCase()) return null;
                t = t.parent()
            }
        },
        parseInt: function(e) {
            return this.isEmpty(e) ? 0 : parseInt(e, 10)
        },
        replaceString: function(e, t, i, a) {
            return e.slice(0, t) + a + e.slice(i)
        },
        insertString: function(e, t, i) {
            return e.slice(0, t) + i + e.slice(t)
        },
        checkWebP: function(t) {
            var e = new Image;
            e.onload = function(e) {
                n.def.supportedWebP = !0, t && t(e)
            }, e.onerror = function(e) {
                n.def.supportedWebP = !1, t && t(e)
            }, e.src = "data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA="
        }
    }
}(_bind),
function(w) {
    w.loader = {
        onInit: function() {
            var s = {},
                a = {},
                n = {
                    blog: !1,
                    other: !1,
                    preset: !1
                },
                i = {
                    sticky: !1,
                    blockAnimation: !1
                },
                e = document.body,
                t = $(e),
                o = this,
                r = window.navigator.userAgent;
            if (/Android/.test(r) && /Linux/.test(r) && !/Chrome/.test(r)) {
                var l = $("<div />").attr("id", "isAndroidBrowser").addClass("js-android_browser"),
                    d = $("<h2 />").html("ご注意ください。"),
                    c = "intent://" + location.hostname + "#Intent;scheme=" + location.protocol + ";action=android.intent.action.VIEW;package=com.android.chrome;end",
                    h = $("<a />").attr("href", c).html("Google Chrome"),
                    p = $("<p />").html("現在お使いのAndroid標準ブラウザは、Google社のサポートが終了しており脆弱性が存在するため、動作保証外です。<br>正しく表示されないページがあります。<br>");
                p.append(h), p.append("でのご利用を推奨しております。"), l.append(d), l.append(p), $("body").prepend(l)
            }
            var f = document.querySelectorAll("img[data-src]");
            if ("undefined" != typeof IntersectionObserver && 0 < f.length) {
                var g = new IntersectionObserver(function(e, a) {
                    e.forEach(function(e) {
                        if (e.isIntersecting) {
                            var t, i = e.target;
                            (t = i.getAttribute("data-src")) && (i.src = t, i.onload = function() {
                                i.removeAttribute("data-src")
                            }), a.unobserve(i)
                        }
                    })
                }, {
                    rootMargin: "100px 0px"
                });
                f.forEach(function(e) {
                    g.observe(e)
                })
            } else 0 < f.length && f.forEach(function(e) {
                var t = e.getAttribute("data-src");
                t && (e.src = t, e.removeAttribute("data-src"))
            });
            if (!_bind.fn.isEmpty(window.css_list)) {
                var u = window.css_list.length;
                _.each(window.css_list, function(e) {
                    var t = "wp-content/themes/BiND%20for%20WordPress/index.html"; - 1 != document.getElementById("page-css").href.indexOf(t) && -1 == e.indexOf("module.bindsite.jp") && (e = document.baseURI + t + e), w.loader.loadCSS(e, function() {
                        0 == --u && $(window).on("load", function() {
                            w.fn.heightRefresh()
                        })
                    })
                })
            }

            function m(e) {
                var t = $(e);
                if (t.data("float-contents") ? o.loadManager(e, "floatContents", !0) : t.hasClass("b-tab") ? o.loadManager(e, "tab") : t.hasClass("b-accordion") ? o.loadManager(e, "accordion") : t.hasClass("b-megamenu") && o.loadManager(e, "megaMenu"), t.hasClass("-js-bindZoom") && o.loadManager(e, "photoAlbum"), (t.hasClass("init-block_animation") || t.hasClass("init-sp-block_animation")) && (i.blockAnimation || (o.loadManager(null, "blockAnimation"), i.blockAnimation = !0)), t.data("sticky") && !w.fn.isEditBlock()) {
                    if (i.sticky) return;
                    o.loadManager(e, "blockSticky"), i.sticky = !0
                }
                t.data("follow-blocks") && !w.fn.isEditBlock() ? o.loadManager(e, "followBlocks") : t.data("sp-follow-blocks") && !w.fn.isEditBlock() && o.loadManager(e, "followBlocks"), (t.hasClass("b-album") || t.hasClass("b-headlines")) && o.loadManager(e, "heightColumnController"), t.find("SPAN,A,DIV,AREA,IFRAME").each(function() {
                    var e = this,
                        t = $(e),
                        i = e.className; - 1 != i.indexOf("js-link_scroller") && o.loadManager(e, "smoothScroll"), -1 != i.indexOf("c-photo_mouseover") && o.loadManager(e, "photoComment"), -1 != i.indexOf("js-tracking") && o.loadManager(e, "tracking"), -1 != i.indexOf("js-sc-form") && o.loadManager(e, "smoothContact"), t.data("expired") && o.loadManager(e, "blogNewIcon"), t.hasClass("js-press") && t.hasClass("-index") && o.loadManager(e, "pressIndex"), t.hasClass("js-press") && t.hasClass("‒yearmonth") && o.loadManager(e, "pressYMArchive"), t.hasClass("bd-press-sns") && o.loadManager(e, "pressSNS")
                })
            }

            function v(i) {
                $(i).find("SPAN,A,DIV,AREA,IMG").each(function() {
                    var e = this,
                        t = e.className; - 1 != t.indexOf("js-slide") ? function(e, t) {
                        var i = e.className.split(" "),
                            a = i[1].split("s-slide-")[1].split("_"),
                            n = a[0],
                            s = a[1],
                            o = {
                                el: e,
                                mode: s,
                                slide: {
                                    width: parseInt(e.getAttribute("data-width"), 10),
                                    height: parseInt(e.getAttribute("data-height"), 10),
                                    spWidth: parseInt(e.getAttribute("data-sp-width"), 10),
                                    spHeight: parseInt(e.getAttribute("data-sp-height"), 10),
                                    imagewidth: parseInt(e.getAttribute("data-imagewidth"), 10),
                                    imageheight: parseInt(e.getAttribute("data-imageheight"), 10)
                                },
                                interval: parseInt(e.getAttribute("data-interval") || 6500),
                                duration: parseInt(e.getAttribute("data-duration") || 2e3),
                                autost: -1 != i.indexOf("s-slide-auto"),
                                loop: -1 != i.indexOf("s-slide-loop"),
                                size_limit: -1 != i.indexOf("s-slide-size_limit"),
                                fixed_height: -1 != i.indexOf("s-slide-fixed_height"),
                                nav_type: e.getAttribute("data-nav-type") || "",
                                nav_color: e.getAttribute("data-nav-color") || "",
                                dir_type: e.getAttribute("data-dir-type") || "",
                                dir_color: e.getAttribute("data-dir-color") || "",
                                disp_comment: e.getAttribute("data-disp-comment") || "",
                                pcHide: $(t).hasClass("is-pc-hide"),
                                spHide: $(t).hasClass("is-sp-hide")
                            };
                        b(w.def.urlPlugins + "slide/" + n + "/engine.js", "slide", n, o), b(w.def.urlPlugins + "slide/" + n + "/style.css")
                    }(e, i) : -1 != t.indexOf("js-sync") ? function(e) {
                        var t = null;
                        w.syncLoad = !1, "SPAN" != e.tagName || n.blog || (t = -1 < e.className.indexOf("-blog -main01") || -1 < e.className.indexOf("-blog -side01"), n.blog = !0);
                        t && !n.other && (b(w.def.urlSync + "_modules/js/swfaddress.js", "sync", null, null), n.other = !0);
                        n.preset || (b(w.def.urlSync + "_modules/css/sync-loader.css", "sync", null, null), b(w.def.urlSync + "_modules/js/sync-loader.js", "sync", null, null), n.preset = !0)
                    }(e) : -1 != t.indexOf("js-motion") ? function(e) {
                        var t = jQuery(e).children("ul");
                        if (w.fn.isEmpty(t)) return;
                        if (!t.hasClass("m-motion")) return;
                        var i = t.get(0).className.split(" "),
                            a = 2 < i.length ? i[2].substr(1) : "",
                            n = 3 < i.length ? i[3] : "";
                        w.fn.isEmpty(n) || (n = n.substr(1));
                        var s = {
                            el: t.get(0),
                            mode: n
                        };
                        b(w.def.urlPlugins + "menu/" + a + "/engine.js", "menu", a, s), b(w.def.urlPlugins + "menu/" + a + "/style.css")
                    }(e) : -1 != t.indexOf("bind_cart") ? document.getElementsByTagName("body")[0].getAttribute("data-oem") ? (b(w.def.urlCartOem + "js/serialize.js", "sync", null, null), b(w.def.urlCartOem + "fx.js", "sync", null, null)) : (b(w.def.urlCart + "js/serialize.js", "sync", null, null), b(w.def.urlCart + "fx.js", "sync", null, null)) : -1 != t.indexOf("js-other") ? function(e) {
                        var t = e.className.split(" ")[1].split("_"),
                            i = t[0],
                            a = t[1],
                            n = {
                                el: e,
                                mode: a
                            };
                        b(w.def.urlPlugins + "other/" + i + "/engine.js", "other", i, n), b(w.def.urlPlugins + "other/" + i + "/style.css")
                    }(e) : $(e).data("clickable-map") ? function(e) {
                        $(e).rwdImageMaps()
                    }(e) : e.getAttribute("data-plugin") && function(e) {
                        var t = e.getAttribute("data-libs");
                        if (w.fn.isEmpty(t)) return;
                        var i = e.getAttribute("data-plugin");
                        t = (t = decodeURIComponent(t)).split(","), t = _.groupBy(t, function(e) {
                            var t = "other";
                            return -1 != e.indexOf(".js") && (t = "js"), t
                        }), w.fn.isEmpty(t.js) || (w.fn.isEmpty(a[i]) && (a[i] = []), a[i] = a[i].concat(t.js));
                        w.fn.isEmpty(t.other) || _.each(t.other, function(e) {
                            b(e)
                        });
                        e.removeAttribute("data-libs")
                    }(e)
                })
            }

            function b(e, t, i, a) {
                var n = null;
                w.fn.isEmpty(a) ? s[e] = {} : (w.fn.isEmpty(s[e]) ? ((n = {
                    kind: "",
                    name: "",
                    target: []
                }).kind = t, n.name = i) : n = s[e], n.target && (n.target[n.target.length] = a)), s[e] = n
            }
            b(w.def.urlModule + "bindicon/style.css"), o.loadManager(null, "spGlobalNavigation"), t.data("view-pc-button") && o.loadManager(null, "viewPcSite"), w.press.init(), window.addEventListener("message", function(a) {
                    -1 < a.origin.indexOf("//smoothcontact.jp") && t.find("iframe.js-sc-form").each(function(e, t) {
                        if (-1 < t.src.indexOf(a.data.uuid)) {
                            if ("scroll" == a.data.type) {
                                var i = w.fn.calcHeaderHeight();
                                return $(t).velocity("stop").velocity("scroll", {
                                    offset: i,
                                    duration: 10
                                }), "undefined" != typeof dataLayer ? "undefined" != typeof gtag ? gtag("event", "page_view", {
                                    page_title: a.data.title,
                                    page_location: location.href,
                                    page_path: "/smoothcontact/" + a.data.uuid
                                }) : void 0 !== dataLayer[0] && void 0 !== dataLayer[0].event && 0 <= dataLayer[0].event.indexOf("gtm") && (dataLayer = dataLayer || []).push({
                                    trackPageview: "/smoothcontact/" + a.data.uuid,
                                    title: a.data.title,
                                    event: "loadready"
                                }) : "undefined" != typeof ga && (ga("set", "page", "/smoothcontact/" + a.data.uuid), ga("send", "pageview")), !1
                            }
                            if (1 == $(t).data("auto-resize") && "resize" == a.data.type && !isNaN(parseFloat(a.data.height))) return $(t).data("height", a.data.height).data("sp-height", a.data.height), w.fn.heightRefresh(), !1
                        }
                    })
                }),
                function t(e) {
                    if (w.fn.isEmpty(e)) return;
                    "string" == typeof e.className && -1 < e.className.indexOf("w-base") && (i = e, o.loadManager(i, "widget"));
                    var i;
                    _.each(e.childNodes, function(e) {
                        w.fn.isEmpty(e) || ("DIV" == e.nodeName && (w.fn.isEmpty(e.getAttribute("data-bk-id")) ? "js-globalNavigation" === e.id && (v(e), m(e)) : (v(e), m(e))), e.hasChildNodes() && (t(e), "bind_cart" === e.className && v(e)))
                    })
                }(e), $("div.bg-window,#a-header,#a-billboard,#a-site_contents,#a-main,#a-side-a,#a-side-b,#a-footer,#a-ghost_header").each(function() {
                    var e = $(this);
                    e.hasClass("-bg-video") && o.loadManager(e, "bgMovie")
                }), t.data("fontplus") && $.ajax({
                    type: "GET",
                    url: "https://module.bindsite.jp/type-fonts/allowed/domain.json",
                    dataType: "jsonp",
                    jsonpCallback: "callback"
                }).done(function(e) {
                    var t = e.domain,
                        i = window.location.hostname;
                    if (-1 < t.indexOf(i)) {
                        var a = ["fontplus", "script", "accessor", "webfont-pub.weblife.me"];
                        a = w.device.sf ? a.sort(function() {
                            return -1
                        }) : a.reverse(), src = window.location.protocol + "//" + a.join("index.html") + ".js?gBaf4X~siMM%3D&aa=1", o.loadJS(src, function() {
                            FONTPLUS.start()
                        })
                    }
                }).fail(function(e) {}), 0 < t.find("div.-height100").length && o.loadManager(t.find("div.-height100"), "height100"), 0 < t.find("div.-sp-height100").length && o.loadManager(t.find("div.-sp-height100"), "height100Sp"), 0 < $("[data-float]").length && o.loadManager($("[data-float]"), "fixedController"), 0 < $("#a-ghost_header").length && o.loadManager($("#a-ghost_header"), "ghostHeader"), 0 < $("[data-layout-type]").length && o.loadManager($("[data-layout-type]"), "sideFixedColumn"), w.fn.setFooter(!0), w.slide.fn.smoothScroll(), _.each(s, function(t, e) {
                    String.prototype.endsWith || (String.prototype.endsWith = function(e, t) {
                        var i = this.toString();
                        ("number" != typeof t || !isFinite(t) || Math.floor(t) !== t || t > i.length) && (t = i.length), t -= e.length;
                        var a = i.lastIndexOf(e, t);
                        return -1 !== a && a === t
                    }), e.endsWith(".js") ? w.loader.loadJS(e, function() {
                        w.fn.isEmpty(t) || _.each(t.target, function(e) {
                            w[t.kind][t.name].render(e)
                        })
                    }) : e.endsWith(".css") && w.loader.loadCSS(e)
                }), _.each(a, function(e, t) {
                    e = _.uniq(e), w.loader.asyncLoadJS(e, function() {
                        _.delay(function() {
                            w.fn.heightRefresh(), w.fn.setFooter()
                        }, 500)
                    })
                })
        },
        loadManager: function(e, t, i) {
            var a = w.base[t];
            a.target = e;
            var n = $.extend(!0, {}, a);
            if (n.init(), void 0 !== n.resize || i) {
                var s = w.device.ipad || w.device.iphone ? "orientationchange" : "resize";
                $(window).on(s, _.throttle(function() {
                    n.resize(), w.fn.setFooter(!0)
                }, w.def.resizeTime))
            }
        },
        loadJS: function(e, t) {
            var i = !1,
                a = document.createElement("script");
            a.type = "text/javascript", a.src = e, a.onload = a.onreadystatechange = function() {
                i || this.readyState && "loaded" != this.readyState && "complete" != this.readyState || (i = !0, t && t())
            };
            var n = document.getElementsByTagName("script")[0];
            n.parentNode.insertBefore(a, n)
        },
        loadCSS: function(e, t) {
            var i = document.getElementsByTagName("link")[0],
                a = document.createElement("link");
            a.rel = "stylesheet", a.type = "text/css", a.href = e, i.parentNode.appendChild(a), void 0 !== t && $(a).ready(function() {
                t()
            })
        },
        asyncLoadJS: function(e, t) {
            var i = (new $.Deferred).resolve();
            _.each(e, function(e) {
                i = i.then(function(n) {
                    return function() {
                        var e = new $.Deferred;
                        e.promise();
                        var t = !1,
                            i = document.createElement("script");
                        i.type = "text/javascript", i.src = n, i.async = !0, i.onload = i.onreadystatechange = function() {
                            t || this.readyState && "loaded" != this.readyState && "complete" != this.readyState || (t = !0, e.resolve())
                        };
                        var a = document.getElementsByTagName("script")[0];
                        return a.parentNode.insertBefore(i, a), e
                    }
                }(e))
            }), i.then(t)
        }
    }, w.slide.fn = {
        getSize: function(e, t) {
            var i = t.width(),
                a = t.height(),
                n = e.width,
                s = e.height,
                o = a / i;
            return n && s && (o = s / n), {
                width: i,
                height: i * o,
                aspect: o
            }
        },
        smoothScroll: function() {
            $("body").on("click", ".box_widthFull .js-link_scroller", function(e) {
                var t = $(this),
                    i = t.attr("href"),
                    a = !1,
                    n = i.split("index.html"),
                    s = _bind.base.smoothScroll._replaceDots(n).toString(),
                    o = document.location.pathname.split("index.html"),
                    r = _bind.base.smoothScroll._replaceDots(o).toString();
                if ("/" === r.substr(0, 1) && (r = r.substr(1)), s.toString() === r.toString() && (a = !0), "#" === i && t.hasClass("c-link_top") || "" === i && t.hasClass("c-link_top") || "javascript:void(0);" === i && t.hasClass("c-link_top")) w.fn.scrollAnimation($("html,body"), 0);
                else if (i.match("#") || i.match("#") && a) {
                    var l = i.split("#").pop();
                    try {
                        0 < $("#" + l).length && w.fn.smoothScroll(e, l)
                    } catch (e) {}
                }
            })
        }
    }
}(_bind),
function(j) {
    function M() {
        "undefined" != typeof FONTPLUS && FONTPLUS.reload(), $(".b-tab").each(function() {
            j.loader.loadManager(this, "tab")
        }), $(".b-accordion").each(function() {
            j.loader.loadManager(this, "accordion")
        }), $(".bd-press-sns").each(function() {
            j.loader.loadManager(this, "pressSNS")
        }), $(".js-link_scroller").each(function() {
            j.loader.loadManager(this, "smoothScroll")
        }), $(".c-blog-pagination").each(function() {
            j.loader.loadManager(this, "pressPagination")
        }), 0 < $(".js-sync").length && "undefined" != typeof sync && sync.init(), _.delay(function() {
            j.fn.heightRefresh(), j.fn.setFooter()
        }, 500)
    }

    function E(e, t, i) {
        var a = e.html(),
            n = a; - 1 < n.indexOf("[%list_name%]") && (j.fn.isEmpty(t) || (n = n.replace("[%list_name%]", t)), j.fn.isEmpty(i) || (n = n.replace("[%list_name%]", i)), -1 < n.indexOf("[%list_name%]") && (n = n.replace("[%list_name%]", ""))), a != n && e.html(n)
    }

    function p(e, t) {
        var i = e;
        if (j.press.isPublishLocal)
            if (j.fn.isEmpty(t)) i = j.def.urlModule.split("_module/index.html")[0] + "_press" + e;
            else {
                var a = t[0],
                    n = e.substr(0, e.lastIndexOf("index.html") + 1),
                    s = e.substr(e.lastIndexOf("index.html") + 1);
                s = "thumb" + a.width + "x" + a.height + "-" + s, i = j.def.urlModule.split("_module/index.html")[0] + "_press" + n + s
            }
        else if (j.fn.isEmpty(t)) i = j.def.pressUrl + e;
        else {
            a = t[0];
            i = j.def.pressUrl + "thumb" + e + "?w=" + a.width + "&h=" + a.height
        }
        return i
    }

    function f(e, s) {
        if (j.fn.isEmpty(e)) return e;
        if (!j.press.isPublishLocal) return e;
        var t = $("<div>" + e + "</div>");
        return t.find("img").each(function() {
            var e = $(this),
                t = e.data("blogAimg");
            if (!j.fn.isEmpty(t)) {
                var i = e.attr("src"),
                    a = "/" + s.blog_sid + "/" + s.sid + "/images/" + t + "/";
                if (!j.fn.isEmpty(a) && 0 <= i.indexOf(a)) {
                    var n = i.substr(i.lastIndexOf("index.html") + 1);
                    i = j.def.urlModule.split("_module/index.html")[0] + "_press" + a + n, e.attr("src", i)
                }
            }
        }), t.html()
    }

    function d(e, t, i, a) {
        for (var n = 0;;) {
            var s = a.indexOf(e, n);
            if (-1 == s) break;
            if (-1 == (s = a.indexOf(t, s))) break;
            a = j.fn.insertString(a, s + e.length, i), n = s + t.length + i.length
        }
        return a
    }
    j.press = {
        jsonStore: {},
        postsPerPage: 15,
        listBaseURL: "",
        listTemplate: null,
        targetBase: null,
        thumbSetting: {},
        isPublishLocal: !1,
        localCachedJson: {},
        listBaseLocal: {},
        init: function() {
            var e = $(document.body),
                t = e.data("press-role");
            if (j.press.isPublishLocal = "1" == e.data("press-local"), 0 == j.fn.isEmpty(t)) {
                var i = e.data("press-id"),
                    a = $("#a-billboard"),
                    n = $("#a-main");
                a.css("opacity", 0), n.css("opacity", 0);
                var s = [],
                    o = [],
                    r = 2;
                a.imagesLoaded(function() {
                    a.find("img").each(function() {
                        j.press.isPublishLocal ? s.push({
                            width: this.naturalWidth,
                            height: this.naturalHeight
                        }) : s.push({
                            width: this.width,
                            height: this.height
                        })
                    }), 0 == --r && j.press.render(t, i, e, a, n, s, o)
                }), n.imagesLoaded(function() {
                    n.find("img").each(function() {
                        o.push(j.press.calcImageAspect(this))
                    }), 0 == --r && j.press.render(t, i, e, a, n, s, o)
                });
                var l = location.href;
                $(".c-menu").find("a").each(function(e, t) {
                    var i = $(t);
                    l != $("<a>").attr("href", i.attr("href")).get(0).href || i.hasClass("c-current") ? l != $("<a>").attr("href", i.attr("href")).get(0).href && i.hasClass("c-current") && i.removeClass("c-current") : i.addClass("c-current")
                })
            }
        },
        goPage: function(e) {
            var o = this.targetBase;
            o.css("opacity", 0);

            function t(e) {
                if (o.empty(), e.posts.forEach(function(e) {
                        var t = j.press.formatData(e, "", r);
                        t.lead = j.press.deleteParagraphStyle(t.lead), t.article = j.press.deleteParagraphStyle(t.article), o.append(l(t)), j.press.replaceEditorTag(o)
                    }), o.hasClass("g-column")) {
                    for (var t = o[0].className.split(" "), n = 1, i = 0, a = t.length; i < a; i++) {
                        var s = t[i];
                        if (0 == s.indexOf("-col")) {
                            n = parseInt(s.substring(4), 10);
                            break
                        }
                    }
                    o.children(".column").each(function(e, t) {
                        var i = $(t),
                            a = e % n + 1;
                        1 < a && i.hasClass("-column1") && i.removeClass("-column1"), i.addClass("-column" + a), a == n && i.addClass("-column-lasts")
                    })
                }
                o.velocity({
                    opacity: 1
                }, 600, "easeOutExpo"), j.fn.scrollAnimation($("#page"), 0), o.imagesLoaded(function() {
                    j.fn.heightRefresh(), j.fn.setFooter()
                }), "undefined" != typeof FONTPLUS && FONTPLUS.reload()
            }
            var r = this.thumbSetting,
                l = this.listTemplate;
            if (j.press.isPublishLocal) {
                var i = _.cloneDeep(j.press.localCachedJson),
                    a = j.press.getLocalPosts(i.posts, j.press.listBaseLocal.categories, j.press.listBaseLocal.tags, j.press.listBaseLocal.order, j.press.listBaseLocal.limitNum * (e - 1), j.press.listBaseLocal.limitNum);
                return i.posts = a.posts, void t(i)
            }
            var n = this.listBaseURL + "&limit=" + this.postsPerPage + "&offset=" + this.postsPerPage * (e - 1);
            this.loadJson(n, function(e) {
                e.success && t(e)
            })
        },
        render: function(e, l, t, h, p, d, f) {
            var i = "-blog-" + e,
                a = p.find("div:contains('[%')");
            if ($.each(a, function() {
                    var e = j.fn.getParentBlock(this);
                    !j.fn.isEmpty(e) && 0 < e.length && !e.hasClass(i) && e.addClass(i)
                }), "article" == e) {
                var c = t.data("press-article"),
                    n = j.def.pressUrl + "posts?b=" + l + "&a=" + c;
                this.isPublishLocal && (n = this.getLocalURL(l));
                var g = this.createTemplate(h, !1, !1, !0),
                    u = this.createTemplate(p, !1, !1, !0);
                this.loadJson(n, function(e) {
                    if (e.success && 0 < e.posts.length) {
                        var t = e.posts[0];
                        if (j.press.isPublishLocal && null == (t = _.find(e.posts, function(e) {
                                return e.sid == c && e.blog_sid == l
                            }))) return;
                        if (0 < $("#spNavigationTrigger").length) {
                            var i, a = $._data($("#spNavigationTrigger").get(0), "events");
                            a && "click" in a && (i = a.click[0].handler)
                        }
                        var n = j.press.formatData(t, "", d),
                            s = j.press.formatData(t, "", f),
                            o = !!n.lead && !/^<(p|h[1-4]).*/.test(n.lead) || !!n.article && !/^<(p|h[1-4]).*/.test(n.article),
                            r = 0 < e.blogs.length && e.blogs[0].isParagraph;
                        !o && r || (g = j.press.createTemplate(h, !1, !1, !1), u = j.press.createTemplate(p, !1, !1, !1), r || o || (n.lead = j.press.deleteParagraphStyle(n.lead), n.article = j.press.deleteParagraphStyle(n.article), s.lead = j.press.deleteParagraphStyle(s.lead), s.article = j.press.deleteParagraphStyle(s.article))), h.html(g(n)), p.html(u(s)), j.press.replaceEditorTag(h), j.press.replaceEditorTag(p), h.velocity({
                            opacity: 1
                        }, 600, "easeOutExpo"), p.velocity({
                            opacity: 1
                        }, 600, "easeOutExpo"), $(".c-breadcrumb>em").text(t.title), M(), !a || "click" in a || $("#spNavigationTrigger").on("click", i)
                    }
                })
            } else if ("list" == e) {
                var s = t.data("press-category"),
                    o = t.data("press-tag"),
                    r = t.data("press-calendar"),
                    m = (n = j.def.pressUrl + "posts?b=" + l, "");
                if (j.fn.isEmpty(s) || (n += "&c=" + s, m = "ja" === document.documentElement.lang ? "カテゴリー：" + s : s), j.fn.isEmpty(o) || (n += "&t=" + o, m = "ja" === document.documentElement.lang ? "タグ：" + o : o), j.fn.isEmpty(r) || (n += "&y=" + r.split("-")[0] + "&m=" + r.split("-")[1]), 0 < $("#spNavigationTrigger").length) {
                    var v, b = $._data($("#spNavigationTrigger").get(0), "events");
                    b && "click" in b && (v = b.click[0].handler)
                }
                E(h, m, s), E(p, m, s);
                var w = null,
                    y = null,
                    x = p.find('*:contains("[%article_list_start%]")');
                0 < x.length && (w = $(x[x.length - 1])), 0 < (x = p.find('*:contains("[%article_list_end%]")')).length && (y = $(x[x.length - 1]));
                var C = null,
                    k = w.parent()[0].tagName.toLowerCase();
                "th" == k ? (C = w.closest("tbody"), w.closest("tr").remove(), y.closest("tr").remove()) : "tr" == k ? (C = w.closest("tbody"), y.closest("tr").remove()) : (C = w.closest(".column"), 0 == $.contains(C[0], y[0]) && (C = C.parent(), y.closest(".column").remove()));
                var S = this.createTemplate(C, !0, !1, !1);
                C.empty(), this.listBaseURL = n, this.listTemplate = S, this.targetBase = C, this.thumbSetting = f, n += "&limit=" + this.postsPerPage, this.isPublishLocal && (n = this.getLocalURL(l), this.listBaseURL = n, this.listBaseLocal = {
                    categories: [s],
                    tags: [o],
                    order: "",
                    limitNum: this.postsPerPage
                }), this.loadJson(n, function(e) {
                    if (e.success) {
                        if (j.press.isPublishLocal) {
                            j.press.localCachedJson = _.cloneDeep(e);
                            var t = j.press.getLocalPosts(e.posts, j.press.listBaseLocal.categories, j.press.listBaseLocal.tags, j.press.listBaseLocal.order, 0, j.press.listBaseLocal.limitNum);
                            e.posts = t.posts, e.total = t.total
                        }
                        if (e.posts.forEach(function(e) {
                                var t = j.press.formatData(e, "", f);
                                t.lead = j.press.deleteParagraphStyle(t.lead), t.article = j.press.deleteParagraphStyle(t.article), C.append(S(t)), j.press.replaceEditorTag(C)
                            }), C.hasClass("g-column")) {
                            for (var i = C[0].className.split(" "), n = 1, a = 0, s = i.length; a < s; a++) {
                                var o = i[a];
                                if (0 == o.indexOf("-col")) {
                                    n = parseInt(o.substring(4), 10);
                                    break
                                }
                            }
                            C.children(".column").each(function(e, t) {
                                var i = $(t),
                                    a = e % n + 1;
                                1 < a && i.hasClass("-column1") && i.removeClass("-column1"), i.addClass("-column" + a), a == n && i.addClass("-column-lasts")
                            })
                        }
                        "" == m && (m = e.blogs[0].name), $(".c-breadcrumb>em").text(m), $(".c-breadcrumb li").each(function() {
                            var e = $(this);
                            "template.list" == e.text() && e.text(m)
                        });
                        var r = $("*:contains([%navi-pagenation%])");
                        if (0 < r.length) {
                            var l = $(r[r.length - 1]),
                                d = l.html(),
                                c = "";
                            c = 0 < e.total ? d.replace("[%navi-pagenation%]", '<nav class="c-blog-pagination" data-total="' + e.total + '"></nav>') : d.replace("[%navi-pagenation%]", ""), d != c && l.html(c)
                        }
                        0 == e.posts.length && ("ja" === document.documentElement.lang ? C.append('<p class="c-blog-list-norow">このカテゴリーの記事はありません。</p>') : C.append('<p class="c-blog-list-norow">There is no article in this category.</p>')), h.velocity({
                            opacity: 1
                        }, 600, "easeOutExpo"), p.velocity({
                            opacity: 1
                        }, 600, "easeOutExpo"), M(), !b || "click" in b || $("#spNavigationTrigger").on("click", v)
                    }
                })
            }
        },
        loadJson: function(a, n) {
            var s = this;
            _.has(s.jsonStore, a) ? n(s.jsonStore[a]) : $.ajax({
                type: "GET",
                scriptCharset: "utf-8",
                dataType: "json",
                cashe: !1,
                url: a
            }).done(function(e, t, i) {
                e.success && (s.jsonStore[a] = e), n(e)
            }).fail(function(e, t, i) {
                console.error(t)
            })
        },
        formatData: function(e, t, i, a, n) {
            var s = e.content,
                o = e.lead;
            j.press.isPublishLocal && (s = f(e.content, e), o = f(e.lead, e));
            var r = {
                title: e.title,
                article: this.formatBiND(s),
                lead: this.formatBiND(o),
                article_date: e.post_date,
                e_thumb: "",
                e_alt: "",
                e_name: "",
                e_profile: ""
            };
            if (!j.fn.isEmpty(e.editor) && 0 < Object.keys(e.editor).length) {
                r.e_thumb = "https://www.gravatar.com/avatar/" + e.editor.thumbMd5, r.e_alt = e.editor.thumbMd5, r.e_name = e.editor.display_name, r.e_profile = e.editor.profile;
                var l = r.e_profile.match(/https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#\u3000-\u30FE\u4E00-\u9FA0\uFF01-\uFFE3]+/g);
                Array.isArray(l) && l.forEach(function(e) {
                    r.e_profile = r.e_profile.replace(e, '<a href="' + e + '" target="_blank">' + e + "</a>")
                }), r.e_profile = r.e_profile.replace(/\r?\n/g, "<br />")
            }
            var d = dayjs(e.post_date, "YYYY/MM/DD HH:mm");
            if (r.article_date_notime = d.format("YYYY/MM/DD"), r.article_date_notime_dot = d.format("YYYY.MM.DD"), r.article_data_notime_dot = d.format("YYYY.MM.DD"), r.article_date_notime_wa = d.format("YYYY年MM月DD日"), r.article_date_notime_e = d.format("DD MMMM YYYY"), j.fn.isEmpty(e.link) ? r.link = t + e.filename : r.link = e.link, r.article_link = r.link, r.image = {
                    url: "",
                    comment: ""
                }, 0 < e.images.length) {
                var c = e.images[0],
                    h = c.url.replace(/\.[^.]*$/, ".webp");
                r.image.url = p(c.url, i), r.image.webpUrl = p(h, i), r.image.comment = c.comment
            }
            return r.images = [], e.images.forEach(function(e) {
                var t = e.url.replace(/\.[^.]*$/, ".webp");
                r.images.push({
                    url: p(e.url, i),
                    webpUrl: p(t, i),
                    comment: e.comment
                })
            }), r.categories = [], e.categories.forEach(function(e) {
                r.categories.push({
                    name: e.name,
                    url_path: e.url_path,
                    url: t + e.url_path + ".html"
                })
            }), r.tags = [], e.tags.forEach(function(e) {
                r.tags.push({
                    name: e.name,
                    url_path: e.url_path,
                    url: t + e.url_path + ".html"
                })
            }), r.dispNew = !!a && d.add(n, "days").isAfter(dayjs()), r.prev_filename = "", r.next_filename = "", e.prev && (r.prev_filename = e.prev.filename), e.next && (r.next_filename = e.next.filename), r
        },
        formatBiND: function(e) {
            if (j.fn.isEmpty(e)) return e;
            var t = e.replace(/<\/div>/g, "</span>").replace(/<div/g, '<span class="smode"');
            t = (t = (t = t.replace(/<strong>/g, '<span class="d-bold">').replace(/<\/strong>/g, "</span>")).replace(/<em>/g, '<span class="d-italic">').replace(/<\/em>/g, "</span>")).replace(/font-size: small;/g, ""), Array.isArray(t.match(/^<(p|h[1-4]).*/)) && 0 < $(t.replace(/\r?\n/g, "")).length && (t = $(t.replace(/\r?\n/g, "")).get().map(function(e) {
                var t = $(e);
                switch (t.prop("tagName")) {
                    case "H1":
                        t.addClass("c-page_title");
                        break;
                    case "H2":
                        t.addClass("c-title");
                        break;
                    case "H3":
                        t.addClass("c-large_headline");
                        break;
                    case "H4":
                        t.addClass("c-small_headline");
                        break;
                    case "P":
                        t.attr("class") || t.addClass("c-body"), t.hasClass("lead") && t.removeClass("lead").addClass("c-lead"), t.hasClass("quote") && t.removeClass("quote").addClass("c-blockquote"), t.hasClass("kakomi") && t.removeClass("kakomi").addClass("c-enclosure"), t.hasClass("note") && t.removeClass("note").addClass("c-note"), t.hasClass("address") && t.removeClass("address").addClass("c-credit"), t.hasClass("none") && t.removeClass("none").addClass("c-none")
                }
                return "text-align: left;" == t.attr("style") && t.removeAttr("style").addClass("c-left"), "text-align: center;" == t.attr("style") && t.removeAttr("style").addClass("c-center"), "text-align: right;" == t.attr("style") && t.removeAttr("style").addClass("c-right"), t.prop("outerHTML")
            }).filter(function(e) {
                return !!e
            }).join(""));
            var i = $("<div>" + t + "</div>");
            return i.find("span").each(function() {
                var e = $(this),
                    t = e.css("font-size");
                j.fn.isEmpty(t) || (e.css("font-size", ""), "x-large" == t ? e.addClass("d-largest_font") : "large" == t ? e.addClass("d-larger_font") : "medium" == t ? e.addClass("d-large_font") : "x-small" == t ? e.addClass("d-small_font") : "xx-small" == t && e.addClass("d-smallest_font"));
                var i = e.css("text-align");
                j.fn.isEmpty(i) || (e.css("text-align", ""), "center" == i ? e.addClass("c-center") : "right" == i ? e.addClass("c-right") : "left" == i && e.addClass("c-left"));
                var a = e.css("text-decoration");
                j.fn.isEmpty(a) || (e.css("text-decoration", ""), "underline" == a ? e.addClass("d-underline") : "line-through" == a && e.addClass("d-negative_line"))
            }), i.html()
        },
        createTemplate: function(e, t, i, a) {
            t && $("img", e).removeAttr("id").each(function() {
                if ("LinkIcon" !== $(this).attr("alt")) {
                    this.src = "";
                    var e = this.parentNode,
                        t = this.previousElementSibling,
                        i = document.createTextNode('[!% if (image.url!="") { %]');
                    "PICTURE" == e.tagName && "SOURCE" == t.tagName ? (t.srcset = "", e.insertBefore(i, e.firstChild)) : e.insertBefore(i, this);
                    var a = document.createTextNode("[!% } %]"),
                        n = this.nextSibling;
                    null == n ? e.appendChild(a) : e.insertBefore(a, n)
                }
            });
            $("a", e).each(function() {
                var e = this.getAttribute("href"),
                    t = null,
                    i = null;
                if ("[%link_prev%]" == e) {
                    t = "[%prev_filename%]";
                    i = new Text('[!% if (prev_filename!="") { %]')
                } else if ("[%link_next%]" == e) {
                    t = "[%next_filename%]";
                    i = new Text('[!% if (next_filename!="") { %]')
                } else "#" == e && this.setAttribute("href", "[%link%]");
                if (null != t) {
                    this.setAttribute("href", t);
                    var a = this.parentNode;
                    a.insertBefore(i, this);
                    var n = new Text("[!% } %]"),
                        s = this.nextSibling;
                    null == s ? a.append(n) : a.insertBefore(n, s)
                }
            });
            var m = e.html();
            m = d("<img ", 'src=""', "[%image.url%]", m = (m = function(e) {
                var t = "[%list_start%]",
                    i = "[%list_end%]",
                    a = t.length,
                    n = i.length,
                    s = "\n[!% _.each(images, function(image){ %]",
                    o = "\n[!% }); %]",
                    r = s.length,
                    l = o.length,
                    d = "<img ".length,
                    c = "<source ",
                    h = c.length,
                    p = 0;
                for (;;) {
                    var f = e.indexOf(t, p);
                    if (-1 == f) break;
                    var g = e.indexOf(i, f + a);
                    if (-1 == g) break;
                    e = j.fn.replaceString(e, g, g + n, ""), e = j.fn.insertString(e, g, o), p = g + l;
                    var u = (e = j.fn.replaceString(e, f, f + a, "")).lastIndexOf("\n", f),
                        m = e.lastIndexOf("<br>", f),
                        v = f - u < f - m ? u : m;
                    e = j.fn.insertString(e, v, s), p += r - a;
                    var b = e.indexOf("<img ", f + r);
                    if (-1 < b) {
                        b = e.indexOf('src="', b + d);
                        var w = e.indexOf('"', b + d);
                        e = j.fn.replaceString(e, b + d, w, "[%image.url%]")
                    }
                    var _ = e.indexOf(c, f + r);
                    if (-1 < _) {
                        _ = e.indexOf('srcset="', _ + h);
                        var y = e.indexOf('"', _ + h);
                        e = j.fn.replaceString(e, _ + h, y, "[%image.webpUrl%]")
                    }
                }
                return e = (e = e.replace(t, "")).replace(i, "")
            }(m = function(e, t) {
                e = e.replace("[%new%]", 1 == t ? '[!% if (dispNew) {%]<span class="c-blog-new"/>[!%}%]' : "");
                var i = 0;
                for (;;) {
                    var a = e.indexOf("[%new", i);
                    if (-1 == a) break;
                    var n = e.indexOf("%]", a + 5);
                    if (-1 == n) break;
                    var s = "";
                    if (t) {
                        var o = e.substring(a, n).split(":"),
                            r = 1 < o.length ? o[1] : "New";
                        s = '[!% if (dispNew) {%]<span class="c-blog-new">' + r + "</span>[!%}%]"
                    }
                    e = j.fn.replaceString(e, a, n + 2, s), i = a + s.length
                }
                return e
            }(m = function(e, t) {
                var i = 0;
                for (;;) {
                    var a = e.indexOf("[%title_short_", i);
                    if (-1 == a) break;
                    var n = e.indexOf("%]", a + 14);
                    if (-1 == n) break;
                    var s = e.substring(a + 14, n),
                        o = "[!%=_.truncate(" + (t ? "post." : "") + "title.replace(/<(\"[^\"]*\"|'[^']*'|[^'\">])*>/g,''), {length:" + s + "})%]";
                    e = j.fn.replaceString(e, a, n + 2, o), i = a + o.length
                }
                return e
            }(m = function(e, t) {
                var i = 0;
                for (;;) {
                    var a = e.indexOf("[%article_short_", i);
                    if (-1 == a) break;
                    var n = e.indexOf("%]", a + 16);
                    if (-1 == n) break;
                    var s = e.substring(a + 16, n),
                        o = "[!%=_.truncate(" + (t ? "post." : "") + "article.replace(/<(\"[^\"]*\"|'[^']*'|[^'\">])*>/g,''), {length:" + s + "})%]";
                    e = j.fn.replaceString(e, a, n + 2, o), i = a + o.length
                }
                return e
            }(m, !1), !1), i))).replace("[%comment%]", "[%image.comment%]"));
            var n = (m = d("<source ", 'srcset=""', "[%image.webpUrl%]", m)).replace(/\r?\n/g, "").match(/<(p |h[1-4]).*?\[%(lead|article)%\].*?<\/(p|h[1-4])>/g);
            Array.isArray(n) && a && n.forEach(function(e) {
                var t = e.match(/<(p |h[1-4])(.*?)<\/(p|h[1-4])>/g);
                if (Array.isArray(t)) {
                    var i = "";
                    if (1 == t.length ? i = t[0] : t.forEach(function(e) {
                            Array.isArray(e.match(/\[%(lead|article)%\]/)) && (i = e)
                        }), !j.fn.isEmpty(i)) {
                        var a = $(i),
                            n = a.html(),
                            s = "",
                            o = "",
                            r = /\[%lead%\]/.test(n) ? "[%lead%]" : "[%article%]";
                        a.find("span:contains(" + r + ")").each(function(e, t) {
                            var i = $(t);
                            s = i.attr("class") || "", s += " " + i.parents("span").get().map(function(e) {
                                return $(e).attr("class") || ""
                            }).join(" "), o = i.attr("style") || "", o += i.parents("span").get().map(function(e) {
                                return $(e).attr("style") || ""
                            }).join("")
                        }), s = s.trim(), o = o.trim();
                        var l = j.fn.isEmpty(s) ? "" : ' class="' + s + '"',
                            d = j.fn.isEmpty(o) ? "" : ' style="' + o + '"';
                        if ("[%lead%]" == n || "[%article%]" == n || /^<span.*?>\[%(lead|article)%\]<\/span>$/.test(n)) n = "<div" + l + d + ">" + n.replace(/<span.*?>/, "").replace("</span>", "") + "</div>", m = m.replace(/\r?\n/g, "").replace(i, n);
                        else {
                            var c = "",
                                h = n.match(/^.+?\[%(lead|article)%\]/);
                            if (Array.isArray(h)) {
                                var p = a.clone(),
                                    f = j.fn.isEmpty(l) && j.fn.isEmpty(d) ? "[%" + h[1] + "%]" : "<div" + l + d + '">[%' + h[1] + "%]</div>";
                                p.html(h[0].replace("[%" + h[1] + "%]", "")), c = p.prop("outerHTML") + f
                            }
                            var g = n.match(/\[%(lead|article)%\].+$/);
                            if (Array.isArray(g)) {
                                var u = a.clone();
                                if (u.html(g[0].replace("[%" + g[1] + "%]", "")), j.fn.isEmpty(c)) c = (j.fn.isEmpty(l) && j.fn.isEmpty(d) ? "[%" + g[1] + "%]" : "<div" + l + d + '">[%' + g[1] + "%]</div>") + u.prop("outerHTML");
                                else c += u.prop("outerHTML")
                            }
                            j.fn.isEmpty(c) || (m = m.replace(/\r?\n/g, "").replace(i, c))
                        }
                    }
                }
            });
            var s = m.match(/\[%editor_start%\].*?\[%editor_end%\]/);
            Array.isArray(s) && s.forEach(function(e) {
                var t = e;
                t = (t = (t = (t = (t = (t = t.replace(/<p>/g, "").replace(/<(p |h[1-4]|th|tr|li|br)(.*?)>/g, "").replace(/<\/(p|h[1-4]|th|tr|li)>/g, "")).replace("[%editor_start%]", '<span class="c-blog-editor">')).replace("[%editor_image%]", '<span class="c-blog-editor_thumbnail"><img src="[%e_thumb%]" alt="[%e_alt%]" /></span>')).replace("[%editor_name%]", '<span class="c-blog-editor_name">[%e_name%]</span>')).replace("[%editor_profile%]", '<span class="c-blog-editor_profile">[%e_profile%]</span>')).replace("[%editor_end%]", "</span>"), m = m.replace(e, t)
            });
            var o = (m = (m = (m = (m = (m = (m = m.replace("[%category%]", '[!% _.each(categories, function(cat){ %]<span class="c-blog-category" data-press-category="[%cat.url_path%]"><a href="[%cat.url%]">[%cat.name%]</a></span>[!% }); %]')).replace("[%tags%]", '[!% _.each(tags, function(tag){ %]<span class="c-blog-tag" data-press-tag="[%tag.url_path%]"><a href="[%tag.url%]">[%tag.name%]</a></span>[!% }); %]')).replace("[%link_prev%]", "")).replace("[%link_next%]", "")).replace("[%article_list_start%]", "")).replace("[%article_list_end%]", "")).indexOf("[%article_list_size:");
            if (-1 < o) {
                var r = m.indexOf("%]", o + 20),
                    l = m.substring(o + 20, r);
                j.press.postsPerPage = Number(l), m = j.fn.replaceString(m, o, r + 2, "")
            }
            return m = (m = m.replace(/\[%/g, "[%=")).replace(/\[!%/g, "[%"), _.templateSettings = {
                evaluate: /\[%([\s\S]+?)%\]/g,
                interpolate: /\[%=([\s\S]+?)%\]/g
            }, _.template(m)
        },
        calcImageAspect: function(e) {
            if (0 == e.width && 0 == e.height) return {
                width: 0,
                height: 0
            };
            if (j.press.isPublishLocal) return {
                width: e.naturalWidth,
                height: e.naturalHeight
            };
            var t = e.naturalHeight / e.naturalWidth;
            return {
                width: e.width,
                height: e.width * t
            }
        },
        getLocalURL: function(e) {
            return j.def.urlModule.split("_module/index.html")[0] + "_press/" + e + "/index.json"
        },
        getLocalPosts: function(e, t, i, a, n, s) {
            var o = e;
            0 < _.compact(t).length && (o = _.filter(o, function(e) {
                return _.difference(_.map(e.categories, "name"), t).length != e.categories.length
            })), 0 < _.compact(i).length && (o = _.filter(o, function(e) {
                return _.difference(_.map(e.tags, "name"), i).length != e.tags.length
            })), a && "newer" != a ? "popular" == a ? o = o.sort(function(e, t) {
                if (e.unique_user > t.unique_user) return -1;
                if (e.unique_user < t.unique_user) return 1;
                var i = new Date(e.post_date).getTime(),
                    a = new Date(t.post_date).getTime();
                return a < i ? -1 : i < a ? 1 : 0
            }) : "char" == a && (o = o.sort(function(e, t) {
                return e.title.toLowerCase() < t.title.toLowerCase() ? -1 : e.title.toLowerCase() > t.title.toLowerCase() ? 1 : 0
            })) : o = o.sort(function(e, t) {
                var i = new Date(e.post_date).getTime(),
                    a = new Date(t.post_date).getTime();
                return a < i ? -1 : i < a ? 1 : 0
            });
            var r = o.length;
            return n && -1 < n && (o = o.slice(n)), 0 < s && (o = o.slice(0, s)), {
                posts: o,
                total: r
            }
        },
        replaceEditorTag: function(e) {
            var t = e.find("span.c-blog-editor");
            0 != t.length && t.each(function(e, t) {
                var i = $(t),
                    a = i.children("span.c-blog-editor_name"),
                    n = i.children("span.c-blog-editor_thumbnail"),
                    s = i.children("span.c-blog-editor_profile");
                j.fn.isEmpty(a.text()) && a.remove(), j.fn.isEmpty(n.children("img").attr("src")) && n.remove(), j.fn.isEmpty(s.text()) && s.remove(), j.fn.isEmpty(i.html()) ? i.remove() : i.replaceWith('<div class="c-blog-editor">' + i.html().replace(/span/g, "div") + "</div>")
            })
        },
        deleteParagraphStyle: function(i) {
            if ("string" != typeof i) return "";
            var e = i.match(/<(p |h[1-4]).*?<\/(p|h[1-4])>/g);
            return Array.isArray(e) && e.forEach(function(e) {
                var t = e.replace(/<(p |h[1-4]).*?>/, "").replace(/<\/(p|h[1-4])>/, "") + "<br /> ";
                i = i.replace(e, t)
            }), i
        }
    }
}(_bind),
function(t) {
    $(window).on("resize load orientationchange", function() {
        t.window._width = window.innerWidth, t.window._height = window.innerHeight, "sp" == t.fn.nowDevice() || "tablet" == t.fn.nowDevice() ? t.base.spGlobalNavigation.init() : ($("#spNavigationTrigger").addClass("js-hide"), 0 < $("#js-globalMegaMenu").length ? $("#js-globalMegaMenu").attr("style", "") : $("#js-globalNavigation").attr("style", ""));
        var e = $('.-blog-article iframe[src^="https://www.youtube.com"]');
        0 < e.length && (t.device.mobile && 0 === window.orientation ? (e.css({
            maxWidth: "100%",
            width: $(window).width() - 40 + "px"
        }), e.css({
            height: Math.round(9 * e.width() / 16) + "px"
        })) : t.device.mobile && 90 === window.orientation && (e.css({
            maxWidth: "100%",
            width: $(window).width() - 50 + "px"
        }), e.css({
            height: Math.round(9 * e.width() / 16) + "px"
        })), t.device.mobile || ($(window).width() < 640 ? e.css({
            width: "100%"
        }) : e.css({
            maxWidth: "100%",
            width: "640px"
        }), e.css({
            height: Math.round(9 * e.width() / 16) + "px"
        })))
    })
}(_bind), _bind.fn.checkWebP(function(e) {
    "error" == e.type && $(document.body).removeClass("bd-webp").addClass("bd-no-webp"), _bind.status.getStatus(), _bind.base.popupWindow.init(), _bind.loader.onInit();
    var t = $(document.body).data("page-animation");
    if (t && "none" != t && _bind.base.pageAnimation.init(), _bind.bridge.onInit(), _bind.fn.isEditBlock()) {
        var i = function() {
            void 0 === _bind.blockEdit ? setTimeout(i, 500) : window.dispatchEvent(new Event("resize"))
        };
        i()
    }
    if (location.hash && 0 < $(location.hash).length) {
        var a = location.hash.slice(1),
            n = $("#" + decodeURIComponent(a)),
            s = function(e, t, i) {
                _.delay(function() {
                    if (!(3 < i)) {
                        var e = n.offset();
                        Math.abs(t - e.top) < 5 || (_bind.fn.smoothScroll(new Event("dummy"), a), s(550, e.top, i++))
                    }
                }, e)
            };
        s(200, -1, 0)
    }
});