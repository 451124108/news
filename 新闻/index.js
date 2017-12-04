$(function () {
    var myScroll = new IScroll('#wrapper', {scrollX: true, scrollY: false, mouseWheel: true});
    $(document).ready(function () {
        $(document).ajaxSend(function () {
            $('.load').css('display','block')
            console.log(1)
        })
        $(document).ajaxStop(function () {
            $('.load').css('display','none')
            console.log(2)
        })
    })
    $.ajax({
        url:'https://api.jisuapi.com/news/channel?appkey=aeaaaaf1ab84e812',
        dataType:'JSONP',
        success:function (res) {
            let arr=res.result;
            let str='';
            arr.forEach((val,index)=>{
                if(index==0){
                    str+=`<li class=color>${val}</li>`
                }
                else{
                    str+=`<li>${val}</li>`
                }
            })
            $('#scroller ul' ).html(str);
            function render(type,start) {
                $.ajax({
                    url:'https://api.jisuapi.com/news/get?channel='+type+'&start='+start+'&num=3&appkey=aeaaaaf1ab84e812',
                    dataType:'JSONP',
                    success:function (val) {
                        // console.log(val)
                        let arr=val.result.list
                        // console.log(arr)
                        let str=''
                        arr.forEach(function (val,index) {
                            if(!val.pic){
                                str+=
                                    `
                               <li class=nopic>
                                    <a href=${val.url}>
                                         <div class="title">${val.title}</div>
                                         <div class="nr">${val.content}</div>
                                    </a>
                                </li>
                                 `
                            }
                            else{
                                str+=
                                    `
                                 <li class=list>
                                    <a href=${val.url}>
                                        <div class="left"><img src="${val.pic}" alt=""></div>
                                        <div class="con">${val.title}
                                            <div class="time">${val.src}&nbsp;&nbsp;${val.time}</div>
                                        </div>
                                        
                                    </a>
                                </li>
                                `
                            }
                        })
                        $('.content').html(function (index,html) {
                            return html+str;
                        })

                        let brr=document.querySelectorAll('.nr')
                        let a=[...brr]
                        a.forEach(function (val, index) {
                            $(val).children().css('display','none')
                            $(val).children().first().css({'white-space':'nowrap','height':'0.4rem','overflow':'hidden','text-overflow':'ellipsis','display':'block'})
                        })
                    }
                })
            }
            //render结束
            let type='头条';
            let index=0;
            render(type,index)
            $('#scroller>ul').on('click','li',function (){
                if($(this).hasClass('color')){
                    return;
                }
                $('#scroller>ul>li').removeClass('color')
                $(this).addClass('color')
                $('.content').html('');
                type=$(this).html();
                console.log(type)
                render(type,0)//每次点击的时候进行渲染
                $('.btn').css('display','block')
            })
            $('.btn').click(function (e){
                // e.preventDefault()
                let index=$('.content').children('li').length;
                render(type,index)//这里的type在上面点击导航的时候被改变了
            })
            //search开始
            function search(keyword){
                $.ajax({
                    url:'https://api.jisuapi.com/news/search?keyword='+keyword+'&appkey=aeaaaaf1ab84e812',
                    dataType:'jsonp',
                    success:function (em) {
                        // console.log(em)
                        let arr=em.result.list;
                        let str='';
                        console.log(arr)
                        arr.forEach(function (val) {
                            if(!val.pic){
                                str+=
                                    `
                               <li class=nopic>
                                    <a href=${val.url}>
                                         <div class="title">${val.title}</div>
                                         <div class="nr">${val.content}</div>
                                    </a>
                                </li>
                                 `
                            }
                            else{
                                str+=
                                    `
                                 <li class=list>
                                    <a href=${val.url}>
                                        <div class="left"><img src="${val.pic}" alt=""></div>
                                        <div class="con">${val.title}
                                            <div class="time">${val.src}&nbsp${val.time}</div>
                                        </div>
                                        
                                    </a>
                                </li>
                                `
                            }
                        })
                        $('.content').html(str)
                        let brr=document.querySelectorAll('.nr')
                        let a=[...brr]
                        a.forEach(function (val, index) {
                            $(val).children().css('display','none')
                            $(val).children().first().css({'white-space':'nowrap','height':'0.4rem','overflow':'hidden','text-overflow':'ellipsis','display':'block'})
                        })
                    }

                })
            }
            let input=$(':text')
            input.focus()
            input.change(function () {
                $('.sbtn').click( (e)=> {
                    e.preventDefault()
                    this.blur()
                    let keyword=input.val()
                    $('.content').html('')
                    search(keyword)
                    input.val('')
                    $('.btn').css('display','none')
                    $('#scroller ul li').removeClass('color')
                })
            })

        }
    })
})

