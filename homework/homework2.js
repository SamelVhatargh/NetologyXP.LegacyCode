function createTestReportToggler()
{
    var toggled = false;
    return {
        toggle: function (type) {
            toggled = true;
        },
        isToggled: function () {
            return toggled;
        }
    }
}

function testReportPlugin() {
    return {
        type: 'fdf'
        //другие поля и методы
    }
}

function testUpdateReportParametersFunctions() {
    //какой то метод, которые что-то делает
}

function formSetEditReport(idReport, _reportPlugin, _toggleReportType, _updateReportParametersFunctions) {
    _reportPlugin = _reportPlugin || reportPlugin;
    _toggleReportType = _toggleReportType || toggleReportType;
    _updateReportParametersFunctions = _updateReportParametersFunctions || _updateReportParametersFunctions;
    var report = {
        'type': _reportPlugin.defaultReportType,
        'format': _reportPlugin.defaultReportFormat,
        'description': '',
        'period': _reportPlugin.defaultPeriod,
        'hour': _reportPlugin.defaultHour,
        'reports': []
    };

    if (idReport > 0) {
        report = _reportPlugin.reportList[idReport];
        $('#report_submit').val(_reportPlugin.updateReportString);
    }
    else {
        $('#report_submit').val(_reportPlugin.createReportString);
    }

    _toggleReportType(report.type);

    $('#report_description').html(report.description);
    $('#report_segment').find('option[value=' + report.idsegment + ']').prop('selected', 'selected');
    $('#report_type').find('option[value=' + report.type + ']').prop('selected', 'selected');
    $('#report_period').find('option[value=' + report.period + ']').prop('selected', 'selected');
    $('#report_hour').val(report.hour);
    $('[name=report_format].' + report.type + ' option[value=' + report.format + ']').prop('selected', 'selected');

    $('[name=reportsList] input').prop('checked', false);

    var key;
    for (key in report.reports) {
        $('.' + report.type + ' [report-unique-id=' + report.reports[key] + ']').prop('checked', 'checked');
    }

    _updateReportParametersFunctions[report.type](report.parameters);

    $('#report_idreport').val(idReport);
}

//для тестов вызываем как-то так
var toggler = createTestReportToggler();
formSetEditReport(1, testReportPlugin(), toggler.toggle, testUpdateReportParametersFunctions());