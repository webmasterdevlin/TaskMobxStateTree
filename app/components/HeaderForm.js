import React, { Component } from "react";
import { Header, Item, Input, Text, Button, Icon } from "native-base";
import { inject, observer } from "mobx-react";
import TaskStore from "../stores/TaskStore";
import moment from "moment";

class HeaderForm extends Component<{}> {
  state = {
    title: ""
  };
  handleOnChangeText = title => {
    this.setState({ title });
  };

  handleSubmit = () => {
    const newTask = {
      title: this.state.title,
      dueDate: Date.now(),
      isDone: false
    };
    TaskStore.createTask(newTask);
    this.setState({ title: "" });
  };
  render() {
    return (
      <Header searchBar rounded>
        <Item>
          <Icon name="add" />
          <Input
            value={this.state.title}
            placeholder="add task"
            onChangeText={this.handleOnChangeText}
          />
        </Item>
        <Button transparent onPress={() => this.handleSubmit()}>
          <Text>Save</Text>
        </Button>
      </Header>
    );
  }
}

export default inject("TaskStore")(observer(HeaderForm));
