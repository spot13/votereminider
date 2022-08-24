/* Singleline functions
---------------------------------------------------------------- */

function $d(d) {
    return document.getElementById(d);
}

/* Booking
---------------------------------------------------------------- */

// booking.leaveprompt(false);

var booking = function() {

    // Global variables
    var firstday = 0,
        loadmore = true,
        timedconfirm = false,
        timedintv = null,
        sicltim = null,
        objform = null,
        finit = true,
        lodtim = null,
        lodrun = false,
        loddf = 0,
        lodtrw = 0,
        reqhigh = 0,
        chktim = 15,
        showleaveprompt = true;

    return {
        initialize: function() {

            // Attach
            $('.bookform .inp-t1 input, .bookform .inp-t2 textarea, .bookform .tel-t1 input').bind('click focus', function() { booking.inpfocus(this); return false; });
            $('.bookform .inp-t1 .label, .bookform .inp-t2 .label, .bookform .tel-t1 .label').bind('click', function() { booking.lblfocus(this); return false; });
            $('.bookform .inp-t1 input, .bookform .inp-t2 textarea, .bookform .tel-t1 input').bind('blur', function() { booking.inpblur(this); return false; });
            $('.bookform #add-guests-lnk a').bind('click', function() { booking.addguestsshow(this); return false; });
            $('.shareexp').bind('click', function() { booking.shareexp(this); return false; });
            $('.input-multiple-radios .radio').bind('click', function() { booking.radioclick(this); return false; });
            $('.consent-t1 .check').bind('click', function() { booking.consentclick(this); return false; });
            $('.consent-t1 .check a').bind('click', function() { booking.gotolink(this); return false; });
            $('#wrk-pop-t1 .btfdt').bind('click', function() { booking.wkrback(this); return false; });
            $('#booking-appts-types .bx-t1').bind('click', function() { booking.appttpgo(this); return false; });
            $('.webconferenceinfo .iwf').bind('click', function() { booking.wcfiexpand(this); return false; });

            // Appointment view
            $('#appointment-view .cancelapp').bind('click', function() { booking.cancelappshow(this); return false; });
            $('#cancelapp-pop .cancelpop').bind('click', function() { booking.cancelapphide(this); return false; });
            $('#cancelapp-pop #cancelappform').bind('submit', function() { return booking.cancelappconfirm(this); });
            $('#cancelapp-pop').click(function(event) { event.stopPropagation(); });

            // Appoint reschedule
            $('#booking-pick .cancelreschedule').bind('click', function() { booking.backtoevtdetails(this); return false; });
            $('#booking-bookform-changed .backtoreschedule').bind('click', function() { booking.backtoreschedule(this); return false; });

            // Timezone (date/time adjust)
            $('#booking-tzid .selp .sel').bind('click', function() { booking.tzidoptshow(this); return false; });
            $('#booking-tzid .address').keypress(function(e) {
                if (e.which == '13') {
                    booking.tzidgetaddress();
                    e.preventDefault();
                }
            });
            //$('#booking-tzid .submit').bind('click', function(){booking.tzidgetaddress();return false;});
            //$('#booking-tzid .apply').bind('click', function(){addresslookup.tzidapply(this);return false;});
            $('#booking-tzid .clc').bind('click', function() { booking.tzidclear(this); return false; });
            $('#booking-tzid #tzidlookup-known-items li').bind('click', function() { booking.tzidapply(this); return false; });
            $('#booking-tzid .switch input').bind('click', function() { booking.timeswitch(this); });
            $('#tzidlookup').click(function(event) { event.stopPropagation(); });

            // Reschedule button
            $('#appointment-view-opts .rescheduleapp').bind('click', function() { booking.setleaveprompt(false); });

            // Brand click
            $('.brand-t1-wrap .ribbon').bind('click', function() { booking.brandclick(this); return false; });

            // Consent required?
            if ($('#policy-notice').attr('data-consent-required') == 'true') {
                $('.bookform .submit').prop('disabled', true);
                $('.bookform .submit').addClass('disabled');
                $('.bookformedit .submit').prop('disabled', false);
                $('.bookformedit .submit').removeClass('disabled');
            } else {
                $('#policy-notice').addClass('passive');
            }

            // Try it now form
            $('.frtsignup').bind('submit', function() { booking.tryitnow(); });

            // Attach (read more links)
            $('.readmorelink').bind('click', function() { booking.readmore(this); return false; });

            // Truncate
            setTimeout(function() { booking.truncate(); }, 1);

            // Alarm?
            if ($('#appt-alarm').length) {
                booking.alarminit();
            }

            // Form
            $('.bookform').bind('submit', function() { return booking.validate(this); });

            // Prevent enter form submit
            $('.bookform input:not([type="submit"])').keydown(function(e) {
                if (e.keyCode == 13) {
                    var inputs = $(this).parents("form").eq(0).find(":input");
                    if (inputs[inputs.index(this) + 1] != null) {
                        inputs[inputs.index(this) + 1].focus();
                    }
                    e.preventDefault();
                    return false;
                }
            });

            // Get reCAPTCHA token
            // if ($('#booking-bookform form').length) {
            //     grecapform.run($('#booking-bookform form'), 'at_bookingform');
            // }

            // Phone input
            // fileload.load('/js/phoneinput/js/intlTelInput-jquery.min.js', 'js');
            // fileload.load('/js/phoneinput/css/intlTelInput.css', 'css');

            // Get country ISO
            var ciso = $('#calendarslots').attr('data-country-iso');
            if (ciso == '') { ciso = "US"; }

            // AM / 24h switch in time zone selector
            var rad_ampm24h = $('#togg_ampm24h').attr('data-value');
            if (rad_ampm24h == 'checked') { $('#togg_ampm24h').prop('checked', true); }

            // Phone number
            if ($(".inpphone").length) {

                // Initialize
                $(".inpphone").intlTelInput({
                    formatOnDisplay: true,
                    utilsScript: "/js/phoneinput/js/utils.js",
                    initialCountry: ciso
                });

                // Onchange country code
                $('.inpphone').bind('countrychange', function() {

                    // Get new dial code
                    var ndco = $(this).intlTelInput("getSelectedCountryData").dialCode;

                    // Update
                    $(this).closest(".tel-t1").find('.inpphonecountry').val(ndco);

                });

            }

            // Calendar setup
            booking.calendarsetup();

            // Attach
            $('#calendar-controle .calprev').bind('click', function() { booking.calprev(this); return false; });
            $('#calendar-controle .calnext').bind('click', function() { booking.calnext(this); return false; });

            // Convert links and email addresses to clickable links
            //setTimeout(function() { linkify.initialize(); }, 2);

            // Slots initialize
            booking.slotinit();

            // Initial setup
            booking.toggleviewmode();

            // Preloads
            booking.preloads();

        },
        slotinit: function() {

            // Attach
            $('#booking-pick .slots .slot').bind('click', function() { booking.slottoggle(this); });
            $('#booking-pick .slots .list').click(function(event) { event.stopPropagation(); });
            $('#booking-pick .slots .close').bind('click', function() { booking.hideslots(this); return false; });
            $('#booking-bookform .back').bind('click', function() { booking.backtoslots(this); return false; });

        },
        slottoggle: function(f) {

            // Reset
            if ($('#booking-pick .slots .selected').length) {
                $('#booking-pick .slots .slot').removeClass('selected');
            }

            // Set selected
            $(f).addClass('selected');

            // Unbind
            $(document).unbind(".slotitempck");

            // Timed
            setTimeout(function() {

                // Bind
                $(document).bind("click.slotitempck", function() { booking.slotresets(); });

            }, 200);

        },
        slotresets: function() {

            // Reset
            $('#booking-pick .slots .slot').removeClass('selected');

            // Unbind
            $(document).unbind(".slotitempck");

        },
        inpfocus: function(f) {

            // Get parent
            var obj = $(f).parents('.input');

            // Focus object
            $(obj).addClass('focus');

        },
        lblfocus: function(f) {

            // Get parent
            var obj = $(f).parents('.input');

            // Focus object
            $(obj).addClass('focus');

            // Any input?
            if ($(obj).find('input').length) {
                $(obj).find('input').focus();
            }

            // Any textarea?
            if ($(obj).find('textarea').length) {
                $(obj).find('textarea').focus();
            }

        },
        inpblur: function(f) {

            // Get parent
            var obj = $(f).parents('.input');

            // Validate field for content
            if (!booking.empty($(f).val())) {

                // No content
                $(obj).removeClass('focus');

            }

        },
        addguestsshow: function(f) {

            // Hide 
            $('#add-guests-lnk').css('display', 'none');

            // Show
            $('#add-guests-ctn').css('display', 'block');

            // Focus
            $('#add-guests-ctn textarea').focus();

        },
        cancelappshow: function(f) {

            // Unbind
            $(document).unbind(".cancelapppop");

            // Timed
            setTimeout(function() {

                // Bind
                $(document).bind("click.cancelapppop", function() { booking.cancelapphide(); });

            }, 200);

            // Show
            $('#cancelapp-pop').css('display', 'block');

            // Timed show
            setTimeout(function() {

                // Show
                $('#cancelapp-pop').addClass('show');

            }, 200);

            // Focus
            //$('#cancelapp-pop textarea').focus();

        },
        cancelapphide: function(f) {

            // Hide
            $('#cancelapp-pop').css('display', 'none');

            // Hide
            $('#cancelapp-pop').removeClass('show');

            // Unbind
            $(document).unbind(".cancelapppop");

        },
        cancelappconfirm: function(f) {

            // Set
            var execute = true;

            // Get field value
            var rea = $('#cancel-reason').val();
            var reo = $('#cancel-reason').closest(".input");

            // Validate empty
            if (!booking.empty(rea)) {

                // Set
                execute = false;

                // Error
                booking.validateerror(reo);

            }

            // Execute?
            if (execute) {

                // Get data
                var dat = $("#cancelappform").serialize();

                // Disable submit
                $('#cancelappform .submit').prop('disabled', true);
                $('#cancelappform .submit').addClass('loading');

                // Ajax
                $.ajax({
                    type: 'POST',
                    url: '/source/web/actions/meetings/appointment-cancel.php',
                    data: dat,
                    cache: false,
                    success: function(data) {

                        // Parse
                        var obj = jQuery.parseJSON(data);

                        // OK
                        if (obj.meta.code == '200') {

                            // Hide and disable
                            $('#appointment-view-canceled').css('display', 'block');
                            $('#appointment-view-details').addClass('disabled');
                            $('#appointment-view-details .list-t1').addClass('disabled strike');
                            $('#appointment-view-opts').css('visibility', 'hidden');

                            // Hide
                            booking.cancelapphide();

                            // Scroll to top
                            window.scrollTo(0, 0);

                            // Timed reload
                            setTimeout(function() {

                                // Redirect
                                //location.reload();

                            }, 500);

                        } else {

                            // Error
                            alert('Something went wrong. Please try again.');

                            // Redirect
                            setTimeout(function() {

                                // Redirect
                                location.reload();

                            }, 200);

                        }

                    },
                    error: function() {

                        // Error
                        //alert('An error has occurred. Please try again.');

                    }
                });

            }

            // Return
            return false;

        },
        radioclick: function(f) {

            // Get value
            var val = $(f).attr('data-value');

            // Reset
            $(f).closest(".input-multiple-radios").find('.radio').removeClass('checked');

            // Set
            $(f).addClass('checked');

            // Update
            $(f).closest(".input-multiple-radios").find('.radiovalue').val(val);

        },
        consentclick: function(f) {

            // Get value
            var val = $(f).attr('data-value');
            var req = $(f).attr('data-consent-required');

            // Break
            if ($(f).closest(".consent-t1").hasClass('passive')) {
                return false;
            }

            // Toggle
            if (val == 'false') {

                // Set
                $(f).addClass('checked');
                $(f).attr('data-value', 'true');
                $(f).closest(".consent-t1").find('.checkvalue').val('true');

                // Consent required
                if (req == 'true') {
                    $('.bookform .submit').prop('disabled', false);
                    $('.bookform .submit').removeClass('disabled');
                }

            } else {

                // Set
                $(f).removeClass('checked');
                $(f).attr('data-value', 'false');
                $(f).closest(".consent-t1").find('.checkvalue').val('false');

                // Consent required
                if (req == 'true') {
                    $('.bookform .submit').prop('disabled', true);
                    $('.bookform .submit').addClass('disabled');
                    $('.bookformedit .submit').prop('disabled', false);
                    $('.bookformedit .submit').removeClass('disabled');
                }

            }

        },
        appttpgo: function(f) {

            // Disable leave prompt
            booking.setleaveprompt(false);

            // Get app
            var uni = $(f).attr('data-app-url');
            var bas = $(f).attr('data-base-url');
            var que = $(f).attr('data-query');

            // Go to
            if (que != '') {
                location.href = '/' + bas + '/' + uni + '/' + que;
            } else {
                location.href = '/' + bas + '/' + uni;
            }

        },
        wcfiexpand: function(f) {

            // Add class
            $('.webconferenceinfo').addClass('expand');

        },
        gotolink: function(f) {

            // Get link
            var link = $(f).attr('href');

            // If not "#"
            if (link != '#') {

                // Open
                window.open(link);

            }

        },
        shareexp: function(f) {

            // Show
            $('.privacy').css('display', 'block');
            $('.privacy .expl').css('display', 'block');

        },
        toggleviewmode: function(f) {

            // View mode
            var vimo = $('#booking').attr('data-view-mode');

            // Status
            var vsta = $('#booking').attr('data-status');

            // Toggle
            if (vimo == 'apptlist') {

                // Show
                $('#booking-appts-types').css('display', 'block');

            } else if (vimo == 'new') {

                // Show
                $('#booking-content').css('display', 'block');
                $('#booking-pick').css('display', 'block');
                //$('#booking-tzid').css('display','block');

                // Hide
                $('#booking-bookform').css('display', 'none');

            } else if (vimo == 'details') {

                // Show
                $('#booking-content').css('display', 'block');
                $('#appointment-view').css('display', 'block');

                // Past event, remove options
                if (vsta == 'onnow' || vsta == 'past') {
                    $('#appointment-view-opts').remove();
                }

            } else if (vimo == 'reschedule') {

                // Show
                $('#booking-content').css('display', 'block');
                $('#booking-pick').css('display', 'block');
                //$('#booking-tzid').css('display','block');
                $('#booking-reschedule-header').css('display', 'block');

            } else if (vimo == 'cancelled') {

                // Show
                $('#booking-content').css('display', 'block');
                $('#appointment-view').css('display', 'block');

                // Remove
                $('#appointment-view-opts').remove();

                // Disable
                $('#appointment-view-canceled').css('display', 'block');
                $('#appointment-view-details').addClass('disabled');
                $('#appointment-view-details .list-t1').addClass('disabled strike');

            }

            // If one-time link (no cancel)
            if ($('#appointment-view').attr('data-otl-cancel') == 'false') {
                $('#appointment-view-opts .cancelapp').css('display', 'none');
            }

            // If one-time link (no reschedule)
            if ($('#appointment-view').attr('data-otl-reschedule') == 'false') {
                $('#appointment-view-opts .rescheduleapp').css('display', 'none');
            }

            // Remove container if both cancel + reschedule is disabled
            if ($('#appointment-view').attr('data-otl-cancel') == 'false' && $('#appointment-view').attr('data-otl-reschedule') == 'false') {
                $('#appointment-view-opts').css('display', 'none');
            }

        },
        backtoevtdetails: function() {

            // Show
            $('#booking-pick').css('display', 'none');
            $('#appointment-view').css('display', 'block');
            //$('#booking-tzid').css('display','none');

        },
        backtoreschedule: function() {

            // Show
            $('#booking-pick').css('display', 'block');
            //$('#booking-tzid').css('display','block');
            $('#booking-bookform-changed').css('display', 'none');

        },
        calprev: function(f) {

            // Disabled?
            if (!$(f).hasClass('disabled')) {

                // Get viewtype
                //var typ = $('#calendar-controle').attr('data-view-type');
                //var cal = $('#calendar-controle').attr('data-calendar');

                // Get current month and year
                var mon = $('#calendar-controle').attr('data-month');
                var yer = $('#calendar-controle').attr('data-year');
                var uni = $('#calendar-controle').attr('data-appid');
                var url = $('#calendar-controle').attr('data-app-url');
                var bas = $('#calendarslots').attr('data-base-url');

                // Integers
                mon = parseInt(mon);
                yer = parseInt(yer);

                // Next month or next month and year
                if (mon == 1) {
                    mon = 12;
                    yer = yer - 1;
                } else {
                    mon = mon - 1;
                }

                // Update
                $('#calendar-controle').attr('data-month', mon);
                $('#calendar-controle').attr('data-year', yer);

                // Load calendar
                booking.loadcalendar('prev');

                // Set
                mon = booking.l2(mon);

                // Change history
                window.history.pushState({ type: 'apptview', year: yer, month: mon, day: '' }, null, '/' + bas + '/' + url + '/?date=' + yer + '-' + mon);

            }

        },
        calnext: function(f) {

            // Disabled?
            if (!$(f).hasClass('disabled')) {

                // Get viewtype
                //var typ = $('#calendar-controle').attr('data-view-type');
                //var cal = $('#calendar-controle').attr('data-calendar');

                // Get current month and year
                var mon = $('#calendar-controle').attr('data-month');
                var yer = $('#calendar-controle').attr('data-year');
                var uni = $('#calendar-controle').attr('data-appid');
                var url = $('#calendar-controle').attr('data-app-url');
                var bas = $('#calendarslots').attr('data-base-url');

                // Integers
                mon = parseInt(mon);
                yer = parseInt(yer);

                // Next month or next month and year
                if (mon == 12) {
                    mon = 1;
                    yer = yer + 1;
                } else {
                    mon = mon + 1;
                }

                // Update
                $('#calendar-controle').attr('data-month', mon);
                $('#calendar-controle').attr('data-year', yer);

                // Load calendar
                booking.loadcalendar('next');

                // Set
                mon = booking.l2(mon);

                // Change history
                window.history.pushState({ type: 'apptview', year: yer, month: mon, day: '' }, null, '/' + bas + '/' + url + '/?date=' + yer + '-' + mon);

            }

        },
        loadcalendar: function(dir, year, month) {

            // Get calendar id
            var cid = $('#calendar-controle').attr('data-id');
            var tzi = $('#calendar-controle').attr('data-timezone');
            var mon = $('#calendar-controle').attr('data-month');
            var yer = $('#calendar-controle').attr('data-year');
            var csrf = $('#calendar-controle').attr('data-csrf');

            // Allowed?
            if (loadmore) {

                // Load type
                if (dir == 'prev' || dir == 'next') {

                } else {

                }

                // Calendar setup
                booking.calendarsetup();

            }

        },
        calendarsetup: function() {

            // Variables
            var M, D, pdy, pmo, pyr, yr, mo, bgn, d, html, dy, pos, ld, ctr, lmonth, lyear;

            // Get first day
            firstday = $('#calendar-controle').attr('data-firstday');

            // First day not defined?
            if (firstday == '0' || firstday == '1') {} else { firstday = 0; }

            // Reset main calendar
            $('#calendar').html('');

            // Get month + year
            lmonth = $('#calendar-controle').attr('data-month');
            lyear = $('#calendar-controle').attr('data-year');

            // Set month to javascript month
            lmonth = parseInt(lmonth) - 1;

            // Labels
            M = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
            MA = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");

            // Week labels
            if (firstday == '0') {
                D = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");
            } else {
                D = new Array("Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun");
            }

            // Set
            pdy = new Date(lyear, lmonth);

            // Present month
            pmo = pdy.getMonth();

            // Present year
            pyr = pdy.getYear();

            // Year 2000 fix
            if (pyr < 2000) {
                pyr = pyr + 1900;
            }

            // Present year
            yr = pyr;

            // Present month
            mo = pmo;

            // Assign to date
            bgn = new Date(yr, mo, 1);

            // Reset output
            html = '';

            // Get day (starts with sunday or monday)
            if (firstday == '0') {

                // Set day
                dy = bgn.getDay();

            } else {

                // Set day
                dy = bgn.getDay() == 0 ? 7 : bgn.getDay();

            }

            // Evaluate
            yr = eval(yr);

            // Days in months
            d = "312831303130313130313031";

            // Stuff
            if (yr / 4 == Math.floor(yr / 4)) {
                d = d.substring(0, 2) + "29" + d.substring(4, d.length);
            }

            // And stuff
            pos = (mo * 2);

            // And stuff
            ld = eval(d.substring(pos, pos + 2));

            // Collect
            html += '<table><tr>';

            // Reset
            ctr = 0;

            // Start at sunday or monday
            if (firstday == '0') {

                // Loop (first row)
                for (var i = 0; i < 7; i++) {
                    if (i < dy) {

                        // Collect
                        if (i == 0 || i == 6) {
                            html += '<td class="td1 blank weekend cl' + i + '"><div class="dna">' + D[i] + '</div>&nbsp;</td>';
                        } else {
                            html += '<td class="td1 blank cl' + i + '"><div class="dna">' + D[i] + '</div>&nbsp;</td>';
                        }

                    } else {

                        // Add
                        ctr++;

                        // Collect
                        if (i == 0 || i == 6) {
                            html += '<td class="td1 weekend ddok cl' + i + ' to' + booking.l2((mo + 1)) + booking.l2(ctr) + yr + '" data-month="' + booking.l2((mo + 1)) + '" data-day="' + booking.l2(ctr) + '" data-year="' + yr + '"><div class="dna">' + D[i] + '</div><div class="tnu"><span>' + ctr + '</span></div><div id="evts' + booking.l2((mo + 1)) + booking.l2(ctr) + yr + '" class="list"></div></td>';
                        } else {
                            html += '<td class="td1 ddok cl' + i + ' to' + booking.l2((mo + 1)) + booking.l2(ctr) + yr + '" data-month="' + booking.l2((mo + 1)) + '" data-day="' + booking.l2(ctr) + '" data-year="' + yr + '"><div class="dna">' + D[i] + '</div><div class="tnu"><span>' + ctr + '</span></div><div id="evts' + booking.l2((mo + 1)) + booking.l2(ctr) + yr + '" class="list"></div></td>';
                        }

                    }
                }

                // Collect
                html += '</tr><tr>';

                // Loop
                while (ctr < ld) {
                    for (var i = 0; i < 7; i++) {

                        // Add
                        ctr++;

                        // Collect
                        if (ctr > ld) {
                            if (i == 0 || i == 6) {
                                html += '<td class="td2 blank weekend cl' + i + '"><div class="dna">' + D[i] + '</div>&nbsp;</td>';
                            } else {
                                html += '<td class="td2 blank cl' + i + '"><div class="dna">' + D[i] + '</div>&nbsp;</td>';
                            }
                        } else {
                            if (i == 0 || i == 6) {
                                html += '<td class="td2 weekend ddok cl' + i + ' to' + booking.l2((mo + 1)) + booking.l2(ctr) + yr + '" data-month="' + booking.l2((mo + 1)) + '" data-day="' + booking.l2(ctr) + '" data-year="' + yr + '"><div class="dna">' + D[i] + '</div><div class="tnu"><span>' + ctr + '</span></div><div id="evts' + booking.l2((mo + 1)) + booking.l2(ctr) + yr + '" class="list"></div></td>';
                            } else {
                                html += '<td class="td2 ddok cl' + i + ' to' + booking.l2((mo + 1)) + booking.l2(ctr) + yr + '" data-month="' + booking.l2((mo + 1)) + '" data-day="' + booking.l2(ctr) + '" data-year="' + yr + '"><div class="dna">' + D[i] + '</div><div class="tnu"><span>' + ctr + '</span></div><div id="evts' + booking.l2((mo + 1)) + booking.l2(ctr) + yr + '" class="list"></div></td>';
                            }
                        }
                    }

                    // Collect
                    html += '</tr><tr>';

                }

            } else {

                // Loop (first row)
                for (var i = 1; i <= 7; i++) {
                    if (i < dy) {

                        // Collect
                        if (i == 6 || i == 7) {
                            html += '<td class="td1 blank weekend cl' + i + '"><div class="dna">' + D[i - 1] + '</div>&nbsp;</td>';
                        } else {
                            html += '<td class="td1 blank cl' + i + '"><div class="dna">' + D[i - 1] + '</div>&nbsp;</td>';
                        }

                    } else {

                        // Add
                        ctr++;

                        // Collect
                        if (i == 6 || i == 7) {
                            html += '<td class="td1 weekend ddok cl' + i + ' to' + booking.l2((mo + 1)) + booking.l2(ctr) + yr + '" data-month="' + booking.l2((mo + 1)) + '" data-day="' + booking.l2(ctr) + '" data-year="' + yr + '"><div class="dna">' + D[i - 1] + '</div><div class="tnu"><span>' + ctr + '</span></div><div id="evts' + booking.l2((mo + 1)) + booking.l2(ctr) + yr + '" class="list"></div></td>';
                        } else {
                            html += '<td class="td1 ddok cl' + i + ' to' + booking.l2((mo + 1)) + booking.l2(ctr) + yr + '" data-month="' + booking.l2((mo + 1)) + '" data-day="' + booking.l2(ctr) + '" data-year="' + yr + '"><div class="dna">' + D[i - 1] + '</div><div class="tnu"><span>' + ctr + '</span></div><div id="evts' + booking.l2((mo + 1)) + booking.l2(ctr) + yr + '" class="list"></div></td>';
                        }

                    }
                }

                // Collect
                html += '</tr><tr>';

                // Loop
                while (ctr < ld) {
                    for (var i = 1; i <= 7; i++) {

                        // Add
                        ctr++;

                        // Collect
                        if (ctr > ld) {
                            if (i == 6 || i == 7) {
                                html += '<td class="td2 blank weekend cl' + i + '"><div class="dna">' + D[i - 1] + '</div>&nbsp;</td>';
                            } else {
                                html += '<td class="td2 blank cl' + i + '"><div class="dna">' + D[i - 1] + '</div>&nbsp;</td>';
                            }
                        } else {
                            if (i == 6 || i == 7) {
                                html += '<td class="td2 weekend ddok cl' + i + ' to' + booking.l2((mo + 1)) + booking.l2(ctr) + yr + '" data-month="' + booking.l2((mo + 1)) + '" data-day="' + booking.l2(ctr) + '" data-year="' + yr + '"><div class="dna">' + D[i - 1] + '</div><div class="tnu"><span>' + ctr + '</span></div><div id="evts' + booking.l2((mo + 1)) + booking.l2(ctr) + yr + '" class="list"></div></td>';
                            } else {
                                html += '<td class="td2 ddok cl' + i + ' to' + booking.l2((mo + 1)) + booking.l2(ctr) + yr + '" data-month="' + booking.l2((mo + 1)) + '" data-day="' + booking.l2(ctr) + '" data-year="' + yr + '"><div class="dna">' + D[i - 1] + '</div><div class="tnu"><span>' + ctr + '</span></div><div id="evts' + booking.l2((mo + 1)) + booking.l2(ctr) + yr + '" class="list"></div></td>';
                            }
                        }
                    }

                    // Collect
                    html += '</tr><tr>';

                }

            }

            // Collect
            html += '</tr></table>';

            // Append
            $('#calendar').html(html);

            // Remove last row
            $('#calendar').find('tr:last').remove();

            // Update month year label
            $('#month-lbl').text(M[mo] + ' ' + yr);
            $('#notim-mo').text(M[mo]);

            // Today
            var cdte = new Date();

            // Set day variable
            var xcdy = booking.l2(cdte.getDate());
            var xcmo = booking.l2(cdte.getMonth() + 1);
            var xcyr = cdte.getFullYear();

            // Markup day
            $('.to' + xcmo + xcdy + xcyr).addClass('currentday');

            // Get events and apply to calendar view
            //booking.slotsincalendar();
            booking.slotsincalendarcheck(true);

            // Show / hide slots
            $('#slots').css('display', 'none');
            $('#slots-select-date').css('display', 'block');

            // Disable moving back if in same month + year
            if (booking.l2(xcmo) == booking.l2(lmonth + 1) && (xcyr == lyear)) {
                $('#calendar-controle .calprev').addClass('disabled');
            } else {
                $('#calendar-controle .calprev').removeClass('disabled');
            }

        },
        slotsincalendar: function(reac) {

            // Get current month and year
            var mon = $('#calendar-controle').attr('data-month');
            var yer = $('#calendar-controle').attr('data-year');

            // Any month year?
            if (mon != '' && yer != '') {

                // Integers
                mon = booking.l2(parseInt(mon));
                yer = parseInt(yer);

                // Get cookies
                var tifm = $('#calendarslots').attr('data-timeformat');
                var utzi = $('#calendarslots').attr('data-timezone');

                // Get appt ID
                var apid = $('#calendar-controle').attr('data-appid');

                // Get cookie values (if any)
                var cook_tifm = booking.cookieread('meeting_timeformat');
                var cook_utzi = booking.cookieread('meeting_timezone');

                // Override with cookie value?
                if (cook_tifm != '' && cook_tifm != 'false') { tifm = cook_tifm; }
                if (cook_utzi != '' && cook_utzi != 'false') { utzi = cook_utzi; }

                // Hide "no times" available
                $('#notim').css('display', 'none');

                // Times found counter
                var slco = 0;

                // Does the month already exists?
                if (!$('#calendarslots .mo' + yer + mon).length) {

                    // Set calendar date
                    var caldate = yer + '-' + mon + '-01';

                    // Set data
                    var dat = 'unique=' + apid + '&calendar_date=' + encodeURIComponent(caldate) + '&timeformat=' + encodeURIComponent(tifm) + '&timezone=' + encodeURIComponent(utzi) + '&refreshcals=true';

                    // Clear load timer
                    clearTimeout(lodtim);

                    // Load (type #1)
                    lodtim = setTimeout(function() {
                        booking.loaderon('2');
                    }, 100);

                    // Remove any marked up available days (if any)
                    if (reac) {

                        // Remove classes
                        $('#calendar .ddok').removeClass('available vison active');

                        // Unbind clicks
                        $('#calendar .ddok').unbind();

                        // Hide slots
                        booking.hideslots();

                    }

                    // Ajax
                    $.ajax({
                        type: 'GET',
                        url: '/source/web/templates/ajax_meetings_available_times.php',
                        data: dat,
                        cache: false,
                        success: function(data) {

                            // Append
                            $('#calendarslots').append(data);

                            // Delayed
                            var dly = 100;

                            // Get items
                            $('#calendarslots .mo' + yer + mon + ' .day').each(function() {

                                // Get month + year from list
                                var cday = $(this).attr('data-day');
                                var cmon = $(this).attr('data-month');
                                var cyer = $(this).attr('data-year');
                                var avc = $(this).attr('data-items-available');
                                var ddl = $(this).attr('data-date-lbl');

                                // Any available this day
                                if (avc > 0) {

                                    // Add available to calendar
                                    $('#calendar .to' + cmon + cday + cyer).addClass('available');
                                    $('#calendar .to' + cmon + cday + cyer).attr('data-date-lbl', ddl);

                                    // Add
                                    dly = dly + 20;
                                    slco++;

                                    // Timed
                                    setTimeout(function() {
                                        $('#calendar .to' + cmon + cday + cyer).addClass('vison');
                                    }, dly);

                                }

                            });

                            // Bind
                            $('#calendar .available').bind('click', function() { booking.slotsavailableshow(this); return false; });

                            // Any specific preselected day?
                            if ($('#calendar-controle').attr('data-specific') != '') {

                                // Invoke click
                                $('#calendar .to' + $('#calendar-controle').attr('data-specific')).click();

                                // Any specific time?
                                if ($('#calendar-controle').attr('data-time') != '') {

                                    // Get time
                                    var ptim = $('#calendar-controle').attr('data-time');

                                    // Set
                                    var ptimobj = null;

                                    // Loop available slot for the day
                                    $('#slots-list .slot').each(function() {

                                        // Get ID
                                        var slslid = $(this).attr('data-id');

                                        // Match?
                                        if (slslid == ptim) {

                                            // Set object
                                            ptimobj = $(this);

                                        }

                                    });

                                    // If any object
                                    if (ptimobj) {

                                        // Timed click
                                        setTimeout(function() {

                                            // Invoke specific time
                                            $(ptimobj).find('.confirm').click();

                                        }, 50);

                                    }

                                }

                            }

                            // Reset
                            $('#calendar-controle').attr('data-specific', '');

                            // Hide
                            setTimeout(function() {

                                // Load
                                booking.loaderoff();

                                // Show "no times"?
                                if (slco == '0') {
                                    $('#notim').css('display', 'block');
                                }

                            }, 800);

                            // Reinvoke active? (if any)
                            if (reac) {

                                // Get active
                                var ractx = $('#calendar .active');

                                // Remove active
                                $(ractx).removeClass('active');

                                // Click
                                $(ractx).click();

                            }

                        },
                        error: function() {

                            // Error
                            //alert('An error has occurred. Please try again.');

                        }
                    });

                } else {

                    // Get items
                    $('#calendarslots .mo' + yer + mon + ' .day').each(function() {

                        // Get month + year from list
                        var cday = $(this).attr('data-day');
                        var cmon = $(this).attr('data-month');
                        var cyer = $(this).attr('data-year');
                        var avc = $(this).attr('data-items-available');
                        var ddl = $(this).attr('data-date-lbl');

                        // Any available this day
                        if (avc > 0) {

                            // Add available to calendar
                            $('#calendar .to' + cmon + cday + cyer).addClass('available');
                            $('#calendar .to' + cmon + cday + cyer).attr('data-date-lbl', ddl);
                            //$('#calendar .to'+cmon+cday+cyer).addClass('visno');
                            $('#calendar .to' + cmon + cday + cyer).addClass('vison');

                            // Add
                            slco++;

                        }

                    });

                    // Bind
                    $('#calendar .available').bind('click', function() { booking.slotsavailableshow(this); return false; });

                    // Show "no times"?
                    if (slco == '0') {
                        $('#notim').css('display', 'block');
                    }

                }

            }

        },
        slotsavailableshow: function(f) {

            // Already active?
            if (!$(f).hasClass('active')) {

                // Show / hide
                $('#slots').css('display', 'block');
                $('#slots-select-date').css('display', 'none');

                // Reset
                $('#calendar .active').removeClass('active');

                // Set active
                $(f).addClass('active');

                // Get date lbl
                var dtl = $(f).attr('data-date-lbl');

                // Update label
                $('#slots-selected-day').text(dtl);

                // Get day variables
                var imon = $(f).attr('data-month');
                var iday = $(f).attr('data-day');
                var iyer = $(f).attr('data-year');

                // Reset
                $('#slots-list ul').html('');

                // Reset scroll top
                $('#tzidlookup .list').scrollTop(0);

                // Get time slot days in list
                $('#calendarslots .dy' + imon + iday + iyer + ' .slot').each(function() {

                    // Get variables
                    //var sfr = $(this).attr('data-from');
                    //var sto = $(this).attr('data-to');
                    var sti = $(this).attr('data-time');
                    var fid = $(this).attr('data-id');
                    var ava = $(this).attr('data-available');

                    // Available?
                    if (ava == 'true') {

                        // Append				
                        $('#slots-list ul').append('<li class="slot" data-time="' + sti + '" data-id="' + fid + '"><div class="time">' + sti + '</div><div class="confirm">Confirm</div></li>');

                    }

                });

                // Attach
                //$('#booking-pick .slots .slot').bind('click', function() { booking.slottoggle(this); });
                $('#booking-pick .slots .slot .confirm').bind('click', function() { booking.slotconfirm(this); });

                // Get app id
                var uni = $('#calendar-controle').attr('data-appid');
                var url = $('#calendar-controle').attr('data-app-url');
                var bas = $('#calendarslots').attr('data-base-url');

                // Set
                imon = booking.l2(imon);
                iday = booking.l2(iday);

                // Change history
                //window.history.pushState({ type: 'apptitem', year: iyer, month: imon, day: iday }, null, '/' + bas + '/' + url + '/?date=' + iyer + '-' + imon + '-' + iday);

            }

        },
        slotconfirm: function(f) {

            // View mode
            var vimo = $('#booking').attr('data-view-mode');

            // Get app id
            var uni = $('#calendar-controle').attr('data-appid');
            var url = $('#calendar-controle').attr('data-app-url');
            var bas = $('#calendarslots').attr('data-base-url');

            // Get parent
            var slo = $(f).parents('.slot');

            // Get ID
            var fid = $(slo).attr('data-id');

            // Toggle
            if (vimo == 'new') {

                // Hide
                $('#booking-pick').css('display', 'none');
                //$('#booking-tzid').css('display','none');

                // Show
                $('#booking-bookform').css('display', 'block');

                // Timed focus
                setTimeout(function() {

                    // Focus first input
                    $('.bookformnew .input input').first().focus();

                }, 500);

                // Change history
                //window.history.pushState({ type: 'apptbook', bookid: fid }, null, '/' + bas + '/' + url + '/book/?i=' + fid);

            } else if (vimo == 'reschedule') {

                // Hide
                $('#booking-pick').css('display', 'none');
                //$('#booking-tzid').css('display','none');

                // Show
                $('#booking-bookform-changed').css('display', 'block');

                // Focus first input
                $('.bookformedit .input textarea').first().focus();

                // Change history
                window.history.pushState({ type: 'apptbook', bookid: fid }, null, '/' + bas + '/' + url + '/book/?i=' + fid);

            }

            // Get slot data
            var sltlbl = $('#sl-' + fid).attr('data-slot-lbl');
            var sltfrm = $('#sl-' + fid).attr('data-from-unix');
            var sltto = $('#sl-' + fid).attr('data-to-unix');

            // Update confirm slot time
            $('.conf-t1-time').text(sltlbl);
            $('.frm_time_from').val(sltfrm);
            $('.frm_time_to').val(sltto);

        },
        backtoslots: function() {

            // Show
            $('#booking-pick').css('display', 'block');
            //$('#booking-tzid').css('display','block');

            // Show
            $('#booking-bookform').css('display', 'none');

        },
        hideslots: function() {

            // Show / hide slots
            $('#slots').css('display', 'none');
            $('#slots-select-date').css('display', 'block');

            // Remove active
            $('#calendar .active').removeClass('active');

        },
        l2: function(str) {

            // Variables
            var nst = str;

            // Number
            var n = parseInt(str);

            if (n <= 9) {
                nst = '0' + n;
            } else {
                nst = n;
            }

            // Return
            return nst;

        },
        validate: function(f) {

            // Reset
            $('.bookform .warnings').removeClass('warnings');
            $('.bookform .warningsxt').removeClass('warningsxt');

            // Variables
            var execute = true,
                payment_err = false;

            // Get mode
            var mod = $(f).attr('data-mode');

            // Get input fields in form
            $(f).find('.input').each(function() {

                // Mandatory?
                var man = $(this).hasClass('mandatory');

                // Validate field?
                if (man) {

                    // Text field
                    if ($(this).hasClass('input-text')) {

                        // Get field value
                        var val = $(this).find('input').val();

                        // Validate empty
                        if (!booking.empty(val)) {

                            // Set
                            execute = false;

                            // Error
                            booking.validateerror(this);

                        }

                    }

                    // Description field
                    if ($(this).hasClass('input-desc')) {

                        // Get field value
                        var val = $(this).find('textarea').val();

                        // Validate empty
                        if (!booking.empty(val)) {

                            // Set
                            execute = false;

                            // Error
                            booking.validateerror(this);

                        }

                    }

                    // Number field
                    if ($(this).hasClass('input-number')) {

                        // Get field value
                        var val = $(this).find('input').val();

                        // Validate empty
                        if (!booking.empty(val)) {

                            // Set
                            execute = false;

                            // Error
                            booking.validateerror(this);

                        }

                    }

                    // Email field
                    if ($(this).hasClass('input-email')) {

                        // Get field value
                        var val = $(this).find('input').val();

                        // Validate empty
                        if (!booking.email(val)) {

                            // Set
                            execute = false;

                            // Error
                            booking.validateerror(this);

                        }

                    }

                    // Select field
                    if ($(this).hasClass('input-multiple-select')) {

                        // Get field value
                        var val = $(this).find('select').val();

                        // Validate empty
                        if (!booking.empty(val)) {

                            // Set
                            execute = false;

                            // Error
                            booking.validateerror(this);

                        }

                    }

                    // Radios fields
                    if ($(this).hasClass('input-multiple-radios')) {

                        // Get field value
                        var val = $(this).find('.radiovalue').val();

                        // Validate empty
                        if (!booking.empty(val)) {

                            // Set
                            execute = false;

                            // Error
                            booking.validateerror(this);

                        }

                    }

                    // Date field
                    if ($(this).hasClass('input-date')) {

                        // Get field value
                        var mon = $(this).find('.month select').val();
                        var day = $(this).find('.day select').val();
                        var yer = $(this).find('.year select').val();

                        // Validate empty
                        if (!booking.empty(mon) || !booking.empty(day) || !booking.empty(yer)) {

                            // Set
                            execute = false;

                            // Error
                            booking.validateerror(this);

                        }

                    }

                }

            });

            // Edit mode
            if (mod == 'edit') {

                // Get field value
                var rea = $('#change-reason').val();
                var reo = $('#change-reason').closest(".input");

                // Validate empty
                if (!booking.empty(rea)) {

                    // Set
                    execute = false;

                    // Error
                    booking.validateerror(reo);

                }

            }

            // Grap the entered email address, apply to sign up form
            $('.email-enter .email-enter-input').val($('#booking-bookform #email').val());

            // Get location
            var ploc = $('#booking-bookform .locas .checked .lbl strong').text();

            // No location
            if (ploc == '') { ploc = 'No location'; }

            // Get selected location, if any, update location
            $('.conf-t1-location').text(ploc);

            // Any errors, focus
            if (!execute) {

                // Top of first field that needs to filled out
                var t = 0;

                // Get first in form error
                $(f).find('.warningsxt').each(function() {

                    // Get field top
                    t = $(this).offset().top - 30;

                    // Break loop
                    return false;

                });

                // Payment error?
                if (payment_err) {

                    // Get payment form
                    if ($('.papyfrm-t1').length) {
                        t = $('.papyfrm-t1').offset().top - 30;
                    }

                }

                // Get window and scroll position
                var wh = $(window).height();
                var st = $(document).scrollTop();

                // Scroll to error field if not in window view
                if (t >= st && t <= wh + st) {

                    // OK - error field is within window view

                } else {

                    // Scroll to error
                    window.scrollTo(0, t);

                }

            }

            // Execute
            if (execute) {

                // Remove warnings
                $('.warnings').css('display', 'none');

                // Disable submit
                $('.bookform .submit').prop('disabled', true);
                $('.bookform .submit').addClass('loading');

                // Show loading (init)
                if (mod == 'edit') {
                    booking.wkrshow('resch', true);
                } else {
                    booking.wkrshow('sch', true);
                }

                // Save
                //booking.validatesave(f);
                booking.slotsincalendarrecheckinit(f);

                // Save form
                objform = f;

            }

            // Return
            return false;

        },
        validatesave: function(f) {

            // Variables
            var execute = true,
                payment_err = false;

            // Get mode
            var mod = $(f).attr('data-mode');

            // Get data
            var dat = $(f).serialize();

        },
        validateconfirmed: function(mod) {

            // Hide
            booking.wkrhide();

            // Timed confirm
            setTimeout(function() {

                // Scroll to top
                window.scrollTo(0, 0);

                // Toggle confirms
                if (mod == 'edit') {

                    // Hide form
                    $('#booking-bookform-changed').fadeOut('fast', function() {

                        // Hide ribbon
                        $('.brand-t1-wrap').css('display', 'none');

                        // Appointment new
                        $('#confirmation-changed').fadeIn('fast', function() {
                            $('#confirmation-changed .check').addClass('show');
                        });

                        // Celebration
                        $('.bookco-t1 .box').addClass('confirmed');

                    });

                } else {

                    // Hide form
                    $('#booking-bookform').fadeOut('fast', function() {

                        // Hide ribbon
                        $('.brand-t1-wrap').css('display', 'none');

                        // Appointment new
                        $('#confirmation-new').fadeIn('fast', function() {
                            $('#confirmation-new .check').addClass('show');
                        });

                        // Celebration
                        $('.bookco-t1 .box').addClass('confirmed');

                    });

                }

                // Release
                booking.setleaveprompt(false);

            }, 1000);

        },
        validateerror: function(f) {

            // Error effect
            $(f).addClass('warnings').on('animationend webkitAnimationEnd oAnimationEnd', function(e) {

                // Remove shake class
                $(f).removeClass('warnings');

            });

            // Error general
            $(f).addClass('warningsxt');

        },
        email: function(str) {
            var filter = /^[^\s@]+@[^\s@]+\.[a-z]{2,6}$/i;
            if (filter.test(str)) { return true; } else { return false; }
        },
        empty: function(str) {
            var filter = /^\s+$/;
            var expression;
            if (filter.test(str) || str == '') { expression = false; } else { expression = true; }
            return expression;
        },
        onlynumbers: function(evt) {
            var charCode = (evt.which) ? evt.which : event.keyCode;
            if (charCode > 31 && (charCode < 48 || charCode > 57)) { return false; } else { return true; }
        },
        tzidoptshow: function(f) {

            // Unbind
            $(document).unbind(".tzidlookuppopup");

            // Timed
            setTimeout(function() {

                // Bind
                $(document).bind("click.tzidlookuppopup", function() { booking.tzidopthide(); });

                // Focus
                $('#tzidlookup .address').focus();

            }, 200);

            // Show
            $('#tzidlookup').css('display', 'block');

            // Timed show
            setTimeout(function() {

                // Show
                $('#tzidlookup').addClass('show');

                // Markup time zone
                booking.tzidzonemarkup();

            }, 200);

        },
        tzidopthide: function(f) {

            // Show
            $('#tzidlookup').removeClass('show');

            // Unbind
            $(document).unbind(".tzidlookuppopup");

        },
        tzidclear: function(f) {

            // Clear search value
            $('#tzidlookup .address').val('');
            $('#tzidlookup .address').focus();

            // Hide search suggestions
            $('#tzidlookup .submit').css('display', 'block');
            $('#tzidlookup .clc').css('display', 'none');
            $('#tzidlookup .load').css('display', 'none');
            $('#tzidlookup .sugg').css('display', 'none');
            $('#tzidlookup #tzidlookup-nores').css('display', 'none');
            $('#tzidlookup .result').css('display', 'none');

            // Known items
            $('#tzidlookup #tzidlookup-known-items').css('display', 'block');

        },
        timeswitch: function(f) {

            // AM/PM or 24h?
            if (f.checked) {

                // Set
                $('#tzidlookup').attr('data-timeformat', '24h');
                $('.inpusertimeformat').val('24');

            } else {

                // Set
                $('#tzidlookup').attr('data-timeformat', '12h');
                $('.inpusertimeformat').val('12');

            }

            // Adjust time
            booking.timeswitchadjusttime();

        },
        timeswitchadjusttime: function() {

            // Get
            var t = $('#tzidlookup').attr('data-timeformat');

            // Toggle
            if (t == '12h') {

                // Set
                $('#calendarslots').attr('data-timeformat', '12h');
                $('.inpusertimeformat').val('12');

                // Remember
                booking.cookiecreate('meeting_timeformat', '12h', 365);

            } else {

                // Set
                $('#calendarslots').attr('data-timeformat', '24h');
                $('.inpusertimeformat').val('24');

                // Remember
                booking.cookiecreate('meeting_timeformat', '24h', 365);

            }

            // Clear
            $('#calendarslots').html('');

            // Reload
            booking.calendarsetup();

            // Hide
            booking.tzidopthide();

        },
        tzidapply: function(f) {

            // Result value
            var val = $(f).attr('data-zone');
            var off = $(f).attr('data-offset');

            // Nicely formatted time zone
            var valn = val;

            // Replace
            valn = valn.replace("/", ", ");
            valn = valn.replace("_", " ");

            // Set
            $('#booking-tzid .calval').html('<span class="gmt">(' + off + ')</span> <span class="nam">' + valn + '</span>');

            // Update timezone
            $('#tzidlookup').attr('data-timezone', val);

            // Set
            $('#calendarslots').attr('data-timezone', val);

            // Update forms
            $('.inpusertimezone').val(val);
            $('.addeventatc .timezone').text(val);

            // Remember
            booking.cookiecreate('meeting_timezone', val, 365);

            // Hide
            booking.tzidopthide();

            // Unbind
            $(document).unbind(".tzidlookuppopup");

            // Clear
            $('#calendarslots').html('');

            // Reload
            //booking.slotsincalendar(true);
            booking.slotsincalendarcheck(true);

        },
        tzidzonemarkup: function() {

            // Get timezone
            var tzidval = $('#tzidlookup').attr('data-timezone');

            // Set
            var pelm = null;

            // Reset
            $('#tzidlookup #tzidlookup-known-items li').removeClass('selected');

            // Find tooltip
            $('#tzidlookup #tzidlookup-known-items li').each(function() {

                // Get zone
                var zo = $(this).attr('data-zone');

                // Match
                if (zo == tzidval) {

                    // Set selected
                    $(this).addClass('selected');

                    // Set
                    pelm = $(this);

                    // Return
                    return false;

                }

            });

            // Reset scroll top
            $('#tzidlookup .list').scrollTop(0);

            // Scroll to position
            if (pelm) {

                // Timed
                setTimeout(function() {

                    // Get position
                    var x2 = $(pelm).position().top;

                    // Scroll to
                    $('#tzidlookup .list').scrollTop(x2);

                }, 200);

            }

        },
        tzidgetaddress: function() {

            // Get address
            var address = $('#tzidlookup .address').val();

            // Any address?
            if (address != '') {

                // Show loader
                $('#tzidlookup .load').css('display', 'block');

                // Reset list
                $('#tzidlookup-items').html('');

                // Reset counter
                adrfits = 0;

                // Call
                $.ajax({
                    dataType: "json",
                    url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURIComponent(address) + "&key=",
                    success: function(data) {

                        // Get status
                        if (data.status == 'OK') {

                            // Get results
                            $.each(data.results, function(key, val) {

                                // Get zoneid
                                var zoneid = booking.tzidgetzone(val.geometry.location.lat, val.geometry.location.lng);

                            });

                            // Timed
                            setTimeout(function() {

                                // Hide loader
                                $('#tzidlookup .load').css('display', 'none');

                                // Show clear
                                $('#tzidlookup .clc').css('display', 'block');

                                // Hide no results
                                $('#tzidlookup #tzidlookup-nores').css('display', 'none');

                                // Show
                                $('#tzidlookup #tzidlookup-items').css('display', 'block');
                                $('#tzidlookup .sugg').css('display', 'block');
                                $('#tzidlookup #adrlook-items').css('display', 'block');

                                // Hide
                                $('#tzidlookup #tzidlookup-known-items').css('display', 'none');

                                // Show result
                                $('#tzidlookup .result').css('display', 'block');

                            }, 1000);

                        } else {

                            // Timed
                            setTimeout(function() {

                                // Hide loader
                                $('#tzidlookup .load').css('display', 'none');

                                // Hide results
                                $('#tzidlookup #tzidlookup-items').css('display', 'none');

                                // Hide known list
                                $('#tzidlookup #tzidlookup-known-items').css('display', 'none');

                                // Show result
                                $('#tzidlookup #tzidlookup-nores').css('display', 'block');

                                // Show
                                $('#tzidlookup .result').css('display', 'none');

                            }, 1000);

                        }

                    },
                    error: function(xhr, status, thrown) {

                        // Timed
                        setTimeout(function() {

                            // Hide loader
                            $('#tzidlookup .load').css('display', 'none');

                            // Hide results
                            $('#tzidlookup #tzidlookup-items').css('display', 'none');

                            // Show result
                            $('#tzidlookup #tzidlookup-nores').css('display', 'block');

                        }, 1000);

                    }
                });

            }

        },
        tzidgetzone: function(lat, lng) {

            // Zone
            var zone = '';

            // Timestamp
            var stamp = (Math.round((new Date().getTime()) / 1000)).toString();

            // Call
            $.ajax({
                dataType: "json",
                url: "https://maps.googleapis.com/maps/api/timezone/json?location=" + lat + "," + lng + "&timestamp=" + stamp + "&key=AIzaSyD20yeadofoNcyi7FjOTAl7ne5lpDVHR00",
                success: function(data) {

                    // Get zone id
                    zone = data.timeZoneId;

                    // Get offset
                    var tmp = (parseInt(data.rawOffset) + parseInt(data.dstOffset)) / 60 / 60,
                        det = '+',
                        pt1 = '',
                        pt2 = '';

                    // Determine if + -  none
                    if (tmp < 0) { det = '-'; } else if (tmp == 0) { det = ''; }

                    // Convert to string
                    tmp = tmp.toString();

                    // Remove + -
                    tmp = tmp.replace("+", "");
                    tmp = tmp.replace("-", "");
                    tmp = tmp.replace(",", ":");
                    tmp = tmp.replace(".", ":");

                    // Split
                    var res = tmp.split(":");
                    if (res[0] == undefined) { pt1 = '0'; } else { pt1 = res[0] }
                    if (res[1] == undefined) { pt2 = '0'; } else { pt2 = res[1] }

                    // Set
                    if (pt1.length == '1') { pt1 = '0' + pt1; }
                    if (pt2 == '5') { pt2 = '30'; } else { pt2 = '00'; }

                    // Final
                    var timz = det + pt1 + ':' + pt2;

                    // Valid?
                    if (zone !== undefined) {

                        // Show max 10 results
                        if (adrfits < 10) {

                            // Nicely formatted time zone
                            var valn = data.timeZoneId;

                            // Replace
                            valn = valn.replace("/", ", ");
                            valn = valn.replace("_", " ");

                            // Append
                            $('#tzidlookup #tzidlookup-items').append('<li data-zone="' + data.timeZoneId + '" data-offset="GMT' + timz + '" onclick="booking.tzidapply(this);"><span class="offst">(GMT' + timz + ')</span><span class="nam">' + valn + '</span></li>');

                            // Count
                            adrfits++;

                        }

                    }

                    // Return
                    return zone;

                }
            });

        },
        cookiecreate: function(name, value, days) {
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                var expires = "; expires=" + date.toGMTString();
            } else var expires = "";
            document.cookie = name + "=" + value + expires + "; path=/";
        },
        cookieread: function(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return "";
        },
        popstate: function(event) {

            // https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate

            // Any event state?
            if (event.state) {
                if (event.state.hasOwnProperty('type')) {

                    // View type
                    if (event.state.type == 'calview') {

                        // apptbook
                        // apptview
                        // apptitem

                        // Set view type
                        //if(event.state.hasOwnProperty('viewtype')){
                        //	$('#calendar-controle').attr('data-view-type', event.state.viewtype);
                        //}

                        // Load calendar
                        //calm.loadcalendar('existing', event.state.year, event.state.month);

                    }

                }
            }

        },
        wkrshow: function(mod, init) {

            // Reset
            $('#wrk-pop-t1-sch').css('display', 'none');
            $('#wrk-pop-t1-errt1').css('display', 'none');
            $('#wrk-sch-hd').css('display', 'none');
            $('#wrk-resch-hd').css('display', 'none');
            $('#wrk-pop-t1-sch .itm-t1').removeClass('checked loading');

            // Mode?
            if (mod == 'sch' || mod == 'resch') {

                // Show
                $('#wrk-pop-t1-sch').css('display', 'block');

                // Toggle
                if (mod == 'sch') {
                    $('#wrk-sch-hd').css('display', 'block');
                } else if (mod == 'resch') {
                    $('#wrk-resch-hd').css('display', 'block');
                }

                // Init load?
                if (init) {

                    // Load
                    setTimeout(function() {
                        $('#wrk-resch-avai').addClass('loading');
                    }, 100);

                    // Set timer
                    timedconfirm = false;

                } else {

                    // Set
                    $('#wrk-resch-avai').removeClass('loading');
                    $('#wrk-resch-avai').addClass('checked');
                    $('#wrk-resch-avai .chk').addClass('pulse');

                    // Timed
                    setTimeout(function() {

                        // Set loading
                        $('#wrk-resch-scap').addClass('loading');

                        // Timed
                        setTimeout(function() {

                            // Remove load, set checked
                            $('#wrk-resch-scap').removeClass('loading');
                            $('#wrk-resch-scap').addClass('checked');
                            $('#wrk-resch-scap  .chk').addClass('pulse');

                            // Timed
                            setTimeout(function() {

                                // Set
                                $('#wrk-resch-noti').addClass('loading');

                            }, 500);

                            // Timed
                            setTimeout(function() {

                                // Set
                                $('#wrk-resch-noti').removeClass('loading');
                                $('#wrk-resch-noti').addClass('checked');
                                $('#wrk-resch-noti .chk').addClass('pulse');

                                // Set timer
                                setTimeout(function() {
                                    timedconfirm = true;
                                }, 300);

                            }, 2000);

                        }, 1000);

                    }, 500);

                }

            } else if (mod == 'appuna') {

                // Show
                $('#wrk-pop-t1-errt1').css('display', 'block');

            }

            // Show
            $('#wrk-pop-t1').css('display', 'block');
            $('#wrk-pop-t1-bg').css('display', 'block');

            // Show
            setTimeout(function() {
                $('#wrk-pop-t1').addClass('show');
                $('#wrk-pop-t1-bg').addClass('show');
            }, 200);

        },
        wkrhide: function() {

            // Hide
            $('#wrk-pop-t1').removeClass('show');
            $('#wrk-pop-t1-bg').removeClass('show');

            // Hide
            setTimeout(function() {
                $('#wrk-pop-t1').css('display', 'none');
                $('#wrk-pop-t1-bg').css('display', 'none');
            }, 400);

        },
        wkrback: function() {

            // Hide
            booking.wkrhide();

            // Clear
            $('#calendarslots').html('');

            // Reload
            //booking.slotsincalendar(true);
            booking.slotsincalendarcheck(true);

            // Go back
            setTimeout(function() {
                $('#booking-bookform .back').click();
            }, 400);

        },
        alarminit: function() {

            // Set the date we're counting down to
            var timeto = $('#appt-alarm').attr('data-starting-seconds');
            var now = 0;

            // Mode
            var mod = $('#booking').attr('data-view-mode');
            var sta = $('#booking').attr('data-status');

            // Run?
            var run = true;

            // Set
            if (mod == 'cancelled' || sta == 'past') {
                run = false;
            }

            // Check if the variable exists and is a number
            if (isNaN(timeto)) {
                timeto = -10000;
            }

            // Run
            if (run) {

                // Labels
                var lb_days = $('#appt-alarm').attr('data-days');
                var lb_day = $('#appt-alarm').attr('data-day');
                var lb_hours = $('#appt-alarm').attr('data-hours');
                var lb_hour = $('#appt-alarm').attr('data-hour');
                var lb_minutes = $('#appt-alarm').attr('data-minutes');
                var lb_minute = $('#appt-alarm').attr('data-minute');
                var lb_seconds = $('#appt-alarm').attr('data-seconds');
                var lb_second = $('#appt-alarm').attr('data-second');

                // Update the count down every 1 second
                var tim = setInterval(function() {

                    // Add to now to increase interval
                    now++;

                    // Find the distance between now and the count down seconds
                    var distance = timeto - now;

                    // Any distance?
                    if (distance > 0) {

                        // Time calculations for days, hours, minutes and seconds
                        var days = Math.floor(distance / (60 * 60 * 24));
                        var hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
                        var minutes = Math.floor((distance % (60 * 60)) / (60));
                        var seconds = Math.floor((distance % (60)));

                        // Labels
                        var lbl = '';
                        var lbl_days = '';
                        var lbl_hours = '';
                        var lbl_minutes = '';
                        var lbl_seconds = '';

                        // Create isolated labels for days, hour, minute, second
                        if (days > 0) { if (days == '1') { lbl_days = lb_day; } else { lbl_days = lb_days; } }
                        if (hours > 0) { if (hours == '1') { lbl_hours = lb_hour; } else { lbl_hours = lb_hours; } }
                        if (minutes > 0) { if (minutes == '1') { lbl_minutes = lb_minute; } else { lbl_minutes = lb_minutes; } }
                        if (seconds > 0) { if (seconds == '1') { lbl_seconds = lb_second; } else { lbl_seconds = lb_seconds; } }

                        // Show seconds or not? Only if we're down to the last hour and minute
                        if (days == '0' && hours == '0' && minutes >= '0') {
                            // Keep all
                        } else {
                            lbl_seconds = "";
                        }

                        if (days > 3) {
                            lbl = days + ' ' + lbl_days;
                        } else {

                            if (lbl_days != '') {
                                lbl += days + ' ' + lbl_days + ', ';
                            }

                            if (lbl_hours != '') {
                                lbl += hours + ' ' + lbl_hours + ', ';
                            }

                            if (lbl_minutes != '') {
                                lbl += minutes + ' ' + lbl_minutes + ', ';
                            }

                            if (lbl_seconds != '') {
                                lbl += seconds + ' ' + lbl_seconds + ', ';
                            }

                        }

                        // Remove last comma
                        lbl = lbl.replace(/,\s*$/, "");

                        // Update
                        $("#appt-alarm .duration").text(lbl);

                    } else {

                        // Clear interval
                        clearInterval(tim);

                        // Remove classes
                        $('#appt-alarm').removeClass('type1 type2 type3');

                        // On or done?
                        if (distance <= 0 && distance > -(10 * 60)) {

                            // Meeting is ON
                            $('#appt-alarm').addClass('type2');

                        } else {

                            // Meeting has ended
                            $('#appt-alarm').addClass('type3');

                        }

                    }

                }, 1000);

            } else {

                // Canceled or just past?
                if (mod == 'cancelled') {

                    // Meeting has ended
                    $('#appt-alarm').css('display', 'none');

                } else {

                    // Meeting has ended
                    $('#appt-alarm').addClass('type3');

                }

            }

        },
        preloads: function() {

            // Preload images
            //$(document.body).append('<div style="position:absolute;left:-10000px;top:-10000px;z-index:-1;"><img src="/gfx/icon-reload-t1.svg" alt="" /></div>');

        },
        readmore: function(f) {

            // Get base
            var bas = $(f).closest(".truncate");

            // Show
            $(bas).find('.inn').removeAttr('style');

            // Remove read more block
            $(bas).find('.readmoreblock').css('display', 'none');

            // Remove
            $(bas).find('.inn').removeClass('truncated');

        },
        truncate: function() {

            // Get items
            $('.truncate').each(function() {

                // Get truncate settings
                var trun = $(this).attr('data-truncate');
                var rows = $(this).attr('data-truncate-rows');

                // Get initial description height
                var dshg = $(this).height();

                // Truncate?
                if (trun == 'true') {

                    // Rows
                    if (!isNaN(parseFloat(rows)) && isFinite(rows)) {
                        // It's a number
                        rows = parseInt(rows);
                    } else {
                        rows = 5;
                    }

                    // Get line height of text
                    var lh = $(this).find('p').css('line-height').replace(/[^-\d\.]/g, '');

                    // Line height x rows
                    var trhg = (lh * rows);

                    // Get lines
                    var gli = booking.getline($(this).find(".inn"), rows);

                    // Proceed variables
                    var fnd5 = false,
                        fnd4 = false,
                        fnd3 = false;

                    // If line does not contain
                    if (gli['5'] == '' && gli['4'] == '' && gli['3'] == '') {

                        // No need to truncate anything

                    } else {
                        if (gli['5'] == '' && !fnd5) {
                            trhg = (lh * (rows - 1));
                            fnd4 = true;
                        }
                        if (gli['4'] == '' && fnd4) {
                            trhg = (lh * (rows - 2));
                            fnd3 = true;
                        }
                        if (gli['3'] == '' && fnd3) { trhg = (lh * (rows - 3)); }
                    }

                    // Round up
                    trhg = Math.ceil(trhg);

                    // If the truncated height is less than the original 
                    // description container height, then truncate the container
                    if (trhg < dshg) {

                        // Truncate at x line rows
                        $(this).find('.inn').css('max-height', trhg + 'px');

                        // Show read more block
                        $(this).find('.readmoreblock').css('display', 'block');

                        // Add class
                        $(this).find('.inn').addClass('truncated');

                    }

                }

            });

        },
        getline: function(elm, index) {

            // Clone text container
            var duel = elm.clone().css({
                top: -10000,
                left: -10000,
                position: 'absolute',
                width: elm.width()
            }).appendTo(elm.parent());

            // Set an ID
            duel.prop('id', 'clone');

            // Get contents of clone
            var html = duel.html();

            // Replace
            html = html.replace(/<br><br>/gi, '<br>');
            html = html.replace(/<br\s*[\/]?>/gi, ' <br> ');
            html = html.replace(/(\S+\s*)/g, '<span>$1</span>');

            // Update clone
            duel.html(html);

            // Set variables
            var offset = 0;
            var spans = $("#clone p span");

            // Index
            var index = index,
                top = 0,
                buffer3 = [],
                buffer4 = [],
                buffer5 = [];

            // Loop spans
            for (var i = 0; i < spans.length; i++) {

                // Match
                if (top > index) {
                    break;
                }

                // Position calculation
                var newOffset = spans[i].offsetTop;

                // Match
                if (newOffset !== offset) {
                    offset = newOffset;
                    top++;
                }

                // Store the elements in the line we want (minus two lines up)
                if (top === (index - 2)) {
                    buffer3.push(spans[i]);
                }

                // Store the elements in the line we want (minus one line up)
                if (top === (index - 1)) {
                    buffer4.push(spans[i]);
                }

                // Store the elements in the line we want
                if (top === index) {
                    buffer5.push(spans[i]);
                }

            }

            // Buffer now contains all spans in the line X position

            // Loop contents of line X and add to readable string
            var out5 = '',
                out4 = '',
                out3 = '';

            // Loop
            for (var i = 0; i < buffer5.length; i++) { out5 += buffer5[i].innerHTML; }
            for (var i = 0; i < buffer4.length; i++) { out4 += buffer4[i].innerHTML; }
            for (var i = 0; i < buffer3.length; i++) { out3 += buffer3[i].innerHTML; }

            // Remove clone
            duel.remove();

            // If the line is a <br> only then return empty
            if (out5.replace(/\s/g, "") == '<br>') { out5 = ''; }
            if (out4.replace(/\s/g, "") == '<br>') { out4 = ''; }
            if (out3.replace(/\s/g, "") == '<br>') { out3 = ''; }

            // Return
            return { "5": out5, "4": out4, "3": out3 };

        },
        brandclick: function(f) {

            // Get link
            var lnk = $(f).attr('data-link');

            // Open
            window.open(lnk);

        },
        tryitnow: function() {

        },
        slotsincalendarcheck: function(reac) {

            // Get calendar month + year
            var cmon = booking.l2($('#calendar-controle').attr('data-month'));
            var cyer = booking.l2($('#calendar-controle').attr('data-year'));

            // Stringify
            cmon = cmon.toString();
            cyer = cyer.toString();

            // Unix time (miliseconds to seconds)
            var unix = Math.floor(Date.now() / 1000);

            // Highest load time
            reqhigh = 0;

            // Exists?
            if ($('#connectcals').length) {

                // Get calendars to check
                var calsck = $('#connectcals').attr('data-calendars');

                // Year + month + day
                var clal = cyer + cmon + '01';
                var claf = cyer + '-' + cmon + '-01';

                // Split calendars
                var strr = calsck.split(',');

                // Loop each calendar ID (e.g. 1319,1337,1354,)
                for (var i = 0; i < strr.length; i++) {

                    // Calendar ID
                    var ccid = strr[i];

                    // Any calendar?
                    if (ccid != '') {

                        // Calendar date + calendar ID
                        var clalid = clal + ccid;

                        // Does a calendar item already exist for the month?
                        if ($('#connectcals .' + clalid).length) {

                            // OK

                        } else {

                            // Add it to connected calendar items list (to check)
                            $('#connectcals').append('<div class="calcheck ' + clal + ' ' + clalid + '" data-id="' + ccid + '" data-month="' + claf + '" data-lastcheck="1200000000"></div>');

                        }

                    }

                }

                // Loop through slots, find ones we need to update
                $('#connectcals .calcheck').each(function() {

                    // Get last check + id
                    var fid = $(this).attr('data-id');
                    var lck = $(this).attr('data-lastcheck');
                    var mon = $(this).attr('data-month');
                    var ret = $(this).attr('data-request-time');
                    var obj = $(this);

                    // Match to current month?
                    if ($(this).hasClass(clal)) {

                        // Difference between last check and current unix time in minutes
                        var diff = (unix - lck) / 60;

                        // If the difference is more than 15 minutes then syncronize
                        if (diff > chktim) {

                            // Syncronize
                            booking.slotsincalendarasync(obj, fid, clal, mon);

                            // Update items unix time
                            $(this).attr('data-lastcheck', unix);

                            // Item is loading
                            $(this).attr('data-loading', 'true');

                            // Set the higest request time for the specific calendar
                            if (ret > reqhigh) {

                                // Set
                                reqhigh = ret;

                            }

                        }

                    }

                });

                // First load? Pre-load next two months
                if (finit) {

                    // Set
                    finit = false;

                    // Current month + year + one year ahead in time
                    var cmon_i = parseInt(cmon) - 1;
                    var cyer_i = parseInt(cyer);

                    // This month + next two months
                    var mdate0 = new Date(cyer_i, cmon_i);
                    var mdate1_tmp = new Date(mdate0.getFullYear(), mdate0.getMonth() + 1, 1);
                    var mdate2_tmp = new Date(mdate0.getFullYear(), mdate0.getMonth() + 2, 1);

                    // Next month, and month after that
                    var monx1 = mdate1_tmp.getFullYear() + booking.l2(mdate1_tmp.getMonth() + 1) + '01';
                    var monx2 = mdate2_tmp.getFullYear() + booking.l2(mdate2_tmp.getMonth() + 1) + '01';

                    // Loop through slots, find ones we need to update
                    $('#connectcals .calcheck').each(function() {

                        // Get last check + id
                        var fid = $(this).attr('data-id');
                        var lck = $(this).attr('data-lastcheck');
                        var mon = $(this).attr('data-month');
                        var lod = $(this).attr('data-loading');
                        var obj = $(this);

                        // Match to current month?
                        if ($(this).hasClass(monx1) || $(this).hasClass(monx2)) {

                            // Skip, else proceed
                            if (lod == 'true') {

                            } else {

                                // Difference between last check and current unix time in minutes
                                var diff = (unix - lck) / 60;

                                // If the difference is more than 15 minutes then syncronize
                                if (diff > chktim) {

                                    // Syncronize
                                    booking.slotsincalendarasync(obj, fid, clal, mon);

                                    // Update items unix time
                                    $(this).attr('data-lastcheck', unix);

                                    // Item is loading
                                    $(this).attr('data-loading', 'true');

                                }

                            }

                        }

                    });

                }

                // Clear interval
                clearInterval(sicltim);

                // Check loader
                sicltim = setInterval(function() {

                    // Run
                    booking.slotsincalendarloaderrun(reac);

                }, 200);

            }

        },
        slotsincalendarasync: function(obj, cid, cls, mon) {

            // Get data
            var dat = 'cid=' + cid + '&calendar_date=' + mon;

            // Ajax
            $.ajax({
                type: 'GET',
                url: '/source/web/templates/ajax.connected.calendar.syncronize.php',
                data: dat,
                cache: false,
                success: function(data) {

                    // Unix time (miliseconds to seconds)
                    var unix = Math.floor(Date.now() / 1000);

                    // Parse
                    var jso = jQuery.parseJSON(data);

                    // OK
                    if (jso.meta.code == '200') {

                        // Update timestamp
                        $(obj).attr('data-lastcheck', unix);

                    } else {

                        // Update timestamp
                        $(obj).attr('data-error', 'true');

                    }

                    // Used in a re-check sequence?
                    if ($(obj).attr('data-recheck') == 'true') {

                        // Set done
                        $(obj).attr('data-recheck', 'done');

                    }

                    // Remove loading
                    $(obj).attr('data-loading', 'false');

                },
                error: function() {

                    // Error
                    //alert('An error has occurred. Please try again.');

                }
            });

        },
        slotsincalendarloaderrun: function(reac) {

            // Any loading found?
            var loading = false;

            // Loop through slots, find ones we need to update
            $('#connectcals .calcheck').each(function() {

                // Get variables
                var lod = $(this).attr('data-loading');

                // Any loading?
                if (lod == 'true') {

                    // Set
                    loading = true;

                }

            });

            // If loading is found then we make sure the loader is visible
            if (loading) {

                // Clear load timer
                clearTimeout(lodtim);

                // Load (type #1)
                lodtim = setTimeout(function() {
                    booking.loaderon('1');
                }, 100);

            }

            // No loading found, run ajax refresh
            if (!loading) {

                // Get now
                var nnow = new Date();

                // Now minus previous now
                var nnd = (lodtrw * 1000) - (nnow - loddf);

                // Load
                if (nnd > 0) {

                    // Remaining time off
                    setTimeout(function() {

                        // Off
                        booking.loaderoff();

                    }, nnd);

                } else {

                    // Off
                    booking.loaderoff();

                }

                // Run slots in calendar
                booking.slotsincalendar(reac);

                // Clear interval
                clearInterval(sicltim);

            }

        },
        slotsincalendarrecheckinit: function(f) {

            // Get calendar month + year
            var cmon = booking.l2($('#calendar-controle').attr('data-month'));
            var cyer = booking.l2($('#calendar-controle').attr('data-year'));

            // Stringify
            cmon = cmon.toString();
            cyer = cyer.toString();

            // Year + month class
            var clal = cyer + cmon + '01';

            // Reset all calendar checks
            $('#connectcals .calcheck').removeAttr('data-recheck');

            // Force recheck
            $('#connectcals .' + clal).attr('data-recheck', 'true');

            // Loop through slots, find ones we need to update
            $('#connectcals .calcheck').each(function() {

                // Get last check + id
                var fid = $(this).attr('data-id');
                var rec = $(this).attr('data-recheck');
                var mon = $(this).attr('data-month');
                var obj = $(this);

                // Match to current month?
                if (rec == 'true') {

                    // Syncronize
                    booking.slotsincalendarasync(obj, fid, clal, mon);

                }

            });

            // Clear interval
            clearInterval(sicltim);

            // Check loader
            sicltim = setInterval(function() {

                // Run
                //booking.slotsincalendarrecheckloop(reac);
                booking.slotsincalendarrecheckloop();

            }, 50);

        },
        slotsincalendarrecheckloop: function() {

            // Variables
            var alldone = true;

            // Loop through slots, find ones we need to update
            $('#connectcals .calcheck').each(function() {

                // Get variables
                var rec = $(this).attr('data-recheck');

                // Match to current month?
                if (rec == 'true') {

                    // Set
                    alldone = false;

                }

            });

            // All done, clear recheck loop timer
            if (alldone) {

                // Clear interval
                clearInterval(sicltim);

                // Run submit
                booking.validatesave(objform);

            }

        },
        loaderon: function(type) {

            // Allowed?
            if (!lodrun && type == '1') {

                // Set now
                loddf = new Date();

                // Runner variable
                var lodrux = 0;

                // Get seconds for animation to run
                if (reqhigh > 0) {
                    lodrux = parseInt(reqhigh) + 1;
                } else {
                    lodrux = 3;
                }

                // Update
                lodtrw = lodrux;

                // Animation string
                var ast = 'progress-load ' + lodrux + 's forwards';

                // Hide "no times"
                $('#notim').css('display', 'none');

                // Show
                $('#calload').css('visibility', 'visible');
                $('#logatm-ic').css('display', 'block');
                $('#logatm-bg').css('display', 'block');

                // Reset
                $('#logatm-ic .ino').css("animation", "none");

                // Timed set animation
                setTimeout(function() {
                    $('#logatm-ic .ino').css("animation", ast);
                }, 50);

                // Set
                lodrun = true;

            }

            // When the calendar is just reload the times
            if (!lodrun && type == '2') {

                // Hide "no times"
                $('#notim').css('display', 'none');

                // Show
                $('#calload').css('visibility', 'visible');

                // Set
                lodrun = true;

            }

        },
        loaderoff: function() {

            // Show
            $('#calload').css('visibility', 'hidden');
            $('#logatm-ic').css('display', 'none');
            $('#logatm-bg').css('display', 'none');

            // Reset
            lodrun = false;

        },
        setleaveprompt: function(man) {

            // Use or not
            if (man) {

                // Set
                showleaveprompt = true;

            } else {

                // Set
                showleaveprompt = false;

            }

        },
        getleaveprompt: function() {

            // Get leave prompt variable
            return showleaveprompt;

        }
    };
}();

// Attach
$(window).bind('ready', function() { booking.initialize(); });
$(window).bind('popstate', function() { booking.popstate(event); });

/* Refresh browser prompt?
---------------------------------------------------------------- */

window.onbeforeunload = function() {

    // If leave prompt is active then we should ping the user. 
    if (booking.getleaveprompt()) {

        // Show message
        return 'You have unsaved changes!';

    }

}


/* Expanding Textareas (https://github.com/bgrins/ExpandingTextareas)
---------------------------------------------------------------- */

(function(factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function($) {

    // Class Definition
    // ================

    var Expanding = function($textarea, options) {
        this.$textarea = $textarea;
        this.$textCopy = $('<span />');
        this.$clone = $('<pre class="expanding-clone"><br /></pre>').prepend(this.$textCopy);

        $textarea
            .wrap($('<div class="expanding-wrapper" style="position:relative" />'))
            .after(this.$clone);

        this.attach();
        this.setStyles();
        this.update();

        if (typeof options.update === 'function') {
            $textarea.bind('update.expanding', options.update);
        }
    };

    Expanding.DEFAULTS = {
        autoInitialize: true,
        initialSelector: 'textarea.expanding'
    };

    $.expanding = $.extend({}, Expanding.DEFAULTS, $.expanding || {});

    // Returns the version of Internet Explorer or -1
    // (indicating the use of another browser).
    // From: http://msdn.microsoft.com/en-us/library/ms537509(v=vs.85).aspx#ParsingUA
    var ieVersion = (function() {
        var v = -1;
        if (navigator.appName === 'Microsoft Internet Explorer') {
            var ua = navigator.userAgent;
            var re = new RegExp('MSIE ([0-9]{1,}[\\.0-9]{0,})');
            if (re.exec(ua) !== null) v = parseFloat(RegExp.$1);
        }
        return v;
    })();

    // Check for oninput support
    // IE9 supports oninput, but not when deleting text, so keyup is used.
    // onpropertychange _is_ supported by IE8/9, but may not be fired unless
    // attached with `attachEvent`
    // (see: http://stackoverflow.com/questions/18436424/ie-onpropertychange-event-doesnt-fire),
    // and so is avoided altogether.
    var inputSupported = 'oninput' in document.createElement('input') && ieVersion !== 9;

    Expanding.prototype = {

        // Attaches input events
        // Only attaches `keyup` events if `input` is not fully suported
        attach: function() {
            var events = 'input.expanding change.expanding',
                _this = this;
            if (!inputSupported) events += ' keyup.expanding';
            this.$textarea.bind(events, function() { _this.update(); });
        },

        // Updates the clone with the textarea value
        update: function() {
            this.$textCopy.text(this.$textarea.val().replace(/\r\n/g, '\n'));

            // Use `triggerHandler` to prevent conflicts with `update` in Prototype.js
            this.$textarea.triggerHandler('update.expanding');
        },

        // Tears down the plugin: removes generated elements, applies styles
        // that were prevously present, removes instance from data, unbinds events
        destroy: function() {
            this.$clone.remove();
            this.$textarea
                .unwrap()
                .attr('style', this._oldTextareaStyles || '')
                .removeData('expanding')
                .unbind('input.expanding change.expanding keyup.expanding update.expanding');

            delete this._oldTextareaStyles;
        },

        setStyles: function() {
            this._resetStyles();
            this._setCloneStyles();
            this._setTextareaStyles();
        },

        // Applies reset styles to the textarea and clone
        // Stores the original textarea styles in case of destroying
        _resetStyles: function() {
            this._oldTextareaStyles = this.$textarea.attr('style');

            this.$textarea.add(this.$clone).css({
                margin: 0,
                webkitBoxSizing: 'border-box',
                mozBoxSizing: 'border-box',
                boxSizing: 'border-box',
                width: '100%'
            });
        },

        // Sets the basic clone styles and copies styles over from the textarea
        _setCloneStyles: function() {
            var css = {
                display: 'block',
                border: '0 solid',
                visibility: 'hidden',
                minHeight: this.$textarea.outerHeight()
            };

            if (this.$textarea.attr('wrap') === 'off') css.overflowX = 'scroll';
            else css.whiteSpace = 'pre-wrap';

            this.$clone.css(css);
            this._copyTextareaStylesToClone();
        },

        _copyTextareaStylesToClone: function() {
            var _this = this,
                properties = [
                    'lineHeight', 'textDecoration', 'letterSpacing',
                    'fontSize', 'fontFamily', 'fontStyle',
                    'fontWeight', 'textTransform', 'textAlign',
                    'direction', 'wordSpacing', 'fontSizeAdjust',
                    'wordWrap', 'word-break',
                    'borderLeftWidth', 'borderRightWidth',
                    'borderTopWidth', 'borderBottomWidth',
                    'paddingLeft', 'paddingRight',
                    'paddingTop', 'paddingBottom', 'maxHeight'
                ];

            $.each(properties, function(i, property) {
                var val = _this.$textarea.css(property);

                // Prevent overriding percentage css values.
                if (_this.$clone.css(property) !== val) {
                    _this.$clone.css(property, val);
                    if (property === 'maxHeight' && val !== 'none') {
                        _this.$clone.css('overflow', 'hidden');
                    }
                }
            });
        },

        _setTextareaStyles: function() {
            this.$textarea.css({
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                resize: 'none',
                overflow: 'auto'
            });
        }
    };


    // Plugin Definition
    // =================

    function Plugin(option) {
        if (option === 'active') return !!this.data('expanding');

        this.filter('textarea').each(function() {
            var $this = $(this);

            var instance = $this.data('expanding');

            if (instance && option === 'destroy') return instance.destroy();

            if (instance && option === 'refresh') return instance.setStyles();

            var visible = this.offsetWidth > 0 || this.offsetHeight > 0;

            if (!visible) _warn('ExpandingTextareas: attempt to initialize an invisible textarea. ' +
                'Call expanding() again once it has been inserted into the page and/or is visible.');

            if (!instance && visible) {
                var options = $.extend({}, $.expanding, typeof option === 'object' && option);
                $this.data('expanding', new Expanding($this, options));
            }
        });
        return this;
    }

    $.fn.expanding = Plugin;
    $.fn.expanding.Constructor = Expanding;

    function _warn(text) {
        if (window.console && console.warn) console.warn(text);
    }

    $(function() {
        if ($.expanding.autoInitialize) {
            $($.expanding.initialSelector).expanding();
        }
    });

}));