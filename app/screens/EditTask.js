import React, { Component } from "react";
import { StyleSheet, TouchableHighlight, TextInput } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import { View, Text, Card } from "native-base";
import { formatDateTime } from "../utils/dateHelper";
import TaskStore from "../stores/TaskStore";
import { inject, observer } from "mobx-react";

class EditTask extends Component {
  state = {
    pickedDate: "",
    showDatePicker: false
  };

  async componentDidMount() {
    const id = this.props.navigation.getParam("id");
    await TaskStore.loadTask(id);
    const convertedDate = formatDateTime(TaskStore.task.dueDate);
    this.setState({ pickedDate: convertedDate });
  }

  handleChangeTitle = title => {
    TaskStore.changeTitle(title);
  };

  handleDatePicked = newDate => {
    const intDate = new Date(newDate).getTime();
    const convertedDate = formatDateTime(intDate);

    this.setState({
      pickedDate: convertedDate
    });

    TaskStore.changeDueDate(intDate);

    this.handleDatePickerHide();
  };

  handleDatePress = () => {
    this.setState({
      showDatePicker: true,
      dueDate: ""
    });
  };

  handleDatePickerHide = () => {
    this.setState({
      showDatePicker: false
    });
  };

  handleAddPress = () => {
    if (!TaskStore.task.title || TaskStore.task.dueDate === "") {
      alert("You need to fill out the form");
      return;
    }
    TaskStore.updateTask(TaskStore.task);
    this.props.navigation.goBack();
  };

  render() {
    const { task } = TaskStore;
    return (
      <Card
        style={{
          flex: 1
        }}
      >
        <View style={styles.fieldContainer}>
          <TextInput
            style={styles.text}
            onChangeText={this.handleChangeTitle}
            placeholder="Event title"
            spellCheck={false}
            value={task.title}
          />
          <TextInput
            style={[styles.text, styles.borderTop]}
            placeholder="due date"
            spellCheck={false}
            editable={!this.state.showDatePicker}
            onFocus={this.handleDatePress}
            value={this.state.pickedDate}
          />
          <DateTimePicker
            isVisible={this.state.showDatePicker}
            mode="datetime"
            onConfirm={this.handleDatePicked}
            onCancel={this.handleDatePickerHide}
          />
        </View>
        <TouchableHighlight onPress={this.handleAddPress} style={styles.button}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableHighlight>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  fieldContainer: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#fff"
  },
  text: {
    height: 40,
    margin: 0,
    marginLeft: 7,
    marginRight: 7,
    paddingLeft: 10
  },
  borderTop: {
    borderColor: "#4ABC61",
    borderTopWidth: 0.5
  },
  button: {
    height: 50,
    backgroundColor: "#4ABC61",
    borderColor: "#4ABC61",
    alignSelf: "stretch",
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5
  },
  buttonText: {
    color: "#fff",
    fontSize: 18
  }
});
export default inject("TaskStore")(observer(EditTask));
