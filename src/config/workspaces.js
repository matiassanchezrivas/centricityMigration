'use strict';

angular.module('cloudpoxee.controllers').controller('WorkspacesCtrl', function ($log, $scope, $q, $timeout, $state,
    $aside, $filter, growl, Utilities, WorkspaceAPI, WorkspaceValidationAPI, $modal, SchedulingService, ReportAPI) {

    $log.debug('Workspaces controller...');

    $scope.openElement = function (element) {
        $scope.$emit('element:clicked', element);
    };

    function init() {
        $scope.tab = 0;
        $scope.workspaces = [];
        $scope.modal; // used on reports and actions
        $scope.request = {}; // used on filters
        $scope.confi = { "timeZone": +0 };

        //$scope.selectgrouptext = ""; // TODO remove?    
        $scope.reportselected = 0; // used on reports
        $scope.date_from_to = { // used on reports
            from: 0,
            to: 0
        };
        $scope.autocomplete = { // used on filters, autocomplete
            //externalsid : [], 
            machineName: [],
            usernames: [],
        };
        // used on html
        $scope.tags;
        // html, filters
        $scope.allStatus = [{
            id: 'AVAILABLE',
            text: 'Available'
        },
        {
            id: 'STARTING',
            text: 'Starting'
        },
        {
            id: 'STOPPED',
            text: 'Stopped'
        },
        {
            id: 'STOPPING',
            text: 'Stopping'
        },
        {
            id: 'PENDING',
            text: 'Pending'
        },
        {
            id: 'TERMINATING',
            text: 'Terminating'
        }
        ];
        // html, select groupby
        $scope.grouping = [{
            //id: 'NA',
            text: 'No Grouping',
            value: '',
            sortBy: 'id'
        }, {
            //id: 'BS',
            text: 'by Status',
            value: 'state',
            sortBy: 'state'
        }, {
            //id: 'BS',
            text: 'by Tags',
            value: 'tagsKey',
            sortBy: 'tags'
        },
        {
            //id: 'BR',
            text: 'by Region',
            value: 'region',
            sortBy: 'location'
        },
        {
            //id: 'BD',
            text: 'by Directory',
            value: 'directoryName',
            sortBy: 'directoryId'
        },
        {
            //id: 'BA',
            text: 'by Account',
            value: 'accountName',
            sortBy: 'cloudAccountId'
        }
        ];
        $scope.selectgroup = {};
        $('#selectorgroup').val($scope.grouping[0].value);
    }
    init()

    $scope.loaded = false;

    const tabDefaults = {
        defaultView: "STATUS",
        GRID: {
            itemsPerPage: 100,
            //iconSize: 'N/A',
        },
        LIST: {
            //iconSize : 200, 
            itemsPerPage: 51,
        },
        STATUS: {
            //iconSize : 60, 
            itemsPerPage: 63 * 2,
        },
    }

    $scope.settings = {
        tab: tabDefaults.defaultView,
        //size: tabDefaults['STATUS'].iconSize, 
        grouping: $scope.selectgroup,
        sort: "id",
        pagination: {
            currentPage: 0,
            totalItems: 0,
            itemsPerPage: tabDefaults['STATUS'].itemsPerPage,
            totalPages: 1,
        },
        req: {},
    };

    $scope.usernameFilter = ""; // TODO ???

    $scope.groupingByTag = function (tagkey) {
        $scope.loaded = false;
        Utilities.loading(true);
        $scope.settings.req.tags = [tagkey];
        WorkspaceAPI.getWorkspaces2($scope.settings.req, 0, $scope.settings.pagination.itemsPerPage, $scope.settings.sort).then(function (response) {
            $scope.processWorkspaces(response);
            $scope.workspaces.forEach(function (wp) {
                if (wp.tags.hasOwnProperty(tagkey)) {
                    wp.tagsKey = wp.tags[tagkey];
                } else {
                    wp.tagsKey = 'N/A'
                }
            })
            $scope.settings.grouping = 'tagsKey';
            Utilities.loading(false);
        }).catch(function () {
            Utilities.loading(false);
        })
    }

    $scope.groupingFn = function (group) {
        $scope.loaded = false;
        $scope.settings.sort = _.find($scope.grouping, function (grp) { return grp && grp.value === group }).sortBy;

        if (group != 'tagsKey') {
            Utilities.loading(true);
            WorkspaceAPI.getWorkspaces2($scope.settings.req, 0, $scope.settings.pagination.itemsPerPage, $scope.settings.sort).then(function (response) {
                $scope.processWorkspaces(response);
                $scope.settings.grouping = group;
                Utilities.loading(false);
            }).catch(function () {
                Utilities.loading(false);
            })
        } else {
            $scope.loaded = true;
        }
    }

    // ----------------------------------------------------------------------------------- AUTOCOMPLETE

    /*/ deprecated --------
    $scope.loadExternalIds = function(query){
      return _.filter($scope.autocomplete.externalsid, function(item){ return item && item.toUpperCase().indexOf(query.toUpperCase()) >= 0; });
    }
    //*/

    $scope.loadMachineName = function (query) {
        return _.filter($scope.autocomplete.machineName, function (item) { return item && item.toUpperCase().indexOf(query.toUpperCase()) >= 0; });
    }
    $scope.loadUsernames = function (query) {
        return _.filter($scope.autocomplete.usernames, function (item) { return item && item.toUpperCase().indexOf(query.toUpperCase()) >= 0; });
    }
    // -----------------------------------------------------------------------------------
    $scope.filterByUsername = function () {
        $scope.loaded = false;
        $scope.settings.req.usernames = $scope.request.usernames.map(function (m) { return m.text });
        WorkspaceAPI.getWorkspaces2($scope.settings.req, 0, $scope.settings.pagination.itemsPerPage, 'userName').then(function (response) {
            $scope.processWorkspaces(response);
        });
    }

    $scope.changeTab = function (tab) {
        $scope.loaded = false;
        Utilities.loading(true);
        WorkspaceAPI.getWorkspaces2($scope.settings.req, 0, tabDefaults[tab].itemsPerPage, $scope.settings.sort).then(function (response) {
            $scope.processWorkspaces(response);
            $scope.settings.tab = tab;
            $scope.changeActions();
            Utilities.loading(false);
        }).catch(function () {
            Utilities.loading(false);
        })
    };

    $scope.pageChanged = function () {
        $scope.loaded = false;
        Utilities.loading(true);
        WorkspaceAPI.getWorkspaces2($scope.settings.req, $scope.settings.pagination.currentPage, $scope.settings.pagination.itemsPerPage, $scope.settings.sort).then(function (response) {
            $scope.processWorkspaces(response);
            Utilities.loading(false);
        }).catch(function () {
            Utilities.loading(false);
        }) //*/
    }

    $scope.setPage = function (n) {
        if ($scope.settings.pagination.currentPage != n) {
            $scope.loaded = false;
            $scope.settings.pagination.currentPage = n;
            Utilities.loading(true);
            WorkspaceAPI.getWorkspaces2($scope.settings.req, $scope.settings.pagination.currentPage, $scope.settings.pagination.itemsPerPage, $scope.settings.sort).then(function (response) {
                $scope.processWorkspaces(response);
                Utilities.loading(false);
            }).catch(function () {
                Utilities.loading(false);
            }) //*/  
        }
    }

    $scope.liquidwareStatus = function () {

        WorkspaceAPI.getLiquidwareMetricsMulti({
            resourceId: $scope.workspaces.map(function (wp) { return wp.id }),
            fields: [
                'overall_ux_rating_avg',
                'login_delay_avg',
                'application_load_time_avg',
                'non_responding_apps',
                'score',
                'memory_used_percent',
                'cpu_used_percent',
                'gpu_percent_used',
                'disk_used_percent',
                'page_used_percent',
                'up_time_percent'
            ],
            date: '5 minutes'
        }).then(function (response) {

            response.forEach(function (lq) {
                console.log('liquidwareStatus', lq)
                if (lq && lq.node_name) {
                    try {
                        var wp = _.find($scope.workspaces, function (o) {
                            return o.computerName && o.directoryName && (o.computerName.concat('.').concat(o.directoryName)).toLowerCase() == lq.node_name.toLowerCase()
                        });
                        console.log('liquidwareStatus', wp)
                        if (wp) wp.liquidware = lq;
                    } catch (err) { console.log(err.message) }
                }
            });

        }, function (err) {
            $log.debug('Liquidware fails', err);
        });
    }


    $scope.processWorkspaces = function (response) {
        $scope.workspaces = response.content.map(function (element) {
            if (element.userConnected == true) {
                element.state = 'LOGGED';
            }
            return element;
        });

        var pagination = {
            currentPage: response.number,
            totalItems: response.totalElements,
            itemsPerPage: response.size,
            totalPages: response.totalPages,
        }
        $scope.settings.pagination = pagination;

        $scope.loaded = true;
        $scope.liquidwareStatus();
    }

    $scope.Config = function () {
        var innerScope = $scope.$new();
        innerScope.timeZone = $scope.timeZone;
        innerScope.confi = $scope.confi;

        var aside;
        aside = $aside({
            scope: innerScope,
            container: 'body',
            placement: 'right',
            templateUrl: 'views/workspaces/aside/config.html',
            backdrop: 'static'
        });


        $scope.saveAlerts = function () {
            // $scope.configAlerts = JSON.parse(JSON.stringify(innerScope.alerts));
            // ConnectAPI.saveConfigAlerts($scope.configAlerts, $scope.connect_instances.instanceid, $scope.configAlertVersion, $scope.ConfigAlertsID).then(function(response) {}).catch(function() {
            // growl.error("Alerts cannot be save");
            // })
            aside.hide();
        };
    }

    $scope.initialize = function () {
        Utilities.loading(true);
        $q.all([
            WorkspaceAPI.getWorkspaces2({}, 0, tabDefaults['STATUS'].itemsPerPage, "id").then(function (response) {
                $scope.processWorkspaces(response);
            }),
            WorkspaceAPI.getWorkspaceBundles().then(function (response) {
                $scope.bundles = response;
            }),
            WorkspaceAPI.getWorkspaceGroups().then(function (response) {
                $scope.groups = response;
            }),
            WorkspaceValidationAPI.listValidators().then(function (response) {
                $scope.validators = response;
            }),
            WorkspaceAPI.getDistinctWorkspacesTags().then(function (data) {
                $scope.tags = data;
            }),
            /* ---- deprecated ---- 
            WorkspaceAPI.getDistinctWorkspacesExternalIds().then(function(data) {        
              $scope.autocomplete.externalsid = data;
            }),
            */
            WorkspaceAPI.getDistinctWorkspacesMachineName().then(function (data) {
                $scope.autocomplete.machineName = data;
            }),
            WorkspaceAPI.getDistinctWorkspacesUsernames().then(function (data) {
                $scope.autocomplete.usernames = data;
            })
        ]).finally(function () {
            $scope.changeActions();
            Utilities.loading(false);
        });
    };

    $scope.initialize();

    // ------------------------
    // Open filters
    // ------------------------

    var aside; // used on filters

    $scope.openFilters = function () {

        aside = $aside({
            scope: $scope,
            container: 'body',
            placement: 'right',
            template: 'views/workspaces/filters.html',
            backdrop: 'static'
        });

        /*for (var i = 0; i < $scope.workspaces.length; i++) {
          var found = $scope.externalsid.find(function(x) {
            return x.id === $scope.workspaces[i].externalId;
          });
    
          if (found == undefined) {
            $scope.externalsid.push({
              "id": $scope.workspaces[i].externalId,
              "text": $scope.workspaces[i].externalId
            })
          }
        }//*/
        /*$scope.externalsid = $scope.workspaces.map(function(wp){
          return {
            id: wp.externalId,
            text: wp.externalId
          }
        })//*/

        if (!$scope.request.tag) {
            $scope.request.tag = [{
                clave: "",
                valor: ""
            }];
        }

        $scope.addRowTagfilter = function (index) {
            var nuevo = {
                clave: "",
                valor: ""
            }
            if ($scope.request.tag.length <= index + 1) {
                $scope.request.tag.splice(index + 1, 0, nuevo);
            }
        };

        $scope.deleteRowTagfilter = function ($event, index) {
            // delete $scope.request.tag[index];
            $scope.request.tag.splice(index, 1);
        }
    };

    $scope.apply = function () {
        var request = {};

        if ($scope.request.status) {
            request.status = $scope.request.status.map(function (status) {
                return status.id;
            });
        }

        if ($scope.request.tag[0].clave != "" || $scope.request.tag[0].valor != "") {
            // var tagsarray = Object.keys($scope.request.tag).map(i => $scope.request.tag[i]);
            var tagsarray = Object.keys($scope.request.tag).map(function (i) {
                return $scope.request.tag[i];
            });
            // request.tag=tagsarray;
            // request.tag = $scope.request.tag
            request.tags = tagsarray.map(function (item) {
                return item.clave + ":" + item.valor;
            });
        }

        /* deprecated
        if ($scope.request.externalsid && $scope.request.externalsid.length > 0) {
          request.externalsid = $scope.request.externalsid.map(function(item) {
            return item.text;
          });
        }*/

        if ($scope.request.machineName && $scope.request.machineName.length > 0) {
            request.machineName = $scope.request.machineName.map(function (item) {
                return item.text;
            });
        }

        if ($scope.request.bundleId) {
            request.bundleId = [$scope.request.bundleId];
        }

        if ($scope.request.group) {
            request.groups = [$scope.request.group];
        }

        if ($scope.request.health) {
            if ('HEALTHY' === $scope.request.health) {
                request.unhealthy = false;
            } else if ('NOT_HEALTHY' === $scope.request.health) {
                request.unhealthy = true;
            }
        }

        if ($scope.request.usernames && $scope.request.usernames.length > 0) {
            request.usernames = $scope.request.usernames.map(function (item) {
                return item.text;
            });
        }

        if ($scope.request.ips && $scope.request.ips.length > 0) {
            request.ips = $scope.request.ips.map(function (item) {
                return item.text;
            });
        }

        if ($scope.request.userConnected != 'all') {
            request.userConnected = $scope.request.userConnected;
        }

        Utilities.loading(true);
        $scope.settings.req = request;
        WorkspaceAPI.getWorkspaces2(request, 0, $scope.settings.pagination.itemsPerPage, $scope.settings.sort).then(function (response) {
            $scope.processWorkspaces(response);
            Utilities.loading(false);
        }).catch(function (err) {
            console.log(err)
            Utilities.loading(false);
        }) //*/

        aside.hide();
    };

    $scope.reset = function () {
        $scope.request = {};
        $scope.request.tag = [{
            clave: "",
            valor: ""
        }];
    };

    // ------------------------
    // Reports
    // ------------------------

    $scope.chargereports = function () {
        // ConnectAPI.getListReports($scope.connect_instances.instanceid).then(function(response) {
        //   $scope.reports = response;
        //   $log.debug(response);
        // });
        $scope.reports = [{
            id: 1,
            customerId: 1,
            instanceId: 2,
            alias: "Last User Connection",
            url: "asd"
        }, {
            id: 2,
            customerId: 1,
            instanceId: 2,
            alias: "AVG Performance",
            url: "asd"
        }, {
            id: 3,
            customerId: 1,
            instanceId: 2,
            alias: "Events",
            url: "asd"
        }, {
            id: 4,
            customerId: 1,
            instanceId: 2,
            alias: "Events by Workspaces",
            url: "asd"
        }, {
            id: 5,
            customerId: 1,
            instanceId: 2,
            alias: "Used Time by Hours",
            url: "asd"
        }, {
            id: 6,
            customerId: 1,
            instanceId: 2,
            alias: "Used Time by Days",
            url: "asd"
        },
        {
            id: 7,
            customerId: 1,
            instanceId: 2,
            alias: "Machine vs Users",
            url: "asd"
        },
        ]
    }

    $scope.executeReport = function () {
        $scope.datareport = [];
        $scope.datacolumns = [];
        $scope.datavales = [];

        // $scope.loading();

        switch ($scope.reportselected) {
            case 1:
                ReportAPI.reportWorkspacesLastUserConnection($scope.date_from_to).then(function (response) {

                    if (response[0] && Object.keys(response[0]).length > 0) {


                        $scope.datareport = response;
                        $scope.datacolumns = Object.keys($scope.datareport[0]);
                        $scope.datavales = Object.values($scope.datareport)

                    } else {
                        $scope.datacolumns = ["DATA_NOT_FOUND"];
                    }

                }).catch(function (err) {
                    Utilities.loading(false);
                    growl.error(err);
                })
                break;
            case 2:
                ReportAPI.reportWorkspacesAvgPerformance($scope.date_from_to).then(function (response) {

                    if (response[0] && Object.keys(response[0]).length > 0) {


                        $scope.datareport = response;
                        $scope.datacolumns = Object.keys($scope.datareport[0]);

                        for (var i = 0; i < $scope.datareport.length; i++) {
                            var date = moment.utc($scope.datareport[i].end_date);
                            // date._isUTC=true;
                            $scope.datareport[i].end_date = date.utcOffset(parseInt($scope.confi.timeZone)).format("MM/DD/YYYY HH:mm:ss").toString();
                        }

                        $scope.datavales = Object.values($scope.datareport)

                    } else {
                        $scope.datacolumns = ["DATA_NOT_FOUND"];
                    }

                }).catch(function (err) {
                    Utilities.loading(false);
                    growl.error(err);
                })
                break;
            case 3:
                ReportAPI.reportWorkspacesEvents($scope.date_from_to).then(function (response) {

                    if (response[0] && Object.keys(response[0]).length > 0) {


                        $scope.datareport = response;
                        $scope.datacolumns = Object.keys($scope.datareport[0]);
                        $scope.datacolumns = [
                            $scope.datacolumns[7],
                            $scope.datacolumns[1],
                            $scope.datacolumns[10],
                            $scope.datacolumns[6],
                            $scope.datacolumns[19],
                            $scope.datacolumns[13],
                            $scope.datacolumns[24]
                        ];
                        $scope.datavales = Object.values($scope.datareport);
                        $scope.datavalesfull = Object.values($scope.datareport);
                        var c = [];

                        for (var i = 0; i < Object.values($scope.datavales).length; i++) {
                            var d = {};
                            // var e=[]

                            var date = moment.utc(Object.values($scope.datavales)[i].TIMESTAMP);

                            d.TIMESTAMP = date.utcOffset(parseInt($scope.confi.timeZone)).format("MM/DD/YYYY HH:mm:ss").toString();
                            d.STATE = Object.values($scope.datavales)[i].STATE;
                            d.TYPE = Object.values($scope.datavales)[i].TYPE;
                            d.EXTERNAL_ID = Object.values($scope.datavales)[i].EXTERNAL_ID;
                            d.USER_NAME = Object.values($scope.datavales)[i].USER_NAME;
                            d.COMPUTER_NAME = Object.values($scope.datavales)[i].COMPUTER_NAME;
                            d.IP_ADDRESS = Object.values($scope.datavales)[i].IP_ADDRESS;

                            c.push(d);
                        }
                        $scope.datavales = c;


                    } else {
                        $scope.datacolumns = ["DATA_NOT_FOUND"];
                    }

                }).catch(function (err) {
                    Utilities.loading(false);
                    growl.error(err);
                })
                break;
            case 4:
                ReportAPI.reportWorkspaceseventsAcumulated($scope.date_from_to).then(function (response) {

                    if (response[0] && Object.keys(response[0]).length > 0) {


                        $scope.datareport = response;
                        $scope.datacolumns = Object.keys($scope.datareport[0]);
                        $scope.datavales = Object.values($scope.datareport)

                    } else {
                        $scope.datacolumns = ["DATA_NOT_FOUND"];
                    }

                }).catch(function (err) {
                    Utilities.loading(false);
                    growl.error(err);
                })
                break;
            case 5:
                ReportAPI.reportWorkspacesUsedTimeHours($scope.date_from_to).then(function (response) {

                    if (response[0] && Object.keys(response[0]).length > 0) {


                        $scope.datareport = response;
                        $scope.datacolumns = Object.keys($scope.datareport[0]);


                        for (var i = 0; i < $scope.datareport.length; i++) {
                            var date = moment.utc($scope.datareport[i].end_date);
                            // date._isUTC=true;
                            $scope.datareport[i].end_date = date.utcOffset(parseInt($scope.confi.timeZone)).format("MM/DD/YYYY HH:mm:ss").toString();
                        }
                        $scope.datavales = Object.values($scope.datareport)
                    } else {
                        $scope.datacolumns = ["DATA_NOT_FOUND"];
                    }

                }).catch(function (err) {
                    Utilities.loading(false);
                    growl.error(err);
                })
                break;
            case 6:
                ReportAPI.reportWorkspacesUsedTimeDays($scope.date_from_to).then(function (response) {

                    if (response[0] && Object.keys(response[0]).length > 0) {


                        $scope.datareport = response;
                        $scope.datacolumns = Object.keys($scope.datareport[0]);
                        $scope.datavales = Object.values($scope.datareport)

                    } else {
                        $scope.datacolumns = ["DATA_NOT_FOUND"];
                    }

                }).catch(function (err) {
                    Utilities.loading(false);
                    growl.error(err);
                })
                break;
            case 7:
                ReportAPI.reportWorkspacesUserCount($scope.date_from_to).then(function (response) {

                    if (response[0] && Object.keys(response[0]).length > 0) {


                        $scope.datareport = response;
                        $scope.datacolumns = Object.keys($scope.datareport[0]);

                        for (var i = 0; i < $scope.datareport.length; i++) {
                            var date = moment.utc($scope.datareport[i].end_date);
                            // date._isUTC=true;
                            $scope.datareport[i].end_date = date.utcOffset(parseInt($scope.confi.timeZone)).format("MM/DD/YYYY HH:mm:ss").toString();
                        }
                        $scope.datavales = Object.values($scope.datareport)

                    } else {
                        $scope.datacolumns = ["DATA_NOT_FOUND"];
                    }

                }).catch(function (err) {
                    Utilities.loading(false);
                    growl.error(err);
                })
                break;
            default:
                growl.error("Please select a report");

                break;
        }
        // if (index != null) {
        //   $scope.selectedreport = report;
        //   $scope.selectedreport.index = index;
        //   $('.report-item').removeClass('selected-li');
        //   $('#' + $scope.selectedreport.id).addClass('selected-li');
        //   var datefrom = $scope.date_from_to.datefrom;
        //   var dateto = $scope.date_from_to.dateto;
        //   $('#iframereport').attr("src", $scope.selectedreport.url.replace("$date_from", datefrom).replace("$date_to", dateto));
        // } else {
        //   growl.error("Please select a report");
        // }
    }

    $scope.changeSelectReport = function (select) {


        $scope.datacolumns = 0;
        $scope.loaded = false;
        $scope.reportselected = parseInt(select.reportselected);


        $timeout(function () {
            $scope.loaded = true;
        }, 250);
    };

    $scope.exportReport = function (typefile) {
        if (typefile == 'pdf') {


            $('#table').tableExport({
                type: 'pdf',
                jspdf: {
                    orientation: 'l',
                    format: 'a3',
                    margins: {
                        left: 10,
                        right: 10,
                        top: 20,
                        bottom: 20
                    },
                    autotable: {
                        styles: {
                            fillColor: 'inherit',
                            textColor: 'inherit'
                        },
                        tableWidth: 'auto'
                    }
                }
            });
        } else {

            $('#table').tableExport({
                type: typefile,
                escape: 'false'
            });
        }
    }

    $scope.popupTable = function (row) {
        var innerScope = $scope;
        if (innerScope.datavalesfull) {
            innerScope.row = innerScope.datavalesfull[row];
            innerScope.columns_ = Object.keys(innerScope.row);
            // innerScope.values_ = Object.keys(innerScope.row).map(i => innerScope.row[i]);
            innerScope.values_ = Object.keys(innerScope.row).map(function (i) {
                return innerScope.row[i];
            });
            // var arrayobjects = [];
            // for (var i = 0; i < columns.length; i++) {

            //   // var n = {columns[i]+":"+values[i]};
            //   // arrayobjects.push(n);
            // }
            $log.debug('Opening reports popup...');
            $scope.modal = $modal({
                scope: innerScope,
                template: 'views/workspaces/report-modal.html'
            });
        }
    };

    $scope.changedate = function (tab) {

        // switch (tab) {
        //   case 0:
        //     $scope.chargedashboard();
        //     break;
        //   case 1:
        //     $scope.selectreport($scope.selectedreport.index, $scope.selectedreport);
        //     break;
        //   case 2:
        //     $scope.getCalls();
        //     break;
        // }
    }

    $scope.chargedatepicker = function () {

        var start = moment().set({
            'hour': 0,
            'minute': 0,
            'second': 0,
            'milisecond': 0
        });
        var end = moment();

        function cb(start, end) {
            $('#reportrange span').html(start.format('MM/DD/YYYY HH:mm:ss') + ' - ' + end.format('MM/DD/YYYY HH:mm:ss'));
            // console.log("A new date range was chosen: " + start + ' to ' + end);
            $scope.date_from_to.from = start.format('x');
            $scope.date_from_to.to = end.format('x');
            $scope.changedate($scope.tab);





        }

        $('#reportrange').daterangepicker({
            startDate: start,
            endDate: end,
            "showDropdowns": true,
            "timePicker": true,
            "timePicker24Hour": true,
            "timePickerSeconds": true,
            "opens": "left",
            "alwaysShowCalendars": true,
            ranges: {
                'Today': [moment().set({
                    'hour': 0,
                    'minute': 0,
                    'second': 0,
                    'milisecond': 0
                }), moment()],
                'Yesterday': [moment().subtract(1, 'days').set({
                    'hour': 0,
                    'minute': 0,
                    'second': 0,
                    'milisecond': 0
                }), moment().subtract(1, 'days').set({
                    'hour': 23,
                    'minute': 59,
                    'second': 59,
                    'milisecond': 999
                })],
                'Last 7 Days': [moment().subtract(6, 'days').set({
                    'hour': 0,
                    'minute': 0,
                    'second': 0,
                    'milisecond': 0
                }), moment()],
                'Last 30 Days': [moment().subtract(29, 'days').set({
                    'hour': 0,
                    'minute': 0,
                    'second': 0,
                    'milisecond': 0
                }), moment()],
                'This Month': [moment().startOf('month').set({
                    'hour': 0,
                    'minute': 0,
                    'second': 0,
                    'milisecond': 0
                }), moment().endOf('month').set({
                    'hour': 23,
                    'minute': 59,
                    'second': 59,
                    'milisecond': 999
                })],
                'Last Month': [moment().subtract(1, 'month').startOf('month').set({
                    'hour': 0,
                    'minute': 0,
                    'second': 0,
                    'milisecond': 0
                }), moment().subtract(1, 'month').endOf('month').set({
                    'hour': 23,
                    'minute': 59,
                    'second': 59,
                    'milisecond': 999
                })]
            }
        }, cb);

        cb(start, end)
    }

    // ------------------------
    // Validators
    // ------------------------

    $scope.deleteValidators = function () {
        var selectedMetrics = $filter('filter')($scope.validators, {
            active: true
        });
        $log.debug('Deleting validators...', selectedMetrics);
        var requests = [];

        angular.forEach(selectedMetrics, function (validator) {
            requests.push(WorkspaceValidationAPI.deleteValidator(validator.id));
        });

        if (requests.length > 0) {
            $q.all(requests).then(function () {
                $log.debug('Reload validators');
                WorkspaceValidationAPI.listValidators().then(function (response) {
                    $scope.validators = response;
                    growl.success('Validators removed successfully.');
                });
            });
        } else {
            growl.warning('Please select at least one validator.');
        }
    };

    $scope.deleteValidator = function (validator, $event) {
        $event.stopPropagation();
        WorkspaceValidationAPI.deleteValidator(validator.id).then(function () {
            WorkspaceValidationAPI.listValidators().then(function (response) {
                $scope.validators = response;
                growl.success('Validator removed successfully.');
            });
        });
    };

    $scope.createValidator = function () {
        var innerScope = $scope.$new();
        innerScope.workspaces = $scope.workspaces;
        innerScope.validator = {
            metricName: 'non_responding_apps',
            type: 'VALUE_IN_RANGE'
        };

        innerScope.execute = function () {

            var request = {
                name: innerScope.validator.name,
                metricName: innerScope.validator.metricName,
                type: innerScope.validator.type,
                workspaceId: innerScope.validator.workspaceId
            };

            if (request.type === 'VALUE_IN_RANGE' || request.type === 'VALUE_NOT_IN_RANGE') {
                request.arguments = [innerScope.validator.min, innerScope.validator.max];
            } else {
                request.arguments = innerScope.validator.listData.map(function (item) {
                    return item.text;
                });
            }

            $log.debug('Request', request);
            WorkspaceValidationAPI.createValidator(request).then(function (response) {
                WorkspaceValidationAPI.listValidators().then(function (response) {
                    $scope.validators = response;
                    aside.hide();
                    growl.success('Validator added successfully.');
                });
            });
        };

        aside = $aside({
            scope: innerScope,
            container: 'body',
            placement: 'right',
            templateUrl: 'views/workspaces/aside/validator.html',
            backdrop: 'static'
        });
    };

    // ------------------------
    // Event handling
    // ------------------------

    $scope.$on('element:clicked', function (event, element) {
        $log.debug('Workspace clicked', element);
        $state.go('app.workspace', {
            workspaceId: element.id
        });
    });

    /* $scope.$on('elements:visible', function(event, elements) {
      var idsToLoad = [];
      angular.forEach(elements, function(element) {
        if (!element.loading && !element.loaded) {
          element.loading = true;
          idsToLoad.push(element.id);
        }
      });
  
      if (idsToLoad.length > 0) {
        WorkspaceAPI.getWorkspaceDetails(idsToLoad).then(function(responses) {
          angular.forEach(elements, function(element) {
            angular.forEach(responses, function(response) {
              if (element.externalId === response.workspaceId) {
                angular.extend(element, response, {
                  loaded: true,
                  loading: false
                });
              }
            });
          });
        });
      }
    }); //*/

    $scope.toggleAll = function (type) {
        angular.forEach($scope[type], function (row) {
            row.active = $scope[type + 'AllActive'] ? false : true;
        });
        $scope[type + 'AllActive'] = !$scope[type + 'AllActive'];
    };

    $scope.toggleOne = function (type, row) {
        $scope[type + 'AllActive'] = false;
        row.active = !row.active;
    };

    // ------------------------
    // Actions
    // ------------------------

    $scope.launchWorkspaces = function () {
        var inner = $scope.$new();
        inner.step = 0;

        inner.data = {
            workspaces: [{
                userName: "",
                workspaceProperties: {
                    rootVolumeSizeGib: 0,
                    userVolumeSizeGib: 0
                },
                status: ""
            }],
            bundle: "",
            directory: "",
            runningMode: "AUTO_STOP", //"AUTO_STOP", "ALWAYS_ON"
            runningModeAutoStopTimeoutInHours: 1
        };
        inner.goBack = function () {
            inner.step--;
        };

        inner.addRow = function (index) {
            var nuevo = {
                userName: "",
                workspaceProperties: {
                    rootVolumeSizeGib: 0,
                    userVolumeSizeGib: 0
                },
                status: ""
            };
            if (inner.data.workspaces.length <= index + 1) {
                inner.data.workspaces.splice(index + 1, 0, nuevo);
            }
        };

        inner.deleteRow = function ($event, wp) {
            var index = inner.data.workspaces.indexOf(wp);
            if ($event.which == 1)
                inner.data.workspaces.splice(index, 1);
        }

        inner.changeDirectory = function () {
            inner.data.workspaces = [{
                userName: "",
                workspaceProperties: {
                    rootVolumeSizeGib: 0,
                    userVolumeSizeGib: 0
                },
                status: ""
            }]
        }

        inner.updateBundles = function () {
            //var selected = getObjectByValue(inner.bundles, "bundleId", inner.data.BundleId)
            if (inner.data.bundle) {
                var bundle = JSON.parse(inner.data.bundle);
                for (var i = 0, len = inner.data.workspaces.length; i < len; i++) {
                    inner.data.workspaces[i].workspaceProperties.userVolumeSizeGib = parseInt(bundle.userCapacity) //selected[0].userCapacity)
                    inner.data.workspaces[i].workspaceProperties.rootVolumeSizeGib = parseInt(bundle.rootCapacity) //selected[0].rootCapacity)
                }
            }
        }

        inner.processStep1 = function () {
            inner.step++;
            //console.log(inner.data)
        };

        inner.processStep2 = function () {
            inner.step++;
            //console.log(inner.data)
        };

        inner.processStep3 = function () {
            inner.step++;
            //console.log(inner.data)
        };

        inner.processStep4 = function () { // here we start to launch
            // first prepare data
            inner.data.bundle = JSON.parse(inner.data.bundle);
            inner.data.directory = JSON.parse(inner.data.directory);
            for (var i = 0, len = inner.data.workspaces.length; i < len; i++) {
                inner.data.workspaces[i].workspaceProperties.runningMode = inner.data.runningMode;
                inner.data.workspaces[i].workspaceProperties.runningModeAutoStopTimeoutInMinutes = 60 * (inner.data.runningModeAutoStopTimeoutInHours % 60);
                inner.data.workspaces[i].workspaceProperties.computeTypeName = "";
                inner.data.workspaces[i].bundle = inner.data.bundle;
                inner.data.workspaces[i].directory = inner.data.directory;
            }

            // max 25 for each request
            var pieces = JSON.parse(JSON.stringify(inner.data.workspaces));
            while (pieces.length > 0) {
                WorkspaceAPI.launchWorkspaces(pieces.splice(-25)).then(function (response) {
                    //console.log(response)
                    for (var i = 0; i < response.data.length; i++) {
                        // search for the username
                        var index = inner.data.workspaces.findIndex(function (item, it) {
                            return item.userName === response.data[i].userName
                        });
                        // update status
                        inner.data.workspaces[index].status = response.data[i].status;
                    }
                    //console.log(inner.data.workspaces)
                })
            }

            inner.step++;
            //console.log(inner.data)
        };

        inner.directories = []

        inner.bundles = [{
            name: 'Loading...'
        }]

        Utilities.loading(true);
        WorkspaceAPI.getWorkspaceDirectories().then(function (response) {
            inner.directories = response;
            Utilities.loading(false);
            aside = $aside({
                scope: inner,
                container: 'body',
                placement: 'right',
                templateUrl: 'views/workspaces/aside/new.html',
                backdrop: 'static'
            });
            WorkspaceAPI.getWorkspaceAwsBundles().then(function (response) {
                inner.bundles = response;
                Utilities.loading(false);
            })
        }).catch(function (err) {
            Utilities.loading(false);
            growl.error(err);
        });
    };

    $scope.changeActions = function () {
        if ($scope.settings.tab === 'GRID') {
            $scope.actions = [{
                text: 'Sync Directory',
                click: function () {

                    WorkspaceAPI.updateDirectoriesWorkspaces().then(function () {

                        growl.success('The directory will be updated. This may take a few minutes.');
                    }).catch(function (err) {

                        growl.error(err);
                    })
                }
            },
            {
                text: 'Schedule',
                click: function () {

                    // startAction();

                    var selectedworkspaces = $filter('filter')($scope.workspaces, {
                        active: true
                    });
                    // var selectedworkspaces = $filter('filter')(getModel(scope, itemsPath), { active: true });
                    var selection = [];
                    if (selectedworkspaces.length > 0) {
                        angular.forEach(selectedworkspaces, function (item) {
                            selection.push({
                                id: item.id,
                                label: item.externalId + '  (' + item.id + ')'
                            });
                        });
                    }
                    SchedulingService.openWidget('WORKSPACES', selection, true);
                    // stopAction();

                }
            },
            {
                text: 'Start',
                click: function () {
                    var selectedworkspaces = $filter('filter')($scope.workspaces, {
                        active: true
                    });
                    var idworkspaces = {
                        ids: []
                    };
                    for (var i = 0; i < selectedworkspaces.length; i++) {
                        if (selectedworkspaces[i].status == 'STOPPED') {
                            idworkspaces.ids.push(selectedworkspaces[i].id);
                        }
                    }
                    var innerScope = $scope.$new();
                    $log.debug('Opening stop channel popup...');
                    $scope.modal = $modal({
                        scope: innerScope,
                        template: 'views/templates/areyousure-modal.html'
                    });

                    innerScope.yes = function () {
                        $scope.modal.hide();
                        WorkspaceAPI.startWorkspace(idworkspaces).then(function () {
                            growl.success('Workspace is starting. This may take a few minutes.');
                        });
                    }
                }
            },
            {
                text: 'Stop',
                click: function () {
                    var selectedworkspaces = $filter('filter')($scope.workspaces, {
                        active: true
                    });
                    var idworkspaces = {
                        ids: []
                    };
                    for (var i = 0; i < selectedworkspaces.length; i++) {
                        if (selectedworkspaces[i].status == 'AVAILABLE') {
                            idworkspaces.ids.push(selectedworkspaces[i].id);
                        }
                    }
                    var innerScope = $scope.$new();
                    $log.debug('Opening stop channel popup...');
                    $scope.modal = $modal({
                        scope: innerScope,
                        template: 'views/templates/areyousure-modal.html'
                    });

                    innerScope.yes = function () {
                        $scope.modal.hide();
                        WorkspaceAPI.stopWorkspace(idworkspaces).then(function () {
                            growl.success('Workspace is stopping. This may take a few minutes.');
                        });
                    }
                }
            },
            {
                text: 'Rebuild',
                click: function () {
                    var selectedworkspaces = $filter('filter')($scope.workspaces, {
                        active: true
                    });
                    var idworkspaces = {
                        ids: []
                    };
                    for (var i = 0; i < selectedworkspaces.length; i++) {

                        if (selectedworkspaces[i].status == "AVAILABLE" || selectedworkspaces[i].status == "UNHEALTHY") {
                            idworkspaces.ids.push(selectedworkspaces[i].id);

                        } else {

                            growl.warning("To rebuild the workspace of " + selectedworkspaces[i].userName + ", please start it");
                        }


                    }

                    if (idworkspaces.ids.length > 0) {

                        var innerScope = $scope.$new();
                        $log.debug('Opening stop channel popup...');
                        $scope.modal = $modal({
                            scope: innerScope,
                            template: 'views/templates/areyousure-modal.html'
                        });

                        innerScope.yes = function () {
                            $scope.modal.hide();
                            WorkspaceAPI.rebuildWorkspace(idworkspaces).then(function () {
                                growl.success('Workspace is rebuilding. This may take a few minutes.');
                            });
                        }

                    }
                }
            },
            {
                text: 'Reboot',
                click: function () {
                    var selectedworkspaces = $filter('filter')($scope.workspaces, {
                        active: true
                    });
                    var idworkspaces = {
                        ids: []
                    };
                    for (var i = 0; i < selectedworkspaces.length; i++) {
                        if (selectedworkspaces[i].status == 'STOPPED') {
                            idworkspaces.ids.push(selectedworkspaces[i].id);
                        }
                    }
                    var innerScope = $scope.$new();
                    $log.debug('Opening stop channel popup...');
                    $scope.modal = $modal({
                        scope: innerScope,
                        template: 'views/templates/areyousure-modal.html'
                    });

                    innerScope.yes = function () {
                        $scope.modal.hide();
                        WorkspaceAPI.rebootWorkspace(idworkspaces).then(function () {
                            growl.success('Workspace is rebooting. This may take a few minutes.');
                        });
                    }
                }
            },
            {
                text: 'Terminate',
                click: function () {
                    var selectedworkspaces = $filter('filter')($scope.workspaces, {
                        active: true
                    });
                    var idworkspaces = {
                        ids: []
                    };
                    for (var i = 0; i < selectedworkspaces.length; i++) {
                        idworkspaces.ids.push(selectedworkspaces[i].id);
                    }
                    var innerScope = $scope.$new();
                    $log.debug('Opening stop channel popup...');
                    $scope.modal = $modal({
                        scope: innerScope,
                        template: 'views/workspaces/areyousure-terminate-modal.html'
                    });

                    innerScope.yes = function () {
                        $scope.modal.hide();
                        WorkspaceAPI.terminateWorkspace(idworkspaces).then(function () {
                            growl.success('Workspace is rebooting. This may take a few minutes.');
                        });
                    }
                }
            }
            ];
        } else {
            $scope.actions = [{
                text: 'Sync Directory',
                click: function () {
                    WorkspaceAPI.updateDirectoriesWorkspaces().then(function () {
                        growl.success('The directory will be updated. This may take a few minutes.');
                    }).catch(function (err) {
                        growl.error(err);
                    })
                }
            },
            {
                text: 'Schedule',
                click: function () {
                    // startAction();
                    var selectedworkspaces = $filter('filter')($scope.workspaces, {
                        active: true
                    });
                    // var selectedworkspaces = $filter('filter')(getModel(scope, itemsPath), { active: true });
                    var selection = [];
                    if (selectedworkspaces.length > 0) {
                        angular.forEach(selectedworkspaces, function (item) {
                            selection.push({
                                id: item.id,
                                label: item.externalId + '  (' + item.id + ')'
                            });
                        });
                    }
                    SchedulingService.openWidget('WORKSPACES', selection, true);
                    // stopAction();
                }
            },
            ]
        }
    }

});
