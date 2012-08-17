/*
 *  Project: jCarouselSwipe.js
 *  Description: Plugin that add touch controls for jCarousel.
 *  Author: @felquis
 *  License: MIT
 *  GitHub : github.com/felquis/jCarouselSwipe
 */

;(function ( $, window, undefined ) {

    var pluginName = 'touch',
        document = window.document,
        defaults = {};

    function Plugin( element, options ) {
        this.element = element;

        this.options = $.extend( {}, defaults, options) ;
        
        this._defaults = defaults;
        this._name = pluginName;
        
        this.init();
    }

    Plugin.prototype.init = function () {

    // Testa se tem as dependências
        if (Hammer == undefined || Modernizr == undefined) return false;

        if (!Modernizr.touch) return false;

        var $Slide = $(this.element);

    //  Verifica se é esta iniciado o jCarousel
        if (!$Slide.data('jcarousel')) return false;

    /*     Inicia os eventos touch
       ========================================================================== */

        var hammer = new Hammer($Slide.get(0));

        // DireÃ§Ã£o dos final do drag
            direction = {
                        left : function () {
                            $Slide.jcarousel('scroll', '+=1');
                        },
                        right : function () {
                            $Slide.jcarousel('scroll', '-=1');
                        }
                    },
        // Valor de base para o inicio do drag
            init = init = parseFloat($Slide.find('ul').css('left').replace('px','')),

        // Guarda o valor do ultimo drag
            oudGo = 0,

        // Grava a direÃ§Ã£o do drag, e Ã© usada quando dipara ondragend        
            goDirection = 'left';

    /*     ondragstart grava o left inicial do Slide
       ========================================================================== */
            hammer.ondragstart = function () {
                init = init = parseFloat($Slide.find('ul').css('left').replace('px',''));
            }

    /*     durante o drag ele movimenta o Slide
       ========================================================================== */
            hammer.ondrag = function (e) {
                var go = e.distanceX*0.5,
                    last = (init+(go));

                // Verifica se o usuÃ¡rio nÃ£o alternou a direÃ§Ã£o do drag
                    if (oudGo > go) {
                        if (go < 900) {
                            $Slide.find('ul').css('left', last);

                        // DireÃ§Ã£o que esta o drag    
                            goDirection = 'left';
                        }
                    } else if (oudGo < go) {
                        if (go < 900) {
                            $Slide.find('ul').css('left', last);

                        // DireÃ§Ã£o que esta o drag
                            goDirection = 'right';
                        }
                    }

                // Grava a posiÃ§Ã£o do ultimo drag
                    oudGo = go;
            }

    /*     ao terminar o drag, executa a mudanÃ§a de Slide
       ========================================================================== */
            hammer.ondragend = function (e) {
                oudGo = 0;
                direction[goDirection](e);
            }
    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
            }
        });
    };
}(jQuery, window));