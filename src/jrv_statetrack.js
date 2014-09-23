/**
 * JrvStateTrack
 * @type {object}
 */
JrvStateTrack = {
    /**
     * state - state[statename[id]]
     * @type Array
     */
    state: [],
    /**
     * startState
     * @param {string} statename
     * @param {string} id
     * @returns {undefined}
     */
    startState: function (statename, id) {

        if (!statename || !id) {
            // console.warn('State requires unique statename and id to track state'.);
            return;
        }
        
        if (!JrvStateTrack.state[statename]) {

            JrvStateTrack.state[statename] = [];
        }

        var firstState = false;

        if (JrvStateTrack.state[statename].length === 0) {

            firstState = true;
        }

        if (JrvStateTrack.state[statename].indexOf(id) < 0) {

            JrvStateTrack.state[statename].push(id);

            if (firstState) {
                RcmAdminService.RcmEventManager.trigger(
                        'JrvStateTrack.start',
                        {
                            id: id,
                            state: JrvStateTrack.state,
                            statename: statename
                        }
                );
            }

        }
    },
    /**
     * endState
     * @param {string} statename
     * @param {string} id
     * @returns {undefined}
     */
    endState: function (statename, id) {

        if (!statename || !id) {
            // console.warn('RcmState requires unique statename and id to track state state'.);
            return;
        }

        if (!JrvStateTrack.state[statename]) {

            JrvStateTrack.state[statename] = [];
        }

        var index = JrvStateTrack.state[statename].indexOf(id);

        if (index > -1) {

            JrvStateTrack.state[statename].splice(
                    index,
                    1
                    );

            if (JrvStateTrack.state[statename].length < 1) {

                RcmAdminService.RcmEventManager.trigger(
                        '.RcmAdminServiceRcmState.end',
                        {
                            id: id,
                            state: JrvStateTrack.state,
                            statename: statename
                        }
                );
            }
        }
    },
    /**
     * isState
     * @param {string} statename
     * @param {string} id
     * @returns {boolean}
     */
    isState: function (statename, id) {

        if (!statename) {

            for (var i in JrvStateTrack.state) {
                if (JrvStateTrack.state[i] > 0) {
                    return true;
                }

                return false;
            }
        }

        if (!JrvStateTrack.state[statename]) {
            return false;
        }

        if (!id) {

            return (JrvStateTrack.state[statename].indexOf(id) > -1);
        }

        return (JrvStateTrack.state[statename].length > 0)
    }
}