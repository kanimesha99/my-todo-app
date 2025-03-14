import React, { useState } from "react";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { Button } from "@progress/kendo-react-buttons";
import { Dialog } from "@progress/kendo-react-dialogs";
import { Input } from "@progress/kendo-react-inputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { DatePicker } from "@progress/kendo-react-dateinputs";
import { Checkbox } from "@progress/kendo-react-inputs";
import { Notification } from "@progress/kendo-react-notification";
import "@progress/kendo-theme-material/dist/all.css";

const categories = ["Work", "Personal", "Shopping"];

const ToDoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", category: "Work", dueDate: new Date(), completed: false });
  const [showDialog, setShowDialog] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const addTask = () => {
    if (newTask.title.trim() === "") return;
    setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
    setShowDialog(false);
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    );
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📝 To-Do List</h2>
      <Button primary={true} style={styles.addButton} onClick={() => setShowDialog(true)}>
        ➕ Add Task
      </Button>

      {showNotification && <Notification type={{ style: "success", icon: true }}>✅ Task Added!</Notification>}

      <Grid data={tasks} style={styles.grid}>
        <GridColumn field="title" title="Task" />
        <GridColumn field="category" title="Category" />
        <GridColumn field="dueDate" title="Due Date" format="{0:MM/dd/yyyy}" />
        <GridColumn
          title="Completed"
          cell={(props) => (
            <td style={{ textAlign: "center" }}>
              <Checkbox checked={props.dataItem.completed} onChange={() => toggleTaskCompletion(props.dataItem.id)} />
            </td>
          )}
        />
      </Grid>

      {showDialog && (
        <Dialog title="📌 Add New Task" onClose={() => setShowDialog(false)} style={styles.dialog}>
          <div style={styles.dialogContent}>
            <Input
              placeholder="Task Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              style={styles.input}
            />
            <DropDownList
              data={categories}
              value={newTask.category}
              onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
              style={styles.dropdown}
            />
            <DatePicker
              value={newTask.dueDate}
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              style={styles.datePicker}
            />
            <Button primary={true} style={styles.saveButton} onClick={addTask}>
              ✅ Save Task
            </Button>
          </div>
        </Dialog>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "900px",
    margin: "auto",
    textAlign: "center",
    background: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
  },
  title: {
    color: "#333",
    fontSize: "24px",
    marginBottom: "10px",
  },
  addButton: {
    background: "#007BFF",
    color: "#fff",
    borderRadius: "8px",
    padding: "10px 20px",
    fontSize: "16px",
    marginBottom: "10px",
  },
  grid: {
    marginTop: "20px",
    borderRadius: "8px",
    overflow: "hidden",
  },
  dialog: {
    width: "400px",
  },
  dialogContent: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "10px",
  },
  input: {
    width: "100%",
  },
  dropdown: {
    width: "100%",
  },
  datePicker: {
    width: "100%",
  },
  saveButton: {
    background: "#28a745",
    color: "#fff",
    borderRadius: "6px",
    padding: "8px",
  },
};

export default ToDoApp;
