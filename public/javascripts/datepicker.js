$(function() {
    // Loop through each date input and initialize the date range picker
    $('input[name="date"]').each(function() {
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
            // opens: 'left'
        }, function(start, end, label) {
            console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
        });

        // Attach event listeners to the current input
        $(this).on('apply.daterangepicker', function(ev, picker) {
            $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
            this.dispatchEvent(new Event('valueChanged'));
        });

        $(this).on('cancel.daterangepicker', function(ev, picker) {
            $(this).val('Select Date');
        });
    });
});
