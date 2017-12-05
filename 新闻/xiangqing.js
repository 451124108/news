
$(function () {
    $(document).ajaxSend(function () {
        $('.zhao').show()
    })
    $(document).ajaxSuccess(function () {
        $('.zhao').hide()
    })
    $('.back').click(function () {
        history.back()
    })

    let channel=localStorage.channel;
    let indexs=localStorage.indexs;
    // console.log(channel,index)
    $.ajax({
        url:"https://api.jisuapi.com/news/get?channel="+channel+"&start="+indexs+"&num=1&appkey=a52cd4c401a49c1c",
        dataType:'jsonp',
        success:function (res) {
            console.log(1)
            console.log(res)
            let str = "";
            let str1='';
            let nav = res.result.list[0].content
            console.log(res.result.list[0].src)
            let src=res.result.list[0].src
            str1=`<span>${src}</span>`
            $('.xiangqing').html(nav)
            $('.headspan').html(str1)

        }


    })



})