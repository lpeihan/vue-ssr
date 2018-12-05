import createApp from './create-app';

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp();

    router.push(context.url);

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();

      if (matchedComponents.length === 0) {
        return reject(new Error({ code: 404, msg: 'no components matched' }));
      }

      Promise.all(matchedComponents.map(Component => {
        if (Component.asyncData) {
          return Component.asyncData({
            route: router.currentRoute,
            router,
            store
          });
        }
      })).then(data => {
        context.state = store.state;
        context.router = router;
        resolve(app);
      });
    });
  });
};
