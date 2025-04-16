import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoForm from '../../Utils/CreateEditTodoForm';
import { TodoService } from '../../services/TodoService';
import { Todo } from '../../interfaces/Todo';
import Swal from 'sweetalert2';

interface CreateTodoProps {
  onCreateTodo: () => void;
}

function CreateTodo({ onCreateTodo }: CreateTodoProps) {
  // State to control the visibility of the form
  const [isFormVisible, setIsFormVisible] = React.useState(false);

  // Input data
  const [newTodo, setNewTodo] = useState<Todo>({
    text: "",
    priority: "High",
    dueDate: "",
    completed: false,
    dueDateProximity: 0,
  });

  // Function to handle form submission
  const submitForm = () => {
    TodoService.addTodo(newTodo).then((response: any) => {
      setIsFormVisible(false);
      Swal.fire({
        icon: 'success',
        title: 'Todo Created',
        text: 'Your new todo has been successfully created!',
      }).then((result) => {
        onCreateTodo();
      });
    }).catch((error: any) => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please verify your text input and try again.',
      });
    });
  }

  useEffect(() => {
    if (!isFormVisible) {
      setNewTodo({
        text: "",
        priority: "High",
        dueDate: "",
        completed: false,
        dueDateProximity: 0,
      });
    }
  }, [isFormVisible]);

  return (
    <div className="container mt-4">
      <button 
        className="btn btn-primary mb-3" 
        onClick={() => setIsFormVisible(true)}
      >
        + New Todo
      </button>

      {isFormVisible && 
      <TodoForm 
        todo={newTodo}
        setTodo={setNewTodo}
        title='Create Todo'
        submitForm={submitForm} 
        setIsFormVisible={setIsFormVisible}
      />}
    </div>
  );
}

export default CreateTodo;