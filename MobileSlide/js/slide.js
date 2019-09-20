//创建构造函数
function Slide(elem, options) {
    this.elem = elem;
    this.defaults = { //设定一个默认值，没有传入options时直接使用默认值
        initIndex: 0,
        transTime: 0.3,
        hasindictor: false
    };

    //判断options是否有传参数
    this.initIndex = typeof options.initIndex !== "undefined" ? options.initIndex : this.defaults.initIndex;
    this.transTime = typeof options.transTime !== "undefined" ? options.transTime : this.defaults.transTime;
    this.hasindictor = typeof options.hasindictor !== "undefined" ? options.hasindictor : this.defaults.hasindictor;

    //获取到幻灯片容器
    this.slideContainer = this.elem.children[0];

    //获取到所有的幻灯片项目
    this.items = this.slideContainer.children;

    //获取到每张图片的宽度,就是每次切换所需要的距离
    this.distance = this.items[0].offsetWidth;

    //设置最小指数
    this.minIndex = 0;

    //设置最大指数
    this.maxIndex = this.items.length - 1;

    //校正指数
    this.index = this._adjustIndex(this.initIndex);

    //判断是否需要添加指示器
    if (this.hasindictor) {
        this._setIndictor();
        //添加指示器高亮
        this._setIndictorActive(this.index);
    }

    //移动幻灯片
    this.move(this.getDistanceByIndex(this.index));
}

//根据传入的index切换幻灯片到指定位置
Slide.prototype.to = function(index, callBack) {
    //判断参数是否在可用范围
    if (index < this.minIndex) {
        index = this.minIndex;
    } else if (index > this.maxIndex) {
        index = this.maxIndex;
    }

    //每次都更新一下index
    this.index = index;

    //设置动画时间
    this._setItemContainerTransition(this.transTime);

    //移动到指定位置
    this.move(this.getDistanceByIndex(this.index));

    //给指示器添加高亮
    if (this.hasindictor) {
        this._setIndictorActive(this.index);
    };

    //监听动画结束后，将动画持续时间置0，避免拖动时有延迟
    var self = this;
    this.slideContainer.addEventListener("transitionend", function() {
        self.slideContainer.style.transitionDuration = 0 + "s";
        //判断回调函数是否执行，快速滑动事件触发后才会执行
        if (typeof callBack === "function") {
            callBack();
        }
    });
};

//切换图片为上一张
Slide.prototype.prev = function(callBack) {
    this.to(this.index - 1, callBack);
};

//切换图片为下一张
Slide.prototype.next = function(callBack) {
    this.to(this.index + 1, callBack)
};

//校正指数，防止传入参数过大或过小
Slide.prototype._adjustIndex = function(index) {
    if (index < this.minIndex) {
        index = this.minIndex;
    } else if (index > this.maxIndex) {
        index = this.maxIndex;
    }
    return index;
};

//通过index获取需要移动的距离
Slide.prototype.getDistanceByIndex = function(index) {
    return -index * this.distance;
};

//移动函数
Slide.prototype.move = function(distance) {
    this.slideContainer.style.transform = "translate3d(" + distance + "px,0,0)";
};

//设置动画持续时间
Slide.prototype._setItemContainerTransition = function(speed) {
    this.slideContainer.style.transitionDuration = speed + "s";
}

//创建指示器
Slide.prototype._setIndictor = function() {
    var createIndictor = document.createElement("div");
    var html = "";
    createIndictor.className = "indictor-container";
    for (var i = 0, len = this.maxIndex; i <= len; i++) {
        html += '<span class="indictor-item"></span>';
    }
    createIndictor.innerHTML = html;
    this.elem.appendChild(createIndictor);
};

//指示器高亮
Slide.prototype._setIndictorActive = function(index) {
    var indictorItems = this.elem.querySelectorAll(".indictor-item");
    for (var i = 0, len = indictorItems.length; i < len; i++) {
        indictorItems[i].classList.remove("indictor-item-active");
    }
    indictorItems[index].classList.add("indictor-item-active");
};

//获取elem
Slide.prototype.getElem = function() {
    return this.elem;
};

//获取index
Slide.prototype.getIndex = function() {
    return this.index;
};

//获取距离distance
Slide.prototype.getDistance = function() {
    return this.distance;
};
