/**
 * JrvEventmanager
 * @type object
 */
JrvEventmanager = {
    
    /**
     * event
     * @type {class}
     * @param {string} id
     * @param {function} action
     * @param {int} priority
     * @returns {undefined}
     */
    eventAction: function(id, action, priority){
        var self = this;
        self.id = id;
        self.action = action;
        self.priority = priority;
    },
    
    /**
     * events
     * @type {object}
     */
    events: {},
    
    /**
     * on
     * @param {string} eventname
     * @param {function} method
     * @returns {undefined}
     */
    on: function (eventname, eventAction) {

        if (!JrvEventmanager.events[eventname]) {
            JrvEventmanager.events[eventname] = {};
        }

        JrvEventmanager.events[eventname][eventAction.id]= eventAction;
    },
    
    /**
     * trigger
     * @param {string} eventname
     * @param {object} args
     * @returns {undefined}
     */
    trigger: function (eventname, args) {
        
        if (JrvEventmanager.events[eventname]) {
            
            var event = JrvEventmanager.events[eventname]
            // @todo Implement priority
            for (var prop in event) {
                event[prop].action(args)
            }
        }
    },
    
    remove: function (eventname, eventActionId) {
        
        if (!JrvEventmanager.events[eventname]) {
            return;
        }

        delete JrvEventmanager.events[eventname][eventActionId];
    },
    
    /**
     * hasEvents
     * @param {string} eventname
     * @returns {Boolean}
     */
    hasEvents: function (eventname) {

        if (!JrvEventmanager.events[eventname]) {
            return false;
        }

        if (Object.getOwnPropertyNames(JrvEventmanager.events[eventname]).length === 0) {
            return false;
        }

        return true;
    }
}