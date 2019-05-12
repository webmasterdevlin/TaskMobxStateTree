import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Alert, StyleSheet } from "react-native";
import TaskStore from "../stores/TaskStore";
import HeaderForm from "../components/HeaderForm";
import {
  Container,
  ListItem,
  CheckBox,
  Body,
  Content,
  Text,
  Spinner
} from "native-base";

class TaskList extends Component {
  async componentDidMount() {
    await this._loadTasks();
    await this._reloadTasks();
  }

  handleToggleTask = task => {
    TaskStore.toggleTask(task);
  };

  handleEditTask = id => {
    this.props.navigation.navigate("editTask", { id });
  };

  handleDeleteTask = task => {
    Alert.alert("Deleting Todo", "Are you sure you want to delete this todo?", [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "Yes",
        onPress: () => {
          TaskStore.removeTask(task);
        },
        styles: "destructive"
      }
    ]);
  };

  _loadTasks = async () => {
    await TaskStore.loadTasks();
    TaskStore.checkTasks();
  };

  _reloadTasks = () => {
    this.props.navigation.addListener("didFocus", async () => {
      await TaskStore.loadTasks();
      TaskStore.checkTasks();
    });
  };

  render() {
    return (
      <Container>
        <HeaderForm />
        <Content scrollEnabled={true}>
          {TaskStore.isFetching ? (
            <Spinner color="orange" />
          ) : (
            TaskStore.tasks.map(t => (
              <ListItem
                key={t.id}
                onPress={() => this.handleEditTask(t.id)}
                onLongPress={() => this.handleDeleteTask(t)}
              >
                <CheckBox
                  onPress={() => this.handleToggleTask(t)}
                  checked={t.isDone}
                />
                <Body onLongPress={() => this.handleDeleteTask(t)}>
                  <Text
                    style={
                      t.dueDate < Date.now() ? styles.ended : styles.pending
                    }
                  >
                    {t.title}
                  </Text>
                </Body>
              </ListItem>
            ))
          )}
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  ended: {
    color: "red"
  },
  dueToday: {
    color: "orange"
  },
  pending: {
    color: "black"
  }
});

export default inject("TaskStore")(observer(TaskList));
