var app = app || {};

app.Controls = function (id) {
    this.id = id;
    this.table = document.createElement("table");
    document.getElementById(id).appendChild(this.table);
    this._newElem();

    this.buttonsNumber = 0;
    this.rangeNumber = 0;
};

app.Controls.prototype._newElem = function () {
    this.elem = document.createElement("td");
    var tr = document.createElement("tr");
    tr.appendChild(this.elem);
    this.table.appendChild(tr);
};

app.Controls.prototype.addButton = function (callback, text) {
    var button = document.createElement("button");
    button.setAttribute("class", "control");
    button.innerHTML = text;
    button.addEventListener("click", callback);
    var div = document.createElement("div");
    div.appendChild(button);
    this.elem.appendChild(div);

    this.buttons = this.buttons || [];
    this.buttons.push({
        number: this.buttonsNumber++,
        button: div
    });

    return {
        setText: function (text) {
            button.innerHTML = text;
        }
    }
};

app.Controls.prototype.addText = function (text, options) {
    options = options || {};
    var textEl = document.createElement("span");
    textEl.innerHTML = text;
    textEl.setAttribute("class", "control");

    if (options.newLine) {
        this._newElem();
    }
    this.elem.appendChild(textEl);

    return {
        setText: function (text) {
            textEl.innerHTML = text;
        }
    }
};

app.Controls.prototype._initInput = function () {
    this.input = document.createElement("input");

    this.elem.appendChild(this.input);
};

app.Controls.prototype.addCheckbox = function (oncheckedCb, onuncheckedCb, isChecked, text) {

    if (!this.input) {
       // this._initInput();
    }

    var checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");

    checkbox.checked = isChecked;

    function callback () {
        if (this.checked) {
            oncheckedCb();
        } else {
            onuncheckedCb();
        }
    }

    checkbox.addEventListener("change", callback);

    var p = document.createElement("span");
    p.innerHTML = text;

    var div = document.createElement("div");
    div.setAttribute("class", "control");
    div.appendChild(checkbox);
    div.appendChild(p);

    this.elem.appendChild(div);
};

app.Controls.prototype.addRange = function (callback, text, left, right, step, value) {
    var div = document.createElement("div"),
        t = document.createElement("span"),
        range = document.createElement("input");
    div.setAttribute("class", "control");
    t.innerHTML = text;
    //div.appendChild(document.createElement("br"));

    range.setAttribute("type", "range");
    range.setAttribute("min", left);
    range.setAttribute("max", right);
    range.setAttribute("step", step);
    range.setAttribute("value", value);
    range.addEventListener("input", function () {
        var value = +range.value;
        callback(value);
    });

    div.appendChild(range);
    t.setAttribute("style", "margin-left: 10px");
    div.appendChild(t);
    this.elem.appendChild(div);

    this.ranges = this.ranges || [];
    var obj = {
        number: this.rangeNumber++,
        range: div
    };
    this.ranges.push(obj);

    var self = this;
    return {
        setText: function (text) {
            t.innerHTML = text;
        },
        remove: function () {
            _.pull(self.ranges, obj);
            obj.range.remove();
        }
    }
};