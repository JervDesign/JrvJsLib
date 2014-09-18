/**
 * JrvEventmanager
 * @type object
 */
JrvEventmanager = {
    /**
     * events
     * @type object
     */
    events: {},
    /**
     * 
     * @param {string} eventname
     * @param {function} method
     * @returns {undefined}
     */
    on: function (eventname, method) {

        if (!this.events[eventname]) {
            this.events[eventname] = [];
        }

        this.events[eventname].push(method);
    },
    /**
     * 
     * @param {string} eventname
     * @param {object} args
     * @returns {undefined}
     */
    trigger: function (eventname, args) {
        
        if (this.events[eventname]) {
            
            var event = this.events[eventname]
            for (var prop in event) {
                event[prop](args)
            }
        }
    },
    /**
     * 
     * @param {string} eventname
     * @returns {Boolean}
     */
    hasEvents: function (eventname) {

        if (!this.events[eventname]) {
            return false;
        }

        if (this.events[eventname].length > 0) {
            return true;
        }

        return false;
    }
}