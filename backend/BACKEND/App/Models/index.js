const Subadmin_Permission = require("./subadmin_permision.model");

module.exports = {
    categorie: require("./categorie.model"),
    company_information: require("./company_information.model"),
    role: require("./role.model"),
    services: require("./services.model"),
    theme_list: require("./theme_list.model"),
    user_logs: require("./user_logs.model"),
    user: require("./user.model"),
    UserSignUp : require('./usersignup.model'),
    serviceGroupName: require("./serviceGroupName.model"),
    serviceGroup_services_id: require("./serviceGroup_services_id.model"),
    strategy: require('./strategy.model'),
    strategy_client: require('./strategy_client.model'),
    panel_model: require('./all_panels.model'),
    Subadmin_Permission: require('./subadmin_permision.model'),
    groupService_User: require('./group_services_client.model'),
    client_services: require('./client_service.model'),
    Alice_token: require('./Alice_token.model'),
    Signals: require('./Signals.model'),
    MainSignals: require('./Main_signals.model'),
    api_create_info: require('./api_create_info.model'),
    BrokerResponse: require('./broker_response.model'),
    count_licenses: require('./count_licens.model'),
    HelpCenter: require('./HelpCenter.model'),

    UserMakeStrategy: require('./UserMakeStrategy.model'),
    user_activity_logs: require('./User_activity.model'),
    Broker_information: require('./Broker_information.model'),
    Messagebrodcast_data: require('./Messagebrodcast.model'),
    live_price: require('./Live_price.model'),
    Admin_Permission: require('./admin_permision.model'),
    option_chain_symbols: require('./Get_Option_Chain_Symboll.model'),
    timeFrame: require('./timeFrame.model'),
    Superadmin_History: require('./superadmin_history.model'),
    source : require('./source.model'),
    comparators : require('./comparators.model'),
    strategy_Order : require('./Strategy_order.model'),
    Plan_Order : require('./subscription_plan.model'),

    plan_amount_details : require('./Plan_amount_detals.model'),
    RazorpayKey_model : require('./RazorpayKey.model'),





};
