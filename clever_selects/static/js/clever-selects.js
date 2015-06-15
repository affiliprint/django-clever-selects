(function($) {
$(document).ready(function() {
    $.fn.loadChildChoices = function(child) {
        var valuefield = child;
        var ajax_url = valuefield.attr('ajax_url');
        var empty_label = valuefield.attr('empty_label');
        var required = valuefield.attr('required');

        $.get(
            ajax_url, {
                field: valuefield.attr('name'),
                parent_field: $(this).attr('name'),
                parent_value: $(this).val()
            },
            function(j) {
                var options = '';
                //only add empty_label if we are either not required
                // or if we have multiple choices
                if(required !== "required" || j.length != 1) {
                    options += '<option value="">' + empty_label + '</option>';
                }
                for (var i = 0; i < j.length; i++) {
                    options += '<option value="' + j[i][0] + '">' + j[i][1] + '</option>';
                }
                valuefield.html(options);
                valuefield.trigger('change');
                valuefield.trigger("liszt:updated"); // support for chosen versions < 1.0.0
                valuefield.trigger("chosen:updated"); // support for chosen versions >= 1.0.0
            },
            "json"
        );
    };

    $.fn.loadAllChainedChoices = function() {
        var chained_ids = $(this).attr('chained_ids').split(",");

        for (var i = 0; i < chained_ids.length; i++) {
            var chained_id = chained_ids[i];

            $(this).loadChildChoices($('#' + chained_id));
        }
    };
});
})($ || django.jQuery || grp.jQuery);