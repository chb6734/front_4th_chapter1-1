export const Router = () => {
  const routes = {};

  function handlePopState() {
    console.log(window.location.pathname);
    handleRoute(window.location.pathname);
  }

  function handleRoute(path) {
    console.log(path);
    let page;
    if (path === "/profile") {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("user : ", user);
      if (user) {
        page = routes["/profile"];
      } else {
        page = routes["/login"];
      }
    } else {
      page = routes[path] || routes["/error"];
    }
    if (page) {
      console.log(page);
      const { view, init } = page();
      document.body.innerHTML = view;
      init();
    } else {
      /* empty */
    }
  }

  function addRoute(path, handler) {
    routes[path] = handler;
  }

  function navigateTo(path) {
    if (window.location.pathname == path) return;
    history.pushState(null, "", path);
    handleRoute(path);
  }

  function setDefaultRoute() {
    const initialPath = window.location.pathname;
    handleRoute(initialPath);
  }

  window.addEventListener("popstate", handlePopState);

  return {
    setDefaultRoute,
    addRoute,
    navigateTo,
  };
};
