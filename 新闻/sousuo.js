$(function () {
    $('.back').click(function () {
        history.back()
    })
    let search = ''
    let arr = []
    if (localStorage.history) {
        search = localStorage.history
        arr = search.split(",")
        arr.shift()
        arr = arr.slice(-5)
        let str = '';
        arr.forEach(val => {
            str += `<span>
                    <a class="historytext">${val}</a>
                  </span>`
        })
        $('.history span').html(str)
    }
    $('.history').on('click', 'span', function () {
        let thisa=$(this).text()
        $.ajax({
            url: "http://api.jisuapi.com/news/search?keyword="+thisa+"&appkey=a52cd4c401a49c1c",
            dataType: 'JSONP',
            success: function (res) {
                $('.zhao').hide()
                $('.history').hide()
                let brr = res.result.list
                let str = '';
                brr.forEach(function (val) {
                    if (!val.pic) {
                        str +=
                            `
                               <li class=nopic>
                                    <a href=${val.url}>
                                         <div class="title">${val.title}</div>
                                         <div class="nr">${val.content}</div>
                                    </a>
                                </li>
                                 `
                    }
                    else {
                        str +=
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
            }
        })


    })


    $('.search input').blur(function () {

        let values = $(this).val();
        if(values==''){
            return
        }
        else{
            search += "," + values
            localStorage.history = search;
            let arr
            arr = localStorage.history.split(",")
            arr.shift()
            arr = arr.slice(-5)
            let str = '';
            arr.forEach(val => {
                str += `<span>
                         <a class="historytext">${val}</a>
                      </span>`
            })
            $('.history span').html(str)
        }
        $.ajax({
            url: "http://api.jisuapi.com/news/search?keyword=" + $(this).val() + "&appkey=a52cd4c401a49c1c",
            dataType: 'JSONP',
            beforeSend:function () {
                $('.zhao').show()
            },
            success: function (res) {
                $('.zhao').hide()
                $('.history').hide()
                let brr = res.result.list
                let str = '';
                brr.forEach(function (val) {
                    if (!val.pic) {
                        str +=
                            `
                               <li class=nopic>
                                    <a href=${val.url}>
                                         <div class="title">${val.title}</div>
                                         <div class="nr">${val.content}</div>
                                    </a>
                                </li>
                                 `
                    }
                    else {
                        str +=
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
            }
        })
    })
})