var dropdownLib = (function () {
    // private variables
    var _configList = {},  // stores the config which  sends
        _counter = 0, id;
    // function selectedListValues(clickedli){
    //     clickedli.addClass('selected');
    // }
    function search(input, config) {
        var stringTemp = '';
        filter = input.toUpperCase();
        $('#' + config.id).find('ul.search-list').empty();
        for (var i = 0; i < config.data.length; i++) {
            // check if the value also exists in config.selectedValues
            if (!input || ((config.data[i].value.toUpperCase().search(filter) > -1 || config.data[i].key.search(filter) > -1))) {
                if (($.inArray(config.data[i].value, config.selectedValues) < 0)) {
                    stringTemp += '<li class="list"  value=' + config.data[i].value + '  key=' + config.data[i].key + '><span>' + config.data[i].value + '</span></li>';
                }//adding the class selecetd to add color to the clicked listitem 
                else {
                    stringTemp += '<li class="list selected"  value=' + config.data[i].value + '  key=' + config.data[i].key + '><span>' + config.data[i].value + '</span></li>';
                }
            }
        }
        $('#' + config.id).find('ul.search-list').append(stringTemp);
    }
    function buttonClicked(searchbuttonClick) {
        var isDropdownHidden = false;
        if (searchbuttonClick.closest('div.dropdown-wrapper').find('ul.search-list').hasClass('hide')) {
            isDropdownHidden = true;
        }
        $(document).find('ul.search-list').addClass('hide');
        if (isDropdownHidden) {
            searchbuttonClick.closest('div.dropdown-wrapper').find('ul.search-list').removeClass('hide');
        }
    }

    $(document).ready(function () {
        var itemValue, selectedItems;
        $(document.body).on('click', '.delete-item', function (e) {
            dropdownid = $(this).closest('div.dropdown-wrapper').attr('id');
            itemValue = $(this).parent('span').attr('value');
            $(this).parent('span').remove();
            selectedItems = _configList[dropdownid].selectedValues;
            selectedItems.splice($.inArray(itemValue, selectedItems), 1);
            search('', _configList[dropdownid]);
        });

        $(".search-container button.searchbutton").on("click", function (e) {//to hide all dropdowns when one is opened.and also to open and close the dropdown when clicked on button.
            e.stopPropagation();
            buttonClicked($(this));
        });
        $('.search-container .multiple-wrapper').on("click", function (e) {
            e.stopPropagation();
            buttonClicked($(this));
        });
        $(".search-container input").on("keyup", function (e) {
            var input, filter, i, dropdownid;
            e.stopPropagation();
            if ($(this).closest('div.dropdown-wrapper').find('ul.search-list').is(':hidden')) {
                buttonClicked($(this));
            }
            input = $(this).val(); // getting entered input value
            dropdownid = $(this).closest('div.dropdown-wrapper').attr('id');//getting config id
            search(input, _configList[dropdownid]);
        });



        $('.dropdown-wrapper ul.search-list').on('click', 'li', function () {
            var listValue, inputId, k, wrapperId, selectedItems;
            listValue = $(this).attr('value');
            wrapperId = $(this).closest('div.dropdown-wrapper').attr('id');
            // $(this).closest('div.dropdown-wrapper').find('input.search').val(listValue);
            //  inputId = $(this).closest('div.dropdown-wrapper').find('input.search');
            if ($.inArray(listValue, _configList[wrapperId].selectedValues) < 0) {
                _configList[wrapperId].selectedValues.push(listValue);
                if (_configList[wrapperId].multiSelect) {
                    $(this).closest('div.dropdown-wrapper').find('span.multiple').append(`<span class=selected-` + (listValue) + ` value=` + listValue + `>` + listValue + `<button class='delete-item'><i class="fa fa-window-close"></button></span>`);
                }
                else {
                    $(this).closest('div.dropdown-wrapper').find('span.multiple').empty();
                    $(this).closest('div.dropdown-wrapper').find('span.multiple').append(`<span class=selected-` + (listValue) + ` value=` + listValue + `>` + listValue + `<button class='delete-item'><i class="fa fa-window-close"></button></span>`);
                    $(this).addClass('selected');
                }
                $(this).closest('div.dropdown-wrapper').find('input.search').val('');
                // push the selected value to configlist selectedValue
                if (_configList[wrapperId].callback) {
                    for (k = 0; k < _configList[wrapperId].data.length; k++) {   
                        if (_configList[wrapperId].data[k].value === listValue)
                            _configList[wrapperId].callback(_configList[wrapperId].data[k].key);
                    }
                }
            }
            else {//to remove spans when clicked on li if it is already present in input div

                $(this).closest('div.dropdown-wrapper').find('span.multiple').find(`span.selected-` + listValue + ``).remove();
                selectedItems = _configList[wrapperId].selectedValues;
                selectedItems.splice($.inArray(itemValue, selectedItems), 1);
                $(this).closest('div.dropdown-wrapper').find('input.search').val('');
            }
            listValue = '';
            search(listValue, _configList[wrapperId]);//to get total ul when no input is there after the first search.
        });

    });
    $(document).click(function () {
        $(".dropdown-wrapper ul.search-list").addClass('hide');   /* Anything that gets to the document will hide the dropdown */

    });
    $(".dropdown-wrapper ul.search-list").click(function (e) { /* Clicks within the dropdown won't make   it past the dropdown itself */
        e.stopPropagation();
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
