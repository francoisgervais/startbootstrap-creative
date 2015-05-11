!function(){"use strict";var Bubble=function(wMonth,min,start,end){this.min=min,this.start=start,this.end=end,this.widthMonth=wMonth};Bubble.prototype.formatMonth=function(num){return num=parseInt(num,10),num>=10?num:"0"+num},Bubble.prototype.getStartOffset=function(){return this.widthMonth/12*(12*(this.start.getFullYear()-this.min)+this.start.getMonth())},Bubble.prototype.getFullYears=function(){return(this.end&&this.end.getFullYear()||this.start.getFullYear())-this.start.getFullYear()},Bubble.prototype.getMonths=function(){var fullYears=this.getFullYears(),months=0;return this.end?this.end.hasMonth?(months+=this.end.getMonth()+1,months+=12-(this.start.hasMonth?this.start.getMonth():0),months+=12*(fullYears-1)):(months+=12-(this.start.hasMonth?this.start.getMonth():0),months+=12*(fullYears-1>0?fullYears-1:0)):months+=this.start.hasMonth?1:12,months},Bubble.prototype.getWidth=function(){return this.widthMonth/12*this.getMonths()},Bubble.prototype.getDateLabel=function(){return[(this.start.hasMonth?this.formatMonth(this.start.getMonth()+1)+"/":"")+this.start.getFullYear(),this.end?"-"+((this.end.hasMonth?this.formatMonth(this.end.getMonth()+1)+"/":"")+this.end.getFullYear()):""].join("")},window.TimesheetBubble=Bubble}(),function(){"use strict";var Timesheet=function(container,min,max,data){this.data=[],this.year={min:min,max:max},this.parse(data||[]),"undefined"!=typeof document&&(this.container="string"==typeof container?document.querySelector("#"+container):container,this.drawSections(),this.insertData())};Timesheet.prototype.insertData=function(){for(var html=[],widthMonth=this.container.querySelector(".scale section").offsetWidth,n=0,m=this.data.length;m>n;n++){var cur=this.data[n],bubble=new TimesheetBubble(widthMonth,this.year.min,cur.start,cur.end),line=['<span style="margin-left: '+bubble.getStartOffset()+"px; width: "+bubble.getWidth()+'px;" class="bubble bubble-'+(cur.type||"default")+'" data-duration="'+(cur.end?Math.round((cur.end-cur.start)/1e3/60/60/24/39):"")+'"></span>','<span class="date">'+bubble.getDateLabel()+"</span> ",'<span class="label">'+cur.label+"</span>"].join("");html.push("<li>"+line+"</li>")}this.container.innerHTML+='<ul class="data">'+html.join("")+"</ul>"},Timesheet.prototype.drawSections=function(){for(var html=[],c=this.year.min;c<=this.year.max;c++)html.push("<section style='padding:1px;'>"+c+"</section>");this.container.className="timesheet color-scheme-default",this.container.innerHTML='<div class="scale">'+html.join("")+"</div>"},Timesheet.prototype.parseDate=function(date){return-1===date.indexOf("/")?(date=new Date(parseInt(date,10),0,1),date.hasMonth=!1):(date=date.split("/"),date=new Date(parseInt(date[1],10),parseInt(date[0],10)-1,1),date.hasMonth=!0),date},Timesheet.prototype.parse=function(data){for(var n=0,m=data.length;m>n;n++){var beg=this.parseDate(data[n][0]),end=4===data[n].length?this.parseDate(data[n][1]):null,lbl=4===data[n].length?data[n][2]:data[n][1],cat=data[n][3]||"default";beg.getFullYear()<this.year.min&&(this.year.min=beg.getFullYear()),end&&end.getFullYear()>this.year.max?this.year.max=end.getFullYear():beg.getFullYear()>this.year.max&&(this.year.max=beg.getFullYear()),this.data.push({start:beg,end:end,label:lbl,type:cat})}},window.Timesheet=Timesheet}();! function () {
    "use strict";
    var t = {
        ready: function (e) {
            /in/.test(document.readyState) ? setTimeout(function () {
                t.ready(e)
            }, 9) : e()
        }
    };
    window.Lib = t
}(),

function () {
    "use strict";
    var t = function (t, e, n, a) {
        this.data = [], this.year = {
            min: e,
            max: n
        }, this.parse(a || []), "undefined" != typeof document && (this.container = "string" == typeof t ? document.querySelector("#" + t) : t, this.drawSections(), this.insertData())
    };
    t.prototype.insertData = function () {
        for (var t = [], n = this.container.querySelector(".scale section").offsetWidth, a = 0, s = this.data.length; s > a; a++) {
            var i = this.data[a],
                r = new e(n, this.year.min, i.start, i.end),
                o = ['<span style="margin-left: ' + r.getStartOffset() + "px; width: " + r.getWidth() + 'px;" class="bubble bubble-' + (i.type || "default") + '" data-duration="' + (i.end ? Math.round((i.end - i.start) / 1e3 / 60 / 60 / 24 / 39) : "") + '"></span>', '<span class="date">' + r.getDateLabel() + "</span> ", '<span class="label">' + i.label + "</span>"].join("");
            t.push("<li>" + o + "</li>")
        }
        this.container.innerHTML += '<ul class="data">' + t.join("") + "</ul>"
    }, t.prototype.drawSections = function () {
        for (var t = [], e = this.year.min; e <= this.year.max; e++) t.push("<section">" + e + "</section>");
        this.container.className = "timesheet color-scheme-default", this.container.innerHTML = '<div class="scale">' + t.join("") + "</div>"
    }, t.prototype.parseDate = function (t) {
        return -1 === t.indexOf("/") ? (t = new Date(parseInt(t, 10), 0, 1), t.hasMonth = !1) : (t = t.split("/"), t = new Date(parseInt(t[1], 10), parseInt(t[0], 10) - 1, 1), t.hasMonth = !0), t
    }, t.prototype.parse = function (t) {
        for (var e = 0, n = t.length; n > e; e++) {
            var a = this.parseDate(t[e][0]),
                s = 4 === t[e].length ? this.parseDate(t[e][1]) : null,
                i = 4 === t[e].length ? t[e][2] : t[e][1],
                r = 4 === t[e].length ? t[e][3] : 3 === t[e].length ? t[e][2] : "default";
            a.getFullYear() < this.year.min && (this.year.min = a.getFullYear()), s && s.getFullYear() > this.year.max ? this.year.max = s.getFullYear() : a.getFullYear() > this.year.max && (this.year.max = a.getFullYear()), this.data.push({
                start: a,
                end: s,
                label: i,
                type: r
            })
        }
    };
    var e = function (t, e, n, a) {
        this.min = e, this.start = n, this.end = a, this.widthMonth = t
    };
    e.prototype.formatMonth = function (t) {
        return t = parseInt(t, 10), t >= 10 ? t : "0" + t
    }, e.prototype.getStartOffset = function () {
        return this.widthMonth / 12 * (12 * (this.start.getFullYear() - this.min) + this.start.getMonth())
    }, e.prototype.getFullYears = function () {
        return (this.end && this.end.getFullYear() || this.start.getFullYear()) - this.start.getFullYear()
    }, e.prototype.getMonths = function () {
        var t = this.getFullYears(),
            e = 0;
        return this.end ? this.end.hasMonth ? (e += this.end.getMonth() + 1, e += 12 - (this.start.hasMonth ? this.start.getMonth() : 0), e += 12 * (t - 1)) : (e += 12 - (this.start.hasMonth ? this.start.getMonth() : 0), e += 12 * (t - 1 > 0 ? t - 1 : 0)) : e += this.start.hasMonth ? 1 : 12, e
    }, e.prototype.getWidth = function () {
        return this.widthMonth / 12 * this.getMonths()
    }, e.prototype.getDateLabel = function () {
        return [(this.start.hasMonth ? this.formatMonth(this.start.getMonth() + 1) + "/" : "") + this.start.getFullYear(), this.end ? "-" + ((this.end.hasMonth ? this.formatMonth(this.end.getMonth() + 1) + "/" : "") + this.end.getFullYear()) : ""].join("")
    }, window.Timesheet = t
}(),

function () {
    "use strict";
    Lib.ready(function () {
        new Timesheet("timesheet-default", 2005, 2015, [
            ["01/2005", "10/2005", "AGECEM", "lorem"],
            ["02/2006", "02/2007", "Sec-Pro", "ipsum"],
            ["12/2007", "08/2008", "Securitas", "dolor"],
            ["01/2009", "05/2009", "AGECEM", "dolor"],
            ["05/2009", "08/2009", "Larrivé, Cabot & Champagne", "ipsum"],
            ["06/2009", "02/2011", "AGECEM", "default"],
            ["04/2011", "2012", "Medical incapacity", "ipsum"],
            ["04/2013", "08/2013", "Sazerac Canada", "sit"],
            ["10/2013", "01/2015", "Hypractif", "lorem"]
        ]), document.querySelector("#switch-dark").addEventListener("click", function () {
            document.querySelector("body").className = "index black"
        }), document.querySelector("#switch-light").addEventListener("click", function () {
            document.querySelector("body").className = "index white"
        })
    })
}();
