var dropdownLib = (function () {
    // private variables
    var _configList = {},  // stores the config which  sends
        _counter = 0, id;
    //search function
    function search(input, config) {
        var stringTemp = '';
        filter = input.toUpperCase();
        $('#' + config.id).find('ul.search-list').empty();
        for (var i = 0; i < config.data.length; i++) {
            // check if the value also exists in config.selectedValues
            if (!input || ((config.data[i].value.toUpperCase().search(filter) > -1 || config.data[i].key.search(filter) > -1))) {
                if (($.inArray(config.data[i].value, config.selectedValues) < 0)) {
                    stringTemp += '<li class="list showpopup"  value=' + config.data[i].value + '  key=' + config.data[i].key + '><span>' + config.data[i].value + '</span></li>';
                }//adding the class selecetd to add color to the clicked listitem 
                else {
                    stringTemp += '<li class="list selected showpopup"  value=' + config.data[i].value + '  key=' + config.data[i].key + '><span>' + config.data[i].value + '</span></li>';
                }
            }
        }
        $('#' + config.id).find('ul.search-list').append(stringTemp);
    }
    //function for button clicked
    function toggleList(searchbuttonClick) {
        var isDropdownHidden, pageHeight, inputHeight, listHeight, listOffset;
        isDropdownHidden = false;
        if (searchbuttonClick.closest('div.dropdown-wrapper').find('ul.search-list').hasClass('hide')) {
            isDropdownHidden = true;
        }
        $(document).find('ul.search-list').addClass('hide');
        if (isDropdownHidden) {
            searchbuttonClick.closest('div.dropdown-wrapper').find('ul.search-list').removeClass('hide');
            $(".dropdown-overlay").removeClass('hide');
        }
        pageHeight = $('body').height();
        listHeight = searchbuttonClick.closest('div.dropdown-wrapper').find('ul.search-list').height();
        listOffset = searchbuttonClick.closest('div.dropdown-wrapper').find('ul.search-list').offset();
        if (listHeight > (pageHeight - (listOffset.top))) {//logic to show dropdown upwards when there is no place down of the page
            searchbuttonClick.closest('div.dropdown-wrapper').find('ul.search-list').addClass('positionSet');
        }
    }
    //function for callback
    function Callbackfunction(dropdownconfig) {
        var arr = dropdownconfig.selectedValues, selectedItems = [];
        for (var k = 0; k < dropdownconfig.data.length; k++) {
            if ($.inArray(dropdownconfig.data[k].value, arr) >= 0) {
                selectedItems.push(dropdownconfig.data[k].key);
                // arr.splice($.inArray(_configList[wrapperId].data[k].value, arr), 1);
            }
        }

        dropdownconfig.callback(selectedItems);

    }

    $(document).ready(function () {
        var itemValue, selected;
        $(".dropdown-overlay").click(function () {
            $("ul.search-list").addClass('hide');
            $('.dropdown-overlay').addClass('hide');
        });
        $(document.body).on('click', '.delete-item', function () {
          
            dropdownid = $(this).closest('div.dropdown-wrapper').attr('id');
            itemValue = $(this).parent('span').attr('value');
            $(this).parent('span').remove();
            _configList[dropdownid].selectedValues.splice($.inArray(itemValue, _configList[dropdownid].selectedValues), 1);
            search('', _configList[dropdownid]);
            if (_configList[dropdownid].callback) {
                Callbackfunction(_configList[dropdownid]);//to remove deleted items  from the callback list
            }
        });

        $(".search-container button.searchbutton").on("click", function () {//to hide all dropdowns when one is opened.and also to open and close the dropdown when clicked on button.

            toggleList($(this));
        });

        $('.search-container .multiple-wrapper .search').on("click", function () {
            $(".dropdown-overlay").removeClass('hide');
            toggleList($(this));
        });
        $(".search-container input").on("keyup", function () {
            var input, filter, i, dropdownid;
           
            $(".dropdown-overlay").removeClass('hide');
            if ($(this).closest('div.dropdown-wrapper').find('ul.search-list').is(':hidden')) {
                toggleList($(this));
            }
            input = $(this).val(); // getting entered input value
            dropdownid = $(this).closest('div.dropdown-wrapper').attr('id');//getting config id
            search(input, _configList[dropdownid]);
        });
        $('.dropdown-wrapper ul.search-list').on('click', 'li', function () {
            var listValue, inputId, k, wrapperId, selectedItems;
            listValue = $(this).attr('value');
            wrapperId = $(this).closest('div.dropdown-wrapper').attr('id');

            if ($.inArray(listValue, _configList[wrapperId].selectedValues) < 0) {//if the selected listvalue not present in the div.multiple and selectedValues
                // push the selected value to configlist selectedValue
                if (_configList[wrapperId].multiSelect) {
                    _configList[wrapperId].selectedValues.push(listValue);
                    $(this).closest('div.dropdown-wrapper').find('span.multiple').append(`<span class="multiple-case selected-` + (listValue) + `" value=` + listValue + `>` + listValue + `<button class='delete-item'><b>x</b></button></span>` + ' ' + ``);
                }
                else {
                    _configList[wrapperId].selectedValues = [];
                    _configList[wrapperId].selectedValues.push(listValue);
                    $(this).closest('div.dropdown-wrapper').find('span.multiple').empty();
                    //$(this).parent().find('li.list').removeClass('selected');
                    $(this).closest('div.dropdown-wrapper').find('span.multiple').append(`<span class="selected-` + (listValue) + `" value=` + listValue + `>` + listValue + `</span>`);
                }
                $(this).closest('div.dropdown-wrapper').find('input.search').val('');
            }
            else {//to remove spans when clicked on li if it is already present in input div
                $(this).closest('div.dropdown-wrapper').find('span.multiple').find(`span.selected-` + listValue + ``).remove();
                _configList[wrapperId].selectedValues.splice($.inArray(listValue, _configList[wrapperId].selectedValues), 1);
                $(this).closest('div.dropdown-wrapper').find('input.search').val('');
            }

            if (_configList[wrapperId].callback) {
                Callbackfunction(_configList[wrapperId]);
            }
            listValue = '';
            search(listValue, _configList[wrapperId]);//to get total ul when no input is there after the first search.
            $("ul.search-list").addClass('hide');
            $('.dropdown-overlay').addClass('hide');
        });

    });
    return {
        createDropdown: function (config) {
            var localDomStructure = '';
            _counter++;
            id = 'drop-down-' + _counter;

            localDomStructure += `<div id = "` + id + `" class="dropdown-wrapper ">`;
            localDomStructure += `<div class="search-container">`;
            localDomStructure += `<div class=multiple-wrapper>`;
            localDomStructure += `<span class="multiple">`
            localDomStructure += `</span>
            <input type="text" class="search"\>`;
            localDomStructure += `</div>`;
            localDomStructure += `<button class=searchbutton><i class="fa fa-chevron-down"></i></button>
            </div>`;
            localDomStructure += `<ul class="search-list hide">`
            localDomStructure += `</ul>`;
            localDomStructure += `</div>`;
            $(localDomStructure).appendTo('#' + config.id);
            search('', config);
            // filling configList      
            config.selectedValues = [];
            _configList[id] = config;

        }
    }


})();
