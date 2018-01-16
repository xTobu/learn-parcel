//(function () {
    var Elements = {
        btnGotoUpload: $('.btn_bl'),
        btnTabs: $('.tab a'),
        btnSortDate: $('.tab a').eq(0),
        btnSortPopular: $('.tab a').eq(1),
        btnSortCountry: $('.tab a').eq(2),
        btnCategorys: $('.category li a'),
        itemBox: $('.itemBox .item.isShow'),
        ttBox: $('.ttBox'),
        ulCategory: $('.category ul'),
        Category: $('.category'),
    }
    var List = {
    
        MixitUp: {
            Setting: {
                Sort: {
                    Date: 'desc',
                    Popular: 'desc',
                    Country: 'asc',
                },
                Filter: {
                    Selected: '.isShow',
                }
            },
            mixer: null,
            filterTag: function (tag) {
                var $this = this
                $this.mixer.filter(tag)
                    .then(function (state) {
                        $this.Setting.Filter.Selected = tag;
                        //開放使用
                        List.Models.EndProgress();
                    });
            },
            sortDate: function () {
                var $this = this
    
                $this.mixer.sort('published-date:' + $this.Setting.Sort.Date)
                    .then(function (state) {
                        $this.Setting.Sort.Date == 'desc' ? $this.Setting.Sort.Date = 'asc' : $this.Setting.Sort.Date = 'desc'
                        //開放使用
                        List.Models.EndProgress();
                    });
            },
            sortPopular: function () {
                //            $.each(Elements.itemBox, function (index, value) {
                //                var count = $(this).find('.count').text();
                //                $(this).attr('data-popular', count);
                //            });
                var $this = this
                $this.mixer.sort('popular:' + $this.Setting.Sort.Popular)
                    .then(function (state) {
                        $this.Setting.Sort.Popular == 'desc' ? $this.Setting.Sort.Popular = 'asc' : $this.Setting.Sort.Popular = 'desc'
                        //開放使用
                        List.Models.EndProgress();
                    });
            },
            sortCountry: function () {
                var $this = this
                $this.mixer.sort('country:' + $this.Setting.Sort.Country)
                    .then(function (state) {
                        $this.Setting.Sort.Country == 'desc' ? $this.Setting.Sort.Country = 'asc' : $this.Setting.Sort.Country = 'desc'
                        //開放使用
                        List.Models.EndProgress();
                    });
            },
            init: function () {
                var containerEl = document.querySelector('.itemBox'); //
                this.mixer = mixitup(containerEl, {
                    load: {
                        sort: 'published-date:desc'
                    },
                    animation: {
                        effects: 'scale',
                        duration: 700
                    },
                });
    
            }
        },
        Models: {
            InProgress: function () {
                Elements.Category.addClass('progressing');
                Elements.btnTabs.addClass('progressing');
            },
            EndProgress: function () {
                Elements.Category.removeClass('progressing');
                Elements.btnTabs.removeClass('progressing');
            },
        },
    
        //所有監聽器的Func
        Listeners: {
            Category: function () {
                Elements.btnCategorys.on('click', function (e) {
                    e.preventDefault();
                    //and change to or
                    if (device.mobile() || $(window).width() < 768) {
                        Elements.ttBox.click();
                    }
                    //禁用其他按鈕
                    List.Models.InProgress();
                    TM.List.KillAll(Elements.itemBox);
                    if ($(this).hasClass('selected')) {
                        List.MixitUp.filterTag('.isShow');
                        Elements.btnCategorys.removeClass('selected')
    
                    } else {
                        Elements.btnCategorys.removeClass('selected')
                        $(this).addClass('selected')
                        var chosen = '';
                        switch ($(this).parent().index()) {
                            case 0:
                                chosen = 'snack';
                                break;
                            case 1:
                                chosen = 'culture';
                                break;
                            case 2:
                                chosen = 'temple';
                                break;
                            case 3:
                                chosen = 'mustto';
                                break;
                            case 4:
                                chosen = 'shop';
                                break;
                            case 5:
                                chosen = 'spot';
                                break;
                            case 6:
                                chosen = 'building';
                                break;
                            case 7:
                                chosen = 'souvenir';
                                break;
                        }
                        List.MixitUp.filterTag('.' + chosen + ".isShow");
                        
                        //11.11 這段看不懂 上面的OR GATE是成立的  但這邊看不懂
                       // Elements.ulCategory.hide();
                        Elements.Category.removeClass('category_open')
                        
                        gaclick('video_'+ Header.url_lang +'_tag' + ($(this).parent().index()+1));
                    }
    
    
                });
    
                Elements.ttBox.on('click', function (e) {
                    e.preventDefault();
                    // console.log($(this).parent('.category').hasClass('category_open'))
                    if (!$(this).parents('.category').hasClass('category_open')) {
                        Elements.ulCategory.css('display','flex');
                        Elements.Category.addClass('category_open')
                    } else {
                        Elements.ulCategory.hide();
                        Elements.Category.removeClass('category_open')
                    }
    
                })
            },
    
            Tab: function () {
                Elements.btnTabs.on('click', function (e) {
                    e.preventDefault();
                    Elements.btnTabs.removeClass('selected')
                    $(this).addClass('selected');
    
                    TM.List.KillAll(Elements.itemBox);
                    //禁用其他按鈕
                    List.Models.InProgress();
    
                });
                //依時間
                Elements.btnSortDate.on('click', function (e) {
    
                    //                $('.underline').css('left','0%');
                    e.preventDefault();
                    TM.List.ClickTab(0);
                    List.MixitUp.sortDate();
                    
                    gaclick('video_'+ Header.url_lang +'_filter1');
                });
                //依人氣
                Elements.btnSortPopular.on('click', function (e) {
                    e.preventDefault();
                    TM.List.ClickTab(35);
                    //                $('.underline').css('left','35%');
                    List.MixitUp.sortPopular();
                    
                    gaclick('video_'+ Header.url_lang +'_filter2');
                });
                //依國籍
                Elements.btnSortCountry.on('click', function (e) {
                    e.preventDefault();
    
                    TM.List.ClickTab(70);
                    List.MixitUp.sortCountry();
                    //                $('.underline').css('left','70%');
    
                    gaclick('video_'+ Header.url_lang +'_filter3');
                });
            },
            Page: function () {
                Elements.btnGotoUpload.on('click', function (e) {
                    e.preventDefault();
                    // location.href = Header.detectHref('upload');
                    trackWaitJump('video_' + Header.url_lang + '_upload', Header.detectHref('upload'));
                });
                Elements.itemBox.on('click', function (e) {
                    e.preventDefault();
                    location.href = Header.detectHref('show_video/' + $(this).data('videoid'));
    
                });
    
            },
            init: function () {
                this.Tab();
                this.Category();
                this.Page();
    
    
            },
    
    
    
        },
    
    
        init: function () {
            // console.log('List')
            this.MixitUp.init();
            this.Listeners.init();
            //        var containerEl = document.querySelector('.itemBox');//
            //        var mixer = mixitup(containerEl, {
            //            load: {
            //                sort: 'published-date:desc'
            //            }
            //        });
            //        
            //        mixer.sort('published-date:asc')
            //            .then(function (state) {
            //                console.log(state.activeSort.attribute === 'published-date'); // true
            //                console.log(state.activeSort.order === 'asc'); // true
            //            });
            
            gapage('video_' + Header.url_lang);
        }
    }
    $(function () {
        List.init();
    
    
    
    })
    
    
    
    window.onload = function () {
    
        //禁用其他按鈕
    //    List.Models.InProgress();
        if (device.mobile()) {
            //手機 隱藏 篩選列
            $('.category ul').hide();
        }
    
        $(".MainLoading").fadeOut("slow", function () {
            setTimeout(function () {
                //TweenMax
                TM.List.SetDefaultCSS($('.itemBox .item.isShow'));
                TM.List.PopOut($('.itemBox .item.isShow'));
    
            }, 500)
        });
    };
    
    
    //$(window).scroll(function () {
    //    if ($(window).scrollTop() + $(window).height() == $(document).height()) {
    //        var nowCount = List.MixitUp.Setting.Filter.Selected;
    //        var nowChosen = nowCount.replace('.isShow', '')
    //        //        if ($(nowCount).length > 7) {
    //        //            $('.loadingBox').show();
    //        //            
    //        //        }
    //
    //        var count = 0
    //        $('.item.mix').each(function (index, value) {
    //           
    //            if (count < 8 && !$(this).hasClass('isShow hasPopout')) {
    //                count++
    //                $(this).addClass('isShow notPopout');
    //
    //            }
    //        })
    //    }
    //});
    //}());
    