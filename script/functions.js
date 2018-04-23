

$(document).ready(function () {

    var dropdownConfig = {}, key, str, value, states, countries, i ;
    function JSONstringifyWithFuncs(dropdownConfig) {
        Object.prototype.toJSON = function () {
            var sobj = {}, i;
            for (i in this)
                if (this.hasOwnProperty(i))
                    sobj[i] = typeof this[i] == 'function' ? this[i].toString() : this[i];
            return sobj;
        };
        str = JSON.stringify(dropdownConfig);
        delete Object.prototype.toJSON;
        return str;
    }
    states = [
        { key: 'TG', value: 'Telangana' },
        { key: 'AP', value: 'Andrapradesh' },
        { key: 'UP', value: 'UttarPradesh' },
        { key: 'AR', value: 'ArunachalPradesh' },
        { key: 'AS', value: 'Assam' },
        { key: 'BR', value: 'Bihar' },
        { key: 'CG', value: 'Chattisgarh' },
        { key: 'CD', value: 'Chandigarh' },
        { key: 'DH', value: 'DadraandNagarHaveli' },
        { key: 'DD', value: 'DamanandDiu' },
        { key: 'DL', value: 'Delhi' },
        { key: 'GA', value: 'Goa' },
        { key: 'GJ', value: 'Gujarat' },
        { key: 'HR', value: 'Haryana' },
        { key: 'HP', value: 'HimachalPradesh' },
        { key: 'JK', value: 'JammuandKashmir' },
        { key: 'JH', value: 'Jharkhand' },
        { key: 'KA', value: 'Karnataka' },
        { key: 'KL', value: 'Kerala' },
        { key: 'LD', value: 'Lakshadweep' },
        { key: 'MP', value: 'MadhyaPradesh' },
        { key: 'MH', value: 'Maharashtra' },
        { key: 'MN', value: 'Manipur' },
        { key: 'ML', value: 'Meghalaya' },
        { key: 'MZ', value: 'Mizoram' },
        { key: 'NL', value: 'Nagaland' },
        { key: 'OR', value: 'Odisha' },
        { key: 'PY', value: 'Puducherry' },
        { key: 'PB', value: 'Punjab' },
        { key: 'RJ', value: 'Rajasthan' },
        { key: 'SK', value: 'Sikkim' },
        { key: 'TN', value: 'TamilNadu' },
        { key: 'TR', value: 'Tripura' },
        { key: 'UK', value: 'Uttarakhand' },
        { key: 'WB', value: 'WestBengal' }
    ];

    countries = [
        { key: 'IN', value: 'India' },
        { key: 'ID', value: 'Indonesia' },
        { key: 'EG', value: 'Egypt' },
        { key: 'FR', value: 'France' },
        { key: 'GE', value: 'Germany' },
        { key: 'HU', value: 'Hungary' },
        { key: 'IL', value: 'Israel' },
        { key: 'IT', value: 'Italy' },
        { key: 'JP', value: 'Japan' },
        { key: 'MY', value: 'Malaysia' },
        { key: 'NP', value: 'Nepal' },
        { key: 'PL', value: 'Poland' },
        { key: 'US', value: 'UnitedStates' },
        { key: 'UK', value: 'UnitedKingdom' },
        { key: 'VE', value: 'Venezuela' },
        { key: 'TR', value: 'Turkey' },
        { key: 'UG', value: 'Uganda' },
        { key: 'TH', value: 'Thailand' },
        { key: 'FN', value: 'Finland' },

    ];
    dropdownConfig.id = 'show-states-here';
    dropdownConfig.data = states;
    dropdownConfig.multiSelect = true;
    dropdownConfig.callback = function (items) {
       var text='';
        for (i = 0; i < states.length; i++) {
            if ($.inArray(states[i].key,items)>=0){
                value = states[i].value;
                text += value+`  `; 
        } 
    }      
        $('#state-dropdown-config').find('#value').html(`<b>selected states:</b>`+text);
    }
    JSONstringifyWithFuncs(dropdownConfig);

    $('#state-dropdown-config').append('<div class="configObject">' + '<b>ConfigObject:</b>' + str + '</div>').append('<div id="value"></div>');
    // createDropdown(dropdownConfig);
    dropdownLib.createDropdown(dropdownConfig);
    dropdownConfig = {};
    dropdownConfig.id = 'show-countries-here';
    dropdownConfig.data = countries;
    dropdownConfig.multiSelect = false;
    // createDropdown(dropdownConfig);
    JSONstringifyWithFuncs(dropdownConfig);
    $('#country-dropdown-config').append('<div class="configObject">' + "<b>ConfigObject:</b>" + str + '</div>');
    dropdownLib.createDropdown(dropdownConfig);

});

