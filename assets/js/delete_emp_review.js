
let deleteReview = function (deleteLink) {
    $.ajax({
        type: 'get',
        url: $(deleteLink).prop('href'),
        success: function (data) {
            $(deleteLink).closest('.review').remove();
            new Noty({
                theme: "relax",
                text: data.message,
                type: "success",
                layout: "topRight",
                timeout: 1500
            }).show();
        }, error: function (error) {
            console.log("Error", error)
        }
    })
}

$(document).ready(function(){
    $('.delete-review').click(function(e){
        e.preventDefault();
        deleteReview(this)
    })
})