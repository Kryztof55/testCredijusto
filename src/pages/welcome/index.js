import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  Typography,
  Container,
  Paper,
  Button,
} from "@material-ui/core";

import Header from "../../Components/Header";
import { useDispatch } from "react-redux";
import * as actions from "../../actions/actions";
import { useHistory } from "react-router-dom";
import "./style.scss";

const Welcome = () => {
  const [user, setUser] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
  });

  const [isValid, setisValid] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const onHandleInput = (e) => {
    if (e.target.value != "") {
      setisValid(true);
    } else {
      setisValid(false);
    }
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const addUser = (e) => {
    e.preventDefault();

    dispatch(actions.setUsers(user));
    history.push(`/dashboard`);
  };

  return (
    <React.Fragment>
      <Header />
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          Bienvenido
        </Typography>
        <Paper className="panel" elevation={3}>
          <Typography variant="body2" gutterBottom>
            Llena al menos un campo
          </Typography>
          <div className="panel-form">
            <FormControl>
              <InputLabel htmlFor="nombre">Nombre</InputLabel>
              <Input
                value={user.nombre}
                name="nombre"
                onInput={onHandleInput}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="apellido">Apellido</InputLabel>
              <Input
                value={user.apellido}
                name="apellido"
                aria-describedby="my-helper-text"
                onInput={onHandleInput}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input value={user.email} name="email" onInput={onHandleInput} />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="cel">Teléfono</InputLabel>
              <Input value={user.telefono} name="telefono" />
            </FormControl>
          </div>
          <Button
            onClick={addUser}
            variant="contained"
            color="primary"
            disabled={!isValid}
            data-test="button"
          >
            Enviar
          </Button>
        </Paper>
      </Container>
    </React.Fragment>
  );
};

export default Welcome;
