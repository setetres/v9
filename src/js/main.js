/* global $, Blazy, page, document, window, setTimeout, FastClick, XMLHttpRequest */

(function() {
    'use strict';

    $(document).ready(function() {
        // Submit success

        function submitSuccess() {
            var giphyPlace = $('#giphy');
            var qEndPoint =  'https://api.giphy.com/v1/gifs/random?tag=yes&api_key=TmA6w9NmXT0TrXsh1aVgbtApF4dUF9A5';

            function processRequest()  {
                if(xhr.readyState === 4) {
                    var response = xhr.response;
                    response = JSON.parse(response);
                    $('#contact-form').addClass('contact-form--active');
                    $('.contact-form__input').val('');
                    $('.pulse__loader').removeClass('pulse__loader--active');
                    giphyPlace.addClass('giphy--active');
                    giphyPlace.css('backgroundImage', 'url(' + response.data.fixed_height_small_url + ')');
                    $.playSound('/party.mp3');
                    setTimeout(function(){
                        giphyPlace.removeClass('giphy--active');
                        $('#contact-form').removeClass('contact-form--active');
                    }, 5000);
                }
            }

            var xhr = new XMLHttpRequest();
            xhr.open('GET', qEndPoint, true);
            xhr.send();
            xhr.addEventListener('readystatechange', processRequest, true);
        }

        // Fast click

        FastClick.attach(document.body);

        // Progress bar

        var getMax = function() {
            return $(document).height() - window.innerHeight;
        };

        var getValue = function() {
            return $(window).scrollTop();
        };

        var progressBar = $('.progress__bar'),
            max = getMax(),
            value, width;

        var getWidth = function() {
            value = getValue();
            width = (value / max) * 100;
            width = width + '%';
            return width;
        };

        var setWidth = function() {
            progressBar.css({width: getWidth()});
        };

        $(window).on('scroll', function() {
            max = getMax();
            setWidth();
        });

        // Burger

        $('.burger').on('click', function() {
            document.title = 'Sete Três';
            setTimeout(function() {
                $('html, body').animate({scrollTop: 0}, 0);
                $('.section').remove();
            }, 1000);
            setTimeout(function() {
                $('.section').remove();
            }, 1250);
            if ($('.burger').hasClass('burger--active')) {
                closeNavigation();
            } else {
                openNavigation();
            }
            return false;
        });

        // Page loaded

        function pageLoaded() {
            $('.body').removeClass('body--loading');
            $('.body').addClass('body--active');
            $('.header__title').addClass('header__title--active');
            $('.burger').removeClass('burger--active');
            $('.burger').removeClass('burger--loading');
            $('.line').removeClass('line--loading');
            $('.progress__bar').css({width: 0});
            $('.stripe').addClass('stripe--active');
            $('.wrapper').removeClass('wrapper--loading');
            setTimeout(function() {
                $('.burger').addClass('burger--ready');
            }, 1250);
        }

        // Page transition

        var pageTransition = function() {
            $('.navigation').removeClass('navigation--active');
            $('.pulse__loader').addClass('pulse__loader--active');
            $('.section').removeClass('section--active');
            setTimeout(function() {
                $('html, body').animate({scrollTop: 0}, 0);
            }, 500);
        };

        // Open navigation

        var openNavigation = function() {
            $('.navigation').css({visibility: 'visible'});
            $('.burger').addClass('burger--active');
            $('.header__title').addClass('header__title--active');
            $('.section--home').removeClass('section--active');
            $('.section').removeClass('section--active');
            setTimeout(function() {
                $('.navigation').addClass('navigation--active');
                $('.progress__bar').css({width: 0});
            }, 500);
        };

        // Close navigation

        var closeNavigation = function() {
            $('.burger').removeClass('burger--active');
            $('.header__title').removeClass('header__title--active');
            $('.navigation').removeClass('navigation--active');
            $('.progress__bar').css({width: 0});
            setTimeout(function() {
                $('.navigation').css({visibility: 'hidden'});
            }, 1250);
        };

        // Show content

        var showContent = function() {
            /* eslint-disable no-unused-vars */
            var bLazy = new Blazy();
            /* eslint-enable no-unused-vars */

            $('.section__content-image-load').fitVids();
            $('.pulse__loader').removeClass('pulse__loader--active');
        };

        // Route: index

        var index = function() {
            pageLoaded();
        };

        // Route: about

        var about = function() {
            pageLoaded();
            pageTransition();
            setTimeout(function() {
                $('.main-wrapper').load('/about/index.html .section--about', function() {
                    document.title = 'Sete Três — About';
                    showContent();
                    setTimeout(function() {
                        $('.section--about').addClass('section--active');
                    }, 500);
                });
            }, 500);
        };

        // Route: archive

        var archive = function() {
            pageLoaded();
            pageTransition();
            setTimeout(function() {
                $('.main-wrapper').load('/archive/index.html .setetres--archive', function() {
                    document.title = 'Sete Três — Archive';
                    showContent();
                    setTimeout(function() {
                        $('.setetres--archive').addClass('section--active');
                    }, 500);
                });
            }, 500);
        };

        // Route: cacete company

        var cacete = function() {
            pageLoaded();
            pageTransition();
            setTimeout(function() {
                $('.main-wrapper').load('/cacete-company/index.html .section--cacete', function() {
                    document.title = 'Sete Três — Cacete Company';
                    showContent();
                    setTimeout(function() {
                        $('.section--cacete').addClass('section--active');
                    }, 500);
                });
            }, 500);
        };

        // Route: contact

        var contact = function() {
            pageLoaded();
            pageTransition();
            setTimeout(function() {
                $('.main-wrapper').load('/contact/index.html .section--contact', function() {
                    document.title = 'Sete Três — Contact';
                    showContent();
                    setTimeout(function() {
                        $('.section--contact').addClass('section--active');
                        $('#contact-form').on('submit', function() {
                            $.ajax({
                                url: '//formspree.io/xodbpkbm',
                                method: 'POST',
                                data: $(this).serialize(),
                                dataType: 'json',
                                beforeSend: function() {
                                    $('.pulse__loader').addClass('pulse__loader--active');
                                },
                                success: function() {
                                    submitSuccess();
                                }
                            });
                            return false;
                        });
                    }, 500);
                });
            }, 500);
        };

        // Route: inkstarter

        var inkstarter = function() {
            pageLoaded();
            pageTransition();
            setTimeout(function() {
                $('.main-wrapper').load('/inkstarter/index.html .section--inkstarter', function() {
                    document.title = 'Sete Três — InkStarter';
                    showContent();
                    setTimeout(function() {
                        $('.section--inkstarter').addClass('section--active');
                    }, 500);
                });
            }, 500);
        };

        // Routes

        page('/', index);
        page('/about/', about);
        page('/archive/', archive);
        page('/cacete-company/', cacete);
        page('/contact/', contact);
        page('/inkstarter/', inkstarter);
        page();
    });
}());
