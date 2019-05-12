import { createAppContainer, createStackNavigator } from "react-navigation";
import TaskList from "../screens/TaskList";
import EditTask from "../screens/EditTask";

const MainNavigator = createStackNavigator({
  todoList: {
    screen: TaskList,
    navigationOptions: {
      header: null
    }
  },
  editTask: {
    screen: EditTask,
    navigationOptions: () => ({
      title: "Edit Task",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "orange"
      }
    })
  }
});

const RootNavigation = createAppContainer(MainNavigator);
export default RootNavigation;
