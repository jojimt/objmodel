/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM *//** @jsx React.DOM */

	// Little hack to make ReactBootstrap components visible globally
	Object.keys(ReactBootstrap).forEach(function (name) {
	    window[name] = ReactBootstrap[name];
	});

	// Navigation tab
	var ControlledTabArea = __webpack_require__(1)

	// Render the main tabs
	React.render(React.createElement(ControlledTabArea, null), document.getElementById('mainViewContainer'));


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */// navTab.js
	// Navigation tab

	// panels
	var HomePane = __webpack_require__(2)
	var NetworkPane = __webpack_require__(3)
	var GroupsPane = __webpack_require__(4)
	var PolicyPane = __webpack_require__(5)
	var VolumesPane = __webpack_require__(6)

	window.globalRefreshDelay = 300

	// Define tabs
	var ControlledTabArea = React.createClass({displayName: "ControlledTabArea",
	  getInitialState: function() {
	    return {
	      key: 1,
	    };
	  },

	  getStateFromServer: function() {
	    // Sort function for all contiv objects
	    var sortObjFunc = function(first, second) {
	      if (first.key > second.key) {
	          return 1
	      } else if (first.key < second.key) {
	          return -1
	      }

	      return 0
	    }

	    // Get all endpoints
	    $.ajax({
	      url: "/endpoints",
	      dataType: 'json',
	      success: function(data) {

	        // Sort the data
	        data = data.sort(sortObjFunc);

	        this.setState({endpoints: data});

	        // Save it in a global variable for debug
	        window.globalEndpoints = data
	      }.bind(this),
	      error: function(xhr, status, err) {
	        // console.error("/endpoints", status, err.toString());
	        this.setState({endpoints: []});
	      }.bind(this)
	    });

	    // Get all networks
	    $.ajax({
	      url: "/api/networks/",
	      dataType: 'json',
	      success: function(data) {

	        // Sort the data
	        data = data.sort(sortObjFunc);

	        this.setState({networks: data});

	        // Save it in a global variable for debug
	        window.globalNetworks = data
	      }.bind(this),
	      error: function(xhr, status, err) {
	        console.error("/api/networks/", status, err.toString());
	      }.bind(this)
	    });

	    // Get all endpoint groups
	    $.ajax({
	      url: "/api/endpointGroups/",
	      dataType: 'json',
	      success: function(data) {

	        // Sort the data
	        data = data.sort(sortObjFunc);

	        this.setState({endpointGroups: data});

	        // Save it in a global variable for debug
	        window.globalEndpointGroups = data
	      }.bind(this),
	      error: function(xhr, status, err) {
	        console.error("/api/endpointGroups/", status, err.toString());
	      }.bind(this)
	    });

	    // Get all policies
	    $.ajax({
	      url: "/api/policys/",
	      dataType: 'json',
	      success: function(data) {

	        // Sort the data
	        data = data.sort(sortObjFunc);

	        this.setState({policies: data});

	        // Save it in a global variable for debug
	        window.globalPolicies = data
	      }.bind(this),
	      error: function(xhr, status, err) {
	        console.error("/api/policys/", status, err.toString());
	      }.bind(this)
	    });

	    // Get all rules
	    $.ajax({
	      url: "/api/rules/",
	      dataType: 'json',
	      success: function(data) {

	        // Sort the data
	        data = data.sort(sortObjFunc);

	        this.setState({rules: data});

	        // Save it in a global variable for debug
	        window.globalRules = data
	      }.bind(this),
	      error: function(xhr, status, err) {
	        console.error("/api/rules/", status, err.toString());
	      }.bind(this)
	    });
	  },
	  componentDidMount: function() {
	    this.getStateFromServer();

	    // Get state every 2 sec
	    setInterval(this.getStateFromServer, window.globalRefreshDelay);
	  },
	  handleSelect: function(key) {
	    this.setState({key: key});
	  },

	  render: function() {
	      var self = this

	    return (
	      React.createElement(TabbedArea, {activeKey: this.state.key, onSelect: this.handleSelect}, 
	        React.createElement(TabPane, {eventKey: 1, tab: "Home"}, 
	            React.createElement(HomePane, {key: "home", endpoints: this.state.endpoints})
	        ), 
	        React.createElement(TabPane, {eventKey: 3, tab: "Networks"}, " ", React.createElement("h3", null, " Networks "), 
	            React.createElement(NetworkPane, {key: "networks", networks: this.state.networks})
	        ), 
	        React.createElement(TabPane, {eventKey: 4, tab: "Groups"}, " ", React.createElement("h3", null, " Groups "), 
	            React.createElement(GroupsPane, {key: "groups", endpointGroups: this.state.endpointGroups})
	        ), 
	        React.createElement(TabPane, {eventKey: 5, tab: "Policies"}, " ", React.createElement("h3", null, " Policy "), 
	            React.createElement(PolicyPane, {key: "policy", policies: this.state.policies})
	        ), 
	        React.createElement(TabPane, {eventKey: 6, tab: "Volumes"}, " ", React.createElement("h3", null, " Volumes "), 
	            React.createElement(VolumesPane, {key: "volumes", volumes: this.state.volumes})
	        )
	      )
	    );
	  }
	});

	module.exports = ControlledTabArea


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */// home.js
	// Display Endpoint information

	var HomePane = React.createClass({displayName: "HomePane",
	  	render: function() {
			var self = this

			if (self.props.endpoints === undefined) {
	            return (
	            React.createElement("div", {style: {margin: '5%',}}, 
	    			React.createElement(Table, {hover: true}, 
	    				React.createElement("thead", null, 
	    					React.createElement("tr", null, 
	    						React.createElement("th", null, "Host"), 
	                            React.createElement("th", null, "Service"), 
	    						React.createElement("th", null, "Network"), 
	    						React.createElement("th", null, "IP address"), 
	                            React.createElement("th", null, " Link ")
	    					)
	    				), 
	    				React.createElement("tbody", null
	    				)
	    			)
	            )
	            );
			}

			// Walk thru all the endpoints
			var epListView = self.props.endpoints.map(function(ep){
	            var homeUrl = "/proxy/" + ep.ipAddress
				return (
					React.createElement("tr", {key: ep.id, className: "info"}, 
						React.createElement("td", null, ep.homingHost), 
	                    React.createElement("td", null, ep.serviceName), 
	                    React.createElement("td", null, ep.netID), 
						React.createElement("td", null, ep.ipAddress), 
	                    React.createElement("td", null, " ", React.createElement("a", {href: homeUrl}, ep.ipAddress))
					)
				);
			});

			// Render the pane
			return (
	        React.createElement("div", {style: {margin: '5%',}}, 
				React.createElement(Table, {hover: true}, 
					React.createElement("thead", null, 
						React.createElement("tr", null, 
							React.createElement("th", null, "Host"), 
	                        React.createElement("th", null, "Service"), 
							React.createElement("th", null, "Network"), 
							React.createElement("th", null, "IP address"), 
	                        React.createElement("th", null, " Link ")
						)
					), 
					React.createElement("tbody", null, 
	            		epListView
					)
				)
	        )
	        );
		}
	});

	module.exports = HomePane


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */// network.js
	// Display Network information

	var contivModel = __webpack_require__(7)

	var NetworkPane = React.createClass({displayName: "NetworkPane",
	  	render: function() {
			var self = this

			if (self.props.networks === undefined) {
				return React.createElement("div", null, " ")
			}
	        return (
	            React.createElement("div", {style: {margin: '5%',}}, 
	                React.createElement(NetworkSummaryView, {key: "NetworkSummary", networks: self.props.networks})
	            )
	        );
		}
	});

	var NetworkSummaryView = React.createClass({displayName: "NetworkSummaryView",
	  	render: function() {
			var self = this

			// Walk thru all objects
			var networkListView = self.props.networks.map(function(network){
				return (
					React.createElement(ModalTrigger, {modal: React.createElement(NetworkModalView, {network:  network })}, 
						React.createElement("tr", {key:  network.key, className: "info"}, 
	                        React.createElement("td", null,  network.networkName), 
	                        React.createElement("td", null,  network.encap), 
	                        React.createElement("td", null,  network.subnet), 
	                        React.createElement("td", null,  network.defaultGw)

						)
					)
				);
			});

			return (
	        React.createElement("div", null, 
				React.createElement(Table, {hover: true}, 
					React.createElement("thead", null, 
						React.createElement("tr", null, 
	                        React.createElement("th", null, " Network name "), 
	                        React.createElement("th", null, " Encapsulation "), 
	                        React.createElement("th", null, " Subnet "), 
							React.createElement("th", null, " Gateway ")
						)
					), 
					React.createElement("tbody", null, 
	            		 networkListView 
					)
				)
	        )
	    	);
		}
	});

	var NetworkModalView = React.createClass({displayName: "NetworkModalView",
		render:function() {
			var obj = this.props.network
		    return (
		      React.createElement(Modal, React.__spread({},  this.props, {bsStyle: "primary", bsSize: "large", title: "Network", animation: false}), 
		        React.createElement("div", {className: "modal-body", style:  {margin: '5%',} }, 
	                React.createElement(Input, {type: "text", label: "Tenant Name", ref: "tenantName", defaultValue: obj.tenantName, placeholder: "Tenant Name"}), 
	                React.createElement(Input, {type: "text", label: "Network name", ref: "networkName", defaultValue: obj.networkName, placeholder: "Network name"}), 
					React.createElement(Input, {type: "text", label: "Encapsulation", ref: "encap", defaultValue: obj.encap, placeholder: "Encapsulation"}), 
					React.createElement(Input, {type: "text", label: "Private network", ref: "isPrivate", defaultValue: obj.isPrivate, placeholder: "Private network"}), 
					React.createElement(Input, {type: "text", label: "Public network", ref: "isPublic", defaultValue: obj.isPublic, placeholder: "Public network"}), 
					React.createElement(Input, {type: "text", label: "Subnet", ref: "subnet", defaultValue: obj.subnet, placeholder: "Subnet"}), 
	                React.createElement(Input, {type: "text", label: "Gateway", ref: "defaultGw", defaultValue: obj.defaultGw, placeholder: "Gateway"})
				), 
		        React.createElement("div", {className: "modal-footer"}, 
					React.createElement(Button, {onClick: this.props.onRequestHide}, "Close")
		        )
		      )
		    );
	  	}
	});


	module.exports = NetworkPane


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */// groups.js
	// Display Endpoint group information

	var contivModel = __webpack_require__(7)

	var GroupsPane = React.createClass({displayName: "GroupsPane",
	  	render: function() {
			var self = this

			if (self.props.endpointGroups === undefined) {
				return React.createElement("div", null, " ")
			}

	        var EndpointGroupSummaryView = contivModel.EndpointGroupSummaryView
	        return (
	            React.createElement("div", {style: {margin: '5%',}}, 
	                React.createElement(EndpointGroupSummaryView, {key: "EndpointGroupSummary", endpointGroups: self.props.endpointGroups})
	            )
	        )
		}
	});

	module.exports = GroupsPane


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */// policy.js
	// Display Policy information

	var contivModel = __webpack_require__(7)

	var PolicySummaryView = React.createClass({displayName: "PolicySummaryView",
	  	render: function() {
			var self = this

			// Walk thru all objects
			var policyListView = self.props.policys.map(function(policy){
				return (
					React.createElement(ModalTrigger, {modal: React.createElement(PolicyModalView, {policy:  policy })}, 
						React.createElement("tr", {key:  policy.key, className: "info"}, 
							React.createElement("td", null,  policy.tenantName), 
	                        React.createElement("td", null,  policy.policyName)
						)
					)
				);
			});

			return (
	        React.createElement("div", null, 
				React.createElement(Table, {hover: true}, 
					React.createElement("thead", null, 
						React.createElement("tr", null, 
							React.createElement("th", null, " Tenant Name "), 
	                        React.createElement("th", null, " Policy Name ")
						)
					), 
					React.createElement("tbody", null, 
	            		 policyListView 
					)
				)
	        )
	    	);
		}
	});

	var PolicyModalView = React.createClass({displayName: "PolicyModalView",
		render:function() {
			var obj = this.props.policy

	        var rules = window.globalRules.filter(function(rule){
	            if ((rule.tenantName == obj.tenantName) && (rule.policyName == obj.policyName)) {
	                return true
	            }

	            return false
	        })
		    return (
		      React.createElement(Modal, React.__spread({},  this.props, {bsStyle: "primary", bsSize: "large", title: obj.policyName, animation: false}), 
		        React.createElement("div", {className: "modal-body", style:  {margin: '5%',} }, 
					React.createElement(Input, {type: "text", label: "Tenant Name", ref: "tenantName", defaultValue: obj.tenantName, placeholder: "Tenant Name"}), 
	                React.createElement(Input, {type: "text", label: "Policy Name", ref: "policyName", defaultValue: obj.policyName, placeholder: "Policy Name"})
				), 
	            React.createElement("div", {style:  {margin: '5%',} }, 
	                React.createElement("h3", null, " Rules "), 
	                React.createElement(RuleSummaryView, {key: "ruleSummary", rules: rules})
	            ), 
		        React.createElement("div", {className: "modal-footer"}, 
					React.createElement(Button, {onClick: this.props.onRequestHide}, "Close")
		        )
		      )
		    );
	  	}
	});

	var RuleModalView = contivModel.RuleModalView
	var RuleSummaryView = React.createClass({displayName: "RuleSummaryView",
	  	render: function() {
			var self = this

			// Walk thru all objects
			var ruleListView = self.props.rules.map(function(rule){
				return (
					React.createElement(ModalTrigger, {modal: React.createElement(RuleModalView, {rule:  rule })}, 
						React.createElement("tr", {key:  rule.key, className: "info"}, 
	                        React.createElement("td", null,  rule.ruleId), 
	                        React.createElement("td", null,  rule.priority), 
							React.createElement("td", null,  rule.action), 
							React.createElement("td", null,  rule.direction), 
							React.createElement("td", null,  rule.endpointGroup), 
	                        React.createElement("td", null,  rule.ipAddress), 
	                        React.createElement("td", null,  rule.protocol), 
							React.createElement("td", null,  rule.port)
						)
					)
				);
			});

			return (
	        React.createElement("div", null, 
				React.createElement(Table, {hover: true}, 
					React.createElement("thead", null, 
						React.createElement("tr", null, 
	                        React.createElement("th", null, " Rule Id "), 
	                        React.createElement("th", null, " Priority "), 
							React.createElement("th", null, " Action "), 
							React.createElement("th", null, " Direction "), 
							React.createElement("th", null, " Group "), 
	                        React.createElement("th", null, " IP Address "), 
	                        React.createElement("th", null, " Protocol "), 
							React.createElement("th", null, " Port No ")
						)
					), 
					React.createElement("tbody", null, 
	            		 ruleListView 
					)
				)
	        )
	    	);
		}
	});
	var PolicyPane = React.createClass({displayName: "PolicyPane",
	  	render: function() {
			var self = this

			if (self.props.policies === undefined) {
				return React.createElement("div", null, " ")
			}

	        // var PolicySummaryView = contivModel.PolicySummaryView
	        return (
	            React.createElement("div", {style: {margin: '5%',}}, 
	                React.createElement(PolicySummaryView, {key: "policySummary", policys: self.props.policies})
	            )
	        );
		}
	});

	module.exports = PolicyPane


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */// volumes.js
	// Display Volumes information

	var VolumesPane = React.createClass({displayName: "VolumesPane",
	  	render: function() {
			var self = this

			if (self.props.volumes === undefined) {
				return React.createElement("div", null, " ")
			}

			// Walk thru all the volumes
			var volListView = self.props.volumes.map(function(vol){
				return (
					React.createElement("tr", {key: vol.key, className: "info"}, 
						React.createElement("td", null, vol.tenantName), 
						React.createElement("td", null, vol.volumeName), 
						React.createElement("td", null, vol.poolName), 
						React.createElement("td", null, vol.size)
					)
				);
			});

			// Render the pane
			return (
	        React.createElement("div", {style: {margin: '5%',}}, 
				React.createElement(Table, {hover: true}, 
					React.createElement("thead", null, 
						React.createElement("tr", null, 
							React.createElement("th", null, "Tenant"), 
							React.createElement("th", null, "Volume"), 
							React.createElement("th", null, "Pool"), 
							React.createElement("th", null, "Size")
						)
					), 
					React.createElement("tbody", null, 
	            		volListView
					)
				)
	        )
	    );
		}
	});

	module.exports = VolumesPane


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */// contivModel.js
	// This file is auto generated by modelgen tool
	// Do not edit this file manually

	var AppSummaryView = React.createClass({displayName: "AppSummaryView",
	  	render: function() {
			var self = this

			// Walk thru all objects
			var appListView = self.props.apps.map(function(app){
				return (
					React.createElement(ModalTrigger, {modal: React.createElement(AppModalView, {app:  app })}, 
						React.createElement("tr", {key:  app.key, className: "info"}
							
							  
						)
					)
				);
			});

			return (
	        React.createElement("div", null, 
				React.createElement(Table, {hover: true}, 
					React.createElement("thead", null, 
						React.createElement("tr", null
						
						  
						)
					), 
					React.createElement("tbody", null, 
	            		 appListView 
					)
				)
	        )
	    	);
		}
	});

	var AppModalView = React.createClass({displayName: "AppModalView",
		render:function() {
			var obj = this.props.app
		    return (
		      React.createElement(Modal, React.__spread({},  this.props, {bsStyle: "primary", bsSize: "large", title: "App", animation: false}), 
		        React.createElement("div", {className: "modal-body", style:  {margin: '5%',} }, 
				
				
					React.createElement(Input, {type: "text", label: "", ref: "appName", defaultValue: obj.appName, placeholder: ""}), 
				
					React.createElement(Input, {type: "text", label: "", ref: "tenantName", defaultValue: obj.tenantName, placeholder: ""})
				
				), 
		        React.createElement("div", {className: "modal-footer"}, 
					React.createElement(Button, {onClick: this.props.onRequestHide}, "Close")
		        )
		      )
		    );
	  	}
	});

	module.exports.AppSummaryView = AppSummaryView
	module.exports.AppModalView = AppModalView
	var EndpointGroupSummaryView = React.createClass({displayName: "EndpointGroupSummaryView",
	  	render: function() {
			var self = this

			// Walk thru all objects
			var endpointGroupListView = self.props.endpointGroups.map(function(endpointGroup){
				return (
					React.createElement(ModalTrigger, {modal: React.createElement(EndpointGroupModalView, {endpointGroup:  endpointGroup })}, 
						React.createElement("tr", {key:  endpointGroup.key, className: "info"}, 
							
							  
							React.createElement("td", null,  endpointGroup.groupName), 
							 
							React.createElement("td", null,  endpointGroup.networkName), 
							 
							React.createElement("td", null,  endpointGroup.policies)
							 
						)
					)
				);
			});

			return (
	        React.createElement("div", null, 
				React.createElement(Table, {hover: true}, 
					React.createElement("thead", null, 
						React.createElement("tr", null, 
						
						  
							React.createElement("th", null, " Group name "), 
							React.createElement("th", null, " Network "), 
							React.createElement("th", null, " Policies ")
						)
					), 
					React.createElement("tbody", null, 
	            		 endpointGroupListView 
					)
				)
	        )
	    	);
		}
	});

	var EndpointGroupModalView = React.createClass({displayName: "EndpointGroupModalView",
		render:function() {
			var obj = this.props.endpointGroup
		    return (
		      React.createElement(Modal, React.__spread({},  this.props, {bsStyle: "primary", bsSize: "large", title: "EndpointGroup", animation: false}), 
		        React.createElement("div", {className: "modal-body", style:  {margin: '5%',} }, 
				
				
					React.createElement(Input, {type: "text", label: "Group Identifier", ref: "endpointGroupId", defaultValue: obj.endpointGroupId, placeholder: "Group Identifier"}), 
				
					React.createElement(Input, {type: "text", label: "Group name", ref: "groupName", defaultValue: obj.groupName, placeholder: "Group name"}), 
				
					React.createElement(Input, {type: "text", label: "Network", ref: "networkName", defaultValue: obj.networkName, placeholder: "Network"}), 
				
					React.createElement(Input, {type: "text", label: "Policies", ref: "policies", defaultValue: obj.policies, placeholder: "Policies"}), 
				
					React.createElement(Input, {type: "text", label: "Tenant", ref: "tenantName", defaultValue: obj.tenantName, placeholder: "Tenant"})
				
				), 
		        React.createElement("div", {className: "modal-footer"}, 
					React.createElement(Button, {onClick: this.props.onRequestHide}, "Close")
		        )
		      )
		    );
	  	}
	});

	module.exports.EndpointGroupSummaryView = EndpointGroupSummaryView
	module.exports.EndpointGroupModalView = EndpointGroupModalView
	var NetworkSummaryView = React.createClass({displayName: "NetworkSummaryView",
	  	render: function() {
			var self = this

			// Walk thru all objects
			var networkListView = self.props.networks.map(function(network){
				return (
					React.createElement(ModalTrigger, {modal: React.createElement(NetworkModalView, {network:  network })}, 
						React.createElement("tr", {key:  network.key, className: "info"}, 
							
							 
							React.createElement("td", null,  network.defaultGw), 
							 
							React.createElement("td", null,  network.encap), 
							   
							React.createElement("td", null,  network.networkName), 
							 
							React.createElement("td", null,  network.subnet)
							 
						)
					)
				);
			});

			return (
	        React.createElement("div", null, 
				React.createElement(Table, {hover: true}, 
					React.createElement("thead", null, 
						React.createElement("tr", null, 
						
						 
							React.createElement("th", null, " Gateway "), 
							React.createElement("th", null, " Encapsulation "), 
							React.createElement("th", null, " Network name "), 
							React.createElement("th", null, " Subnet ")
						)
					), 
					React.createElement("tbody", null, 
	            		 networkListView 
					)
				)
	        )
	    	);
		}
	});

	var NetworkModalView = React.createClass({displayName: "NetworkModalView",
		render:function() {
			var obj = this.props.network
		    return (
		      React.createElement(Modal, React.__spread({},  this.props, {bsStyle: "primary", bsSize: "large", title: "Network", animation: false}), 
		        React.createElement("div", {className: "modal-body", style:  {margin: '5%',} }, 
				
				
					React.createElement(Input, {type: "text", label: "Gateway", ref: "defaultGw", defaultValue: obj.defaultGw, placeholder: "Gateway"}), 
				
					React.createElement(Input, {type: "text", label: "Encapsulation", ref: "encap", defaultValue: obj.encap, placeholder: "Encapsulation"}), 
				
					React.createElement(Input, {type: "text", label: "Private network", ref: "isPrivate", defaultValue: obj.isPrivate, placeholder: "Private network"}), 
				
					React.createElement(Input, {type: "text", label: "Public network", ref: "isPublic", defaultValue: obj.isPublic, placeholder: "Public network"}), 
				
					React.createElement(Input, {type: "text", label: "Network name", ref: "networkName", defaultValue: obj.networkName, placeholder: "Network name"}), 
				
					React.createElement(Input, {type: "text", label: "Subnet", ref: "subnet", defaultValue: obj.subnet, placeholder: "Subnet"}), 
				
					React.createElement(Input, {type: "text", label: "Tenant Name", ref: "tenantName", defaultValue: obj.tenantName, placeholder: "Tenant Name"})
				
				), 
		        React.createElement("div", {className: "modal-footer"}, 
					React.createElement(Button, {onClick: this.props.onRequestHide}, "Close")
		        )
		      )
		    );
	  	}
	});

	module.exports.NetworkSummaryView = NetworkSummaryView
	module.exports.NetworkModalView = NetworkModalView
	var PolicySummaryView = React.createClass({displayName: "PolicySummaryView",
	  	render: function() {
			var self = this

			// Walk thru all objects
			var policyListView = self.props.policys.map(function(policy){
				return (
					React.createElement(ModalTrigger, {modal: React.createElement(PolicyModalView, {policy:  policy })}, 
						React.createElement("tr", {key:  policy.key, className: "info"}, 
							
							 
							React.createElement("td", null,  policy.policyName), 
							 
							React.createElement("td", null,  policy.tenantName)
							
						)
					)
				);
			});

			return (
	        React.createElement("div", null, 
				React.createElement(Table, {hover: true}, 
					React.createElement("thead", null, 
						React.createElement("tr", null, 
						
						 
							React.createElement("th", null, " Policy Name "), 
							React.createElement("th", null, " Tenant Name ")
						)
					), 
					React.createElement("tbody", null, 
	            		 policyListView 
					)
				)
	        )
	    	);
		}
	});

	var PolicyModalView = React.createClass({displayName: "PolicyModalView",
		render:function() {
			var obj = this.props.policy
		    return (
		      React.createElement(Modal, React.__spread({},  this.props, {bsStyle: "primary", bsSize: "large", title: "Policy", animation: false}), 
		        React.createElement("div", {className: "modal-body", style:  {margin: '5%',} }, 
				
				
					React.createElement(Input, {type: "text", label: "Policy Name", ref: "policyName", defaultValue: obj.policyName, placeholder: "Policy Name"}), 
				
					React.createElement(Input, {type: "text", label: "Tenant Name", ref: "tenantName", defaultValue: obj.tenantName, placeholder: "Tenant Name"})
				
				), 
		        React.createElement("div", {className: "modal-footer"}, 
					React.createElement(Button, {onClick: this.props.onRequestHide}, "Close")
		        )
		      )
		    );
	  	}
	});

	module.exports.PolicySummaryView = PolicySummaryView
	module.exports.PolicyModalView = PolicyModalView
	var RuleSummaryView = React.createClass({displayName: "RuleSummaryView",
	  	render: function() {
			var self = this

			// Walk thru all objects
			var ruleListView = self.props.rules.map(function(rule){
				return (
					React.createElement(ModalTrigger, {modal: React.createElement(RuleModalView, {rule:  rule })}, 
						React.createElement("tr", {key:  rule.key, className: "info"}, 
							
							 
							React.createElement("td", null,  rule.action), 
							 
							React.createElement("td", null,  rule.direction), 
							 
							React.createElement("td", null,  rule.endpointGroup), 
							 
							React.createElement("td", null,  rule.ipAddress), 
							  
							React.createElement("td", null,  rule.policyName), 
							 
							React.createElement("td", null,  rule.port), 
							 
							React.createElement("td", null,  rule.priority), 
							 
							React.createElement("td", null,  rule.protocol), 
							 
							React.createElement("td", null,  rule.ruleId), 
							 
							React.createElement("td", null,  rule.tenantName)
							
						)
					)
				);
			});

			return (
	        React.createElement("div", null, 
				React.createElement(Table, {hover: true}, 
					React.createElement("thead", null, 
						React.createElement("tr", null, 
						
						 
							React.createElement("th", null, " Action "), 
							React.createElement("th", null, " Direction "), 
							React.createElement("th", null, " Group "), 
							React.createElement("th", null, " IP Address "), 
							React.createElement("th", null, " Policy Name "), 
							React.createElement("th", null, " Port No "), 
							React.createElement("th", null, " Priority "), 
							React.createElement("th", null, " Protocol "), 
							React.createElement("th", null, " Rule Id "), 
							React.createElement("th", null, " Tenant Name ")
						)
					), 
					React.createElement("tbody", null, 
	            		 ruleListView 
					)
				)
	        )
	    	);
		}
	});

	var RuleModalView = React.createClass({displayName: "RuleModalView",
		render:function() {
			var obj = this.props.rule
		    return (
		      React.createElement(Modal, React.__spread({},  this.props, {bsStyle: "primary", bsSize: "large", title: "Rule", animation: false}), 
		        React.createElement("div", {className: "modal-body", style:  {margin: '5%',} }, 
				
				
					React.createElement(Input, {type: "text", label: "Action", ref: "action", defaultValue: obj.action, placeholder: "Action"}), 
				
					React.createElement(Input, {type: "text", label: "Direction", ref: "direction", defaultValue: obj.direction, placeholder: "Direction"}), 
				
					React.createElement(Input, {type: "text", label: "Group", ref: "endpointGroup", defaultValue: obj.endpointGroup, placeholder: "Group"}), 
				
					React.createElement(Input, {type: "text", label: "IP Address", ref: "ipAddress", defaultValue: obj.ipAddress, placeholder: "IP Address"}), 
				
					React.createElement(Input, {type: "text", label: "Network Name", ref: "network", defaultValue: obj.network, placeholder: "Network Name"}), 
				
					React.createElement(Input, {type: "text", label: "Policy Name", ref: "policyName", defaultValue: obj.policyName, placeholder: "Policy Name"}), 
				
					React.createElement(Input, {type: "text", label: "Port No", ref: "port", defaultValue: obj.port, placeholder: "Port No"}), 
				
					React.createElement(Input, {type: "text", label: "Priority", ref: "priority", defaultValue: obj.priority, placeholder: "Priority"}), 
				
					React.createElement(Input, {type: "text", label: "Protocol", ref: "protocol", defaultValue: obj.protocol, placeholder: "Protocol"}), 
				
					React.createElement(Input, {type: "text", label: "Rule Id", ref: "ruleId", defaultValue: obj.ruleId, placeholder: "Rule Id"}), 
				
					React.createElement(Input, {type: "text", label: "Tenant Name", ref: "tenantName", defaultValue: obj.tenantName, placeholder: "Tenant Name"})
				
				), 
		        React.createElement("div", {className: "modal-footer"}, 
					React.createElement(Button, {onClick: this.props.onRequestHide}, "Close")
		        )
		      )
		    );
	  	}
	});

	module.exports.RuleSummaryView = RuleSummaryView
	module.exports.RuleModalView = RuleModalView
	var ServiceSummaryView = React.createClass({displayName: "ServiceSummaryView",
	  	render: function() {
			var self = this

			// Walk thru all objects
			var serviceListView = self.props.services.map(function(service){
				return (
					React.createElement(ModalTrigger, {modal: React.createElement(ServiceModalView, {service:  service })}, 
						React.createElement("tr", {key:  service.key, className: "info"}
							
							            
						)
					)
				);
			});

			return (
	        React.createElement("div", null, 
				React.createElement(Table, {hover: true}, 
					React.createElement("thead", null, 
						React.createElement("tr", null
						
						            
						)
					), 
					React.createElement("tbody", null, 
	            		 serviceListView 
					)
				)
	        )
	    	);
		}
	});

	var ServiceModalView = React.createClass({displayName: "ServiceModalView",
		render:function() {
			var obj = this.props.service
		    return (
		      React.createElement(Modal, React.__spread({},  this.props, {bsStyle: "primary", bsSize: "large", title: "Service", animation: false}), 
		        React.createElement("div", {className: "modal-body", style:  {margin: '5%',} }, 
				
				
					React.createElement(Input, {type: "text", label: "", ref: "appName", defaultValue: obj.appName, placeholder: ""}), 
				
					React.createElement(Input, {type: "text", label: "", ref: "command", defaultValue: obj.command, placeholder: ""}), 
				
					React.createElement(Input, {type: "text", label: "", ref: "cpu", defaultValue: obj.cpu, placeholder: ""}), 
				
					React.createElement(Input, {type: "text", label: "", ref: "endpointGroups", defaultValue: obj.endpointGroups, placeholder: ""}), 
				
					React.createElement(Input, {type: "text", label: "", ref: "environment", defaultValue: obj.environment, placeholder: ""}), 
				
					React.createElement(Input, {type: "text", label: "", ref: "imageName", defaultValue: obj.imageName, placeholder: ""}), 
				
					React.createElement(Input, {type: "text", label: "", ref: "memory", defaultValue: obj.memory, placeholder: ""}), 
				
					React.createElement(Input, {type: "text", label: "", ref: "networks", defaultValue: obj.networks, placeholder: ""}), 
				
					React.createElement(Input, {type: "text", label: "", ref: "scale", defaultValue: obj.scale, placeholder: ""}), 
				
					React.createElement(Input, {type: "text", label: "", ref: "serviceName", defaultValue: obj.serviceName, placeholder: ""}), 
				
					React.createElement(Input, {type: "text", label: "", ref: "tenantName", defaultValue: obj.tenantName, placeholder: ""}), 
				
					React.createElement(Input, {type: "text", label: "", ref: "volumeProfile", defaultValue: obj.volumeProfile, placeholder: ""})
				
				), 
		        React.createElement("div", {className: "modal-footer"}, 
					React.createElement(Button, {onClick: this.props.onRequestHide}, "Close")
		        )
		      )
		    );
	  	}
	});

	module.exports.ServiceSummaryView = ServiceSummaryView
	module.exports.ServiceModalView = ServiceModalView
	var ServiceInstanceSummaryView = React.createClass({displayName: "ServiceInstanceSummaryView",
	  	render: function() {
			var self = this

			// Walk thru all objects
			var serviceInstanceListView = self.props.serviceInstances.map(function(serviceInstance){
				return (
					React.createElement(ModalTrigger, {modal: React.createElement(ServiceInstanceModalView, {serviceInstance:  serviceInstance })}, 
						React.createElement("tr", {key:  serviceInstance.key, className: "info"}
							
							     
						)
					)
				);
			});

			return (
	        React.createElement("div", null, 
				React.createElement(Table, {hover: true}, 
					React.createElement("thead", null, 
						React.createElement("tr", null
						
						     
						)
					), 
					React.createElement("tbody", null, 
	            		 serviceInstanceListView 
					)
				)
	        )
	    	);
		}
	});

	var ServiceInstanceModalView = React.createClass({displayName: "ServiceInstanceModalView",
		render:function() {
			var obj = this.props.serviceInstance
		    return (
		      React.createElement(Modal, React.__spread({},  this.props, {bsStyle: "primary", bsSize: "large", title: "ServiceInstance", animation: false}), 
		        React.createElement("div", {className: "modal-body", style:  {margin: '5%',} }, 
				
				
					React.createElement(Input, {type: "text", label: "", ref: "appName", defaultValue: obj.appName, placeholder: ""}), 
				
					React.createElement(Input, {type: "text", label: "", ref: "instanceId", defaultValue: obj.instanceId, placeholder: ""}), 
				
					React.createElement(Input, {type: "text", label: "", ref: "serviceName", defaultValue: obj.serviceName, placeholder: ""}), 
				
					React.createElement(Input, {type: "text", label: "", ref: "tenantName", defaultValue: obj.tenantName, placeholder: ""}), 
				
					React.createElement(Input, {type: "text", label: "", ref: "volumes", defaultValue: obj.volumes, placeholder: ""})
				
				), 
		        React.createElement("div", {className: "modal-footer"}, 
					React.createElement(Button, {onClick: this.props.onRequestHide}, "Close")
		        )
		      )
		    );
	  	}
	});

	module.exports.ServiceInstanceSummaryView = ServiceInstanceSummaryView
	module.exports.ServiceInstanceModalView = ServiceInstanceModalView
	var TenantSummaryView = React.createClass({displayName: "TenantSummaryView",
	  	render: function() {
			var self = this

			// Walk thru all objects
			var tenantListView = self.props.tenants.map(function(tenant){
				return (
					React.createElement(ModalTrigger, {modal: React.createElement(TenantModalView, {tenant:  tenant })}, 
						React.createElement("tr", {key:  tenant.key, className: "info"}
							
							      
						)
					)
				);
			});

			return (
	        React.createElement("div", null, 
				React.createElement(Table, {hover: true}, 
					React.createElement("thead", null, 
						React.createElement("tr", null
						
						      
						)
					), 
					React.createElement("tbody", null, 
	            		 tenantListView 
					)
				)
	        )
	    	);
		}
	});

	var TenantModalView = React.createClass({displayName: "TenantModalView",
		render:function() {
			var obj = this.props.tenant
		    return (
		      React.createElement(Modal, React.__spread({},  this.props, {bsStyle: "primary", bsSize: "large", title: "Tenant", animation: false}), 
		        React.createElement("div", {className: "modal-body", style:  {margin: '5%',} }, 
				
				
					React.createElement(Input, {type: "text", label: "Network name", ref: "defaultNetwork", defaultValue: obj.defaultNetwork, placeholder: "Network name"}), 
				
					React.createElement(Input, {type: "text", label: "", ref: "subnetLen", defaultValue: obj.subnetLen, placeholder: ""}), 
				
					React.createElement(Input, {type: "text", label: "", ref: "subnetPool", defaultValue: obj.subnetPool, placeholder: ""}), 
				
					React.createElement(Input, {type: "text", label: "Tenant Name", ref: "tenantName", defaultValue: obj.tenantName, placeholder: "Tenant Name"}), 
				
					React.createElement(Input, {type: "text", label: "", ref: "vlans", defaultValue: obj.vlans, placeholder: ""}), 
				
					React.createElement(Input, {type: "text", label: "", ref: "vxlans", defaultValue: obj.vxlans, placeholder: ""})
				
				), 
		        React.createElement("div", {className: "modal-footer"}, 
					React.createElement(Button, {onClick: this.props.onRequestHide}, "Close")
		        )
		      )
		    );
	  	}
	});

	module.exports.TenantSummaryView = TenantSummaryView
	module.exports.TenantModalView = TenantModalView
	var VolumeSummaryView = React.createClass({displayName: "VolumeSummaryView",
	  	render: function() {
			var self = this

			// Walk thru all objects
			var volumeListView = self.props.volumes.map(function(volume){
				return (
					React.createElement(ModalTrigger, {modal: React.createElement(VolumeModalView, {volume:  volume })}, 
						React.createElement("tr", {key:  volume.key, className: "info"}
							
							      
						)
					)
				);
			});

			return (
	        React.createElement("div", null, 
				React.createElement(Table, {hover: true}, 
					React.createElement("thead", null, 
						React.createElement("tr", null
						
						      
						)
					), 
					React.createElement("tbody", null, 
	            		 volumeListView 
					)
				)
	        )
	    	);
		}
	});

	var VolumeModalView = React.createClass({displayName: "VolumeModalView",
		render:function() {
			var obj = this.props.volume
		    return (
		      React.createElement(Modal, React.__spread({},  this.props, {bsStyle: "primary", bsSize: "large", title: "Volume", animation: false}), 
		        React.createElement("div", {className: "modal-body", style:  {margin: '5%',} }, 
				
				
					React.createElement(Input, {type: "text", label: "", ref: "datastoreType", defaultValue: obj.datastoreType, placeholder: ""}), 
				
					React.createElement(Input, {type: "text", label: "", ref: "mountPoint", defaultValue: obj.mountPoint, placeholder: ""}), 
				
					React.createElement(Input, {type: "text", label: "", ref: "poolName", defaultValue: obj.poolName, placeholder: ""}), 
				
					React.createElement(Input, {type: "text", label: "", ref: "size", defaultValue: obj.size, placeholder: ""}), 
				
					React.createElement(Input, {type: "text", label: "", ref: "tenantName", defaultValue: obj.tenantName, placeholder: ""}), 
				
					React.createElement(Input, {type: "text", label: "", ref: "volumeName", defaultValue: obj.volumeName, placeholder: ""})
				
				), 
		        React.createElement("div", {className: "modal-footer"}, 
					React.createElement(Button, {onClick: this.props.onRequestHide}, "Close")
		        )
		      )
		    );
	  	}
	});

	module.exports.VolumeSummaryView = VolumeSummaryView
	module.exports.VolumeModalView = VolumeModalView
	var VolumeProfileSummaryView = React.createClass({displayName: "VolumeProfileSummaryView",
	  	render: function() {
			var self = this

			// Walk thru all objects
			var volumeProfileListView = self.props.volumeProfiles.map(function(volumeProfile){
				return (
					React.createElement(ModalTrigger, {modal: React.createElement(VolumeProfileModalView, {volumeProfile:  volumeProfile })}, 
						React.createElement("tr", {key:  volumeProfile.key, className: "info"}
							
							      
						)
					)
				);
			});

			return (
	        React.createElement("div", null, 
				React.createElement(Table, {hover: true}, 
					React.createElement("thead", null, 
						React.createElement("tr", null
						
						      
						)
					), 
					React.createElement("tbody", null, 
	            		 volumeProfileListView 
					)
				)
	        )
	    	);
		}
	});

	var VolumeProfileModalView = React.createClass({displayName: "VolumeProfileModalView",
		render:function() {
			var obj = this.props.volumeProfile
		    return (
		      React.createElement(Modal, React.__spread({},  this.props, {bsStyle: "primary", bsSize: "large", title: "VolumeProfile", animation: false}), 
		        React.createElement("div", {className: "modal-body", style:  {margin: '5%',} }, 
				
				
					React.createElement(Input, {type: "text", label: "", ref: "datastoreType", defaultValue: obj.datastoreType, placeholder: ""}), 
				
					React.createElement(Input, {type: "text", label: "", ref: "mountPoint", defaultValue: obj.mountPoint, placeholder: ""}), 
				
					React.createElement(Input, {type: "text", label: "", ref: "poolName", defaultValue: obj.poolName, placeholder: ""}), 
				
					React.createElement(Input, {type: "text", label: "", ref: "size", defaultValue: obj.size, placeholder: ""}), 
				
					React.createElement(Input, {type: "text", label: "", ref: "tenantName", defaultValue: obj.tenantName, placeholder: ""}), 
				
					React.createElement(Input, {type: "text", label: "", ref: "volumeProfileName", defaultValue: obj.volumeProfileName, placeholder: ""})
				
				), 
		        React.createElement("div", {className: "modal-footer"}, 
					React.createElement(Button, {onClick: this.props.onRequestHide}, "Close")
		        )
		      )
		    );
	  	}
	});

	module.exports.VolumeProfileSummaryView = VolumeProfileSummaryView
	module.exports.VolumeProfileModalView = VolumeProfileModalView

/***/ }
/******/ ]);
