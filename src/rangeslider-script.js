$(function () {
    var $document = $(document);
    var selector = '[data-rangeslider]';
    var $element = $(selector);
    // For ie8 support
    var textContent = ('textContent' in document) ? 'textContent' : 'value';

    function valueOutput(element) {
        var value = element.value;
        var output = element.parentNode.getElementsByClassName('output')[0] || element.parentNode.parentNode.getElementsByClassName('output')[0];
        output.value = value;
    }

    $('.cambiar').on('change', function (item) {
        var range1 = item.currentTarget.parentElement.parentElement.children[0].children[0];
        var $inputRange = $(range1);
        var value = item.currentTarget.value;
        $inputRange.val(value).change();
    })

    // $document.on('change', '#cantMeses input', function (e) {
    //     var $inputRange = $(selector, e.target.parentNode);
    //     var value = $('input[type="number"]', e.target.parentNode)[0].value;
    //     console.log(value);
    //     $inputRange.val(value).change();
    // });


    // Basic rangeslider initialization
    $element.rangeslider({
        // Deactivate the feature detection
        polyfill: false,
        rangeClass: 'rangeslider-1',
        disabledClass: 'rangeslider--disabled-1',
        horizontalClass: 'rangeslider--horizontal-1',
        verticalClass: 'rangeslider--vertical-1',
        fillClass: 'rangeslider__fill-1',
        handleClass: 'rangeslider__handle-1',

        // Callback function
        onInit: function () {
            valueOutput(this.$element[0]);
        },
        // Callback function
        onSlide: function (position, value) {
            // console.log('onSlide');
            // console.log('position: ' + position, 'value: ' + value);
           
            valueOutput(this.$element[0]);
        },
        // Callback function
        onSlideEnd: function (position, value) {
            calcular2();
            // console.log('onSlideEnd');
            // console.log('position: ' + position, 'value: ' + value);
        }
    });
});
