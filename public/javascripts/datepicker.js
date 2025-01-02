$(function() {
    $('input[name="date"]').daterangepicker({
        autoUpdateInput: true,
        locale: {
            cancelLabel: 'Clear'
        },
        isCustomDate: function (date) {
                const isStart = !$('input[name="date"]').data('daterangepicker').endDate; // Check if it's a start date

                if (!isStart) {
                    if (date.day() !== 1) {
                        return "dayNotSunday";
                    }
                } else {
                    if (date.day() !== 5) {
                        return "dayNotSunday";
                    }
                }
            },
        // opens: 'left'
    }, function(start, end, label) {
        console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
    });

    $('input[name="date"]').on('apply.daterangepicker', function(ev, picker) {
        $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
    });

    $('input[name="date"]').on('cancel.daterangepicker', function(ev, picker) {
        $(this).val('Select Date');
    });
});
