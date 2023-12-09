$(document).ready(function () {
  const apiUrl = "http://localhost:4000/v1/todos";

  fetchTasks();

  $("#addTask").click(function () {
    const taskTitle = $("#title").val();
    const taskDescription = $("#description").val();
    const taskStatus = $("#status").val();

    if (taskTitle.trim() !== "" || taskDescription.trim() !== "") {
      addTask(taskTitle, taskDescription, taskStatus);
    } else {
      alert("Title and Description cannot be empty!");
    }
  });

  function fetchTasks() {
    $.get(apiUrl)
      .done(function (response) {
        console.log("Server Response:", response);
        const tasks = response || [];
        displayTasks(tasks);
      })
      .fail(function (xhr, status, error) {
        console.error("Error fetching tasks:", error);
      });
  }

  function displayTasks(response) {
    const tasks = response && response.data ? response.data : [];
    const taskList = $("#taskList");
    taskList.empty();

    tasks.forEach(function (task) {
      const listItem = $("<li>")
        .text(`${task.title} | ${task.description} | ${task.status}`)
        .click(function () {
          toggleTaskCompletion(task._id, !task.completed);
        });

      if (task.completed) {
        listItem.addClass("completedTask");
      }

      const buttonContainer = $("<div>").addClass("buttonContainer");

      // Update button
      const updateButton = $("<button>")
        .text("Update")
        .addClass("updateButton")
        .click(function () {
          updateTaskPrompt(task._id, task.title, task.description, task.status);
        });

      // Delete button
      const deleteButton = $("<button>")
        .text("Delete")
        .addClass("deleteButton")
        .click(function () {
          deleteTask(task._id);
        });

      buttonContainer.append(updateButton, deleteButton);

      listItem.append(buttonContainer);
      taskList.append(listItem);
    });
  }
  // Function to add a new task
  function addTask(title, description, status) {
    $.ajax({
      url: apiUrl,
      type: "POST",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify({
        title: title,
        description: description,
        status: status,
      }),
      success: function () {
        fetchTasks();
        $("#title").val("");
        $("#description").val("");
        $("#status").val("");
      },
      error: function (error) {
        console.error("Error adding task:", error);
      },
    });
  }

  // Function to delete a task
  function deleteTask(id) {
    $.ajax({
      url: `${apiUrl}/${id}`,
      type: "DELETE",
      success: function () {
        fetchTasks();
      },
      error: function () {
        alert("Error deleting task");
      },
    });
  }

  function toggleTaskCompletion(id, completed) {
    $.ajax({
      url: `${apiUrl}/${id}`,
      type: "PUT",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify({ completed }),
      success: function () {
        fetchTasks();
      },
      error: function () {
        alert("Error updating task completion");
      },
    });
  }

  function updateTaskPrompt(
    id,
    currentTitle,
    currentDescription,
    currentStatus
  ) {
    const updatedTitle = prompt("Update task title:", currentTitle);
    const updatedDescription = prompt(
      "Update task description:",
      currentDescription
    );
    const updatedStatus = prompt("Update task status:", currentStatus);

    if (
      updatedTitle !== null &&
      updatedDescription !== null &&
      updatedStatus !== null
    ) {
      updateTask(id, updatedTitle, updatedDescription, updatedStatus);
    }
  }

  // Function to update a task
  function updateTask(id, updatedTitle, updatedDescription, updatedStatus) {
    $.ajax({
      url: `${apiUrl}/${id}`,
      type: "PUT",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify({
        title: updatedTitle,
        description: updatedDescription,
        status: updatedStatus,
      }),
      success: function () {
        fetchTasks();
      },
      error: function () {
        alert("Error updating task");
      },
    });
  }
});
