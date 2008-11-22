// ==UserScript==
// @name          Say No TO 1890
// @namespace     http://www.17od.com/gmscripts/
// @description   Decorates non-geographic numbers such as 1890 and 1850 with a geographic alternative
// ==/UserScript==

// Add a 'unique' function to Array that returns a new array with all this 
// array's unique entries
Array.prototype.unique = function () {
    var r = new Array();
    o:for (var i = 0, n = this.length; i < n; i++) {
        for (var x = 0, y = r.length; x < y; x++) {
            if (r[x] == this[i]) {
                continue o;
            }
        }
        r[r.length] = this[i];
    }
    return r;
}

// Add the CSS styles we'll use to create a popup
GM_addStyle('a.nonGeoNumber + span {' +
            '  display: none;' +
            '}' +
            'a.nonGeoNumber:hover + span {' +
            '  padding: 3px;' +
            '  margin-left: 8px;' +
            '  width: 250px;' +
            '  display: inline;' +
            '  position: absolute;' +
            '  background: #AADAE5;' +
            '  border: 1px solid #1A57A1;' +
            '  color: #000000;' +
	    '  letter-spacing: normal;' +
	    '  line-height: normal;' +
            '}');

// This object literal associates a URL with an array. The array contains a list
// of the non-geographic numbers and associated geographic numbers.
var websiteNumbers = {
                  'www.aib.ie': [['1890 242 424', '01 6670024'],
                                 ['1890 474 747', '01 7726630']],
       'www.angloirishbank.ie': [['1850 44 22 22', '01 6162494']],
        'www.bankofireland.ie': [['1890 818 265', '01 4606445'],
                                 ['1890 706 706', '056 7757007'],
                                 ['1850 753 357', '01 661 5933'],
                                 ['1890 365 365', '01 4044470'],
                                 ['1890 251 251', '056 775 7747 or 01 6798433'],
                                 ['1890 604 604', '01 462 0222 or 01 703 9800']],
                'www.ifsra.ie': [['1890 77 77 77', '01 410 4000']],
   'www.financialombudsman.ie': [['1890 88 20 90', '01 662 0899']],
              'www.halifax.ie': [['1890 86 68 86', '042 931 0600']],
                  'www.nib.ie': [['1850 700 221', '01 6612822']],
 'www.northernrock-ireland.ie': [['1850 315 115', '01 6020324']],
         'www.permanenttsb.ie': [['1890 500 121', '01 2124101'],
                                 ['1890 241 224', '01 2124299']],
             'www.postbank.ie': [['1890 30 30 40', '0906 441 930']],
                'www.tesco.ie': [['1850 520 520', '01 280 8441'],
                                 ['1850 640 640', '021 4527465']],
           'www.ulsterbank.ie': [['1890 924 257', '01 7025244'],
                                 ['1850 424 365', '01 8047475']],
                  'www.123.ie': [['1890 221 123', '01 299 9500']],
              'www.allianz.ie': [['1850 484 848', '01 6133844']],
    'www.bankofirelandlife.ie': [['1850 309 309', '01 7039537']],
                  'www.fbd.ie': [['1890 617 617', '01 4093200']],
            'www.hibernian.ie': [['1890 33 55 77', '091 525311'],
                                 ['1890 33 22 11', '091 525 311']],
               'www.insure.ie': [['1850 43 43 43', '01 2932300']],
            'www.onedirect.ie': [['1890 22 11 11', '0906 487300']],
        'www.quinn-direct.com': [['1890 89 1890', '049 436 8100 or 049 436 8475'],
                                 ['1890 700 890', '025 42121 or 025 42100']],
            'www.quoteline.ie': [['0818 22 44 33', '042 9359051']],
          'www.vivashealth.ie': [['1850 71 77 17', '01 6193620']],
                  'www.vhi.ie': [['1850 44 44 44', '056 7753200 or 01 8724499']],
                  'www.cso.ie': [['1890 313 414', 'Cork: 021 4535000 ext. 5028/5029<br>Dublin: 01 4984000']],
               'www.comreg.ie': [['1890 229 668', '01 8049600']],
       'www.dataprotection.ie': [['1890 252 231', '057 8684800']],
               'www.entemp.ie': [['1890 201 616', '01 417 5333']],
          'www.drivingtest.ie': [['1890 40 60 40', '096 78289']],
   'www.financialregulator.ie': [['1890 77 77 77', '01 410 4000']],
   'www.financialombudsman.ie': [['1890 88 20 90', '01 662 0899']],
                'www.garda.ie': [['1890 30 40 60', '01 666 8500']],
           'www.groireland.ie': [['1890 252 076', '090 663 2900']],
     'www.employmentrights.ie': [['1890 80 80 90', '059 917 8990']],
            'ombudsman.gov.ie': [['1890 22 30 30', '01 639 5600']],
                 'www.dsfa.ie': [['1890 747 434', '01 874 8444 or 01 673 2800'],
                                 ['1890 400 400', '074 916 4496 or 074 916 4480 or 01 704 3000'],
                                 ['1890 690 690', '074 916 4491 or 01 704 3000 Ext 44491'],
                                 ['1890 500 000', '071 916 9800 or 01 704 3000'],
                                 ['1890 66 22 44', '071 919 3300']],
            'www.aerlingus.ie': [['0818 365000', '01 886 8888']],
          'www.blacknight.com': [['1850 929 929', '059 9183072']],
           'www.buyandsell.ie': [['0818 43 43 43', '01 6080808']],
     'www.dayshotelgalway.com': [['1890 329 329', '01 6391136 or 091 381 200']],
                 'www.dell.ie': [['1850 333 200', '01 279 5000']],
                  'www.dhl.ie': [['1890 725 725', '01 8700700']],
              'www.digiweb.ie': [['1890 940 405', '042 939 3300']],
             'www.eazypass.ie': [['1890 67 67 68', '01 4691257']],
                'www.eflow.ie': [['1890 50 10 50', '01 6602511']],
                'www.etrip.ie': [['1890 25 24 36', '01 8613200']],
        'www.irishferries.com': [['0818 300 400', '01 8552222']],
                'www.panda.ie': [['1850 62 62 62', '046 9024111']],
              'www.paypal.com': [['1890 943 220' ,'01 436 9001']],
             'www.perlico.com': [['1890 35 35 35', '01 2933500']],
              'www.ryanair.ie': [['0818 30 30 30', '01 2497791']],
       'www.sellityourself.ie': [['1850 66 33 33', '065 6868630']],
                 'www.toys.ie': [['1550 22 66 77', '091 743600']],
         'www.ticketmaster.ie': [['0818 719300', '01 4569569']],
      'bookings.parkmagic.net': [['0818 22 01 08', '061 311 422']],
 'www.bordgaisenergysupply.ie': [['1850 632 632', '01 8190395']],
                  'www.esb.ie': [['1850 372 372', '01 8529534']],
                   'www.o2.ie': [['1850 601747', '061 203345']],
              'www.perlico.ie': [['1890 35 35 35', '01 2933500']],
             'smarttelecom.ie': [['1890 945 300', '01 4699300']],
             'www.vodafone.ie': [['1850 20 87 87', '042 9385504']]
}

// Get the list of non-geographic and associated geographic numbers for the current host
var numbers = websiteNumbers[document.location.host];

if (numbers != null) {

    var newHTML = document.body.innerHTML;

    // Loop through each of the number pairs for this host and decorate each
    //  non-geographic with it's associated geographic number
    for (var i = 0; i < numbers.length; i++) {

        // Build a regexp pattern that's capable of matching the non-geographic number on a
        // webpage regardless of how many spaces are in it
        var searchForRegexpStr = numbers[i][0].replace(/ /g, '');
        var numberRegexp = new RegExp('(\\d)', 'g');
        var searchForRegexpStr = searchForRegexpStr.replace(numberRegexp, '$1\\s*');
        var searchForRegexp = new RegExp(searchForRegexpStr, 'g');

        // Use match to find all occurances of the number on the page
        // We dedupe the list of matches found (using a nwe unique function on Array)
        // so that we can replace them all in one go
        var numbersFound = document.body.innerHTML.match(searchForRegexp);
        if (numbersFound != null) {
            numbersFound = numbersFound.unique()
            for (var j = 0; j < numbersFound.length; j++) {
                var decoratedHTML = decorateNumber(numbersFound[j], numbers[i][1]);
                newHTML = newHTML.replace(new RegExp(numbersFound[j], 'g'), decoratedHTML);
            }
        }

    }

    document.body.innerHTML = newHTML;

}

// Decorate the given number with a popup containing a geographic number
function decorateNumber(oldNumber, newNumber) {
    var newHTML = '<a class="nonGeoNumber" href="http://www.saynoto1890.com" target="_blank">';
    newHTML += oldNumber;
    newHTML += '</a>';
    newHTML += '<span>'
    newHTML += '<span style="font-weight: bold">Alternative Number:</span><br>';
    newHTML += newNumber;
    newHTML += '<br><span style="font-size: 80%; font-weight: bold">SayNoTo1890.com</span>';
    newHTML += '</span></a>';
    return newHTML;
}

