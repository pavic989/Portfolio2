(function($) {
    /**
     * Scroller plugin
     * ---------------
     * @param params
     * @returns {*}
     */
    $.fn.scroller = function (params) {

        /**
         * Plugin global configuration
         */
        var options = $.extend({
            lengthDelayLimit: 2.5,
            pushHistory: false,
            lengthDelay: true,
            pushState: false,
            topButton: false,
            vertical: false,
            element: 'html, body',
            callback: null,
            duration: 750,
            easing: null,
            offset: 0,
            delay: 0,
            button: {
                id: '#scroller-top-button',
                disableLayout: false,
                bottom: 10,
                right: 10,
                element: 'body',
                content: 'TOP',
                class: null,
                hide: 0,
                fade : 0
            }
        }, params);

        /**
         * Main scroll element object holder
         * @type {*|HTMLElement}
         */
        var scrollWrapper = null;

        /**
         * Actual AXIS position holder
         * @type {number}
         */
        var actualAxisPosition = 0;

        /**
         * Action target AXIS position holder
         * @type {number}
         */
        var targetAxisPosition = 0;

        /**
         * Scrolling element AXIS viewport size
         * @type {number}
         */
        var viewportActualSize = 0;

        var targetState = null;

        /**
         * Animation duration holder
         * @type {number}
         */
        var duration = 0;

        /**
         * Actual AXIS and target AXIS position range holder
         * @type {number}
         */
        var range = 0;

        /**
         * Plugin initialize method
         */
        function init() {
            checkIfElementValid();

            scrollWrapper = $(options.element);

            createTopButton();

            registerScrollTopEvent();
        }

        /**
         * Check if initialized element is valid
         */
        function checkIfElementValid() {
            if ($.inArray(options.element, ['body', 'html']) >= 0) {
                options.element = document;
            }

            console.log('Scroller loaded on: "' + options.element + '" selector.');
        }

        /**
         * Create top button
         */
        function createTopButton() {
            var button = $('<button>' + options.button.content + '</button>');

            button.attr({
                'id': options.button.id.replace('#', ''),
                'data-scroll': 0
            });

            //TODO: wrapper mode calc margin right 100% - scrollBarWidth
            if (!options.button.disableLayout) {
                button.css({
                    position: 'fixed',
                    bottom: options.button.bottom,
                    right: options.button.right,
                    height: 50,
                    width: 50,
                    'text-align': 'center'
                });
            }

            $(options.button.element).append(button);

            console.log(
                'Scroller "scroll top button" created with id: "'
                    + options.button.id + '" on "'
                    + options.button.element + '" element.'
            );
        }

        function registerScrollTopEvent() {
            console.log('jedu');
            $(options.button.id).on('click', function(event){
                event.preventDefault();

                getTargetAttributeSequence($(this));

                run(targetState);
            });
        }

        /**
         * Run scroller on click event
         * @param target
         */
        function run(target) {
            getActualViewportAxisSize();

            getActualAxisPosition();

            getAxisPosition(target);

            getRange();

            calculateDuration();

            setTimeout(
                scroll(),
            options.delay);
        }

        /**
         * Scroll to given position
         */
        function scroll() {
            console.log(
                'Action: ' + targetState,
                'Target: ' + getTarget(),
                'Actual: ', + actualAxisPosition,
                'Range: ', + range,
                'Viewport: ' + viewportActualSize,
                'Duration: ' + duration,
                'Delay: ' + options.delay
            );

            beforeScrollCallBack();

            if (!options.vertical) {
                scrollHorizontal();
            } else {
                scrollVertical();
            }
        }

        /**
         * Horizontal scrolling
         */
        function scrollHorizontal() {
            scrollWrapper.stop().animate({
                scrollTop: getTarget() + 'px'
            }, {
                easing: options.easing,
                duration: duration,
                queue: true,
                complete: afterScrollCallBack()
            });
        }

        /**
         * Vertical scrolling
         */
        function scrollVertical() {
            scrollWrapper.stop().animate({
                scrollLeft: getTarget() + 'px'
            }, {
                easing: options.easing,
                duration: duration,
                queue: true,
                complete: afterScrollCallBack()
            });
        }

        /**
         * Before scroll callback
         */
        function beforeScrollCallBack() {
            $(options.element + ', ' + options.button.element).trigger('scroller:beforeScroll');

            pushStateEvent();
        }

        /**
         * After scroll callback
         * @returns {Function}
         */
        function afterScrollCallBack() {
            return function(){
                if ($.isFunction(options.callback)) {
                    (options.callback)();
                }
                $(options.element + ', ' + options.button.element).trigger('scroller:afterScroll');
            }
        }

        /**
         * Push state event
         */
        function pushStateEvent() {
            if (options.pushState) {
                if (options.pushHistory) {
                    return history.replaceState(null, '', targetState);
                } else {
                    return history.pushState(null, '', targetState);
                }
            }
        }

        /**
         * Get scroll range
         * @returns {number}
         */
        function getRange() {
            if (getTarget() > actualAxisPosition) {
                return range = Math.abs(getTarget() - actualAxisPosition);
            } else {
                return range = Math.abs(actualAxisPosition - getTarget());
            }
        }

        /**
         * Get actual position on axis
         */
        function getActualAxisPosition() {
            if (!options.vertical) {
                if (options.element === 'html, body') {
                    actualAxisPosition = $(window).scrollTop();
                } else {
                    actualAxisPosition = scrollWrapper.scrollTop();
                }
            } else {
                if (options.element === 'html, body') {
                    actualAxisPosition = $(window).scrollLeft();
                } else {
                    actualAxisPosition = scrollWrapper.scrollLeft();
                }
            }
        }

        /**
         * Get element axis position or prepare coordinates for scroll target calculation
         * @param element
         */
        function getAxisPosition(element) {
            if (!$.isNumeric(element)) {
                if (!options.vertical) {
                    targetAxisPosition = $(element).offset().top;
                } else {
                    targetAxisPosition = $(element).offset().left;
                }
            } else {
                if (options.element === 'html, body') {
                    targetAxisPosition = Math.abs(element);
                } else {
                    targetAxisPosition = (element - actualAxisPosition);
                }
            }
        }

        /**
         * Get actual viewport axis size
         */
        function getActualViewportAxisSize() {
            if (!options.vertical) {
                viewportActualSize = window.innerHeight;
            } else {
                viewportActualSize = window.innerWidth;
            }
        }

        /**
         * Get target axis coordinate
         * @returns {number}
         */
        function getTarget() {
            var target;

            if (options.element === 'html, body') {
                target = targetAxisPosition;
            } else {
                target = Math.abs(actualAxisPosition + targetAxisPosition);
            }

            console.log(target, options.offset);

            return Math.abs(target - options.offset);
        }

        /**
         * Calculate duration of animation effect
         */
        function calculateDuration() {
            if (options.lengthDelay) {
                duration = calculateLengthDuration();
            } else {
                duration = options.duration;
            }
        }

        /**
         * Calculate duration length delay
         * @returns {number}
         */
        function calculateLengthDuration() {
            var index, duration = options.duration;

            index = Math.abs(range / viewportActualSize);

            if (index > options.lengthDelayLimit) {
                index = options.lengthDelayLimit;
            }

            if (index < 1) {
                index = 1;
            }

            return Math.abs(duration * index);
        }

        /**
         * Get target attributes load sequence
         * @param element
         */
        function getTargetAttributeSequence(element) {
            if (element.attr('href')) {
                targetState = element.attr('href');
            } else if (element.attr('data-href')) {
                targetState = element.attr('data-href');
            } else {
                targetState = element.attr('data-scroll');
            }
        }

        /*
         * Run init
         */
        init();

        /**
         * Register on click event to given selector elements
         */
        return this.on('click', function(event){
            event.preventDefault();

            getTargetAttributeSequence($(this));

            run(targetState);
        });

    }

})(jQuery);