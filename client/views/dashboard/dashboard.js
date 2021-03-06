Template.dashboard.helpers({
    islocked: function() {
        return islocked();
    },

    balance: function() {
        var wallet = Wallet.findOne();
        if(wallet && wallet.balance) {
            return wallet.balance.toLocaleString();
        }

        return "-";
    },

    stake: function() {
        var wallet = Wallet.findOne();
        if(wallet && wallet.stake) {
            return wallet.stake.toLocaleString();
        }

        return "-";
    },

    unconfirmed_balance: function() {
        var wallet = Wallet.findOne();
        if(wallet && wallet.unconfirmedbalance) {
            return wallet.unconfirmedbalance.toLocaleString();
        }

        return "-";
    },

    total_balance: function() {
        var wallet = Wallet.findOne();
        if(wallet && wallet.balance) {
            return Number(wallet.balance + wallet.unconfirmedbalance).toLocaleString();
        }

        return "-";
    },

    isstaking: function() {
        if(Stake.findOne()) {
            var stake = Stake.findOne();

            if(stake.staking) {
                return "glyphicon glyphicon-ok receive";
            }
        }

        return "glyphicon glyphicon-remove send"
    },

    staketime: function() {
        if(Stake.findOne()) {
            var stake = Stake.findOne();

            if(!stake.staking) {
                return "-";
            }

            var network_weight = stake.netstakeweight;
            var total_weight = stake.totalweight;

            var estimated_time = 60 * network_weight / total_weight;

            if(estimated_time < 60) {
                return Math.ceil(estimated_time) + " second(s)";
            } else if(estimated_time < 60 * 60) {
                return Math.ceil(estimated_time / 60) + " minute(s)";
            } else if(estimated_time < 24 * 60 * 60) {
                return Math.ceil(estimated_time / (60 * 60)) + " hour(s)";
            } else {
                return Math.ceil(estimated_time / (60 * 60 * 24)).toLocaleString() + " day(s)";
            }
        }

        return "-";
    },

    usd_balance: function() {
        if(Cryptsy.findOne() && Wallet.findOne()) {
            var s = Cryptsy.findOne();
            var wallet = Wallet.findOne();

            if(!s.usd) {
                return "-";
            }

            var balance = (wallet.balance + wallet.unconfirmedbalance);

            return "$ " + Number(s.usd * balance, 2).toFixed(2);
        }

        return "-";
    },

    satoshi: function() {
        if(Cryptsy.findOne()) {
            var s = Cryptsy.findOne();

            if(!s.satoshi) {
                return "-";
            }

            return s.satoshi.toFixed(2);
        }

        return "-";
    },

    has_cryptsy_error: function() {
        if(Cryptsy.findOne()) {
            var s = Cryptsy.findOne();

            if(!s.usd || !s.satoshi) {
                return true;
            }
        }

        return false;
    },

    transactions: function() {
        return Transaction.find({}, {sort: {time: -1}, limit: 10});
    },

    hastransactions: function() {
        return Transaction.find().count() > 0;
    }
});