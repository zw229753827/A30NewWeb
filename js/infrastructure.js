

(function ($) {

    window.Ewin = function () {
        var html = '<div id="[Id]" class="modal fade" role="dialog" aria-labelledby="modalLabel">' +
            '<div class="modal-dialog modal-sm">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' +
            '<h4 class="modal-title" id="modalLabel">[Title]</h4>' +
            '</div>' +
            '<div class="modal-body">' +
            '<p>[Message]</p>' +
            '</div>' +
            '<div class="modal-footer">' +
            '<button type="button" class="btn btn-default cancel" data-dismiss="modal">[BtnCancel]</button>' +
            '<button type="button" class="btn btn-primary ok" data-dismiss="modal">[BtnOk]</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';


        var dialogdHtml = '<div id="[Id]" class="modal fade" role="dialog" aria-labelledby="modalLabel">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' +
            '<h4 class="modal-title" id="modalLabel">[Title]</h4>' +
            '</div>' +
            '<div class="modal-body">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
        var reg = new RegExp("\\[([^\\[\\]]*?)\\]", 'igm');
        var generateId = function () {
            var date = new Date();
            return 'mdl' + date.valueOf();
        }
        var init = function (options) {
            options = $.extend({}, {
                title: "操作提示",
                message: "提示内容",
                btnok: "确定",
                btncl: "取消",
                width: 200,
                auto: false
            }, options || {});
            var modalId = generateId();
            var content = html.replace(reg, function (node, key) {
                return {
                    Id: modalId,
                    Title: options.title,
                    Message: options.message,
                    BtnOk: options.btnok,
                    BtnCancel: options.btncl
                }[key];
            });
            $('body').append(content);
            $('#' + modalId).modal({
                width: options.width,
                backdrop: 'static'
            });
            $('#' + modalId).on('hide.bs.modal', function (e) {
                $('body').find('#' + modalId).remove();
            });
            return modalId;
        }

        return {
            confirm: function (options) {
                var id = init(options);
                var modal = $('#' + id);
                modal.find('.ok').removeClass('btn-primary').addClass('btn-success');
                modal.find('.cancel').show();
                return {
                    id: id,
                    on: function (callback) {
                        if (callback && callback instanceof Function) {
                            modal.find('.ok').click(function () { callback(true); });
                            modal.find('.cancel').click(function () { callback(false); });
                        }
                    },
                    hide: function (callback) {
                        if (callback && callback instanceof Function) {
                            modal.on('hide.bs.modal', function (e) {
                                callback(e);
                            });
                        }
                    }
                };
            }
        }
    }();
})(jQuery);
Array.prototype.indexOf = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};
Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
var regPos = new RegExp("^[0-9]*$");
function maxLengthCheck(object) {
    if (regPos.test(object.value)) {
        if (parseInt(object.value) > parseInt(object.max)) {
            object.value = object.max;
        }
        else if (parseInt(object.value) < parseInt(object.min)) {
            object.value = object.min;
        }
        else if (!object.value) {
            //object.value = object.min;
        }
    }
    else {
        object.value = object.min;
    }
}

function Post(URL, PARAMTERS, Self) {
    //创建form表单
    var temp_form = document.createElement("form");
    temp_form.action = URL;
    //如需打开新窗口，form的target属性要设置为'_blank'
    if (Self)
        temp_form.target = "_self";
    else
        temp_form.target = "_blank";
    temp_form.method = "post";
    temp_form.style.display = "none";
    //添加参数
    for (var item in PARAMTERS) {
        var opt = document.createElement("textarea");
        opt.name = PARAMTERS[item].name;
        opt.value = PARAMTERS[item].value;
        temp_form.appendChild(opt);
    }
    document.body.appendChild(temp_form);
    //提交数据
    temp_form.submit();
}
function GetParam(param) {
    var rst = '';
    rst += ConvertName(param, 'ScheduleNr', '订单号');
    rst += ConvertName(param, 'Engine_Nr', '钢印号');
    rst += ConvertName(param, 'ProductLabel', '钢印号');
    rst += ConvertName(param, 'Identifier', '钢印号');
    rst += ConvertName(param, 'ProdCodeFrom', '钢印号起始');
    rst += ConvertName(param, 'ProdCodeTo', '钢印号截止');
    rst += ConvertName(param, 'ProdFrom', '钢印号起始');
    rst += ConvertName(param, 'ProdTo', '钢印号截止');
    rst += ConvertName(param, 'DMC', '零件号');
    rst += ConvertName(param, 'DMCResult', '零件号');
    rst += ConvertName(param, 'DMCFrom', '零件号起始');
    rst += ConvertName(param, 'DMCTo', '零件号截止');
    rst += ConvertName(param, 'TimeFrom', '开始时间');
    rst += ConvertName(param, 'TimeTo', '截止时间');
    rst += ConvertName(param, 'Station', '工位');
    rst += ConvertName(param, 'Result', '状态');
    return rst;
}
function ConvertName(obj, name, text) {
    if (typeof (obj[name]) != "undefined") {
        if (name == 'Result') {
            return text + ":" + ResultName(obj[name]) + ';&nbsp;';
        }
        else {
            return text + ":" + obj[name] + ';&nbsp;';
        }
    }
    return '';
}
function ResultName(state) {
    if (state == 0)
        return '所有';
    else if (state == 1)
        return '合格';
    else if (state == 2)
        return '不合格';
}
function obj2url(obj) {
    var json = JSON.stringify(obj);
    json = json.replace('{', '');
    json = json.replace('}', '');
    var pas = json.split(',')
    var rst = [];
    for (var i = 0; i < pas.length; i++) {
        var sp = pas[i].split(':');
        var pname = sp[0].replace('"', '').replace('"', '');
        var sa = [];
        for (var j = 1; j < sp.length; j++) {
            sa.push(sp[j].replace('"', '').replace('"', ''));
        }
        var pvalue = sa.join(':');
        if (pname != 'Export')
            rst.push(pname + '=' + pvalue);
    }
    rst.push("Export=true");
    return rst.join('&');
}
function keydowncheck(key) {
    console.log('keydown:' + key);
    if (key == 37 || key == 39) {
        return 1;    //只需要屏蔽的输入按键
    }
    if (key == 8 || key == 46) {
        return 2;    //清空键
    }
}
function keycodeCheck(keycode, which) {
    if (keycode != 0 && keycode != which) {
        return 0;
    }
    var key = keycode || which;
    console.log(key);
    if (key >= 48 && key <= 57) {
        return 1;//数字
    }
    if (key >= 97 && key <= 122) {
        return 2;//小写字母
    }
    if (key >= 65 && key <= 90) {
        return 3;//大写字母
    }
    if (key >= 65 && key <= 90) {
        return 3;//大写字母
    }
    if (key == 33 || key == 64 || key == 35 || key == 36 || key == 37 || key == 94 || key == 38 || key == 42 || key == 40 || key == 41
        || key == 44 || key == 60 || key == 46 || key == 62 || key == 47 || key == 63 || key == 59 || key == 58 || key == 39 || key == 34
        || key == 91 || key == 93 || key == 123 || key == 125 || key == 45 || key == 95 || key == 43 || key == 61 || key == 96 || key == 126 || key == 92 || key == 124) {
        return 4;//特殊字符
    }
    if (key == 13) {
        return 5;//回车
    }
    if (key == 8 || key == 46) {
        return 6;//清空
    }
    return 0;
}
function showsuccess(str) {
    $.globalMessenger().post({
        message: str,
        hideAfter: 2,
        type: 'success',
        showCloseButton: true
    });
}
function showerror(str) {
    $.globalMessenger().post({
        message: str,
        hideAfter: 2,
        type: 'error',
        showCloseButton: true
    });
}
function isNumeric(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    var vkey = String.fromCharCode(key);
    var regex = /[0-9]/;
    if (!regex.test(vkey)) {
        if (key != 8) {
            theEvent.returnValue = false;
            if (theEvent.preventDefault) theEvent.preventDefault();
        }
    }
}
function isNumber(value) {
    value = value.replace(/(^\s*)|(\s*$)/g, "");
    if (!value)
        return false;
    var regex = /^[0-9]+$/;
    return regex.test(value);
}

$.ajaxSetup({ cache: false });
function AJAX(URL, formdata, onsuccess, onerror) {
    $.ajax({
        url: URL,
        type: "GET",
        data: formdata,
        datatype: "json",
        success: function (rst) {
            if (rst.Success) {
                if (typeof (rst.Data) == 'number' && rst.Data > 100000) {
                    $.ajax({
                        url: '/ErrorCode/Read',
                        type: "GET",
                        data: {
                            'ErrorCode': rst.Data
                        },
                        datatype: "json",
                        success: function (rst) {
                            showerror(rst.Data[0].Text_CN);
                        }
                    });
                    if (onerror)
                        onerror(rst);
                    else
                        console.log(rst);
                }
                else {
                    onsuccess(rst.Data);
                }
            }
            else {
                if (typeof (rst.Data) == 'number' && rst.Data > 100000) {
                    $.ajax({
                        url: '/ErrorCode/Read',
                        type: "GET",
                        data: {
                            'ErrorCode': rst.Data
                        },
                        datatype: "json",
                        success: function (rst) {
                            showerror(rst.Data[0].Text_CN);
                        }
                    });
                }
                if (onerror)
                    onerror(rst);
                else
                    console.log(rst);
            }
        },
        error: function (data) {
            //console.log(data);
            if (onerror)
                onerror(data);
            else
                console.log(data);
        }
    });
    // $.getJSON(URL, "", function(data) {
    //             onsuccess(data);
    //             // console.log(data);
    // });
}

function getWeekNumber() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth();
    var days = now.getDate();
    //那一天是那一年中的第多少天
    for (var i = 0; i < month; i++) {
        days += getMonthDays(year, i);
    }
    //那一年第一天是星期几
    var yearFirstDay = new Date(year, 0, 1).getDay() || 7;
    var week = null;
    if (yearFirstDay == 1) {
        week = Math.ceil(days / 7);
    } else {
        days -= (7 - yearFirstDay + 1);
        week = Math.ceil(days / 7) + 1;
    }
    return week;
}
function getMonthDays(year, month) {
    return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month] || (isLeapYear(year) ? 29 : 28);
}
function isLeapYear(year) {
    return (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0);
}
function isIE() {
    if (!!window.ActiveXObject || "ActiveXObject" in window)
        return true;
    else
        return false;
}
function IsDateTime(timeStr) {
    var sp = timeStr.split(' ');
    if (sp.length != 2)
        return false;
    var dateSp = sp[0].split('-');
    if (dateSp.length != 3)
        return false;
    if (!isNumber(dateSp[0]) || !isNumber(dateSp[1]) || !isNumber(dateSp[2])) {
        return false;
    }
    if (dateSp[0] < 2000 || dateSp[0] > 2100 || dateSp[1] < 1 || dateSp[1] > 12 || dateSp[2] < 1 || dateSp[2] > 31) {
        return false;
    }
    var timeSp = sp[1].split(':');
    if (timeSp.length != 3) {
        return false;
    }
    if (!isNumber(timeSp[0]) || !isNumber(timeSp[1]) || !isNumber(timeSp[2])) {
        return false;
    }
    if (timeSp[0] < 0 || timeSp[0] > 24 || timeSp[1] < 0 || timeSp[1] > 60 || timeSp[2] < 0 || timeSp[2] > 60) {
        return false;
    }
    return true;
}