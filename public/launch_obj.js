var launch = {
  base_path : window.location.host+"/",
  current_path_name : unescape(location.pathname),
  response : null,
};

launch.app = {};
launch.app.timeout = {};
launch.app.filters = {};
launch.app.config = {};
launch.app.config.routes = {};