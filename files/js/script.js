function setProportion(e, t, n, r) {
    var i = getProportion(e, t, n, r);
    e.find(".vid-bg").width(i * t);
    e.find(".vid-bg").height(i * n);
    e.find(".vid-bg video").width(i * t);
    e.find(".vid-bg video").height(i * n);
    var s = (e.width() >> 1) - (e.find(".vid-bg video").width() >> 1) | 0;
    var o = (e.height() >> 1) - (e.find(".vid-bg video").height() >> 1) | 0;
    e.find(".vid-bg video").css({
        left: s,
        top: o
    })
}

function getProportion(e, t, n, r) {
    var i = jQuery(window).width();
    var s = jQuery(window).height();
    var o = i / s;
    var u = e.width();
    var a = e.height();
    var f = u / a;
    var l = t / n;
    var c = a / n;
    if (f >= l) {
        c = u / t
    } else if (r && a < jQuery(window).height()) {
        c = jQuery(window).height() / n
    }
    return c
}

function parallaxVideo(e) {
    var t = e.visible(true);
    if (t) {
        var n = parseInt(jQuery(e).position().top);
        var r = n - jQuery(window).scrollTop();
        var i = -(r / 1.5);
        var s = i + "px";
        e.find(".vid-bg video").css({
            top: s
        })
    }
}(function(e) {
    e.fn.extend({
        bgVideo: function(e) {
            return this.each(function(e) {
                var t = jQuery(this);
                var n = {
                    videofile: "files/uploads/steven",
                    videowidth: 1280,
                    videoheight: 720,
                    videoposter: "files/uploads/video-poster.jpg",
                    videoparallax: true,
                    videooverlaycolor: "#000000",
                    videooverlayopacity: .5,
                    videosound: t.data("sound")
                };
                t.css({
                    position: "relative",
                    overflow: "hidden",
                    "z-index": "1"
                });
                var r = "";
                if (n.videooverlaycolor) {
                    overlay = '<div class="vid-overlay" style="position:absolute;width:100%;height:100%;top:0;left:0;background:' + n.videooverlaycolor + ';z-index:-2;-webkit-backface-visibility: hidden;-webkit-transform: translateZ(0);" ></div>'
                }
                r += '<div class="vid-bg" style="position:absolute;width:100%;height:100%;top:0;left:0;z-index:-10;background: url(' + n.videoposter + ') center center; background-size: cover;">';
                if (jQuery(window).width() > 1024) {
                    r += '<video id="video' + e + '" preload="auto" autoplay="autoplay" loop="loop"';
                    if (n.videosound) {} else {
                        r += ' muted="muted" '
                    } if (n.videoposter) {
                        r += ' poster="' + n.videoposter + '" '
                    }
                    r += 'style="display:none;top:0;left:0;position: relative;z-index:-11;width:100%;height:100%;">';
                    r += '<source src="' + n.videofile + '.mp4" type="video/mp4" />';
                    r += '<source src="' + n.videofile + '.ogg" type="video/ogg" />';
                    r += '<source src="' + n.videofile + '.webm" type="video/webm" />';
                    r += "bgvideo</video>";
                    r += "</div>";
                    if (n.videosound) {
                        r += '<a href="#" class="mute-video" style="position: absolute;z-index:50; bottom:20px;left:50%;margin-left: -10px;color:#ffffff;display:block;width: 20px;height: 20px;"><i class="fa fa-volume-up fa-fw"></i></a>'
                    } else {}
                }
                t.prepend(overlay);
                t.append(r);
                t.find(".vid-overlay").css({
                    opacity: n.videooverlayopacity
                });
                t.find(".vid-bg video").fadeIn(1e3);
                if (jQuery(window).width() > 1024) {
                    setProportion(t, n.videowidth, n.videoheight, n.videoparallax);
                    jQuery(window).resize(function() {
                        setProportion(t, n.videowidth, n.videoheight, n.videoparallax);
                        parallaxVideo(t)
                    })
                }
                if (n.videoparallax) {
                    parallaxVideo(t);
                    jQuery(window).scroll(function() {
                        parallaxVideo(t)
                    })
                }
            })
        }
    })
})(jQuery);
jQuery("body").on("click", ".mute-video", function() {
    var e = jQuery(this).siblings(".vid-bg").find("video").attr("id");
    var t = document.getElementById(e);
    if (t.muted == false) {
        t.muted = true;
        jQuery(this).find("i").removeClass("fa-volume-up");
        jQuery(this).find("i").addClass("fa-volume-off")
    } else {
        t.muted = false;
        jQuery(this).find("i").removeClass("fa-volume-off");
        jQuery(this).find("i").addClass("fa-volume-up")
    }
    return false
})

function portfolioPreviewHide() {
    jQuery("#portfolio-single .project-title").css({
        top: "-60px",
        opacity: 0
    });
    jQuery("#portfolio-single .social-share li").css({
        top: "-30px",
        opacity: 0
    });
    jQuery("#portfolio-single .entry-media").css({
        top: "60px",
        opacity: 0
    });
    jQuery("#portfolio-single .entry-content").css({
        top: "60px",
        opacity: 0
    });
    jQuery("#portfolio-single .project-title .single-pagination .next").css({
        left: "60%",
        opacity: 0
    });
    jQuery("#portfolio-single .project-title .single-pagination .prev").css({
        left: "40%",
        opacity: 0
    })
}

function portfolioShow() {
    jQuery("#portfolio-single .project-title").animate({
        top: "0",
        opacity: 1
    }, 500, "easeOutQuart");
    jQuery(".social-share li").delay(400).each(function(e, t) {
        var n = e * 80;
        jQuery(this).delay(n).animate({
            top: "0",
            opacity: 1
        }, 500, "easeOutBack")
    });
    jQuery(".entry-media").delay(600).animate({
        top: "0",
        opacity: 1
    }, 500, "easeOutQuart");
    jQuery(".entry-content").delay(1e3).animate({
        top: "0",
        opacity: 1
    }, 500, "easeOutQuart");
    var e = parseInt(jQuery(".project-title").width() / 2);
    var t = parseInt(jQuery(".project-title .project-name").width() / 2);
    var n = e - t - 90;
    var r = jQuery(".project-title").width() - n - jQuery(".project-title .single-pagination .next a").width();
    if (jQuery(window).width() < 760) {
        var n = -10;
        var r = 280
    }
    jQuery(".project-title .single-pagination .next").delay(200).animate({
        left: r + "px",
        opacity: 1
    }, 600, "easeOutBack");
    jQuery(".project-title .single-pagination .prev").delay(200).animate({
        left: n + "px",
        opacity: 1
    }, 600, "easeOutBack");
    jQuery(".close-project").delay(1200).fadeIn(500)
}
jQuery(window).load(function(e) {
    function n(e) {
        var n = jQuery("header").height() - 1;
        jQuery(".ajax-content").load(e + " #portfolio-single", function(r, i) {
            jQuery(".ajax-content").css({
                opacity: 1
            });
            if (i == "success") {
                if (!t) {
                    jQuery(".ajax-section #ajax-loader").css({
                        top: "0"
                    });
                    var s = 0;
                    jQuery("html,body").animate({
                        scrollTop: jQuery(".ajax-section").offset().top - n
                    }, 700, "easeOutQuart", function() {
                        if (s == 0) {
                            jQuery(".ajax-section #ajax-loader").fadeIn(500).delay(1e3).fadeOut(500, function() {
                                if (jQuery().fitVids) {
                                    jQuery(".ajax-section").fitVids()
                                }
                                portfolioPreviewHide();
                                jQuery(".ajax-content").slideDown(700, "easeOutQuart", function() {
                                    flexInit(".ajax-section");
                                    setTimeout(portfolioShow, 400)
                                })
                            })
                        }
                        s++
                    })
                } else {
                    jQuery(".ajax-section #ajax-loader").css({
                        top: "70px"
                    });
                    jQuery(".ajax-section #ajax-loader").fadeIn(500).delay(1e3).fadeOut(500, function() {
                        if (jQuery().fitVids) {
                            jQuery(".ajax-section").fitVids()
                        }
                        portfolioPreviewHide();
                        jQuery(".ajax-content").fadeIn(400, "easeOutQuart", function() {
                            flexInit(".ajax-section");
                            setTimeout(portfolioShow, 400);
                            jQuery(".ajax-section").animate({
                                "min-height": "0"
                            }, 700, "easeOutQuart")
                        })
                    })
                }
                t = e
            }
        })
    }
    var t = false;
    jQuery("body").on("click", "a.load-content", function() {
        var e = jQuery("header").height() - 1;
        var r = jQuery(this).attr("href");
        if (!t) {
            jQuery(".ajax-section").slideDown(500);
            n(r)
        } else if (t == r) {
            jQuery("html,body").animate({
                scrollTop: jQuery(".ajax-section").offset().top - e
            }, 700, "easeOutQuart")
        } else {
            var i = 0;
            jQuery("html,body").animate({
                scrollTop: jQuery(".ajax-section").offset().top - e
            }, 500, "easeOutQuart", function() {
                if (i == 0) {
                    var e = jQuery(".ajax-section").height();
                    jQuery(".ajax-section").css({
                        "min-height": e + "px"
                    });
                    jQuery(".close-project").fadeOut(500);
                    jQuery("#portfolio-single .project-title").animate({
                        top: "-60px"
                    }, 600, "easeOutQuart");
                    jQuery("#portfolio-single .social-share li").animate({
                        top: "-30px"
                    }, 600, "easeOutQuart");
                    jQuery("#portfolio-single .entry-media").animate({
                        top: "60px"
                    }, 600, "easeOutQuart");
                    jQuery("#portfolio-single .entry-content").animate({
                        top: "60px"
                    }, 600, "easeOutQuart");
                    jQuery(".ajax-content").fadeOut(600, function() {
                        n(r)
                    })
                }
                i++
            })
        }
        return false
    });
    jQuery("body").on("click", ".close-project a", function() {
        var e = jQuery(this).attr("href");
        var n = jQuery("header").height() - 1;
        jQuery(".close-project").fadeOut(500);
        jQuery(".ajax-content").animate({
            opacity: 0
        }, 500, function() {
            jQuery(this).slideUp(700, "easeOutQuart", function() {
                jQuery(".ajax-content").empty()
            });
            jQuery(".ajax-section").slideUp(700);
            jQuery("html,body").animate({
                scrollTop: jQuery("#portfolio").offset().top - n
            }, 700, "easeOutQuart")
        });
        t = false;
        return false
    })
})

function sizeDownHeader() {
    var e = 150;
    if (headeroverlay) {
        e = 500;
        if (jQuery(document).scrollTop() > jQuery(window).height() - headerheight && jQuery(".fixed-header").length > 0) {
            jQuery("#overlay-logo").fadeOut(0);
            jQuery("header").removeClass("header-overlay");
            if (jQuery(".header-shown").length < 1) {
                jQuery("header").css({
                    top: "-" + headerheight + "px"
                });
                jQuery("header").animate({
                    top: "0px"
                }, 600, "easeInOutQuart")
            }
            jQuery("header").addClass("header-shown")
        } else if (jQuery(".fixed-header").length > 0) {
            if (jQuery(".header-shown").length > 0) {
                jQuery("header").animate({
                    top: "-" + headerheight + "px"
                }, 200, function() {
                    jQuery("header").addClass("header-overlay");
                    jQuery("header").animate({
                        top: "0px"
                    }, 600, "easeInOutQuart");
                    jQuery("#overlay-logo").fadeIn(0)
                })
            }
            jQuery("header").removeClass("header-shown")
        }
    }
    if (jQuery(window).width() < 767) {
        jQuery(".fixed-header nav#main-nav").fadeOut(0);
        jQuery(".fixed-header nav#menu-controls").fadeOut(0);
        jQuery(".fixed-header .open-responsive-nav").fadeIn(500)
    } else {
        if (jQuery(document).scrollTop() > e && jQuery(".fixed-header").length > 0) {
            if (jQuery(".fixed-header header").hasClass("smallheader")) {} else {
                if (jQuery(window).width() > 1023) {
                    jQuery(".fixed-header header").addClass("smallheader");
                    jQuery(".fixed-header .open-responsive-nav").fadeOut(0);
                    if (jQuery(".fixed-header nav#menu-controls").length > 0) {
                        jQuery(".fixed-header nav#main-nav").fadeOut(200, function() {
                            jQuery("nav#menu-controls").fadeIn(200)
                        })
                    }
                } else if (jQuery(window).width() > 767) {
                    jQuery(".fixed-header nav#main-nav").fadeOut(0);
                    if (jQuery(".fixed-header nav#menu-controls").length > 0) {
                        jQuery(".fixed-header .open-responsive-nav").fadeOut(200, function() {
                            jQuery("nav#menu-controls").fadeIn(200)
                        })
                    }
                }
            }
        } else if (jQuery(".fixed-header").length > 0) {
            if (jQuery(window).width() > 1023) {
                jQuery(".fixed-header .open-responsive-nav").fadeOut(0);
                if (jQuery(".fixed-header header").hasClass("smallheader")) {
                    jQuery(".fixed-header header").removeClass("smallheader")
                }
                if (jQuery(".fixed-header nav#menu-controls").length > 0) {
                    jQuery(".fixed-header nav#menu-controls").fadeOut(200, function() {
                        jQuery("nav#main-nav").fadeIn(200)
                    })
                }
            } else if (jQuery(window).width() > 767) {
                jQuery(".fixed-header nav#main-nav").fadeOut(0);
                if (jQuery(".fixed-header nav#menu-controls").length > 0) {
                    jQuery(".fixed-header nav#menu-controls").fadeOut(200, function() {
                        jQuery(".open-responsive-nav").fadeIn(200)
                    })
                }
            }
        }
    }
}
var headeroverlay = false;
var headerheight = jQuery("header").height();
jQuery(document).ready(function() {
    if (jQuery(".header-overlay").length < 1) {
        jQuery("body").append('<div id="pseudo-header"></div>');
        jQuery("#pseudo-header").css({
            height: headerheight + "px",
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 0
        });
        if (jQuery(".fixed-header").length > 0) {
            jQuery(".page-body").css({
                "margin-top": headerheight + "px"
            })
        }
    } else {
        headeroverlay = true
    }
    sizeDownHeader()
});
jQuery(window).scroll(function() {
    sizeDownHeader()
});
jQuery(window).resize(function() {
    headerheight = jQuery("header").height();
    if (jQuery(".header-overlay").length < 1 && jQuery(window).width() < 1023) {
        jQuery("#pseudo-header").css({
            height: headerheight + "px",
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 0
        });
        if (jQuery(".fixed-header").length > 0) {
            jQuery(".page-body").css({
                "margin-top": headerheight + "px"
            })
        }
    }
    sizeDownHeader()
})

jQuery(window).load(function(e) {
    jQuery("body").on("click", 'input[type="submit"]', function() {
        $form = jQuery(this).parents("form");
        form_action = $form.attr("target");
        form_class = $form.attr("class");
        id = $form.attr("id");
        if (form_class == "checkform") {
            var e = true;
            $form.find("label.req").each(function(t) {
                var n = jQuery(this).attr("for");
                defaultvalue = jQuery(this).html();
                value = $form.find("." + n).val();
                formtype = $form.find("." + n).attr("type");
                if (formtype == "radio" || formtype == "checkbox") {
                    if (jQuery("." + n + ":checked").length == 0) {
                        jQuery(this).siblings("div").find(".checkfalse").fadeIn(200);
                        e = false
                    } else {
                        jQuery(this).siblings("div").find(".checkfalse").fadeOut(200)
                    }
                } else if (n == "email") {
                    var r = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
                    if (!value.match(r)) {
                        $form.find("." + n).addClass("false");
                        e = false
                    } else {
                        $form.find("." + n).removeClass("false")
                    }
                } else {
                    if (value == "" || value == defaultvalue) {
                        $form.find("." + n).addClass("false");
                        e = false
                    } else {
                        $form.find("." + n).removeClass("false")
                    }
                }
            });
            if (!e) {
                jQuery("#form-note").fadeIn(200);
                return false
            } else {
                jQuery("#form-note").fadeOut(200);
                if (form_action && form_action !== "") {
                    var t = $form.serialize();
                    jQuery.ajax({
                        type: "POST",
                        url: form_action,
                        data: t,
                        success: function(e) {
                            jQuery("#form-note").html(e);
                            jQuery("#form-note").delay(200).fadeIn(200)
                        }
                    });
                    return false
                } else {
                    return true
                }
            }
        }
    })
})

function smoothShow() {
    jQuery(".counter-value").each(function() {
        if (jQuery(window).width() > 700) {
            var e = jQuery(this).visible(false);
            if (jQuery(this).hasClass("anim")) {} else if (e) {
                jQuery(this).addClass("anim");
                var t = parseInt(jQuery(this).attr("data-from"));
                var n = parseInt(jQuery(this).attr("data-to"));
                var r = parseInt(jQuery(this).attr("data-speed"));
                jQuery(this).count(t, n, r)
            }
        } else {
            var n = parseInt(jQuery(this).attr("data-to"));
            jQuery(this).html(n)
        }
    });
    jQuery(".sr-animation").each(function() {
        if (jQuery(window).width() > 700) {
            var e = jQuery(this).visible(true);
            var t = jQuery(this).attr("data-delay");
            if (!t) {
                t = 0
            }
            if (jQuery(this).hasClass("animated")) {} else if (e) {
                jQuery(this).delay(t).queue(function() {
                    jQuery(this).addClass("animated")
                })
            }
        } else {
            jQuery(this).addClass("animated")
        }
    });
    jQuery(".skill").each(function() {
        var e = jQuery(this).visible(true);
        var t = jQuery(this).find(".skill-bar .skill-active ").attr("data-perc");
        if (jQuery(this).hasClass("anim")) {} else if (e) {
            var n = Math.floor(Math.random() * (300 - 50 + 1)) + 50;
            jQuery(this).addClass("anim");
            jQuery(this).find(".skill-bar .skill-active ").animate({
                width: t + "%"
            }, 2e3, "easeInOutQuart", function() {
                jQuery(this).find(".tooltip").delay(n).animate({
                    top: "-28px",
                    opacity: 1
                }, 500)
            }).css("overflow", "visible")
        }
    })
}

function flexInit(e) {
    if (jQuery().flexslider) {
        jQuery(e + " .flexslider").flexslider({
            animation: "slide",
            slideshowSpeed: 7e3,
            animationDuration: 1e3,
            slideshow: false,
            directionNav: false,
            controlNav: true,
            smoothHeight: true,
            touch: true,
            video: true,
            randomize: false
        })
    }
}
jQuery(window).load(function(e) {
    function i() {
        var e = jQuery("#menu-responsive").width() + 10;
        jQuery("#menu-responsive").animate({
            right: "-" + e + "px"
        }, 800, "easeInOutQuart")
    }
    jQuery("#page-loader .page-loader-inner").delay(1e3).fadeOut(500, function() {
        jQuery("#page-loader").fadeOut(500)
    });
    flexInit("body");
    if (jQuery().isotope) {
        jQuery(".masonry").each(function() {
            var e = jQuery(this);
            e.imagesLoaded(function() {
                e.isotope({
                    itemSelector: ".masonry-item",
                    transformsEnabled: true
                })
            })
        });
        jQuery(".filter li a").click(function() {
            var e = jQuery(this).parents("ul.filter").data("related-grid");
            jQuery(this).parents("ul.filter").find("li a").removeClass("active");
            jQuery(this).addClass("active");
            var t = jQuery(this).attr("data-option-value");
            jQuery("#" + e).isotope({
                filter: t
            }, function() {});
            return false
        });

        function t() {
            jQuery(".masonry.portfolio-entries").each(function() {
                $container = jQuery(this);
                var e = $container.data("maxitemwidth");
                if (!e) {
                    e = 370
                }
                var t = $container.width();
                var t = t / 110 * 100;
                var n = parseInt($container.children("div").css("marginRight"));
                var r = Math.ceil(t / e);
                var i = (r - 1) * n;
                var s = i / r;
                var o = Math.floor(t / r - s + 1);
                $container.css({
                    width: "110%"
                });
                $container.children("div").css({
                    width: o + "px"
                });
                if ($container.children("div").hasClass("isotope-item")) {
                    $container.isotope("reLayout")
                }
            })
        }
        t();
        jQuery(window).resize(function() {
            t()
        })
    }
    var n = [];
    var r = [];
    jQuery("nav#main-nav li").each(function(e) {
        if (jQuery(this).find("ul").length > 0) {
            var t = jQuery(this);
            jQuery(this).mouseenter(function() {
                if (n[e]) {
                    clearTimeout(n[e]);
                    n[e] = null
                }
                n[e] = setTimeout(function() {
                    jQuery(t).children("ul").fadeIn(200)
                }, 150)
            });
            jQuery(this).mouseleave(function() {
                if (n[e]) {
                    clearTimeout(n[e]);
                    n[e] = null
                }
                n[e] = setTimeout(function() {
                    jQuery(t).children("ul").fadeOut(200)
                }, 150)
            })
        }
    });
    jQuery("nav#main-nav").on("click", "li", function() {
        if (jQuery(window).width() < 1025) {
            if (jQuery(this).find("ul").length > 0) {
                if (jQuery(this).find("ul").css("display") !== "block") {
                    jQuery(this).children("ul").fadeIn(200);
                    return false
                }
            }
        }
    });
    jQuery('<a class="open-responsive-nav" href=""><span></span></a>').appendTo(".header-inner .menu");
    jQuery("body #page-content").prepend('<div id="menu-responsive"><div id="menu-responsive-inner"><a href="" class="close-responsive-nav"><span></span></a><nav id="responsive-nav"><ul></ul></nav></div></div>');
    jQuery("nav#responsive-nav > ul").html(jQuery("nav#main-nav > ul").html());
    jQuery("header").on("click", ".open-responsive-nav", function() {
        var e = jQuery("header").height();
        var t = jQuery("#page-content").height() - e;
        jQuery("#menu-responsive").css({
            height: t + "px",
            top: e + "px"
        });
        if (jQuery("#menu-responsive").css("right") == 0 || jQuery("#menu-responsive").css("right") == "0px") {
            i()
        } else {
            jQuery("#menu-responsive").animate({
                right: "0"
            }, 800, "easeInOutQuart");
            jQuery("html, body").animate({
                scrollTop: 0
            }, 1e3, "easeInOutQuart")
        }
        return false
    });
    jQuery("#page-content").on("click", "#menu-responsive", function() {
        i()
    });
    jQuery(".tabs").each(function(e) {
        jQuery(this).find(".tab-content").removeClass("active");
        var t = jQuery(this).find(".active").attr("href");
        jQuery(this).find("." + t).addClass("active")
    });
    jQuery(".tab-nav").on("click", "a", function() {
        var e = jQuery(this).parent("li").parent("ul").parent("div");
        var t = jQuery(this).attr("href");
        jQuery(e).find(".tab-nav a").removeClass("active");
        jQuery(this).addClass("active");
        jQuery(e).find(".tab-container .tab-content").hide().removeClass("active");
        jQuery(e).find(".tab-container ." + t).fadeIn(500).addClass("active");
        return false
    });
    jQuery(".toggle-item").each(function(e) {
        jQuery(this).find(".toggle-active").siblings(".toggle-inner").slideDown(300)
    });
    jQuery(".toggle-item").on("click", ".toggle-title", function() {
        var e = jQuery(this).parent("div").parent("div");
        var t = jQuery(this).parent("div").find(".toggle-inner").css("display");
        if (jQuery(e).attr("class") == "accordion") {
            if (t !== "none") {
                jQuery(e).find(".toggle-item .toggle-inner").slideUp(300);
                jQuery(this).toggleClass("toggle-active")
            } else {
                jQuery(e).find(".toggle-item .toggle-inner").slideUp(300);
                jQuery(e).find(".toggle-item .toggle-title").removeClass("toggle-active");
                jQuery(this).toggleClass("toggle-active");
                jQuery(this).siblings(".toggle-inner").slideDown(300)
            }
        } else {
            jQuery(this).toggleClass("toggle-active");
            jQuery(this).siblings(".toggle-inner").slideToggle(300)
        }
        return false
    });
    jQuery("#backtotop").click(function() {
        jQuery("html, body").animate({
            scrollTop: 0
        }, 1e3, "easeInOutQuart");
        return false
    });
    jQuery(".overlayinfo").each(function() {
        var e = parseInt(jQuery(this).height() / 2);
        jQuery(this).css({
            marginTop: "-" + e + "px"
        })
    });
    if (jQuery().fitVids) {
        jQuery("body").fitVids()
    }
    if (jQuery().parallax) {
        jQuery(".parallax-section").parallax()
    }
    if (jQuery().jPlayer && jQuery(".jp-interface").length) {
        jQuery(".jp-interface").each(function() {
            var e = jQuery(this).width();
            var t = e - 175;
            jQuery(this).find(".jp-progress-container").css({
                width: t + "px"
            })
        })
    }
    if (jQuery().revolution) {
        jQuery(".home-slider").revolution({
            startwidth: 1100,
            startheight: 500,
            delay: 1e4,
            onHoverStop: "on",
            navigationType: "none",
            fullWidth: "off",
            fullScreen: "on",
            fullScreenOffsetContainer: "#pseudo-header"
        })
    }
    if (jQuery().bgVideo) {
        setTimeout(function() {
            jQuery(".videobg-section").bgVideo()
        }, 1e3)
    }
    if (jQuery().owlCarousel) {
        jQuery("#portfolio-carousel").owlCarousel({
            navigation: false,
            items: 4,
            itemsCustom: false,
            itemsDesktop: [1199, 4],
            itemsDesktopSmall: [980, 3],
            itemsTablet: [768, 2],
            itemsTabletSmall: false,
            itemsMobile: [479, 1]
        })
    }
    smoothShow()
});
jQuery(window).scroll(function() {
    smoothShow()
})
