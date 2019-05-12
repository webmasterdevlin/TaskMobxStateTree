import React from "react";
import { Provider } from "mobx-react";
import TaskStore from "../stores/TaskStore";

import RootNavigation from "./root-navigation";

const stores = {
  TaskStore
};

class NavigationWrapper extends React.Component {
  render() {
    return (
      <Provider {...stores}>
        <RootNavigation />
      </Provider>
    );
  }
}

export default NavigationWrapper;
