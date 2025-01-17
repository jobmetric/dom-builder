/**
 * @author Javad Mowlanezhad jmowla@gmail.com
 * @version 1.0.0
 */

var $ = jQuery.noConflict();

function jd_to_gregorian(jd) {
    var j, i, l, n, g, dg, c, s, r, v, u, y, m, d;

    j = jd + 0.5;
    j = Math.floor(j);
    l = j + 68569;
    n = Math.floor((4 * l) / 146097);
    l = l - Math.floor((146097 * n + 3) / 4);
    i = Math.floor((4000 * (l + 1)) / 1461001);
    l = l - Math.floor((1461 * i) / 4) + 31;
    j = Math.floor((80 * l) / 2447);
    d = l - Math.floor((2447 * j) / 80);
    l = Math.floor(j / 11);
    m = j + 2 - 12 * l;
    y = 100 * (n - 49) + i + l;

    return [y, m, d];
}

function persian_to_jd(year, month, day) {
    var epbase, epyear;

    epbase = year - (year >= 0 ? 474 : 473);
    epyear = 474 + (epbase % 2820);

    return day +
        ((month <= 7) ?
            ((month - 1) * 31) :
            (((month - 1) * 30) + 6)) +
        Math.floor((epyear * 682 - 110) / 2816) +
        (epyear - 1) * 365 +
        Math.floor(epbase / 2820) * 1029983 +
        (1948320.5 - 1);
}

function jd_to_persian(jd) {
    var depoch, cycle, cyear, ycycle, aux1, aux2, yday, year, month, day;

    jd = Math.floor(jd) + 0.5;
    depoch = jd - persian_to_jd(475, 1, 1);
    cycle = Math.floor(depoch / 1029983);
    cyear = depoch % 1029983;

    if (cyear === 1029982) {
        ycycle = 2820;
    } else {
        aux1 = Math.floor(cyear / 366);
        aux2 = cyear % 366;
        ycycle = Math.floor((2134 * aux1 + 2816 * aux2 + 2815) / 1028522) + aux1 + 1;
    }

    year = ycycle + 2820 * cycle + 474;
    if (year <= 0) {
        year--;
    }

    yday = jd - persian_to_jd(year, 1, 1) + 1;
    month = (yday <= 186) ? Math.ceil(yday / 31) : Math.ceil((yday - 186) / 30) + 6;
    day = jd - persian_to_jd(year, month, 1) + 1;

    return [year, month, day];
}

function gregorian_to_jd(year, month, day) {
    var a = Math.floor((14 - month) / 12);
    var y = year + 4800 - a;
    var m = month + 12 * a - 3;

    return day + Math.floor((153 * m + 2) / 5) +
        365 * y + Math.floor(y / 4) - Math.floor(y / 100) +
        Math.floor(y / 400) - 32045;
}

(function($) {

	function JalaliCalendar() {
		var _jDIM = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
		var _gDIM = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

		/**
		 * Checks input parameter for Array object, if the object is Array returns true otherwise false
		 * @param a
		 */
		function _isArray(a) {
			return (a && a.constructor && a.constructor.toString().match(/\Array\(\)/));
		}

		function _div(a, b) {
			return Math.floor(a / b);
		}

		function _ds2da(ds) {
			if (_isArray(ds))
				return ds;
			if (ds == "")
				return [];
			var da = ds.split(" ")[0].split("-");
			if (da[1] == undefined)
				da = ds.split(" ")[0].split("/");
			return da;
		}

		function _ivda(da) {
			return !(da[0] === "" || da[1] === "" || da[2] === "");
		}

		function _isjvd(d) {
			d = _ds2da(d);
			var j = _g2j(_j2g(d));
			return d[0] === j[0] && d[1] === j[1] && d[2] === j[2];
		}

		function _isgvd(d) {
			d = _ds2da(d);
			var g = _j2g(_g2j(d));
			return d[0] === g[0] && d[1] === g[1] && d[2] === g[2];
		}

		function _j2JUL(j) {
			var jy, jm, jd, jdn,i;

			jy = j[0] - 979;
			jm = j[1] - 1;
			jd = j[2] - 1;
			jdn = 365 * jy + _div(jy, 33) * 8 + _div((jy % 33 + 3), 4);
			for (i = 0; i < jm; ++i)
				jdn += _jDIM[i];
			return jdn + jd;
		}

		function _JUL2j(gdn) {
			var gy, gm, gd, leap, i;

			gy = 1600 + 400 * _div(gdn, 146097);
			gdn = gdn % 146097;
			leap = 1;
			if (gdn >= 36525) {
				gdn--;
				gy += 100 * _div(gdn, 36524);
				gdn = gdn % 36524;

				if (gdn >= 365)
					gdn++;
				else
					leap = 0;
			}
			gy += 4 * _div(gdn, 1461);
			gdn %= 1461;
			if (gdn >= 366) {
				leap = 0;
				gdn--;
				gy += _div(gdn, 365);
				gdn = gdn % 365;
			}
			for (i = 0; gdn >= _gDIM[i] + (i == 1 && leap); i++)
				gdn -= _gDIM[i] + (i == 1 && leap);
			gm = i + 1;
			gd = gdn + 1;
			return [gy, gm, gd];
		}

		function _g2JUL(g) {
			var gy, gm, gd, gdn, i;

			gy = g[0] - 1600;
			gm = g[1] - 1;
			gd = g[2] - 1;
			gdn = 365 * gy + _div((gy + 3), 4) - _div((gy + 99), 100) + _div((gy + 399), 400);
			for (i = 0; i < gm; ++i)
				gdn += _gDIM[i];
			if (gm > 1 && ((gy % 4 == 0 && gy % 100 != 0) || (gy % 400 == 0)))
				++gdn;
			return gdn + gd;
		}

		function _JUL2g(jdn) {
			var j_np, jy, jm, jd, i;

			j_np = _div(jdn, 12053);
			jdn %= 12053;

			jy = 979 + 33 * j_np + 4 * _div(jdn, 1461);
			jdn %= 1461;
			if (jdn >= 366) {
				jy += _div((jdn - 1), 365);
				jdn = (jdn - 1) % 365;
			}
			for (i = 0; i < 11 && jdn >= _jDIM[i]; ++i)
				jdn -= _jDIM[i];
			jm = i + 1;
			jd = jdn + 1;
			return [jy, jm, jd];
		}

		function _j2g(j) {
			j = _ds2da(j);
			if (!_ivda(j))
				return [];
			return _JUL2j(_j2JUL(j) + 79);
		}

		function _g2j(g) {
			g = _ds2da(g);
			if (!_ivda(g))
				return [];
			return _JUL2g(_g2JUL(g) - 79);
		}

		return {
			gregorianToJalali: function(g) {
				return _g2j(g);
			},
			gregorianToJalaliStr: function(_g) {
				var g = _ds2da(_g);
				if (!_ivda(g))
					return "";
				var j = _g2j(g);
				return j[0] + "/" + (j[1] > 9 ? j[1] : "0" + j[1]) + "/" + (j[2] > 9 ? j[2] : "0" + j[2]);
			},
			jalaliToGregorianStr: function (_j, _st) {
				var j = _ds2da(_j);
				if (!_ivda(j))
					return "";
				var g = _j2g(j);
				return g[0] + "/" + g[1] + "/" + g[2] + (!_st ? "" : " " + _j.split(" ")[1].split(".")[0]);
			},
			jalaliToGregorian: function(j) {
				return _j2g(j);
			},
			today: function() {
				var _today = new Date();
				return this.gregorianToJalaliStr([_today.getFullYear(),(_today.getMonth() + 1),_today.getDate()]);
			},
			isValidJ: function(d) {
				return _isjvd(d);
			},
			isValidG: function(d) {
				return _isgvd(d);
			},
			getDaysInMonth: function(y, m) {
				return 32 - new Date(y, m, 32).getDate();
			},

			version: "1.0.0"
		};
	};

	if ($._gDate == undefined) {
		Date.prototype._getFullYear = Date.prototype.getFullYear;
		Date.prototype._setFullYear = Date.prototype.setFullYear;
		Date.prototype._getMonth = Date.prototype.getMonth;
		Date.prototype._setMonth = Date.prototype.setMonth;
		Date.prototype._getDate = Date.prototype.getDate;
		Date.prototype._setDate = Date.prototype.setDate;

		Date.prototype._getCJD = function() {
			return $.jalaliCalendar.gregorianToJalali([this._getFullYear(), this._getMonth() + 1, this._getDate()]);
		};

		Date.prototype.getFullYear = function() {
			return this._getCJD()[0];
		};

		Date.prototype.setFullYear = function(y) {
			var j = this._getCJD();
			var g = $.jalaliCalendar.jalaliToGregorian([y, j[1], j[2]]);
			this._setDate(1);
			this._setFullYear(g[0]);
			this._setMonth(g[1] - 1);
			this._setDate(g[2]);
		};

		Date.prototype.getMonth = function() {
			return this._getCJD()[1] - 1;
		};

		Date.prototype.setMonth = function(m) {
			var j = this._getCJD();
			var g = $.jalaliCalendar.jalaliToGregorian([j[0], m + 1, j[2]]);
			this._setDate(1);
			this._setFullYear(g[0]);
			this._setMonth(g[1] - 1);
			this._setDate(g[2]);
		};

		Date.prototype.getDate = function() {
			return this._getCJD()[2];
		};

		Date.prototype.setDate = function(d) {
			var j = this._getCJD();
			var g = $.jalaliCalendar.jalaliToGregorian([j[0], j[1], d]);
			this._setDate(1);
			this._setFullYear(g[0]);
			this._setMonth(g[1] - 1);
			this._setDate(g[2]);
		};

		$._gDate = Date;		// save original Date object for further reference and use
		window.Date = function() {
			this.prototype = $._gDate.prototype;
			var _p = [], _al = arguments.length;
			for (var i = 0; i < _al; i++)
				_p.push(arguments[i]);
			var _d = null;
			if (_al == 0)
				_d = new $._gDate();
			else if (_al == 1) {
				_d = new $._gDate(_p[0]);
			} else if (_al >= 3) {
				_p[1]++;
				var _g = $.jalaliCalendar.jalaliToGregorian(_p);
				for (i = 3; i < _al; i++)
					_g.push(_p[i]);
				for (i = _al; i < 7; i++)
					_g.push(0);
				_d = new $._gDate(_g[0], _g[1] - 1, _g[2], _g[3], _g[4], _g[5], _g[6]);
			}
			return _d;
		};
	}

	if ($.jalaliCalendar == undefined) {
		$.jalaliCalendar = new JalaliCalendar();
		window.jalaliCalendar= $.jalaliCalendar;
	}
})(jQuery);


jQuery(function($){
	$.datepicker.regional['fa'] = {
		calendar: JalaliDate,
		closeText: 'بستن',
		prevText: 'قبل',
		nextText: 'بعد',
		currentText: 'امروز',
		monthNames: ['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'],
		monthNamesShort: ['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'],
		dayNames: ['یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه'],
		dayNamesShort: ['یک', 'دو', 'سه', 'چهار', 'پنج', 'جمعه', 'شنبه'],
		dayNamesMin: ['ی','د','س','چ','پ','ج','ش'],
		weekHeader: 'ه',
		dateFormat: 'yy-mm-dd',
		firstDay: 6,
		isRTL: true,
		showMonthAfterYear: false,
		yearSuffix: '',
        changeMonth: true,
        changeYear: true,
        yearRange: "-100:+100",
		calculateWeek: function(date) {
			var checkDate = new JalaliDate(date.getFullYear(), date.getMonth(), date.getDate() + (date.getDay() || 7) - 3);
			return Math.floor(Math.round((checkDate.getTime() - new JalaliDate(checkDate.getFullYear(), 0, 1).getTime()) / 86400000) / 7) + 1;
		}};
	$.datepicker.setDefaults($.datepicker.regional['fa']);
});

function JalaliDate(p0, p1, p2) {
    var gregorianDate;
    var jalaliDate;

	if (!isNaN(parseInt(p0)) && !isNaN(parseInt(p1)) && !isNaN(parseInt(p2))) {
        var g = jalali_to_gregorian([parseInt(p0, 10), parseInt(p1, 10), parseInt(p2, 10)]);
		setFullDate(new Date(g[0], g[1], g[2]));
    } else {
        setFullDate(p0);
    }

    function jalali_to_gregorian(d) {
		var adjustDay = 0;
		if(d[1]<0){
			adjustDay = leap_persian(d[0]-1)? 30: 29;
			d[1]++;
		}
        var gregorian = jd_to_gregorian(persian_to_jd(d[0], d[1] + 1, d[2])-adjustDay);
        gregorian[1]--;
        return gregorian;
    }

    function gregorian_to_jalali(d) {
        var jalali = jd_to_persian(gregorian_to_jd(d[0], d[1] + 1, d[2]));
        jalali[1]--;
        return jalali;
    }

    function setFullDate(date) {
        if (date && date.getGregorianDate) date = date.getGregorianDate();
        gregorianDate = new Date(date);
		gregorianDate.setHours(gregorianDate.getHours() > 12 ? gregorianDate.getHours() + 2 : 0)
        if (!gregorianDate || gregorianDate == 'Invalid Date' || isNaN(gregorianDate || !gregorianDate.getDate())) {
            gregorianDate = new Date();
        }
        jalaliDate = gregorian_to_jalali([
            gregorianDate.getFullYear(),
            gregorianDate.getMonth(),
            gregorianDate.getDate()]);
        return this;
    }

    this.getGregorianDate = function() { return gregorianDate; }

    this.setFullDate = setFullDate;

	this.setMonth = function(e) {
		jalaliDate[1] = e;
        var g = jalali_to_gregorian(jalaliDate);
        gregorianDate = new Date(g[0], g[1], g[2]);
        jalaliDate = gregorian_to_jalali([g[0], g[1], g[2]]);
	}

    this.setDate = function(e) {
        jalaliDate[2] = e;
        var g = jalali_to_gregorian(jalaliDate);
        gregorianDate = new Date(g[0], g[1], g[2]);
        jalaliDate = gregorian_to_jalali([g[0], g[1], g[2]]);
    };

    this.getFullYear = function() { return jalaliDate[0]; };
    this.getMonth = function() { return jalaliDate[1]; };
    this.getDate = function() { return jalaliDate[2]; };
    this.toString = function() { return jalaliDate.join(',').toString(); };
    this.getDay = function() { return gregorianDate.getDay(); };
    this.getHours = function() { return gregorianDate.getHours(); };
    this.getMinutes = function() { return gregorianDate.getMinutes(); };
    this.getSeconds = function() { return gregorianDate.getSeconds(); };
    this.getTime = function() { return gregorianDate.getTime(); };
    this.getTimeZoneOffset = function() { return gregorianDate.getTimeZoneOffset(); };
    this.getYear = function() { return jalaliDate[0] % 100; };

    this.setHours = function(e) { gregorianDate.setHours(e) };
    this.setMinutes = function(e) { gregorianDate.setMinutes(e) };
    this.setSeconds = function(e) { gregorianDate.setSeconds(e) };
    this.setMilliseconds = function(e) { gregorianDate.setMilliseconds(e) };
}
