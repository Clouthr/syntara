$(function() 
{
    var nbInput = $('.input-group-addon').size() + 1;
    
    $('#create-group-form').on('submit', function()
    {
        var sArray = $(this).serializeArray();
        $.ajax({
            "type": "POST",
            "url": 'new',
            data: sArray,
            "dataType": "json",
            success: function(result) 
            {
                if(result.groupCreated === false)
                {
                    if(typeof result.errorMessage !== 'undefined')
                    {
                        showStatusMessage(result.errorMessage, 'error');
                    }
                    else if(typeof result.errorMessages !== 'undefined')
                    {
                        showRegisterFormAjaxErrors(result.errorMessages);
                    }
                }
                else
                {
                    window.location = "/dashboard/groups";
                }
            }
        });
        
        return false;
    });

    $('#edit-group-form').on('submit', function()
    {
        var sArray = $(this).serializeArray();

        $.ajax({
            "type": "PUT",
            "url": window.location.href.toString(),
            data: sArray,
            "dataType": "json",
            success: function(result)
            {
                if(result.groupUpdated === false)
                {
                    if(typeof result.errorMessage !== 'undefined')
                    {
                        showStatusMessage(result.errorMessage, 'error');
                    }
                    else if(typeof result.errorMessages !== 'undefined')
                    {
                        showRegisterFormAjaxErrors(result.errorMessages);
                    }
                }
                else
                {
                    showStatusMessage('Group has been updated with success', 'success');
                }
            }
        });

        return false;
    });
    
    $(document).on('click', '.add-input', function()
    {
        var html = '<div class="form-group"><p class="input-group"><span class="input-group-addon"><span class="glyphicon glyphicon-minus-sign remove-input"></span></span><input type="text" class="form-control" name="permission['+nbInput+']" /></p></div>';
        
        $('#input-container').append(html);
        
        nbInput++;
        return false;
    });
    
    $(document).on('click', '.remove-input', function()
    {
        $(this).parent().parent().parent().remove();
        return false;
    });
    
    $(document).on('click', '#delete-item.groups', function()
    {
        $.each($('.table tbody tr td input:checkbox:checked'), function( key, value ) 
        {
            $.ajax(
            {
                url: '/dashboard/group/delete',
                type: "DELETE",
                datatype: "json",
                data: {'groupId' : $(this).data('group-id')}
            });
        });

        ajaxContent($(this).attr('href'), ".ajax-content");
    });
    
    $(document).on('click', '#delete-item.users', function()
    {
        $.each($('.table tbody tr td input:checkbox:checked'), function( key, value ) 
        {
            $.ajax(
            {
                url: window.location.href.toString()+'/user/'+$(this).data('user-id'), 
                type: "DELETE",
                datatype: "json"
            })
            .done(function(result)
            {
                if(result.userDeleted === false)
                {
                        showStatusMessage(result.errorMessage, 'error');
                }
                else
                {
                    showStatusMessage('User removed from group with success !', 'success');
                    ajaxContent($(this).attr('href'), ".ajax-content");
                }
            });
        });

        ajaxContent($(this).attr('href'), ".ajax-content");        
    });
});