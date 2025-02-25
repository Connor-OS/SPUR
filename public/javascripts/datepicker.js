function dateHelper(dateString) {
    let d = dateString.split("/");
    return new Date(d[2] + '/' + d[1] + '/' + d[0]);
}

$(function() {
    // Loop through each date input and initialize the date range picker
    $('input[class="date"]').each(function() {
        let cached_date = $(this).data('date')
        let start_date = new Date();
        let end_date = new Date();
        if (cached_date) {
            start_date = dateHelper(cached_date.split(" - ")[0]);
            end_date = dateHelper(cached_date.split(" - ")[1]);
            $(this).val(cached_date.split(" - ")[0] + ' - ' + cached_date.split(" - ")[1]);
        }
        $(this).daterangepicker({
            autoUpdateInput: false,
            isCustomDate: function(date) {
                // Access the picker object directly from the function context
                const isStart = !this.endDate; // Check if it's a start date
                const startDate = this.startDate._d;

                if (!isStart) {
                    if (date.day() !== 1) {
                        return "notValidDay";
                    }
                } else {
                    if (date.day() !== 5 || date._d < startDate) {
                        return "notValidDay";
                    }
                }
            },
            locale:
            {
                format: 'DD/MM/YYYY'
            },
            startDate: start_date,
            endDate: end_date,
        }, function(start, end, label) {
            console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
        });

        // Attach event listeners to the current input
        $(this).on('apply.daterangepicker', function(ev, picker) {
            $(this).val(picker.startDate.format('DD/MM/YYYY') + ' - ' + picker.endDate.format('DD/MM/YYYY'));
            this.dispatchEvent(new Event('valueChanged'));
        });

        $(this).on('cancel.daterangepicker', function(ev, picker) {
            $(this).val('Select Date');
        });
    });
});
