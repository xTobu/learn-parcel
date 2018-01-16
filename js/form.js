if (this.getMobileOperatingSystem()) {
    screen.orientation.onchange = function () {
        var way = screen.orientation.type.match(/\w+/)[0];
        if (way == "landscape") {
            $('.trans_bg').removeClass('input_focus');
        }
    };
}

$('input,textarea,select').on('focus', function () {
    $('.trans_bg').addClass('input_focus');
})


function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android/i.test(userAgent)) {
        return true;
    }
    return false;
}


var Index = {
    Element: {

        init: function () {

            //openingLogo
            this.openingLogo = $('div.wrap div.openingLogo');
            //logo
            this.logo = $('a.logo');
            //fb
            this.fb = $('div.social a').eq(0);
            //yt
            this.yt = $('div.social a').eq(1);
            //footer_social
            this.footer_social = $('footer ul').eq(0).find('li');
            this.footer_right = $('footer ul').eq(1).find('li');
            //bur
            this.bur = $('a.bur');
            //menu
            this.pcMenu = $('header').find('li');
            this.mMenu = $('div.menuBox').find('li');

            //整塊固定物件
            this.FixedElement = $('div.fixed-element');



            //section index        
            /////////////////////////
            this.index = {
                immediately: $('section.index a.btn'),
            };

            //section join        
            /////////////////////////
            var $join = $('section.join');
            var $form = $('div.cirBox div.form');
            //下拉選單 綁定改變

            //沒選擇時要灰色
            if ($('div.cirBox div.form').find('option:selected').val() == 0)
                $('div.cirBox div.form').find('select').css('color', '#737373');
            $form.find('select').on('change', function () {
                $(this).parent().removeClass('warn');
                $element.join.form.category = $(this).find('option:selected')
                if (Index.Element.join.form.category.val() == 0)
                    $('div.cirBox div.form').find('select').css('color', '#737373')
                else
                    $('div.cirBox div.form').find('select').css('color', '#555')

            })
            this.join = {
                step_now: 0,
                form: {
                    category: $form.find('option:selected'),
                    name: $form.find('input').eq(0),
                    shortname: $form.find('input').eq(1),
                    taxid: $form.find('input').eq(2),
                    statement: $form.find('textarea'),
                },
                btn: {

                    left: $join.find('a.left'),
                    right: $join.find('a.right'),

                    //step 1
                    upload: $form.parent().find('a.btn-blue'),

                    //step2
                    reupload: $('div.s2-main').find('a.btn-blue').eq(0),
                    preview: $('div.s2-main').find('a.btn-blue').eq(1),
                    plus: $('div.s2-main').find('a.plus'),
                    minus: $('div.s2-main').find('a.minus'),

                    //step3
                    submit: $('div.s3-main').find('a.btn-blue'),



                },
                input: {
                    upload: $form.parent().find('input#upload'),
                },
                GetFormData: function () {
                    var FormVal = {};
                    for (var prop in this.form) {
                        FormVal[prop] = this.form[prop].val();
                    }
                    return FormVal
                }
            };


            //section company-logo        
            /////////////////////////
            var $company = $('section.company-logo')
            this.company = {
                category: $company.find("div.category"),
                category_m: $company.find("div.category-m"),
            }
            //連署企業 左側選擇顯示
            if (!device.mobile()) {
                Index.Element.company.category.addClass('hidden');
                Index.Element.company.category.removeClass('show');
            }

        }

    },
    Var: {},
    Data: {
        hosturl: null,
        url_list: {
            logo: null,
            fb: null,
            tvc: null,
            youtube: null,
            contact: 'http://www.wildaidchina.org/',
            privacy: 'http://www.wildaidchina.org/'
        },
        init: function (callback) {
            switch (location.origin) {
                case 'https://www.wildaidtaiwan.org':
                    this.hosturl = 'https://www.wildaidtaiwan.org';
                    break;
                default:
                    this.hosturl = 'https://wildaid.webgene.com.tw'
            }
            var url_list = this.url_list;
            $.ajax({
                async: true,
                type: "POST",
                url: Index.Data.hosturl + '/api/url_list',
                dataType: 'json',

                complete: function (data) {

                },
                success: function (data) {
                    url_list.fb = data[0].fb;
                    url_list.tvc = 'https://www.youtube.com/watch?v=' + Index.Function.GetYoutubeID(data[0].tvc);
                    url_list.logo = data[0].logo;
                    url_list.youtube = data[0].youtube;
                    callback();
                },
                error: function (data) {

                    // console.log(data)
                    //                                alert("【影片連結】格式錯誤");
                },
            });
        }
    },
    Function: {
        GotoStep: function (step_goto, callback) {
            var $step = $('section.join div.content');
            var $step_now = Index.Element.join.step_now;

            //忘記為何而加 12/22
            //            $element.join.btn.left.removeClass('hidden')
            //            $element.join.btn.right.removeClass('hidden')

            $element.join.btn.left.css('pointer-events', 'none');
            $element.join.btn.right.css('pointer-events', 'none');
            $element.join.btn.minus.css('pointer-events', 'none');
            $element.join.btn.plus.css('pointer-events', 'none');
            $element.join.btn.preview.css('pointer-events', 'none');
            $element.join.btn.reupload.css('pointer-events', 'none');
            $element.join.btn.upload.css('pointer-events', 'none');
            $element.join.btn.submit.css('pointer-events', 'none');


            $step.eq($step_now).fadeOut("slow", function () {
                $step.eq(step_goto).fadeIn("slow", function () {
                    Index.Element.join.step_now = step_goto;

                    switch (step_goto) {
                        case 0:
                            gapage('go_1')
                            $element.join.btn.left.addClass('hidden')
                            $element.join.btn.left.css('pointer-events', 'none');

                            if ($element.join.input.upload.val()) {
                                $element.join.btn.right.removeClass('hidden')
                                $element.join.btn.right.css('pointer-events', 'auto');
                            } else {
                                $element.join.btn.right.addClass('hidden')
                                $element.join.btn.right.css('pointer-events', 'none');
                            }

                            break;
                        case 1:
                            gapage('go_2')
                            $element.join.btn.left.removeClass('hidden')
                            $element.join.btn.left.css('pointer-events', 'auto');

                            $element.join.btn.right.addClass('hidden')
                            $element.join.btn.right.css('pointer-events', 'none');

                            var $canvas = $Fabric.Var.finBox;
                            if ($canvas.item(0)) {
                                $canvas.item(0).text = Index.Element.join.form.shortname.val();
                                $canvas.renderAll()
                            }
                            //                            var text = new fabric.Text(Index.Element.join.form.shortname.val(), {
                            //                                fontFamily: 'Noto Sans TC',
                            //                                left: 0, //Take the block's position
                            //                                top: 0,
                            //                                //                  fill: '#363636',
                            //                                fill: '#231815',
                            //                                fontSize: $canvas.getWidth() / 14,
                            //                                fontWeight: '600',
                            //                                //不可選擇
                            //                                selectable: false,
                            //                                //不可選擇移動
                            //                                evented: false
                            //                            })
                            //                            text.set("top", ($canvas.getHeight() - text.height) * 1.01);
                            //                            text.set("left", ($canvas.getWidth() / 2));
                            //                            if ($canvas.item(0))
                            //                                $canvas.remove($canvas.item(0));
                            //                            $canvas.add(text);

                            break;
                        case 2:
                            gapage('go_3')
                            $element.join.btn.left.removeClass('hidden')
                            $element.join.btn.left.css('pointer-events', 'auto');
                            $element.join.btn.right.addClass('hidden')
                            $element.join.btn.right.css('pointer-events', 'none');
                            break;
                        case 3:
                            gapage('finish')
                            ga_data.isFinish = true
                            $element.join.btn.left.addClass('hidden')
                            $element.join.btn.right.addClass('hidden')
                            $element.join.btn.left.css('pointer-events', 'none');
                            $element.join.btn.right.css('pointer-events', 'none');
                            break;
                    }

                    $element.join.btn.minus.css('pointer-events', 'auto');
                    $element.join.btn.plus.css('pointer-events', 'auto');
                    $element.join.btn.preview.css('pointer-events', 'auto');
                    $element.join.btn.reupload.css('pointer-events', 'auto');
                    $element.join.btn.upload.css('pointer-events', 'auto');
                    $element.join.btn.submit.css('pointer-events', 'auto');

                    callback()
                });

            })
        },
        GetYoutubeID: function (url) {
            var p = /^(?:https?:\/\/)?(?:(?:www|m)\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
            return (url.match(p)) ? RegExp.$1 : false;
        },
        ShowPopup: function (str) {
            $('.popup').find('.inner p').html(str)
            $('.popup').fadeIn()

        }
    },
    Listener: {
        init: function () {
            //初始設置
            ///////////////////////////////////
            $element = Index.Element;
            $function = Index.Function;
            $data = Index.Data;

            //Header Footer
            ///////////////////////////////////

            if (!device.desktop())
                $('section.index div.platebg').hide()

            //滾動時Header加入class
            if (device.desktop()) {
                $('html, body').scroll(function () {
//                    console.log($('.company-logo .main h2').offset().top)
                    if($('.company-logo .main h2').offset().top>$('.company-logo .category').offset().top){
                         $('.company-logo .category').removeClass('abso')
                    }
                    if($('.company-logo .main h2').offset().top<10){
                        
                         $('.company-logo .category').addClass('abso')
                        
                    }
                    if ($('body').scrollTop() == 0) {
                        //                        if (!$ScrollMagic.Temp.plate) {
                        //                            $ScrollMagic.Temp.plate = true;
                        //                            $('section.index div.cover').plate({
                        //                                element: $('section.index div.platebg'),
                        //                                perspective: 600,
                        //                                maxRotation: 2,
                        //                                animationDuration: 200
                        //                            });
                        //                            $('section.index').css('top', '-5%');
                        //                            $('section.index').css('left', '-5%');
                        //                            $('section.intro canvas').css('top', '-240px')
                        //                        }
                        //                        $('header').removeClass('scrolled')
                        //                        $element.logo.find('img').attr('src', './asset/svg/logo-w.svg')

                    }
                    if ($('body').scrollTop() > 0) {
                        //                        if ($ScrollMagic.Temp.plate) {
                        //                            $ScrollMagic.Temp.plate = false;
                        //                            $('section.index div.cover').plate('remove');
                        //                            $('section.index').css('top', '0%');
                        //                            $('section.intro canvas').css('top', '-140px')
                        //                            //                            $('section.index').css('left', '0%');
                        //                        }
                        //                        $('header').addClass('scrolled')
                        //                        $element.logo.find('img').attr('src', './asset/svg/logo-b.svg')

                    }


                });


            }

            //popup
            $('.popup').find('a.btn-blue').on('click', function (e) {
                e.preventDefault();
                $('.popup').fadeOut();
            })




            //bur
            $element.bur.click(function (e) {
                e.preventDefault();
                $(this).toggleClass('active');
                $('.overlay').toggleClass('open');
                if ($ScrollMagic.Temp.index.top) {
                    return
                }
                if ($(this).hasClass('active')) {
                    if (!device.desktop() && $ScrollMagic.Temp.index.scrolled) {
                        $ScrollMagic.Temp.index.scrolled = false;
                        $('header').removeClass('scrolled')
                        Index.Element.logo.find('img').attr('src', './asset/svg/logo-w.svg')
                    }
                }
                else {
                    if (!device.desktop() && !$ScrollMagic.Temp.index.scrolled) {
                        //                            alert('>= 0.55')
                        $ScrollMagic.Temp.index.scrolled = true;
                        $('header').addClass('scrolled')
                        Index.Element.logo.find('img').attr('src', './asset/svg/logo-b.svg')
                    }
                }


                return;
            });

            //menu
            var delay_time = 600;
            var inMobule = 0;
            var hh = $('header').height();
            var index_top = $(".index").offset().top;
            var intro_top = $(".intro").offset().top - ((hh / 2) + 10);
            var join_top = $(".join").offset().top;
            var celebrity_top = $(".celebrity").offset().top - 5;

            if ($(window).width() > 1300) {
                celebrity_top = celebrity_top + 25;
            }

            if (device.mobile()) {
                intro_top = intro_top - ((hh));
                celebrity_top = celebrity_top - ((hh));
            }

            if (device.desktop()) {
                join_top = join_top + ((hh / 2) + 10)
                if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
                    celebrity_top = $(".celebrity").offset().top - ((hh / 2) + 10);
                }
            }

            if (device.tablet()) {
                intro_top = intro_top - (hh / 2) - 30;
                //                join_top = join_top-(hh/2)-30;
                celebrity_top = celebrity_top - (hh / 2) - 15;

            }



            $element.pcMenu.on('touchstart mousedown', function (e) {
                e.preventDefault();

                //點擊滾動時不跑SCROLLMAGIC
                $ScrollMagic.Temp.scolling = true;
                setTimeout(function () {
                    $ScrollMagic.Temp.scolling = false;
                }, 700)

                $(this).parent().find('li a').removeClass('active');
                $(this).find('a').addClass('active');
                var time = 600;
                if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
                    time = 0;
                }

                switch ($(this).index()) {
                    //關於無翅聯盟
                    case 0:
                        gaclick('menu_about')
                        $("html, body").animate({
                            scrollTop: intro_top
                        }, time);
                        break;
                        //加入聯盟
                    case 1:
                        gaclick('menu_go')
                        $("html, body").animate({
                            scrollTop: join_top
                        }, time);
                        break;
                        //聯盟英雄榜
                    case 2:
                        gaclick('menu_hero')
                        $("html, body").animate({
                            scrollTop: celebrity_top
                        }, time);
                        break;

                        //房子
                    case 4:
                        $("html, body").animate({
                            scrollTop: index_top
                        }, time);

                }
                return;
            });
            $element.mMenu.on('click', function (e) {
                e.preventDefault();

                //點擊滾動時不跑SCROLLMAGIC
                $ScrollMagic.Temp.scolling = true;
                setTimeout(function () {
                    $ScrollMagic.Temp.scolling = false;
                }, 700)


                $(this).parent().find('li a').removeClass('active');
                $(this).find('a').addClass('active');

                var $index = $(this).index()
                if ($index != 3) {
                    setTimeout(function () {
                        $element.bur.click();
                    }, delay_time * 1.5)
                }

                setTimeout(function () {
                    if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
                        delay_time = 0;
                    }
                    switch ($index) {
                        //關於無翅聯盟
                        case 0:
                            gaclick('menu_about')
                            $("html, body").stop().animate({
                                scrollTop: intro_top
                            }, delay_time);
                            break;
                            //加入聯盟
                        case 1:
                            gaclick('menu_go')
                            $("html, body").stop().animate({
                                scrollTop: join_top
                            }, delay_time);
                            break;
                            //聯盟英雄榜
                        case 2:
                            gaclick('menu_hero')
                            $("html, body").stop().animate({
                                scrollTop: celebrity_top
                            }, delay_time);
                            break;

                            //房子
                        case 4:
                            $("html, body").stop().animate({
                                scrollTop: index_top
                            }, delay_time);
                            break;
                    }
                }, delay_time)
                return;
            });

            //             //護鯊短片
            //            $element.pcMenu.eq(3).magnificPopup({
            //                items: {
            //                    src: $data.url_list.tvc
            //                },
            //                callbacks: {
            //                    open: function () {
            //                        //                        gaclick('bar_' + Header.url_lang + '_tvc');
            //                    },
            //                    close: function () {}
            //                },
            //                type: 'iframe'
            //            });
            //            $element.mMenu.eq(3).magnificPopup({
            //                items: {
            //                    src: $data.url_list.tvc,
            //                },
            //                callbacks: {
            //                    open: function () {
            //                        //                        gaclick('bar_' + Header.url_lang + '_tvc');
            //                    },
            //                    close: function () {}
            //                },
            //                type: 'iframe'
            //            });

            //index
            //////////////////////
            $element.index.immediately.on('click', function (e) {
                e.preventDefault();
                gaclick('index_go')
                $("html, body").animate({
                    scrollTop: join_top
                }, delay_time);

            });

            //join
            ///////////////////////
            //Step 1
            $element.join.btn.left.addClass('hidden')
            $element.join.btn.right.addClass('hidden')

            $element.join.btn.left.on('click', function (e) {
                e.preventDefault
                $function.GotoStep($element.join.step_now - 1, function () {})
            })

            $element.join.btn.right.on('click', function (e) {
                e.preventDefault();
                $function.GotoStep($element.join.step_now + 1, function () {})
            })
            //--form
            //del_pos  
            //先關閉
            $('section.join a.del_pos').hide();
            $('section.join a.del_pos').bind('touchstart mousedown', function (e) {
                e.preventDefault();
                $(this).parent().find('input').val("");
                $(this).hide();
            })

            //企業名稱
            $element.join.form.name.on('input paste focus', function (e) {
                $(this).val() ? $(this).parent().find('a.del_pos').show() : $(this).parent().find('a.del_pos').hide();
                //                console.log($(this).parent())

            })
            $element.join.form.name.on('input paste', function (e) {
                $(this).parent().removeClass('warn');
            })
            $element.join.form.name.on('blur', function (e) {
                $(this).parent().find('a.del_pos').hide();

            })

            //簡稱
            $element.join.form.shortname.on('input paste focus', function (e) {
                $(this).val() ? $(this).parent().find('a.del_pos').show() : $(this).parent().find('a.del_pos').hide();

            })
            $element.join.form.shortname.on('blur', function (e) {
                $(this).parent().find('a.del_pos').hide();
            })
            $element.join.form.shortname.on('input paste', function (e) {
                $(this).parent().removeClass('warn');
            })

            //統一編號
            $element.join.form.taxid.on('input paste focus', function (e) {
                $(this).val() ? $(this).parent().find('a.del_pos').show() : $(this).parent().find('a.del_pos').hide();
                //只可以數字
                this.value = this.value.replace(/[^0-9]/g, '');

            })
            $element.join.form.taxid.on('blur', function (e) {
                $(this).parent().find('a.del_pos').hide();
            })
            $element.join.form.taxid.on('input paste', function (e) {
                $(this).parent().removeClass('warn');
            })

            //想說的話
            $element.join.form.statement.on('input paste', function (e) {
                $(this).parent().removeClass('warn');

            })
            //上傳 input
            $element.join.input.upload.on('change', function (e) {
                if (this.files && this.files[0]) {

                    var fileSize = this.files[0].size / 1024 / 1024;
                    if (fileSize > 2) {
                        alert("照片最大僅支持2MB");

                    } else {

                        //                        var img = document.createElement('img');
                        //                        img.setAttribute('crossOrigin', 'anonymous');
                        //                        img.onload = function () {
                        //                            var canvas = document.createElement('canvas');
                        //                            var ctx = canvas.getContext("2d");
                        //                            canvas.width = img.width
                        //                            canvas.height = img.width
                        //                            ctx.drawImage(img, 0, 0);
                        //                            ctx.save();
                        //                            var HERMITE = new Hermite_class();
                        //                            //default resize
                        //                            HERMITE.resample(canvas, 90, 90, true, function (e) {
                        //                                console.log(canvas.toDataURL())
                        //                            });
                        //
                        //                        }
                        //                        var DOMURL = self.URL || self.webkitURL || self;
                        //                        var file = this.files[0];
                        //                        var src = DOMURL.createObjectURL(file);
                        //                        img.src = src;

                        //建立小圖 並合成300
                        ///12/22  改成FABRIC
                        //////////////////////////////////////////////////
                        //var file = e.target.files[0];
                        //$.canvasResize(file, {
                        //                            width: 90,
                        //                            height: 90,
                        //                            crop: false,
                        //                            quality: 100,
                        //                            callback: function (data, width, height) {
                        //                                var img = document.createElement('img');
                        //                                img.setAttribute('crossOrigin', 'anonymous');
                        //                                img.onload = function () {
                        //                                    var canvas = document.createElement('canvas');
                        //                                    var ctx = canvas.getContext("2d");
                        //                                    canvas.width = 300
                        //                                    canvas.height = 300
                        //                                    var x = 80;
                        //                                    var y = 65;
                        //                                    ctx.drawImage(this, x, y, 90, 90);
                        //
                        //                                    $Croppie.Var.$upload_img_url = canvas.toDataURL();
                        //
                        //                                    //下一步
                        //                                    $function.GotoStep(1);
                        //                                    //大概好了之後 INIT CROPPIE
                        //                                    setTimeout(function () {
                        //                                        //                                        console.log(!$Croppie.Var.Croppie)
                        //                                        if (!$Croppie.Var.Croppie)
                        //                                            $Croppie.Create();
                        //                                        $Croppie.Bind();
                        //                                    }, 1200)
                        //                                }
                        //                                img.src = data;
                        //                            }
                        //                        });
                        //setTimeout(function () {
                        //$Croppie.InitCroppie(src)
                        //}, 2000)

                        //$Croppie.InitCroppie(src)
                        //console.log(src)

                        /////////////////////////////////////////
                        //12.22  新增Fabric 做法
                        /////////////////////////////////////////

                        var file = e.target.files[0];
                        var reader = new FileReader();
                        reader.onload = function (f) {
                            var data = f.target.result;


                            //scale slider reset
                            $Fabric.Temp.ScaleNow = 3;
                            $('.scale .cir').css('left', '50%');
                            //先清除第一張圖
                            $canvas = $Fabric.Var.finBox;
                            if ($canvas.item(1))
                                $canvas.remove($canvas.item(1));

                            //跳到下一個步驟
                            Index.Function.GotoStep(1, function () {
                                var shortname = Index.Element.join.form.shortname.val()

                                $Fabric.Function.Create(shortname, function () {
                                    $Fabric.Function.UploadImage(data, function () {

                                    })
                                })
                            });

                        };
                        reader.readAsDataURL(file);





                    }



                } else {}
            })
            //上傳企業LOGO
            $element.join.btn.upload.on('click', function (e) {
                e.preventDefault();
                var $form_li_list = $('section.join').find('li');
                //清空全部li warn
                $form_li_list.removeClass('warn');
                var getValidate = Validation.Result();
                if (!getValidate.Status) {
                    var AlertString = "";
                    var Resp = getValidate.Resp;
                    //                    console.log(Resp)
                    for (var prop in Resp) {
                        //                        AlertString += Resp[prop][0] + "\n"
                        AlertString += Resp[prop][0] + "<br>"
                        switch (prop) {
                            case "category":
                                $form_li_list.eq(0).addClass('warn');
                                break;
                            case "name":
                                $form_li_list.eq(1).addClass('warn');
                                break;
                            case "shortname":
                                $form_li_list.eq(2).addClass('warn');
                                break;

                            case "taxid":
                                $form_li_list.eq(3).addClass('warn');
                                break;
                            case "statement":
                                $form_li_list.eq(4).addClass('warn');
                                break;
                        }
                    }
                    Index.Function.ShowPopup(AlertString)
                    return
                } else {
                    $element.join.input.upload.click();
                }
            })



            //Step 2   
            //減

            $('.range').on('change', function (e) {
                var oldval = $Fabric.Temp.ScaleNow;
                var newval = $(this).val();

                var $canvas = $Fabric.Var.finBox
                var step = $Fabric.Temp.ScaleStep;
                if (oldval < newval) {
                    var x = newval - oldval;
                    $Fabric.Var.finBox.item(1).scaleX = $Fabric.Var.finBox.item(1).scaleX + step * x
                    $Fabric.Var.finBox.item(1).scaleY = $Fabric.Var.finBox.item(1).scaleY + step * x
                }
                if (oldval > newval) {
                    var x = oldval - newval
                    $Fabric.Var.finBox.item(1).scaleX = $Fabric.Var.finBox.item(1).scaleX - step * x
                    $Fabric.Var.finBox.item(1).scaleY = $Fabric.Var.finBox.item(1).scaleY - step * x
                }

                $canvas.renderAll();
                $Fabric.Temp.ScaleNow = newval;
                $('.range').val(newval)
            });

            $element.join.btn.minus.on('click', function (e) {
                e.preventDefault()

                if ($Fabric.Temp.ScaleNow == 0)
                    return

                var $canvas = $Fabric.Var.finBox
                var step = $Fabric.Temp.ScaleStep;
                $Fabric.Var.finBox.item(1).scaleX = $Fabric.Var.finBox.item(1).scaleX - step
                $Fabric.Var.finBox.item(1).scaleY = $Fabric.Var.finBox.item(1).scaleY - step
                $Fabric.Var.finBox.renderAll();

                var circle = $('.scale .cir')
                var oldval = $Fabric.Temp.ScaleNow;
                var newval = $Fabric.Temp.ScaleNow - 1
                $Fabric.Temp.ScaleNow = newval;
                circle.css('left', (newval * 16.67) + '%')
                $('.range').val(newval)

            })

            //加
            $element.join.btn.plus.on('click', function (e) {
                e.preventDefault()
                if ($Fabric.Temp.ScaleNow == 6)
                    return
                var $canvas = $Fabric.Var.finBox
                var step = $Fabric.Temp.ScaleStep;
                $Fabric.Var.finBox.item(1).scaleX = $Fabric.Var.finBox.item(1).scaleX + step
                $Fabric.Var.finBox.item(1).scaleY = $Fabric.Var.finBox.item(1).scaleY + step
                $Fabric.Var.finBox.renderAll();

                var circle = $('.scale .cir')
                var oldval = $Fabric.Temp.ScaleNow;
                var newval = $Fabric.Temp.ScaleNow + 1
                $Fabric.Temp.ScaleNow = newval;
                circle.css('left', (newval * 16.67) + '%')
                $('.range').val(newval)
            })
            //重新上傳LOGO
            $element.join.btn.reupload.on('click', function (e) {
                e.preventDefault()
                $element.join.btn.upload.click();
            })

            //預覽
            $element.join.btn.preview.on('click', function (e) {
                e.preventDefault()
                Index.Function.GotoStep(2, function () {

                    $Fabric.Function.GetDataURL_Preview(function (res) {

                        var s3_finBox = $('div.s3-main').find('div.finBox img');
                        var s3_statement = $('div.s3-main').find('p.state');
                        var s3_shortname = $('div.s3-main').find('p.comp-name span');

                        var $form = Index.Element.join.form;

                        //丟值到站存
                        Index.Element.join.data = {
                            shortname: $form.shortname.val(),
                            category: $form.category.text(),
                            statement: $form.statement.val(),
                            taxid: $form.taxid.val(),
                            name: $form.name.val(),

                        }
                        var $data = Index.Element.join.data;

                        //換字
                        s3_statement.text($data.statement)
                        s3_shortname.text($data.shortname + ' / ' + $data.category)

                        //換圖片
                        s3_finBox.attr('src', res);

                    })
                });
            })

            //Step 3    
            //送出連屬
            $element.join.btn.submit.on('click', function (e) {
                e.preventDefault()
                var $data = Index.Element.join.data;
                $Fabric.Function.GetDataURL_Result(Index.Element.join.data.shortname, function (dataurl) {
                    var $btn = Index.Element.join.btn;

                    $.ajax({
                        async: true,
                        type: "POST",
                        url: Index.Data.hosturl + '/api/send_logo',
                        dataType: 'json',
                        data: {
                            //name
                            name: $data.name,

                            //shortname
                            short_name: $data.shortname,

                            //category
                            classify: $data.category,

                            //taxid
                            com_num: $data.taxid,

                            //base64
                            logo_pic: dataurl.split(',')[1],

                            //statement
                            caption: $data.statement,

                        },
                        beforeSend: function (xhr) {
                            $btn.submit.val('資料傳送中...')
                            $btn.submit.css('pointer-events', 'none');


                        },
                        success: function (data) {
                            Index.Function.GotoStep(3, function () {
                                $('div.s4-main').find('div.fin-img img').attr('src', $Fabric.Temp.PreviewDataURL)
                            });


                        },
                        error: function (data) {
                            console.log('ajax error')
                        },
                    });
                })

            })

            //company
            /////////////////////////
            //做邊篩選選單
            $element.company.category.find('li').on('click', function (e) {
                e.preventDefault();
                $TweenMax.Company.KillAll($('section.company-logo li.item'));

                //新增 active to a tag
                var listLi = $element.company.category.find('li');
                listLi.find('a').removeClass('active');
                $(this).find('a').addClass('active');

                var $index = $(this).index()
                if ($index == 0) {
                    $Mixipup.Function.filter('all')
                    $ScrollMagic.Scenes.company.duration($("section.company-logo").height());
                } else {
                    $Mixipup.Function.filter('.category-' + $index)
                    $ScrollMagic.Scenes.company.duration($("section.company-logo").height());
                }
            })


            $element.company.category_m.find('select').on('change', function (e) {
                e.preventDefault();


                $TweenMax.Company.KillAll($('section.company-logo li.item'));
                $index = this.value


                //新增 active to a tag
                var listLi = $element.company.category.find('li');
                listLi.find('a').removeClass('active');
                $(this).find('a').eq($index).addClass('active');


                if ($index == 0) {
                    $Mixipup.Function.filter('all')
                } else {
                    $Mixipup.Function.filter('.category-' + $index)
                }
            })



        }

    },
    Setup: function () {
        this.Data.init(function () {
            var url_list = Index.Data.url_list;
            //護鯊短片            
            Index.Element.pcMenu.eq(3).magnificPopup({
                items: {
                    src: url_list.tvc
                },
                callbacks: {
                    open: function () {
                        gaclick('menu_video')
                        //                        gaclick('bar_' + Header.url_lang + '_tvc');
                    },
                    close: function () {}
                },
                type: 'iframe'
            });
            Index.Element.mMenu.eq(3).magnificPopup({
                items: {
                    src: url_list.tvc,
                },
                callbacks: {
                    open: function () {
                        gaclick('menu_video')
                        //                        gaclick('bar_' + Header.url_lang + '_tvc');
                    },
                    close: function () {}
                },
                type: 'iframe'
            });
            
            
            if (device.tablet()) {
                Index.Element.pcMenu.eq(3).on('touchstart mousedown', function (e) {
                    e.preventDefault();
                    Index.Element.pcMenu.eq(3).click()
                })
                Index.Element.mMenu.eq(3).on('touchstart mousedown', function (e) {
                    e.preventDefault();
                    Index.Element.mMenu.eq(3).click()
                })
            }

            //logo
            Index.Element.logo.click(function (e) {
                e.preventDefault();
                window.open(url_list.logo);
                gaclick('menu_Logo')
                return;
            });
            //fb
            Index.Element.fb.click(function (e) {
                e.preventDefault();
                window.open(url_list.fb);
                gaclick('menu_fb')
                return;
            });
            //yt
            Index.Element.yt.click(function (e) {
                e.preventDefault();
                window.open(url_list.youtube);
                gaclick('menu_yt')
                return;
            });
            //footer_social
            Index.Element.footer_social.click(function (e) {
                e.preventDefault();
                var $index = $(this).index()
                switch ($index) {
                    case 0:
                        window.open(url_list.fb);
                        gaclick('menu_fb')
                        break;
                    case 1:
                        window.open(url_list.youtube);
                        gaclick('menu_yt')
                        break;

                }
            })

            //footer_right
            Index.Element.footer_right.click(function (e) {
                e.preventDefault();
                var $index = $(this).index()
                switch ($index) {
                    case 0:
                        window.open(url_list.contact);
                        break;
                    case 1:
                        window.open(url_list.privacy);
                        break;

                }
            })

        });
        this.Element.init();
        this.Listener.init();
    }
}
$(function () {
    Index.Setup();
    //    Index.Element.pcMenu.eq(1).click();
    //
    //    $('html, body').animate({
    //        scrollTop: $("section.company-logo").offset().top
    //    }, 400);

})

window.onload = function () {

    //company-logo 
    //    $TweenMax.Company.SetDefaultCSS($('section.company-logo li.item'))

    //         $('.wrap').plate({
    //        element: 'section.index',
    //        perspective: 600,
    //        maxRotation: 2,
    //        animationDuration: 200
    //    });
    //    $('section.index div.cover').plate({
    //        element: $('section.index div.platebg'),
    //        perspective: 600,
    //        maxRotation: 2,
    //        animationDuration: 200
    //    });


    if (device.desktop()) {
        $('.category-m').hide()
        if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
            //                        $('section.intro canvas').css('top', '-240px')
        } else if (navigator.userAgent.indexOf("Mac OS X") > 0) {

        } else {
            $('section.index').css('top', '-5%');
            $('section.index').css('left', '-5%');
            $('section.index').css('height', '110%');
            $('section.index').css('width', '110%');
            $('section.intro canvas').css('top', '-240px')
            $ScrollMagic.Temp.plate = true;

            $('section.index div.cover').plate({
                element: $('section.index div.platebg'),
                perspective: 600,
                maxRotation: 2,
                animationDuration: 200
            });
        }
    }
    if (device.tablet()) {
        $('.company-logo').css('background-attachment', 'inherit');
    }


    //移除plate效果   因為company的     background-attachment: fixed;
    //所以一離開第一卡  就要移除
    //$('.plate').plate('remove');
    //加上
    $('.index .ttBox').addClass('drawIndex')
    $('.intro .cube').addClass('drawIntro')

    Index.Element.openingLogo = $('div.wrap div.openingLogo');


    var images = [
        //背景圖
        './img/opening-bg1.jpg',
        './img/opening-bg2.jpg',
        './img/opening-bg3.jpg',
        './img/opening-bg4.jpg',
        './asset/svg/logo-b.svg',
//        //LOGO
//        './asset/svg/fin-w-comp.svg',
//        './asset/svg/fin-w-comp.svg',
//        './asset/svg/fin-w-comp.svg',
//        './asset/svg/fin-w-comp.svg',
//        './asset/svg/logo-b.svg',

    ];
    if (device.mobile) {
        images = [
        //背景圖
        './img/opening-bg1_m.jpg',
        './img/opening-bg2_m.jpg',
        './img/opening-bg3_m.jpg',
        './img/opening-bg4_m.jpg',
'./asset/svg/logo-b.svg',
//
//        //LOGO
//        './asset/svg/fin-w-comp.svg',
//        './asset/svg/fin-w-comp.svg',
//        './asset/svg/fin-w-comp.svg',
//        './asset/svg/fin-w-comp.svg'

    ];
    }
    var openingLogo_now = 2;

    var openingLogo = [];
    var isMobile = (device.mobile()) ? "_m" : "";
    var hosturl = null;
    switch (location.origin) {
        case 'https://www.wildaidtaiwan.org':
            hosturl = 'https://www.wildaidtaiwan.org';
            break;
        default:
            hosturl = 'https://wildaid.webgene.com.tw'
    }

    $.ajax({
        async: true,
        type: "GET",
        url: hosturl + '/api/logoTop4',
        dataType: 'json',
        complete: function (data) {


        },
        success: function (data) {

            $.each(data, function (index, value) {
                images.push(Index.Data.hosturl + "/" + value.logo_pic.substring(3, value.logo_pic.length))
                openingLogo.push(Index.Data.hosturl + "/" + value.logo_pic.substring(3, value.logo_pic.length))
            });

            $.preload(images, function (last) {
                //                console.log(123, openingLogo)
                //                $('.openingLogo img').fadeIn();

                //                  $('.openingLogo .partner').css('opactiy', '1');
                //                console.log(last)
                setTimeout(function () {
                    if (last) {
                        $('.openingLogo .partner').css('background-image', 'url(' + openingLogo[0] + ')')
                        $('.openingLogo .partner').fadeIn(function () {
                            var openInterval = setInterval(function () {
                                //                            openingLogo_now = 5
                                if (openingLogo_now == 5) {
                                    clearInterval(openInterval);
                                    Index.Element.openingLogo.fadeOut("slow", function () {
                                        setTimeout(function () {
                                            $('.index .ttBox').addClass('drawed')
                                            setTimeout(function () {
                                                $('.index .ttBox').css('box-shadow', '0 9px 6px -6px #2a4464')
                                                $TweenMax.Index.init(0, function () {
                                                    setTimeout(function () {
                                                        //快速更新資料 2018-01-08
                                                        var match,
                                                            pl = /\+/g, // Regex for replacing addition symbol with a space
                                                            search = /([^&=]+)=?([^&]*)/g,
                                                            decode = function (s) {
                                                                return decodeURIComponent(s.replace(pl, " "));
                                                            },
                                                            query = window.location.search.substring(1);
                                                        urlParams = {};
                                                        while (match = search.exec(query))
                                                            urlParams[decode(match[1])] = decode(match[2]);
                                                        //console.log(urlParams)
                                                        if (urlParams.create) {
                                                            Index.Element.pcMenu.eq(1).click();
                                                            $('section.join select option').each(function () {
                                                                if ($(this).text() == urlParams.classify) {
                                                                    $(this).attr('selected', true)
                                                                    Index.Element.join.form.category.val($(this).val())
                                                                    Index.Element.join.form.category.text(urlParams.classify)
                                                                }
                                                            })
                                                            Index.Element.join.form.name.val(urlParams.name)
                                                            Index.Element.join.form.shortname.val(urlParams.shortname)
                                                            Index.Element.join.form.taxid.val(urlParams.com_num)
                                                            Index.Element.join.form.statement.val(urlParams.caption)
                                                            //?create=true&name=企業名稱&shortname=六字企業簡稱&classify=教育業&com_num=1234567&caption=十六字無刺魚肚
                                                        }
                                                    }, 1300)

                                                })
                                            }, 1200)
                                        }, 300)
                                    });
                                }
                                if (openingLogo_now <= 4) {
                                    $('.openingLogo').css('background-image', 'url(../img/opening-bg' + openingLogo_now + isMobile + '.jpg)');

                                    $('.openingLogo .partner').css('background-image', 'url(' + openingLogo[openingLogo_now - 1] + ')')
                                    openingLogo_now++
                                }
                            }, 2000);


                            //跳過
                            $('.openingLogo').on('click', function (e) {
                                e.preventDefault();
                                openingLogo_now = 5;
                                clearInterval(openInterval);
                                Index.Element.openingLogo.fadeOut("slow", function () {
                                    setTimeout(function () {
                                        $('.index .ttBox').addClass('drawed')
                                        setTimeout(function () {
                                            $('.index .ttBox').css('box-shadow', '0 9px 6px -6px #2a4464')
                                            $TweenMax.Index.init(0, function () {
                                                setTimeout(function () {
                                                    //快速更新資料 2018-01-08
                                                    var match,
                                                        pl = /\+/g, // Regex for replacing addition symbol with a space
                                                        search = /([^&=]+)=?([^&]*)/g,
                                                        decode = function (s) {
                                                            return decodeURIComponent(s.replace(pl, " "));
                                                        },
                                                        query = window.location.search.substring(1);
                                                    urlParams = {};
                                                    while (match = search.exec(query))
                                                        urlParams[decode(match[1])] = decode(match[2]);
                                                    //console.log(urlParams)
                                                    if (urlParams.create) {
                                                        Index.Element.pcMenu.eq(1).click();
                                                        $('section.join select option').each(function () {
                                                            if ($(this).text() == urlParams.classify) {
                                                                $(this).attr('selected', true)
                                                                Index.Element.join.form.category.val($(this).val())
                                                                Index.Element.join.form.category.text(urlParams.classify)
                                                            }
                                                        })
                                                        Index.Element.join.form.name.val(urlParams.name)
                                                        Index.Element.join.form.shortname.val(urlParams.shortname)
                                                        Index.Element.join.form.taxid.val(urlParams.com_num)
                                                        Index.Element.join.form.statement.val(urlParams.caption)
                                                        //?create=true&name=企業名稱&shortname=六字企業簡稱&classify=教育業&com_num=1234567&caption=十六字無刺魚肚
                                                    }
                                                }, 1300)

                                            })
                                        }, 1200)
                                    }, 300)
                                });
                            })
                        })


                    }
                }, 1500)


            });



        },
        error: function (data) {

            console.log(data)
            //alert("【影片連結】格式錯誤");
        },
    });



};
